import Positioning = require("../Util/Positioning");
import Base = require("./Base/Base");
import DockedBalloon = require("./DockedBalloon");
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
         * The value of the setting.
         */
        value: KnockoutObservableBase<string>;
        /**
         * The unit of the setting.
         */
        unit: KnockoutObservableBase<any>;
        /**
         * Unit alignment. Currently only support Right or Left.
         * Defaults to Right.
         */
        unitAlignment: KnockoutObservableBase<Positioning.Alignment>;
        /**
         * The caption of the setting.
         */
        caption: KnockoutObservableBase<string>;
        /**
         * Caption alignment. Currently only support Top or Bottom.
         * Defaults to Bottom.
         */
        captionAlignment: KnockoutObservableBase<Positioning.Alignment>;
        /**
         * Shows an info balloon displaying the help content
         */
        infoBalloon: KnockoutObservableBase<DockedBalloon.ViewModel>;
    }
    class Widget extends Base.Widget implements Interface {
        private _captionAtTop;
        private _unitAtLeft;
        private _imageAltText;
        private _captionExists;
        private _unitExists;
        private _valueExists;
        private _infoBalloonExists;
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
        _initializeComputeds(): void;
    }
}
