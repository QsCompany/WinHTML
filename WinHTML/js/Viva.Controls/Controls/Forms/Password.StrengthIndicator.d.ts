import Password = require("./Password");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * The current strength.
         */
        strength: KnockoutObservable<Password.Strength>;
        /**
         * The text to be displayed when the password strength is Viva.Controls.Forms.Password.StrengthIndicator.Strength.VeryWeak.
         */
        textVeryWeak: string;
        /**
         * The text to be displayed when the password strength is Strength.Weak.
         */
        textWeak: string;
        /**
         * The text to be displayed when the password strength is Strength.VeryFair.
         */
        textFair: string;
        /**
         * The text to be displayed when the password strength is Strength.Strong.
         */
        textStrong: string;
        /**
         * The text to be displayed when the password strength is Viva.Controls.Forms.Password.StrengthIndicator.Strength.VeryStrong.
         */
        textVeryStrong: string;
    }
    class Widget extends Base.Widget implements Interface {
        private _colorBar;
        private _strengthDescriptions;
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
        private _initializeComputeds();
    }
}
