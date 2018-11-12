/// <reference path="../../Definitions/d3.d.ts" />
/// <reference path="../../Definitions/jquery.d.ts" />
export = Main;
declare module Main {
    /**
     * Defines hatching patterns.
     */
    enum Pattern {
        /**
         * The area is solid.
         */
        Solid = 0,
        /**
         * The area is cross hatched.
         */
        CrossHatching = 1,
        /**
         * The area is diagonal hatched.
         */
        DiagonalHatching = 2,
        /**
         * The area is hatched horizontally.
         */
        DottedHatching = 3,
    }
    /**
     * Renders the hatching style for a given selection.
     *
     * @param pattern The hatching pattern to use for fulfillment.
     * @param cssColorClass The CSS class used for the background color.
     * @param cssGeneralClass The CSS class defining styles of hatching (depends on the control).
     * @param selectionToApply The D3 selection that will display the hatching.
     * @param rootElement The D3 selection that will handle the hatching pattern (hidden).
     */
    function renderHatching(pattern: Pattern, cssColorClass: string, cssGeneralClass: string, selectionToApply: D3.Selection, rootElement: D3.Selection): string;
    /**
     * Renders the hatching style pattern.
     *
     * @param pattern The hatching pattern to use for fulfillment.
     * @param cssColorClass The CSS class used for the background color.
     * @param cssGeneralClass The CSS class defining styles of hatching (depends on the control).
     * @param rootElement The D3 selection that will handle the hatching pattern (hidden).
     * @return The Id of the pattern element.
     */
    function addHatchingPattern(pattern: Pattern, cssColorClass: string, cssGeneralClass: string, rootElement: D3.Selection): string;
}
