/**
  * Excecute a function synchrounouns with the the global script
  * @param uriComponent A value representing an encoded URI component.
  */
var Thread = (function () {
    /**
      * Excecute a function synchrounouns with the the global script
      * @param fn representing a short life function.
      */
    function Thread(fn, timeout) {
        if (timeout === void 0) { timeout = 500; }
        this.timeout = timeout;
        this.hdc = -1;
        this.fn = null;
        if (fn instanceof Function)
            this.fn = fn;
        else
            throw Error('must be a function');
    }
    Thread.prototype.start = function () {
        Thread.threads.push(this);
        this.hdc = setInterval(this.fn, 100);
    };
    Thread.prototype.stop = function () {
        Thread.threads.remove(this);
        clearInterval(this.hdc);
    };
    Thread.threads = new List(10);
    return Thread;
})();
var Events;
(function (Events) {
    Events[Events["ScriptFileDownloaded"] = 0] = "ScriptFileDownloaded";
    Events[Events["CSSFileDownloaded"] = 1] = "CSSFileDownloaded";
})(Events || (Events = {}));
var EventStore = (function () {
    function EventStore(Event, fn, data) {
        this.Event = Event;
        this.fn = fn;
        this.data = data;
    }
    return EventStore;
})();
var dsi = (function () {
    function dsi(prg) {
        this.prg = prg;
        this.toimportscripts = new List(5);
    }
    return dsi;
})();
var errorStack = (function () {
    function errorStack(fun, source, line, column) {
        this.fun = fun;
        this.source = source;
        this.line = line;
        this.column = column;
    }
    return errorStack;
})();
var trace = (function () {
    function trace(elemineLevels) {
        if (elemineLevels === void 0) { elemineLevels = 0; }
        try {
            document.a.s.d();
        }
        catch (ex) {
            this.parse(ex.stack, elemineLevels + 1);
        }
    }
    trace.prototype.parse = function (_trace, elemineLevels) {
        if (elemineLevels === void 0) { elemineLevels = 0; }
        var stacks = _trace.split('\n');
        while (elemineLevels-- != -1)
            stacks.shift();
        var x = trace.w.exec(stacks[elemineLevels]);
        if (x == null)
            throw "fatall Error";
        else if (!x[1] || !x[2] || !x[3])
            return false;
        this.fun = x[1].trim();
        this.source = x[2].trim();
        this.line = parseInt(x[3]);
        this.column = parseInt(x[4]);
    };
    trace.w = /\s*at\s*([\w.\s]*)+\s*\(([^ ]*):(\d*):(\d*)\s*\)\s*$/;
    return trace;
})();
var Secure = (function () {
    function Secure() {
    }
    Secure.isthrust = function (o, ot, ft) {
        if (ft.source == ot.source)
            return true;
        return false;
    };
    Secure.setProperty = function (o, name, get, set) {
        var c = new trace(1);
        var self = this;
        var value;
        Object.defineProperty(o, name, {
            get: function () {
                if (Secure.isthrust(o, c, new trace(1)))
                    return value;
            },
            set: function (v) {
                if (Secure.isthrust(o, c, new trace(1)))
                    value = v;
            }, enumerable: false, configurable: false
        });
    };
    return Secure;
})();
var Program = (function () {
    function Program() {
        this.events = [];
        this.hash = Math.floor(Math.random() * 12433422);
        this.scripts = new List(10);
        var th = null;
        Secure.setProperty(this, 'mythread', function () {
            return th;
        }, function (o) {
            th = o;
        });
        this.mythread = new Thread(this.observer.bind(this), 500);
    }
    Program.ISR = function () {
        var dis = Program.dsis.shift();
        var l = dis.toimportscripts.length;
        function jm() {
            var x = dis.prg.mythread;
        }
        ;
        jm();
        Program.ISR.jm = jm;
        Program.ISR.jm();
        for (var i = 0; i < l; i++) {
            var s = dis.toimportscripts.get(i);
            dis.prg.dispatchEvent(Events.ScriptFileDownloaded, { srcElement: s });
            dis.prg.scripts.push(s);
            alert(s);
        }
        document.head.removeChild(dis.hash);
    };
    Program.prototype.importScripts = function (scripts) {
        scripts.push('./complete.js');
        this.hash = 0;
        var cdsi = new dsi(this);
        var lst;
        scripts.forEach(function (v, i, a) {
            lst = document.createElement('script');
            lst.async = !true;
            lst.src = v;
            cdsi.toimportscripts.push(lst);
            document.head.appendChild(lst);
        });
        cdsi.toimportscripts.pop();
        cdsi.hash = lst;
        Program.dsis.push(cdsi);
    };
    Program.prototype.observer = function () {
    };
    Program.prototype.dispatchEvent = function (event, e) {
        var ls = this.events;
        var l = ls.length;
        for (var i = 0; i < l; i++) {
            var d = ls[i];
            if (d.Event == event)
                d.fn(e, d.data);
        }
    };
    Program.prototype.addEventListener = function (event, fn, data) {
        this.events.push(new EventStore(event, fn, data));
    };
    Program.dsis = new List(3);
    return Program;
})();
//# sourceMappingURL=thread.js.map