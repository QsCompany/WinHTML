import TemplateEngine = require("../../Util/TemplateEngine");
import ValidatableControl = require("./ValidatableControl");
import Base = require("./Base");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for item list widget.
     */
    interface Interface<TValue> extends ValidatableControl.Interface<ItemValue<TValue>> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
    }
    /**
     * Interface representing the label for an Value
     */
    interface Label {
        /**
         * Text for list item.
         */
        text: KnockoutObservable<string>;
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
    }
    /**
     * Interface representing the properties for an item in item list.
     */
    interface Value<T> extends Label {
        /**
         * Value bound for list item when li is selected.
         */
        value: KnockoutObservable<T>;
        /**
         * Item is selected.
         */
        selected: KnockoutObservable<boolean>;
    }
    /**
     * View model representing the properties for an item in item list.
     */
    class ItemValue<T> implements Value<T> {
        /**
         * Text for list item.
         */
        text: KnockoutObservable<string>;
        /**
         * Value bound for list item when li is selected.
         */
        value: KnockoutObservable<T>;
        /**
         * Item is selected.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
        _tabindex: KnockoutObservable<number>;
        _subscriptions: KnockoutSubscription<any>[];
        private _destroyIds;
        /**
         * Creates a new instance of view model representing the item in item list.
         *
         * @param text The text data binding for item.
         * @param value The value data binding for item.
         * @param selected The item is selected.
         * @param disabled The item is disabled.
         */
        constructor(text: string, value: T, selected?: boolean, disabled?: boolean);
        /**
         * _checkExistsOrRegisterDestroyId.  This is utility function for the destroy method to avoid recursive
         *
         * @param destroyId Unique identifier for the destroy to identify itself.  In the javascript inheritance, this.destroy is always the same.
         *                  But super.dispose is unique since super is function scope.  Typically, use super.dispose as id. For root object, use null as Id.
         * @return whether this destroyMethod is already on the executed. If true, mean it is already been executed.
         */
        _checkExistsOrRegisterDestroyId(destroyId: any): boolean;
        /**
         * See interface.
         */
        isDestroyed(): boolean;
        /**
         * Frees up the items resources.
         */
        dispose(): void;
        /**
         * Populates the view model from a key/value pairs object.
         * The keys should map to properties on the view model.
         * The values are applied to the corresponding keys.
         *
         * @param object An un-typed object with values to populate on the view model.
         */
        populateFromObject(object: Object): void;
        /**
         * Helper method allowing you to subscribe to knockout objects.
         *
         * @param subscription The KnockoutSubscription associated with observable in ItemValue.
         */
        _initializeSubscriptions(subscription: KnockoutSubscription<any>): void;
        /**
         * Helper method allowing you to unsubscribe from previously subscribed functions.
         */
        _disposeSubscriptions(): void;
    }
    /**
     * View model representing the properties for item list widget.
     */
    class ViewModel<TValue> extends ValidatableControl.ViewModel<ItemValue<TValue>> {
        /**
         * Aria label id.
         */
        label: string;
        /**
         * Observable array containing the following array element:
         * * ItemValue
         */
        values: KnockoutObservableArray<ItemValue<TValue>>;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    /**
     * Abstract widget that handles value as a list.
     * Support ARIA with arrow keypress.
     */
    class Widget<TValue> extends ValidatableControl.Widget<ItemValue<TValue>> implements Interface<TValue> {
        _templateEngineInstance: TemplateEngine.StringTemplateEngine;
        /**
         * Role attribute of the list item.
         */
        _role: string;
        /**
         * Role attribute of the list.
         */
        _roleGroup: string;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: ViewModel<TValue>, createOptions: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel<TValue>;
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        /**
         * Set the options' name to the generated value if name is not set by the user.
         */
        _setName(): void;
        _setRole(): void;
        /**
         * The ko data-bind template string for each list item used by the ItemList template engine.
         *
         * @return The template string for li.
         */
        _attachItemTemplate(): string;
        _set(value: ItemValue<TValue>): void;
        _isSameValue(a: ItemValue<TValue>, b: ItemValue<TValue>): boolean;
        _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
        _disposeSubscriptions(): void;
        /**
         * Binds the view model with the element.
         *
         * @param extraViewModel Extra view model you can attach to the Knockout view model.
         */
        _bindDescendants(extraViewModel?: any): void;
        _valueChangedSubscriber(newValue: ItemValue<TValue>): void;
        _widgetDisabledSubscriber(newValue: boolean): void;
        private _itemSelectedSubscriber(itemValue);
        private _itemDisabledSubscriber(itemValue);
        private _attachEvents();
        private _clicked(value);
        private _isItemDisabled(item);
        private _setUnselectedTabIndex();
        private _unselectItemValue(value);
    }
}
