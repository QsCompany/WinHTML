var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="./ts/STheme.ts"/>
window.exports = window.exports || {};
var parse = (function () {
    function parse(main) {
        this.main = main;
        this.childes = new List(10);
        this.parent = null;
        main.idle = this;
        parse.addedElements.push(this);
        this.parent = main.parentNode;
    }
    Object.defineProperty(parse.prototype, "isAlive", {
        get: function () {
            return this.main.parentNode != null;
        },
        enumerable: true,
        configurable: true
    });
    parse.prototype.begin = function () {
        var lstc = this.childes.length;
        var x = this.main.childNodes;
        var l = x.length;
        var rm = 0;
        for (var i = 0; i < l; i++) {
            var e = x.item(i);
            if (e.idle == null) {
                this.childes.push(new parse(e));
                rm++;
            }
            e.idle.begin();
        }
        if (this.main.childNodes.length == (lstc + rm))
            return;
        var tx = this.childes;
        l = tx.length;
        for (i = 0; i < l; i++) {
            var m = tx.get(i);
            if (!m.isAlive) {
                parse.removedElements.push(m);
                tx.removeAt(i);
                m.main.idle = null;
                i--;
                l--;
            }
        }
    };

    parse.OnObservator = function () {
        body = new parse(document.body);
        lastLength = document.body.outerHTML.length;
        body.begin();
        setInterval(parse.eventFirer, 100);
    };
    parse.eventFirer = function () {
        if (document.body.outerHTML.length != lastLength) {
            parse.addedElements.clear();
            parse.removedElements.clear();
            body.begin();
            lastLength = document.body.outerHTML.length;
            parse.addedElements.foreach(function (i, v) {
                var wx = window.onChildInserted;
                if (wx.length == 0)
                    return false;
                wx.foreach(function (i, v) {
                    return v(x) == true;
                });

                var x = v.main.parentNode.onChildInserted;
                if (x.length == 0)
                    return false;
                x.foreach(function (i, v) {
                    return v(x) == true;
                });
                return false;
            });
            parse.removedElements.foreach(function (i, v) {
                var wx = window.onChildRemoved;
                if (wx.length == 0)
                    return false;
                wx.foreach(function (i, v) {
                    return v(x) == true;
                });

                var x = v.main.parentNode.onChildRemoved;
                if (x == null)
                    return false;
                x.foreach(function (i, v) {
                    return v(x) == true;
                });
                return false;
            });
        }
    };
    parse.removedElements = new List(100);
    parse.addedElements = new List(100);
    return parse;
})();

var body = null;
var lastLength = 0;

(function () {
    var events = new List(10);
    Object.defineProperty(HTMLElement.prototype, 'onChildInserted', {
        get: function () {
            return events.length == 0 ? null : events;
        },
        set: function (v) {
            events.push(v.bind(eval('this')));
        },
        configurable: false,
        enumerable: false
    });
    var revents = new List(10);
    Object.defineProperty(HTMLElement.prototype, 'onChildRemoved', {
        get: function () {
            return revents.length == 0 ? null : revents;
        },
        set: function (v) {
            revents.push(v.bind(eval('this')));
        },
        configurable: false,
        enumerable: false
    });
})();
(function () {
    var events = new List(10);
    Object.defineProperty(window, 'onChildInserted', {
        get: function () {
            return events;
        },
        set: function (v) {
            events.push(v.bind(eval('this')));
        },
        configurable: false,
        enumerable: false
    });
    var revents = new List(10);
    Object.defineProperty(window, 'onChildRemoved', {
        get: function () {
            return revents;
        },
        set: function (v) {
            revents.push(v.bind(eval('this')));
        },
        configurable: false,
        enumerable: false
    });
})();

function update() {
    var l = $(".mytable");
    var i;
    for (i = l.length - 1; i >= 0; i--) {
        my.controls.Table.Standard(l[i], l[i].parentElement);
    }
    l = $('dialog');

    for (i = l.length - 1; i >= 0; i--) {
        var m = l[i];
         {
            var d;
            m.diag = d = new my.controls.Dialog(m);
            d.onChildInserted = function (c) {
            };
        }
    }

    l = $("tabpage");

    for (i = l.length - 1; i >= 0; i--)
        my.controls.TabPage.Parse(l[i]);
}

(function (my) {
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
    (function (utils) {
        (function (Keys) {
            Keys[Keys["left"] = 37] = "left";
            Keys[Keys["up"] = 38] = "up";
            Keys[Keys["right"] = 39] = "right";
            Keys[Keys["down"] = 40] = "down";
            Keys[Keys["pageUp"] = 33] = "pageUp";
            Keys[Keys["pageDown"] = 34] = "pageDown";
            Keys[Keys["end"] = 35] = "end";
            Keys[Keys["home"] = 36] = "home";
            Keys[Keys["esc"] = 27] = "esc";
            Keys[Keys["enter"] = 13] = "enter";
            Keys[Keys["ctrl"] = 17] = "ctrl";
            Keys[Keys["tab"] = 9] = "tab";
            Keys[Keys["back"] = 8] = "back";
            Keys[Keys["menu"] = 93] = "menu";
            Keys[Keys["suppr"] = 46] = "suppr";
            Keys[Keys["capsLock"] = 20] = "capsLock";
            Keys[Keys["shift"] = 16] = "shift";
            Keys[Keys["f1"] = 112] = "f1";
            Keys[Keys["inser"] = 45] = "inser";
            Keys[Keys["alt"] = 18] = "alt";
            Keys[Keys["pause"] = 19] = "pause";
            Keys[Keys["attn"] = 3] = "attn";
            Keys[Keys["mediaNext"] = 176] = "mediaNext";
            Keys[Keys["mediaPrevieus"] = 177] = "mediaPrevieus";
            Keys[Keys["mediaStop"] = 178] = "mediaStop";
            Keys[Keys["mediaPlay"] = 179] = "mediaPlay";
            Keys[Keys["help"] = 255] = "help";
        })(utils.Keys || (utils.Keys = {}));
        var Keys = utils.Keys;

        var delegater = (function () {
            function delegater(f1, f2) {
                this.f1 = f1;
                this.f2 = f2;
            }
            delegater.merge = function (f1, f2) {
                if (f1 == null)
                    return f2;
                if (f2 == null)
                    return f1;
                var k = function () {
                    var args = eval('arguments');
                    f1.apply(f1, args);
                    return f2.apply(f2, args);
                };
                k.delegate = new delegater(f1, f2);
                return k;
            };

            delegater.isDelegate = function (f) {
                return f.delegate != null;
            };

            delegater.Delete = function (deleg, f2, out) {
                if (typeof out === "undefined") { out = { val: false }; }
                var x = deleg;
                if (!delegater.isDelegate(deleg))
                    return deleg == f2 ? null : deleg;
                if (x.delegate.f2 == f2) {
                    out.val = true;
                    return x.delegate.f1;
                }
                if (x.delegate.f1 == f2) {
                    out.val = true;
                    return x.delegate.f2;
                }
                if (delegater.isDelegate(x.delegate.f1)) {
                    var ret = delegater.Delete(x.delegate.f1, f2, out);
                    if (out.val)
                        return ret;
                    if (delegater.isDelegate(x.delegate.f2)) {
                        ret = delegater.Delete(x.delegate.f2, f2, out);
                        if (out.val)
                            return ret;
                    }
                }
                return deleg;
            };
            return delegater;
        })();
        utils.delegater = delegater;

        var out = (function () {
            function out(value) {
                this.value = value;
            }
            return out;
        })();
        utils.out = out;

        var _pg = (function () {
            function _pg(init, lst) {
                this.init = init;
                this.lst = lst;
            }
            return _pg;
        })();
        utils._pg = _pg;

        var _void = (function () {
            function _void() {
            }
            return _void;
        })();
        utils._void = _void;

        var Garbage = (function () {
            function Garbage() {
            }
            Garbage.Initialize = function (type, init) {
                if (type == null || type instanceof Function) {
                    var k = new _pg(init, new Stack(5));
                    Garbage._garbag.Add(type, k);
                    return k.lst;
                }
                throw Error;
            };

            Garbage.get = function (type, out) {
                var o = Garbage._garbag.Get(type);
                if (o == null) {
                    return null;
                } else if (o.lst.length == 0) {
                    if (o.init == null)
                        return null;
                    return o.init();
                } else
                    return o.lst.pop();
            };

            Garbage.Add = function (type, o) {
                var s = Garbage._garbag.Get(type);
                if (s == null)
                    Garbage._garbag.Add(type, s = new _pg(null, new Stack(5)));
                s.lst.push(o);
            };
            Garbage._garbag = new Dictionary();
            return Garbage;
        })();
        utils.Garbage = Garbage;
    })(my.utils || (my.utils = {}));
    var utils = my.utils;
})(exports.my || (exports.my = {}));
var my = exports.my;

(function (my) {
    (function (_controls) {
        var Control = (function () {
            function Control(pt) {
                var _this = this;
                this.pt = pt;
                this.init = (function () {
                    my.utils.Garbage.Initialize(Control, null);
                    eval('delete Control.init');
                })();
                Object.defineProperties(pt, {
                    Size: {
                        get: function () {
                            return _this._size;
                        },
                        set: function (v) {
                            this._size = v;
                        }
                    }
                });
            }

            Object.defineProperty(Control.prototype, "Size", {
                get: function () {
                    return this._size;
                },
                set: function (size) {
                    this.pt.style.width = size.width;
                    this.pt.style.height = size.height;
                    var st = new my.utils.out();
                    var x = my.utils.Garbage.get(Event, st) || {};
                    x.oldValue = this._size;
                    x.newValue = size;
                    x.target = this;
                    x.currentTarget = this.pt;

                    //this.pt.dispatchEvent(<Event>x);
                    if (st.value instanceof Array)
                        st.value.push(x);
                    this._size = size;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Control.prototype, "MaxSize", {
                get: function () {
                    return this._mxsize;
                },
                set: function (size) {
                    this._mxsize = size;
                    this.pt.style.maxWidth = size.width;
                    this.pt.style.maxHeight = size.height;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Control.prototype, "MinSize", {
                get: function () {
                    return this._mnsize;
                },
                set: function (size) {
                    this._mnsize = size;
                    this.pt.style.minWidth = size.width;
                    this.pt.style.minHeight = size.height;
                },
                enumerable: true,
                configurable: true
            });

            Control.prototype.setSize = function (size, minSize, maxSize) {
                this.pt.style.width = size.width;
                this.pt.style.height = size.height;
                this._size = size;
                this.MinSize = minSize;
                this.MaxSize = maxSize;
            };

            Object.defineProperty(Control.prototype, "Movable", {
                set: function (by) {
                    Control.Movable(this.pt, by);
                },
                enumerable: true,
                configurable: true
            });

            Control.isParent = function (child, parent) {
                if (child == null || parent == null)
                    return false;
                var p = child.parentNode;
                while (p != null) {
                    if (p == parent)
                        return true;
                    p = p.parentNode;
                }
                return false;
            };

            Control.Movable = function (target, handle) {
                if (null == target)
                    throw "target must be child of surface";
                if (handle == null)
                    handle = target;
                if (target.style.position != "absolute" && target.style.position != "fixed")
                    target.style.position = "absolute";
                handle.onmousedown = function (e) {
                    var ll = target.offsetLeft;
                    var lt = target.offsetTop;
                    var initialXOffset = target.offsetLeft - e.pageX;
                    var initialYOffset = target.offsetTop - e.pageY;
                    var onkp = function (ev) {
                        if (ev.keyCode == 27) {
                            target.style.left = (ll < 0 ? 0 : ll) + "px";
                            target.style.top = (lt < 0 ? 0 : lt) + "px";
                            document.onmousemove = null;
                            document.onmouseup = null;
                            document.onkeypress = null;
                        }
                    };
                    document['onkeypress'] = my.utils.delegater.merge(document.onkeypress, onkp);
                    document.onmousemove = function (ev) {
                        ll = ev.pageX + initialXOffset;
                        lt = ev.pageY + initialYOffset;
                        ll = ll > target.parentElement.offsetWidth - target.offsetWidth ? target.parentElement.offsetWidth - target.offsetWidth : ll;
                        lt = lt > target.parentElement.offsetHeight - target.offsetHeight ? target.parentElement.offsetHeight - target.offsetHeight : lt;

                        target.style.left = (ll < 0 ? 0 : ll) + "px";
                        target.style.top = (lt < 0 ? 0 : lt) + "px";
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                        document.onkeypress = null;
                    };
                    return false;
                };
            };

            Control.prototype.OnKeyDown = function (fn) {
                if (Control.keydownQueeqcount == Control.keydownQueeq.length - 1)
                    Control.keydownQueeq[Control.keydownQueeqcount + 50] = null;
                Control.keydownQueeq[Control.keydownQueeqcount] = new KeyValue(this, fn);
                Control.keydownQueeqcount++;
                this.pt.addEventListener('mouseenter', function () {
                    Control.focused = this;
                });
            };

            Control.startListening = function () {
                document.addEventListener('keydown', function (e) {
                    var x = window.screenX;
                    var y = window.screenY;
                    var focused = Control.focused;
                    if (focused == null)
                        return;
                    var q = Control.keydownQueeq;
                    for (var i = 0; i < Control.keydownQueeqcount; i++) {
                        var cf = q[i];
                        if (focused == cf.key.pt) {
                            cf.value(focused, e);
                            if (e.cancelBubble)
                                break;
                        }
                    }
                    window.scroll(x, y);
                });
            };
            Control.keydownQueeq = new Array(50);
            Control.keydownQueeqcount = 0;

            Control.focused = null;
            return Control;
        })();
        _controls.Control = Control;

        var Spliter = (function (_super) {
            __extends(Spliter, _super);
            function Spliter() {
                var p;
                _super.call(this, p = document.createElement('ul'));
                p.classList.add('spliter');
                this.Size = new size("600px", "400px");
                p.setAttribute('aria-orientation', 'horizontal');
                var l = this.roomLeft = document.createElement('li');
                var s = this.Splliter = document.createElement('li');
                var r = this.roomRight = document.createElement('li');
                l.classList.add('room-left');
                r.classList.add('room-right');
                s.classList.add('splitter');
                p.appendChild(l);
                p.appendChild(s);
                p.appendChild(r);
                var lsl, lx = 0;
                var w = p.offsetWidth;

                s.onmousedown = function (e) {
                    if (e.srcElement != s)
                        return;
                    lx = s.offsetLeft - e.pageX;
                    p.addEventListener('mouseup', onup);
                    p.addEventListener('mousemove', onsize);
                };
                function onsize(e) {
                    var lwp = e.pageX + lx;
                    l.style.width = lwp + "px";
                    r.style.width = (w - lwp) + "px";
                }
                function onup() {
                    p.removeEventListener('mouseup', onup);
                    p.removeEventListener('mousemove', onsize);
                    lsl = null;
                    lx = null;
                }
            }
            return Spliter;
        })(Control);
        _controls.Spliter = Spliter;
        var GroupBox = (function (_super) {
            __extends(GroupBox, _super);
            function GroupBox(title) {
                if (typeof title === "undefined") { title = 'GroupBox'; }
                var p;
                _super.call(this, p = document.createElement('div'));
                var t = this.title = document.createElement('span');
                var c = this.content = document.createElement('div');
                var tl = this.textTitle = document.createTextNode(title);
                t.appendChild(tl);
                p.classList.add('group-box');
                t.classList.add('group-box-title');
                c.classList.add('content');
                t.appendChild(tl);
                p.appendChild(t);
                p.appendChild(c);
                p.style.left = '0px';
            }
            Object.defineProperty(GroupBox.prototype, "Title", {
                get: function () {
                    return this.textTitle.nodeValue;
                },
                set: function (e) {
                    this.textTitle.nodeValue = e;
                },
                enumerable: true,
                configurable: true
            });
            return GroupBox;
        })(Control);
        _controls.GroupBox = GroupBox;
        var TopPage = (function (_super) {
            __extends(TopPage, _super);
            function TopPage() {
                _super.call(this, document.createElement('ul'));
                this._head = null;
                this._content = null;
                this._title = null;
                this.items = new List(5);
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
            TopPage.prototype.setTitle = function (index, name) {
                var i = this.items.get(0);
                i.key.firstChild.nodeValue = name;
            };

            TopPage.prototype.appendTab = function (name) {
                var h = document.createElement('li');
                var c = document.createElement('div');
                var k;
                this.items.push(k = new KeyValue(h, c));
                c.classList.add('item');
                h.appendChild(document.createTextNode(name));
                this._head.appendChild(h);
                this._content.appendChild(c);

                var self = this;
                (function (__head, __content) {
                    __content.style.visibility = 'collapse';
                    __head.onmousedown = function () {
                        if (self.selectedItem.key == __head)
                            return;

                        self.selectedItem.key.classList.remove('active');
                        (self.selectedItem.key = __head).classList.add('active');

                        self.selectedItem.value.style.visibility = 'collapse';
                        (self.selectedItem.value = __content).style.visibility = 'visible';
                    };
                })(h, c);
                if (this.selectedItem == null)
                    this.select(0);
                return k;
            };

            TopPage.prototype.remove = function (index) {
                var x = this.items.get(index);
                if (x == null)
                    return false;
                var b = x == this.selectedItem;
                this._head.removeChild(x.key);
                this._content.removeChild(x.value);
                this.items.removeAt(index);
                if (b)
                    this.select(index != this.items.length ? index : index - 1);
                return true;
            };

            TopPage.prototype.select = function (index) {
                var x = this.items.get(index);
                if (x == null)
                    return false;
                if (this.selectedItem != null) {
                    this.selectedItem.key.classList.remove('active');
                    this.selectedItem.value.style.visibility = 'collapse';
                }
                x.key.classList.add('active');
                x.value.style.visibility = 'visible';
                this.selectedItem = x;
            };

            TopPage.prototype.add = function (index, el) {
                var x = this.items.get(index);
                if (x == null)
                    return false;
                if (el.parentElement != null)
                    el.parentElement.removeChild(el);
                x.value.appendChild(el);
            };
            return TopPage;
        })(Control);
        _controls.TopPage = TopPage;

        var TabPanel = (function () {
            function TabPanel(Tab, Panel) {
                this.Tab = Tab;
                this.Panel = Panel;
            }
            return TabPanel;
        })();
        _controls.TabPanel = TabPanel;

        var LayoutItem = (function (_super) {
            __extends(LayoutItem, _super);
            function LayoutItem() {
                _super.call(this, layouitem = document.createElement('div'));
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
                lefthead.appendChild(this._leftHead = document.createTextNode('Achate'));
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
                rigthdetail.classList.add('detail');
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
            Object.defineProperty(LayoutItem.prototype, "Title", {
                set: function (s) {
                    this._title.nodeValue = s;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutItem.prototype, "leftTitle", {
                set: function (v) {
                    this._leftHead.nodeValue = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutItem.prototype, "rightTitle", {
                set: function (v) {
                    this._rigthHead.nodeValue = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutItem.prototype, "leftDetail", {
                set: function (v) {
                    var _this = this;
                    v.forEach(function (s) {
                        _this.leftbody.appendChild(document.createTextNode(s));
                        _this.leftbody.appendChild(document.createElement('br'));
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutItem.prototype, "rightDetail", {
                set: function (v) {
                    var _this = this;
                    v.forEach(function (s) {
                        _this.rightbody.appendChild(document.createTextNode(s));
                        _this.rightbody.appendChild(document.createElement('br'));
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutItem.prototype, "Content", {
                set: function (el) {
                    this.main.appendChild(el);
                },
                enumerable: true,
                configurable: true
            });
            return LayoutItem;
        })(Control);
        _controls.LayoutItem = LayoutItem;

        var FlowLayout = (function (_super) {
            __extends(FlowLayout, _super);
            function FlowLayout() {
                _super.call(this, p = document.createElement('div'));
                this.items = new List(20);
                this.paddingHorizontal = 5;
                this.paddingVertical = 5;
                var p;
                p.classList.add('flow-layout');
            }
            FlowLayout.prototype.add = function (item, index) {
                var _this = this;
                if (typeof index === "undefined") { index = this.items.length; }
                if (item instanceof Array)
                    this.items.insertRangeAt(index, item);
                else
                    this.items.insertAt(index, item);
                var l = 0, t = 0;
                this.pt.style.position = 'fixed';
                var w = this.pt.offsetWidth;
                var pdh = this.paddingHorizontal;
                var pdv = this.paddingVertical;
                var mhe = pdv;
                var ir = false;

                var pt = this.pt;
                var lst = false;
                this.items.foreach(function (i, v) {
                    if (v.pt.parentElement != pt) {
                        if (v.pt.parentElement != null)
                            v.pt.parentElement.removeChild(v.pt);
                        v.pt.style.position = 'absolute';
                        _this.pt.appendChild(v.pt);
                    }
                    var ci = v.pt;
                    if (i == index)
                        ir = true;
                    var vw = l + pdh + ci.offsetWidth;
                    var wc = (vw - w) > (pdh + ci.offsetWidth) / 2;
                    if (wc || lst) {
                        t += mhe;
                        l = 0;
                        mhe = pdv;
                        lst = false;
                    }
                    if (!wc && vw > w) {
                        ;
                        lst = true;
                    }
                    if (ir) {
                        v.pt.style.position = 'absolute';
                        ci.style.left = l + pdh + "px";
                        ci.style.top = t + "px";
                    }

                    l += pdh + ci.offsetWidth;
                    mhe = Math.max(mhe, ci.offsetHeight + pdv);
                    return false;
                });
                this.pt.style.position = 'absolute';
            };
            return FlowLayout;
        })(Control);
        _controls.FlowLayout = FlowLayout;

        var MetroLayout = (function (_super) {
            __extends(MetroLayout, _super);
            function MetroLayout() {
                _super.call(this, tp = document.createElement('div'));
                this.moy = 80;
                this.selectedIndexes = [];
                this.selectedItem = null;
                this.multiSelect = true;
                var tp;
                tp.classList.add('metro-layout');
                var i = 0;
                var self = this;
                this.OnKeyDown(function (_self, e) {
                    var x = null;
                    if (self.activeItem)
                        switch (e.keyCode) {
                            case 39 /* right */:
                                tp.scrollLeft += self.moy;
                                break;
                            case 37 /* left */:
                                tp.scrollLeft -= self.moy;
                                break;
                        }
                });
            }
            MetroLayout.prototype.add = function (item) {
                if (!(item instanceof HTMLElement)) {
                    var d = document.createElement('div');
                    if (item instanceof Element)
                        d.appendChild(item);
                    else
                        d.appendChild(document.createTextNode(item));
                    item = d;
                }
                item.classList.add('item');
                this.pt.appendChild(item);
                var self = this;
                item.addEventListener('mousedown', function (e) {
                    if (e.ctrlKey)
                        self.setSelect(item);
                    if (e.altKey)
                        self.nonSelect(item);
                    self.setActive(item);
                });
                this.moy = (this.moy + item.offsetWidth) / 2;
            };

            MetroLayout.prototype.deselect = function (index) {
                var k = this.pt.children.item(index);
                if (k)
                    k.classList.remove('select');
            };

            MetroLayout.prototype.select = function (index, multiselect) {
                var i = this.pt.children.item(index);
                if (i == this.selectedItem)
                    return;
                if (!i)
                    return;
                if (!multiselect)
                    this.deselect(index);
                i.classList.add('select');
                this.selectedItem = i;
                return;
            };

            MetroLayout.prototype.setActive = function (item) {
                if (item == this.activeItem)
                    return;
                if (!item)
                    return;
                item.classList.add('active');
                if (this.activeItem)
                    this.activeItem.classList.remove('active');
                this.activeItem = item;
                return;
            };

            MetroLayout.prototype.nonSelect = function (i) {
                if (i)
                    i.classList.remove('select');
            };

            MetroLayout.prototype.setSelect = function (i) {
                if (!this.multiSelect && this.selectedItem)
                    this.selectedItem.classList.remove('select');
                i.classList.add('select');
                this.selectedItem = i;
                return;
            };
            return MetroLayout;
        })(Control);
        _controls.MetroLayout = MetroLayout;

        Control.startListening();

        var keyValue = (function () {
            function keyValue(key, value) {
                this.key = key;
                this.value = value;
            }
            return keyValue;
        })();

        var TabPage = (function (_super) {
            __extends(TabPage, _super);
            function TabPage(pt, parse) {
                _super.call(this, pt);
                this.children = [];
                if (TabPage.garbage.indexOf(pt) != -1)
                    return;
                this.runtabs = document.createElement("ul");
                this.runtabs.classList.add("run_tabs");
                this.run_panels = document.createElement("div");
                this.run_panels.classList.add("panels");
                pt.classList.add("ui-dialog-content");
                pt.classList.add("ui-widget-content");
                pt.classList.add("spice_run_dialog");

                if (parse)
                    this.Parse();
                pt.appendChild(this.runtabs);
                pt.appendChild(this.run_panels);
                pt.TabPage = this;
                TabPage.garbage.push(pt);
            }
            Object.defineProperty(TabPage.prototype, "SelectedTab", {
                get: function () {
                    return this._select;
                },
                enumerable: true,
                configurable: true
            });

            TabPage.Parse = function (p) {
                return new TabPage(p, true);
            };

            TabPage.prototype.Parse = function () {
                var tabs = this.pt.children;
                var l = tabs.length;
                for (var i = 0; i < l; i++) {
                    var tp = tabs[0];
                    var n = tp.title != null ? tp.title : "Tab " + i;
                    this.pt.removeChild(tp);
                    this.AddTab(document.createTextNode(n), tp);
                }
            };

            TabPage.prototype.SelectOne = function () {
                if (this._select != null)
                    return;
                if (this.children.length > 0)
                    this.Select(this.children[0]);
            };

            TabPage.prototype.SelectAt = function (i) {
                if (i < 0 || i >= this.children.length)
                    return false;
                return this.selectTP(this.children[i]);
            };

            TabPage.prototype.AddTab = function (head, panel) {
                var _this = this;
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

                h.onclick = function (e) {
                    _this.Select(e.srcElement);
                };
                this.children.push(new TabPanel(h, f));
                this.SelectOne();
            };

            TabPage.prototype.selectTP = function (tp) {
                if (this.SelectedTab == tp)
                    return false;
                if (tp.Tab.classList.contains('run_form_disabled'))
                    return false;
                if (this.SelectedTab != null) {
                    this.SelectedTab.Tab.classList.remove('run_tab_sel');
                    this.SelectedTab.Panel.style.display = 'none';
                }
                tp.Tab.classList.add('run_tab_sel');
                tp.Panel.style.display = 'block';
                this._select = tp;
                return true;
            };

            TabPage.prototype.Select = function (t) {
                if (t instanceof TabPanel)
                    return this.selectTP(t);
                for (var j = this.children.length - 1; j >= 0; j--) {
                    var i = this.children[j];
                    if (i.Tab == t)
                        return this.selectTP(i);
                }
                return false;
            };
            TabPage.garbage = [];
            return TabPage;
        })(Control);
        _controls.TabPage = TabPage;

        var boxInfo = (function () {
            function boxInfo(name, iconClass, title) {
                this.name = name;
                this.iconClass = iconClass;
                this.title = title;
                if (title == null) {
                    this.title = name;
                }
            }
            return boxInfo;
        })();
        _controls.boxInfo = boxInfo;

        var box = (function () {
            function box(param) {
                if (param == null)
                    return;
                var controls = param.toLowerCase().split(',');
                for (var i = controls.length - 1; i >= 0; i--) {
                    switch (controls[i]) {
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
            box.GetInfo = function (bname) {
                if (bname == null)
                    return null;
                bname = bname.toLowerCase();
                var controls = box.Boxes;
                for (var i = controls.length - 1; i >= 0; i--) {
                    var t = controls[i];
                    if (t.name == bname)
                        return t;
                }
                return null;
            };

            box.Add = function (name, iconClass, title) {
                box.Boxes.push(new boxInfo(name, iconClass, title));
            };
            box.Boxes = [];
            return box;
        })();
        _controls.box = box;

        (function () {
            box.Add('close', 'ui-icon-closethick', 'close');
            box.Add('hide', 'ui-icon-minusthick', 'hide');
            box.Add('min', 'ui-icon-minusthick', 'hide');
            box.Add('max', 'ui-icon-plusthick', 'hide');
        })();

        var size = (function () {
            function size(width, height) {
                this.width = width;
                this.height = height;
            }
            return size;
        })();
        _controls.size = size;

        var Dialog = (function (_super) {
            __extends(Dialog, _super);
            function Dialog(pt) {
                _super.call(this, pt);
                this.isSizing = false;
                this.Parse();
                Dialog.dialogs.push(this);
                pt.style.zIndex = "" + (Dialog.czindex++);

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
            Dialog.Focuson = function (diag) {
                var zi = parseInt(diag.pt.style.zIndex);
                var max = zi;
                Dialog.dialogs.foreach(function (i, v) {
                    var _zi = parseInt(v.pt.style.zIndex);
                    if (_zi > zi) {
                        v.pt.style.zIndex = "" + (_zi - 1);
                        max = _zi > max ? _zi : max;
                    }
                    return false;
                });
                diag.pt.style.zIndex = max + "";
            };
            Dialog.prototype.pointIsInRect = function (px, py, x, y, w, h) {
                return px >= x && px - x <= w && !(py < y || py - y > h);
            };

            /**
            @(parms x y w h) outside rect
            @(parms x1 y1 w1 h1) inside rect
            */
            Dialog.prototype.isIn = function (x, y, w, h, x1, y1, w1, h1, px, py) {
                return (this.pointIsInRect(px, py, x, y, w, h) && !this.pointIsInRect(px, py, x1, y1, w1, h1));
            };

            Dialog.prototype.onMouseEnter = function (e) {
                var _this = this;
                if (this.isSizing)
                    return;
                var w = this.pt.clientWidth;
                var h = this.pt.clientHeight;
                var lx = e.pageX;
                var ly = e.pageY;
                if (this.isIn(-20, h - 80, w + 40, h + 40, 20, 20, w - 40, w - 40, e.offsetX, e.offsetY)) {
                    var self = this;
                    w = w - lx;
                    h = h - ly;

                    function resizeAborded() {
                        self.isSizing = false;
                    }
                    ;

                    function endsizing() {
                        document.removeEventListener('mouseup', endsizing);
                        document.removeEventListener('mousemove', sizing);
                        this.style.background = "#efefef";
                        self.isSizing = false;
                    }
                    ;

                    function sizing(event) {
                        self.pt.style.width = w + event.pageX + "px";
                        self.pt.style.height = h + event.pageY + "px";
                        return true;
                    }
                    ;

                    function waitForSizing() {
                        self.isSizing = true;
                        this.removeEventListener('mousedown', waitForSizing);
                        this.addEventListener('mouseup', endsizing);
                        document.addEventListener('mousemove', sizing);
                        this.style.background = "#fffff1";
                    }
                    ;

                    this.pt.addEventListener('mousedown', waitForSizing);
                    setTimeout((function () {
                        if (!_this.isSizing) {
                            _this.pt.removeEventListener('mousedown', waitForSizing);
                            resizeAborded();
                        }
                    }).bind(this), 1000);
                }
            };

            Dialog.prototype.gettitle = function (cont) {
                var s = document.createElement('span');
                s.className = "ui-dialog-title";
                s.id = "ui-id-11";
                s.appendChild(cont);
                return s;
            };

            Dialog.prototype.getbbox = function (i, bname) {
                var bx = box.GetInfo(bname);
                if (bx == null)
                    return null;
                var b = document.createElement('button');
                b.className = "ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close";
                b.setAttribute("role", "button");
                b.setAttribute("aria-disabled", "false");

                b.title = bx.title;

                var s = document.createElement("span");
                s.className = "ui-button-icon-primary ui-icon " + bx.iconClass;
                b.style.right = i * 28 + 5 + "px";
                b.appendChild(s);
                return b;
            };

            Dialog.prototype.getBarTitle = function () {
                //<div id='tt' class="">
                var d = document.createElement("div");
                d.className = "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix";
                d.style.left = '0px';
                d.style.right = '0px';
                d.style.top = '0px';
                d.style.height = '28px';
                d.style.position = 'absolute';
                return d;
            };

            Dialog.prototype.getContentPanel = function () {
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
            };

            Dialog.prototype.swapTitle = function () {
                var title = this.pt.title;
                if (title[0] == '#') {
                    var xtitle = $(title, this.pt)[0];
                    if (xtitle != null) {
                        xtitle.parentElement.removeChild(xtitle);
                        return xtitle;
                    }
                }
                if (typeof title == 'string')
                    return document.createTextNode(title);
                return title;
            };

            Dialog.prototype.swapDialog = function () {
                var pt = this.pt;
                pt.onfocus = function () {
                    pt.style.zIndex = (Dialog.i++) + "";
                };

                pt.Size = { x: 400, y: 300 };

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
            };
            Dialog.prototype.Parse = function () {
                var pt = this.pt;
                this.swapDialog();
                var title = this.swapTitle();
                var ttl = this.getBarTitle();
                var box = this.pt.getAttribute('controls').split("|");
                ttl.appendChild(this.gettitle(title));
                for (var l = box.length - 1; l >= 0; l--) {
                    var w = this.getbbox(l, box[l]);
                    if (w != null)
                        ttl.appendChild(w);
                }
                pt.appendChild(ttl);
                var l = pt.childElementCount;
                if (l != 1) {
                    var cnt = this.getContentPanel();
                    var content = $('#content', this.pt)[0];
                    if (content == null) {
                        for (var c = 0; c < l; c++) {
                            var x = pt.childNodes[l];
                            pt.removeChild(x);
                            cnt.appendChild(x);
                        }
                        cnt.id = 'content';
                    } else
                        cnt.appendChild(content);
                    pt.appendChild(cnt);
                }
                this.Movable = ttl;
            };
            Dialog.dialogs = new List(5);
            Dialog.czindex = 1E+5;

            Dialog.i = 10;
            return Dialog;
        })(Control);
        _controls.Dialog = Dialog;

        var ColumnData = (function () {
            function ColumnData(name, getcellulNode, head) {
                if (typeof head === "undefined") { head = null; }
                this.name = name;
                this.getcellulNode = getcellulNode;
                this.head = head;
                if (head == null) {
                    var hc = document.createTextNode(name);
                    this.head = document.createElement('th');
                    this.head.appendChild(hc);
                }
                if (getcellulNode == null) {
                    this.getcellulNode = function (dataRow, col) {
                        var t = document.createTextNode(dataRow[col.name]);
                        var s = document.createElement('SPAN');
                        var cel = document.createElement("th");
                        s.appendChild(t);
                        cel.appendChild(s);
                        return cel;
                    };
                }
            }
            ColumnData.prototype.getCellulNode = function (dataRow) {
                return this.getcellulNode(dataRow, this);
            };

            ColumnData.prototype.getCell = function (dataRow) {
                return this.getcellulNode(dataRow, this);
            };
            return ColumnData;
        })();
        _controls.ColumnData = ColumnData;

        var Row = (function (_super) {
            __extends(Row, _super);
            function Row(pt) {
                _super.call(this, pt);
            }
            return Row;
        })(Control);
        _controls.Row = Row;

        _controls.hSP = document.documentElement.scrollByPages;
        var Table = (function (_super) {
            __extends(Table, _super);
            function Table(pt, scroll, getNewRow) {
                _super.call(this, pt);
                this.scroll = scroll;
                this.getNewRow = getNewRow;
                this.columns = [];
                this.rows = [];
                if (!Table.isSafe)
                    throw "Not Supported";
                Table.isSafe = false;
                if (getNewRow == null) {
                    this.getNewRow = function () {
                        return document.createElement("tr");
                    };
                }
                var self = this;
                this.OnKeyDown(function (s, e) {
                    self.onKeyDown(s, e);
                });
            }
            Table.prototype.onKeyDown = function (sender, e) {
                var c = this.selectedIndex;
                var r = this.rows;
                switch (e.keyCode) {
                    case 36 /* home */:
                        var x = this.rows[0];
                        if (x)
                            this.select(x.pt);
                        break;
                    case 35 /* end */:
                        x = this.rows[this.rows.length - 1];
                        if (x)
                            this.select(x.pt);
                        break;
                    case 33 /* pageUp */:
                        if (_controls.hSP)
                            (this.scroll || $('.scrollable', this.pt)[0] || $('.scrollable-auto', this.pt)[0]).scrollByPages(-1);
                        break;
                    case 34 /* pageDown */:
                        if (_controls.hSP)
                            (this.scroll || $('.scrollable', this.pt)[0] || $('.scrollable-auto', this.pt)[0]).scrollByPages(1);
                        break;
                    case 38 /* up */:
                        if (c < 1)
                            return;
                        this.select(r[c - 1].pt);
                        break;
                    case 40 /* down */:
                        if ((c == -1 && r.length == 0) || c == r.length - 1)
                            return;
                        this.select(r[c + 1].pt);
                        break;

                    default:
                        break;
                }
                e.stopPropagation();
                e.cancelBubble = true;
                e.stopImmediatePropagation();
            };

            Table.prototype.addColumn = function (column) {
                this.header.appendChild(column.head);
                this.columns.push(column);
            };

            Table.prototype.addNewRow = function () {
                var rn = this.getNewRow(this.rows.length);
                var self = this;
                rn.addEventListener('click', function () {
                    self.select(this);
                });
                var row = new Row(rn);
                this.rows.push(row);
                this.table.appendChild(rn);
                return row;
            };

            Object.defineProperty(Table.prototype, "selectedIndex", {
                get: function () {
                    return this.getIndexOf(this.selectedRow);
                },
                enumerable: true,
                configurable: true
            });

            Table.prototype.getIndexOf = function (row) {
                for (var i = this.rows.length - 1; i >= 0; i--) {
                    if (this.rows[i].pt == row)
                        return i;
                }
                return -1;
            };

            Table.prototype.select = function (row) {
                if (row == this.selectedRow)
                    return;
                row.classList.add("row-active");
                if (this.selectedRow != null)
                    this.selectedRow.classList.remove("row-active");
                this.selectedRow = row;
                if (Table.sIVIN)
                    row.scrollIntoViewIfNeeded();
                else
                    row.scrollIntoView();
            };

            Table.prototype.addRow = function (data, addCellToRow) {
                var row = this.addNewRow();
                var cls = this.columns;
                var cl = cls.length;
                for (var i = 0; i < cl; i++) {
                    var cn = cls[i];
                    addCellToRow(row.pt, data, cn);
                }
            };

            Table.Standard = function (pt, scroll) {
                Table.isSafe = true;
                var d = new Table(pt, scroll, getNewRow);
                var body = $('tbody', pt)[0];

                function getNewRow() {
                    return document.createElement("tr");
                }
                ;

                function getCellulNode(dataRow, col) {
                    var t = document.createTextNode(col.name == 'N°' ? d.rows.length : dataRow[col.name]);
                    var cel = document.createElement("td");
                    cel.appendChild(t);
                    return cel;
                }

                function addCellToRow(row, data, column) {
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
                        Firstname: "Achour",
                        Lastname: "Brahim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Slimane",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Omar",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Karim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Amine",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Nadir",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Brahim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Slimane",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Omar",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Karim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Amine",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Nadir",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Brahim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Slimane",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Omar",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Karim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Amine",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Nadir",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Brahim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Slimane",
                        Birthdate: "01/02/1991",
                        Year: 25
                    },
                    {
                        Firstname: "Achour",
                        Lastname: "Omar",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Karim",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Amine",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }, {
                        Firstname: "Achour",
                        Lastname: "Nadir",
                        Birthdate: "01/02/1991",
                        Year: 25
                    }
                ];
                for (var i = 0; i < s.length; i++) {
                    d.addRow(s[i], addCellToRow);
                }
            };
            Table.isSafe = false;

            Table.sIVIN = document.documentElement.scrollIntoViewIfNeeded != null;
            return Table;
        })(Control);
        _controls.Table = Table;

        var CardVisit = (function () {
            function CardVisit(fb, fr, bsv, $ff, $bf) {
                var f = new Grid(true);
                var map = {
                    f: f,
                    _fb: f.SetRow(fb.val, fb.Unit, 0 /* Direct */),
                    _fr: f.SetColumn(fr.val, fr.Unit, 0 /* Direct */),
                    _bsv: f.SetColumn(bsv.val, bsv.Unit, 0 /* Direct */),
                    _$ff: [],
                    _$bf: []
                };
                $ff.forEach(function (v) {
                    map._$ff.push(f.SetRow(v.val, v.Unit).setRepere(null, map._bsv));
                });
                $bf.forEach(function (v) {
                    map._$bf.push(f.SetRow(v.val, v.Unit).setRepere(map._bsv));
                });
            }
            return CardVisit;
        })();
        _controls.CardVisit = CardVisit;
    })(my.controls || (my.controls = {}));
    var controls = my.controls;
})(exports.my || (exports.my = {}));
var my = exports.my;
(function (my) {
    (function (data) {
        var sql = (function () {
            function sql(libraryName) {
                this.openRequest = indexedDB.open(libraryName, 1);
                var self = this;
                this.openRequest.onsuccess = function (response) {
                    self.db = self.openRequest.result;
                    self.isConnected = true;
                };

                this.openRequest.onerror = function (response) {
                    alert("Error code: " + response.target.errorCode);
                    self.isConnected = false;
                };
                this.openRequest.onupgradeneeded = function (response) {
                    response.currentTarget.result.createObjectStore("authors", { keypath: 'id', autoIncrement: true });
                };
            }
            return sql;
        })();
        data.sql = sql;
    })(my.data || (my.data = {}));
    var data = my.data;
})(exports.my || (exports.my = {}));
var my = exports.my;
function main() {
    function $f(s, st) {
        return $(s, st)[0];
    }

    function getMenu(s) {
        return $('.menu', s)[0];
    }

    function getPanel(s) {
        return $('.panel', s)[0];
    }
    update();
    var m1 = getMenu();

    var tg1 = $f('#tg1');
    var pnl = getPanel();
    return new my.controls.PSlideout(m1, pnl, tg1);
}
exports.main = main;

var openDatabase = eval('openDatabase');

var column = (function () {
    function column() {
    }
    return column;
})();

var database = (function () {
    function database() {
        this.tables = [];
    }
    return database;
})();
var table = (function () {
    function table() {
        this.name = "";
        this.columns = [];
    }
    Object.defineProperty(table.prototype, "stringColumns", {
        get: function () {
            var s = "";
            this.columns.forEach(function (v) {
                s = s == "" ? v.name : "," + v.name;
            });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    return table;
})();

var command = (function () {
    function command(command, params, callback) {
        if (typeof params === "undefined") { params = []; }
        this.command = command;
        this.params = params;
        this.callback = callback;
        this.next = null;
    }
    return command;
})();

var sql = (function () {
    function sql(database) {
        this.fcmd = null;
        this.lcmd = null;
        this.database = database;
        this.db = (openDatabase)(database.name, database.version, 'My library', 5 * 1024 * 1024);
        this.esql = this.executeSQL.bind(this);
    }
    sql.prototype.callback = function (i, p, s) {
        if (this.fcmd.callback != null)
            this.fcmd.callback(this.fcmd, true, i, p, s);
        this.fcmd = this.fcmd.next;
        if (this.fcmd == null)
            this.lcmd = null;
    };

    sql.prototype.internalexecuteSQL = function (t) {
        t.executeSql(this.fcmd.command, this.fcmd.params, this.fcmd.callback);
    };

    sql.prototype.fire = function () {
        if (this.fcmd == null)
            return;
        this.db.transaction(this.internalexecuteSQL);
    };

    sql.prototype.push = function (command) {
        if (this.fcmd == null)
            this.fcmd = this.lcmd = command;
        else {
            this.lcmd.next = command;
            this.lcmd = command;
        }
        this.fire();
    };

    sql.prototype.executeSQL = function (comd, params, callback) {
        this.push(new command(comd, params, callback));
        this.db.transaction(this.esql);
    };

    sql.prototype.createTable = function (table) {
        var s = "";
        table.columns.forEach(function (v, i) {
            s = s + v.name + " " + v.type + (v.key ? " PRIMARY KEY " : (v.autoincrement ? " AUTOINCREMENT " : (v.default != null ? v.default : "")));
            if (i !== 0)
                s = s + ',';
        });
    };

    sql.prototype.migrateDB = function (transaction) {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS authors(" + "id INTEGER PRIMARY KEY AUTOINCREMENT, " + "firstName TEXT, " + "lastName TEXT, " + "dateCreated TIMESTAMP DEFAULT(datetime('now', 'localtime')))");
    };

    sql.prototype.onError = function (error) {
        alert("Error code: " + error.code + " Message: " + error.message);
    };

    sql.prototype.onSuccess = function () {
        alert("Migration complete!");
    };
    return sql;
})();

var isql = (function () {
    function isql() {
        var win = window;
        indexedDB = indexedDB || win.indexedDB || win.mozIndexedDB || win.webkitIndexedDB || win.msIndexedDB;
        win.IDBTransaction = win.IDBTransaction || win.webkitIDBTransaction;
        win.IDBCursor = win.IDBCursor || win.webkitIDBCursor;
        win.IDBKeyRange = win.IDBKeyRange || win.webkitIDBKeyRange;
        if (indexedDB == null)
            throw 'your browser does not support isql';
    }
    isql.prototype.onupgraded = function (ev) {
    };
    isql.prototype.onsuccess = function (ev) {
    };
    isql.prototype.onerror = function (ev) {
    };
    isql.prototype.onblocked = function (ev) {
    };

    isql.prototype.open = function (name, version) {
        if (indexedDB == null)
            throw 'your browser does not support isql';
        this.request = indexedDB.open(name, version);
        var self = this;
        this.request.onsuccess = function (response) {
            self.db = self.request.result;
        };
        this.request.onerror = function (response) {
            self.db = new Error('the connection was not created');
            self.response = response;
        };
        this.request.onupgradeneeded = this.onupgraded.bind(this);
        this.request.onsuccess = this.onsuccess.bind(this);
        this.request.onerror = this.onerror.bind(this);
        this.request.onblocked = this.onblocked.bind(this);
    };
    return isql;
})();
//# sourceMappingURL=app.js.map
