import SliderBase = require("../Base/SliderBase");
import Base = require("../Base/Base");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for slider widget.
     */
    interface Interface extends SliderBase.Interface<string> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends SliderBase.ViewModel<string> {
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
        /**
         * Value separator for combining the range into a single string value. For example, "2;6". Default is ";".
         */
        valueSeparator: string;
    }
    /**
     * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
     * Support ARIA with arrow keypress.
     */
    class Widget extends SliderBase.Widget<string> implements Interface {
        private _name;
        private _rangeSliderStartHandleAlignPercentage;
        private _rangeSliderEndHandleAlignPercentage;
        private _rangeSliderWidthAlignPercentage;
        private _sliderStartHandle;
        private _sliderEndHandle;
        private _startHandleMouseDownHandler;
        private _startHandleMouseMoveHandler;
        private _endHandleMouseDownHandler;
        private _endHandleMouseMoveHandler;
        private _keyUpHandlerForStart;
        private _keyDownHandlerForStart;
        private _keyUpHandlerForEnd;
        private _keyDownHandlerForEnd;
        private _rangeSliderHandleSliding;
        _start: KnockoutObservable<number>;
        _end: KnockoutObservable<number>;
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
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        _initializeSubscriptions(viewModel: ViewModel): void;
        _attachEvents(): void;
        _detachEvents(): void;
        _updateSliderHandle(xCoord: number, yCoord: number): void;
        private _processKeyDownEventForStart(evt);
        private _processKeyDownEventForEnd(evt);
        private _addAttributes();
        private _removeAttributes();
        private _updateStartEnd(valueStart, valueEnd);
        private _initializeAdditionalComputeds();
    }
}
