import DateTimePicker = require("./DateTimePicker");
import DateUtil = require("../../Util/DateUtil");
import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
export = Main;
declare module Main {
    interface Interface extends ValidatableControl.Interface<DateUtil.DateTimeRange> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ValidatableControl.ViewModel<DateUtil.DateTimeRange> {
        /**
         * Start date/time
         */
        startDateTime: DateTimePicker.ViewModel;
        /**
         * End date/time
         */
        endDateTime: DateTimePicker.ViewModel;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Display start/end date/time fields inline (false by default).
         */
        displayFieldsInline: KnockoutObservable<boolean>;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    class Widget extends ValidatableControl.Widget<DateUtil.DateTimeRange> implements Interface {
        private _dateTimeRangeLifetimeManager;
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
    }
}
