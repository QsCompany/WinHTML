/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import StackedChartViewImpl = require("./StackedChartViewImpl");
import DisposableBase = require("../../Base/Base.Disposable");
export = Main;
declare module Main {
    class StackedAreaChartSeriesViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartSeriesViewImpl<TX, TY> {
        /**
         * Attaches computed to the stacked area series element.
         *
         * @param seriesElement The series element selection.
         */
        _attachAreaSeriesComputeds(seriesElement: D3.Selection): void;
        /**
         * Attaches computed to the stacked line series element.
         *
         * @param seriesElement The series element selection.
         */
        _attachLineSeriesComputeds(seriesElement: D3.Selection): void;
    }
    /**
     * Stacked Area chart view implementation.
     */
    class StackedAreaChartViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartViewImpl<TX, TY> {
        _view: ChartBase.StackedAreaChartView<TX, TY>;
        private _areas;
        private _lines;
        /**
         * Creates a new instance of the View Implementation.
         *
         * @param stackedAreaChartView The stacked area chart view to be implemented.
         */
        constructor(stackedAreaChartView: ChartBase.StackedAreaChartView<TX, TY>);
        /**
         * Initializes the view.
         */
        init(lifetimeManager: DisposableBase.LifetimeManager): void;
        /**
         * Destroys the view.
         */
        dispose(): void;
        _initializeChartData(): void;
        _render(): void;
        /**
         * Creates the stacked area graphics and attaches hover and click events.
         */
        _createStackedAreas(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>): void;
        /**
         * Return the SVG shape definition for the stacked area.
         */
        _getStackedAreaShape(yAxisIndex: number): D3.Svg.Area;
        /**
         * Creates the stacked line graphics and attaches hover and click events.
         */
        _createStackedLines(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>, lineState: ChartBase.LineState): void;
        /**
         * Return the SVG shape definition for the stacked lines.
         */
        _getStackedLinesShape(yAxisIndex: number): D3.Svg.Line;
        _setStackedAreaSeriesHover(selection: D3.Selection, i: number, hovered: boolean): void;
        _setStackedLineSeriesHover(selection: D3.Selection, hovered: boolean): void;
        _setStackedLineSeriesSelected(selection: D3.Selection, selected: boolean): void;
        /**
         * Create the plots that will show on the lines and map to individual data points.
         */
        _createStackedLinePlots(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>): void;
        /**
         * Transform the plot chart items by appending a y0 property to be used to project
         * stacked y values.
         */
        _transformPlotValues(values: ChartBase.ChartItem<TX, TY>[], seriesViewIndex: number): ChartBase.ChartItem<TX, TY>[];
        /**
         * A view hook that allows for reacting to a single plot point being clicked.
         */
        _toggleSinglePlotSelection(seriesViewIndex: number): void;
        private _markNotSelected();
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): StackedAreaChartSeriesViewImpl<TX, TY>;
    }
}
