import QuotaGauge = require("./QuotaGauge");
import CompositeControl = require("../Base/CompositeControl");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * Center Single icon/font size.
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
         * Hide the current tick mark.
         */
        hideTick: KnockoutObservableBase<boolean>;
        /**
         * The number represent the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * captionDisplayFormat value.
         *  {0} is current
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        /**
         * valueDisplayFormat value.
         *  {0} is current
         */
        valueDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Width of the QuoteGauge.
         */
        width: KnockoutObservableBase<number>;
        /**
         * Height of the QuoteGauge.
         */
        height: KnockoutObservableBase<number>;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _quotaGaugeWidget;
        private _innerViewModel;
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
        _createInnerViewModel(): QuotaGauge.ViewModel;
    }
}
