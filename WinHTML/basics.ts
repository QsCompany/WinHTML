var exports = exports || {};

function $id(name: string, pt: HTMLElement, ret: HTMLElement[]) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = <HTMLElement> pt.children.item(i);
        if (!(c instanceof HTMLElement)) continue;
        if (c.id.toLowerCase() == name) ret.push(c);
        $id(name, c, ret);
    }
}

function $tag(name: string, pt: HTMLElement, ret: HTMLElement[]) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = <HTMLElement> pt.children.item(i);
        if (!(c instanceof HTMLElement)) continue;
        if (c.tagName == name) ret.push(c);
        $tag(name, c, ret);
    }
}
function $class(name: string, pt: HTMLElement, ret: HTMLElement[]) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = <HTMLElement> pt.children.item(i);
        if (!(c instanceof HTMLElement)) continue;
        if (c.classList.contains(name)) ret.push(c);
        $class(name, c, ret);
    }
}
function $(name: string, pt?: HTMLElement): HTMLElement[] {
    var s = name[0];
    pt = pt || document.documentElement;
    var ret = <HTMLElement[]>[];
    switch (s) {
        case '.':
            $class(name.slice(1).toLowerCase(), pt, ret);
            break;
        case '#':
            $id(name.slice(1).toLowerCase(), pt, ret);
            break;
        default:
            $tag(name.toUpperCase(), pt, ret);
            break;
    }
    return ret;
}

class Stack<T> {
    private _length: number;
    private get_length = (): number => { return this._length; };
    private set_length = (i: number) => { this._length = i; };

    get length(): number { return this.get_length(); }
    set length(i: number) { this.set_length(i); }

    private list: T[] = [];
    push(v: T) :Stack<T> {
        this.list[this._length++] = v;
        return this;
    }

    pop(): T {
        return this.list[--this._length];
    }
    reset(): Stack<T> { this._length = 0;
        return this;
    }
    constructor(items: any) {
        if (items instanceof Stack) {
            this.list = items.list;
            this.get_length = items.get_length;
            this.set_length = items.set_length;
        }
        else if (items instanceof Array) {
            this.list = items;
            this._length = items._length;
        }
        else if (typeof (items) == "number") {
            this.list = <T[]> new Array(items);
            this._length = 0;
        } 
    }
    indexOf(v: T): number {
        for (var i = this._length - 1; i >= 0; i--) if (this.list[i] == v) return i;
        return -1;
    }
    exist(v: T): boolean {
        for (var i = this._length - 1; i >= 0; i--) if (this.list[i] == v) return true;
        return false;
    }
    getList(): List<T>
    {
        return new List<T>(this.list).SetLength(this.get_length, this.set_length);
    }
    SetLength(get: () => number, set: (i: number) => void):Stack<T>
    {
        this . get_length = get;
        this.set_length = set;
        return this;
    }
}
class List<T> {
    private list: T[];
    private  _length:number;
    private  get_length = (): number => { return this. _length; };
    private  set_length = (i:number)=> { this . _length = i; };

    get length(): number { return this.get_length(); }
    set length(i: number) { this.set_length(i); }

    public get Last(): T { return this._length > 0 ? this.list[this._length - 1] : null; }
    public get First(): T { return this._length > 0 ? this.list[0] : null; }
    checkIndex(i: number) { return i <= this._length && i >= 0 && i != null; }
    
    getStack(): Stack<T>
    {
        return new Stack<T>(this . list) . SetLength(this . get_length, this . set_length);
        
    }
    SetLength(get: () => number, set: (i: number) => void):List<T> {
        this.get_length = get;
        this.set_length = set;
        return this;
    }
    public contains(value: T): boolean {
        for (var i = this._length - 1; i >= 0; i--)
            if (value == this.list[i]) return true;
        return false;
    }
    public shift(): T {
        if (this._length <= 0) return null;
        this._length--;
        return this.list.shift();
    }
    constructor(items: any) {
        if (items instanceof List) {
            this.list = items.list;
            this.get_length = items.get_length;
            this.set_length = items.set_length;
        }

        else if (items instanceof Array) {
            this.list = items;
            this._length = items._length;
        }
        else if (typeof (items) == "number") {
            this.list = <T[]> new Array(items);
            this._length = 0;
        } else {
            this.list = [];
            this._length = 0;
        }
    }

    push(v: T) {
        this.list[this._length++] = v;
    }

    pop(): T {
        return this.list[--this._length];
    }


    get(i: number):T
    {
        if (this . checkIndex(i)) return this . list[i];
        return null;
    }
    set(i: number, v: T):List<T>
    {
        if (!this . checkIndex(i)) throw new RangeError();
        this.list[i] = v;
        return this;
    }
    merge(lst: List<T>)
    {
        var l = this . _length;
        var tl = lst.length + l;
        this._length = tl;
        this.list.length = tl;
        for (var i = 0; i < tl; i++,l++) this . list[l] = lst . get(i);
    }
    removeAt(i: number): boolean
    {
        if (!this . checkIndex(i)) return false;
        var n = this._length-1;
        for (var j = i; j < n; j++) this.list[j] = this.list[j + 1];
        this . _length--;
        return true;
    }
    insertRangeAt(i :number, arr :T[]){
        if (i < 0) return false;
        var j: number;
        if (i < this._length) for(j = this._length - 1;j >= i;j--) this.list[j + arr.length] = this.list[j];
        else for(j = this._length;j < i + arr.length - 1;j++) this.list[j] = null;
        arr.forEach((x) =>{ this.list[i++] = x; });
        this._length += arr.length;
    }
    insertAt(i: number, v: T): boolean
    {
        if (i < 0) return false;
        var j: number;
        if (i < this . _length) for (j = this . _length - 1; j >= i; j--) this . list[j + 1] = this . list[j];
        else for (j = this . _length; j < i; j++) this . list[j] = null;

        this .list[i] = v;
        this . _length++;
    }

    indexOf(v: T):number
    {
        for (var i = this._length - 1; i >= 0; i--) if (this.list[i] == v) return i;
        return -1;
    }
    clear() { this . _length = 0; }

    foreach<P>(callBack: (i: number, value: T) => boolean, ret?: P)
    {
        for (var i = 0; i < this . _length; i++) if (callBack(i, this . list[i])) return ret;
        return ret;
    }
    copy():List<T>
    {
        var l = new List<T>(this . _length);
        for (var i = this._length - 1; i >= 0; i--) l.set(i, this.get(i));
        return l;
    }

    remove(v: T)
    {
        return this.removeAt(this.indexOf(v));
    }
}
class stack {
    private static list = new Array(80);

    public static begin(_this, _upper) { stack.list.push([_this, _upper]); }

    public static end() {
        var c = stack.list.pop();
        if (c == null) return;
        var l = stack.list[stack.list.length - 1];

        var _this = c[0];
        if (l == null || _this != l[1]) {

            Object.preventExtensions(_this);
            Object.seal(_this);
        }
    }
}

enum Contraint {
    Direct= 0,                              //0  2
    Undirect= 1,                            //1  3

    PointLength= 0,
    PointPoint= 2,

    __Default= 0,
    __DirectPointPoint= 2,
    __UndiirectPointPoint= 3,
    __UndirectPointLength= 1,
}

enum LineType {
    PointLength= 0,
    PointPoint= 1
}

enum Orientation {
    Direct= 0,
    Undirect= 1
}

interface iHTMLProperty {
    Set(el: HTMLElement): void;
}
class ONValue<T> {
    public Old: T;
    public New: T;

    constructor(oldValue: T, newValue: T) {
        this.Old = oldValue;
        this.New = newValue;
    }
}

class KeyValue<T, P> {
    public key: T;
    public value: P;
    constructor(key: T, value: P) {
        this.key = key;
        this.value = value;
    }
}

class Dictionary<T, P> {
    private list: KeyValue<T, P>[] = [];

    private getKeyValue(key: T):KeyValue<T,P> {
        var l = this.list.length;
        for (var i = 0; i < l; i++) {
            var keyValue = this.list[i];
            if (keyValue.key == key) return keyValue;
        }
        return null;
    }

    public Add(key: T, value: P): void {
        var keyValue = this.getKeyValue(key);
        if (keyValue) keyValue.value = value;
        else this.list.push(new KeyValue(key, value));
    }
    public Get(key:T):P {
        var l = this.getKeyValue(key);
        return l == null ? null : l.value;
    }

    public contains(key: T): boolean { return this.getKeyValue(key) && true; }
}

class Signature {
    private args: Function[] = [];

    constructor(_argsClass: Function[]) { this.Add(_argsClass); }

    public static isType(_class: Function): boolean {
        if (_class == null) return true;
        if (_class.apply != Object.apply) return false;
        if (_class.bind != Object.bind) return false;
        if (_class.call != Object.call) return false;
        if (_class.constructor != Object.constructor) return false;
        if (_class.toString != Object.toString) return false;
        return _class.prototype != undefined;
    }

    private Add(_argsClass: Function[]): void {
        for (var i = 0; i < _argsClass.length; i++) {
            var _class = _argsClass[i];
            if (!Signature.isType(_class)) throw TypeError();
            this.args.push(_class);
        }
    }

    public compatible(args: Object[]): boolean {
        var l = Math.min(args.length, this.args.length);
        for (var i = 0; i < l; i++)
            if (this.args[i] == null) continue;
            else if (!(args[i] instanceof this.args[i])) {
                if (this.args[i] == String) if (typeof (args[i]) == "string") continue;
                if (this.args[i] == Number) if (typeof (args[i]) == "number") continue;
                if (this.args[i] == Boolean) if (typeof (args[i]) == "boolean") continue;
                return false;
            }
        return true;
    }

    public static Any: AnySignature;
}

class delegate {
    private invokes: any[] = [];
    private static store: any[] = [];
    private _signature: Signature;

    constructor(sign: Signature, isRecursive: boolean= false) {
        this._signature = sign;
        this.IsRecursive = isRecursive;
    }

    private IsRecursive: boolean = false;
    private IsOn: boolean;

    public Merge(fun: any) {
        if ((fun instanceof delegate) || (fun instanceof Function)) this.invokes.push(fun);
        else throw new TypeError();
    }

    public Invoke(a: any[]): Object {
        if (this.IsOn) return null;
        if (this.invokes.length == 0) return null;
        this.IsOn = true;
        var r: Object;
        if (!this._signature.compatible(a)) throw ReferenceError();
        for (var i = 0; i < this.invokes.length; i++) {
            var f = this.invokes[i];
            if (f instanceof delegate) return r = f.Invoke(arguments);
            else if (f instanceof Function) return r = this._invoke(f, a);
        }
        this.IsOn = false;
        return r;
    }

    private _invoke(f, args): Object {
        switch (args.length) {

            case 0:
                return f();
            case 1:
                return f(args[0]);
            case 2:
                return f(args[0], args[1]);
            case 3:
                return f(args[0], args[1], args[2]);
            case 4:
                return f(args[0], args[1], args[2], args[3]);
            case 5:
                return f(args[0], args[1], args[2], args[3], args[4]);
            case 6:
                return f(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
                return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            case 8:
                return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            case 9:
                return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
            default:
                var fn = delegate.store[args.length];
                if (!fn) fn = eval(delegate.getExceFun("f", args.length));
                return fn(f, args);
        }
    }

    private static getExceFun(funName: string, i: number): string {
        var t = "delegate.store[" + i + "]= function(" + funName + ",args){return ";
        t = t + funName + "(" + (i > 0 ? "args[0]" : "");
        for (var j = 1; j < i; j++) t = t + ",args[" + j + "]";
        t = t + ");}";
        return t;
    }
}

class AnySignature extends Signature {
    constructor() {
        super([]);
        this.compatible = (args: Object[]) => true;
    }

}

class Couple<T> {
    x: T;
    y: T;

    constructor(x: T, y: T) {
        this.x = x;
        this.y = y;
    }
}

class Point extends Couple<number> implements iHTMLProperty {

    constructor(x: number, y: number) { super(x, y); }

    get Left(): number { return this.x; }

    get Top(): number { return this.y; }

    set Left(x: number) {
        var oldValue = this.x;
        this.x = x;
        this.event.Invoke([this, "Left", new ONValue(oldValue, x)]);
    }

    set Top(y: number) {
        var oldValue = this.y;
        this.y = y;
        this.event.Invoke([this, "Top", new ONValue(oldValue, y)]);
    }

    private event: delegate = new delegate(new Signature([Point, String, ONValue]), false);

    public get OnChange(): delegate { return this.event; }

    Set(el: HTMLElement): void { }
}

class Size extends Couple<number> {

    constructor(w: number, h: number) { super(w, h); }

    get Width(): number { return this.x; }

    get Height(): number { return this.y; }

    set Width(x: number) {
        var oldValue = this.x;
        this.x = x;
        this.event.Invoke([this, "Width", new ONValue(oldValue, x)]);
    }

    set Height(y: number) {
        var oldValue = this.y;
        this.y = y;
        this.event.Invoke([this, "Height", new ONValue(oldValue, y)]);
    }

    private event: delegate = new delegate(new Signature([Size, String, ONValue]), false);

    public get OnChange(): delegate { return this.event; }
}

class Region implements iHTMLProperty {
    private _l: Point
    private _s: Size;

    constructor(loc: Point, size: Size) {
        this._l = loc;
        this._s = size;
    }

    get Location(): Point { return this._l; }

    get Size(): Size { return this._s; }

    set Location(x: Point) {
        var old = this._l;
        this._l = x;
        this.event.Invoke([this, "Location", new ONValue(old, x)]);
    }

    set Size(y: Size) {
        var oldValue = this._s;
        this._s = y;
        this.event.Invoke([this, "Size", new ONValue(oldValue, y)]);
    }

    private event: delegate = new delegate(new Signature([Point, String]), false);

    public get OnChange(): delegate { return this.event; }

    Set(el: HTMLElement): void { }
    private static _wr: Region = new Region(new Point(0, 0), new Size(0, 0));
    static get WindowRegion(): Region {
        Region._wr.Size.Width = window.innerWidth;
        Region._wr.Size.Height = window.innerHeight;
        return Region._wr;
    }

    public CalculateRegion(_this: Site): Region {
        var pr: Region = _this.Parent ? _this.Parent.Rectangle : Region.WindowRegion;
        switch (_this.HorizontalLineType) {
            case LineType.PointPoint:
                this.Location.Left = _this.Left.val;
                this.Size.Width = pr.Size.Width - _this.Left.Minus(_this.Right).val;
                break;
            case LineType.PointLength:
                this.Size.Width = _this.Width.val;
                switch (_this.HorizontalOrient) {
                    case Orientation.Direct:
                        this.Location.Left = _this.Left.val;
                        break;
                    case Orientation.Undirect:
                        this.Location.Left = pr.Size.Width - _this.Right.Minus(_this.Width).val;
                        break;
                }
                break;
        }

        switch (_this.VerticalLineType) {
            case LineType.PointPoint:
                this . Location . Top = _this . Top . val;
                this . Size . Height = pr . Size . Height - _this . Top . Minus(_this . Buttom) . val;
                break;
            case LineType.PointLength:
                this.Size.Height = _this.Height.val;
                switch (_this.VerticalOrient) {
                    case Orientation.Direct:
                        this.Location.Top = _this.Top.val;
                        break;
                    case Orientation.Undirect:
                        this.Location.Top = pr.Size.Height - _this.Top.val-_this.Height.val;
                        break;
                }
                break;
            default:
        }
        return this;
    }


}

class Site {
    private x: Mesure;
    private y: Mesure;
    private w: Mesure;
    private h: Mesure;
    private _Parent: Site;
    private children: Site[] = [];
    private event: delegate = new delegate(new Signature([Site]));
    OnChange(f: Function) { this.event.Merge(f); }

    constructor(parent: Site) {
        this.Contraint(Contraint.__Default, Contraint.__Default);
        this.Parent = parent;
    }

    private r: Region = new Region(new Point(0, 0), new Size(200, 150));
    private Changed: boolean;

    get Rectangle(): Region { return this.r.CalculateRegion(this); }

    set Parent(n: Site) {
        var old = this._Parent;
        if (n == old) return;
        this._Parent = n;
        if (old) Remove(old.children, this);
        if (n && n.children.indexOf(this) == -1) n.children.push(this);
        n._();
    }
    get Parent(): Site { return this._Parent; }
    private __HorizontalLineType: LineType = 0;
    private __VerticalLineType: LineType = 0;
    private __HorizontalOrient: Orientation = 0;
    private __VerticalOrient: Orientation = 0;

    get HorizontalLineType(): LineType { return this.__HorizontalLineType; }

    get VerticalLineType(): LineType { return this.__VerticalLineType; }

    get HorizontalOrient(): Orientation { return this._Parent ? this.__HorizontalOrient : Orientation.Direct; }

    get VerticalOrient(): Orientation { return this._Parent ? this.__VerticalOrient : this.__VerticalOrient; }

    private _() { this.event.Invoke([this]); }
    set HorizontalContraint(n: Contraint) {
        this.__HorizontalLineType = (n >> 1) & 1;
        this.__HorizontalOrient = n & 1;
        this . _();
    }

    set VerticalContraint(n: Contraint) {
        this.__VerticalLineType = (n >> 1) & 1;
        this.__VerticalOrient = n & 1;
        this._();
    }

    Contraint(hc: Contraint, vc: Contraint) {
        this.__HorizontalLineType = (hc >> 1) & 1;
        this.__HorizontalOrient = hc & 1;

        this.__VerticalLineType = (vc >> 1) & 1;
        this.__VerticalOrient = vc & 1;
        this._();
    }

    set VerticalLineType(n: LineType) { this.__VerticalLineType = n; this._();}

    set HorizontalOrient(n: Orientation) { this.__HorizontalOrient = n; this._();}

    set VerticalOrient(n: Orientation) { this.__VerticalOrient = n; this._();}

    get Left(): Mesure {
        if (this.HorizontalOrient == Orientation.Direct) return this.x;
        else if (this.HorizontalLineType == LineType.PointPoint) return this.w ;
        return null;

    }

    set Left(n: Mesure) {
        if (this.HorizontalOrient == Orientation.Direct) this.x = n ;
        else if (this . HorizontalLineType == LineType . PointPoint) this . w = n ;
        else return;
        this._();
    }

    get Right(): Mesure {
        if (this.HorizontalOrient == Orientation.Undirect) return this.x ;
        else if (this.HorizontalLineType == LineType.PointPoint) return this.w ;
        return null;
    }

    set Right(n: Mesure) {
        if (this.HorizontalOrient == Orientation.Undirect) this.x = n ;
        else if (this.HorizontalLineType == LineType.PointPoint) this.w = n ;
        else return;
        this._();
    }

    get Top(): Mesure {
        if (this.VerticalOrient == Orientation.Direct) return this.y ;
        else if (this.VerticalLineType == LineType.PointPoint) return this.h ;
        return null;
    }

    set Top(n: Mesure) {
        if (this.VerticalOrient == Orientation.Direct) this.y = n ;
        else if (this.VerticalLineType == LineType.PointPoint) this.h = n ;
        else return;
        this._();
    }

    get Buttom(): Mesure
    {
        if (this . VerticalOrient == Orientation . Undirect) return this . y;
        else if (this . VerticalLineType == LineType . PointPoint) return this . h;
        return null;
    }

    set Buttom(n: Mesure) {
        if (this.VerticalOrient == Orientation.Undirect) this.y = n ;
        else if (this.VerticalLineType = LineType.PointPoint) this.h = n;
        else return;
        this._();
    }

    get Width(): Mesure {
        if (this.HorizontalLineType == LineType.PointLength) return this.w ;
        return null;
    }

    set Width(n: Mesure)
    {
        if (this.HorizontalLineType == LineType.PointLength) this.w = n;
        else return;
        this._();
    }

    get Height(): Mesure {
        if (this.VerticalLineType == LineType.PointLength) return this.h ;
        return null;
    }

    set Height(n: Mesure)
    {
        if (this . VerticalLineType == LineType . PointLength) this . h = n ;
        else return;
        this._();}

    toString(): string
    {
        var corr = (i: Mesure) => ( i . toString() );
        var t = "left:" + ( this . Left ) . toString();
        t += ";top:" + ( this . Top ) . toString();
        t += ";width:" + ( this . Width ) . toString();
        t += ";height:" + ( this . Height ) . toString();
        t += ";right:" + ( this . Right ) . toString();
        t += ";buttom:" + ( this . Buttom ) . toString();
        return t;
    }
}

class virtualMethod {
    base: virtualMethod;
    method: Function;
}
enum MesureUnit {
    Pixel,Percent,Auto
}
class Mesure {
    Unit:MesureUnit;
    private  _val: number
    get val(): number { return this._val | 0; }
    set val(n: number) { this._val=n | 0; }
    constructor(val: number, unit: MesureUnit= MesureUnit.Pixel)
    {
        this . Unit = unit;
        this . val = val;
    }
    Minus(b: Mesure) { return new Mesure(this.val - b.val, this.Unit); }
    Plus(b: Mesure) { return new Mesure(this.val - b.val, this.Unit); }
    Abs() { return new Mesure(Math.abs(this.val), this.Unit); }

    toString(): string
    {
        switch (this.Unit) {
            case MesureUnit.Auto :
                return "Auto";
            case MesureUnit.Pixel:
                return this._val + "px";
            case MesureUnit.Percent:
                return this . _val + "%";
        }
        
        return "null";

    }
    toLocaleString() { return this . toString(); }
}   
class Line1D {
    Val: Mesure;
    repere: Line1D = null;
    frepere:Line1D=null;
    RealValue:number=0;

    constructor(val: number, unit: MesureUnit, public Orientation: Orientation) {
        this.Val = new Mesure(val, unit);
    }

    toString(): string { return this.Val.toString(); }

    public setRepere(repere: Line1D, frepere?: Line1D) {
        this.repere = repere;
        this.frepere = frepere;
    }
}

class NotImplimented implements Error
{
    stack;
    constructor(public name?: string, public message?: string)
    {
        
    }
}

class Grid {
    Sites: Site[]=[];
    public LineCount: number;
    public ColumnCount: number
    private Columns: List<Line1D>=new List<Line1D>(20);
    private Rows: List<Line1D> = new List<Line1D>(20);
    public  static _Left = new Line1D(0, MesureUnit . Pixel, Orientation . Direct);
    public  static _Top = new Line1D(0, MesureUnit . Pixel, Orientation . Direct);
    public  static _Right = new Line1D(0, MesureUnit . Pixel, Orientation . Undirect);
    public  static _Buttom = new Line1D(0, MesureUnit . Pixel, Orientation . Undirect);

    constructor(public Depend: boolean=false)
    {
        this . Rows . push(Grid . _Top);
        this . Rows . push(Grid . _Buttom);
        this . Columns . push(Grid . _Left);
        this . Columns . push(Grid . _Right);
        this . _Rows = new List<Line1D>(20);
        this . _Columns = new List<Line1D>(20);
        this . _SRows = new Stack<Line1D>(20);
        this._SColumns =  new Stack<Line1D>(20);
    }

    SetRow(val: number, unit: MesureUnit, orient: Orientation=Orientation.Direct)
    {
        if (unit == MesureUnit . Auto) throw new NotImplimented("unit must be not Auto");
        var l = new Line1D(val, unit, orient);
        this . Rows . push(Grid . _Buttom);
        this.Rows.set(this.Rows.length - 2, l);
        this.Validate(true);
        return l;
    }

    SetColumn(val: number, unit: MesureUnit, orient: Orientation=Orientation.Direct)
    {
        if (unit == MesureUnit . Auto) throw new NotImplimented("unit must be not Auto");
        var l = new Line1D(val, unit, orient);
        this . Columns . push(Grid . _Right);
        this.Columns.set(this.Columns.length - 2, l);
        this.Validate(false);
        return l;
    }

    private setHSiteUndepend(s: Site, c1: Line1D, c2: Line1D)
    {
        if (c1 . Val . Unit != c2 . Val . Unit) {
            var t: any = !c1 . Orientation;
            c2 . Orientation = t;
            var b = c2 . Val . Unit == MesureUnit . Percent;
            ( b ? c2 : c1 ) . Val = new Mesure(100 - ( b ? c2 : c1 ) . Val . val, MesureUnit . Percent);
        }
        if (c1 . Orientation == c2 . Orientation && ( c1 . Val . Unit == c2 . Val . Unit ) && c1 . Val . Unit == MesureUnit . Pixel) {
            s . HorizontalContraint = c1 . Orientation == Orientation . Direct ? Contraint . __Default : Contraint . __UndirectPointLength;
            s . Width = c2 . Val . Minus(c1 . Val) . Abs();
            if (c1 . Orientation == Orientation . Direct) s . Left = c1 . Val;
            else s . Right = c1 . Val;
        } else {
            s . HorizontalContraint = c1 . Orientation == Orientation . Direct ? Contraint . __DirectPointPoint : Contraint . __UndiirectPointPoint;
            if (c1 . Orientation == Orientation . Direct) {
                s . Left = c1 . Val;
                s . Right = c2 . Val;
            } else {
                s . Left = c2 . Val;
                s . Right = c1 . Val;
            }
        }
    }

    private setVSiteUndepend(s: Site, r1: Line1D, r2: Line1D)
    {
        if (r1 . Orientation == r2 . Orientation) {
            s . VerticalContraint = r1 . Orientation == Orientation . Direct ? Contraint . __Default : Contraint . __UndirectPointLength;
            s . Height = r2 . Val . Minus(r1 . Val) . Abs();
            if (r1 . Orientation == Orientation . Direct) s . Top = r1 . Val;
            else s . Buttom = r1 . Val;
        } else {
            s . VerticalContraint = r1 . Orientation == Orientation . Direct ? Contraint . __DirectPointPoint : Contraint . __UndiirectPointPoint;
            if (r1 . Orientation == Orientation . Direct) {
                s . Top = r1 . Val;
                s . Buttom = r2 . Val;
            } else {
                s . Top = r2 . Val;
                s . Buttom = r1 . Val;
            }
        }
    }

    SetSite(s: Site, row: number, col: number, nrow: number=1, ncol: number=1): boolean
    {
        if (nrow < 1) nrow = 1;
        if (ncol < 1) ncol = 1;

        if (!( col >= 0 && ( col + ncol < this . Columns . length - 1 ) )) return false;
        if (!( row >= 0 && ( row + nrow < this . Rows . length - 1 ) )) return false;

        var r1:Line1D = this . Rows . get(row);
        var r2: Line1D = this . Rows . get(row + nrow);
        var c1: Line1D = this . Columns . get(col);
        var c2: Line1D = this . Columns . get(col + ncol);
        if (this . Depend) {
            this . setHSiteUndepend(s, c1, c2);
            this . setVSiteUndepend(s, r1, r2);
        } else throw new NotImplimented("Depend strategy not Implemented yet");
        return true;
    }

    SetRegion(reg: Region, row: number, col: number, nrow: number= 1, ncol: number= 1): boolean
    {
        if (nrow < 1) nrow = 1;
        if (ncol < 1) ncol = 1;

        if (!( col >= 0 && ( col + ncol <= this . Columns . length ) )) return false;
        if (!( row >= 0 && ( row + nrow <= this . Rows . length  ) )) return false;

        var l = reg . Location;
        var s = reg . Size;
        var r1: Line1D = this . Rows . get(row);
        var r2: Line1D = this . Rows . get(row + nrow);
        var c1: Line1D = this . Columns . get(col);
        var c2: Line1D = this . Columns . get(col + ncol);

        if (c1 . RealValue > c2 . RealValue) {
            var c = c1;
            c1 = c2;
            c2 = c;
        }
        if (r1 . RealValue > r2 . RealValue) {
            c = r1;
            r1 = r2;
            r2 = c;
        }
        l . Left = c1 . RealValue;
        l . Top = r1 . RealValue;
        s . Width = c2 . RealValue - l . Left;
        s . Height = r2 . RealValue - l . Top;
        return true;
    }

    swap(t)
    {
        
    }
    SetDependSite(s: Site) { }

    _Rows: List<Line1D>;
    _Columns: List<Line1D>;
    _SRows: Stack<Line1D>;
    _SColumns: Stack<Line1D>;

    Validate(isRow:boolean): boolean
    {
        if (isRow) {
            this . _SRows . reset();
            this . _Rows . clear();
            var validate = new Array(this . Rows . length);
            if (!Grid . reaRange(this . Rows, this . _Rows . getStack(), this . _SRows, Grid . getNext(validate), validate)) {
                this . _SRows . reset();
                return false;
            }
        } else {

            this . _SColumns . reset();
            this . _Columns . clear();
            validate = new Array(this . Columns . length);
            validate . length = this . Columns . length;
            if (!Grid . reaRange(this . Columns, this . _Columns . getStack(), this . _SColumns, Grid . getNext(validate), validate)) {
                this . _SRows . reset();
                return false;
            }
        }
        return true;
    }

    static Validate(array: List<Line1D>): List<Line1D>
    {
        var s = new Stack<Line1D>(array . length);
        if (array != null && array . length > 0) {
            var l = array . length;
            var stackOnProssecing = new Stack<Line1D>(l);
            var validatet = new Array(l);
            var index = Grid . getNext(validatet);
            if (!Grid . reaRange(array, s, stackOnProssecing, index, validatet)) return null;
        }
        return s . getList();
    }

    static getNext(v: any[])
    {
        for (var i = v . length - 1; i >= 0; i--) if (!v[i]) return i;
        return -1;
    }

    private static reaRange(array: List<Line1D>, traited: Stack<Line1D>, stackOnProssecing?: Stack<Line1D>, index: number=0, validatet?: any[]): boolean
    {
        var cE = array.get(index);
        if (stackOnProssecing . exist(cE)) return false;
        if (traited . exist(cE)) return true;
        
        if (cE . repere != null && traited . indexOf(cE . repere) == -1) {
            stackOnProssecing . push(cE);
            if (!this . reaRange(array, traited, stackOnProssecing, array . indexOf(cE . repere), validatet)) return null;
            stackOnProssecing . pop();
        }
        traited . push(cE);
        validatet[index] = true;
        if (stackOnProssecing . length == 0) {
            var next = Grid . getNext(validatet);
            if (next != -1) if (!this . reaRange(array, traited, stackOnProssecing, next, validatet)) return null;
        }
        return true;
    }

    Update(s: Size)
    {
        this . _Rows . foreach((i: number, v: Line1D) =>
        {
            Grid . correct(v, s . Width);
            return false;
        });
        this . _Columns . foreach((i: number, v: Line1D) =>
        {
            Grid . correct(v, s . Height);
            return false;
        });
    }

    static correct(v: Line1D, s_width: number){
        var realIsNull = v . repere == null;
        var realValues = realIsNull ? null : v . repere . RealValue;
        var v_val = v . Val . val;
        switch (v . Val . Unit) {
            case MesureUnit . Auto :
                throw new NotImplimented("auto UNIT");
            case MesureUnit . Pixel :
                if (realIsNull)
                    if (v . Orientation == Orientation . Direct) v . RealValue = v_val;
                    else v . RealValue = s_width - v_val;
                else if (v . Orientation == Orientation . Direct) v . RealValue = realValues + v_val;
                else v . RealValue = realValues - v_val;
                break;
            case MesureUnit . Percent :
                if (realIsNull)
                    if (v . Orientation == Orientation . Direct) v . RealValue = s_width * v_val / 100;
                    else v . RealValue = s_width * ( 1 - v_val / 100 );
                else if (v . Orientation == Orientation . Direct) v . RealValue = realValues + ( s_width - realValues ) * v_val / 100;
                else v . RealValue = realValues + ( s_width - realValues ) * ( 1 - v_val / 100 );
                break;
        }
        return false;
    }
}
var setRepere = (lst: List<Line1D>, pr: Line1D, chlds: number[]) => {
    for (var i = 0; i < chlds.length; i++) lst.get(chlds[i]).repere = pr;
}
 var Test1=() => {
     var grid = new Grid();
     var title = grid.SetRow(30, MesureUnit.Pixel, Orientation.Direct);
     Line1D
     var headBar = grid.SetRow(20, MesureUnit.Percent, Orientation.Undirect);
     headBar . repere = title;
     var footBar = grid.SetRow(30, MesureUnit.Pixel, Orientation.Undirect);

     var leftBorder = grid.SetColumn(4, MesureUnit.Pixel, Orientation.Direct);
     var leftMenu = grid.SetColumn(100, MesureUnit.Pixel, Orientation.Direct);
     leftMenu . repere = leftBorder;
     var rightMenu = grid.SetColumn(50, MesureUnit.Percent, Orientation.Undirect);
     
     grid.Update(new Size(1024, 640));
     return grid;
 }
var Test: () => List<Line1D> = (): List<Line1D> => {
    var s = new List<Line1D>(10);
    for (var i = 0; i < 10; i++) s . push(new Line1D(i , i%2, Orientation . Direct));
    setRepere(s, s.get(0), [1, 2, 3]);
    setRepere(s, s.get(4), [0,5]);
    setRepere(s, s.get(7), [4]);
    setRepere(s, s.get(8), [7]);
    setRepere(s, s.get(9), [8]);
    return s;
}
var Remove = <T>(a: T[], e: any) => {
    var i = a.indexOf(e);
    if (i == -1) return;
    var l = a.length - 1;
    for (var j = i; j < l; j++) a[i] = a[i + 1];
    a.length--;
}
