import Command = require("./Base/Command");
import CompositeControl = require("./Base/CompositeControl");
import Base = require("./Base/Base");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
        /**
         * Clears the content of the Console Log.
         */
        clear(): void;
        /**
         * Submits the content of the command line to be executed.
         */
        submit(): void;
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * Command output expose by the view model to be read by the console interface or backend service and executed.
         */
        command: KnockoutObservable<string>;
        /**
         * Creates text log displayed to the console log.
         */
        text: KnockoutObservable<string>;
        /**
         * Creates information log displayed to the console log.
         */
        info: KnockoutObservable<string>;
        /**
         * Creates success log displayed to the console log.
         */
        success: KnockoutObservable<string>;
        /**
         * Creates warning log displayed to the console log.
         */
        warning: KnockoutObservable<string>;
        /**
         * Creates error log displayed to the console log.
         */
        error: KnockoutObservable<string>;
        /**
         * Provides the text used for the CLI prompt.
         */
        prompt: KnockoutObservable<string>;
        /**
         * Clears the console.
         */
        clear: Command.ViewModel;
        /**
         * Constructs a console view model.
         */
        constructor();
    }
    /**
     * Console Control Composite Widget.
     * Composed of a LogStream Control Widget and a CommandLineInterface.
     */
    class Widget extends CompositeControl.Widget implements Interface {
        private _log;
        private _cli;
        private _scroll;
        private _contentElement;
        private _eventKeyPressHandler;
        private _eventKeyDownHandler;
        private _eventPasteHandler;
        private _eventFocusHandler;
        private _eventBlurHandler;
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
         * Destroys the widget.
         */
        dispose(): void;
        /**
         * The view model driving this widget.
         *
         * @return ViewModel.
         */
        options: ViewModel;
        /**
         * Attaches events to the element of the Console widget.
         */
        private _attachEvents();
        /**
         * Detaches events from the element of the Console widget.
         */
        private _detachEvents();
        /**
         * See base.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        /**
         * Clears the content of the console log display.
         */
        clear(): void;
        /**
         * Submits the user input of the command line interface.
         */
        submit(): void;
        /**
         * Displays a headline information log to the user in the console log.
         */
        headline(text: string): void;
        /**
         * Returns the user command line prompt string.
         *
         * @return String representing the command line prompt string.
         */
        private _prompt();
        /**
         * Sets the user command line prompt string.
         *
         * @param text The string representing the new command line prompt.
         */
        private _prompt(text);
        /**
         * Submits the user input from the command line interface to the console log and the view model.
         *
         * @param input The command input to be forwarded.
         */
        private _forwardCommand(input);
        /**
         * Logs text.
         *
         * @param text The text to log.
         */
        private _logMessage(text, type);
        /**
         * Refreshes the scrollbar size and scrolls the cursor into view.
         */
        private _refreshScroll();
    }
}
