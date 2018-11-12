import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IContextMenuShortcutExtension {
        /**
         * Gets the options of the plugin.
         */
        options: ContextMenuShortcutOptions;
    }
    interface ContextMenuShortcutOptions {
    }
    interface ContextMenuShortcutEventObject {
        /**
         * Metadata for right-clicked item.
         */
        rowMetadata: Grid.RowMetadata;
        /**
         * X position where right click happened.
         */
        clientX: number;
        /**
         * Y position where right click happened.
         */
        clientY: number;
    }
    class ContextMenuShortcutExtension extends Grid.Extension implements IContextMenuShortcutExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        private _shortcutClickHandler;
        private _shortcutMouseEnterHandler;
        private _shortcutMouseLeaveHandler;
        /**
         * Creates the context menu shortcut extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: ContextMenuShortcutOptions);
        /**
         * Gets the options of the plugin.
         */
        options: ContextMenuShortcutOptions;
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
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * See interface.
         */
        shouldNotChangeSelection(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        getAdditionalColumns(): number;
    }
}
