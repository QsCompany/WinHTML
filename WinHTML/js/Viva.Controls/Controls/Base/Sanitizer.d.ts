export = Main;
declare module Main {
    interface Sanitizer {
        /**
         * Sanitizes the html to host requirements.
         *
         * @param sourceDescription A descriptive string describing the namespace where the call is being made for error reporting.
         * @param html The untrusted html.
         * @return The trusted html.
         */
        sanitizeHTML(sourceDescription: string, html: string): string;
        /**
         * Indicates if the uri meets host requirements.
         *
         * @param uri The untrusted uri.
         * @return If the uri should be trusted.
         */
        sanitizeUri(uri: string): boolean;
    }
}
