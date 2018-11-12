export = Main;
declare module Main {
    /**
     * Formats a string based on its key value pair object.
     *
     * @param formatSpecifierMap An object that contains that format mappings. For example: "String with parameters {one} and {two}".format({one: "val1", two: "val2"});.
     * @return Formatted string.
     */
    function format(value: string, formatSpecifierMap: Object): string;
    /**
     * Formats a string based on its key value pair object.
     *
     * @param args The list of arguments format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
     * @return Formatted string.
     */
    function format(value: string, ...restArgs: any[]): string;
    /**
     * Compares the current string to another string and returns a value indicating their relative ordering
     *
     * @param value1 The first value to compare
     * @param value2 The second value to compare
     * @param 0, if the strings are equal; a negative number if value1 < value2; a positive non-zero number if value1 > value2.
     */
    function localeCompareIgnoreCase(value1: string, value2: string, locales?: string[], options?: any): number;
}
