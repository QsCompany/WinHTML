var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["Namespace"] = 0] = "Namespace";
    ModuleType[ModuleType["Class"] = 1] = "Class";
    ModuleType[ModuleType["Function"] = 2] = "Function";
})(ModuleType || (ModuleType = {}));
var ptr = (function () {
    function ptr() {
    }
    return ptr;
})();
var Trace = (function () {
    function Trace() {
    }
    return Trace;
})();
var Logger = (function () {
    function Logger() {
    }
    Logger.Errors = new List(50);
    Logger.States = new Dictionary();
    return Logger;
})();
var space = (function () {
    function space() {
        this.parent = new ptr();
        this.moduleInitializer = new List(4);
    }
    return space;
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var code = (function () {
    function code() {
        this.prototype = Function.prototype;
        this.length = 0;
        // Non-standard extensions
        this.arguments = [];
        this.caller = function () {
        };
        __extends(this, Function);
    }
    code.prototype.apply = function (thisArg, argArray) {
    };
    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    code.prototype.call = function (thisArg) {
        var argArray = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argArray[_i - 1] = arguments[_i];
        }
    };
    /**
      * For a given function, creates a bound function that has the same body as the original function.
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    code.prototype.bind = function (thisArg) {
        var argArray = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argArray[_i - 1] = arguments[_i];
        }
    };
    return code;
})();
var data = (function (_super) {
    __extends(data, _super);
    function data() {
        _super.call(this);
        this.usings = [];
        this.dataScop = {};
        this.public = new List(10);
        this.private = new List(10);
        this.dataScop.__proto__ = null;
    }
    return data;
})(space);
var mm = (function () {
    function mm(name, parent, type) {
        mm.allModules.push(this);
        var pdb = new data();
        Object.defineProperty(this, 'Pdb', { get: function () { return pdb; }, set: mm.empty, configurable: false, enumerable: false });
        pdb._name = name;
        pdb.parent.value = parent;
        pdb.type = type;
        if (parent) {
            parent.addProperty(name, this);
            if (type != ModuleType.Class)
                Object.defineProperty(parent.Pdb.dataScop, name, {
                    get: function () {
                        return pdb.dataScop;
                    }, set: mm.empty, enumerable: true, configurable: false
                });
        }
    }
    Object.defineProperty(mm, "root", {
        get: function () {
            if (mm._root)
                return mm._root;
            mm._root = new mm('global', null, ModuleType.Namespace);
            mm._root.Pdb._loaded = true;
            mm.currentContext.push(mm._root);
            return mm._root;
        },
        enumerable: true,
        configurable: true
    });
    mm.prototype.getPathOrCreate = function (paths, isNew, type) {
        isNew = isNew || new ptr();
        var path = paths.split('.');
        var t = this;
        var k;
        var l = path.length;
        var c;
        for (var i = 0; i < l; i++) {
            c = path[i].toLowerCase().trim();
            if (c == '')
                continue;
            if (c == '^') {
                k = t.Pdb.parent.value;
                if (k == null)
                    throw 'path not accessible :' + paths;
            }
            else {
                k = t[c];
                if (k == null || !(k instanceof mm)) {
                    k = new mm(c, t, type);
                    isNew.value = true;
                }
            }
            t = k;
        }
        return t;
    };
    mm.prototype.getPath = function (paths) {
        var path = paths.split('.');
        var t = this;
        var c;
        for (var i = 0; i < path.length; i++) {
            if (!t.Pdb._loaded && t.Pdb.moduleInitializer.length != 0)
                t.excecutePath();
            c = path[i].toLowerCase().trim();
            if (c == '')
                continue;
            t = c == '^' ? t.Pdb.parent : t[c];
            if (t == null)
                return null;
        }
        return t;
    };
    Object.defineProperty(mm.prototype, "Depth", {
        get: function () {
            var temp = this;
            var i = 0;
            while (temp) {
                i++;
                temp = temp.Pdb.parent.value;
            }
            return i;
        },
        enumerable: true,
        configurable: true
    });
    mm.prototype.excecutePath = function () {
        var temp = this;
        var arr = new Array(this.Depth);
        var i = 0;
        while (i < arr.length)
            if (temp.Pdb._loaded)
                break;
            else {
                arr[i++] = temp;
                temp = temp.Pdb.parent.value;
            }
        ;
        while (--i >= 0)
            arr[i].ExcecuteScop();
        return this;
    };
    mm.prototype.ExcecuteScop = function () {
        if (this.Pdb._loaded)
            return this.Pdb.dataScop;
        this.Pdb._loaded = true;
        mm.currentContext.push(this);
        var sc = this.Pdb.moduleInitializer;
        var pr = this.Pdb.parent.value || mm._root;
        for (var i = 0; sc.length > i; i++) {
            var ini = sc.get(i);
            var x = ini(define.bind(this), require.bind(this));
            if (this.Pdb.type == ModuleType.Class) {
                Object.defineProperty(pr.Pdb.dataScop, this.Pdb._name, { get: function () { return x; }, set: mm.empty, configurable: false, enumerable: false });
                Object.defineProperty(this.Pdb, 'dataScop', { get: function () { return x; }, set: mm.empty, configurable: false, enumerable: false });
            }
        }
        mm.currentContext.pop();
        return this.Pdb.dataScop;
    };
    mm.prototype.addProperty = function (name, value) {
        Object.defineProperty(this, name, {
            get: function () {
                return value;
            }, set: mm.empty, enumerable: true, configurable: false
        });
    };
    mm.empty = function () { throw 'not supported'; };
    mm.prototype.define = function (moduleName, initializer, type) {
        if (!(this instanceof mm))
            return mm.root.define(moduleName, initializer, type);
        var isnew = new ptr();
        var x = this.getPathOrCreate(moduleName, isnew, type);
        if (!isnew)
            console.warn('module of path:' + moduleName + ' was uploaded more then one.');
        x.Pdb.moduleInitializer.push(initializer.bind(x.Pdb.dataScop));
        return x;
    };
    mm.prototype.using = function (assemblyName) {
        if (this.Pdb.type != ModuleType.Namespace)
            throw '"using" : not allowed outside of namespace';
        var c = this.getPath(assemblyName) || mm._root.getPath(assemblyName);
        if (c == null)
            throw 'module not found :' + assemblyName;
        this.Pdb.usings.push(c);
        return c;
    };
    mm.prototype.require = function (moduleName, allsubs) {
        var x = this;
        try {
            if (this.Pdb.type == ModuleType.Class)
                x = this.Pdb.parent.value;
            var c = x.getPath(moduleName);
            if (c != null)
                if (!c.Pdb._loaded)
                    c.excecutePath();
            if (c == null)
                for (var i = x.Pdb.usings.length - 1; i >= 0; i--) {
                    c = x.Pdb.usings[i].getPath(moduleName);
                    if (c != null)
                        return c.excecutePath();
                }
            if (allsubs)
                c.requireall();
        }
        catch (e) {
            Logger.Errors.push({ Error: e, Trace: (e.Trace ? e.Trace + '\r\n\t' : '') + ': require ' + moduleName });
            return null;
        }
        if (c == null)
            return null;
        return c.Pdb.dataScop;
    };
    mm.prototype.requireall = function () {
        for (var i in this) {
            var q = this[i];
            if (q instanceof mm) {
                if (!q.Pdb._loaded)
                    q.ExcecuteScop();
                q.requireall();
            }
        }
    };
    mm.currentContext = new List(10);
    mm.allModules = [];
    mm.fullyDownloaded = new List(20);
    mm.needforDownload = new List(20);
    return mm;
})();
;
function define(moduleName, initializer, type) {
    var x = (this instanceof mm) ? this : mm.currentContext.Last || mm.root;
    return x.define(moduleName, initializer, type);
}
function require(moduleName, allsubs) {
    if (allsubs === void 0) { allsubs = false; }
    var x = (this instanceof mm) ? this : mm.currentContext.Last || mm.root;
    return x.require(moduleName, allsubs);
}
function using(namespace) {
    var x = (this instanceof mm) ? this : mm.currentContext.Last || mm.root;
    return x.using(namespace);
}
function room(className, fn) {
    var x = (this instanceof mm) ? this : mm.currentContext.Last || mm.root;
    if (x.Pdb.type == ModuleType.Class)
        throw Error('class cannot support others classes : but reserved for next version.');
    x = x.define(className, fn, ModuleType.Class);
    x.Pdb.type = ModuleType.Class;
}
function namespace(name, initializer) {
    var x = define(name, initializer, ModuleType.Namespace);
    x.Pdb.type = ModuleType.Namespace;
}
;
Object.prototype.public = function (name) {
    var x = (this instanceof mm) ? this : mm.currentContext.Last;
    if (x == null)
        throw 'context not defined';
    if (x.Pdb.type == ModuleType.Class) {
        x.Pdb.public.push(this);
    }
    else
        throw 'not acepted';
};
Object.prototype.private = function (name) {
    var x = (this instanceof mm) ? this : mm.currentContext.Last;
    if (x == null)
        throw 'context not defined';
    if (x.Pdb.type == ModuleType.Class) {
        x.Pdb.private.push(this);
    }
    else
        throw 'not acepted';
};
namespace("system", function (define, require) {
    room('net', function (define, require) {
        var i = 0;
        var self = this;
        function http() {
            return self.im++;
        }
        ;
        Object.defineProperty(this, 'im', { get: function () { return i; }, set: function (e) { i = e; } });
        http.private('http');
        return http;
    });
});
namespace("system", function (define, require) {
    room('net2', function (define, require) {
        function http2() {
            var net = require('net');
            __extends(this, net);
            return net;
        }
        ;
        http2.public('http2');
        return http2;
    });
});
var system = require('system', true);
var x = system.net2();
var x = system.net();
var x = system.net();
var w = x;
function QsHelp() {
    return;
    '    namespace("System", (define, require: <T extends Function>(string) => T): void => {\r\n' +
        '        namespace("Net", (define, require: <T extends Function>(string) => T): void => {\r\n' +
        +'            using("System.net");\r\n'
        + '            room("http", (define, require): Function => {\r\n' +
        +'                function http() {\r\n'
        + '                    console.debug("Achour", "", "", "1");\r\n'
        + '                };\r\n'
        + '                return http\;\r\n'
        + '            });\r\n'
        + '        });'
        + '        var s = require("Net");\r\n'
        + '        namespace("Nets", (define, require: <T extends Function>(string) => T): void => {\r\n'
        + '            using("System.net");\r\n'
        + '        });\r\n'
        + '    });\r\n'
        + '    var global = require(".", true);\r\n'
        + '    var net1 = require("System.Net");\r\n'
        + '    var net2 = require("System.Net");\r\n'
        + '    var net2 = require("System.Nets");\r\n'
        + '    var http = require<() => void>("System.Net.http");\r\n'
        + '    var x = new http();\r\n';
}
//# sourceMappingURL=Qs.js.map