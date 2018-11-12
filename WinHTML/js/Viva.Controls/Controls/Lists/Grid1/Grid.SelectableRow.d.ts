import FocusableRowGrid = require("./Grid.FocusableRow");
import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface ISelectableRowExtension {
        /**
         * Gets the selected rows metadata.
         *
         * @return Metadata of the rows that are selected.
         */
        getSelectedRows(): SelectableRowMetadata[];
        /**
         * Unselects all rows currently selected in the grid.
         */
        unselectAllRows(): void;
        /**
         * Unselects specified rows in the grid.
         *
         * @param items One or multiple data items.
         */
        unselectRows(...items: Grid.Item[]): void;
        /**
         * Selects specified rows in the grid.
         *
         * @param items One or multiple data items.
         */
        selectRows(...items: Grid.Item[]): void;
        /**
         * Gets the options of the plugin.
         */
        options: SelectableRowOptions;
    }
    interface SelectableRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
        /**
         * Indicates if the row is selected.
         */
        selected?: KnockoutObservableBase<boolean>;
    }
    interface SelectableRowEventObject {
        /**
         * Selected row.
         */
        selected?: SelectableRowMetadata;
        /**
         * Unselected row.
         */
        unselected?: SelectableRowMetadata[];
    }
    enum RowSelectionMode {
        /**
         * The grid does not support selection of rows.
         */
        Off = 0,
        /**
         * At most one row in the grid can be selected at a time.
         */
        Single = 1,
        /**
         * By default, multiple items can be in the selected state.
         * Clicking on an unselected item will add it to the list of selected items.
         * Clicking on a selected item will remove it from the list of selected items.
         */
        MultipleAdd = 2,
        /**
         * When Ctrl or Shift is not used,
         * Clicking on an unselected item will remove the selection of existing items and select the new one.
         * The Ctrl or Shift keys can be used to preserve existing selections.
         * This behavior is a close approximation to Windows Explorer.
         */
        MultipleReplace = 3,
        /**
         * One row in the grid can be selected at a time. If no selection provided, the first item will be selected.
         */
        AlwaysSingle = 4,
    }
    interface SelectableRowOptions {
        /**
         * Indicates default MultiselectMode.
         */
        mode?: KnockoutObservable<RowSelectionMode>;
        /**
         * Specifies an overlay image to be placed over the end of the row.
         * The formatter is provided the value of the row selection true/false and no settings.
         */
        overlayFormatter?: Grid.CellFormatter;
        /**
         * Disable require Ctrl or Shift Key for Single Mode mode to toggle selection on Click.
         */
        disableRequireSingleModeAssistKey?: KnockoutObservable<boolean>;
    }
    class SelectableRowExtension extends Grid.Extension implements ISelectableRowExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventKeyDown;
        private _options;
        private _multiselect;
        /**
         * Creates the selectable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: SelectableRowOptions);
        /**
         * Gets the options of the plugin.
         */
        options: SelectableRowOptions;
        /**
         * See interface.
         */
        getSelectedRows(): SelectableRowMetadata[];
        /**
         * See interface.
         */
        unselectAllRows(): void;
        /**
         * See interface.
         */
        unselectRows(...items: Grid.Item[]): void;
        /**
         * See interface.
         */
        selectRows(...items: Grid.Item[]): void;
        /**
         * See interface.
         */
        setInstance(instance: Grid.Widget): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        getDefaultRowMetadataProperties(): any;
        /**
         * See interface.
         */
        private _changeSelection(item, evt);
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
        getDependencies(): Grid.PluginExtension[];
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
        getAdditionalColumns(): number;
        private _overlayFormat(rowMetadata);
    }
}
