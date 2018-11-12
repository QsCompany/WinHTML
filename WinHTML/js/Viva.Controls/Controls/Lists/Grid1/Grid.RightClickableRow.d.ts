import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IRightClickableRowExtension {
        /**
         * Gets the options of the plugin.
         */
        options: RightClickableRowOptions;
    }
    interface RightClickableRowOptions {
        /**
         * Disables the right clickable extension. Defaults to false.
         */
        disabled?: KnockoutObservable<boolean>;
    }
    interface RightClickableRowEventObject {
        /**
         * Metadata for right-clicked item.
         */
        rowMetadata: Grid.RowMetadata;
        /**
         * X position where right click happened.
         */
        clientX: number;
        /**
         * Y position where right click happened.
         */
        clientY: number;
    }
    class RightClickableRowExtension extends Grid.Extension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        private _eventRightClick;
        /**
         * Creates the right clickable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: RightClickableRowOptions);
        /**
         * Gets the options of the plugin.
         */
        options: RightClickableRowOptions;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
    }
}
