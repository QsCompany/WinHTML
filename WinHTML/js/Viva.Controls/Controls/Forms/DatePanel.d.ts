import DateUtil = require("../../Util/DateUtil");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Represents a day object inside the visible area of DatePanel.
     */
    interface CalendarDay {
        /**
         * Ticks value of the current day.
         */
        date: number;
        /**
         * Day index in this month.
         */
        value: KnockoutObservable<number>;
        /**
         * Indicates whether this day equals to the selected date.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Indicates whether this day has the focus.
         */
        focused: KnockoutObservable<boolean>;
        /**
         * Indicates whether this day belongs to a month other than visible month.
         */
        otherMonth: KnockoutObservable<boolean>;
        /**
         * Indicates whether this day can be selected by user.
         */
        isEnabled: KnockoutObservable<boolean>;
    }
    /**
     * Represents a week object inside the visible area of DatePanel.
     */
    interface CalendarWeek {
        /**
         * Zero-based index of this week within visible area.
         */
        index: number;
        /**
         * Array of days within this week.
         */
        weekDays: CalendarDay[];
    }
    /**
      * Represents a date object which takes different calendar types other than
      * GregorianCalendar in to account as well (like HijriCalendar, ThaiBuddhistCalendar).
      *
      * If the calendar of current culture is other than GregorianCalendar, it tries to convert
      * the date into appropriate calendar using converter if any exists. If there is no need
      * for conversion, it falls back to the base Date object.
      */
    class CalendarDate {
        static DAY_IN_MILLISECONDS: number;
        static DAYS_IN_A_WEEK: number;
        private _baseDate;
        private _convertedDate;
        /**
         * Constructs a new CalendarDate object using the specified date.
         *
         * @param date Base date object. If nothing specified, DateTime.Now is used.
         */
        constructor(date?: Date);
        /**
         * Creates a date object using the specified date parts by trying to use current culture's.
         * calendar converter.
         *
         * @param year Year value.
         * @param month Month value.
         * @param day day value.
         * @return Date object.
         */
        static toGregorian(year: number, month: number, day: number): Date;
        /**
         * Creates a converted date using the specified gregorian date by trying to use current
         * culture's calendar converter.
         *
         * @param date Date object to convert.
         * @return Converted date values.
         */
        static fromGregorian(date: Date): number[];
        /**
         * Gets the start of the day (to time 00:00).
         *
         * @param date Day to get the start.
         * @return Start of the day.
         */
        static toDayStart(date: Date): Date;
        /**
         * Gets the base date.
         *
         * @return Base Date object.
         */
        getBaseDate(): Date;
        /**
         * Sets a new time using the specified date value.
         *
         * @param date Date object to set.
         * @return Current instance of CalendarDate.
         */
        setTime(date: any): CalendarDate;
        /** Gets the base date in ticks.
         *
         * @return Base date in ticks.
         */
        getTime(): number;
        /**
         * Gets the day of the week (from 0 to 6) of this calendar date.
         *
         * @return Number value of the day of the week (0-6).
         */
        getDay(): number;
        /**
         * Gets the year of this calendar date.
         *
         * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
         * @return Number value of the year.
         */
        getFullYear(converted?: boolean): number;
        /**
         * Gets the month of this calendar date.
         *
         * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
         * @return Number value of the month.
         */
        getMonth(converted?: boolean): number;
        /**
         * Gets the day of this calendar date in existing month.
         *
         * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
         * @return Number value of the day.
         */
        getDate(converted?: boolean): number;
        /**
         * Jumps to the start of the month using the converted date.
         *
         * @return Current instance of CalendarDate.
         */
        jumpToMonthStart(): CalendarDate;
        /**
         * Jumps to the start of the week using the converted date (and culture).
         * Week start can be different for different cultures (Sunday of en-US, Monday for tr-TR, etc.).
         *
         * @return Current instance of CalendarDate.
         */
        jumpToWeekStart(): CalendarDate;
        /**
         * Advances current date one day (24hrs) forward.
         *
         * @return Current instance of CalendarDate.
         */
        nextDay(): CalendarDate;
        /**
         * Advances current date one day (24hrs) backward.
         *
         * @return Current instance of CalendarDate.
         */
        previousDay(): CalendarDate;
        /**
         * Advances current date 7 days forward.
         *
         * @return Current instance of CalendarDate.
         */
        nextWeek(): CalendarDate;
        /**
         * Advances current date 7 days backward.
         *
         * @return Current instance of CalendarDate.
         */
        previousWeek(): CalendarDate;
        /**
         * Advances current date one month backward.
         *
         * @return Current instance of CalendarDate.
         */
        previousMonth(): CalendarDate;
        /**
         * Advances current date one month forward.
         *
         * @return Current instance of CalendarDate.
         */
        nextMonth(): CalendarDate;
        /**
         * Advances current date one year backward.
         *
         * @return Current instance of CalendarDate.
         */
        previousYear(): CalendarDate;
        /**
         * Advances current date one year forward.
         *
         * @return Current instance of CalendarDate.
         */
        nextYear(): CalendarDate;
        /**
         * Checks whether the specified date and current date correspond to the same day.
         *
         * @param date Date object to compare.
         * @return Boolean value stating the specified Date equals or not.
         */
        dayEquals(date: Date): boolean;
        /**
         * Checks whether the specified date and current date are equal.
         *
         * @param date Date object to compare.
         * @return Boolean value stating the specified Date equals or not.
         */
        equals(date: Date): boolean;
        private _setDate(date, preserveTime?);
        private _increment(yearIncrement, monthIncrement);
        private _getCalculationDay();
        private _getTimePart(date);
        private _replaceTimePart(date, time);
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
        /**
         * Enables setting the focused date selected if applicable.
         */
        selectFocusedDate(): void;
    }
    /**
     * DatePanel view model.
     */
    class ViewModel extends Base.ViewModel {
        /**
         * Selected date of the view model.
         */
        selectedDate: KnockoutObservable<Date>;
        /**
         * Month of the visible area.
         */
        visibleMonth: KnockoutObservable<Date>;
        /**
         * Focused date.
         */
        focusedDate: KnockoutObservable<Date>;
        /**
         * Abbreviated names of the days according to current culture.
         */
        dayNames: string[];
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
        /**
         * Month names according to the current culture.
         */
        monthNames: string[];
        constructor();
    }
    class Widget extends Base.Widget implements Interface {
        private _linkClickHandler;
        /**
         * Header text of month ({month} - {year}).
         */
        private _headerText;
        /**
         * Days visible in the calendar area.
         */
        private _days;
        private _templateEngine;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * See interface.
         */
        selectFocusedDate(): void;
        private _initializeComputeds();
        private _ensureCultureSpecificNames();
        private _ensureDays();
        private _setTemplates();
        private _attachEvents();
        /**
         * Detaches event handlers.
         */
        private _detachEvents();
        /**
         * Check if given date should be enabled (selectable) in calendar.
         */
        private _isDayEnabled(date);
    }
}
