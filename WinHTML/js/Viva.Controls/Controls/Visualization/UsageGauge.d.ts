import Gauge = require("./Gauge");
import SingleSetting = require("../SingleSetting");
import CompositeControl = require("../Base/CompositeControl");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    interface Interface extends CompositeControl.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends CompositeControl.ViewModel {
        /**
         * Gauge view model.
         */
        gauge: Gauge.ViewModel;
        /**
         * Center SingleSetting view model.
         */
        center: SingleSetting.ViewModel;
        /**
         * Footer SingleSetting view model.
         */
        footer: SingleSetting.ViewModel;
        /**
         * Hide the gauge.
         */
        hideGauge: KnockoutObservableBase<boolean>;
        /**
         * Hide the center content.
         */
        hideCenter: KnockoutObservableBase<boolean>;
        /**
         * Hide the footer content.
         */
        hideFooter: KnockoutObservableBase<boolean>;
        /**
         * Default gauge center text (using SVG) to false. Instead we rely on center (SingleSetting) for prettier text.
         */
        gauge_showCenterText: KnockoutObservableBase<boolean>;
        /**
         * Default gauge.showCurrentline to false.  User needs to explicit opt in during the initialization.
         */
        gauge_showCurrentLine: KnockoutObservableBase<boolean>;
    }
    class Widget extends CompositeControl.Widget implements Interface {
        private _gaugeWidget;
        private _centerSettingWidget;
        private _footerSettingWidget;
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
    }
}
