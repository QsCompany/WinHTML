import TemplateEngine = require("../../../Util/TemplateEngine");
import Pager = require("../../Pager");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IPageableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: PageableOptions;
    }
    interface PageableOptions {
        /**
         * The label text that's displayed to load more data.
         */
        label?: KnockoutObservableBase<string>;
        /**
         * Show or hide the pageable display label.
         */
        showLabel?: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the data is asyncronously fetched.
         */
        loading?: KnockoutObservableBase<boolean>;
        /**
         * Callback is invoked when load more label is clicked.
         */
        onLoadMoreData?: () => void;
        /**
         * Pager view model if using a full paging control.
         */
        pagerViewModel?: Pager.ViewModel;
        itemsPerPage?: KnockoutObservableBase<number>;
    }
    class PageableExtension extends Grid.Extension implements IPageableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        private _loadMoreDataHandler;
        private _onePagerComputed;
        /**
         * Creates the pageable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: PageableOptions);
        /**
         * Gets the options of the plugin.
         */
        options: PageableOptions;
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
        afterAttachEvents(): void;
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
        private _getDefaultPageableOptions();
    }
}
