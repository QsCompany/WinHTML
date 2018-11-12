import TemplateEngine = require("../../../Util/TemplateEngine");
import ExtensibleControl = require("../../Base/ExtensibleControl");
import Base = require("../../Base/Base");
export = Main;
declare module Main {
    interface InternalControlKnockoutBindingHandler extends KnockoutBindingHandler {
        /**
         * Registers a callback, then return a Guid associated with it.
         *
         * @param callback Callback that returns HtmlBindingData.
         * @return A Guid.
         */
        registerCallback(callback: () => HtmlBindingsData): string;
        /**
         * Unregisters the Guid from the memory.
         *
         * @param guid The Guid.
         */
        unregisterGuid(guid: string): void;
    }
    interface HtmlBindingsData {
        /**
         * template for the current html binding.
         */
        template: string;
        /**
         * data contain the viewModel of the binding.
         */
        data: any;
        /**
         * Disposable array that need to clean up after the binding widget is done
         */
        disposables: KnockoutDisposable[];
    }
    interface HtmlBindingGetViewModelCallBack {
        (templateDisposables: KnockoutDisposable[], value: any, settings?: CellFormatterSettings): any;
    }
    interface TextAndPath {
        /**
         * Value representing the text.
         */
        text: string;
        /**
         * Value representing the URI.
         */
        uri: string;
    }
    interface UriObject extends TextAndPath {
        /**
         * Value representing the target attribute.
         */
        target?: string;
    }
    interface IconObject extends TextAndPath {
    }
    interface ExtendedCellFormatter extends CellFormatter {
        /**
         * Cell formatter used for sorting.
         */
        sortFormatter?: CellFormatter;
        /**
         * Cell formatter used for filtering.
         */
        filterFormatter?: CellFormatter;
    }
    enum SortOrder {
        /**
         * Unsorted.
         */
        Unsorted = 0,
        /**
         * Ascending.
         */
        Ascending = 1,
        /**
         * Descending.
         */
        Descending = 2,
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    /**
     * Item represents a row.
     */
    interface Item {
    }
    /**
     * Item represents a row. Used internally to access the itemKey.
     */
    interface GenericItem extends Item {
        /**
         * An item value is accessible by a sring key accessor.
         */
        [key: string]: any;
    }
    interface BaseCellFormatterSettings {
        /**
         * The item representing the data for the specific column.
         */
        item: any;
        /**
         * The row metadata associated with the current data.
         */
        rowMetadata: RowMetadata;
        /**
         * The column object associated with the current data.
         */
        column: Column;
    }
    interface CellFormatterSettings extends BaseCellFormatterSettings {
        /**
         * The current row number associated with the current data.
         */
        rowNumber: () => number;
        /**
         * The current column number associated with the current data.
         */
        columnNumber: () => number;
    }
    interface StylableCellFormatterSettings extends CellFormatterSettings {
        /**
         * A CSS class to apply to the elements in the formatter.
         */
        cssClass: string;
    }
    interface BaseFormatter {
        (value: any): string;
    }
    interface CellFormatter extends BaseFormatter {
        /**
         * Cell formatter function called when a row is being rendered.
         */
        (value: any, settings?: CellFormatterSettings): string;
    }
    interface PluginExtension extends ExtensibleControl.PluginExtension {
        /**
         * Callback: before attaching events.
         */
        beforeAttachEvents?(): void;
        /**
         * Callback: after attaching events.
         */
        afterAttachEvents?(): void;
        /**
         * Callback: before detaching events.
         */
        beforeDetachEvents?(): void;
        /**
         * Callback: after detaching events.
         */
        afterDetachEvents?(): void;
        /**
         * Callback: before templates are set.
         *
         * @param templateEngine Template engine used to store the templates.
         */
        beforeSetTemplates?(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * Callback: after templates are set.
         *
         * @param templateEngine Template engine used to store the templates.
         */
        afterSetTemplates?(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * Gets the default column properties.
         *
         * @return Other properties to make available to the column object.
         */
        getDefaultColumnProperties?(): any;
        /**
         * Gets the default row metadata properties.
         *
         * @return Other properties to make available to the row metadata object.
         */
        getDefaultRowMetadataProperties?(): any;
        /**
         * Indicates if the row metadata should be retained when the core grid is ready to delete it.
         * A plugin indicating the row metadata should not be retained does not guarantee that it will be deleted.
         * Another plugin might have decided to retain it.
         * If a plugin decides to retain the metadata, subsequent plugins might not receive a call
         * for that particular row metadata.
         *
         * @param rowMetadata The row metadata that is about to get deleted.
         * @return True if the row metadata should be retained. False may delete it.
         */
        shouldRetainRowMetadata?(rowMetadata: RowMetadata): boolean;
        /**
         * Method called to allow the extension to prevent the selection code to happen.
         * By returning true to this method call, the selection of a current row would not change.
         *
         * @param item Item changing its selection.
         * @param evt Event raised by the item.
         * @return True to not run the selection code.
         */
        shouldNotChangeSelection?(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
        /**
         * Returns the number of extra columns added by the extension. This is necessary for the base grid
         * to know the total number of columns present in the grid.
         *
         * @return The number of additional columns added by the extension.
         */
        getAdditionalColumns?(): number;
    }
    class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
    }
    interface Column {
        /**
         * Name of the column displayed in the header.
         */
        name?: KnockoutObservable<string>;
        /**
         * String mapping to the item key.
         */
        itemKey: string;
        /**
         * Formatter used when displaying one cell.
         */
        formatter?: CellFormatter;
        /**
         * Formatter used when sorting the items.
         */
        sortFormatter?: CellFormatter;
        /**
         * Formatter used when filtering the items.
         */
        filterFormatter?: CellFormatter;
        /**
         * Css class associated with the column.
         */
        cssClass?: string;
        /**
         * Width of the column in pixels or percentage.
         */
        width?: KnockoutObservable<string>;
        /**
         * Enable cell text ellipse
         */
        enableEllipse?: KnockoutObservableBase<boolean>;
        /**
         * Enable cell content to height 100%
         */
        fullHeight?: KnockoutObservableBase<boolean>;
        /**
         * Unique column id.
         */
        columnId?: string;
    }
    interface RowMetadata {
        /**
         * One entry representing the item.
         */
        item: Item;
        /**
         * Css class associated with the row.
         */
        cssClass?: KnockoutObservable<string>;
    }
    class ViewModel extends ExtensibleControl.ViewModel {
        /**
         * Summary of the table.
         */
        summary: KnockoutObservable<string>;
        /**
         * Shows the column header.
         */
        showHeader: boolean;
        /**
         * Column definitions.
         */
        columns: KnockoutObservableArray<Column>;
        /**
         * Items displayed in the table based on the column definitions.
         */
        items: KnockoutObservableArray<Item>;
        /**
         * No rows message when no items are displayed.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * Row metadata used for the items.
         */
        rowMetadata: RowMetadata[];
        /**
         * Important events which the viewModel might want to react.
         */
        events: (type: string, args?: any) => void;
        /**
         * Resource URIs.
         */
        uri: StringMap<string>;
        /**
         * Resource Texts.
         */
        text: StringMap<string>;
    }
    class Widget extends ExtensibleControl.Widget implements Interface {
        private _allRowMetadata;
        private _templateEngine;
        private _mouseEnterTooltipHandler;
        private _allRowMetadataInitialized;
        private _columnCount;
        /**
         * Creates the widget.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * Gets the row metadata based on a data item.
         *
         * @param item Data item associated with the row metadata.
         * @return One row metadata.
         */
        getRowMetadata(item: Item): RowMetadata;
        _getAllRowMetadata(): RowMetadata[];
        /**
         * See parent.
         */
        _initializePlugins(viewModel: ViewModel): void;
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        private _attachEvents();
        private _detachEvents();
        private _getNewRowMetadataEntries();
        private _getNewColumnEntries();
        private _normalizeColumns(columns);
        private _getTotalColumns();
        private _cellFormat(rowNumber, columnNumber, rowMetadata, columnDefinition);
        private _setTemplates();
        private _updateAllRowMetadata();
    }
}
