import ExtensibleControl = require("../../Base/ExtensibleControl");
import Base = require("../../Base/Base");
export = Main;
declare module Main {
    /**
     * A metadata entry correspendong to a single item in the tree.
     */
    interface ItemMetadata {
        /**
         * Gets or sets whether the item is expanded or not (effective if the item has child items).
         */
        expanded?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is disabled.
         */
        disabled?: KnockoutObservable<boolean>;
    }
    /**
     * Html template for an item.
     */
    interface ItemTemplate {
        /**
         * Key of this template.
         */
        key: string;
        /**
         * Html template to be used by items.
         */
        html: string;
    }
    /**
     * A leaf of the tree.
     */
    interface Item {
        /**
         * Text of the item.
         */
        text: KnockoutObservable<string>;
        /**
         * Icon specified to the item to be displayed with text.
         */
        icon?: KnockoutObservable<string>;
        /**
         * Css class specific to this item.
         */
        cssClass?: KnockoutObservable<string>;
        /**
         * Child items of this item.
         */
        items?: KnockoutObservableArray<Item>;
        /**
         * Metadata information about this item.
         */
        metadata?: ItemMetadata;
        /**
         * Key of the template for this item.
         */
        templateKey?: KnockoutObservable<string>;
    }
    interface ItemExpandEventObject {
        /**
         * Indicates whether the item is being expanded or not.
         */
        expanding: boolean;
        /**
         * Item being expanded or collapsed.
         */
        item: Item;
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
    }
    class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ExtensibleControl.ViewModel {
        /**
         * Items displayed in the tree.
         */
        items: KnockoutObservableArray<Item>;
        /**
         * Important events which the viewModel might want to react.
         */
        events: (type: string, args?: any) => void;
        /**
         * Amount of child item padding in px.
         */
        padding: KnockoutObservable<number>;
        /**
         * Separator used to build the path of an item.
         */
        pathSeparator: string;
        /**
         * Indicates whether all the items in tree are visible and expand/collapse icons are invisible.
         */
        alwaysExpanded: KnockoutObservable<boolean>;
        /**
         * A list of html templates to be used by the items.
         */
        htmlTemplates: ItemTemplate[];
    }
    class Widget extends ExtensibleControl.Widget implements Interface {
        private _treeIconClickHandler;
        private _templateEngine;
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
         * Gets the DOM element represented by the specified item.
         *
         * @param item Reference to find the DOM element.
         * @return DOM representation of the specified item.
         */
        getElementFromItem(item: Item): JQuery;
        /**
         * Triggers events that signal to the treeview and treeview plugins that an item should be expanded or collapsed.
         *
         * @param item The treeview item to be expanded.
         * @param evt Event initiating this expand operation.
         * @param expand Optional expand value to set the expanded property.
         */
        toggleNodeExpansion(item: Item, evt: JQueryEventObject, expand?: boolean): void;
        /**
         * Enables to expand/collapse specified node. If no expand specified, expand property
         * is toggled, otherwise expand property is set to the specified value.
         *
         * @param node Node to expand/collapse.
         * @param evt Event initiating this expand operation.
         * @param expand Optional expand value to set the expanded property.
         */
        _expandNode(node: JQuery, evt: JQueryEventObject, expand?: boolean): void;
        /**
         * Builds the path for the specified item using its text and the path separator.
         *
         * @param item Item to build the path.
         * @return The path value as a string.
         */
        _buildPath(item: Item): string;
        private _initializeComputeds();
        private _paddingValue(parentContext);
        private _ensureItemInitialized(item);
        private _attachEvents();
        private _detachEvents();
        private _itemFormat(item);
        private _setTemplates();
    }
}
