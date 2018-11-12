import DatePanel = require("./DatePanel");
import Base = require("../Base/Base");
import EditableCombo = require("./EditableCombo");
import DateUtil = require("../../Util/DateUtil");
export = Main;
declare module Main {
    class DropAdapter extends EditableCombo.DropAdapter<DatePanel.Widget, Date> {
        constructor();
        /**
         * Gets the typed combo instance.
         */
        combo: Widget;
        /**
         * See parent.
         */
        allowsTyping(): boolean;
        /**
         * See parent.
         */
        enterKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        downKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        upKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        leftKey(evt: JQueryEventObject): boolean;
        /**
         * See parent.
         */
        rightKey(evt: JQueryEventObject): boolean;
        _createWidget(combo: Interface, fixture: JQuery): DatePanel.Widget;
        private _focusDate(navigateTo);
        private _advanceFocusedDate(day, navigateTo);
    }
    interface Interface extends EditableCombo.Interface<Date> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends EditableCombo.ViewModel<Date> {
        /**
         * A valid format string specifier (see DateUtil format), used to format the value.
         */
        formatString: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
        /**
         * Creates a new instance of the view model.
         */
        constructor();
    }
    class Widget extends EditableCombo.Widget<Date> implements Interface {
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
        _createDropAdapter(): EditableCombo.DropAdapter<DatePanel.Widget, Date>;
        _createDropPopup(): JQuery;
        _parseValue(value: string): Date;
        _formatValue(value: Date): string;
        _isSameValue(a: Date, b: Date): boolean;
    }
}
