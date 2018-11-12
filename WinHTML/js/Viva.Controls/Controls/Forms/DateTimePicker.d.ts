import GroupDropDown = require("./GroupDropDown");
import DatePicker = require("./DatePicker");
import TimePicker = require("./TimePicker");
import DateUtil = require("../../Util/DateUtil");
import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    interface Interface extends ValidatableControl.Interface<Date> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ValidatableControl.ViewModel<Date> {
        /**
         * DatePicker control used to select the date (year, month, day).
         */
        datePicker: DatePicker.ViewModel;
        /**
         * TimePicker control used to select the time (hour, minutes, seconds).
         */
        timePicker: TimePicker.ViewModel;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Dropdown for timezones.
         */
        timezonesDropdown: GroupDropDown.ViewModel;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
        private _initializeTimezonesDropdown();
    }
    class Widget extends ValidatableControl.Widget<Date> implements Interface {
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
        options: ViewModel;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See base.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        _getDisplayDate(): Date;
    }
}
