import Base = require("./Base");
export = Main;
declare module Main {
    interface Interface<TValue> extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
    }
    class ViewModel<TValue> extends Base.ViewModel {
        /**
         * Name attribute of the control to use with form.
         */
        name: string;
        /**
         * Value held by the control. Can be any type.
         */
        value: KnockoutObservable<TValue>;
        /**
         * Dirty state of the control. If set to null when passed to a the widget constructor the widget will add a computed observable that is set to true when field value changes from the initial value present at widget creation.
         */
        dirty: KnockoutObservableBase<boolean>;
        /**
         *  Control focused state.
         */
        focused: KnockoutObservable<boolean>;
        /**
         * Constructs an editable control view model.
         */
        constructor();
    }
    class Widget<TValue> extends Base.Widget implements Interface<TValue> {
        private _ready;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: ViewModel<TValue>, createOptions: Base.CreateOptions);
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
        options: ViewModel<TValue>;
        /**
         * Compares if newValue is the same as initialValue.
         *
         * @param a Value 1.
         * @param b Value 2.
         * @return True if both values are the same.
         */
        _isSameValue(a: TValue, b: TValue): boolean;
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
    }
}
