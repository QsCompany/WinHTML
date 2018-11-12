import TemplateEngine = require("../../../Util/TemplateEngine");
import FocusableList = require("./List.Focusable");
import List = require("./List");
export = Main;
declare module Main {
    enum SelectionMode {
        /**
         * Indicates that the user can select one item at at time by clicking.
         */
        Single = 0,
        /**
         * Indicates that the user can select and unselect multiple items at at time by clicking and control-clicking.
         */
        Multiple = 1,
    }
    interface ISelectableExtension {
        /**
         * Gets the selected items.
         */
        getSelected(): List.Item[];
        /**
         * Unselects the supplied item.
         *
         * @param item List.Item to remove from selection.
         */
        unselect(itemView: List.ItemView): void;
        /**
         * Selects specified item in the listView.
         *
         * @param item List.Item to select.
         * @param extend Extended or replace the current selection.
         * @param toggle Unselect if already selected.
         */
        select(itemView: List.ItemView, extend?: boolean, toggle?: boolean): void;
    }
    interface SelectableItemMetadata extends FocusableList.FocusableItemMetadata {
        /**
         * Indicates if the item is selected.
         */
        selected?: KnockoutObservableBase<boolean>;
    }
    interface SelectableEventObject {
        /**
         * Selected items.
         */
        selected: List.Item[];
        /**
         * Unselected items.
         */
        unselected: List.Item[];
    }
    interface SelectableOptions {
        /**
         * Indicates selection mode or single or multiple selection.
         */
        selectionMode: SelectionMode;
        /**
         * Gets or sets the selected items.
         */
        selectedItems: KnockoutObservableArray<List.Item>;
        /**
         * The selected overlay template.
         */
        selectedOverlayTemplate?: string;
    }
    class SelectableExtension extends List.Extension implements ISelectableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventDoubleClick;
        private _eventKeyDown;
        private _options;
        private _disposables;
        /**
         * Creates the ListView selectable item extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: SelectableOptions);
        /**
         * Gets the options of the plugin.
         */
        options: SelectableOptions;
        /**
         * See interface.
         */
        getSelected(): List.Item[];
        /**
         * See interface.
         */
        select(itemView: List.ItemView, extend?: boolean, toggle?: boolean): void;
        /**
         * See interface.
         */
        unselect(itemView: List.ItemView): void;
        /**
         * See interface.
         */
        setInstance(instance: List.Widget): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        initializeItemView(itemView: List.ItemView): void;
        /**
         * See interface.
         */
        removeItemView(itemView: List.ItemView): void;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * See interface.
         */
        getDependencies(): List.PluginExtension[];
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * Changes the selection to the specified element item.
         *
         * @param rawItem The html element of the item to select.
         * @param evt The event triggering the change of selection.
         * @param extend Indicates if the existing selection should be extended or replaced.
         */
        private _changeSelection(rawItem, evt, extend);
        /**
         * Retrieves the default options for the control extension.
         *
         * @return The extension options.
         */
        private _getDefaultOptions();
        /**
         * Updates the selection to the desired item.
         *
         * @param listItem The ListItem to select.
         * @param extend Indicates if the existing selection should be extended or replaced.
         * @param toggle Indicates if the item is already selected should it be unselected or not.
         * @return The changes to the selection.
         */
        private _select(itemView, extend?, toggle?);
    }
}
