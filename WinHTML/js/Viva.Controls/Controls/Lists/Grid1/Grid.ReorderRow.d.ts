import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IReorderRowExtension {
        /**
         * Gets the options of the plugin.
         */
        options: ReorderRowOptions;
    }
    interface ReorderRowOptions {
        /**
         * Disables row reordering.
         */
        disabled?: KnockoutObservable<boolean>;
    }
    interface ReorderRowEventObject {
        /**
         * Metadata for moved row items.
         */
        rowMetadata: Grid.RowMetadata[];
        /**
         * X position where the row got dropped.
         */
        clientX: number;
        /**
         * Y position where the row got dropped.
         */
        clientY: number;
        /**
         * 0-Index position where the row got dropped.
         */
        position: number;
    }
    class ReorderRowExtension extends Grid.Extension implements IReorderRowExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventMouseDown;
        private _eventMouseMove;
        private _eventMouseUp;
        private _options;
        private _savedIndex;
        private _dragstartEventHandler;
        private _dropEventHandler;
        private _dragendEventHandler;
        private _dragoverEventHandler;
        private _mouseenterEventHandler;
        private _mouseleaveEventHandler;
        private _gridGuid;
        /**
         * Creates the reorder row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: ReorderRowOptions);
        /**
         * Gets the options of the plugin.
         */
        options: ReorderRowOptions;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        getOrder(): number;
        /**
         * See interface.
         */
        getDependencies(): Grid.PluginExtension[];
        /**
         * See interface.
         */
        beforeCreate(): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * See parent.
         */
        getAdditionalColumns(): number;
        private _getMimeType();
        private _positionLine(evt);
    }
}
