import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IFocusableRowExtension {
        /**
         * Gets the options of the plugin.
         */
        options: FocusableRowOptions;
        /**
         * Gives the focus to a specific row. If the rowMetadata does not exist in the view, no focus is given.
         *
         * @param rowMetadata The rowMetadata wanted to be focused.
         */
        focusRowByRowMetadata(rowMetadata: FocusableRowMetadata): void;
    }
    interface FocusableRowOptions {
        /**
         * Indicates the grid is focusable. Defaults to true.
         */
        focusable?: KnockoutObservableBase<boolean>;
    }
    interface FocusableRowEventObject {
        /**
         * Focused row.
         */
        focused: FocusableRowMetadata;
    }
    interface FocusableRowMetadata extends Grid.RowMetadata {
        /**
         * Indicates if the row is disabled.
         */
        disabled?: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the row is focused.
         */
        focused?: KnockoutObservableBase<boolean>;
    }
    class FocusableRowExtension extends Grid.Extension implements IFocusableRowExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _eventClick;
        private _eventKeyDown;
        private _eventMouseDown;
        private _options;
        private _lastTabbableRowMetadata;
        private _focusableComputed;
        /**
         * Indicates the grid is hover should be handle externally instead of default hover css
         */
        externalHover: boolean;
        /**
         * Creates the focusable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: FocusableRowOptions);
        /**
         * Gets the options of the plugin.
         */
        options: FocusableRowOptions;
        static isEditableControl(element: JQuery): boolean;
        /**
         * See interface.
         */
        setInstance(instance: Grid.Widget): void;
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
        getDefaultRowMetadataProperties(): any;
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
        /**
         * See interface.
         */
        focusRowByRowMetadata(rowMetadata: FocusableRowMetadata): void;
        _getRowFocusDataBindAttribute(): string;
        _findPreviousFocusable(grid: JQuery, row: JQuery, wrapAround?: boolean): JQuery;
        _findNextFocusable(grid: JQuery, row: JQuery, wrapAround?: boolean): JQuery;
        _focusElement(row: JQuery): void;
        _focusRow(row: HTMLTableRowElement, rowMetadata: FocusableRowMetadata, evt?: JQueryEventObject): void;
        _focusRow(row: JQuery, rowMetadata: FocusableRowMetadata, evt?: JQueryEventObject): void;
        private _getFocusableList(table);
    }
}
