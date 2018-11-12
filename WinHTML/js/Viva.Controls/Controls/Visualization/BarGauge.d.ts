import GaugeBase = require("./GaugeBase");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends GaugeBase.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface ThresholdData extends GaugeBase.ThresholdData {
    }
    interface RadiusSetting extends GaugeBase.RadiusSetting {
    }
    interface BarGroupData {
        /**
         * Top percentage
         */
        top: KnockoutObservableBase<string>;
        /**
         * Height percentage
         */
        height: KnockoutObservableBase<string>;
    }
    interface BarRangeData extends BarGroupData {
        /**
         * Width percentage
         */
        width: KnockoutObservableBase<string>;
        /**
         * Left percentage
         */
        left: KnockoutObservableBase<string>;
        /**
         * CSS class for this SVGPath
         */
        cssClass?: KnockoutObservableBase<string>;
        /**
         * ThresholdData for events.
         */
        data?: ThresholdData;
    }
    class Events extends GaugeBase.Events {
    }
    class ViewModel extends GaugeBase.ViewModel {
        /**
         * Thresholds.
         */
        thresholds: KnockoutObservableArray<ThresholdData>;
        /**
         * Max for the gauge to project.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * Enables thresholdsBar.
         */
        thresholdsBarEnabled: KnockoutObservableBase<boolean>;
        /**
         * ThresholdsBar settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * far and near point define the thickness of the thresholds bar.
         * text: position the label relative to the center.
         * icon: position the icons relative to the center.
         */
        thresholdsBarSettings: KnockoutObservable<RadiusSetting>;
        /**
         * Enables thresholdsLine.
         */
        thresholdsLineEnabled: KnockoutObservableBase<boolean>;
        /**
         * ThresholdsLine Settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * far and near point define the width of the thresholds Line.
         * text: position the label relative to the center.
         * icon: position the icons relative to the center.
         */
        thresholdsLineSettings: KnockoutObservable<RadiusSetting>;
        /**
         * Enables currentBar.
         */
        currentBarEnabled: KnockoutObservableBase<boolean>;
        /**
          * CurrentBarRing Settings.
          * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
          * far and near point define the thickness of the current arc.
          * text: position the label relative to the center.
          * icon: position the icons relative to the center.
          */
        currentBarRingSettings: KnockoutObservable<RadiusSetting>;
        /**
          * CurrentBar Settings.
          * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
          * far and near point define the thickness of the current arc.
          * text: position the label relative to the center.
          * icon: position the icons relative to the center.
          */
        currentBarSettings: KnockoutObservable<RadiusSetting>;
        /**
         * Enables currentBarRing.
         */
        currentBarRingEnabled: KnockoutObservableBase<boolean>;
        /**
         * Enables currentLine.
         */
        currentLineEnabled: KnockoutObservableBase<boolean>;
        /**
         * CurrentLine Settings.
         * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
         * far and near point define the width of the current Line.
         * text: position the label relative to the center.
         * icon: position the icons relative to the center.
         */
        currentLineSettings: KnockoutObservableBase<RadiusSetting>;
        /**
         * Start label.
         */
        startLabel: string;
        /**
         * Position the label relative to the center.
         */
        startLabelSetting: number;
        /**
         * Max label.
         */
        maxLabel: string;
        /**
         * Max icon.
         */
        maxIcon: string;
        /**
         * Start Icon.
         */
        startIcon: string;
        /**
         *   Position the icon relative to the center.
         */
        startIconSetting: number;
        /**
         * Events supported by the control.
         */
        events: Events;
        /**
         * Custom class for the control to allow for scoping custom styles.
         */
        cssClass: KnockoutObservable<string>;
    }
    class Widget extends GaugeBase.Widget implements Interface {
        private _thresholdsBarData;
        private _thresholdsBarGroupData;
        private _currentBarData;
        private _currentBarGroupData;
        private _cssClasses;
        private _prevThresholds;
        private _prevSortedThresholds;
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
        private static createGroupBarData(originalSettings);
        private static fillBarRangeData(source, dest);
        private setupComputed_thresholdsBarData();
        private setupComputed_currentBarData();
        _initializeComputeds(): void;
    }
}
