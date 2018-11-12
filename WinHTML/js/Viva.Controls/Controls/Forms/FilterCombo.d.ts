import EditableCombo = require("./EditableCombo");
import SelectableRowGrid = require("../Lists/Grid1/Grid.SelectableRow");
import FocusableRowGrid = require("../Lists/Grid1/Grid.FocusableRow");
import ScrollableGrid = require("../Lists/Grid1/Grid.Scrollable");
import Grid = require("../Lists/Grid1/Grid");
import Promise = require("../Base/Promise");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends EditableCombo.Interface<string> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends EditableCombo.ViewModel<string> {
        /**
         * Rows count.
         */
        rowsCount: KnockoutObservable<number>;
        /**
         * Column definitions.
         */
        columns: KnockoutObservableArray<Grid.Column>;
        /**
         * Default column width.
         */
        defaultColumnWidth: KnockoutObservable<string>;
        /**
         * Items displayed in the list.
         */
        items: KnockoutObservableArray<Grid.Item>;
        /**
         * Key used to get the display value.
         */
        valueKey: KnockoutObservable<string>;
        /**
         * Filter text.
         */
        filterText: KnockoutObservable<string>;
        /**
         * No rows message when no rows are displayed.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * Indicates if filtering is in progress now.
         */
        filterInProgress: KnockoutObservable<boolean>;
        /**
         * Creates a new instance of the FilterCombo view model.
         */
        constructor();
    }
    interface IScrollRowIntoViewExtension {
        /**
         * Scrolls the selected row into view.
         */
        scrollIntoView(row: JQuery): void;
    }
    class ScrollRowIntoViewExtension extends Grid.Extension implements IScrollRowIntoViewExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _afterCreateTimer;
        private _rowHeight;
        private _containerHeight;
        /**
         * Creates the scroll row into view extension.
         */
        constructor();
        /**
         * See parent.
         */
        getName(): string;
        /**
         * Scrolls the row into view.
         *
         * @param row The row.
         */
        scrollIntoView(row: JQuery): void;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        private _overflowExists(rowIndex);
    }
    class SelectableRowExtension extends SelectableRowGrid.SelectableRowExtension {
        /**
         * Creates the FilterCombo specific selectable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: SelectableRowGrid.SelectableRowOptions);
        /**
         * See parent.
         */
        selectRows(...items: Grid.Item[]): void;
        /**
         * See interface.
         */
        getDependencies(): Grid.PluginExtension[];
        /**
         * Gets the first selected row.
         *
         * @return The first selected row.
         */
        getSelectedRow(): JQuery;
    }
    class FocusableRowExtension extends FocusableRowGrid.FocusableRowExtension {
        private _focusFirstTimer;
        /**
         * Creates FilterCombo specific focusable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: FocusableRowGrid.FocusableRowOptions);
        /**
         * Focuses first available row in the grid.
         *
         * @param evt The JQueryEventObejct generated from the keydown event.
         */
        focusFirst(evt?: JQueryEventObject): void;
        /**
         * Focuses next available row in the grid.
         *
         * @param evt The JQueryEventObejct generated from the keydown event.
         * @param currentRow Current row, the row after which focus needs to be set to.
         */
        focusNext(evt: JQueryEventObject, currentRow: JQuery): void;
        /**
         * Focuses previous available row in the grid.
         *
         * @param evt The JQueryEventObject generated from the keydown event.
         * @param currentRow Current row, the row previous to which focus needs to be set to.
         */
        focusPrevious(evt: JQueryEventObject, currentRow: JQuery): void;
        /**
         * See parent.
         */
        getDependencies(): Grid.PluginExtension[];
        /**
         * Gets the focused rows.
         *
         * @return The focused rows.
         */
        getFocusedRows(): JQuery;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        _getRowFocusDataBindAttribute(): string;
        _focusElement(row: JQuery): void;
        _findNextFocusable(grid: JQuery, row: JQuery): JQuery;
        _findPreviousFocusable(grid: JQuery, row: JQuery): JQuery;
        private _focusOnGivenRow(row, evt?);
        private _getFirstRow();
        private _getReferenceRow(selectedRow);
    }
    class ScrollableExtension extends ScrollableGrid.ScrollableExtension {
        /**
         * Creates the FilterCombo specific scrollable extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: ScrollableGrid.ScrollableOptions);
        private _getScrollableOptions();
    }
    class ScrollableExtensionDataProvider implements ScrollableGrid.ScrollableDataProvider {
        totalItemCount: KnockoutObservable<number>;
        private _items;
        private _afterPopulate;
        /**
         * Creates the FilterCombo specific scrollable extension data provider.
         *
         * @param items List of items for scrollable.
         * @param afterPopulate Callback to run any post populate styling updates.
         */
        constructor(items: Grid.Item[], afterPopulate: () => void);
        /**
        * Fetches items as requested by the data provider.
        *
        * @param skip Count of items to skip.
        * @param take Count of items to take.
        */
        fetch(skip: number, take: number): Promise.PromiseV<Grid.Item[]>;
        private _getPagedItems(position, count);
    }
    /**
     * INTERNAL: Exported for unit tests.
     * Manages the items of FilterCombo by providing APIs like getting previous/next item,
     * finding closest match, finding item by value.
     */
    class ItemSource {
        /**
         * Sorted item list to ease navigation like going next and previous and finding a
         * value starting with a string.
         */
        sortedItems: KnockoutComputed<Grid.Item[]>;
        /**
         * Key used to obtain item value.
         */
        private _valueKey;
        private _isDataSorted;
        /**
         * Creates an instance of ItemSource.
         *
         * @param valueKey Key to obtain the display value from the Item.
         * @param items Initial set of items.
         * @param isDataSorted Flag based on which items are sorted or shown as is.
         */
        constructor(valueKey: KnockoutObservable<string>, items: KnockoutObservableArray<Grid.Item>, isDataSorted?: KnockoutObservable<boolean>);
        /**
         * Gets the key used to obtain the value of the item.
         *
         * @return Key used to obtain item value.
         */
        valueKey: KnockoutObservable<string>;
        /**
         * Cleans up registered computeds and subscriptions.
         */
        dispose(): void;
        /**
         * Finds the item starting with the specified string value.
         *
         * @param value Text to search in the items.
         * @return The matched item. If nothing matches, returns empty string.
         */
        findValueStartsWith(value: string): string;
        /**
         * Finds an item by the specified value.
         *
         * @param value Value used to find the item.
         * @return The item containing the specified value.
         */
        findItemByValue(value: string): Grid.Item;
        /**
         * Gets the value of the specified item.
         *
         * @param item Item used to get the value.
         * @return The value of the specified item.
         */
        getItemValue(item: Grid.Item): string;
        /**
         * Gets the next item of the specified item in the source.
         *
         * @param item Item used to get the next item.
         * @return The next item in the source.
         */
        getNextItem(item: Grid.Item): Grid.Item;
        /**
         * Gets the previous item of the specified item in the source.
         *
         * @param item Item used to get the previous item.
         * @return The previous item in the source.
         */
        getPreviousItem(item: Grid.Item): Grid.Item;
        /**
         * Gets the value of next item using the item containing the specified value.
         *
         * @param value Value used the find base item and then get the next item value.
         * @return The value of the next item.
         */
        getNextValue(value: string): string;
        /**
         * Gets the value of previous item using the item containing the specified value.
         *
         * @param value Value used the find base item and then get the previous item value.
         * @return The value of the previous item.
         */
        getPreviousValue(value: string): string;
        /**
         * Finds the index of the specified item.
         *
         * @param item The item to locate.
         * @return The index of the item.
         */
        findItemIndex(item: Grid.Item): number;
        private _getAdjacentValue(value, offset);
        private _getAdjacentItem(item, offset?);
        private _itemsEqual(a, b);
        private _compareItems(a, b);
        private _valueToItem(value);
        private _itemToValue(item);
    }
    class DropAdapter extends EditableCombo.DropAdapter<Grid.Widget, string> {
        private _itemSource;
        private _itemsSubscription;
        private _comboValueSubscription;
        private _comboFilterTextSubscription;
        private _selectRowsTimer;
        private _canShowPopupDisposable;
        constructor();
        /**
         * Gets the typed combo instance.
         */
        combo: Widget;
        hasItems: boolean;
        /**
         * See parent.
         */
        setCombo(combo: Widget): void;
        /**
         * See parent.
         */
        valuesChanged(): void;
        dropClick(evt: JQueryEventObject): void;
        keyUp(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        enterKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        tabKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        downKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        upKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        dispose(): void;
        _createWidget(combo: Interface, fixture: JQuery): Grid.Widget;
        private _selectRows();
        private _selectFocusedRow();
        private _tryGetSelectableRowExtension();
        private _tryGetFocusableRowExtension();
        private _tryGetScrollableExtension();
    }
    class Widget extends EditableCombo.Widget<string> implements Interface {
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        _createDropAdapter(): EditableCombo.DropAdapter<Grid.Widget, string>;
        _createDropPopup(): JQuery;
        /**
         * See parent.
         */
        _valueChanged(): void;
        _parseValue(value: string): string;
        _formatValue(value: string): string;
        _isSameValue(a: string, b: string): boolean;
    }
}
