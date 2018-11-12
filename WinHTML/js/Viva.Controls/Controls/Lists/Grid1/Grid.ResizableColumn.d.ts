import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
import VivaGridResizableColumn = require("Viva.Controls/Controls/Lists/Grid1/Grid.ResizableColumn");
export = Main;
declare module Main {
    interface IResizableColumnExtension {
        /**
          * Gets the options of the plugin.
          */
        options: ResizableColumnOptions;
    }
    interface ResizableColumn extends Grid.Column {
        /**
         * Disables resizable for a specific column.
         */
        disableResizable?: KnockoutObservable<boolean>;
        /**
         * Column displays a resize handle.
         */
        hasHandle?: KnockoutObservable<boolean>;
    }
    interface ResizableColumnOptions {
        /**
         * Indicates if columns are resizable. Defaults to true.
         */
        resizable?: KnockoutObservable<boolean>;
        /**
         * Sets resized column width to percent.
         */
        resizeToPercent?: KnockoutObservable<boolean>;
        /**
         * Sets minimum width in pixels for columns.
         */
        minWidth?: number;
    }
    class ResizableColumnExtension extends Grid.Extension implements IResizableColumnExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _mouseDownEventHandler;
        private _mouseMoveEventHandler;
        private _mouseUpEventHandler;
        private _options;
        private _handle;
        private _columns;
        private _mouseDownPosition;
        private _columnsSubscription;
        private _lastColumnObject;
        /**
         * Creates the resizable column extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: ResizableColumnOptions);
        /**
         * Gets the options of the plugin.
         */
        options: ResizableColumnOptions;
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
        getName(): string;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See inteface.
         */
        getDefaultColumnProperties(): any;
        /**
         * Gets the default resizable options.
         *
         * @return The default options.
         */
        private _getDefaultResizableColumnOptions();
        /**
         * Starts the column resize.
         */
        private _resizeStart(selectedColumn, nextColumn);
        /**
         * Gets the corresponding col.
         *
         * @param column Grid.Column.
         * @return col.
        */
        private _getCol(column);
        private _getNextResizableColumn(columns, index);
        /**
         * Calculates the percentage of a part value relative to a whole value.
         *
         * @param whole Whole value.
         * @param part Part value.
         * @return string percent.
        */
        private _convertToPercent(whole, part);
        private _tableOffset(table, offset);
    }
}
