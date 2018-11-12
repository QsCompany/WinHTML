import SliderBase = require("../Base/SliderBase");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for slider widget.
     */
    interface Interface extends SliderBase.Interface<number> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends SliderBase.ViewModel<number> {
        constructor();
    }
    /**
     * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
     * Support ARIA with arrow keypress.
     */
    class Widget extends SliderBase.Widget<number> implements Interface {
        private _name;
        private _sliderRangePercentage;
        private _sliderHandleAlignPercentage;
        private _sliderHandle;
        private _keyUpHandler;
        private _keyDownHandler;
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
        _initializeSubscriptions(viewModel: any): void;
        _attachEvents(): void;
        _detachEvents(): void;
        _updateSliderHandle(xCoord: number, yCoord: number): void;
        private _processKeyDownEvent(evt);
        private _addAttributes();
        private _removeAttributes();
    }
}
