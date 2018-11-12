/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import ChartViewImpl = require("./ChartViewImpl");
export = Main;
declare module Main {
    /**
     * Area chart series view implementation.
     */
    class AreaChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
        _renderSeries(): void;
        _createSelectedPlots(sourceElement: D3.Selection): D3.Selection;
        _createHoveredPlots(sourceElement: D3.Selection, hoveredChartItems: ChartBase.ChartItem<TX, TY>[]): void;
    }
    /**
     * Area chart view implementation.
     */
    class AreaChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
        _view: ChartBase.AreaChartView<TX, TY>;
        /**
         * Creates a new instance of the View Implementation.
         */
        constructor(areaChartView: ChartBase.AreaChartView<TX, TY>);
        /**
         * Destroys the view.
         */
        dispose(): void;
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): AreaChartSeriesViewImpl<TX, TY>;
    }
}
