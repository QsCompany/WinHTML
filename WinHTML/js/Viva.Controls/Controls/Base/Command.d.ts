/// <reference path="../../../Definitions/jquery.d.ts" />
/// <reference path="../../../Definitions/knockout.d.ts" />
/// <reference path="../../../Definitions/q.d.ts" />
import Promise = require("./Promise");
import Base = require("./Base");
export = Main;
declare module Main {
    /**
     * Command execution status.
     */
    enum Status {
        /**
         * Command has not been executed.
         */
        None = 0,
        /**
         * Command is in the process of executing.
         */
        Pending = 1,
        /**
         * Command execution succeded.
         */
        Success = 2,
        /**
         * Command execution failed.
         */
        Failure = 3,
    }
    /**
     * Command callback interface.
     */
    interface Callback {
        /**
         * Execution completion callback.
         */
        completed: (status: Status, errrorMessage?: string) => void;
    }
    /**
     * Command handler interface.
     */
    interface Handler {
        /**
         * Determines if the command is currently executable.
         */
        canExecute: KnockoutComputed<boolean>;
        /**
         * Executes the command.
         */
        execute: () => void;
    }
    /**
     * Command base view model.
     */
    class ViewModel extends Base.ViewModel {
        private _invokeSubscription;
        private _handler;
        /**
         * Indicates if the command should be displayed.
         * This can be changed  to hide/show the command.
         * It is up to UI consumers of the command to determine how to hide/show based on this value.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * The command display text.
         * It is up to UI consumers of the command to determine how to show the text.
         */
        text: KnockoutObservable<string>;
        /**
         * The latest command status.
         */
        status: KnockoutObservable<Status>;
        /**
         * The latest command error.
         */
        error: KnockoutObservable<any>;
        /**
         * Invokes command execution.
         */
        invoke: KnockoutObservable<Callback>;
        /**
         * Handles the command execution.
         */
        handler: KnockoutObservable<Handler>;
        /**
         * Notification that command execution has occured.
         */
        afterExecute: () => void;
        /**
         * Creates a command view model.
         *
         * @param text The command text.
         * @param enabled The default enabled state.
         * @param visible The default visiblity.
         */
        constructor(text?: string, execute?: () => void, canExecute?: () => boolean);
        /**
         * Executes the command.
         *
         * @return Callback promise for completion or failure.
         */
        execute(): Promise.Promise;
        /**
         * Attaches to the command.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        attach(execute?: () => void, canExecute?: () => boolean): void;
        /**
         * Attaches handler to the command.
         *
         * @param handler The command handler to attach.
         */
        attachHandler(handler: Handler): void;
        /**
         * Detaches from the command.
         */
        detach(): void;
        /**
         * Executes handler and makes callbacks.
         *
         * @param handler The command handler.
         * @param callback The execution callback.
         */
        private _execute(handler, callback);
    }
    /**
     * Basic command handler implementation.
     */
    class DelegatingHandler implements Handler {
        /**
         * Indicates if the command can be executed.
         */
        canExecute: KnockoutComputed<boolean>;
        /**
         * Executes the command.
         */
        execute: () => void;
        /**
         * Creates a delegating command handler.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        constructor(execute: () => void, canExecute?: () => boolean);
    }
}
