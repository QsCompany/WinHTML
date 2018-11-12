/// <reference path="binder.d.ts" />
declare module ts {
    function getNodeId(node: Node): number;
    let checkTime: number;
    function getSymbolId(symbol: Symbol): number;
    function createTypeChecker(host: TypeCheckerHost, produceDiagnostics: boolean): TypeChecker;
}
