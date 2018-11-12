import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface ISortableColumnExtension {
        /**
         * Gets the column data that is current sorted.
         *
         * @return Current sorted column, or null otherwise.
         */
        getSortedColumn(): SortableColumn;
    }
    interface SortableColumn extends Grid.Column {
        /**
         * Indicates if the column is sortable.
         */
        sortable?: boolean;
        /**
         * Sort order.
         */
        sortOrder?: KnockoutObservable<Grid.SortOrder>;
    }
    interface SortableColumnEventObject {
        /**
         * Sorted column.
         */
        column: SortableColumn;
        /**
         * Current sort order.
         */
        sortOrder: Grid.SortOrder;
    }
    class SortableColumnExtension extends Grid.Extension implements ISortableColumnExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventSortingClickHandler;
        /**
         * See interface.
         */
        getSortedColumn(): SortableColumn;
        /**
         * See interface.
         */
        setInstance(instance: Grid.Widget): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
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
    }
}
