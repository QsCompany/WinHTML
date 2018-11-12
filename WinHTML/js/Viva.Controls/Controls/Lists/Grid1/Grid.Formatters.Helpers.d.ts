import Grid = require("./Grid");
export = Main;
declare module Main {
    /**
     * Verifies if the value is null.
     *
     * @param value The value.
     * @return True if null, false otherwise.
     */
    function isNull(value: any): boolean;
    /**
     * Verifies if the value is undefined.
     *
     * @param value The value.
     * @return True if undefined, false otherwise.
     */
    function isUndefined(value: any): boolean;
    /**
     * Verifies if the value is null or undefined.
     *
     * @param value The value.
     * @return True if null or undefined, false otherwise.
     */
    function isNullOrUndefined(value: any): boolean;
    /**
     * Escapes the value for safe HTML usage.
     *
     * @param value The value.
     * @return String HTML escaped.
     */
    function htmlEncode(value: any): string;
    /**
     * Escapes the value for safe attribute usage.
     *
     * @param value The value.
     * @return String attribute escaped.
     */
    function attributeEncode(value: any): string;
    /**
     * Calls a cell formatter with all the arguments.
     *
     * @param formatter The formatter.
     * @param value The value.
     * @param args The rest of the arguments.
     * @return String returned by the formatter.
     */
    function callFormatter(formatter: Grid.CellFormatter, value: any, args?: any): string;
}
