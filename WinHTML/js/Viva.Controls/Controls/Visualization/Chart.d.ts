/// <reference path="../../../Definitions/d3.d.ts" />
import ChartBase = require("./ChartBase");
import Base = require("../Base/Base");
import ChartViewImpl = require("./ChartViewImpl");
export = Main;
declare module Main {
    class Widget<TX, TY> extends ChartBase.Widget<TX, TY> implements ChartBase.Interface<TX, TY> {
        private _internalViewImplsArray;
        private _internalViewImplsArrayIsCurrent;
        private _internalSeriesIndexDictionary;
        private _xSliceHoverCoordinate;
        private _xSliceHoverTrackComputed;
        private _xSliderCoordinateSubscription;
        private _inRenderXSliceHover;
        private _chartDataImmediateUpdated;
        private _chartDataImmediateUpdatedCounter;
        private _xSliderSvg;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ChartBase.ViewModel<TX, TY>, createOptions?: Base.CreateOptions);
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
        options: ChartBase.ViewModel<TX, TY>;
        /**
         * Toggles the series selection in the viewModel.
         *
         * @param chartViewIndex The chartViewIndex to be toggled in the selection.
         * @param seriesViewIndex The seriesIndex to be toggled in the selection.
         * @param chartItem The chart item to be toggled in the selection.
         */
        toggleSeriesSelection(chartViewIndex: number, seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>): void;
        /**
         * get SeriesName given the index and seriesView.
         *
         * @param chartViewIndex The chartViewIndex to be toggled in the selection.
         * @param seriesViewIndex The seriesIndex to be toggled in the selection.
         * @return seriesName
         */
        getSeriesName(chartViewIndex: number, seriesViewIndex: number): string;
        /**
         * get seriesIndex given the seriesViewIndex and seriesView.
         *
         * @param chartViewIndex The chartViewIndex to be toggled in the selection.
         * @param seriesViewIndex The seriesViewIndex to be toggled in the selection.
         * @return seriesIndex
         */
        getSeriesIndexForSeriesViewIndex(chartViewIndex: number, seriesViewIndex: number): number;
        /**
         * get seriesViews given the seriesIndex and viewIndex.
         *
         * @param chartViewIndex The chartViewIndex to search in.
         * @param seriesIndex The seriesIndex to be searched.
         * @return seriesViews
         */
        getSeriesViewsForSeriesIndex(chartViewIndex: number, dataSeriesIndex: number): ChartViewImpl.SeriesViewImpl<TX, TY>[];
        /**
         * Sets the series hover in the viewModel for a specific series.
         *
         * @param chartViewIndex The chartViewIndex to be toggled in the selection.
         * @param seriesViewIndex The seriesIndex to be toggled in the selection.
         * @param chartItem The chart item to be toggled in the selection.
         * @param hovered The requested hover state.
         */
        setSeriesHover(chartViewIndex: number, seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>, hovered: boolean): void;
        /**
         * Returns the series index by the series name.
         *
         * @param seriesName The series name.
         * @return The series index.
         */
        getSeriesIndexBySeriesName(seriesName: string): number;
        /**
         * Returns the axis index of the x-axis mapped to the series.
         *
         * @param seriesIndex The series index.
         * @return The axis index.
         */
        getXAxisIndexBySeriesIndex(seriesIndex: number): number;
        /**
         * Returns the axis index of the y-axis mapped to the series.
         *
         * @param seriesIndex The series index.
         * @return The axis index.
         */
        getYAxisIndexBySeriesIndex(seriesIndex: number): number;
        /**
         * Renders the x-slice hover and projections.
         *
         * @param xCoordinate The x-coordinate used for the time slice.
         */
        _renderXSliceHover(xCoordinate: number): void;
        /**
         * Cleans the x-slice hover and projections.
         */
        _cleanXSliceHover(preserveSeriesHovers?: boolean): void;
        _init(): void;
        _render(): void;
        /**
         * The method is invoked whenever the input series data is updated.
         */
        _onChartDataUpdated(): void;
        /**
         * See parent.
         */
        _onChartSizeUpdated(): void;
        /**
         * See parent.
         */
        _plotAreaMouseEnter(): void;
        /**
         * See parent.
         */
        _plotAreaMouseMove(): void;
        /**
         * See parent.
         */
        _plotAreaMouseLeave(): void;
        /**
         * See parent.
         */
        _plotAreaClick(): void;
        _cleanup(): void;
        _checkForChartUpdate(): boolean;
        _getXSliderCoordinate: KnockoutObservableBase<number>;
        /**
         * Handles mouse move event.
         */
        _mouseMoveHandler(): void;
        /**
         * Handles mouse out event.
         */
        _mouseOutHandler(event?: MouseEvent): void;
        private _seriesIndexDictionary;
        private _viewImplsArray;
        private _immediateSeriesUpdated();
        private _reInitViewImplArray();
        private static _checkForUpdateSeriesView<TX, TY>(seriesView);
        private static _checkForUpdateDataLabels<TX, TY>(dataLabels);
        private static _checkForUpdateRenderingConditions(renderingConditions);
        private _applyWithCoordinates(func);
        /**
         * gets the mouse position given the element.
         *
         * @param elem optional element to get coordinate from.  Default to this._chartSvg.node().
         */
        private _getCoordinates(elem?);
        private _checkForNoData();
        private static _createSeriesDictionary<TX, TY>(seriesArray);
        private _renderXSlice(xCoordinate, preserveSeriesHovers?);
        private _createXAxisSliceHover(xCoordinate);
    }
}
