/// <reference path="../../../Definitions/jquery.d.ts" />
/// <reference path="../../../Definitions/knockout.d.ts" />
/// <reference path="../../../Definitions/knockout.projections.d.ts" />
/// <reference path="../../../Definitions/q.d.ts" />
import Promise = require("./Promise");
export = Main;
declare module Main {
    /**
     * ValidationState represents the current validation state when list of validators are run.
     */
    enum ValidationState {
        /**
         * Default validation state.
         */
        None = 0,
        /**
         * Validation failed.
         */
        Invalid = 1,
        /**
         * Validation succeeded.
         */
        Valid = 2,
        /**
         * Validation pending during async validation calls.
         */
        Pending = 3,
    }
    interface Validatable<TValue> {
        /**
         * Indicates if validation should be skipped or not.
         */
        enableValidation: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * Indicates the current validation state. The validation state is useful when there are async validators and
         * validation completion should be notified.
         */
        validationState: KnockoutObservable<ValidationState>;
        /**
         * Validators to apply to the value when validating.
         */
        validators: KnockoutObservableArray<Validator<TValue>>;
    }
    interface ValidationPlacement<TValue> {
        /**
         * Initializes the ValidationPlacement.
         *
         * @param element The widget element.
         * @param validatable Interface containing validation specific validators and valid flag.
         */
        initialize(element: JQuery, validatable: Validatable<TValue>): void;
        /**
         * Destroys the artifacts related to the validation placement.
         */
        dispose(): void;
        /**
         * Triggers when the errorMessages ViewModel property changes.
         *
         * @param newValue Array of validation error messages.
         */
        onErrorMessageChanged(newValue: string): void;
        /**
         * Triggers when the validationState ViewModel property changes.
         *
         * @param newValue Current ValidationState value.
         */
        onValidationStateChanged(newValue: ValidationState): void;
    }
    interface ErrorPlacement<TValue> {
        /**
         * List of placements that display validation status.
         */
        validationPlacements: KnockoutObservableArray<ValidationPlacement<TValue>>;
    }
    /**
     * Validator base class. Used to define validators that can be attached to an
     * validatable control view model to validate the value.
     */
    class Validator<TValue> {
        private _subscription;
        /**
         * Validation rule error message.
         */
        message: KnockoutObservable<string>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * Indicates if the current validation state.
         */
        validationState: KnockoutObservable<ValidationState>;
        /**
         * Evaluates if the value is valid (works cross IFRAME).
         */
        validate: KnockoutObservable<TValue>;
        /**
         * Indicates whether an empty value is valid or not.
         */
        isEmptyValid: KnockoutObservable<boolean>;
        /**
         * Constructs a validator.
         *
         * @param message Describes the validation rule.
         */
        constructor(message?: string);
        /**
         * Releases resources held by the validator.
         */
        dispose(): void;
        /**
         * Determines if the value is valid.
         * Should be overridden in derived classes.
         *
         * @param value The value to check.
         * @return Indicates the current validation state.
         */
        _validate(value: TValue): ValidationState;
    }
    /**
     * Escapes regular expression special characters -[]/{}()*+?.\^$|
     *
     * @param str The string to escape.
     * @return The escaped string.
     */
    function escapeRegExpOperators(str: string): string;
    class Match extends Validator<string> {
        private _expression;
        /**
         * Constructs a validator that checks if the value matches a regular expression.
         *
         * @param message Validation rule error message.
         */
        constructor(expression: RegExp, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class NotMatch extends Validator<string> {
        private _expression;
        /**
         * Constructs a validator that checks if the value does not match a regular expression.
         *
         * @param message Validation rule error message.
         */
        constructor(expression: RegExp, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class Contains extends Match {
        /**
         * Constructs a validator that checks that the value contains at least one case insensitive match of a search string.
         *
         * @param search The search string to match.
         * @param message Validation rule error message.
         */
        constructor(search: string, message?: string);
    }
    class NotContains extends NotMatch {
        /**
         * Constructs a validator that checks that the value does not contain a case insensitive match of a search string.
         *
         * @param search The search string to match.
         * @param message Validation rule error message.
         */
        constructor(search: string, message?: string);
    }
    class ContainsCharacters extends Match {
        /**
         * Constructs a validator that checks that the value contains at least one character from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
    class NotContainsCharacters extends NotMatch {
        /**
         * Constructs a validator that checks that the value does not contain any characters from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
    class HasDigit extends Match {
        /**
         * Constructs a validator that checks that the value has at least one digit from 0 to 9.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one upper or lower case letter from A to Z or a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasUpperCaseLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one upper case letter from A to Z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasLowerCaseLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one lower case letter from a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasPunctuation extends ContainsCharacters {
        /**
         * Constructs a validator that checks that the value contains at least one punctuation character from:
         * ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \ : " ; ' < > , . ? / ~ `
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class Compare<TValue> extends Validator<TValue> {
        private _compareTo;
        /**
         * Base class for comparison validators. Not to be used directly.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: any, message?: string);
        /**
         * See base.
         */
        _validate(value: TValue): ValidationState;
        /**
         * Compares two values.
         * (Derived classes must override.)
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of comparison.
         */
        _compare(value: TValue, compareTo: TValue): boolean;
    }
    class Equals<TValue> extends Compare<TValue> {
        /**
         * Constructs a validator that compares if the value is equal to a provided value.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: TValue, message?: string);
        constructor(compareTo: () => TValue, message?: string);
        /**
         * Compares two values for strict equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: TValue, compareTo: TValue): boolean;
    }
    class CaseInsensitiveComparison extends Compare<string> {
        /**
         * Constructs a validator that uses toLowerCase() to compare two values.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: string, message?: string);
        constructor(compareTo: () => string, message?: string);
        /**
         * Compares two values for case insensitive equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: string, compareTo: string): boolean;
    }
    class LocaleAwareCaseInsensitiveComparison extends Compare<string> {
        /**
         * Constructs a validator that uses toLocaleLowerCase() to compare two values.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: string, message?: string);
        constructor(compareTo: () => string, message?: string);
        /**
         * Compares two values for locale aware case insensitive equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: string, compareTo: string): boolean;
    }
    class LengthRange extends Validator<string> {
        private _min;
        private _max;
        /**
         * Constructs a validator that checks that the value length is between min and max.
         *
         * @param min The minimum number of characters to be valid. May be null if there is no min.
         * @param max The maximum number of characters to be valid. May be null if there is no max.
         * @param message Validation rule error message.
         */
        constructor(min: number, max: number, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class MinLength extends LengthRange {
        /**
         * Constructs a validator that checks that the value length is at least min.
         *
         * @param min The minimum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
    class MaxLength extends LengthRange {
        /**
         * Constructs a validator that checks that the value length is less than or equal to the max.
         *
         * @param max The maximum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
    class Required extends MinLength {
        /**
         * Constructs a validator that checks whether the value is empty.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class NotNull<TValue> extends Validator<TValue> {
        /**
         * Constructs a validator that checks whether the value is null or not.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
        /**
         * See base.
         */
        _validate(value: TValue): ValidationState;
    }
    class Numeric extends Validator<string> {
        /**
         * Constructs a validator that checks whether the value is a number.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class ValueRange extends Validator<any> {
        private min;
        private max;
        /**
         * Constructs a validator that checks whether the value is within the range defined by min and max number.
         *
         * @param min Minimum range value to get the value.
         * @param max Maximum range value to get the value.
         * @param message Validation rule error message.
         */
        constructor(min: number, max: number, message?: string);
        /**
         * Constructs a validator that checks whether the value is within the range defined by min and max number.
         *
         * @param min Minimum range accessor to get the value.
         * @param max Maximum range accessor to get the value.
         * @param message Validation rule error message.
         */
        constructor(min: () => number, max: () => number, message?: string);
        /**
         * See base.
         */
        _validate(value: any): ValidationState;
    }
    class MinValue extends ValueRange {
        /**
         * Constructs a validator that checks whether the value is greater than or equal to the specified minimum number.
         *
         * @param min Minimum range value.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
    class MaxValue extends ValueRange {
        /**
         * Constructs a validator that checks whether the value is less than or equal to the specified maximum number.
         *
         * @param max Maximum range value.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
    class DateTimeRange extends Validator<Date> {
        private minDateTime;
        private maxDateTime;
        private timezoneOffset;
        /**
         * Constructs a validator that checks whether the date is within the range defined by min and max date, with 1 second precision.
         *
         * @param min Earliest, enabled date.
         * @param max Latest, enabled date.
         * @param message Validation rule error message.
         */
        constructor(min: Date, max: Date, timezoneOffset: KnockoutObservable<number>, message?: string);
        /**
         * See base.
         */
        _validate(value: Date): ValidationState;
    }
    class DayRange extends Validator<Date> {
        private minDateTime;
        private maxDateTime;
        private timezoneOffset;
        /**
         * Constructs a validator that checks whether the date is within the range defined by min and max date, with a day precision.
         *
         * @param min Earliest, enabled date.
         * @param max Latest, enabled date.
         * @param message Validation rule error message.
         */
        constructor(min: Date, max: Date, timezoneOffset: KnockoutObservable<number>, message?: string);
        /**
         * See base.
         */
        _validate(value: Date): ValidationState;
    }
    class CustomAsyncValidator<TValue> extends Validator<TValue> {
        private _validationHandler;
        private _context;
        private _pendingAsyncRequests;
        private _latestValidationAsyncRequestId;
        /**
         * Constructs a validator that invokes an async handler to check whether the given value is valid or not.
         * The async validation is provided by the user and can have any custom validation logic.
         *
         * @param message Validation rule error message.
         * @param validationHandler Validation function that takes in a value and an optional context object and returns a jquery promise object.
         * @param context Validation context that will be passed on when the validationHandler is invoked.
         */
        constructor(message: string, validationHandler: (value: TValue, context?: any) => Promise.PromiseV<string>, context?: any);
        /**
         * For custom async validation we need to handle few important scenarios to make sure the validation result is consistent.
         *          1) Cuncurrent async validation request are possible and it must be handled.
         *          2) The result of async validation can race and can overwrite with an inconsistent result.
         *          3) Syncronous completion of the async request.
         *
         * Custom async validator will keep track of all pending request and will honor only the last validation request and update the validation state.
         *
         * @param value The current value that needs to be validated.
         *
         * @return The current validation state after evaluating the validation logic.
         */
        _validate(value: TValue): ValidationState;
        private _updateResult(message, validationState);
        private _updateValidationResult(promise, message, validationState);
        private _removePendingAsyncRequest(promise);
    }
    class Invalid extends Validator<any> {
        /**
         * Constructs a validator that always return invalid result.
         *
         * @param message Validation rule error message.
         */
        constructor(message: string);
        /**
         * See base.
         */
        _validate(value: any): ValidationState;
    }
}
