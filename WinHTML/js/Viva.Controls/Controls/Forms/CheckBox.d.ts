import ValidatableControl = require("../Base/ValidatableControl");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * CheckBox value states.
     */
    enum Value {
        /**
         * CheckBox state representing unchecked state.
         */
        Unchecked = 0,
        /**
         * CheckBox state representing checked state.
         */
        Checked = 1,
        /**
         * CheckBox state representing indeterminate state.
         */
        Indeterminate = 2,
    }
    /**
     * Mouse states.
     */
    enum MouseState {
        /**
         * Default state.
         */
        Initial = 0,
        /**
         * Hover state.
         */
        Hover = 1,
        /**
         * Pressed state.
         */
        Active = 2,
    }
    /**
     * View model interface for CheckBox widget.
     */
    interface Interface extends ValidatableControl.Interface<Value> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    /**
     * The view model for CheckBox widget.
     */
    class ViewModel extends ValidatableControl.ViewModel<Value> {
        /**
         * Id attribute of the CheckBox.
         * If you don't provide an id, we will not add the attribute.
         */
        inputId: string;
        /**
         * Value attribute of the CheckBox when in checked state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "checked".
         */
        inputCheckedValue: KnockoutObservable<string>;
        /**
         * Value attribute of the CheckBox when in indeterminate state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "indeterminate".
         * This value will be used only for tri state CheckBox.
         */
        inputIndeterminateValue: KnockoutObservable<string>;
        /**
         * Enable tri-state CheckBox.
         * If you don't provide a value, the default is the standard dual state CheckBox.
         */
        isTriState: boolean;
        /**
         * Enable or disable user to select Indeterminate (when in tri-state CheckBox mode).
         * True by default.
         */
        canUserSetIndeterminate: KnockoutObservable<boolean>;
        /**
         * Current state of the mouse.
         */
        state: KnockoutObservable<MouseState>;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    /**
     * Creates a stylized CheckBox with support for ARIA.
     * Supports the following states:
     * * checked/indeterminate/unchecked.
     * * enabled/disabled.
     * * edited/not edited.
     */
    class Widget extends ValidatableControl.Widget<Value> implements Interface {
        private _name;
        private _checked;
        private _ariaChecked;
        private _checkChecked;
        private _checkIndeterminate;
        private _inputValue;
        private _input;
        private _attributes;
        private _events;
        private _svgElements;
        private _svgCheck;
        private _svgIndeterminate;
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
         * Toggles the value from checked to unchecked, unchecked to indeterminate and indeterminate to checked.
         */
        toggle(): void;
        /**
         * See parent.
         */
        _isSameValue(a: any, b: any): boolean;
        private _initializeComputeds();
        /**
         * Gets the value property of the CheckBox based on view model state.
         *
         * @param value CheckBox view model value.
         * @return Value property of the CheckBox.
         */
        private _getInputValue(value);
        private _addAttributes();
        private _removeAttributes();
        private _blur();
        private _focus();
        /**
         * Attaches event handlers.
         */
        private _attachEvents();
        /**
         * Detaches event handlers.
         */
        private _detachEvents();
    }
}
