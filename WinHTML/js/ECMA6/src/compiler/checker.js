/// <reference path="binder.ts"/>
/* @internal */
var ts;
(function (ts) {
    let nextSymbolId = 1;
    let nextNodeId = 1;
    let nextMergeId = 1;
    function getNodeId(node) {
        if (!node.id)
            node.id = nextNodeId++;
        return node.id;
    }
    ts.getNodeId = getNodeId;
    ts.checkTime = 0;
    function getSymbolId(symbol) {
        if (!symbol.id) {
            symbol.id = nextSymbolId++;
        }
        return symbol.id;
    }
    ts.getSymbolId = getSymbolId;
    function createTypeChecker(host, produceDiagnostics) {
        let Symbol = ts.objectAllocator.getSymbolConstructor();
        let Type = ts.objectAllocator.getTypeConstructor();
        let Signature = ts.objectAllocator.getSignatureConstructor();
        let typeCount = 0;
        let emptyArray = [];
        let emptySymbols = {};
        let compilerOptions = host.getCompilerOptions();
        let languageVersion = compilerOptions.target || 0 /* ES3 */;
        let emitResolver = createResolver();
        let undefinedSymbol = createSymbol(4 /* Property */ | 67108864 /* Transient */, "undefined");
        let argumentsSymbol = createSymbol(4 /* Property */ | 67108864 /* Transient */, "arguments");
        let checker = {
            getNodeCount: () => ts.sum(host.getSourceFiles(), "nodeCount"),
            getIdentifierCount: () => ts.sum(host.getSourceFiles(), "identifierCount"),
            getSymbolCount: () => ts.sum(host.getSourceFiles(), "symbolCount"),
            getTypeCount: () => typeCount,
            isUndefinedSymbol: symbol => symbol === undefinedSymbol,
            isArgumentsSymbol: symbol => symbol === argumentsSymbol,
            getDiagnostics,
            getGlobalDiagnostics,
            getTypeOfSymbolAtLocation,
            getDeclaredTypeOfSymbol,
            getPropertiesOfType,
            getPropertyOfType,
            getSignaturesOfType,
            getIndexTypeOfType,
            getReturnTypeOfSignature,
            getSymbolsInScope,
            getSymbolAtLocation,
            getShorthandAssignmentValueSymbol,
            getTypeAtLocation,
            typeToString,
            getSymbolDisplayBuilder,
            symbolToString,
            getAugmentedPropertiesOfType,
            getRootSymbols,
            getContextualType,
            getFullyQualifiedName,
            getResolvedSignature,
            getConstantValue,
            isValidPropertyAccess,
            getSignatureFromDeclaration,
            isImplementationOfOverload,
            getAliasedSymbol: resolveAlias,
            getEmitResolver,
            getExportsOfModule: getExportsOfModuleAsArray,
        };
        let unknownSymbol = createSymbol(4 /* Property */ | 67108864 /* Transient */, "unknown");
        let resolvingSymbol = createSymbol(67108864 /* Transient */, "__resolving__");
        let anyType = createIntrinsicType(1 /* Any */, "any");
        let stringType = createIntrinsicType(2 /* String */, "string");
        let numberType = createIntrinsicType(4 /* Number */, "number");
        let booleanType = createIntrinsicType(8 /* Boolean */, "boolean");
        let esSymbolType = createIntrinsicType(1048576 /* ESSymbol */, "symbol");
        let voidType = createIntrinsicType(16 /* Void */, "void");
        let undefinedType = createIntrinsicType(32 /* Undefined */ | 262144 /* ContainsUndefinedOrNull */, "undefined");
        let nullType = createIntrinsicType(64 /* Null */ | 262144 /* ContainsUndefinedOrNull */, "null");
        let unknownType = createIntrinsicType(1 /* Any */, "unknown");
        let resolvingType = createIntrinsicType(1 /* Any */, "__resolving__");
        let emptyObjectType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        let anyFunctionType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        let noConstraintType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
        let anySignature = createSignature(undefined, undefined, emptyArray, anyType, 0, false, false);
        let unknownSignature = createSignature(undefined, undefined, emptyArray, unknownType, 0, false, false);
        let globals = {};
        let globalArraySymbol;
        let globalESSymbolConstructorSymbol;
        let globalObjectType;
        let globalFunctionType;
        let globalArrayType;
        let globalStringType;
        let globalNumberType;
        let globalBooleanType;
        let globalRegExpType;
        let globalTemplateStringsArrayType;
        let globalESSymbolType;
        let globalIterableType;
        let anyArrayType;
        let globalTypedPropertyDescriptorType;
        let globalClassDecoratorType;
        let globalParameterDecoratorType;
        let globalPropertyDecoratorType;
        let globalMethodDecoratorType;
        let tupleTypes = {};
        let unionTypes = {};
        let stringLiteralTypes = {};
        let emitExtends = false;
        let emitDecorate = false;
        let emitParam = false;
        let mergedSymbols = [];
        let symbolLinks = [];
        let nodeLinks = [];
        let potentialThisCollisions = [];
        let diagnostics = ts.createDiagnosticCollection();
        let primitiveTypeInfo = {
            "string": {
                type: stringType,
                flags: 258 /* StringLike */
            },
            "number": {
                type: numberType,
                flags: 132 /* NumberLike */
            },
            "boolean": {
                type: booleanType,
                flags: 8 /* Boolean */
            },
            "symbol": {
                type: esSymbolType,
                flags: 1048576 /* ESSymbol */
            }
        };
        function getEmitResolver(sourceFile) {
            // Ensure we have all the type information in place for this file so that all the
            // emitter questions of this resolver will return the right information.
            getDiagnostics(sourceFile);
            return emitResolver;
        }
        function error(location, message, arg0, arg1, arg2) {
            let diagnostic = location
                ? ts.createDiagnosticForNode(location, message, arg0, arg1, arg2)
                : ts.createCompilerDiagnostic(message, arg0, arg1, arg2);
            diagnostics.add(diagnostic);
        }
        function createSymbol(flags, name) {
            return new Symbol(flags, name);
        }
        function getExcludedSymbolFlags(flags) {
            let result = 0;
            if (flags & 2 /* BlockScopedVariable */)
                result |= 107455 /* BlockScopedVariableExcludes */;
            if (flags & 1 /* FunctionScopedVariable */)
                result |= 107454 /* FunctionScopedVariableExcludes */;
            if (flags & 4 /* Property */)
                result |= 107455 /* PropertyExcludes */;
            if (flags & 8 /* EnumMember */)
                result |= 107455 /* EnumMemberExcludes */;
            if (flags & 16 /* Function */)
                result |= 106927 /* FunctionExcludes */;
            if (flags & 32 /* Class */)
                result |= 899583 /* ClassExcludes */;
            if (flags & 64 /* Interface */)
                result |= 792992 /* InterfaceExcludes */;
            if (flags & 256 /* RegularEnum */)
                result |= 899327 /* RegularEnumExcludes */;
            if (flags & 128 /* ConstEnum */)
                result |= 899967 /* ConstEnumExcludes */;
            if (flags & 512 /* ValueModule */)
                result |= 106639 /* ValueModuleExcludes */;
            if (flags & 8192 /* Method */)
                result |= 99263 /* MethodExcludes */;
            if (flags & 32768 /* GetAccessor */)
                result |= 41919 /* GetAccessorExcludes */;
            if (flags & 65536 /* SetAccessor */)
                result |= 74687 /* SetAccessorExcludes */;
            if (flags & 262144 /* TypeParameter */)
                result |= 530912 /* TypeParameterExcludes */;
            if (flags & 524288 /* TypeAlias */)
                result |= 793056 /* TypeAliasExcludes */;
            if (flags & 8388608 /* Alias */)
                result |= 8388608 /* AliasExcludes */;
            return result;
        }
        function recordMergedSymbol(target, source) {
            if (!source.mergeId)
                source.mergeId = nextMergeId++;
            mergedSymbols[source.mergeId] = target;
        }
        function cloneSymbol(symbol) {
            let result = createSymbol(symbol.flags | 33554432 /* Merged */, symbol.name);
            result.declarations = symbol.declarations.slice(0);
            result.parent = symbol.parent;
            if (symbol.valueDeclaration)
                result.valueDeclaration = symbol.valueDeclaration;
            if (symbol.constEnumOnlyModule)
                result.constEnumOnlyModule = true;
            if (symbol.members)
                result.members = cloneSymbolTable(symbol.members);
            if (symbol.exports)
                result.exports = cloneSymbolTable(symbol.exports);
            recordMergedSymbol(result, symbol);
            return result;
        }
        function mergeSymbol(target, source) {
            if (!(target.flags & getExcludedSymbolFlags(source.flags))) {
                if (source.flags & 512 /* ValueModule */ && target.flags & 512 /* ValueModule */ && target.constEnumOnlyModule && !source.constEnumOnlyModule) {
                    // reset flag when merging instantiated module into value module that has only const enums
                    target.constEnumOnlyModule = false;
                }
                target.flags |= source.flags;
                if (!target.valueDeclaration && source.valueDeclaration)
                    target.valueDeclaration = source.valueDeclaration;
                ts.forEach(source.declarations, node => {
                    target.declarations.push(node);
                });
                if (source.members) {
                    if (!target.members)
                        target.members = {};
                    mergeSymbolTable(target.members, source.members);
                }
                if (source.exports) {
                    if (!target.exports)
                        target.exports = {};
                    mergeSymbolTable(target.exports, source.exports);
                }
                recordMergedSymbol(target, source);
            }
            else {
                let message = target.flags & 2 /* BlockScopedVariable */ || source.flags & 2 /* BlockScopedVariable */
                    ? ts.Diagnostics.Cannot_redeclare_block_scoped_variable_0 : ts.Diagnostics.Duplicate_identifier_0;
                ts.forEach(source.declarations, node => {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
                ts.forEach(target.declarations, node => {
                    error(node.name ? node.name : node, message, symbolToString(source));
                });
            }
        }
        function cloneSymbolTable(symbolTable) {
            let result = {};
            for (let id in symbolTable) {
                if (ts.hasProperty(symbolTable, id)) {
                    result[id] = symbolTable[id];
                }
            }
            return result;
        }
        function mergeSymbolTable(target, source) {
            for (let id in source) {
                if (ts.hasProperty(source, id)) {
                    if (!ts.hasProperty(target, id)) {
                        target[id] = source[id];
                    }
                    else {
                        let symbol = target[id];
                        if (!(symbol.flags & 33554432 /* Merged */)) {
                            target[id] = symbol = cloneSymbol(symbol);
                        }
                        mergeSymbol(symbol, source[id]);
                    }
                }
            }
        }
        function getSymbolLinks(symbol) {
            if (symbol.flags & 67108864 /* Transient */)
                return symbol;
            var id = getSymbolId(symbol);
            return symbolLinks[id] || (symbolLinks[id] = {});
        }
        function getNodeLinks(node) {
            let nodeId = getNodeId(node);
            return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
        }
        function getSourceFile(node) {
            return ts.getAncestor(node, 227 /* SourceFile */);
        }
        function isGlobalSourceFile(node) {
            return node.kind === 227 /* SourceFile */ && !ts.isExternalModule(node);
        }
        function getSymbol(symbols, name, meaning) {
            if (meaning && ts.hasProperty(symbols, name)) {
                let symbol = symbols[name];
                ts.Debug.assert((symbol.flags & 16777216 /* Instantiated */) === 0, "Should never get an instantiated symbol here.");
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & 8388608 /* Alias */) {
                    let target = resolveAlias(symbol);
                    // Unknown symbol means an error occurred in alias resolution, treat it as positive answer to avoid cascading errors
                    if (target === unknownSymbol || target.flags & meaning) {
                        return symbol;
                    }
                }
            }
            // return undefined if we can't find a symbol.
        }
        /** Returns true if node1 is defined before node 2**/
        function isDefinedBefore(node1, node2) {
            let file1 = ts.getSourceFileOfNode(node1);
            let file2 = ts.getSourceFileOfNode(node2);
            if (file1 === file2) {
                return node1.pos <= node2.pos;
            }
            if (!compilerOptions.out) {
                return true;
            }
            let sourceFiles = host.getSourceFiles();
            return sourceFiles.indexOf(file1) <= sourceFiles.indexOf(file2);
        }
        // Resolve a given name for a given meaning at a given location. An error is reported if the name was not found and
        // the nameNotFoundMessage argument is not undefined. Returns the resolved symbol, or undefined if no symbol with
        // the given name can be found.
        function resolveName(location, name, meaning, nameNotFoundMessage, nameArg) {
            let result;
            let lastLocation;
            let propertyWithInvalidInitializer;
            let errorLocation = location;
            let grandparent;
            loop: while (location) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = getSymbol(location.locals, name, meaning)) {
                        break loop;
                    }
                }
                switch (location.kind) {
                    case 227 /* SourceFile */:
                        if (!ts.isExternalModule(location))
                            break;
                    case 205 /* ModuleDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & 8914931 /* ModuleMember */)) {
                            if (result.flags & meaning || !(result.flags & 8388608 /* Alias */ && getDeclarationOfAliasSymbol(result).kind === 217 /* ExportSpecifier */)) {
                                break loop;
                            }
                            result = undefined;
                        }
                        else if (location.kind === 227 /* SourceFile */) {
                            result = getSymbol(getSymbolOfNode(location).exports, "default", meaning & 8914931 /* ModuleMember */);
                            let localSymbol = ts.getLocalSymbolForExportDefault(result);
                            if (result && (result.flags & meaning) && localSymbol && localSymbol.name === name) {
                                break loop;
                            }
                            result = undefined;
                        }
                        break;
                    case 204 /* EnumDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).exports, name, meaning & 8 /* EnumMember */)) {
                            break loop;
                        }
                        break;
                    case 132 /* PropertyDeclaration */:
                    case 131 /* PropertySignature */:
                        // TypeScript 1.0 spec (April 2014): 8.4.1
                        // Initializer expressions for instance member variables are evaluated in the scope
                        // of the class constructor body but are not permitted to reference parameters or
                        // local variables of the constructor. This effectively means that entities from outer scopes
                        // by the same name as a constructor parameter or local variable are inaccessible
                        // in initializer expressions for instance member variables.
                        if (location.parent.kind === 201 /* ClassDeclaration */ && !(location.flags & 128 /* Static */)) {
                            let ctor = findConstructorDeclaration(location.parent);
                            if (ctor && ctor.locals) {
                                if (getSymbol(ctor.locals, name, meaning & 107455 /* Value */)) {
                                    // Remember the property node, it will be used later to report appropriate error
                                    propertyWithInvalidInitializer = location;
                                }
                            }
                        }
                        break;
                    case 201 /* ClassDeclaration */:
                    case 202 /* InterfaceDeclaration */:
                        if (result = getSymbol(getSymbolOfNode(location).members, name, meaning & 793056 /* Type */)) {
                            if (lastLocation && lastLocation.flags & 128 /* Static */) {
                                // TypeScript 1.0 spec (April 2014): 3.4.1
                                // The scope of a type parameter extends over the entire declaration with which the type
                                // parameter list is associated, with the exception of static member declarations in classes.
                                error(errorLocation, ts.Diagnostics.Static_members_cannot_reference_class_type_parameters);
                                return undefined;
                            }
                            break loop;
                        }
                        break;
                    // It is not legal to reference a class's own type parameters from a computed property name that
                    // belongs to the class. For example:
                    //
                    //   function foo<T>() { return '' }
                    //   class C<T> { // <-- Class's own type parameter T
                    //       [foo<T>()]() { } // <-- Reference to T from class's own computed property
                    //   }
                    //
                    case 127 /* ComputedPropertyName */:
                        grandparent = location.parent.parent;
                        if (grandparent.kind === 201 /* ClassDeclaration */ || grandparent.kind === 202 /* InterfaceDeclaration */) {
                            // A reference to this grandparent's type parameters would be an error
                            if (result = getSymbol(getSymbolOfNode(grandparent).members, name, meaning & 793056 /* Type */)) {
                                error(errorLocation, ts.Diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type);
                                return undefined;
                            }
                        }
                        break;
                    case 134 /* MethodDeclaration */:
                    case 133 /* MethodSignature */:
                    case 135 /* Constructor */:
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                    case 200 /* FunctionDeclaration */:
                    case 163 /* ArrowFunction */:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        break;
                    case 162 /* FunctionExpression */:
                        if (name === "arguments") {
                            result = argumentsSymbol;
                            break loop;
                        }
                        let functionName = location.name;
                        if (functionName && name === functionName.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                    case 174 /* ClassExpression */:
                        let className = location.name;
                        if (className && name === className.text) {
                            result = location.symbol;
                            break loop;
                        }
                        break;
                    case 130 /* Decorator */:
                        // Decorators are resolved at the class declaration. Resolving at the parameter 
                        // or member would result in looking up locals in the method.
                        //
                        //   function y() {}
                        //   class C {
                        //       method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
                        //   }
                        //
                        if (location.parent && location.parent.kind === 129 /* Parameter */) {
                            location = location.parent;
                        }
                        //
                        //   function y() {}
                        //   class C {
                        //       @y method(x, y) {} // <-- decorator y should be resolved at the class declaration, not the method.
                        //   }
                        //
                        if (location.parent && ts.isClassElement(location.parent)) {
                            location = location.parent;
                        }
                        break;
                }
                lastLocation = location;
                location = location.parent;
            }
            if (!result) {
                result = getSymbol(globals, name, meaning);
            }
            if (!result) {
                if (nameNotFoundMessage) {
                    error(errorLocation, nameNotFoundMessage, typeof nameArg === "string" ? nameArg : ts.declarationNameToString(nameArg));
                }
                return undefined;
            }
            // Perform extra checks only if error reporting was requested
            if (nameNotFoundMessage) {
                if (propertyWithInvalidInitializer) {
                    // We have a match, but the reference occurred within a property initializer and the identifier also binds
                    // to a local variable in the constructor where the code will be emitted.
                    let propertyName = propertyWithInvalidInitializer.name;
                    error(errorLocation, ts.Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor, ts.declarationNameToString(propertyName), typeof nameArg === "string" ? nameArg : ts.declarationNameToString(nameArg));
                    return undefined;
                }
                if (result.flags & 2 /* BlockScopedVariable */) {
                    checkResolvedBlockScopedVariable(result, errorLocation);
                }
            }
            return result;
        }
        function checkResolvedBlockScopedVariable(result, errorLocation) {
            ts.Debug.assert((result.flags & 2 /* BlockScopedVariable */) !== 0);
            // Block-scoped variables cannot be used before their definition
            let declaration = ts.forEach(result.declarations, d => ts.isBlockOrCatchScoped(d) ? d : undefined);
            ts.Debug.assert(declaration !== undefined, "Block-scoped variable declaration is undefined");
            // first check if usage is lexically located after the declaration
            let isUsedBeforeDeclaration = !isDefinedBefore(declaration, errorLocation);
            if (!isUsedBeforeDeclaration) {
                // lexical check succeeded however code still can be illegal.
                // - block scoped variables cannot be used in its initializers
                //   let x = x; // illegal but usage is lexically after definition
                // - in ForIn/ForOf statements variable cannot be contained in expression part
                //   for (let x in x)
                //   for (let x of x)
                // climb up to the variable declaration skipping binding patterns
                let variableDeclaration = ts.getAncestor(declaration, 198 /* VariableDeclaration */);
                let container = ts.getEnclosingBlockScopeContainer(variableDeclaration);
                if (variableDeclaration.parent.parent.kind === 180 /* VariableStatement */ ||
                    variableDeclaration.parent.parent.kind === 186 /* ForStatement */) {
                    // variable statement/for statement case,
                    // use site should not be inside variable declaration (initializer of declaration or binding element)
                    isUsedBeforeDeclaration = isSameScopeDescendentOf(errorLocation, variableDeclaration, container);
                }
                else if (variableDeclaration.parent.parent.kind === 188 /* ForOfStatement */ ||
                    variableDeclaration.parent.parent.kind === 187 /* ForInStatement */) {
                    // ForIn/ForOf case - use site should not be used in expression part
                    let expression = variableDeclaration.parent.parent.expression;
                    isUsedBeforeDeclaration = isSameScopeDescendentOf(errorLocation, expression, container);
                }
            }
            if (isUsedBeforeDeclaration) {
                error(errorLocation, ts.Diagnostics.Block_scoped_variable_0_used_before_its_declaration, ts.declarationNameToString(declaration.name));
            }
        }
        /* Starting from 'initial' node walk up the parent chain until 'stopAt' node is reached.
         * If at any point current node is equal to 'parent' node - return true.
         * Return false if 'stopAt' node is reached or isFunctionLike(current) === true.
         */
        function isSameScopeDescendentOf(initial, parent, stopAt) {
            if (!parent) {
                return false;
            }
            for (let current = initial; current && current !== stopAt && !ts.isFunctionLike(current); current = current.parent) {
                if (current === parent) {
                    return true;
                }
            }
            return false;
        }
        function getAnyImportSyntax(node) {
            if (ts.isAliasSymbolDeclaration(node)) {
                if (node.kind === 208 /* ImportEqualsDeclaration */) {
                    return node;
                }
                while (node && node.kind !== 209 /* ImportDeclaration */) {
                    node = node.parent;
                }
                return node;
            }
        }
        function getDeclarationOfAliasSymbol(symbol) {
            return ts.forEach(symbol.declarations, d => ts.isAliasSymbolDeclaration(d) ? d : undefined);
        }
        function getTargetOfImportEqualsDeclaration(node) {
            if (node.moduleReference.kind === 219 /* ExternalModuleReference */) {
                return resolveExternalModuleSymbol(resolveExternalModuleName(node, ts.getExternalModuleImportEqualsDeclarationExpression(node)));
            }
            return getSymbolOfPartOfRightHandSideOfImportEquals(node.moduleReference, node);
        }
        function getTargetOfImportClause(node) {
            let moduleSymbol = resolveExternalModuleName(node, node.parent.moduleSpecifier);
            if (moduleSymbol) {
                let exportDefaultSymbol = resolveSymbol(moduleSymbol.exports["default"]);
                if (!exportDefaultSymbol) {
                    error(node.name, ts.Diagnostics.External_module_0_has_no_default_export, symbolToString(moduleSymbol));
                }
                return exportDefaultSymbol;
            }
        }
        function getTargetOfNamespaceImport(node) {
            var moduleSpecifier = node.parent.parent.moduleSpecifier;
            return resolveESModuleSymbol(resolveExternalModuleName(node, moduleSpecifier), moduleSpecifier);
        }
        function getMemberOfModuleVariable(moduleSymbol, name) {
            if (moduleSymbol.flags & 3 /* Variable */) {
                let typeAnnotation = moduleSymbol.valueDeclaration.type;
                if (typeAnnotation) {
                    return getPropertyOfType(getTypeFromTypeNodeOrHeritageClauseElement(typeAnnotation), name);
                }
            }
        }
        // This function creates a synthetic symbol that combines the value side of one symbol with the
        // type/namespace side of another symbol. Consider this example:
        //
        //   declare module graphics {
        //       interface Point {
        //           x: number;
        //           y: number;
        //       }
        //   }
        //   declare var graphics: {
        //       Point: new (x: number, y: number) => graphics.Point;
        //   }
        //   declare module "graphics" {
        //       export = graphics;
        //   }
        //
        // An 'import { Point } from "graphics"' needs to create a symbol that combines the value side 'Point'
        // property with the type/namespace side interface 'Point'.
        function combineValueAndTypeSymbols(valueSymbol, typeSymbol) {
            if (valueSymbol.flags & (793056 /* Type */ | 1536 /* Namespace */)) {
                return valueSymbol;
            }
            let result = createSymbol(valueSymbol.flags | typeSymbol.flags, valueSymbol.name);
            result.declarations = ts.concatenate(valueSymbol.declarations, typeSymbol.declarations);
            result.parent = valueSymbol.parent || typeSymbol.parent;
            if (valueSymbol.valueDeclaration)
                result.valueDeclaration = valueSymbol.valueDeclaration;
            if (typeSymbol.members)
                result.members = typeSymbol.members;
            if (valueSymbol.exports)
                result.exports = valueSymbol.exports;
            return result;
        }
        function getExportOfModule(symbol, name) {
            if (symbol.flags & 1536 /* Module */) {
                let exports = getExportsOfSymbol(symbol);
                if (ts.hasProperty(exports, name)) {
                    return resolveSymbol(exports[name]);
                }
            }
        }
        function getPropertyOfVariable(symbol, name) {
            if (symbol.flags & 3 /* Variable */) {
                var typeAnnotation = symbol.valueDeclaration.type;
                if (typeAnnotation) {
                    return resolveSymbol(getPropertyOfType(getTypeFromTypeNodeOrHeritageClauseElement(typeAnnotation), name));
                }
            }
        }
        function getExternalModuleMember(node, specifier) {
            let moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
            let targetSymbol = resolveESModuleSymbol(moduleSymbol, node.moduleSpecifier);
            if (targetSymbol) {
                let name = specifier.propertyName || specifier.name;
                if (name.text) {
                    let symbolFromModule = getExportOfModule(targetSymbol, name.text);
                    let symbolFromVariable = getPropertyOfVariable(targetSymbol, name.text);
                    let symbol = symbolFromModule && symbolFromVariable ?
                        combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule) :
                        symbolFromModule || symbolFromVariable;
                    if (!symbol) {
                        error(name, ts.Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(moduleSymbol), ts.declarationNameToString(name));
                    }
                    return symbol;
                }
            }
        }
        function getTargetOfImportSpecifier(node) {
            return getExternalModuleMember(node.parent.parent.parent, node);
        }
        function getTargetOfExportSpecifier(node) {
            return node.parent.parent.moduleSpecifier ?
                getExternalModuleMember(node.parent.parent, node) :
                resolveEntityName(node.propertyName || node.name, 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */);
        }
        function getTargetOfExportAssignment(node) {
            return resolveEntityName(node.expression, 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */);
        }
        function getTargetOfAliasDeclaration(node) {
            switch (node.kind) {
                case 208 /* ImportEqualsDeclaration */:
                    return getTargetOfImportEqualsDeclaration(node);
                case 210 /* ImportClause */:
                    return getTargetOfImportClause(node);
                case 211 /* NamespaceImport */:
                    return getTargetOfNamespaceImport(node);
                case 213 /* ImportSpecifier */:
                    return getTargetOfImportSpecifier(node);
                case 217 /* ExportSpecifier */:
                    return getTargetOfExportSpecifier(node);
                case 214 /* ExportAssignment */:
                    return getTargetOfExportAssignment(node);
            }
        }
        function resolveSymbol(symbol) {
            return symbol && symbol.flags & 8388608 /* Alias */ && !(symbol.flags & (107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */)) ? resolveAlias(symbol) : symbol;
        }
        function resolveAlias(symbol) {
            ts.Debug.assert((symbol.flags & 8388608 /* Alias */) !== 0, "Should only get Alias here.");
            let links = getSymbolLinks(symbol);
            if (!links.target) {
                links.target = resolvingSymbol;
                let node = getDeclarationOfAliasSymbol(symbol);
                let target = getTargetOfAliasDeclaration(node);
                if (links.target === resolvingSymbol) {
                    links.target = target || unknownSymbol;
                }
                else {
                    error(node, ts.Diagnostics.Circular_definition_of_import_alias_0, symbolToString(symbol));
                }
            }
            else if (links.target === resolvingSymbol) {
                links.target = unknownSymbol;
            }
            return links.target;
        }
        function markExportAsReferenced(node) {
            let symbol = getSymbolOfNode(node);
            let target = resolveAlias(symbol);
            if (target) {
                let markAlias = (target === unknownSymbol && compilerOptions.separateCompilation) ||
                    (target !== unknownSymbol && (target.flags & 107455 /* Value */) && !isConstEnumOrConstEnumOnlyModule(target));
                if (markAlias) {
                    markAliasSymbolAsReferenced(symbol);
                }
            }
        }
        // When an alias symbol is referenced, we need to mark the entity it references as referenced and in turn repeat that until
        // we reach a non-alias or an exported entity (which is always considered referenced). We do this by checking the target of
        // the alias as an expression (which recursively takes us back here if the target references another alias).
        function markAliasSymbolAsReferenced(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.referenced) {
                links.referenced = true;
                let node = getDeclarationOfAliasSymbol(symbol);
                if (node.kind === 214 /* ExportAssignment */) {
                    // export default <symbol>
                    checkExpressionCached(node.expression);
                }
                else if (node.kind === 217 /* ExportSpecifier */) {
                    // export { <symbol> } or export { <symbol> as foo }
                    checkExpressionCached(node.propertyName || node.name);
                }
                else if (ts.isInternalModuleImportEqualsDeclaration(node)) {
                    // import foo = <symbol>
                    checkExpressionCached(node.moduleReference);
                }
            }
        }
        // This function is only for imports with entity names
        function getSymbolOfPartOfRightHandSideOfImportEquals(entityName, importDeclaration) {
            if (!importDeclaration) {
                importDeclaration = ts.getAncestor(entityName, 208 /* ImportEqualsDeclaration */);
                ts.Debug.assert(importDeclaration !== undefined);
            }
            // There are three things we might try to look for. In the following examples,
            // the search term is enclosed in |...|:
            //
            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace
            if (entityName.kind === 65 /* Identifier */ && ts.isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            // Check for case 1 and 3 in the above example
            if (entityName.kind === 65 /* Identifier */ || entityName.parent.kind === 126 /* QualifiedName */) {
                return resolveEntityName(entityName, 1536 /* Namespace */);
            }
            else {
                // Case 2 in above example
                // entityName.kind could be a QualifiedName or a Missing identifier
                ts.Debug.assert(entityName.parent.kind === 208 /* ImportEqualsDeclaration */);
                return resolveEntityName(entityName, 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */);
            }
        }
        function getFullyQualifiedName(symbol) {
            return symbol.parent ? getFullyQualifiedName(symbol.parent) + "." + symbolToString(symbol) : symbolToString(symbol);
        }
        // Resolves a qualified name and any involved aliases
        function resolveEntityName(name, meaning) {
            if (ts.nodeIsMissing(name)) {
                return undefined;
            }
            let symbol;
            if (name.kind === 65 /* Identifier */) {
                symbol = resolveName(name, name.text, meaning, ts.Diagnostics.Cannot_find_name_0, name);
                if (!symbol) {
                    return undefined;
                }
            }
            else if (name.kind === 126 /* QualifiedName */ || name.kind === 155 /* PropertyAccessExpression */) {
                let left = name.kind === 126 /* QualifiedName */ ? name.left : name.expression;
                let right = name.kind === 126 /* QualifiedName */ ? name.right : name.name;
                let namespace = resolveEntityName(left, 1536 /* Namespace */);
                if (!namespace || namespace === unknownSymbol || ts.nodeIsMissing(right)) {
                    return undefined;
                }
                symbol = getSymbol(getExportsOfSymbol(namespace), right.text, meaning);
                if (!symbol) {
                    error(right, ts.Diagnostics.Module_0_has_no_exported_member_1, getFullyQualifiedName(namespace), ts.declarationNameToString(right));
                    return undefined;
                }
            }
            else {
                ts.Debug.fail("Unknown entity name kind.");
            }
            ts.Debug.assert((symbol.flags & 16777216 /* Instantiated */) === 0, "Should never get an instantiated symbol here.");
            return symbol.flags & meaning ? symbol : resolveAlias(symbol);
        }
        function isExternalModuleNameRelative(moduleName) {
            // TypeScript 1.0 spec (April 2014): 11.2.1
            // An external module name is "relative" if the first term is "." or "..".
            return moduleName.substr(0, 2) === "./" || moduleName.substr(0, 3) === "../" || moduleName.substr(0, 2) === ".\\" || moduleName.substr(0, 3) === "..\\";
        }
        function resolveExternalModuleName(location, moduleReferenceExpression) {
            if (moduleReferenceExpression.kind !== 8 /* StringLiteral */) {
                return;
            }
            let moduleReferenceLiteral = moduleReferenceExpression;
            let searchPath = ts.getDirectoryPath(getSourceFile(location).fileName);
            // Module names are escaped in our symbol table.  However, string literal values aren't.
            // Escape the name in the "require(...)" clause to ensure we find the right symbol.
            let moduleName = ts.escapeIdentifier(moduleReferenceLiteral.text);
            if (!moduleName)
                return;
            let isRelative = isExternalModuleNameRelative(moduleName);
            if (!isRelative) {
                let symbol = getSymbol(globals, '"' + moduleName + '"', 512 /* ValueModule */);
                if (symbol) {
                    return symbol;
                }
            }
            let sourceFile;
            while (true) {
                let fileName = ts.normalizePath(ts.combinePaths(searchPath, moduleName));
                sourceFile = host.getSourceFile(fileName + ".ts") || host.getSourceFile(fileName + ".d.ts");
                if (sourceFile || isRelative) {
                    break;
                }
                let parentPath = ts.getDirectoryPath(searchPath);
                if (parentPath === searchPath) {
                    break;
                }
                searchPath = parentPath;
            }
            if (sourceFile) {
                if (sourceFile.symbol) {
                    return sourceFile.symbol;
                }
                error(moduleReferenceLiteral, ts.Diagnostics.File_0_is_not_an_external_module, sourceFile.fileName);
                return;
            }
            error(moduleReferenceLiteral, ts.Diagnostics.Cannot_find_external_module_0, moduleName);
        }
        // An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
        // and an external module with no 'export =' declaration resolves to the module itself.
        function resolveExternalModuleSymbol(moduleSymbol) {
            return moduleSymbol && resolveSymbol(moduleSymbol.exports["export="]) || moduleSymbol;
        }
        // An external module with an 'export =' declaration may be referenced as an ES6 module provided the 'export ='
        // references a symbol that is at least declared as a module or a variable. The target of the 'export =' may
        // combine other declarations with the module or variable (e.g. a class/module, function/module, interface/variable).
        function resolveESModuleSymbol(moduleSymbol, moduleReferenceExpression) {
            let symbol = resolveExternalModuleSymbol(moduleSymbol);
            if (symbol && !(symbol.flags & (1536 /* Module */ | 3 /* Variable */))) {
                error(moduleReferenceExpression, ts.Diagnostics.External_module_0_resolves_to_a_non_module_entity_and_cannot_be_imported_using_this_construct, symbolToString(moduleSymbol));
                symbol = undefined;
            }
            return symbol;
        }
        function getExportAssignmentSymbol(moduleSymbol) {
            return moduleSymbol.exports["export="];
        }
        function getExportsOfModuleAsArray(moduleSymbol) {
            return symbolsToArray(getExportsOfModule(moduleSymbol));
        }
        function getExportsOfSymbol(symbol) {
            return symbol.flags & 1536 /* Module */ ? getExportsOfModule(symbol) : symbol.exports || emptySymbols;
        }
        function getExportsOfModule(moduleSymbol) {
            let links = getSymbolLinks(moduleSymbol);
            return links.resolvedExports || (links.resolvedExports = getExportsForModule(moduleSymbol));
        }
        function extendExportSymbols(target, source) {
            for (let id in source) {
                if (id !== "default" && !ts.hasProperty(target, id)) {
                    target[id] = source[id];
                }
            }
        }
        function getExportsForModule(moduleSymbol) {
            let result;
            let visitedSymbols = [];
            visit(moduleSymbol);
            return result || moduleSymbol.exports;
            // The ES6 spec permits export * declarations in a module to circularly reference the module itself. For example,
            // module 'a' can 'export * from "b"' and 'b' can 'export * from "a"' without error.
            function visit(symbol) {
                if (symbol && symbol.flags & 1952 /* HasExports */ && !ts.contains(visitedSymbols, symbol)) {
                    visitedSymbols.push(symbol);
                    if (symbol !== moduleSymbol) {
                        if (!result) {
                            result = cloneSymbolTable(moduleSymbol.exports);
                        }
                        extendExportSymbols(result, symbol.exports);
                    }
                    // All export * declarations are collected in an __export symbol by the binder
                    let exportStars = symbol.exports["__export"];
                    if (exportStars) {
                        for (let node of exportStars.declarations) {
                            visit(resolveExternalModuleName(node, node.moduleSpecifier));
                        }
                    }
                }
            }
        }
        function getMergedSymbol(symbol) {
            let merged;
            return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
        }
        function getSymbolOfNode(node) {
            return getMergedSymbol(node.symbol);
        }
        function getParentOfSymbol(symbol) {
            return getMergedSymbol(symbol.parent);
        }
        function getExportSymbolOfValueSymbolIfExported(symbol) {
            return symbol && (symbol.flags & 1048576 /* ExportValue */) !== 0
                ? getMergedSymbol(symbol.exportSymbol)
                : symbol;
        }
        function symbolIsValue(symbol) {
            // If it is an instantiated symbol, then it is a value if the symbol it is an
            // instantiation of is a value.
            if (symbol.flags & 16777216 /* Instantiated */) {
                return symbolIsValue(getSymbolLinks(symbol).target);
            }
            // If the symbol has the value flag, it is trivially a value.
            if (symbol.flags & 107455 /* Value */) {
                return true;
            }
            // If it is an alias, then it is a value if the symbol it resolves to is a value.
            if (symbol.flags & 8388608 /* Alias */) {
                return (resolveAlias(symbol).flags & 107455 /* Value */) !== 0;
            }
            return false;
        }
        function findConstructorDeclaration(node) {
            let members = node.members;
            for (let member of members) {
                if (member.kind === 135 /* Constructor */ && ts.nodeIsPresent(member.body)) {
                    return member;
                }
            }
        }
        function createType(flags) {
            let result = new Type(checker, flags);
            result.id = typeCount++;
            return result;
        }
        function createIntrinsicType(kind, intrinsicName) {
            let type = createType(kind);
            type.intrinsicName = intrinsicName;
            return type;
        }
        function createObjectType(kind, symbol) {
            let type = createType(kind);
            type.symbol = symbol;
            return type;
        }
        // A reserved member name starts with two underscores, but the third character cannot be an underscore
        // or the @ symbol. A third underscore indicates an escaped form of an identifer that started
        // with at least two underscores. The @ character indicates that the name is denoted by a well known ES
        // Symbol instance.
        function isReservedMemberName(name) {
            return name.charCodeAt(0) === 95 /* _ */ &&
                name.charCodeAt(1) === 95 /* _ */ &&
                name.charCodeAt(2) !== 95 /* _ */ &&
                name.charCodeAt(2) !== 64 /* at */;
        }
        function getNamedMembers(members) {
            let result;
            for (let id in members) {
                if (ts.hasProperty(members, id)) {
                    if (!isReservedMemberName(id)) {
                        if (!result)
                            result = [];
                        let symbol = members[id];
                        if (symbolIsValue(symbol)) {
                            result.push(symbol);
                        }
                    }
                }
            }
            return result || emptyArray;
        }
        function setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            type.members = members;
            type.properties = getNamedMembers(members);
            type.callSignatures = callSignatures;
            type.constructSignatures = constructSignatures;
            if (stringIndexType)
                type.stringIndexType = stringIndexType;
            if (numberIndexType)
                type.numberIndexType = numberIndexType;
            return type;
        }
        function createAnonymousType(symbol, members, callSignatures, constructSignatures, stringIndexType, numberIndexType) {
            return setObjectTypeMembers(createObjectType(32768 /* Anonymous */, symbol), members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function forEachSymbolTableInScope(enclosingDeclaration, callback) {
            let result;
            for (let location = enclosingDeclaration; location; location = location.parent) {
                // Locals of a source file are not in scope (because they get merged into the global symbol table)
                if (location.locals && !isGlobalSourceFile(location)) {
                    if (result = callback(location.locals)) {
                        return result;
                    }
                }
                switch (location.kind) {
                    case 227 /* SourceFile */:
                        if (!ts.isExternalModule(location)) {
                            break;
                        }
                    case 205 /* ModuleDeclaration */:
                        if (result = callback(getSymbolOfNode(location).exports)) {
                            return result;
                        }
                        break;
                    case 201 /* ClassDeclaration */:
                    case 202 /* InterfaceDeclaration */:
                        if (result = callback(getSymbolOfNode(location).members)) {
                            return result;
                        }
                        break;
                }
            }
            return callback(globals);
        }
        function getQualifiedLeftMeaning(rightMeaning) {
            // If we are looking in value space, the parent meaning is value, other wise it is namespace
            return rightMeaning === 107455 /* Value */ ? 107455 /* Value */ : 1536 /* Namespace */;
        }
        function getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing) {
            function getAccessibleSymbolChainFromSymbolTable(symbols) {
                function canQualifySymbol(symbolFromSymbolTable, meaning) {
                    // If the symbol is equivalent and doesn't need further qualification, this symbol is accessible
                    if (!needsQualification(symbolFromSymbolTable, enclosingDeclaration, meaning)) {
                        return true;
                    }
                    // If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
                    let accessibleParent = getAccessibleSymbolChain(symbolFromSymbolTable.parent, enclosingDeclaration, getQualifiedLeftMeaning(meaning), useOnlyExternalAliasing);
                    return !!accessibleParent;
                }
                function isAccessible(symbolFromSymbolTable, resolvedAliasSymbol) {
                    if (symbol === (resolvedAliasSymbol || symbolFromSymbolTable)) {
                        // if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
                        // and if symbolfrom symbolTable or alias resolution matches the symbol,
                        // check the symbol can be qualified, it is only then this symbol is accessible
                        return !ts.forEach(symbolFromSymbolTable.declarations, hasExternalModuleSymbol) &&
                            canQualifySymbol(symbolFromSymbolTable, meaning);
                    }
                }
                // If symbol is directly available by its name in the symbol table
                if (isAccessible(ts.lookUp(symbols, symbol.name))) {
                    return [symbol];
                }
                // Check if symbol is any of the alias
                return ts.forEachValue(symbols, symbolFromSymbolTable => {
                    if (symbolFromSymbolTable.flags & 8388608 /* Alias */ && symbolFromSymbolTable.name !== "export=") {
                        if (!useOnlyExternalAliasing ||
                            // Is this external alias, then use it to name
                            ts.forEach(symbolFromSymbolTable.declarations, ts.isExternalModuleImportEqualsDeclaration)) {
                            let resolvedImportedSymbol = resolveAlias(symbolFromSymbolTable);
                            if (isAccessible(symbolFromSymbolTable, resolveAlias(symbolFromSymbolTable))) {
                                return [symbolFromSymbolTable];
                            }
                            // Look in the exported members, if we can find accessibleSymbolChain, symbol is accessible using this chain
                            // but only if the symbolFromSymbolTable can be qualified
                            let accessibleSymbolsFromExports = resolvedImportedSymbol.exports ? getAccessibleSymbolChainFromSymbolTable(resolvedImportedSymbol.exports) : undefined;
                            if (accessibleSymbolsFromExports && canQualifySymbol(symbolFromSymbolTable, getQualifiedLeftMeaning(meaning))) {
                                return [symbolFromSymbolTable].concat(accessibleSymbolsFromExports);
                            }
                        }
                    }
                });
            }
            if (symbol) {
                return forEachSymbolTableInScope(enclosingDeclaration, getAccessibleSymbolChainFromSymbolTable);
            }
        }
        function needsQualification(symbol, enclosingDeclaration, meaning) {
            let qualify = false;
            forEachSymbolTableInScope(enclosingDeclaration, symbolTable => {
                // If symbol of this name is not available in the symbol table we are ok
                if (!ts.hasProperty(symbolTable, symbol.name)) {
                    // Continue to the next symbol table
                    return false;
                }
                // If the symbol with this name is present it should refer to the symbol
                let symbolFromSymbolTable = symbolTable[symbol.name];
                if (symbolFromSymbolTable === symbol) {
                    // No need to qualify
                    return true;
                }
                // Qualify if the symbol from symbol table has same meaning as expected
                symbolFromSymbolTable = (symbolFromSymbolTable.flags & 8388608 /* Alias */) ? resolveAlias(symbolFromSymbolTable) : symbolFromSymbolTable;
                if (symbolFromSymbolTable.flags & meaning) {
                    qualify = true;
                    return true;
                }
                // Continue to the next symbol table
                return false;
            });
            return qualify;
        }
        function isSymbolAccessible(symbol, enclosingDeclaration, meaning) {
            if (symbol && enclosingDeclaration && !(symbol.flags & 262144 /* TypeParameter */)) {
                let initialSymbol = symbol;
                let meaningToLook = meaning;
                while (symbol) {
                    // Symbol is accessible if it by itself is accessible
                    let accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaningToLook, false);
                    if (accessibleSymbolChain) {
                        let hasAccessibleDeclarations = hasVisibleDeclarations(accessibleSymbolChain[0]);
                        if (!hasAccessibleDeclarations) {
                            return {
                                accessibility: 1 /* NotAccessible */,
                                errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                                errorModuleName: symbol !== initialSymbol ? symbolToString(symbol, enclosingDeclaration, 1536 /* Namespace */) : undefined,
                            };
                        }
                        return hasAccessibleDeclarations;
                    }
                    // If we haven't got the accessible symbol, it doesn't mean the symbol is actually inaccessible.
                    // It could be a qualified symbol and hence verify the path
                    // e.g.:
                    // module m {
                    //     export class c {
                    //     }
                    // }
                    // let x: typeof m.c
                    // In the above example when we start with checking if typeof m.c symbol is accessible,
                    // we are going to see if c can be accessed in scope directly.
                    // But it can't, hence the accessible is going to be undefined, but that doesn't mean m.c is inaccessible
                    // It is accessible if the parent m is accessible because then m.c can be accessed through qualification
                    meaningToLook = getQualifiedLeftMeaning(meaning);
                    symbol = getParentOfSymbol(symbol);
                }
                // This could be a symbol that is not exported in the external module
                // or it could be a symbol from different external module that is not aliased and hence cannot be named
                let symbolExternalModule = ts.forEach(initialSymbol.declarations, getExternalModuleContainer);
                if (symbolExternalModule) {
                    let enclosingExternalModule = getExternalModuleContainer(enclosingDeclaration);
                    if (symbolExternalModule !== enclosingExternalModule) {
                        // name from different external module that is not visible
                        return {
                            accessibility: 2 /* CannotBeNamed */,
                            errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                            errorModuleName: symbolToString(symbolExternalModule)
                        };
                    }
                }
                // Just a local name that is not accessible
                return {
                    accessibility: 1 /* NotAccessible */,
                    errorSymbolName: symbolToString(initialSymbol, enclosingDeclaration, meaning),
                };
            }
            return { accessibility: 0 /* Accessible */ };
            function getExternalModuleContainer(declaration) {
                for (; declaration; declaration = declaration.parent) {
                    if (hasExternalModuleSymbol(declaration)) {
                        return getSymbolOfNode(declaration);
                    }
                }
            }
        }
        function hasExternalModuleSymbol(declaration) {
            return (declaration.kind === 205 /* ModuleDeclaration */ && declaration.name.kind === 8 /* StringLiteral */) ||
                (declaration.kind === 227 /* SourceFile */ && ts.isExternalModule(declaration));
        }
        function hasVisibleDeclarations(symbol) {
            let aliasesToMakeVisible;
            if (ts.forEach(symbol.declarations, declaration => !getIsDeclarationVisible(declaration))) {
                return undefined;
            }
            return { accessibility: 0 /* Accessible */, aliasesToMakeVisible };
            function getIsDeclarationVisible(declaration) {
                if (!isDeclarationVisible(declaration)) {
                    // Mark the unexported alias as visible if its parent is visible
                    // because these kind of aliases can be used to name types in declaration file
                    var anyImportSyntax = getAnyImportSyntax(declaration);
                    if (anyImportSyntax &&
                        !(anyImportSyntax.flags & 1 /* Export */) &&
                        isDeclarationVisible(anyImportSyntax.parent)) {
                        getNodeLinks(declaration).isVisible = true;
                        if (aliasesToMakeVisible) {
                            if (!ts.contains(aliasesToMakeVisible, anyImportSyntax)) {
                                aliasesToMakeVisible.push(anyImportSyntax);
                            }
                        }
                        else {
                            aliasesToMakeVisible = [anyImportSyntax];
                        }
                        return true;
                    }
                    // Declaration is not visible
                    return false;
                }
                return true;
            }
        }
        function isEntityNameVisible(entityName, enclosingDeclaration) {
            // get symbol of the first identifier of the entityName
            let meaning;
            if (entityName.parent.kind === 144 /* TypeQuery */) {
                // Typeof value
                meaning = 107455 /* Value */ | 1048576 /* ExportValue */;
            }
            else if (entityName.kind === 126 /* QualifiedName */ || entityName.kind === 155 /* PropertyAccessExpression */ ||
                entityName.parent.kind === 208 /* ImportEqualsDeclaration */) {
                // Left identifier from type reference or TypeAlias
                // Entity name of the import declaration
                meaning = 1536 /* Namespace */;
            }
            else {
                // Type Reference or TypeAlias entity = Identifier
                meaning = 793056 /* Type */;
            }
            let firstIdentifier = getFirstIdentifier(entityName);
            let symbol = resolveName(enclosingDeclaration, firstIdentifier.text, meaning, undefined, undefined);
            // Verify if the symbol is accessible
            return (symbol && hasVisibleDeclarations(symbol)) || {
                accessibility: 1 /* NotAccessible */,
                errorSymbolName: ts.getTextOfNode(firstIdentifier),
                errorNode: firstIdentifier
            };
        }
        function writeKeyword(writer, kind) {
            writer.writeKeyword(ts.tokenToString(kind));
        }
        function writePunctuation(writer, kind) {
            writer.writePunctuation(ts.tokenToString(kind));
        }
        function writeSpace(writer) {
            writer.writeSpace(" ");
        }
        function symbolToString(symbol, enclosingDeclaration, meaning) {
            let writer = ts.getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning);
            let result = writer.string();
            ts.releaseStringWriter(writer);
            return result;
        }
        function typeToString(type, enclosingDeclaration, flags) {
            let writer = ts.getSingleLineStringWriter();
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
            let result = writer.string();
            ts.releaseStringWriter(writer);
            let maxLength = compilerOptions.noErrorTruncation || flags & 4 /* NoTruncation */ ? undefined : 100;
            if (maxLength && result.length >= maxLength) {
                result = result.substr(0, maxLength - "...".length) + "...";
            }
            return result;
        }
        function getTypeAliasForTypeLiteral(type) {
            if (type.symbol && type.symbol.flags & 2048 /* TypeLiteral */) {
                let node = type.symbol.declarations[0].parent;
                while (node.kind === 149 /* ParenthesizedType */) {
                    node = node.parent;
                }
                if (node.kind === 203 /* TypeAliasDeclaration */) {
                    return getSymbolOfNode(node);
                }
            }
            return undefined;
        }
        // This is for caching the result of getSymbolDisplayBuilder. Do not access directly.
        let _displayBuilder;
        function getSymbolDisplayBuilder() {
            /**
             * Writes only the name of the symbol out to the writer. Uses the original source text
             * for the name of the symbol if it is available to match how the user inputted the name.
             */
            function appendSymbolNameOnly(symbol, writer) {
                if (symbol.declarations && symbol.declarations.length > 0) {
                    let declaration = symbol.declarations[0];
                    if (declaration.name) {
                        writer.writeSymbol(ts.declarationNameToString(declaration.name), symbol);
                        return;
                    }
                }
                writer.writeSymbol(symbol.name, symbol);
            }
            /**
             * Enclosing declaration is optional when we don't want to get qualified name in the enclosing declaration scope
             * Meaning needs to be specified if the enclosing declaration is given
             */
            function buildSymbolDisplay(symbol, writer, enclosingDeclaration, meaning, flags, typeFlags) {
                let parentSymbol;
                function appendParentTypeArgumentsAndSymbolName(symbol) {
                    if (parentSymbol) {
                        // Write type arguments of instantiated class/interface here
                        if (flags & 1 /* WriteTypeParametersOrArguments */) {
                            if (symbol.flags & 16777216 /* Instantiated */) {
                                buildDisplayForTypeArgumentsAndDelimiters(getTypeParametersOfClassOrInterface(parentSymbol), symbol.mapper, writer, enclosingDeclaration);
                            }
                            else {
                                buildTypeParameterDisplayFromSymbol(parentSymbol, writer, enclosingDeclaration);
                            }
                        }
                        writePunctuation(writer, 20 /* DotToken */);
                    }
                    parentSymbol = symbol;
                    appendSymbolNameOnly(symbol, writer);
                }
                // Let the writer know we just wrote out a symbol.  The declaration emitter writer uses
                // this to determine if an import it has previously seen (and not written out) needs
                // to be written to the file once the walk of the tree is complete.
                //
                // NOTE(cyrusn): This approach feels somewhat unfortunate.  A simple pass over the tree
                // up front (for example, during checking) could determine if we need to emit the imports
                // and we could then access that data during declaration emit.
                writer.trackSymbol(symbol, enclosingDeclaration, meaning);
                function walkSymbol(symbol, meaning) {
                    if (symbol) {
                        let accessibleSymbolChain = getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, !!(flags & 2 /* UseOnlyExternalAliasing */));
                        if (!accessibleSymbolChain ||
                            needsQualification(accessibleSymbolChain[0], enclosingDeclaration, accessibleSymbolChain.length === 1 ? meaning : getQualifiedLeftMeaning(meaning))) {
                            // Go up and add our parent.
                            walkSymbol(getParentOfSymbol(accessibleSymbolChain ? accessibleSymbolChain[0] : symbol), getQualifiedLeftMeaning(meaning));
                        }
                        if (accessibleSymbolChain) {
                            for (let accessibleSymbol of accessibleSymbolChain) {
                                appendParentTypeArgumentsAndSymbolName(accessibleSymbol);
                            }
                        }
                        else {
                            // If we didn't find accessible symbol chain for this symbol, break if this is external module
                            if (!parentSymbol && ts.forEach(symbol.declarations, hasExternalModuleSymbol)) {
                                return;
                            }
                            // if this is anonymous type break
                            if (symbol.flags & 2048 /* TypeLiteral */ || symbol.flags & 4096 /* ObjectLiteral */) {
                                return;
                            }
                            appendParentTypeArgumentsAndSymbolName(symbol);
                        }
                    }
                }
                // Get qualified name if the symbol is not a type parameter
                // and there is an enclosing declaration or we specifically
                // asked for it
                let isTypeParameter = symbol.flags & 262144 /* TypeParameter */;
                let typeFormatFlag = 128 /* UseFullyQualifiedType */ & typeFlags;
                if (!isTypeParameter && (enclosingDeclaration || typeFormatFlag)) {
                    walkSymbol(symbol, meaning);
                    return;
                }
                return appendParentTypeArgumentsAndSymbolName(symbol);
            }
            function buildTypeDisplay(type, writer, enclosingDeclaration, globalFlags, typeStack) {
                let globalFlagsToPass = globalFlags & 16 /* WriteOwnNameForAnyLike */;
                return writeType(type, globalFlags);
                function writeType(type, flags) {
                    // Write undefined/null type as any
                    if (type.flags & 1048703 /* Intrinsic */) {
                        // Special handling for unknown / resolving types, they should show up as any and not unknown or __resolving
                        writer.writeKeyword(!(globalFlags & 16 /* WriteOwnNameForAnyLike */) &&
                            (type.flags & 1 /* Any */) ? "any" : type.intrinsicName);
                    }
                    else if (type.flags & 4096 /* Reference */) {
                        writeTypeReference(type, flags);
                    }
                    else if (type.flags & (1024 /* Class */ | 2048 /* Interface */ | 128 /* Enum */ | 512 /* TypeParameter */)) {
                        // The specified symbol flags need to be reinterpreted as type flags
                        buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, 793056 /* Type */, 0 /* None */, flags);
                    }
                    else if (type.flags & 8192 /* Tuple */) {
                        writeTupleType(type);
                    }
                    else if (type.flags & 16384 /* Union */) {
                        writeUnionType(type, flags);
                    }
                    else if (type.flags & 32768 /* Anonymous */) {
                        writeAnonymousType(type, flags);
                    }
                    else if (type.flags & 256 /* StringLiteral */) {
                        writer.writeStringLiteral(type.text);
                    }
                    else {
                        // Should never get here
                        // { ... }
                        writePunctuation(writer, 14 /* OpenBraceToken */);
                        writeSpace(writer);
                        writePunctuation(writer, 21 /* DotDotDotToken */);
                        writeSpace(writer);
                        writePunctuation(writer, 15 /* CloseBraceToken */);
                    }
                }
                function writeTypeList(types, union) {
                    for (let i = 0; i < types.length; i++) {
                        if (i > 0) {
                            if (union) {
                                writeSpace(writer);
                            }
                            writePunctuation(writer, union ? 44 /* BarToken */ : 23 /* CommaToken */);
                            writeSpace(writer);
                        }
                        writeType(types[i], union ? 64 /* InElementType */ : 0 /* None */);
                    }
                }
                function writeTypeReference(type, flags) {
                    if (type.target === globalArrayType && !(flags & 1 /* WriteArrayAsGenericType */)) {
                        writeType(type.typeArguments[0], 64 /* InElementType */);
                        writePunctuation(writer, 18 /* OpenBracketToken */);
                        writePunctuation(writer, 19 /* CloseBracketToken */);
                    }
                    else {
                        buildSymbolDisplay(type.target.symbol, writer, enclosingDeclaration, 793056 /* Type */);
                        writePunctuation(writer, 24 /* LessThanToken */);
                        writeTypeList(type.typeArguments, false);
                        writePunctuation(writer, 25 /* GreaterThanToken */);
                    }
                }
                function writeTupleType(type) {
                    writePunctuation(writer, 18 /* OpenBracketToken */);
                    writeTypeList(type.elementTypes, false);
                    writePunctuation(writer, 19 /* CloseBracketToken */);
                }
                function writeUnionType(type, flags) {
                    if (flags & 64 /* InElementType */) {
                        writePunctuation(writer, 16 /* OpenParenToken */);
                    }
                    writeTypeList(type.types, true);
                    if (flags & 64 /* InElementType */) {
                        writePunctuation(writer, 17 /* CloseParenToken */);
                    }
                }
                function writeAnonymousType(type, flags) {
                    // Always use 'typeof T' for type of class, enum, and module objects
                    if (type.symbol && type.symbol.flags & (32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                        writeTypeofSymbol(type, flags);
                    }
                    else if (shouldWriteTypeOfFunctionSymbol()) {
                        writeTypeofSymbol(type, flags);
                    }
                    else if (typeStack && ts.contains(typeStack, type)) {
                        // If type is an anonymous type literal in a type alias declaration, use type alias name
                        let typeAlias = getTypeAliasForTypeLiteral(type);
                        if (typeAlias) {
                            // The specified symbol flags need to be reinterpreted as type flags
                            buildSymbolDisplay(typeAlias, writer, enclosingDeclaration, 793056 /* Type */, 0 /* None */, flags);
                        }
                        else {
                            // Recursive usage, use any
                            writeKeyword(writer, 112 /* AnyKeyword */);
                        }
                    }
                    else {
                        if (!typeStack) {
                            typeStack = [];
                        }
                        typeStack.push(type);
                        writeLiteralType(type, flags);
                        typeStack.pop();
                    }
                    function shouldWriteTypeOfFunctionSymbol() {
                        if (type.symbol) {
                            let isStaticMethodSymbol = !!(type.symbol.flags & 8192 /* Method */ &&
                                ts.forEach(type.symbol.declarations, declaration => declaration.flags & 128 /* Static */));
                            let isNonLocalFunctionSymbol = !!(type.symbol.flags & 16 /* Function */) &&
                                (type.symbol.parent ||
                                    ts.forEach(type.symbol.declarations, declaration => declaration.parent.kind === 227 /* SourceFile */ || declaration.parent.kind === 206 /* ModuleBlock */));
                            if (isStaticMethodSymbol || isNonLocalFunctionSymbol) {
                                // typeof is allowed only for static/non local functions
                                return !!(flags & 2 /* UseTypeOfFunction */) ||
                                    (typeStack && ts.contains(typeStack, type)); // it is type of the symbol uses itself recursively
                            }
                        }
                    }
                }
                function writeTypeofSymbol(type, typeFormatFlags) {
                    writeKeyword(writer, 97 /* TypeOfKeyword */);
                    writeSpace(writer);
                    buildSymbolDisplay(type.symbol, writer, enclosingDeclaration, 107455 /* Value */, 0 /* None */, typeFormatFlags);
                }
                function getIndexerParameterName(type, indexKind, fallbackName) {
                    let declaration = getIndexDeclarationOfSymbol(type.symbol, indexKind);
                    if (!declaration) {
                        // declaration might not be found if indexer was added from the contextual type.
                        // in this case use fallback name
                        return fallbackName;
                    }
                    ts.Debug.assert(declaration.parameters.length !== 0);
                    return ts.declarationNameToString(declaration.parameters[0].name);
                }
                function writeLiteralType(type, flags) {
                    let resolved = resolveObjectOrUnionTypeMembers(type);
                    if (!resolved.properties.length && !resolved.stringIndexType && !resolved.numberIndexType) {
                        if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                            writePunctuation(writer, 14 /* OpenBraceToken */);
                            writePunctuation(writer, 15 /* CloseBraceToken */);
                            return;
                        }
                        if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 16 /* OpenParenToken */);
                            }
                            buildSignatureDisplay(resolved.callSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | 8 /* WriteArrowStyleSignature */, typeStack);
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 17 /* CloseParenToken */);
                            }
                            return;
                        }
                        if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 16 /* OpenParenToken */);
                            }
                            writeKeyword(writer, 88 /* NewKeyword */);
                            writeSpace(writer);
                            buildSignatureDisplay(resolved.constructSignatures[0], writer, enclosingDeclaration, globalFlagsToPass | 8 /* WriteArrowStyleSignature */, typeStack);
                            if (flags & 64 /* InElementType */) {
                                writePunctuation(writer, 17 /* CloseParenToken */);
                            }
                            return;
                        }
                    }
                    writePunctuation(writer, 14 /* OpenBraceToken */);
                    writer.writeLine();
                    writer.increaseIndent();
                    for (let signature of resolved.callSignatures) {
                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, 22 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    for (let signature of resolved.constructSignatures) {
                        writeKeyword(writer, 88 /* NewKeyword */);
                        writeSpace(writer);
                        buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                        writePunctuation(writer, 22 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    if (resolved.stringIndexType) {
                        // [x: string]:
                        writePunctuation(writer, 18 /* OpenBracketToken */);
                        writer.writeParameter(getIndexerParameterName(resolved, 0 /* String */, "x"));
                        writePunctuation(writer, 51 /* ColonToken */);
                        writeSpace(writer);
                        writeKeyword(writer, 121 /* StringKeyword */);
                        writePunctuation(writer, 19 /* CloseBracketToken */);
                        writePunctuation(writer, 51 /* ColonToken */);
                        writeSpace(writer);
                        writeType(resolved.stringIndexType, 0 /* None */);
                        writePunctuation(writer, 22 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    if (resolved.numberIndexType) {
                        // [x: number]:
                        writePunctuation(writer, 18 /* OpenBracketToken */);
                        writer.writeParameter(getIndexerParameterName(resolved, 1 /* Number */, "x"));
                        writePunctuation(writer, 51 /* ColonToken */);
                        writeSpace(writer);
                        writeKeyword(writer, 119 /* NumberKeyword */);
                        writePunctuation(writer, 19 /* CloseBracketToken */);
                        writePunctuation(writer, 51 /* ColonToken */);
                        writeSpace(writer);
                        writeType(resolved.numberIndexType, 0 /* None */);
                        writePunctuation(writer, 22 /* SemicolonToken */);
                        writer.writeLine();
                    }
                    for (let p of resolved.properties) {
                        let t = getTypeOfSymbol(p);
                        if (p.flags & (16 /* Function */ | 8192 /* Method */) && !getPropertiesOfObjectType(t).length) {
                            let signatures = getSignaturesOfType(t, 0 /* Call */);
                            for (let signature of signatures) {
                                buildSymbolDisplay(p, writer);
                                if (p.flags & 536870912 /* Optional */) {
                                    writePunctuation(writer, 50 /* QuestionToken */);
                                }
                                buildSignatureDisplay(signature, writer, enclosingDeclaration, globalFlagsToPass, typeStack);
                                writePunctuation(writer, 22 /* SemicolonToken */);
                                writer.writeLine();
                            }
                        }
                        else {
                            buildSymbolDisplay(p, writer);
                            if (p.flags & 536870912 /* Optional */) {
                                writePunctuation(writer, 50 /* QuestionToken */);
                            }
                            writePunctuation(writer, 51 /* ColonToken */);
                            writeSpace(writer);
                            writeType(t, 0 /* None */);
                            writePunctuation(writer, 22 /* SemicolonToken */);
                            writer.writeLine();
                        }
                    }
                    writer.decreaseIndent();
                    writePunctuation(writer, 15 /* CloseBraceToken */);
                }
            }
            function buildTypeParameterDisplayFromSymbol(symbol, writer, enclosingDeclaraiton, flags) {
                let targetSymbol = getTargetSymbol(symbol);
                if (targetSymbol.flags & 32 /* Class */ || targetSymbol.flags & 64 /* Interface */) {
                    buildDisplayForTypeParametersAndDelimiters(getTypeParametersOfClassOrInterface(symbol), writer, enclosingDeclaraiton, flags);
                }
            }
            function buildTypeParameterDisplay(tp, writer, enclosingDeclaration, flags, typeStack) {
                appendSymbolNameOnly(tp.symbol, writer);
                let constraint = getConstraintOfTypeParameter(tp);
                if (constraint) {
                    writeSpace(writer);
                    writeKeyword(writer, 79 /* ExtendsKeyword */);
                    writeSpace(writer);
                    buildTypeDisplay(constraint, writer, enclosingDeclaration, flags, typeStack);
                }
            }
            function buildParameterDisplay(p, writer, enclosingDeclaration, flags, typeStack) {
                if (ts.hasDotDotDotToken(p.valueDeclaration)) {
                    writePunctuation(writer, 21 /* DotDotDotToken */);
                }
                appendSymbolNameOnly(p, writer);
                if (ts.hasQuestionToken(p.valueDeclaration) || p.valueDeclaration.initializer) {
                    writePunctuation(writer, 50 /* QuestionToken */);
                }
                writePunctuation(writer, 51 /* ColonToken */);
                writeSpace(writer);
                buildTypeDisplay(getTypeOfSymbol(p), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildDisplayForTypeParametersAndDelimiters(typeParameters, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, 24 /* LessThanToken */);
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, 23 /* CommaToken */);
                            writeSpace(writer);
                        }
                        buildTypeParameterDisplay(typeParameters[i], writer, enclosingDeclaration, flags, typeStack);
                    }
                    writePunctuation(writer, 25 /* GreaterThanToken */);
                }
            }
            function buildDisplayForTypeArgumentsAndDelimiters(typeParameters, mapper, writer, enclosingDeclaration, flags, typeStack) {
                if (typeParameters && typeParameters.length) {
                    writePunctuation(writer, 24 /* LessThanToken */);
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (i > 0) {
                            writePunctuation(writer, 23 /* CommaToken */);
                            writeSpace(writer);
                        }
                        buildTypeDisplay(mapper(typeParameters[i]), writer, enclosingDeclaration, 0 /* None */);
                    }
                    writePunctuation(writer, 25 /* GreaterThanToken */);
                }
            }
            function buildDisplayForParametersAndDelimiters(parameters, writer, enclosingDeclaration, flags, typeStack) {
                writePunctuation(writer, 16 /* OpenParenToken */);
                for (let i = 0; i < parameters.length; i++) {
                    if (i > 0) {
                        writePunctuation(writer, 23 /* CommaToken */);
                        writeSpace(writer);
                    }
                    buildParameterDisplay(parameters[i], writer, enclosingDeclaration, flags, typeStack);
                }
                writePunctuation(writer, 17 /* CloseParenToken */);
            }
            function buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (flags & 8 /* WriteArrowStyleSignature */) {
                    writeSpace(writer);
                    writePunctuation(writer, 32 /* EqualsGreaterThanToken */);
                }
                else {
                    writePunctuation(writer, 51 /* ColonToken */);
                }
                writeSpace(writer);
                buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags, typeStack);
            }
            function buildSignatureDisplay(signature, writer, enclosingDeclaration, flags, typeStack) {
                if (signature.target && (flags & 32 /* WriteTypeArgumentsOfSignature */)) {
                    // Instantiated signature, write type arguments instead
                    // This is achieved by passing in the mapper separately
                    buildDisplayForTypeArgumentsAndDelimiters(signature.target.typeParameters, signature.mapper, writer, enclosingDeclaration);
                }
                else {
                    buildDisplayForTypeParametersAndDelimiters(signature.typeParameters, writer, enclosingDeclaration, flags, typeStack);
                }
                buildDisplayForParametersAndDelimiters(signature.parameters, writer, enclosingDeclaration, flags, typeStack);
                buildReturnTypeDisplay(signature, writer, enclosingDeclaration, flags, typeStack);
            }
            return _displayBuilder || (_displayBuilder = {
                symbolToString: symbolToString,
                typeToString: typeToString,
                buildSymbolDisplay: buildSymbolDisplay,
                buildTypeDisplay: buildTypeDisplay,
                buildTypeParameterDisplay: buildTypeParameterDisplay,
                buildParameterDisplay: buildParameterDisplay,
                buildDisplayForParametersAndDelimiters: buildDisplayForParametersAndDelimiters,
                buildDisplayForTypeParametersAndDelimiters: buildDisplayForTypeParametersAndDelimiters,
                buildDisplayForTypeArgumentsAndDelimiters: buildDisplayForTypeArgumentsAndDelimiters,
                buildTypeParameterDisplayFromSymbol: buildTypeParameterDisplayFromSymbol,
                buildSignatureDisplay: buildSignatureDisplay,
                buildReturnTypeDisplay: buildReturnTypeDisplay
            });
        }
        function isDeclarationVisible(node) {
            function getContainingExternalModule(node) {
                for (; node; node = node.parent) {
                    if (node.kind === 205 /* ModuleDeclaration */) {
                        if (node.name.kind === 8 /* StringLiteral */) {
                            return node;
                        }
                    }
                    else if (node.kind === 227 /* SourceFile */) {
                        return ts.isExternalModule(node) ? node : undefined;
                    }
                }
                ts.Debug.fail("getContainingModule cant reach here");
            }
            function isUsedInExportAssignment(node) {
                // Get source File and see if it is external module and has export assigned symbol
                let externalModule = getContainingExternalModule(node);
                let exportAssignmentSymbol;
                let resolvedExportSymbol;
                if (externalModule) {
                    // This is export assigned symbol node
                    let externalModuleSymbol = getSymbolOfNode(externalModule);
                    exportAssignmentSymbol = getExportAssignmentSymbol(externalModuleSymbol);
                    let symbolOfNode = getSymbolOfNode(node);
                    if (isSymbolUsedInExportAssignment(symbolOfNode)) {
                        return true;
                    }
                    // if symbolOfNode is alias declaration, resolve the symbol declaration and check
                    if (symbolOfNode.flags & 8388608 /* Alias */) {
                        return isSymbolUsedInExportAssignment(resolveAlias(symbolOfNode));
                    }
                }
                // Check if the symbol is used in export assignment
                function isSymbolUsedInExportAssignment(symbol) {
                    if (exportAssignmentSymbol === symbol) {
                        return true;
                    }
                    if (exportAssignmentSymbol && !!(exportAssignmentSymbol.flags & 8388608 /* Alias */)) {
                        // if export assigned symbol is alias declaration, resolve the alias
                        resolvedExportSymbol = resolvedExportSymbol || resolveAlias(exportAssignmentSymbol);
                        if (resolvedExportSymbol === symbol) {
                            return true;
                        }
                        // Container of resolvedExportSymbol is visible
                        return ts.forEach(resolvedExportSymbol.declarations, (current) => {
                            while (current) {
                                if (current === node) {
                                    return true;
                                }
                                current = current.parent;
                            }
                        });
                    }
                }
            }
            function determineIfDeclarationIsVisible() {
                switch (node.kind) {
                    case 152 /* BindingElement */:
                        return isDeclarationVisible(node.parent.parent);
                    case 198 /* VariableDeclaration */:
                        if (ts.isBindingPattern(node.name) &&
                            !node.name.elements.length) {
                            // If the binding pattern is empty, this variable declaration is not visible
                            return false;
                        }
                    // Otherwise fall through
                    case 205 /* ModuleDeclaration */:
                    case 201 /* ClassDeclaration */:
                    case 202 /* InterfaceDeclaration */:
                    case 203 /* TypeAliasDeclaration */:
                    case 200 /* FunctionDeclaration */:
                    case 204 /* EnumDeclaration */:
                    case 208 /* ImportEqualsDeclaration */:
                        let parent = getDeclarationContainer(node);
                        // If the node is not exported or it is not ambient module element (except import declaration)
                        if (!(ts.getCombinedNodeFlags(node) & 1 /* Export */) &&
                            !(node.kind !== 208 /* ImportEqualsDeclaration */ && parent.kind !== 227 /* SourceFile */ && ts.isInAmbientContext(parent))) {
                            return isGlobalSourceFile(parent);
                        }
                        // Exported members/ambient module elements (exception import declaration) are visible if parent is visible
                        return isDeclarationVisible(parent);
                    case 132 /* PropertyDeclaration */:
                    case 131 /* PropertySignature */:
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                    case 134 /* MethodDeclaration */:
                    case 133 /* MethodSignature */:
                        if (node.flags & (32 /* Private */ | 64 /* Protected */)) {
                            // Private/protected properties/methods are not visible
                            return false;
                        }
                    // Public properties/methods are visible if its parents are visible, so let it fall into next case statement
                    case 135 /* Constructor */:
                    case 139 /* ConstructSignature */:
                    case 138 /* CallSignature */:
                    case 140 /* IndexSignature */:
                    case 129 /* Parameter */:
                    case 206 /* ModuleBlock */:
                    case 142 /* FunctionType */:
                    case 143 /* ConstructorType */:
                    case 145 /* TypeLiteral */:
                    case 141 /* TypeReference */:
                    case 146 /* ArrayType */:
                    case 147 /* TupleType */:
                    case 148 /* UnionType */:
                    case 149 /* ParenthesizedType */:
                        return isDeclarationVisible(node.parent);
                    // Default binding, import specifier and namespace import is visible 
                    // only on demand so by default it is not visible
                    case 210 /* ImportClause */:
                    case 211 /* NamespaceImport */:
                    case 213 /* ImportSpecifier */:
                        return false;
                    // Type parameters are always visible
                    case 128 /* TypeParameter */:
                    // Source file is always visible
                    case 227 /* SourceFile */:
                        return true;
                    // Export assignements do not create name bindings outside the module
                    case 214 /* ExportAssignment */:
                        return false;
                    default:
                        ts.Debug.fail("isDeclarationVisible unknown: SyntaxKind: " + node.kind);
                }
            }
            if (node) {
                let links = getNodeLinks(node);
                if (links.isVisible === undefined) {
                    links.isVisible = !!determineIfDeclarationIsVisible();
                }
                return links.isVisible;
            }
        }
        function collectLinkedAliases(node) {
            var exportSymbol;
            if (node.parent && node.parent.kind === 214 /* ExportAssignment */) {
                exportSymbol = resolveName(node.parent, node.text, 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */, ts.Diagnostics.Cannot_find_name_0, node);
            }
            else if (node.parent.kind === 217 /* ExportSpecifier */) {
                exportSymbol = getTargetOfExportSpecifier(node.parent);
            }
            var result = [];
            if (exportSymbol) {
                buildVisibleNodeList(exportSymbol.declarations);
            }
            return result;
            function buildVisibleNodeList(declarations) {
                ts.forEach(declarations, declaration => {
                    getNodeLinks(declaration).isVisible = true;
                    var resultNode = getAnyImportSyntax(declaration) || declaration;
                    if (!ts.contains(result, resultNode)) {
                        result.push(resultNode);
                    }
                    if (ts.isInternalModuleImportEqualsDeclaration(declaration)) {
                        // Add the referenced top container visible
                        var internalModuleReference = declaration.moduleReference;
                        var firstIdentifier = getFirstIdentifier(internalModuleReference);
                        var importSymbol = resolveName(declaration, firstIdentifier.text, 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */, ts.Diagnostics.Cannot_find_name_0, firstIdentifier);
                        buildVisibleNodeList(importSymbol.declarations);
                    }
                });
            }
        }
        function getRootDeclaration(node) {
            while (node.kind === 152 /* BindingElement */) {
                node = node.parent.parent;
            }
            return node;
        }
        function getDeclarationContainer(node) {
            node = getRootDeclaration(node);
            // Parent chain:
            // VaribleDeclaration -> VariableDeclarationList -> VariableStatement -> 'Declaration Container'
            return node.kind === 198 /* VariableDeclaration */ ? node.parent.parent.parent : node.parent;
        }
        function getTypeOfPrototypeProperty(prototype) {
            // TypeScript 1.0 spec (April 2014): 8.4
            // Every class automatically contains a static property member named 'prototype',
            // the type of which is an instantiation of the class type with type Any supplied as a type argument for each type parameter.
            // It is an error to explicitly declare a static property member with the name 'prototype'.
            let classType = getDeclaredTypeOfSymbol(prototype.parent);
            return classType.typeParameters ? createTypeReference(classType, ts.map(classType.typeParameters, _ => anyType)) : classType;
        }
        // Return the type of the given property in the given type, or undefined if no such property exists
        function getTypeOfPropertyOfType(type, name) {
            let prop = getPropertyOfType(type, name);
            return prop ? getTypeOfSymbol(prop) : undefined;
        }
        // Return the inferred type for a binding element
        function getTypeForBindingElement(declaration) {
            let pattern = declaration.parent;
            let parentType = getTypeForVariableLikeDeclaration(pattern.parent);
            // If parent has the unknown (error) type, then so does this binding element
            if (parentType === unknownType) {
                return unknownType;
            }
            // If no type was specified or inferred for parent, or if the specified or inferred type is any,
            // infer from the initializer of the binding element if one is present. Otherwise, go with the
            // undefined or any type of the parent.
            if (!parentType || parentType === anyType) {
                if (declaration.initializer) {
                    return checkExpressionCached(declaration.initializer);
                }
                return parentType;
            }
            let type;
            if (pattern.kind === 150 /* ObjectBindingPattern */) {
                // Use explicitly specified property name ({ p: xxx } form), or otherwise the implied name ({ p } form)
                let name = declaration.propertyName || declaration.name;
                // Use type of the specified property, or otherwise, for a numeric name, the type of the numeric index signature,
                // or otherwise the type of the string index signature.
                type = getTypeOfPropertyOfType(parentType, name.text) ||
                    isNumericLiteralName(name.text) && getIndexTypeOfType(parentType, 1 /* Number */) ||
                    getIndexTypeOfType(parentType, 0 /* String */);
                if (!type) {
                    error(name, ts.Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(parentType), ts.declarationNameToString(name));
                    return unknownType;
                }
            }
            else {
                // This elementType will be used if the specific property corresponding to this index is not
                // present (aka the tuple element property). This call also checks that the parentType is in
                // fact an iterable or array (depending on target language).
                let elementType = checkIteratedTypeOrElementType(parentType, pattern, false);
                if (!declaration.dotDotDotToken) {
                    if (elementType.flags & 1 /* Any */) {
                        return elementType;
                    }
                    // Use specific property type when parent is a tuple or numeric index type when parent is an array
                    let propName = "" + ts.indexOf(pattern.elements, declaration);
                    type = isTupleLikeType(parentType)
                        ? getTypeOfPropertyOfType(parentType, propName)
                        : elementType;
                    if (!type) {
                        if (isTupleType(parentType)) {
                            error(declaration, ts.Diagnostics.Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2, typeToString(parentType), parentType.elementTypes.length, pattern.elements.length);
                        }
                        else {
                            error(declaration, ts.Diagnostics.Type_0_has_no_property_1, typeToString(parentType), propName);
                        }
                        return unknownType;
                    }
                }
                else {
                    // Rest element has an array type with the same element type as the parent type
                    type = createArrayType(elementType);
                }
            }
            return type;
        }
        // Return the inferred type for a variable, parameter, or property declaration
        function getTypeForVariableLikeDeclaration(declaration) {
            // A variable declared in a for..in statement is always of type any
            if (declaration.parent.parent.kind === 187 /* ForInStatement */) {
                return anyType;
            }
            if (declaration.parent.parent.kind === 188 /* ForOfStatement */) {
                // checkRightHandSideOfForOf will return undefined if the for-of expression type was
                // missing properties/signatures required to get its iteratedType (like
                // [Symbol.iterator] or next). This may be because we accessed properties from anyType,
                // or it may have led to an error inside getIteratedType.
                return checkRightHandSideOfForOf(declaration.parent.parent.expression) || anyType;
            }
            if (ts.isBindingPattern(declaration.parent)) {
                return getTypeForBindingElement(declaration);
            }
            // Use type from type annotation if one is present
            if (declaration.type) {
                return getTypeFromTypeNodeOrHeritageClauseElement(declaration.type);
            }
            if (declaration.kind === 129 /* Parameter */) {
                let func = declaration.parent;
                // For a parameter of a set accessor, use the type of the get accessor if one is present
                if (func.kind === 137 /* SetAccessor */ && !ts.hasDynamicName(func)) {
                    let getter = ts.getDeclarationOfKind(declaration.parent.symbol, 136 /* GetAccessor */);
                    if (getter) {
                        return getReturnTypeOfSignature(getSignatureFromDeclaration(getter));
                    }
                }
                // Use contextual parameter type if one is available
                let type = getContextuallyTypedParameterType(declaration);
                if (type) {
                    return type;
                }
            }
            // Use the type of the initializer expression if one is present
            if (declaration.initializer) {
                return checkExpressionCached(declaration.initializer);
            }
            // If it is a short-hand property assignment, use the type of the identifier
            if (declaration.kind === 225 /* ShorthandPropertyAssignment */) {
                return checkIdentifier(declaration.name);
            }
            // No type specified and nothing can be inferred
            return undefined;
        }
        // Return the type implied by a binding pattern element. This is the type of the initializer of the element if
        // one is present. Otherwise, if the element is itself a binding pattern, it is the type implied by the binding
        // pattern. Otherwise, it is the type any.
        function getTypeFromBindingElement(element) {
            if (element.initializer) {
                return getWidenedType(checkExpressionCached(element.initializer));
            }
            if (ts.isBindingPattern(element.name)) {
                return getTypeFromBindingPattern(element.name);
            }
            return anyType;
        }
        // Return the type implied by an object binding pattern
        function getTypeFromObjectBindingPattern(pattern) {
            let members = {};
            ts.forEach(pattern.elements, e => {
                let flags = 4 /* Property */ | 67108864 /* Transient */ | (e.initializer ? 536870912 /* Optional */ : 0);
                let name = e.propertyName || e.name;
                let symbol = createSymbol(flags, name.text);
                symbol.type = getTypeFromBindingElement(e);
                members[symbol.name] = symbol;
            });
            return createAnonymousType(undefined, members, emptyArray, emptyArray, undefined, undefined);
        }
        // Return the type implied by an array binding pattern
        function getTypeFromArrayBindingPattern(pattern) {
            let hasSpreadElement = false;
            let elementTypes = [];
            ts.forEach(pattern.elements, e => {
                elementTypes.push(e.kind === 175 /* OmittedExpression */ || e.dotDotDotToken ? anyType : getTypeFromBindingElement(e));
                if (e.dotDotDotToken) {
                    hasSpreadElement = true;
                }
            });
            if (!elementTypes.length) {
                return languageVersion >= 2 /* ES6 */ ? createIterableType(anyType) : anyArrayType;
            }
            else if (hasSpreadElement) {
                let unionOfElements = getUnionType(elementTypes);
                if (languageVersion >= 2 /* ES6 */) {
                    // If the user has something like:
                    //
                    //     function fun(...[a, ...b]) { }
                    //
                    // Normally, in ES6, the implied type of an array binding pattern with a rest element is
                    // an iterable. However, there is a requirement in our type system that all rest
                    // parameters be array types. To satisfy this, we have an exception to the rule that
                    // says the type of an array binding pattern with a rest element is an array type
                    // if it is *itself* in a rest parameter. It will still be compatible with a spreaded
                    // iterable argument, but within the function it will be an array.
                    let parent = pattern.parent;
                    let isRestParameter = parent.kind === 129 /* Parameter */ &&
                        pattern === parent.name &&
                        parent.dotDotDotToken !== undefined;
                    return isRestParameter ? createArrayType(unionOfElements) : createIterableType(unionOfElements);
                }
                return createArrayType(unionOfElements);
            }
            // If the pattern has at least one element, and no rest element, then it should imply a tuple type.
            return createTupleType(elementTypes);
        }
        // Return the type implied by a binding pattern. This is the type implied purely by the binding pattern itself
        // and without regard to its context (i.e. without regard any type annotation or initializer associated with the
        // declaration in which the binding pattern is contained). For example, the implied type of [x, y] is [any, any]
        // and the implied type of { x, y: z = 1 } is { x: any; y: number; }. The type implied by a binding pattern is
        // used as the contextual type of an initializer associated with the binding pattern. Also, for a destructuring
        // parameter with no type annotation or initializer, the type implied by the binding pattern becomes the type of
        // the parameter.
        function getTypeFromBindingPattern(pattern) {
            return pattern.kind === 150 /* ObjectBindingPattern */
                ? getTypeFromObjectBindingPattern(pattern)
                : getTypeFromArrayBindingPattern(pattern);
        }
        // Return the type associated with a variable, parameter, or property declaration. In the simple case this is the type
        // specified in a type annotation or inferred from an initializer. However, in the case of a destructuring declaration it
        // is a bit more involved. For example:
        //
        //   var [x, s = ""] = [1, "one"];
        //
        // Here, the array literal [1, "one"] is contextually typed by the type [any, string], which is the implied type of the
        // binding pattern [x, s = ""]. Because the contextual type is a tuple type, the resulting type of [1, "one"] is the
        // tuple type [number, string]. Thus, the type inferred for 'x' is number and the type inferred for 's' is string.
        function getWidenedTypeForVariableLikeDeclaration(declaration, reportErrors) {
            let type = getTypeForVariableLikeDeclaration(declaration);
            if (type) {
                if (reportErrors) {
                    reportErrorsFromWidening(declaration, type);
                }
                // During a normal type check we'll never get to here with a property assignment (the check of the containing
                // object literal uses a different path). We exclude widening only so that language services and type verification
                // tools see the actual type.
                return declaration.kind !== 224 /* PropertyAssignment */ ? getWidenedType(type) : type;
            }
            // If no type was specified and nothing could be inferred, and if the declaration specifies a binding pattern, use
            // the type implied by the binding pattern
            if (ts.isBindingPattern(declaration.name)) {
                return getTypeFromBindingPattern(declaration.name);
            }
            // Rest parameters default to type any[], other parameters default to type any
            type = declaration.dotDotDotToken ? anyArrayType : anyType;
            // Report implicit any errors unless this is a private property within an ambient declaration
            if (reportErrors && compilerOptions.noImplicitAny) {
                let root = getRootDeclaration(declaration);
                if (!isPrivateWithinAmbient(root) && !(root.kind === 129 /* Parameter */ && isPrivateWithinAmbient(root.parent))) {
                    reportImplicitAnyError(declaration, type);
                }
            }
            return type;
        }
        function getTypeOfVariableOrParameterOrProperty(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.type) {
                // Handle prototype property
                if (symbol.flags & 134217728 /* Prototype */) {
                    return links.type = getTypeOfPrototypeProperty(symbol);
                }
                // Handle catch clause variables
                let declaration = symbol.valueDeclaration;
                if (declaration.parent.kind === 223 /* CatchClause */) {
                    return links.type = anyType;
                }
                // Handle export default expressions
                if (declaration.kind === 214 /* ExportAssignment */) {
                    return links.type = checkExpression(declaration.expression);
                }
                // Handle variable, parameter or property
                links.type = resolvingType;
                let type = getWidenedTypeForVariableLikeDeclaration(declaration, true);
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    let diagnostic = symbol.valueDeclaration.type ?
                        ts.Diagnostics._0_implicitly_has_type_any_because_it_is_referenced_directly_or_indirectly_in_its_own_type_annotation :
                        ts.Diagnostics._0_implicitly_has_type_any_because_it_is_does_not_have_a_type_annotation_and_is_referenced_directly_or_indirectly_in_its_own_initializer;
                    error(symbol.valueDeclaration, diagnostic, symbolToString(symbol));
                }
            }
            return links.type;
        }
        function getSetAccessorTypeAnnotationNode(accessor) {
            return accessor && accessor.parameters.length > 0 && accessor.parameters[0].type;
        }
        function getAnnotatedAccessorType(accessor) {
            if (accessor) {
                if (accessor.kind === 136 /* GetAccessor */) {
                    return accessor.type && getTypeFromTypeNodeOrHeritageClauseElement(accessor.type);
                }
                else {
                    let setterTypeAnnotation = getSetAccessorTypeAnnotationNode(accessor);
                    return setterTypeAnnotation && getTypeFromTypeNodeOrHeritageClauseElement(setterTypeAnnotation);
                }
            }
            return undefined;
        }
        function getTypeOfAccessors(symbol) {
            let links = getSymbolLinks(symbol);
            checkAndStoreTypeOfAccessors(symbol, links);
            return links.type;
        }
        function checkAndStoreTypeOfAccessors(symbol, links) {
            links = links || getSymbolLinks(symbol);
            if (!links.type) {
                links.type = resolvingType;
                let getter = ts.getDeclarationOfKind(symbol, 136 /* GetAccessor */);
                let setter = ts.getDeclarationOfKind(symbol, 137 /* SetAccessor */);
                let type;
                // First try to see if the user specified a return type on the get-accessor.
                let getterReturnType = getAnnotatedAccessorType(getter);
                if (getterReturnType) {
                    type = getterReturnType;
                }
                else {
                    // If the user didn't specify a return type, try to use the set-accessor's parameter type.
                    let setterParameterType = getAnnotatedAccessorType(setter);
                    if (setterParameterType) {
                        type = setterParameterType;
                    }
                    else {
                        // If there are no specified types, try to infer it from the body of the get accessor if it exists.
                        if (getter && getter.body) {
                            type = getReturnTypeFromBody(getter);
                        }
                        else {
                            if (compilerOptions.noImplicitAny) {
                                error(setter, ts.Diagnostics.Property_0_implicitly_has_type_any_because_its_set_accessor_lacks_a_type_annotation, symbolToString(symbol));
                            }
                            type = anyType;
                        }
                    }
                }
                if (links.type === resolvingType) {
                    links.type = type;
                }
            }
            else if (links.type === resolvingType) {
                links.type = anyType;
                if (compilerOptions.noImplicitAny) {
                    let getter = ts.getDeclarationOfKind(symbol, 136 /* GetAccessor */);
                    error(getter, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, symbolToString(symbol));
                }
            }
        }
        function getTypeOfFuncClassEnumModule(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = createObjectType(32768 /* Anonymous */, symbol);
            }
            return links.type;
        }
        function getTypeOfEnumMember(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getDeclaredTypeOfEnum(getParentOfSymbol(symbol));
            }
            return links.type;
        }
        function getTypeOfAlias(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = getTypeOfSymbol(resolveAlias(symbol));
            }
            return links.type;
        }
        function getTypeOfInstantiatedSymbol(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.type) {
                links.type = instantiateType(getTypeOfSymbol(links.target), links.mapper);
            }
            return links.type;
        }
        function getTypeOfSymbol(symbol) {
            if (symbol.flags & 16777216 /* Instantiated */) {
                return getTypeOfInstantiatedSymbol(symbol);
            }
            if (symbol.flags & (3 /* Variable */ | 4 /* Property */)) {
                return getTypeOfVariableOrParameterOrProperty(symbol);
            }
            if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 384 /* Enum */ | 512 /* ValueModule */)) {
                return getTypeOfFuncClassEnumModule(symbol);
            }
            if (symbol.flags & 8 /* EnumMember */) {
                return getTypeOfEnumMember(symbol);
            }
            if (symbol.flags & 98304 /* Accessor */) {
                return getTypeOfAccessors(symbol);
            }
            if (symbol.flags & 8388608 /* Alias */) {
                return getTypeOfAlias(symbol);
            }
            return unknownType;
        }
        function getTargetType(type) {
            return type.flags & 4096 /* Reference */ ? type.target : type;
        }
        function hasBaseType(type, checkBase) {
            return check(type);
            function check(type) {
                let target = getTargetType(type);
                return target === checkBase || ts.forEach(target.baseTypes, check);
            }
        }
        // Return combined list of type parameters from all declarations of a class or interface. Elsewhere we check they're all
        // the same, but even if they're not we still need the complete list to ensure instantiations supply type arguments
        // for all type parameters.
        function getTypeParametersOfClassOrInterface(symbol) {
            let result;
            ts.forEach(symbol.declarations, node => {
                if (node.kind === 202 /* InterfaceDeclaration */ || node.kind === 201 /* ClassDeclaration */) {
                    let declaration = node;
                    if (declaration.typeParameters && declaration.typeParameters.length) {
                        ts.forEach(declaration.typeParameters, node => {
                            let tp = getDeclaredTypeOfTypeParameter(getSymbolOfNode(node));
                            if (!result) {
                                result = [tp];
                            }
                            else if (!ts.contains(result, tp)) {
                                result.push(tp);
                            }
                        });
                    }
                }
            });
            return result;
        }
        function getDeclaredTypeOfClass(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                let type = links.declaredType = createObjectType(1024 /* Class */, symbol);
                let typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= 4096 /* Reference */;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                let declaration = ts.getDeclarationOfKind(symbol, 201 /* ClassDeclaration */);
                let baseTypeNode = ts.getClassExtendsHeritageClauseElement(declaration);
                if (baseTypeNode) {
                    let baseType = getTypeFromHeritageClauseElement(baseTypeNode);
                    if (baseType !== unknownType) {
                        if (getTargetType(baseType).flags & 1024 /* Class */) {
                            if (type !== baseType && !hasBaseType(baseType, type)) {
                                type.baseTypes.push(baseType);
                            }
                            else {
                                error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */));
                            }
                        }
                        else {
                            error(baseTypeNode, ts.Diagnostics.A_class_may_only_extend_another_class);
                        }
                    }
                }
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = emptyArray;
                type.declaredConstructSignatures = emptyArray;
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfInterface(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                let type = links.declaredType = createObjectType(2048 /* Interface */, symbol);
                let typeParameters = getTypeParametersOfClassOrInterface(symbol);
                if (typeParameters) {
                    type.flags |= 4096 /* Reference */;
                    type.typeParameters = typeParameters;
                    type.instantiations = {};
                    type.instantiations[getTypeListId(type.typeParameters)] = type;
                    type.target = type;
                    type.typeArguments = type.typeParameters;
                }
                type.baseTypes = [];
                ts.forEach(symbol.declarations, declaration => {
                    if (declaration.kind === 202 /* InterfaceDeclaration */ && ts.getInterfaceBaseTypeNodes(declaration)) {
                        ts.forEach(ts.getInterfaceBaseTypeNodes(declaration), node => {
                            let baseType = getTypeFromHeritageClauseElement(node);
                            if (baseType !== unknownType) {
                                if (getTargetType(baseType).flags & (1024 /* Class */ | 2048 /* Interface */)) {
                                    if (type !== baseType && !hasBaseType(baseType, type)) {
                                        type.baseTypes.push(baseType);
                                    }
                                    else {
                                        error(declaration, ts.Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */));
                                    }
                                }
                                else {
                                    error(node, ts.Diagnostics.An_interface_may_only_extend_a_class_or_another_interface);
                                }
                            }
                        });
                    }
                });
                type.declaredProperties = getNamedMembers(symbol.members);
                type.declaredCallSignatures = getSignaturesOfSymbol(symbol.members["__call"]);
                type.declaredConstructSignatures = getSignaturesOfSymbol(symbol.members["__new"]);
                type.declaredStringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                type.declaredNumberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeAlias(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = resolvingType;
                let declaration = ts.getDeclarationOfKind(symbol, 203 /* TypeAliasDeclaration */);
                let type = getTypeFromTypeNodeOrHeritageClauseElement(declaration.type);
                if (links.declaredType === resolvingType) {
                    links.declaredType = type;
                }
            }
            else if (links.declaredType === resolvingType) {
                links.declaredType = unknownType;
                let declaration = ts.getDeclarationOfKind(symbol, 203 /* TypeAliasDeclaration */);
                error(declaration.name, ts.Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfEnum(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                let type = createType(128 /* Enum */);
                type.symbol = symbol;
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfTypeParameter(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                let type = createType(512 /* TypeParameter */);
                type.symbol = symbol;
                if (!ts.getDeclarationOfKind(symbol, 128 /* TypeParameter */).constraint) {
                    type.constraint = noConstraintType;
                }
                links.declaredType = type;
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfAlias(symbol) {
            let links = getSymbolLinks(symbol);
            if (!links.declaredType) {
                links.declaredType = getDeclaredTypeOfSymbol(resolveAlias(symbol));
            }
            return links.declaredType;
        }
        function getDeclaredTypeOfSymbol(symbol) {
            ts.Debug.assert((symbol.flags & 16777216 /* Instantiated */) === 0);
            if (symbol.flags & 32 /* Class */) {
                return getDeclaredTypeOfClass(symbol);
            }
            if (symbol.flags & 64 /* Interface */) {
                return getDeclaredTypeOfInterface(symbol);
            }
            if (symbol.flags & 524288 /* TypeAlias */) {
                return getDeclaredTypeOfTypeAlias(symbol);
            }
            if (symbol.flags & 384 /* Enum */) {
                return getDeclaredTypeOfEnum(symbol);
            }
            if (symbol.flags & 262144 /* TypeParameter */) {
                return getDeclaredTypeOfTypeParameter(symbol);
            }
            if (symbol.flags & 8388608 /* Alias */) {
                return getDeclaredTypeOfAlias(symbol);
            }
            return unknownType;
        }
        function createSymbolTable(symbols) {
            let result = {};
            for (let symbol of symbols) {
                result[symbol.name] = symbol;
            }
            return result;
        }
        function createInstantiatedSymbolTable(symbols, mapper) {
            let result = {};
            for (let symbol of symbols) {
                result[symbol.name] = instantiateSymbol(symbol, mapper);
            }
            return result;
        }
        function addInheritedMembers(symbols, baseSymbols) {
            for (let s of baseSymbols) {
                if (!ts.hasProperty(symbols, s.name)) {
                    symbols[s.name] = s;
                }
            }
        }
        function addInheritedSignatures(signatures, baseSignatures) {
            if (baseSignatures) {
                for (let signature of baseSignatures) {
                    signatures.push(signature);
                }
            }
        }
        function resolveClassOrInterfaceMembers(type) {
            let members = type.symbol.members;
            let callSignatures = type.declaredCallSignatures;
            let constructSignatures = type.declaredConstructSignatures;
            let stringIndexType = type.declaredStringIndexType;
            let numberIndexType = type.declaredNumberIndexType;
            if (type.baseTypes.length) {
                members = createSymbolTable(type.declaredProperties);
                ts.forEach(type.baseTypes, baseType => {
                    addInheritedMembers(members, getPropertiesOfObjectType(baseType));
                    callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(baseType, 0 /* Call */));
                    constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(baseType, 1 /* Construct */));
                    stringIndexType = stringIndexType || getIndexTypeOfType(baseType, 0 /* String */);
                    numberIndexType = numberIndexType || getIndexTypeOfType(baseType, 1 /* Number */);
                });
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveTypeReferenceMembers(type) {
            let target = type.target;
            let mapper = createTypeMapper(target.typeParameters, type.typeArguments);
            let members = createInstantiatedSymbolTable(target.declaredProperties, mapper);
            let callSignatures = instantiateList(target.declaredCallSignatures, mapper, instantiateSignature);
            let constructSignatures = instantiateList(target.declaredConstructSignatures, mapper, instantiateSignature);
            let stringIndexType = target.declaredStringIndexType ? instantiateType(target.declaredStringIndexType, mapper) : undefined;
            let numberIndexType = target.declaredNumberIndexType ? instantiateType(target.declaredNumberIndexType, mapper) : undefined;
            ts.forEach(target.baseTypes, baseType => {
                let instantiatedBaseType = instantiateType(baseType, mapper);
                addInheritedMembers(members, getPropertiesOfObjectType(instantiatedBaseType));
                callSignatures = ts.concatenate(callSignatures, getSignaturesOfType(instantiatedBaseType, 0 /* Call */));
                constructSignatures = ts.concatenate(constructSignatures, getSignaturesOfType(instantiatedBaseType, 1 /* Construct */));
                stringIndexType = stringIndexType || getIndexTypeOfType(instantiatedBaseType, 0 /* String */);
                numberIndexType = numberIndexType || getIndexTypeOfType(instantiatedBaseType, 1 /* Number */);
            });
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function createSignature(declaration, typeParameters, parameters, resolvedReturnType, minArgumentCount, hasRestParameter, hasStringLiterals) {
            let sig = new Signature(checker);
            sig.declaration = declaration;
            sig.typeParameters = typeParameters;
            sig.parameters = parameters;
            sig.resolvedReturnType = resolvedReturnType;
            sig.minArgumentCount = minArgumentCount;
            sig.hasRestParameter = hasRestParameter;
            sig.hasStringLiterals = hasStringLiterals;
            return sig;
        }
        function cloneSignature(sig) {
            return createSignature(sig.declaration, sig.typeParameters, sig.parameters, sig.resolvedReturnType, sig.minArgumentCount, sig.hasRestParameter, sig.hasStringLiterals);
        }
        function getDefaultConstructSignatures(classType) {
            if (classType.baseTypes.length) {
                let baseType = classType.baseTypes[0];
                let baseSignatures = getSignaturesOfType(getTypeOfSymbol(baseType.symbol), 1 /* Construct */);
                return ts.map(baseSignatures, baseSignature => {
                    let signature = baseType.flags & 4096 /* Reference */ ?
                        getSignatureInstantiation(baseSignature, baseType.typeArguments) : cloneSignature(baseSignature);
                    signature.typeParameters = classType.typeParameters;
                    signature.resolvedReturnType = classType;
                    return signature;
                });
            }
            return [createSignature(undefined, classType.typeParameters, emptyArray, classType, 0, false, false)];
        }
        function createTupleTypeMemberSymbols(memberTypes) {
            let members = {};
            for (let i = 0; i < memberTypes.length; i++) {
                let symbol = createSymbol(4 /* Property */ | 67108864 /* Transient */, "" + i);
                symbol.type = memberTypes[i];
                members[i] = symbol;
            }
            return members;
        }
        function resolveTupleTypeMembers(type) {
            let arrayType = resolveObjectOrUnionTypeMembers(createArrayType(getUnionType(type.elementTypes)));
            let members = createTupleTypeMemberSymbols(type.elementTypes);
            addInheritedMembers(members, arrayType.properties);
            setObjectTypeMembers(type, members, arrayType.callSignatures, arrayType.constructSignatures, arrayType.stringIndexType, arrayType.numberIndexType);
        }
        function signatureListsIdentical(s, t) {
            if (s.length !== t.length) {
                return false;
            }
            for (let i = 0; i < s.length; i++) {
                if (!compareSignatures(s[i], t[i], false, compareTypes)) {
                    return false;
                }
            }
            return true;
        }
        // If the lists of call or construct signatures in the given types are all identical except for return types,
        // and if none of the signatures are generic, return a list of signatures that has substitutes a union of the
        // return types of the corresponding signatures in each resulting signature.
        function getUnionSignatures(types, kind) {
            let signatureLists = ts.map(types, t => getSignaturesOfType(t, kind));
            let signatures = signatureLists[0];
            for (let signature of signatures) {
                if (signature.typeParameters) {
                    return emptyArray;
                }
            }
            for (let i = 1; i < signatureLists.length; i++) {
                if (!signatureListsIdentical(signatures, signatureLists[i])) {
                    return emptyArray;
                }
            }
            let result = ts.map(signatures, cloneSignature);
            for (var i = 0; i < result.length; i++) {
                let s = result[i];
                // Clear resolved return type we possibly got from cloneSignature
                s.resolvedReturnType = undefined;
                s.unionSignatures = ts.map(signatureLists, signatures => signatures[i]);
            }
            return result;
        }
        function getUnionIndexType(types, kind) {
            let indexTypes = [];
            for (let type of types) {
                let indexType = getIndexTypeOfType(type, kind);
                if (!indexType) {
                    return undefined;
                }
                indexTypes.push(indexType);
            }
            return getUnionType(indexTypes);
        }
        function resolveUnionTypeMembers(type) {
            // The members and properties collections are empty for union types. To get all properties of a union
            // type use getPropertiesOfType (only the language service uses this).
            let callSignatures = getUnionSignatures(type.types, 0 /* Call */);
            let constructSignatures = getUnionSignatures(type.types, 1 /* Construct */);
            let stringIndexType = getUnionIndexType(type.types, 0 /* String */);
            let numberIndexType = getUnionIndexType(type.types, 1 /* Number */);
            setObjectTypeMembers(type, emptySymbols, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveAnonymousTypeMembers(type) {
            let symbol = type.symbol;
            let members;
            let callSignatures;
            let constructSignatures;
            let stringIndexType;
            let numberIndexType;
            if (symbol.flags & 2048 /* TypeLiteral */) {
                members = symbol.members;
                callSignatures = getSignaturesOfSymbol(members["__call"]);
                constructSignatures = getSignaturesOfSymbol(members["__new"]);
                stringIndexType = getIndexTypeOfSymbol(symbol, 0 /* String */);
                numberIndexType = getIndexTypeOfSymbol(symbol, 1 /* Number */);
            }
            else {
                // Combinations of function, class, enum and module
                members = emptySymbols;
                callSignatures = emptyArray;
                constructSignatures = emptyArray;
                if (symbol.flags & 1952 /* HasExports */) {
                    members = getExportsOfSymbol(symbol);
                }
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */)) {
                    callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & 32 /* Class */) {
                    let classType = getDeclaredTypeOfClass(symbol);
                    constructSignatures = getSignaturesOfSymbol(symbol.members["__constructor"]);
                    if (!constructSignatures.length) {
                        constructSignatures = getDefaultConstructSignatures(classType);
                    }
                    if (classType.baseTypes.length) {
                        members = createSymbolTable(getNamedMembers(members));
                        addInheritedMembers(members, getPropertiesOfObjectType(getTypeOfSymbol(classType.baseTypes[0].symbol)));
                    }
                }
                stringIndexType = undefined;
                numberIndexType = (symbol.flags & 384 /* Enum */) ? stringType : undefined;
            }
            setObjectTypeMembers(type, members, callSignatures, constructSignatures, stringIndexType, numberIndexType);
        }
        function resolveObjectOrUnionTypeMembers(type) {
            if (!type.members) {
                if (type.flags & (1024 /* Class */ | 2048 /* Interface */)) {
                    resolveClassOrInterfaceMembers(type);
                }
                else if (type.flags & 32768 /* Anonymous */) {
                    resolveAnonymousTypeMembers(type);
                }
                else if (type.flags & 8192 /* Tuple */) {
                    resolveTupleTypeMembers(type);
                }
                else if (type.flags & 16384 /* Union */) {
                    resolveUnionTypeMembers(type);
                }
                else {
                    resolveTypeReferenceMembers(type);
                }
            }
            return type;
        }
        // Return properties of an object type or an empty array for other types
        function getPropertiesOfObjectType(type) {
            if (type.flags & 48128 /* ObjectType */) {
                return resolveObjectOrUnionTypeMembers(type).properties;
            }
            return emptyArray;
        }
        // If the given type is an object type and that type has a property by the given name, return
        // the symbol for that property. Otherwise return undefined.
        function getPropertyOfObjectType(type, name) {
            if (type.flags & 48128 /* ObjectType */) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                if (ts.hasProperty(resolved.members, name)) {
                    let symbol = resolved.members[name];
                    if (symbolIsValue(symbol)) {
                        return symbol;
                    }
                }
            }
        }
        function getPropertiesOfUnionType(type) {
            let result = [];
            ts.forEach(getPropertiesOfType(type.types[0]), prop => {
                let unionProp = getPropertyOfUnionType(type, prop.name);
                if (unionProp) {
                    result.push(unionProp);
                }
            });
            return result;
        }
        function getPropertiesOfType(type) {
            if (type.flags & 16384 /* Union */) {
                return getPropertiesOfUnionType(type);
            }
            return getPropertiesOfObjectType(getApparentType(type));
        }
        // For a type parameter, return the base constraint of the type parameter. For the string, number,
        // boolean, and symbol primitive types, return the corresponding object types. Otherwise return the
        // type itself. Note that the apparent type of a union type is the union type itself.
        function getApparentType(type) {
            if (type.flags & 512 /* TypeParameter */) {
                do {
                    type = getConstraintOfTypeParameter(type);
                } while (type && type.flags & 512 /* TypeParameter */);
                if (!type) {
                    type = emptyObjectType;
                }
            }
            if (type.flags & 258 /* StringLike */) {
                type = globalStringType;
            }
            else if (type.flags & 132 /* NumberLike */) {
                type = globalNumberType;
            }
            else if (type.flags & 8 /* Boolean */) {
                type = globalBooleanType;
            }
            else if (type.flags & 1048576 /* ESSymbol */) {
                type = globalESSymbolType;
            }
            return type;
        }
        function createUnionProperty(unionType, name) {
            let types = unionType.types;
            let props;
            for (let current of types) {
                let type = getApparentType(current);
                if (type !== unknownType) {
                    let prop = getPropertyOfType(type, name);
                    if (!prop) {
                        return undefined;
                    }
                    if (!props) {
                        props = [prop];
                    }
                    else {
                        props.push(prop);
                    }
                }
            }
            let propTypes = [];
            let declarations = [];
            for (let prop of props) {
                if (prop.declarations) {
                    declarations.push.apply(declarations, prop.declarations);
                }
                propTypes.push(getTypeOfSymbol(prop));
            }
            let result = createSymbol(4 /* Property */ | 67108864 /* Transient */ | 268435456 /* UnionProperty */, name);
            result.unionType = unionType;
            result.declarations = declarations;
            result.type = getUnionType(propTypes);
            return result;
        }
        function getPropertyOfUnionType(type, name) {
            let properties = type.resolvedProperties || (type.resolvedProperties = {});
            if (ts.hasProperty(properties, name)) {
                return properties[name];
            }
            let property = createUnionProperty(type, name);
            if (property) {
                properties[name] = property;
            }
            return property;
        }
        // Return the symbol for the property with the given name in the given type. Creates synthetic union properties when
        // necessary, maps primitive types and type parameters are to their apparent types, and augments with properties from
        // Object and Function as appropriate.
        function getPropertyOfType(type, name) {
            if (type.flags & 16384 /* Union */) {
                return getPropertyOfUnionType(type, name);
            }
            if (!(type.flags & 48128 /* ObjectType */)) {
                type = getApparentType(type);
                if (!(type.flags & 48128 /* ObjectType */)) {
                    return undefined;
                }
            }
            let resolved = resolveObjectOrUnionTypeMembers(type);
            if (ts.hasProperty(resolved.members, name)) {
                let symbol = resolved.members[name];
                if (symbolIsValue(symbol)) {
                    return symbol;
                }
            }
            if (resolved === anyFunctionType || resolved.callSignatures.length || resolved.constructSignatures.length) {
                let symbol = getPropertyOfObjectType(globalFunctionType, name);
                if (symbol)
                    return symbol;
            }
            return getPropertyOfObjectType(globalObjectType, name);
        }
        function getSignaturesOfObjectOrUnionType(type, kind) {
            if (type.flags & (48128 /* ObjectType */ | 16384 /* Union */)) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === 0 /* Call */ ? resolved.callSignatures : resolved.constructSignatures;
            }
            return emptyArray;
        }
        // Return the signatures of the given kind in the given type. Creates synthetic union signatures when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getSignaturesOfType(type, kind) {
            return getSignaturesOfObjectOrUnionType(getApparentType(type), kind);
        }
        function typeHasCallOrConstructSignatures(type) {
            let apparentType = getApparentType(type);
            if (apparentType.flags & (48128 /* ObjectType */ | 16384 /* Union */)) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                return resolved.callSignatures.length > 0
                    || resolved.constructSignatures.length > 0;
            }
            return false;
        }
        function getIndexTypeOfObjectOrUnionType(type, kind) {
            if (type.flags & (48128 /* ObjectType */ | 16384 /* Union */)) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                return kind === 0 /* String */ ? resolved.stringIndexType : resolved.numberIndexType;
            }
        }
        // Return the index type of the given kind in the given type. Creates synthetic union index types when necessary and
        // maps primitive types and type parameters are to their apparent types.
        function getIndexTypeOfType(type, kind) {
            return getIndexTypeOfObjectOrUnionType(getApparentType(type), kind);
        }
        // Return list of type parameters with duplicates removed (duplicate identifier errors are generated in the actual
        // type checking functions).
        function getTypeParametersFromDeclaration(typeParameterDeclarations) {
            let result = [];
            ts.forEach(typeParameterDeclarations, node => {
                let tp = getDeclaredTypeOfTypeParameter(node.symbol);
                if (!ts.contains(result, tp)) {
                    result.push(tp);
                }
            });
            return result;
        }
        function symbolsToArray(symbols) {
            let result = [];
            for (let id in symbols) {
                if (!isReservedMemberName(id)) {
                    result.push(symbols[id]);
                }
            }
            return result;
        }
        function getSignatureFromDeclaration(declaration) {
            let links = getNodeLinks(declaration);
            if (!links.resolvedSignature) {
                let classType = declaration.kind === 135 /* Constructor */ ? getDeclaredTypeOfClass(declaration.parent.symbol) : undefined;
                let typeParameters = classType ? classType.typeParameters :
                    declaration.typeParameters ? getTypeParametersFromDeclaration(declaration.typeParameters) : undefined;
                let parameters = [];
                let hasStringLiterals = false;
                let minArgumentCount = -1;
                for (let i = 0, n = declaration.parameters.length; i < n; i++) {
                    let param = declaration.parameters[i];
                    parameters.push(param.symbol);
                    if (param.type && param.type.kind === 8 /* StringLiteral */) {
                        hasStringLiterals = true;
                    }
                    if (minArgumentCount < 0) {
                        if (param.initializer || param.questionToken || param.dotDotDotToken) {
                            minArgumentCount = i;
                        }
                    }
                }
                if (minArgumentCount < 0) {
                    minArgumentCount = declaration.parameters.length;
                }
                let returnType;
                if (classType) {
                    returnType = classType;
                }
                else if (declaration.type) {
                    returnType = getTypeFromTypeNodeOrHeritageClauseElement(declaration.type);
                }
                else {
                    // TypeScript 1.0 spec (April 2014):
                    // If only one accessor includes a type annotation, the other behaves as if it had the same type annotation.
                    if (declaration.kind === 136 /* GetAccessor */ && !ts.hasDynamicName(declaration)) {
                        let setter = ts.getDeclarationOfKind(declaration.symbol, 137 /* SetAccessor */);
                        returnType = getAnnotatedAccessorType(setter);
                    }
                    if (!returnType && ts.nodeIsMissing(declaration.body)) {
                        returnType = anyType;
                    }
                }
                links.resolvedSignature = createSignature(declaration, typeParameters, parameters, returnType, minArgumentCount, ts.hasRestParameters(declaration), hasStringLiterals);
            }
            return links.resolvedSignature;
        }
        function getSignaturesOfSymbol(symbol) {
            if (!symbol)
                return emptyArray;
            let result = [];
            for (let i = 0, len = symbol.declarations.length; i < len; i++) {
                let node = symbol.declarations[i];
                switch (node.kind) {
                    case 142 /* FunctionType */:
                    case 143 /* ConstructorType */:
                    case 200 /* FunctionDeclaration */:
                    case 134 /* MethodDeclaration */:
                    case 133 /* MethodSignature */:
                    case 135 /* Constructor */:
                    case 138 /* CallSignature */:
                    case 139 /* ConstructSignature */:
                    case 140 /* IndexSignature */:
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                    case 162 /* FunctionExpression */:
                    case 163 /* ArrowFunction */:
                        // Don't include signature if node is the implementation of an overloaded function. A node is considered
                        // an implementation node if it has a body and the previous node is of the same kind and immediately
                        // precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
                        if (i > 0 && node.body) {
                            let previous = symbol.declarations[i - 1];
                            if (node.parent === previous.parent && node.kind === previous.kind && node.pos === previous.end) {
                                break;
                            }
                        }
                        result.push(getSignatureFromDeclaration(node));
                }
            }
            return result;
        }
        function getReturnTypeOfSignature(signature) {
            if (!signature.resolvedReturnType) {
                signature.resolvedReturnType = resolvingType;
                let type;
                if (signature.target) {
                    type = instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper);
                }
                else if (signature.unionSignatures) {
                    type = getUnionType(ts.map(signature.unionSignatures, getReturnTypeOfSignature));
                }
                else {
                    type = getReturnTypeFromBody(signature.declaration);
                }
                if (signature.resolvedReturnType === resolvingType) {
                    signature.resolvedReturnType = type;
                }
            }
            else if (signature.resolvedReturnType === resolvingType) {
                signature.resolvedReturnType = anyType;
                if (compilerOptions.noImplicitAny) {
                    let declaration = signature.declaration;
                    if (declaration.name) {
                        error(declaration.name, ts.Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, ts.declarationNameToString(declaration.name));
                    }
                    else {
                        error(declaration, ts.Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
                    }
                }
            }
            return signature.resolvedReturnType;
        }
        function getRestTypeOfSignature(signature) {
            if (signature.hasRestParameter) {
                let type = getTypeOfSymbol(signature.parameters[signature.parameters.length - 1]);
                if (type.flags & 4096 /* Reference */ && type.target === globalArrayType) {
                    return type.typeArguments[0];
                }
            }
            return anyType;
        }
        function getSignatureInstantiation(signature, typeArguments) {
            return instantiateSignature(signature, createTypeMapper(signature.typeParameters, typeArguments), true);
        }
        function getErasedSignature(signature) {
            if (!signature.typeParameters)
                return signature;
            if (!signature.erasedSignatureCache) {
                if (signature.target) {
                    signature.erasedSignatureCache = instantiateSignature(getErasedSignature(signature.target), signature.mapper);
                }
                else {
                    signature.erasedSignatureCache = instantiateSignature(signature, createTypeEraser(signature.typeParameters), true);
                }
            }
            return signature.erasedSignatureCache;
        }
        function getOrCreateTypeFromSignature(signature) {
            // There are two ways to declare a construct signature, one is by declaring a class constructor
            // using the constructor keyword, and the other is declaring a bare construct signature in an
            // object type literal or interface (using the new keyword). Each way of declaring a constructor
            // will result in a different declaration kind.
            if (!signature.isolatedSignatureType) {
                let isConstructor = signature.declaration.kind === 135 /* Constructor */ || signature.declaration.kind === 139 /* ConstructSignature */;
                let type = createObjectType(32768 /* Anonymous */ | 65536 /* FromSignature */);
                type.members = emptySymbols;
                type.properties = emptyArray;
                type.callSignatures = !isConstructor ? [signature] : emptyArray;
                type.constructSignatures = isConstructor ? [signature] : emptyArray;
                signature.isolatedSignatureType = type;
            }
            return signature.isolatedSignatureType;
        }
        function getIndexSymbol(symbol) {
            return symbol.members["__index"];
        }
        function getIndexDeclarationOfSymbol(symbol, kind) {
            let syntaxKind = kind === 1 /* Number */ ? 119 /* NumberKeyword */ : 121 /* StringKeyword */;
            let indexSymbol = getIndexSymbol(symbol);
            if (indexSymbol) {
                let len = indexSymbol.declarations.length;
                for (let decl of indexSymbol.declarations) {
                    let node = decl;
                    if (node.parameters.length === 1) {
                        let parameter = node.parameters[0];
                        if (parameter && parameter.type && parameter.type.kind === syntaxKind) {
                            return node;
                        }
                    }
                }
            }
            return undefined;
        }
        function getIndexTypeOfSymbol(symbol, kind) {
            let declaration = getIndexDeclarationOfSymbol(symbol, kind);
            return declaration
                ? declaration.type ? getTypeFromTypeNodeOrHeritageClauseElement(declaration.type) : anyType
                : undefined;
        }
        function getConstraintOfTypeParameter(type) {
            if (!type.constraint) {
                if (type.target) {
                    let targetConstraint = getConstraintOfTypeParameter(type.target);
                    type.constraint = targetConstraint ? instantiateType(targetConstraint, type.mapper) : noConstraintType;
                }
                else {
                    type.constraint = getTypeFromTypeNodeOrHeritageClauseElement(ts.getDeclarationOfKind(type.symbol, 128 /* TypeParameter */).constraint);
                }
            }
            return type.constraint === noConstraintType ? undefined : type.constraint;
        }
        function getTypeListId(types) {
            switch (types.length) {
                case 1:
                    return "" + types[0].id;
                case 2:
                    return types[0].id + "," + types[1].id;
                default:
                    let result = "";
                    for (let i = 0; i < types.length; i++) {
                        if (i > 0) {
                            result += ",";
                        }
                        result += types[i].id;
                    }
                    return result;
            }
        }
        // This function is used to propagate widening flags when creating new object types references and union types.
        // It is only necessary to do so if a constituent type might be the undefined type, the null type, or the type
        // of an object literal (since those types have widening related information we need to track).
        function getWideningFlagsOfTypes(types) {
            let result = 0;
            for (let type of types) {
                result |= type.flags;
            }
            return result & 786432 /* RequiresWidening */;
        }
        function createTypeReference(target, typeArguments) {
            let id = getTypeListId(typeArguments);
            let type = target.instantiations[id];
            if (!type) {
                let flags = 4096 /* Reference */ | getWideningFlagsOfTypes(typeArguments);
                type = target.instantiations[id] = createObjectType(flags, target.symbol);
                type.target = target;
                type.typeArguments = typeArguments;
            }
            return type;
        }
        function isTypeParameterReferenceIllegalInConstraint(typeReferenceNode, typeParameterSymbol) {
            let links = getNodeLinks(typeReferenceNode);
            if (links.isIllegalTypeReferenceInConstraint !== undefined) {
                return links.isIllegalTypeReferenceInConstraint;
            }
            // bubble up to the declaration
            let currentNode = typeReferenceNode;
            // forEach === exists
            while (!ts.forEach(typeParameterSymbol.declarations, d => d.parent === currentNode.parent)) {
                currentNode = currentNode.parent;
            }
            // if last step was made from the type parameter this means that path has started somewhere in constraint which is illegal
            links.isIllegalTypeReferenceInConstraint = currentNode.kind === 128 /* TypeParameter */;
            return links.isIllegalTypeReferenceInConstraint;
        }
        function checkTypeParameterHasIllegalReferencesInConstraint(typeParameter) {
            let typeParameterSymbol;
            function check(n) {
                if (n.kind === 141 /* TypeReference */ && n.typeName.kind === 65 /* Identifier */) {
                    let links = getNodeLinks(n);
                    if (links.isIllegalTypeReferenceInConstraint === undefined) {
                        let symbol = resolveName(typeParameter, n.typeName.text, 793056 /* Type */, undefined, undefined);
                        if (symbol && (symbol.flags & 262144 /* TypeParameter */)) {
                            // TypeScript 1.0 spec (April 2014): 3.4.1
                            // Type parameters declared in a particular type parameter list
                            // may not be referenced in constraints in that type parameter list
                            // symbol.declaration.parent === typeParameter.parent
                            // -> typeParameter and symbol.declaration originate from the same type parameter list
                            // -> illegal for all declarations in symbol
                            // forEach === exists
                            links.isIllegalTypeReferenceInConstraint = ts.forEach(symbol.declarations, d => d.parent == typeParameter.parent);
                        }
                    }
                    if (links.isIllegalTypeReferenceInConstraint) {
                        error(typeParameter, ts.Diagnostics.Constraint_of_a_type_parameter_cannot_reference_any_type_parameter_from_the_same_type_parameter_list);
                    }
                }
                ts.forEachChild(n, check);
            }
            if (typeParameter.constraint) {
                typeParameterSymbol = getSymbolOfNode(typeParameter);
                check(typeParameter.constraint);
            }
        }
        function getTypeFromTypeReference(node) {
            return getTypeFromTypeReferenceOrHeritageClauseElement(node);
        }
        function getTypeFromHeritageClauseElement(node) {
            return getTypeFromTypeReferenceOrHeritageClauseElement(node);
        }
        function getTypeFromTypeReferenceOrHeritageClauseElement(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                let type;
                // We don't currently support heritage clauses with complex expressions in them.
                // For these cases, we just set the type to be the unknownType.
                if (node.kind !== 177 /* HeritageClauseElement */ || ts.isSupportedHeritageClauseElement(node)) {
                    let typeNameOrExpression = node.kind === 141 /* TypeReference */
                        ? node.typeName
                        : node.expression;
                    let symbol = resolveEntityName(typeNameOrExpression, 793056 /* Type */);
                    if (symbol) {
                        if ((symbol.flags & 262144 /* TypeParameter */) && isTypeParameterReferenceIllegalInConstraint(node, symbol)) {
                            // TypeScript 1.0 spec (April 2014): 3.4.1
                            // Type parameters declared in a particular type parameter list
                            // may not be referenced in constraints in that type parameter list
                            // Implementation: such type references are resolved to 'unknown' type that usually denotes error
                            type = unknownType;
                        }
                        else {
                            type = getDeclaredTypeOfSymbol(symbol);
                            if (type.flags & (1024 /* Class */ | 2048 /* Interface */) && type.flags & 4096 /* Reference */) {
                                let typeParameters = type.typeParameters;
                                if (node.typeArguments && node.typeArguments.length === typeParameters.length) {
                                    type = createTypeReference(type, ts.map(node.typeArguments, getTypeFromTypeNodeOrHeritageClauseElement));
                                }
                                else {
                                    error(node, ts.Diagnostics.Generic_type_0_requires_1_type_argument_s, typeToString(type, undefined, 1 /* WriteArrayAsGenericType */), typeParameters.length);
                                    type = undefined;
                                }
                            }
                            else {
                                if (node.typeArguments) {
                                    error(node, ts.Diagnostics.Type_0_is_not_generic, typeToString(type));
                                    type = undefined;
                                }
                            }
                        }
                    }
                }
                links.resolvedType = type || unknownType;
            }
            return links.resolvedType;
        }
        function getTypeFromTypeQueryNode(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                // TypeScript 1.0 spec (April 2014): 3.6.3
                // The expression is processed as an identifier expression (section 4.3)
                // or property access expression(section 4.10),
                // the widened type(section 3.9) of which becomes the result.
                links.resolvedType = getWidenedType(checkExpressionOrQualifiedName(node.exprName));
            }
            return links.resolvedType;
        }
        function getTypeOfGlobalSymbol(symbol, arity) {
            function getTypeDeclaration(symbol) {
                let declarations = symbol.declarations;
                for (let declaration of declarations) {
                    switch (declaration.kind) {
                        case 201 /* ClassDeclaration */:
                        case 202 /* InterfaceDeclaration */:
                        case 204 /* EnumDeclaration */:
                            return declaration;
                    }
                }
            }
            if (!symbol) {
                return emptyObjectType;
            }
            let type = getDeclaredTypeOfSymbol(symbol);
            if (!(type.flags & 48128 /* ObjectType */)) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_be_a_class_or_interface_type, symbol.name);
                return emptyObjectType;
            }
            if ((type.typeParameters ? type.typeParameters.length : 0) !== arity) {
                error(getTypeDeclaration(symbol), ts.Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbol.name, arity);
                return emptyObjectType;
            }
            return type;
        }
        function getGlobalValueSymbol(name) {
            return getGlobalSymbol(name, 107455 /* Value */, ts.Diagnostics.Cannot_find_global_value_0);
        }
        function getGlobalTypeSymbol(name) {
            return getGlobalSymbol(name, 793056 /* Type */, ts.Diagnostics.Cannot_find_global_type_0);
        }
        function getGlobalSymbol(name, meaning, diagnostic) {
            return resolveName(undefined, name, meaning, diagnostic, name);
        }
        function getGlobalType(name, arity = 0) {
            return getTypeOfGlobalSymbol(getGlobalTypeSymbol(name), arity);
        }
        function getGlobalESSymbolConstructorSymbol() {
            return globalESSymbolConstructorSymbol || (globalESSymbolConstructorSymbol = getGlobalValueSymbol("Symbol"));
        }
        function createIterableType(elementType) {
            return globalIterableType !== emptyObjectType ? createTypeReference(globalIterableType, [elementType]) : emptyObjectType;
        }
        function createArrayType(elementType) {
            // globalArrayType will be undefined if we get here during creation of the Array type. This for example happens if
            // user code augments the Array type with call or construct signatures that have an array type as the return type.
            // We instead use globalArraySymbol to obtain the (not yet fully constructed) Array type.
            let arrayType = globalArrayType || getDeclaredTypeOfSymbol(globalArraySymbol);
            return arrayType !== emptyObjectType ? createTypeReference(arrayType, [elementType]) : emptyObjectType;
        }
        function getTypeFromArrayTypeNode(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createArrayType(getTypeFromTypeNodeOrHeritageClauseElement(node.elementType));
            }
            return links.resolvedType;
        }
        function createTupleType(elementTypes) {
            let id = getTypeListId(elementTypes);
            let type = tupleTypes[id];
            if (!type) {
                type = tupleTypes[id] = createObjectType(8192 /* Tuple */);
                type.elementTypes = elementTypes;
            }
            return type;
        }
        function getTypeFromTupleTypeNode(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = createTupleType(ts.map(node.elementTypes, getTypeFromTypeNodeOrHeritageClauseElement));
            }
            return links.resolvedType;
        }
        function addTypeToSortedSet(sortedSet, type) {
            if (type.flags & 16384 /* Union */) {
                addTypesToSortedSet(sortedSet, type.types);
            }
            else {
                let i = 0;
                let id = type.id;
                while (i < sortedSet.length && sortedSet[i].id < id) {
                    i++;
                }
                if (i === sortedSet.length || sortedSet[i].id !== id) {
                    sortedSet.splice(i, 0, type);
                }
            }
        }
        function addTypesToSortedSet(sortedTypes, types) {
            for (let type of types) {
                addTypeToSortedSet(sortedTypes, type);
            }
        }
        function isSubtypeOfAny(candidate, types) {
            for (let type of types) {
                if (candidate !== type && isTypeSubtypeOf(candidate, type)) {
                    return true;
                }
            }
            return false;
        }
        function removeSubtypes(types) {
            let i = types.length;
            while (i > 0) {
                i--;
                if (isSubtypeOfAny(types[i], types)) {
                    types.splice(i, 1);
                }
            }
        }
        function containsAnyType(types) {
            for (let type of types) {
                if (type.flags & 1 /* Any */) {
                    return true;
                }
            }
            return false;
        }
        function removeAllButLast(types, typeToRemove) {
            let i = types.length;
            while (i > 0 && types.length > 1) {
                i--;
                if (types[i] === typeToRemove) {
                    types.splice(i, 1);
                }
            }
        }
        function getUnionType(types, noSubtypeReduction) {
            if (types.length === 0) {
                return emptyObjectType;
            }
            let sortedTypes = [];
            addTypesToSortedSet(sortedTypes, types);
            if (noSubtypeReduction) {
                if (containsAnyType(sortedTypes)) {
                    return anyType;
                }
                removeAllButLast(sortedTypes, undefinedType);
                removeAllButLast(sortedTypes, nullType);
            }
            else {
                removeSubtypes(sortedTypes);
            }
            if (sortedTypes.length === 1) {
                return sortedTypes[0];
            }
            let id = getTypeListId(sortedTypes);
            let type = unionTypes[id];
            if (!type) {
                type = unionTypes[id] = createObjectType(16384 /* Union */ | getWideningFlagsOfTypes(sortedTypes));
                type.types = sortedTypes;
            }
            return type;
        }
        function getTypeFromUnionTypeNode(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getUnionType(ts.map(node.types, getTypeFromTypeNodeOrHeritageClauseElement), true);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                // Deferred resolution of members is handled by resolveObjectTypeMembers
                links.resolvedType = createObjectType(32768 /* Anonymous */, node.symbol);
            }
            return links.resolvedType;
        }
        function getStringLiteralType(node) {
            if (ts.hasProperty(stringLiteralTypes, node.text)) {
                return stringLiteralTypes[node.text];
            }
            let type = stringLiteralTypes[node.text] = createType(256 /* StringLiteral */);
            type.text = ts.getTextOfNode(node);
            return type;
        }
        function getTypeFromStringLiteral(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = getStringLiteralType(node);
            }
            return links.resolvedType;
        }
        function getTypeFromTypeNodeOrHeritageClauseElement(node) {
            switch (node.kind) {
                case 112 /* AnyKeyword */:
                    return anyType;
                case 121 /* StringKeyword */:
                    return stringType;
                case 119 /* NumberKeyword */:
                    return numberType;
                case 113 /* BooleanKeyword */:
                    return booleanType;
                case 122 /* SymbolKeyword */:
                    return esSymbolType;
                case 99 /* VoidKeyword */:
                    return voidType;
                case 8 /* StringLiteral */:
                    return getTypeFromStringLiteral(node);
                case 141 /* TypeReference */:
                    return getTypeFromTypeReference(node);
                case 177 /* HeritageClauseElement */:
                    return getTypeFromHeritageClauseElement(node);
                case 144 /* TypeQuery */:
                    return getTypeFromTypeQueryNode(node);
                case 146 /* ArrayType */:
                    return getTypeFromArrayTypeNode(node);
                case 147 /* TupleType */:
                    return getTypeFromTupleTypeNode(node);
                case 148 /* UnionType */:
                    return getTypeFromUnionTypeNode(node);
                case 149 /* ParenthesizedType */:
                    return getTypeFromTypeNodeOrHeritageClauseElement(node.type);
                case 142 /* FunctionType */:
                case 143 /* ConstructorType */:
                case 145 /* TypeLiteral */:
                    return getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                // This function assumes that an identifier or qualified name is a type expression
                // Callers should first ensure this by calling isTypeNode
                case 65 /* Identifier */:
                case 126 /* QualifiedName */:
                    let symbol = getSymbolInfo(node);
                    return symbol && getDeclaredTypeOfSymbol(symbol);
                default:
                    return unknownType;
            }
        }
        function instantiateList(items, mapper, instantiator) {
            if (items && items.length) {
                let result = [];
                for (let v of items) {
                    result.push(instantiator(v, mapper));
                }
                return result;
            }
            return items;
        }
        function createUnaryTypeMapper(source, target) {
            return t => t === source ? target : t;
        }
        function createBinaryTypeMapper(source1, target1, source2, target2) {
            return t => t === source1 ? target1 : t === source2 ? target2 : t;
        }
        function createTypeMapper(sources, targets) {
            switch (sources.length) {
                case 1: return createUnaryTypeMapper(sources[0], targets[0]);
                case 2: return createBinaryTypeMapper(sources[0], targets[0], sources[1], targets[1]);
            }
            return t => {
                for (let i = 0; i < sources.length; i++) {
                    if (t === sources[i]) {
                        return targets[i];
                    }
                }
                return t;
            };
        }
        function createUnaryTypeEraser(source) {
            return t => t === source ? anyType : t;
        }
        function createBinaryTypeEraser(source1, source2) {
            return t => t === source1 || t === source2 ? anyType : t;
        }
        function createTypeEraser(sources) {
            switch (sources.length) {
                case 1: return createUnaryTypeEraser(sources[0]);
                case 2: return createBinaryTypeEraser(sources[0], sources[1]);
            }
            return t => {
                for (let source of sources) {
                    if (t === source) {
                        return anyType;
                    }
                }
                return t;
            };
        }
        function createInferenceMapper(context) {
            return t => {
                for (let i = 0; i < context.typeParameters.length; i++) {
                    if (t === context.typeParameters[i]) {
                        context.inferences[i].isFixed = true;
                        return getInferredType(context, i);
                    }
                }
                return t;
            };
        }
        function identityMapper(type) {
            return type;
        }
        function combineTypeMappers(mapper1, mapper2) {
            return t => mapper2(mapper1(t));
        }
        function instantiateTypeParameter(typeParameter, mapper) {
            let result = createType(512 /* TypeParameter */);
            result.symbol = typeParameter.symbol;
            if (typeParameter.constraint) {
                result.constraint = instantiateType(typeParameter.constraint, mapper);
            }
            else {
                result.target = typeParameter;
                result.mapper = mapper;
            }
            return result;
        }
        function instantiateSignature(signature, mapper, eraseTypeParameters) {
            let freshTypeParameters;
            if (signature.typeParameters && !eraseTypeParameters) {
                freshTypeParameters = instantiateList(signature.typeParameters, mapper, instantiateTypeParameter);
                mapper = combineTypeMappers(createTypeMapper(signature.typeParameters, freshTypeParameters), mapper);
            }
            let result = createSignature(signature.declaration, freshTypeParameters, instantiateList(signature.parameters, mapper, instantiateSymbol), signature.resolvedReturnType ? instantiateType(signature.resolvedReturnType, mapper) : undefined, signature.minArgumentCount, signature.hasRestParameter, signature.hasStringLiterals);
            result.target = signature;
            result.mapper = mapper;
            return result;
        }
        function instantiateSymbol(symbol, mapper) {
            if (symbol.flags & 16777216 /* Instantiated */) {
                let links = getSymbolLinks(symbol);
                // If symbol being instantiated is itself a instantiation, fetch the original target and combine the
                // type mappers. This ensures that original type identities are properly preserved and that aliases
                // always reference a non-aliases.
                symbol = links.target;
                mapper = combineTypeMappers(links.mapper, mapper);
            }
            // Keep the flags from the symbol we're instantiating.  Mark that is instantiated, and
            // also transient so that we can just store data on it directly.
            let result = createSymbol(16777216 /* Instantiated */ | 67108864 /* Transient */ | symbol.flags, symbol.name);
            result.declarations = symbol.declarations;
            result.parent = symbol.parent;
            result.target = symbol;
            result.mapper = mapper;
            if (symbol.valueDeclaration) {
                result.valueDeclaration = symbol.valueDeclaration;
            }
            return result;
        }
        function instantiateAnonymousType(type, mapper) {
            let result = createObjectType(32768 /* Anonymous */, type.symbol);
            result.properties = instantiateList(getPropertiesOfObjectType(type), mapper, instantiateSymbol);
            result.members = createSymbolTable(result.properties);
            result.callSignatures = instantiateList(getSignaturesOfType(type, 0 /* Call */), mapper, instantiateSignature);
            result.constructSignatures = instantiateList(getSignaturesOfType(type, 1 /* Construct */), mapper, instantiateSignature);
            let stringIndexType = getIndexTypeOfType(type, 0 /* String */);
            let numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
            if (stringIndexType)
                result.stringIndexType = instantiateType(stringIndexType, mapper);
            if (numberIndexType)
                result.numberIndexType = instantiateType(numberIndexType, mapper);
            return result;
        }
        function instantiateType(type, mapper) {
            if (mapper !== identityMapper) {
                if (type.flags & 512 /* TypeParameter */) {
                    return mapper(type);
                }
                if (type.flags & 32768 /* Anonymous */) {
                    return type.symbol && type.symbol.flags & (16 /* Function */ | 8192 /* Method */ | 2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */) ?
                        instantiateAnonymousType(type, mapper) : type;
                }
                if (type.flags & 4096 /* Reference */) {
                    return createTypeReference(type.target, instantiateList(type.typeArguments, mapper, instantiateType));
                }
                if (type.flags & 8192 /* Tuple */) {
                    return createTupleType(instantiateList(type.elementTypes, mapper, instantiateType));
                }
                if (type.flags & 16384 /* Union */) {
                    return getUnionType(instantiateList(type.types, mapper, instantiateType), true);
                }
            }
            return type;
        }
        // Returns true if the given expression contains (at any level of nesting) a function or arrow expression
        // that is subject to contextual typing.
        function isContextSensitive(node) {
            ts.Debug.assert(node.kind !== 134 /* MethodDeclaration */ || ts.isObjectLiteralMethod(node));
            switch (node.kind) {
                case 162 /* FunctionExpression */:
                case 163 /* ArrowFunction */:
                    return isContextSensitiveFunctionLikeDeclaration(node);
                case 154 /* ObjectLiteralExpression */:
                    return ts.forEach(node.properties, isContextSensitive);
                case 153 /* ArrayLiteralExpression */:
                    return ts.forEach(node.elements, isContextSensitive);
                case 170 /* ConditionalExpression */:
                    return isContextSensitive(node.whenTrue) ||
                        isContextSensitive(node.whenFalse);
                case 169 /* BinaryExpression */:
                    return node.operatorToken.kind === 49 /* BarBarToken */ &&
                        (isContextSensitive(node.left) || isContextSensitive(node.right));
                case 224 /* PropertyAssignment */:
                    return isContextSensitive(node.initializer);
                case 134 /* MethodDeclaration */:
                case 133 /* MethodSignature */:
                    return isContextSensitiveFunctionLikeDeclaration(node);
                case 161 /* ParenthesizedExpression */:
                    return isContextSensitive(node.expression);
            }
            return false;
        }
        function isContextSensitiveFunctionLikeDeclaration(node) {
            return !node.typeParameters && node.parameters.length && !ts.forEach(node.parameters, p => p.type);
        }
        function getTypeWithoutConstructors(type) {
            if (type.flags & 48128 /* ObjectType */) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.constructSignatures.length) {
                    let result = createObjectType(32768 /* Anonymous */, type.symbol);
                    result.members = resolved.members;
                    result.properties = resolved.properties;
                    result.callSignatures = resolved.callSignatures;
                    result.constructSignatures = emptyArray;
                    type = result;
                }
            }
            return type;
        }
        // TYPE CHECKING
        let subtypeRelation = {};
        let assignableRelation = {};
        let identityRelation = {};
        function isTypeIdenticalTo(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined);
        }
        function compareTypes(source, target) {
            return checkTypeRelatedTo(source, target, identityRelation, undefined) ? -1 /* True */ : 0 /* False */;
        }
        function isTypeSubtypeOf(source, target) {
            return checkTypeSubtypeOf(source, target, undefined);
        }
        function isTypeAssignableTo(source, target) {
            return checkTypeAssignableTo(source, target, undefined);
        }
        function checkTypeSubtypeOf(source, target, errorNode, headMessage, containingMessageChain) {
            return checkTypeRelatedTo(source, target, subtypeRelation, errorNode, headMessage, containingMessageChain);
        }
        function checkTypeAssignableTo(source, target, errorNode, headMessage) {
            return checkTypeRelatedTo(source, target, assignableRelation, errorNode, headMessage);
        }
        function isSignatureAssignableTo(source, target) {
            let sourceType = getOrCreateTypeFromSignature(source);
            let targetType = getOrCreateTypeFromSignature(target);
            return checkTypeRelatedTo(sourceType, targetType, assignableRelation, undefined);
        }
        function checkTypeRelatedTo(source, target, relation, errorNode, headMessage, containingMessageChain) {
            let errorInfo;
            let sourceStack;
            let targetStack;
            let maybeStack;
            let expandingFlags;
            let depth = 0;
            let overflow = false;
            let elaborateErrors = false;
            ts.Debug.assert(relation !== identityRelation || !errorNode, "no error reporting in identity checking");
            let result = isRelatedTo(source, target, errorNode !== undefined, headMessage);
            if (overflow) {
                error(errorNode, ts.Diagnostics.Excessive_stack_depth_comparing_types_0_and_1, typeToString(source), typeToString(target));
            }
            else if (errorInfo) {
                // If we already computed this relation, but in a context where we didn't want to report errors (e.g. overload resolution),
                // then we'll only have a top-level error (e.g. 'Class X does not implement interface Y') without any details. If this happened,
                // request a recompuation to get a complete error message. This will be skipped if we've already done this computation in a context
                // where errors were being reported.
                if (errorInfo.next === undefined) {
                    errorInfo = undefined;
                    elaborateErrors = true;
                    isRelatedTo(source, target, errorNode !== undefined, headMessage);
                }
                if (containingMessageChain) {
                    errorInfo = ts.concatenateDiagnosticMessageChains(containingMessageChain, errorInfo);
                }
                diagnostics.add(ts.createDiagnosticForNodeFromMessageChain(errorNode, errorInfo));
            }
            return result !== 0 /* False */;
            function reportError(message, arg0, arg1, arg2) {
                errorInfo = ts.chainDiagnosticMessages(errorInfo, message, arg0, arg1, arg2);
            }
            // Compare two types and return
            // Ternary.True if they are related with no assumptions,
            // Ternary.Maybe if they are related with assumptions of other relationships, or
            // Ternary.False if they are not related.
            function isRelatedTo(source, target, reportErrors, headMessage) {
                let result;
                // both types are the same - covers 'they are the same primitive type or both are Any' or the same type parameter cases
                if (source === target)
                    return -1 /* True */;
                if (relation !== identityRelation) {
                    if (target.flags & 1 /* Any */)
                        return -1 /* True */;
                    if (source === undefinedType)
                        return -1 /* True */;
                    if (source === nullType && target !== undefinedType)
                        return -1 /* True */;
                    if (source.flags & 128 /* Enum */ && target === numberType)
                        return -1 /* True */;
                    if (source.flags & 256 /* StringLiteral */ && target === stringType)
                        return -1 /* True */;
                    if (relation === assignableRelation) {
                        if (source.flags & 1 /* Any */)
                            return -1 /* True */;
                        if (source === numberType && target.flags & 128 /* Enum */)
                            return -1 /* True */;
                    }
                }
                if (source.flags & 16384 /* Union */ || target.flags & 16384 /* Union */) {
                    if (relation === identityRelation) {
                        if (source.flags & 16384 /* Union */ && target.flags & 16384 /* Union */) {
                            if (result = unionTypeRelatedToUnionType(source, target)) {
                                if (result &= unionTypeRelatedToUnionType(target, source)) {
                                    return result;
                                }
                            }
                        }
                        else if (source.flags & 16384 /* Union */) {
                            if (result = unionTypeRelatedToType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = unionTypeRelatedToType(target, source, reportErrors)) {
                                return result;
                            }
                        }
                    }
                    else {
                        if (source.flags & 16384 /* Union */) {
                            if (result = unionTypeRelatedToType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                        else {
                            if (result = typeRelatedToUnionType(source, target, reportErrors)) {
                                return result;
                            }
                        }
                    }
                }
                else if (source.flags & 512 /* TypeParameter */ && target.flags & 512 /* TypeParameter */) {
                    if (result = typeParameterRelatedTo(source, target, reportErrors)) {
                        return result;
                    }
                }
                else {
                    let saveErrorInfo = errorInfo;
                    if (source.flags & 4096 /* Reference */ && target.flags & 4096 /* Reference */ && source.target === target.target) {
                        // We have type references to same target type, see if relationship holds for all type arguments
                        if (result = typesRelatedTo(source.typeArguments, target.typeArguments, reportErrors)) {
                            return result;
                        }
                    }
                    // Even if relationship doesn't hold for type arguments, it may hold in a structural comparison
                    // Report structural errors only if we haven't reported any errors yet
                    let reportStructuralErrors = reportErrors && errorInfo === saveErrorInfo;
                    // identity relation does not use apparent type
                    let sourceOrApparentType = relation === identityRelation ? source : getApparentType(source);
                    if (sourceOrApparentType.flags & 48128 /* ObjectType */ && target.flags & 48128 /* ObjectType */ &&
                        (result = objectTypeRelatedTo(sourceOrApparentType, target, reportStructuralErrors))) {
                        errorInfo = saveErrorInfo;
                        return result;
                    }
                }
                if (reportErrors) {
                    headMessage = headMessage || ts.Diagnostics.Type_0_is_not_assignable_to_type_1;
                    let sourceType = typeToString(source);
                    let targetType = typeToString(target);
                    if (sourceType === targetType) {
                        sourceType = typeToString(source, undefined, 128 /* UseFullyQualifiedType */);
                        targetType = typeToString(target, undefined, 128 /* UseFullyQualifiedType */);
                    }
                    reportError(headMessage, sourceType, targetType);
                }
                return 0 /* False */;
            }
            function unionTypeRelatedToUnionType(source, target) {
                let result = -1 /* True */;
                let sourceTypes = source.types;
                for (let sourceType of sourceTypes) {
                    let related = typeRelatedToUnionType(sourceType, target, false);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function typeRelatedToUnionType(source, target, reportErrors) {
                let targetTypes = target.types;
                for (let i = 0, len = targetTypes.length; i < len; i++) {
                    let related = isRelatedTo(source, targetTypes[i], reportErrors && i === len - 1);
                    if (related) {
                        return related;
                    }
                }
                return 0 /* False */;
            }
            function unionTypeRelatedToType(source, target, reportErrors) {
                let result = -1 /* True */;
                let sourceTypes = source.types;
                for (let sourceType of sourceTypes) {
                    let related = isRelatedTo(sourceType, target, reportErrors);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function typesRelatedTo(sources, targets, reportErrors) {
                let result = -1 /* True */;
                for (let i = 0, len = sources.length; i < len; i++) {
                    let related = isRelatedTo(sources[i], targets[i], reportErrors);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function typeParameterRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    if (source.symbol.name !== target.symbol.name) {
                        return 0 /* False */;
                    }
                    // covers case when both type parameters does not have constraint (both equal to noConstraintType)
                    if (source.constraint === target.constraint) {
                        return -1 /* True */;
                    }
                    if (source.constraint === noConstraintType || target.constraint === noConstraintType) {
                        return 0 /* False */;
                    }
                    return isRelatedTo(source.constraint, target.constraint, reportErrors);
                }
                else {
                    while (true) {
                        let constraint = getConstraintOfTypeParameter(source);
                        if (constraint === target)
                            return -1 /* True */;
                        if (!(constraint && constraint.flags & 512 /* TypeParameter */))
                            break;
                        source = constraint;
                    }
                    return 0 /* False */;
                }
            }
            // Determine if two object types are related by structure. First, check if the result is already available in the global cache.
            // Second, check if we have already started a comparison of the given two types in which case we assume the result to be true.
            // Third, check if both types are part of deeply nested chains of generic type instantiations and if so assume the types are
            // equal and infinitely expanding. Fourth, if we have reached a depth of 100 nested comparisons, assume we have runaway recursion
            // and issue an error. Otherwise, actually compare the structure of the two types.
            function objectTypeRelatedTo(source, target, reportErrors) {
                if (overflow) {
                    return 0 /* False */;
                }
                let id = relation !== identityRelation || source.id < target.id ? source.id + "," + target.id : target.id + "," + source.id;
                let related = relation[id];
                //let related: RelationComparisonResult = undefined; // relation[id];
                if (related !== undefined) {
                    // If we computed this relation already and it was failed and reported, or if we're not being asked to elaborate
                    // errors, we can use the cached value. Otherwise, recompute the relation
                    if (!elaborateErrors || (related === 3 /* FailedAndReported */)) {
                        return related === 1 /* Succeeded */ ? -1 /* True */ : 0 /* False */;
                    }
                }
                if (depth > 0) {
                    for (let i = 0; i < depth; i++) {
                        // If source and target are already being compared, consider them related with assumptions
                        if (maybeStack[i][id]) {
                            return 1 /* Maybe */;
                        }
                    }
                    if (depth === 100) {
                        overflow = true;
                        return 0 /* False */;
                    }
                }
                else {
                    sourceStack = [];
                    targetStack = [];
                    maybeStack = [];
                    expandingFlags = 0;
                }
                sourceStack[depth] = source;
                targetStack[depth] = target;
                maybeStack[depth] = {};
                maybeStack[depth][id] = 1 /* Succeeded */;
                depth++;
                let saveExpandingFlags = expandingFlags;
                if (!(expandingFlags & 1) && isDeeplyNestedGeneric(source, sourceStack))
                    expandingFlags |= 1;
                if (!(expandingFlags & 2) && isDeeplyNestedGeneric(target, targetStack))
                    expandingFlags |= 2;
                let result;
                if (expandingFlags === 3) {
                    result = 1 /* Maybe */;
                }
                else {
                    result = propertiesRelatedTo(source, target, reportErrors);
                    if (result) {
                        result &= signaturesRelatedTo(source, target, 0 /* Call */, reportErrors);
                        if (result) {
                            result &= signaturesRelatedTo(source, target, 1 /* Construct */, reportErrors);
                            if (result) {
                                result &= stringIndexTypesRelatedTo(source, target, reportErrors);
                                if (result) {
                                    result &= numberIndexTypesRelatedTo(source, target, reportErrors);
                                }
                            }
                        }
                    }
                }
                expandingFlags = saveExpandingFlags;
                depth--;
                if (result) {
                    let maybeCache = maybeStack[depth];
                    // If result is definitely true, copy assumptions to global cache, else copy to next level up
                    let destinationCache = (result === -1 /* True */ || depth === 0) ? relation : maybeStack[depth - 1];
                    ts.copyMap(maybeCache, destinationCache);
                }
                else {
                    // A false result goes straight into global cache (when something is false under assumptions it
                    // will also be false without assumptions)
                    relation[id] = reportErrors ? 3 /* FailedAndReported */ : 2 /* Failed */;
                }
                return result;
            }
            // Return true if the given type is part of a deeply nested chain of generic instantiations. We consider this to be the case
            // when structural type comparisons have been started for 10 or more instantiations of the same generic type. It is possible,
            // though highly unlikely, for this test to be true in a situation where a chain of instantiations is not infinitely expanding.
            // Effectively, we will generate a false positive when two types are structurally equal to at least 10 levels, but unequal at
            // some level beyond that.
            function isDeeplyNestedGeneric(type, stack) {
                if (type.flags & 4096 /* Reference */ && depth >= 10) {
                    let target = type.target;
                    let count = 0;
                    for (let i = 0; i < depth; i++) {
                        let t = stack[i];
                        if (t.flags & 4096 /* Reference */ && t.target === target) {
                            count++;
                            if (count >= 10)
                                return true;
                        }
                    }
                }
                return false;
            }
            function propertiesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return propertiesIdenticalTo(source, target);
                }
                let result = -1 /* True */;
                let properties = getPropertiesOfObjectType(target);
                let requireOptionalProperties = relation === subtypeRelation && !(source.flags & 131072 /* ObjectLiteral */);
                for (let targetProp of properties) {
                    let sourceProp = getPropertyOfType(source, targetProp.name);
                    if (sourceProp !== targetProp) {
                        if (!sourceProp) {
                            if (!(targetProp.flags & 536870912 /* Optional */) || requireOptionalProperties) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_missing_in_type_1, symbolToString(targetProp), typeToString(source));
                                }
                                return 0 /* False */;
                            }
                        }
                        else if (!(targetProp.flags & 134217728 /* Prototype */)) {
                            let sourceFlags = getDeclarationFlagsFromSymbol(sourceProp);
                            let targetFlags = getDeclarationFlagsFromSymbol(targetProp);
                            if (sourceFlags & 32 /* Private */ || targetFlags & 32 /* Private */) {
                                if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                                    if (reportErrors) {
                                        if (sourceFlags & 32 /* Private */ && targetFlags & 32 /* Private */) {
                                            reportError(ts.Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                        }
                                        else {
                                            reportError(ts.Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourceFlags & 32 /* Private */ ? source : target), typeToString(sourceFlags & 32 /* Private */ ? target : source));
                                        }
                                    }
                                    return 0 /* False */;
                                }
                            }
                            else if (targetFlags & 64 /* Protected */) {
                                let sourceDeclaredInClass = sourceProp.parent && sourceProp.parent.flags & 32 /* Class */;
                                let sourceClass = sourceDeclaredInClass ? getDeclaredTypeOfSymbol(sourceProp.parent) : undefined;
                                let targetClass = getDeclaredTypeOfSymbol(targetProp.parent);
                                if (!sourceClass || !hasBaseType(sourceClass, targetClass)) {
                                    if (reportErrors) {
                                        reportError(ts.Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(sourceClass || source), typeToString(targetClass));
                                    }
                                    return 0 /* False */;
                                }
                            }
                            else if (sourceFlags & 64 /* Protected */) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return 0 /* False */;
                            }
                            let related = isRelatedTo(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp), reportErrors);
                            if (!related) {
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                                }
                                return 0 /* False */;
                            }
                            result &= related;
                            if (sourceProp.flags & 536870912 /* Optional */ && !(targetProp.flags & 536870912 /* Optional */)) {
                                // TypeScript 1.0 spec (April 2014): 3.8.3
                                // S is a subtype of a type T, and T is a supertype of S if ...
                                // S' and T are object types and, for each member M in T..
                                // M is a property and S' contains a property N where
                                // if M is a required property, N is also a required property
                                // (M - property in T)
                                // (N - property in S)
                                if (reportErrors) {
                                    reportError(ts.Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source), typeToString(target));
                                }
                                return 0 /* False */;
                            }
                        }
                    }
                }
                return result;
            }
            function propertiesIdenticalTo(source, target) {
                let sourceProperties = getPropertiesOfObjectType(source);
                let targetProperties = getPropertiesOfObjectType(target);
                if (sourceProperties.length !== targetProperties.length) {
                    return 0 /* False */;
                }
                let result = -1 /* True */;
                for (let sourceProp of sourceProperties) {
                    let targetProp = getPropertyOfObjectType(target, sourceProp.name);
                    if (!targetProp) {
                        return 0 /* False */;
                    }
                    let related = compareProperties(sourceProp, targetProp, isRelatedTo);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function signaturesRelatedTo(source, target, kind, reportErrors) {
                if (relation === identityRelation) {
                    return signaturesIdenticalTo(source, target, kind);
                }
                if (target === anyFunctionType || source === anyFunctionType) {
                    return -1 /* True */;
                }
                let sourceSignatures = getSignaturesOfType(source, kind);
                let targetSignatures = getSignaturesOfType(target, kind);
                let result = -1 /* True */;
                let saveErrorInfo = errorInfo;
                outer: for (let t of targetSignatures) {
                    if (!t.hasStringLiterals || target.flags & 65536 /* FromSignature */) {
                        let localErrors = reportErrors;
                        for (let s of sourceSignatures) {
                            if (!s.hasStringLiterals || source.flags & 65536 /* FromSignature */) {
                                let related = signatureRelatedTo(s, t, localErrors);
                                if (related) {
                                    result &= related;
                                    errorInfo = saveErrorInfo;
                                    continue outer;
                                }
                                // Only report errors from the first failure
                                localErrors = false;
                            }
                        }
                        return 0 /* False */;
                    }
                }
                return result;
            }
            function signatureRelatedTo(source, target, reportErrors) {
                if (source === target) {
                    return -1 /* True */;
                }
                if (!target.hasRestParameter && source.minArgumentCount > target.parameters.length) {
                    return 0 /* False */;
                }
                let sourceMax = source.parameters.length;
                let targetMax = target.parameters.length;
                let checkCount;
                if (source.hasRestParameter && target.hasRestParameter) {
                    checkCount = sourceMax > targetMax ? sourceMax : targetMax;
                    sourceMax--;
                    targetMax--;
                }
                else if (source.hasRestParameter) {
                    sourceMax--;
                    checkCount = targetMax;
                }
                else if (target.hasRestParameter) {
                    targetMax--;
                    checkCount = sourceMax;
                }
                else {
                    checkCount = sourceMax < targetMax ? sourceMax : targetMax;
                }
                // Spec 1.0 Section 3.8.3 & 3.8.4:
                // M and N (the signatures) are instantiated using type Any as the type argument for all type parameters declared by M and N
                source = getErasedSignature(source);
                target = getErasedSignature(target);
                let result = -1 /* True */;
                for (let i = 0; i < checkCount; i++) {
                    let s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                    let t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                    let saveErrorInfo = errorInfo;
                    let related = isRelatedTo(s, t, reportErrors);
                    if (!related) {
                        related = isRelatedTo(t, s, false);
                        if (!related) {
                            if (reportErrors) {
                                reportError(ts.Diagnostics.Types_of_parameters_0_and_1_are_incompatible, source.parameters[i < sourceMax ? i : sourceMax].name, target.parameters[i < targetMax ? i : targetMax].name);
                            }
                            return 0 /* False */;
                        }
                        errorInfo = saveErrorInfo;
                    }
                    result &= related;
                }
                let t = getReturnTypeOfSignature(target);
                if (t === voidType)
                    return result;
                let s = getReturnTypeOfSignature(source);
                return result & isRelatedTo(s, t, reportErrors);
            }
            function signaturesIdenticalTo(source, target, kind) {
                let sourceSignatures = getSignaturesOfType(source, kind);
                let targetSignatures = getSignaturesOfType(target, kind);
                if (sourceSignatures.length !== targetSignatures.length) {
                    return 0 /* False */;
                }
                let result = -1 /* True */;
                for (let i = 0, len = sourceSignatures.length; i < len; ++i) {
                    let related = compareSignatures(sourceSignatures[i], targetSignatures[i], true, isRelatedTo);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
                return result;
            }
            function stringIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(0 /* String */, source, target);
                }
                let targetType = getIndexTypeOfType(target, 0 /* String */);
                if (targetType) {
                    let sourceType = getIndexTypeOfType(source, 0 /* String */);
                    if (!sourceType) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return 0 /* False */;
                    }
                    let related = isRelatedTo(sourceType, targetType, reportErrors);
                    if (!related) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                return -1 /* True */;
            }
            function numberIndexTypesRelatedTo(source, target, reportErrors) {
                if (relation === identityRelation) {
                    return indexTypesIdenticalTo(1 /* Number */, source, target);
                }
                let targetType = getIndexTypeOfType(target, 1 /* Number */);
                if (targetType) {
                    let sourceStringType = getIndexTypeOfType(source, 0 /* String */);
                    let sourceNumberType = getIndexTypeOfType(source, 1 /* Number */);
                    if (!(sourceStringType || sourceNumberType)) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signature_is_missing_in_type_0, typeToString(source));
                        }
                        return 0 /* False */;
                    }
                    let related;
                    if (sourceStringType && sourceNumberType) {
                        // If we know for sure we're testing both string and numeric index types then only report errors from the second one
                        related = isRelatedTo(sourceStringType, targetType, false) || isRelatedTo(sourceNumberType, targetType, reportErrors);
                    }
                    else {
                        related = isRelatedTo(sourceStringType || sourceNumberType, targetType, reportErrors);
                    }
                    if (!related) {
                        if (reportErrors) {
                            reportError(ts.Diagnostics.Index_signatures_are_incompatible);
                        }
                        return 0 /* False */;
                    }
                    return related;
                }
                return -1 /* True */;
            }
            function indexTypesIdenticalTo(indexKind, source, target) {
                let targetType = getIndexTypeOfType(target, indexKind);
                let sourceType = getIndexTypeOfType(source, indexKind);
                if (!sourceType && !targetType) {
                    return -1 /* True */;
                }
                if (sourceType && targetType) {
                    return isRelatedTo(sourceType, targetType);
                }
                return 0 /* False */;
            }
        }
        function isPropertyIdenticalTo(sourceProp, targetProp) {
            return compareProperties(sourceProp, targetProp, compareTypes) !== 0 /* False */;
        }
        function compareProperties(sourceProp, targetProp, compareTypes) {
            // Two members are considered identical when
            // - they are public properties with identical names, optionality, and types,
            // - they are private or protected properties originating in the same declaration and having identical types
            if (sourceProp === targetProp) {
                return -1 /* True */;
            }
            let sourcePropAccessibility = getDeclarationFlagsFromSymbol(sourceProp) & (32 /* Private */ | 64 /* Protected */);
            let targetPropAccessibility = getDeclarationFlagsFromSymbol(targetProp) & (32 /* Private */ | 64 /* Protected */);
            if (sourcePropAccessibility !== targetPropAccessibility) {
                return 0 /* False */;
            }
            if (sourcePropAccessibility) {
                if (getTargetSymbol(sourceProp) !== getTargetSymbol(targetProp)) {
                    return 0 /* False */;
                }
            }
            else {
                if ((sourceProp.flags & 536870912 /* Optional */) !== (targetProp.flags & 536870912 /* Optional */)) {
                    return 0 /* False */;
                }
            }
            return compareTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
        }
        function compareSignatures(source, target, compareReturnTypes, compareTypes) {
            if (source === target) {
                return -1 /* True */;
            }
            if (source.parameters.length !== target.parameters.length ||
                source.minArgumentCount !== target.minArgumentCount ||
                source.hasRestParameter !== target.hasRestParameter) {
                return 0 /* False */;
            }
            let result = -1 /* True */;
            if (source.typeParameters && target.typeParameters) {
                if (source.typeParameters.length !== target.typeParameters.length) {
                    return 0 /* False */;
                }
                for (let i = 0, len = source.typeParameters.length; i < len; ++i) {
                    let related = compareTypes(source.typeParameters[i], target.typeParameters[i]);
                    if (!related) {
                        return 0 /* False */;
                    }
                    result &= related;
                }
            }
            else if (source.typeParameters || target.typeParameters) {
                return 0 /* False */;
            }
            // Spec 1.0 Section 3.8.3 & 3.8.4:
            // M and N (the signatures) are instantiated using type Any as the type argument for all type parameters declared by M and N
            source = getErasedSignature(source);
            target = getErasedSignature(target);
            for (let i = 0, len = source.parameters.length; i < len; i++) {
                let s = source.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(source) : getTypeOfSymbol(source.parameters[i]);
                let t = target.hasRestParameter && i === len - 1 ? getRestTypeOfSignature(target) : getTypeOfSymbol(target.parameters[i]);
                let related = compareTypes(s, t);
                if (!related) {
                    return 0 /* False */;
                }
                result &= related;
            }
            if (compareReturnTypes) {
                result &= compareTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            return result;
        }
        function isSupertypeOfEach(candidate, types) {
            for (let type of types) {
                if (candidate !== type && !isTypeSubtypeOf(type, candidate))
                    return false;
            }
            return true;
        }
        function getCommonSupertype(types) {
            return ts.forEach(types, t => isSupertypeOfEach(t, types) ? t : undefined);
        }
        function reportNoCommonSupertypeError(types, errorLocation, errorMessageChainHead) {
            // The downfallType/bestSupertypeDownfallType is the first type that caused a particular candidate
            // to not be the common supertype. So if it weren't for this one downfallType (and possibly others),
            // the type in question could have been the common supertype.
            let bestSupertype;
            let bestSupertypeDownfallType;
            let bestSupertypeScore = 0;
            for (let i = 0; i < types.length; i++) {
                let score = 0;
                let downfallType = undefined;
                for (let j = 0; j < types.length; j++) {
                    if (isTypeSubtypeOf(types[j], types[i])) {
                        score++;
                    }
                    else if (!downfallType) {
                        downfallType = types[j];
                    }
                }
                ts.Debug.assert(!!downfallType, "If there is no common supertype, each type should have a downfallType");
                if (score > bestSupertypeScore) {
                    bestSupertype = types[i];
                    bestSupertypeDownfallType = downfallType;
                    bestSupertypeScore = score;
                }
                // types.length - 1 is the maximum score, given that getCommonSupertype returned false
                if (bestSupertypeScore === types.length - 1) {
                    break;
                }
            }
            // In the following errors, the {1} slot is before the {0} slot because checkTypeSubtypeOf supplies the
            // subtype as the first argument to the error
            checkTypeSubtypeOf(bestSupertypeDownfallType, bestSupertype, errorLocation, ts.Diagnostics.Type_argument_candidate_1_is_not_a_valid_type_argument_because_it_is_not_a_supertype_of_candidate_0, errorMessageChainHead);
        }
        function isArrayType(type) {
            return type.flags & 4096 /* Reference */ && type.target === globalArrayType;
        }
        function isArrayLikeType(type) {
            // A type is array-like if it is not the undefined or null type and if it is assignable to any[]
            return !(type.flags & (32 /* Undefined */ | 64 /* Null */)) && isTypeAssignableTo(type, anyArrayType);
        }
        function isTupleLikeType(type) {
            return !!getPropertyOfType(type, "0");
        }
        /**
         * Check if a Type was written as a tuple type literal.
         * Prefer using isTupleLikeType() unless the use of `elementTypes` is required.
         */
        function isTupleType(type) {
            return (type.flags & 8192 /* Tuple */) && !!type.elementTypes;
        }
        function getWidenedTypeOfObjectLiteral(type) {
            let properties = getPropertiesOfObjectType(type);
            let members = {};
            ts.forEach(properties, p => {
                let propType = getTypeOfSymbol(p);
                let widenedType = getWidenedType(propType);
                if (propType !== widenedType) {
                    let symbol = createSymbol(p.flags | 67108864 /* Transient */, p.name);
                    symbol.declarations = p.declarations;
                    symbol.parent = p.parent;
                    symbol.type = widenedType;
                    symbol.target = p;
                    if (p.valueDeclaration)
                        symbol.valueDeclaration = p.valueDeclaration;
                    p = symbol;
                }
                members[p.name] = p;
            });
            let stringIndexType = getIndexTypeOfType(type, 0 /* String */);
            let numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
            if (stringIndexType)
                stringIndexType = getWidenedType(stringIndexType);
            if (numberIndexType)
                numberIndexType = getWidenedType(numberIndexType);
            return createAnonymousType(type.symbol, members, emptyArray, emptyArray, stringIndexType, numberIndexType);
        }
        function getWidenedType(type) {
            if (type.flags & 786432 /* RequiresWidening */) {
                if (type.flags & (32 /* Undefined */ | 64 /* Null */)) {
                    return anyType;
                }
                if (type.flags & 131072 /* ObjectLiteral */) {
                    return getWidenedTypeOfObjectLiteral(type);
                }
                if (type.flags & 16384 /* Union */) {
                    return getUnionType(ts.map(type.types, getWidenedType));
                }
                if (isArrayType(type)) {
                    return createArrayType(getWidenedType(type.typeArguments[0]));
                }
            }
            return type;
        }
        function reportWideningErrorsInType(type) {
            if (type.flags & 16384 /* Union */) {
                let errorReported = false;
                ts.forEach(type.types, t => {
                    if (reportWideningErrorsInType(t)) {
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            if (isArrayType(type)) {
                return reportWideningErrorsInType(type.typeArguments[0]);
            }
            if (type.flags & 131072 /* ObjectLiteral */) {
                let errorReported = false;
                ts.forEach(getPropertiesOfObjectType(type), p => {
                    let t = getTypeOfSymbol(p);
                    if (t.flags & 262144 /* ContainsUndefinedOrNull */) {
                        if (!reportWideningErrorsInType(t)) {
                            error(p.valueDeclaration, ts.Diagnostics.Object_literal_s_property_0_implicitly_has_an_1_type, p.name, typeToString(getWidenedType(t)));
                        }
                        errorReported = true;
                    }
                });
                return errorReported;
            }
            return false;
        }
        function reportImplicitAnyError(declaration, type) {
            let typeAsString = typeToString(getWidenedType(type));
            let diagnostic;
            switch (declaration.kind) {
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                    diagnostic = ts.Diagnostics.Member_0_implicitly_has_an_1_type;
                    break;
                case 129 /* Parameter */:
                    diagnostic = declaration.dotDotDotToken ?
                        ts.Diagnostics.Rest_parameter_0_implicitly_has_an_any_type :
                        ts.Diagnostics.Parameter_0_implicitly_has_an_1_type;
                    break;
                case 200 /* FunctionDeclaration */:
                case 134 /* MethodDeclaration */:
                case 133 /* MethodSignature */:
                case 136 /* GetAccessor */:
                case 137 /* SetAccessor */:
                case 162 /* FunctionExpression */:
                case 163 /* ArrowFunction */:
                    if (!declaration.name) {
                        error(declaration, ts.Diagnostics.Function_expression_which_lacks_return_type_annotation_implicitly_has_an_0_return_type, typeAsString);
                        return;
                    }
                    diagnostic = ts.Diagnostics._0_which_lacks_return_type_annotation_implicitly_has_an_1_return_type;
                    break;
                default:
                    diagnostic = ts.Diagnostics.Variable_0_implicitly_has_an_1_type;
            }
            error(declaration, diagnostic, ts.declarationNameToString(declaration.name), typeAsString);
        }
        function reportErrorsFromWidening(declaration, type) {
            if (produceDiagnostics && compilerOptions.noImplicitAny && type.flags & 262144 /* ContainsUndefinedOrNull */) {
                // Report implicit any error within type if possible, otherwise report error on declaration
                if (!reportWideningErrorsInType(type)) {
                    reportImplicitAnyError(declaration, type);
                }
            }
        }
        function forEachMatchingParameterType(source, target, callback) {
            let sourceMax = source.parameters.length;
            let targetMax = target.parameters.length;
            let count;
            if (source.hasRestParameter && target.hasRestParameter) {
                count = sourceMax > targetMax ? sourceMax : targetMax;
                sourceMax--;
                targetMax--;
            }
            else if (source.hasRestParameter) {
                sourceMax--;
                count = targetMax;
            }
            else if (target.hasRestParameter) {
                targetMax--;
                count = sourceMax;
            }
            else {
                count = sourceMax < targetMax ? sourceMax : targetMax;
            }
            for (let i = 0; i < count; i++) {
                let s = i < sourceMax ? getTypeOfSymbol(source.parameters[i]) : getRestTypeOfSignature(source);
                let t = i < targetMax ? getTypeOfSymbol(target.parameters[i]) : getRestTypeOfSignature(target);
                callback(s, t);
            }
        }
        function createInferenceContext(typeParameters, inferUnionTypes) {
            let inferences = [];
            for (let unused of typeParameters) {
                inferences.push({ primary: undefined, secondary: undefined, isFixed: false });
            }
            return {
                typeParameters,
                inferUnionTypes,
                inferences,
                inferredTypes: new Array(typeParameters.length),
            };
        }
        function inferTypes(context, source, target) {
            let sourceStack;
            let targetStack;
            let depth = 0;
            let inferiority = 0;
            inferFromTypes(source, target);
            function isInProcess(source, target) {
                for (let i = 0; i < depth; i++) {
                    if (source === sourceStack[i] && target === targetStack[i]) {
                        return true;
                    }
                }
                return false;
            }
            function isWithinDepthLimit(type, stack) {
                if (depth >= 5) {
                    let target = type.target;
                    let count = 0;
                    for (let i = 0; i < depth; i++) {
                        let t = stack[i];
                        if (t.flags & 4096 /* Reference */ && t.target === target) {
                            count++;
                        }
                    }
                    return count < 5;
                }
                return true;
            }
            function inferFromTypes(source, target) {
                if (source === anyFunctionType) {
                    return;
                }
                if (target.flags & 512 /* TypeParameter */) {
                    // If target is a type parameter, make an inference
                    let typeParameters = context.typeParameters;
                    for (let i = 0; i < typeParameters.length; i++) {
                        if (target === typeParameters[i]) {
                            let inferences = context.inferences[i];
                            if (!inferences.isFixed) {
                                // Any inferences that are made to a type parameter in a union type are inferior
                                // to inferences made to a flat (non-union) type. This is because if we infer to
                                // T | string[], we really don't know if we should be inferring to T or not (because
                                // the correct constituent on the target side could be string[]). Therefore, we put
                                // such inferior inferences into a secondary bucket, and only use them if the primary
                                // bucket is empty.
                                let candidates = inferiority ?
                                    inferences.secondary || (inferences.secondary = []) :
                                    inferences.primary || (inferences.primary = []);
                                if (!ts.contains(candidates, source)) {
                                    candidates.push(source);
                                }
                            }
                            return;
                        }
                    }
                }
                else if (source.flags & 4096 /* Reference */ && target.flags & 4096 /* Reference */ && source.target === target.target) {
                    // If source and target are references to the same generic type, infer from type arguments
                    let sourceTypes = source.typeArguments;
                    let targetTypes = target.typeArguments;
                    for (let i = 0; i < sourceTypes.length; i++) {
                        inferFromTypes(sourceTypes[i], targetTypes[i]);
                    }
                }
                else if (target.flags & 16384 /* Union */) {
                    let targetTypes = target.types;
                    let typeParameterCount = 0;
                    let typeParameter;
                    // First infer to each type in union that isn't a type parameter
                    for (let t of targetTypes) {
                        if (t.flags & 512 /* TypeParameter */ && ts.contains(context.typeParameters, t)) {
                            typeParameter = t;
                            typeParameterCount++;
                        }
                        else {
                            inferFromTypes(source, t);
                        }
                    }
                    // If union contains a single naked type parameter, make a secondary inference to that type parameter
                    if (typeParameterCount === 1) {
                        inferiority++;
                        inferFromTypes(source, typeParameter);
                        inferiority--;
                    }
                }
                else if (source.flags & 16384 /* Union */) {
                    // Source is a union type, infer from each consituent type
                    let sourceTypes = source.types;
                    for (let sourceType of sourceTypes) {
                        inferFromTypes(sourceType, target);
                    }
                }
                else if (source.flags & 48128 /* ObjectType */ && (target.flags & (4096 /* Reference */ | 8192 /* Tuple */) ||
                    (target.flags & 32768 /* Anonymous */) && target.symbol && target.symbol.flags & (8192 /* Method */ | 2048 /* TypeLiteral */))) {
                    // If source is an object type, and target is a type reference, a tuple type, the type of a method, or a type literal, infer from members
                    if (!isInProcess(source, target) && isWithinDepthLimit(source, sourceStack) && isWithinDepthLimit(target, targetStack)) {
                        if (depth === 0) {
                            sourceStack = [];
                            targetStack = [];
                        }
                        sourceStack[depth] = source;
                        targetStack[depth] = target;
                        depth++;
                        inferFromProperties(source, target);
                        inferFromSignatures(source, target, 0 /* Call */);
                        inferFromSignatures(source, target, 1 /* Construct */);
                        inferFromIndexTypes(source, target, 0 /* String */, 0 /* String */);
                        inferFromIndexTypes(source, target, 1 /* Number */, 1 /* Number */);
                        inferFromIndexTypes(source, target, 0 /* String */, 1 /* Number */);
                        depth--;
                    }
                }
            }
            function inferFromProperties(source, target) {
                let properties = getPropertiesOfObjectType(target);
                for (let targetProp of properties) {
                    let sourceProp = getPropertyOfObjectType(source, targetProp.name);
                    if (sourceProp) {
                        inferFromTypes(getTypeOfSymbol(sourceProp), getTypeOfSymbol(targetProp));
                    }
                }
            }
            function inferFromSignatures(source, target, kind) {
                let sourceSignatures = getSignaturesOfType(source, kind);
                let targetSignatures = getSignaturesOfType(target, kind);
                let sourceLen = sourceSignatures.length;
                let targetLen = targetSignatures.length;
                let len = sourceLen < targetLen ? sourceLen : targetLen;
                for (let i = 0; i < len; i++) {
                    inferFromSignature(getErasedSignature(sourceSignatures[sourceLen - len + i]), getErasedSignature(targetSignatures[targetLen - len + i]));
                }
            }
            function inferFromSignature(source, target) {
                forEachMatchingParameterType(source, target, inferFromTypes);
                inferFromTypes(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
            }
            function inferFromIndexTypes(source, target, sourceKind, targetKind) {
                let targetIndexType = getIndexTypeOfType(target, targetKind);
                if (targetIndexType) {
                    let sourceIndexType = getIndexTypeOfType(source, sourceKind);
                    if (sourceIndexType) {
                        inferFromTypes(sourceIndexType, targetIndexType);
                    }
                }
            }
        }
        function getInferenceCandidates(context, index) {
            let inferences = context.inferences[index];
            return inferences.primary || inferences.secondary || emptyArray;
        }
        function getInferredType(context, index) {
            let inferredType = context.inferredTypes[index];
            let inferenceSucceeded;
            if (!inferredType) {
                let inferences = getInferenceCandidates(context, index);
                if (inferences.length) {
                    // Infer widened union or supertype, or the unknown type for no common supertype
                    let unionOrSuperType = context.inferUnionTypes ? getUnionType(inferences) : getCommonSupertype(inferences);
                    inferredType = unionOrSuperType ? getWidenedType(unionOrSuperType) : unknownType;
                    inferenceSucceeded = !!unionOrSuperType;
                }
                else {
                    // Infer the empty object type when no inferences were made. It is important to remember that
                    // in this case, inference still succeeds, meaning there is no error for not having inference
                    // candidates. An inference error only occurs when there are *conflicting* candidates, i.e.
                    // candidates with no common supertype.
                    inferredType = emptyObjectType;
                    inferenceSucceeded = true;
                }
                // Only do the constraint check if inference succeeded (to prevent cascading errors)
                if (inferenceSucceeded) {
                    let constraint = getConstraintOfTypeParameter(context.typeParameters[index]);
                    inferredType = constraint && !isTypeAssignableTo(inferredType, constraint) ? constraint : inferredType;
                }
                else if (context.failedTypeParameterIndex === undefined || context.failedTypeParameterIndex > index) {
                    // If inference failed, it is necessary to record the index of the failed type parameter (the one we are on).
                    // It might be that inference has already failed on a later type parameter on a previous call to inferTypeArguments.
                    // So if this failure is on preceding type parameter, this type parameter is the new failure index.
                    context.failedTypeParameterIndex = index;
                }
                context.inferredTypes[index] = inferredType;
            }
            return inferredType;
        }
        function getInferredTypes(context) {
            for (let i = 0; i < context.inferredTypes.length; i++) {
                getInferredType(context, i);
            }
            return context.inferredTypes;
        }
        function hasAncestor(node, kind) {
            return ts.getAncestor(node, kind) !== undefined;
        }
        // EXPRESSION TYPE CHECKING
        function getResolvedSymbol(node) {
            let links = getNodeLinks(node);
            if (!links.resolvedSymbol) {
                links.resolvedSymbol = (!ts.nodeIsMissing(node) && resolveName(node, node.text, 107455 /* Value */ | 1048576 /* ExportValue */, ts.Diagnostics.Cannot_find_name_0, node)) || unknownSymbol;
            }
            return links.resolvedSymbol;
        }
        function isInTypeQuery(node) {
            // TypeScript 1.0 spec (April 2014): 3.6.3
            // A type query consists of the keyword typeof followed by an expression.
            // The expression is restricted to a single identifier or a sequence of identifiers separated by periods
            while (node) {
                switch (node.kind) {
                    case 144 /* TypeQuery */:
                        return true;
                    case 65 /* Identifier */:
                    case 126 /* QualifiedName */:
                        node = node.parent;
                        continue;
                    default:
                        return false;
                }
            }
            ts.Debug.fail("should not get here");
        }
        // For a union type, remove all constituent types that are of the given type kind (when isOfTypeKind is true)
        // or not of the given type kind (when isOfTypeKind is false)
        function removeTypesFromUnionType(type, typeKind, isOfTypeKind, allowEmptyUnionResult) {
            if (type.flags & 16384 /* Union */) {
                let types = type.types;
                if (ts.forEach(types, t => !!(t.flags & typeKind) === isOfTypeKind)) {
                    // Above we checked if we have anything to remove, now use the opposite test to do the removal
                    let narrowedType = getUnionType(ts.filter(types, t => !(t.flags & typeKind) === isOfTypeKind));
                    if (allowEmptyUnionResult || narrowedType !== emptyObjectType) {
                        return narrowedType;
                    }
                }
            }
            else if (allowEmptyUnionResult && !!(type.flags & typeKind) === isOfTypeKind) {
                // Use getUnionType(emptyArray) instead of emptyObjectType in case the way empty union types
                // are represented ever changes.
                return getUnionType(emptyArray);
            }
            return type;
        }
        function hasInitializer(node) {
            return !!(node.initializer || ts.isBindingPattern(node.parent) && hasInitializer(node.parent.parent));
        }
        // Check if a given variable is assigned within a given syntax node
        function isVariableAssignedWithin(symbol, node) {
            let links = getNodeLinks(node);
            if (links.assignmentChecks) {
                let cachedResult = links.assignmentChecks[symbol.id];
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
            }
            else {
                links.assignmentChecks = {};
            }
            return links.assignmentChecks[symbol.id] = isAssignedIn(node);
            function isAssignedInBinaryExpression(node) {
                if (node.operatorToken.kind >= 53 /* FirstAssignment */ && node.operatorToken.kind <= 64 /* LastAssignment */) {
                    let n = node.left;
                    while (n.kind === 161 /* ParenthesizedExpression */) {
                        n = n.expression;
                    }
                    if (n.kind === 65 /* Identifier */ && getResolvedSymbol(n) === symbol) {
                        return true;
                    }
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedInVariableDeclaration(node) {
                if (!ts.isBindingPattern(node.name) && getSymbolOfNode(node) === symbol && hasInitializer(node)) {
                    return true;
                }
                return ts.forEachChild(node, isAssignedIn);
            }
            function isAssignedIn(node) {
                switch (node.kind) {
                    case 169 /* BinaryExpression */:
                        return isAssignedInBinaryExpression(node);
                    case 198 /* VariableDeclaration */:
                    case 152 /* BindingElement */:
                        return isAssignedInVariableDeclaration(node);
                    case 150 /* ObjectBindingPattern */:
                    case 151 /* ArrayBindingPattern */:
                    case 153 /* ArrayLiteralExpression */:
                    case 154 /* ObjectLiteralExpression */:
                    case 155 /* PropertyAccessExpression */:
                    case 156 /* ElementAccessExpression */:
                    case 157 /* CallExpression */:
                    case 158 /* NewExpression */:
                    case 160 /* TypeAssertionExpression */:
                    case 161 /* ParenthesizedExpression */:
                    case 167 /* PrefixUnaryExpression */:
                    case 164 /* DeleteExpression */:
                    case 165 /* TypeOfExpression */:
                    case 166 /* VoidExpression */:
                    case 168 /* PostfixUnaryExpression */:
                    case 170 /* ConditionalExpression */:
                    case 173 /* SpreadElementExpression */:
                    case 179 /* Block */:
                    case 180 /* VariableStatement */:
                    case 182 /* ExpressionStatement */:
                    case 183 /* IfStatement */:
                    case 184 /* DoStatement */:
                    case 185 /* WhileStatement */:
                    case 186 /* ForStatement */:
                    case 187 /* ForInStatement */:
                    case 188 /* ForOfStatement */:
                    case 191 /* ReturnStatement */:
                    case 192 /* WithStatement */:
                    case 193 /* SwitchStatement */:
                    case 220 /* CaseClause */:
                    case 221 /* DefaultClause */:
                    case 194 /* LabeledStatement */:
                    case 195 /* ThrowStatement */:
                    case 196 /* TryStatement */:
                    case 223 /* CatchClause */:
                        return ts.forEachChild(node, isAssignedIn);
                }
                return false;
            }
        }
        function resolveLocation(node) {
            // Resolve location from top down towards node if it is a context sensitive expression
            // That helps in making sure not assigning types as any when resolved out of order
            let containerNodes = [];
            for (let parent = node.parent; parent; parent = parent.parent) {
                if ((ts.isExpression(parent) || ts.isObjectLiteralMethod(node)) &&
                    isContextSensitive(parent)) {
                    containerNodes.unshift(parent);
                }
            }
            ts.forEach(containerNodes, node => { getTypeOfNode(node); });
        }
        function getSymbolAtLocation(node) {
            resolveLocation(node);
            return getSymbolInfo(node);
        }
        function getTypeAtLocation(node) {
            resolveLocation(node);
            return getTypeOfNode(node);
        }
        function getTypeOfSymbolAtLocation(symbol, node) {
            resolveLocation(node);
            // Get the narrowed type of symbol at given location instead of just getting
            // the type of the symbol.
            // eg.
            // function foo(a: string | number) {
            //     if (typeof a === "string") {
            //         a/**/
            //     }
            // }
            // getTypeOfSymbol for a would return type of parameter symbol string | number
            // Unless we provide location /**/, checker wouldn't know how to narrow the type
            // By using getNarrowedTypeOfSymbol would return string since it would be able to narrow
            // it by typeguard in the if true condition
            return getNarrowedTypeOfSymbol(symbol, node);
        }
        // Get the narrowed type of a given symbol at a given location
        function getNarrowedTypeOfSymbol(symbol, node) {
            let type = getTypeOfSymbol(symbol);
            // Only narrow when symbol is variable of type any or an object, union, or type parameter type
            if (node && symbol.flags & 3 /* Variable */ && type.flags & (1 /* Any */ | 48128 /* ObjectType */ | 16384 /* Union */ | 512 /* TypeParameter */)) {
                loop: while (node.parent) {
                    let child = node;
                    node = node.parent;
                    let narrowedType = type;
                    switch (node.kind) {
                        case 183 /* IfStatement */:
                            // In a branch of an if statement, narrow based on controlling expression
                            if (child !== node.expression) {
                                narrowedType = narrowType(type, node.expression, child === node.thenStatement);
                            }
                            break;
                        case 170 /* ConditionalExpression */:
                            // In a branch of a conditional expression, narrow based on controlling condition
                            if (child !== node.condition) {
                                narrowedType = narrowType(type, node.condition, child === node.whenTrue);
                            }
                            break;
                        case 169 /* BinaryExpression */:
                            // In the right operand of an && or ||, narrow based on left operand
                            if (child === node.right) {
                                if (node.operatorToken.kind === 48 /* AmpersandAmpersandToken */) {
                                    narrowedType = narrowType(type, node.left, true);
                                }
                                else if (node.operatorToken.kind === 49 /* BarBarToken */) {
                                    narrowedType = narrowType(type, node.left, false);
                                }
                            }
                            break;
                        case 227 /* SourceFile */:
                        case 205 /* ModuleDeclaration */:
                        case 200 /* FunctionDeclaration */:
                        case 134 /* MethodDeclaration */:
                        case 133 /* MethodSignature */:
                        case 136 /* GetAccessor */:
                        case 137 /* SetAccessor */:
                        case 135 /* Constructor */:
                            // Stop at the first containing function or module declaration
                            break loop;
                    }
                    // Use narrowed type if construct contains no assignments to variable
                    if (narrowedType !== type) {
                        if (isVariableAssignedWithin(symbol, node)) {
                            break;
                        }
                        type = narrowedType;
                    }
                }
            }
            return type;
            function narrowTypeByEquality(type, expr, assumeTrue) {
                // Check that we have 'typeof <symbol>' on the left and string literal on the right
                if (expr.left.kind !== 165 /* TypeOfExpression */ || expr.right.kind !== 8 /* StringLiteral */) {
                    return type;
                }
                let left = expr.left;
                let right = expr.right;
                if (left.expression.kind !== 65 /* Identifier */ || getResolvedSymbol(left.expression) !== symbol) {
                    return type;
                }
                let typeInfo = primitiveTypeInfo[right.text];
                if (expr.operatorToken.kind === 31 /* ExclamationEqualsEqualsToken */) {
                    assumeTrue = !assumeTrue;
                }
                if (assumeTrue) {
                    // Assumed result is true. If check was not for a primitive type, remove all primitive types
                    if (!typeInfo) {
                        return removeTypesFromUnionType(type, 258 /* StringLike */ | 132 /* NumberLike */ | 8 /* Boolean */ | 1048576 /* ESSymbol */, 
                        /*isOfTypeKind*/ true, false);
                    }
                    // Check was for a primitive type, return that primitive type if it is a subtype
                    if (isTypeSubtypeOf(typeInfo.type, type)) {
                        return typeInfo.type;
                    }
                    // Otherwise, remove all types that aren't of the primitive type kind. This can happen when the type is
                    // union of enum types and other types.
                    return removeTypesFromUnionType(type, typeInfo.flags, false, false);
                }
                else {
                    // Assumed result is false. If check was for a primitive type, remove that primitive type
                    if (typeInfo) {
                        return removeTypesFromUnionType(type, typeInfo.flags, true, false);
                    }
                    // Otherwise we don't have enough information to do anything.
                    return type;
                }
            }
            function narrowTypeByAnd(type, expr, assumeTrue) {
                if (assumeTrue) {
                    // The assumed result is true, therefore we narrow assuming each operand to be true.
                    return narrowType(narrowType(type, expr.left, true), expr.right, true);
                }
                else {
                    // The assumed result is false. This means either the first operand was false, or the first operand was true
                    // and the second operand was false. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, false),
                        narrowType(narrowType(type, expr.left, true), expr.right, false)
                    ]);
                }
            }
            function narrowTypeByOr(type, expr, assumeTrue) {
                if (assumeTrue) {
                    // The assumed result is true. This means either the first operand was true, or the first operand was false
                    // and the second operand was true. We narrow with those assumptions and union the two resulting types.
                    return getUnionType([
                        narrowType(type, expr.left, true),
                        narrowType(narrowType(type, expr.left, false), expr.right, true)
                    ]);
                }
                else {
                    // The assumed result is false, therefore we narrow assuming each operand to be false.
                    return narrowType(narrowType(type, expr.left, false), expr.right, false);
                }
            }
            function narrowTypeByInstanceof(type, expr, assumeTrue) {
                // Check that type is not any, assumed result is true, and we have variable symbol on the left
                if (type.flags & 1 /* Any */ || !assumeTrue || expr.left.kind !== 65 /* Identifier */ || getResolvedSymbol(expr.left) !== symbol) {
                    return type;
                }
                // Check that right operand is a function type with a prototype property
                let rightType = checkExpression(expr.right);
                if (!isTypeSubtypeOf(rightType, globalFunctionType)) {
                    return type;
                }
                // Target type is type of prototype property
                let prototypeProperty = getPropertyOfType(rightType, "prototype");
                if (!prototypeProperty) {
                    return type;
                }
                let targetType = getTypeOfSymbol(prototypeProperty);
                // Narrow to target type if it is a subtype of current type
                if (isTypeSubtypeOf(targetType, type)) {
                    return targetType;
                }
                // If current type is a union type, remove all constituents that aren't subtypes of target type
                if (type.flags & 16384 /* Union */) {
                    return getUnionType(ts.filter(type.types, t => isTypeSubtypeOf(t, targetType)));
                }
                return type;
            }
            // Narrow the given type based on the given expression having the assumed boolean value. The returned type
            // will be a subtype or the same type as the argument.
            function narrowType(type, expr, assumeTrue) {
                switch (expr.kind) {
                    case 161 /* ParenthesizedExpression */:
                        return narrowType(type, expr.expression, assumeTrue);
                    case 169 /* BinaryExpression */:
                        let operator = expr.operatorToken.kind;
                        if (operator === 30 /* EqualsEqualsEqualsToken */ || operator === 31 /* ExclamationEqualsEqualsToken */) {
                            return narrowTypeByEquality(type, expr, assumeTrue);
                        }
                        else if (operator === 48 /* AmpersandAmpersandToken */) {
                            return narrowTypeByAnd(type, expr, assumeTrue);
                        }
                        else if (operator === 49 /* BarBarToken */) {
                            return narrowTypeByOr(type, expr, assumeTrue);
                        }
                        else if (operator === 87 /* InstanceOfKeyword */) {
                            return narrowTypeByInstanceof(type, expr, assumeTrue);
                        }
                        break;
                    case 167 /* PrefixUnaryExpression */:
                        if (expr.operator === 46 /* ExclamationToken */) {
                            return narrowType(type, expr.operand, !assumeTrue);
                        }
                        break;
                }
                return type;
            }
        }
        function checkIdentifier(node) {
            let symbol = getResolvedSymbol(node);
            // As noted in ECMAScript 6 language spec, arrow functions never have an arguments objects.
            // Although in down-level emit of arrow function, we emit it using function expression which means that
            // arguments objects will be bound to the inner object; emitting arrow function natively in ES6, arguments objects
            // will be bound to non-arrow function that contain this arrow function. This results in inconsistent behavior.
            // To avoid that we will give an error to users if they use arguments objects in arrow function so that they
            // can explicitly bound arguments objects
            if (symbol === argumentsSymbol && ts.getContainingFunction(node).kind === 163 /* ArrowFunction */) {
                error(node, ts.Diagnostics.The_arguments_object_cannot_be_referenced_in_an_arrow_function_Consider_using_a_standard_function_expression);
            }
            if (symbol.flags & 8388608 /* Alias */ && !isInTypeQuery(node) && !isConstEnumOrConstEnumOnlyModule(resolveAlias(symbol))) {
                markAliasSymbolAsReferenced(symbol);
            }
            checkCollisionWithCapturedSuperVariable(node, node);
            checkCollisionWithCapturedThisVariable(node, node);
            checkBlockScopedBindingCapturedInLoop(node, symbol);
            return getNarrowedTypeOfSymbol(getExportSymbolOfValueSymbolIfExported(symbol), node);
        }
        function isInsideFunction(node, threshold) {
            let current = node;
            while (current && current !== threshold) {
                if (ts.isFunctionLike(current)) {
                    return true;
                }
                current = current.parent;
            }
            return false;
        }
        function checkBlockScopedBindingCapturedInLoop(node, symbol) {
            if (languageVersion >= 2 /* ES6 */ ||
                (symbol.flags & 2 /* BlockScopedVariable */) === 0 ||
                symbol.valueDeclaration.parent.kind === 223 /* CatchClause */) {
                return;
            }
            // - check if binding is used in some function
            // (stop the walk when reaching container of binding declaration)
            // - if first check succeeded - check if variable is declared inside the loop
            // nesting structure:
            // (variable declaration or binding element) -> variable declaration list -> container
            let container = symbol.valueDeclaration;
            while (container.kind !== 199 /* VariableDeclarationList */) {
                container = container.parent;
            }
            // get the parent of variable declaration list
            container = container.parent;
            if (container.kind === 180 /* VariableStatement */) {
                // if parent is variable statement - get its parent
                container = container.parent;
            }
            let inFunction = isInsideFunction(node.parent, container);
            let current = container;
            while (current && !ts.nodeStartsNewLexicalEnvironment(current)) {
                if (isIterationStatement(current, false)) {
                    if (inFunction) {
                        grammarErrorOnFirstToken(current, ts.Diagnostics.Loop_contains_block_scoped_variable_0_referenced_by_a_function_in_the_loop_This_is_only_supported_in_ECMAScript_6_or_higher, ts.declarationNameToString(node));
                    }
                    // mark value declaration so during emit they can have a special handling
                    getNodeLinks(symbol.valueDeclaration).flags |= 256 /* BlockScopedBindingInLoop */;
                    break;
                }
                current = current.parent;
            }
        }
        function captureLexicalThis(node, container) {
            let classNode = container.parent && container.parent.kind === 201 /* ClassDeclaration */ ? container.parent : undefined;
            getNodeLinks(node).flags |= 2 /* LexicalThis */;
            if (container.kind === 132 /* PropertyDeclaration */ || container.kind === 135 /* Constructor */) {
                getNodeLinks(classNode).flags |= 4 /* CaptureThis */;
            }
            else {
                getNodeLinks(container).flags |= 4 /* CaptureThis */;
            }
        }
        function checkThisExpression(node) {
            // Stop at the first arrow function so that we can
            // tell whether 'this' needs to be captured.
            let container = ts.getThisContainer(node, true);
            let needToCaptureLexicalThis = false;
            // Now skip arrow functions to get the "real" owner of 'this'.
            if (container.kind === 163 /* ArrowFunction */) {
                container = ts.getThisContainer(container, false);
                // When targeting es6, arrow function lexically bind "this" so we do not need to do the work of binding "this" in emitted code
                needToCaptureLexicalThis = (languageVersion < 2 /* ES6 */);
            }
            switch (container.kind) {
                case 205 /* ModuleDeclaration */:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_module_body);
                    // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    break;
                case 204 /* EnumDeclaration */:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                    // do not return here so in case if lexical this is captured - it will be reflected in flags on NodeLinks
                    break;
                case 135 /* Constructor */:
                    if (isInConstructorArgumentInitializer(node, container)) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_constructor_arguments);
                    }
                    break;
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                    if (container.flags & 128 /* Static */) {
                        error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_static_property_initializer);
                    }
                    break;
                case 127 /* ComputedPropertyName */:
                    error(node, ts.Diagnostics.this_cannot_be_referenced_in_a_computed_property_name);
                    break;
            }
            if (needToCaptureLexicalThis) {
                captureLexicalThis(node, container);
            }
            let classNode = container.parent && container.parent.kind === 201 /* ClassDeclaration */ ? container.parent : undefined;
            if (classNode) {
                let symbol = getSymbolOfNode(classNode);
                return container.flags & 128 /* Static */ ? getTypeOfSymbol(symbol) : getDeclaredTypeOfSymbol(symbol);
            }
            return anyType;
        }
        function isInConstructorArgumentInitializer(node, constructorDecl) {
            for (let n = node; n && n !== constructorDecl; n = n.parent) {
                if (n.kind === 129 /* Parameter */) {
                    return true;
                }
            }
            return false;
        }
        function checkSuperExpression(node) {
            let isCallExpression = node.parent.kind === 157 /* CallExpression */ && node.parent.expression === node;
            let enclosingClass = ts.getAncestor(node, 201 /* ClassDeclaration */);
            let baseClass;
            if (enclosingClass && ts.getClassExtendsHeritageClauseElement(enclosingClass)) {
                let classType = getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClass));
                baseClass = classType.baseTypes.length && classType.baseTypes[0];
            }
            if (!baseClass) {
                error(node, ts.Diagnostics.super_can_only_be_referenced_in_a_derived_class);
                return unknownType;
            }
            let container = ts.getSuperContainer(node, true);
            if (container) {
                let canUseSuperExpression = false;
                let needToCaptureLexicalThis;
                if (isCallExpression) {
                    // TS 1.0 SPEC (April 2014): 4.8.1
                    // Super calls are only permitted in constructors of derived classes
                    canUseSuperExpression = container.kind === 135 /* Constructor */;
                }
                else {
                    // TS 1.0 SPEC (April 2014)
                    // 'super' property access is allowed
                    // - In a constructor, instance member function, instance member accessor, or instance member variable initializer where this references a derived class instance
                    // - In a static member function or static member accessor
                    // super property access might appear in arrow functions with arbitrary deep nesting
                    needToCaptureLexicalThis = false;
                    while (container && container.kind === 163 /* ArrowFunction */) {
                        container = ts.getSuperContainer(container, true);
                        needToCaptureLexicalThis = languageVersion < 2 /* ES6 */;
                    }
                    // topmost container must be something that is directly nested in the class declaration
                    if (container && container.parent && container.parent.kind === 201 /* ClassDeclaration */) {
                        if (container.flags & 128 /* Static */) {
                            canUseSuperExpression =
                                container.kind === 134 /* MethodDeclaration */ ||
                                    container.kind === 133 /* MethodSignature */ ||
                                    container.kind === 136 /* GetAccessor */ ||
                                    container.kind === 137 /* SetAccessor */;
                        }
                        else {
                            canUseSuperExpression =
                                container.kind === 134 /* MethodDeclaration */ ||
                                    container.kind === 133 /* MethodSignature */ ||
                                    container.kind === 136 /* GetAccessor */ ||
                                    container.kind === 137 /* SetAccessor */ ||
                                    container.kind === 132 /* PropertyDeclaration */ ||
                                    container.kind === 131 /* PropertySignature */ ||
                                    container.kind === 135 /* Constructor */;
                        }
                    }
                }
                if (canUseSuperExpression) {
                    let returnType;
                    if ((container.flags & 128 /* Static */) || isCallExpression) {
                        getNodeLinks(node).flags |= 32 /* SuperStatic */;
                        returnType = getTypeOfSymbol(baseClass.symbol);
                    }
                    else {
                        getNodeLinks(node).flags |= 16 /* SuperInstance */;
                        returnType = baseClass;
                    }
                    if (container.kind === 135 /* Constructor */ && isInConstructorArgumentInitializer(node, container)) {
                        // issue custom error message for super property access in constructor arguments (to be aligned with old compiler)
                        error(node, ts.Diagnostics.super_cannot_be_referenced_in_constructor_arguments);
                        returnType = unknownType;
                    }
                    if (!isCallExpression && needToCaptureLexicalThis) {
                        // call expressions are allowed only in constructors so they should always capture correct 'this'
                        // super property access expressions can also appear in arrow functions -
                        // in this case they should also use correct lexical this
                        captureLexicalThis(node.parent, container);
                    }
                    return returnType;
                }
            }
            if (container && container.kind === 127 /* ComputedPropertyName */) {
                error(node, ts.Diagnostics.super_cannot_be_referenced_in_a_computed_property_name);
            }
            else if (isCallExpression) {
                error(node, ts.Diagnostics.Super_calls_are_not_permitted_outside_constructors_or_in_nested_functions_inside_constructors);
            }
            else {
                error(node, ts.Diagnostics.super_property_access_is_permitted_only_in_a_constructor_member_function_or_member_accessor_of_a_derived_class);
            }
            return unknownType;
        }
        // Return contextual type of parameter or undefined if no contextual type is available
        function getContextuallyTypedParameterType(parameter) {
            if (isFunctionExpressionOrArrowFunction(parameter.parent)) {
                let func = parameter.parent;
                if (isContextSensitive(func)) {
                    let contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {
                        let funcHasRestParameters = ts.hasRestParameters(func);
                        let len = func.parameters.length - (funcHasRestParameters ? 1 : 0);
                        let indexOfParameter = ts.indexOf(func.parameters, parameter);
                        if (indexOfParameter < len) {
                            return getTypeAtPosition(contextualSignature, indexOfParameter);
                        }
                        // If last parameter is contextually rest parameter get its type
                        if (indexOfParameter === (func.parameters.length - 1) &&
                            funcHasRestParameters && contextualSignature.hasRestParameter && func.parameters.length >= contextualSignature.parameters.length) {
                            return getTypeOfSymbol(contextualSignature.parameters[contextualSignature.parameters.length - 1]);
                        }
                    }
                }
            }
            return undefined;
        }
        // In a variable, parameter or property declaration with a type annotation, the contextual type of an initializer
        // expression is the type of the variable, parameter or property. Otherwise, in a parameter declaration of a
        // contextually typed function expression, the contextual type of an initializer expression is the contextual type
        // of the parameter. Otherwise, in a variable or parameter declaration with a binding pattern name, the contextual
        // type of an initializer expression is the type implied by the binding pattern.
        function getContextualTypeForInitializerExpression(node) {
            let declaration = node.parent;
            if (node === declaration.initializer) {
                if (declaration.type) {
                    return getTypeFromTypeNodeOrHeritageClauseElement(declaration.type);
                }
                if (declaration.kind === 129 /* Parameter */) {
                    let type = getContextuallyTypedParameterType(declaration);
                    if (type) {
                        return type;
                    }
                }
                if (ts.isBindingPattern(declaration.name)) {
                    return getTypeFromBindingPattern(declaration.name);
                }
            }
            return undefined;
        }
        function getContextualTypeForReturnExpression(node) {
            let func = ts.getContainingFunction(node);
            if (func) {
                // If the containing function has a return type annotation, is a constructor, or is a get accessor whose
                // corresponding set accessor has a type annotation, return statements in the function are contextually typed
                if (func.type || func.kind === 135 /* Constructor */ || func.kind === 136 /* GetAccessor */ && getSetAccessorTypeAnnotationNode(ts.getDeclarationOfKind(func.symbol, 137 /* SetAccessor */))) {
                    return getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                }
                // Otherwise, if the containing function is contextually typed by a function type with exactly one call signature
                // and that call signature is non-generic, return statements are contextually typed by the return type of the signature
                let signature = getContextualSignatureForFunctionLikeDeclaration(func);
                if (signature) {
                    return getReturnTypeOfSignature(signature);
                }
            }
            return undefined;
        }
        // In a typed function call, an argument or substitution expression is contextually typed by the type of the corresponding parameter.
        function getContextualTypeForArgument(callTarget, arg) {
            let args = getEffectiveCallArguments(callTarget);
            let argIndex = ts.indexOf(args, arg);
            if (argIndex >= 0) {
                let signature = getResolvedSignature(callTarget);
                return getTypeAtPosition(signature, argIndex);
            }
            return undefined;
        }
        function getContextualTypeForSubstitutionExpression(template, substitutionExpression) {
            if (template.parent.kind === 159 /* TaggedTemplateExpression */) {
                return getContextualTypeForArgument(template.parent, substitutionExpression);
            }
            return undefined;
        }
        function getContextualTypeForBinaryOperand(node) {
            let binaryExpression = node.parent;
            let operator = binaryExpression.operatorToken.kind;
            if (operator >= 53 /* FirstAssignment */ && operator <= 64 /* LastAssignment */) {
                // In an assignment expression, the right operand is contextually typed by the type of the left operand.
                if (node === binaryExpression.right) {
                    return checkExpression(binaryExpression.left);
                }
            }
            else if (operator === 49 /* BarBarToken */) {
                // When an || expression has a contextual type, the operands are contextually typed by that type. When an ||
                // expression has no contextual type, the right operand is contextually typed by the type of the left operand.
                let type = getContextualType(binaryExpression);
                if (!type && node === binaryExpression.right) {
                    type = checkExpression(binaryExpression.left);
                }
                return type;
            }
            return undefined;
        }
        // Apply a mapping function to a contextual type and return the resulting type. If the contextual type
        // is a union type, the mapping function is applied to each constituent type and a union of the resulting
        // types is returned.
        function applyToContextualType(type, mapper) {
            if (!(type.flags & 16384 /* Union */)) {
                return mapper(type);
            }
            let types = type.types;
            let mappedType;
            let mappedTypes;
            for (let current of types) {
                let t = mapper(current);
                if (t) {
                    if (!mappedType) {
                        mappedType = t;
                    }
                    else if (!mappedTypes) {
                        mappedTypes = [mappedType, t];
                    }
                    else {
                        mappedTypes.push(t);
                    }
                }
            }
            return mappedTypes ? getUnionType(mappedTypes) : mappedType;
        }
        function getTypeOfPropertyOfContextualType(type, name) {
            return applyToContextualType(type, t => {
                let prop = getPropertyOfObjectType(t, name);
                return prop ? getTypeOfSymbol(prop) : undefined;
            });
        }
        function getIndexTypeOfContextualType(type, kind) {
            return applyToContextualType(type, t => getIndexTypeOfObjectOrUnionType(t, kind));
        }
        // Return true if the given contextual type is a tuple-like type
        function contextualTypeIsTupleLikeType(type) {
            return !!(type.flags & 16384 /* Union */ ? ts.forEach(type.types, isTupleLikeType) : isTupleLikeType(type));
        }
        // Return true if the given contextual type provides an index signature of the given kind
        function contextualTypeHasIndexSignature(type, kind) {
            return !!(type.flags & 16384 /* Union */ ? ts.forEach(type.types, t => getIndexTypeOfObjectOrUnionType(t, kind)) : getIndexTypeOfObjectOrUnionType(type, kind));
        }
        // In an object literal contextually typed by a type T, the contextual type of a property assignment is the type of
        // the matching property in T, if one exists. Otherwise, it is the type of the numeric index signature in T, if one
        // exists. Otherwise, it is the type of the string index signature in T, if one exists.
        function getContextualTypeForObjectLiteralMethod(node) {
            ts.Debug.assert(ts.isObjectLiteralMethod(node));
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            return getContextualTypeForObjectLiteralElement(node);
        }
        function getContextualTypeForObjectLiteralElement(element) {
            let objectLiteral = element.parent;
            let type = getContextualType(objectLiteral);
            if (type) {
                if (!ts.hasDynamicName(element)) {
                    // For a (non-symbol) computed property, there is no reason to look up the name
                    // in the type. It will just be "__computed", which does not appear in any
                    // SymbolTable.
                    let symbolName = getSymbolOfNode(element).name;
                    let propertyType = getTypeOfPropertyOfContextualType(type, symbolName);
                    if (propertyType) {
                        return propertyType;
                    }
                }
                return isNumericName(element.name) && getIndexTypeOfContextualType(type, 1 /* Number */) ||
                    getIndexTypeOfContextualType(type, 0 /* String */);
            }
            return undefined;
        }
        // In an array literal contextually typed by a type T, the contextual type of an element expression at index N is
        // the type of the property with the numeric name N in T, if one exists. Otherwise, if T has a numeric index signature,
        // it is the type of the numeric index signature in T. Otherwise, in ES6 and higher, the contextual type is the iterated
        // type of T.
        function getContextualTypeForElementExpression(node) {
            let arrayLiteral = node.parent;
            let type = getContextualType(arrayLiteral);
            if (type) {
                let index = ts.indexOf(arrayLiteral.elements, node);
                return getTypeOfPropertyOfContextualType(type, "" + index)
                    || getIndexTypeOfContextualType(type, 1 /* Number */)
                    || (languageVersion >= 2 /* ES6 */ ? checkIteratedType(type, undefined) : undefined);
            }
            return undefined;
        }
        // In a contextually typed conditional expression, the true/false expressions are contextually typed by the same type.
        function getContextualTypeForConditionalOperand(node) {
            let conditional = node.parent;
            return node === conditional.whenTrue || node === conditional.whenFalse ? getContextualType(conditional) : undefined;
        }
        // Return the contextual type for a given expression node. During overload resolution, a contextual type may temporarily
        // be "pushed" onto a node using the contextualType property.
        function getContextualType(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (node.contextualType) {
                return node.contextualType;
            }
            let parent = node.parent;
            switch (parent.kind) {
                case 198 /* VariableDeclaration */:
                case 129 /* Parameter */:
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                case 152 /* BindingElement */:
                    return getContextualTypeForInitializerExpression(node);
                case 163 /* ArrowFunction */:
                case 191 /* ReturnStatement */:
                    return getContextualTypeForReturnExpression(node);
                case 157 /* CallExpression */:
                case 158 /* NewExpression */:
                    return getContextualTypeForArgument(parent, node);
                case 160 /* TypeAssertionExpression */:
                    return getTypeFromTypeNodeOrHeritageClauseElement(parent.type);
                case 169 /* BinaryExpression */:
                    return getContextualTypeForBinaryOperand(node);
                case 224 /* PropertyAssignment */:
                    return getContextualTypeForObjectLiteralElement(parent);
                case 153 /* ArrayLiteralExpression */:
                    return getContextualTypeForElementExpression(node);
                case 170 /* ConditionalExpression */:
                    return getContextualTypeForConditionalOperand(node);
                case 176 /* TemplateSpan */:
                    ts.Debug.assert(parent.parent.kind === 171 /* TemplateExpression */);
                    return getContextualTypeForSubstitutionExpression(parent.parent, node);
                case 161 /* ParenthesizedExpression */:
                    return getContextualType(parent);
            }
            return undefined;
        }
        // If the given type is an object or union type, if that type has a single signature, and if
        // that signature is non-generic, return the signature. Otherwise return undefined.
        function getNonGenericSignature(type) {
            let signatures = getSignaturesOfObjectOrUnionType(type, 0 /* Call */);
            if (signatures.length === 1) {
                let signature = signatures[0];
                if (!signature.typeParameters) {
                    return signature;
                }
            }
        }
        function isFunctionExpressionOrArrowFunction(node) {
            return node.kind === 162 /* FunctionExpression */ || node.kind === 163 /* ArrowFunction */;
        }
        function getContextualSignatureForFunctionLikeDeclaration(node) {
            // Only function expressions and arrow functions are contextually typed.
            return isFunctionExpressionOrArrowFunction(node) ? getContextualSignature(node) : undefined;
        }
        // Return the contextual signature for a given expression node. A contextual type provides a
        // contextual signature if it has a single call signature and if that call signature is non-generic.
        // If the contextual type is a union type, get the signature from each type possible and if they are
        // all identical ignoring their return type, the result is same signature but with return type as
        // union type of return types from these signatures
        function getContextualSignature(node) {
            ts.Debug.assert(node.kind !== 134 /* MethodDeclaration */ || ts.isObjectLiteralMethod(node));
            let type = ts.isObjectLiteralMethod(node)
                ? getContextualTypeForObjectLiteralMethod(node)
                : getContextualType(node);
            if (!type) {
                return undefined;
            }
            if (!(type.flags & 16384 /* Union */)) {
                return getNonGenericSignature(type);
            }
            let signatureList;
            let types = type.types;
            for (let current of types) {
                // The signature set of all constituent type with call signatures should match
                // So number of signatures allowed is either 0 or 1
                if (signatureList &&
                    getSignaturesOfObjectOrUnionType(current, 0 /* Call */).length > 1) {
                    return undefined;
                }
                let signature = getNonGenericSignature(current);
                if (signature) {
                    if (!signatureList) {
                        // This signature will contribute to contextual union signature
                        signatureList = [signature];
                    }
                    else if (!compareSignatures(signatureList[0], signature, false, compareTypes)) {
                        // Signatures aren't identical, do not use
                        return undefined;
                    }
                    else {
                        // Use this signature for contextual union signature
                        signatureList.push(signature);
                    }
                }
            }
            // Result is union of signatures collected (return type is union of return types of this signature set)
            let result;
            if (signatureList) {
                result = cloneSignature(signatureList[0]);
                // Clear resolved return type we possibly got from cloneSignature
                result.resolvedReturnType = undefined;
                result.unionSignatures = signatureList;
            }
            return result;
        }
        // Presence of a contextual type mapper indicates inferential typing, except the identityMapper object is
        // used as a special marker for other purposes.
        function isInferentialContext(mapper) {
            return mapper && mapper !== identityMapper;
        }
        // A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
        // assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
        // an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ p: a}] = xxx'.
        function isAssignmentTarget(node) {
            let parent = node.parent;
            if (parent.kind === 169 /* BinaryExpression */ && parent.operatorToken.kind === 53 /* EqualsToken */ && parent.left === node) {
                return true;
            }
            if (parent.kind === 224 /* PropertyAssignment */) {
                return isAssignmentTarget(parent.parent);
            }
            if (parent.kind === 153 /* ArrayLiteralExpression */) {
                return isAssignmentTarget(parent);
            }
            return false;
        }
        function checkSpreadElementExpression(node, contextualMapper) {
            // It is usually not safe to call checkExpressionCached if we can be contextually typing.
            // You can tell that we are contextually typing because of the contextualMapper parameter.
            // While it is true that a spread element can have a contextual type, it does not do anything
            // with this type. It is neither affected by it, nor does it propagate it to its operand.
            // So the fact that contextualMapper is passed is not important, because the operand of a spread
            // element is not contextually typed.
            let arrayOrIterableType = checkExpressionCached(node.expression, contextualMapper);
            return checkIteratedTypeOrElementType(arrayOrIterableType, node.expression, false);
        }
        function checkArrayLiteral(node, contextualMapper) {
            let elements = node.elements;
            if (!elements.length) {
                return createArrayType(undefinedType);
            }
            let hasSpreadElement = false;
            let elementTypes = [];
            for (let e of elements) {
                let type = checkExpression(e, contextualMapper);
                elementTypes.push(type);
                hasSpreadElement = hasSpreadElement || e.kind === 173 /* SpreadElementExpression */;
            }
            if (!hasSpreadElement) {
                let contextualType = getContextualType(node);
                if (contextualType && contextualTypeIsTupleLikeType(contextualType) || isAssignmentTarget(node)) {
                    return createTupleType(elementTypes);
                }
            }
            return createArrayType(getUnionType(elementTypes));
        }
        function isNumericName(name) {
            return name.kind === 127 /* ComputedPropertyName */ ? isNumericComputedName(name) : isNumericLiteralName(name.text);
        }
        function isNumericComputedName(name) {
            // It seems odd to consider an expression of type Any to result in a numeric name,
            // but this behavior is consistent with checkIndexedAccess
            return allConstituentTypesHaveKind(checkComputedPropertyName(name), 1 /* Any */ | 132 /* NumberLike */);
        }
        function isNumericLiteralName(name) {
            // The intent of numeric names is that
            //     - they are names with text in a numeric form, and that
            //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
            //         acquired by applying the abstract 'ToNumber' operation on the name's text.
            //
            // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
            // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
            //
            // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
            // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
            // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
            // because their 'ToString' representation is not equal to their original text.
            // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
            //
            // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
            // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
            // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
            //
            // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
            // This is desired behavior, because when indexing with them as numeric entities, you are indexing
            // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
            return (+name).toString() === name;
        }
        function checkComputedPropertyName(node) {
            let links = getNodeLinks(node.expression);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node.expression);
                // This will allow types number, string, symbol or any. It will also allow enums, the unknown
                // type, and any union of these types (like string | number).
                if (!allConstituentTypesHaveKind(links.resolvedType, 1 /* Any */ | 132 /* NumberLike */ | 258 /* StringLike */ | 1048576 /* ESSymbol */)) {
                    error(node, ts.Diagnostics.A_computed_property_name_must_be_of_type_string_number_symbol_or_any);
                }
                else {
                    checkThatExpressionIsProperSymbolReference(node.expression, links.resolvedType, true);
                }
            }
            return links.resolvedType;
        }
        function checkObjectLiteral(node, contextualMapper) {
            // Grammar checking
            checkGrammarObjectLiteralExpression(node);
            let propertiesTable = {};
            let propertiesArray = [];
            let contextualType = getContextualType(node);
            let typeFlags;
            for (let memberDecl of node.properties) {
                let member = memberDecl.symbol;
                if (memberDecl.kind === 224 /* PropertyAssignment */ ||
                    memberDecl.kind === 225 /* ShorthandPropertyAssignment */ ||
                    ts.isObjectLiteralMethod(memberDecl)) {
                    let type;
                    if (memberDecl.kind === 224 /* PropertyAssignment */) {
                        type = checkPropertyAssignment(memberDecl, contextualMapper);
                    }
                    else if (memberDecl.kind === 134 /* MethodDeclaration */) {
                        type = checkObjectLiteralMethod(memberDecl, contextualMapper);
                    }
                    else {
                        ts.Debug.assert(memberDecl.kind === 225 /* ShorthandPropertyAssignment */);
                        type = memberDecl.name.kind === 127 /* ComputedPropertyName */
                            ? unknownType
                            : checkExpression(memberDecl.name, contextualMapper);
                    }
                    typeFlags |= type.flags;
                    let prop = createSymbol(4 /* Property */ | 67108864 /* Transient */ | member.flags, member.name);
                    prop.declarations = member.declarations;
                    prop.parent = member.parent;
                    if (member.valueDeclaration) {
                        prop.valueDeclaration = member.valueDeclaration;
                    }
                    prop.type = type;
                    prop.target = member;
                    member = prop;
                }
                else {
                    // TypeScript 1.0 spec (April 2014)
                    // A get accessor declaration is processed in the same manner as
                    // an ordinary function declaration(section 6.1) with no parameters.
                    // A set accessor declaration is processed in the same manner
                    // as an ordinary function declaration with a single parameter and a Void return type.
                    ts.Debug.assert(memberDecl.kind === 136 /* GetAccessor */ || memberDecl.kind === 137 /* SetAccessor */);
                    checkAccessorDeclaration(memberDecl);
                }
                if (!ts.hasDynamicName(memberDecl)) {
                    propertiesTable[member.name] = member;
                }
                propertiesArray.push(member);
            }
            let stringIndexType = getIndexType(0 /* String */);
            let numberIndexType = getIndexType(1 /* Number */);
            let result = createAnonymousType(node.symbol, propertiesTable, emptyArray, emptyArray, stringIndexType, numberIndexType);
            result.flags |= 131072 /* ObjectLiteral */ | 524288 /* ContainsObjectLiteral */ | (typeFlags & 262144 /* ContainsUndefinedOrNull */);
            return result;
            function getIndexType(kind) {
                if (contextualType && contextualTypeHasIndexSignature(contextualType, kind)) {
                    let propTypes = [];
                    for (let i = 0; i < propertiesArray.length; i++) {
                        let propertyDecl = node.properties[i];
                        if (kind === 0 /* String */ || isNumericName(propertyDecl.name)) {
                            // Do not call getSymbolOfNode(propertyDecl), as that will get the
                            // original symbol for the node. We actually want to get the symbol
                            // created by checkObjectLiteral, since that will be appropriately
                            // contextually typed and resolved.
                            let type = getTypeOfSymbol(propertiesArray[i]);
                            if (!ts.contains(propTypes, type)) {
                                propTypes.push(type);
                            }
                        }
                    }
                    let result = propTypes.length ? getUnionType(propTypes) : undefinedType;
                    typeFlags |= result.flags;
                    return result;
                }
                return undefined;
            }
        }
        // If a symbol is a synthesized symbol with no value declaration, we assume it is a property. Example of this are the synthesized
        // '.prototype' property as well as synthesized tuple index properties.
        function getDeclarationKindFromSymbol(s) {
            return s.valueDeclaration ? s.valueDeclaration.kind : 132 /* PropertyDeclaration */;
        }
        function getDeclarationFlagsFromSymbol(s) {
            return s.valueDeclaration ? ts.getCombinedNodeFlags(s.valueDeclaration) : s.flags & 134217728 /* Prototype */ ? 16 /* Public */ | 128 /* Static */ : 0;
        }
        function checkClassPropertyAccess(node, left, type, prop) {
            let flags = getDeclarationFlagsFromSymbol(prop);
            // Public properties are always accessible
            if (!(flags & (32 /* Private */ | 64 /* Protected */))) {
                return;
            }
            // Property is known to be private or protected at this point
            // Get the declaring and enclosing class instance types
            let enclosingClassDeclaration = ts.getAncestor(node, 201 /* ClassDeclaration */);
            let enclosingClass = enclosingClassDeclaration ? getDeclaredTypeOfSymbol(getSymbolOfNode(enclosingClassDeclaration)) : undefined;
            let declaringClass = getDeclaredTypeOfSymbol(prop.parent);
            // Private property is accessible if declaring and enclosing class are the same
            if (flags & 32 /* Private */) {
                if (declaringClass !== enclosingClass) {
                    error(node, ts.Diagnostics.Property_0_is_private_and_only_accessible_within_class_1, symbolToString(prop), typeToString(declaringClass));
                }
                return;
            }
            // Property is known to be protected at this point
            // All protected properties of a supertype are accessible in a super access
            if (left.kind === 91 /* SuperKeyword */) {
                return;
            }
            // A protected property is accessible in the declaring class and classes derived from it
            if (!enclosingClass || !hasBaseType(enclosingClass, declaringClass)) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_within_class_1_and_its_subclasses, symbolToString(prop), typeToString(declaringClass));
                return;
            }
            // No further restrictions for static properties
            if (flags & 128 /* Static */) {
                return;
            }
            // An instance property must be accessed through an instance of the enclosing class
            if (!(getTargetType(type).flags & (1024 /* Class */ | 2048 /* Interface */) && hasBaseType(type, enclosingClass))) {
                error(node, ts.Diagnostics.Property_0_is_protected_and_only_accessible_through_an_instance_of_class_1, symbolToString(prop), typeToString(enclosingClass));
            }
        }
        function checkPropertyAccessExpression(node) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.expression, node.name);
        }
        function checkQualifiedName(node) {
            return checkPropertyAccessExpressionOrQualifiedName(node, node.left, node.right);
        }
        function checkPropertyAccessExpressionOrQualifiedName(node, left, right) {
            let type = checkExpressionOrQualifiedName(left);
            if (type === unknownType)
                return type;
            if (type !== anyType) {
                let apparentType = getApparentType(getWidenedType(type));
                if (apparentType === unknownType) {
                    // handle cases when type is Type parameter with invalid constraint
                    return unknownType;
                }
                let prop = getPropertyOfType(apparentType, right.text);
                if (!prop) {
                    if (right.text) {
                        error(right, ts.Diagnostics.Property_0_does_not_exist_on_type_1, ts.declarationNameToString(right), typeToString(type));
                    }
                    return unknownType;
                }
                getNodeLinks(node).resolvedSymbol = prop;
                if (prop.parent && prop.parent.flags & 32 /* Class */) {
                    // TS 1.0 spec (April 2014): 4.8.2
                    // - In a constructor, instance member function, instance member accessor, or
                    //   instance member variable initializer where this references a derived class instance,
                    //   a super property access is permitted and must specify a public instance member function of the base class.
                    // - In a static member function or static member accessor
                    //   where this references the constructor function object of a derived class,
                    //   a super property access is permitted and must specify a public static member function of the base class.
                    if (left.kind === 91 /* SuperKeyword */ && getDeclarationKindFromSymbol(prop) !== 134 /* MethodDeclaration */) {
                        error(right, ts.Diagnostics.Only_public_and_protected_methods_of_the_base_class_are_accessible_via_the_super_keyword);
                    }
                    else {
                        checkClassPropertyAccess(node, left, type, prop);
                    }
                }
                return getTypeOfSymbol(prop);
            }
            return anyType;
        }
        function isValidPropertyAccess(node, propertyName) {
            let left = node.kind === 155 /* PropertyAccessExpression */
                ? node.expression
                : node.left;
            let type = checkExpressionOrQualifiedName(left);
            if (type !== unknownType && type !== anyType) {
                let prop = getPropertyOfType(getWidenedType(type), propertyName);
                if (prop && prop.parent && prop.parent.flags & 32 /* Class */) {
                    if (left.kind === 91 /* SuperKeyword */ && getDeclarationKindFromSymbol(prop) !== 134 /* MethodDeclaration */) {
                        return false;
                    }
                    else {
                        let modificationCount = diagnostics.getModificationCount();
                        checkClassPropertyAccess(node, left, type, prop);
                        return diagnostics.getModificationCount() === modificationCount;
                    }
                }
            }
            return true;
        }
        function checkIndexedAccess(node) {
            // Grammar checking
            if (!node.argumentExpression) {
                let sourceFile = getSourceFile(node);
                if (node.parent.kind === 158 /* NewExpression */ && node.parent.expression === node) {
                    let start = ts.skipTrivia(sourceFile.text, node.expression.end);
                    let end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.new_T_cannot_be_used_to_create_an_array_Use_new_Array_T_instead);
                }
                else {
                    let start = node.end - "]".length;
                    let end = node.end;
                    grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Expression_expected);
                }
            }
            // Obtain base constraint such that we can bail out if the constraint is an unknown type
            let objectType = getApparentType(checkExpression(node.expression));
            let indexType = node.argumentExpression ? checkExpression(node.argumentExpression) : unknownType;
            if (objectType === unknownType) {
                return unknownType;
            }
            let isConstEnum = isConstEnumObjectType(objectType);
            if (isConstEnum &&
                (!node.argumentExpression || node.argumentExpression.kind !== 8 /* StringLiteral */)) {
                error(node.argumentExpression, ts.Diagnostics.A_const_enum_member_can_only_be_accessed_using_a_string_literal);
                return unknownType;
            }
            // TypeScript 1.0 spec (April 2014): 4.10 Property Access
            // - If IndexExpr is a string literal or a numeric literal and ObjExpr's apparent type has a property with the name
            //    given by that literal(converted to its string representation in the case of a numeric literal), the property access is of the type of that property.
            // - Otherwise, if ObjExpr's apparent type has a numeric index signature and IndexExpr is of type Any, the Number primitive type, or an enum type,
            //    the property access is of the type of that index signature.
            // - Otherwise, if ObjExpr's apparent type has a string index signature and IndexExpr is of type Any, the String or Number primitive type, or an enum type,
            //    the property access is of the type of that index signature.
            // - Otherwise, if IndexExpr is of type Any, the String or Number primitive type, or an enum type, the property access is of type Any.
            // See if we can index as a property.
            if (node.argumentExpression) {
                let name = getPropertyNameForIndexedAccess(node.argumentExpression, indexType);
                if (name !== undefined) {
                    let prop = getPropertyOfType(objectType, name);
                    if (prop) {
                        getNodeLinks(node).resolvedSymbol = prop;
                        return getTypeOfSymbol(prop);
                    }
                    else if (isConstEnum) {
                        error(node.argumentExpression, ts.Diagnostics.Property_0_does_not_exist_on_const_enum_1, name, symbolToString(objectType.symbol));
                        return unknownType;
                    }
                }
            }
            // Check for compatible indexer types.
            if (allConstituentTypesHaveKind(indexType, 1 /* Any */ | 258 /* StringLike */ | 132 /* NumberLike */ | 1048576 /* ESSymbol */)) {
                // Try to use a number indexer.
                if (allConstituentTypesHaveKind(indexType, 1 /* Any */ | 132 /* NumberLike */)) {
                    let numberIndexType = getIndexTypeOfType(objectType, 1 /* Number */);
                    if (numberIndexType) {
                        return numberIndexType;
                    }
                }
                // Try to use string indexing.
                let stringIndexType = getIndexTypeOfType(objectType, 0 /* String */);
                if (stringIndexType) {
                    return stringIndexType;
                }
                // Fall back to any.
                if (compilerOptions.noImplicitAny && !compilerOptions.suppressImplicitAnyIndexErrors && objectType !== anyType) {
                    error(node, ts.Diagnostics.Index_signature_of_object_type_implicitly_has_an_any_type);
                }
                return anyType;
            }
            // REVIEW: Users should know the type that was actually used.
            error(node, ts.Diagnostics.An_index_expression_argument_must_be_of_type_string_number_symbol_or_any);
            return unknownType;
        }
        /**
         * If indexArgumentExpression is a string literal or number literal, returns its text.
         * If indexArgumentExpression is a well known symbol, returns the property name corresponding
         *    to this symbol, as long as it is a proper symbol reference.
         * Otherwise, returns undefined.
         */
        function getPropertyNameForIndexedAccess(indexArgumentExpression, indexArgumentType) {
            if (indexArgumentExpression.kind === 8 /* StringLiteral */ || indexArgumentExpression.kind === 7 /* NumericLiteral */) {
                return indexArgumentExpression.text;
            }
            if (checkThatExpressionIsProperSymbolReference(indexArgumentExpression, indexArgumentType, false)) {
                let rightHandSideName = indexArgumentExpression.name.text;
                return ts.getPropertyNameForKnownSymbolName(rightHandSideName);
            }
            return undefined;
        }
        /**
         * A proper symbol reference requires the following:
         *   1. The property access denotes a property that exists
         *   2. The expression is of the form Symbol.<identifier>
         *   3. The property access is of the primitive type symbol.
         *   4. Symbol in this context resolves to the global Symbol object
         */
        function checkThatExpressionIsProperSymbolReference(expression, expressionType, reportError) {
            if (expressionType === unknownType) {
                // There is already an error, so no need to report one.
                return false;
            }
            if (!ts.isWellKnownSymbolSyntactically(expression)) {
                return false;
            }
            // Make sure the property type is the primitive symbol type
            if ((expressionType.flags & 1048576 /* ESSymbol */) === 0) {
                if (reportError) {
                    error(expression, ts.Diagnostics.A_computed_property_name_of_the_form_0_must_be_of_type_symbol, ts.getTextOfNode(expression));
                }
                return false;
            }
            // The name is Symbol.<someName>, so make sure Symbol actually resolves to the
            // global Symbol object
            let leftHandSide = expression.expression;
            let leftHandSideSymbol = getResolvedSymbol(leftHandSide);
            if (!leftHandSideSymbol) {
                return false;
            }
            let globalESSymbol = getGlobalESSymbolConstructorSymbol();
            if (!globalESSymbol) {
                // Already errored when we tried to look up the symbol
                return false;
            }
            if (leftHandSideSymbol !== globalESSymbol) {
                if (reportError) {
                    error(leftHandSide, ts.Diagnostics.Symbol_reference_does_not_refer_to_the_global_Symbol_constructor_object);
                }
                return false;
            }
            return true;
        }
        function resolveUntypedCall(node) {
            if (node.kind === 159 /* TaggedTemplateExpression */) {
                checkExpression(node.template);
            }
            else {
                ts.forEach(node.arguments, argument => {
                    checkExpression(argument);
                });
            }
            return anySignature;
        }
        function resolveErrorCall(node) {
            resolveUntypedCall(node);
            return unknownSignature;
        }
        // Re-order candidate signatures into the result array. Assumes the result array to be empty.
        // The candidate list orders groups in reverse, but within a group signatures are kept in declaration order
        // A nit here is that we reorder only signatures that belong to the same symbol,
        // so order how inherited signatures are processed is still preserved.
        // interface A { (x: string): void }
        // interface B extends A { (x: 'foo'): string }
        // let b: B;
        // b('foo') // <- here overloads should be processed as [(x:'foo'): string, (x: string): void]
        function reorderCandidates(signatures, result) {
            let lastParent;
            let lastSymbol;
            let cutoffIndex = 0;
            let index;
            let specializedIndex = -1;
            let spliceIndex;
            ts.Debug.assert(!result.length);
            for (let signature of signatures) {
                let symbol = signature.declaration && getSymbolOfNode(signature.declaration);
                let parent = signature.declaration && signature.declaration.parent;
                if (!lastSymbol || symbol === lastSymbol) {
                    if (lastParent && parent === lastParent) {
                        index++;
                    }
                    else {
                        lastParent = parent;
                        index = cutoffIndex;
                    }
                }
                else {
                    // current declaration belongs to a different symbol
                    // set cutoffIndex so re-orderings in the future won't change result set from 0 to cutoffIndex
                    index = cutoffIndex = result.length;
                    lastParent = parent;
                }
                lastSymbol = symbol;
                // specialized signatures always need to be placed before non-specialized signatures regardless
                // of the cutoff position; see GH#1133
                if (signature.hasStringLiterals) {
                    specializedIndex++;
                    spliceIndex = specializedIndex;
                    // The cutoff index always needs to be greater than or equal to the specialized signature index
                    // in order to prevent non-specialized signatures from being added before a specialized
                    // signature.
                    cutoffIndex++;
                }
                else {
                    spliceIndex = index;
                }
                result.splice(spliceIndex, 0, signature);
            }
        }
        function getSpreadArgumentIndex(args) {
            for (let i = 0; i < args.length; i++) {
                if (args[i].kind === 173 /* SpreadElementExpression */) {
                    return i;
                }
            }
            return -1;
        }
        function hasCorrectArity(node, args, signature) {
            let adjustedArgCount; // Apparent number of arguments we will have in this call
            let typeArguments; // Type arguments (undefined if none)
            let callIsIncomplete; // In incomplete call we want to be lenient when we have too few arguments
            if (node.kind === 159 /* TaggedTemplateExpression */) {
                let tagExpression = node;
                // Even if the call is incomplete, we'll have a missing expression as our last argument,
                // so we can say the count is just the arg list length
                adjustedArgCount = args.length;
                typeArguments = undefined;
                if (tagExpression.template.kind === 171 /* TemplateExpression */) {
                    // If a tagged template expression lacks a tail literal, the call is incomplete.
                    // Specifically, a template only can end in a TemplateTail or a Missing literal.
                    let templateExpression = tagExpression.template;
                    let lastSpan = ts.lastOrUndefined(templateExpression.templateSpans);
                    ts.Debug.assert(lastSpan !== undefined); // we should always have at least one span.
                    callIsIncomplete = ts.nodeIsMissing(lastSpan.literal) || !!lastSpan.literal.isUnterminated;
                }
                else {
                    // If the template didn't end in a backtick, or its beginning occurred right prior to EOF,
                    // then this might actually turn out to be a TemplateHead in the future;
                    // so we consider the call to be incomplete.
                    let templateLiteral = tagExpression.template;
                    ts.Debug.assert(templateLiteral.kind === 10 /* NoSubstitutionTemplateLiteral */);
                    callIsIncomplete = !!templateLiteral.isUnterminated;
                }
            }
            else {
                let callExpression = node;
                if (!callExpression.arguments) {
                    // This only happens when we have something of the form: 'new C'
                    ts.Debug.assert(callExpression.kind === 158 /* NewExpression */);
                    return signature.minArgumentCount === 0;
                }
                // For IDE scenarios we may have an incomplete call, so a trailing comma is tantamount to adding another argument.
                adjustedArgCount = callExpression.arguments.hasTrailingComma ? args.length + 1 : args.length;
                // If we are missing the close paren, the call is incomplete.
                callIsIncomplete = callExpression.arguments.end === callExpression.end;
                typeArguments = callExpression.typeArguments;
            }
            // If the user supplied type arguments, but the number of type arguments does not match
            // the declared number of type parameters, the call has an incorrect arity.
            let hasRightNumberOfTypeArgs = !typeArguments ||
                (signature.typeParameters && typeArguments.length === signature.typeParameters.length);
            if (!hasRightNumberOfTypeArgs) {
                return false;
            }
            // If spread arguments are present, check that they correspond to a rest parameter. If so, no
            // further checking is necessary.
            let spreadArgIndex = getSpreadArgumentIndex(args);
            if (spreadArgIndex >= 0) {
                return signature.hasRestParameter && spreadArgIndex >= signature.parameters.length - 1;
            }
            // Too many arguments implies incorrect arity.
            if (!signature.hasRestParameter && adjustedArgCount > signature.parameters.length) {
                return false;
            }
            // If the call is incomplete, we should skip the lower bound check.
            let hasEnoughArguments = adjustedArgCount >= signature.minArgumentCount;
            return callIsIncomplete || hasEnoughArguments;
        }
        // If type has a single call signature and no other members, return that signature. Otherwise, return undefined.
        function getSingleCallSignature(type) {
            if (type.flags & 48128 /* ObjectType */) {
                let resolved = resolveObjectOrUnionTypeMembers(type);
                if (resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0 &&
                    resolved.properties.length === 0 && !resolved.stringIndexType && !resolved.numberIndexType) {
                    return resolved.callSignatures[0];
                }
            }
            return undefined;
        }
        // Instantiate a generic signature in the context of a non-generic signature (section 3.8.5 in TypeScript spec)
        function instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper) {
            let context = createInferenceContext(signature.typeParameters, true);
            forEachMatchingParameterType(contextualSignature, signature, (source, target) => {
                // Type parameters from outer context referenced by source type are fixed by instantiation of the source type
                inferTypes(context, instantiateType(source, contextualMapper), target);
            });
            return getSignatureInstantiation(signature, getInferredTypes(context));
        }
        function inferTypeArguments(signature, args, excludeArgument, context) {
            let typeParameters = signature.typeParameters;
            let inferenceMapper = createInferenceMapper(context);
            // Clear out all the inference results from the last time inferTypeArguments was called on this context
            for (let i = 0; i < typeParameters.length; i++) {
                // As an optimization, we don't have to clear (and later recompute) inferred types
                // for type parameters that have already been fixed on the previous call to inferTypeArguments.
                // It would be just as correct to reset all of them. But then we'd be repeating the same work
                // for the type parameters that were fixed, namely the work done by getInferredType.
                if (!context.inferences[i].isFixed) {
                    context.inferredTypes[i] = undefined;
                }
            }
            // On this call to inferTypeArguments, we may get more inferences for certain type parameters that were not
            // fixed last time. This means that a type parameter that failed inference last time may succeed this time,
            // or vice versa. Therefore, the failedTypeParameterIndex is useless if it points to an unfixed type parameter,
            // because it may change. So here we reset it. However, getInferredType will not revisit any type parameters
            // that were previously fixed. So if a fixed type parameter failed previously, it will fail again because
            // it will contain the exact same set of inferences. So if we reset the index from a fixed type parameter,
            // we will lose information that we won't recover this time around.
            if (context.failedTypeParameterIndex !== undefined && !context.inferences[context.failedTypeParameterIndex].isFixed) {
                context.failedTypeParameterIndex = undefined;
            }
            // We perform two passes over the arguments. In the first pass we infer from all arguments, but use
            // wildcards for all context sensitive function expressions.
            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (arg.kind !== 175 /* OmittedExpression */) {
                    let paramType = getTypeAtPosition(signature, i);
                    let argType;
                    if (i === 0 && args[i].parent.kind === 159 /* TaggedTemplateExpression */) {
                        argType = globalTemplateStringsArrayType;
                    }
                    else {
                        // For context sensitive arguments we pass the identityMapper, which is a signal to treat all
                        // context sensitive function expressions as wildcards
                        let mapper = excludeArgument && excludeArgument[i] !== undefined ? identityMapper : inferenceMapper;
                        argType = checkExpressionWithContextualType(arg, paramType, mapper);
                    }
                    inferTypes(context, argType, paramType);
                }
            }
            // In the second pass we visit only context sensitive arguments, and only those that aren't excluded, this
            // time treating function expressions normally (which may cause previously inferred type arguments to be fixed
            // as we construct types for contextually typed parameters)
            if (excludeArgument) {
                for (let i = 0; i < args.length; i++) {
                    // No need to check for omitted args and template expressions, their exlusion value is always undefined
                    if (excludeArgument[i] === false) {
                        let arg = args[i];
                        let paramType = getTypeAtPosition(signature, i);
                        inferTypes(context, checkExpressionWithContextualType(arg, paramType, inferenceMapper), paramType);
                    }
                }
            }
            getInferredTypes(context);
        }
        function checkTypeArguments(signature, typeArguments, typeArgumentResultTypes, reportErrors) {
            let typeParameters = signature.typeParameters;
            let typeArgumentsAreAssignable = true;
            for (let i = 0; i < typeParameters.length; i++) {
                let typeArgNode = typeArguments[i];
                let typeArgument = getTypeFromTypeNodeOrHeritageClauseElement(typeArgNode);
                // Do not push on this array! It has a preallocated length
                typeArgumentResultTypes[i] = typeArgument;
                if (typeArgumentsAreAssignable /* so far */) {
                    let constraint = getConstraintOfTypeParameter(typeParameters[i]);
                    if (constraint) {
                        typeArgumentsAreAssignable = checkTypeAssignableTo(typeArgument, constraint, reportErrors ? typeArgNode : undefined, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
            return typeArgumentsAreAssignable;
        }
        function checkApplicableSignature(node, args, signature, relation, excludeArgument, reportErrors) {
            for (let i = 0; i < args.length; i++) {
                let arg = args[i];
                if (arg.kind !== 175 /* OmittedExpression */) {
                    // Check spread elements against rest type (from arity check we know spread argument corresponds to a rest parameter)
                    let paramType = getTypeAtPosition(signature, i);
                    // A tagged template expression provides a special first argument, and string literals get string literal types
                    // unless we're reporting errors
                    let argType = i === 0 && node.kind === 159 /* TaggedTemplateExpression */ ? globalTemplateStringsArrayType :
                        arg.kind === 8 /* StringLiteral */ && !reportErrors ? getStringLiteralType(arg) :
                            checkExpressionWithContextualType(arg, paramType, excludeArgument && excludeArgument[i] ? identityMapper : undefined);
                    // Use argument expression as error location when reporting errors
                    if (!checkTypeRelatedTo(argType, paramType, relation, reportErrors ? arg : undefined, ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1)) {
                        return false;
                    }
                }
            }
            return true;
        }
        /**
         * Returns the effective arguments for an expression that works like a function invocation.
         *
         * If 'node' is a CallExpression or a NewExpression, then its argument list is returned.
         * If 'node' is a TaggedTemplateExpression, a new argument list is constructed from the substitution
         *    expressions, where the first element of the list is the template for error reporting purposes.
         */
        function getEffectiveCallArguments(node) {
            let args;
            if (node.kind === 159 /* TaggedTemplateExpression */) {
                let template = node.template;
                args = [template];
                if (template.kind === 171 /* TemplateExpression */) {
                    ts.forEach(template.templateSpans, span => {
                        args.push(span.expression);
                    });
                }
            }
            else {
                args = node.arguments || emptyArray;
            }
            return args;
        }
        /**
         * In a 'super' call, type arguments are not provided within the CallExpression node itself.
         * Instead, they must be fetched from the class declaration's base type node.
         *
         * If 'node' is a 'super' call (e.g. super(...), new super(...)), then we attempt to fetch
         * the type arguments off the containing class's first heritage clause (if one exists). Note that if
         * type arguments are supplied on the 'super' call, they are ignored (though this is syntactically incorrect).
         *
         * In all other cases, the call's explicit type arguments are returned.
         */
        function getEffectiveTypeArguments(callExpression) {
            if (callExpression.expression.kind === 91 /* SuperKeyword */) {
                let containingClass = ts.getAncestor(callExpression, 201 /* ClassDeclaration */);
                let baseClassTypeNode = containingClass && ts.getClassExtendsHeritageClauseElement(containingClass);
                return baseClassTypeNode && baseClassTypeNode.typeArguments;
            }
            else {
                // Ordinary case - simple function invocation.
                return callExpression.typeArguments;
            }
        }
        function resolveCall(node, signatures, candidatesOutArray) {
            let isTaggedTemplate = node.kind === 159 /* TaggedTemplateExpression */;
            let typeArguments;
            if (!isTaggedTemplate) {
                typeArguments = getEffectiveTypeArguments(node);
                // We already perform checking on the type arguments on the class declaration itself.
                if (node.expression.kind !== 91 /* SuperKeyword */) {
                    ts.forEach(typeArguments, checkSourceElement);
                }
            }
            let candidates = candidatesOutArray || [];
            // reorderCandidates fills up the candidates array directly
            reorderCandidates(signatures, candidates);
            if (!candidates.length) {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
                return resolveErrorCall(node);
            }
            let args = getEffectiveCallArguments(node);
            // The following applies to any value of 'excludeArgument[i]':
            //    - true:      the argument at 'i' is susceptible to a one-time permanent contextual typing.
            //    - undefined: the argument at 'i' is *not* susceptible to permanent contextual typing.
            //    - false:     the argument at 'i' *was* and *has been* permanently contextually typed.
            //
            // The idea is that we will perform type argument inference & assignability checking once
            // without using the susceptible parameters that are functions, and once more for each of those
            // parameters, contextually typing each as we go along.
            //
            // For a tagged template, then the first argument be 'undefined' if necessary
            // because it represents a TemplateStringsArray.
            let excludeArgument;
            for (let i = isTaggedTemplate ? 1 : 0; i < args.length; i++) {
                if (isContextSensitive(args[i])) {
                    if (!excludeArgument) {
                        excludeArgument = new Array(args.length);
                    }
                    excludeArgument[i] = true;
                }
            }
            // The following variables are captured and modified by calls to chooseOverload.
            // If overload resolution or type argument inference fails, we want to report the
            // best error possible. The best error is one which says that an argument was not
            // assignable to a parameter. This implies that everything else about the overload
            // was fine. So if there is any overload that is only incorrect because of an
            // argument, we will report an error on that one.
            //
            //     function foo(s: string) {}
            //     function foo(n: number) {} // Report argument error on this overload
            //     function foo() {}
            //     foo(true);
            //
            // If none of the overloads even made it that far, there are two possibilities.
            // There was a problem with type arguments for some overload, in which case
            // report an error on that. Or none of the overloads even had correct arity,
            // in which case give an arity error.
            //
            //     function foo<T>(x: T, y: T) {} // Report type argument inference error
            //     function foo() {}
            //     foo(0, true);
            //
            let candidateForArgumentError;
            let candidateForTypeArgumentError;
            let resultOfFailedInference;
            let result;
            // Section 4.12.1:
            // if the candidate list contains one or more signatures for which the type of each argument
            // expression is a subtype of each corresponding parameter type, the return type of the first
            // of those signatures becomes the return type of the function call.
            // Otherwise, the return type of the first signature in the candidate list becomes the return
            // type of the function call.
            //
            // Whether the call is an error is determined by assignability of the arguments. The subtype pass
            // is just important for choosing the best signature. So in the case where there is only one
            // signature, the subtype pass is useless. So skipping it is an optimization.
            if (candidates.length > 1) {
                result = chooseOverload(candidates, subtypeRelation);
            }
            if (!result) {
                // Reinitialize these pointers for round two
                candidateForArgumentError = undefined;
                candidateForTypeArgumentError = undefined;
                resultOfFailedInference = undefined;
                result = chooseOverload(candidates, assignableRelation);
            }
            if (result) {
                return result;
            }
            // No signatures were applicable. Now report errors based on the last applicable signature with
            // no arguments excluded from assignability checks.
            // If candidate is undefined, it means that no candidates had a suitable arity. In that case,
            // skip the checkApplicableSignature check.
            if (candidateForArgumentError) {
                // excludeArgument is undefined, in this case also equivalent to [undefined, undefined, ...]
                // The importance of excludeArgument is to prevent us from typing function expression parameters
                // in arguments too early. If possible, we'd like to only type them once we know the correct
                // overload. However, this matters for the case where the call is correct. When the call is
                // an error, we don't need to exclude any arguments, although it would cause no harm to do so.
                checkApplicableSignature(node, args, candidateForArgumentError, assignableRelation, undefined, true);
            }
            else if (candidateForTypeArgumentError) {
                if (!isTaggedTemplate && node.typeArguments) {
                    checkTypeArguments(candidateForTypeArgumentError, node.typeArguments, [], true);
                }
                else {
                    ts.Debug.assert(resultOfFailedInference.failedTypeParameterIndex >= 0);
                    let failedTypeParameter = candidateForTypeArgumentError.typeParameters[resultOfFailedInference.failedTypeParameterIndex];
                    let inferenceCandidates = getInferenceCandidates(resultOfFailedInference, resultOfFailedInference.failedTypeParameterIndex);
                    let diagnosticChainHead = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.The_type_argument_for_type_parameter_0_cannot_be_inferred_from_the_usage_Consider_specifying_the_type_arguments_explicitly, typeToString(failedTypeParameter));
                    reportNoCommonSupertypeError(inferenceCandidates, node.expression || node.tag, diagnosticChainHead);
                }
            }
            else {
                error(node, ts.Diagnostics.Supplied_parameters_do_not_match_any_signature_of_call_target);
            }
            // No signature was applicable. We have already reported the errors for the invalid signature.
            // If this is a type resolution session, e.g. Language Service, try to get better information that anySignature.
            // Pick the first candidate that matches the arity. This way we can get a contextual type for cases like:
            //  declare function f(a: { xa: number; xb: number; });
            //  f({ |
            if (!produceDiagnostics) {
                for (let candidate of candidates) {
                    if (hasCorrectArity(node, args, candidate)) {
                        return candidate;
                    }
                }
            }
            return resolveErrorCall(node);
            function chooseOverload(candidates, relation) {
                for (let originalCandidate of candidates) {
                    if (!hasCorrectArity(node, args, originalCandidate)) {
                        continue;
                    }
                    let candidate;
                    let typeArgumentsAreValid;
                    let inferenceContext = originalCandidate.typeParameters
                        ? createInferenceContext(originalCandidate.typeParameters, false)
                        : undefined;
                    while (true) {
                        candidate = originalCandidate;
                        if (candidate.typeParameters) {
                            let typeArgumentTypes;
                            if (typeArguments) {
                                typeArgumentTypes = new Array(candidate.typeParameters.length);
                                typeArgumentsAreValid = checkTypeArguments(candidate, typeArguments, typeArgumentTypes, false);
                            }
                            else {
                                inferTypeArguments(candidate, args, excludeArgument, inferenceContext);
                                typeArgumentsAreValid = inferenceContext.failedTypeParameterIndex === undefined;
                                typeArgumentTypes = inferenceContext.inferredTypes;
                            }
                            if (!typeArgumentsAreValid) {
                                break;
                            }
                            candidate = getSignatureInstantiation(candidate, typeArgumentTypes);
                        }
                        if (!checkApplicableSignature(node, args, candidate, relation, excludeArgument, false)) {
                            break;
                        }
                        let index = excludeArgument ? ts.indexOf(excludeArgument, true) : -1;
                        if (index < 0) {
                            return candidate;
                        }
                        excludeArgument[index] = false;
                    }
                    // A post-mortem of this iteration of the loop. The signature was not applicable,
                    // so we want to track it as a candidate for reporting an error. If the candidate
                    // had no type parameters, or had no issues related to type arguments, we can
                    // report an error based on the arguments. If there was an issue with type
                    // arguments, then we can only report an error based on the type arguments.
                    if (originalCandidate.typeParameters) {
                        let instantiatedCandidate = candidate;
                        if (typeArgumentsAreValid) {
                            candidateForArgumentError = instantiatedCandidate;
                        }
                        else {
                            candidateForTypeArgumentError = originalCandidate;
                            if (!typeArguments) {
                                resultOfFailedInference = inferenceContext;
                            }
                        }
                    }
                    else {
                        ts.Debug.assert(originalCandidate === candidate);
                        candidateForArgumentError = originalCandidate;
                    }
                }
                return undefined;
            }
        }
        function resolveCallExpression(node, candidatesOutArray) {
            if (node.expression.kind === 91 /* SuperKeyword */) {
                let superType = checkSuperExpression(node.expression);
                if (superType !== unknownType) {
                    return resolveCall(node, getSignaturesOfType(superType, 1 /* Construct */), candidatesOutArray);
                }
                return resolveUntypedCall(node);
            }
            let funcType = checkExpression(node.expression);
            let apparentType = getApparentType(funcType);
            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }
            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including call signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            let callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
            let constructSignatures = getSignaturesOfType(apparentType, 1 /* Construct */);
            // TS 1.0 spec: 4.12
            // If FuncExpr is of type Any, or of an object type that has no call or construct signatures
            // but is a subtype of the Function interface, the call is an untyped function call. In an
            // untyped function call no TypeArgs are permitted, Args can be any argument list, no contextual
            // types are provided for the argument expressions, and the result is always of type Any.
            // We exclude union types because we may have a union of function types that happen to have
            // no common signatures.
            if (funcType === anyType || (!callSignatures.length && !constructSignatures.length && !(funcType.flags & 16384 /* Union */) && isTypeAssignableTo(funcType, globalFunctionType))) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            // If FuncExpr's apparent type(section 3.8.1) is a function type, the call is a typed function call.
            // TypeScript employs overload resolution in typed function calls in order to support functions
            // with multiple call signatures.
            if (!callSignatures.length) {
                if (constructSignatures.length) {
                    error(node, ts.Diagnostics.Value_of_type_0_is_not_callable_Did_you_mean_to_include_new, typeToString(funcType));
                }
                else {
                    error(node, ts.Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                }
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }
        function resolveNewExpression(node, candidatesOutArray) {
            if (node.arguments && languageVersion < 2 /* ES6 */) {
                let spreadIndex = getSpreadArgumentIndex(node.arguments);
                if (spreadIndex >= 0) {
                    error(node.arguments[spreadIndex], ts.Diagnostics.Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_6_and_higher);
                }
            }
            let expressionType = checkExpression(node.expression);
            // TS 1.0 spec: 4.11
            // If ConstructExpr is of type Any, Args can be any argument
            // list and the result of the operation is of type Any.
            if (expressionType === anyType) {
                if (node.typeArguments) {
                    error(node, ts.Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                }
                return resolveUntypedCall(node);
            }
            // If ConstructExpr's apparent type(section 3.8.1) is an object type with one or
            // more construct signatures, the expression is processed in the same manner as a
            // function call, but using the construct signatures as the initial set of candidate
            // signatures for overload resolution.The result type of the function call becomes
            // the result type of the operation.
            expressionType = getApparentType(expressionType);
            if (expressionType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }
            // Technically, this signatures list may be incomplete. We are taking the apparent type,
            // but we are not including construct signatures that may have been added to the Object or
            // Function interface, since they have none by default. This is a bit of a leap of faith
            // that the user will not add any.
            let constructSignatures = getSignaturesOfType(expressionType, 1 /* Construct */);
            if (constructSignatures.length) {
                return resolveCall(node, constructSignatures, candidatesOutArray);
            }
            // If ConstructExpr's apparent type is an object type with no construct signatures but
            // one or more call signatures, the expression is processed as a function call. A compile-time
            // error occurs if the result of the function call is not Void. The type of the result of the
            // operation is Any.
            let callSignatures = getSignaturesOfType(expressionType, 0 /* Call */);
            if (callSignatures.length) {
                let signature = resolveCall(node, callSignatures, candidatesOutArray);
                if (getReturnTypeOfSignature(signature) !== voidType) {
                    error(node, ts.Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                }
                return signature;
            }
            error(node, ts.Diagnostics.Cannot_use_new_with_an_expression_whose_type_lacks_a_call_or_construct_signature);
            return resolveErrorCall(node);
        }
        function resolveTaggedTemplateExpression(node, candidatesOutArray) {
            let tagType = checkExpression(node.tag);
            let apparentType = getApparentType(tagType);
            if (apparentType === unknownType) {
                // Another error has already been reported
                return resolveErrorCall(node);
            }
            let callSignatures = getSignaturesOfType(apparentType, 0 /* Call */);
            if (tagType === anyType || (!callSignatures.length && !(tagType.flags & 16384 /* Union */) && isTypeAssignableTo(tagType, globalFunctionType))) {
                return resolveUntypedCall(node);
            }
            if (!callSignatures.length) {
                error(node, ts.Diagnostics.Cannot_invoke_an_expression_whose_type_lacks_a_call_signature);
                return resolveErrorCall(node);
            }
            return resolveCall(node, callSignatures, candidatesOutArray);
        }
        // candidatesOutArray is passed by signature help in the language service, and collectCandidates
        // must fill it up with the appropriate candidate signatures
        function getResolvedSignature(node, candidatesOutArray) {
            let links = getNodeLinks(node);
            // If getResolvedSignature has already been called, we will have cached the resolvedSignature.
            // However, it is possible that either candidatesOutArray was not passed in the first time,
            // or that a different candidatesOutArray was passed in. Therefore, we need to redo the work
            // to correctly fill the candidatesOutArray.
            if (!links.resolvedSignature || candidatesOutArray) {
                links.resolvedSignature = anySignature;
                if (node.kind === 157 /* CallExpression */) {
                    links.resolvedSignature = resolveCallExpression(node, candidatesOutArray);
                }
                else if (node.kind === 158 /* NewExpression */) {
                    links.resolvedSignature = resolveNewExpression(node, candidatesOutArray);
                }
                else if (node.kind === 159 /* TaggedTemplateExpression */) {
                    links.resolvedSignature = resolveTaggedTemplateExpression(node, candidatesOutArray);
                }
                else {
                    ts.Debug.fail("Branch in 'getResolvedSignature' should be unreachable.");
                }
            }
            return links.resolvedSignature;
        }
        function checkCallExpression(node) {
            // Grammar checking; stop grammar-checking if checkGrammarTypeArguments return true
            checkGrammarTypeArguments(node, node.typeArguments) || checkGrammarArguments(node, node.arguments);
            let signature = getResolvedSignature(node);
            if (node.expression.kind === 91 /* SuperKeyword */) {
                return voidType;
            }
            if (node.kind === 158 /* NewExpression */) {
                let declaration = signature.declaration;
                if (declaration &&
                    declaration.kind !== 135 /* Constructor */ &&
                    declaration.kind !== 139 /* ConstructSignature */ &&
                    declaration.kind !== 143 /* ConstructorType */) {
                    // When resolved signature is a call signature (and not a construct signature) the result type is any
                    if (compilerOptions.noImplicitAny) {
                        error(node, ts.Diagnostics.new_expression_whose_target_lacks_a_construct_signature_implicitly_has_an_any_type);
                    }
                    return anyType;
                }
            }
            return getReturnTypeOfSignature(signature);
        }
        function checkTaggedTemplateExpression(node) {
            return getReturnTypeOfSignature(getResolvedSignature(node));
        }
        function checkTypeAssertion(node) {
            let exprType = checkExpression(node.expression);
            let targetType = getTypeFromTypeNodeOrHeritageClauseElement(node.type);
            if (produceDiagnostics && targetType !== unknownType) {
                let widenedType = getWidenedType(exprType);
                if (!(isTypeAssignableTo(targetType, widenedType))) {
                    checkTypeAssignableTo(exprType, targetType, node, ts.Diagnostics.Neither_type_0_nor_type_1_is_assignable_to_the_other);
                }
            }
            return targetType;
        }
        function getTypeAtPosition(signature, pos) {
            return signature.hasRestParameter ?
                pos < signature.parameters.length - 1 ? getTypeOfSymbol(signature.parameters[pos]) : getRestTypeOfSignature(signature) :
                pos < signature.parameters.length ? getTypeOfSymbol(signature.parameters[pos]) : anyType;
        }
        function assignContextualParameterTypes(signature, context, mapper) {
            let len = signature.parameters.length - (signature.hasRestParameter ? 1 : 0);
            for (let i = 0; i < len; i++) {
                let parameter = signature.parameters[i];
                let links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeAtPosition(context, i), mapper);
            }
            if (signature.hasRestParameter && context.hasRestParameter && signature.parameters.length >= context.parameters.length) {
                let parameter = signature.parameters[signature.parameters.length - 1];
                let links = getSymbolLinks(parameter);
                links.type = instantiateType(getTypeOfSymbol(context.parameters[context.parameters.length - 1]), mapper);
            }
        }
        function getReturnTypeFromBody(func, contextualMapper) {
            let contextualSignature = getContextualSignatureForFunctionLikeDeclaration(func);
            if (!func.body) {
                return unknownType;
            }
            let type;
            if (func.body.kind !== 179 /* Block */) {
                type = checkExpressionCached(func.body, contextualMapper);
            }
            else {
                // Aggregate the types of expressions within all the return statements.
                let types = checkAndAggregateReturnExpressionTypes(func.body, contextualMapper);
                if (types.length === 0) {
                    return voidType;
                }
                // When return statements are contextually typed we allow the return type to be a union type. Otherwise we require the
                // return expressions to have a best common supertype.
                type = contextualSignature ? getUnionType(types) : getCommonSupertype(types);
                if (!type) {
                    error(func, ts.Diagnostics.No_best_common_type_exists_among_return_expressions);
                    return unknownType;
                }
            }
            if (!contextualSignature) {
                reportErrorsFromWidening(func, type);
            }
            return getWidenedType(type);
        }
        /// Returns a set of types relating to every return expression relating to a function block.
        function checkAndAggregateReturnExpressionTypes(body, contextualMapper) {
            let aggregatedTypes = [];
            ts.forEachReturnStatement(body, returnStatement => {
                let expr = returnStatement.expression;
                if (expr) {
                    let type = checkExpressionCached(expr, contextualMapper);
                    if (!ts.contains(aggregatedTypes, type)) {
                        aggregatedTypes.push(type);
                    }
                }
            });
            return aggregatedTypes;
        }
        function bodyContainsAReturnStatement(funcBody) {
            return ts.forEachReturnStatement(funcBody, returnStatement => {
                return true;
            });
        }
        function bodyContainsSingleThrowStatement(body) {
            return (body.statements.length === 1) && (body.statements[0].kind === 195 /* ThrowStatement */);
        }
        // TypeScript Specification 1.0 (6.3) - July 2014
        // An explicitly typed function whose return type isn't the Void or the Any type
        // must have at least one return statement somewhere in its body.
        // An exception to this rule is if the function implementation consists of a single 'throw' statement.
        function checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(func, returnType) {
            if (!produceDiagnostics) {
                return;
            }
            // Functions that return 'void' or 'any' don't need any return expressions.
            if (returnType === voidType || returnType === anyType) {
                return;
            }
            // If all we have is a function signature, or an arrow function with an expression body, then there is nothing to check.
            if (ts.nodeIsMissing(func.body) || func.body.kind !== 179 /* Block */) {
                return;
            }
            let bodyBlock = func.body;
            // Ensure the body has at least one return expression.
            if (bodyContainsAReturnStatement(bodyBlock)) {
                return;
            }
            // If there are no return expressions, then we need to check if
            // the function body consists solely of a throw statement;
            // this is to make an exception for unimplemented functions.
            if (bodyContainsSingleThrowStatement(bodyBlock)) {
                return;
            }
            // This function does not conform to the specification.
            error(func.type, ts.Diagnostics.A_function_whose_declared_type_is_neither_void_nor_any_must_return_a_value_or_consist_of_a_single_throw_statement);
        }
        function checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper) {
            ts.Debug.assert(node.kind !== 134 /* MethodDeclaration */ || ts.isObjectLiteralMethod(node));
            // Grammar checking
            let hasGrammarError = checkGrammarDeclarationNameInStrictMode(node) || checkGrammarFunctionLikeDeclaration(node);
            if (!hasGrammarError && node.kind === 162 /* FunctionExpression */) {
                checkGrammarFunctionName(node.name) || checkGrammarForGenerator(node);
            }
            // The identityMapper object is used to indicate that function expressions are wildcards
            if (contextualMapper === identityMapper && isContextSensitive(node)) {
                return anyFunctionType;
            }
            let links = getNodeLinks(node);
            let type = getTypeOfSymbol(node.symbol);
            // Check if function expression is contextually typed and assign parameter types if so
            if (!(links.flags & 64 /* ContextChecked */)) {
                let contextualSignature = getContextualSignature(node);
                // If a type check is started at a function expression that is an argument of a function call, obtaining the
                // contextual type may recursively get back to here during overload resolution of the call. If so, we will have
                // already assigned contextual types.
                if (!(links.flags & 64 /* ContextChecked */)) {
                    links.flags |= 64 /* ContextChecked */;
                    if (contextualSignature) {
                        let signature = getSignaturesOfType(type, 0 /* Call */)[0];
                        if (isContextSensitive(node)) {
                            assignContextualParameterTypes(signature, contextualSignature, contextualMapper || identityMapper);
                        }
                        if (!node.type) {
                            signature.resolvedReturnType = resolvingType;
                            let returnType = getReturnTypeFromBody(node, contextualMapper);
                            if (signature.resolvedReturnType === resolvingType) {
                                signature.resolvedReturnType = returnType;
                            }
                        }
                    }
                    checkSignatureDeclaration(node);
                }
            }
            if (produceDiagnostics && node.kind !== 134 /* MethodDeclaration */ && node.kind !== 133 /* MethodSignature */) {
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
            }
            return type;
        }
        function checkFunctionExpressionOrObjectLiteralMethodBody(node) {
            ts.Debug.assert(node.kind !== 134 /* MethodDeclaration */ || ts.isObjectLiteralMethod(node));
            if (node.type && !node.asteriskToken) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNodeOrHeritageClauseElement(node.type));
            }
            if (node.body) {
                if (node.body.kind === 179 /* Block */) {
                    checkSourceElement(node.body);
                }
                else {
                    let exprType = checkExpression(node.body);
                    if (node.type) {
                        checkTypeAssignableTo(exprType, getTypeFromTypeNodeOrHeritageClauseElement(node.type), node.body, undefined);
                    }
                    checkFunctionExpressionBodies(node.body);
                }
            }
        }
        function checkArithmeticOperandType(operand, type, diagnostic) {
            if (!allConstituentTypesHaveKind(type, 1 /* Any */ | 132 /* NumberLike */)) {
                error(operand, diagnostic);
                return false;
            }
            return true;
        }
        function checkReferenceExpression(n, invalidReferenceMessage, constantVariableMessage) {
            function findSymbol(n) {
                let symbol = getNodeLinks(n).resolvedSymbol;
                // Because we got the symbol from the resolvedSymbol property, it might be of kind
                // SymbolFlags.ExportValue. In this case it is necessary to get the actual export
                // symbol, which will have the correct flags set on it.
                return symbol && getExportSymbolOfValueSymbolIfExported(symbol);
            }
            function isReferenceOrErrorExpression(n) {
                // TypeScript 1.0 spec (April 2014):
                // Expressions are classified as values or references.
                // References are the subset of expressions that are permitted as the target of an assignment.
                // Specifically, references are combinations of identifiers(section 4.3), parentheses(section 4.7),
                // and property accesses(section 4.10).
                // All other expression constructs described in this chapter are classified as values.
                switch (n.kind) {
                    case 65 /* Identifier */: {
                        let symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.3
                        // An identifier expression that references a variable or parameter is classified as a reference.
                        // An identifier expression that references any other kind of entity is classified as a value(and therefore cannot be the target of an assignment).
                        return !symbol || symbol === unknownSymbol || symbol === argumentsSymbol || (symbol.flags & 3 /* Variable */) !== 0;
                    }
                    case 155 /* PropertyAccessExpression */: {
                        let symbol = findSymbol(n);
                        // TypeScript 1.0 spec (April 2014): 4.10
                        // A property access expression is always classified as a reference.
                        // NOTE (not in spec): assignment to enum members should not be allowed
                        return !symbol || symbol === unknownSymbol || (symbol.flags & ~8 /* EnumMember */) !== 0;
                    }
                    case 156 /* ElementAccessExpression */:
                        //  old compiler doesn't check indexed assess
                        return true;
                    case 161 /* ParenthesizedExpression */:
                        return isReferenceOrErrorExpression(n.expression);
                    default:
                        return false;
                }
            }
            function isConstVariableReference(n) {
                switch (n.kind) {
                    case 65 /* Identifier */:
                    case 155 /* PropertyAccessExpression */: {
                        let symbol = findSymbol(n);
                        return symbol && (symbol.flags & 3 /* Variable */) !== 0 && (getDeclarationFlagsFromSymbol(symbol) & 8192 /* Const */) !== 0;
                    }
                    case 156 /* ElementAccessExpression */: {
                        let index = n.argumentExpression;
                        let symbol = findSymbol(n.expression);
                        if (symbol && index && index.kind === 8 /* StringLiteral */) {
                            let name = index.text;
                            let prop = getPropertyOfType(getTypeOfSymbol(symbol), name);
                            return prop && (prop.flags & 3 /* Variable */) !== 0 && (getDeclarationFlagsFromSymbol(prop) & 8192 /* Const */) !== 0;
                        }
                        return false;
                    }
                    case 161 /* ParenthesizedExpression */:
                        return isConstVariableReference(n.expression);
                    default:
                        return false;
                }
            }
            if (!isReferenceOrErrorExpression(n)) {
                error(n, invalidReferenceMessage);
                return false;
            }
            if (isConstVariableReference(n)) {
                error(n, constantVariableMessage);
                return false;
            }
            return true;
        }
        function checkDeleteExpression(node) {
            // Grammar checking
            if (node.parserContextFlags & 1 /* StrictMode */ && node.expression.kind === 65 /* Identifier */) {
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                grammarErrorOnNode(node.expression, ts.Diagnostics.delete_cannot_be_called_on_an_identifier_in_strict_mode);
            }
            let operandType = checkExpression(node.expression);
            return booleanType;
        }
        function checkTypeOfExpression(node) {
            let operandType = checkExpression(node.expression);
            return stringType;
        }
        function checkVoidExpression(node) {
            let operandType = checkExpression(node.expression);
            return undefinedType;
        }
        function checkPrefixUnaryExpression(node) {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator
            if ((node.operator === 38 /* PlusPlusToken */ || node.operator === 39 /* MinusMinusToken */)) {
                checkGrammarEvalOrArgumentsInStrictMode(node, node.operand);
            }
            let operandType = checkExpression(node.operand);
            switch (node.operator) {
                case 33 /* PlusToken */:
                case 34 /* MinusToken */:
                case 47 /* TildeToken */:
                    if (someConstituentTypeHasKind(operandType, 1048576 /* ESSymbol */)) {
                        error(node.operand, ts.Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, ts.tokenToString(node.operator));
                    }
                    return numberType;
                case 46 /* ExclamationToken */:
                    return booleanType;
                case 38 /* PlusPlusToken */:
                case 39 /* MinusMinusToken */:
                    let ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
                    if (ok) {
                        // run check only if former checks succeeded to avoid reporting cascading errors
                        checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
                    }
                    return numberType;
            }
            return unknownType;
        }
        function checkPostfixUnaryExpression(node) {
            // Grammar checking
            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(11.13) or of a PostfixExpression(11.3) or as the UnaryExpression
            // operated upon by a Prefix Increment(11.4.4) or a Prefix Decrement(11.4.5) operator.
            checkGrammarEvalOrArgumentsInStrictMode(node, node.operand);
            let operandType = checkExpression(node.operand);
            let ok = checkArithmeticOperandType(node.operand, operandType, ts.Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_or_an_enum_type);
            if (ok) {
                // run check only if former checks succeeded to avoid reporting cascading errors
                checkReferenceExpression(node.operand, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_property_or_indexer, ts.Diagnostics.The_operand_of_an_increment_or_decrement_operator_cannot_be_a_constant);
            }
            return numberType;
        }
        // Just like isTypeOfKind below, except that it returns true if *any* constituent
        // has this kind.
        function someConstituentTypeHasKind(type, kind) {
            if (type.flags & kind) {
                return true;
            }
            if (type.flags & 16384 /* Union */) {
                let types = type.types;
                for (let current of types) {
                    if (current.flags & kind) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        }
        // Return true if type has the given flags, or is a union type composed of types that all have those flags.
        function allConstituentTypesHaveKind(type, kind) {
            if (type.flags & kind) {
                return true;
            }
            if (type.flags & 16384 /* Union */) {
                let types = type.types;
                for (let current of types) {
                    if (!(current.flags & kind)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        function isConstEnumObjectType(type) {
            return type.flags & (48128 /* ObjectType */ | 32768 /* Anonymous */) && type.symbol && isConstEnumSymbol(type.symbol);
        }
        function isConstEnumSymbol(symbol) {
            return (symbol.flags & 128 /* ConstEnum */) !== 0;
        }
        function checkInstanceOfExpression(node, leftType, rightType) {
            // TypeScript 1.0 spec (April 2014): 4.15.4
            // The instanceof operator requires the left operand to be of type Any, an object type, or a type parameter type,
            // and the right operand to be of type Any or a subtype of the 'Function' interface type.
            // The result is always of the Boolean primitive type.
            // NOTE: do not raise error if leftType is unknown as related error was already reported
            if (allConstituentTypesHaveKind(leftType, 1049086 /* Primitive */)) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            // NOTE: do not raise error if right is unknown as related error was already reported
            if (!(rightType.flags & 1 /* Any */ || isTypeSubtypeOf(rightType, globalFunctionType))) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
            }
            return booleanType;
        }
        function checkInExpression(node, leftType, rightType) {
            // TypeScript 1.0 spec (April 2014): 4.15.5
            // The in operator requires the left operand to be of type Any, the String primitive type, or the Number primitive type,
            // and the right operand to be of type Any, an object type, or a type parameter type.
            // The result is always of the Boolean primitive type.
            if (!allConstituentTypesHaveKind(leftType, 1 /* Any */ | 258 /* StringLike */ | 132 /* NumberLike */ | 1048576 /* ESSymbol */)) {
                error(node.left, ts.Diagnostics.The_left_hand_side_of_an_in_expression_must_be_of_type_any_string_number_or_symbol);
            }
            if (!allConstituentTypesHaveKind(rightType, 1 /* Any */ | 48128 /* ObjectType */ | 512 /* TypeParameter */)) {
                error(node.right, ts.Diagnostics.The_right_hand_side_of_an_in_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            return booleanType;
        }
        function checkObjectLiteralAssignment(node, sourceType, contextualMapper) {
            let properties = node.properties;
            for (let p of properties) {
                if (p.kind === 224 /* PropertyAssignment */ || p.kind === 225 /* ShorthandPropertyAssignment */) {
                    // TODO(andersh): Computed property support
                    let name = p.name;
                    let type = sourceType.flags & 1 /* Any */ ? sourceType :
                        getTypeOfPropertyOfType(sourceType, name.text) ||
                            isNumericLiteralName(name.text) && getIndexTypeOfType(sourceType, 1 /* Number */) ||
                            getIndexTypeOfType(sourceType, 0 /* String */);
                    if (type) {
                        checkDestructuringAssignment(p.initializer || name, type);
                    }
                    else {
                        error(name, ts.Diagnostics.Type_0_has_no_property_1_and_no_string_index_signature, typeToString(sourceType), ts.declarationNameToString(name));
                    }
                }
                else {
                    error(p, ts.Diagnostics.Property_assignment_expected);
                }
            }
            return sourceType;
        }
        function checkArrayLiteralAssignment(node, sourceType, contextualMapper) {
            // This elementType will be used if the specific property corresponding to this index is not
            // present (aka the tuple element property). This call also checks that the parentType is in
            // fact an iterable or array (depending on target language).
            let elementType = checkIteratedTypeOrElementType(sourceType, node, false);
            let elements = node.elements;
            for (let i = 0; i < elements.length; i++) {
                let e = elements[i];
                if (e.kind !== 175 /* OmittedExpression */) {
                    if (e.kind !== 173 /* SpreadElementExpression */) {
                        let propName = "" + i;
                        let type = sourceType.flags & 1 /* Any */ ? sourceType :
                            isTupleLikeType(sourceType)
                                ? getTypeOfPropertyOfType(sourceType, propName)
                                : elementType;
                        if (type) {
                            checkDestructuringAssignment(e, type, contextualMapper);
                        }
                        else {
                            if (isTupleType(sourceType)) {
                                error(e, ts.Diagnostics.Tuple_type_0_with_length_1_cannot_be_assigned_to_tuple_with_length_2, typeToString(sourceType), sourceType.elementTypes.length, elements.length);
                            }
                            else {
                                error(e, ts.Diagnostics.Type_0_has_no_property_1, typeToString(sourceType), propName);
                            }
                        }
                    }
                    else {
                        if (i === elements.length - 1) {
                            checkReferenceAssignment(e.expression, createArrayType(elementType), contextualMapper);
                        }
                        else {
                            error(e, ts.Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                        }
                    }
                }
            }
            return sourceType;
        }
        function checkDestructuringAssignment(target, sourceType, contextualMapper) {
            if (target.kind === 169 /* BinaryExpression */ && target.operatorToken.kind === 53 /* EqualsToken */) {
                checkBinaryExpression(target, contextualMapper);
                target = target.left;
            }
            if (target.kind === 154 /* ObjectLiteralExpression */) {
                return checkObjectLiteralAssignment(target, sourceType, contextualMapper);
            }
            if (target.kind === 153 /* ArrayLiteralExpression */) {
                return checkArrayLiteralAssignment(target, sourceType, contextualMapper);
            }
            return checkReferenceAssignment(target, sourceType, contextualMapper);
        }
        function checkReferenceAssignment(target, sourceType, contextualMapper) {
            let targetType = checkExpression(target, contextualMapper);
            if (checkReferenceExpression(target, ts.Diagnostics.Invalid_left_hand_side_of_assignment_expression, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant)) {
                checkTypeAssignableTo(sourceType, targetType, target, undefined);
            }
            return sourceType;
        }
        function checkBinaryExpression(node, contextualMapper) {
            // Grammar checking
            if (ts.isLeftHandSideExpression(node.left) && ts.isAssignmentOperator(node.operatorToken.kind)) {
                // ECMA 262 (Annex C) The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(11.13) or of a PostfixExpression(11.3)
                checkGrammarEvalOrArgumentsInStrictMode(node, node.left);
            }
            let operator = node.operatorToken.kind;
            if (operator === 53 /* EqualsToken */ && (node.left.kind === 154 /* ObjectLiteralExpression */ || node.left.kind === 153 /* ArrayLiteralExpression */)) {
                return checkDestructuringAssignment(node.left, checkExpression(node.right, contextualMapper), contextualMapper);
            }
            let leftType = checkExpression(node.left, contextualMapper);
            let rightType = checkExpression(node.right, contextualMapper);
            switch (operator) {
                case 35 /* AsteriskToken */:
                case 56 /* AsteriskEqualsToken */:
                case 36 /* SlashToken */:
                case 57 /* SlashEqualsToken */:
                case 37 /* PercentToken */:
                case 58 /* PercentEqualsToken */:
                case 34 /* MinusToken */:
                case 55 /* MinusEqualsToken */:
                case 40 /* LessThanLessThanToken */:
                case 59 /* LessThanLessThanEqualsToken */:
                case 41 /* GreaterThanGreaterThanToken */:
                case 60 /* GreaterThanGreaterThanEqualsToken */:
                case 42 /* GreaterThanGreaterThanGreaterThanToken */:
                case 61 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 44 /* BarToken */:
                case 63 /* BarEqualsToken */:
                case 45 /* CaretToken */:
                case 64 /* CaretEqualsToken */:
                case 43 /* AmpersandToken */:
                case 62 /* AmpersandEqualsToken */:
                    // TypeScript 1.0 spec (April 2014): 4.15.1
                    // These operators require their operands to be of type Any, the Number primitive type,
                    // or an enum type. Operands of an enum type are treated
                    // as having the primitive type Number. If one operand is the null or undefined value,
                    // it is treated as having the type of the other operand.
                    // The result is always of the Number primitive type.
                    if (leftType.flags & (32 /* Undefined */ | 64 /* Null */))
                        leftType = rightType;
                    if (rightType.flags & (32 /* Undefined */ | 64 /* Null */))
                        rightType = leftType;
                    let suggestedOperator;
                    // if a user tries to apply a bitwise operator to 2 boolean operands
                    // try and return them a helpful suggestion
                    if ((leftType.flags & 8 /* Boolean */) &&
                        (rightType.flags & 8 /* Boolean */) &&
                        (suggestedOperator = getSuggestedBooleanOperator(node.operatorToken.kind)) !== undefined) {
                        error(node, ts.Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, ts.tokenToString(node.operatorToken.kind), ts.tokenToString(suggestedOperator));
                    }
                    else {
                        // otherwise just check each operand separately and report errors as normal
                        let leftOk = checkArithmeticOperandType(node.left, leftType, ts.Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        let rightOk = checkArithmeticOperandType(node.right, rightType, ts.Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_or_an_enum_type);
                        if (leftOk && rightOk) {
                            checkAssignmentOperator(numberType);
                        }
                    }
                    return numberType;
                case 33 /* PlusToken */:
                case 54 /* PlusEqualsToken */:
                    // TypeScript 1.0 spec (April 2014): 4.15.2
                    // The binary + operator requires both operands to be of the Number primitive type or an enum type,
                    // or at least one of the operands to be of type Any or the String primitive type.
                    // If one operand is the null or undefined value, it is treated as having the type of the other operand.
                    if (leftType.flags & (32 /* Undefined */ | 64 /* Null */))
                        leftType = rightType;
                    if (rightType.flags & (32 /* Undefined */ | 64 /* Null */))
                        rightType = leftType;
                    let resultType;
                    if (allConstituentTypesHaveKind(leftType, 132 /* NumberLike */) && allConstituentTypesHaveKind(rightType, 132 /* NumberLike */)) {
                        // Operands of an enum type are treated as having the primitive type Number.
                        // If both operands are of the Number primitive type, the result is of the Number primitive type.
                        resultType = numberType;
                    }
                    else {
                        if (allConstituentTypesHaveKind(leftType, 258 /* StringLike */) || allConstituentTypesHaveKind(rightType, 258 /* StringLike */)) {
                            // If one or both operands are of the String primitive type, the result is of the String primitive type.
                            resultType = stringType;
                        }
                        else if (leftType.flags & 1 /* Any */ || rightType.flags & 1 /* Any */) {
                            // Otherwise, the result is of type Any.
                            // NOTE: unknown type here denotes error type. Old compiler treated this case as any type so do we.
                            resultType = anyType;
                        }
                        // Symbols are not allowed at all in arithmetic expressions
                        if (resultType && !checkForDisallowedESSymbolOperand(operator)) {
                            return resultType;
                        }
                    }
                    if (!resultType) {
                        reportOperatorError();
                        return anyType;
                    }
                    if (operator === 54 /* PlusEqualsToken */) {
                        checkAssignmentOperator(resultType);
                    }
                    return resultType;
                case 24 /* LessThanToken */:
                case 25 /* GreaterThanToken */:
                case 26 /* LessThanEqualsToken */:
                case 27 /* GreaterThanEqualsToken */:
                    if (!checkForDisallowedESSymbolOperand(operator)) {
                        return booleanType;
                    }
                // Fall through
                case 28 /* EqualsEqualsToken */:
                case 29 /* ExclamationEqualsToken */:
                case 30 /* EqualsEqualsEqualsToken */:
                case 31 /* ExclamationEqualsEqualsToken */:
                    if (!isTypeAssignableTo(leftType, rightType) && !isTypeAssignableTo(rightType, leftType)) {
                        reportOperatorError();
                    }
                    return booleanType;
                case 87 /* InstanceOfKeyword */:
                    return checkInstanceOfExpression(node, leftType, rightType);
                case 86 /* InKeyword */:
                    return checkInExpression(node, leftType, rightType);
                case 48 /* AmpersandAmpersandToken */:
                    return rightType;
                case 49 /* BarBarToken */:
                    return getUnionType([leftType, rightType]);
                case 53 /* EqualsToken */:
                    checkAssignmentOperator(rightType);
                    return rightType;
                case 23 /* CommaToken */:
                    return rightType;
            }
            // Return true if there was no error, false if there was an error.
            function checkForDisallowedESSymbolOperand(operator) {
                let offendingSymbolOperand = someConstituentTypeHasKind(leftType, 1048576 /* ESSymbol */) ? node.left :
                    someConstituentTypeHasKind(rightType, 1048576 /* ESSymbol */) ? node.right :
                        undefined;
                if (offendingSymbolOperand) {
                    error(offendingSymbolOperand, ts.Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, ts.tokenToString(operator));
                    return false;
                }
                return true;
            }
            function getSuggestedBooleanOperator(operator) {
                switch (operator) {
                    case 44 /* BarToken */:
                    case 63 /* BarEqualsToken */:
                        return 49 /* BarBarToken */;
                    case 45 /* CaretToken */:
                    case 64 /* CaretEqualsToken */:
                        return 31 /* ExclamationEqualsEqualsToken */;
                    case 43 /* AmpersandToken */:
                    case 62 /* AmpersandEqualsToken */:
                        return 48 /* AmpersandAmpersandToken */;
                    default:
                        return undefined;
                }
            }
            function checkAssignmentOperator(valueType) {
                if (produceDiagnostics && operator >= 53 /* FirstAssignment */ && operator <= 64 /* LastAssignment */) {
                    // TypeScript 1.0 spec (April 2014): 4.17
                    // An assignment of the form
                    //    VarExpr = ValueExpr
                    // requires VarExpr to be classified as a reference
                    // A compound assignment furthermore requires VarExpr to be classified as a reference (section 4.1)
                    // and the type of the non - compound operation to be assignable to the type of VarExpr.
                    let ok = checkReferenceExpression(node.left, ts.Diagnostics.Invalid_left_hand_side_of_assignment_expression, ts.Diagnostics.Left_hand_side_of_assignment_expression_cannot_be_a_constant);
                    // Use default messages
                    if (ok) {
                        // to avoid cascading errors check assignability only if 'isReference' check succeeded and no errors were reported
                        checkTypeAssignableTo(valueType, leftType, node.left, undefined);
                    }
                }
            }
            function reportOperatorError() {
                error(node, ts.Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, ts.tokenToString(node.operatorToken.kind), typeToString(leftType), typeToString(rightType));
            }
        }
        function checkYieldExpression(node) {
            // Grammar checking
            if (!(node.parserContextFlags & 4 /* Yield */)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.yield_expression_must_be_contained_within_a_generator_declaration);
            }
            else {
                grammarErrorOnFirstToken(node, ts.Diagnostics.yield_expressions_are_not_currently_supported);
            }
        }
        function checkConditionalExpression(node, contextualMapper) {
            checkExpression(node.condition);
            let type1 = checkExpression(node.whenTrue, contextualMapper);
            let type2 = checkExpression(node.whenFalse, contextualMapper);
            return getUnionType([type1, type2]);
        }
        function checkTemplateExpression(node) {
            // We just want to check each expressions, but we are unconcerned with
            // the type of each expression, as any value may be coerced into a string.
            // It is worth asking whether this is what we really want though.
            // A place where we actually *are* concerned with the expressions' types are
            // in tagged templates.
            ts.forEach(node.templateSpans, templateSpan => {
                checkExpression(templateSpan.expression);
            });
            return stringType;
        }
        function checkExpressionWithContextualType(node, contextualType, contextualMapper) {
            let saveContextualType = node.contextualType;
            node.contextualType = contextualType;
            let result = checkExpression(node, contextualMapper);
            node.contextualType = saveContextualType;
            return result;
        }
        function checkExpressionCached(node, contextualMapper) {
            let links = getNodeLinks(node);
            if (!links.resolvedType) {
                links.resolvedType = checkExpression(node, contextualMapper);
            }
            return links.resolvedType;
        }
        function checkPropertyAssignment(node, contextualMapper) {
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === 127 /* ComputedPropertyName */) {
                checkComputedPropertyName(node.name);
            }
            return checkExpression(node.initializer, contextualMapper);
        }
        function checkObjectLiteralMethod(node, contextualMapper) {
            // Grammar checking
            checkGrammarMethod(node);
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === 127 /* ComputedPropertyName */) {
                checkComputedPropertyName(node.name);
            }
            let uninstantiatedType = checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
            return instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
        }
        function instantiateTypeWithSingleGenericCallSignature(node, type, contextualMapper) {
            if (contextualMapper && contextualMapper !== identityMapper) {
                let signature = getSingleCallSignature(type);
                if (signature && signature.typeParameters) {
                    let contextualType = getContextualType(node);
                    if (contextualType) {
                        let contextualSignature = getSingleCallSignature(contextualType);
                        if (contextualSignature && !contextualSignature.typeParameters) {
                            return getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, contextualMapper));
                        }
                    }
                }
            }
            return type;
        }
        function checkExpression(node, contextualMapper) {
            checkGrammarIdentifierInStrictMode(node);
            return checkExpressionOrQualifiedName(node, contextualMapper);
        }
        // Checks an expression and returns its type. The contextualMapper parameter serves two purposes: When
        // contextualMapper is not undefined and not equal to the identityMapper function object it indicates that the
        // expression is being inferentially typed (section 4.12.2 in spec) and provides the type mapper to use in
        // conjunction with the generic contextual type. When contextualMapper is equal to the identityMapper function
        // object, it serves as an indicator that all contained function and arrow expressions should be considered to
        // have the wildcard function type; this form of type check is used during overload resolution to exclude
        // contextually typed function and arrow expressions in the initial phase.
        function checkExpressionOrQualifiedName(node, contextualMapper) {
            let type;
            if (node.kind == 126 /* QualifiedName */) {
                type = checkQualifiedName(node);
            }
            else {
                let uninstantiatedType = checkExpressionWorker(node, contextualMapper);
                type = instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, contextualMapper);
            }
            if (isConstEnumObjectType(type)) {
                // enum object type for const enums are only permitted in:
                // - 'left' in property access
                // - 'object' in indexed access
                // - target in rhs of import statement
                let ok = (node.parent.kind === 155 /* PropertyAccessExpression */ && node.parent.expression === node) ||
                    (node.parent.kind === 156 /* ElementAccessExpression */ && node.parent.expression === node) ||
                    ((node.kind === 65 /* Identifier */ || node.kind === 126 /* QualifiedName */) && isInRightSideOfImportOrExportAssignment(node));
                if (!ok) {
                    error(node, ts.Diagnostics.const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment);
                }
            }
            return type;
        }
        function checkNumericLiteral(node) {
            // Grammar checking
            checkGrammarNumbericLiteral(node);
            return numberType;
        }
        function checkExpressionWorker(node, contextualMapper) {
            switch (node.kind) {
                case 65 /* Identifier */:
                    return checkIdentifier(node);
                case 93 /* ThisKeyword */:
                    return checkThisExpression(node);
                case 91 /* SuperKeyword */:
                    return checkSuperExpression(node);
                case 89 /* NullKeyword */:
                    return nullType;
                case 95 /* TrueKeyword */:
                case 80 /* FalseKeyword */:
                    return booleanType;
                case 7 /* NumericLiteral */:
                    return checkNumericLiteral(node);
                case 171 /* TemplateExpression */:
                    return checkTemplateExpression(node);
                case 8 /* StringLiteral */:
                case 10 /* NoSubstitutionTemplateLiteral */:
                    return stringType;
                case 9 /* RegularExpressionLiteral */:
                    return globalRegExpType;
                case 153 /* ArrayLiteralExpression */:
                    return checkArrayLiteral(node, contextualMapper);
                case 154 /* ObjectLiteralExpression */:
                    return checkObjectLiteral(node, contextualMapper);
                case 155 /* PropertyAccessExpression */:
                    return checkPropertyAccessExpression(node);
                case 156 /* ElementAccessExpression */:
                    return checkIndexedAccess(node);
                case 157 /* CallExpression */:
                case 158 /* NewExpression */:
                    return checkCallExpression(node);
                case 159 /* TaggedTemplateExpression */:
                    return checkTaggedTemplateExpression(node);
                case 160 /* TypeAssertionExpression */:
                    return checkTypeAssertion(node);
                case 161 /* ParenthesizedExpression */:
                    return checkExpression(node.expression, contextualMapper);
                case 174 /* ClassExpression */:
                    return checkClassExpression(node);
                case 162 /* FunctionExpression */:
                case 163 /* ArrowFunction */:
                    return checkFunctionExpressionOrObjectLiteralMethod(node, contextualMapper);
                case 165 /* TypeOfExpression */:
                    return checkTypeOfExpression(node);
                case 164 /* DeleteExpression */:
                    return checkDeleteExpression(node);
                case 166 /* VoidExpression */:
                    return checkVoidExpression(node);
                case 167 /* PrefixUnaryExpression */:
                    return checkPrefixUnaryExpression(node);
                case 168 /* PostfixUnaryExpression */:
                    return checkPostfixUnaryExpression(node);
                case 169 /* BinaryExpression */:
                    return checkBinaryExpression(node, contextualMapper);
                case 170 /* ConditionalExpression */:
                    return checkConditionalExpression(node, contextualMapper);
                case 173 /* SpreadElementExpression */:
                    return checkSpreadElementExpression(node, contextualMapper);
                case 175 /* OmittedExpression */:
                    return undefinedType;
                case 172 /* YieldExpression */:
                    checkYieldExpression(node);
                    return unknownType;
            }
            return unknownType;
        }
        // DECLARATION AND STATEMENT TYPE CHECKING
        function checkTypeParameter(node) {
            checkGrammarDeclarationNameInStrictMode(node);
            // Grammar Checking
            if (node.expression) {
                grammarErrorOnFirstToken(node.expression, ts.Diagnostics.Type_expected);
            }
            checkSourceElement(node.constraint);
            if (produceDiagnostics) {
                checkTypeParameterHasIllegalReferencesInConstraint(node);
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_parameter_name_cannot_be_0);
            }
            // TODO: Check multiple declarations are identical
        }
        function checkParameter(node) {
            // Grammar checking
            // It is a SyntaxError if the Identifier "eval" or the Identifier "arguments" occurs as the
            // Identifier in a PropertySetParameterList of a PropertyAssignment that is contained in strict code
            // or if its FunctionBody is strict code(11.1.5).
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
            // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
            checkVariableLikeDeclaration(node);
            let func = ts.getContainingFunction(node);
            if (node.flags & 112 /* AccessibilityModifier */) {
                func = ts.getContainingFunction(node);
                if (!(func.kind === 135 /* Constructor */ && ts.nodeIsPresent(func.body))) {
                    error(node, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                }
            }
            if (node.questionToken && ts.isBindingPattern(node.name) && func.body) {
                error(node, ts.Diagnostics.A_binding_pattern_parameter_cannot_be_optional_in_an_implementation_signature);
            }
            if (node.dotDotDotToken) {
                if (!isArrayType(getTypeOfSymbol(node.symbol))) {
                    error(node, ts.Diagnostics.A_rest_parameter_must_be_of_an_array_type);
                }
            }
        }
        function checkSignatureDeclaration(node) {
            // Grammar checking
            if (node.kind === 140 /* IndexSignature */) {
                checkGrammarIndexSignature(node);
            }
            else if (node.kind === 142 /* FunctionType */ || node.kind === 200 /* FunctionDeclaration */ || node.kind === 143 /* ConstructorType */ ||
                node.kind === 138 /* CallSignature */ || node.kind === 135 /* Constructor */ ||
                node.kind === 139 /* ConstructSignature */) {
                checkGrammarFunctionLikeDeclaration(node);
            }
            checkTypeParameters(node.typeParameters);
            ts.forEach(node.parameters, checkParameter);
            if (node.type) {
                checkSourceElement(node.type);
            }
            if (produceDiagnostics) {
                checkCollisionWithArgumentsInGeneratedCode(node);
                if (compilerOptions.noImplicitAny && !node.type) {
                    switch (node.kind) {
                        case 139 /* ConstructSignature */:
                            error(node, ts.Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                        case 138 /* CallSignature */:
                            error(node, ts.Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                            break;
                    }
                }
            }
            checkSpecializedSignatureDeclaration(node);
        }
        function checkTypeForDuplicateIndexSignatures(node) {
            if (node.kind === 202 /* InterfaceDeclaration */) {
                let nodeSymbol = getSymbolOfNode(node);
                // in case of merging interface declaration it is possible that we'll enter this check procedure several times for every declaration
                // to prevent this run check only for the first declaration of a given kind
                if (nodeSymbol.declarations.length > 0 && nodeSymbol.declarations[0] !== node) {
                    return;
                }
            }
            // TypeScript 1.0 spec (April 2014)
            // 3.7.4: An object type can contain at most one string index signature and one numeric index signature.
            // 8.5: A class declaration can have at most one string index member declaration and one numeric index member declaration
            let indexSymbol = getIndexSymbol(getSymbolOfNode(node));
            if (indexSymbol) {
                let seenNumericIndexer = false;
                let seenStringIndexer = false;
                for (let decl of indexSymbol.declarations) {
                    let declaration = decl;
                    if (declaration.parameters.length === 1 && declaration.parameters[0].type) {
                        switch (declaration.parameters[0].type.kind) {
                            case 121 /* StringKeyword */:
                                if (!seenStringIndexer) {
                                    seenStringIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_string_index_signature);
                                }
                                break;
                            case 119 /* NumberKeyword */:
                                if (!seenNumericIndexer) {
                                    seenNumericIndexer = true;
                                }
                                else {
                                    error(declaration, ts.Diagnostics.Duplicate_number_index_signature);
                                }
                                break;
                        }
                    }
                }
            }
        }
        function checkPropertyDeclaration(node) {
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarProperty(node) || checkGrammarComputedPropertyName(node.name);
            checkVariableLikeDeclaration(node);
        }
        function checkMethodDeclaration(node) {
            // Grammar checking
            checkGrammarMethod(node) || checkGrammarComputedPropertyName(node.name);
            // Grammar checking for modifiers is done inside the function checkGrammarFunctionLikeDeclaration
            checkFunctionLikeDeclaration(node);
        }
        function checkConstructorDeclaration(node) {
            // Grammar check on signature of constructor and modifier of the constructor is done in checkSignatureDeclaration function.
            checkSignatureDeclaration(node);
            // Grammar check for checking only related to constructoDeclaration
            checkGrammarConstructorTypeParameters(node) || checkGrammarConstructorTypeAnnotation(node);
            checkSourceElement(node.body);
            let symbol = getSymbolOfNode(node);
            let firstDeclaration = ts.getDeclarationOfKind(symbol, node.kind);
            // Only type check the symbol once
            if (node === firstDeclaration) {
                checkFunctionOrConstructorSymbol(symbol);
            }
            // exit early in the case of signature - super checks are not relevant to them
            if (ts.nodeIsMissing(node.body)) {
                return;
            }
            if (!produceDiagnostics) {
                return;
            }
            function isSuperCallExpression(n) {
                return n.kind === 157 /* CallExpression */ && n.expression.kind === 91 /* SuperKeyword */;
            }
            function containsSuperCall(n) {
                if (isSuperCallExpression(n)) {
                    return true;
                }
                switch (n.kind) {
                    case 162 /* FunctionExpression */:
                    case 200 /* FunctionDeclaration */:
                    case 163 /* ArrowFunction */:
                    case 154 /* ObjectLiteralExpression */: return false;
                    default: return ts.forEachChild(n, containsSuperCall);
                }
            }
            function markThisReferencesAsErrors(n) {
                if (n.kind === 93 /* ThisKeyword */) {
                    error(n, ts.Diagnostics.this_cannot_be_referenced_in_current_location);
                }
                else if (n.kind !== 162 /* FunctionExpression */ && n.kind !== 200 /* FunctionDeclaration */) {
                    ts.forEachChild(n, markThisReferencesAsErrors);
                }
            }
            function isInstancePropertyWithInitializer(n) {
                return n.kind === 132 /* PropertyDeclaration */ &&
                    !(n.flags & 128 /* Static */) &&
                    !!n.initializer;
            }
            // TS 1.0 spec (April 2014): 8.3.2
            // Constructors of classes with no extends clause may not contain super calls, whereas
            // constructors of derived classes must contain at least one super call somewhere in their function body.
            if (ts.getClassExtendsHeritageClauseElement(node.parent)) {
                if (containsSuperCall(node.body)) {
                    // The first statement in the body of a constructor must be a super call if both of the following are true:
                    // - The containing class is a derived class.
                    // - The constructor declares parameter properties
                    //   or the containing class declares instance member variables with initializers.
                    let superCallShouldBeFirst = ts.forEach(node.parent.members, isInstancePropertyWithInitializer) ||
                        ts.forEach(node.parameters, p => p.flags & (16 /* Public */ | 32 /* Private */ | 64 /* Protected */));
                    if (superCallShouldBeFirst) {
                        let statements = node.body.statements;
                        if (!statements.length || statements[0].kind !== 182 /* ExpressionStatement */ || !isSuperCallExpression(statements[0].expression)) {
                            error(node, ts.Diagnostics.A_super_call_must_be_the_first_statement_in_the_constructor_when_a_class_contains_initialized_properties_or_has_parameter_properties);
                        }
                        else {
                            // In such a required super call, it is a compile-time error for argument expressions to reference this.
                            markThisReferencesAsErrors(statements[0].expression);
                        }
                    }
                }
                else {
                    error(node, ts.Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call);
                }
            }
        }
        function checkAccessorDeclaration(node) {
            if (produceDiagnostics) {
                // Grammar checking accessors
                checkGrammarFunctionLikeDeclaration(node) || checkGrammarAccessor(node) || checkGrammarComputedPropertyName(node.name);
                if (node.kind === 136 /* GetAccessor */) {
                    if (!ts.isInAmbientContext(node) && ts.nodeIsPresent(node.body) && !(bodyContainsAReturnStatement(node.body) || bodyContainsSingleThrowStatement(node.body))) {
                        error(node.name, ts.Diagnostics.A_get_accessor_must_return_a_value_or_consist_of_a_single_throw_statement);
                    }
                }
                if (!ts.hasDynamicName(node)) {
                    // TypeScript 1.0 spec (April 2014): 8.4.3
                    // Accessors for the same member name must specify the same accessibility.
                    let otherKind = node.kind === 136 /* GetAccessor */ ? 137 /* SetAccessor */ : 136 /* GetAccessor */;
                    let otherAccessor = ts.getDeclarationOfKind(node.symbol, otherKind);
                    if (otherAccessor) {
                        if (((node.flags & 112 /* AccessibilityModifier */) !== (otherAccessor.flags & 112 /* AccessibilityModifier */))) {
                            error(node.name, ts.Diagnostics.Getter_and_setter_accessors_do_not_agree_in_visibility);
                        }
                        let currentAccessorType = getAnnotatedAccessorType(node);
                        let otherAccessorType = getAnnotatedAccessorType(otherAccessor);
                        // TypeScript 1.0 spec (April 2014): 4.5
                        // If both accessors include type annotations, the specified types must be identical.
                        if (currentAccessorType && otherAccessorType) {
                            if (!isTypeIdenticalTo(currentAccessorType, otherAccessorType)) {
                                error(node, ts.Diagnostics.get_and_set_accessor_must_have_the_same_type);
                            }
                        }
                    }
                }
                checkAndStoreTypeOfAccessors(getSymbolOfNode(node));
            }
            checkFunctionLikeDeclaration(node);
        }
        function checkMissingDeclaration(node) {
            checkDecorators(node);
        }
        function checkTypeReferenceNode(node) {
            checkGrammarTypeReferenceInStrictMode(node.typeName);
            return checkTypeReferenceOrHeritageClauseElement(node);
        }
        function checkHeritageClauseElement(node) {
            checkGrammarHeritageClauseElementInStrictMode(node.expression);
            return checkTypeReferenceOrHeritageClauseElement(node);
        }
        function checkTypeReferenceOrHeritageClauseElement(node) {
            // Grammar checking
            checkGrammarTypeArguments(node, node.typeArguments);
            let type = getTypeFromTypeReferenceOrHeritageClauseElement(node);
            if (type !== unknownType && node.typeArguments) {
                // Do type argument local checks only if referenced type is successfully resolved
                let len = node.typeArguments.length;
                for (let i = 0; i < len; i++) {
                    checkSourceElement(node.typeArguments[i]);
                    let constraint = getConstraintOfTypeParameter(type.target.typeParameters[i]);
                    if (produceDiagnostics && constraint) {
                        let typeArgument = type.typeArguments[i];
                        checkTypeAssignableTo(typeArgument, constraint, node, ts.Diagnostics.Type_0_does_not_satisfy_the_constraint_1);
                    }
                }
            }
        }
        function checkTypeQuery(node) {
            getTypeFromTypeQueryNode(node);
        }
        function checkTypeLiteral(node) {
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                let type = getTypeFromTypeLiteralOrFunctionOrConstructorTypeNode(node);
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkArrayType(node) {
            checkSourceElement(node.elementType);
        }
        function checkTupleType(node) {
            // Grammar checking
            let hasErrorFromDisallowedTrailingComma = checkGrammarForDisallowedTrailingComma(node.elementTypes);
            if (!hasErrorFromDisallowedTrailingComma && node.elementTypes.length === 0) {
                grammarErrorOnNode(node, ts.Diagnostics.A_tuple_type_element_list_cannot_be_empty);
            }
            ts.forEach(node.elementTypes, checkSourceElement);
        }
        function checkUnionType(node) {
            ts.forEach(node.types, checkSourceElement);
        }
        function isPrivateWithinAmbient(node) {
            return (node.flags & 32 /* Private */) && ts.isInAmbientContext(node);
        }
        function checkSpecializedSignatureDeclaration(signatureDeclarationNode) {
            if (!produceDiagnostics) {
                return;
            }
            let signature = getSignatureFromDeclaration(signatureDeclarationNode);
            if (!signature.hasStringLiterals) {
                return;
            }
            // TypeScript 1.0 spec (April 2014): 3.7.2.2
            // Specialized signatures are not permitted in conjunction with a function body
            if (ts.nodeIsPresent(signatureDeclarationNode.body)) {
                error(signatureDeclarationNode, ts.Diagnostics.A_signature_with_an_implementation_cannot_use_a_string_literal_type);
                return;
            }
            // TypeScript 1.0 spec (April 2014): 3.7.2.4
            // Every specialized call or construct signature in an object type must be assignable
            // to at least one non-specialized call or construct signature in the same object type
            let signaturesToCheck;
            // Unnamed (call\construct) signatures in interfaces are inherited and not shadowed so examining just node symbol won't give complete answer.
            // Use declaring type to obtain full list of signatures.
            if (!signatureDeclarationNode.name && signatureDeclarationNode.parent && signatureDeclarationNode.parent.kind === 202 /* InterfaceDeclaration */) {
                ts.Debug.assert(signatureDeclarationNode.kind === 138 /* CallSignature */ || signatureDeclarationNode.kind === 139 /* ConstructSignature */);
                let signatureKind = signatureDeclarationNode.kind === 138 /* CallSignature */ ? 0 /* Call */ : 1 /* Construct */;
                let containingSymbol = getSymbolOfNode(signatureDeclarationNode.parent);
                let containingType = getDeclaredTypeOfSymbol(containingSymbol);
                signaturesToCheck = getSignaturesOfType(containingType, signatureKind);
            }
            else {
                signaturesToCheck = getSignaturesOfSymbol(getSymbolOfNode(signatureDeclarationNode));
            }
            for (let otherSignature of signaturesToCheck) {
                if (!otherSignature.hasStringLiterals && isSignatureAssignableTo(signature, otherSignature)) {
                    return;
                }
            }
            error(signatureDeclarationNode, ts.Diagnostics.Specialized_overload_signature_is_not_assignable_to_any_non_specialized_signature);
        }
        function getEffectiveDeclarationFlags(n, flagsToCheck) {
            let flags = ts.getCombinedNodeFlags(n);
            if (n.parent.kind !== 202 /* InterfaceDeclaration */ && ts.isInAmbientContext(n)) {
                if (!(flags & 2 /* Ambient */)) {
                    // It is nested in an ambient context, which means it is automatically exported
                    flags |= 1 /* Export */;
                }
                flags |= 2 /* Ambient */;
            }
            return flags & flagsToCheck;
        }
        function checkFunctionOrConstructorSymbol(symbol) {
            if (!produceDiagnostics) {
                return;
            }
            function getCanonicalOverload(overloads, implementation) {
                // Consider the canonical set of flags to be the flags of the bodyDeclaration or the first declaration
                // Error on all deviations from this canonical set of flags
                // The caveat is that if some overloads are defined in lib.d.ts, we don't want to
                // report the errors on those. To achieve this, we will say that the implementation is
                // the canonical signature only if it is in the same container as the first overload
                let implementationSharesContainerWithFirstOverload = implementation !== undefined && implementation.parent === overloads[0].parent;
                return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
            }
            function checkFlagAgreementBetweenOverloads(overloads, implementation, flagsToCheck, someOverloadFlags, allOverloadFlags) {
                // Error if some overloads have a flag that is not shared by all overloads. To find the
                // deviations, we XOR someOverloadFlags with allOverloadFlags
                let someButNotAllOverloadFlags = someOverloadFlags ^ allOverloadFlags;
                if (someButNotAllOverloadFlags !== 0) {
                    let canonicalFlags = getEffectiveDeclarationFlags(getCanonicalOverload(overloads, implementation), flagsToCheck);
                    ts.forEach(overloads, o => {
                        let deviation = getEffectiveDeclarationFlags(o, flagsToCheck) ^ canonicalFlags;
                        if (deviation & 1 /* Export */) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_exported_or_not_exported);
                        }
                        else if (deviation & 2 /* Ambient */) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_ambient_or_non_ambient);
                        }
                        else if (deviation & (32 /* Private */ | 64 /* Protected */)) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_public_private_or_protected);
                        }
                    });
                }
            }
            function checkQuestionTokenAgreementBetweenOverloads(overloads, implementation, someHaveQuestionToken, allHaveQuestionToken) {
                if (someHaveQuestionToken !== allHaveQuestionToken) {
                    let canonicalHasQuestionToken = ts.hasQuestionToken(getCanonicalOverload(overloads, implementation));
                    ts.forEach(overloads, o => {
                        let deviation = ts.hasQuestionToken(o) !== canonicalHasQuestionToken;
                        if (deviation) {
                            error(o.name, ts.Diagnostics.Overload_signatures_must_all_be_optional_or_required);
                        }
                    });
                }
            }
            let flagsToCheck = 1 /* Export */ | 2 /* Ambient */ | 32 /* Private */ | 64 /* Protected */;
            let someNodeFlags = 0;
            let allNodeFlags = flagsToCheck;
            let someHaveQuestionToken = false;
            let allHaveQuestionToken = true;
            let hasOverloads = false;
            let bodyDeclaration;
            let lastSeenNonAmbientDeclaration;
            let previousDeclaration;
            let declarations = symbol.declarations;
            let isConstructor = (symbol.flags & 16384 /* Constructor */) !== 0;
            function reportImplementationExpectedError(node) {
                if (node.name && ts.nodeIsMissing(node.name)) {
                    return;
                }
                let seen = false;
                let subsequentNode = ts.forEachChild(node.parent, c => {
                    if (seen) {
                        return c;
                    }
                    else {
                        seen = c === node;
                    }
                });
                if (subsequentNode) {
                    if (subsequentNode.kind === node.kind) {
                        let errorNode = subsequentNode.name || subsequentNode;
                        // TODO(jfreeman): These are methods, so handle computed name case
                        if (node.name && subsequentNode.name && node.name.text === subsequentNode.name.text) {
                            // the only situation when this is possible (same kind\same name but different symbol) - mixed static and instance class members
                            ts.Debug.assert(node.kind === 134 /* MethodDeclaration */ || node.kind === 133 /* MethodSignature */);
                            ts.Debug.assert((node.flags & 128 /* Static */) !== (subsequentNode.flags & 128 /* Static */));
                            let diagnostic = node.flags & 128 /* Static */ ? ts.Diagnostics.Function_overload_must_be_static : ts.Diagnostics.Function_overload_must_not_be_static;
                            error(errorNode, diagnostic);
                            return;
                        }
                        else if (ts.nodeIsPresent(subsequentNode.body)) {
                            error(errorNode, ts.Diagnostics.Function_implementation_name_must_be_0, ts.declarationNameToString(node.name));
                            return;
                        }
                    }
                }
                let errorNode = node.name || node;
                if (isConstructor) {
                    error(errorNode, ts.Diagnostics.Constructor_implementation_is_missing);
                }
                else {
                    error(errorNode, ts.Diagnostics.Function_implementation_is_missing_or_not_immediately_following_the_declaration);
                }
            }
            // when checking exported function declarations across modules check only duplicate implementations
            // names and consistency of modifiers are verified when we check local symbol
            let isExportSymbolInsideModule = symbol.parent && symbol.parent.flags & 1536 /* Module */;
            let duplicateFunctionDeclaration = false;
            let multipleConstructorImplementation = false;
            for (let current of declarations) {
                let node = current;
                let inAmbientContext = ts.isInAmbientContext(node);
                let inAmbientContextOrInterface = node.parent.kind === 202 /* InterfaceDeclaration */ || node.parent.kind === 145 /* TypeLiteral */ || inAmbientContext;
                if (inAmbientContextOrInterface) {
                    // check if declarations are consecutive only if they are non-ambient
                    // 1. ambient declarations can be interleaved
                    // i.e. this is legal
                    //     declare function foo();
                    //     declare function bar();
                    //     declare function foo();
                    // 2. mixing ambient and non-ambient declarations is a separate error that will be reported - do not want to report an extra one
                    previousDeclaration = undefined;
                }
                if (node.kind === 200 /* FunctionDeclaration */ || node.kind === 134 /* MethodDeclaration */ || node.kind === 133 /* MethodSignature */ || node.kind === 135 /* Constructor */) {
                    let currentNodeFlags = getEffectiveDeclarationFlags(node, flagsToCheck);
                    someNodeFlags |= currentNodeFlags;
                    allNodeFlags &= currentNodeFlags;
                    someHaveQuestionToken = someHaveQuestionToken || ts.hasQuestionToken(node);
                    allHaveQuestionToken = allHaveQuestionToken && ts.hasQuestionToken(node);
                    if (ts.nodeIsPresent(node.body) && bodyDeclaration) {
                        if (isConstructor) {
                            multipleConstructorImplementation = true;
                        }
                        else {
                            duplicateFunctionDeclaration = true;
                        }
                    }
                    else if (!isExportSymbolInsideModule && previousDeclaration && previousDeclaration.parent === node.parent && previousDeclaration.end !== node.pos) {
                        reportImplementationExpectedError(previousDeclaration);
                    }
                    if (ts.nodeIsPresent(node.body)) {
                        if (!bodyDeclaration) {
                            bodyDeclaration = node;
                        }
                    }
                    else {
                        hasOverloads = true;
                    }
                    previousDeclaration = node;
                    if (!inAmbientContextOrInterface) {
                        lastSeenNonAmbientDeclaration = node;
                    }
                }
            }
            if (multipleConstructorImplementation) {
                ts.forEach(declarations, declaration => {
                    error(declaration, ts.Diagnostics.Multiple_constructor_implementations_are_not_allowed);
                });
            }
            if (duplicateFunctionDeclaration) {
                ts.forEach(declarations, declaration => {
                    error(declaration.name, ts.Diagnostics.Duplicate_function_implementation);
                });
            }
            if (!isExportSymbolInsideModule && lastSeenNonAmbientDeclaration && !lastSeenNonAmbientDeclaration.body) {
                reportImplementationExpectedError(lastSeenNonAmbientDeclaration);
            }
            if (hasOverloads) {
                checkFlagAgreementBetweenOverloads(declarations, bodyDeclaration, flagsToCheck, someNodeFlags, allNodeFlags);
                checkQuestionTokenAgreementBetweenOverloads(declarations, bodyDeclaration, someHaveQuestionToken, allHaveQuestionToken);
                if (bodyDeclaration) {
                    let signatures = getSignaturesOfSymbol(symbol);
                    let bodySignature = getSignatureFromDeclaration(bodyDeclaration);
                    // If the implementation signature has string literals, we will have reported an error in
                    // checkSpecializedSignatureDeclaration
                    if (!bodySignature.hasStringLiterals) {
                        // TypeScript 1.0 spec (April 2014): 6.1
                        // If a function declaration includes overloads, the overloads determine the call
                        // signatures of the type given to the function object
                        // and the function implementation signature must be assignable to that type
                        //
                        // TypeScript 1.0 spec (April 2014): 3.8.4
                        // Note that specialized call and construct signatures (section 3.7.2.4) are not significant when determining assignment compatibility
                        // Consider checking against specialized signatures too. Not doing so creates a type hole:
                        //
                        // function g(x: "hi", y: boolean);
                        // function g(x: string, y: {});
                        // function g(x: string, y: string) { }
                        //
                        // The implementation is completely unrelated to the specialized signature, yet we do not check this.
                        for (let signature of signatures) {
                            if (!signature.hasStringLiterals && !isSignatureAssignableTo(bodySignature, signature)) {
                                error(signature.declaration, ts.Diagnostics.Overload_signature_is_not_compatible_with_function_implementation);
                                break;
                            }
                        }
                    }
                }
            }
        }
        function checkExportsOnMergedDeclarations(node) {
            if (!produceDiagnostics) {
                return;
            }
            // Exports should be checked only if enclosing module contains both exported and non exported declarations.
            // In case if all declarations are non-exported check is unnecessary.
            // if localSymbol is defined on node then node itself is exported - check is required
            let symbol = node.localSymbol;
            if (!symbol) {
                // local symbol is undefined => this declaration is non-exported.
                // however symbol might contain other declarations that are exported
                symbol = getSymbolOfNode(node);
                if (!(symbol.flags & 7340032 /* Export */)) {
                    // this is a pure local symbol (all declarations are non-exported) - no need to check anything
                    return;
                }
            }
            // run the check only for the first declaration in the list
            if (ts.getDeclarationOfKind(symbol, node.kind) !== node) {
                return;
            }
            // we use SymbolFlags.ExportValue, SymbolFlags.ExportType and SymbolFlags.ExportNamespace
            // to denote disjoint declarationSpaces (without making new enum type).
            let exportedDeclarationSpaces = 0;
            let nonExportedDeclarationSpaces = 0;
            ts.forEach(symbol.declarations, d => {
                let declarationSpaces = getDeclarationSpaces(d);
                if (getEffectiveDeclarationFlags(d, 1 /* Export */)) {
                    exportedDeclarationSpaces |= declarationSpaces;
                }
                else {
                    nonExportedDeclarationSpaces |= declarationSpaces;
                }
            });
            let commonDeclarationSpace = exportedDeclarationSpaces & nonExportedDeclarationSpaces;
            if (commonDeclarationSpace) {
                // declaration spaces for exported and non-exported declarations intersect
                ts.forEach(symbol.declarations, d => {
                    if (getDeclarationSpaces(d) & commonDeclarationSpace) {
                        error(d.name, ts.Diagnostics.Individual_declarations_in_merged_declaration_0_must_be_all_exported_or_all_local, ts.declarationNameToString(d.name));
                    }
                });
            }
            function getDeclarationSpaces(d) {
                switch (d.kind) {
                    case 202 /* InterfaceDeclaration */:
                        return 2097152 /* ExportType */;
                    case 205 /* ModuleDeclaration */:
                        return d.name.kind === 8 /* StringLiteral */ || ts.getModuleInstanceState(d) !== 0 /* NonInstantiated */
                            ? 4194304 /* ExportNamespace */ | 1048576 /* ExportValue */
                            : 4194304 /* ExportNamespace */;
                    case 201 /* ClassDeclaration */:
                    case 204 /* EnumDeclaration */:
                        return 2097152 /* ExportType */ | 1048576 /* ExportValue */;
                    case 208 /* ImportEqualsDeclaration */:
                        let result = 0;
                        let target = resolveAlias(getSymbolOfNode(d));
                        ts.forEach(target.declarations, d => { result |= getDeclarationSpaces(d); });
                        return result;
                    default:
                        return 1048576 /* ExportValue */;
                }
            }
        }
        /** Check a decorator */
        function checkDecorator(node) {
            let expression = node.expression;
            let exprType = checkExpression(expression);
            switch (node.parent.kind) {
                case 201 /* ClassDeclaration */:
                    let classSymbol = getSymbolOfNode(node.parent);
                    let classConstructorType = getTypeOfSymbol(classSymbol);
                    let classDecoratorType = instantiateSingleCallFunctionType(globalClassDecoratorType, [classConstructorType]);
                    checkTypeAssignableTo(exprType, classDecoratorType, node);
                    break;
                case 132 /* PropertyDeclaration */:
                    checkTypeAssignableTo(exprType, globalPropertyDecoratorType, node);
                    break;
                case 134 /* MethodDeclaration */:
                case 136 /* GetAccessor */:
                case 137 /* SetAccessor */:
                    let methodType = getTypeOfNode(node.parent);
                    let methodDecoratorType = instantiateSingleCallFunctionType(globalMethodDecoratorType, [methodType]);
                    checkTypeAssignableTo(exprType, methodDecoratorType, node);
                    break;
                case 129 /* Parameter */:
                    checkTypeAssignableTo(exprType, globalParameterDecoratorType, node);
                    break;
            }
        }
        /** Checks a type reference node as an expression. */
        function checkTypeNodeAsExpression(node) {
            // When we are emitting type metadata for decorators, we need to try to check the type
            // as if it were an expression so that we can emit the type in a value position when we 
            // serialize the type metadata.
            if (node && node.kind === 141 /* TypeReference */) {
                let type = getTypeFromTypeNodeOrHeritageClauseElement(node);
                let shouldCheckIfUnknownType = type === unknownType && compilerOptions.separateCompilation;
                if (!type || (!shouldCheckIfUnknownType && type.flags & (1048703 /* Intrinsic */ | 132 /* NumberLike */ | 258 /* StringLike */))) {
                    return;
                }
                if (shouldCheckIfUnknownType || type.symbol.valueDeclaration) {
                    checkExpressionOrQualifiedName(node.typeName);
                }
            }
        }
        /**
          * Checks the type annotation of an accessor declaration or property declaration as
          * an expression if it is a type reference to a type with a value declaration.
          */
        function checkTypeAnnotationAsExpression(node) {
            switch (node.kind) {
                case 132 /* PropertyDeclaration */:
                    checkTypeNodeAsExpression(node.type);
                    break;
                case 129 /* Parameter */:
                    checkTypeNodeAsExpression(node.type);
                    break;
                case 134 /* MethodDeclaration */:
                    checkTypeNodeAsExpression(node.type);
                    break;
                case 136 /* GetAccessor */:
                    checkTypeNodeAsExpression(node.type);
                    break;
                case 137 /* SetAccessor */:
                    checkTypeNodeAsExpression(getSetAccessorTypeAnnotationNode(node));
                    break;
            }
        }
        /** Checks the type annotation of the parameters of a function/method or the constructor of a class as expressions */
        function checkParameterTypeAnnotationsAsExpressions(node) {
            // ensure all type annotations with a value declaration are checked as an expression
            for (let parameter of node.parameters) {
                checkTypeAnnotationAsExpression(parameter);
            }
        }
        /** Check the decorators of a node */
        function checkDecorators(node) {
            if (!node.decorators) {
                return;
            }
            // skip this check for nodes that cannot have decorators. These should have already had an error reported by
            // checkGrammarDecorators.
            if (!ts.nodeCanBeDecorated(node)) {
                return;
            }
            if (compilerOptions.emitDecoratorMetadata) {
                // we only need to perform these checks if we are emitting serialized type metadata for the target of a decorator.
                switch (node.kind) {
                    case 201 /* ClassDeclaration */:
                        var constructor = ts.getFirstConstructorWithBody(node);
                        if (constructor) {
                            checkParameterTypeAnnotationsAsExpressions(constructor);
                        }
                        break;
                    case 134 /* MethodDeclaration */:
                        checkParameterTypeAnnotationsAsExpressions(node);
                    // fall-through
                    case 137 /* SetAccessor */:
                    case 136 /* GetAccessor */:
                    case 132 /* PropertyDeclaration */:
                    case 129 /* Parameter */:
                        checkTypeAnnotationAsExpression(node);
                        break;
                }
            }
            emitDecorate = true;
            if (node.kind === 129 /* Parameter */) {
                emitParam = true;
            }
            ts.forEach(node.decorators, checkDecorator);
        }
        function checkFunctionDeclaration(node) {
            if (produceDiagnostics) {
                checkFunctionLikeDeclaration(node) ||
                    checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) ||
                    checkGrammarFunctionName(node.name) ||
                    checkGrammarForGenerator(node);
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }
        function checkFunctionLikeDeclaration(node) {
            checkGrammarDeclarationNameInStrictMode(node);
            checkDecorators(node);
            checkSignatureDeclaration(node);
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name && node.name.kind === 127 /* ComputedPropertyName */) {
                // This check will account for methods in class/interface declarations,
                // as well as accessors in classes/object literals
                checkComputedPropertyName(node.name);
            }
            if (!ts.hasDynamicName(node)) {
                // first we want to check the local symbol that contain this declaration
                // - if node.localSymbol !== undefined - this is current declaration is exported and localSymbol points to the local symbol
                // - if node.localSymbol === undefined - this node is non-exported so we can just pick the result of getSymbolOfNode
                let symbol = getSymbolOfNode(node);
                let localSymbol = node.localSymbol || symbol;
                let firstDeclaration = ts.getDeclarationOfKind(localSymbol, node.kind);
                // Only type check the symbol once
                if (node === firstDeclaration) {
                    checkFunctionOrConstructorSymbol(localSymbol);
                }
                if (symbol.parent) {
                    // run check once for the first declaration
                    if (ts.getDeclarationOfKind(symbol, node.kind) === node) {
                        // run check on export symbol to check that modifiers agree across all exported declarations
                        checkFunctionOrConstructorSymbol(symbol);
                    }
                }
            }
            checkSourceElement(node.body);
            if (node.type && !isAccessor(node.kind) && !node.asteriskToken) {
                checkIfNonVoidFunctionHasReturnExpressionsOrSingleThrowStatment(node, getTypeFromTypeNodeOrHeritageClauseElement(node.type));
            }
            // Report an implicit any error if there is no body, no explicit return type, and node is not a private method
            // in an ambient context
            if (compilerOptions.noImplicitAny && ts.nodeIsMissing(node.body) && !node.type && !isPrivateWithinAmbient(node)) {
                reportImplicitAnyError(node, anyType);
            }
        }
        function checkBlock(node) {
            // Grammar checking for SyntaxKind.Block
            if (node.kind === 179 /* Block */) {
                checkGrammarStatementInAmbientContext(node);
            }
            ts.forEach(node.statements, checkSourceElement);
            if (ts.isFunctionBlock(node) || node.kind === 206 /* ModuleBlock */) {
                checkFunctionExpressionBodies(node);
            }
        }
        function checkCollisionWithArgumentsInGeneratedCode(node) {
            // no rest parameters \ declaration context \ overload - no codegen impact
            if (!ts.hasRestParameters(node) || ts.isInAmbientContext(node) || ts.nodeIsMissing(node.body)) {
                return;
            }
            ts.forEach(node.parameters, p => {
                if (p.name && !ts.isBindingPattern(p.name) && p.name.text === argumentsSymbol.name) {
                    error(p, ts.Diagnostics.Duplicate_identifier_arguments_Compiler_uses_arguments_to_initialize_rest_parameters);
                }
            });
        }
        function needCollisionCheckForIdentifier(node, identifier, name) {
            if (!(identifier && identifier.text === name)) {
                return false;
            }
            if (node.kind === 132 /* PropertyDeclaration */ ||
                node.kind === 131 /* PropertySignature */ ||
                node.kind === 134 /* MethodDeclaration */ ||
                node.kind === 133 /* MethodSignature */ ||
                node.kind === 136 /* GetAccessor */ ||
                node.kind === 137 /* SetAccessor */) {
                // it is ok to have member named '_super' or '_this' - member access is always qualified
                return false;
            }
            if (ts.isInAmbientContext(node)) {
                // ambient context - no codegen impact
                return false;
            }
            let root = getRootDeclaration(node);
            if (root.kind === 129 /* Parameter */ && ts.nodeIsMissing(root.parent.body)) {
                // just an overload - no codegen impact
                return false;
            }
            return true;
        }
        function checkCollisionWithCapturedThisVariable(node, name) {
            if (needCollisionCheckForIdentifier(node, name, "_this")) {
                potentialThisCollisions.push(node);
            }
        }
        // this function will run after checking the source file so 'CaptureThis' is correct for all nodes
        function checkIfThisIsCapturedInEnclosingScope(node) {
            let current = node;
            while (current) {
                if (getNodeCheckFlags(current) & 4 /* CaptureThis */) {
                    let isDeclaration = node.kind !== 65 /* Identifier */;
                    if (isDeclaration) {
                        error(node.name, ts.Diagnostics.Duplicate_identifier_this_Compiler_uses_variable_declaration_this_to_capture_this_reference);
                    }
                    else {
                        error(node, ts.Diagnostics.Expression_resolves_to_variable_declaration_this_that_compiler_uses_to_capture_this_reference);
                    }
                    return;
                }
                current = current.parent;
            }
        }
        function checkCollisionWithCapturedSuperVariable(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "_super")) {
                return;
            }
            // bubble up and find containing type
            let enclosingClass = ts.getAncestor(node, 201 /* ClassDeclaration */);
            // if containing type was not found or it is ambient - exit (no codegen)
            if (!enclosingClass || ts.isInAmbientContext(enclosingClass)) {
                return;
            }
            if (ts.getClassExtendsHeritageClauseElement(enclosingClass)) {
                let isDeclaration = node.kind !== 65 /* Identifier */;
                if (isDeclaration) {
                    error(node, ts.Diagnostics.Duplicate_identifier_super_Compiler_uses_super_to_capture_base_class_reference);
                }
                else {
                    error(node, ts.Diagnostics.Expression_resolves_to_super_that_compiler_uses_to_capture_base_class_reference);
                }
            }
        }
        function checkCollisionWithRequireExportsInGeneratedCode(node, name) {
            if (!needCollisionCheckForIdentifier(node, name, "require") && !needCollisionCheckForIdentifier(node, name, "exports")) {
                return;
            }
            // Uninstantiated modules shouldnt do this check
            if (node.kind === 205 /* ModuleDeclaration */ && ts.getModuleInstanceState(node) !== 1 /* Instantiated */) {
                return;
            }
            // In case of variable declaration, node.parent is variable statement so look at the variable statement's parent
            let parent = getDeclarationContainer(node);
            if (parent.kind === 227 /* SourceFile */ && ts.isExternalModule(parent)) {
                // If the declaration happens to be in external module, report error that require and exports are reserved keywords
                error(name, ts.Diagnostics.Duplicate_identifier_0_Compiler_reserves_name_1_in_top_level_scope_of_an_external_module, ts.declarationNameToString(name), ts.declarationNameToString(name));
            }
        }
        function checkVarDeclaredNamesNotShadowed(node) {
            // - ScriptBody : StatementList
            // It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
            // also occurs in the VarDeclaredNames of StatementList.
            // - Block : { StatementList }
            // It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList
            // also occurs in the VarDeclaredNames of StatementList.
            // Variable declarations are hoisted to the top of their function scope. They can shadow
            // block scoped declarations, which bind tighter. this will not be flagged as duplicate definition
            // by the binder as the declaration scope is different.
            // A non-initialized declaration is a no-op as the block declaration will resolve before the var
            // declaration. the problem is if the declaration has an initializer. this will act as a write to the
            // block declared value. this is fine for let, but not const.
            // Only consider declarations with initializers, uninitialized let declarations will not
            // step on a let/const variable.
            // Do not consider let and const declarations, as duplicate block-scoped declarations
            // are handled by the binder.
            // We are only looking for let declarations that step on let\const declarations from a
            // different scope. e.g.:
            //      {
            //          const x = 0; // localDeclarationSymbol obtained after name resolution will correspond to this declaration
            //          let x = 0; // symbol for this declaration will be 'symbol'
            //      }
            // skip block-scoped variables and parameters
            if ((ts.getCombinedNodeFlags(node) & 12288 /* BlockScoped */) !== 0 || isParameterDeclaration(node)) {
                return;
            }
            // skip variable declarations that don't have initializers
            // NOTE: in ES6 spec initializer is required in variable declarations where name is binding pattern
            // so we'll always treat binding elements as initialized
            if (node.kind === 198 /* VariableDeclaration */ && !node.initializer) {
                return;
            }
            var symbol = getSymbolOfNode(node);
            if (symbol.flags & 1 /* FunctionScopedVariable */) {
                let localDeclarationSymbol = resolveName(node, node.name.text, 3 /* Variable */, undefined, undefined);
                if (localDeclarationSymbol &&
                    localDeclarationSymbol !== symbol &&
                    localDeclarationSymbol.flags & 2 /* BlockScopedVariable */) {
                    if (getDeclarationFlagsFromSymbol(localDeclarationSymbol) & 12288 /* BlockScoped */) {
                        let varDeclList = ts.getAncestor(localDeclarationSymbol.valueDeclaration, 199 /* VariableDeclarationList */);
                        let container = varDeclList.parent.kind === 180 /* VariableStatement */ && varDeclList.parent.parent
                            ? varDeclList.parent.parent
                            : undefined;
                        // names of block-scoped and function scoped variables can collide only
                        // if block scoped variable is defined in the function\module\source file scope (because of variable hoisting)
                        let namesShareScope = container &&
                            (container.kind === 179 /* Block */ && ts.isFunctionLike(container.parent) ||
                                container.kind === 206 /* ModuleBlock */ ||
                                container.kind === 205 /* ModuleDeclaration */ ||
                                container.kind === 227 /* SourceFile */);
                        // here we know that function scoped variable is shadowed by block scoped one
                        // if they are defined in the same scope - binder has already reported redeclaration error
                        // otherwise if variable has an initializer - show error that initialization will fail
                        // since LHS will be block scoped name instead of function scoped
                        if (!namesShareScope) {
                            let name = symbolToString(localDeclarationSymbol);
                            error(node, ts.Diagnostics.Cannot_initialize_outer_scoped_variable_0_in_the_same_scope_as_block_scoped_declaration_1, name, name);
                        }
                    }
                }
            }
        }
        function isParameterDeclaration(node) {
            while (node.kind === 152 /* BindingElement */) {
                node = node.parent.parent;
            }
            return node.kind === 129 /* Parameter */;
        }
        // Check that a parameter initializer contains no references to parameters declared to the right of itself
        function checkParameterInitializer(node) {
            if (getRootDeclaration(node).kind !== 129 /* Parameter */) {
                return;
            }
            let func = ts.getContainingFunction(node);
            visit(node.initializer);
            function visit(n) {
                if (n.kind === 65 /* Identifier */) {
                    let referencedSymbol = getNodeLinks(n).resolvedSymbol;
                    // check FunctionLikeDeclaration.locals (stores parameters\function local variable)
                    // if it contains entry with a specified name and if this entry matches the resolved symbol
                    if (referencedSymbol && referencedSymbol !== unknownSymbol && getSymbol(func.locals, referencedSymbol.name, 107455 /* Value */) === referencedSymbol) {
                        if (referencedSymbol.valueDeclaration.kind === 129 /* Parameter */) {
                            if (referencedSymbol.valueDeclaration === node) {
                                error(n, ts.Diagnostics.Parameter_0_cannot_be_referenced_in_its_initializer, ts.declarationNameToString(node.name));
                                return;
                            }
                            if (referencedSymbol.valueDeclaration.pos < node.pos) {
                                // legal case - parameter initializer references some parameter strictly on left of current parameter declaration
                                return;
                            }
                        }
                        error(n, ts.Diagnostics.Initializer_of_parameter_0_cannot_reference_identifier_1_declared_after_it, ts.declarationNameToString(node.name), ts.declarationNameToString(n));
                    }
                }
                else {
                    ts.forEachChild(n, visit);
                }
            }
        }
        // Check variable, parameter, or property declaration
        function checkVariableLikeDeclaration(node) {
            checkGrammarDeclarationNameInStrictMode(node);
            checkDecorators(node);
            checkSourceElement(node.type);
            // For a computed property, just check the initializer and exit
            // Do not use hasDynamicName here, because that returns false for well known symbols.
            // We want to perform checkComputedPropertyName for all computed properties, including
            // well known symbols.
            if (node.name.kind === 127 /* ComputedPropertyName */) {
                checkComputedPropertyName(node.name);
                if (node.initializer) {
                    checkExpressionCached(node.initializer);
                }
            }
            // For a binding pattern, check contained binding elements
            if (ts.isBindingPattern(node.name)) {
                ts.forEach(node.name.elements, checkSourceElement);
            }
            // For a parameter declaration with an initializer, error and exit if the containing function doesn't have a body
            if (node.initializer && getRootDeclaration(node).kind === 129 /* Parameter */ && ts.nodeIsMissing(ts.getContainingFunction(node).body)) {
                error(node, ts.Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                return;
            }
            // For a binding pattern, validate the initializer and exit
            if (ts.isBindingPattern(node.name)) {
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), getWidenedTypeForVariableLikeDeclaration(node), node, undefined);
                    checkParameterInitializer(node);
                }
                return;
            }
            let symbol = getSymbolOfNode(node);
            let type = getTypeOfVariableOrParameterOrProperty(symbol);
            if (node === symbol.valueDeclaration) {
                // Node is the primary declaration of the symbol, just validate the initializer
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), type, node, undefined);
                    checkParameterInitializer(node);
                }
            }
            else {
                // Node is a secondary declaration, check that type is identical to primary declaration and check that
                // initializer is consistent with type associated with the node
                let declarationType = getWidenedTypeForVariableLikeDeclaration(node);
                if (type !== unknownType && declarationType !== unknownType && !isTypeIdenticalTo(type, declarationType)) {
                    error(node.name, ts.Diagnostics.Subsequent_variable_declarations_must_have_the_same_type_Variable_0_must_be_of_type_1_but_here_has_type_2, ts.declarationNameToString(node.name), typeToString(type), typeToString(declarationType));
                }
                if (node.initializer) {
                    checkTypeAssignableTo(checkExpressionCached(node.initializer), declarationType, node, undefined);
                }
            }
            if (node.kind !== 132 /* PropertyDeclaration */ && node.kind !== 131 /* PropertySignature */) {
                // We know we don't have a binding pattern or computed name here
                checkExportsOnMergedDeclarations(node);
                if (node.kind === 198 /* VariableDeclaration */ || node.kind === 152 /* BindingElement */) {
                    checkVarDeclaredNamesNotShadowed(node);
                }
                checkCollisionWithCapturedSuperVariable(node, node.name);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
        }
        function checkVariableDeclaration(node) {
            checkGrammarVariableDeclaration(node);
            return checkVariableLikeDeclaration(node);
        }
        function checkBindingElement(node) {
            checkGrammarBindingElement(node);
            return checkVariableLikeDeclaration(node);
        }
        function checkVariableStatement(node) {
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) || checkGrammarModifiers(node) || checkGrammarVariableDeclarationList(node.declarationList) || checkGrammarForDisallowedLetOrConstStatement(node);
            ts.forEach(node.declarationList.declarations, checkSourceElement);
        }
        function checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) {
            if (node.modifiers) {
                if (inBlockOrObjectLiteralExpression(node)) {
                    return grammarErrorOnFirstToken(node, ts.Diagnostics.Modifiers_cannot_appear_here);
                }
            }
        }
        function inBlockOrObjectLiteralExpression(node) {
            while (node) {
                if (node.kind === 179 /* Block */ || node.kind === 154 /* ObjectLiteralExpression */) {
                    return true;
                }
                node = node.parent;
            }
        }
        function checkExpressionStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            checkExpression(node.expression);
        }
        function checkIfStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            checkExpression(node.expression);
            checkSourceElement(node.thenStatement);
            checkSourceElement(node.elseStatement);
        }
        function checkDoStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            checkSourceElement(node.statement);
            checkExpression(node.expression);
        }
        function checkWhileStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            checkExpression(node.expression);
            checkSourceElement(node.statement);
        }
        function checkForStatement(node) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                if (node.initializer && node.initializer.kind == 199 /* VariableDeclarationList */) {
                    checkGrammarVariableDeclarationList(node.initializer);
                }
            }
            if (node.initializer) {
                if (node.initializer.kind === 199 /* VariableDeclarationList */) {
                    ts.forEach(node.initializer.declarations, checkVariableDeclaration);
                }
                else {
                    checkExpression(node.initializer);
                }
            }
            if (node.condition)
                checkExpression(node.condition);
            if (node.iterator)
                checkExpression(node.iterator);
            checkSourceElement(node.statement);
        }
        function checkForOfStatement(node) {
            checkGrammarForInOrForOfStatement(node);
            // Check the LHS and RHS
            // If the LHS is a declaration, just check it as a variable declaration, which will in turn check the RHS
            // via checkRightHandSideOfForOf.
            // If the LHS is an expression, check the LHS, as a destructuring assignment or as a reference.
            // Then check that the RHS is assignable to it.
            if (node.initializer.kind === 199 /* VariableDeclarationList */) {
                checkForInOrForOfVariableDeclaration(node);
            }
            else {
                let varExpr = node.initializer;
                let iteratedType = checkRightHandSideOfForOf(node.expression);
                // There may be a destructuring assignment on the left side
                if (varExpr.kind === 153 /* ArrayLiteralExpression */ || varExpr.kind === 154 /* ObjectLiteralExpression */) {
                    // iteratedType may be undefined. In this case, we still want to check the structure of
                    // varExpr, in particular making sure it's a valid LeftHandSideExpression. But we'd like
                    // to short circuit the type relation checking as much as possible, so we pass the unknownType.
                    checkDestructuringAssignment(varExpr, iteratedType || unknownType);
                }
                else {
                    let leftType = checkExpression(varExpr);
                    checkReferenceExpression(varExpr, ts.Diagnostics.Invalid_left_hand_side_in_for_of_statement, 
                    /*constantVariableMessage*/ ts.Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_be_a_previously_defined_constant);
                    // iteratedType will be undefined if the rightType was missing properties/signatures
                    // required to get its iteratedType (like [Symbol.iterator] or next). This may be
                    // because we accessed properties from anyType, or it may have led to an error inside
                    // getIteratedType.
                    if (iteratedType) {
                        checkTypeAssignableTo(iteratedType, leftType, varExpr, undefined);
                    }
                }
            }
            checkSourceElement(node.statement);
        }
        function checkForInStatement(node) {
            // Grammar checking
            checkGrammarForInOrForOfStatement(node);
            // TypeScript 1.0 spec  (April 2014): 5.4
            // In a 'for-in' statement of the form
            // for (let VarDecl in Expr) Statement
            //   VarDecl must be a variable declaration without a type annotation that declares a variable of type Any,
            //   and Expr must be an expression of type Any, an object type, or a type parameter type.
            if (node.initializer.kind === 199 /* VariableDeclarationList */) {
                let variable = node.initializer.declarations[0];
                if (variable && ts.isBindingPattern(variable.name)) {
                    error(variable.name, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                }
                checkForInOrForOfVariableDeclaration(node);
            }
            else {
                // In a 'for-in' statement of the form
                // for (Var in Expr) Statement
                //   Var must be an expression classified as a reference of type Any or the String primitive type,
                //   and Expr must be an expression of type Any, an object type, or a type parameter type.
                let varExpr = node.initializer;
                let leftType = checkExpression(varExpr);
                if (varExpr.kind === 153 /* ArrayLiteralExpression */ || varExpr.kind === 154 /* ObjectLiteralExpression */) {
                    error(varExpr, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_destructuring_pattern);
                }
                else if (!allConstituentTypesHaveKind(leftType, 1 /* Any */ | 258 /* StringLike */)) {
                    error(varExpr, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_must_be_of_type_string_or_any);
                }
                else {
                    // run check only former check succeeded to avoid cascading errors
                    checkReferenceExpression(varExpr, ts.Diagnostics.Invalid_left_hand_side_in_for_in_statement, ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_previously_defined_constant);
                }
            }
            let rightType = checkExpression(node.expression);
            // unknownType is returned i.e. if node.expression is identifier whose name cannot be resolved
            // in this case error about missing name is already reported - do not report extra one
            if (!allConstituentTypesHaveKind(rightType, 1 /* Any */ | 48128 /* ObjectType */ | 512 /* TypeParameter */)) {
                error(node.expression, ts.Diagnostics.The_right_hand_side_of_a_for_in_statement_must_be_of_type_any_an_object_type_or_a_type_parameter);
            }
            checkSourceElement(node.statement);
        }
        function checkForInOrForOfVariableDeclaration(iterationStatement) {
            let variableDeclarationList = iterationStatement.initializer;
            // checkGrammarForInOrForOfStatement will check that there is exactly one declaration.
            if (variableDeclarationList.declarations.length >= 1) {
                let decl = variableDeclarationList.declarations[0];
                checkVariableDeclaration(decl);
            }
        }
        function checkRightHandSideOfForOf(rhsExpression) {
            let expressionType = getTypeOfExpression(rhsExpression);
            return checkIteratedTypeOrElementType(expressionType, rhsExpression, true);
        }
        function checkIteratedTypeOrElementType(inputType, errorNode, allowStringInput) {
            if (languageVersion >= 2 /* ES6 */) {
                return checkIteratedType(inputType, errorNode) || anyType;
            }
            if (allowStringInput) {
                return checkElementTypeOfArrayOrString(inputType, errorNode);
            }
            if (isArrayLikeType(inputType)) {
                return getIndexTypeOfType(inputType, 1 /* Number */);
            }
            error(errorNode, ts.Diagnostics.Type_0_is_not_an_array_type, typeToString(inputType));
            return unknownType;
        }
        /**
         * When errorNode is undefined, it means we should not report any errors.
         */
        function checkIteratedType(iterable, errorNode) {
            ts.Debug.assert(languageVersion >= 2 /* ES6 */);
            let iteratedType = getIteratedType(iterable, errorNode);
            // Now even though we have extracted the iteratedType, we will have to validate that the type
            // passed in is actually an Iterable.
            if (errorNode && iteratedType) {
                checkTypeAssignableTo(iterable, createIterableType(iteratedType), errorNode);
            }
            return iteratedType;
            function getIteratedType(iterable, errorNode) {
                // We want to treat type as an iterable, and get the type it is an iterable of. The iterable
                // must have the following structure (annotated with the names of the variables below):
                //
                // { // iterable
                //     [Symbol.iterator]: { // iteratorFunction
                //         (): { // iterator
                //             next: { // iteratorNextFunction
                //                 (): { // iteratorNextResult
                //                     value: T // iteratorNextValue
                //                 }
                //             }
                //         }
                //     }
                // }
                //
                // T is the type we are after. At every level that involves analyzing return types
                // of signatures, we union the return types of all the signatures.
                //
                // Another thing to note is that at any step of this process, we could run into a dead end,
                // meaning either the property is missing, or we run into the anyType. If either of these things
                // happens, we return undefined to signal that we could not find the iterated type. If a property
                // is missing, and the previous step did not result in 'any', then we also give an error if the
                // caller requested it. Then the caller can decide what to do in the case where there is no iterated
                // type. This is different from returning anyType, because that would signify that we have matched the
                // whole pattern and that T (above) is 'any'.
                if (allConstituentTypesHaveKind(iterable, 1 /* Any */)) {
                    return undefined;
                }
                // As an optimization, if the type is instantiated directly using the globalIterableType (Iterable<number>),
                // then just grab its type argument.
                if ((iterable.flags & 4096 /* Reference */) && iterable.target === globalIterableType) {
                    return iterable.typeArguments[0];
                }
                let iteratorFunction = getTypeOfPropertyOfType(iterable, ts.getPropertyNameForKnownSymbolName("iterator"));
                if (iteratorFunction && allConstituentTypesHaveKind(iteratorFunction, 1 /* Any */)) {
                    return undefined;
                }
                let iteratorFunctionSignatures = iteratorFunction ? getSignaturesOfType(iteratorFunction, 0 /* Call */) : emptyArray;
                if (iteratorFunctionSignatures.length === 0) {
                    if (errorNode) {
                        error(errorNode, ts.Diagnostics.Type_must_have_a_Symbol_iterator_method_that_returns_an_iterator);
                    }
                    return undefined;
                }
                let iterator = getUnionType(ts.map(iteratorFunctionSignatures, getReturnTypeOfSignature));
                if (allConstituentTypesHaveKind(iterator, 1 /* Any */)) {
                    return undefined;
                }
                let iteratorNextFunction = getTypeOfPropertyOfType(iterator, "next");
                if (iteratorNextFunction && allConstituentTypesHaveKind(iteratorNextFunction, 1 /* Any */)) {
                    return undefined;
                }
                let iteratorNextFunctionSignatures = iteratorNextFunction ? getSignaturesOfType(iteratorNextFunction, 0 /* Call */) : emptyArray;
                if (iteratorNextFunctionSignatures.length === 0) {
                    if (errorNode) {
                        error(errorNode, ts.Diagnostics.An_iterator_must_have_a_next_method);
                    }
                    return undefined;
                }
                let iteratorNextResult = getUnionType(ts.map(iteratorNextFunctionSignatures, getReturnTypeOfSignature));
                if (allConstituentTypesHaveKind(iteratorNextResult, 1 /* Any */)) {
                    return undefined;
                }
                let iteratorNextValue = getTypeOfPropertyOfType(iteratorNextResult, "value");
                if (!iteratorNextValue) {
                    if (errorNode) {
                        error(errorNode, ts.Diagnostics.The_type_returned_by_the_next_method_of_an_iterator_must_have_a_value_property);
                    }
                    return undefined;
                }
                return iteratorNextValue;
            }
        }
        /**
         * This function does the following steps:
         *   1. Break up arrayOrStringType (possibly a union) into its string constituents and array constituents.
         *   2. Take the element types of the array constituents.
         *   3. Return the union of the element types, and string if there was a string constitutent.
         *
         * For example:
         *     string -> string
         *     number[] -> number
         *     string[] | number[] -> string | number
         *     string | number[] -> string | number
         *     string | string[] | number[] -> string | number
         *
         * It also errors if:
         *   1. Some constituent is neither a string nor an array.
         *   2. Some constituent is a string and target is less than ES5 (because in ES3 string is not indexable).
         */
        function checkElementTypeOfArrayOrString(arrayOrStringType, errorNode) {
            ts.Debug.assert(languageVersion < 2 /* ES6 */);
            // After we remove all types that are StringLike, we will know if there was a string constituent
            // based on whether the remaining type is the same as the initial type.
            let arrayType = removeTypesFromUnionType(arrayOrStringType, 258 /* StringLike */, true, true);
            let hasStringConstituent = arrayOrStringType !== arrayType;
            let reportedError = false;
            if (hasStringConstituent) {
                if (languageVersion < 1 /* ES5 */) {
                    error(errorNode, ts.Diagnostics.Using_a_string_in_a_for_of_statement_is_only_supported_in_ECMAScript_5_and_higher);
                    reportedError = true;
                }
                // Now that we've removed all the StringLike types, if no constituents remain, then the entire
                // arrayOrStringType was a string.
                if (arrayType === emptyObjectType) {
                    return stringType;
                }
            }
            if (!isArrayLikeType(arrayType)) {
                if (!reportedError) {
                    // Which error we report depends on whether there was a string constituent. For example,
                    // if the input type is number | string, we want to say that number is not an array type.
                    // But if the input was just number, we want to say that number is not an array type
                    // or a string type.
                    let diagnostic = hasStringConstituent
                        ? ts.Diagnostics.Type_0_is_not_an_array_type
                        : ts.Diagnostics.Type_0_is_not_an_array_type_or_a_string_type;
                    error(errorNode, diagnostic, typeToString(arrayType));
                }
                return hasStringConstituent ? stringType : unknownType;
            }
            let arrayElementType = getIndexTypeOfType(arrayType, 1 /* Number */) || unknownType;
            if (hasStringConstituent) {
                // This is just an optimization for the case where arrayOrStringType is string | string[]
                if (arrayElementType.flags & 258 /* StringLike */) {
                    return stringType;
                }
                return getUnionType([arrayElementType, stringType]);
            }
            return arrayElementType;
        }
        function checkBreakOrContinueStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node) || checkGrammarBreakOrContinueStatement(node);
            // TODO: Check that target label is valid
        }
        function isGetAccessorWithAnnotatatedSetAccessor(node) {
            return !!(node.kind === 136 /* GetAccessor */ && getSetAccessorTypeAnnotationNode(ts.getDeclarationOfKind(node.symbol, 137 /* SetAccessor */)));
        }
        function checkReturnStatement(node) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                let functionBlock = ts.getContainingFunction(node);
                if (!functionBlock) {
                    grammarErrorOnFirstToken(node, ts.Diagnostics.A_return_statement_can_only_be_used_within_a_function_body);
                }
            }
            if (node.expression) {
                let func = ts.getContainingFunction(node);
                if (func) {
                    let returnType = getReturnTypeOfSignature(getSignatureFromDeclaration(func));
                    let exprType = checkExpressionCached(node.expression);
                    if (func.kind === 137 /* SetAccessor */) {
                        error(node.expression, ts.Diagnostics.Setters_cannot_return_a_value);
                    }
                    else {
                        if (func.kind === 135 /* Constructor */) {
                            if (!isTypeAssignableTo(exprType, returnType)) {
                                error(node.expression, ts.Diagnostics.Return_type_of_constructor_signature_must_be_assignable_to_the_instance_type_of_the_class);
                            }
                        }
                        else if (func.type || isGetAccessorWithAnnotatatedSetAccessor(func)) {
                            checkTypeAssignableTo(exprType, returnType, node.expression, undefined);
                        }
                    }
                }
            }
        }
        function checkWithStatement(node) {
            // Grammar checking for withStatement
            if (!checkGrammarStatementInAmbientContext(node)) {
                if (node.parserContextFlags & 1 /* StrictMode */) {
                    grammarErrorOnFirstToken(node, ts.Diagnostics.with_statements_are_not_allowed_in_strict_mode);
                }
            }
            checkExpression(node.expression);
            error(node.expression, ts.Diagnostics.All_symbols_within_a_with_block_will_be_resolved_to_any);
        }
        function checkSwitchStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            let firstDefaultClause;
            let hasDuplicateDefaultClause = false;
            let expressionType = checkExpression(node.expression);
            ts.forEach(node.caseBlock.clauses, clause => {
                // Grammar check for duplicate default clauses, skip if we already report duplicate default clause
                if (clause.kind === 221 /* DefaultClause */ && !hasDuplicateDefaultClause) {
                    if (firstDefaultClause === undefined) {
                        firstDefaultClause = clause;
                    }
                    else {
                        let sourceFile = ts.getSourceFileOfNode(node);
                        let start = ts.skipTrivia(sourceFile.text, clause.pos);
                        let end = clause.statements.length > 0 ? clause.statements[0].pos : clause.end;
                        grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
                        hasDuplicateDefaultClause = true;
                    }
                }
                if (produceDiagnostics && clause.kind === 220 /* CaseClause */) {
                    let caseClause = clause;
                    // TypeScript 1.0 spec (April 2014):5.9
                    // In a 'switch' statement, each 'case' expression must be of a type that is assignable to or from the type of the 'switch' expression.
                    let caseType = checkExpression(caseClause.expression);
                    if (!isTypeAssignableTo(expressionType, caseType)) {
                        // check 'expressionType isAssignableTo caseType' failed, try the reversed check and report errors if it fails
                        checkTypeAssignableTo(caseType, expressionType, caseClause.expression, undefined);
                    }
                }
                ts.forEach(clause.statements, checkSourceElement);
            });
        }
        function checkLabeledStatement(node) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                let current = node.parent;
                while (current) {
                    if (ts.isFunctionLike(current)) {
                        break;
                    }
                    if (current.kind === 194 /* LabeledStatement */ && current.label.text === node.label.text) {
                        let sourceFile = ts.getSourceFileOfNode(node);
                        grammarErrorOnNode(node.label, ts.Diagnostics.Duplicate_label_0, ts.getTextOfNodeFromSourceText(sourceFile.text, node.label));
                        break;
                    }
                    current = current.parent;
                }
            }
            // ensure that label is unique
            checkSourceElement(node.statement);
        }
        function checkThrowStatement(node) {
            // Grammar checking
            if (!checkGrammarStatementInAmbientContext(node)) {
                if (node.expression === undefined) {
                    grammarErrorAfterFirstToken(node, ts.Diagnostics.Line_break_not_permitted_here);
                }
            }
            if (node.expression) {
                checkExpression(node.expression);
            }
        }
        function checkTryStatement(node) {
            // Grammar checking
            checkGrammarStatementInAmbientContext(node);
            checkBlock(node.tryBlock);
            let catchClause = node.catchClause;
            if (catchClause) {
                // Grammar checking
                if (catchClause.variableDeclaration) {
                    if (catchClause.variableDeclaration.name.kind !== 65 /* Identifier */) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.name, ts.Diagnostics.Catch_clause_variable_name_must_be_an_identifier);
                    }
                    else if (catchClause.variableDeclaration.type) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.type, ts.Diagnostics.Catch_clause_variable_cannot_have_a_type_annotation);
                    }
                    else if (catchClause.variableDeclaration.initializer) {
                        grammarErrorOnFirstToken(catchClause.variableDeclaration.initializer, ts.Diagnostics.Catch_clause_variable_cannot_have_an_initializer);
                    }
                    else {
                        let identifierName = catchClause.variableDeclaration.name.text;
                        let locals = catchClause.block.locals;
                        if (locals && ts.hasProperty(locals, identifierName)) {
                            let localSymbol = locals[identifierName];
                            if (localSymbol && (localSymbol.flags & 2 /* BlockScopedVariable */) !== 0) {
                                grammarErrorOnNode(localSymbol.valueDeclaration, ts.Diagnostics.Cannot_redeclare_identifier_0_in_catch_clause, identifierName);
                            }
                        }
                        // It is a SyntaxError if a TryStatement with a Catch occurs within strict code and the Identifier of the
                        // Catch production is eval or arguments
                        checkGrammarEvalOrArgumentsInStrictMode(node, catchClause.variableDeclaration.name);
                    }
                }
                checkBlock(catchClause.block);
            }
            if (node.finallyBlock) {
                checkBlock(node.finallyBlock);
            }
        }
        function checkIndexConstraints(type) {
            let declaredNumberIndexer = getIndexDeclarationOfSymbol(type.symbol, 1 /* Number */);
            let declaredStringIndexer = getIndexDeclarationOfSymbol(type.symbol, 0 /* String */);
            let stringIndexType = getIndexTypeOfType(type, 0 /* String */);
            let numberIndexType = getIndexTypeOfType(type, 1 /* Number */);
            if (stringIndexType || numberIndexType) {
                ts.forEach(getPropertiesOfObjectType(type), prop => {
                    let propType = getTypeOfSymbol(prop);
                    checkIndexConstraintForProperty(prop, propType, type, declaredStringIndexer, stringIndexType, 0 /* String */);
                    checkIndexConstraintForProperty(prop, propType, type, declaredNumberIndexer, numberIndexType, 1 /* Number */);
                });
                if (type.flags & 1024 /* Class */ && type.symbol.valueDeclaration.kind === 201 /* ClassDeclaration */) {
                    let classDeclaration = type.symbol.valueDeclaration;
                    for (let member of classDeclaration.members) {
                        // Only process instance properties with computed names here.
                        // Static properties cannot be in conflict with indexers,
                        // and properties with literal names were already checked.
                        if (!(member.flags & 128 /* Static */) && ts.hasDynamicName(member)) {
                            let propType = getTypeOfSymbol(member.symbol);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredStringIndexer, stringIndexType, 0 /* String */);
                            checkIndexConstraintForProperty(member.symbol, propType, type, declaredNumberIndexer, numberIndexType, 1 /* Number */);
                        }
                    }
                }
            }
            let errorNode;
            if (stringIndexType && numberIndexType) {
                errorNode = declaredNumberIndexer || declaredStringIndexer;
                // condition 'errorNode === undefined' may appear if types does not declare nor string neither number indexer
                if (!errorNode && (type.flags & 2048 /* Interface */)) {
                    let someBaseTypeHasBothIndexers = ts.forEach(type.baseTypes, base => getIndexTypeOfType(base, 0 /* String */) && getIndexTypeOfType(base, 1 /* Number */));
                    errorNode = someBaseTypeHasBothIndexers ? undefined : type.symbol.declarations[0];
                }
            }
            if (errorNode && !isTypeAssignableTo(numberIndexType, stringIndexType)) {
                error(errorNode, ts.Diagnostics.Numeric_index_type_0_is_not_assignable_to_string_index_type_1, typeToString(numberIndexType), typeToString(stringIndexType));
            }
            function checkIndexConstraintForProperty(prop, propertyType, containingType, indexDeclaration, indexType, indexKind) {
                if (!indexType) {
                    return;
                }
                // index is numeric and property name is not valid numeric literal
                if (indexKind === 1 /* Number */ && !isNumericName(prop.valueDeclaration.name)) {
                    return;
                }
                // perform property check if property or indexer is declared in 'type'
                // this allows to rule out cases when both property and indexer are inherited from the base class
                let errorNode;
                if (prop.valueDeclaration.name.kind === 127 /* ComputedPropertyName */ || prop.parent === containingType.symbol) {
                    errorNode = prop.valueDeclaration;
                }
                else if (indexDeclaration) {
                    errorNode = indexDeclaration;
                }
                else if (containingType.flags & 2048 /* Interface */) {
                    // for interfaces property and indexer might be inherited from different bases
                    // check if any base class already has both property and indexer.
                    // check should be performed only if 'type' is the first type that brings property\indexer together
                    let someBaseClassHasBothPropertyAndIndexer = ts.forEach(containingType.baseTypes, base => getPropertyOfObjectType(base, prop.name) && getIndexTypeOfType(base, indexKind));
                    errorNode = someBaseClassHasBothPropertyAndIndexer ? undefined : containingType.symbol.declarations[0];
                }
                if (errorNode && !isTypeAssignableTo(propertyType, indexType)) {
                    let errorMessage = indexKind === 0 /* String */
                        ? ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_string_index_type_2
                        : ts.Diagnostics.Property_0_of_type_1_is_not_assignable_to_numeric_index_type_2;
                    error(errorNode, errorMessage, symbolToString(prop), typeToString(propertyType), typeToString(indexType));
                }
            }
        }
        function checkTypeNameIsReserved(name, message) {
            // TS 1.0 spec (April 2014): 3.6.1
            // The predefined type keywords are reserved and cannot be used as names of user defined types.
            switch (name.text) {
                case "any":
                case "number":
                case "boolean":
                case "string":
                case "symbol":
                case "void":
                    error(name, message, name.text);
            }
        }
        // Check each type parameter and check that list has no duplicate type parameter declarations
        function checkTypeParameters(typeParameterDeclarations) {
            if (typeParameterDeclarations) {
                for (let i = 0, n = typeParameterDeclarations.length; i < n; i++) {
                    let node = typeParameterDeclarations[i];
                    checkTypeParameter(node);
                    if (produceDiagnostics) {
                        for (let j = 0; j < i; j++) {
                            if (typeParameterDeclarations[j].symbol === node.symbol) {
                                error(node.name, ts.Diagnostics.Duplicate_identifier_0, ts.declarationNameToString(node.name));
                            }
                        }
                    }
                }
            }
        }
        function checkClassExpression(node) {
            grammarErrorOnNode(node, ts.Diagnostics.class_expressions_are_not_currently_supported);
            ts.forEach(node.members, checkSourceElement);
            return unknownType;
        }
        function checkClassDeclaration(node) {
            checkGrammarDeclarationNameInStrictMode(node);
            // Grammar checking
            if (node.parent.kind !== 206 /* ModuleBlock */ && node.parent.kind !== 227 /* SourceFile */) {
                grammarErrorOnNode(node, ts.Diagnostics.class_declarations_are_only_supported_directly_inside_a_module_or_as_a_top_level_declaration);
            }
            if (!node.name && !(node.flags & 256 /* Default */)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name);
            }
            checkGrammarClassDeclarationHeritageClauses(node);
            checkDecorators(node);
            if (node.name) {
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Class_name_cannot_be_0);
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            }
            checkTypeParameters(node.typeParameters);
            checkExportsOnMergedDeclarations(node);
            let symbol = getSymbolOfNode(node);
            let type = getDeclaredTypeOfSymbol(symbol);
            let staticType = getTypeOfSymbol(symbol);
            let baseTypeNode = ts.getClassExtendsHeritageClauseElement(node);
            if (baseTypeNode) {
                if (!ts.isSupportedHeritageClauseElement(baseTypeNode)) {
                    error(baseTypeNode.expression, ts.Diagnostics.Only_identifiers_Slashqualified_names_with_optional_type_arguments_are_currently_supported_in_a_class_extends_clauses);
                }
                emitExtends = emitExtends || !ts.isInAmbientContext(node);
                checkHeritageClauseElement(baseTypeNode);
            }
            if (type.baseTypes.length) {
                if (produceDiagnostics) {
                    let baseType = type.baseTypes[0];
                    checkTypeAssignableTo(type, baseType, node.name || node, ts.Diagnostics.Class_0_incorrectly_extends_base_class_1);
                    let staticBaseType = getTypeOfSymbol(baseType.symbol);
                    checkTypeAssignableTo(staticType, getTypeWithoutConstructors(staticBaseType), node.name || node, ts.Diagnostics.Class_static_side_0_incorrectly_extends_base_class_static_side_1);
                    if (baseType.symbol !== resolveEntityName(baseTypeNode.expression, 107455 /* Value */)) {
                        error(baseTypeNode, ts.Diagnostics.Type_name_0_in_extends_clause_does_not_reference_constructor_function_for_0, typeToString(baseType));
                    }
                    checkKindsOfPropertyMemberOverrides(type, baseType);
                }
            }
            if (type.baseTypes.length || (baseTypeNode && compilerOptions.separateCompilation)) {
                // Check that base type can be evaluated as expression
                checkExpressionOrQualifiedName(baseTypeNode.expression);
            }
            let implementedTypeNodes = ts.getClassImplementsHeritageClauseElements(node);
            if (implementedTypeNodes) {
                ts.forEach(implementedTypeNodes, typeRefNode => {
                    if (!ts.isSupportedHeritageClauseElement(typeRefNode)) {
                        error(typeRefNode.expression, ts.Diagnostics.A_class_can_only_implement_an_identifier_Slashqualified_name_with_optional_type_arguments);
                    }
                    checkHeritageClauseElement(typeRefNode);
                    if (produceDiagnostics) {
                        let t = getTypeFromHeritageClauseElement(typeRefNode);
                        if (t !== unknownType) {
                            let declaredType = (t.flags & 4096 /* Reference */) ? t.target : t;
                            if (declaredType.flags & (1024 /* Class */ | 2048 /* Interface */)) {
                                checkTypeAssignableTo(type, t, node.name || node, ts.Diagnostics.Class_0_incorrectly_implements_interface_1);
                            }
                            else {
                                error(typeRefNode, ts.Diagnostics.A_class_may_only_implement_another_class_or_interface);
                            }
                        }
                    }
                });
            }
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                checkIndexConstraints(type);
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function getTargetSymbol(s) {
            // if symbol is instantiated its flags are not copied from the 'target'
            // so we'll need to get back original 'target' symbol to work with correct set of flags
            return s.flags & 16777216 /* Instantiated */ ? getSymbolLinks(s).target : s;
        }
        function checkKindsOfPropertyMemberOverrides(type, baseType) {
            // TypeScript 1.0 spec (April 2014): 8.2.3
            // A derived class inherits all members from its base class it doesn't override.
            // Inheritance means that a derived class implicitly contains all non - overridden members of the base class.
            // Both public and private property members are inherited, but only public property members can be overridden.
            // A property member in a derived class is said to override a property member in a base class
            // when the derived class property member has the same name and kind(instance or static)
            // as the base class property member.
            // The type of an overriding property member must be assignable(section 3.8.4)
            // to the type of the overridden property member, or otherwise a compile - time error occurs.
            // Base class instance member functions can be overridden by derived class instance member functions,
            // but not by other kinds of members.
            // Base class instance member variables and accessors can be overridden by
            // derived class instance member variables and accessors, but not by other kinds of members.
            // NOTE: assignability is checked in checkClassDeclaration
            let baseProperties = getPropertiesOfObjectType(baseType);
            for (let baseProperty of baseProperties) {
                let base = getTargetSymbol(baseProperty);
                if (base.flags & 134217728 /* Prototype */) {
                    continue;
                }
                let derived = getTargetSymbol(getPropertyOfObjectType(type, base.name));
                if (derived) {
                    let baseDeclarationFlags = getDeclarationFlagsFromSymbol(base);
                    let derivedDeclarationFlags = getDeclarationFlagsFromSymbol(derived);
                    if ((baseDeclarationFlags & 32 /* Private */) || (derivedDeclarationFlags & 32 /* Private */)) {
                        // either base or derived property is private - not override, skip it
                        continue;
                    }
                    if ((baseDeclarationFlags & 128 /* Static */) !== (derivedDeclarationFlags & 128 /* Static */)) {
                        // value of 'static' is not the same for properties - not override, skip it
                        continue;
                    }
                    if ((base.flags & derived.flags & 8192 /* Method */) || ((base.flags & 98308 /* PropertyOrAccessor */) && (derived.flags & 98308 /* PropertyOrAccessor */))) {
                        // method is overridden with method or property/accessor is overridden with property/accessor - correct case
                        continue;
                    }
                    let errorMessage;
                    if (base.flags & 8192 /* Method */) {
                        if (derived.flags & 98304 /* Accessor */) {
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_accessor;
                        }
                        else {
                            ts.Debug.assert((derived.flags & 4 /* Property */) !== 0);
                            errorMessage = ts.Diagnostics.Class_0_defines_instance_member_function_1_but_extended_class_2_defines_it_as_instance_member_property;
                        }
                    }
                    else if (base.flags & 4 /* Property */) {
                        ts.Debug.assert((derived.flags & 8192 /* Method */) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_property_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    else {
                        ts.Debug.assert((base.flags & 98304 /* Accessor */) !== 0);
                        ts.Debug.assert((derived.flags & 8192 /* Method */) !== 0);
                        errorMessage = ts.Diagnostics.Class_0_defines_instance_member_accessor_1_but_extended_class_2_defines_it_as_instance_member_function;
                    }
                    error(derived.valueDeclaration.name, errorMessage, typeToString(baseType), symbolToString(base), typeToString(type));
                }
            }
        }
        function isAccessor(kind) {
            return kind === 136 /* GetAccessor */ || kind === 137 /* SetAccessor */;
        }
        function areTypeParametersIdentical(list1, list2) {
            if (!list1 && !list2) {
                return true;
            }
            if (!list1 || !list2 || list1.length !== list2.length) {
                return false;
            }
            // TypeScript 1.0 spec (April 2014):
            // When a generic interface has multiple declarations,  all declarations must have identical type parameter
            // lists, i.e. identical type parameter names with identical constraints in identical order.
            for (let i = 0, len = list1.length; i < len; i++) {
                let tp1 = list1[i];
                let tp2 = list2[i];
                if (tp1.name.text !== tp2.name.text) {
                    return false;
                }
                if (!tp1.constraint && !tp2.constraint) {
                    continue;
                }
                if (!tp1.constraint || !tp2.constraint) {
                    return false;
                }
                if (!isTypeIdenticalTo(getTypeFromTypeNodeOrHeritageClauseElement(tp1.constraint), getTypeFromTypeNodeOrHeritageClauseElement(tp2.constraint))) {
                    return false;
                }
            }
            return true;
        }
        function checkInheritedPropertiesAreIdentical(type, typeNode) {
            if (!type.baseTypes.length || type.baseTypes.length === 1) {
                return true;
            }
            let seen = {};
            ts.forEach(type.declaredProperties, p => { seen[p.name] = { prop: p, containingType: type }; });
            let ok = true;
            for (let base of type.baseTypes) {
                let properties = getPropertiesOfObjectType(base);
                for (let prop of properties) {
                    if (!ts.hasProperty(seen, prop.name)) {
                        seen[prop.name] = { prop: prop, containingType: base };
                    }
                    else {
                        let existing = seen[prop.name];
                        let isInheritedProperty = existing.containingType !== type;
                        if (isInheritedProperty && !isPropertyIdenticalTo(existing.prop, prop)) {
                            ok = false;
                            let typeName1 = typeToString(existing.containingType);
                            let typeName2 = typeToString(base);
                            let errorInfo = ts.chainDiagnosticMessages(undefined, ts.Diagnostics.Named_property_0_of_types_1_and_2_are_not_identical, symbolToString(prop), typeName1, typeName2);
                            errorInfo = ts.chainDiagnosticMessages(errorInfo, ts.Diagnostics.Interface_0_cannot_simultaneously_extend_types_1_and_2, typeToString(type), typeName1, typeName2);
                            diagnostics.add(ts.createDiagnosticForNodeFromMessageChain(typeNode, errorInfo));
                        }
                    }
                }
            }
            return ok;
        }
        function checkInterfaceDeclaration(node) {
            // Grammar checking
            checkGrammarDeclarationNameInStrictMode(node) || checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarInterfaceDeclaration(node);
            checkTypeParameters(node.typeParameters);
            if (produceDiagnostics) {
                checkTypeNameIsReserved(node.name, ts.Diagnostics.Interface_name_cannot_be_0);
                checkExportsOnMergedDeclarations(node);
                let symbol = getSymbolOfNode(node);
                let firstInterfaceDecl = ts.getDeclarationOfKind(symbol, 202 /* InterfaceDeclaration */);
                if (symbol.declarations.length > 1) {
                    if (node !== firstInterfaceDecl && !areTypeParametersIdentical(firstInterfaceDecl.typeParameters, node.typeParameters)) {
                        error(node.name, ts.Diagnostics.All_declarations_of_an_interface_must_have_identical_type_parameters);
                    }
                }
                // Only check this symbol once
                if (node === firstInterfaceDecl) {
                    let type = getDeclaredTypeOfSymbol(symbol);
                    // run subsequent checks only if first set succeeded
                    if (checkInheritedPropertiesAreIdentical(type, node.name)) {
                        ts.forEach(type.baseTypes, baseType => {
                            checkTypeAssignableTo(type, baseType, node.name, ts.Diagnostics.Interface_0_incorrectly_extends_interface_1);
                        });
                        checkIndexConstraints(type);
                    }
                }
            }
            ts.forEach(ts.getInterfaceBaseTypeNodes(node), heritageElement => {
                if (!ts.isSupportedHeritageClauseElement(heritageElement)) {
                    error(heritageElement.expression, ts.Diagnostics.An_interface_can_only_extend_an_identifier_Slashqualified_name_with_optional_type_arguments);
                }
                checkHeritageClauseElement(heritageElement);
            });
            ts.forEach(node.members, checkSourceElement);
            if (produceDiagnostics) {
                checkTypeForDuplicateIndexSignatures(node);
            }
        }
        function checkTypeAliasDeclaration(node) {
            // Grammar checking
            checkGrammarDecorators(node) || checkGrammarModifiers(node);
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Type_alias_name_cannot_be_0);
            checkSourceElement(node.type);
        }
        function computeEnumMemberValues(node) {
            let nodeLinks = getNodeLinks(node);
            if (!(nodeLinks.flags & 128 /* EnumValuesComputed */)) {
                let enumSymbol = getSymbolOfNode(node);
                let enumType = getDeclaredTypeOfSymbol(enumSymbol);
                let autoValue = 0;
                let ambient = ts.isInAmbientContext(node);
                let enumIsConst = ts.isConst(node);
                ts.forEach(node.members, member => {
                    if (member.name.kind !== 127 /* ComputedPropertyName */ && isNumericLiteralName(member.name.text)) {
                        error(member.name, ts.Diagnostics.An_enum_member_cannot_have_a_numeric_name);
                    }
                    let initializer = member.initializer;
                    if (initializer) {
                        autoValue = getConstantValueForEnumMemberInitializer(initializer);
                        if (autoValue === undefined) {
                            if (enumIsConst) {
                                error(initializer, ts.Diagnostics.In_const_enum_declarations_member_initializer_must_be_constant_expression);
                            }
                            else if (!ambient) {
                                // Only here do we need to check that the initializer is assignable to the enum type.
                                // If it is a constant value (not undefined), it is syntactically constrained to be a number.
                                // Also, we do not need to check this for ambients because there is already
                                // a syntax error if it is not a constant.
                                checkTypeAssignableTo(checkExpression(initializer), enumType, initializer, undefined);
                            }
                        }
                        else if (enumIsConst) {
                            if (isNaN(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_disallowed_value_NaN);
                            }
                            else if (!isFinite(autoValue)) {
                                error(initializer, ts.Diagnostics.const_enum_member_initializer_was_evaluated_to_a_non_finite_value);
                            }
                        }
                    }
                    else if (ambient && !enumIsConst) {
                        autoValue = undefined;
                    }
                    if (autoValue !== undefined) {
                        getNodeLinks(member).enumMemberValue = autoValue++;
                    }
                });
                nodeLinks.flags |= 128 /* EnumValuesComputed */;
            }
            function getConstantValueForEnumMemberInitializer(initializer) {
                return evalConstant(initializer);
                function evalConstant(e) {
                    switch (e.kind) {
                        case 167 /* PrefixUnaryExpression */:
                            let value = evalConstant(e.operand);
                            if (value === undefined) {
                                return undefined;
                            }
                            switch (e.operator) {
                                case 33 /* PlusToken */: return value;
                                case 34 /* MinusToken */: return -value;
                                case 47 /* TildeToken */: return ~value;
                            }
                            return undefined;
                        case 169 /* BinaryExpression */:
                            let left = evalConstant(e.left);
                            if (left === undefined) {
                                return undefined;
                            }
                            let right = evalConstant(e.right);
                            if (right === undefined) {
                                return undefined;
                            }
                            switch (e.operatorToken.kind) {
                                case 44 /* BarToken */: return left | right;
                                case 43 /* AmpersandToken */: return left & right;
                                case 41 /* GreaterThanGreaterThanToken */: return left >> right;
                                case 42 /* GreaterThanGreaterThanGreaterThanToken */: return left >>> right;
                                case 40 /* LessThanLessThanToken */: return left << right;
                                case 45 /* CaretToken */: return left ^ right;
                                case 35 /* AsteriskToken */: return left * right;
                                case 36 /* SlashToken */: return left / right;
                                case 33 /* PlusToken */: return left + right;
                                case 34 /* MinusToken */: return left - right;
                                case 37 /* PercentToken */: return left % right;
                            }
                            return undefined;
                        case 7 /* NumericLiteral */:
                            return +e.text;
                        case 161 /* ParenthesizedExpression */:
                            return evalConstant(e.expression);
                        case 65 /* Identifier */:
                        case 156 /* ElementAccessExpression */:
                        case 155 /* PropertyAccessExpression */:
                            let member = initializer.parent;
                            let currentType = getTypeOfSymbol(getSymbolOfNode(member.parent));
                            let enumType;
                            let propertyName;
                            if (e.kind === 65 /* Identifier */) {
                                // unqualified names can refer to member that reside in different declaration of the enum so just doing name resolution won't work.
                                // instead pick current enum type and later try to fetch member from the type
                                enumType = currentType;
                                propertyName = e.text;
                            }
                            else {
                                let expression;
                                if (e.kind === 156 /* ElementAccessExpression */) {
                                    if (e.argumentExpression === undefined ||
                                        e.argumentExpression.kind !== 8 /* StringLiteral */) {
                                        return undefined;
                                    }
                                    expression = e.expression;
                                    propertyName = e.argumentExpression.text;
                                }
                                else {
                                    expression = e.expression;
                                    propertyName = e.name.text;
                                }
                                // expression part in ElementAccess\PropertyAccess should be either identifier or dottedName
                                var current = expression;
                                while (current) {
                                    if (current.kind === 65 /* Identifier */) {
                                        break;
                                    }
                                    else if (current.kind === 155 /* PropertyAccessExpression */) {
                                        current = current.expression;
                                    }
                                    else {
                                        return undefined;
                                    }
                                }
                                enumType = checkExpression(expression);
                                // allow references to constant members of other enums
                                if (!(enumType.symbol && (enumType.symbol.flags & 384 /* Enum */))) {
                                    return undefined;
                                }
                            }
                            if (propertyName === undefined) {
                                return undefined;
                            }
                            let property = getPropertyOfObjectType(enumType, propertyName);
                            if (!property || !(property.flags & 8 /* EnumMember */)) {
                                return undefined;
                            }
                            let propertyDecl = property.valueDeclaration;
                            // self references are illegal
                            if (member === propertyDecl) {
                                return undefined;
                            }
                            // illegal case: forward reference
                            if (!isDefinedBefore(propertyDecl, member)) {
                                return undefined;
                            }
                            return getNodeLinks(propertyDecl).enumMemberValue;
                    }
                }
            }
        }
        function checkEnumDeclaration(node) {
            if (!produceDiagnostics) {
                return;
            }
            // Grammar checking
            checkGrammarDeclarationNameInStrictMode(node) || checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarEnumDeclaration(node);
            checkTypeNameIsReserved(node.name, ts.Diagnostics.Enum_name_cannot_be_0);
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkExportsOnMergedDeclarations(node);
            computeEnumMemberValues(node);
            let enumIsConst = ts.isConst(node);
            if (compilerOptions.separateCompilation && enumIsConst && ts.isInAmbientContext(node)) {
                error(node.name, ts.Diagnostics.Ambient_const_enums_are_not_allowed_when_the_separateCompilation_flag_is_provided);
            }
            // Spec 2014 - Section 9.3:
            // It isn't possible for one enum declaration to continue the automatic numbering sequence of another,
            // and when an enum type has multiple declarations, only one declaration is permitted to omit a value
            // for the first member.
            //
            // Only perform this check once per symbol
            let enumSymbol = getSymbolOfNode(node);
            let firstDeclaration = ts.getDeclarationOfKind(enumSymbol, node.kind);
            if (node === firstDeclaration) {
                if (enumSymbol.declarations.length > 1) {
                    // check that const is placed\omitted on all enum declarations
                    ts.forEach(enumSymbol.declarations, decl => {
                        if (ts.isConstEnumDeclaration(decl) !== enumIsConst) {
                            error(decl.name, ts.Diagnostics.Enum_declarations_must_all_be_const_or_non_const);
                        }
                    });
                }
                let seenEnumMissingInitialInitializer = false;
                ts.forEach(enumSymbol.declarations, declaration => {
                    // return true if we hit a violation of the rule, false otherwise
                    if (declaration.kind !== 204 /* EnumDeclaration */) {
                        return false;
                    }
                    let enumDeclaration = declaration;
                    if (!enumDeclaration.members.length) {
                        return false;
                    }
                    let firstEnumMember = enumDeclaration.members[0];
                    if (!firstEnumMember.initializer) {
                        if (seenEnumMissingInitialInitializer) {
                            error(firstEnumMember.name, ts.Diagnostics.In_an_enum_with_multiple_declarations_only_one_declaration_can_omit_an_initializer_for_its_first_enum_element);
                        }
                        else {
                            seenEnumMissingInitialInitializer = true;
                        }
                    }
                });
            }
        }
        function getFirstNonAmbientClassOrFunctionDeclaration(symbol) {
            let declarations = symbol.declarations;
            for (let declaration of declarations) {
                if ((declaration.kind === 201 /* ClassDeclaration */ || (declaration.kind === 200 /* FunctionDeclaration */ && ts.nodeIsPresent(declaration.body))) && !ts.isInAmbientContext(declaration)) {
                    return declaration;
                }
            }
            return undefined;
        }
        function checkModuleDeclaration(node) {
            if (produceDiagnostics) {
                // Grammar checking
                if (!checkGrammarDeclarationNameInStrictMode(node) && !checkGrammarDecorators(node) && !checkGrammarModifiers(node)) {
                    if (!ts.isInAmbientContext(node) && node.name.kind === 8 /* StringLiteral */) {
                        grammarErrorOnNode(node.name, ts.Diagnostics.Only_ambient_modules_can_use_quoted_names);
                    }
                }
                checkCollisionWithCapturedThisVariable(node, node.name);
                checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
                checkExportsOnMergedDeclarations(node);
                let symbol = getSymbolOfNode(node);
                // The following checks only apply on a non-ambient instantiated module declaration.
                if (symbol.flags & 512 /* ValueModule */
                    && symbol.declarations.length > 1
                    && !ts.isInAmbientContext(node)
                    && ts.isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.separateCompilation)) {
                    let classOrFunc = getFirstNonAmbientClassOrFunctionDeclaration(symbol);
                    if (classOrFunc) {
                        if (ts.getSourceFileOfNode(node) !== ts.getSourceFileOfNode(classOrFunc)) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_in_a_different_file_from_a_class_or_function_with_which_it_is_merged);
                        }
                        else if (node.pos < classOrFunc.pos) {
                            error(node.name, ts.Diagnostics.A_module_declaration_cannot_be_located_prior_to_a_class_or_function_with_which_it_is_merged);
                        }
                    }
                }
                // Checks for ambient external modules.
                if (node.name.kind === 8 /* StringLiteral */) {
                    if (!isGlobalSourceFile(node.parent)) {
                        error(node.name, ts.Diagnostics.Ambient_external_modules_cannot_be_nested_in_other_modules);
                    }
                    if (isExternalModuleNameRelative(node.name.text)) {
                        error(node.name, ts.Diagnostics.Ambient_external_module_declaration_cannot_specify_relative_module_name);
                    }
                }
            }
            checkSourceElement(node.body);
        }
        function getFirstIdentifier(node) {
            while (true) {
                if (node.kind === 126 /* QualifiedName */) {
                    node = node.left;
                }
                else if (node.kind === 155 /* PropertyAccessExpression */) {
                    node = node.expression;
                }
                else {
                    break;
                }
            }
            ts.Debug.assert(node.kind === 65 /* Identifier */);
            return node;
        }
        function checkExternalImportOrExportDeclaration(node) {
            let moduleName = ts.getExternalModuleName(node);
            if (!ts.nodeIsMissing(moduleName) && moduleName.kind !== 8 /* StringLiteral */) {
                error(moduleName, ts.Diagnostics.String_literal_expected);
                return false;
            }
            let inAmbientExternalModule = node.parent.kind === 206 /* ModuleBlock */ && node.parent.parent.name.kind === 8 /* StringLiteral */;
            if (node.parent.kind !== 227 /* SourceFile */ && !inAmbientExternalModule) {
                error(moduleName, node.kind === 215 /* ExportDeclaration */ ?
                    ts.Diagnostics.Export_declarations_are_not_permitted_in_an_internal_module :
                    ts.Diagnostics.Import_declarations_in_an_internal_module_cannot_reference_an_external_module);
                return false;
            }
            if (inAmbientExternalModule && isExternalModuleNameRelative(moduleName.text)) {
                // TypeScript 1.0 spec (April 2013): 12.1.6
                // An ExternalImportDeclaration in an AmbientExternalModuleDeclaration may reference
                // other external modules only through top - level external module names.
                // Relative external module names are not permitted.
                error(node, ts.Diagnostics.Import_or_export_declaration_in_an_ambient_external_module_declaration_cannot_reference_external_module_through_relative_external_module_name);
                return false;
            }
            return true;
        }
        function checkAliasSymbol(node) {
            let symbol = getSymbolOfNode(node);
            let target = resolveAlias(symbol);
            if (target !== unknownSymbol) {
                let excludedMeanings = (symbol.flags & 107455 /* Value */ ? 107455 /* Value */ : 0) |
                    (symbol.flags & 793056 /* Type */ ? 793056 /* Type */ : 0) |
                    (symbol.flags & 1536 /* Namespace */ ? 1536 /* Namespace */ : 0);
                if (target.flags & excludedMeanings) {
                    let message = node.kind === 217 /* ExportSpecifier */ ?
                        ts.Diagnostics.Export_declaration_conflicts_with_exported_declaration_of_0 :
                        ts.Diagnostics.Import_declaration_conflicts_with_local_declaration_of_0;
                    error(node, message, symbolToString(symbol));
                }
            }
        }
        function checkImportBinding(node) {
            checkCollisionWithCapturedThisVariable(node, node.name);
            checkCollisionWithRequireExportsInGeneratedCode(node, node.name);
            checkAliasSymbol(node);
        }
        function checkImportDeclaration(node) {
            if (!checkGrammarImportDeclarationNameInStrictMode(node) && !checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & 499 /* Modifier */)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.An_import_declaration_cannot_have_modifiers);
            }
            if (checkExternalImportOrExportDeclaration(node)) {
                let importClause = node.importClause;
                if (importClause) {
                    if (importClause.name) {
                        checkImportBinding(importClause);
                    }
                    if (importClause.namedBindings) {
                        if (importClause.namedBindings.kind === 211 /* NamespaceImport */) {
                            checkImportBinding(importClause.namedBindings);
                        }
                        else {
                            ts.forEach(importClause.namedBindings.elements, checkImportBinding);
                        }
                    }
                }
            }
        }
        function checkImportEqualsDeclaration(node) {
            checkGrammarDeclarationNameInStrictMode(node) || checkGrammarDecorators(node) || checkGrammarModifiers(node);
            if (ts.isInternalModuleImportEqualsDeclaration(node) || checkExternalImportOrExportDeclaration(node)) {
                checkImportBinding(node);
                if (node.flags & 1 /* Export */) {
                    markExportAsReferenced(node);
                }
                if (ts.isInternalModuleImportEqualsDeclaration(node)) {
                    let target = resolveAlias(getSymbolOfNode(node));
                    if (target !== unknownSymbol) {
                        if (target.flags & 107455 /* Value */) {
                            // Target is a value symbol, check that it is not hidden by a local declaration with the same name
                            let moduleName = getFirstIdentifier(node.moduleReference);
                            if (!(resolveEntityName(moduleName, 107455 /* Value */ | 1536 /* Namespace */).flags & 1536 /* Namespace */)) {
                                error(moduleName, ts.Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, ts.declarationNameToString(moduleName));
                            }
                        }
                        if (target.flags & 793056 /* Type */) {
                            checkTypeNameIsReserved(node.name, ts.Diagnostics.Import_name_cannot_be_0);
                        }
                    }
                }
                else {
                    if (languageVersion >= 2 /* ES6 */) {
                        // Import equals declaration is deprecated in es6 or above
                        grammarErrorOnNode(node, ts.Diagnostics.Import_assignment_cannot_be_used_when_targeting_ECMAScript_6_or_higher_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_or_import_d_from_mod_instead);
                    }
                }
            }
        }
        function checkExportDeclaration(node) {
            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & 499 /* Modifier */)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.An_export_declaration_cannot_have_modifiers);
            }
            if (!node.moduleSpecifier || checkExternalImportOrExportDeclaration(node)) {
                if (node.exportClause) {
                    // export { x, y }
                    // export { x, y } from "foo"
                    ts.forEach(node.exportClause.elements, checkExportSpecifier);
                    let inAmbientExternalModule = node.parent.kind === 206 /* ModuleBlock */ && node.parent.parent.name.kind === 8 /* StringLiteral */;
                    if (node.parent.kind !== 227 /* SourceFile */ && !inAmbientExternalModule) {
                        error(node, ts.Diagnostics.Export_declarations_are_not_permitted_in_an_internal_module);
                    }
                }
                else {
                    // export * from "foo"
                    let moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
                    if (moduleSymbol && moduleSymbol.exports["export="]) {
                        error(node.moduleSpecifier, ts.Diagnostics.External_module_0_uses_export_and_cannot_be_used_with_export_Asterisk, symbolToString(moduleSymbol));
                    }
                }
            }
        }
        function checkExportSpecifier(node) {
            checkAliasSymbol(node);
            if (!node.parent.parent.moduleSpecifier) {
                markExportAsReferenced(node);
            }
        }
        function checkExportAssignment(node) {
            let container = node.parent.kind === 227 /* SourceFile */ ? node.parent : node.parent.parent;
            if (container.kind === 205 /* ModuleDeclaration */ && container.name.kind === 65 /* Identifier */) {
                error(node, ts.Diagnostics.An_export_assignment_cannot_be_used_in_an_internal_module);
                return;
            }
            // Grammar checking
            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && (node.flags & 499 /* Modifier */)) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.An_export_assignment_cannot_have_modifiers);
            }
            if (node.expression.kind === 65 /* Identifier */) {
                markExportAsReferenced(node);
            }
            else {
                checkExpressionCached(node.expression);
            }
            checkExternalModuleExports(container);
            if (node.isExportEquals && languageVersion >= 2 /* ES6 */) {
                // export assignment is deprecated in es6 or above
                grammarErrorOnNode(node, ts.Diagnostics.Export_assignment_cannot_be_used_when_targeting_ECMAScript_6_or_higher_Consider_using_export_default_instead);
            }
        }
        function getModuleStatements(node) {
            if (node.kind === 227 /* SourceFile */) {
                return node.statements;
            }
            if (node.kind === 205 /* ModuleDeclaration */ && node.body.kind === 206 /* ModuleBlock */) {
                return node.body.statements;
            }
            return emptyArray;
        }
        function hasExportedMembers(moduleSymbol) {
            for (var id in moduleSymbol.exports) {
                if (id !== "export=") {
                    return true;
                }
            }
            return false;
        }
        function checkExternalModuleExports(node) {
            let moduleSymbol = getSymbolOfNode(node);
            let links = getSymbolLinks(moduleSymbol);
            if (!links.exportsChecked) {
                let exportEqualsSymbol = moduleSymbol.exports["export="];
                if (exportEqualsSymbol && hasExportedMembers(moduleSymbol)) {
                    let declaration = getDeclarationOfAliasSymbol(exportEqualsSymbol) || exportEqualsSymbol.valueDeclaration;
                    error(declaration, ts.Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                }
                links.exportsChecked = true;
            }
        }
        function checkSourceElement(node) {
            if (!node)
                return;
            switch (node.kind) {
                case 128 /* TypeParameter */:
                    return checkTypeParameter(node);
                case 129 /* Parameter */:
                    return checkParameter(node);
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                    return checkPropertyDeclaration(node);
                case 142 /* FunctionType */:
                case 143 /* ConstructorType */:
                case 138 /* CallSignature */:
                case 139 /* ConstructSignature */:
                    return checkSignatureDeclaration(node);
                case 140 /* IndexSignature */:
                    return checkSignatureDeclaration(node);
                case 134 /* MethodDeclaration */:
                case 133 /* MethodSignature */:
                    return checkMethodDeclaration(node);
                case 135 /* Constructor */:
                    return checkConstructorDeclaration(node);
                case 136 /* GetAccessor */:
                case 137 /* SetAccessor */:
                    return checkAccessorDeclaration(node);
                case 141 /* TypeReference */:
                    return checkTypeReferenceNode(node);
                case 144 /* TypeQuery */:
                    return checkTypeQuery(node);
                case 145 /* TypeLiteral */:
                    return checkTypeLiteral(node);
                case 146 /* ArrayType */:
                    return checkArrayType(node);
                case 147 /* TupleType */:
                    return checkTupleType(node);
                case 148 /* UnionType */:
                    return checkUnionType(node);
                case 149 /* ParenthesizedType */:
                    return checkSourceElement(node.type);
                case 200 /* FunctionDeclaration */:
                    return checkFunctionDeclaration(node);
                case 179 /* Block */:
                case 206 /* ModuleBlock */:
                    return checkBlock(node);
                case 180 /* VariableStatement */:
                    return checkVariableStatement(node);
                case 182 /* ExpressionStatement */:
                    return checkExpressionStatement(node);
                case 183 /* IfStatement */:
                    return checkIfStatement(node);
                case 184 /* DoStatement */:
                    return checkDoStatement(node);
                case 185 /* WhileStatement */:
                    return checkWhileStatement(node);
                case 186 /* ForStatement */:
                    return checkForStatement(node);
                case 187 /* ForInStatement */:
                    return checkForInStatement(node);
                case 188 /* ForOfStatement */:
                    return checkForOfStatement(node);
                case 189 /* ContinueStatement */:
                case 190 /* BreakStatement */:
                    return checkBreakOrContinueStatement(node);
                case 191 /* ReturnStatement */:
                    return checkReturnStatement(node);
                case 192 /* WithStatement */:
                    return checkWithStatement(node);
                case 193 /* SwitchStatement */:
                    return checkSwitchStatement(node);
                case 194 /* LabeledStatement */:
                    return checkLabeledStatement(node);
                case 195 /* ThrowStatement */:
                    return checkThrowStatement(node);
                case 196 /* TryStatement */:
                    return checkTryStatement(node);
                case 198 /* VariableDeclaration */:
                    return checkVariableDeclaration(node);
                case 152 /* BindingElement */:
                    return checkBindingElement(node);
                case 201 /* ClassDeclaration */:
                    return checkClassDeclaration(node);
                case 202 /* InterfaceDeclaration */:
                    return checkInterfaceDeclaration(node);
                case 203 /* TypeAliasDeclaration */:
                    return checkTypeAliasDeclaration(node);
                case 204 /* EnumDeclaration */:
                    return checkEnumDeclaration(node);
                case 205 /* ModuleDeclaration */:
                    return checkModuleDeclaration(node);
                case 209 /* ImportDeclaration */:
                    return checkImportDeclaration(node);
                case 208 /* ImportEqualsDeclaration */:
                    return checkImportEqualsDeclaration(node);
                case 215 /* ExportDeclaration */:
                    return checkExportDeclaration(node);
                case 214 /* ExportAssignment */:
                    return checkExportAssignment(node);
                case 181 /* EmptyStatement */:
                    checkGrammarStatementInAmbientContext(node);
                    return;
                case 197 /* DebuggerStatement */:
                    checkGrammarStatementInAmbientContext(node);
                    return;
                case 218 /* MissingDeclaration */:
                    return checkMissingDeclaration(node);
            }
        }
        // Function expression bodies are checked after all statements in the enclosing body. This is to ensure
        // constructs like the following are permitted:
        //     let foo = function () {
        //        let s = foo();
        //        return "hello";
        //     }
        // Here, performing a full type check of the body of the function expression whilst in the process of
        // determining the type of foo would cause foo to be given type any because of the recursive reference.
        // Delaying the type check of the body ensures foo has been assigned a type.
        function checkFunctionExpressionBodies(node) {
            switch (node.kind) {
                case 162 /* FunctionExpression */:
                case 163 /* ArrowFunction */:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    checkFunctionExpressionOrObjectLiteralMethodBody(node);
                    break;
                case 134 /* MethodDeclaration */:
                case 133 /* MethodSignature */:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    if (ts.isObjectLiteralMethod(node)) {
                        checkFunctionExpressionOrObjectLiteralMethodBody(node);
                    }
                    break;
                case 135 /* Constructor */:
                case 136 /* GetAccessor */:
                case 137 /* SetAccessor */:
                case 200 /* FunctionDeclaration */:
                    ts.forEach(node.parameters, checkFunctionExpressionBodies);
                    break;
                case 192 /* WithStatement */:
                    checkFunctionExpressionBodies(node.expression);
                    break;
                case 129 /* Parameter */:
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                case 150 /* ObjectBindingPattern */:
                case 151 /* ArrayBindingPattern */:
                case 152 /* BindingElement */:
                case 153 /* ArrayLiteralExpression */:
                case 154 /* ObjectLiteralExpression */:
                case 224 /* PropertyAssignment */:
                case 155 /* PropertyAccessExpression */:
                case 156 /* ElementAccessExpression */:
                case 157 /* CallExpression */:
                case 158 /* NewExpression */:
                case 159 /* TaggedTemplateExpression */:
                case 171 /* TemplateExpression */:
                case 176 /* TemplateSpan */:
                case 160 /* TypeAssertionExpression */:
                case 161 /* ParenthesizedExpression */:
                case 165 /* TypeOfExpression */:
                case 166 /* VoidExpression */:
                case 164 /* DeleteExpression */:
                case 167 /* PrefixUnaryExpression */:
                case 168 /* PostfixUnaryExpression */:
                case 169 /* BinaryExpression */:
                case 170 /* ConditionalExpression */:
                case 173 /* SpreadElementExpression */:
                case 179 /* Block */:
                case 206 /* ModuleBlock */:
                case 180 /* VariableStatement */:
                case 182 /* ExpressionStatement */:
                case 183 /* IfStatement */:
                case 184 /* DoStatement */:
                case 185 /* WhileStatement */:
                case 186 /* ForStatement */:
                case 187 /* ForInStatement */:
                case 188 /* ForOfStatement */:
                case 189 /* ContinueStatement */:
                case 190 /* BreakStatement */:
                case 191 /* ReturnStatement */:
                case 193 /* SwitchStatement */:
                case 207 /* CaseBlock */:
                case 220 /* CaseClause */:
                case 221 /* DefaultClause */:
                case 194 /* LabeledStatement */:
                case 195 /* ThrowStatement */:
                case 196 /* TryStatement */:
                case 223 /* CatchClause */:
                case 198 /* VariableDeclaration */:
                case 199 /* VariableDeclarationList */:
                case 201 /* ClassDeclaration */:
                case 204 /* EnumDeclaration */:
                case 226 /* EnumMember */:
                case 214 /* ExportAssignment */:
                case 227 /* SourceFile */:
                    ts.forEachChild(node, checkFunctionExpressionBodies);
                    break;
            }
        }
        function checkSourceFile(node) {
            let start = new Date().getTime();
            checkSourceFileWorker(node);
            ts.checkTime += new Date().getTime() - start;
        }
        // Fully type check a source file and collect the relevant diagnostics.
        function checkSourceFileWorker(node) {
            let links = getNodeLinks(node);
            if (!(links.flags & 1 /* TypeChecked */)) {
                // Grammar checking
                checkGrammarSourceFile(node);
                emitExtends = false;
                emitDecorate = false;
                emitParam = false;
                potentialThisCollisions.length = 0;
                ts.forEach(node.statements, checkSourceElement);
                checkFunctionExpressionBodies(node);
                if (ts.isExternalModule(node)) {
                    checkExternalModuleExports(node);
                }
                if (potentialThisCollisions.length) {
                    ts.forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
                    potentialThisCollisions.length = 0;
                }
                if (emitExtends) {
                    links.flags |= 8 /* EmitExtends */;
                }
                if (emitDecorate) {
                    links.flags |= 512 /* EmitDecorate */;
                }
                if (emitParam) {
                    links.flags |= 1024 /* EmitParam */;
                }
                links.flags |= 1 /* TypeChecked */;
            }
        }
        function getDiagnostics(sourceFile) {
            throwIfNonDiagnosticsProducing();
            if (sourceFile) {
                checkSourceFile(sourceFile);
                return diagnostics.getDiagnostics(sourceFile.fileName);
            }
            ts.forEach(host.getSourceFiles(), checkSourceFile);
            return diagnostics.getDiagnostics();
        }
        function getGlobalDiagnostics() {
            throwIfNonDiagnosticsProducing();
            return diagnostics.getGlobalDiagnostics();
        }
        function throwIfNonDiagnosticsProducing() {
            if (!produceDiagnostics) {
                throw new Error("Trying to get diagnostics from a type checker that does not produce them.");
            }
        }
        // Language service support
        function isInsideWithStatementBody(node) {
            if (node) {
                while (node.parent) {
                    if (node.parent.kind === 192 /* WithStatement */ && node.parent.statement === node) {
                        return true;
                    }
                    node = node.parent;
                }
            }
            return false;
        }
        function getSymbolsInScope(location, meaning) {
            let symbols = {};
            let memberFlags = 0;
            if (isInsideWithStatementBody(location)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return [];
            }
            populateSymbols();
            return symbolsToArray(symbols);
            function populateSymbols() {
                while (location) {
                    if (location.locals && !isGlobalSourceFile(location)) {
                        copySymbols(location.locals, meaning);
                    }
                    switch (location.kind) {
                        case 227 /* SourceFile */:
                            if (!ts.isExternalModule(location)) {
                                break;
                            }
                        case 205 /* ModuleDeclaration */:
                            copySymbols(getSymbolOfNode(location).exports, meaning & 8914931 /* ModuleMember */);
                            break;
                        case 204 /* EnumDeclaration */:
                            copySymbols(getSymbolOfNode(location).exports, meaning & 8 /* EnumMember */);
                            break;
                        case 201 /* ClassDeclaration */:
                        case 202 /* InterfaceDeclaration */:
                            if (!(memberFlags & 128 /* Static */)) {
                                copySymbols(getSymbolOfNode(location).members, meaning & 793056 /* Type */);
                            }
                            break;
                        case 162 /* FunctionExpression */:
                            if (location.name) {
                                copySymbol(location.symbol, meaning);
                            }
                            break;
                    }
                    memberFlags = location.flags;
                    location = location.parent;
                }
                copySymbols(globals, meaning);
            }
            // Returns 'true' if we should stop processing symbols.
            function copySymbol(symbol, meaning) {
                if (symbol.flags & meaning) {
                    let id = symbol.name;
                    if (!isReservedMemberName(id) && !ts.hasProperty(symbols, id)) {
                        symbols[id] = symbol;
                    }
                }
            }
            function copySymbols(source, meaning) {
                if (meaning) {
                    for (let id in source) {
                        if (ts.hasProperty(source, id)) {
                            copySymbol(source[id], meaning);
                        }
                    }
                }
            }
            if (isInsideWithStatementBody(location)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return [];
            }
            while (location) {
                if (location.locals && !isGlobalSourceFile(location)) {
                    copySymbols(location.locals, meaning);
                }
                switch (location.kind) {
                    case 227 /* SourceFile */:
                        if (!ts.isExternalModule(location))
                            break;
                    case 205 /* ModuleDeclaration */:
                        copySymbols(getSymbolOfNode(location).exports, meaning & 8914931 /* ModuleMember */);
                        break;
                    case 204 /* EnumDeclaration */:
                        copySymbols(getSymbolOfNode(location).exports, meaning & 8 /* EnumMember */);
                        break;
                    case 201 /* ClassDeclaration */:
                    case 202 /* InterfaceDeclaration */:
                        if (!(memberFlags & 128 /* Static */)) {
                            copySymbols(getSymbolOfNode(location).members, meaning & 793056 /* Type */);
                        }
                        break;
                    case 162 /* FunctionExpression */:
                        if (location.name) {
                            copySymbol(location.symbol, meaning);
                        }
                        break;
                }
                memberFlags = location.flags;
                location = location.parent;
            }
            copySymbols(globals, meaning);
            return symbolsToArray(symbols);
        }
        function isTypeDeclarationName(name) {
            return name.kind == 65 /* Identifier */ &&
                isTypeDeclaration(name.parent) &&
                name.parent.name === name;
        }
        function isTypeDeclaration(node) {
            switch (node.kind) {
                case 128 /* TypeParameter */:
                case 201 /* ClassDeclaration */:
                case 202 /* InterfaceDeclaration */:
                case 203 /* TypeAliasDeclaration */:
                case 204 /* EnumDeclaration */:
                    return true;
            }
        }
        // True if the given identifier is part of a type reference
        function isTypeReferenceIdentifier(entityName) {
            let node = entityName;
            while (node.parent && node.parent.kind === 126 /* QualifiedName */) {
                node = node.parent;
            }
            return node.parent && node.parent.kind === 141 /* TypeReference */;
        }
        function isHeritageClauseElementIdentifier(entityName) {
            let node = entityName;
            while (node.parent && node.parent.kind === 155 /* PropertyAccessExpression */) {
                node = node.parent;
            }
            return node.parent && node.parent.kind === 177 /* HeritageClauseElement */;
        }
        function isTypeNodeOrHeritageClauseElement(node) {
            if (141 /* FirstTypeNode */ <= node.kind && node.kind <= 149 /* LastTypeNode */) {
                return true;
            }
            switch (node.kind) {
                case 112 /* AnyKeyword */:
                case 119 /* NumberKeyword */:
                case 121 /* StringKeyword */:
                case 113 /* BooleanKeyword */:
                case 122 /* SymbolKeyword */:
                    return true;
                case 99 /* VoidKeyword */:
                    return node.parent.kind !== 166 /* VoidExpression */;
                case 8 /* StringLiteral */:
                    // Specialized signatures can have string literals as their parameters' type names
                    return node.parent.kind === 129 /* Parameter */;
                case 177 /* HeritageClauseElement */:
                    return true;
                // Identifiers and qualified names may be type nodes, depending on their context. Climb
                // above them to find the lowest container
                case 65 /* Identifier */:
                    // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
                    if (node.parent.kind === 126 /* QualifiedName */ && node.parent.right === node) {
                        node = node.parent;
                    }
                    else if (node.parent.kind === 155 /* PropertyAccessExpression */ && node.parent.name === node) {
                        node = node.parent;
                    }
                // fall through
                case 126 /* QualifiedName */:
                case 155 /* PropertyAccessExpression */:
                    // At this point, node is either a qualified name or an identifier
                    ts.Debug.assert(node.kind === 65 /* Identifier */ || node.kind === 126 /* QualifiedName */ || node.kind === 155 /* PropertyAccessExpression */, "'node' was expected to be a qualified name, identifier or property access in 'isTypeNode'.");
                    let parent = node.parent;
                    if (parent.kind === 144 /* TypeQuery */) {
                        return false;
                    }
                    // Do not recursively call isTypeNode on the parent. In the example:
                    //
                    //     let a: A.B.C;
                    //
                    // Calling isTypeNode would consider the qualified name A.B a type node. Only C or
                    // A.B.C is a type node.
                    if (141 /* FirstTypeNode */ <= parent.kind && parent.kind <= 149 /* LastTypeNode */) {
                        return true;
                    }
                    switch (parent.kind) {
                        case 177 /* HeritageClauseElement */:
                            return true;
                        case 128 /* TypeParameter */:
                            return node === parent.constraint;
                        case 132 /* PropertyDeclaration */:
                        case 131 /* PropertySignature */:
                        case 129 /* Parameter */:
                        case 198 /* VariableDeclaration */:
                            return node === parent.type;
                        case 200 /* FunctionDeclaration */:
                        case 162 /* FunctionExpression */:
                        case 163 /* ArrowFunction */:
                        case 135 /* Constructor */:
                        case 134 /* MethodDeclaration */:
                        case 133 /* MethodSignature */:
                        case 136 /* GetAccessor */:
                        case 137 /* SetAccessor */:
                            return node === parent.type;
                        case 138 /* CallSignature */:
                        case 139 /* ConstructSignature */:
                        case 140 /* IndexSignature */:
                            return node === parent.type;
                        case 160 /* TypeAssertionExpression */:
                            return node === parent.type;
                        case 157 /* CallExpression */:
                        case 158 /* NewExpression */:
                            return parent.typeArguments && ts.indexOf(parent.typeArguments, node) >= 0;
                        case 159 /* TaggedTemplateExpression */:
                            // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                            return false;
                    }
            }
            return false;
        }
        function getLeftSideOfImportEqualsOrExportAssignment(nodeOnRightSide) {
            while (nodeOnRightSide.parent.kind === 126 /* QualifiedName */) {
                nodeOnRightSide = nodeOnRightSide.parent;
            }
            if (nodeOnRightSide.parent.kind === 208 /* ImportEqualsDeclaration */) {
                return nodeOnRightSide.parent.moduleReference === nodeOnRightSide && nodeOnRightSide.parent;
            }
            if (nodeOnRightSide.parent.kind === 214 /* ExportAssignment */) {
                return nodeOnRightSide.parent.expression === nodeOnRightSide && nodeOnRightSide.parent;
            }
            return undefined;
        }
        function isInRightSideOfImportOrExportAssignment(node) {
            return getLeftSideOfImportEqualsOrExportAssignment(node) !== undefined;
        }
        function getSymbolOfEntityNameOrPropertyAccessExpression(entityName) {
            if (ts.isDeclarationName(entityName)) {
                return getSymbolOfNode(entityName.parent);
            }
            if (entityName.parent.kind === 214 /* ExportAssignment */) {
                return resolveEntityName(entityName, 
                /*all meanings*/ 107455 /* Value */ | 793056 /* Type */ | 1536 /* Namespace */ | 8388608 /* Alias */);
            }
            if (entityName.kind !== 155 /* PropertyAccessExpression */) {
                if (isInRightSideOfImportOrExportAssignment(entityName)) {
                    // Since we already checked for ExportAssignment, this really could only be an Import
                    return getSymbolOfPartOfRightHandSideOfImportEquals(entityName);
                }
            }
            if (ts.isRightSideOfQualifiedNameOrPropertyAccess(entityName)) {
                entityName = entityName.parent;
            }
            if (isHeritageClauseElementIdentifier(entityName)) {
                let meaning = entityName.parent.kind === 177 /* HeritageClauseElement */ ? 793056 /* Type */ : 1536 /* Namespace */;
                meaning |= 8388608 /* Alias */;
                return resolveEntityName(entityName, meaning);
            }
            else if (ts.isExpression(entityName)) {
                if (ts.nodeIsMissing(entityName)) {
                    // Missing entity name.
                    return undefined;
                }
                if (entityName.kind === 65 /* Identifier */) {
                    // Include aliases in the meaning, this ensures that we do not follow aliases to where they point and instead
                    // return the alias symbol.
                    let meaning = 107455 /* Value */ | 8388608 /* Alias */;
                    return resolveEntityName(entityName, meaning);
                }
                else if (entityName.kind === 155 /* PropertyAccessExpression */) {
                    let symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkPropertyAccessExpression(entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
                else if (entityName.kind === 126 /* QualifiedName */) {
                    let symbol = getNodeLinks(entityName).resolvedSymbol;
                    if (!symbol) {
                        checkQualifiedName(entityName);
                    }
                    return getNodeLinks(entityName).resolvedSymbol;
                }
            }
            else if (isTypeReferenceIdentifier(entityName)) {
                let meaning = entityName.parent.kind === 141 /* TypeReference */ ? 793056 /* Type */ : 1536 /* Namespace */;
                // Include aliases in the meaning, this ensures that we do not follow aliases to where they point and instead
                // return the alias symbol.
                meaning |= 8388608 /* Alias */;
                return resolveEntityName(entityName, meaning);
            }
            // Do we want to return undefined here?
            return undefined;
        }
        function getSymbolInfo(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return undefined;
            }
            if (ts.isDeclarationName(node)) {
                // This is a declaration, call getSymbolOfNode
                return getSymbolOfNode(node.parent);
            }
            if (node.kind === 65 /* Identifier */ && isInRightSideOfImportOrExportAssignment(node)) {
                return node.parent.kind === 214 /* ExportAssignment */
                    ? getSymbolOfEntityNameOrPropertyAccessExpression(node)
                    : getSymbolOfPartOfRightHandSideOfImportEquals(node);
            }
            switch (node.kind) {
                case 65 /* Identifier */:
                case 155 /* PropertyAccessExpression */:
                case 126 /* QualifiedName */:
                    return getSymbolOfEntityNameOrPropertyAccessExpression(node);
                case 93 /* ThisKeyword */:
                case 91 /* SuperKeyword */:
                    let type = checkExpression(node);
                    return type.symbol;
                case 114 /* ConstructorKeyword */:
                    // constructor keyword for an overload, should take us to the definition if it exist
                    let constructorDeclaration = node.parent;
                    if (constructorDeclaration && constructorDeclaration.kind === 135 /* Constructor */) {
                        return constructorDeclaration.parent.symbol;
                    }
                    return undefined;
                case 8 /* StringLiteral */:
                    // External module name in an import declaration
                    let moduleName;
                    if ((ts.isExternalModuleImportEqualsDeclaration(node.parent.parent) &&
                        ts.getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node) ||
                        ((node.parent.kind === 209 /* ImportDeclaration */ || node.parent.kind === 215 /* ExportDeclaration */) &&
                            node.parent.moduleSpecifier === node)) {
                        return resolveExternalModuleName(node, node);
                    }
                // Intentional fall-through
                case 7 /* NumericLiteral */:
                    // index access
                    if (node.parent.kind == 156 /* ElementAccessExpression */ && node.parent.argumentExpression === node) {
                        let objectType = checkExpression(node.parent.expression);
                        if (objectType === unknownType)
                            return undefined;
                        let apparentType = getApparentType(objectType);
                        if (apparentType === unknownType)
                            return undefined;
                        return getPropertyOfType(apparentType, node.text);
                    }
                    break;
            }
            return undefined;
        }
        function getShorthandAssignmentValueSymbol(location) {
            // The function returns a value symbol of an identifier in the short-hand property assignment.
            // This is necessary as an identifier in short-hand property assignment can contains two meaning:
            // property name and property value.
            if (location && location.kind === 225 /* ShorthandPropertyAssignment */) {
                return resolveEntityName(location.name, 107455 /* Value */);
            }
            return undefined;
        }
        function getTypeOfNode(node) {
            if (isInsideWithStatementBody(node)) {
                // We cannot answer semantic questions within a with block, do not proceed any further
                return unknownType;
            }
            if (isTypeNodeOrHeritageClauseElement(node)) {
                return getTypeFromTypeNodeOrHeritageClauseElement(node);
            }
            if (ts.isExpression(node)) {
                return getTypeOfExpression(node);
            }
            if (isTypeDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolInfo because it is a declaration
                let symbol = getSymbolOfNode(node);
                return getDeclaredTypeOfSymbol(symbol);
            }
            if (isTypeDeclarationName(node)) {
                let symbol = getSymbolInfo(node);
                return symbol && getDeclaredTypeOfSymbol(symbol);
            }
            if (ts.isDeclaration(node)) {
                // In this case, we call getSymbolOfNode instead of getSymbolInfo because it is a declaration
                let symbol = getSymbolOfNode(node);
                return getTypeOfSymbol(symbol);
            }
            if (ts.isDeclarationName(node)) {
                let symbol = getSymbolInfo(node);
                return symbol && getTypeOfSymbol(symbol);
            }
            if (isInRightSideOfImportOrExportAssignment(node)) {
                let symbol = getSymbolInfo(node);
                let declaredType = symbol && getDeclaredTypeOfSymbol(symbol);
                return declaredType !== unknownType ? declaredType : getTypeOfSymbol(symbol);
            }
            return unknownType;
        }
        function getTypeOfExpression(expr) {
            if (ts.isRightSideOfQualifiedNameOrPropertyAccess(expr)) {
                expr = expr.parent;
            }
            return checkExpression(expr);
        }
        // Return the list of properties of the given type, augmented with properties from Function
        // if the type has call or construct signatures
        function getAugmentedPropertiesOfType(type) {
            type = getApparentType(type);
            let propsByName = createSymbolTable(getPropertiesOfType(type));
            if (getSignaturesOfType(type, 0 /* Call */).length || getSignaturesOfType(type, 1 /* Construct */).length) {
                ts.forEach(getPropertiesOfType(globalFunctionType), p => {
                    if (!ts.hasProperty(propsByName, p.name)) {
                        propsByName[p.name] = p;
                    }
                });
            }
            return getNamedMembers(propsByName);
        }
        function getRootSymbols(symbol) {
            if (symbol.flags & 268435456 /* UnionProperty */) {
                let symbols = [];
                let name = symbol.name;
                ts.forEach(getSymbolLinks(symbol).unionType.types, t => {
                    symbols.push(getPropertyOfType(t, name));
                });
                return symbols;
            }
            else if (symbol.flags & 67108864 /* Transient */) {
                let target = getSymbolLinks(symbol).target;
                if (target) {
                    return [target];
                }
            }
            return [symbol];
        }
        // Emitter support
        function isExternalModuleSymbol(symbol) {
            return symbol.flags & 512 /* ValueModule */ && symbol.declarations.length === 1 && symbol.declarations[0].kind === 227 /* SourceFile */;
        }
        function getAliasNameSubstitution(symbol, getGeneratedNameForNode) {
            // If this is es6 or higher, just use the name of the export
            // no need to qualify it.
            if (languageVersion >= 2 /* ES6 */) {
                return undefined;
            }
            let node = getDeclarationOfAliasSymbol(symbol);
            if (node) {
                if (node.kind === 210 /* ImportClause */) {
                    return getGeneratedNameForNode(node.parent) + ".default";
                }
                if (node.kind === 213 /* ImportSpecifier */) {
                    let moduleName = getGeneratedNameForNode(node.parent.parent.parent);
                    let propertyName = node.propertyName || node.name;
                    return moduleName + "." + ts.unescapeIdentifier(propertyName.text);
                }
            }
        }
        function getExportNameSubstitution(symbol, location, getGeneratedNameForNode) {
            if (isExternalModuleSymbol(symbol.parent)) {
                // If this is es6 or higher, just use the name of the export
                // no need to qualify it.
                if (languageVersion >= 2 /* ES6 */) {
                    return undefined;
                }
                return "exports." + ts.unescapeIdentifier(symbol.name);
            }
            let node = location;
            let containerSymbol = getParentOfSymbol(symbol);
            while (node) {
                if ((node.kind === 205 /* ModuleDeclaration */ || node.kind === 204 /* EnumDeclaration */) && getSymbolOfNode(node) === containerSymbol) {
                    return getGeneratedNameForNode(node) + "." + ts.unescapeIdentifier(symbol.name);
                }
                node = node.parent;
            }
        }
        function getExpressionNameSubstitution(node, getGeneratedNameForNode) {
            let symbol = getNodeLinks(node).resolvedSymbol || (ts.isDeclarationName(node) ? getSymbolOfNode(node.parent) : undefined);
            if (symbol) {
                // Whan an identifier resolves to a parented symbol, it references an exported entity from
                // another declaration of the same internal module.
                if (symbol.parent) {
                    return getExportNameSubstitution(symbol, node.parent, getGeneratedNameForNode);
                }
                // If we reference an exported entity within the same module declaration, then whether
                // we prefix depends on the kind of entity. SymbolFlags.ExportHasLocal encompasses all the
                // kinds that we do NOT prefix.
                let exportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
                if (symbol !== exportSymbol && !(exportSymbol.flags & 944 /* ExportHasLocal */)) {
                    return getExportNameSubstitution(exportSymbol, node.parent, getGeneratedNameForNode);
                }
                // Named imports from ES6 import declarations are rewritten
                if (symbol.flags & 8388608 /* Alias */) {
                    return getAliasNameSubstitution(symbol, getGeneratedNameForNode);
                }
            }
        }
        function isValueAliasDeclaration(node) {
            switch (node.kind) {
                case 208 /* ImportEqualsDeclaration */:
                case 210 /* ImportClause */:
                case 211 /* NamespaceImport */:
                case 213 /* ImportSpecifier */:
                case 217 /* ExportSpecifier */:
                    return isAliasResolvedToValue(getSymbolOfNode(node));
                case 215 /* ExportDeclaration */:
                    let exportClause = node.exportClause;
                    return exportClause && ts.forEach(exportClause.elements, isValueAliasDeclaration);
                case 214 /* ExportAssignment */:
                    return node.expression && node.expression.kind === 65 /* Identifier */ ? isAliasResolvedToValue(getSymbolOfNode(node)) : true;
            }
            return false;
        }
        function isTopLevelValueImportEqualsWithEntityName(node) {
            if (node.parent.kind !== 227 /* SourceFile */ || !ts.isInternalModuleImportEqualsDeclaration(node)) {
                // parent is not source file or it is not reference to internal module
                return false;
            }
            var isValue = isAliasResolvedToValue(getSymbolOfNode(node));
            return isValue && node.moduleReference && !ts.nodeIsMissing(node.moduleReference);
        }
        function isAliasResolvedToValue(symbol) {
            let target = resolveAlias(symbol);
            if (target === unknownSymbol && compilerOptions.separateCompilation) {
                return true;
            }
            // const enums and modules that contain only const enums are not considered values from the emit perespective
            return target !== unknownSymbol && target && target.flags & 107455 /* Value */ && !isConstEnumOrConstEnumOnlyModule(target);
        }
        function isConstEnumOrConstEnumOnlyModule(s) {
            return isConstEnumSymbol(s) || s.constEnumOnlyModule;
        }
        function isReferencedAliasDeclaration(node, checkChildren) {
            if (ts.isAliasSymbolDeclaration(node)) {
                let symbol = getSymbolOfNode(node);
                if (getSymbolLinks(symbol).referenced) {
                    return true;
                }
            }
            if (checkChildren) {
                return ts.forEachChild(node, node => isReferencedAliasDeclaration(node, checkChildren));
            }
            return false;
        }
        function isImplementationOfOverload(node) {
            if (ts.nodeIsPresent(node.body)) {
                let symbol = getSymbolOfNode(node);
                let signaturesOfSymbol = getSignaturesOfSymbol(symbol);
                // If this function body corresponds to function with multiple signature, it is implementation of overload
                // e.g.: function foo(a: string): string;
                //       function foo(a: number): number;
                //       function foo(a: any) { // This is implementation of the overloads
                //           return a;
                //       }
                return signaturesOfSymbol.length > 1 ||
                    // If there is single signature for the symbol, it is overload if that signature isn't coming from the node
                    // e.g.: function foo(a: string): string;
                    //       function foo(a: any) { // This is implementation of the overloads
                    //           return a;
                    //       }
                    (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0].declaration !== node);
            }
            return false;
        }
        function getNodeCheckFlags(node) {
            return getNodeLinks(node).flags;
        }
        function getEnumMemberValue(node) {
            computeEnumMemberValues(node.parent);
            return getNodeLinks(node).enumMemberValue;
        }
        function getConstantValue(node) {
            if (node.kind === 226 /* EnumMember */) {
                return getEnumMemberValue(node);
            }
            let symbol = getNodeLinks(node).resolvedSymbol;
            if (symbol && (symbol.flags & 8 /* EnumMember */)) {
                // inline property\index accesses only for const enums
                if (ts.isConstEnumDeclaration(symbol.valueDeclaration.parent)) {
                    return getEnumMemberValue(symbol.valueDeclaration);
                }
            }
            return undefined;
        }
        /** Serializes an EntityName (with substitutions) to an appropriate JS constructor value. Used by the __metadata decorator. */
        function serializeEntityName(node, getGeneratedNameForNode, fallbackPath) {
            if (node.kind === 65 /* Identifier */) {
                var substitution = getExpressionNameSubstitution(node, getGeneratedNameForNode);
                var text = substitution || node.text;
                if (fallbackPath) {
                    fallbackPath.push(text);
                }
                else {
                    return text;
                }
            }
            else {
                var left = serializeEntityName(node.left, getGeneratedNameForNode, fallbackPath);
                var right = serializeEntityName(node.right, getGeneratedNameForNode, fallbackPath);
                if (!fallbackPath) {
                    return left + "." + right;
                }
            }
        }
        /** Serializes a TypeReferenceNode to an appropriate JS constructor value. Used by the __metadata decorator. */
        function serializeTypeReferenceNode(node, getGeneratedNameForNode) {
            // serialization of a TypeReferenceNode uses the following rules:
            //
            // * The serialized type of a TypeReference that is `void` is "void 0".
            // * The serialized type of a TypeReference that is a `boolean` is "Boolean".
            // * The serialized type of a TypeReference that is an enum or `number` is "Number".
            // * The serialized type of a TypeReference that is a string literal or `string` is "String".
            // * The serialized type of a TypeReference that is a tuple is "Array".
            // * The serialized type of a TypeReference that is a `symbol` is "Symbol".
            // * The serialized type of a TypeReference with a value declaration is its entity name.
            // * The serialized type of a TypeReference with a call or construct signature is "Function".
            // * The serialized type of any other type is "Object".
            let type = getTypeFromTypeReference(node);
            if (type.flags & 16 /* Void */) {
                return "void 0";
            }
            else if (type.flags & 8 /* Boolean */) {
                return "Boolean";
            }
            else if (type.flags & 132 /* NumberLike */) {
                return "Number";
            }
            else if (type.flags & 258 /* StringLike */) {
                return "String";
            }
            else if (type.flags & 8192 /* Tuple */) {
                return "Array";
            }
            else if (type.flags & 1048576 /* ESSymbol */) {
                return "Symbol";
            }
            else if (type === unknownType) {
                var fallbackPath = [];
                serializeEntityName(node.typeName, getGeneratedNameForNode, fallbackPath);
                return fallbackPath;
            }
            else if (type.symbol && type.symbol.valueDeclaration) {
                return serializeEntityName(node.typeName, getGeneratedNameForNode);
            }
            else if (typeHasCallOrConstructSignatures(type)) {
                return "Function";
            }
            return "Object";
        }
        /** Serializes a TypeNode to an appropriate JS constructor value. Used by the __metadata decorator. */
        function serializeTypeNode(node, getGeneratedNameForNode) {
            // serialization of a TypeNode uses the following rules:
            //
            // * The serialized type of `void` is "void 0" (undefined).
            // * The serialized type of a parenthesized type is the serialized type of its nested type.
            // * The serialized type of a Function or Constructor type is "Function".
            // * The serialized type of an Array or Tuple type is "Array".
            // * The serialized type of `boolean` is "Boolean".
            // * The serialized type of `string` or a string-literal type is "String".
            // * The serialized type of a type reference is handled by `serializeTypeReferenceNode`.
            // * The serialized type of any other type node is "Object".
            if (node) {
                switch (node.kind) {
                    case 99 /* VoidKeyword */:
                        return "void 0";
                    case 149 /* ParenthesizedType */:
                        return serializeTypeNode(node.type, getGeneratedNameForNode);
                    case 142 /* FunctionType */:
                    case 143 /* ConstructorType */:
                        return "Function";
                    case 146 /* ArrayType */:
                    case 147 /* TupleType */:
                        return "Array";
                    case 113 /* BooleanKeyword */:
                        return "Boolean";
                    case 121 /* StringKeyword */:
                    case 8 /* StringLiteral */:
                        return "String";
                    case 119 /* NumberKeyword */:
                        return "Number";
                    case 141 /* TypeReference */:
                        return serializeTypeReferenceNode(node, getGeneratedNameForNode);
                    case 144 /* TypeQuery */:
                    case 145 /* TypeLiteral */:
                    case 148 /* UnionType */:
                    case 112 /* AnyKeyword */:
                        break;
                    default:
                        ts.Debug.fail("Cannot serialize unexpected type node.");
                        break;
                }
            }
            return "Object";
        }
        /** Serializes the type of a declaration to an appropriate JS constructor value. Used by the __metadata decorator for a class member. */
        function serializeTypeOfNode(node, getGeneratedNameForNode) {
            // serialization of the type of a declaration uses the following rules:
            //
            // * The serialized type of a ClassDeclaration is "Function"
            // * The serialized type of a ParameterDeclaration is the serialized type of its type annotation.
            // * The serialized type of a PropertyDeclaration is the serialized type of its type annotation.
            // * The serialized type of an AccessorDeclaration is the serialized type of the return type annotation of its getter or parameter type annotation of its setter.
            // * The serialized type of any other FunctionLikeDeclaration is "Function".
            // * The serialized type of any other node is "void 0".
            // 
            // For rules on serializing type annotations, see `serializeTypeNode`.
            switch (node.kind) {
                case 201 /* ClassDeclaration */: return "Function";
                case 132 /* PropertyDeclaration */: return serializeTypeNode(node.type, getGeneratedNameForNode);
                case 129 /* Parameter */: return serializeTypeNode(node.type, getGeneratedNameForNode);
                case 136 /* GetAccessor */: return serializeTypeNode(node.type, getGeneratedNameForNode);
                case 137 /* SetAccessor */: return serializeTypeNode(getSetAccessorTypeAnnotationNode(node), getGeneratedNameForNode);
            }
            if (ts.isFunctionLike(node)) {
                return "Function";
            }
            return "void 0";
        }
        /** Serializes the parameter types of a function or the constructor of a class. Used by the __metadata decorator for a method or set accessor. */
        function serializeParameterTypesOfNode(node, getGeneratedNameForNode) {
            // serialization of parameter types uses the following rules:
            //
            // * If the declaration is a class, the parameters of the first constructor with a body are used.
            // * If the declaration is function-like and has a body, the parameters of the function are used.
            // 
            // For the rules on serializing the type of each parameter declaration, see `serializeTypeOfDeclaration`.
            if (node) {
                var valueDeclaration;
                if (node.kind === 201 /* ClassDeclaration */) {
                    valueDeclaration = ts.getFirstConstructorWithBody(node);
                }
                else if (ts.isFunctionLike(node) && ts.nodeIsPresent(node.body)) {
                    valueDeclaration = node;
                }
                if (valueDeclaration) {
                    var result;
                    var parameters = valueDeclaration.parameters;
                    var parameterCount = parameters.length;
                    if (parameterCount > 0) {
                        result = new Array(parameterCount);
                        for (var i = 0; i < parameterCount; i++) {
                            if (parameters[i].dotDotDotToken) {
                                var parameterType = parameters[i].type;
                                if (parameterType.kind === 146 /* ArrayType */) {
                                    parameterType = parameterType.elementType;
                                }
                                else if (parameterType.kind === 141 /* TypeReference */ && parameterType.typeArguments && parameterType.typeArguments.length === 1) {
                                    parameterType = parameterType.typeArguments[0];
                                }
                                else {
                                    parameterType = undefined;
                                }
                                result[i] = serializeTypeNode(parameterType, getGeneratedNameForNode);
                            }
                            else {
                                result[i] = serializeTypeOfNode(parameters[i], getGeneratedNameForNode);
                            }
                        }
                        return result;
                    }
                }
            }
            return emptyArray;
        }
        /** Serializes the return type of function. Used by the __metadata decorator for a method. */
        function serializeReturnTypeOfNode(node, getGeneratedNameForNode) {
            if (node && ts.isFunctionLike(node)) {
                return serializeTypeNode(node.type, getGeneratedNameForNode);
            }
            return "void 0";
        }
        function writeTypeOfDeclaration(declaration, enclosingDeclaration, flags, writer) {
            // Get type of the symbol if this is the valid symbol otherwise get type at location
            let symbol = getSymbolOfNode(declaration);
            let type = symbol && !(symbol.flags & (2048 /* TypeLiteral */ | 131072 /* Signature */))
                ? getTypeOfSymbol(symbol)
                : unknownType;
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }
        function writeReturnTypeOfSignatureDeclaration(signatureDeclaration, enclosingDeclaration, flags, writer) {
            let signature = getSignatureFromDeclaration(signatureDeclaration);
            getSymbolDisplayBuilder().buildTypeDisplay(getReturnTypeOfSignature(signature), writer, enclosingDeclaration, flags);
        }
        function writeTypeOfExpression(expr, enclosingDeclaration, flags, writer) {
            var type = getTypeOfExpression(expr);
            getSymbolDisplayBuilder().buildTypeDisplay(type, writer, enclosingDeclaration, flags);
        }
        function hasGlobalName(name) {
            return ts.hasProperty(globals, name);
        }
        function resolvesToSomeValue(location, name) {
            ts.Debug.assert(!ts.nodeIsSynthesized(location), "resolvesToSomeValue called with a synthesized location");
            return !!resolveName(location, name, 107455 /* Value */, undefined, undefined);
        }
        function getBlockScopedVariableId(n) {
            ts.Debug.assert(!ts.nodeIsSynthesized(n));
            let isVariableDeclarationOrBindingElement = n.parent.kind === 152 /* BindingElement */ || (n.parent.kind === 198 /* VariableDeclaration */ && n.parent.name === n);
            let symbol = (isVariableDeclarationOrBindingElement ? getSymbolOfNode(n.parent) : undefined) ||
                getNodeLinks(n).resolvedSymbol ||
                resolveName(n, n.text, 107455 /* Value */ | 8388608 /* Alias */, undefined, undefined);
            let isLetOrConst = symbol &&
                (symbol.flags & 2 /* BlockScopedVariable */) &&
                symbol.valueDeclaration.parent.kind !== 223 /* CatchClause */;
            if (isLetOrConst) {
                // side-effect of calling this method:
                //   assign id to symbol if it was not yet set
                getSymbolLinks(symbol);
                return symbol.id;
            }
            return undefined;
        }
        function instantiateSingleCallFunctionType(functionType, typeArguments) {
            if (functionType === unknownType) {
                return unknownType;
            }
            let signature = getSingleCallSignature(functionType);
            if (!signature) {
                return unknownType;
            }
            let instantiatedSignature = getSignatureInstantiation(signature, typeArguments);
            return getOrCreateTypeFromSignature(instantiatedSignature);
        }
        function createResolver() {
            return {
                getExpressionNameSubstitution,
                isValueAliasDeclaration,
                hasGlobalName,
                isReferencedAliasDeclaration,
                getNodeCheckFlags,
                isTopLevelValueImportEqualsWithEntityName,
                isDeclarationVisible,
                isImplementationOfOverload,
                writeTypeOfDeclaration,
                writeReturnTypeOfSignatureDeclaration,
                writeTypeOfExpression,
                isSymbolAccessible,
                isEntityNameVisible,
                getConstantValue,
                resolvesToSomeValue,
                collectLinkedAliases,
                getBlockScopedVariableId,
                serializeTypeOfNode,
                serializeParameterTypesOfNode,
                serializeReturnTypeOfNode,
            };
        }
        function initializeTypeChecker() {
            // Bind all source files and propagate errors
            ts.forEach(host.getSourceFiles(), file => {
                ts.bindSourceFile(file);
            });
            // Initialize global symbol table
            ts.forEach(host.getSourceFiles(), file => {
                if (!ts.isExternalModule(file)) {
                    mergeSymbolTable(globals, file.locals);
                }
            });
            // Initialize special symbols
            getSymbolLinks(undefinedSymbol).type = undefinedType;
            getSymbolLinks(argumentsSymbol).type = getGlobalType("IArguments");
            getSymbolLinks(unknownSymbol).type = unknownType;
            globals[undefinedSymbol.name] = undefinedSymbol;
            // Initialize special types
            globalArraySymbol = getGlobalTypeSymbol("Array");
            globalArrayType = getTypeOfGlobalSymbol(globalArraySymbol, 1);
            globalObjectType = getGlobalType("Object");
            globalFunctionType = getGlobalType("Function");
            globalStringType = getGlobalType("String");
            globalNumberType = getGlobalType("Number");
            globalBooleanType = getGlobalType("Boolean");
            globalRegExpType = getGlobalType("RegExp");
            globalTypedPropertyDescriptorType = getTypeOfGlobalSymbol(getGlobalTypeSymbol("TypedPropertyDescriptor"), 1);
            globalClassDecoratorType = getGlobalType("ClassDecorator");
            globalPropertyDecoratorType = getGlobalType("PropertyDecorator");
            globalMethodDecoratorType = getGlobalType("MethodDecorator");
            globalParameterDecoratorType = getGlobalType("ParameterDecorator");
            // If we're in ES6 mode, load the TemplateStringsArray.
            // Otherwise, default to 'unknown' for the purposes of type checking in LS scenarios.
            if (languageVersion >= 2 /* ES6 */) {
                globalTemplateStringsArrayType = getGlobalType("TemplateStringsArray");
                globalESSymbolType = getGlobalType("Symbol");
                globalESSymbolConstructorSymbol = getGlobalValueSymbol("Symbol");
                globalIterableType = getGlobalType("Iterable", 1);
            }
            else {
                globalTemplateStringsArrayType = unknownType;
                // Consider putting Symbol interface in lib.d.ts. On the plus side, putting it in lib.d.ts would make it
                // extensible for Polyfilling Symbols. But putting it into lib.d.ts could also break users that have
                // a global Symbol already, particularly if it is a class.
                globalESSymbolType = createAnonymousType(undefined, emptySymbols, emptyArray, emptyArray, undefined, undefined);
                globalESSymbolConstructorSymbol = undefined;
            }
            anyArrayType = createArrayType(anyType);
        }
        // GRAMMAR CHECKING
        function isReservedwordInStrictMode(node) {
            // Check that originalKeywordKind is less than LastFurtureReservedWord to see if an Identifier is a strict-mode reserved word
            return (node.parserContextFlags & 1 /* StrictMode */) &&
                (node.originalKeywordKind >= 103 /* FirstFutureReservedWord */ && node.originalKeywordKind <= 111 /* LastFutureReservedWord */);
        }
        function reportStrictModeGrammarErrorInClassDeclaration(identifier, message, arg0, arg1, arg2) {
            // We are checking if this name is inside class declaration or class expression (which are under class definitions inside ES6 spec.)
            // if so, we would like to give more explicit invalid usage error.
            if (ts.getAncestor(identifier, 201 /* ClassDeclaration */) || ts.getAncestor(identifier, 174 /* ClassExpression */)) {
                return grammarErrorOnNode(identifier, message, arg0);
            }
            return false;
        }
        function checkGrammarImportDeclarationNameInStrictMode(node) {
            // Check if the import declaration used strict-mode reserved word in its names bindings
            if (node.importClause) {
                let impotClause = node.importClause;
                if (impotClause.namedBindings) {
                    let nameBindings = impotClause.namedBindings;
                    if (nameBindings.kind === 211 /* NamespaceImport */) {
                        let name = nameBindings.name;
                        if (name.originalKeywordKind) {
                            let nameText = ts.declarationNameToString(name);
                            return grammarErrorOnNode(name, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                        }
                    }
                    else if (nameBindings.kind === 212 /* NamedImports */) {
                        let reportError = false;
                        for (let element of nameBindings.elements) {
                            let name = element.name;
                            if (name.originalKeywordKind) {
                                let nameText = ts.declarationNameToString(name);
                                reportError = reportError || grammarErrorOnNode(name, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                            }
                        }
                        return reportError;
                    }
                }
            }
            return false;
        }
        function checkGrammarDeclarationNameInStrictMode(node) {
            let name = node.name;
            if (name && name.kind === 65 /* Identifier */ && isReservedwordInStrictMode(name)) {
                let nameText = ts.declarationNameToString(name);
                switch (node.kind) {
                    case 129 /* Parameter */:
                    case 198 /* VariableDeclaration */:
                    case 200 /* FunctionDeclaration */:
                    case 128 /* TypeParameter */:
                    case 152 /* BindingElement */:
                    case 202 /* InterfaceDeclaration */:
                    case 203 /* TypeAliasDeclaration */:
                    case 204 /* EnumDeclaration */:
                        return checkGrammarIdentifierInStrictMode(name);
                    case 201 /* ClassDeclaration */:
                        // Report an error if the class declaration uses strict-mode reserved word.
                        return grammarErrorOnNode(name, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode, nameText);
                    case 205 /* ModuleDeclaration */:
                        // Report an error if the module declaration uses strict-mode reserved word.
                        // TODO(yuisu): fix this when having external module in strict mode
                        return grammarErrorOnNode(name, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                    case 208 /* ImportEqualsDeclaration */:
                        // TODO(yuisu): fix this when having external module in strict mode
                        return grammarErrorOnNode(name, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                }
            }
            return false;
        }
        function checkGrammarTypeReferenceInStrictMode(typeName) {
            // Check if the type reference is using strict mode keyword
            // Example:
            //      class C {
            //          foo(x: public){}  // Error.
            //      }
            if (typeName.kind === 65 /* Identifier */) {
                checkGrammarTypeNameInStrictMode(typeName);
            }
            else if (typeName.kind === 126 /* QualifiedName */) {
                // Walk from right to left and report a possible error at each Identifier in QualifiedName
                // Example:
                //      x1: public.private.package  // error at public and private
                checkGrammarTypeNameInStrictMode(typeName.right);
                checkGrammarTypeReferenceInStrictMode(typeName.left);
            }
        }
        // This function will report an error for every identifier in property access expression
        // whether it violates strict mode reserved words.
        // Example:
        //      public                  // error at public
        //      public.private.package  // error at public
        //      B.private.B             // no error
        function checkGrammarHeritageClauseElementInStrictMode(expression) {
            // Example:
            //      class C extends public // error at public
            if (expression && expression.kind === 65 /* Identifier */) {
                return checkGrammarIdentifierInStrictMode(expression);
            }
            else if (expression && expression.kind === 155 /* PropertyAccessExpression */) {
                // Walk from left to right in PropertyAccessExpression until we are at the left most expression
                // in PropertyAccessExpression. According to grammar production of MemberExpression,
                // the left component expression is a PrimaryExpression (i.e. Identifier) while the other
                // component after dots can be IdentifierName.
                checkGrammarHeritageClauseElementInStrictMode(expression.expression);
            }
        }
        // The function takes an identifier itself or an expression which has SyntaxKind.Identifier.
        function checkGrammarIdentifierInStrictMode(node, nameText) {
            if (node && node.kind === 65 /* Identifier */ && isReservedwordInStrictMode(node)) {
                if (!nameText) {
                    nameText = ts.declarationNameToString(node);
                }
                // TODO (yuisu): Fix when module is a strict mode
                let errorReport = reportStrictModeGrammarErrorInClassDeclaration(node, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode, nameText) ||
                    grammarErrorOnNode(node, ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                return errorReport;
            }
            return false;
        }
        // The function takes an identifier when uses as a typeName in TypeReferenceNode
        function checkGrammarTypeNameInStrictMode(node) {
            if (node && node.kind === 65 /* Identifier */ && isReservedwordInStrictMode(node)) {
                let nameText = ts.declarationNameToString(node);
                // TODO (yuisu): Fix when module is a strict mode
                let errorReport = reportStrictModeGrammarErrorInClassDeclaration(node, ts.Diagnostics.Type_expected_0_is_a_reserved_word_in_strict_mode_Class_definitions_are_automatically_in_strict_mode, nameText) ||
                    grammarErrorOnNode(node, ts.Diagnostics.Type_expected_0_is_a_reserved_word_in_strict_mode, nameText);
                return errorReport;
            }
            return false;
        }
        function checkGrammarDecorators(node) {
            if (!node.decorators) {
                return false;
            }
            if (!ts.nodeCanBeDecorated(node)) {
                return grammarErrorOnFirstToken(node, ts.Diagnostics.Decorators_are_not_valid_here);
            }
            else if (languageVersion < 1 /* ES5 */) {
                return grammarErrorOnFirstToken(node, ts.Diagnostics.Decorators_are_only_available_when_targeting_ECMAScript_5_and_higher);
            }
            else if (node.kind === 136 /* GetAccessor */ || node.kind === 137 /* SetAccessor */) {
                let accessors = ts.getAllAccessorDeclarations(node.parent.members, node);
                if (accessors.firstAccessor.decorators && node === accessors.secondAccessor) {
                    return grammarErrorOnFirstToken(node, ts.Diagnostics.Decorators_cannot_be_applied_to_multiple_get_Slashset_accessors_of_the_same_name);
                }
            }
            return false;
        }
        function checkGrammarModifiers(node) {
            switch (node.kind) {
                case 136 /* GetAccessor */:
                case 137 /* SetAccessor */:
                case 135 /* Constructor */:
                case 132 /* PropertyDeclaration */:
                case 131 /* PropertySignature */:
                case 134 /* MethodDeclaration */:
                case 133 /* MethodSignature */:
                case 140 /* IndexSignature */:
                case 201 /* ClassDeclaration */:
                case 202 /* InterfaceDeclaration */:
                case 205 /* ModuleDeclaration */:
                case 204 /* EnumDeclaration */:
                case 180 /* VariableStatement */:
                case 200 /* FunctionDeclaration */:
                case 203 /* TypeAliasDeclaration */:
                case 209 /* ImportDeclaration */:
                case 208 /* ImportEqualsDeclaration */:
                case 215 /* ExportDeclaration */:
                case 214 /* ExportAssignment */:
                case 129 /* Parameter */:
                    break;
                default:
                    return false;
            }
            if (!node.modifiers) {
                return;
            }
            let lastStatic, lastPrivate, lastProtected, lastDeclare;
            let flags = 0;
            for (let modifier of node.modifiers) {
                switch (modifier.kind) {
                    case 109 /* PublicKeyword */:
                    case 108 /* ProtectedKeyword */:
                    case 107 /* PrivateKeyword */:
                        let text;
                        if (modifier.kind === 109 /* PublicKeyword */) {
                            text = "public";
                        }
                        else if (modifier.kind === 108 /* ProtectedKeyword */) {
                            text = "protected";
                            lastProtected = modifier;
                        }
                        else {
                            text = "private";
                            lastPrivate = modifier;
                        }
                        if (flags & 112 /* AccessibilityModifier */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics.Accessibility_modifier_already_seen);
                        }
                        else if (flags & 128 /* Static */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_must_precede_1_modifier, text, "static");
                        }
                        else if (node.parent.kind === 206 /* ModuleBlock */ || node.parent.kind === 227 /* SourceFile */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, text);
                        }
                        flags |= ts.modifierToFlag(modifier.kind);
                        break;
                    case 110 /* StaticKeyword */:
                        if (flags & 128 /* Static */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "static");
                        }
                        else if (node.parent.kind === 206 /* ModuleBlock */ || node.parent.kind === 227 /* SourceFile */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_module_element, "static");
                        }
                        else if (node.kind === 129 /* Parameter */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "static");
                        }
                        flags |= 128 /* Static */;
                        lastStatic = modifier;
                        break;
                    case 78 /* ExportKeyword */:
                        if (flags & 1 /* Export */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "export");
                        }
                        else if (flags & 2 /* Ambient */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_must_precede_1_modifier, "export", "declare");
                        }
                        else if (node.parent.kind === 201 /* ClassDeclaration */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "export");
                        }
                        else if (node.kind === 129 /* Parameter */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "export");
                        }
                        flags |= 1 /* Export */;
                        break;
                    case 115 /* DeclareKeyword */:
                        if (flags & 2 /* Ambient */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_already_seen, "declare");
                        }
                        else if (node.parent.kind === 201 /* ClassDeclaration */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_class_element, "declare");
                        }
                        else if (node.kind === 129 /* Parameter */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics._0_modifier_cannot_appear_on_a_parameter, "declare");
                        }
                        else if (ts.isInAmbientContext(node.parent) && node.parent.kind === 206 /* ModuleBlock */) {
                            return grammarErrorOnNode(modifier, ts.Diagnostics.A_declare_modifier_cannot_be_used_in_an_already_ambient_context);
                        }
                        flags |= 2 /* Ambient */;
                        lastDeclare = modifier;
                        break;
                }
            }
            if (node.kind === 135 /* Constructor */) {
                if (flags & 128 /* Static */) {
                    return grammarErrorOnNode(lastStatic, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "static");
                }
                else if (flags & 64 /* Protected */) {
                    return grammarErrorOnNode(lastProtected, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "protected");
                }
                else if (flags & 32 /* Private */) {
                    return grammarErrorOnNode(lastPrivate, ts.Diagnostics._0_modifier_cannot_appear_on_a_constructor_declaration, "private");
                }
            }
            else if ((node.kind === 209 /* ImportDeclaration */ || node.kind === 208 /* ImportEqualsDeclaration */) && flags & 2 /* Ambient */) {
                return grammarErrorOnNode(lastDeclare, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_import_declaration, "declare");
            }
            else if (node.kind === 202 /* InterfaceDeclaration */ && flags & 2 /* Ambient */) {
                return grammarErrorOnNode(lastDeclare, ts.Diagnostics.A_declare_modifier_cannot_be_used_with_an_interface_declaration, "declare");
            }
            else if (node.kind === 129 /* Parameter */ && (flags & 112 /* AccessibilityModifier */) && ts.isBindingPattern(node.name)) {
                return grammarErrorOnNode(node, ts.Diagnostics.A_parameter_property_may_not_be_a_binding_pattern);
            }
        }
        function checkGrammarForDisallowedTrailingComma(list) {
            if (list && list.hasTrailingComma) {
                let start = list.end - ",".length;
                let end = list.end;
                let sourceFile = ts.getSourceFileOfNode(list[0]);
                return grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Trailing_comma_not_allowed);
            }
        }
        function checkGrammarTypeParameterList(node, typeParameters, file) {
            if (checkGrammarForDisallowedTrailingComma(typeParameters)) {
                return true;
            }
            if (typeParameters && typeParameters.length === 0) {
                let start = typeParameters.pos - "<".length;
                let end = ts.skipTrivia(file.text, typeParameters.end) + ">".length;
                return grammarErrorAtPos(file, start, end - start, ts.Diagnostics.Type_parameter_list_cannot_be_empty);
            }
        }
        function checkGrammarParameterList(parameters) {
            if (checkGrammarForDisallowedTrailingComma(parameters)) {
                return true;
            }
            let seenOptionalParameter = false;
            let parameterCount = parameters.length;
            for (let i = 0; i < parameterCount; i++) {
                let parameter = parameters[i];
                if (parameter.dotDotDotToken) {
                    if (i !== (parameterCount - 1)) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list);
                    }
                    if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.A_rest_parameter_cannot_be_optional);
                    }
                    if (parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.A_rest_parameter_cannot_have_an_initializer);
                    }
                }
                else if (parameter.questionToken || parameter.initializer) {
                    seenOptionalParameter = true;
                    if (parameter.questionToken && parameter.initializer) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.Parameter_cannot_have_question_mark_and_initializer);
                    }
                }
                else {
                    if (seenOptionalParameter) {
                        return grammarErrorOnNode(parameter.name, ts.Diagnostics.A_required_parameter_cannot_follow_an_optional_parameter);
                    }
                }
            }
        }
        function checkGrammarFunctionLikeDeclaration(node) {
            // Prevent cascading error by short-circuit
            let file = ts.getSourceFileOfNode(node);
            return checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarTypeParameterList(node, node.typeParameters, file) ||
                checkGrammarParameterList(node.parameters) || checkGrammarArrowFunction(node, file);
        }
        function checkGrammarArrowFunction(node, file) {
            if (node.kind === 163 /* ArrowFunction */) {
                let arrowFunction = node;
                let startLine = ts.getLineAndCharacterOfPosition(file, arrowFunction.equalsGreaterThanToken.pos).line;
                let endLine = ts.getLineAndCharacterOfPosition(file, arrowFunction.equalsGreaterThanToken.end).line;
                if (startLine !== endLine) {
                    return grammarErrorOnNode(arrowFunction.equalsGreaterThanToken, ts.Diagnostics.Line_terminator_not_permitted_before_arrow);
                }
            }
            return false;
        }
        function checkGrammarIndexSignatureParameters(node) {
            let parameter = node.parameters[0];
            if (node.parameters.length !== 1) {
                if (parameter) {
                    return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
                else {
                    return grammarErrorOnNode(node, ts.Diagnostics.An_index_signature_must_have_exactly_one_parameter);
                }
            }
            if (parameter.dotDotDotToken) {
                return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.An_index_signature_cannot_have_a_rest_parameter);
            }
            if (parameter.flags & 499 /* Modifier */) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_accessibility_modifier);
            }
            if (parameter.questionToken) {
                return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.An_index_signature_parameter_cannot_have_a_question_mark);
            }
            if (parameter.initializer) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_cannot_have_an_initializer);
            }
            if (!parameter.type) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_must_have_a_type_annotation);
            }
            if (parameter.type.kind !== 121 /* StringKeyword */ && parameter.type.kind !== 119 /* NumberKeyword */) {
                return grammarErrorOnNode(parameter.name, ts.Diagnostics.An_index_signature_parameter_type_must_be_string_or_number);
            }
            if (!node.type) {
                return grammarErrorOnNode(node, ts.Diagnostics.An_index_signature_must_have_a_type_annotation);
            }
        }
        function checkGrammarForIndexSignatureModifier(node) {
            if (node.flags & 499 /* Modifier */) {
                grammarErrorOnFirstToken(node, ts.Diagnostics.Modifiers_not_permitted_on_index_signature_members);
            }
        }
        function checkGrammarIndexSignature(node) {
            // Prevent cascading error by short-circuit
            return checkGrammarDecorators(node) || checkGrammarModifiers(node) || checkGrammarIndexSignatureParameters(node) || checkGrammarForIndexSignatureModifier(node);
        }
        function checkGrammarForAtLeastOneTypeArgument(node, typeArguments) {
            if (typeArguments && typeArguments.length === 0) {
                let sourceFile = ts.getSourceFileOfNode(node);
                let start = typeArguments.pos - "<".length;
                let end = ts.skipTrivia(sourceFile.text, typeArguments.end) + ">".length;
                return grammarErrorAtPos(sourceFile, start, end - start, ts.Diagnostics.Type_argument_list_cannot_be_empty);
            }
        }
        function checkGrammarTypeArguments(node, typeArguments) {
            return checkGrammarForDisallowedTrailingComma(typeArguments) ||
                checkGrammarForAtLeastOneTypeArgument(node, typeArguments);
        }
        function checkGrammarForOmittedArgument(node, arguments) {
            if (arguments) {
                let sourceFile = ts.getSourceFileOfNode(node);
                for (let arg of arguments) {
                    if (arg.kind === 175 /* OmittedExpression */) {
                        return grammarErrorAtPos(sourceFile, arg.pos, 0, ts.Diagnostics.Argument_expression_expected);
                    }
                }
            }
        }
        function checkGrammarArguments(node, arguments) {
            return checkGrammarForDisallowedTrailingComma(arguments) ||
                checkGrammarForOmittedArgument(node, arguments);
        }
        function checkGrammarHeritageClause(node) {
            let types = node.types;
            if (checkGrammarForDisallowedTrailingComma(types)) {
                return true;
            }
            if (types && types.length === 0) {
                let listType = ts.tokenToString(node.token);
                let sourceFile = ts.getSourceFileOfNode(node);
                return grammarErrorAtPos(sourceFile, types.pos, 0, ts.Diagnostics._0_list_cannot_be_empty, listType);
            }
        }
        function checkGrammarClassDeclarationHeritageClauses(node) {
            let seenExtendsClause = false;
            let seenImplementsClause = false;
            if (!checkGrammarDecorators(node) && !checkGrammarModifiers(node) && node.heritageClauses) {
                for (let heritageClause of node.heritageClauses) {
                    if (heritageClause.token === 79 /* ExtendsKeyword */) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_already_seen);
                        }
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_must_precede_implements_clause);
                        }
                        if (heritageClause.types.length > 1) {
                            return grammarErrorOnFirstToken(heritageClause.types[1], ts.Diagnostics.Classes_can_only_extend_a_single_class);
                        }
                        seenExtendsClause = true;
                    }
                    else {
                        ts.Debug.assert(heritageClause.token === 103 /* ImplementsKeyword */);
                        if (seenImplementsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.implements_clause_already_seen);
                        }
                        seenImplementsClause = true;
                    }
                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }
        }
        function checkGrammarInterfaceDeclaration(node) {
            let seenExtendsClause = false;
            if (node.heritageClauses) {
                for (let heritageClause of node.heritageClauses) {
                    if (heritageClause.token === 79 /* ExtendsKeyword */) {
                        if (seenExtendsClause) {
                            return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.extends_clause_already_seen);
                        }
                        seenExtendsClause = true;
                    }
                    else {
                        ts.Debug.assert(heritageClause.token === 103 /* ImplementsKeyword */);
                        return grammarErrorOnFirstToken(heritageClause, ts.Diagnostics.Interface_declaration_cannot_have_implements_clause);
                    }
                    // Grammar checking heritageClause inside class declaration
                    checkGrammarHeritageClause(heritageClause);
                }
            }
            return false;
        }
        function checkGrammarComputedPropertyName(node) {
            // If node is not a computedPropertyName, just skip the grammar checking
            if (node.kind !== 127 /* ComputedPropertyName */) {
                return false;
            }
            let computedPropertyName = node;
            if (computedPropertyName.expression.kind === 169 /* BinaryExpression */ && computedPropertyName.expression.operatorToken.kind === 23 /* CommaToken */) {
                return grammarErrorOnNode(computedPropertyName.expression, ts.Diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name);
            }
        }
        function checkGrammarForGenerator(node) {
            if (node.asteriskToken) {
                return grammarErrorOnNode(node.asteriskToken, ts.Diagnostics.Generators_are_not_currently_supported);
            }
        }
        function checkGrammarFunctionName(name) {
            // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a strict mode FunctionDeclaration or FunctionExpression (13.1))
            return checkGrammarEvalOrArgumentsInStrictMode(name, name);
        }
        function checkGrammarForInvalidQuestionMark(node, questionToken, message) {
            if (questionToken) {
                return grammarErrorOnNode(questionToken, message);
            }
        }
        function checkGrammarObjectLiteralExpression(node) {
            let seen = {};
            let Property = 1;
            let GetAccessor = 2;
            let SetAccesor = 4;
            let GetOrSetAccessor = GetAccessor | SetAccesor;
            let inStrictMode = (node.parserContextFlags & 1 /* StrictMode */) !== 0;
            for (let prop of node.properties) {
                let name = prop.name;
                if (prop.kind === 175 /* OmittedExpression */ ||
                    name.kind === 127 /* ComputedPropertyName */) {
                    // If the name is not a ComputedPropertyName, the grammar checking will skip it
                    checkGrammarComputedPropertyName(name);
                    continue;
                }
                // ECMA-262 11.1.5 Object Initialiser
                // If previous is not undefined then throw a SyntaxError exception if any of the following conditions are true
                // a.This production is contained in strict code and IsDataDescriptor(previous) is true and
                // IsDataDescriptor(propId.descriptor) is true.
                //    b.IsDataDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true.
                //    c.IsAccessorDescriptor(previous) is true and IsDataDescriptor(propId.descriptor) is true.
                //    d.IsAccessorDescriptor(previous) is true and IsAccessorDescriptor(propId.descriptor) is true
                // and either both previous and propId.descriptor have[[Get]] fields or both previous and propId.descriptor have[[Set]] fields
                let currentKind;
                if (prop.kind === 224 /* PropertyAssignment */ || prop.kind === 225 /* ShorthandPropertyAssignment */) {
                    // Grammar checking for computedPropertName and shorthandPropertyAssignment
                    checkGrammarForInvalidQuestionMark(prop, prop.questionToken, ts.Diagnostics.An_object_member_cannot_be_declared_optional);
                    if (name.kind === 7 /* NumericLiteral */) {
                        checkGrammarNumbericLiteral(name);
                    }
                    currentKind = Property;
                }
                else if (prop.kind === 134 /* MethodDeclaration */) {
                    currentKind = Property;
                }
                else if (prop.kind === 136 /* GetAccessor */) {
                    currentKind = GetAccessor;
                }
                else if (prop.kind === 137 /* SetAccessor */) {
                    currentKind = SetAccesor;
                }
                else {
                    ts.Debug.fail("Unexpected syntax kind:" + prop.kind);
                }
                if (!ts.hasProperty(seen, name.text)) {
                    seen[name.text] = currentKind;
                }
                else {
                    let existingKind = seen[name.text];
                    if (currentKind === Property && existingKind === Property) {
                        if (inStrictMode) {
                            grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_multiple_properties_with_the_same_name_in_strict_mode);
                        }
                    }
                    else if ((currentKind & GetOrSetAccessor) && (existingKind & GetOrSetAccessor)) {
                        if (existingKind !== GetOrSetAccessor && currentKind !== existingKind) {
                            seen[name.text] = currentKind | existingKind;
                        }
                        else {
                            return grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_multiple_get_Slashset_accessors_with_the_same_name);
                        }
                    }
                    else {
                        return grammarErrorOnNode(name, ts.Diagnostics.An_object_literal_cannot_have_property_and_accessor_with_the_same_name);
                    }
                }
            }
        }
        function checkGrammarForInOrForOfStatement(forInOrOfStatement) {
            if (checkGrammarStatementInAmbientContext(forInOrOfStatement)) {
                return true;
            }
            if (forInOrOfStatement.initializer.kind === 199 /* VariableDeclarationList */) {
                let variableList = forInOrOfStatement.initializer;
                if (!checkGrammarVariableDeclarationList(variableList)) {
                    if (variableList.declarations.length > 1) {
                        let diagnostic = forInOrOfStatement.kind === 187 /* ForInStatement */
                            ? ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement
                            : ts.Diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement;
                        return grammarErrorOnFirstToken(variableList.declarations[1], diagnostic);
                    }
                    let firstDeclaration = variableList.declarations[0];
                    if (firstDeclaration.initializer) {
                        let diagnostic = forInOrOfStatement.kind === 187 /* ForInStatement */
                            ? ts.Diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer
                            : ts.Diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer;
                        return grammarErrorOnNode(firstDeclaration.name, diagnostic);
                    }
                    if (firstDeclaration.type) {
                        let diagnostic = forInOrOfStatement.kind === 187 /* ForInStatement */
                            ? ts.Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_use_a_type_annotation
                            : ts.Diagnostics.The_left_hand_side_of_a_for_of_statement_cannot_use_a_type_annotation;
                        return grammarErrorOnNode(firstDeclaration, diagnostic);
                    }
                }
            }
            return false;
        }
        function checkGrammarAccessor(accessor) {
            let kind = accessor.kind;
            if (languageVersion < 1 /* ES5 */) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.Accessors_are_only_available_when_targeting_ECMAScript_5_and_higher);
            }
            else if (ts.isInAmbientContext(accessor)) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_be_declared_in_an_ambient_context);
            }
            else if (accessor.body === undefined) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(accessor), accessor.end - 1, ";".length, ts.Diagnostics._0_expected, "{");
            }
            else if (accessor.typeParameters) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.An_accessor_cannot_have_type_parameters);
            }
            else if (kind === 136 /* GetAccessor */ && accessor.parameters.length) {
                return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_get_accessor_cannot_have_parameters);
            }
            else if (kind === 137 /* SetAccessor */) {
                if (accessor.type) {
                    return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_cannot_have_a_return_type_annotation);
                }
                else if (accessor.parameters.length !== 1) {
                    return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_must_have_exactly_one_parameter);
                }
                else {
                    let parameter = accessor.parameters[0];
                    if (parameter.dotDotDotToken) {
                        return grammarErrorOnNode(parameter.dotDotDotToken, ts.Diagnostics.A_set_accessor_cannot_have_rest_parameter);
                    }
                    else if (parameter.flags & 499 /* Modifier */) {
                        return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_parameter_property_is_only_allowed_in_a_constructor_implementation);
                    }
                    else if (parameter.questionToken) {
                        return grammarErrorOnNode(parameter.questionToken, ts.Diagnostics.A_set_accessor_cannot_have_an_optional_parameter);
                    }
                    else if (parameter.initializer) {
                        return grammarErrorOnNode(accessor.name, ts.Diagnostics.A_set_accessor_parameter_cannot_have_an_initializer);
                    }
                }
            }
        }
        function checkGrammarForNonSymbolComputedProperty(node, message) {
            if (node.kind === 127 /* ComputedPropertyName */ && !ts.isWellKnownSymbolSyntactically(node.expression)) {
                return grammarErrorOnNode(node, message);
            }
        }
        function checkGrammarMethod(node) {
            if (checkGrammarDisallowedModifiersInBlockOrObjectLiteralExpression(node) ||
                checkGrammarFunctionLikeDeclaration(node) ||
                checkGrammarForGenerator(node)) {
                return true;
            }
            if (node.parent.kind === 154 /* ObjectLiteralExpression */) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                else if (node.body === undefined) {
                    return grammarErrorAtPos(getSourceFile(node), node.end - 1, ";".length, ts.Diagnostics._0_expected, "{");
                }
            }
            if (node.parent.kind === 201 /* ClassDeclaration */) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional)) {
                    return true;
                }
                // Technically, computed properties in ambient contexts is disallowed
                // for property declarations and accessors too, not just methods.
                // However, property declarations disallow computed names in general,
                // and accessors are not allowed in ambient contexts in general,
                // so this error only really matters for methods.
                if (ts.isInAmbientContext(node)) {
                    return checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_an_ambient_context_must_directly_refer_to_a_built_in_symbol);
                }
                else if (!node.body) {
                    return checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_a_method_overload_must_directly_refer_to_a_built_in_symbol);
                }
            }
            else if (node.parent.kind === 202 /* InterfaceDeclaration */) {
                return checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol);
            }
            else if (node.parent.kind === 145 /* TypeLiteral */) {
                return checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol);
            }
        }
        function isIterationStatement(node, lookInLabeledStatements) {
            switch (node.kind) {
                case 186 /* ForStatement */:
                case 187 /* ForInStatement */:
                case 188 /* ForOfStatement */:
                case 184 /* DoStatement */:
                case 185 /* WhileStatement */:
                    return true;
                case 194 /* LabeledStatement */:
                    return lookInLabeledStatements && isIterationStatement(node.statement, lookInLabeledStatements);
            }
            return false;
        }
        function checkGrammarBreakOrContinueStatement(node) {
            let current = node;
            while (current) {
                if (ts.isFunctionLike(current)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Jump_target_cannot_cross_function_boundary);
                }
                switch (current.kind) {
                    case 194 /* LabeledStatement */:
                        if (node.label && current.label.text === node.label.text) {
                            // found matching label - verify that label usage is correct
                            // continue can only target labels that are on iteration statements
                            let isMisplacedContinueLabel = node.kind === 189 /* ContinueStatement */
                                && !isIterationStatement(current.statement, true);
                            if (isMisplacedContinueLabel) {
                                return grammarErrorOnNode(node, ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement);
                            }
                            return false;
                        }
                        break;
                    case 193 /* SwitchStatement */:
                        if (node.kind === 190 /* BreakStatement */ && !node.label) {
                            // unlabeled break within switch statement - ok
                            return false;
                        }
                        break;
                    default:
                        if (isIterationStatement(current, false) && !node.label) {
                            // unlabeled break or continue within iteration statement - ok
                            return false;
                        }
                        break;
                }
                current = current.parent;
            }
            if (node.label) {
                let message = node.kind === 190 /* BreakStatement */
                    ? ts.Diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement
                    : ts.Diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message);
            }
            else {
                let message = node.kind === 190 /* BreakStatement */
                    ? ts.Diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement
                    : ts.Diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement;
                return grammarErrorOnNode(node, message);
            }
        }
        function checkGrammarBindingElement(node) {
            if (node.dotDotDotToken) {
                let elements = node.parent.elements;
                if (node !== elements[elements.length - 1]) {
                    return grammarErrorOnNode(node, ts.Diagnostics.A_rest_element_must_be_last_in_an_array_destructuring_pattern);
                }
                if (node.initializer) {
                    // Error on equals token which immediate precedes the initializer
                    return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.initializer.pos - 1, 1, ts.Diagnostics.A_rest_element_cannot_have_an_initializer);
                }
            }
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code
            // and its Identifier is eval or arguments
            return checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
        }
        function checkGrammarVariableDeclaration(node) {
            if (node.parent.parent.kind !== 187 /* ForInStatement */ && node.parent.parent.kind !== 188 /* ForOfStatement */) {
                if (ts.isInAmbientContext(node)) {
                    if (node.initializer) {
                        // Error on equals token which immediate precedes the initializer
                        let equalsTokenLength = "=".length;
                        return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.initializer.pos - equalsTokenLength, equalsTokenLength, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
                    }
                }
                else if (!node.initializer) {
                    if (ts.isBindingPattern(node.name) && !ts.isBindingPattern(node.parent)) {
                        return grammarErrorOnNode(node, ts.Diagnostics.A_destructuring_declaration_must_have_an_initializer);
                    }
                    if (ts.isConst(node)) {
                        return grammarErrorOnNode(node, ts.Diagnostics.const_declarations_must_be_initialized);
                    }
                }
            }
            let checkLetConstNames = languageVersion >= 2 /* ES6 */ && (ts.isLet(node) || ts.isConst(node));
            // 1. LexicalDeclaration : LetOrConst BindingList ;
            // It is a Syntax Error if the BoundNames of BindingList contains "let".
            // 2. ForDeclaration: ForDeclaration : LetOrConst ForBinding
            // It is a Syntax Error if the BoundNames of ForDeclaration contains "let".
            // It is a SyntaxError if a VariableDeclaration or VariableDeclarationNoIn occurs within strict code
            // and its Identifier is eval or arguments
            return (checkLetConstNames && checkGrammarNameInLetOrConstDeclarations(node.name)) ||
                checkGrammarEvalOrArgumentsInStrictMode(node, node.name);
        }
        function checkGrammarNameInLetOrConstDeclarations(name) {
            if (name.kind === 65 /* Identifier */) {
                if (name.text === "let") {
                    return grammarErrorOnNode(name, ts.Diagnostics.let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations);
                }
            }
            else {
                let elements = name.elements;
                for (let element of elements) {
                    if (element.kind !== 175 /* OmittedExpression */) {
                        checkGrammarNameInLetOrConstDeclarations(element.name);
                    }
                }
            }
        }
        function checkGrammarVariableDeclarationList(declarationList) {
            let declarations = declarationList.declarations;
            if (checkGrammarForDisallowedTrailingComma(declarationList.declarations)) {
                return true;
            }
            if (!declarationList.declarations.length) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(declarationList), declarations.pos, declarations.end - declarations.pos, ts.Diagnostics.Variable_declaration_list_cannot_be_empty);
            }
        }
        function allowLetAndConstDeclarations(parent) {
            switch (parent.kind) {
                case 183 /* IfStatement */:
                case 184 /* DoStatement */:
                case 185 /* WhileStatement */:
                case 192 /* WithStatement */:
                case 186 /* ForStatement */:
                case 187 /* ForInStatement */:
                case 188 /* ForOfStatement */:
                    return false;
                case 194 /* LabeledStatement */:
                    return allowLetAndConstDeclarations(parent.parent);
            }
            return true;
        }
        function checkGrammarForDisallowedLetOrConstStatement(node) {
            if (!allowLetAndConstDeclarations(node.parent)) {
                if (ts.isLet(node.declarationList)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                }
                else if (ts.isConst(node.declarationList)) {
                    return grammarErrorOnNode(node, ts.Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                }
            }
        }
        function isIntegerLiteral(expression) {
            if (expression.kind === 167 /* PrefixUnaryExpression */) {
                let unaryExpression = expression;
                if (unaryExpression.operator === 33 /* PlusToken */ || unaryExpression.operator === 34 /* MinusToken */) {
                    expression = unaryExpression.operand;
                }
            }
            if (expression.kind === 7 /* NumericLiteral */) {
                // Allows for scientific notation since literalExpression.text was formed by
                // coercing a number to a string. Sometimes this coercion can yield a string
                // in scientific notation.
                // We also don't need special logic for hex because a hex integer is converted
                // to decimal when it is coerced.
                return /^[0-9]+([eE]\+?[0-9]+)?$/.test(expression.text);
            }
            return false;
        }
        function checkGrammarEnumDeclaration(enumDecl) {
            let enumIsConst = (enumDecl.flags & 8192 /* Const */) !== 0;
            let hasError = false;
            // skip checks below for const enums  - they allow arbitrary initializers as long as they can be evaluated to constant expressions.
            // since all values are known in compile time - it is not necessary to check that constant enum section precedes computed enum members.
            if (!enumIsConst) {
                let inConstantEnumMemberSection = true;
                let inAmbientContext = ts.isInAmbientContext(enumDecl);
                for (let node of enumDecl.members) {
                    // Do not use hasDynamicName here, because that returns false for well known symbols.
                    // We want to perform checkComputedPropertyName for all computed properties, including
                    // well known symbols.
                    if (node.name.kind === 127 /* ComputedPropertyName */) {
                        hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Computed_property_names_are_not_allowed_in_enums);
                    }
                    else if (inAmbientContext) {
                        if (node.initializer && !isIntegerLiteral(node.initializer)) {
                            hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Ambient_enum_elements_can_only_have_integer_literal_initializers) || hasError;
                        }
                    }
                    else if (node.initializer) {
                        inConstantEnumMemberSection = isIntegerLiteral(node.initializer);
                    }
                    else if (!inConstantEnumMemberSection) {
                        hasError = grammarErrorOnNode(node.name, ts.Diagnostics.Enum_member_must_have_initializer) || hasError;
                    }
                }
            }
            return hasError;
        }
        function hasParseDiagnostics(sourceFile) {
            return sourceFile.parseDiagnostics.length > 0;
        }
        function grammarErrorOnFirstToken(node, message, arg0, arg1, arg2) {
            let sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                let span = ts.getSpanOfTokenAtPosition(sourceFile, node.pos);
                diagnostics.add(ts.createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2));
                return true;
            }
        }
        function grammarErrorAtPos(sourceFile, start, length, message, arg0, arg1, arg2) {
            if (!hasParseDiagnostics(sourceFile)) {
                diagnostics.add(ts.createFileDiagnostic(sourceFile, start, length, message, arg0, arg1, arg2));
                return true;
            }
        }
        function grammarErrorOnNode(node, message, arg0, arg1, arg2) {
            let sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                diagnostics.add(ts.createDiagnosticForNode(node, message, arg0, arg1, arg2));
                return true;
            }
        }
        function checkGrammarEvalOrArgumentsInStrictMode(contextNode, name) {
            if (name && name.kind === 65 /* Identifier */) {
                let identifier = name;
                if (contextNode && (contextNode.parserContextFlags & 1 /* StrictMode */) && ts.isEvalOrArgumentsIdentifier(identifier)) {
                    let nameText = ts.declarationNameToString(identifier);
                    // We check first if the name is inside class declaration or class expression; if so give explicit message
                    // otherwise report generic error message.
                    // reportGrammarErrorInClassDeclaration only return true if grammar error is successfully reported and false otherwise
                    let reportErrorInClassDeclaration = reportStrictModeGrammarErrorInClassDeclaration(identifier, ts.Diagnostics.Invalid_use_of_0_Class_definitions_are_automatically_in_strict_mode, nameText);
                    if (!reportErrorInClassDeclaration) {
                        return grammarErrorOnNode(identifier, ts.Diagnostics.Invalid_use_of_0_in_strict_mode, nameText);
                    }
                    return reportErrorInClassDeclaration;
                }
            }
        }
        function checkGrammarConstructorTypeParameters(node) {
            if (node.typeParameters) {
                return grammarErrorAtPos(ts.getSourceFileOfNode(node), node.typeParameters.pos, node.typeParameters.end - node.typeParameters.pos, ts.Diagnostics.Type_parameters_cannot_appear_on_a_constructor_declaration);
            }
        }
        function checkGrammarConstructorTypeAnnotation(node) {
            if (node.type) {
                return grammarErrorOnNode(node.type, ts.Diagnostics.Type_annotation_cannot_appear_on_a_constructor_declaration);
            }
        }
        function checkGrammarProperty(node) {
            if (node.parent.kind === 201 /* ClassDeclaration */) {
                if (checkGrammarForInvalidQuestionMark(node, node.questionToken, ts.Diagnostics.A_class_member_cannot_be_declared_optional) ||
                    checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_a_class_property_declaration_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }
            else if (node.parent.kind === 202 /* InterfaceDeclaration */) {
                if (checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_an_interface_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }
            else if (node.parent.kind === 145 /* TypeLiteral */) {
                if (checkGrammarForNonSymbolComputedProperty(node.name, ts.Diagnostics.A_computed_property_name_in_a_type_literal_must_directly_refer_to_a_built_in_symbol)) {
                    return true;
                }
            }
            if (ts.isInAmbientContext(node) && node.initializer) {
                return grammarErrorOnFirstToken(node.initializer, ts.Diagnostics.Initializers_are_not_allowed_in_ambient_contexts);
            }
        }
        function checkGrammarTopLevelElementForRequiredDeclareModifier(node) {
            // A declare modifier is required for any top level .d.ts declaration except export=, export default,
            // interfaces and imports categories:
            //
            //  DeclarationElement:
            //     ExportAssignment
            //     export_opt   InterfaceDeclaration
            //     export_opt   ImportDeclaration
            //     export_opt   ExternalImportDeclaration
            //     export_opt   AmbientDeclaration
            //
            if (node.kind === 202 /* InterfaceDeclaration */ ||
                node.kind === 209 /* ImportDeclaration */ ||
                node.kind === 208 /* ImportEqualsDeclaration */ ||
                node.kind === 215 /* ExportDeclaration */ ||
                node.kind === 214 /* ExportAssignment */ ||
                (node.flags & 2 /* Ambient */) ||
                (node.flags & (1 /* Export */ | 256 /* Default */))) {
                return false;
            }
            return grammarErrorOnFirstToken(node, ts.Diagnostics.A_declare_modifier_is_required_for_a_top_level_declaration_in_a_d_ts_file);
        }
        function checkGrammarTopLevelElementsForRequiredDeclareModifier(file) {
            for (let decl of file.statements) {
                if (ts.isDeclaration(decl) || decl.kind === 180 /* VariableStatement */) {
                    if (checkGrammarTopLevelElementForRequiredDeclareModifier(decl)) {
                        return true;
                    }
                }
            }
        }
        function checkGrammarSourceFile(node) {
            return ts.isInAmbientContext(node) && checkGrammarTopLevelElementsForRequiredDeclareModifier(node);
        }
        function checkGrammarStatementInAmbientContext(node) {
            if (ts.isInAmbientContext(node)) {
                // An accessors is already reported about the ambient context
                if (isAccessor(node.parent.kind)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = true;
                }
                // Find containing block which is either Block, ModuleBlock, SourceFile
                let links = getNodeLinks(node);
                if (!links.hasReportedStatementInAmbientContext && ts.isFunctionLike(node.parent)) {
                    return getNodeLinks(node).hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, ts.Diagnostics.An_implementation_cannot_be_declared_in_ambient_contexts);
                }
                // We are either parented by another statement, or some sort of block.
                // If we're in a block, we only want to really report an error once
                // to prevent noisyness.  So use a bit on the block to indicate if
                // this has already been reported, and don't report if it has.
                //
                if (node.parent.kind === 179 /* Block */ || node.parent.kind === 206 /* ModuleBlock */ || node.parent.kind === 227 /* SourceFile */) {
                    let links = getNodeLinks(node.parent);
                    // Check if the containing block ever report this error
                    if (!links.hasReportedStatementInAmbientContext) {
                        return links.hasReportedStatementInAmbientContext = grammarErrorOnFirstToken(node, ts.Diagnostics.Statements_are_not_allowed_in_ambient_contexts);
                    }
                }
                else {
                }
            }
        }
        function checkGrammarNumbericLiteral(node) {
            // Grammar checking
            if (node.flags & 16384 /* OctalLiteral */) {
                if (node.parserContextFlags & 1 /* StrictMode */) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_allowed_in_strict_mode);
                }
                else if (languageVersion >= 1 /* ES5 */) {
                    return grammarErrorOnNode(node, ts.Diagnostics.Octal_literals_are_not_available_when_targeting_ECMAScript_5_and_higher);
                }
            }
        }
        function grammarErrorAfterFirstToken(node, message, arg0, arg1, arg2) {
            let sourceFile = ts.getSourceFileOfNode(node);
            if (!hasParseDiagnostics(sourceFile)) {
                let span = ts.getSpanOfTokenAtPosition(sourceFile, node.pos);
                diagnostics.add(ts.createFileDiagnostic(sourceFile, ts.textSpanEnd(span), 0, message, arg0, arg1, arg2));
                return true;
            }
        }
        initializeTypeChecker();
        return checker;
    }
    ts.createTypeChecker = createTypeChecker;
})(ts || (ts = {}));
//# sourceMappingURL=checker.js.map