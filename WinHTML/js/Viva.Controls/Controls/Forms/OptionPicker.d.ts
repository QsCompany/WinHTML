import ItemList = require("../Base/ItemList");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for OptionPicker widget.
     */
    interface Interface<TValue> extends ItemList.Interface<TValue> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TValue>;
    }
    class ViewModel<TValue> extends ItemList.ViewModel<TValue> {
    }
    /**
     * List of radio buttons with ARIA support.
     * The radio buttons can be stylized with CSS to surface it OptionPicker.
     */
    class Widget<TValue> extends ItemList.Widget<TValue> implements Interface<TValue> {
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel<TValue>, createOptions?: Base.CreateOptions);
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
        options: ViewModel<TValue>;
        /**
         * Set the options' name to the generated value if name is not set by the user.
         */
        _setName(): void;
        _setRole(): void;
        /**
         * The ko data-bind template string for each list item used by the ItemList template engine.
         *
         * @return The template string for optionPicker input.
         */
        _attachItemTemplate(): string;
        _getItemValueString(itemValue: ItemList.ItemValue<TValue>): string;
    }
}
