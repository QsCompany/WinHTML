/// <reference path="..\compiler\commandLineParser.ts" />
/// <reference path="..\services\services.ts" />
/// <reference path="node.d.ts" />
/// <reference path="protocol.d.ts" />
/// <reference path="editorServices.ts" />

module ts.server {
    var spaceCache:string[] = [];

    interface StackTraceError extends Error {
        stack?: string;
    }

    export function generateSpaces(n: number): string {
        if (!spaceCache[n]) {
            var strBuilder = "";
            for (var i = 0; i < n; i++) {
                strBuilder += " ";
            }
            spaceCache[n] = strBuilder;
        }  
        return spaceCache[n];
    }

    interface FileStart {
        file: string;
        start: ILineInfo;
    }

    function compareNumber(a: number, b: number) {
        if (a < b) {
            return -1;
        }
        else if (a == b) {
            return 0;
        }
        else return 1;
    }

    function compareFileStart(a: FileStart, b: FileStart) {
        if (a.file < b.file) {
            return -1;
        }
        else if (a.file == b.file) {
            var n = compareNumber(a.start.line, b.start.line);
            if (n == 0) {
                return compareNumber(a.start.offset, b.start.offset);
            }
            else return n;
        }
        else {
            return 1;
        }
    }
       
    function formatDiag(fileName: string, project: Project, diag: ts.Diagnostic) {
        return {
            start: project.compilerService.host.positionToLineOffset(fileName, diag.start),
            end: project.compilerService.host.positionToLineOffset(fileName, diag.start + diag.length),
            text: ts.flattenDiagnosticMessageText(diag.messageText, "\n")
        };
    }

    interface PendingErrorCheck {
        fileName: string;
        project: Project;
    }

    function allEditsBeforePos(edits: ts.TextChange[], pos: number) {
        for (var i = 0, len = edits.length; i < len; i++) {
            if (ts.textSpanEnd(edits[i].span) >= pos) {
                return false;
            }
        }
        return true;
    }

    export module CommandNames {
        export var Brace = "brace";
        export var Change = "change";
        export var Close = "close";
        export var Completions = "completions";
        export var CompletionDetails = "completionEntryDetails";
        export var Configure = "configure";
        export var Definition = "definition";
        export var Exit = "exit";
        export var Format = "format";
        export var Formatonkey = "formatonkey";
        export var Geterr = "geterr";
        export var NavBar = "navbar";
        export var Navto = "navto";
        export var Occurrences = "occurrences";
        export var Open = "open";
        export var Quickinfo = "quickinfo";
        export var References = "references";
        export var Reload = "reload";
        export var Rename = "rename";
        export var Saveto = "saveto";
        export var SignatureHelp = "signatureHelp";        
        export var Unknown = "unknown";
    }

    module Errors { 
        export var NoProject = new Error("No Project.");
    }

    export interface ServerHost extends ts.System {
    }

    export class Session {
        projectService: ProjectService;
        pendingOperation = false;
        fileHash: ts.Map<number> = {};
        nextFileId = 1;
        errorTimer: NodeJS.Timer;
        immediateId: any;
        changeSeq = 0;

        constructor(private host: ServerHost, private logger: Logger) {
            this.projectService =
            new ProjectService(host, logger, (eventName, project, fileName) => {
                this.handleEvent(eventName, project, fileName);
            });
        }

        handleEvent(eventName: string, project: Project, fileName: string) {
            if (eventName == "context") {
                this.projectService.log("got context event, updating diagnostics for" + fileName, "Info");
                this.updateErrorCheck([{ fileName, project }], this.changeSeq,
                    (n) => n == this.changeSeq, 100);
            }
        }

        logError(err: Error, cmd: string) {
            var typedErr = <StackTraceError>err;
            var msg = "Exception on executing command " + cmd;
            if (typedErr.message) {
                msg += ":\n" + typedErr.message;
                if (typedErr.stack) {
                    msg += "\n" + typedErr.stack;
                }
            }
            this.projectService.log(msg);
        }

        sendLineToClient(line: string) {
            this.host.write(line + this.host.newLine);
        }

        send(msg: NodeJS._debugger.Message) {
            var json = JSON.stringify(msg);
            if (this.logger.isVerbose()) {
                this.logger.info(msg.type + ": " + json);
            }
            this.sendLineToClient('Content-Length: ' + (1 + Buffer.byteLength(json, 'utf8')) +
                '\r\n\r\n' + json);
        }

        event(info: any, eventName: string) {
            var ev: NodeJS._debugger.Event = {
                seq: 0,
                type: "event",
                event: eventName,
                body: info,
            };
            this.send(ev);
        }

        response(info: any, cmdName: string, reqSeq = 0, errorMsg?: string) {
            var res: protocol.Response = {
                seq: 0,
                type: "response",
                command: cmdName,
                request_seq: reqSeq,
                success: !errorMsg,
            }
            if (!errorMsg) {
                res.body = info;
            }
            else {
                res.message = errorMsg;
            }
            this.send(res);
        }

        output(body: any, commandName: string, requestSequence = 0, errorMessage?: string) {
            this.response(body, commandName, requestSequence, errorMessage);
        }

        semanticCheck(file: string, project: Project) {
            try {
                var diags = project.compilerService.languageService.getSemanticDiagnostics(file);

                if (diags) {
                    var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "semanticDiag");
                }
            }
            catch (err) {
                this.logError(err, "semantic check");
            }
        }

        syntacticCheck(file: string, project: Project) {
            try {
                var diags = project.compilerService.languageService.getSyntacticDiagnostics(file);
                if (diags) {
                    var bakedDiags = diags.map((diag) => formatDiag(file, project, diag));
                    this.event({ file: file, diagnostics: bakedDiags }, "syntaxDiag");
                }
            }
            catch (err) {
                this.logError(err, "syntactic check");
            }
        }

        errorCheck(file: string, project: Project) {
            this.syntacticCheck(file, project);
            this.semanticCheck(file, project);
        }

        updateProjectStructure(seq: number, matchSeq: (seq: number) => boolean, ms = 1500) {
            setTimeout(() => {
                if (matchSeq(seq)) {
                    this.projectService.updateProjectStructure();
                }
            }, ms);
        }

        updateErrorCheck(checkList: PendingErrorCheck[], seq: number,
            matchSeq: (seq: number) => boolean, ms = 1500, followMs = 200) {
            if (followMs > ms) {
                followMs = ms;
            }
            if (this.errorTimer) {
                clearTimeout(this.errorTimer);
            }
            if (this.immediateId) {
                clearImmediate(this.immediateId);
                this.immediateId = undefined;
            }
            var index = 0;
            var checkOne = () => {
                if (matchSeq(seq)) {
                    var checkSpec = checkList[index++];
                    if (checkSpec.project.getSourceFileFromName(checkSpec.fileName, true)) {
                        this.syntacticCheck(checkSpec.fileName, checkSpec.project);
                        this.immediateId = setImmediate(() => {
                            this.semanticCheck(checkSpec.fileName, checkSpec.project);
                            this.immediateId = undefined;
                            if (checkList.length > index) {
                                this.errorTimer = setTimeout(checkOne, followMs);
                            }
                            else {
                                this.errorTimer = undefined;
                            }
                        });
                    }
                }
            }
            if ((checkList.length > index) && (matchSeq(seq))) {
                this.errorTimer = setTimeout(checkOne, ms);
            }
        }

        getDefinition({ line, offset, file: fileName }: protocol.FileLocationRequestArgs): protocol.FileSpan[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var definitions = compilerService.languageService.getDefinitionAtPosition(file, position);
            if (!definitions) {
                return undefined;
            }

            return definitions.map(def => ({
                file: def.fileName,
                start: compilerService.host.positionToLineOffset(def.fileName, def.textSpan.start),
                end: compilerService.host.positionToLineOffset(def.fileName, ts.textSpanEnd(def.textSpan))
            }));
        }

        getOccurrences({ line, offset, file: fileName }: protocol.FileLocationRequestArgs): protocol.OccurrencesResponseItem[] {
            fileName = ts.normalizePath(fileName);
            let project = this.projectService.getProjectForFile(fileName);

            if (!project) {
                throw Errors.NoProject;
            }

            let { compilerService } = project;
            let position = compilerService.host.lineOffsetToPosition(fileName, line, offset);

            let occurrences = compilerService.languageService.getOccurrencesAtPosition(fileName, position);

            if (!occurrences) {
                return undefined;
            }

            return occurrences.map(occurrence => {
                let { fileName, isWriteAccess, textSpan } = occurrence;
                let start = compilerService.host.positionToLineOffset(fileName, textSpan.start);
                let end = compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(textSpan));
                return {
                    start,
                    end,
                    file: fileName,
                    isWriteAccess
                }
            });
        }

        getRenameLocations({line, offset, file: fileName, findInComments, findInStrings }: protocol.RenameRequestArgs): protocol.RenameResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var renameInfo = compilerService.languageService.getRenameInfo(file, position);
            if (!renameInfo) {
                return undefined;
            }

            if (!renameInfo.canRename) {
                return {
                    info: renameInfo,
                    locs: []
                };
            }

            var renameLocations = compilerService.languageService.findRenameLocations(file, position, findInStrings, findInComments);
            if (!renameLocations) {
                return undefined;
            }

            var bakedRenameLocs = renameLocations.map(location => (<protocol.FileSpan>{
                file: location.fileName,
                start: compilerService.host.positionToLineOffset(location.fileName, location.textSpan.start),
                end: compilerService.host.positionToLineOffset(location.fileName, ts.textSpanEnd(location.textSpan)),
            })).sort((a, b) => {
                if (a.file < b.file) {
                    return -1;
                }
                else if (a.file > b.file) {
                    return 1;
                }
                else {
                    // reverse sort assuming no overlap
                    if (a.start.line < b.start.line) {
                        return 1;
                    }
                    else if (a.start.line > b.start.line) {
                        return -1;
                    }
                    else {
                        return b.start.offset - a.start.offset;
                    }
                }
            }).reduce<protocol.SpanGroup[]>((accum: protocol.SpanGroup[], cur: protocol.FileSpan) => {
                var curFileAccum: protocol.SpanGroup;
                if (accum.length > 0) {
                    curFileAccum = accum[accum.length - 1];
                    if (curFileAccum.file != cur.file) {
                        curFileAccum = undefined;
                    }
                }
                if (!curFileAccum) {
                    curFileAccum = { file: cur.file, locs: [] };
                    accum.push(curFileAccum);
                }
                curFileAccum.locs.push({ start: cur.start, end: cur.end });
                return accum;
            }, []);

            return { info: renameInfo, locs: bakedRenameLocs };
        }

        getReferences({ line, offset, file: fileName }: protocol.FileLocationRequestArgs): protocol.ReferencesResponseBody {
            // TODO: get all projects for this file; report refs for all projects deleting duplicates
            // can avoid duplicates by eliminating same ref file from subsequent projects
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var references = compilerService.languageService.getReferencesAtPosition(file, position);
            if (!references) {
                return undefined;
            }

            var nameInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!nameInfo) {
                return undefined;
            }

            var displayString = ts.displayPartsToString(nameInfo.displayParts);
            var nameSpan = nameInfo.textSpan;
            var nameColStart = compilerService.host.positionToLineOffset(file, nameSpan.start).offset;
            var nameText = compilerService.host.getScriptSnapshot(file).getText(nameSpan.start, ts.textSpanEnd(nameSpan));
            var bakedRefs: protocol.ReferencesResponseItem[] = references.map(ref => {
                var start = compilerService.host.positionToLineOffset(ref.fileName, ref.textSpan.start);
                var refLineSpan = compilerService.host.lineToTextSpan(ref.fileName, start.line - 1);
                var snap = compilerService.host.getScriptSnapshot(ref.fileName);
                var lineText = snap.getText(refLineSpan.start, ts.textSpanEnd(refLineSpan)).replace(/\r|\n/g, "");
                return {
                    file: ref.fileName,
                    start: start,
                    lineText: lineText,
                    end: compilerService.host.positionToLineOffset(ref.fileName, ts.textSpanEnd(ref.textSpan)),
                    isWriteAccess: ref.isWriteAccess
                };
            }).sort(compareFileStart);
            return {
                refs: bakedRefs,
                symbolName: nameText,
                symbolStartOffset: nameColStart,
                symbolDisplayString: displayString
            };
        }

        openClientFile({ file: fileName }: protocol.OpenRequestArgs) {
            var file = ts.normalizePath(fileName);
            this.projectService.openClientFile(file);
        }

        getQuickInfo({ line, offset, file: fileName }: protocol.FileLocationRequestArgs): protocol.QuickInfoResponseBody {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var quickInfo = compilerService.languageService.getQuickInfoAtPosition(file, position);
            if (!quickInfo) {
                return undefined;
            }

            var displayString = ts.displayPartsToString(quickInfo.displayParts);
            var docString = ts.displayPartsToString(quickInfo.documentation);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: compilerService.host.positionToLineOffset(file, quickInfo.textSpan.start),
                end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(quickInfo.textSpan)),
                displayString: displayString,
                documentation: docString,
            };
        }

        getFormattingEditsForRange({line, offset, endLine, endOffset, file: fileName}: protocol.FormatRequestArgs): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var startPosition = compilerService.host.lineOffsetToPosition(file, line, offset);
            var endPosition = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);
            
            // TODO: avoid duplicate code (with formatonkey)
            var edits = compilerService.languageService.getFormattingEditsForRange(file, startPosition, endPosition,
                this.projectService.getFormatCodeOptions(file));
            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file, edit.span.start),
                    end: compilerService.host.positionToLineOffset(file, ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        getFormattingEditsAfterKeystroke({line, offset, key, file: fileName}: protocol.FormatOnKeyRequestArgs): protocol.CodeEdit[] {
            var file = ts.normalizePath(fileName);

            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var formatOptions = this.projectService.getFormatCodeOptions(file);
            var edits = compilerService.languageService.getFormattingEditsAfterKeystroke(file, position, key,
                formatOptions);
            // Check whether we should auto-indent. This will be when
            // the position is on a line containing only whitespace.
            // This should leave the edits returned from
            // getFormattingEditsAfterKeytroke either empty or pertaining
            // only to the previous line.  If all this is true, then
            // add edits necessary to properly indent the current line.
            if ((key == "\n") && ((!edits) || (edits.length == 0) || allEditsBeforePos(edits, position))) {
                var scriptInfo = compilerService.host.getScriptInfo(file);
                if (scriptInfo) {
                    var lineInfo = scriptInfo.getLineInfo(line);
                    if (lineInfo && (lineInfo.leaf) && (lineInfo.leaf.text)) {
                        var lineText = lineInfo.leaf.text;
                        if (lineText.search("\\S") < 0) {
                            // TODO: get these options from host
                            var editorOptions: ts.EditorOptions = {
                                IndentSize: formatOptions.IndentSize,
                                TabSize: formatOptions.TabSize,
                                NewLineCharacter: "\n",
                                ConvertTabsToSpaces: true,
                            };
                            var indentPosition =
                                compilerService.languageService.getIndentationAtPosition(file, position, editorOptions);
                            for (var i = 0, len = lineText.length; i < len; i++) {
                                if (lineText.charAt(i) == " ") {
                                    indentPosition--;
                                }
                                else {
                                    break;
                                }
                            }
                            if (indentPosition > 0) {
                                var spaces = generateSpaces(indentPosition);
                                edits.push({ span: ts.createTextSpanFromBounds(position, position), newText: spaces });
                            }
                            else if (indentPosition < 0) {
                                edits.push({
                                    span: ts.createTextSpanFromBounds(position, position - indentPosition),
                                    newText: ""
                                });
                            }
                        }
                    }
                }
            }

            if (!edits) {
                return undefined;
            }

            return edits.map((edit) => {
                return {
                    start: compilerService.host.positionToLineOffset(file,
                        edit.span.start),
                    end: compilerService.host.positionToLineOffset(file,
                        ts.textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        getCompletions({ line, offset, prefix, file: fileName}: protocol.CompletionsRequestArgs): protocol.CompletionEntry[] {
            if (!prefix) {
                prefix = "";
            }
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            var completions = compilerService.languageService.getCompletionsAtPosition(file, position);
            if (!completions) {
                return undefined;
            }

            return completions.entries.reduce((result: protocol.CompletionEntry[], entry: ts.CompletionEntry) => {
                if (completions.isMemberCompletion || (entry.name.toLowerCase().indexOf(prefix.toLowerCase()) == 0)) {
                    result.push(entry);
                }
                return result;
            }, []).sort((a, b) => a.name.localeCompare(b.name));
        }

        getCompletionEntryDetails({ line, offset, entryNames, file: fileName}: protocol.CompletionDetailsRequestArgs): protocol.CompletionEntryDetails[] {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);

            return entryNames.reduce((accum: protocol.CompletionEntryDetails[], entryName: string) => {
                var details = compilerService.languageService.getCompletionEntryDetails(file, position, entryName);
                if (details) {
                    accum.push(details);
                }
                return accum;
            }, []);
        }

        getSignatureHelpItems({ line, offset, file: fileName }: protocol.SignatureHelpRequestArgs): protocol.SignatureHelpItems {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            var helpItems = compilerService.languageService.getSignatureHelpItems(file, position);
            if (!helpItems) {
                return undefined;
            }

            var span = helpItems.applicableSpan;
            var result: protocol.SignatureHelpItems = {
                items: helpItems.items,
                applicableSpan: {
                    start: compilerService.host.positionToLineOffset(file, span.start),
                    end: compilerService.host.positionToLineOffset(file, span.start + span.length)
                },
                selectedItemIndex: helpItems.selectedItemIndex,
                argumentIndex: helpItems.argumentIndex,
                argumentCount: helpItems.argumentCount,
            }

            return result;
        }

        getDiagnostics({ delay, files: fileNames }: protocol.GeterrRequestArgs): void {
            var checkList = fileNames.reduce((accum: PendingErrorCheck[], fileName: string) => {
                fileName = ts.normalizePath(fileName);
                var project = this.projectService.getProjectForFile(fileName);
                if (project) {
                    accum.push({ fileName, project });
                }
                return accum;
            }, []);

            if (checkList.length > 0) {
                this.updateErrorCheck(checkList, this.changeSeq, (n) => n == this.changeSeq, delay)
            }
        }

        change({ line, offset, endLine, endOffset, insertString, file: fileName }: protocol.ChangeRequestArgs): void {
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                var compilerService = project.compilerService;
                var start = compilerService.host.lineOffsetToPosition(file, line, offset);
                var end = compilerService.host.lineOffsetToPosition(file, endLine, endOffset);
                if (start >= 0) {
                    compilerService.host.editScript(file, start, end, insertString);
                    this.changeSeq++;
                }
                this.updateProjectStructure(this.changeSeq, (n) => n == this.changeSeq);
            }
        }

        reload({ file: fileName, tmpfile: tempFileName }: protocol.ReloadRequestArgs, reqSeq = 0): void {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);
            var project = this.projectService.getProjectForFile(file);
            if (project) {
                this.changeSeq++;
                // make sure no changes happen before this one is finished
                project.compilerService.host.reloadScript(file, tmpfile, () => {
                    this.output(undefined, CommandNames.Reload, reqSeq);
                });
            }
        }

        saveToTmp({ file: fileName, tmpfile: tempFileName }: protocol.SavetoRequestArgs): void {
            var file = ts.normalizePath(fileName);
            var tmpfile = ts.normalizePath(tempFileName);

            var project = this.projectService.getProjectForFile(file);
            if (project) {
                project.compilerService.host.saveTo(file, tmpfile);
            }
        }

        closeClientFile({ file: fileName }: protocol.FileRequestArgs) {
            var file = ts.normalizePath(fileName);
            this.projectService.closeClientFile(file);
        }

        decorateNavigationBarItem(project: Project, fileName: string, items: ts.NavigationBarItem[]): protocol.NavigationBarItem[] {
            if (!items) {
                return undefined;
            }

            var compilerService = project.compilerService;

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers,
                spans: item.spans.map(span => ({
                    start: compilerService.host.positionToLineOffset(fileName, span.start),
                    end: compilerService.host.positionToLineOffset(fileName, ts.textSpanEnd(span))
                })),
                childItems: this.decorateNavigationBarItem(project, fileName, item.childItems)
            }));
        }

        getNavigationBarItems({ file: fileName }: protocol.FileRequestArgs): protocol.NavigationBarItem[]{
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var items = compilerService.languageService.getNavigationBarItems(file);
            if (!items) {
                return undefined;
            }

            return this.decorateNavigationBarItem(project, fileName, items);
        }

        getNavigateToItems({ searchValue, file: fileName, maxResultCount }: protocol.NavtoRequestArgs): protocol.NavtoItem[]{
            var file = ts.normalizePath(fileName);
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }

            var compilerService = project.compilerService;
            var navItems = compilerService.languageService.getNavigateToItems(searchValue, maxResultCount);
            if (!navItems) {
                return undefined;
            }

            return navItems.map((navItem) => {
                var start = compilerService.host.positionToLineOffset(navItem.fileName, navItem.textSpan.start);
                var end = compilerService.host.positionToLineOffset(navItem.fileName, ts.textSpanEnd(navItem.textSpan));
                var bakedItem: protocol.NavtoItem = {
                    name: navItem.name,
                    kind: navItem.kind,
                    file: navItem.fileName,
                    start: start,
                    end: end,
                };
                if (navItem.kindModifiers && (navItem.kindModifiers != "")) {
                    bakedItem.kindModifiers = navItem.kindModifiers;
                }
                if (navItem.matchKind != 'none') {
                    bakedItem.matchKind = navItem.matchKind;
                }
                if (navItem.containerName && (navItem.containerName.length > 0)) {
                    bakedItem.containerName = navItem.containerName;
                }
                if (navItem.containerKind && (navItem.containerKind.length > 0)) {
                    bakedItem.containerKind = navItem.containerKind;
                }
                return bakedItem;
            });
        }

        getBraceMatching({ line, offset, file: fileName }: protocol.FileLocationRequestArgs): protocol.TextSpan[]{
            var file = ts.normalizePath(fileName);
            
            var project = this.projectService.getProjectForFile(file);
            if (!project) {
                throw Errors.NoProject;
            }
            
            var compilerService = project.compilerService;
            var position = compilerService.host.lineOffsetToPosition(file, line, offset);
            
            var spans = compilerService.languageService.getBraceMatchingAtPosition(file, position);
            if (!spans) {
                return undefined;
            }
            
            return spans.map(span => ({
                start: compilerService.host.positionToLineOffset(file, span.start),
                end: compilerService.host.positionToLineOffset(file, span.start + span.length)
            }));
        }

        exit() {
        }

        onMessage(message: string) {
            if (this.logger.isVerbose()) {
                this.logger.info("request: " + message);
                var start = process.hrtime();                
            }
            try {
                var request = <protocol.Request>JSON.parse(message);
                var response: any;
                var errorMessage: string;
                var responseRequired = true;
                switch (request.command) {
                    case CommandNames.Exit: {
                        this.exit();
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Definition: { 
                        response = this.getDefinition(<protocol.FileLocationRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.References: { 
                        response = this.getReferences(<protocol.FileLocationRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Rename: {
                        response = this.getRenameLocations(<protocol.RenameRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Open: {
                        this.openClientFile(<protocol.OpenRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Quickinfo: {
                        response = this.getQuickInfo(<protocol.FileLocationRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Format: {
                        response = this.getFormattingEditsForRange(<protocol.FormatRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Formatonkey: {
                        response = this.getFormattingEditsAfterKeystroke(<protocol.FormatOnKeyRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Completions: {
                        response = this.getCompletions(<protocol.CompletionsRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.CompletionDetails: {
                        response = this.getCompletionEntryDetails(<protocol.CompletionDetailsRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.SignatureHelp: {
                        response = this.getSignatureHelpItems(<protocol.SignatureHelpRequestArgs>request.arguments);
                        break;
                    }    
                    case CommandNames.Geterr: {
                        this.getDiagnostics(<protocol.GeterrRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Change: {
                        this.change(<protocol.ChangeRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Configure: {
                        this.projectService.setHostConfiguration(<protocol.ConfigureRequestArguments>request.arguments);
                        this.output(undefined, CommandNames.Configure, request.seq);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Reload: {
                        this.reload(<protocol.ReloadRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Saveto: {
                        this.saveToTmp(<protocol.SavetoRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Close: {
                        this.closeClientFile(<protocol.FileRequestArgs>request.arguments);
                        responseRequired = false;
                        break;
                    }
                    case CommandNames.Navto: {
                        response = this.getNavigateToItems(<protocol.NavtoRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Brace: {
                        response = this.getBraceMatching(<protocol.FileLocationRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.NavBar: {
                        response = this.getNavigationBarItems(<protocol.FileRequestArgs>request.arguments);
                        break;
                    }
                    case CommandNames.Occurrences: {
                        response = this.getOccurrences(<protocol.FileLocationRequestArgs>request.arguments);
                        break;
                    }
                    default: {
                        this.projectService.log("Unrecognized JSON command: " + message);
                        this.output(undefined, CommandNames.Unknown, request.seq, "Unrecognized JSON command: " + request.command);
                        break;
                    }
                }

                if (this.logger.isVerbose()) {
                    var elapsed = process.hrtime(start);
                    var seconds = elapsed[0]
                    var nanoseconds = elapsed[1];
                    var elapsedMs = ((1e9 * seconds) + nanoseconds)/1000000.0;
                    var leader = "Elapsed time (in milliseconds)";
                    if (!responseRequired) {
                        leader = "Async elapsed time (in milliseconds)";
                    }
                    this.logger.msg(leader + ": " + elapsedMs.toFixed(4).toString(), "Perf");
                }
                if (response) {
                    this.output(response, request.command, request.seq);
                }
                else if (responseRequired) {
                    this.output(undefined, request.command, request.seq, "No content available.");
                }
            } catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                }
                this.logError(err, message);
                this.output(undefined, request ? request.command : CommandNames.Unknown, request ? request.seq : 0, "Error processing request. " + err.message);
            }
        }
    }
}
