/// <reference path="../../../Definitions/d3.d.ts" />
import Hatching = require("../../Util/Hatching");
import UnitConversion = require("../../Util/UnitConversion");
import DisposableBase = require("../../Base/Base.Disposable");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Defines chart types.
     */
    enum ChartType {
        /**
         * Line chart type.
         */
        Line = 0,
        /**
         * Area chart type.
         */
        Area = 1,
        /**
         * Scatter chart type.
         */
        Scatter = 2,
        /**
         * Stacked bar chart type.
         */
        StackedBar = 3,
        /**
         * Grouped bar chart type.
         */
        GroupedBar = 4,
        /**
         * Split bar chart type.
         */
        SplitBar = 5,
        /**
         * Stacked area chart type.
         */
        StackedArea = 6,
    }
    /**
     * Defines interpolation of lines of the line chart.
     */
    enum Interpolation {
        /**
         * The series interpolation when data points are connected by strainght lines.
         */
        Linear = 0,
        /**
         * The series interpolation when data points are connected by smooth curves. The monotone is a mode of D3 interpolaion style.
         */
        Monotone = 1,
        /**
         * The series interpolation when series are connected by two lines: the first one (from the left side) is horizontal and the second one is vertical.
         */
        StepAfter = 2,
    }
    /**
     * Defines line styles of the line chart.
     */
    enum LineStyle {
        /**
         * The series line is solid.
         */
        Solid = 0,
        /**
         * The series line is dotted.
         */
        Dotted = 1,
        /**
         * The series line is dashed.
         */
        Dashed = 2,
        /**
         * The series line is a trendline.
         */
        Trendline = 3,
        /**
         * The series line is a usage threshold.
         */
        UsageThreshold = 4,
        /**
         * The series line is a warning threshold.
         */
        WarningThreshold = 5,
    }
    /**
     * Display type for optional line and coordinate plots for stacked area charts.
     */
    enum LineState {
        /**
         * Display stacked area chart line with coordinate points. Use this for old api behavior showLines(true).
         */
        ShowLineWithPoints = 0,
        /**
         * Hide stacked area chart line. Use this for old api behavior showLines(false).
         */
        HideLine = 1,
        /**
         * Display stacked area chart line with the coordinate point nearest to x slider only.
         */
        ShowLineWithXHoverPoint = 2,
    }
    /**
     * Defines the various sub-types for bar chart.
     */
    enum BarChartType {
        /**
         * The data series will be rendered as stacked bars for each x value.
         */
        Stacked = 0,
        /**
         * The data series will be rendered as grouped bars for each x value.
         */
        Grouped = 1,
        /**
         * The data series which has positive and negative values will be rendered with axis in the center of the chart.
         */
        Split = 2,
    }
    /**
     * Indicates where the chart axis should be visually positioned on the chart.
     */
    enum AxisPosition {
        /**
         * The axis should not be displayed in the chart.
         */
        None = 0,
        /**
         * The axis should be displayed horizontally above the chart.
         */
        Top = 1,
        /**
         * The axis should be displayed vertically and aligned right of the chart.
         */
        Right = 2,
        /**
         * The axis should be displayed horizontally below chart.
         */
        Bottom = 3,
        /**
         * The axis should be displayed vertically and aligned left of the chart.
         */
        Left = 4,
        /**
         * The axis should be displayed in the center and horizontally aligned.
         */
        CenterHorizontal = 5,
        /**
         * The axis should be displayed in the center and vertically aligned.
         */
        CenterVertical = 6,
    }
    enum InteractionBehavior {
        /**
         * All Interaction is enabled
         */
        All = 0,
        /**
         * Opt out XSlider behavior
         */
        XSlider_Off,
        /**
         * Opt out XSlider callout Text
         */
        XSlider_noCallout,
        /**
         * Opt out any interaction in ChartArea
         */
        ChartArea_Off,
        /**
         * Opt out any ChartArea Click-select behavior
         */
        ChartArea_noClick,
        /**
         * Opt out any ChartArea hover behavior
         */
        ChartArea_noHover,
    }
    /**
     * Indicates where the chart legend should be visually positioned on the chart.
     */
    enum LegendPosition {
        /**
         * The chart legend should not be displayed in the chart.
         */
        None = 0,
        /**
         * The legend should be displayed horizontally above the chart.
         */
        Top = 1,
        /**
         * The legend should be displayed vertically and aligned right of the chart.
         */
        Right = 2,
        /**
         * The legend should be displayed horizontally below chart.
         */
        Bottom = 3,
        /**
         * The legend should be displayed vertically and aligned left of the chart.
         */
        Left = 4,
    }
    /**
     * Specifies the data label context.
     */
    enum DataLabelContext {
        /**
         * The data label should be displayed near the max value of the series.
         */
        Max = 0,
        /**
         * The data label should be displayed near the min value of the series.
         */
        Min = 1,
        /**
         * The data label should be displayed near the first value of the series.
         */
        First = 2,
        /**
         * The data label should be displayed near the last value of the series.
         */
        Last = 3,
        /**
         * The data label should be displayed near every value of the series.
         */
        Every = 4,
        /**
         * The data label should be displayed near custom points.
         */
        Custom = 5,
    }
    /**
     * Specifies the data label style.
     */
    enum DataLabelStyle {
        /**
         * The data label should be displayed as a callout.
         */
        Callout = 0,
        /**
         * The data label should be displayed as a badge.
         */
        Badge = 1,
    }
    /**
     * Secifies the scale used on the axis.
     */
    enum Scale {
        /**
         * Specify this scale for discrete values where the values will be mapped 1:1 on the axis.
         */
        Ordinal = 0,
        /**
         * Specify this scale for continous values like numeric values in the series which may or may not be sorted.
         */
        Linear = 1,
        /**
         * Specify this scale for date / time values in the series which may or may not be sorted.
         */
        Time = 2,
    }
    /**
     * Specifies where the axis label should be displayed.
     */
    enum AxisLabelPosition {
        /**
         * The labels are not displayed.
         */
        None = 0,
        /**
         * The labels are displayed at the low end of the axis.
         */
        Low = 1,
        /**
         * The labels are displayed at the high end of the axis.
         */
        High = 2,
    }
    /**
     * Specifies conditions checked on rendering a series view.
     */
    enum ConditionOperator {
        /**
         * The view should be rendered for series segments exceeding the argument of the condition.
         */
        GreaterThan = 0,
        /**
         * The view should be rendered for series segments not exceeding the argument of the condition.
         */
        LessThan = 1,
    }
    /**
     * Specifies series type.
     */
    enum SeriesType {
        /**
         * The series is defined as a set of pairs of x and y values.
         */
        General = 0,
        /**
         * The series is used to draw a horizontal line and is defined as with the y value.
         */
        HorizontalLine = 1,
        /**
         * The series is used to draw a vertical line and is defined as with the x value.
         */
        VerticalLine = 2,
        /**
         * The series has uniform intervals between x-values. It is defined by the start x-value, the grain and the array of y-values.
         */
        Uniform = 3,
    }
    /**
     * Defines the event data associated with chart event notifications.
     */
    interface EventData<TX, TY> {
        /**
         * Name of the series.
         */
        seriesName: string;
        /**
         * The vlaue of the current target element.
         */
        value: ChartItem<TX, TY>;
    }
    /**
     * See parent.
     */
    interface Interface<TX, TY> extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<TX, TY>;
    }
    /**
     * This class specifies data label properties.
     */
    class DataLabel<TX, TY> {
        /**
         * Defines the data label context.
         */
        context: KnockoutObservable<DataLabelContext>;
        /**
         * Defines the data label style.
         */
        style: KnockoutObservable<DataLabelStyle>;
        /**
         * Defines the data label formatter. {0} for series name, {1} for the x-value, {2} for the y-value. X and y values are formatted (date / number) the same way as the corresponding axis tick labels are.
         */
        formatter: KnockoutObservable<string>;
    }
    /**
     * This class specifies custom data label properties.
     */
    class CustomDataLabel<TX, TY> extends DataLabel<TX, TY> {
        /**
         * Defines the chart items for the data label.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
        /**
         * Defines the data label context.
         */
        context: KnockoutObservable<DataLabelContext>;
    }
    /**
     * This class specifies the chart axis properties.
     */
    class Axis<T> {
        /**
         * Name of the axis.
         */
        name: KnockoutObservable<string>;
        /**
         * Defines the type of the axis label.
         */
        scale: KnockoutObservable<Scale>;
        /**
         * A value indicating how many tick marks should be displayed.
         * This value is just a hint and actual tick marks shown will be approximated based on scale.
         */
        ticks: KnockoutObservable<number>;
        /**
         * Defines the position for the axis.
         */
        position: KnockoutObservable<AxisPosition>;
        /**
         * Defines the position index for the placement of the axis when multiple axes should be displayed on the same side.
         * A value of 0 will be placed inner most close to the chart area and value of 1 will be placed further away from
         * the chart area based on the axis label padding.
         */
        positionIndex: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the axis and all its associated entities like name, label, tick marks etc.
         */
        showAxis: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show the axis and all its associated entities like name, label, tick marks etc.
         */
        autoScaleUnit: KnockoutObservableBase<boolean>;
        /**
         * Show the axis name.
         */
        showName: KnockoutObservable<boolean>;
        /**
         * Defines the position at which to show the axis labels.
         */
        showLabel: KnockoutObservable<AxisLabelPosition>;
        /**
         * Defines the padding size for axis labels.
         * Temporary changed to 50px to fit 1000.0A/BC"
         */
        labelPadding: KnockoutObservable<number>;
        /**
         * Defines the rotation angle. By default the labels will be shown horizontally.
         * Typical rotation angle used is from 0 (horizontal) to -90 (vertically down).
         */
        rotateLabel: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the line for the axis.
         */
        showAxisLine: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show tick marks.
         */
        showTickMarks: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show grid lines.
         */
        showGridLines: KnockoutObservable<boolean>;
        /**
         * Defines the format to parse the string typed data.
         * The string value can either be a date or a number representation and the specified format will be used to parse the string value to the respective date or number type.
         */
        inputFormat: KnockoutObservable<string>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         */
        outputFormat: KnockoutObservable<string>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         * The formatter will use xSliderOutputFormat.date if data is instanceof Date.  It use the basic mechanism as Multi-Time Axis formatting as in
         * http://bl.ocks.org/mbostock/4149176 except for consistency. Please use the DataUtil format.
         * If it is a type of value, it will use the first element of the array.
         */
        xSliderOutputFormat: KnockoutObservable<string[]>;
        /**
         * Specify the axis label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be tranformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        displayLabelFormatter: KnockoutObservableBase<string>;
        /**
         * Specify the axis label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be tranformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        xSliderCalloutDisplayFormatter: KnockoutObservableBase<string>;
        /**
         * Optionally specify the minimum value for the axis domain.
         */
        min: KnockoutObservableBase<T>;
        /**
         * Optionally specify the maximum value for the axis domain.
         */
        max: KnockoutObservableBase<T>;
        /**
         * Specify the unit of the axis.
         */
        unit: KnockoutObservable<UnitConversion.Unit>;
        constructor(position?: AxisPosition, scale?: Scale);
    }
    /**
     * Defines a contract for spans such as time spans or number spans. It is used to provide a uniform substraction operation for numbers and for dates used in uniform series.
     */
    interface SpanContract<T> {
    }
    /**
     * Defines the date span used for substraction date/time intervals from dates.
     */
    class DateSpan implements SpanContract<Date> {
        /**
         * The number of years in the span.
         */
        years: number;
        /**
         * The number of months in the span.
         */
        months: number;
        /**
         * The number of days in the span.
         */
        days: number;
        /**
         * The number of hours in the span.
         */
        hours: number;
        /**
         * The number of minutes in the span.
         */
        minutes: number;
        /**
         * The number of seconds in the span.
         */
        seconds: number;
        /**
         * The number of milliseconds in the span.
         */
        milliseconds: number;
        /**
         * Creates a new instance of the DateSpan.
         *
         * @param years The number of years in the span.
         * @param months The number of months in the span.
         * @param days The number of dates in the span.
         * @param hours The number of hours in the span.
         * @param minutes The number of minutes in the span.
         * @param seconds The number of seconds in the span.
         * @param milliseconds The number of milliseconds in the span.
         */
        constructor(years: number, months: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
    }
    /**
     * Defines the date span used for substraction numbers from numbers. Need to provide a uniform interface of setting spans at uniform series.
     */
    class NumberSpan implements SpanContract<number> {
        /**
         * The span value.
         */
        value: number;
        /**
         * Creates a new instance of the NumberSpan.
         *
         * @param value The span value.
         */
        constructor(value: number);
    }
    /**
     * This base class defines the chart input data for a single series and its associated axis.
     */
    class SeriesBase {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The name of the series.
         */
        name: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a single series and its associated axis.
     */
    class Series<TX, TY> extends SeriesBase {
        /**
         * The data source for the chart.
         */
        values: KnockoutObservableArray<ChartItem<TX, TY>>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a single uniform series and its associated axis.
     */
    class UniformSeries<TX, TY> extends SeriesBase {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The start (smallest) x-value of the series.
         */
        startXValue: KnockoutObservable<TX>;
        /**
         * The span between two x neighbor x values.
         */
        span: KnockoutObservable<SpanContract<TX>>;
        /**
         * The array of y-values.
         */
        yValues: KnockoutObservableArray<TY>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
    * This class defines the chart input data for a line series and its associated axis.
    */
    class LineSeries<T> extends SeriesBase {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The data source for the line.
         */
        value: KnockoutObservable<T>;
        /**
         * Name of axis associated with the data series' value.
         */
        axisName: KnockoutObservable<string>;
    }
    /**
     * Defines utilities methods working with series.
     */
    class SeriesUtilities {
        /**
         * Returns chart items filtered by the data label.
         *
         * @param uniformSeries The uniform series.
         * @param dataLabel The data label.
         * @return The chart item array.
         */
        static getChartItemsByDataLabelAndSeries<TX, TY>(seriesBase: SeriesBase, dataLabel: DataLabel<TX, TY>): ChartItem<TX, TY>[];
        /**
         * Returns the n-th x-value of the uniform chart series.
         *
         * @param uniformSeries The uniform series.
         * @param numberOfSpans The item number.
         * @return The n-th x-value.
         */
        static getNthXValueOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>, n: number): TX;
        /**
         * Creates an array of x-value of the unform series.
         *
         * @param uniformSeries The uniform series.
         * @return The x-values array.
         */
        static createXValuesArray<TX, TY>(uniformSeries: UniformSeries<TX, TY>): TX[];
        /**
         * Returns the last x-value of the uniform series.
         *
         * @param uniformSeries The uniform series.
         * @return The last x-value.
         */
        static getLastXValueOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>): TX;
        /**
         * Returns the n-th chart item of the uniform series.
         *
         * @param uniformSeries The uniform series.
         * @param n The item number.
         * @return The chart item.
         */
        static getNthChartItemOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>, n: number): ChartItem<TX, TY>;
        /**
         * Returns the last chart item of the uniform series.
         */
        static getLastChartItemOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>): ChartItem<TX, TY>;
        /**
         * Creates a chart item array of the uniform series.
         *
         * @param uniformSeries The uniform series.
         * @return The chart item array.
         */
        static createChartItemArray<TX, TY>(uniformSeries: UniformSeries<TX, TY>): ChartItem<TX, TY>[];
        /**
         * Returns the number of values within the extent separated with the span.
         *
         * @param extent The interval defined by min and max values.
         * @param span The span used for iterating over the interval.
         * @return The whole number of items separated with the span that can be put on the extent interval.
         */
        static getCountOfValues<T>(extent: Extent<T>, span: SpanContract<T>): number;
        /**
         * Compares spans provided.
         *
         * @param span1 The first span to compare.
         * @param span2 The second span to compare.
         * @return True if spans are equal, false otherwise.
         */
        static areEqualSpans<T>(span1: SpanContract<T>, span2: SpanContract<T>): boolean;
        /**
         * Gets chart item aray by series base.
         *
         * @param seriesBase The series base.
         * @param doNotSort False if sorting by x-values is required, true otherwise.
         * @return The chart item array retrieved or generated.
         */
        static getChartItemArrayBySeriesBase<TX, TY>(seriesBase: SeriesBase, doNotSort?: boolean): ChartItem<TX, TY>[];
        /**
         * Returns the axis name associated with the series.
         *
         * @param seriesBase The series.
         * @param direction "x" or "y".
         * @return The axis name.
         */
        static getAxisName(seriesBase: SeriesBase, direction: string): string;
        static _chartItemComparerByX<TX, TY>(chartItem1: ChartItem<TX, TY>, chartItem2: ChartItem<TX, TY>): number;
        private static _getCountOfValuesForYearAndMonths(startDate, endDate, years, months, milliseconds);
        private static _getMilliseconds(dateSpan);
        private static _getChartItemsByDataLabelAndUniformSeries<TX, TY>(uniformSeries, dataLabel);
        private static _getChartItemsByDataLabelAndGeneralSeries<TX, TY>(values, dataLabel);
        private static _compareForFirst<TX, TY>(chartItem1, chartItem2);
        private static _compareForLast<TX, TY>(chartItem1, chartItem2);
        private static _compareForMin<TX, TY>(chartItem1, chartItem2);
        private static _compareForMax<TX, TY>(chartItem1, chartItem2);
        private static _compareForNull<T>(item1, item2);
        private static _compareNonNullValues<T>(item1, item2);
        private static _compareAscending<T>(item1, item2);
        private static _compareDescending<T>(item1, item2);
    }
    /**
     * Identifies a series.
    */
    class SeriesId {
        /**
         * Specifies the chart view index.
         */
        chartViewIndex: KnockoutObservable<number>;
        /**
         * Specifies the series view index.
         */
        seriesViewIndex: KnockoutObservable<number>;
    }
    /**
     * Specifies a chart item selection within a series.
     */
    class SeriesSubset<TX, TY> extends SeriesId {
        /**
         * Specifies the series index
         */
        seriesIndex: KnockoutObservable<number>;
        /**
         * Specifies an array of chart items selected.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
    }
    /**
     * Chart Event call back.
     *
     * @param x The number of x coordinate
     * @param y The number of y coordinate.
     */
    interface ChartEventCallback {
        (x?: number, y?: number): void;
    }
    /**
     * Defines the default event notification supported by the chart.
     * Line and bar chart can provide additional events by extending the base events.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class Events {
        /**
         * MouseEnter on the plot area.
         */
        plotAreaMouseEnter: ChartEventCallback;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaMouseLeave: ChartEventCallback;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaClick: ChartEventCallback;
    }
    /**
     * Defines the event notification supported by line / area / scatter plot charts.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class SeriesChartEvents<TX, TY> {
        /**
          * Click on a point.
          */
        pointClick: (data: EventData<TX, TY>) => any;
        /**
          * MouseEnter on a point.
          */
        pointMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a point.
         */
        pointMouseLeave: (data: EventData<TX, TY>) => any;
        /**
          * Click on a series.
          */
        seriesClick: (data: EventData<TX, TY>) => any;
        /**
          * MouseEnter on a series.
          */
        seriesMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a series.
         */
        seriesMouseLeave: (data: EventData<TX, TY>) => any;
    }
    /**
     * Defines the event notification supported by bar chart.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class BarChartEvents<TX, TY> {
        /**
         * Click on a bar.
         */
        barClick: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseEnter on a bar.
         */
        barMouseEnter: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseLeave on a bar.
         */
        barMouseLeave: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
    }
    /**
     * Specifies the condition used on rendering a series view.
     */
    class RenderingCondition {
        /**
         * The name of the series to be compared with.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The condition operator.
         */
        conditionOperator: KnockoutObservable<ConditionOperator>;
        /**
         * The interpolation for the series.
         */
        interpolation: KnockoutObservable<Interpolation>;
    }
    /**
     * This base class defines the how a series should be rendered on the chart.
     */
    class SeriesView<TX, TY> {
        /**
         * The name of the series.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The display name of the series.
         */
        displayName: KnockoutObservable<string>;
        /**
         * The name of the "CSS" class for the series.
         */
        cssClass: KnockoutObservable<string>;
        /**
         * Data labels for the series.
         */
        dataLabels: KnockoutObservableArray<DataLabel<TX, TY>>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
        /**
         * Specify the display formatter to show the value in the tooltip.
         * Formatter by default will add the x, y value and the asociated series name. Eg, "Series: '{0}' Point: {1} Value: {2}".
         * The default formatter is borrowed from Microsoft Excel and seems to be valueable.
         * {0} will be populated with the series name.
         * {1} will be populated with the x value.
         * {2} will be populated the y value.
         */
        tooltipFormatter: KnockoutObservable<string>;
        /**
         * Specifies an array of rendering conditions to be checked for rendering the view.
         */
        renderingConditions: KnockoutObservableArray<RenderingCondition>;
        /**
         * Indicates if the series is selectable.
         */
        selectable: KnockoutObservable<boolean>;
        /**
         * Indicates if the series is hoverable.
         */
        hoverable: KnockoutObservable<boolean>;
        /**
         * Indicates if the series is hidden from the legend
         */
        hideFromLegend: KnockoutObservable<boolean>;
    }
    /**
     * This base class defines the how a line chart series should be rendered on the chart.
     */
    class LineChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the line type for the series in the current view.
         */
        lineStyle: KnockoutObservable<LineStyle>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
        /**
         * Optionally show a circle for the data point.
         */
        showDataPoints: KnockoutObservable<boolean>;
    }
    /**
     * This base class defines the how an area chart series should be rendered on the chart.
     */
    class AreaChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the hatching pattern type for the series in the current view.
         */
        areaHatchingPattern: KnockoutObservable<Hatching.Pattern>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
    }
    /**
     * This base class defines the how a stacked area chart series should be rendered on the chart.
     */
    class StackedAreaChartSeriesView<TX, TY> extends AreaChartSeriesView<TX, TY> {
    }
    /**
     * This base class defines the how a scatter chart series should be rendered on the chart.
     */
    class ScatterChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
        /**
         * Defines the radius of circles.
         */
        radius: KnockoutObservable<number>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
    }
    class View<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<SeriesView<TX, TY>>;
    }
    class StackedChartView<TX, TY> extends View<TX, TY> {
        /**
         * When enabled, the series data can be of varying length.
         * Enabling this option will involve multiple data transformation to fill in missing values for stacking series.
         * Disable this option to speed up rendering if all data series have the same xValues.
         */
        enableSparseSeries: KnockoutObservable<boolean>;
    }
    class LineChartView<TX, TY> extends View<TX, TY> {
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<LineChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    class AreaChartView<TX, TY> extends View<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<AreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    class ScatterChartView<TX, TY> extends View<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<ScatterChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    class BarChartView<TX, TY> extends StackedChartView<TX, TY> {
        /**
         * A padding ratio which is relative to bar size. The ratio will be used as padding between two bars.
         */
        barPaddingRatio: KnockoutObservable<number>;
        /**
         * Defines the type of bar chart that needs to be rendered.
        */
        barChartType: KnockoutObservable<BarChartType>;
        /**
         * The span for the x-axis.
         */
        xAxisSpan: KnockoutObservable<SpanContract<TX>>;
        /**
         * Specify the event handlers for this view.
         */
        events: BarChartEvents<TX, TY>;
        constructor(barChartType: BarChartType);
    }
    class StackedAreaChartView<TX, TY> extends StackedChartView<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<StackedAreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
        /**
         * Whether to show StackedLine charts for the StackedArea charts.
         */
        lineState: KnockoutObservable<LineState>;
    }
    /**
     * This class defines a single data point for the chart.
     */
    class ChartItem<TX, TY> {
        /**
         * The X value for an item.
         */
        xValue: TX;
        /**
         * The Y values for an item for all series.
         */
        yValue: TY;
        constructor(xValue: TX, yValue: TY);
    }
    /**
     * This class defines a single data point for a stacked chart.
     */
    class StackedChartItem<TX, TY> extends ChartItem<TX, TY> {
        /**
         * The y0 value for an item.
         */
        y0: TY;
        constructor(xValue: TX, yValue: TY, y0: TY);
    }
    /**
     * This class defines the input data for the chart, axes and its properties.
     */
    class ViewModel<TX, TY> extends Base.ViewModel {
        /**
         * The title of the chart.
         */
        title: KnockoutObservable<string>;
        /**
         * Optionally show the title of the chart.
         * The property is temporary ignored.
         */
        showTitle: KnockoutObservable<boolean>;
        /**
         * The width of the chart.
         */
        width: KnockoutObservable<number>;
        /**
         * The height of the chart.
         */
        height: KnockoutObservable<number>;
        /**
         * The message to display when there is no chart data.
         */
        noDataMessage: string;
        /**
         * Provide an array of data series.
         */
        series: KnockoutObservableArray<SeriesBase>;
        /**
         * The X-axis of the chart. This will be the primary X-axis for the chart.
         */
        xAxis: Axis<TX>;
        /**
         * The Y-axis of the chart. This will be the primary Y-axis for the chart.
         */
        yAxis: Axis<TY>;
        /**
         * An array of secondary X-axis that can be optionally disabled.
         */
        secondaryXAxes: KnockoutObservableArray<Axis<TX>>;
        /**
         * An array of secondary Y-axis that can be optionally disabled.
         */
        secondaryYAxes: KnockoutObservableArray<Axis<TY>>;
        /**
         * An array of views that should be rendered on the chart.
         */
        views: KnockoutObservableArray<View<TX, TY>>;
        /**
         * The position where the legend should be placed. None option will not display the legend.
         */
        legendPosition: KnockoutObservable<LegendPosition>;
        /**
         * the interaction behavior
         */
        interactionBehavior: KnockoutObservable<InteractionBehavior>;
        /**
         * A value indicating whether or not to auto generate SeriesViews when there is no SeriesViews provided
         */
        autogenerateSeriesViews: KnockoutObservableBase<boolean>;
        /**
         * Events supported by the control.
         */
        events: Events;
        /**
         * Specifies selections on the chart.
         */
        seriesSelections: KnockoutObservableArray<SeriesSubset<TX, TY>>;
        /**
         * Specifies all the items related to hover on the chart.
         */
        seriesHovers: KnockoutObservableArray<SeriesSubset<TX, TY>>;
        /**
        * Specifies the items being hovered on the chart.
        */
        hoveredID: KnockoutObservableArray<SeriesId>;
        /**
         * Enable Track XSlider coordination.
         */
        enableTrackXSlider: KnockoutObservableBase<boolean>;
        /**
         * Disable MouseOut handler for XSlider
         */
        disableXSliderMouseout: KnockoutObservableBase<boolean>;
        /**
         * If enableTrackXSlider() is true, the xSliderCoordinate is reported in this variable.
         */
        xSliderCoordinate: KnockoutObservableBase<number>;
        /**
         * If xSlider is enabled, Distance from the nearest datapoint in your chart that will trigger the hover animation as a ratio (xSliderFilterHover) of the width of the chart.
         * For example, .05 means that the distance between the selected chartData can't be bigger than 0.05 * width of the chart.
         * This number can't be bigger than .5 or less than 0.  It will fall back to default behavior.
         */
        xSliderFilterHoverThreshold: KnockoutObservableBase<number>;
        constructor();
    }
    /**
     * Axis type. This enum will be used by the inherited chart controls.
     */
    enum AxisType {
        /**
         * Primary x Axis.
         */
        X = 0,
        /**
         * Primary y Axis.
         */
        Y = 1,
        /**
         * Secondary y Axis.
         */
        SecondaryX = 2,
        /**
         * Secondary y Axis.
         */
        SecondaryY = 3,
    }
    /**
     * Class to hold min / max value of the series.
     * This class will be used by the inherited chart controls.
     */
    class Extent<T> {
        /**
         * Minimum value of the series.
         */
        min: T;
        /**
         * Maximum value of the series.
         */
        max: T;
    }
    /**
     * Class to hold tick mark specific properties.
     * This class will be used by the inherited chart controls.
     */
    class Ticks {
        /**
         * Defined the number of ticks.
         */
        tickCount: number;
        /**
         * Defines ticks padding in pixels.
         */
        tickPadding: number;
        /**
         * Defines ticks mark size.
         */
        tickMarkSize: number;
        /**
         * Defines if axis labels to be shown or not.
         */
        showAxisLabel: boolean;
    }
    /**
     * Represents screen coordinates of a point.
     */
    class ScreenCoordinates {
        /**
         * Defines the x coordinate of the point.
         */
        x: number;
        /**
         * Defines the y coordinate of the point.
         */
        y: number;
    }
    /**
     * Implementation wrapper over Axis class.
     */
    class AxisWrapper<T, TX, TY> {
        internalMin: KnockoutObservable<any>;
        internalMax: KnockoutObservable<any>;
        axisPosition: KnockoutComputed<AxisPosition>;
        axisScaleType: KnockoutComputed<Scale>;
        ticks: KnockoutComputed<Ticks>;
        series: KnockoutComputed<SeriesBase[]>;
        step: KnockoutComputed<number>;
        valueScale: KnockoutComputed<any>;
        mappedAxis: KnockoutComputed<D3.Svg.Axis>;
        currentAxis: KnockoutComputed<D3.Selection>;
        currentSlider: KnockoutComputed<D3.Selection>;
        currentTicks: KnockoutComputed<D3.Selection>;
        currentSliderText: KnockoutComputed<void>;
        originalUnit: KnockoutComputed<UnitConversion.Unit>;
        conversionFactor: KnockoutComputed<number>;
        xAxisTickAdjustmentFeatureFlag: KnockoutObservable<boolean>;
        private _domain;
        private _isHorizatal;
        private _extent;
        private _lifetimeManager;
        private _convertedUnit;
        private _xSliderOutputFormatter;
        private _element;
        private _axisElement;
        private _axisType;
        private _dateParser;
        private _numericParser;
        private _filteredDomain;
        private _translateHandler;
        private _rotateAttributes;
        private _rotateAxisLabel;
        private _translate;
        private _barChartViews;
        private _scatterChartViews;
        private _maxScatterChartRadius;
        private _internalExtent;
        private _ticksCoordinateMap;
        private _range;
        private _sliderCoordinate;
        constructor(lifetimeManager: DisposableBase.LifetimeManager, element: JQuery, innerWidth: KnockoutObservableBase<number>, innerHeight: KnockoutObservableBase<number>, translateHandler: (axis: Axis<any>) => ScreenCoordinates, viewModel: ViewModel<TX, TY>, axis: Axis<any>, axisType: AxisType, sliderCoordinate?: KnockoutObservableBase<number>);
        dispose(): void;
        /**
         * Checks if a parser is assigned for the axis wrapper and if so extracts the value from the argument passed with the parser.
         */
        extractValue(value: any): any;
        getPointFormatter(customFormater?: (v: any) => string): (value: any) => string;
        /**
         * Checks for the axis wrapper update.
         */
        checkForUpdate(): void;
        private static _checkSeriesViewsReferSeries<TX, TY>(seriesName, seriesViewArray);
        private _addDisposablesToCleanUp(disposable);
        private static _getD3TimeRoundFunction(thresholdInMilliseconds);
        private static _getD3RoundFunctionObject(thresholdInMilliseconds);
        //static _d3DateIndexLookUp: ((value: Date) => boolean)[];
        static _getDateFormatingIndex(d: Date): number;
        static _getDateRoundingFunction(millisecondsToDistinguish: number): (value: Date) => Date;
        private _createGridLine(translate);
        private _checkSeriesIsDisplayedByChartTypes(seriesName, chartTypes, viewModel);
        private _hasBarChartViews();
        private _hasScatterChartViews();
        private _getPositionBaseTranslateString(format, x, y);
        private static _getCurrentTicks(currentAxis);
        private _initializeComputed2(innerWidth, innerHeight, viewModel, axis);
        static _adjustXAxisTicks(axisWidth: number, axis: Axis<any>, ticksSelection: D3.Selection, axElement: Element): void;
        static _getSVGxCoordinateValue(element: SVGElement): number;
    }
    class Widget<TX, TY> extends Base.Widget implements Interface<TX, TY> {
        _width: KnockoutComputed<number>;
        _height: KnockoutComputed<number>;
        _chartDataClassTransform: KnockoutComputed<string>;
        _topMargin: KnockoutComputed<number>;
        _bottomMargin: KnockoutComputed<number>;
        _leftMargin: KnockoutComputed<number>;
        _rightMargin: KnockoutComputed<number>;
        _transformChartArea: KnockoutComputed<void>;
        _chartSizeUpdated: KnockoutComputed<number>;
        _chartDataUpdated: KnockoutComputed<number>;
        _sizeUpdateCounter: number;
        _dataUpdateCounter: number;
        _xAxesLifetimeManager: DisposableBase.DisposableLifetimeManager;
        _yAxesLifetimeManager: DisposableBase.DisposableLifetimeManager;
        _xAxes: KnockoutComputed<AxisWrapper<TX, TX, TY>[]>;
        _yAxes: KnockoutComputed<AxisWrapper<TY, TX, TY>[]>;
        _mappedXAxisIndex: number[];
        _mappedYAxisIndex: number[];
        _widgetSvg: D3.Selection;
        _chartSvg: D3.Selection;
        _backgroundSvg: D3.Selection;
        _axisElement: D3.Selection;
        _legendSvg: D3.Selection;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel<any, any>, createOptions?: Base.CreateOptions);
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
        options: ViewModel<TX, TY>;
        /**
         * Handles mouse move event.
         */
        _mouseMoveHandler(): void;
        /**
         * Handles mouse out event.
         */
        _mouseOutHandler(event?: MouseEvent): void;
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel<TX, TY>): void;
        _getXSliderCoordinate: KnockoutObservableBase<number>;
        _checkForChartUpdate(): boolean;
        /**
         * The method is invoked whenever the input series data is updated.
         */
        _onChartDataUpdated(): void;
        /**
         * The method is invoked whenever the chart size is updated.
         */
        _onChartSizeUpdated(): void;
        /**
         * The method is invoked when mouse enters the chart plot area.
         */
        _plotAreaMouseEnter(): void;
        /**
         * The method is invoked when mouse leaves the chart plot area.
         */
        _plotAreaMouseLeave(): void;
        /**
         * The method is invoked when mouse moves in the chart plot area.
         */
        _plotAreaMouseMove(): void;
        /**
         * The method is invoked when mouse is clicked on the chart plot area.
         */
        _plotAreaClick(): void;
        _mapSeriesToAxis(): void;
        _getMappedAxisIndex(axisProperty: string, axisName: string): number;
        _isHorizontalChart(): boolean;
        _initializeComputed2(): void;
        private _chartSizeChanged();
        private _initialize();
        private _getAxisTranslate(axis);
        private _computeAxisMargin(axis, position, currentMargin);
        private _computeMargin(position);
        private _getDefaultPadding(position);
        private static _getDefaultMargin<T>(position, axis);
    }
}
