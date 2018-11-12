/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import DisposableBase = require("../../Base/Base.Disposable");
export = Main;
declare module Main {
    /**
     * Specifies an events creation mode.
     */
    enum EventCreationMode {
        /**
         * All event handlers must be set.
         */
        All = 0,
        /**
         * All event handlers must be set except mouseLeave.
         */
        IgnoreMouseLeave = 1,
        /**
         * All event handlers must be set except mouseOver.
         */
        IgnoreMouseOver = 2,
    }
    /**
     * Base Class for Chart Series View Implementation.
     */
    class SeriesViewImpl<TX, TY> {
        lifetimeManager: DisposableBase.DisposableLifetimeManager;
        renderLifetimeManager: DisposableBase.DisposableLifetimeManager;
        _viewImpl: ChartViewImpl<TX, TY>;
        _seriesBase: ChartBase.SeriesBase;
        _seriesViewIndex: number;
        _seriesIndex: number;
        _seriesName: string;
        _seriesView: ChartBase.SeriesView<TX, TY>;
        _noItemDataMessage: string;
        _xAxis: ChartBase.AxisWrapper<TX, TX, TY>;
        _yAxis: ChartBase.AxisWrapper<TY, TX, TY>;
        _selectedPointRadiusAddition: number;
        _hoveredPointRadiusAddition: number;
        _touchPointRadiusAddition: number;
        private _chartItemsLifetimeManager;
        /**
        * We are doing the chartItems's xCoordinate caculation over and over per hover.
        * This computed is here to caculate only once and cache if someone ever hover it inside.
        * Then the following one only update the xDistance.
        */
        private _chartItemsComputed;
        private _chartItemsSortByCoordinate;
        constructor(viewImpl: ChartViewImpl<TX, TY>, seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>);
        /**
         * Destroys the object.
         */
        dispose(): void;
        /**
         * Static function to caculate the last chartItem.
         *
         * @param items with chartItem which is already sorted by xCoordinate.
         * @returnitems with chartItem
         */
        static _selectLastItem<TX, TY>(items: {
            chartItem: ChartBase.ChartItem<TX, TY>;
            xCoordinate: number;
            xDistance: number;
        }[], withinRange: number, rangeAdjustment: number): ChartBase.ChartItem<TX, TY>;
        /**
         * Static function to calculate the closest point of the calculate distance.
         *
         * @param items with chartItem
         */
        static _selectClosestItem<TX, TY>(items: {
            chartItem: ChartBase.ChartItem<TX, TY>;
            xCoordinate: number;
            xDistance: number;
        }[], withinRange: number, rangeAdjustment: number): ChartBase.ChartItem<TX, TY>;
        /**
         * Utility to return the select chartItem base on current xCoordinate.
         *
         * @param xCoordinate of current slider.
         * @options  rangeAdjustment (if item has a width, for example  barChart item, it will have the item adjustment width.
         *           selectFunction: custom select function to pick the closest point. SeriesViewImpl.selectClosestItem or SeriesViewImpl.selectLastItem are good example to see how to implement it.
         */
        selectChartItemFromXCoordinate(xCoordinate: number, options: {
            rangeAdjustment?: number;
            withinRange?: number;
            selectFunction?: (items: {
                chartItem: ChartBase.ChartItem<TX, TY>;
                xCoordinate: number;
                xDistance: number;
            }[], withinRange: number, adjustment: number) => ChartBase.ChartItem<TX, TY>;
        }): ChartBase.ChartItem<TX, TY>;
        /**
         * Sets the series hover in the viewModel for a specific series.
         *
         * @param seriesViewIndex The seriesIndex to be toggled in the selection.
         * @param chartItem The chart item to be toggled in the selection.
         * @param hovered The requested hover state.
         */
        setSeriesHover(chartItem: ChartBase.ChartItem<TX, TY>, hovered: boolean): void;
        _disposeRenderDisposables(): void;
        /**
         * Maps the user provided x axis data to the x axis coordinate.
         *
         * @param xValue The user provided x axis data.
         * @return x coordinate.
         */
        _getScreenX(xValue: TX): number;
        /**
         * Maps the user provided y axis data to the y axis coordinate.
         *
         * @param yValue The user provided y axis data.
         * @return y coordinate.
         */
        _getScreenY(yValue: TY): number;
        _toggleSeriesSelection(chartItem: ChartBase.ChartItem<TX, TY>): void;
        /**
         * Attaches computed to the series element.
         *
         * @param seriesElement The series element selection.
         */
        _attachSeriesComputeds(seriesElement: D3.Selection): void;
        _eventHandlerWrapper(eventType: string, d: ChartBase.ChartItem<TX, TY>): void;
        _getChartItemArray(doNotSort?: boolean): ChartBase.ChartItem<TX, TY>[];
        _createArea(elementToApply: D3.Selection, interpolation?: ChartBase.Interpolation, isInverse?: boolean): D3.Selection;
        _createGeneralLine(interpolation: ChartBase.Interpolation): D3.Svg.Line;
        _renderSeries(): void;
        _createElement(cssClass: string): D3.Selection;
        _renderTooltips(): void;
        _createSelectedPlots(sourceElement: D3.Selection): D3.Selection;
        _createHover(sourceElement: D3.Selection): void;
        _getHoveredChartItems(): ChartBase.ChartItem<TX, TY>[];
        _getSelectedChartItems(): ChartBase.ChartItem<TX, TY>[];
        _createHoveredPlots(sourceElement: D3.Selection, hoveredChartItems: ChartBase.ChartItem<TX, TY>[]): void;
        _createDataPlots(sourceElement: D3.Selection, additionToRadius?: number): D3.Selection;
        _createPlots(sourceElement: D3.Selection, values: ChartBase.ChartItem<TX, TY>[], cssClass: string, additionToRadius?: number, eventCreationMode?: EventCreationMode): D3.Selection;
        _addTooltips(plots: D3.Selection): void;
        _applyRenderingConditions(selectionToAdd: D3.Selection, selectionToApply: D3.Selection): void;
        _createSeriesElement(): D3.Selection;
        _getInterpolation<TX, TY>(): ChartBase.Interpolation;
        _renderDataLabels(): void;
        _createHorizontalLine(yValue: TY, xValue?: TX): D3.Svg.Line;
        _createVerticalLine(xValue: TX, yValue?: TY): D3.Svg.Line;
        private static _getInterpolationString(interpolation);
        private static _getUniqueId();
        private _getChartItems(seriesIndex);
        private _createHorizontalArea(selectionToApply, isInverse?);
        private _createGeneralArea(interpolation, isInverse?);
        private _createVerticalArea(selectionToApply, isInverse?);
        private _renderDataLabel(chartItem, dataLabel, xAxis, yAxis);
        private _createClipPath(frame);
        private _createHoverProjections(selection, chartItem);
        private _filterChartItems(seriesSubset);
    }
    /**
     * Base Class for Line, Area and Scatter Plot Chart View Implementation.
     */
    class ChartViewImpl<TX, TY> {
        /**
         * Defines the view model for the implementation.
         */
        options: ChartBase.ViewModel<TX, TY>;
        /**
         * Defines the height of the view.
         */
        height: number;
        /**
         * Defines the width of the view.
         */
        width: number;
        /**
         * Defines x axes of the view.
         */
        xAxes: ChartBase.AxisWrapper<TX, TX, TY>[];
        /**
         * Defines y axes of the view.
         */
        yAxes: ChartBase.AxisWrapper<TY, TX, TY>[];
        /**
         * Defines mapped x axes indexes of the view.
         */
        mappedXAxisIndex: number[];
        /**
         * Defines mapped y axes indexes of the view.
         */
        mappedYAxisIndex: number[];
        /**
         * Defines the dictionary mapping series index by series name.
         */
        seriesIndexDictionary: {
            [name: string]: number;
        };
        /**
         * Defines the d3 element used as a view container.
         */
        element: D3.Selection;
        /**
         * Items to be disposed with the view.
         */
        lifetimeManager: DisposableBase.DisposableLifetimeManager;
        /**
         * Items to be disposed with each rendering.
        */
        renderLifetimeManager: DisposableBase.DisposableLifetimeManager;
        /**
         * Series view implementations.
         */
        seriesViewImpls: SeriesViewImpl<TX, TY>[];
        /**
         * Defines if the chart is horizontal or vertical.
         */
        isHorizontalChart: boolean;
        /**
         * Specifies the mouse move handler.
         */
        mouseMoveHandler: () => void;
        /**
         * Specifies the mouse out handler.
         */
        mouseOutHandler: () => void;
        /**
         * Specifies the index of the view.
         */
        chartViewIndex: number;
        /**
         * Specifies if we need to reverse the seriesViews (to display them correctly on stacked charts).
         **/
        reversed: boolean;
        _viewClass: string;
        _view: ChartBase.View<TX, TY>;
        seriesViews: ChartBase.SeriesView<TX, TY>[];
        series: ChartBase.SeriesBase[];
        /**
         * Initializes the view.
         */
        init(lifetimeManager: DisposableBase.LifetimeManager): void;
        /**
         * Destroys the view.
         */
        dispose(): void;
        /**
         * Toggles the series selection in the viewModel.
         *
         * @param seriesViewIndex The seriesIndex to be toggled in the selection.
         * @param chartItem The chart item to be toggled in the selection.
         */
        toggleSeriesSelection(seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>): void;
        /**
         * Returns a subset of series closest (at the left hand side) to the xCoordinate.
         *
         * @param xCoordinate The x-axis coordinate.
         * @param rangeAdjustment Optional to allow for Barchart step adjustment for the closest/lastest point to consider.
         * @return The subset of series and their chart items.
         */
        getXSliceSeriesSubset(xCoordinate: number, withinRange: number, rangeAdjustment?: number): ChartBase.SeriesSubset<TX, TY>[];
        /**
         * Iterates over series views of the chart view and executes the iterator method. If the chart view contains no series, it iterates over all series of the view model.
         *
         * @param viewImpl The view implementation containing all series in the view model and also used as a context for the method executed.
         * @param chartView The chart view to be iterated on.
         * @param delegate The delegate method to be executed for each series view.
         * @return The array of results returned by delegates.
         */
        static _iterateOverSeriesView<TX, TY>(viewImpl: ChartViewImpl<TX, TY>, chartView: ChartBase.View<TX, TY>, delegate: (seriesViewImpl: SeriesViewImpl<TX, TY>) => any): any;
        /**
         * Gets default css class using index.
         *
         * @param seriesIndex A series's index number in the series property.
         */
        static _getDefaultCssClassByIndex(seriesIndex: number): string;
        /**
         * Gets css class of a series view, if it is not defined by user then return a calculated css class using series index.
         *
         * @param seriesIndex A series's index number in the series property.
         * @param seriesView The series view.
         */
        static _getCssClass<TX, TY>(seriesIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): string;
        /**
         * A view hook that allows transforming plot chart items if projection transformations are required.
         * An example is for stacked series, where y values are transformed into y + y0.
         */
        _transformPlotValues(values: ChartBase.ChartItem<TX, TY>[], seriesViewIndex: number): ChartBase.ChartItem<TX, TY>[];
        /**
         * A view hook that allows for reacting to a single plot point being clicked.
         */
        _toggleSinglePlotSelection(seriesViewIndex: number): void;
        /**
         * Disposes any disposables that have been added in a previous render.
         */
        _disposeRenderDisposables(): void;
        /**
         * Disposes any disposables within series view implementations.
         */
        _disposeSeriesViewImpls(): void;
        /**
         * Attaches computed to the series element.
         *
         * @param seriesElement The series element selection.
         * @param seriesView The series view associated with the series or null if there isn't one.
         * @param seriesViewIndex The view index of the series.
         */
        _attachSeriesComputeds(seriesElement: D3.Selection, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>, updateHoverClass?: boolean): void;
        /**
         * Maps the user provided x axis data to the x axis coordinate.
         *
         * @param seriesIndex The index of the series.
         * @param xValue The user provided x axis data.
         *
         * @return x coordinate.
         */
        _getScreenX(seriesIndex: number, xValue: TX): number;
        /**
         * Maps the user provided y axis data to the y axis coordinate.
         *
         * @param seriesIndex The index of the series.
         * @param yValue The user provided y axis data.
         *
         * @return y coordinate.
         */
        _getScreenY(seriesIndex: number, yValue: TY): number;
        _getEvents(): ChartBase.SeriesChartEvents<TX, TY>;
        _createClipPathSelection(renderingCondition: ChartBase.RenderingCondition, clipPath: D3.Selection): boolean;
        _createSeriesViewImpl(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): SeriesViewImpl<TX, TY>;
        _render(): void;
        _getHoveredSeriesViewIndexes(): number[];
        _getSeriesViewBySeriesViewIndex(seriesViewIndex: number): ChartBase.SeriesView<TX, TY>;
        _getSeriesIndexBySeriesViewIndex(seriesViewIndex: number): number;
        private _getChartItems(seriesIndex);
        private _getSeriesViewImpl(seriesBase, seriesViewIndex, seriesView);
    }
}
