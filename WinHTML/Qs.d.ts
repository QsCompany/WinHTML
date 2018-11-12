declare enum ModuleType {
    Namespace = 0,
    Class = 1,
    Function = 2,
}
declare class ptr<T> {
    value: T;
}
declare class Trace {
    Error: Error;
    Trace: string;
}
declare class Logger {
    static Errors: List<Trace>;
    static States: Dictionary<string, List<Object>>;
}
declare class space {
    _name: string;
    _loaded: boolean;
    parent: ptr<mm>;
    moduleInitializer: List<(define, require: <T extends Function>(string) => T) => void>;
}
declare var __extends: any;
declare class code implements Function {
    constructor();
    apply(thisArg: any, argArray?: any): any;
    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    call(thisArg: any, ...argArray: any[]): any;
    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    bind(thisArg: any, ...argArray: any[]): any;
    prototype: any;
    length: number;
    arguments: any;
    caller: Function;
}
declare class data extends space {
    usings: mm[];
    type: ModuleType;
    dataScop: {};
    public: List<any>;
    private: List<any>;
    constructor();
}
declare class mm {
    private static _root;
    static root: mm;
    static currentContext: List<mm>;
    private static allModules;
    Pdb: data;
    constructor(name: string, parent: mm, type: ModuleType);
    private getPathOrCreate(paths, isNew, type);
    private getPath(paths);
    Depth: number;
    private excecutePath();
    ExcecuteScop(): Object;
    private addProperty(name, value);
    static empty(): void;
    define(moduleName: string, initializer: (define, require: <T extends Function>(string) => T) => void, type: ModuleType): mm;
    using(assemblyName: string): mm;
    require<T extends Function>(moduleName: string, allsubs?: boolean): Object;
    private static fullyDownloaded;
    private static needforDownload;
    private requireall();
}
declare function define(moduleName: string, initializer: (define, require: <T extends Function>(string) => T) => void, type: ModuleType): mm;
declare function require<T extends Function>(moduleName: string, allsubs?: boolean): T;
declare function using(namespace: string): mm;
declare function room(className: string, fn: (define, require: <T extends Function>(string) => T) => Function): void;
declare function namespace(name: string, initializer: (define, require: <T extends Function>(string) => T) => void): void;
declare var system: Function;
declare var x: any;
declare var x: any;
declare var x: any;
declare var w: any;
declare function QsHelp(): void;
