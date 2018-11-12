var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["Namespace"] = 0] = "Namespace";
    ModuleType[ModuleType["Class"] = 1] = "Class";
    ModuleType[ModuleType["Function"] = 2] = "Function";
})(ModuleType || (ModuleType = {}));
var out = (function () {
    function out() {
    }
    return out;
})();
var mm = (function () {
    function mm(name, parent) {
        this.usings = [];
        this.sous = new List(10);
        mm.allModules.push(this);
    }
    mm.prototype.getPathOrCreate = function (paths, isNew) {
        isNew = isNew || new out();
        var path = paths.split('.');
        var t = this;
        var k;
        var c;
        for (var i = 0; path.length != 0; i++) {
            c = path[i].toLowerCase().trim();
            if (c == '')
                continue;
            if (c == '^') {
                k = t.parent;
                if (k == null)
                    throw 'path not accessible :' + paths;
            } else {
                k = t[c];
                if (k == null || !(k instanceof mm)) {
                    t.addProperty(c, k = new mm(c, t));
                    isNew.value = true;
                }
            }
            t = k;
        }
        return t;
    };
    mm.prototype.getPath = function (paths) {
        var path = paths.split('.');
        var t = mm.root;
        var k;
        var c;
        for (var i = 0; path.length != 0; i++) {
            c = path[i].toLowerCase().trim();
            if (c == '')
                continue;
            t = c == '^' ? t.parent : t[c];
            if (t == null)
                return null;
        }
        return t;
    };
    mm.prototype.addProperty = function (name, value) {
        Object.defineProperty(this, name, {
            get: function () {
                return mm;
            }, set: null, enumerable: true, configurable: false
        });
    };
    mm.prototype.Excecute = function (f, args) {
        f.call(this, args);
    };

    mm.prototype.define = function (moduleName, initializer) {
        if (!(this instanceof mm))
            return mm.root.define(moduleName, initializer);
        var isnew = new out();
        var x = this.getPathOrCreate(moduleName, isnew);
        if (!isnew)
            console.warn('module of path:' + moduleName + ' was uploaded more then one.');
        if (this != mm.root)
            x.parentScop = this;
        this.moduleInitializer = initializer;
    };
    mm.prototype.using = function (assemblyName) {
        if (this.type != 0 /* Namespace */)
            throw '"using" : not allowed outside of namespace';
        var c = this.getPath(assemblyName);
        if (c == null)
            throw 'module not found :' + assemblyName;
        this.usings.push(c);
        return c;
    };
    mm.prototype.require = function (moduleName) {
        var c = this.getPath(moduleName);
        if (c != null)
            return new c.moduleInitializer(c, c.define, c.require);
        for (var i = this.usings.length - 1; i >= 0; i--) {
            c = this.usings[i].getPath(moduleName);
            if (c != null)
                return c;
        }
        return null;
    };
    mm.allModules = [];
    return mm;
})();
;
function define(moduleName, initializer) {
    if (!(this instanceof mm))
        return mm.root.define(moduleName, initializer);
    var isnew = new out();
    var x = this.getPathOrCreate(moduleName, isnew);
    if (!isnew) {
        console.warn('module of path:' + moduleName + ' was uploaded more then one.');
    }
    this.moduleInitializer = initializer;
}
function using(namespace) {
    if (!(this instanceof mm))
        throw '"using" : not allowed outside of namespace';
    return this.using(namespace);
}
function namespace(name, initializer) {
    var x = define(name, initializer);
    x.type = 0 /* Namespace */;
}
namespace('System', function (system, define, require) {
    namespace('Net', function (net, define, require) {
        using('System.net');
    });
});
var t;
var mapper = (function () {
    function mapper() {
    }
    return mapper;
})();
//# sourceMappingURL=file1.js.map
