/// <reference path="../../../Definitions/d3.d.ts" />
import ChartViewImpl = require("./ChartViewImpl");
import ChartBase = require("./ChartBase");
export = Main;
declare module Main {
    /**
     * Internal interface for data passed to the D3 layer.
     */
    interface ChartItemInternal<TX, TY> {
        /**
         * The x value representing chart item. The value can differ from original when applying formatting required by d3.layout.stack.
         * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
         */
        x: any;
        /**
         * The y value representing chart item. The value can differ from original when applying formatting required by d3.layout.stack.
         * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
         */
        y: any;
        /**
         * The original x value representing chart item.
         * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
         */
        originalX: TX;
        /**
         * The original y value representing chart item.
         * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
         */
        originalY: TY;
        /**
         * The series view index to associate the x, y values.
         */
        seriesViewIndex: number;
        /**
         * The y0 value of the point, used in stacked charts.
         */
        y0?: TY;
    }
    class StackedChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
    }
    /**
     * Stacked chart view implementation.
     * Supports stacked chart rendering.
     */
    class StackedChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
        _view: ChartBase.StackedChartView<TX, TY>;
        _layers: any;
        _yStackMax: any;
        /**
         * Creates a new instance of the View Implementation.
         *
         * @param stackedChartView The stacked chart view to be implemented.
         */
        constructor(stackedChartView: ChartBase.StackedChartView<TX, TY>);
        /**
         * Destroys the view.
         */
        dispose(): void;
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): StackedChartSeriesViewImpl<TX, TY>;
        static _allocArray(value: any, length: number): any[];
        _getNumberOfSeries(): number;
        _getStringValue(value: any): string;
        _getSparseSeriesStackLayer(): any;
        _getDenseSeriesStackLayer(): any;
        _getStackLayer(): any;
        _initializeChartData(): void;
    }
}
