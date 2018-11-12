import Balloon = require("./Balloon");
import Base = require("./Base/Base");
export = Main;
declare module Main {
    enum Type {
        /**
         * Displays a circle with an "i" in it as an anchor.
         */
        Info = 0,
        /**
         * Displays a box with an "!" in it as an anchor.
         */
        Validation = 2,
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface CssClasses extends StringMap<string> {
    }
    class ViewModel extends Base.ViewModel {
        /**
         * See interface.
         */
        type: Type;
        /**
         * See interface.
         */
        position: KnockoutObservable<Balloon.Position>;
        /**
         * See interface.
         */
        content: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        link: KnockoutObservable<Balloon.Link>;
        /**
         * See interface.
         */
        balloonVisible: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        stopClickPropagation: KnockoutObservable<boolean>;
    }
    class Widget extends Base.Widget implements Interface {
        private _balloonViewModel;
        private _balloonWidget;
        private _balloonPinned;
        private _typeString;
        private _scrollableParents;
        private _anchorMouseEnterHandler;
        private _anchorMouseLeaveHandler;
        private _anchorClickHandler;
        private _anchorFocusInHandler;
        private _anchorFocusOutHandler;
        private _documentMouseDownHandler;
        private _resizeEventHandler;
        private _parentScrollHandler;
        private _beforeClickedEventHandler;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param doesn't match this widget's view model. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param doesn't match this widget's view model. If null, will use the widget ViewModel type.
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
        private _initializeComputeds();
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        private _initializeBalloonWidget();
        private _attachEvents();
        private _detachEvents();
        private _anchorMouseEnter();
        private _anchorClick(evt);
        private _anchorMouseLeave();
        private _anchorFocusIn();
        private _anchorFocusOut();
        private _scrollOrResizeWindow();
        private _documentMouseDown(evt);
        private _isImageShown();
        private _isCheckPopulated();
        private _getOffset(direction);
    }
}
