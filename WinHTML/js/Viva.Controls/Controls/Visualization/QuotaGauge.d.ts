import UsageGauge = require("./UsageGauge");
import CompositeControl = require("../Base/CompositeControl");
import SingleSetting = require("../SingleSetting");
import Gauge = require("./Gauge");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    enum CenterSize {
        /**
         * Extra Small Center.
         */
        XSmall = 0,
        /**
         * Small Center.
         */
        Small = 1,
        /**
         * Medium Center.
         */
        Medium = 2,
        /**
         * Large Center.
         */
        Large = 3,
    }
    enum RingThickness {
        /**
         * Common Ring Size.
         */
        Normal = 0,
        /**
         * Thin Ring Size.
         */
        Thin = 1,
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * triangleErrorWarning Toogle the css style for warning/error.  True for Triangle or False for Circle.
         */
        triangleErrorWarning: KnockoutObservableBase<boolean>;
        /**
         * Center Single icon/font size.
         */
        centerSize: KnockoutObservableBase<CenterSize>;
        /**
         * Ring Thickness for the Gauge.
         */
        ringThickness: KnockoutObservableBase<RingThickness>;
        /**
         * Show outer donut gauge.
         */
        showGauge: KnockoutObservableBase<boolean>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
        /**
         * Omit Total bar.
         */
        omitTotal: KnockoutObservableBase<boolean>;
        /**
         * No quota verification.
         */
        noQuota: KnockoutObservableBase<boolean>;
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
         *  Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * instance value.
         */
        instance: KnockoutObservableBase<number>;
        /**
         * instanceQuota value.
         */
        instanceQuota: KnockoutObservableBase<number>;
        /**
         * total value.
         */
        total: KnockoutObservableBase<number>;
        /**
         * totalQuota value.
         */
        totalQuota: KnockoutObservableBase<number>;
        /**
         * Total Arc of the gauge. (units in degree). Gauge total arc must be less than 360.
         */
        totalArc: KnockoutObservableBase<number>;
        /**
         * captionDisplayFormat value.
         *  {0} is intance
         *  {1} is instanceQuota,
         *  {2} is total
         *  {3} is totalQuota
         *  {4} is maximum
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        /**
         * valueDisplayFormat value.
         *  {0} is intance
         *  {1} is instanceQuota,
         *  {2} is total
         *  {3} is totalQuota
         *  {4} is maximum
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
        /**
         * This will get called before UsageGauge Widget is been created.
         * This allow user to fine tune look and feel of the UsageGauge.
         *
         * @param usageGaugeViewModel The usageGaugeViewModel for adjust the look and feels.
         */
        beforeCreateUsageWidget: (usageGaugeViewModel: UsageGauge.ViewModel) => void;
        /**
         * Overrides default computed behavior for generate gauge.
         * Default value is null: allow Quota default way of layout generated.
         * To suppressed the default, provide a computed function and adjust it own computed method.
         *
         * @param gaugeViewModel The gauge to adjust the look and feel.
         * @param centerViewModel The centerSettingViewModel to adjust the look and feel.
         * @return ko.computed<void> for the caculate the QuotaGauge.
         */
        createQuotaComputed: (gaugeViewModel: Gauge.ViewModel, centerViewModel: SingleSetting.ViewModel) => KnockoutComputed<void>;
        /**
         * Disable the Ring Thickness change.
         */
        disableRingThicknessChange: boolean;
        /**
         * Default Bar settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * far and near point define the thickness of the thresholds bar.
         */
        static defaultBarRadiusSetting: Gauge.RadiusSetting;
        /**
         * Default Instance Line Settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * Far and near point define the thickness of the thresholds bar.
         */
        static defaultInstanceLineSettings: Gauge.RadiusSetting;
        /**
         * Default Bar settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * far and near point define the thickness of the thresholds bar.
         */
        static defaultThinBarRadiusSetting: Gauge.RadiusSetting;
        /**
         * Default Instance Line Settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * Far and near point define the thickness of the thresholds bar.
         */
        static defaultThinInstanceLineSettings: Gauge.RadiusSetting;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _usageGaugeWidget;
        private _usageGaugeViewModel;
        private _startThreshold;
        private _splitThreshold;
        private _instanceThreshold;
        private _totalThreshold;
        private _barSettings;
        private _instanceLineSettings;
        private _computedMaximum;
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
          * Utility function to return the strip width relative to maximum at current strip.
          * This is useful when you can't draw into the section that's between two stip width.
          *
          * @param: maximum: the total arc of the gauge.
          * @param: return the relative number that the strip will be.
          */
        static calcStripeWidth(maximum: number): number;
        private _createUsageGaugeViewModel();
        private _initializeComputeds();
        private createQuotaComputed(gaugeViewModel, centerViewModel);
        private _initializeAdditionalComputed(gaugeViewModel, centerViewModel);
    }
}
