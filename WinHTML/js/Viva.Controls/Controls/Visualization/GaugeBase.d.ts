import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface ThresholdData {
        /**
         * Threshold Upper limit.
         */
        limit: KnockoutObservableBase<number>;
        /**
         * Threshold CSS class.
         */
        cssClass?: KnockoutObservableBase<string>;
        /**
         * Threshold label.
         */
        label?: KnockoutObservableBase<string>;
        /**
         * Threshold icon.
         */
        icon?: KnockoutObservableBase<string>;
    }
    interface RadiusSetting {
        /**
         * Far setting.
         * far and near point define the width of the current Line or Bar.
         * 0 represents center of the circle. 1 represents right on the radius.
         */
        far: number;
        /**
         * Near setting.
         * far and near point define the width of the current Line or Bar.
         * 0 represents center of the circle. 1 represents right on the radius.
         */
        near: number;
        /**
         * Text setting.
         * position the label relative to the center.
         * 0 represents center of the circle. 1 represents right on the radius.
         * 0 also means is will not show the label.
         */
        text?: number;
        /**
          * Icon setting.
          * position the label relative to the center.
          * 0 represents center of the circle. 1 represents right on the radius.
          * 0 also means is will not show the icon.
          */
        icon?: number;
    }
    class Events {
        /**
         * Click on a threshold bar.
         *
         * @param data The threshold data of the thesholdBar which is been click on.
         * @param element The svg path element of the thresholdBar which is been click on.
         * @param evt JQueryEventObject for this event.
         */
        thresholdBarClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseEnter on a threshold bar.
         *
         * @param data The threshold data of the thesholdBar which mouse entering.
         * @param element The svg path element of the thresholdBar which mouse entering.
         * @param evt JQueryEventObject for this event.
         */
        thresholdBarMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseLeave on a threshold bar.
         *
         * @param data The threshold data of the thesholdBar which mouse leaving.
         * @param element The svg path element of the thresholdBar which mouse leaving.
         * @param evt JQueryEventObject for this event.
         */
        thresholdBarMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * SVG Path elements of the threshold bar has changed.
         *
         * This event will fired when the SVG elements of is changed.
         * For example, rotate, threshold changed, current change, will cause the computed SVG paths element to change.
         * This event allow the client to re-map the threshold index to element mapping.
         * For instance, in Donut gauge, it relies on the index to element mapping to quickly insert/remove only specific element's class.
         * When this event fired, Donut gauge takes one time hit to remap threshold index to element
         * Such that the subsequence hoverIndex() change, it just does the index to element look up.
         */
        thresholdBarElementsChanged: () => void;
        /**
         * Click on a current bar.
         *
         * @param data The threshold data of the currentBar which is been clicked on.
         * @param element The svg path element of the currentBar which is been clicked on.
         * @param evt JQueryEventObject for this event.
         */
        currentBarClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseEnter on a current bar.
         *
         * @param data The threshold data of the currentBar which mouse entering.
         * @param element The svg path element of the currentBar which mouse entering.
         * @param evt JQueryEventObject for this event.
         */
        currentBarMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * MouseLeave on a current bar.
         *
         * @param data The threshold data of the currentBar which mouse entering.
         * @param element The svg path element of the currentBar which mouse entering.
         * @param evt JQueryEventObject for this event.
         */
        currentBarMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        /**
         * SVG Path elements of the current bar has changed.
         *
         * This event will fired when the SVG elements of is changed.
         * For example, rotate, threshold changed, current change, will cause the computed SVG paths element to change.
         * This event allow the client to re-map the threshold index to element mapping.
         * For instance, in Donut gauge, it relies on the index to element mapping to quickly insert/remove only specific element's class.
         * When this event fired, Donut gauge takes one time hit to remap threshold index to element
         * Such that the subsequence hoverIndex() change, it just does the index to element look up.
         */
        currentBarElementsChanged: () => void;
    }
    class ViewModel extends Base.ViewModel {
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
    class Widget extends Base.Widget implements Interface {
        _sortedThresholds: KnockoutComputed<ThresholdData[]>;
        _rangeData: KnockoutComputed<ThresholdData[]>;
        _currentValue: KnockoutComputed<number>;
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
        options: ViewModel;
        static validateRadiusSetting(setting: RadiusSetting): RadiusSetting;
        _initializeComputeds(): void;
    }
}
