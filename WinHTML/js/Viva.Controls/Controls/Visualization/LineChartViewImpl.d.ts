/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import ChartViewImpl = require("./ChartViewImpl");
export = Main;
declare module Main {
    /**
     * Line chart series view implementation.
     */
    class LineChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
        _renderSeries(): void;
        private static _getLineStyleString(lineStyle);
        private _createLineString(interpolation);
    }
    /**
     * Line chart view implementation.
     */
    class LineChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
        _view: ChartBase.LineChartView<TX, TY>;
        /**
         * Creates a new instance of the View Implementation.
         */
        constructor(lineChartView: ChartBase.LineChartView<TX, TY>);
        /**
         * Destroys the view.
         */
        dispose(): void;
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): LineChartSeriesViewImpl<TX, TY>;
    }
}
