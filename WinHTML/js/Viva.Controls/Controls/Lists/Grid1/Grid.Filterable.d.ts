import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IFilterableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: FilterableOptions;
    }
    interface FilterableRowMetadata extends Grid.RowMetadata {
    }
    interface FilterableOptions {
        /**
         * Whether the filter search box is visible or not.
         */
        searchBoxVisible?: KnockoutObservableBase<boolean>;
        /**
         * Whether the filter search box close button is visible or not.
         */
        searchBoxCloseButtonVisible?: KnockoutObservableBase<boolean>;
        /**
         * The placeholder for the searchbox when it's not active.
         */
        searchBoxPlaceholder?: KnockoutObservable<string>;
        /**
         * The subset of columns (specified by their itemKey string) to search through.
         */
        searchableColumns?: KnockoutObservableArray<string>;
    }
    class FilterableExtension extends Grid.Extension implements IFilterableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        private _searchBoxViewModel;
        private _filterActive;
        private _queryEntryTimeoutId;
        private _columnMap;
        private _columnNumberMap;
        private _displayedColumns;
        private _results;
        private _resultTokenMap;
        /**
         * Creates the filterable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: FilterableOptions);
        /**
         * Gets whether there's an active filter or not.
         */
        filterActive: KnockoutObservable<boolean>;
        /**
         * Gets the options of the plugin.
         */
        options: FilterableOptions;
        /**
         * Gets the results of the plugin.
         */
        results: KnockoutObservableArray<Grid.Item>;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        beforeCreate(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See interface.
         */
        getDefaultRowMetadataProperties(): any;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * See interface.
         */
        getOrder(): number;
        private _parseQueryString(queryString);
        private _getResultItems(queryTokens);
        private _filterableCellFormat(rowNumber, columnNumber, rowMetadata, columnDefinition);
        private _highlightMatches(value, queryToken);
        private _regexStringEscape(str);
        private _getFormattedItemValue(value, settings);
        private _getSearchableColumns();
        private _resetResults();
        private _getDefaultFilterableOptions();
    }
}
