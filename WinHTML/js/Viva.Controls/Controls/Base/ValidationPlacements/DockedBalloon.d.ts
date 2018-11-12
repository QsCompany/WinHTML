import Validators = require("../Validators");
import Base = require("./Base");
export = Main;
declare module Main {
    /**
     * Optional settings to control the validation docked balloon behavior.
     */
    interface DockedBalloonOptions {
        /**
         * Optional setting to indicate if validation balloon should be shown on focus/click.
         */
        balloonVisible?: boolean;
    }
    /**
     * Optional settings to control the validation docked balloon behavior for each ValidationState.
     */
    interface ValidationStateDockedBalloonOptions extends StringMap<DockedBalloonOptions> {
        /**
         * Optional settings to control the validation docked balloon behavior for ValidationState.None.
         */
        none?: DockedBalloonOptions;
        /**
         * Optional settings to control the validation docked balloon behavior for ValidationState.Invalid.
         */
        invalid?: DockedBalloonOptions;
        /**
         * Optional settings to control the validation docked balloon behavior for ValidationState.Valid.
         */
        valid?: DockedBalloonOptions;
        /**
         * Optional settings to control the validation docked balloon behavior for ValidationState.Pending.
         */
        pending?: DockedBalloonOptions;
    }
    class DockedBalloon<TValue> extends Base.Base<TValue> {
        static defaultOptions: {
            "validationStateBalloonOptions": {
                "pending": {
                    "balloonVisible": boolean;
                };
            };
        };
        private _settings;
        private _inputElement;
        private _inputSelector;
        private _originalInputWidth;
        private _widget;
        private _widgetElement;
        private _widgetViewModel;
        private _widgetWidth;
        private _validationStateBalloonOptions;
        private _inputElementFocusHandler;
        private _inputElementBlurHandler;
        private _widgetAnchorElementClickHandler;
        private _errorMessagesListWidget;
        constructor(settings?: any);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        onValidationStateChanged(newValue: Validators.ValidationState): void;
        /**
         * Sets the input element selector that will be modified to fit the width of the validation placement when shown.
         */
        _setInputSelector(selector: string): void;
        private _createDockedBalloon();
        private _initializeValidationStateDockedBalloonOptions(settings?);
        private _attachEvents();
        private _detachEvents();
        private _onInputElementFocus();
        private _onInputElementBlur();
    }
}
