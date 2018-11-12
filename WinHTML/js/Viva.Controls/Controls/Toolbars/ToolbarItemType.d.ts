export = Main;
declare module Main {
    /**
     * The type of the toolbar item.
     */
    enum ToolbarItemType {
        /**
         * Not a valid type.
         */
        None = 0,
        /**
         * An items that visually groups other toolbar items.
         */
        Group = 1,
        /**
         * A toolbar button that opens a link.
         */
        OpenLinkButton = 2,
        /**
         * A toolbar button that opens a blade.
         */
        OpenBladeButton = 3,
        /**
         * A toolbar button that is associated to a command.
         */
        CommandButton = 4,
        /**
         * A toolbar button that opens a dialog before executing a command.
         */
        DialogButton = 5,
        /**
         * A toolbar button and can be toggled (between ON and OFF states).
         */
        ToggleButton = 6,
    }
}
