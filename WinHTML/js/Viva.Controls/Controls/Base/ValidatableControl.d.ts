import Validators = require("./Validators");
import EditableControl = require("./EditableControl");
import Base = require("./Base");
export = Main;
declare module Main {
    interface Interface<TValue> extends EditableControl.Interface<TValue> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
        /**
         * Checks all the validators to determine if the value is valid.
         *
         * @param force Forces re-validation even though the TValue hasn't changed.
         */
        validate(force?: boolean): void;
    }
    class ViewModel<TValue> extends EditableControl.ViewModel<TValue> implements Validators.Validatable<TValue>, Validators.ErrorPlacement<TValue> {
        /**
         * False to never validate, True for immediate and on keypress.
         */
        enableValidation: KnockoutObservable<boolean>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * Indicates the current validation state. The validation state is useful when there are async validators and
         * validation completion should be notified.
         */
        validationState: KnockoutObservable<Validators.ValidationState>;
        /**
         * Validators to apply to the value when validating.
         */
        validators: KnockoutObservableArray<Validators.Validator<TValue>>;
        /**
         * List of placements that display validation status.
         */
        validationPlacements: KnockoutObservableArray<Validators.ValidationPlacement<TValue>>;
        /**
         * Creates a new validatable control view model.
         */
        constructor();
    }
    class Widget<TValue> extends EditableControl.Widget<TValue> implements Interface<TValue> {
        private _initializingValidatableControl;
        private _validationState;
        private _validationStateInternal;
        private _valid;
        private _validationLifetimeManager;
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
          * See interface.
          */
        validate(force?: boolean): void;
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
        /**
         * See parent.
         */
        _afterCreate(): void;
        _onValueChanged(value: TValue): void;
        _valueChangeValidation(): void;
        _initializeValidationPlacements(): void;
        private _disposeValidationLifetimeManager();
        private _hasValidators();
        private _initializeValidation();
        private _onValidatorsChanged();
        private _shouldValidate();
    }
}
