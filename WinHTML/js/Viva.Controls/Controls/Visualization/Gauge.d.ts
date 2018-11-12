import GaugeBase = require("./GaugeBase");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface Label {
        /**
         * Text of the label.
         */
        text: string;
        /**
         * CSS class for the label.
         */
        cssClass?: KnockoutObservableBase<string>;
    }
    interface ThresholdData extends GaugeBase.ThresholdData {
    }
    interface RadiusSetting extends GaugeBase.RadiusSetting {
    }
    interface Point {
        /**
         * X coordinate.
         */
        x: number;
        /**
         * Y coordinate.
         */
        y: number;
    }
    interface SVGRangeData {
        /**
         * SVG path string.
         */
        path: KnockoutObservableBase<string>;
        /**
         * CSS class for this SVGPath
         */
        cssClass?: KnockoutObservableBase<string>;
        /**
         * Label text coordinate x.
         */
        textPositionX?: KnockoutObservableBase<number>;
        /**
         * Label text coordinate y.
         */
        textPositionY?: KnockoutObservableBase<number>;
        /**
         * Label text.
         */
        text?: KnockoutObservableBase<string>;
        /**
         * CSS class for Label.
         */
        textCssClass?: KnockoutObservableBase<string>;
        /**
         * Icon for this path.
         */
        icon?: KnockoutObservableBase<string>;
        /**
         * ThresholdData for events.
         */
        data?: ThresholdData;
    }
    interface SVGLineData {
        /**
         * Svg path string.
         */
        path: string;
        /**
         * Label coordinate.
         */
        textPosition?: Point;
        /**
         * Label text.
         */
        text?: string;
        /**
         * Label CSS class.
         */
        textCssClass?: KnockoutObservableBase<string>;
        /**
         * Icon coordinate.
         */
        iconPosition?: Point;
        /**
         * Icon uri.
         */
        icon?: string;
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
         * Total Arc of the gauge. (units in degree).
         */
        totalArc: KnockoutObservableBase<number>;
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
         *  Arc of the gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        arcStartOffset: KnockoutObservableBase<number>;
        /**
         * Start label.
         */
        startLabel: string;
        /**
         * Position the label relative to the center.
         */
        startLabelSetting: number;
        /**
         * Start Icon.
         */
        startIcon: string;
        /**
         *   Position the icon relative to the center.
         */
        startIconSetting: number;
        /**
         * Max label.
         */
        maxLabel: string;
        /**
         * Position the label relative to the center.
         */
        maxLabelSetting: number;
        /**
         * Max icon.
         */
        maxIcon: string;
        /**
         * Position the icon relative to the center.
         */
        maxIconSetting: number;
        /**
         * Shows center text using SVG.
         */
        showCenterText: KnockoutObservableBase<boolean>;
        /**
         * Center text array using SVG.
         */
        centerTexts: KnockoutObservableArray<Label>;
        /**
         * Width.
         */
        width: KnockoutObservableBase<number>;
        /**
         * Height.
         */
        height: KnockoutObservableBase<number>;
        /**
         * Events supported by the control.
         */
        events: Events;
    }
    class Widget extends GaugeBase.Widget implements Interface {
        private _width;
        private _height;
        private _top;
        private _left;
        private _marginTop;
        private _marginLeft;
        private _translate;
        private _thresholdsBarData;
        private _thresholdsBarDataChanged;
        private _threshholdsLineData;
        private _currentBarData;
        private _currentBarDataChanged;
        private _currentBarRingData;
        private _currentLineData;
        private _centerLabelPosition;
        private _centerTexts;
        private _totalArc;
        private _eventThresholdBarClickHandler;
        private _eventThresholdBarMouseEnterHandler;
        private _eventThresholdBarMouseLeaveHandler;
        private _eventCurrentBarClickHandler;
        private _eventCurrentBarMouseEnterHandler;
        private _eventCurrentBarMouseLeaveHandler;
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
        private static fillSvgRangeData(source, dest);
        _initializeComputeds(): void;
        private setupComputed_threshholdsLineData();
        private setupComputed_currentLineData();
        private setupComputed_thresholdsBarData();
        private setupComputed_currentBarRingData();
        private setupComputed_currentBarData();
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        private _attachEvents();
        private _detachEvents();
        /**
         * Generates a SVG path string for a line on value position (relative to max).
         *
         * @param value The desired value relative to max.
         * @param rx Arc's rx.
         * @param ry Arc's ry.
         * @param max The maximum of the total gauge.
         * @param arcTotal The total Fan degree out of 360 degree.
         * @param arcStartOffset The rotation offset for this total arc
         * @param far The end of the line far point. It is relative to radius. For example, 0.9 represents 0.9 * radius.
         * @param near The start of the line near point. It is relative to radius.
         * @param text The position of text should be in. It is relative to radius.
         * @return line svg path string.
         */
        private _lineSvgFormat(value, rx, ry, max, arcTotal, arcStartOffset, far, near, text);
        /**
         * Generates a SVG path String for an arc close path given the start and end value (relative to max).
         *
         * @param start The value to start the arc. (larger number).
         * @param end The value to end.  (smaller number).
         * @param rx Arc's rx.
         * @param ry Arc's ry.
         * @param max The max of the total gauge.
         * @param totalArc This represent the total Fan degree out of 360 degree. (Max is projected onto this arc range).
         * @param arcStartOffset The rotation offset for this total arc
         * @param far The thickness of the arc far point. it base on relative to radius. For example, 0.9 represents 0.9 * radius.
         * @param near The thickness of the arc near point. it base on relative to radius.
         * @return The arc svg path string.
         */
        private _arcSvgFormat(start, end, rx, ry, max, arcTotal, arcStartOffset, far, near);
    }
}
