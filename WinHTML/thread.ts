/**
  * Excecute a function synchrounouns with the the global script
  * @param uriComponent A value representing an encoded URI component.
  */
class Thread {
    public static threads: List<Thread> = new List<Thread>(10);
    private hdc: number = -1;
    private fn: Function = null;
    
    /**
      * Excecute a function synchrounouns with the the global script
      * @param fn representing a short life function.
      */
    constructor(fn: Function,private timeout:number=500) {
        if (fn instanceof Function)
            this.fn = fn;
        else throw Error('must be a function');
    }
    start() {
        Thread.threads.push(this);
        this.hdc = setInterval(this.fn, 100);
    }
    stop() {
        Thread.threads.remove(this);
        clearInterval(this.hdc);
    }
}

enum Events {
    ScriptFileDownloaded,
    CSSFileDownloaded,
}
class EventStore {
    constructor(public Event: Events, public fn: (e: Event, data: Object) => void, public data: Object) {

    }
}
class dsi {
    public toimportscripts: List<HTMLScriptElement> = new List<HTMLScriptElement>(5);
    public hash: HTMLElement;
    constructor(public prg: Program) {

    }
}
class errorStack {
    constructor(public fun: string, public source: string, public line: number,public column:number) {
    }

}
class trace {
    constructor(elemineLevels= 0) {
        try {
            (<any>document).a.s.d();
        } catch (ex) {
            this.parse(ex.stack, elemineLevels + 1);
        }
    }
    public fun: string;
    public source: string;
    public line: number;
    public column: number;
    private static w = /\s*at\s*([\w.\s]*)+\s*\(([^ ]*):(\d*):(\d*)\s*\)\s*$/;
    private parse(_trace: string, elemineLevels: number= 0) {
        var stacks = _trace.split('\n');
        while (elemineLevels-- != -1)
            stacks.shift();
        var x = trace.w.exec(stacks[elemineLevels]);
        if (x == null) throw "fatall Error";
        else if (!x[1] || !x[2] || !x[3]) return false;
        this.fun = x[1].trim();
        this.source = x[2].trim();
        this.line = parseInt(x[3])
        this.column = parseInt(x[4]);
    }
}
class Secure {
    constructor() {
    }
    
    private static isthrust(o: Object, ot: errorStack, ft: errorStack): boolean {        
        if (ft.source == ot.source) return true;
        return false;
    }
    public static setProperty(o: Object, name: string, get: () => any, set: (v: any) => void) {
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
    }
}
class Program {
    private events: EventStore[] = [];
    private mythread: Thread;
    private hash: number =Math.floor(Math.random() * 12433422);
    private scripts: List<HTMLScriptElement> = new List<HTMLScriptElement>(10);
    private static dsis: List<dsi> = new List<dsi>(3);
    constructor() {
        var th = null;
        Secure.setProperty(this, 'mythread', function () {
            return th;
        }, function (o) {
                th = o;
            });
        this.mythread = new Thread(this.observer.bind(this), 500);
    }
    public static ISR() {
        var dis: dsi = Program.dsis.shift();
        var l = dis.toimportscripts.length;
        function jm() {

            var x = dis.prg.mythread;
        };
        jm();
        (<any>Program).ISR.jm = jm;
        (<any>Program).ISR.jm();
        for (var i = 0; i < l; i++) {
            var s = dis.toimportscripts.get(i);
            dis.prg.dispatchEvent(Events.ScriptFileDownloaded, <Event>{ srcElement: <Element>s });
            dis.prg.scripts.push(s);
            alert(s);
            
        }
        document.head.removeChild(dis.hash);
    }
    public importScripts(scripts: string[]) {
        scripts.push('./complete.js');
        this.hash = 0;
        var cdsi: dsi = new dsi(this);
        var lst: HTMLScriptElement;
        scripts.forEach((v, i, a) => {
            lst = document.createElement('script');
            lst.async = !true;
            lst.src = v;
            cdsi.toimportscripts.push(lst);
            document.head.appendChild(lst);
        });
        cdsi.toimportscripts.pop();
        cdsi.hash = lst;
        Program.dsis.push(cdsi);
    }
    private observer() {
        
    }
    private dispatchEvent(event:Events,e: Event) {
        var ls = this.events;
        var l = ls.length;        
        for (var i = 0; i < l; i++) {
            var d = ls[i];
            if (d.Event == event)
                d.fn(e, d.data);
            
        }
    }
    public addEventListener<T>(event: Events, fn: (e: Event, data: Object) => void, data: T) {
        this.events.push(new EventStore(event, fn, data));
    }
}