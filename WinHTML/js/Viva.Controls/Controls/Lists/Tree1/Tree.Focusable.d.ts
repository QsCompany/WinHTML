import TemplateEngine = require("../../../Util/TemplateEngine");
import Tree = require("./Tree");
export = Main;
declare module Main {
    interface IFocusableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: FocusableOptions;
    }
    interface FocusableOptions {
    }
    interface FocusableEventObject {
        /**
         * Focused row.
         */
        focused: Tree.Item;
    }
    interface FocusableItemMetadata extends Tree.ItemMetadata {
        /**
         * Indicates if the item is focused.
         */
        focused?: KnockoutObservableBase<boolean>;
    }
    class FocusableExtension extends Tree.Extension implements IFocusableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventKeyDown;
        private _eventItemExpand;
        private _eventMouseDown;
        private _options;
        private _lastTabbableItemMetadata;
        /**
         * Creates the focusable extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: FocusableOptions);
        /**
         * Gets the options of the plugin.
         */
        options: FocusableOptions;
        /**
         * See interface.
         */
        setInstance(instance: Tree.Widget): void;
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
        defaultItemMetadataProperties(metadata: Tree.ItemMetadata): any;
        /**
         * See interface.
         */
        getOrder(): number;
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
        _getFocusDataBindAttribute(): string;
        _findPreviousFocusable(node: JQuery): JQuery;
        _findNextFocusable(node: JQuery): JQuery;
        _focusElement(node: JQuery): void;
        _focusNode(node: HTMLElement, item: Tree.Item, evt: JQueryEventObject): void;
        _focusNode(node: JQuery, item: Tree.Item, evt: JQueryEventObject): void;
        _getVisibleEnabledList(element: JQuery): JQuery;
    }
}
