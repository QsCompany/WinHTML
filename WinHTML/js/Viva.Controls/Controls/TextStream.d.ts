import Command = require("./Base/Command");
import Base = require("./Base/Base");
export = Main;
declare module Main {
    class Classifiers {
        /**
         * No color classification.
         */
        static None: string;
        /**
         * Black color classification.
         */
        static Black: string;
        /**
         * Gray color classification.
         */
        static Gray: string;
        /**
         * Silver color classification.
         */
        static Silver: string;
        /**
         * White color classification.
         */
        static White: string;
        /**
         * Maroon color classification.
         */
        static Maroon: string;
        /**
         * Red color classification.
         */
        static Red: string;
        /**
         * Olive color classification.
         */
        static Olive: string;
        /**
         * Lime color classification.
         */
        static Lime: string;
        /**
         * Green color classification.
         */
        static Green: string;
        /**
         * Aqua color classification.
         */
        static Aqua: string;
        /**
         * Teal color classification.
         */
        static Teal: string;
        /**
         * Blue color classification.
         */
        static Blue: string;
        /**
         * Navy color classification.
         */
        static Navy: string;
        /**
         * Fuchsia color classification.
         */
        static Fuchsia: string;
        /**
         * Purple color classification.
         */
        static Purple: string;
        /**
         * Yellow color classification.
         */
        static Yellow: string;
    }
    enum Emphasis {
        /**
         * General text.
         */
        Normal = 0,
        /**
         * Important text.
         */
        Emphasized = 1,
        /**
         * Very important text.
         */
        Strong = 2,
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
        /**
         * Writes the specified text to the display.
         *
         * @param text The text to display.
         */
        write(text: string): void;
        /**
         * Writes the specified text to the display with a termination line feed.
         *
         * @param text The text to display.
         */
        writeLine(text: string): void;
        /**
         * Writes the specified text info to the display.
         *
         * @param info The text info to display.
         */
        writeText(info: TextInfo): void;
        /**
         * Writes the specified text info to the display with a termination line feed.
         *
         * @param info The text info to display.
         */
        writeTextLine(info: TextInfo): void;
        /**
         * Writes the specified text infos to the display.
         *
         * @param infos Array of text information to display.
         */
        writeTextArray(infos: TextInfo[]): void;
        /**
         * Updates the size of the text stream to fit the container.
         */
        refreshContainer(): void;
    }
    interface TextInfo {
        /**
         * The text to display.
         */
        text: string;
        /**
         * The class of information in the text.
         */
        classifier?: string;
        /**
         * The emphasis of the infomation in the text.
         */
        emphasis?: Emphasis;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * The maximum text size to display.
         */
        max: KnockoutObservable<number>;
        /**
         * Wrap the lines of the display.
         */
        wrap: KnockoutObservable<boolean>;
        /**
         * Callback function when the text stream is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Writes data to the display.
         */
        write: KnockoutObservable<string>;
        /**
         * Writes data to the display with a trailing line feed.
         */
        writeLine: KnockoutObservable<string>;
        /**
         * Writes styled data to the display.
         */
        writeText: KnockoutObservable<TextInfo>;
        /**
         * Writes styled data to the display with a trailing linefeed.
         */
        writeTextLine: KnockoutObservable<TextInfo>;
        /**
         * Writes multiple styled data to the display.
         */
        writeTextArray: KnockoutObservable<TextInfo[]>;
        /**
         * Clears the display.
         */
        clear: Command.ViewModel;
        /**
         * Indicates if the text area should display scrollbars as needed.
         */
        scrollbars: boolean;
        constructor();
    }
    class Widget extends Base.Widget implements Interface {
        private _containerElement;
        private _scrollbar;
        private _updatingScrollbar;
        private _clickHandler;
        private _textSize;
        private _spanWriter;
        private _trimPercent;
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
         * Clears the content of the control
         */
        clear(): void;
        /**
         * Updates the size of the text stream to fit the container.
         */
        refreshContainer(): void;
        /**
         * Updates the UI to be in sync with the latest changes.
         *
         * @param scroll Indicates if the scrollbars should be updated.
         */
        update(scroll?: boolean): void;
        /**
         * Writes the specified text to the display.
         *
         * @param text The text to display.
         */
        write(text: string): void;
        /**
         * Writes the specified text to the display with a termination line feed.
         *
         * @param text The text to display.
         */
        writeLine(text: string): void;
        /**
         * Writes the specified text info to the display.
         *
         * @param info The text info to display.
         */
        writeText(info: TextInfo): void;
        /**
         * Writes the specified text infos to the display.
         *
         * @param infos Array of text information to display.
         */
        writeTextArray(infos: TextInfo[]): void;
        /**
         * Writes the specified text info to the display with a termination line feed.
         *
         * @param info The text info to display.
         */
        writeTextLine(info: TextInfo): void;
        /**
         * See base.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        /**
         * Trims the overflown display.
         *
         * @param container The container with the text elements to trim.
         * @param amountToTrim The amount of text being requested to trim.
         * @return The actual amount trimmed.
         */
        _trim(container: JQuery, amountToTrim: number): number;
        /**
         * Trims within the set of elements from the display from start towards end.
         *
         * @param elements The elements to trim from in order.
         * @param amountToTrim The amount of text being requested to trim.
         * @return The actual amount trimmed.
         */
        _trimElements(elements: JQuery, amountToTrim: number): number;
        /**
         * Writes out the text information but does not update the ui.
         * This is the common function that all writes go through.
         *
         * @param text The text to display.
         * @param lineFeed Indicates if a linefeed should be added to the text.
         * @param classifier The classifier to apply to the text.
         * @param emphasis The emphasis to apply to the text.
         */
        _write(text: string, lineFeed: boolean, classifier: string, emphasis: Emphasis): void;
        /**
         * Handles click event.
         *
         * @param evt The event object.
         */
        private _click(evt);
        /**
         * Handles changes to the buffer max size.
         *
         * @param max The new max.
         */
        private _onMax(max);
        /**
         * Handles changes to the wrap setting.
         *
         * @param wrap The new wrap value.
         */
        private _onWrap(wrap);
        /**
         * Updates the scrollbars to be in sync with latest content.
         */
        private _updateScrollbar();
        /**
         * Updates the scrollbars if an update has been requested and not processed.
         */
        private _updateScrollbarHandler();
    }
}
