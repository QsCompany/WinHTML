import ToolbarButton = require("./ToolbarButton");
import Command = require("../Command");
import ToolbarItemType = require("./ToolbarItemType");
export = Main;
declare module Main {
    interface Interface<T> extends ToolbarButton.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<T>;
    }
    class ViewModel<T> extends ToolbarButton.ViewModel {
        /**
         * See interface.
         */
        command: Command.Command<T>;
        /**
         * Creates an executable button.
         *
         * @param type The type of the button.
         */
        constructor(type: ToolbarItemType.ToolbarItemType);
    }
}
