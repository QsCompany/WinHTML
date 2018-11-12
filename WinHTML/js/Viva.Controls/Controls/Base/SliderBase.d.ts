import ValidatableControl = require("./ValidatableControl");
import Base = require("./Base");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for slider widget.
     */
    interface Interface<T> extends ValidatableControl.Interface<T> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel<T>;
    }
    class ViewModel<T> extends ValidatableControl.ViewModel<T> {
        /**
         * Minimum value displayed by the slider.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value displayed by the slider.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Sets the minimum valid value for the slider. Can be different than minimum displayed value.
         */
        slidableMin: KnockoutObservableBase<number>;
        /**
         * Sets the maximum valid value for the slider. Can be different than maximum displayed value.
         */
        slidableMax: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Determines the number of steps the the slider should move on page up and page down.
         */
        numStepsPerPage: number;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
    }
    /**
     * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
     * Support ARIA with arrow keypress.
     */
    class Widget<TValue> extends ValidatableControl.Widget<TValue> implements Interface<TValue> {
        _slider: JQuery;
        _sliderInput: JQuery;
        _mouseUpHandler: JQueryEventHandler;
        _mouseDownHandler: JQueryEventHandler;
        _mouseMoveHandler: JQueryEventHandler;
        _sliderHandleHasFocus: KnockoutObservable<boolean>;
        _sliderHandleSliding: KnockoutObservable<boolean>;
        _slidableMin: KnockoutObservableBase<number>;
        _slidableMax: KnockoutObservableBase<number>;
        _values: KnockoutComputed<number[]>;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: any, createOptions: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel<TValue>;
        /**
         * Attaches the respective events.
         */
        _attachEvents(): void;
        /**
         * Detaches the respective events.
         */
        _detachEvents(): void;
        /**
         * Handles the key down event on the handle
         *
         * @param evt the key down event object.
         * @param minValue The min value the functions should return.
         * @param maxValue The max value the functions should return.
         * @param curValue The default value value the functions should return.
         * @return The new value of the for the widget.
         */
        _processKeyDownOnHandleEvent(evt: JQueryEventObject, minValue: number, maxValue: number, curValue: number): number;
        /**
         * Handles the key down event on the handle.
         *
         * @param evt The key down event object.
         */
        _processKeyUpEvent(evt: JQueryEventObject): void;
        /**
         * Function which updates the slider handle position. This funtion is called from _processMouseEvent.
         * derived classes MUST override this method.
         *
         * @param xCoord The x coordinate for the mouse event object.
         * @param yCoord The y coordinate for the mouse event object.
         */
        _updateSliderHandle(xCoord: number, yCoord: number): void;
        /**
         * Returns the percentage value of the given input value within the slider range.
         *
         * @param currentValue Current value.
         * @return The percentage value for the given input value within the slider range.
         */
        _getSliderRelativePositionPercentage(currentValue: number): number;
        /**
         * Returns the value closest possible steps from the mouse position.
         *
         * @param xCoord x-Coordinate of the mouse.
         * @param yCoord y-Coordinate of the mouse.
         * @return The normalized value.
         */
        _normalizeValueFromMouseCoord(xCoord: number, yCoord: number): number;
        _trimAndAlignValue(value: number): number;
        _processMouseEvent(evt: JQueryEventObject): boolean;
        _computedSlidableMin(): number;
        _computedSlidableMax(): number;
        private _initializeComputeds();
        private _slidingKey(eventKey);
    }
}
