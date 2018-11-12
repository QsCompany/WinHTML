///<reference path="./ts/STheme.ts"/>
(<any>window).exports = (<any>window).exports || {};
class parse {
    public static removedElements = new List<parse>(100);
    public static addedElements = new List<parse>(100);
    public childes = new List<parse>(10);
    public parent:Node=null;
    constructor(public main :Node){
        (<any>main).idle = this;
        parse.addedElements.push(this);
        this.parent = main.parentNode;
    }
    public get isAlive() { return this.main.parentNode != null; }
    public begin(){
        var lstc = this.childes.length;
        var x:any = this.main.childNodes;
        var l = x.length;
        var rm = 0;
        for(var i = 0;i < l;i++){
            var e = x.item(i);
            if((<any>e).idle == null){
                this.childes.push(new parse(e));
                rm++;
            }
            (<any>e).idle.begin();
        }
        if (this.main.childNodes.length == (lstc + rm)) return;
        var tx = this.childes;
        l = tx.length;
        for(i = 0;i < l;i++){
            var m = tx.get(i);
            if(!m.isAlive){
                parse.removedElements.push(m);
                tx.removeAt(i);
                (<any>m).main.idle = null;
                i--;
                l--;
            }
        }
    }

    public static OnObservator(){
        body = new parse(document.body);
        lastLength = document.body.outerHTML.length;
        body.begin();
        setInterval(parse.eventFirer, 100);
    }
    private static  eventFirer(){
    if (document.body.outerHTML.length != lastLength) {
        parse.addedElements.clear();
        parse.removedElements.clear();
        body.begin();
        lastLength = document.body.outerHTML.length;
        parse.addedElements.foreach((i, v) => {

            var wx: List<(ars) => void> = (<any>window).onChildInserted;
            if (wx.length == 0) return false;
            wx.foreach((i, v) => { return (<any>v(x)) == true; });

            var x: List<(ars) => void> = (<any>v.main.parentNode).onChildInserted;
            if (x.length == 0) return false;
            x.foreach((i, v) => { return (<any>v(x)) == true; });
            return false;
        });
        parse.removedElements.foreach((i, v) => {
            var wx: List<(ars) => void> = (<any>window).onChildRemoved;
            if (wx.length == 0) return false;
            wx.foreach((i, v) => { return (<any>v(x)) == true; });


            var x: List<(ars) => void> = (<any>v.main.parentNode).onChildRemoved;
            if (x == null) return false;
            x.foreach((i, v) => { return (<any>v(x)) == true; });
            return false;
        });
    }    
}
}

var body = null;
var lastLength = 0;

(() =>{
    var events = new List< (args) => void >(10);
    Object.defineProperty(HTMLElement.prototype, 'onChildInserted', {
        get :() =>{ return events.length == 0 ? null : events; },
        set :(v :(args) => void) =>{ events.push(v.bind(eval('this'))); },
        configurable :false,
        enumerable :false
    })
    var revents = new List< (args) => void >(10);
    Object.defineProperty(HTMLElement.prototype, 'onChildRemoved', {
        get :() =>{ return revents.length == 0 ? null : revents; },
        set :(v :(args) => void) =>{ revents.push(v.bind(eval('this'))); },
        configurable :false,
        enumerable :false
    })
})();
(() => {
    var events = new List< (args) => void>(10);
    Object.defineProperty(window, 'onChildInserted', {
        get: () => { return events; },
        set: (v: (args) => void) => { events.push(v.bind(eval('this'))); },
        configurable: false,
        enumerable: false
    })
    var revents = new List<(args) => void>(10);
    Object.defineProperty(window, 'onChildRemoved', {
        get: () => { return revents; },
        set: (v: (args) => void) => { revents.push(v.bind(eval('this'))); },
        configurable: false,
        enumerable: false
    })
})();


 function update() {
    var l = $(".mytable");
    var i;
    for (i=l.length - 1; i >= 0; i--) {
        my.controls.Table.Standard(l[i], l[i].parentElement);
    }
    l = $('dialog');

    for (i=l.length - 1; i >= 0; i--) {
        var m = l[i];
        {
            var d;
            (<any>m).diag = d = new my.controls.Dialog(m);
            d.onChildInserted = function(c){
                
            };
        }
    }

    l = $("tabpage");
    
    for (i=l.length - 1; i >= 0; i--)
        my.controls.TabPage.Parse(l[i]);
}
//window.document.onload = Update;


//for (var i = 0; i < path.length; i++) {
    //    var s = document.createElement('script');
    //    s.src = path[i];
    //    (<any>s).async = 'defer';
    //    path[i] = s;

    //}
    //for (var i = 0; i < path.length; i++) {
    //    document.head.appendChild(path[i]);
    //}


//addScript([
//    './js/jquery-1.10.2.min.js',
//    './js/bootstrap.min.js',
//    './ts/Slideout.js'
//]);
//usingcss([
//    './css/bootstrap.min.css',
//    'app.css',
//    './css/jPicker-1.1.6.min.css',
//    './css/6fa614521016.css',
//    './css/4f5f699890b5.css',
//    './css/site.css',
//    './css/index.css',
//    './css/test.css'
//]);

export module my.utils {

    export enum Keys {
        left=37,
        up=38,
        right=39,
        down=40,
        pageUp=33,
        pageDown=34,
        end = 35,
        home = 36,
        esc=27,
        enter=13,
        ctrl=17,
        tab=9,
        back=8,
        menu=93,
        suppr=46,
        capsLock = 20,
        shift = 16,
        f1 = 112,
        inser = 45,
        alt=18,
        pause = 19,
        attn = 3,
        mediaNext = 176,
        mediaPrevieus=177,
        mediaStop = 178,
        mediaPlay = 179,
        help=255,
    }

    export class delegater {
        constructor(private f1 :Function, private f2 :Function){}

        public static merge(f1 :Function, f2 :Function) :Function{
            if(f1==null) return f2;
            if(f2==null) return f1;
            var k = () =>{
                var args = eval('arguments');
                f1.apply(f1, args);
                return f2.apply(f2, args);
            };
            (<any>k).delegate = new delegater(f1, f2);
            return k;
        }

        private static isDelegate(f :Function) :boolean{ return (<any>f).delegate!=null; }

        public static Delete(deleg :Function, f2 :Function, out={ val :false }) :Function{
            var x = <any>deleg;
            if(! delegater.isDelegate(deleg)) return deleg==f2 ? null : deleg;
            if(x.delegate.f2==f2){
                out.val = true;
                return x.delegate.f1;
            }
            if(x.delegate.f1==f2){
                out.val = true;
                return x.delegate.f2;
            }
            if(delegater.isDelegate(x.delegate.f1)){
                var ret = delegater.Delete(x.delegate.f1, f2, out);
                if(out.val) return ret;
                if(delegater.isDelegate(x.delegate.f2)){
                    ret = delegater.Delete(x.delegate.f2, f2, out);
                    if(out.val) return ret;
                }
            }
            return deleg;
        }
    }

    export  class out {
        constructor(public value? :Object){}
    }

    export  class _pg {
        constructor(public init :() => Object, public lst :Stack< Object >){}
    }

    export  class _void {

    }

    export  class Garbage {
        private static _garbag :Dictionary< Function, _pg > = new Dictionary< Function, _pg >();

        public static Initialize(type :Function, init :() => Object) :Stack< Object >{
            if(type==null||type instanceof Function){
                var k = new _pg(init, new Stack< Object >(5));
                Garbage._garbag.Add(type, k);
                return k.lst;
            }
            throw Error;
        }

        private static k;

        public static get< T >(type :Function, out :out) :T{
            var o = Garbage._garbag.Get(type);
            if(o==null){
                return null;
            } else if(o.lst.length==0){
                if(o.init==null) return null;
                return <T>o.init();
            } else return <T>o.lst.pop();
        }

        static Add(type :Function, o :Object){
            var s = Garbage._garbag.Get(type);
            if(s==null) Garbage._garbag.Add(type, s=new _pg(null, new Stack(5)));
            s.lst.push(o);
        }
    }
}

export module my.controls {
    export class Control {
        private _size :size;
        init = (() =>{
            utils.Garbage.Initialize(Control, null);
            eval('delete Control.init');
        })();

        public set Size(size :size){
            this.pt.style.width = size.width;
            this.pt.style.height = size.height;
            var st = new utils.out();
            var x = utils.Garbage.get< any >(Event, st) || {};
            x.oldValue = this._size;
            x.newValue = size;
            x.target = this;
            x.currentTarget = this.pt;
            //this.pt.dispatchEvent(<Event>x);
            if(st.value instanceof Array) (<Stack< Object >>st.value).push(x);
            this._size = size;
        }

        public get Size() :size{ return this._size; }

        private _mxsize :size;

        public set MaxSize(size :size){
            this._mxsize = size;
            this.pt.style.maxWidth = size.width;
            this.pt.style.maxHeight = size.height;

        }

        public get MaxSize() :size{ return this._mxsize; }

        private _mnsize :size;

        public set MinSize(size :size){
            this._mnsize = size;
            this.pt.style.minWidth = size.width;
            this.pt.style.minHeight = size.height;
        }

        public get MinSize() :size{ return this._mnsize; }

        public setSize(size :size, minSize :size, maxSize :size){
            this.pt.style.width = size.width;
            this.pt.style.height = size.height;
            this._size = size;
            this.MinSize = minSize;
            this.MaxSize = maxSize;
        }

        constructor(public pt :HTMLElement){
            Object.defineProperties(pt,
            {
                Size :{
                    get :() =>{ return this._size; },
                    set :function(v :size){ this._size = v; }
                }
            });
        }

        set Movable(by :HTMLElement){ Control.Movable(this.pt, by); }

        private static isParent(child :Node, parent :Node) :boolean{
            if(child == null || parent == null) return false;
            var p = child.parentNode;
            while(p != null){
                if(p == parent) return true;
                p = p.parentNode;
            }
            return false;
        }

        static Movable(target :HTMLElement, handle :HTMLElement){
            if(null == target) throw "target must be child of surface";
            if(handle == null) handle = target;
            if(target.style.position != "absolute" && target.style.position != "fixed") target.style.position = "absolute";
            handle.onmousedown = e =>{
                var ll = target.offsetLeft;
                var lt = target.offsetTop;
                var initialXOffset = target.offsetLeft - e.pageX;
                var initialYOffset = target.offsetTop - e.pageY;
                var onkp = (ev :KeyboardEvent) =>{
                    if (ev.keyCode == 27){
                        
                        target.style.left = (ll < 0 ? 0 : ll) + "px";
                        target.style.top = (lt < 0 ? 0 : lt) + "px";
                        document.onmousemove = null;
                        document.onmouseup = null;
                        document.onkeypress = null;
                    }
                };
                document[<string>'onkeypress'] = utils.delegater.merge(document.onkeypress, onkp);
                document.onmousemove = ev => {
                    ll = ev.pageX + initialXOffset;
                    lt = ev.pageY + initialYOffset;
                    ll = ll > target.parentElement.offsetWidth - target.offsetWidth ? target.parentElement.offsetWidth - target.offsetWidth : ll;
                    lt = lt > target.parentElement.offsetHeight - target.offsetHeight ? target.parentElement.offsetHeight - target.offsetHeight : lt;

                    target.style.left = (ll < 0 ? 0 : ll) + "px";
                    target.style.top = (lt < 0 ? 0 : lt) + "px";
                }
                document.onmouseup = () =>{
                    document.onmousemove = null;
                    document.onmouseup = null;
                    document.onkeypress = null;
                }
                return false;
            }
        }

        private static keydownQueeq :KeyValue< Control, (sender :Control, e :KeyboardEvent) => void >[] = new Array(50);
        private static keydownQueeqcount = 0;

        public OnKeyDown(fn :(sender :Control, e :KeyboardEvent) => void){

            if(Control.keydownQueeqcount == Control.keydownQueeq.length - 1) Control.keydownQueeq[Control.keydownQueeqcount + 50] = null;
            Control.keydownQueeq[Control.keydownQueeqcount] = new KeyValue(this, fn);
            Control.keydownQueeqcount++;
            this.pt.addEventListener('mouseenter', function() { Control.focused = this; });
        }

        //private static mousedownQueeq: KeyValue<Control, (sender: Control, e: MouseEvent) => void>[] = new Array(50);
        //private static mousedownQueeqcount = 0;
        //public OnMouseDown(fn: (sender: Control, e: MouseEvent) => void) {
        //    if (Control.mousedownQueeqcount == Control.mousedownQueeq.length - 1) Control.mousedownQueeq[Control.mousedownQueeqcount + 50] = null;
        //    Control.mousedownQueeq[Control.mousedownQueeqcount] = new KeyValue(this, fn);
        //    Control.mousedownQueeqcount++;
        //    this.pt.addEventListener('mousedown', function () { Control.focused = this; });
        //}

        private static focused = null;

        public static startListening(){
            document.addEventListener('keydown',
                (e :KeyboardEvent) =>{
                    var x = window.screenX;
                    var y = window.screenY;
                    var focused = Control.focused;
                    if(focused == null) return;
                    var q = Control.keydownQueeq;
                    for(var i = 0;i < Control.keydownQueeqcount;i++){
                        var cf = q[i];
                        if(focused == cf.key.pt){
                            cf.value(focused, e);
                            if(e.cancelBubble) break;
                        }
                    }
                    window.scroll(x, y);
                }
            );
        }
    }

    export class Spliter extends Control {
        public roomLeft: HTMLLIElement
        roomRight: HTMLLIElement
        Splliter: HTMLLIElement;

        constructor(){
            var p :HTMLUListElement;
            super(p = document.createElement('ul'));
            p.classList.add('spliter');
            this.Size = new size("600px", "400px");
            p.setAttribute('aria-orientation', 'horizontal');
            var l :HTMLLIElement = this.roomLeft = document.createElement('li');
            var s :HTMLLIElement = this.Splliter = document.createElement('li');
            var r :HTMLLIElement = this.roomRight = document.createElement('li');
            l.classList.add('room-left');
            r.classList.add('room-right');
            s.classList.add('splitter');
            p.appendChild(l);
            p.appendChild(s);
            p.appendChild(r);
            var lsl,
                lx = 0;
            var w = p.offsetWidth;

            s.onmousedown = e =>{
                if(e.srcElement != s) return;
                lx = s.offsetLeft - e.pageX;
                p.addEventListener('mouseup', onup);
                p.addEventListener('mousemove', onsize);
            }
            function onsize(e) {
                var lwp = e.pageX + lx;
                l.style.width = lwp + "px";
                r.style.width = (w - lwp) + "px";
            }
            function onup(){
                p.removeEventListener('mouseup', onup);
                p.removeEventListener('mousemove', onsize);
                lsl = null;
                lx = null;
            }
        }
    }
    export class GroupBox extends Control{
        public title: HTMLSpanElement;
        public content: HTMLDivElement;
        public textTitle:Text;
        public set Title(e: string) { this.textTitle.nodeValue = e; }
        public get Title() { return  this.textTitle.nodeValue ; }

        constructor(title:string='GroupBox'){
            var p:HTMLElement;
            super(p = document.createElement('div'));
            var t =this.title= document.createElement('span');
            var c = this.content = document.createElement('div');
            var tl = this.textTitle = document.createTextNode(title);
            t.appendChild(tl);
            p.classList.add('group-box')
            t.classList.add('group-box-title');
            c.classList.add('content');
            t.appendChild(tl)
            p.appendChild(t);
            p.appendChild(c);
            p.style.left = '0px';
        }
    }
    export class TopPage extends Control {
        private _head :HTMLElement=null;
        private _content :HTMLElement=null;
        private _title :HTMLElement = null;
        private items=new List< KeyValue< HTMLElement, HTMLElement > >(5);

        constructor(){
            super(document.createElement('ul'));
            var toppage = this.pt;
            toppage.classList.add('toppage');
            //make title
            var _title = this._title = document.createElement('li');
            _title.appendChild(document.createTextNode('TopPager'));
            _title.classList.add('title');
            this.Movable = _title;
            var head = this._head = document.createElement('ul');
            head.classList.add('head');
            head.setAttribute('aria-orientation', 'horizontal');
            var content = this._content = document.createElement('li');
            content.classList.add('content');
            toppage.appendChild(_title);
            toppage.appendChild(head);
            toppage.appendChild(content);
            this.appendTab('default');
            this.Movable = _title;
        }

        public setTitle(index :number, name :string){
            var i = this.items.get(0);
            i.key.firstChild.nodeValue = name;
        }

        private selectedItem :KeyValue< HTMLElement, HTMLElement >;

        public appendTab(name :string) :KeyValue<HTMLElement,HTMLElement>{
            var h = document.createElement('li');
            var c = document.createElement('div');
            var k;
            this.items.push(k=new KeyValue(h, c));
            c.classList.add('item');
            h.appendChild(document.createTextNode(name));
            this._head.appendChild(h);
            this._content.appendChild(c);

            var self = this;
            ((__head, __content) =>{
                __content.style.visibility = 'collapse';
                __head.onmousedown = () =>{
                    if(self.selectedItem.key == __head) return;

                    self.selectedItem.key.classList.remove('active');
                    (self.selectedItem.key = __head).classList.add('active');

                    self.selectedItem.value.style.visibility = 'collapse';
                    (self.selectedItem.value = __content).style.visibility = 'visible';
                };
            })(h, c);
            if(this.selectedItem == null) this.select(0);
            return k;
        }

        public remove(index :number){
            var x = this.items.get(index);
            if(x == null) return false;
            var b = x == this.selectedItem;
            this._head.removeChild(x.key);
            this._content.removeChild(x.value);
            this.items.removeAt(index);
            if(b) this.select(index != this.items.length ? index : index - 1);
            return true;
        }

        public select(index :number){
            var x = this.items.get(index);
            if(x == null) return false;
            if(this.selectedItem != null){
                this.selectedItem.key.classList.remove('active');
                this.selectedItem.value.style.visibility = 'collapse';
            }
            x.key.classList.add('active');
            x.value.style.visibility = 'visible';
            this.selectedItem = x;
        }

        public add(index :number, el :HTMLElement){
            var x = this.items.get(index);
            if(x == null) return false;
            if(el.parentElement != null) el.parentElement.removeChild(el);
            x.value.appendChild(el);
        }
    }

    export  class TabPanel {
        constructor(public Tab :HTMLLIElement, public Panel :HTMLDivElement){
        }
    }

    export class LayoutItem extends Control {

        public head:HTMLDivElement;
        public content: HTMLDivElement;
        public rigth: HTMLDivElement;
        public left: HTMLDivElement;
        public main: HTMLDivElement;
        public lefthead:HTMLAnchorElement;
        public leftbody: HTMLDivElement;
        public righthead:HTMLAnchorElement;
        public rightbody: HTMLDivElement;
        private _title: Text;
        private _leftHead:Text;
        private _rigthHead:Text;
        set Title(s :string){ this._title.nodeValue = s; }
        set leftTitle(v :string){ this._leftHead.nodeValue = v; }
        set rightTitle(v: string){ this._rigthHead.nodeValue = v; }
        set leftDetail(v: string[]){
            v.forEach((s) =>{
                this.leftbody.appendChild(document.createTextNode(s));
                this.leftbody.appendChild(document.createElement('br'));
            });
        }
        set rightDetail(v: string[]) {
            v.forEach((s) => {
                this.rightbody.appendChild(document.createTextNode(s));
                this.rightbody.appendChild(document.createElement('br'));
            });
        }
        set Content(el:HTMLElement){ this.main.appendChild(el); }
        constructor(){
            super(layouitem = document.createElement('div'))
            var layouitem;
            layouitem.classList.add('layout-item');

            /**************************  ##head    ***************************************/
            var head = this.head = document.createElement('div');
            head.appendChild(this._title = document.createTextNode('Title'));
            head.classList.add('head');
            layouitem.appendChild(head);
            /******************************************************************************/
            /**************************  ##content   *************************************/
            var content = this.content = document.createElement('div');
            content.classList.add('content');
            layouitem.appendChild(content);
            /****************************************************************************/

            /*************************************  left ********************************/
            var left = this.left = document.createElement('div');
            var lefthead = this.lefthead = document.createElement('a');
            lefthead.href = "#";
            var leftdetail = this.leftbody = document.createElement('div');
            lefthead.appendChild(this._leftHead= document.createTextNode('Achate'));
            leftdetail.classList.add('detail');
            left.classList.add('left');
            left.appendChild(lefthead);
            left.appendChild(leftdetail);
            content.appendChild(left);
            /*****************************************************************************/

            /*************************************  rigth ********************************/
            var rigth = this.rigth = document.createElement('div');
            var rigthhead = this.righthead = document.createElement('a');
            rigthhead.href = "#";
            var rigthdetail = this.rightbody = document.createElement('div');
            rigthhead.appendChild(this._rigthHead = document.createTextNode('Achate'));
            rigthdetail.classList.add('detail')
            rigth.classList.add('right');
            rigth.appendChild(rigthhead);
            rigth.appendChild(rigthdetail);
            content.appendChild(rigth);
            /*****************************************************************************/

            /*************************************  main *********************************/
            var main = this.main = document.createElement('div');
            main.classList.add('main');
            content.appendChild(main);
            /*****************************************************************************/
            this.Movable = head;
        }
    }

    export class FlowLayout extends Control {
        private items = new List<LayoutItem>(20);
        public paddingHorizontal=5;
        public paddingVertical=5;
        constructor(){
            super(p = document.createElement('div'));
            var p;
            p.classList.add('flow-layout');
        }
        public add(item: LayoutItem, index: number= this.items.length){
            if(item instanceof Array) this.items.insertRangeAt(index, <LayoutItem[]><any>item);
            else this.items.insertAt(index, item);
            var l = 0,
                t = 0;
            this.pt.style.position = 'fixed';
            var w = this.pt.offsetWidth;
            var pdh = this.paddingHorizontal;
            var pdv = this.paddingVertical;
            var mhe = pdv;
            var ir = false;
            
            var pt = this.pt;
            var lst = false;
            this.items.foreach((i, v: LayoutItem) => {
                if (v.pt.parentElement != pt){
                    if(v.pt.parentElement != null) v.pt.parentElement.removeChild(v.pt);
                    v.pt.style.position = 'absolute';
                    this.pt.appendChild(v.pt);

                }
                var ci = v.pt;
                if (i == index) ir = true;
                var vw = l + pdh + ci.offsetWidth;
                var wc = (vw - w) > (pdh + ci.offsetWidth) / 2;
                if(wc || lst){
                    t += mhe;
                    l = 0;
                    mhe = pdv;
                    lst = false;
                }
                if(!wc && vw > w){;
                    lst = true;
                }
                if(ir){
                    v.pt.style.position = 'absolute';
                    ci.style.left = l + pdh + "px";
                    ci.style.top = t + "px";
                }

                l += pdh + ci.offsetWidth;
                mhe = Math.max(mhe, ci.offsetHeight + pdv);
                return false;
            });
            this.pt.style.position = 'absolute';

        }
        
    }

    export  class MetroLayout extends Control{
        private moy=80;
        constructor(){
            super(tp=document.createElement('div'));
            var tp:HTMLElement;
            tp.classList.add('metro-layout');
            var i = 0;
            var self=this
            this.OnKeyDown( function (_self:MetroLayout,e: KeyboardEvent) {
                var x = null;
                if (self.activeItem)
                    switch(e.keyCode){
                        case my.utils.Keys.right:
                            tp.scrollLeft += self.moy;
                            break;
                        case my.utils.Keys.left:
                            tp.scrollLeft -= self.moy;
                            break;
                    }
            })
        }
        public add(item: HTMLElement) {
            
            if(!(item instanceof HTMLElement)){
                var d = document.createElement('div');
                if(item instanceof Element) d.appendChild(item);
                else d.appendChild(document.createTextNode(<any>item));
                item = d;
            }
            item.classList.add('item');
            this.pt.appendChild(item);
            var self = this;
            item.addEventListener('mousedown', function(e :MouseEvent) {
                if(e.ctrlKey) self.setSelect(item);
                if(e.altKey) self.nonSelect(item);
                self.setActive(item);
            });
            this.moy = (this.moy + item.offsetWidth) / 2;
        }
        public selectedIndexes:number[] = [];
        public selectedItem:HTMLElement =null;
        private activeItem:HTMLElement;
        public deselect(index :number){
            var k :any = this.pt.children.item(index);
            if (k) k.classList.remove('select');
        }

        public select(index: number, multiselect: boolean) {
            var i: any = this.pt.children.item(index);
            if (i == this.selectedItem) return;
            if (!i) return;
            if (!multiselect) this.deselect(index);
            i.classList.add('select');
            this.selectedItem = i;
            return;
        }
        
        public setActive(item: HTMLElement){
            if(item == this.activeItem) return;
            if (!item) return;
            item.classList.add('active');
            if(this.activeItem) this.activeItem.classList.remove('active');
            this.activeItem = item;
            return;
        }
        public multiSelect = true;

        public nonSelect(i: HTMLElement) {
            if(i)
            i.classList.remove('select');
        }

        public setSelect(i: HTMLElement) {
            if (!this.multiSelect && this.selectedItem) this.selectedItem.classList.remove('select');
            i.classList.add('select');
            this.selectedItem = i;
            return;
        }
    }

    Control.startListening();

    class keyValue< k, v > {
        public Key :k;
        public Value :v;

        constructor(public key :k, public value :v){}
    }

    export  class TabPage extends Control {
        private static garbage :HTMLElement[] = [];
        private children :TabPanel[]=[];
        private runtabs :HTMLUListElement;

        private run_panels :HTMLDivElement;
        private _select :TabPanel;

        get SelectedTab() :TabPanel{ return this._select; }

        static Parse(p :HTMLElement) :TabPage{ return new TabPage(p, true); }

        constructor(pt :HTMLElement, parse? :boolean){
            super(pt);
            if(TabPage.garbage.indexOf(pt)!=-1) return;
            this.runtabs = document.createElement("ul");
            this.runtabs.classList.add("run_tabs");
            this.run_panels = document.createElement("div");
            this.run_panels.classList.add("panels");
            pt.classList.add("ui-dialog-content");
            pt.classList.add("ui-widget-content");
            pt.classList.add("spice_run_dialog");

            if(parse) this.Parse();
            pt.appendChild(this.runtabs);
            pt.appendChild(this.run_panels);
            (<any>pt).TabPage = this;
            TabPage.garbage.push(pt);
        }

        private Parse(){
            var tabs = this.pt.children;
            var l = tabs.length;
            for(var i = 0;i<l;i++){
                var tp :any = tabs[0];
                var n :string = tp.title!=null ? tp.title : "Tab "+i;
                this.pt.removeChild(tp);
                this.AddTab(document.createTextNode(n), tp);
            }
        }

        SelectOne(){
            if(this._select!=null) return;
            if(this.children.length>0) this.Select(this.children[0]);
        }

        SelectAt(i :number) :boolean{
            if(i<0||i>=this.children.length) return false;
            return this.selectTP(this.children[i]);
        }

        AddTab(head :Node, panel :Element){
            var h = document.createElement('li');
            h.classList.add('run_tab');
            h.appendChild(head);
            this.runtabs.appendChild(h);
            var f = document.createElement('div');
            f.classList.add('fieldset');
            f.classList.add('runform');
            f.style.display = 'none';
            f.appendChild(panel);
            this.run_panels.appendChild(f);

            h.onclick = (e :MouseEvent) =>{ this.Select(e.srcElement); }
            this.children.push(new TabPanel(h, f));
            this.SelectOne();
        }

        private selectTP(tp :TabPanel) :boolean{
            if(this.SelectedTab==tp) return false;
            if(tp.Tab.classList.contains('run_form_disabled')) return false;
            if(this.SelectedTab!=null){
                this.SelectedTab.Tab.classList.remove('run_tab_sel');
                this.SelectedTab.Panel.style.display = 'none';
            }
            tp.Tab.classList.add('run_tab_sel');
            tp.Panel.style.display = 'block';
            this._select = tp;
            return true;
        }

        public Select(t) :boolean{
            if(t instanceof TabPanel) return this.selectTP(<TabPanel>t);
            for(var j = this.children.length-1;j>=0;j--){
                var i = this.children[j];
                if(i.Tab==t) return this.selectTP(i);
            }
            return false;
        }

    }

    export  class boxInfo {
        constructor(
            public name :string,
            public iconClass :string,
            public title? :string
        ){
            if(title==null){
                this.title = name;
            }
        }
    }

    export  class box {
        private static Boxes :boxInfo[]=[];
        close :boolean;
        min :boolean;
        max :boolean;
        restore :boolean;
        top :boolean;

        constructor(param :string){
            if(param==null) return;
            var controls = param.toLowerCase().split(',');
            for(var i = controls.length-1;i>=0;i--){
                switch(controls[i]){
                    case 'close':
                        this.close = true;
                        continue;
                    case 'min':
                        this.min = true;
                        continue;
                    case 'max':
                        this.max = true;
                        continue;
                    case 'restore':
                        this.restore = true;
                        continue;
                    case 'top':
                        this.top = true;
                        continue;
                    default:
                        this[controls[i]] = true;
                        continue;
                }
            }
        }

        public static GetInfo(bname :string) :boxInfo{
            if(bname==null) return null;
            bname = bname.toLowerCase();
            var controls = box.Boxes;
            for(var i = controls.length-1;i>=0;i--){
                var t = controls[i];
                if(t.name==bname) return t;
            }
            return null;
        }

        static Add(name :string, iconClass :string, title? :string){ box.Boxes.push(new boxInfo(name, iconClass, title)); }
    }

    (() =>{
        box.Add('close', 'ui-icon-closethick', 'close');
        box.Add('hide', 'ui-icon-minusthick', 'hide');
        box.Add('min', 'ui-icon-minusthick', 'hide');
        box.Add('max', 'ui-icon-plusthick', 'hide');

    })();

    export  class size {
        constructor(public width :string, public height :string){}
    }

    export  class Dialog extends Control {
        box :box;
        private static dialogs: List<Dialog> = new List<Dialog>(5);
        private static czindex = 1E+5;
        constructor(pt :HTMLElement){
            super(pt);
            this.Parse();
            Dialog.dialogs.push(this);
            pt.style.zIndex =""+ (Dialog.czindex++);
            //pt.addEventListener('mousemove', this.onMouseEnter.bind(this));
            var selft = this;
            
            pt.addEventListener('mousedown', function () {
                Dialog.Focuson(selft);
            });
            //window.                addEventListener('mousedown', function () {
            //        Dialog.Focuson(selft);
            //    });
            //document.addEventListener('mousedown', function () {
            //    Dialog.Focuson(selft);
            //});
        }
        public static Focuson(diag: Dialog) {
            var zi: number = parseInt(diag.pt.style.zIndex);
            var max = zi;
            Dialog.dialogs.foreach((i, v) => {
                var _zi:number = parseInt(v.pt.style.zIndex);
                if (_zi > zi) {
                    (<any>v.pt.style).zIndex =""+ (_zi - 1);
                    max = _zi > max ? _zi : max;
                }
                return false;
            });
            (<any>diag.pt.style).zIndex = max+ "";
        }
        private pointIsInRect(px :number, py :number, x :number, y :number, w :number, h :number){ return px>=x&&px-x<=w&&!(py<y||py-y>h); }

            /**
        @(parms x y w h) outside rect
        @(parms x1 y1 w1 h1) inside rect
        */
        private isIn(x :number, y :number, w :number, h :number, x1 :number, y1 :number, w1 :number, h1 :number, px :number, py :number) :boolean{ return (this.pointIsInRect(px, py, x, y, w, h)&&!this.pointIsInRect(px, py, x1, y1, w1, h1)); }

        private isSizing = false;

        private onMouseEnter(e :MouseEvent){
            if(this.isSizing) return;
            var w = this.pt.clientWidth;
            var h = this.pt.clientHeight;
            var lx = e.pageX;
            var ly = e.pageY;
            if(this.isIn(-20, h-80, w+40, h+40, 20, 20, w-40, w-40, e.offsetX, e.offsetY)){

                var self = this;
                w = w-lx;
                h = h-ly;

                function resizeAborded(){ self.isSizing = false; };

                function endsizing(){
                    document.removeEventListener('mouseup', endsizing);
                    document.removeEventListener('mousemove', sizing);
                    this.style.background = "#efefef";
                    self.isSizing = false;
                };

                function sizing(event){
                    self.pt.style.width = w+event.pageX+"px";
                    self.pt.style.height = h+event.pageY+"px";
                    return true;
                };

                function waitForSizing(){
                    self.isSizing = true;
                    this.removeEventListener('mousedown', waitForSizing);
                    this.addEventListener('mouseup', endsizing);
                    document.addEventListener('mousemove', sizing);
                    this.style.background = "#fffff1";
                };

                this.pt.addEventListener('mousedown', waitForSizing);
                setTimeout((() =>{
                    if(!this.isSizing){
                        this.pt.removeEventListener('mousedown', waitForSizing);
                        resizeAborded();
                    }
                }).bind(this), 1000);
            }

        }

        private gettitle(cont :Object){
            var s = document.createElement('span');
            s.className = "ui-dialog-title";
            s.id = "ui-id-11";
            s.appendChild(<Node>cont);
            return s;
        }

        private getbbox(i :number, bname :string) :HTMLElement{
            var bx = box.GetInfo(bname);
            if(bx==null) return null;
            var b = document.createElement('button');
            b.className = "ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close";
            b.setAttribute("role", "button");
            b.setAttribute("aria-disabled", "false");

            b.title = bx.title;

            var s = document.createElement("span");
            s.className = "ui-button-icon-primary ui-icon "+bx.iconClass;
            b.style.right = i*28+5+"px";
            b.appendChild(s);
            return b;
        }

        getBarTitle(){
            //<div id='tt' class="">
            var d = document.createElement("div");
            d.className = "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
            d.style.left = '0px';
            d.style.right = '0px';
            d.style.top = '0px';
            d.style.height = '28px';
            d.style.position = 'absolute';
            return d;
        }

        getContentPanel(){
            var d = document.createElement("div");
            d.id = "spice_run_dialog";
            d.className = "ui-dialog-content ui-widget-content";
            d.style.bottom = '0';
            d.style.left = '0';
            d.style.right = '0';
            d.style.top = '30px';
            d.style.position = 'absolute';
            d.style.background = 'red';
            return d;
        }

        private swapTitle() :Node{
            var title :any = this.pt.title;
            if(title[0]=='#'){
                var xtitle :HTMLElement = $(title, this.pt)[0];
                if(xtitle!=null){
                    xtitle.parentElement.removeChild(xtitle);
                    return xtitle;
                }
            }
            if(typeof title=='string') return document.createTextNode(title);
            return title;
        }

        static i=10;
        swapDialog(){
            var pt = this.pt;
            pt.onfocus = () => { pt.style.zIndex = (Dialog.i++) + ""; };

            (<any>pt).Size = { x: 400, y: 300 };
            
            pt.className += "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front graph-popup-dialog ui-dialog-buttons ui-draggable";
            pt.tabIndex = -1;
            pt.setAttribute("role", "dialog");
            pt.setAttribute("aria-describedby", "spice_run_dialog");
            pt.setAttribute("aria-labelledby", "ui-id-11");
            pt.style.position = "absolute";
            pt.style.display = "block";
            pt.style.background = "background:top center #444";
            pt.id = "spice_run_dialog";
            this.Size = new size("800px", "550px");
            this.MaxSize = new size(screen.width + "px", screen.height + "px");
            this.MinSize = new size("200", "350px");
        }
        Parse(){
            var pt = this.pt;
            this.swapDialog();
            var title = this.swapTitle();
            var ttl = this.getBarTitle();
            var box = this.pt.getAttribute('controls').split("|");
            ttl.appendChild(this.gettitle(title));
            for(var l = box.length-1;l>=0;l--){
                var w = this.getbbox(l, box[l]);
                if(w!=null) ttl.appendChild(w);
            }
            pt.appendChild(ttl);
            var l = pt.childElementCount;
            if (l != 1) {
                var cnt = this.getContentPanel();
                var content = $('#content', this.pt)[0];
                if(content == null){
                    for(var c = 0;c < l;c++){
                        var x = pt.childNodes[l]
                        pt.removeChild(x);
                        cnt.appendChild(x);
                    }
                    cnt.id = 'content';
                } else cnt.appendChild(content);
                pt.appendChild(cnt);
            }
            this.Movable = ttl;
        }
    }

    export  class ColumnData {
        constructor(public name :string, private getcellulNode :(dataRow, column :ColumnData) => Node, public head :Node=null){
            if(head==null){
                var hc = document.createTextNode(name);
                this.head = document.createElement('th');
                this.head.appendChild(hc);
            }
            if(getcellulNode==null){
                this.getcellulNode = (dataRow, col :ColumnData) =>{
                    var t = document.createTextNode(dataRow[col.name]);
                    var s = document.createElement('SPAN');
                    var cel = document.createElement("th");
                    s.appendChild(t);
                    cel.appendChild(s);
                    return cel;
                }
            }
        }

        public getCellulNode(dataRow) :Node{ return this.getcellulNode(dataRow, this); }

        public getCell(dataRow) :Node{ return this.getcellulNode(dataRow, this); }
    }

    export  class Row extends Control {
        public data :Object;

        constructor(pt :HTMLElement){ super(pt); }
    }

    export var hSP = (<any>document).documentElement.scrollByPages;
    export  class Table extends Control {
        private columns :ColumnData[] = [];
        private rows :Row[] = [];
        private header :HTMLElement;
        private table :HTMLElement;
        private static isSafe :boolean = false;

        private onKeyDown(sender :Row, e :KeyboardEvent){
            var c = this.selectedIndex;
            var r = this.rows;
            switch(e.keyCode){
                case utils. Keys.home:
                    var x = this.rows[0];
                    if(x) this.select(x.pt);
                    break;
                case utils. Keys.end:
                    x = this.rows[this.rows.length-1];
                    if(x) this.select(x.pt);
                    break;
                case utils.Keys.pageUp:
                    if(hSP) (<any>this.scroll || $('.scrollable', this.pt)[0] || $('.scrollable-auto', this.pt)[0]).scrollByPages(-1);
                    break;
                case utils.Keys.pageDown:
                    if(hSP) (<any>this.scroll || $('.scrollable', this.pt)[0] || $('.scrollable-auto', this.pt)[0]).scrollByPages(1);
                    break;
                case utils. Keys.up:
                    if(c<1) return;
                    this.select(r[c-1].pt);
                    break;
                case utils. Keys.down:

                    if((c==-1&&r.length==0)||c==r.length-1) return;
                    this.select(r[c+1].pt);
                    break;

                default:
                    break;

            }
            e.stopPropagation();
            e.cancelBubble = true;
            e.stopImmediatePropagation();

        }

        constructor(pt :HTMLElement, private scroll :HTMLElement, private getNewRow? :(index :number) => HTMLElement){
            super(pt);
            if(!Table.isSafe) throw "Not Supported";
            Table.isSafe = false;
            if(getNewRow==null){
                this.getNewRow = () =>{ return document.createElement("tr"); };
            }
            var self = this;
            this.OnKeyDown((s :Row, e :KeyboardEvent) =>{ self.onKeyDown(s, e); });
        }

        public addColumn(column :ColumnData){
            this.header.appendChild(column.head);
            this.columns.push(column);
        }

        private selectedRow :HTMLElement;

        private addNewRow() :Row{
            var rn = this.getNewRow(this.rows.length);
            var self = this;
            rn.addEventListener('click', function() { self.select(this); });
            var row = new Row(rn);
            this.rows.push(row);
            this.table.appendChild(rn);
            return row;
        }

        private get selectedIndex(){ return this.getIndexOf(this.selectedRow); }

        private getIndexOf(row :HTMLElement){
            for(var i = this.rows.length-1;i>=0;i--){
                if(this.rows[i].pt==row) return i;
            }
            return -1;
        }
        public static sIVIN = (<any>document.documentElement).scrollIntoViewIfNeeded!=null;
        private select(row :HTMLElement){
            if(row==this.selectedRow) return;
            row.classList.add("row-active");
            if (this.selectedRow != null) this.selectedRow.classList.remove("row-active");
            this.selectedRow = row;
            if(Table.sIVIN) (<any>row).scrollIntoViewIfNeeded();
            else row.scrollIntoView();
        }

        public addRow(data, addCellToRow :(row :HTMLElement, data :Object, column :ColumnData) => void){
            var row = this.addNewRow();
            var cls = this.columns;
            var cl = cls.length;
            for(var i = 0;i<cl;i++){
                var cn = cls[i];
                addCellToRow(row.pt, data, cn);
            }
        }

        static Standard(pt :HTMLElement, scroll :HTMLElement){
            Table.isSafe = true;
            var d = new Table(pt, scroll, getNewRow);
            var body = $('tbody', pt)[0];

            function getNewRow(){ return document.createElement("tr"); };

            function getCellulNode(dataRow, col :ColumnData){
                var t = document.createTextNode(col.name=='N°' ? d.rows.length : dataRow[col.name]);
                var cel = document.createElement("td");
                cel.appendChild(t);
                return cel;
            }

            function addCellToRow(row :HTMLElement, data :Object, column :ColumnData){
                var cel = column.getCellulNode(data);
                row.appendChild(cel);
            }

            d.header = document.createElement('tr');
            d.table = body;
            d.addColumn(new ColumnData('N°', getCellulNode));
            d.addColumn(new ColumnData('Firstname', getCellulNode));
            d.addColumn(new ColumnData('Lastname', getCellulNode));
            d.addColumn(new ColumnData('Birthdate', getCellulNode));
            d.addColumn(new ColumnData('Year', getCellulNode));
            body.appendChild(d.header);
            var s = [
                {
                    Firstname :"Achour",
                    Lastname :"Brahim",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Slimane",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Omar",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Karim",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Amine",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Nadir",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Brahim",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Slimane",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Omar",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Karim",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Amine",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Nadir",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Brahim",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Slimane",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Omar",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Karim",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Amine",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Nadir",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Brahim",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Slimane",
                    Birthdate :"01/02/1991",
                    Year :25
                },
                {
                    Firstname :"Achour",
                    Lastname :"Omar",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Karim",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Amine",
                    Birthdate :"01/02/1991",
                    Year :25
                }, {
                    Firstname :"Achour",
                    Lastname :"Nadir",
                    Birthdate :"01/02/1991",
                    Year :25
                }
            ];
            for(var i = 0;i<s.length;i++){
                d.addRow(s[i], addCellToRow);
            }
        }
    }

    export  class CardVisit {
        constructor(fb :Mesure, fr :Mesure, bsv :Mesure, $ff :Mesure[], $bf :Mesure[]){
            var f = new Grid(true);
            var map = {
                f :f,
                _fb :f.SetRow(fb.val, fb.Unit, Orientation.Direct),
                _fr :f.SetColumn(fr.val, fr.Unit, Orientation.Direct),
                _bsv :f.SetColumn(bsv.val, bsv.Unit, Orientation.Direct),
                _$ff :[],
                _$bf :[],
            };
            $ff.forEach((v :Mesure) =>{ map._$ff.push(f.SetRow(v.val, v.Unit).setRepere(null, map._bsv)); });
            $bf.forEach((v) =>{ map._$bf.push(f.SetRow(v.val, v.Unit).setRepere(map._bsv)); });
        }
    }
}
export module my.data {
    export class sql {
        private openRequest:IDBOpenDBRequest;
        private db;
        public isConnected:boolean;
        constructor(libraryName){
            this.openRequest = indexedDB.open(libraryName, 1);
            var self=this;
            this.openRequest.onsuccess = function (response) {
                self.db =self. openRequest.result;
                self.isConnected = true;
            };

            this.openRequest.onerror = function (response:Event) {
                alert("Error code: " + (<any>response).target.errorCode);
                self.isConnected = false;
            };
            this.openRequest.onupgradeneeded = function (response:any) {
                response.currentTarget.result.createObjectStore("authors",
                    { keypath: 'id', autoIncrement: true });
            };
        }


    }
}
export  function main(){
    function $f(s, st?){ return $(s, st)[0]; }

    function getMenu(s?){ return $('.menu', s)[0]; }

    function getPanel(s?){ return $('.panel', s)[0]; }
    update();
    var m1 = getMenu();

    var tg1 = $f('#tg1');
    var pnl = getPanel();
    return   new (<any>my).controls.PSlideout(m1, pnl, tg1);
}

var openDatabase = eval('openDatabase');

class column {
    name :string;
    type :string;
    unique :boolean;
    key :boolean;
    autoincrement: boolean;
    default:any;
}

class database {
    name: string;
    version:string;
    public  tables =[];

}
class table {
    name: string="";
    columns: column[] = [];

    public get stringColumns(){
        var s = "";
        this.columns.forEach((v) =>{ s = s == "" ? v.name : "," + v.name; });
        return s;
    }
}

class command {
    
    next: command = null;
    constructor(public command: string,public params: any[]= [],public callback?: (cmd: command, success: boolean) => void){
        
    }
}

class sql {
    public database:database;
    private db:IDBDatabase;
    constructor(database :database){
        this.database = database;
        this.db = (openDatabase)(database.name, database.version, 'My library', 5 * 1024 * 1024);
        this.esql = this.executeSQL.bind(this);
    }
    private fcmd: command = null;
    private lcmd: command = null;

    private callback(i, p, s){
        if(this.fcmd.callback != null) (<any>this).fcmd.callback(this.fcmd, true, i, p, s);
        this.fcmd = this.fcmd.next;
        if (this.fcmd == null) this.lcmd = null;
    }

    private internalexecuteSQL(t){ t.executeSql(this.fcmd.command, this.fcmd.params, this.fcmd.callback); }

    private fire(){
        if(this.fcmd == null) return;
        this.db.transaction(this.internalexecuteSQL)
       
    }

    public push(command :command){
        if(this.fcmd == null) this.fcmd = this.lcmd = command;
        else {this.lcmd.next=command;
            this.lcmd = command;
        }
        this.fire();
    }
    private esql;
    executeSQL(comd: string, params?: any[], callback?: (cmd: command, success: boolean) => void){
        this.push(new command(comd, params, callback));
        this.db.transaction(this.esql);
    }

    createTable(table :table){
        var s = "";
        table.columns.forEach((v :column, i) =>{
            s = s + v.name + " " + v.type +
            (v.key ? " PRIMARY KEY " :
                 (v.autoincrement ? " AUTOINCREMENT " : (v.default != null ? v.default : "")
                 ));
            if(i !== 0) s = s + ',';
        });
    }

    addRow

    migrateDB(transaction){
        transaction.executeSql("CREATE TABLE IF NOT EXISTS authors(" +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName TEXT, " +
            "lastName TEXT, " +
            "dateCreated TIMESTAMP DEFAULT(datetime('now', 'localtime')))");
    }

    onError(error){ alert("Error code: " + error.code + " Message: " + error.message); }

    onSuccess(){ alert("Migration complete!"); }
}

class isql {
    request :IDBOpenDBRequest;
    db :IDBDatabase;

    constructor(){
        var win :any = window;
        indexedDB = indexedDB || win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
        win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction;
        win.IDBCursor = win.IDBCursor || win.webkitIDBCursor;
        win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange;
        if(indexedDB == null) throw 'your browser does not support isql';
    }

    public onupgraded(ev :IDBVersionChangeEvent) :void{
        
    }
    public onsuccess(ev :Event):any{
        
    }
    public onerror(ev: Event): any {

    }
    public onblocked(ev: Event): any {

    }

    open(name :string, version :number){
        if (indexedDB == null) throw 'your browser does not support isql';
        this.request = indexedDB.open(name, version);
        var self = this;
        this.request.onsuccess = function (response) { self.db = self.request.result; };
        this.request.onerror = function(response){
            (<any>self).db = new Error('the connection was not created');
            (<any>self).response = response;
        }
        this.request.onupgradeneeded = this.onupgraded.bind(this);
        this.request.onsuccess = this.onsuccess.bind(this);
        this.request.onerror = this.onerror.bind(this);
        this.request.onblocked = this.onblocked.bind(this);
    }


}