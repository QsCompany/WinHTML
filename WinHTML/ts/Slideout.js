var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//import Slideout = m.Slideout;
var _classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};
var my;
(function (my) {
    var controls;
    (function (controls) {
        var Emitter = (function () {
            function Emitter() {
                this._eventCollection = {};
                _classCallCheck(this, Emitter);
            }
            Emitter.prototype.on = function (event, listener) {
                this._eventCollection[event] = this._eventCollection[event] || [];
                this._eventCollection[event].push(listener);
                return this;
            };
            Emitter.prototype.once = function (event, listener) {
                var self = this;
                function fn() {
                    self.off(event, fn);
                    listener.apply(this, arguments);
                }
                fn.listener = listener;
                this.on(event, fn);
                return this;
            };
            Emitter.prototype.off = function (event, listener) {
                var listeners = undefined;
                // Defines listeners value.
                if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
                    return this;
                }
                listeners.forEach(function (fn, i) {
                    if (fn === listener || fn.listener === listener) {
                        // Removes the given listener.
                        listeners.splice(i, 1);
                    }
                });
                // Removes an empty event collection.
                if (listeners.length === 0) {
                    delete this._eventCollection[event];
                }
                return this;
            };
            Emitter.prototype.emit = function (event) {
                var _this = this;
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                var listeners = undefined;
                // Defines listeners value.
                if (!this._eventCollection || !(listeners = this._eventCollection[event])) {
                    return this;
                }
                // Clone listeners
                listeners = listeners.slice(0);
                listeners.forEach(function (fn) { return fn.apply(_this, args); });
                return this;
            };
            return Emitter;
        })();
        controls.Emitter = Emitter;
        var decouple = function (node, event, fn) {
            var requestAnimFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            }());
            function decouple(node, event, fn) {
                var eve, tracking = false;
                function captureEvent(e) {
                    eve = e;
                    track();
                }
                function track() {
                    if (!tracking) {
                        requestAnimFrame(update);
                        tracking = true;
                    }
                }
                function update() {
                    fn.call(node, eve);
                    tracking = false;
                }
                node.addEventListener(event, captureEvent, false);
            }
        };
        var scrollTimeout;
        var scrolling = false;
        var doc = window.document;
        var html = doc.documentElement;
        var msPointerSupported = window.navigator.msPointerEnabled;
        var touch = {
            'start': msPointerSupported ? 'MSPointerDown' : 'touchstart',
            'move': msPointerSupported ? 'MSPointerMove' : 'touchmove',
            'end': msPointerSupported ? 'MSPointerUp' : 'touchend'
        };
        var prefix = (function prefix() {
            var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/;
            var styleDeclaration = doc.getElementsByTagName('script')[0].style;
            for (var prop in styleDeclaration) {
                if (regex.test(prop)) {
                    return '-' + prop.match(regex)[0].toLowerCase() + '-';
                }
            }
            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
            // However (prop in style) returns the correct value, so we'll have to test for
            // the precence of a specific property
            if ('WebkitOpacity' in styleDeclaration) {
                return '-webkit-';
            }
            if ('KhtmlOpacity' in styleDeclaration) {
                return '-khtml-';
            }
            return '';
        }());
        var Slideout = (function (_super) {
            __extends(Slideout, _super);
            function Slideout(options) {
                _super.call(this);
                this._startOffsetX = 0;
                this._currentOffsetX = 0;
                this._opening = false;
                this._moved = false;
                this._opened = false;
                this._preventOpen = false;
                this._closing = false;
                this._thread = -1;
                if (options.panel == null)
                    return;
                this._touch = options.touch === undefined ? true : options.touch && true;
                this.panel = options.panel;
                this.menu = options.menu;
                if (this.panel.className.search('slideout-panel') === -1) {
                    this.panel.className += ' slideout-panel';
                }
                if (this.menu.className.search('slideout-menu') === -1) {
                    this.menu.className += ' slideout-menu';
                }
                // Sets options
                this._fx = options.fx || 'ease';
                this._duration = parseInt(options.duration, 10) || 300;
                this._tolerance = parseInt(options.tolerance, 10) || 70;
                this._padding = this._translateTo = parseInt(options.padding, 10) || 256;
                this._orientation = options.side === 'right' ? -1 : 1;
                this._translateTo *= this._orientation;
                // Init touch events
                if (this._touch) {
                    this._initTouchEvents();
                }
            }
            Slideout.prototype.StopClosing = function () {
                clearTimeout(this._thread);
                this._thread = -1;
                html.className = html.className.replace(/ slideout-open/, '');
                this.panel.style.transition = this.panel.style['-webkit-transition'] = this.panel.style[prefix + 'transform'] = this.panel.style.transform = '';
                this._closing = false;
                this._opened = false;
            };
            Slideout.prototype.StopOpening = function () {
                clearTimeout(this._thread);
                this._thread = -1;
                this.panel.style.transition = this.panel.style['-webkit-transition'] = '';
                this._opening = false;
                this._opened = true;
            };
            Slideout.prototype.open = function () {
                var self = this;
                if (this.isClosing())
                    this.StopClosing();
                else if (this._opened || this.isOpening())
                    return this;
                if (this._thread != -1)
                    this.StopClosing();
                this.emit('beforeopen');
                if (html.className.search('slideout-open') === -1) {
                    html.className += ' slideout-open';
                }
                this._setTransition();
                this._translateXTo(this._translateTo);
                this._opening = true;
                this._thread = setTimeout(function () {
                    self._thread = -1;
                    self.panel.style.transition = self.panel.style['-webkit-transition'] = '';
                    self._opening = false;
                    self._opened = true;
                    self.emit('open');
                }, this._duration + 50);
                return this;
            };
            /**
         * Closes slideout menu.
         */
            Slideout.prototype.close = function () {
                var self = this;
                if (this.isOpening())
                    this.StopOpening();
                else if (this.isClosing() || !this._opened)
                    return this;
                if (this._thread != -1)
                    this.StopOpening();
                this.emit('beforeclose');
                this._setTransition();
                this._translateXTo(0);
                this._closing = true;
                this._thread = setTimeout(function () {
                    self._thread = -1;
                    html.className = html.className.replace(/ slideout-open/, '');
                    self.panel.style.transition = self.panel.style['-webkit-transition'] = self.panel.style[prefix + 'transform'] = self.panel.style.transform = '';
                    self._closing = false;
                    self._opened = false;
                    self.emit('close');
                }, this._duration + 50);
                return this;
            };
            /**
         * Toggles (open/close) slideout menu.
         */
            Slideout.prototype.toggle = function () {
                return this.isOpen() ? this.close() : this.open();
            };
            /**
         * Returns true if the slideout is currently open, and false if it is closed.
         */
            Slideout.prototype.isOpen = function () {
                return this._opened;
            };
            Slideout.prototype.isOpening = function () {
                return this._opening && this._thread != -1;
            };
            Slideout.prototype.isClosing = function () {
                return this._closing && this._thread != -1;
            };
            /**
         * Translates panel and updates currentOffset with a given X point
         */
            Slideout.prototype._translateXTo = function (translateX) {
                this._currentOffsetX = translateX;
                this.panel.style[prefix + 'transform'] = this.panel.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
            };
            /**
         * Set transition properties
         */
            Slideout.prototype._setTransition = function () {
                this.panel.style[prefix + 'transition'] = this.panel.style.transition = prefix + 'transform ' + this._duration + 'ms ' + this._fx;
            };
            /**
         * Initializes touch event
         */
            Slideout.prototype._initTouchEvents = function () {
                var self = this;
                /**
             * Decouple scroll event
             */
                this._onScrollFn = decouple(doc, 'scroll', function () {
                    if (!self._moved) {
                        clearTimeout(scrollTimeout);
                        scrolling = true;
                        scrollTimeout = setTimeout(function () {
                            scrolling = false;
                        }, 250);
                    }
                });
                /**
             * Prevents touchmove event if slideout is moving
             */
                this._preventMove = function (eve) {
                    if (self._moved) {
                        eve.preventDefault();
                    }
                };
                doc.addEventListener(touch.move, this._preventMove);
                /**
             * Resets values on touchstart
             */
                this._resetTouchFn = function (eve) {
                    if (typeof eve.touches === 'undefined') {
                        return;
                    }
                    self._moved = false;
                    self._opening = false;
                    self._startOffsetX = eve.touches[0].pageX;
                    self._preventOpen = (!self._touch || (!self.isOpen() && self.menu.clientWidth !== 0));
                };
                this.panel.addEventListener(touch.start, this._resetTouchFn);
                /**
             * Resets values on touchcancel
             */
                this._onTouchCancelFn = function () {
                    self._moved = false;
                    self._opening = false;
                };
                this.panel.addEventListener('touchcancel', this._onTouchCancelFn);
                /**
             * Toggles slideout on touchend
             */
                this._onTouchEndFn = function () {
                    if (self._moved) {
                        (self._opening && Math.abs(self._currentOffsetX) > self._tolerance) ? self.open() : self.close();
                    }
                    self._moved = false;
                };
                this.panel.addEventListener(touch.end, this._onTouchEndFn);
                /**
             * Translates panel on touchmove
             */
                this._onTouchMoveFn = function (eve) {
                    if (scrolling || self._preventOpen || typeof eve.touches === 'undefined') {
                        return;
                    }
                    var dif_x = eve.touches[0].clientX - self._startOffsetX;
                    var translateX = self._currentOffsetX = dif_x;
                    if (Math.abs(translateX) > self._padding) {
                        return;
                    }
                    if (Math.abs(dif_x) > 20) {
                        self._opening = true;
                        var oriented_dif_x = dif_x * self._orientation;
                        if (self._opened && oriented_dif_x > 0 || !self._opened && oriented_dif_x < 0) {
                            return;
                        }
                        if (oriented_dif_x <= 0) {
                            translateX = dif_x + self._padding * self._orientation;
                            self._opening = false;
                        }
                        if (!self._moved && html.className.search('slideout-open') === -1) {
                            html.className += ' slideout-open';
                        }
                        self.panel.style[prefix + 'transform'] = self.panel.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';
                        self.emit('translate', translateX);
                        self._moved = true;
                    }
                };
                this.panel.addEventListener(touch.move, this._onTouchMoveFn);
            };
            /**
         * Enable opening the slideout via touch events.
         */
            Slideout.prototype.enableTouch = function () {
                this._touch = true;
                return this;
            };
            /**
         * Disable opening the slideout via touch events.
         */
            Slideout.prototype.disableTouch = function () {
                this._touch = false;
                return this;
            };
            /**
         * Destroy an instance of slideout.
         */
            Slideout.prototype.destroy = function () {
                // Close before clean
                this.close();
                // Remove event listeners
                doc.removeEventListener(touch.move, this._preventMove);
                this.panel.removeEventListener(touch.start, this._resetTouchFn);
                this.panel.removeEventListener('touchcancel', this._onTouchCancelFn);
                this.panel.removeEventListener(touch.end, this._onTouchEndFn);
                this.panel.removeEventListener(touch.move, this._onTouchMoveFn);
                doc.removeEventListener('scroll', this._onScrollFn);
                // Remove methods
                this.open = this.close = function () { return this; };
                // Return the instance so it can be easily dereferenced
                return this;
            };
            return Slideout;
        })(Emitter);
        controls.Slideout = Slideout;
        var PSlideout = (function (_super) {
            __extends(PSlideout, _super);
            function PSlideout(menu, panel, toggle) {
                var _this = this;
                _super.call(this, {
                    'panel': panel,
                    'menu': menu,
                    'duration': 1000
                });
                this.toggles = [];
                if (menu == null || panel == null)
                    return null;
                panel.menus = panel.menus || [];
                var self = this;
                panel.menus.push(this);
                this.toggles.push(toggle);
                function close() { self.close(); }
                this
                    .on('beforeopen', function () { _this.menu.style.display = 'block'; })
                    .on('close', function () {
                    this.menu.style.display = 'none';
                    menu.removeEventListener('mouseleave', close);
                })
                    .on('open', function () { menu.addEventListener('mouseleave', close); });
                menu.addEventListener('mouseenter', function () { if (self.isClosing())
                    self.open(); });
                if (toggle != null)
                    toggle.addEventListener('click', function () { _this.toggle(); });
            }
            PSlideout.prototype.toggle = function () {
                if (this.isOpening()) {
                    this.close();
                }
                else if (this.isClosing()) {
                    this.open();
                }
                else if (this.isOpen())
                    this.close();
                else
                    PSlideout.OpenByCloseOthers(this, this.panel.menus, 0);
                return this;
            };
            PSlideout.OpenByCloseOthers = function (self, slides, i) {
                if (i >= slides.length) {
                    self.open();
                    return;
                }
                var mn = slides[i];
                if (self != mn) {
                    if (mn.isOpen()) {
                        var f;
                        mn.on('close', f = function () {
                            mn.off('close', f);
                            PSlideout.OpenByCloseOthers(self, slides, i + 1);
                        });
                        mn.close();
                        return;
                    }
                }
                PSlideout.OpenByCloseOthers(self, slides, i + 1);
            };
            return PSlideout;
        })(Slideout);
        controls.PSlideout = PSlideout;
    })(controls = my.controls || (my.controls = {}));
})(my = exports.my || (exports.my = {}));
//main();
//# sourceMappingURL=Slideout.js.map