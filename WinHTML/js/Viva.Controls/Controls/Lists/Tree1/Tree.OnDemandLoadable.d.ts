import TemplateEngine = require("../../../Util/TemplateEngine");
import Tree = require("./Tree");
export = Main;
declare module Main {
    interface OnDemandItemMetadata extends Tree.ItemMetadata {
        /**
         * Specifies that the item should be loadable.
         * It only needs to be set to true when the item is loadable.
         * Otherwise, no need to set this value.
         * False value meant to be used internally which means it was loadable but now loading or loaded.
         */
        loadable?: KnockoutObservableBase<boolean>;
    }
    interface OnDemandEventObject {
        /**
         * Tree.Item being loaded. When loading is finished, items property needs to be filled with fetched items.
         */
        item: Tree.Item;
        /**
         * Path of the item being loaded. This is the identifier of the item.
         */
        path: string;
    }
    class OnDemandLoadableExtension extends Tree.Extension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventItemExpand;
        /**
         * Creates the on-demand loadable item extension.
         */
        constructor();
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        defaultItemMetadataProperties(metadata: Tree.ItemMetadata): any;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * See parent.
         */
        getName(): string;
        private _observeChildrenRemoval(item);
        private _isExpandable(item);
        private _isExpanded(item);
        private _isCollapsed(item);
        private _isLoading(item);
    }
}
