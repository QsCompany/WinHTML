////var module;
//var exports;
//var define;
//var global;
////var require;
//function init(e) {
//    if ("object" == typeof exports && "undefined" != typeof module)
//        module.exports = e();
//    else if ("function" == typeof define && define.amd)
//        define([], e);
//    else {
//        var f;
//        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Slideout = exports = e();
//    }
//};
//class file {
//    source: {};
//    forexports:number[];
//    updated: {};
//    uploaderFile() {
//        var t = this.source;
//        var n = this.updated;
//        var r = this.forexports;
//        function s(o, u?) {
//            if (!n[o]) {
//                if (!t[o]) {
//                    var a = typeof require == "function" &&  require;
//                    if (!u && a) return a(o, !0);
//                    if (i) return i(o, !0);
//                    var f = new Error("Cannot find module '" + o + "'");
//                    throw (<any>f).code = "MODULE_NOT_FOUND", f;
//                }
//                var l = n[o] = {
//                    exports: {}
//                };
//                t[o][0].call(l.exports, e => {
//                    var n = t[o][1][e];
//                    return s(n ? n : e);
//                }, l, l.exports, this.uploaderFile, t, n, r);
//            }
//            return n[o].exports;
//        }
//        var i = typeof require == "function" && require;
//        for (var o = 0; o < r.length; o++) s(r[o]);
//        return s;
//    }
//    init(e) {
//        if ("object" == typeof exports && "undefined" != typeof module)
//            module.exports = e();
//        else if ("function" == typeof define && define.amd)
//            define([], e);
//        else {
//            var f;
//            "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Slideout = exports = e();
//        }
//    }
//}
//var myfile = new file();
//init(myfile.uploaderFile()); 
//# sourceMappingURL=CLR.js.map