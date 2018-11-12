import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * The options for splitter controls.
     */
    interface SplitterOptions {
        /**
         * The initial height of the top pane.
         */
        topPaneHeight: number;
        /**
         * Whether top pane should be shown or not.
         */
        showTopPane: KnockoutObservableBase<boolean>;
    }
    /**
     * Interface for the splitter control.
     */
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends Base.ViewModel {
        showTopPane: KnockoutObservableBase<boolean>;
        private _topPaneHeight;
        /**
         * Creates a new instance of the FilterCombo view model.
         */
        constructor(options: SplitterOptions);
        /**
         * The initial top pane height setting for the control.
         */
        topPaneHeight: number;
    }
    class Widget extends Base.Widget implements Interface {
        private _topPane;
        private _bottomPane;
        private _resizeDragger;
        private _shadow;
        private _animationSpeed;
        private _resizeEventHandler;
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
        private _attachEvents();
        private _detachEvents();
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        private _setPaneContent(topPaneContent, bottomPaneContent);
        private _setPaneHeights(topPaneHeight?);
        private _bindResizeEvents();
        private _setShadowLocation();
        private _bindTopPaneToggle();
        private _showTopPane();
        private _hideTopPane();
        private _disableScrollbars();
        private _enableScrollbars();
    }
}
