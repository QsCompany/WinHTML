/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import ChartViewImpl = require("./ChartViewImpl");
export = Main;
declare module Main {
    /**
     * Scatter chart series view implementation.
     */
    class ScatterChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
        constructor(viewImpl: ChartViewImpl.ChartViewImpl<TX, TY>, seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>);
        _renderSeries(): void;
        _renderTooltips(): void;
    }
    /**
     * Scatter chart view implementation.
     */
    class ScatterChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
        _view: ChartBase.ScatterChartView<TX, TY>;
        /**
         * Creates a new instance of the View Implementation.
         */
        constructor(scatterChartView: ChartBase.ScatterChartView<TX, TY>);
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): ScatterChartSeriesViewImpl<TX, TY>;
    }
}
