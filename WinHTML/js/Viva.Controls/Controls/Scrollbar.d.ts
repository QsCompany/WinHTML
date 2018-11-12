import Base = require("./Base/Base");
export = Main;
declare module Main {
    class ViewModel extends Base.ViewModel {
        /**
         * Polls the content area at 100 ms intervals to see if the size has changed. If it has, refreshContent is called.
         * Whenever possible, it is recommended to leave this value as false and call refreshContent when the content changes.
         */
        autoRefreshContent: boolean;
        /**
         * If true, refreshContainer will be automatically called if the window is resized.
         */
        refreshContainerOnResize: boolean;
        /**
         * Indicates if scrolling into view should try to scroll vertically.
         */
        scrollIntoViewVertical: boolean;
        /**
         * Indicates if scrolling into view should try to scroll horizontally.
         */
        scrollIntoViewHorizontal: boolean;
        /**
         * Fits the scroll view to the container even if it changes size.
         */
        fitContainer: boolean;
    }
    /**
     * Changes the default style of a system scrollbar.
     * Your element will be wrapped inside two elements. In order to obtain the outer element, call the "widget" method.
     * No style are transferred between elements, you must use the following style on a parent element in order to get your visual style
     * working: margin, border, float, position, top/right/bottom/left.
     *
     * The scrollbar has two kind of refresh:
     * * refreshContent: will simply look if the scroll size changed and refresh the scrollbar handle
     * * refreshContainer: will reflow by destroying and re-creating the control and recalculate the whole size of your element
     *
     * refreshContent is faster than refreshContainer. If you know your control is not going to change in size, use refreshContent.
     * On a window.resize, refreshContainer is automatically called by default.
     */
    class Widget extends Base.Widget {
        private _widget;
        private _scrollableArea;
        private _overflowProperties;
        private _sizeProperties;
        private _scrollingObjectCache;
        private _trackEnter;
        private _minimumScrollbarSize;
        private _bars;
        private _ratio;
        private _resizeHandler;
        private _scrollbarSize;
        private _refreshingContainer;
        private _focusInTimeoutHandle;
        private _resizeTracking;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * Destroys the scrollbar widget.
         */
        dispose(): void;
        /**
         * Get view model driving this widget.
         *
         * @return ViewModel.
         */
        options: ViewModel;
        /**
         * Gets the element's widget.
         *
         * @return JQuery object representing the widget.
         */
        widget(): JQuery;
        /**
         * Refreshes the scroll handles by looking at the content scroll sizes.
         */
        refreshContent(): void;
        /**
         * Refreshes the whole element by destroying and re-creating the widget.
         * This call is significantly slower than using refreshContent.
         */
        refreshContainer(): void;
        /**
         * Gets the current vertical position of the scrollbar.
         *
         * @return Current vertical position of the scrollbar in pixel.
         */
        scrollTop(): number;
        /**
         * Sets the current vertical position of the scrollbar.
         *
         * @param value Vertical position in pixel.
         */
        scrollTop(value: number): void;
        /**
         * Gets the current horizontal position of the scrollbar.
         *
         * @return Current horizontal position of the scrollbar in pixel.
         */
        scrollLeft(): number;
        /**
         * Sets the current horizontal position of the scrollbar.
         *
         * @param value Horizontal position in pixel.
         */
        scrollLeft(value: number): void;
        /**
         * Scrolls the element into view. You can optionally align with top or left based on the scroll area.
         * By default, the element is scrolled to align with the top and left of the scroll area.
         *
         * @param element jQuery selector.
         * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
         * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
         */
        scrollIntoView(element: string, alignWithTop?: boolean, alignWithLeft?: boolean): void;
        /**
         * @param element JQuery Element.
         * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
         * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
         */
        scrollIntoView(element: JQuery, alignWithTop?: boolean, alignWithLeft?: boolean): void;
        /**
         * @param element DOMElement.
         * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
         * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
         */
        scrollIntoView(element: Element, alignWithTop: boolean, alignWithLeft: boolean): void;
        scrollIntoView(element: EventTarget, alignWithTop: boolean, alignWithLeft: boolean): void;
        private _setRefreshContainerOnResize();
        private _setAutoRefreshContent();
        private _getScrollbarSize(widget?);
        private _portScroll(callback);
        private _createOrUpdateTracks(recalculateHandleSize?);
        private _createOrUpdateTrack(kind, recalculateHandleSize?);
        private _createTrack(kind);
        private _detachScrollable();
        private _attachScrollable();
        private _setExtrasPosition();
        private _setExtraPosition(extra, kind);
        private _wrapElement();
        private _attachWidgetEvents();
        private _resetWidgetScrollPosition();
        private _getVisibilityStatus(element);
        private _eraseOverflowProperties(from);
        private _eraseSizeProperties(from);
        private _getScrollingObject(recalculate?);
        private _isVerticalScrolling(overflowY);
        private _isHorizontalScrolling(overflowX);
        private _isScrolling(overflow, kind);
        private _setHandlePosition(handle, kind);
        private _setHandleSize(handle, doubleTrack, kind);
        private _getHandleHandler(that, calls);
        private _getTrackHandler(that, kind);
        private _resize();
    }
}
