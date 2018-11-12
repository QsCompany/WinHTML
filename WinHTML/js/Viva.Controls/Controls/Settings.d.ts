import ItemList = require("./Base/ItemList");
import Base = require("./Base/Base");
export = Main;
declare module Main {
    var LabelClasses: {
        Large: string;
        Small: string;
    }, ValueClasses: {
        Large: string;
        Small: string;
    };
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface SettingText extends ItemList.Label {
        /**
         * uri Setting image uri.
         */
        uri?: KnockoutObservable<string>;
    }
    class SettingTextItem implements SettingText {
        /**
         * Text Setting Item.
         */
        text: KnockoutObservable<string>;
        /**
         * item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * uri Setting image uri.
         */
        uri: KnockoutObservable<string>;
        constructor(text: string, disabled?: boolean, uri?: string);
        constructor(object: Object);
        /**
         * Populates the view model from a key/value pairs object.
         * The keys should map to properties on the view model.
         * The values are applied to the corresponding keys.
         *
         * @param object An un-typed object with values to populate on the view model.
         */
        populateFromObject(object: Object): void;
    }
    interface SettingGroup<L, V> {
        /**
         * label Setting label.
         */
        label?: L;
        /**
         * value Setting value.
         */
        value?: V;
    }
    class SettingGroupItem implements SettingGroup<SettingText, SettingText> {
        /**
         * label Setting label.
         */
        label: SettingText;
        /**
         * value Setting value.
         */
        value: SettingText;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * The list of settings and values.
         * Each item in the array is an object with two properties label and value.
         * The label and value properties could either be a string or an object with a property named uri.
         */
        items: KnockoutObservableArray<SettingGroup<any, any>>;
        /**
         * The CSS class for the value of each setting.
         */
        valueClass: KnockoutObservable<string>;
        /**
         * The CSS class for the label of each setting.
         */
        labelClass: KnockoutObservable<string>;
        /**
         * The maximum number of items rendered.
         */
        maxItems: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to swap the positions of the label and value in the item.
         */
        swapLabelValuePositions: KnockoutObservable<boolean>;
    }
    class Widget extends Base.Widget implements Interface {
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
        private _disableCssClass(disabled);
    }
}
