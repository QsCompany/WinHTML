/// <reference path="../../../../Definitions/knockout.extensionstypes.d.ts" />
import TemplateEngine = require("../../../Util/TemplateEngine");
import Promise = require("../../Base/Promise");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IScrollableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: ScrollableOptions;
    }
    interface ScrollableDataProvider {
        /**
         * The total count of data items.
         */
        totalItemCount: KnockoutObservableBase<number>;
        /**
         * Gets the requested items from the client cache or from the data provider.
         */
        fetch(skip: number, take: number): Promise.PromiseV<Grid.Item[]>;
    }
    interface ScrollableOptions {
        /**
         * Data provider for enabling virtual scrolling.
         */
        dataProvider?: ScrollableDataProvider;
        /**
         * Viewport refreshing time.
         */
        updateViewportAsyncDebounceTime?: number;
        /**
         * Default row height.
         */
        defaultRowHeight?: number;
    }
    enum AsyncItemState {
        /**
         * The item is loading.
         */
        Loading = 0,
        /**
         * The item has been loaded.
         */
        Loaded = 1,
        /**
         * There was a error loading the item.
         */
        Error = 2,
    }
    class AsyncItem {
        /**
         * The current loading state of the item.
         */
        state: KnockoutObservable<AsyncItemState>;
        /**
         * The data item when it is loaded.
         */
        item: KnockoutObservable<Grid.Item>;
        /**
         * The index of the item in the dataset.
         */
        index: number;
        /**
         * The template to use for rendering the item depending on state.
         */
        template: KnockoutObservableBase<string>;
        /**
         * Constructs an async item for display in the virtualized grid.
         */
        constructor(index: number, state: AsyncItemState, item: Grid.Item);
    }
    class ScrollableExtension extends Grid.Extension implements IScrollableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        /**
         * Items that load asyncronously.
         */
        asyncItems: KnockoutObservableArray<AsyncItem>;
        private static _updateViewportAsyncDebounceTime;
        private static _asyncItemCacheSize;
        private static _defaultRowHeight;
        private static _maxElementHeightFactor;
        private static _defaultRequestCount;
        private _options;
        private _updateViewportAsyncTimeout;
        private _latestRequest;
        private _asyncItemCache;
        private _resizeTracker;
        private _scrollHandler;
        private _totalItemCountSubscription;
        private _scrollContainer;
        /**
         * Creates the scrollable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: ScrollableOptions);
        /**
         * Gets the options of the plugin.
         */
        options: ScrollableOptions;
        /**
         * Indicates if virtual scrolling is enabled.
         */
        virtualScrolling: boolean;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See inteface.
         */
        getDefaultColumnProperties(): any;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * Resets navigation to the starting position.
         * Puts the scrollbar back to the top and clears any cached data.
         */
        reset(): void;
        /**
         * Gets the default scrollable options.
         *
         * @return The default options.
         */
        private _getDefaultScrollableOptions();
        /**
         * Clears the async item cache.
         */
        private _resetAsyncItemCache();
        /**
         * Updates the table header horizontal position and width and height for the scroll container as needed.
         */
        private _updateHeader();
        /**
         * Updates the table layout for scrollbars.
         * This occurs on overy scroll event and should be quick to keep the scrollbars responsive.
         */
        private _update();
        /**
         * Triggers a debounced async update to the viewport for virtualized data.
         */
        private _updateViewportAsync();
        /**
         * Gets the row height to use for calculating virtual row positions.
         *
         * @return The row hight in pixels.
         */
        private _getRowHeight();
        /**
         * Gets the total scroll height accounting for browser limitations.
         *
         * @return The total scroll height in pixels.
         */
        private _getTotalScrollHeight(totalRows, rowHeight);
        /**
         * Updates the table container height so the scrollHeight does not re-adjust as we alter the table.
         */
        private _updateContentHeight(height);
        /**
         * Updates the buffer wow height.
         */
        private _updateAboveRowHeight(height);
        /**
         * Updates the viewport for virtualized data.
         */
        private _updateViewport();
        /**
         * Merges the newly fetched async items with the current items as needed.
         *
         * @param requestedItems The newly requested items to render in the grid.
         */
        private _render(requestedItems);
        /**
         * Pushes the latest requested items into the grid.
         *
         * @param items The grid items.
         */
        private _updateGridItems(items);
        /**
         * Requests the data from the provider.
         *
         * @param start The starting position in the data.
         * @param count The number of data items to render.
         * @return The async items.
         */
        private _request(start, count);
        /**
         * See interface.
         */
        shouldRetainRowMetadata(rowMetadata: Grid.RowMetadata): boolean;
        /**
         * Scrolls the grid to the specified index.
         *
         * @param index The index within the total rows where to scroll the grid.
         */
        scrollTo(index: number): void;
    }
}
