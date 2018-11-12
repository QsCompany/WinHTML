import TemplateEngine = require("../../../Util/TemplateEngine");
import List = require("./List");
export = Main;
declare module Main {
    /**
     * The listview tab mode.
     */
    enum TabMode {
        /**
         * Tabbing will go to last focused item or the first item if no items have been focused.
         */
        LastFocused = 0,
        /**
         * All enabled items can be accessed via tabbing.
         */
        All = 1,
    }
    interface FocusableOptions {
        /**
         * The tab mode for the listview.
         */
        tabMode?: TabMode;
    }
    interface IFocusableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: FocusableOptions;
    }
    interface FocusableEventObject {
        /**
         * Focused item.
         */
        focused: List.Item;
    }
    interface FocusableItemMetadata extends List.ItemMetadata {
        /**
         * Indicates if the item is the last focused.
         */
        focused?: KnockoutObservableBase<boolean>;
    }
    class FocusableExtension extends List.Extension implements IFocusableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventFocusIn;
        private _eventKeyDown;
        private _options;
        private _currentTabbableItemView;
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
        setInstance(instance: List.Widget): void;
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
        initializeItemView(itemView: List.ItemView): void;
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
        private _findPreviousFocusable(item);
        private _findPreviousAboveFocusable(item);
        private _findNextFocusable(item);
        private _findNextBelowFocusable(item);
        private _focusElement(item, allowChildFocus);
        private _focusItem(elem, itemView, allowChildFocus, evt);
        private _getVisibleEnabledList(element);
        private _updateCurrentTabbableItemView(itemView);
    }
}
