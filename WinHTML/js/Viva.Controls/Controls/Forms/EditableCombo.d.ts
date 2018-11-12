import Positioning = require("../../Util/Positioning");
import ComboDropBase = require("./ComboDropBase");
import Base = require("../Base/Base");
import TypableControl = require("../Base/TypableControl");
export = Main;
declare module Main {
    enum DropDownWidth {
        /**
         * Width is determined by the content.
         */
        Default = 0,
        /**
         * Width is same as widget width.
         */
        Full = 1,
        /**
         * Content width if content width is larger than widget width. Otherwise widget width is used.
         */
        MinWidgetMaxContent = 2,
    }
    class DropAdapter<TWidget extends Base.Widget, TValue> extends ComboDropBase.DropAdapter<TWidget, TValue> {
        /**
         * This method is called by combo when the drop Image is clicked.
         *
         * @param evt Jquery event object.
         */
        dropClick(evt: JQueryEventObject): void;
        /**
         * Updates drop adapter based on changes to values.
         */
        valuesChanged(): void;
    }
    interface Interface<TValue> extends TypableControl.Interface<TValue>, ComboDropBase.Interface<TValue> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
    }
    class ViewModel<TValue> extends TypableControl.ViewModel<TValue> {
        /**
         * Placeholder text held by the control.
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Alignment used for drop popup.
         */
        popupAlignment: Positioning.PositioningAlignment;
        /**
         * Alignment used for input.
         */
        inputAlignment: Positioning.PositioningAlignment;
        /**
         * Width behavior of the drop popup.
         */
        dropDownWidth: KnockoutObservable<DropDownWidth>;
    }
    class Widget<TValue> extends TypableControl.Widget<TValue> implements Interface<TValue> {
        private _arrowClass;
        private _name;
        private _id;
        private _input;
        private _dropImage;
        private _dropPopup;
        private _scrollableParents;
        private _dropAdapter;
        private _blurPrevented;
        private _blurPreventHandle;
        private _dropImageMouseDownHandler;
        private _dropImageClickHandler;
        private _dropImageKeyDownHandler;
        private _dropImageKeyPressHandler;
        private _dropImageMouseEnterHandler;
        private _dropImageMouseLeaveHandler;
        private _dropImageFocusHandler;
        private _dropImageBlurHandler;
        private _dropPopupMouseDownHandler;
        private _inputKeyDownHandler;
        private _inputKeyUpHandler;
        private _inputKeyPressHandler;
        private _inputFocusHandler;
        private _inputBlurHandler;
        private _parentScrollHandler;
        private _inputMouseEnterHandler;
        private _inputMouseLeaveHandler;
        /**
         * Uses the underlying value to format and parse.
         */
        _formattedValue: KnockoutComputed<string>;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel<TValue>, createOptions?: Base.CreateOptions);
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
        options: ViewModel<TValue>;
        /**
         * Restores the focus on the input element to handle key events.
         */
        restoreFocus(): void;
        /**
         * Retrieves the input value
         */
        inputValue: string;
        /**
         * Updates drop adapter based on changes to values.
         */
        valuesChanged(): void;
        /**
         * Shows the drop popup. If already visible, hides it first.
         */
        showDropPopup(hideBeforeShow?: boolean): void;
        /**
         * Simple helper for _setFocus function. It will call focus on the returned Element.
         *
         * @return The element to set focus on.
         */
        _getElementToFocus(): Element;
        /**
         * Hides the drop popup. If already hidden, this is a noop.
         */
        hideDropPopup(): void;
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
        /**
         * Overriden by EditableCombo derivatives to optionally hide/continue showing drop popup.
         *
         */
        _valueChanged(): void;
        /**
         * Overriden by EditableCombo derivatives to create specific DropAdapter.
         *
         * @return The newly created DropAdapter.
         */
        _createDropAdapter(): DropAdapter<Base.Widget, TValue>;
        /**
         * Creates a drop element to host the popup widget. Derivatives can
         * override if they want to manipulate drop element.
         *
         * @return The drop element which contains the popup widget.
         */
        _createDropPopup(): JQuery;
        /**
         * Overriden by EditableCombo derivatives to decide how to parse the string value in the input.
         *
         * @param value Input value to be parsed.
         * @return Parsed value.
         */
        _parseValue(value: string): TValue;
        /**
         * Overriden by EditableCombo derivatives to decide how to format the current value to display in the input.
         *
         * @param value Underlying combo value to be formatted.
         * @return Formatted value to be displayed in the input.
         */
        _formatValue(value: TValue): string;
        private _setNormalArrow();
        private _setHoverArrow();
        private _initializeComputeds();
        /**
         * Toggles the drop popup of the combo.
         */
        private _toggleDropPopup();
        /**
         * Shows the drop popup. If already visible, hides it first.
         */
        private _showDropPopup();
        /**
         * Hides the drop popup. If already hidden, this is a noop.
         */
        private _hideDropPopup();
        /**
         * This notifies blur event not to hide drop popup because
         * something in the drop area is clicked. For these scenarios,
         * drop popup still needs to be visible.
         */
        private _preventBlur();
        /**
         * This clears the prevent blur timeout.
         */
        private _cancelPreventingBlur();
        /**
        * Attaches event handlers.
        */
        private _attachEvents();
        /**
         * Detaches event handlers.
         */
        private _detachEvents();
        private _onDropClick(evt);
        private _onKeyDown(evt);
        private _onKeyUp(evt);
        private _onKeyPress(evt);
    }
}
