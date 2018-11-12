/// <reference path="../../../Definitions/jquery.timeentry.d.ts" />
import DateUtil = require("../../Util/DateUtil");
import Base = require("../Base/Base");
import EditableCombo = require("./EditableCombo");
export = Main;
declare module Main {
    interface Interface extends EditableCombo.Interface<Date> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends EditableCombo.ViewModel<Date> {
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
        /**
         * Hour setter.
         */
        setHours(hours: number): void;
        /**
         * Minutes setter.
         */
        setMinutes(minutes: number): void;
        /**
         * Seconds setter.
         */
        setSeconds(seconds: number): void;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    class Widget extends EditableCombo.Widget<Date> implements Interface {
        private _dateTimeRange;
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
        _parseValue(value: string): Date;
        _formatValue(value: Date): string;
        _isSameValue(a: Date, b: Date): boolean;
        private _createValidators();
        private _initializeTimeEntryPlugin();
    }
}
