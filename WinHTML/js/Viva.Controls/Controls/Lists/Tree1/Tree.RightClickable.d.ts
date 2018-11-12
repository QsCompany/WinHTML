import Tree = require("./Tree");
export = Main;
declare module Main {
    interface RightClickableEventObject {
        /**
         * Right clicked item.
         */
        item: Tree.Item;
        /**
         * Path of the item being right clicked.
         */
        path: string;
        /**
         * X position where right click happened.
         */
        clientX: number;
        /**
         * Y position where right click happened.
         */
        clientY: number;
    }
    class RightClickableExtension extends Tree.Extension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventRightClick;
        /**
         * Creates the right clickable extension.
         */
        constructor();
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
