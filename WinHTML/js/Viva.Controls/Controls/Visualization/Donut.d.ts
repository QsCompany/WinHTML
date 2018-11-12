import MultiSelectDropDown = require("../Forms/MultiSelectDropDown");
import QuotaGauge = require("./QuotaGauge");
import Grid = require("../Lists/Grid1/Grid");
import CompositeControl = require("../Base/CompositeControl");
import Gauge = require("./Gauge");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface ItemsData extends MultiSelectDropDown.ItemsData {
        /**
         * The current Index (rowId) which is being hovered.
         */
        hoveredIndex?: KnockoutObservableBase<string>;
    }
    interface ItemMetadata extends MultiSelectDropDown.DropDownItemMetadata {
        /**
         * Row ID (number) unique identifier of the data.
         * By default, if itemSettings.rowIdKey is not provided this will be the item's index.
         */
        rowId?: KnockoutObservableBase<string>;
        /**
         * Label: When hovered, if provided, the default hover format will be used in the caption.
         * By default, if itemSettings.rowIdKey is not provided this will be the item's index.
         */
        label?: KnockoutObservableBase<string>;
    }
    interface Item extends Grid.Item {
    }
    interface ThresholdData extends Gauge.ThresholdData {
        /**
         * Item data provided by user.
         */
        item: Item;
        /**
         * Metadata corresponding to this item data point.
         */
        rowMetadata: ItemMetadata;
        /**
         * Element that the current threshold maps to. Initial value is null until the widget is created, this will be populated with the matching svg path element.
         */
        element: Element;
        /**
         * HoveredInfo to show for this slice caption.  This value will show up when a slice is show up but no selection available.
         * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
         */
        hoveredInfo?: string;
        /**
         * HoveredInfo to show for this slice caption when there are selected sliced.
         * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
         */
        selectedHoveredInfo?: string;
        /**
         * percentage is the NiceFixed Formated to be show with the percentage.
         * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
         */
        percentage?: string;
        /**
         * itemValueString is the nice fixed (1 digit) Formated item value to be show.
         * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
         */
        itemValueString?: string;
    }
    class Events {
        /**
         * Click on a donut slice.
         *
         * @param data The threshold data of the slice which is been click on.
         * @param element The svg path element of the slice which is been click on.
         * @param evt JQueryEventObject for this event.
         */
        sliceClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseEnter on a donut slice.
         *
         * @param data The threshold data of the slice which mouse entering.
         * @param element The svg path element of the slice which mouse entering.
         * @param evt JQueryEventObject for this event.
         */
        sliceMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseLeave on a donut slice.
         *
         * @param data The threshold data of the slice which mouse leaving.
         * @param element The svg path element of the slice which mouse leaving.
         * @param evt JQueryEventObject for this event.
         */
        sliceMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
    }
    class ItemSettings extends MultiSelectDropDown.ItemSetting {
        /**
         * Data key used to identify the color. This is optional, if not provided, it will use the default color wheel.
         */
        colorKey: string;
        /**
         * Data key used to identify the row. Data has to be a number, we use it on the object map to quickly identify the item's element.
         */
        rowIdKey: string;
        /**
         * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
         */
        labelKey: string;
        /**
         * RowId of current hovered slice in donut.
         */
        hoveredIndex: KnockoutObservable<string>;
        /**
         * Creates a new instance of the ItemSetting.
         *
         * @param setting Properties used for setup dropdownItems.
         */
        constructor(settings?: Object);
        /**
         * Creates a new instance of the ItemSetting.
         *
         * @param itemValue Property used for value of slice. Data have to be number.
         * @param disabledKey Property used for disable. If not provided, default is false.
         * @param groupIdKey Property used for groupbyId. If not provided, default is non-grouping.
         * @param selectedKey Property used for slice selection. If not provided, default is not selected (false).
         * @param colorKey Property used for slice color. Data have to be in string hex color format. For example, #0072c6.
         * @param rowId Property used for as Id. Data have to be in number uniquely identify the row.
         * @param label Property used for as center text for the short symbol.  Should be less than 5 characters.
         */
        constructor(itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string, colorKey?: string, rowIdKey?: string, labelKey?: string);
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * Center Single Setting icon/font size.
         */
        centerSize: KnockoutObservableBase<QuotaGauge.CenterSize>;
        /**
         * Ring Thickness for the Gauge.
         */
        ringThickness: KnockoutObservableBase<QuotaGauge.RingThickness>;
        /**
         * Show outer donut gauge.
         */
        showGauge: KnockoutObservableBase<boolean>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
        /**
         * The number represents the whole gauge value.
         */
        total: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * {0}: current value.
         * {1}: maximum value.
         */
        totalFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit in the center.
         * By default the format string is "".
         */
        unitFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center. (Caption)
         * This is used when there is no selected nor hover on the donut.
         */
        infoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center during the hover. (Caption)
         * This is used when hover on the text.
         * {0}: current label ("" if not available).
         * {1}: current value (or percentage).
         * {2}: current unit (or %).
         */
        hoverInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center when there is a selected and no hover. (Caption)
         * {0}: current selected total.
         * {1}: current total().
         * {2}: current unitFormat().
         */
        selectedInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit for Hovered/Selected.  If it is "%" or undefine, by default it shows percentange.
         */
        hoveredUnit: KnockoutObservableBase<string>;
        /**
         * Width of the Donut.
         */
        width: KnockoutObservableBase<number>;
        /**
         * Height of the Donut.
         */
        height: KnockoutObservableBase<number>;
        /**
         * Disable selected change on click.
         */
        disableSelectOnClick: KnockoutObservableBase<boolean>;
        /**
         * Array of objects represent the groupDropDown menus.
         */
        itemsData: KnockoutObservableBase<ItemsData>;
        /**
         * Default gradient color start index.
         */
        colorStart: KnockoutObservableBase<string>;
        /**
         * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
         *
         * @param data Array of objects represent the donut slice.
         * @param itemSettings The settings to provide which fields in the prior array object to provide text, value, disable, and groupId.
         * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
         * @return ItemsData[] for the ko binding for the dropdown items.
         */
        static createItemsFromArray(data: any[], itemSettings?: ItemSettings, groupInfos?: Object): ItemsData;
        /**
         * The required mimimum slice number value based on this.total().
         * If its slice is smaller than this number, the widget will throw during creation.
         * Note that this is required because the white line between the slice is bigger than the slice itself.
         *
         * @return The minimum slice number base on this.total().
         */
        getRequiredMinimumSlice(): number;
        /**
         * Events supported by the control.
         */
        events: Events;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _quotaGaugeWidget;
        private _quotaGaugeViewModel;
        private _usageGaugeViewModel;
        private _thresholds;
        private _thresholdsHoveringOut;
        private _thresholdsGroup;
        private _thresholdComputed;
        private _prevhoveredIndex;
        private _currentSelection;
        private _currentSelectedTotal;
        private _delayedThrottleMs;
        private _defaultColors;
        private _hoveredUnit;
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
        static getDefaultColors(startColorCode?: string): string[];
        /**
         * Helper to clean up the selected() -> thresholds mapping.
         */
        private _disposeThresholdComputed();
        /**
         * Helper to populate the _thresholdComputed & _thresholdsGroup.
         */
        private _populateThresholdComputed(showGauge?);
        /**
         * Helper to populate one _thresholdComputed & _thresholdsGroup.
         *
         * @param rowMetadata Metadata correspoding to these gaugeThresholds.
         * @param gaugeThresholds  thresholdData[] corresponding to this rowMetadata.  Typically it is 3 slice, start(white), row, stripe(white).
         * @return KnockoutComputed<void> to map rowMetadata.select() to change these 3 slice's aria-selected.
         */
        private _createComputedOnSelected(rowMetadata, gaugeThresholds);
        /**
         * Helper to manipulate the usageGaouge to our look and feels
         *
         * @param usageGaugeViewModel UsageGaugeViewModel that gauge used to change the look and feel and listen to the events.
         */
        private initializeUsageGaugeViewModel(usageGaugeViewModel);
        _createInnerViewModel(): QuotaGauge.ViewModel;
    }
}
