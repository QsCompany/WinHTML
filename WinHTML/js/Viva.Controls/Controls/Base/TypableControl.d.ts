import ValueUpdateTrigger = require("./ValueUpdateTrigger");
import ValidatableControl = require("./ValidatableControl");
import Base = require("./Base");
export = Main;
declare module Main {
    interface Interface<TValue> extends ValidatableControl.Interface<TValue> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
    }
    class ViewModel<TValue> extends ValidatableControl.ViewModel<TValue> {
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         *  Updates the value view model based on enum option.
         */
        valueUpdateTrigger: ValueUpdateTrigger.ValueUpdateTrigger;
    }
    class Widget<TValue> extends ValidatableControl.Widget<TValue> implements Interface<TValue> {
        private _delayValidationTimer;
        private _keyUpCommitHandler;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel<TValue>;
        validate(force?: boolean): void;
        _attachTypableEvents(): void;
        _detachTypableEvents(): void;
        _valueChangeValidation(): void;
        _getValueUpdateTrigger(): string;
        /**
         * Runs when delay validation is enabled and checks the frequency of the key strokes are with in the delay validation timeout specified by the user.
         *
         * @return Whether validation should be delayed.
         */
        _shouldDelayValidation(): boolean;
        private _clearDelayValidationTimer();
        private static _isContentChangeTrigger(valueUpdateTrigger);
        private _runDelayValidationTimer();
        private _delayValidationEnabled();
    }
}
