/// <reference path="../../Definitions/d3.d.ts" />
/// <reference path="../../Definitions/jquery.d.ts" />
export = Main;
declare module Main {
    /**
     * Defines units.
     */
    enum Unit {
        None,
        Percentage,
        Bytes,
        Kilobytes,
        Megabytes,
        Gigabytes,
        Terabytes,
        Petabytes,
        BytesPerDay,
        BytesPerHour,
        BytesPerMinute,
        BytesPerSecond,
        KilobytesPerSecond,
        MegabytesPerSecond,
        GigabytesPerSecond,
        TerabytesPerSecond,
        PetabytesPerSecond,
        Count,
        Thousand,
        Million,
        Billion,
        Trillion,
        MicroSeconds,
        MilliSeconds,
        Seconds,
        Minutes,
        Hours,
        Days,
        CountPerDay,
        CountPerHour,
        CountPerMinute,
        CountPerSecond,
        ThousandPerSecond,
        MillionPerSecond,
        BillionPerSecond,
        TrillionPerSecond,
    }
    /**
     * Returns the most appropriate unit for formatting the value.
     *
     * @param value The value to find the unit.
     * @param originalUnit The original unit of the value.
     * @return The unit allowing to display the value shortly.
     */
    function getAppropriateUnit(value: number, originalUnit: Unit, defaultZeroUnit?: Unit): Unit;
    /**
     * Return the conversion factor from one unit to another.
     *
     * @param orignalUnit The original unit.
     * @param unit The unit to be converted to.
     * @return The conversion factor used to divide from the originalUnit to the unit.
     */
    function getConversionFactor(originalUnit: Unit, toUnit: Unit): number;
    /**
     * Returns a string representation of the Unit enum.
     * TODO ivanbaso: to be localized or strings can be moved to constants.
     *
     * @param unit The unit to be represented with a string.
     * @return The string representation.
     */
    function toString(unit: Unit): string;
}
