/// <reference path="program.d.ts" />
/// <reference path="commandLineParser.d.ts" />
declare module ts {
    interface SourceFile {
        fileWatcher: FileWatcher;
    }
    function executeCommandLine(args: string[]): void;
}
