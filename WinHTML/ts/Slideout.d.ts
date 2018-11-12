export declare module my.controls {
    class Emitter {
        private _eventCollection;
        constructor();
        on(event: any, listener: any): Emitter;
        once(event: any, listener: any): Emitter;
        off(event: any, listener: any): Emitter;
        emit(event: any): Emitter;
    }
    class Slideout extends Emitter {
        private _startOffsetX;
        private _currentOffsetX;
        private _opening;
        private _moved;
        private _opened;
        private _preventOpen;
        private _closing;
        private _touch;
        private _thread;
        panel: HTMLElement;
        menu: HTMLElement;
        private _fx;
        private _duration;
        private _tolerance;
        private _padding;
        private _orientation;
        private _translateTo;
        constructor(options: any);
        StopClosing(): void;
        StopOpening(): void;
        open(): Slideout;
        /**
     * Closes slideout menu.
     */
        close(): Slideout;
        /**
     * Toggles (open/close) slideout menu.
     */
        toggle(): Slideout;
        /**
     * Returns true if the slideout is currently open, and false if it is closed.
     */
        isOpen(): boolean;
        isOpening(): boolean;
        isClosing(): boolean;
        /**
     * Translates panel and updates currentOffset with a given X point
     */
        _translateXTo(translateX: any): void;
        /**
     * Set transition properties
     */
        _setTransition(): void;
        /**
     * Initializes touch event
     */
        _initTouchEvents(): void;
        /**
     * Enable opening the slideout via touch events.
     */
        enableTouch(): Slideout;
        /**
     * Disable opening the slideout via touch events.
     */
        disableTouch(): Slideout;
        /**
     * Destroy an instance of slideout.
     */
        destroy(): Slideout;
        private _onScrollFn;
        private _preventMove;
        private _onTouchMoveFn;
        private _onTouchEndFn;
        private _onTouchCancelFn;
        private _resetTouchFn;
    }
    class PSlideout extends Slideout {
        private toggles;
        constructor(menu: any, panel: any, toggle: HTMLElement);
        toggle(): PSlideout;
        static OpenByCloseOthers(self: PSlideout, slides: PSlideout[], i: number): void;
    }
}
