import Base = require("./Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends Base.ViewModel {
        viewModels: Base.ViewModel[];
    }
    class Widget extends Base.Widget implements Interface {
        /**
         * The widgets collections.
         */
        widgets: Base.Widget[];
        /**
         * Callback function to allow custom disable class to be inserted.
         */
        widgetDisabledClass: () => string;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: ViewModel, createOptions: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        _initializeSubscriptions(viewModel: ViewModel): void;
        /**
         * Notification that view model disabled property changed.
         *
         * @param value Disabled if true.
         */
        private _onDisabledChanged(value);
    }
}
