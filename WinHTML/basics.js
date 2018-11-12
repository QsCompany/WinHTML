var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var exports = exports || {};
function $id(name, pt, ret) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = pt.children.item(i);
        if (!(c instanceof HTMLElement))
            continue;
        if (c.id.toLowerCase() == name)
            ret.push(c);
        $id(name, c, ret);
    }
}
function $tag(name, pt, ret) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = pt.children.item(i);
        if (!(c instanceof HTMLElement))
            continue;
        if (c.tagName == name)
            ret.push(c);
        $tag(name, c, ret);
    }
}
function $class(name, pt, ret) {
    var m = pt.childElementCount;
    for (var i = 0; i < m; i++) {
        var c = pt.children.item(i);
        if (!(c instanceof HTMLElement))
            continue;
        if (c.classList.contains(name))
            ret.push(c);
        $class(name, c, ret);
    }
}
function $(name, pt) {
    var s = name[0];
    pt = pt || document.documentElement;
    var ret = [];
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
var Stack = (function () {
    function Stack(items) {
        var _this = this;
        this.get_length = function () { return _this._length; };
        this.set_length = function (i) { _this._length = i; };
        this.list = [];
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
            this.list = new Array(items);
            this._length = 0;
        }
    }
    Object.defineProperty(Stack.prototype, "length", {
        get: function () { return this.get_length(); },
        set: function (i) { this.set_length(i); },
        enumerable: true,
        configurable: true
    });
    Stack.prototype.push = function (v) {
        this.list[this._length++] = v;
        return this;
    };
    Stack.prototype.pop = function () {
        return this.list[--this._length];
    };
    Stack.prototype.reset = function () {
        this._length = 0;
        return this;
    };
    Stack.prototype.indexOf = function (v) {
        for (var i = this._length - 1; i >= 0; i--)
            if (this.list[i] == v)
                return i;
        return -1;
    };
    Stack.prototype.exist = function (v) {
        for (var i = this._length - 1; i >= 0; i--)
            if (this.list[i] == v)
                return true;
        return false;
    };
    Stack.prototype.getList = function () {
        return new List(this.list).SetLength(this.get_length, this.set_length);
    };
    Stack.prototype.SetLength = function (get, set) {
        this.get_length = get;
        this.set_length = set;
        return this;
    };
    return Stack;
})();
var List = (function () {
    function List(items) {
        var _this = this;
        this.get_length = function () { return _this._length; };
        this.set_length = function (i) { _this._length = i; };
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
            this.list = new Array(items);
            this._length = 0;
        }
        else {
            this.list = [];
            this._length = 0;
        }
    }
    Object.defineProperty(List.prototype, "length", {
        get: function () { return this.get_length(); },
        set: function (i) { this.set_length(i); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "Last", {
        get: function () { return this._length > 0 ? this.list[this._length - 1] : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "First", {
        get: function () { return this._length > 0 ? this.list[0] : null; },
        enumerable: true,
        configurable: true
    });
    List.prototype.checkIndex = function (i) { return i <= this._length && i >= 0 && i != null; };
    List.prototype.getStack = function () {
        return new Stack(this.list).SetLength(this.get_length, this.set_length);
    };
    List.prototype.SetLength = function (get, set) {
        this.get_length = get;
        this.set_length = set;
        return this;
    };
    List.prototype.contains = function (value) {
        for (var i = this._length - 1; i >= 0; i--)
            if (value == this.list[i])
                return true;
        return false;
    };
    List.prototype.shift = function () {
        if (this._length <= 0)
            return null;
        this._length--;
        return this.list.shift();
    };
    List.prototype.push = function (v) {
        this.list[this._length++] = v;
    };
    List.prototype.pop = function () {
        return this.list[--this._length];
    };
    List.prototype.get = function (i) {
        if (this.checkIndex(i))
            return this.list[i];
        return null;
    };
    List.prototype.set = function (i, v) {
        if (!this.checkIndex(i))
            throw new RangeError();
        this.list[i] = v;
        return this;
    };
    List.prototype.merge = function (lst) {
        var l = this._length;
        var tl = lst.length + l;
        this._length = tl;
        this.list.length = tl;
        for (var i = 0; i < tl; i++, l++)
            this.list[l] = lst.get(i);
    };
    List.prototype.removeAt = function (i) {
        if (!this.checkIndex(i))
            return false;
        var n = this._length - 1;
        for (var j = i; j < n; j++)
            this.list[j] = this.list[j + 1];
        this._length--;
        return true;
    };
    List.prototype.insertRangeAt = function (i, arr) {
        var _this = this;
        if (i < 0)
            return false;
        var j;
        if (i < this._length)
            for (j = this._length - 1; j >= i; j--)
                this.list[j + arr.length] = this.list[j];
        else
            for (j = this._length; j < i + arr.length - 1; j++)
                this.list[j] = null;
        arr.forEach(function (x) { _this.list[i++] = x; });
        this._length += arr.length;
    };
    List.prototype.insertAt = function (i, v) {
        if (i < 0)
            return false;
        var j;
        if (i < this._length)
            for (j = this._length - 1; j >= i; j--)
                this.list[j + 1] = this.list[j];
        else
            for (j = this._length; j < i; j++)
                this.list[j] = null;
        this.list[i] = v;
        this._length++;
    };
    List.prototype.indexOf = function (v) {
        for (var i = this._length - 1; i >= 0; i--)
            if (this.list[i] == v)
                return i;
        return -1;
    };
    List.prototype.clear = function () { this._length = 0; };
    List.prototype.foreach = function (callBack, ret) {
        for (var i = 0; i < this._length; i++)
            if (callBack(i, this.list[i]))
                return ret;
        return ret;
    };
    List.prototype.copy = function () {
        var l = new List(this._length);
        for (var i = this._length - 1; i >= 0; i--)
            l.set(i, this.get(i));
        return l;
    };
    List.prototype.remove = function (v) {
        return this.removeAt(this.indexOf(v));
    };
    return List;
})();
var stack = (function () {
    function stack() {
    }
    stack.begin = function (_this, _upper) { stack.list.push([_this, _upper]); };
    stack.end = function () {
        var c = stack.list.pop();
        if (c == null)
            return;
        var l = stack.list[stack.list.length - 1];
        var _this = c[0];
        if (l == null || _this != l[1]) {
            Object.preventExtensions(_this);
            Object.seal(_this);
        }
    };
    stack.list = new Array(80);
    return stack;
})();
var Contraint;
(function (Contraint) {
    Contraint[Contraint["Direct"] = 0] = "Direct";
    Contraint[Contraint["Undirect"] = 1] = "Undirect";
    Contraint[Contraint["PointLength"] = 0] = "PointLength";
    Contraint[Contraint["PointPoint"] = 2] = "PointPoint";
    Contraint[Contraint["__Default"] = 0] = "__Default";
    Contraint[Contraint["__DirectPointPoint"] = 2] = "__DirectPointPoint";
    Contraint[Contraint["__UndiirectPointPoint"] = 3] = "__UndiirectPointPoint";
    Contraint[Contraint["__UndirectPointLength"] = 1] = "__UndirectPointLength";
})(Contraint || (Contraint = {}));
var LineType;
(function (LineType) {
    LineType[LineType["PointLength"] = 0] = "PointLength";
    LineType[LineType["PointPoint"] = 1] = "PointPoint";
})(LineType || (LineType = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Direct"] = 0] = "Direct";
    Orientation[Orientation["Undirect"] = 1] = "Undirect";
})(Orientation || (Orientation = {}));
var ONValue = (function () {
    function ONValue(oldValue, newValue) {
        this.Old = oldValue;
        this.New = newValue;
    }
    return ONValue;
})();
var KeyValue = (function () {
    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValue;
})();
var Dictionary = (function () {
    function Dictionary() {
        this.list = [];
    }
    Dictionary.prototype.getKeyValue = function (key) {
        var l = this.list.length;
        for (var i = 0; i < l; i++) {
            var keyValue = this.list[i];
            if (keyValue.key == key)
                return keyValue;
        }
        return null;
    };
    Dictionary.prototype.Add = function (key, value) {
        var keyValue = this.getKeyValue(key);
        if (keyValue)
            keyValue.value = value;
        else
            this.list.push(new KeyValue(key, value));
    };
    Dictionary.prototype.Get = function (key) {
        var l = this.getKeyValue(key);
        return l == null ? null : l.value;
    };
    Dictionary.prototype.contains = function (key) { return this.getKeyValue(key) && true; };
    return Dictionary;
})();
var Signature = (function () {
    function Signature(_argsClass) {
        this.args = [];
        this.Add(_argsClass);
    }
    Signature.isType = function (_class) {
        if (_class == null)
            return true;
        if (_class.apply != Object.apply)
            return false;
        if (_class.bind != Object.bind)
            return false;
        if (_class.call != Object.call)
            return false;
        if (_class.constructor != Object.constructor)
            return false;
        if (_class.toString != Object.toString)
            return false;
        return _class.prototype != undefined;
    };
    Signature.prototype.Add = function (_argsClass) {
        for (var i = 0; i < _argsClass.length; i++) {
            var _class = _argsClass[i];
            if (!Signature.isType(_class))
                throw TypeError();
            this.args.push(_class);
        }
    };
    Signature.prototype.compatible = function (args) {
        var l = Math.min(args.length, this.args.length);
        for (var i = 0; i < l; i++)
            if (this.args[i] == null)
                continue;
            else if (!(args[i] instanceof this.args[i])) {
                if (this.args[i] == String)
                    if (typeof (args[i]) == "string")
                        continue;
                if (this.args[i] == Number)
                    if (typeof (args[i]) == "number")
                        continue;
                if (this.args[i] == Boolean)
                    if (typeof (args[i]) == "boolean")
                        continue;
                return false;
            }
        return true;
    };
    return Signature;
})();
var delegate = (function () {
    function delegate(sign, isRecursive) {
        if (isRecursive === void 0) { isRecursive = false; }
        this.invokes = [];
        this.IsRecursive = false;
        this._signature = sign;
        this.IsRecursive = isRecursive;
    }
    delegate.prototype.Merge = function (fun) {
        if ((fun instanceof delegate) || (fun instanceof Function))
            this.invokes.push(fun);
        else
            throw new TypeError();
    };
    delegate.prototype.Invoke = function (a) {
        if (this.IsOn)
            return null;
        if (this.invokes.length == 0)
            return null;
        this.IsOn = true;
        var r;
        if (!this._signature.compatible(a))
            throw ReferenceError();
        for (var i = 0; i < this.invokes.length; i++) {
            var f = this.invokes[i];
            if (f instanceof delegate)
                return r = f.Invoke(arguments);
            else if (f instanceof Function)
                return r = this._invoke(f, a);
        }
        this.IsOn = false;
        return r;
    };
    delegate.prototype._invoke = function (f, args) {
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
                if (!fn)
                    fn = eval(delegate.getExceFun("f", args.length));
                return fn(f, args);
        }
    };
    delegate.getExceFun = function (funName, i) {
        var t = "delegate.store[" + i + "]= function(" + funName + ",args){return ";
        t = t + funName + "(" + (i > 0 ? "args[0]" : "");
        for (var j = 1; j < i; j++)
            t = t + ",args[" + j + "]";
        t = t + ");}";
        return t;
    };
    delegate.store = [];
    return delegate;
})();
var AnySignature = (function (_super) {
    __extends(AnySignature, _super);
    function AnySignature() {
        _super.call(this, []);
        this.compatible = function (args) { return true; };
    }
    return AnySignature;
})(Signature);
var Couple = (function () {
    function Couple(x, y) {
        this.x = x;
        this.y = y;
    }
    return Couple;
})();
var Point = (function (_super) {
    __extends(Point, _super);
    function Point(x, y) {
        _super.call(this, x, y);
        this.event = new delegate(new Signature([Point, String, ONValue]), false);
    }
    Object.defineProperty(Point.prototype, "Left", {
        get: function () { return this.x; },
        set: function (x) {
            var oldValue = this.x;
            this.x = x;
            this.event.Invoke([this, "Left", new ONValue(oldValue, x)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "Top", {
        get: function () { return this.y; },
        set: function (y) {
            var oldValue = this.y;
            this.y = y;
            this.event.Invoke([this, "Top", new ONValue(oldValue, y)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "OnChange", {
        get: function () { return this.event; },
        enumerable: true,
        configurable: true
    });
    Point.prototype.Set = function (el) { };
    return Point;
})(Couple);
var Size = (function (_super) {
    __extends(Size, _super);
    function Size(w, h) {
        _super.call(this, w, h);
        this.event = new delegate(new Signature([Size, String, ONValue]), false);
    }
    Object.defineProperty(Size.prototype, "Width", {
        get: function () { return this.x; },
        set: function (x) {
            var oldValue = this.x;
            this.x = x;
            this.event.Invoke([this, "Width", new ONValue(oldValue, x)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "Height", {
        get: function () { return this.y; },
        set: function (y) {
            var oldValue = this.y;
            this.y = y;
            this.event.Invoke([this, "Height", new ONValue(oldValue, y)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "OnChange", {
        get: function () { return this.event; },
        enumerable: true,
        configurable: true
    });
    return Size;
})(Couple);
var Region = (function () {
    function Region(loc, size) {
        this.event = new delegate(new Signature([Point, String]), false);
        this._l = loc;
        this._s = size;
    }
    Object.defineProperty(Region.prototype, "Location", {
        get: function () { return this._l; },
        set: function (x) {
            var old = this._l;
            this._l = x;
            this.event.Invoke([this, "Location", new ONValue(old, x)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Region.prototype, "Size", {
        get: function () { return this._s; },
        set: function (y) {
            var oldValue = this._s;
            this._s = y;
            this.event.Invoke([this, "Size", new ONValue(oldValue, y)]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Region.prototype, "OnChange", {
        get: function () { return this.event; },
        enumerable: true,
        configurable: true
    });
    Region.prototype.Set = function (el) { };
    Object.defineProperty(Region, "WindowRegion", {
        get: function () {
            Region._wr.Size.Width = window.innerWidth;
            Region._wr.Size.Height = window.innerHeight;
            return Region._wr;
        },
        enumerable: true,
        configurable: true
    });
    Region.prototype.CalculateRegion = function (_this) {
        var pr = _this.Parent ? _this.Parent.Rectangle : Region.WindowRegion;
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
                this.Location.Top = _this.Top.val;
                this.Size.Height = pr.Size.Height - _this.Top.Minus(_this.Buttom).val;
                break;
            case LineType.PointLength:
                this.Size.Height = _this.Height.val;
                switch (_this.VerticalOrient) {
                    case Orientation.Direct:
                        this.Location.Top = _this.Top.val;
                        break;
                    case Orientation.Undirect:
                        this.Location.Top = pr.Size.Height - _this.Top.val - _this.Height.val;
                        break;
                }
                break;
            default:
        }
        return this;
    };
    Region._wr = new Region(new Point(0, 0), new Size(0, 0));
    return Region;
})();
var Site = (function () {
    function Site(parent) {
        this.children = [];
        this.event = new delegate(new Signature([Site]));
        this.r = new Region(new Point(0, 0), new Size(200, 150));
        this.__HorizontalLineType = 0;
        this.__VerticalLineType = 0;
        this.__HorizontalOrient = 0;
        this.__VerticalOrient = 0;
        this.Contraint(Contraint.__Default, Contraint.__Default);
        this.Parent = parent;
    }
    Site.prototype.OnChange = function (f) { this.event.Merge(f); };
    Object.defineProperty(Site.prototype, "Rectangle", {
        get: function () { return this.r.CalculateRegion(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Parent", {
        get: function () { return this._Parent; },
        set: function (n) {
            var old = this._Parent;
            if (n == old)
                return;
            this._Parent = n;
            if (old)
                Remove(old.children, this);
            if (n && n.children.indexOf(this) == -1)
                n.children.push(this);
            n._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "HorizontalLineType", {
        get: function () { return this.__HorizontalLineType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "VerticalLineType", {
        get: function () { return this.__VerticalLineType; },
        set: function (n) { this.__VerticalLineType = n; this._(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "HorizontalOrient", {
        get: function () { return this._Parent ? this.__HorizontalOrient : Orientation.Direct; },
        set: function (n) { this.__HorizontalOrient = n; this._(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "VerticalOrient", {
        get: function () { return this._Parent ? this.__VerticalOrient : this.__VerticalOrient; },
        set: function (n) { this.__VerticalOrient = n; this._(); },
        enumerable: true,
        configurable: true
    });
    Site.prototype._ = function () { this.event.Invoke([this]); };
    Object.defineProperty(Site.prototype, "HorizontalContraint", {
        set: function (n) {
            this.__HorizontalLineType = (n >> 1) & 1;
            this.__HorizontalOrient = n & 1;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "VerticalContraint", {
        set: function (n) {
            this.__VerticalLineType = (n >> 1) & 1;
            this.__VerticalOrient = n & 1;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Site.prototype.Contraint = function (hc, vc) {
        this.__HorizontalLineType = (hc >> 1) & 1;
        this.__HorizontalOrient = hc & 1;
        this.__VerticalLineType = (vc >> 1) & 1;
        this.__VerticalOrient = vc & 1;
        this._();
    };
    Object.defineProperty(Site.prototype, "Left", {
        get: function () {
            if (this.HorizontalOrient == Orientation.Direct)
                return this.x;
            else if (this.HorizontalLineType == LineType.PointPoint)
                return this.w;
            return null;
        },
        set: function (n) {
            if (this.HorizontalOrient == Orientation.Direct)
                this.x = n;
            else if (this.HorizontalLineType == LineType.PointPoint)
                this.w = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Right", {
        get: function () {
            if (this.HorizontalOrient == Orientation.Undirect)
                return this.x;
            else if (this.HorizontalLineType == LineType.PointPoint)
                return this.w;
            return null;
        },
        set: function (n) {
            if (this.HorizontalOrient == Orientation.Undirect)
                this.x = n;
            else if (this.HorizontalLineType == LineType.PointPoint)
                this.w = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Top", {
        get: function () {
            if (this.VerticalOrient == Orientation.Direct)
                return this.y;
            else if (this.VerticalLineType == LineType.PointPoint)
                return this.h;
            return null;
        },
        set: function (n) {
            if (this.VerticalOrient == Orientation.Direct)
                this.y = n;
            else if (this.VerticalLineType == LineType.PointPoint)
                this.h = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Buttom", {
        get: function () {
            if (this.VerticalOrient == Orientation.Undirect)
                return this.y;
            else if (this.VerticalLineType == LineType.PointPoint)
                return this.h;
            return null;
        },
        set: function (n) {
            if (this.VerticalOrient == Orientation.Undirect)
                this.y = n;
            else if (this.VerticalLineType = LineType.PointPoint)
                this.h = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Width", {
        get: function () {
            if (this.HorizontalLineType == LineType.PointLength)
                return this.w;
            return null;
        },
        set: function (n) {
            if (this.HorizontalLineType == LineType.PointLength)
                this.w = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "Height", {
        get: function () {
            if (this.VerticalLineType == LineType.PointLength)
                return this.h;
            return null;
        },
        set: function (n) {
            if (this.VerticalLineType == LineType.PointLength)
                this.h = n;
            else
                return;
            this._();
        },
        enumerable: true,
        configurable: true
    });
    Site.prototype.toString = function () {
        var corr = function (i) { return (i.toString()); };
        var t = "left:" + (this.Left).toString();
        t += ";top:" + (this.Top).toString();
        t += ";width:" + (this.Width).toString();
        t += ";height:" + (this.Height).toString();
        t += ";right:" + (this.Right).toString();
        t += ";buttom:" + (this.Buttom).toString();
        return t;
    };
    return Site;
})();
var virtualMethod = (function () {
    function virtualMethod() {
    }
    return virtualMethod;
})();
var MesureUnit;
(function (MesureUnit) {
    MesureUnit[MesureUnit["Pixel"] = 0] = "Pixel";
    MesureUnit[MesureUnit["Percent"] = 1] = "Percent";
    MesureUnit[MesureUnit["Auto"] = 2] = "Auto";
})(MesureUnit || (MesureUnit = {}));
var Mesure = (function () {
    function Mesure(val, unit) {
        if (unit === void 0) { unit = MesureUnit.Pixel; }
        this.Unit = unit;
        this.val = val;
    }
    Object.defineProperty(Mesure.prototype, "val", {
        get: function () { return this._val | 0; },
        set: function (n) { this._val = n | 0; },
        enumerable: true,
        configurable: true
    });
    Mesure.prototype.Minus = function (b) { return new Mesure(this.val - b.val, this.Unit); };
    Mesure.prototype.Plus = function (b) { return new Mesure(this.val - b.val, this.Unit); };
    Mesure.prototype.Abs = function () { return new Mesure(Math.abs(this.val), this.Unit); };
    Mesure.prototype.toString = function () {
        switch (this.Unit) {
            case MesureUnit.Auto:
                return "Auto";
            case MesureUnit.Pixel:
                return this._val + "px";
            case MesureUnit.Percent:
                return this._val + "%";
        }
        return "null";
    };
    Mesure.prototype.toLocaleString = function () { return this.toString(); };
    return Mesure;
})();
var Line1D = (function () {
    function Line1D(val, unit, Orientation) {
        this.Orientation = Orientation;
        this.repere = null;
        this.frepere = null;
        this.RealValue = 0;
        this.Val = new Mesure(val, unit);
    }
    Line1D.prototype.toString = function () { return this.Val.toString(); };
    Line1D.prototype.setRepere = function (repere, frepere) {
        this.repere = repere;
        this.frepere = frepere;
    };
    return Line1D;
})();
var NotImplimented = (function () {
    function NotImplimented(name, message) {
        this.name = name;
        this.message = message;
    }
    return NotImplimented;
})();
var Grid = (function () {
    function Grid(Depend) {
        if (Depend === void 0) { Depend = false; }
        this.Depend = Depend;
        this.Sites = [];
        this.Columns = new List(20);
        this.Rows = new List(20);
        this.Rows.push(Grid._Top);
        this.Rows.push(Grid._Buttom);
        this.Columns.push(Grid._Left);
        this.Columns.push(Grid._Right);
        this._Rows = new List(20);
        this._Columns = new List(20);
        this._SRows = new Stack(20);
        this._SColumns = new Stack(20);
    }
    Grid.prototype.SetRow = function (val, unit, orient) {
        if (orient === void 0) { orient = Orientation.Direct; }
        if (unit == MesureUnit.Auto)
            throw new NotImplimented("unit must be not Auto");
        var l = new Line1D(val, unit, orient);
        this.Rows.push(Grid._Buttom);
        this.Rows.set(this.Rows.length - 2, l);
        this.Validate(true);
        return l;
    };
    Grid.prototype.SetColumn = function (val, unit, orient) {
        if (orient === void 0) { orient = Orientation.Direct; }
        if (unit == MesureUnit.Auto)
            throw new NotImplimented("unit must be not Auto");
        var l = new Line1D(val, unit, orient);
        this.Columns.push(Grid._Right);
        this.Columns.set(this.Columns.length - 2, l);
        this.Validate(false);
        return l;
    };
    Grid.prototype.setHSiteUndepend = function (s, c1, c2) {
        if (c1.Val.Unit != c2.Val.Unit) {
            var t = !c1.Orientation;
            c2.Orientation = t;
            var b = c2.Val.Unit == MesureUnit.Percent;
            (b ? c2 : c1).Val = new Mesure(100 - (b ? c2 : c1).Val.val, MesureUnit.Percent);
        }
        if (c1.Orientation == c2.Orientation && (c1.Val.Unit == c2.Val.Unit) && c1.Val.Unit == MesureUnit.Pixel) {
            s.HorizontalContraint = c1.Orientation == Orientation.Direct ? Contraint.__Default : Contraint.__UndirectPointLength;
            s.Width = c2.Val.Minus(c1.Val).Abs();
            if (c1.Orientation == Orientation.Direct)
                s.Left = c1.Val;
            else
                s.Right = c1.Val;
        }
        else {
            s.HorizontalContraint = c1.Orientation == Orientation.Direct ? Contraint.__DirectPointPoint : Contraint.__UndiirectPointPoint;
            if (c1.Orientation == Orientation.Direct) {
                s.Left = c1.Val;
                s.Right = c2.Val;
            }
            else {
                s.Left = c2.Val;
                s.Right = c1.Val;
            }
        }
    };
    Grid.prototype.setVSiteUndepend = function (s, r1, r2) {
        if (r1.Orientation == r2.Orientation) {
            s.VerticalContraint = r1.Orientation == Orientation.Direct ? Contraint.__Default : Contraint.__UndirectPointLength;
            s.Height = r2.Val.Minus(r1.Val).Abs();
            if (r1.Orientation == Orientation.Direct)
                s.Top = r1.Val;
            else
                s.Buttom = r1.Val;
        }
        else {
            s.VerticalContraint = r1.Orientation == Orientation.Direct ? Contraint.__DirectPointPoint : Contraint.__UndiirectPointPoint;
            if (r1.Orientation == Orientation.Direct) {
                s.Top = r1.Val;
                s.Buttom = r2.Val;
            }
            else {
                s.Top = r2.Val;
                s.Buttom = r1.Val;
            }
        }
    };
    Grid.prototype.SetSite = function (s, row, col, nrow, ncol) {
        if (nrow === void 0) { nrow = 1; }
        if (ncol === void 0) { ncol = 1; }
        if (nrow < 1)
            nrow = 1;
        if (ncol < 1)
            ncol = 1;
        if (!(col >= 0 && (col + ncol < this.Columns.length - 1)))
            return false;
        if (!(row >= 0 && (row + nrow < this.Rows.length - 1)))
            return false;
        var r1 = this.Rows.get(row);
        var r2 = this.Rows.get(row + nrow);
        var c1 = this.Columns.get(col);
        var c2 = this.Columns.get(col + ncol);
        if (this.Depend) {
            this.setHSiteUndepend(s, c1, c2);
            this.setVSiteUndepend(s, r1, r2);
        }
        else
            throw new NotImplimented("Depend strategy not Implemented yet");
        return true;
    };
    Grid.prototype.SetRegion = function (reg, row, col, nrow, ncol) {
        if (nrow === void 0) { nrow = 1; }
        if (ncol === void 0) { ncol = 1; }
        if (nrow < 1)
            nrow = 1;
        if (ncol < 1)
            ncol = 1;
        if (!(col >= 0 && (col + ncol <= this.Columns.length)))
            return false;
        if (!(row >= 0 && (row + nrow <= this.Rows.length)))
            return false;
        var l = reg.Location;
        var s = reg.Size;
        var r1 = this.Rows.get(row);
        var r2 = this.Rows.get(row + nrow);
        var c1 = this.Columns.get(col);
        var c2 = this.Columns.get(col + ncol);
        if (c1.RealValue > c2.RealValue) {
            var c = c1;
            c1 = c2;
            c2 = c;
        }
        if (r1.RealValue > r2.RealValue) {
            c = r1;
            r1 = r2;
            r2 = c;
        }
        l.Left = c1.RealValue;
        l.Top = r1.RealValue;
        s.Width = c2.RealValue - l.Left;
        s.Height = r2.RealValue - l.Top;
        return true;
    };
    Grid.prototype.swap = function (t) {
    };
    Grid.prototype.SetDependSite = function (s) { };
    Grid.prototype.Validate = function (isRow) {
        if (isRow) {
            this._SRows.reset();
            this._Rows.clear();
            var validate = new Array(this.Rows.length);
            if (!Grid.reaRange(this.Rows, this._Rows.getStack(), this._SRows, Grid.getNext(validate), validate)) {
                this._SRows.reset();
                return false;
            }
        }
        else {
            this._SColumns.reset();
            this._Columns.clear();
            validate = new Array(this.Columns.length);
            validate.length = this.Columns.length;
            if (!Grid.reaRange(this.Columns, this._Columns.getStack(), this._SColumns, Grid.getNext(validate), validate)) {
                this._SRows.reset();
                return false;
            }
        }
        return true;
    };
    Grid.Validate = function (array) {
        var s = new Stack(array.length);
        if (array != null && array.length > 0) {
            var l = array.length;
            var stackOnProssecing = new Stack(l);
            var validatet = new Array(l);
            var index = Grid.getNext(validatet);
            if (!Grid.reaRange(array, s, stackOnProssecing, index, validatet))
                return null;
        }
        return s.getList();
    };
    Grid.getNext = function (v) {
        for (var i = v.length - 1; i >= 0; i--)
            if (!v[i])
                return i;
        return -1;
    };
    Grid.reaRange = function (array, traited, stackOnProssecing, index, validatet) {
        if (index === void 0) { index = 0; }
        var cE = array.get(index);
        if (stackOnProssecing.exist(cE))
            return false;
        if (traited.exist(cE))
            return true;
        if (cE.repere != null && traited.indexOf(cE.repere) == -1) {
            stackOnProssecing.push(cE);
            if (!this.reaRange(array, traited, stackOnProssecing, array.indexOf(cE.repere), validatet))
                return null;
            stackOnProssecing.pop();
        }
        traited.push(cE);
        validatet[index] = true;
        if (stackOnProssecing.length == 0) {
            var next = Grid.getNext(validatet);
            if (next != -1)
                if (!this.reaRange(array, traited, stackOnProssecing, next, validatet))
                    return null;
        }
        return true;
    };
    Grid.prototype.Update = function (s) {
        this._Rows.foreach(function (i, v) {
            Grid.correct(v, s.Width);
            return false;
        });
        this._Columns.foreach(function (i, v) {
            Grid.correct(v, s.Height);
            return false;
        });
    };
    Grid.correct = function (v, s_width) {
        var realIsNull = v.repere == null;
        var realValues = realIsNull ? null : v.repere.RealValue;
        var v_val = v.Val.val;
        switch (v.Val.Unit) {
            case MesureUnit.Auto:
                throw new NotImplimented("auto UNIT");
            case MesureUnit.Pixel:
                if (realIsNull)
                    if (v.Orientation == Orientation.Direct)
                        v.RealValue = v_val;
                    else
                        v.RealValue = s_width - v_val;
                else if (v.Orientation == Orientation.Direct)
                    v.RealValue = realValues + v_val;
                else
                    v.RealValue = realValues - v_val;
                break;
            case MesureUnit.Percent:
                if (realIsNull)
                    if (v.Orientation == Orientation.Direct)
                        v.RealValue = s_width * v_val / 100;
                    else
                        v.RealValue = s_width * (1 - v_val / 100);
                else if (v.Orientation == Orientation.Direct)
                    v.RealValue = realValues + (s_width - realValues) * v_val / 100;
                else
                    v.RealValue = realValues + (s_width - realValues) * (1 - v_val / 100);
                break;
        }
        return false;
    };
    Grid._Left = new Line1D(0, MesureUnit.Pixel, Orientation.Direct);
    Grid._Top = new Line1D(0, MesureUnit.Pixel, Orientation.Direct);
    Grid._Right = new Line1D(0, MesureUnit.Pixel, Orientation.Undirect);
    Grid._Buttom = new Line1D(0, MesureUnit.Pixel, Orientation.Undirect);
    return Grid;
})();
var setRepere = function (lst, pr, chlds) {
    for (var i = 0; i < chlds.length; i++)
        lst.get(chlds[i]).repere = pr;
};
var Test1 = function () {
    var grid = new Grid();
    var title = grid.SetRow(30, MesureUnit.Pixel, Orientation.Direct);
    Line1D;
    var headBar = grid.SetRow(20, MesureUnit.Percent, Orientation.Undirect);
    headBar.repere = title;
    var footBar = grid.SetRow(30, MesureUnit.Pixel, Orientation.Undirect);
    var leftBorder = grid.SetColumn(4, MesureUnit.Pixel, Orientation.Direct);
    var leftMenu = grid.SetColumn(100, MesureUnit.Pixel, Orientation.Direct);
    leftMenu.repere = leftBorder;
    var rightMenu = grid.SetColumn(50, MesureUnit.Percent, Orientation.Undirect);
    grid.Update(new Size(1024, 640));
    return grid;
};
var Test = function () {
    var s = new List(10);
    for (var i = 0; i < 10; i++)
        s.push(new Line1D(i, i % 2, Orientation.Direct));
    setRepere(s, s.get(0), [1, 2, 3]);
    setRepere(s, s.get(4), [0, 5]);
    setRepere(s, s.get(7), [4]);
    setRepere(s, s.get(8), [7]);
    setRepere(s, s.get(9), [8]);
    return s;
};
var Remove = function (a, e) {
    var i = a.indexOf(e);
    if (i == -1)
        return;
    var l = a.length - 1;
    for (var j = i; j < l; j++)
        a[i] = a[i + 1];
    a.length--;
};
//# sourceMappingURL=basics.js.map