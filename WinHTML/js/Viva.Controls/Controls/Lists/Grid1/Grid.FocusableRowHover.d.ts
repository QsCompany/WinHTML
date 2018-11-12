/// <reference path="../../../../Definitions/knockout.extensionstypes.d.ts" />
import TemplateEngine = require("../../../Util/TemplateEngine");
import FocusableRowGrid = require("./Grid.FocusableRow");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface FocusableHoverRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
        hoverID: string;
    }
    interface IFocusableRowHoverExtension {
        /**
         * Gets the options of the plugin.
         */
        options: FocusableRowHoverOptions;
        /**
         * Gives the hover to a specific row.
         *
         * @param rowMetadata The rowMetadata wanted to be focused.
         */
        hoverRowByRowMetadata(rowMetadata: FocusableHoverRowMetadata): void;
        /**
         * Gives the hover to a specific row. .
         *
         * @param rowMetadata The rowMetadata wanted to be focused.
         */
        hoverRowByHoverId(hoverId: string): void;
    }
    interface FocusableRowHoverEventObject {
        /**
         * hovered row.
         */
        hovered?: FocusableHoverRowMetadata;
    }
    interface FocusableRowHoverOptions extends FocusableRowGrid.FocusableRowOptions {
        hoverIDKey?: KnockoutObservableBase<string>;
        hoveredID?: KnockoutObservableBase<string>;
    }
    class FocusableRowHoverExtension extends Grid.Extension implements IFocusableRowHoverExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        private _focusableRowExtension;
        private _eventRowFocus;
        private _eventRowMouseEnter;
        private _eventRowMouseLeave;
        private _eventBlur;
        private _eventFocus;
        private _focusedByEvent;
        private _hoverIDKey;
        private _hoveredID;
        private _hoveredRowMetadata;
        private _preventMouseHandler;
        private _preventMouseHandlerTimer;
        private _idRowMetadataMap;
        private _backupIdMax;
        private _inHoverRowByRowMetadata;
        /**
         * Creates the activateable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: FocusableRowHoverOptions);
        /**
         * Gets the options of the plugin.
         */
        options: FocusableRowHoverOptions;
        /**
         * See interface.
         */
        beforeCreate(): void;
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
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        afterCreate(): void;
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
        hoverRowByHoverId(hoverID: string): void;
        hoverRowByRowMetadata(rowMetadata: FocusableHoverRowMetadata, evt?: JQueryEventObject): void;
        private _resetPreventMouseHandlerTimer();
        private _onRowFocus(evt, focusableRowEventObject);
        private _getRowMetadataFromHoverID(hoverID);
        private _rebuildIdRowMetadaMap();
    }
}
