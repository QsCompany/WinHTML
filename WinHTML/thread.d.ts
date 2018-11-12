/**
  * Excecute a function synchrounouns with the the global script
  * @param uriComponent A value representing an encoded URI component.
  */
declare class Thread {
    private timeout;
    static threads: List<Thread>;
    private hdc;
    private fn;
    /**
      * Excecute a function synchrounouns with the the global script
      * @param fn representing a short life function.
      */
    constructor(fn: Function, timeout?: number);
    start(): void;
    stop(): void;
}
declare enum Events {
    ScriptFileDownloaded = 0,
    CSSFileDownloaded = 1,
}
declare class EventStore {
    Event: Events;
    fn: (e: Event, data: Object) => void;
    data: Object;
    constructor(Event: Events, fn: (e: Event, data: Object) => void, data: Object);
}
declare class dsi {
    prg: Program;
    toimportscripts: List<HTMLScriptElement>;
    hash: HTMLElement;
    constructor(prg: Program);
}
declare class errorStack {
    fun: string;
    source: string;
    line: number;
    column: number;
    constructor(fun: string, source: string, line: number, column: number);
}
declare class trace {
    constructor(elemineLevels?: number);
    fun: string;
    source: string;
    line: number;
    column: number;
    private static w;
    private parse(_trace, elemineLevels?);
}
declare class Secure {
    constructor();
    private static isthrust(o, ot, ft);
    static setProperty(o: Object, name: string, get: () => any, set: (v: any) => void): void;
}
declare class Program {
    private events;
    private mythread;
    private hash;
    private scripts;
    private static dsis;
    constructor();
    static ISR(): void;
    importScripts(scripts: string[]): void;
    private observer();
    private dispatchEvent(event, e);
    addEventListener<T>(event: Events, fn: (e: Event, data: Object) => void, data: T): void;
}
