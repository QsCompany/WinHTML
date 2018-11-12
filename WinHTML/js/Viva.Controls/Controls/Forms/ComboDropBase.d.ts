import EditableControl = require("../Base/EditableControl");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * This is an abstract class used by EditableCombo to talk to the widget inside the drop popup.
     */
    class DropAdapter<TWidget extends Base.Widget, TValue> {
        _combo: Base.Widget;
        _widget: TWidget;
        /**
         * Indicates whether a popup can be shown or not.
         */
        canShowPopup: KnockoutObservable<boolean>;
        constructor();
        /**
         * Gets whether the widget is created yet or not.
         *
         * @return The widget is created or not.
         */
        widgetExists: boolean;
        /**
         * Gets the current widget.
         *
         * @return The widget.
         */
        widget: TWidget;
        /**
         * Destroys the adapter.
         */
        dispose(): void;
        /**
         * Sets the owner combo of the drop adapter.
         *
         * @param combo Owner combo of the drop adapter
         */
        setCombo(combo: Base.Widget): void;
        /**
         * This method is called by the combo when drop popup is being displayed.
         *
         * @param combo EditableCombo element which will own the drop popup.
         * @param fixture The element to apply the widget to.
         * @return The newly created widget.
         */
        createWidget(combo: Interface<TValue>, fixture: JQuery): TWidget;
        /**
         * This method is called by the combo when drop popup is being hidden.
         */
        destroyWidget(): void;
        /**
         * Gets whether this drop adapter allows typing or not.
         *
         * @return The adapter allows typing or not.
         */
        allowsTyping(): boolean;
        /**
         * This method is called by combo when keydown is pressed in the input element.
         * The goal is to let the derivatives handle different keys other than up, down, left, right.
         *
         * @param evt Jquery event object.
         * @return Returns true if not handled, otherwise returns false.
         */
        keyDown(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when keyup is fired for the input element.
         *
         * @param evt Jquery event object.
         * @return Returns true if not handled, otherwise returns false.
         */
        keyUp(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when keypress is fired for the input element.
         *
         * @param evt Jquery event object.
         * @return Returns true if not handled, otherwise returns false.
         */
        keyPress(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the down key is pressed in the input element.
         *
         * @param evt Jquery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        downKey(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the up key is pressed in the input element.
         *
         * @param evt jQuery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        upKey(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the left key is pressed in the input element.
         *
         * @param evt Jquery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        leftKey(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the right key is pressed in the input element.
         *
         * @param evt Jquery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        rightKey(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the enter key is pressed in the input element.
         *
         * @param evt Jquery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        enterKey(evt: JQueryEventObject): boolean;
        /**
         * This method is called by combo when the tab key is pressed in the input element.
         *
         * @param evt Jquery event object.
         * @return Returns false if default behavior needs to be prevented.
         */
        tabKey(evt: JQueryEventObject): boolean;
        /**
         * Drop adapter derivatives override this method to decide which
         * widget to create inside the drop popup.
         *
         * @param combo EditableCombo element which will own the drop popup.
         * @param fixture The element to apply the widget to.
         * @return The newly created widget.
         */
        _createWidget(combo: Interface<TValue>, fixture: JQuery): TWidget;
    }
    interface Interface<TValue> extends EditableControl.Interface<TValue> {
        /**
         * The view model driving this widget.
         */
        options: EditableControl.ViewModel<TValue>;
        /**
         * Restores the focus on the input element.
         */
        restoreFocus(): void;
    }
}
