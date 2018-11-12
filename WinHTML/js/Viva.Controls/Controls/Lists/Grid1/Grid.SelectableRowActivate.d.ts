import TemplateEngine = require("../../../Util/TemplateEngine");
import SelectableRowGrid = require("./Grid.SelectableRow");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface ISelectableRowActivateExtension {
        /**
         * Gets the activated rows metadata.
         *
         * @return Metadata of the rows that are activated.
         */
        getActivatedRows(): SelectableRowActivateMetadata[];
        /**
         * Deactivates all rows currently activated in the grid.
         */
        deactivateAllRows(): void;
        /**
         * Deactivates specified rows in the grid.
         *
         * @param items One or multiple data items.
         */
        deactivateRows(...items: Grid.Item[]): void;
        /**
         * Activates specified rows in the grid.
         *
         * @param columnKey Grid.Column that has been activated.
         * @param items One or multiple data items.
         */
        activateRows(columnKey: string, ...items: Grid.Item[]): void;
        /**
         * Gets the options of the plugin.
         */
        options: SelectableRowActivateOptions;
    }
    interface ActivatableColumn extends Grid.Column {
        /**
         * Indicates if the column is activatable.
         */
        activatable?: KnockoutObservableBase<boolean>;
    }
    interface SelectableRowActivateMetadata extends SelectableRowGrid.SelectableRowMetadata {
        /**
         * Indicates the columnKey if the row is activated. null if deactivated.
         */
        activated?: KnockoutObservableBase<string>;
        /**
         * Additional information for this Activated cell if any.
         */
        activatedInfo?: KnockoutObservableBase<string>;
        /**
         * private property to indicate the activate subscription is been eistablish between selected and activated.
         */
        _activatedSubscribed?: boolean;
    }
    interface SelectableRowActivateEventObject {
        /**
         * Activated row.
         */
        activated?: SelectableRowActivateMetadata;
    }
    interface SelectableRowActivateOptions extends SelectableRowGrid.SelectableRowOptions {
        /**
         * Currently Activated Grid.Column Key.
         */
        activatedColumnKey?: KnockoutObservableBase<string>;
        /**
         * Primary Activate Grid.Column Key.  This is to support double click, context menu and activateOnSelected.
         */
        primaryActivateColumnKey?: KnockoutObservableBase<string>;
        /**
         * Indicate row should activated when the row is selected.
         */
        activateOnSelected?: KnockoutObservableBase<boolean>;
    }
    class SelectableRowActivateExtension extends Grid.Extension implements ISelectableRowActivateExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventKeyPress;
        private _eventKeyPressCell;
        private _eventRowSelect;
        private _eventFocusHandler;
        private _eventBlurHandler;
        private _options;
        private _activatedColumnKey;
        private _activatedInfo;
        private _primaryActivateColumnKey;
        private _activateOnSelected;
        private _firstColumnKey;
        private _selectableRowExtension;
        private _preserveSelection;
        private _activatedRows;
        /**
         * Creates the activateable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: SelectableRowActivateOptions);
        /**
         * Gets the options of the plugin.
         */
        options: SelectableRowActivateOptions;
        /**
         * See interface.
         */
        getActivatedRows(): SelectableRowActivateMetadata[];
        /**
         * See interface.
         */
        deactivateAllRows(): void;
        /**
         * See interface.
         */
        deactivateRows(...items: Grid.Item[]): void;
        /**
         * See interface.
         */
        activateRows(columnKey?: string, ...items: Grid.Item[]): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        getDefaultRowMetadataProperties(): any;
        /**
         * See inteface.
         */
        getDefaultColumnProperties(): any;
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
         * See parent.
         */
        shouldNotChangeSelection(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
        private _changeActivation(item, evt);
        private _handleActivationKeyPressOrClick(evt, elem);
        private _onRowSelect(evt, selectableRowEventObject);
    }
}
