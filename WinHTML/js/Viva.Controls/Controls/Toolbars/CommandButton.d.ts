import ExecutableButtonBase = require("./ExecutableButtonBase");
import ToolbarItemType = require("./ToolbarItemType");
import Base = require("../Base/Base");
import ToolbarButton = require("./ToolbarButton");
export = Main;
declare module Main {
    interface Interface<T> extends ExecutableButtonBase.Interface<T> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<T>;
    }
    class ViewModel<T> extends ExecutableButtonBase.ViewModel<T> {
        /**
         * The context to pass on to the command.
         */
        commandContext: KnockoutObservable<T>;
        /**
         * Creates an executable button.
         *
         * @param type The type of the button.
         */
        constructor(type?: ToolbarItemType.ToolbarItemType);
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
