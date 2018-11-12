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
         * The number represents step size.
         * Note if this number is too small, widget will throw.
         * To check the minimum step value required, which is depends on maximum, call getRequiredMinimumStep().
         */
        step: KnockoutObservableBase<number>;
        /**
         * The number represents the whole gauge value.
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
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        centerDisplayFormat: KnockoutObservableBase<string>;
        /**
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Width of the QuoteGauge.
         */
        width: KnockoutObservableBase<number>;
        /**
         * Height of the QuoteGauge.
         */
        height: KnockoutObservableBase<number>;
        /**
         * The required mimimum step value based on this.maximum().
         * If its step is smaller than this number, the widget will throw during creation.
         */
        getRequiredMinimumStep(): number;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _quotaGaugeWidget;
        private _centerViewModel;
        private _innerViewModel;
        private _stepElements;
        private _thresholds;
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
        private initializeUsageGaugeViewModel(usageGaugeViewModel);
        _createInnerViewModel(): QuotaGauge.ViewModel;
    }
}
