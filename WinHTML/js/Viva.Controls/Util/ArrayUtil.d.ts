export = Main;
declare module Main {
    function firstIndex<T>(items: T[], predicate?: (value: T) => boolean, startIndex?: number): number;
    function first<T>(items: T[], predicate?: (value: T) => boolean, startIndex?: number): T;
    function stableSort<T>(items: T[], compare: (a: T, b: T) => number): T[];
    /**
     * Binary search a sorted array.
     *
     * @param sortedArray:  The sorted array (smaller item first base on compareFn.)
     * @param item   The object to search for.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     * @return The index of the specified value in the specified array, if value is found.
     *         If value is not found and value is less than one or more elements in array, a negative number which is the bitwise complement of the index of the first element that is larger than value.
     *         If value is not found and value is greater than any of the elements in array, a negative number which is the bitwise complement of (the index of the last element plus 1).
     *         See .Net Array.BinarySearch documentation in 'http://msdn.microsoft.com/en-us/library/vstudio/4ba2bttb(v=vs.100).aspx'
     *         Note by default, if compareFn is not pass in and item is a number, we will use special number comparsion (substraction) for faster performance.
     */
    function binarySearch<T>(sortedArray: T[], item: T, compareFn?: (a: T, b: T) => number): number;
}
