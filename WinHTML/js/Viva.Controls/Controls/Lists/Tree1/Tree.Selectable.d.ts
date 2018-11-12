import TemplateEngine = require("../../../Util/TemplateEngine");
import FocusableTree = require("./Tree.Focusable");
import Tree = require("./Tree");
export = Main;
declare module Main {
    interface ISelectableExtension {
        /**
         * Gets the selected item.
         *
         * @return Selected item.
         */
        getSelected(): Tree.Item;
        /**
         * Unselects the currently selected item. Noop, if nothing selected.
         */
        unselect(): void;
        /**
         * Selects specified item in the treeView.
         *
         * @param item Data item to select.
         */
        select(item: Tree.Item): void;
    }
    interface SelectableItemMetadata extends FocusableTree.FocusableItemMetadata {
        /**
         * Indicates if the item is selected.
         */
        selected?: KnockoutObservableBase<boolean>;
        /**
         * Indicates if an item is selectable.
         */
        selectable?: KnockoutObservable<boolean>;
    }
    interface SelectableEventObject {
        /**
         * Selected item.
         */
        selected?: Tree.Item;
        /**
         * Unselected item.
         */
        unselected?: Tree.Item;
    }
    class SelectableExtension extends Tree.Extension implements ISelectableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventDoubleClick;
        private _eventKeyDown;
        /**
         * Creates the selectable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor();
        /**
         * See interface.
         */
        getSelected(): Tree.Item;
        /**
         * See interface.
         */
        select(item: Tree.Item): void;
        /**
         * See interface.
         */
        unselect(): void;
        /**
         * See interface.
         */
        setInstance(instance: Tree.Widget): void;
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
        getOrder(): number;
        /**
         * See interface.
         */
        getDependencies(): Tree.PluginExtension[];
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        private _findSelectedItem(items);
        private _changeSelection(rawNode, evt);
    }
}
