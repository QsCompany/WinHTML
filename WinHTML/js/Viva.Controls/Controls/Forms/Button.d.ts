 import Base = require("../Base/Base");
export = Main;
declare module Main {
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
     * Images for mouse states.
     */
    interface MouseStateImageUris {
        /**
         * Default state.
         */
        initial?: string;
        /**
         * Hover state.
         */
        hover?: string;
        /**
         * Pressed state.
         */
        active?: string;
    }
    /**
     * Enabled and disabled Uris.
     */
    interface EnabledDisabledUris {
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        enabled?: MouseStateImageUris;
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        disabled?: MouseStateImageUris;
    }
    /**
     * Normal and pressed Uri options.
     */
    interface UriOptions {
        /**
         * An object with enabled and disabled properties set to MouseStateImageUris objects.
         */
        normal?: EnabledDisabledUris;
        /**
         * An object with enabled and disabled properties set to MouseStateImageUris objects.
         */
        pressed?: EnabledDisabledUris;
    }
    /**
     * Text for mouse states.
     */
    interface MouseStateTexts {
        /**
         * Default state.
         */
        initial?: string;
        /**
         * Hover state.
         */
        hover?: string;
        /**
         * Pressed state.
         */
        active?: string;
    }
    /**
     * Enabled and disabled text.
     */
    interface EnabledDisabledText {
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        enabled?: MouseStateTexts;
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        disabled?: MouseStateTexts;
    }
    /**
     * Normal and pressed state text options.
     */
    interface TextOptions {
        /**
         * An object with enabled and disabled properties set to EnabledDisabledText objects.
         */
        normal?: EnabledDisabledText;
        /**
         * An object with enabled and disabled properties set to EnabledDisabledText objects.
         */
        pressed?: EnabledDisabledText;
    }
    /**
     * Button interface.
     */
    interface Interface {
    }
    /**
     * Button view model.
     */
    class ViewModel extends Base.ViewModel {
        /**
         * Indicates if the button acts as a submit button. If true, when clicked, the button will trigger a submit event.
         */
        submit: boolean;
        /**
         * jQuery selector indicating what tag changes it's image source.
         */
        selector: KnockoutObservable<string>;
        /**
         * Indicates if the control is a press-able button.
         */
        toggle: KnockoutObservable<boolean>;
        /**
         * Current pressed state.
         * This value stays false if toggle is false.
         */
        pressed: KnockoutObservable<boolean>;
        /**
         * Current state of the mouse.
         */
        state: KnockoutObservable<MouseState>;
        /**
         * Callback function when the button is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Image URIs used in this widget.
         */
        uri: KnockoutObservable<UriOptions>;
        /**
         * Text used in this widget.
         * Same values as the uri option.
         */
        text: KnockoutObservable<TextOptions>;
        /**
         * Tab-index of the button.
         */
        tabindex: KnockoutObservable<number>;
        /**
         * Shows or hides the button.
         */
        visible: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the button is displayed as a default action.
         */
        isDefault: KnockoutObservableBase<boolean>;
    }
    /**
     * Creates a button which supports ARIA.
     */
    class Widget extends Base.Widget implements Interface {
        private _previousImg;
        private _previousSelector;
        private _body;
        private _clickHandler;
        private _mouseDownHandler;
        private _mouseEnterHandler;
        private _mouseLeaveHandler;
        private _mouseUpHandler;
        private _keyDownHandler;
        private _keyUpHandler;
        private _correctKeyPressed;
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
        private _initializeComputeds();
        /**
         * Attaches key event handlers to the button element.
         */
        private _attachKeyEvent();
        /**
         * Handles the click event for button element.
         *
         * @param evt The event object.
         * @return JQuery event hander result where false will stop propagation and return default.
         */
        private _click(evt);
        /**
         * Gets the current image alt from the view model state.
         *
         * @return The alt text.
         */
        private _getAlt();
        /**
         * Gets the appropriate uri or alt from the view model state.
         *
         * @param stack The uri or alt options to select from.
         * @return The selected uri or alt value.
         */
        private _getObject(stack);
        /**
         * Gets the current image uri from the view model state.
         *
         * @return The uri.
         */
        private _getUri();
        /**
         * Handles mouse down event for button element.
         */
        private _mouseDown();
        /**
         * Handles mouse enter event for button element.
         */
        private _mouseEnter();
        /**
         * Handles mouse leave event for button element.
         */
        private _mouseLeave();
        /**
         * Removes the mouse up event handler if still attached to the body.
         */
        private _removeMouseUpHandler();
    }
}
