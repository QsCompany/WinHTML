declare enum ModuleType {
    Namespace = 0,
    Class = 1,
    Function = 2,
}
declare class out {
    public value: any;
}
declare class mm {
    static root: mm;
    private static allModules;
    private usings;
    public _name: string;
    public _loaded: boolean;
    public type: ModuleType;
    public parent: mm;
    public parentScop: mm;
    public moduleInitializer: (currentAssembly: mm, define: any, require: <T extends Function>(string: any) => T) => Function;
    public sous: List<mm>;
    constructor(name: string, parent: mm);
    private getPathOrCreate(paths, isNew);
    private getPath(paths);
    private addProperty(name, value);
    public Excecute(f: Function, args: Object[]): void;
    public define(moduleName: string, initializer: (currentAssembly: mm, define: any, require: <T extends Function>(string: any) => T) => Function): mm;
    public using(assemblyName: string): mm;
    public require<T extends Function>(moduleName: string): mm;
}
declare function define(moduleName: string, initializer: (currentAssembly: mm, define: any, require: <T extends Function>(string: any) => T) => Function): mm;
declare function using(namespace: string): mm;
declare function numespace(name: string, initializer: (currentAssembly: mm, define: any, require: <T extends Function>(string: any) => T) => Function): void;
declare var t: mm;
declare class mapper {
    static mapper: mapper;
}
