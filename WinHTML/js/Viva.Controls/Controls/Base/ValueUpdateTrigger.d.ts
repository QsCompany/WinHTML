export = Main;
declare module Main {
    /**
     * Default delay validation timeout which will be used by controls supporting continous key update and delayed validation.
     */
    var DefaultDelayValidationTimeout: number;
    /**
     * Enum to indicate when to trigger value updates.
     */
    enum ValueUpdateTrigger {
        /**
         * Maps to one of the other value update trigger values. Which one is up to the controls code to decide.
         */
        Default = 0,
        /**
         * Trigger value updates as soon as user types a character.
         */
        AfterKeyDown = 1,
        /**
         * Trigger value updates as soon as user types a character (including repeated keys).
         */
        KeyPress = 2,
        /**
         * Trigger value update on blur.
         */
        Blur = 3,
        /**
         * Trigger value update on input Event (IE 9+) .
         */
        Input = 4,
    }
}
