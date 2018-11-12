import TextStream = require("./TextStream");
import Base = require("./Base/Base");
export = Main;
declare module Main {
    var LogItemTypeClassifiers: string[];
    interface Interface extends TextStream.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
        /**
         * Logs text.
         */
        log(text: string): void;
        /**
         * Logs item.
         */
        logItem(item: LogItem): void;
        /**
         * Logs items.
         */
        logItems(items: LogItem[]): void;
    }
    enum LogItemType {
        /**
         * Indicates general information.
         */
        Text = 0,
        /**
         * Indicates important information.
         */
        Information = 1,
        /**
         * Indicates success information
         */
        Success = 2,
        /**
         * Indicates warning information.
         */
        Warning = 3,
        /**
         * Indicates error information.
         */
        Error = 4,
    }
    interface LogItem {
        /**
         * The text to log.
         */
        text: string;
        /**
         * The type of text to log.
         */
        type?: LogItemType;
    }
    class ViewModel extends TextStream.ViewModel {
        /**
         * Controls display updating.
         */
        paused: KnockoutObservable<boolean>;
        /**
         * Current set of log item types to track and display.
         */
        filters: KnockoutObservableArray<LogItemType>;
        /**
         * Logs text item to the display.
         */
        log: KnockoutObservable<string>;
        /**
         * Logs item to the display.
         */
        logItem: KnockoutObservable<LogItem>;
        /**
         * Logs multiple items to the display.
         */
        logItems: KnockoutObservable<LogItem[]>;
        /**
         * Creates a LogStream view model.
         */
        constructor();
    }
    class Widget extends TextStream.Widget implements Interface {
        private _bufferSize;
        private _bufferItems;
        private _filterOutClassifiers;
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
         * Destroys the LogStream widget.
         */
        dispose(): void;
        /**
         * Gets the view model for the log stream.
         *
         * @return The view model.
         */
        options: ViewModel;
        /**
         * Clears the content of the display.
         */
        clear(): void;
        /**
         * Logs text.
         *
         * @param text The text to log.
         */
        log(text: string): void;
        /**
         * Logs item.
         *
         * @param item The item to log.
         */
        logItem(item: LogItem): void;
        /**
         * Logs items.
         *
         * @param items The items to log.
         */
        logItems(items: LogItem[]): void;
        /**
         * See base.
         * Overridden to classify as log item type text.
         */
        write(text: string): void;
        /**
         * See base.
         * Overridden to classify as log item type text.
         */
        writeLine(text: string): void;
        /**
         * See base.
         * Overridden to classify as log item type text.
         */
        writeText(info: TextStream.TextInfo): void;
        /**
         * See base.
         * Overridden to classify as log item type text.
         */
        writeTextArray(infos: TextStream.TextInfo[]): void;
        /**
         * See base.
         * Overridden to classify as log item type text.
         */
        writeTextLine(info: TextStream.TextInfo): void;
        /**
         * See base.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        /**
         * See base.
         * The LogStream overrides this to first trim items that are filtered out.
         */
        _trim(container: JQuery, amountToTrim: number): number;
        /**
         * Adds the log request to the buffer.
         *
         * @param info Text info of the log request.
         */
        private _bufferAdd(info);
        /**
         * Clears the buffered log requests.
         */
        private _bufferClear();
        /**
         * Commits buffered log requests to the display if not paused or disabled.
         */
        private _bufferWrite();
        /**
         * Handles changes to the log stream filters by removing existing filter classifiers
         * and applying new filter classifiers. The classifiers are changed simultaneously
         * to limit reflows to the display.
         *
         * @param filters List of LogItemType values indicating which entries should be shown.
         */
        private _onFilters(filters);
        /**
         * Handles changes to the paused state.
         */
        private _onPaused(paused);
        /**
         * Ensures the text is valid and ends with a line feed.
         *
         * @param text The input text string.
         * @return The sanitized text string.
         */
        private _text(text);
        /**
         * Converts a log item to a text info.
         *
         * @param item A log item.
         * @return A text info.
         */
        private _textInfoFromLogItem(item);
        /**
         * Converts a string to a text info.
         *
         * @param text A text string.
         * @return A text info with default classifier and emphasis.
         */
        private _textInfoFromString(text);
    }
}
