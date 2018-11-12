export = Main;
declare module Main {
    class ClickableLink {
        /**
         * The URI that will be opened.
         */
        uri: KnockoutObservable<string>;
        /**
         * The link target. Target is _blank if unspecified.
         */
        target: KnockoutObservable<string>;
        /**
         * Construct an instance of the view model.
         *
         * @param uri The URI that will be opened when target is clicked.
         * @param target The link target.
         */
        constructor(uri: KnockoutObservable<string>, target?: KnockoutObservable<string>);
    }
}
