import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    interface Interface extends ValidatableControl.Interface<any> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ValidatableControl.ViewModel<any> {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservableBase<string>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
    }
    class Widget extends ValidatableControl.Widget<any> implements Interface {
        private _name;
        private _input;
        private _validNumberValidator;
        private _valueRange;
        private _maxDecimalPoints;
        private _defaultDecimalPoints;
        private _rawStringInternal;
        private _decimalPointValidated;
        private _rawStringValue;
        private _inputElementFocusHandler;
        private _inputElementBlurHandler;
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
         * See base.
         */
        _getElementToFocus(): Element;
        private _createValidators();
        private _attachEvents();
        private _detachEvents();
        _initializeSubscriptions(viewModel: ViewModel): void;
        _initializeComputeds(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * Validates and propagates decimal point settings for the control.
         *
         * @return Number Indicates a valid number of decimal points set for the control.
         */
        private _processDecimalPoint();
        /**
         * Propagates the value set on the view model to the UI.
         *
         * @param numericVal Set on the viewModel.
         */
        private _processValue(numericVal);
    }
}
