import Validators = require("../Validators");
export = Main;
declare module Main {
    class Base<TValue> implements Validators.ValidationPlacement<TValue> {
        _element: JQuery;
        _validatable: Validators.Validatable<TValue>;
        _subscriptions: KnockoutSubscription<any>[];
        _errorMessage: KnockoutComputed<string>;
        private _destroyIds;
        /**
         * _checkExistsOrRegisterDestroyId.  This is utility function for the destroy method to avoid recursive
         *
         * @param destroyId Unique identifier for the destroy to identify itself.  In the javascript inheritance, this.destroy is always the same.
         *                  But super.dispose is unique since super is function scope.  Typically, use super.dispose as id. For root object, use null as Id.
         * @return whether this destroyMethod is already on the executed. If true, mean it is already been executed.
         */
        _checkExistsOrRegisterDestroyId(destroyId: any): boolean;
        /**
         * See interface.
         */
        isDestroyed(): boolean;
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
        onErrorMessageChanged(newValue: string): void;
        /**
         * See interface.
         */
        onValidationStateChanged(newValue: Validators.ValidationState): void;
        /**
         * Initializes the subscriptions property.
         */
        _initializeSubscriptions(): void;
        /**
         * Disposes the subscriptions property.
         */
        _disposeSubscriptions(): void;
    }
}
