import Base = require("../Base/Base");
import TypableControl = require("../Base/TypableControl");
export = Main;
declare module Main {
    enum Strength {
        VeryWeak = 0,
        Weak = 1,
        Fair = 2,
        Strong = 3,
        VeryStrong = 4,
    }
    interface Interface extends TypableControl.Interface<string> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends TypableControl.ViewModel<string> {
        /**
         * Placeholder text shown when password is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    class Widget extends TypableControl.Widget<string> implements Interface {
        private _input;
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
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        private _initializeComputeds();
    }
}
