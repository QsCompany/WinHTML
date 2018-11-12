import TemplateEngine = require("../../../Util/TemplateEngine");
import Grid = require("./Grid");
export = Main;
declare module Main {
    interface IGroupableExtension {
        /**
         * Gets the options of the plugin.
         */
        options: GroupableOptions;
        /**
         * Gets the list of items for a particular group.
         *
         * @param groupId The string representing the ID of the group to get data for.
         * @return An array of Grid.Item objects.
         */
        getItemsByGroup(groupId: any): KnockoutComputed<Grid.Item[]>;
        /**
         * Gets the ordered list of groups based on the groupKey option.
         *
         * @return An array of Group objects.
         */
        groups: KnockoutComputed<Group[]>;
    }
    interface GroupableRowMetadata extends Grid.RowMetadata {
        /**
         * The ID of the group, typically mapping to a unique value in the column being grouped by.
         */
        groupId: KnockoutObservable<any>;
    }
    interface GroupableOptions {
        /**
         * The item field/column in the data set that the groups map to/are created from.
         */
        groupKey: KnockoutObservable<string>;
        /**
         * The formatter to apply to each group headers. Default is FormattersGrid.text.
         */
        headerFormatter?: Grid.CellFormatter;
        /**
         * An observable array of Group objects, to be rendered in indexed order.
         * If this array is not provided, it is inferred from the column values mapped to groupKey.
         */
        groups?: KnockoutObservableBase<Group[]>;
        /**
         * The group name shown for all items that don't have a groupId set.
         */
        noGroupLabel?: Grid.CellFormatter;
        /**
         * Sort order to display groups in (Unsorted, Ascending, or Descending).
         */
        sortOrder?: KnockoutObservableBase<Grid.SortOrder>;
        /**
         * Sort on the formatted or raw group values. Defaults to formatted.
         */
        sortFunction?: (a: any, b: any) => number;
    }
    interface IGroup {
        /**
         * The unique value corresponding to the group.
         * This value will be passed to the formatter.
         */
        value: any;
        /**
         * The formatter to be applied to the group header row.
         */
        formatter: Grid.CellFormatter;
        /**
         * The formatter to be applied when sorting.
         */
        sortFormatter: Grid.CellFormatter;
    }
    class Group implements IGroup {
        /**
         * See interface.
         */
        value: any;
        /**
         * See interface.
         */
        formatter: Grid.CellFormatter;
        /**
         * See interface.
         */
        sortFormatter: Grid.CellFormatter;
        /**
         * Creates and initializes the Group class.
         * If no formatter is passed in, FormattersGrid.text is used by default on the value property.
         * If the sort formatter is not provided, the data is sorted on the data itself.
         *
         * @param value The ID of the group (to be used as the display value, as well).
         * @param formatter The formatter to apply to the ID of the group upon display.
         * @param sortFormatter The formatter to apply to the ID of the group for sorting purposes.
         */
        constructor(value: string, formatter?: Grid.CellFormatter, sortFormatter?: Grid.CellFormatter);
    }
    class GroupableExtension extends Grid.Extension implements IGroupableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _groups;
        private _groupItems;
        private _options;
        /**
         * Creates the selectable row extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: GroupableOptions);
        /**
         * See interface.
         */
        groups: KnockoutComputed<Group[]>;
        /**
         * Gets the options of the plugin.
         */
        options: GroupableOptions;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
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
        getItemsByGroup(groupId: any): KnockoutComputed<Grid.Item[]>;
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
        private _getDefaultGroupOptions();
        private _headerCellFormat(formatter, value);
    }
}
