import Base = require("./Base/Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface ResourceStrings {
        /**
         * The text "previous" shown when using the back arrow.
         */
        previous: string;
        /**
         * The text "next" shown when using the forward arrow.
         */
        next: string;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * Current page selected.
         */
        currentPage: KnockoutObservable<number>;
        /**
         * Total number of pages.
         */
        numberOfPages: KnockoutObservable<number>;
        /**
         * Maximum number of pages for a small pager. Big pager includes a textbox.
         */
        maxPages: KnockoutObservable<number>;
        /**
         * Resource Strings.
         */
        text: ResourceStrings;
    }
    class Widget extends Base.Widget implements Interface {
        private _pages;
        private _clickPageEventHandler;
        private _clickArrowPreviousEventHandler;
        private _clickArrowNextEventHandler;
        private _inputBlurEventHandler;
        private _textBoxViewModel;
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
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        private _longPager;
        private _showArrows;
        private _initializeComputeds();
        private _attachEvents();
        private _detachEvents();
        private _isCurrentPage(page);
        private _isCurrentPageFirst();
        private _isCurrentPageLast();
        private _getDefaultResourceStrings();
    }
}
