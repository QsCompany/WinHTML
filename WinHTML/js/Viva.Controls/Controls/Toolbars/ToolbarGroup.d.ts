import ToolbarGroupType = require("./ToolbarGroupType");
import ToolbarItem = require("./ToolbarItem");
export = Main;
declare module Main {
    /**
     * Defines a group in the toolbar.
     */
    interface ToolbarGroupContract extends ToolbarItem.ToolbarItemContract {
        /**
         * Group type defines the behavior of the items in the group. Group can be just logical grouping of items or have radio group like behavior.
         */
        groupType: ToolbarGroupType.ToolbarGroupType;
        /**
         * The items in the group.
         */
        items: KnockoutObservableArray<ToolbarItem.ToolbarItemContract>;
    }
    /**
     * See interface.
     */
    class ToolbarGroup extends ToolbarItem.ToolbarItem implements ToolbarGroupContract {
        /**
         * See interface.
         */
        groupType: ToolbarGroupType.ToolbarGroupType;
        /**
         * See interface.
         */
        items: KnockoutObservableArray<ToolbarItem.ToolbarItemContract>;
        constructor(groupType?: ToolbarGroupType.ToolbarGroupType);
    }
}
