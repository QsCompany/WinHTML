import Validators = require("../Validators");
import Base = require("./Base");
export = Main;
declare module Main {
    class Css<TValue> extends Base.Base<TValue> {
        private _input;
        private _valid;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        initialize(element: JQuery, validatable: Validators.Validatable<TValue>): void;
        /**
         * See interface.
         */
        onValidationStateChanged(newValue: Validators.ValidationState): void;
        private _setValidationAttribute(validationState);
    }
}
