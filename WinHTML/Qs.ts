enum ModuleType {
    Namespace= 0,
    Class= 1,
    Function= 2,
}
class ptr<T> {
    value:T;
}
class Trace {
    Error:Error
    Trace :string;
}
class Logger {
    public static Errors: List<Trace> = new List<Trace>(50);
    public static States: Dictionary<string, List<Object>> = new Dictionary<string, List<Object>>();
}
class space {
    public _name: string;
    public _loaded: boolean;
    public parent: ptr<mm> = new ptr<mm>();
    public moduleInitializer: List<(define, require: <T extends Function>(string) => T) => void> = new List<(define, require: <T extends Function>(string) => T) => void>(4);

}
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
class code implements Function {
    constructor() {
        __extends(this, Function);
    }
    apply(thisArg: any, argArray?: any): any {
    }

    /**
      * Calls a method of an object, substituting another object for the current object.
      * @param thisArg The object to be used as the current object.
      * @param argArray A list of arguments to be passed to the method.
      */
    call(thisArg: any, ...argArray: any[]): any {
    }

    /**
      * For a given function, creates a bound function that has the same body as the original function. 
      * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
      * @param thisArg An object to which the this keyword can refer inside the new function.
      * @param argArray A list of arguments to be passed to the new function.
      */
    bind(thisArg: any, ...argArray: any[]): any {
    }

    prototype: any = Function.prototype;
    length: number=0;

    // Non-standard extensions
    arguments: any=[];
    caller: Function = function () {
    }
}
class data extends space {
    public usings: mm[] = [];
    public type: ModuleType;    
    public dataScop = {};    
    public public: List<any> = new List<any>(10);
    public private: List<any> = new List<any>(10);

    constructor() {
        super();
        (<any>this).dataScop.__proto__ = null;
    }
}
class mm {
    private static _root: mm;
    static get root(): mm {
        if (mm._root) return mm._root;
        mm._root = new mm('global', null,ModuleType.Namespace);
        mm._root.Pdb._loaded = true;
        mm.currentContext.push(mm._root);       
        return mm._root;
    }
    
    public static currentContext: List<mm> = new List<mm>(10);
    private static allModules: mm[] = [];
    public Pdb: data;
    constructor(name: string, parent: mm,type:ModuleType) {        
        mm.allModules.push(this);        
        var pdb = new data();
        Object.defineProperty(this, 'Pdb', { get: function () {return pdb }, set: mm.empty, configurable: false, enumerable: false });
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

    private getPathOrCreate(paths: string, isNew: ptr<boolean>,type:ModuleType) {
        isNew = isNew || new ptr<boolean>();
        var path = paths.split('.');
        var t = this;
        var k: mm;
        var l = path.length;
        var c: string;
        for (var i = 0; i < l; i++) {
            c = path[i].toLowerCase().trim();
            if (c == '') continue;
            if (c == '^') {
                k = t.Pdb.parent.value;
                if (k == null) throw 'path not accessible :' + paths;
            } else {
                k = t[c];
                if (k == null || !(k instanceof mm)) {
                    k = new mm(c, t,type);
                    isNew.value = true;
                }
            }
            t = k;
        }
        return t;
    }
    private getPath(paths: string): mm {
        var path = paths.split('.');
        var t = this;
        var c: string;
        for (var i = 0; i < path.length; i++) {
            if (!t.Pdb._loaded && t.Pdb.moduleInitializer.length != 0)
                t.excecutePath();
            c = path[i].toLowerCase().trim();
            if (c == '') continue;
            t = c == '^' ? t.Pdb.parent : t[c];
            if (t == null) return null;
        }
        return t;
    }
    get Depth(): number {
        var temp = this;
        var i = 0;
        while (temp) {
            i++; temp = temp.Pdb.parent.value;
        }
        return i;
    }
    
    private excecutePath(): mm {
        var temp = this;
        var arr: mm[] = new Array(this.Depth);
        var i = 0;
        while (i < arr.length)
            if (temp.Pdb._loaded) break;
            else { arr[i++] = temp; temp = temp.Pdb.parent.value };
        while (--i >= 0)
            arr[i].ExcecuteScop();
        return this;
    }
    public ExcecuteScop(): Object {
        if (this.Pdb._loaded) return this.Pdb.dataScop;
        this.Pdb._loaded = true;
        mm.currentContext.push(this);
        var sc = this.Pdb.moduleInitializer;        
        var pr = this.Pdb.parent.value || mm._root;
        for (var i = 0; sc.length > i; i++) {
            var ini = sc.get(i);
            var x = ini(define.bind(this), require.bind(this));
            if (this.Pdb.type == ModuleType.Class) {
                Object.defineProperty(pr.Pdb.dataScop, this.Pdb._name, { get: function () {return x }, set: mm.empty, configurable: false, enumerable: false });
                Object.defineProperty(this.Pdb, 'dataScop', { get: function () {return x }, set: mm.empty, configurable: false, enumerable: false });
            }
        }
        mm.currentContext.pop();
        return this.Pdb.dataScop;
    }  
    private addProperty(name: string, value: mm) {
        Object.defineProperty(this, name, {
            get: function () {
                return value;
            }, set: mm.empty, enumerable: true, configurable: false
        });
    }
    public static empty() { throw 'not supported'; }

    public define(moduleName: string, initializer: (define, require: <T extends Function>(string) => T) => void,type:ModuleType): mm {
        if (!(this instanceof mm))
            return mm.root.define(moduleName, initializer,type);
        var isnew = new ptr<boolean>();
        var x = this.getPathOrCreate(moduleName, isnew,type);
        if (!isnew)
            console.warn('module of path:' + moduleName + ' was uploaded more then one.');
        x.Pdb.moduleInitializer.push(initializer.bind(x.Pdb.dataScop));
        return x;
    }
    public using(assemblyName: string): mm {
        if (this.Pdb.type != ModuleType.Namespace) throw '"using" : not allowed outside of namespace';
        var c = this.getPath(assemblyName) || mm._root.getPath(assemblyName);
        if (c == null) throw 'module not found :' + assemblyName;
        this.Pdb.usings.push(c);
        return c;
    }
    public require<T extends Function>(moduleName: string, allsubs?: boolean): Object {
        var x = this;
        try {
        if (
            this.Pdb.type == ModuleType.Class) x = this.Pdb.parent.value;
            var c = x.getPath(moduleName);
            if (c != null)
                if (!c.Pdb._loaded) c.excecutePath();
            if (c == null)
                for (var i = x.Pdb.usings.length - 1; i >= 0; i--) {
                    c = x.Pdb.usings[i].getPath(moduleName);
                    if (c != null) return c.excecutePath();
                }
            if (allsubs)
                c.requireall();
        } catch (e) {
            Logger.Errors.push({ Error: e, Trace: (e.Trace ? e.Trace + '\r\n\t' : '') + ': require ' + moduleName });
            return null;
        }
        if (c == null) return null;
        return c.Pdb.dataScop;
    }
    private static fullyDownloaded: List<mm> = new List<mm>(20);
    private static needforDownload: List<mm> = new List<mm>(20);
    private requireall() {
        for (var i in this) {
            var q: mm = this[i];
            if (q instanceof mm) {
                if (!q.Pdb._loaded)
                    q.ExcecuteScop();
                q.requireall();
            }
        }
    }
};

function define(moduleName: string, initializer: (define, require: <T extends Function>(string) => T) => void,type:ModuleType):mm {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last || mm.root;
    return x.define(moduleName, initializer, type);
}
function require<T extends Function>(moduleName: string, allsubs: boolean= false): T {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last || mm.root;
    return <T>x.require(moduleName,allsubs);
}
function using(namespace: string): mm {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last || mm.root;
    return x.using(namespace);
}
function room(className: string, fn: (define, require: <T extends Function>(string) => T) => Function) {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last || mm.root;
    if (x.Pdb.type == ModuleType.Class) throw Error('class cannot support others classes : but reserved for next version.');
    x = x.define(className, fn, ModuleType.Class);
    x.Pdb.type = ModuleType.Class;
}
function namespace(name: string, initializer: (define, require: <T extends Function>(string) => T) => void) {
    var x = define(name, initializer,ModuleType.Namespace);
    x.Pdb.type = ModuleType.Namespace;
};
(<any>Object).prototype.public = function (name: string) {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last;
    if (x == null) throw 'context not defined';
    if (x.Pdb.type == ModuleType.Class) {
        x.Pdb.public.push(this);
    } else throw 'not acepted';
};
(<any>Object).prototype.private = function (name: string) {
    var x = (this instanceof mm) ? (<mm>this) : mm.currentContext.Last;
    if (x == null) throw 'context not defined';
    if (x.Pdb.type == ModuleType.Class) {
        x.Pdb.private.push(this);
    } else throw 'not acepted';
}

namespace("system", function(define, require)  {
    room('net', function (define, require)  {
        var i = 0;   
        var self = this;  
        function http() {
            return self.im++;
        };
        Object.defineProperty(this, 'im', { get: function () { return i; }, set: function (e) { i = e; }});
        (<any>http).private('http');        
        return http;
    });
});
namespace("system", function (define, require){
    room('net2', function (define, require) {
        function http2() {
            var net = <any>require('net');
            __extends(this, net);            
            return net;
        };
        (<any>http2).public('http2');
        return http2;
    });
});
var system = require('system', true);
var x = (<any>system).net2();
var x = (<any>system).net();
var x = (<any>system).net();
var w = x;
function QsHelp() {
    return 
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