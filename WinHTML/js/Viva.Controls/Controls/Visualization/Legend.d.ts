/// <reference path="../../../Definitions/d3.d.ts" />
import Grid = require("../Lists/Grid1/Grid");
import Base = require("../Base/Base");
import CompositeControl = require("../Base/CompositeControl");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface Item extends Grid.Item {
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * Data being displayed.
         */
        data: KnockoutObservableArray<Item>;
        /**
         * Data key used to identify the row index. Leave unset to use the index within data.
         */
        indexKey: string;
        /**
         * Data key used to identify the color.
         */
        colorKey: string;
        /**
         * Data key of the hatching pattern.
         */
        hatchingKey: string;
        /**
         * Data key used to identify the boolean column indicating if the row is selected.
         */
        selectedKey: string;
        /**
         * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
         */
        labelKey: string;
        /**
         * Index of current hovered row in the legend.
         */
        hoveredIndex: KnockoutObservable<string>;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _grid;
        private _selectLifetimeManager;
        private _svgSelection;
        private _gridElement;
        private _hoveredIndex;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        private setupSelected(options);
    }
}
