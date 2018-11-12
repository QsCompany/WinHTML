import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface HierarchicalItem extends Grid.Item {
        /**
         * Depth of item nesting.
         * Zero for top-level items.
         */
        depth: KnockoutObservableBase<number>;
        /**
         * Indicates if the item is expandable.
         * Undefined indicates expandability is unknown yet.
         */
        expandable: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the item is expanded or collapsed.
         */
        expanded: KnockoutObservableBase<boolean>;
    }
    interface Hierarchy {
        /**
         * The items to display in the grid.
         */
        items: KnockoutObservableBase<HierarchicalItem[]>;
        /**
         * Expands a hierarchy item.
         * @param item The item to expand.
         */
        expand: (item: HierarchicalItem) => void;
        /**
         * Collapses a hierarchy item.
         * @param item The item to expand.
         */
        collapse: (item: HierarchicalItem) => void;
        /**
         * Expands all hierarchy items.
         */
        expandAll: () => void;
        /**
         * Collapses all hierarchy items.
         */
        collapseAll: () => void;
    }
    interface IHierarchicalExtension {
        /**
         * Gets the options of the plugin.
         */
        options: HierarchicalOptions;
    }
    interface HierarchicalOptions {
        /**
         * Provides the hierarchical data to the grid.
         */
        hierarchy: Hierarchy;
    }
    interface HierarchicalColumn extends Grid.Column {
        /**
         * Indicates if the column is hierarchical.
         */
        hierarchical?: boolean;
    }
    class HierarchicalExtension extends Grid.Extension implements IHierarchicalExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        /**
         * Creates the hierarchical row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: HierarchicalOptions);
        /**
         * Gets the options of the plugin.
         */
        options: HierarchicalOptions;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * See inteface.
         */
        getDefaultColumnProperties(): any;
        private _getDefaultHierarchicalOptions();
    }
}
