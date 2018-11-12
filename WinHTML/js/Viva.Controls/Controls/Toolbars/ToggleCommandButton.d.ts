import ExecutableButtonBase = require("./ExecutableButtonBase");
import Base = require("../Base/Base");
import ToolbarButton = require("./ToolbarButton");
import ToolbarItem = require("./ToolbarItem");
export = Main;
declare module Main {
    interface ToggleButtonContext<T> {
        /**
         * A value indicating whether or not the toggle button is in the checked state.
         */
        checked: boolean;
        /**
         * The context defined by the consumer of the toggle button.
         */
        context: T;
    }
    interface Interface<T> extends ExecutableButtonBase.Interface<ToggleButtonContext<T>> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<T>;
    }
    class ViewModel<T> extends ExecutableButtonBase.ViewModel<ToggleButtonContext<T>> {
        /**
         * The option group that the toggle button belongs to.
         */
        optionGroupName: string;
        /**
         * A value indicating whether or not the toggle button is in the checked state.
         */
        checked: KnockoutObservable<boolean>;
        /**
         * The context to pass on to the command.
         */
        commandContext: KnockoutObservable<T>;
        /**
         * This callback should be used when the toggle button belongs to options group and its state change will impact other toggle buttons in the group.
         * The primary usage of the callback is to control the UI state of the toggle buttons when the current button state changes.
         */
        onStateChangeCallback: (currentItem: ToolbarItem.ToolbarItemContract, checked: boolean) => void;
        constructor();
    }
    class Widget<T> extends ToolbarButton.Widget implements Interface<T> {
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: ViewModel<T>, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel<T>;
        /**
         * See base.
         */
        _initializeComputeds(): void;
        /**
         * See base.
         */
        _isDisabled(): boolean;
        /**
         * See base.
         */
        _onClick(element: JQuery, evt: JQueryEventObject): void;
        /**
         * Command execution state will be used to show the disabled styling.
         * Users can toggle canExecute during long async command operation.
         */
        _canExecute(): boolean;
    }
}
