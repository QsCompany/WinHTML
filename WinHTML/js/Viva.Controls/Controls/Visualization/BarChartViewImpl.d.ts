/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import StackedChartViewImpl = require("./StackedChartViewImpl");
import DisposableBase = require("../../Base/Base.Disposable");
export = Main;
declare module Main {
    class BarChartSeriesViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartSeriesViewImpl<TX, TY> {
        /**
         * Attaches computed to the items element.
         *
         * @param chartItemElement The items element selection.
         */
        _attachItemsComputeds(chartItemElement: D3.Selection): void;
        /**
         * Attaches computed to the series element.
         *
         * @param seriesElement The series element selection.
         */
        _attachSeriesComputeds(seriesElement: D3.Selection): void;
        private _checkElementBelongsToChartItems(chartItemElement, chartItems);
    }
    /**
     * Bar chart view implementation.
     * Supports stacked, grouped and split bar chart rendering.
     */
    class BarChartViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartViewImpl<TX, TY> {
        _view: ChartBase.BarChartView<TX, TY>;
        private _bars;
        private _barScale;
        private _barWidth;
        private _barWidthOffset;
        private _groupedBarWidth;
        private _step;
        /**
         * Creates a new instance of the View Implementation.
         *
         * @param barChartView The bar chart view to be implemented.
         */
        constructor(barChartView: ChartBase.BarChartView<TX, TY>);
        /**
         * Initializes the view.
         */
        init(lifetimeManager: DisposableBase.LifetimeManager): void;
        /**
         * Destroys the view.
         */
        dispose(): void;
        /**
         * Returns a subset of series closest (at the left hand side) to the xCoordinate.
         *
         * @param xCoordinate The x-axis coordinate.
         * @return The subset of series and their chart items.
         */
        getXSliceSeriesSubset(xCoordinate: number, withinRange: number, rangeAdjustment?: number): ChartBase.SeriesSubset<TX, TY>[];
        _render(): void;
        _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): BarChartSeriesViewImpl<TX, TY>;
        private _barMouseEnter(eventData, allBarsEventData?);
        private _barMouseLeave(eventData, allBarsEventData?);
        private _barMouseClick(eventData, allBarsEventData?);
        private _eventHandlerWrapper(eventType, d, i);
        _initializeChartData(): void;
        private _getXOffset(d, isHorizontal?);
        private _getEventData(d, i);
        private _initializeBarSize();
        private _renderStackedBarChart();
        private _renderGroupedBarChart();
        private _renderSplitBarChart();
    }
}
