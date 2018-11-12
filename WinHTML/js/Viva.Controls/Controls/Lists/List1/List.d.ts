import ExtensibleControl = require("../../Base/ExtensibleControl");
import Base = require("../../Base/Base");
export = Main;
declare module Main {
    interface PluginExtension extends ExtensibleControl.PluginExtension {
    }
    class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
        /**
         * The the items that have initialized metadata.
         */
        itemViews: KnockoutComputed<ItemView[]>;
        /**
         * Gets the list item view from the item.
         *
         * @param item The item to get the list item view for.
         * @return The list item view.
         */
        getItemView(item: Item): ItemView;
    }
    /**
     * A metadata entry corresponding to a single item in the list.
     */
    interface ItemMetadata {
        /**
         * Indicates if the item is disabled.
         */
        disabled?: KnockoutObservable<boolean>;
    }
    interface Item {
        /**
         * An item value is accessible by a sring key accessor.
         */
        [key: string]: any;
        /**
         * Css class specific to this item.
         */
        cssClass?: KnockoutObservableBase<string>;
        /**
         * Metadata information about this item.
         */
        metadata?: ItemMetadata;
    }
    interface ItemView extends Item {
        /**
         * The original item.
         */
        item: Item;
    }
    class ViewModel extends ExtensibleControl.ViewModel {
        /**
         * Items displayed in the list.
         */
        items: KnockoutObservableArray<Item>;
        /**
         * Important events which the viewModel might want to react.
         */
        events: (type: string, args?: any) => void;
        /**
         * Template used on each item.
         */
        itemTemplate: string;
        /**
         * Message displayed when list is empty.
         */
        noItemsMessage: string;
        constructor();
    }
    class Widget extends ExtensibleControl.Widget implements Interface {
        private _templateEngine;
        private _itemViews;
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
         * The items views with full initialized metadata.
         */
        itemViews: KnockoutComputed<ItemView[]>;
        /**
         * See interface.
        */
        getItemView(item: Item): ItemView;
        /**
         * See interface.
         */
        options: ViewModel;
        private _attachEvents();
        private _detachEvents();
        private _setTemplates();
        private _createItemView(item);
        private _disposeItemView(itemView);
    }
}
