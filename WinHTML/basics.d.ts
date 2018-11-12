declare var exports: any;
declare function $id(name: string, pt: HTMLElement, ret: HTMLElement[]): void;
declare function $tag(name: string, pt: HTMLElement, ret: HTMLElement[]): void;
declare function $class(name: string, pt: HTMLElement, ret: HTMLElement[]): void;
declare function $(name: string, pt?: HTMLElement): HTMLElement[];
declare class Stack<T> {
    private _length;
    private get_length;
    private set_length;
    length: number;
    private list;
    push(v: T): Stack<T>;
    pop(): T;
    reset(): Stack<T>;
    constructor(items: any);
    indexOf(v: T): number;
    exist(v: T): boolean;
    getList(): List<T>;
    SetLength(get: () => number, set: (i: number) => void): Stack<T>;
}
declare class List<T> {
    private list;
    private _length;
    private get_length;
    private set_length;
    length: number;
    Last: T;
    First: T;
    checkIndex(i: number): boolean;
    getStack(): Stack<T>;
    SetLength(get: () => number, set: (i: number) => void): List<T>;
    contains(value: T): boolean;
    shift(): T;
    constructor(items: any);
    push(v: T): void;
    pop(): T;
    get(i: number): T;
    set(i: number, v: T): List<T>;
    merge(lst: List<T>): void;
    removeAt(i: number): boolean;
    insertRangeAt(i: number, arr: T[]): boolean;
    insertAt(i: number, v: T): boolean;
    indexOf(v: T): number;
    clear(): void;
    foreach<P>(callBack: (i: number, value: T) => boolean, ret?: P): P;
    copy(): List<T>;
    remove(v: T): boolean;
}
declare class stack {
    private static list;
    static begin(_this: any, _upper: any): void;
    static end(): void;
}
declare enum Contraint {
    Direct = 0,
    Undirect = 1,
    PointLength = 0,
    PointPoint = 2,
    __Default = 0,
    __DirectPointPoint = 2,
    __UndiirectPointPoint = 3,
    __UndirectPointLength = 1,
}
declare enum LineType {
    PointLength = 0,
    PointPoint = 1,
}
declare enum Orientation {
    Direct = 0,
    Undirect = 1,
}
interface iHTMLProperty {
    Set(el: HTMLElement): void;
}
declare class ONValue<T> {
    Old: T;
    New: T;
    constructor(oldValue: T, newValue: T);
}
declare class KeyValue<T, P> {
    key: T;
    value: P;
    constructor(key: T, value: P);
}
declare class Dictionary<T, P> {
    private list;
    private getKeyValue(key);
    Add(key: T, value: P): void;
    Get(key: T): P;
    contains(key: T): boolean;
}
declare class Signature {
    private args;
    constructor(_argsClass: Function[]);
    static isType(_class: Function): boolean;
    private Add(_argsClass);
    compatible(args: Object[]): boolean;
    static Any: AnySignature;
}
declare class delegate {
    private invokes;
    private static store;
    private _signature;
    constructor(sign: Signature, isRecursive?: boolean);
    private IsRecursive;
    private IsOn;
    Merge(fun: any): void;
    Invoke(a: any[]): Object;
    private _invoke(f, args);
    private static getExceFun(funName, i);
}
declare class AnySignature extends Signature {
    constructor();
}
declare class Couple<T> {
    x: T;
    y: T;
    constructor(x: T, y: T);
}
declare class Point extends Couple<number> implements iHTMLProperty {
    constructor(x: number, y: number);
    Left: number;
    Top: number;
    private event;
    OnChange: delegate;
    Set(el: HTMLElement): void;
}
declare class Size extends Couple<number> {
    constructor(w: number, h: number);
    Width: number;
    Height: number;
    private event;
    OnChange: delegate;
}
declare class Region implements iHTMLProperty {
    private _l;
    private _s;
    constructor(loc: Point, size: Size);
    Location: Point;
    Size: Size;
    private event;
    OnChange: delegate;
    Set(el: HTMLElement): void;
    private static _wr;
    static WindowRegion: Region;
    CalculateRegion(_this: Site): Region;
}
declare class Site {
    private x;
    private y;
    private w;
    private h;
    private _Parent;
    private children;
    private event;
    OnChange(f: Function): void;
    constructor(parent: Site);
    private r;
    private Changed;
    Rectangle: Region;
    Parent: Site;
    private __HorizontalLineType;
    private __VerticalLineType;
    private __HorizontalOrient;
    private __VerticalOrient;
    HorizontalLineType: LineType;
    VerticalLineType: LineType;
    HorizontalOrient: Orientation;
    VerticalOrient: Orientation;
    private _();
    HorizontalContraint: Contraint;
    VerticalContraint: Contraint;
    Contraint(hc: Contraint, vc: Contraint): void;
    Left: Mesure;
    Right: Mesure;
    Top: Mesure;
    Buttom: Mesure;
    Width: Mesure;
    Height: Mesure;
    toString(): string;
}
declare class virtualMethod {
    base: virtualMethod;
    method: Function;
}
declare enum MesureUnit {
    Pixel = 0,
    Percent = 1,
    Auto = 2,
}
declare class Mesure {
    Unit: MesureUnit;
    private _val;
    val: number;
    constructor(val: number, unit?: MesureUnit);
    Minus(b: Mesure): Mesure;
    Plus(b: Mesure): Mesure;
    Abs(): Mesure;
    toString(): string;
    toLocaleString(): string;
}
declare class Line1D {
    Orientation: Orientation;
    Val: Mesure;
    repere: Line1D;
    frepere: Line1D;
    RealValue: number;
    constructor(val: number, unit: MesureUnit, Orientation: Orientation);
    toString(): string;
    setRepere(repere: Line1D, frepere?: Line1D): void;
}
declare class NotImplimented implements Error {
    name: string;
    message: string;
    stack: any;
    constructor(name?: string, message?: string);
}
declare class Grid {
    Depend: boolean;
    Sites: Site[];
    LineCount: number;
    ColumnCount: number;
    private Columns;
    private Rows;
    static _Left: Line1D;
    static _Top: Line1D;
    static _Right: Line1D;
    static _Buttom: Line1D;
    constructor(Depend?: boolean);
    SetRow(val: number, unit: MesureUnit, orient?: Orientation): Line1D;
    SetColumn(val: number, unit: MesureUnit, orient?: Orientation): Line1D;
    private setHSiteUndepend(s, c1, c2);
    private setVSiteUndepend(s, r1, r2);
    SetSite(s: Site, row: number, col: number, nrow?: number, ncol?: number): boolean;
    SetRegion(reg: Region, row: number, col: number, nrow?: number, ncol?: number): boolean;
    swap(t: any): void;
    SetDependSite(s: Site): void;
    _Rows: List<Line1D>;
    _Columns: List<Line1D>;
    _SRows: Stack<Line1D>;
    _SColumns: Stack<Line1D>;
    Validate(isRow: boolean): boolean;
    static Validate(array: List<Line1D>): List<Line1D>;
    static getNext(v: any[]): number;
    private static reaRange(array, traited, stackOnProssecing?, index?, validatet?);
    Update(s: Size): void;
    static correct(v: Line1D, s_width: number): boolean;
}
declare var setRepere: (lst: List<Line1D>, pr: Line1D, chlds: number[]) => void;
declare var Test1: () => Grid;
declare var Test: () => List<Line1D>;
declare var Remove: <T>(a: T[], e: any) => void;
