export = Main;
declare module Main {
    /**
     * The type of the toolbar group.
     */
    enum ToolbarGroupType {
        /**
         * Default group
         */
        None = 0,
        /**
         * Group has a collection of toggle button items which behave like radio group.
         */
        OptionsGroup = 1,
    }
}
