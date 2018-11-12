import TemplateEngine = require("../../../Util/TemplateEngine");
import List = require("./List");
export = Main;
declare module Main {
    enum GroupOrder {
        /**
         * Display groups in collection order.
         */
        Collection = 0,
        /**
         * Display groups in ascending order.
         */
        Ascending = 1,
        /**
         * Display groups in descending order.
         */
        Descending = 2,
    }
    interface IGroupableExtension {
        /**
         * Gets the list of item views for a particular group.
         *
         * @param groupId The string representing the ID of the group to get data for.
         * @return An array of List.ItemView objects.
         */
        getItemViewsByGroup(groupId: any): KnockoutComputed<List.ItemView[]>;
        /**
         * Gets the ordered list of groups based on the groupKey option.
         *
         * @return An array of Group objects.
         */
        groups: Group[];
    }
    interface GroupableItemMetadata extends List.ItemMetadata {
        /**
         * The ID of the group, typically mapping to a unique value in the field being grouped by.
         */
        groupId: KnockoutObservable<any>;
    }
    interface GroupableOptions {
        /**
         * The item field in the data set that the groups map to/are created from.
         */
        groupKey: KnockoutObservable<string>;
        /**
         * The template to apply to each group header.
         */
        headerTemplate?: string;
        /**
         * An observable array of Group objects, to be rendered in indexed order.
         * If this array is not provided, it is inferred from the values mapped to groupKey.
         */
        groups?: KnockoutObservableArray<Group>;
        /**
         * The group name shown for all items that don't have a groupId set.
         */
        noGroupLabel?: string;
        /**
         * Order to display groups in (Ascending, Descending, or Collection order).
         */
        order?: KnockoutObservableBase<GroupOrder>;
        /**
         * Sort on the raw group values.
         */
        sortFunction?: (a: any, b: any) => number;
    }
    interface Group {
        /**
         * The unique value corresponding to the group.
         */
        value: any;
    }
    class GroupableExtension extends List.Extension implements IGroupableExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _groups;
        private _groupItemViews;
        private _options;
        /**
         * Creates the groupable item extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: GroupableOptions);
        /**
         * See interface.
         */
        groups: Group[];
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
        initializeItemView(itemView: List.ItemView): void;
        /**
         * See interface.
         */
        getItemViewsByGroup(groupId: any): KnockoutComputed<List.ItemView[]>;
        /**
         * See parent.
         */
        getName(): string;
        private _getDefaultGroupOptions();
    }
}
