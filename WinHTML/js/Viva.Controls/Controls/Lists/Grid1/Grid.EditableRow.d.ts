import TemplateEngine = require("../../../Util/TemplateEngine");
import FocusableRowGrid = require("./Grid.FocusableRow");
import Grid = require("./Grid");
export = Main;
declare module Main {
    enum EditableRowState {
        /**
         * Commited state, default state when nothing has been done on a row.
         * It is also used if the row is not yet added (empty textboxes for instance).
         */
        None = 0,
        /**
         * New state, the row has been added.
         */
        Created = 1,
        /**
         * Updated state, the row has been updated.
         */
        Updated = 2,
        /**
         * Deleted state, the row is being deleted.
         */
        Deleted = 3,
    }
    enum ValidationRowResult {
        /**
         * The row has no error. This is the default result.
         */
        None = 0,
        /**
         * The row has been validated and is correct.
         */
        Success = 1,
        /**
         * The row has been validated and includes errors.
         */
        Error = 2,
    }
    enum EditableRowPlacement {
        /**
         * Put the editable row at the bottom of the grid.
         */
        Bottom = 0,
        /**
         * Put the editable row at the top of the grid.
         */
        Top = 1,
    }
    interface IEditableRowExtension {
        /**
         * Gets the options of the plugin.
         */
        options: EditableRowOptions;
        /**
         * Gets the created items.
         */
        createdItems: KnockoutObservableArray<Grid.Item>;
    }
    interface EditableCellFormatterSettings extends Grid.BaseCellFormatterSettings {
    }
    interface EditableCellFormatter extends Grid.BaseFormatter {
        (value: any, settings?: EditableCellFormatterSettings): string;
    }
    interface EditableRowFormatterSettings {
        rowMetadata: EditableRowMetadata;
    }
    interface EditableRowFormatter {
        (settings?: EditableRowFormatterSettings): string;
    }
    interface EditableRowColumn extends Grid.Column {
        /**
         * Formatter used when displaying one editable cell.
         */
        editableFormatter?: EditableCellFormatter;
    }
    interface EditableRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
        /**
         * Current state of a row.
         */
        editState: KnockoutObservableBase<EditableRowState>;
        /**
         * Indicate if the row is being edited.
         */
        editing: KnockoutObservableBase<boolean>;
        /**
         * Validation result of a row.
         */
        validationResult: KnockoutObservableBase<ValidationRowResult>;
    }
    interface EditableRowEventObject {
        /**
         * Editable Row targets.(Each cells' content)
         */
        targets: JQuery;
        /**
         * Editable Row.
         */
        editableRow: EditableRow;
        /**
         * Type of row event that happened.
         */
        type?: string;
    }
    interface EditableRowAddEventObject extends EditableRowEventObject {
        /**
         * By default, it will exit Editing state.
         * This override default behavior.
         */
        preventExitEditing: () => void;
    }
    interface EditableRowOptions {
        /**
         * Indicates if the editable row is at the top or bottom.
         * Defaults to Bottom.
         */
        placement?: EditableRowPlacement;
        /**
         * Indicates the formatter to use for the complete row.
         * You cannot use an editableFormatter per column if you use this property.
         * Default to null.
         */
        editableFormatter?: EditableRowFormatter;
        /**
         * Listens to keydown and change events on common input objects in order to specify the current row is being
         * modified. If this property is off, you would need to call the method setCurrentlyModified.
         * Defaults to false.
         */
        automaticRowChangeEventListener?: boolean;
        /**
         * If set to true, clicking on an existing row will go in edit mode.
         * Defaults to false.
         */
        allowEditExistingItems?: boolean;
        /**
         * If set to true, clicking on a newly created row will go in edit mode.
         * Defaults to false.
         */
        allowEditCreatedItems?: boolean;
    }
    interface EditableRow {
        /**
         * Row Metadata.
         */
        rowMetadata: EditableRowMetadata;
        /**
         * Convenience property that tells you if the item belongs to the createdItems or items.
         */
        existingItem: boolean;
        /**
         * Convenience Name/Value pair of all input/select/textarea fetched on the row.
         */
        data: {
            name: string;
            value: string;
        }[];
    }
    class EditableRowExtension extends Grid.Extension implements IEditableRowExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventFocusOutHandler;
        private _eventClickHandler;
        private _automaticEventHandler;
        private _options;
        private _editablePerColumn;
        private _createdItems;
        private _orderedCreatedItems;
        /**
         * Creates the Add Remove Row row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: EditableRowOptions);
        /**
         * See interface.
         */
        options: EditableRowOptions;
        /**
         * See interface.
         */
        createdItems: KnockoutObservableArray<Grid.Item>;
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
         * See interface.
         */
        shouldRetainRowMetadata(rowMetadata: Grid.RowMetadata): boolean;
        /**
         * See parent.
         */
        getName(): string;
        private _isRowValid(row);
        private _isValidationInProgress(row);
        private _isRowValidAsync(row, defer);
        private _isRowValidAsyncWraper(row);
        private _isItemModified(editableRow);
        private _rowAdd(row);
        private _rowEdit(row, type);
        private _getEditableRow(row);
        private _editableRowFormat(rowMetadata);
        private _editableCellFormat(rowMetadata, columnDefinition);
        private _isRowEdited(data);
        private _isRowDeleted(data);
    }
}
