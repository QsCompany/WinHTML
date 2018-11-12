import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    interface Interface extends ValidatableControl.Interface<string> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ValidatableControl.ViewModel<string> {
        /**
         * The current query string in the search box to filter on.
         */
        queryString: KnockoutObservable<string>;
        /**
         * Whether this control is shown or not.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * Whether the close button is visible or not.
         */
        closeButtonVisible: KnockoutObservableBase<boolean>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
    }
    class Widget extends ValidatableControl.Widget<string> implements Interface {
        private _name;
        private _textBoxViewModel;
        private _buttonViewModel;
        private _button;
        private _buttonClickHandler;
        private _input;
        private _inputEscapeKeyHandler;
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
        private _attachEvents();
        private _detachEvents();
    }
}
