export = Main;
declare module Main {
    /**
     * Used to specify date/time range in which user can select date/time.
     */
    class DateTimeRange {
        /**
         * Start date/time.
         */
        startDateTime: KnockoutObservable<Date>;
        /**
         * End date/time.
         */
        endDateTime: KnockoutObservable<Date>;
        /**
         * Timezone offset.
         */
        timezoneOffset: KnockoutObservable<number>;
        constructor(startDateTime?: Date, endDateTime?: Date, timezoneOffset?: number);
    }
    function getLocaleValues(): any;
    function setLocaleValues(def: any): void;
    /**
     * Returns a date string formatted relative to another date.
     *
     * @param format The relative format option (difference or timestamp) used to render the string.
     * @param now The relative Date object to compare date to.
     * @return A string representing the relative date.
     */
    function toRelativeString(date: Date, format: string, now?: Date): string;
    function toString(date: Date, ...relArgs: any[]): string;
    /**
     * Parse standard date strings, and MVC dates.
     *
     * @param value Date string.
     *
     * @return A new Date object (created from date string).
     */
    function parse(value: string): number;
    /**
     * Returns a date for specified time zone.
     *
     * @param date The original date.
     * @param timezoneOffset Timezone offset (in minutes) to which the date will be converted.
     *
     * @return A new Date object, representing date in specified (by offset param) timezone.
     */
    function getDateWithOffset(date: Date, timezoneOffset: number): Date;
    /**
     * Returns a date for local (user) time zone.
     *
     * @param date The original date.
     * @param timezoneOffset Timezone offset (in minutes) from which the date will be converted.
     *
     * @return A new Date object, representing date in the local (user) timezone.
     */
    function getLocalDate(date: Date, timezoneOffset: number): Date;
    /**
    * Compare two dates with 1 day precision (does not take time into account).
    *
    * @param d1 First date.
    * @param d2 Second date.
    *
    * @return -1 - d1 is earlier than d2
    *          0 - d1 and d2 are equal
    *          1 - d1 is later than d2
    */
    function compareDatesByDays(d1: Date, d2: Date): number;
    /**
    * Compare two dates with 1 second precision (does not take miliseconds into account).
    *
    * @param d1 First date.
    * @param d2 Second date.
    *
    * @return true if dates are equal, false otherwise
    */
    function compareDatesBySeconds(a: Date, b: Date): boolean;
}
