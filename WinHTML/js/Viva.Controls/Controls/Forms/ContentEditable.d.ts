import Sanitizer = require("../Base/Sanitizer");
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
         * Text displayed in the field when the htnl content is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         *  A custom sanitizer to validate and sanitize the editable HTML content.
         */
        sanitizer: Sanitizer.Sanitizer;
    }
    class Widget extends ValidatableControl.Widget<string> implements Interface {
        private _name;
        private _iframe;
        private _editableContentWindow;
        private _editableContentReady;
        private _toolbarButtonClickHandler;
        private _toolbarButtonBlurHandler;
        private _toolbarButtonFocusHandler;
        private _contentEditableIframeBlurHandler;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, viewModelType?: new () => ViewModel);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, viewModelType?: new () => ViewModel);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * See interface.
         */
        _getElementToFocus(): Element;
        private _execute(command);
        private _initializeContentEditableIframe();
        private _updateValue();
        private _getContent();
        private _setContent(content);
        private _sanitizeContent(content);
        private _sanitizeBrowserWorkaroundAttributes();
        private _initializeComputeds();
        private _attachEvents();
        private _detachEvents();
    }
}
