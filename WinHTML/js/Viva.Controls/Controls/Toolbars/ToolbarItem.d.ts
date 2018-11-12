import ToolbarItemType = require("./ToolbarItemType");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Defines an item in the toolbar.
     */
    interface ToolbarItemContract {
        /**
         * The type of the toolbar item.
         */
        type: ToolbarItemType.ToolbarItemType;
        /**
         * A value indicating whether or not the toolbar item is disabled.
         */
        disabled: KnockoutObservableBase<boolean>;
        /**
         * A value indicating whether or not the toolbar item is shown or hidden.
         */
        visible: KnockoutObservableBase<boolean>;
        /**
         * The message provided to the container when unauthorized.
         */
        unauthorizedMessage: KnockoutObservable<string>;
        /**
         * Signals the container is in unauthorized mode and provides an optional custom error message.
         *
         * @param message A custom error message in place of the default.
         */
        unauthorized(message?: string): void;
    }
    /**
     * See interface.
     */
    class ToolbarItem extends Base.ViewModel implements ToolbarItemContract {
        /**
         * See interface.
         */
        type: ToolbarItemType.ToolbarItemType;
        /**
         * See interface.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        unauthorizedMessage: KnockoutObservable<string>;
        /**
         * Creates a toolbar item.
         */
        constructor(type: ToolbarItemType.ToolbarItemType);
        /**
         * See interface.
         */
        unauthorized(message?: string): void;
    }
}
