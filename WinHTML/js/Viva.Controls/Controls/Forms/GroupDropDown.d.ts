import ItemList = require("../Base/ItemList");
import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    /**
     * GroupInfo is the ViewModel for a particular <optGroup>
     */
    class GroupInfo {
        /**
         * User friendly label for the grouping. It can be either string or ko.observable<string>.
         */
        text: any;
        /**
         * Disable state of this group. It can be either boolean or ko.observable<boolean>.
         */
        disable: any;
        /**
         * Creates a new instance of the GroupInfo.
         *
         * @param text Binding <optGroup> label attribute. It can be either string or ko.observable<string>
         * @param disabled Binding for <optGroup> disabled attribute. It can be either boolean or ko.observable<boolean>.
         */
        constructor(text?: string, disabled?: boolean);
        constructor(text?: string, disabled?: KnockoutObservableBase<boolean>);
        constructor(text?: KnockoutObservableBase<string>, disabled?: boolean);
        constructor(text?: KnockoutObservableBase<string>, disabled?: KnockoutObservableBase<boolean>);
    }
    /**
     * ItemSetting is the fields setting to inform the ViewModel.createItemValueFromData() that given array, which fields should be use as label, value, disable state and groupingId.
     */
    class ItemSetting implements ItemKeys {
        /**
         * Property used for display item. If it is not set, it uses items[index] to display.
         */
        textKey: string;
        /**
         * Property used for Value of an item. If it is not set, it uses items[index] as Value.
         */
        valueKey: string;
        /**
         * Property used for disable state of an item. If it is not set, default to false.
         */
        disabledKey: string;
        /**
         * Property used for select state of an item. If it is not set, default to false.
         */
        selectedKey: string;
        /**
         * Property used for grouping of an item. If it is not set, there is no grouping for the items.
         */
        groupIdKey: string;
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
         * @param disableKey Property used for display dropdownItem. If not provided, default is false.
         * @param groupIdKey Property used for display dropdownItem. If not provided, default is non-grouping.
         * @param selectedKey Property used for display dropdownItem. If not provided, default is not selected (false).
         */
        constructor(textKey?: string, itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string);
    }
    /**
     * ItemSetting is the fields setting to inform the ViewModel.createItemValueFromData() that given array, which fields should be use as label, value, disable state and groupingId.
     */
    interface ItemKeys {
        /**
         * Property used for display item. If it is not set, it uses items[index] to display.
         */
        textKey?: string;
        /**
         * Property used for Value of an item. If it is not set, it uses items[index] as Value.
         */
        valueKey?: string;
        /**
         * Property used for disable state of an item. If it is not set, default to false.
         */
        disabledKey?: string;
        /**
         * Property used for select state of an item. If it is not set, default to false.
         */
        selectedKey?: string;
        /**
         * Property used for grouping of an item. If it is not set, there is no grouping for the items.
         */
        groupIdKey?: string;
    }
    /**
     * OptionsGroup<TValue> is the interface for capture the html <optGroup> for Knockout mapping.
     */
    interface OptionsGroup<TValue> extends ItemList.Label {
        /**
         * children Options
         */
        items: KnockoutObservableArray<ItemList.Value<TValue>>;
    }
    /**
     * OptionsGroupItem<TValue> is the implementaton to capture the html <optGroup> for Knockout mapping.
     */
    class OptionsGroupItem<TValue> implements OptionsGroup<TValue> {
        /**
         * Text for OptionsGroup item.
         */
        text: KnockoutObservable<string>;
        /**
         * OptionsGroup is disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * children Options
         */
        items: KnockoutObservableArray<ItemList.Value<TValue>>;
    }
    interface Interface extends ValidatableControl.Interface<any> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ValidatableControl.ViewModel<any> {
        /**
         * Items for populate the select/options.
         */
        items: KnockoutObservableArray<ItemList.Label>;
        constructor(items?: ItemList.Label[]);
        /**
         * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
         *
         * @param dataArray Array of objects represent the groupDropDown menus.
         * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupId.
         * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
         * @return ItemList.Label[] for the ko binding for the dropdown items.
         */
        static createDropdownItemsFromArray(dataArray: any[], itemSetting?: ItemKeys, groupInfos?: StringMap<GroupInfo>): ItemList.Label[];
        /**
         * Utility function to create the ItemValue a single value for ItemValue which represent selection option tag.
         *
         * @param data the data for create an ItemVale for the <option>
         * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupid.
         * @return A ItemList.ItemValue<TValue> for the ko binding view Model of a single <option> tag.
         */
        static createItemValueFromData<TValue>(data: any, itemSetting: ItemKeys): ItemList.ItemValue<TValue>;
        /**
         * Utility function to create the OptionsGroupItems from a data array.  Represent select optGroup and option tag data structure.
         *
         * @param groupId The id used to identify the group. we use groupInfos[groupid] to retrive the ko.observable() for <optGroup> label and tag.
         * @param dataArray Array of objects represent the groupDropDown menus
         * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
         * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupId.
         * @return An OptionsGroupItem<TValue> for the ko binding view Model of a single <optGroup> tag.
         */
        static createOptionsGroupItem<TValue>(groupId: string, dataArray?: any[], groupInfos?: StringMap<GroupInfo>, itemSetting?: ItemKeys): OptionsGroupItem<TValue>;
        /**
         * Returns drop down items that are of type ItemList.Value. This is a convenience for the view model consumer and is not used by the widget itself.
         *
         * @return The items from the that represent values that can be selected by the user.
         */
        valueItems(): ItemList.Value<any>[];
    }
    class Widget extends ValidatableControl.Widget<any> implements Interface {
        private static _staticIsBrowserFireFox;
        private _currentItemText;
        private _name;
        private _arrowClass;
        private _select;
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
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        private _initializeComputeds();
        /**
         * Fix the IE9/IE8 engine remove the comments within the <select> block when DOM Element create from string.
         * As result, it remove the <-- ko if: --> from control template.
         * We explicitly detect this secnario and insert back the comment befor Knockout binding. Thus make this control works in IE8/IE9.
         *
         * @param select The select JQuery object after insersion of control template.
         */
        private fixMissingComment(select);
        private _setNormalArrow();
        private _setHoverArrow();
        private static _isBrowserFireFox();
        private _selectKeyUpHandler(ev, args?);
        private _findFirstMatchValue(value);
        private _findFirstNonDisabledItem();
        private _findFirstMatchOption(match);
    }
}
