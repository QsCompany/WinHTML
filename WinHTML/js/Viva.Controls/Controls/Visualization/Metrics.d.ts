/// <reference path="../../../Definitions/d3.d.ts" />
import Hatching = require("../../Util/Hatching");
import SingleSetting = require("../SingleSetting");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        options: ViewModel;
    }
    class SingleMetric extends SingleSetting.ViewModel {
        /**
         * Color of the vertical bar beside the metric.
         */
        barCssClass: KnockoutObservableBase<string>;
        /**
         * Defines the hatching pattern.
         */
        hatchingPattern: KnockoutObservableBase<Hatching.Pattern>;
        /**
         * Shows the vertical bar beside the metric.
         */
        showBarColor: KnockoutObservableBase<boolean>;
        /**
         * Set display:none on the element to avoid the DOM removal
         */
        hide: KnockoutObservableBase<boolean>;
        constructor();
    }
    /**
     * Size of the metrics.
     */
    enum Size {
        /**
         * Shows small metrics - Font: 20px, Height: 32px, Margin: 14px.
         */
        Small = 0,
        /**
         * Shows medium metrics - Font: 40px, Height: 35px, Margin: 30px.
         */
        Medium = 1,
        /**
         * Shows large metrics - Font: 40px, Height: 45px, Margin: 22px.
         */
        Large = 2,
        /**
         * Shows Xlarge metrics - Font: 40px, Height: 45px, Margin: 25px.
         */
        XLarge = 3,
    }
    /**
     * Orientation of the metrics.
     */
    enum Orientation {
        /**
         * Metrics will be displayed horizontally.
         */
        Horizontal = 0,
        /**
         * Metrics will be displayed vertically.
         */
        Vertical = 1,
    }
    class ViewModel extends Base.ViewModel {
        /**
         * Any observable array of SingleMetric instances which defines what to display.
         */
        items: KnockoutObservableArray<SingleMetric>;
        /**
         * The orientation of the items in the metrics.
         */
        orientation: KnockoutObservable<Orientation>;
        /**
         * The size of the items in the metrics.
         */
        size: KnockoutObservable<Size>;
        /**
         * The visibility of the metrics.
         */
        visible: KnockoutObservable<boolean>;
    }
    class Widget extends Base.Widget implements Interface {
        private _metricSize;
        private _hatchingPatternIds;
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
        _initializeComputeds(): void;
        private _cleanHatchingPatterns();
        private _removeSizeClasses();
        private _assignClasses(orentation);
        private _render();
    }
}
