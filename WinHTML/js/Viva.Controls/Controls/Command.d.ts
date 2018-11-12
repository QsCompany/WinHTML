import Promise = require("./Base/Promise");
export = Main;
declare module Main {
    interface Command<T> {
        /**
         * A value indicating whether or not the command can be executed.
         */
        canExecute: KnockoutObservableBase<boolean>;
        /**
         * Executes the specified command.
         *
         * @param context The context under which the command is executed.
         * @returns The promise for execution completion.
         */
        execute(context: T): Promise.Promise;
    }
}
