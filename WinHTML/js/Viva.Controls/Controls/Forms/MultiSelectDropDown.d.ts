import SelectableRowGrid = require("../Lists/Grid1/Grid.SelectableRow");
import Grid = require("../Lists/Grid1/Grid");
import ComboDropBase = require("./ComboDropBase");
import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
import GroupDropDown = require("./GroupDropDown");
export = Main;
declare module Main {
    /**
     * Drop adapter using Grid
     */
    class DropAdapter extends ComboDropBase.DropAdapter<Grid.Widget, string> {
        /**
         * Helper function to get the Element that we want to style min-width.
         */
        getInnerElement(fixture: JQuery): JQuery;
        /**
         * See parent. MultiSelect box doesn't allow typing.
         */
        allowsTyping(): boolean;
        /**
         * See parent.  Not Yet implement.
         */
        enterKey(evt: JQueryEventObject): boolean;
        /**
         * See parent. Not Yet implement.
         */
        downKey(evt: JQueryEventObject): boolean;
        /**
         * See parent. Not Yet implement.
         */
        upKey(evt: JQueryEventObject): boolean;
        /**
         * See parent. Not Yet implement.
         */
        leftKey(evt: JQueryEventObject): boolean;
        /**
         * See parent. Not Yet implement.
         */
        rightKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        _createWidget(combo: Interface, fixture: JQuery): Grid.Widget;
    }
    interface Interface extends ComboDropBase.Interface<any> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ItemsData {
        /**
         * Data displayed in the table based on the column definitions.
         */
        items: KnockoutObservableArray<Grid.Item>;
        /**
         * Row metadata used for the data.
         */
        rowMetadata: KnockoutObservableArray<DropDownItemMetadata>;
        /**
         * Column definitions.
         */
        displayColumns: KnockoutObservableArray<Grid.Column>;
        /**
         * Property used for Value of an item. If it is not set, it uses items[index] as Value.
         */
        valueKey: string;
    }
    interface MaxSelectedEventObject {
        /**
         * Selected item count.
         */
        selected?: DropDownItemMetadata[];
        /**
         * prior Selected item count
         */
        originalSelectedCount?: number;
    }
    interface DropDownItemMetadata extends SelectableRowGrid.SelectableRowMetadata {
    }
    class ItemSetting extends GroupDropDown.ItemSetting {
        /**
         * Formatter used when displaying one cell.
         */
        formatter: Grid.CellFormatter;
        /**
         * Creates a new instance of the ItemSetting.
         *
         * @param setting Properties used for setup dropdownItems.
         */
        constructor(settings?: Object);
        /**
         * Creates a new instance of the ItemSetting.
         *
         * @param textKey Property used for display dropdownItem. If not provided, the items[index] will be used.
         * @param itemValue Property used for display dropdownItem. If not provided, the items[index] will be used.
         * @param disabledKey Property used for display dropdownItem. If not provided, default is false.
         * @param groupIdKey Property used for display dropdownItem. If not provided, default is non-grouping.
         * @param selectedKey Property used for display dropdownItem. If not provided, default is not selected (false).
         * @param cellFormater Property used for display dropdownItem. If not provided, default is FormattersGrid.text.
         */
        constructor(textKey?: string, itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string, cellFormatter?: Grid.CellFormatter);
    }
    class ViewModel extends ValidatableControl.ViewModel<string> {
        /**
         * Turns on or off multiselect.
         */
        multiselect: KnockoutObservable<boolean>;
        /**
         * Show DropDown Grid header on or off.
         */
        showHeader: KnockoutObservable<boolean>;
        /**
         * Accessable name for the dropdown popup.
         */
        dropdownPopupName: KnockoutObservable<string>;
        /**
         * Array of objects represent the groupDropDown menus.
         */
        itemsData: ItemsData;
        /**
         * Indicate value/selection is initialized.
         * If false, it will initialize the value from Items.selected states.
         * If true, it will honor value and make sure the Items.selected states match current value.
         */
        valueInitialized: boolean;
        /**
         * The total select Rows ocunt currently in the drop down.
         */
        selectedRowsCount: KnockoutObservable<number>;
        /**
         * The displayString
         */
        selectedDisplayString: KnockoutObservable<string>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Flag to allow max is reached, the control will disable all the unselected item and remember which item it disabled.
         * If true, when the selectedRowsCount() >= maxSelectAllowed, widget will remember which items that are disabled by widget.
         * Such that when later on, selectedRowsCount() < maxSelectAllowed, widget will enable those items it previoius disabled.
         * If false, when the selectedRowsCount() > maxSelectAllowed,  widget will not track which item it disabled, it will disable all items that are unselected.
         * when later on, selectedRowsCount() < maxSelectAllowed, widget will enable All item that are unselected
         */
        trackMaxSelectDisabledItems: boolean;
        /**
         * Flag to allow  max is reached, the control will disable all the unselected items.
         * If true, when the selectedRowsCount() >= maxSelectAllowed, disable unselected bse on this.trackMaxSelectDisabledItems settings.
         * Such that when later on, selectedRowsCount() < maxSelectAllowed, widget will enable those items are previously disabled.
         */
        disableItemsWhenMaxReached: boolean;
        /**
         * Value Separator for combining the selected item into a <input> value. For example, "val1;val2;val5".
         * We use standard javascript split function.  Can be a string.
         * By default, we use String.fromCharCode(0x1d). 0x1d is the <GS>, group separator, in ascii code which is not visible in the text box.
         * If you need to see this in the display text, change it to different character, or string.
         */
        valueSeparator: string;
        /**
         * Display Separator for combining the selected item into a displayable string. For example, "display1;display2;display3".
         * We use standard javascript split function.  Can be a string.
         * By default, we use ";" -- since this need to be visible.
         */
        displaySeparator: string;
        /**
         * Important events which the viewModel might want to react.
         * Currently it fire 3 type of events, "select", "offMaxSelected",and "onMaxSelected".
         *
         * @param type Type of the event. For example, "select", "offMaxSelected", or "onMaxSelected".
         * @param args optional arguments.
         *       "select" with args type of Viva.Controls.Lists.Grid.SelectableRowEventObject.
         *       "offMaxSelected"/"onMaxSelected" with args type of Viva.Controls.MultiSelectDropDown.MaxSelectedEventObject.
         */
        events: (type: string, args?: any) => void;
        /**
         * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
         *
         * @param dataArray Array of objects represent the groupDropDown menus.
         * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupid.
         * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
         * @return ItemsData[] for the ko binding for the dropdown items.
         */
        static createDropdownItemsFromArray(data: any[], itemSetting?: ItemSetting, groupInfos?: Object): ItemsData;
        /**
         * Helper for the user to ensure the InputValue in-sync with the value property.
         *
         * @param ItemsData Data for the drop down items setting.
         */
        initializeItemsData(itemsData: ItemsData): void;
        /**
         * Returns the current selected DropDownItemMetadata[].
         *
         * @return Array of DropDownItemMetatata.
         */
        getSelectedRows(): DropDownItemMetadata[];
        /**
         * Converts the selectedRow Metadata into the input value. Used by widget.
         *
         * @param selectedRows The current selectedRows.
         * @return String for current selected items value, for example "val1;val2;val3".
         */
        convertToInputValue(selectedRows: DropDownItemMetadata[]): string;
        /**
         * Converts the selectedRow Metadata into the display string.
         *
         * @param selectedRows The current selectedRows.
         * @return string of current selected items label, for example "display1;display;display3".
         */
        convertToDisplayString(selectedRows: DropDownItemMetadata[]): string;
        /**
         * Sets the input value base on the currented selected row.  It keep in sync with the SelectedRowsCount and value.
         *
         * @param selectedRows The current selectedRows.
         * @return Whether value is updated.
         */
        setInputValue(selectedRows: DropDownItemMetadata[]): boolean;
        /**
         * Compares if newValue is the same as initialValue.
         * In this Widget, it basically compares to array which parse by the separator.
         *
         * @param a Value 1.
         * @param b Value 2.
         * @return True if both values are the same.
         */
        _isSameValue(a: string, b: string): boolean;
        /**
         * Converts the value string (val1;val2;val3) into a array base on this.valueSeparator.  In addition, it also remove the empty strings.
         *
         * @param value The value of currently multiselected value, for example, "val1;val2;;val5";
         * @return array of the string values for example, ["val1", "val2", "val5"].
         * Note, the empty strings will be removed.
         */
        private _convertInputValueToArray(value);
        /**
         * Helps to keep the DropDowmItem selected metadata synchronized with the  value string (val1;val2;val3).
         */
        private _initializedSelectedRowsValue();
        private static _convertSelectedRowsToString(selectedRows, keyValue, stringSeparator);
    }
    class Widget extends ValidatableControl.Widget<any> implements Interface {
        private _currentText;
        private _id;
        private _name;
        private _arrowClass;
        private _select;
        private _input;
        private _current;
        private _popup;
        private _multiSelect;
        private _scrollableParents;
        private _preventCreateDropDown;
        private _dropAdapter;
        private _blurPrevented;
        private _blurPreventHandle;
        private _blurHidePopupHandle;
        private _formattedValue;
        private _maxSelectDisabled;
        private _preventValueUpdate;
        private _firstColumn;
        private _originalFirstColumnFormatter;
        private _prevItemData;
        private _multiSelectFormatter;
        private _timeoutHidePopUp;
        private _timeoutPreventBlur;
        private _dropInputClickHandler;
        private _dropPopupMouseDownHandler;
        private _dropPopupFocusInHandler;
        private _inputKeyDownHandler;
        private _inputBlurHandler;
        private _parentScrollHandler;
        private _rowSelectChangedNotify;
        private _rowSelectHandler;
        private _selectedDisposeables;
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
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * Restores the focus on the input element to handle key events.
         */
        restoreFocus(): void;
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        _beforePopupWidgetCreated(): void;
        private _resetSelectedDisposables();
        private _updateFirstColumnFormatter();
        private _toggleSelectionChangeTrigger();
        private _monitorRowMetadataChange(triggerChange?);
        private _initializeComputeds();
        private _setNormalArrow();
        private _setHoverArrow();
        private _computeCurrentMultiItemsText();
        private _computeCurrentSingleItemText();
        private _updateCurrentText();
        private _maxSelectAllowedChanged(maxSelectAllowed);
        /**
         * Handles viewmodel multiselect property changed.
         *
         * @param isMultiSelect True if options.multiselect() is true.
         */
        private _multiselectChanged(isMultiSelect);
        private _setDisplayFormatter(isMultiSelect);
        private _setInputValue(selectedRows);
        private _selectedValueChanged(value);
        /**
         * Overriden by EditableCombo derivatives to create specific DropAdapter.
         *
         * @return The newly created DropAdapter.
         */
        private _createDropAdapter();
        private _createDropPopup();
        /**
         * Repositions the popup if it doesn't have enough space to be shown.
         *
         * @param popup The popup to reposition.
         */
        private _positionPopup(popup);
        /**
         * Shows the drop popup. If already visible, hides it first.
         */
        private _showDropPopup();
        /**
         * Hides the drop popup.
         */
        private _hideDropPopup();
        /**
         * This notifies blur event not to Hides drop popup because
         * something in the drop area is clicked. For these scenarios,
         * drop popup still needs to be visible.
         *
         * @param func Function to execute after setting this.blurPrevented.
         */
        private _preventBlur(func?);
        /**
         * Toggles the drop popup of the combo.
         */
        private _toggleDropPopup();
        private _cancelPreventingBlur();
        /**
         * Clears the prevent blur timeout.
         */
        private _removePreventingBlurTimer();
        /**
         * Clears the hidePopup timeout.
         */
        private _removeHidePopupTimer();
        /**
         * Attaches event handlers.
         */
        private _attachEvents();
        /**
         * Detaches event handlers.
         */
        private _detachEvents();
        private _onKeyDown(evt);
        private _maxSelected(selectedItems, originalCount);
        private _rowSelectChanged();
        private _updateSelectedState(value, hidePopup?);
    }
}
