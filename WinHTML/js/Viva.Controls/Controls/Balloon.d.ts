import Base = require("./Base/Base");
export = Main;
declare module Main {
    /**
     * Gets the boundaries of a specific object.
     *
     * @param selector A valid jQuery selector.
     * @return A Box object to be used when invoking the Balloon widget.
     */
    function getBox(selector: JQuery): Box;
    /**
     * Gets the boundaries of a specific object.
     *
     * @param selector A valid jQuery selector as an HTMLElement.
     * @return A Box object to be used when invoking the Balloon widget.
     */
    function getBox(selector: HTMLElement): Box;
    /**
     * Gets the boundaries of a specific object.
     *
     * @param selector A valid jQuery selector string.
     * @return A Box object to be used when invoking the Balloon widget.
     */
    function getBox(selector: string): Box;
    /**
     * Hides all of the balloons, except the one represented by the currentObj parameter if specified.
     *
     * @param currentObj The object of the balloon that should not be closed.
     */
    function hideAllBalloons(currentObj?: any): void;
    enum Position {
        /**
         * Display the balloon on top.
         */
        Top = 0,
        /**
         * Display the balloon on the right.
         */
        Right = 1,
        /**
         * Display the balloon on the bottom.
         */
        Bottom = 2,
        /**
         * Display the balloon on the left.
         */
        Left = 3,
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface Offset extends StringMap<number> {
        /**
         * Pixel offset applied in the preferred layout is rendered.
         */
        preferred: number;
        /**
         * Pixel offset applied in the alternate layout is rendered (due to space constraints).
         */
        alternate: number;
    }
    interface Link extends StringMap<string> {
        /**
         * Link text.
         */
        linkText: string;
        /**
         * Link Uri.
         */
        linkUri: string;
    }
    interface Box extends StringMap<number> {
        /**
         * Vertical distance from the top-left corner (0,0).
         */
        top: number;
        /**
         * Horizontal distance from the top-left corner (0,0).
         */
        left: number;
        /**
         * Width of the box.
         */
        width: number;
        /**
         * Height of the box.
         */
        height: number;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * Whether the balloon is visible or not.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * The box relative to which the balloon will be rendered.
         */
        box: KnockoutObservable<Box>;
        /**
         * The content to display the balloon. It can be empty if there's existing content in the element.
         */
        content: KnockoutObservable<string>;
        /**
         * The position where the balloon will show around the element (Top, Right, Bottom, Left).
         */
        position: KnockoutObservable<Position>;
        /**
         * The amount to offset the pointer when the balloon is in a horizontal layout.
         */
        horizontalOffset: Offset;
        /**
         * The link to display in the balloon.
         */
        link: KnockoutObservable<Link>;
        /**
         * The amount to offset the pointer when the balloon is in a vertical layout.
         */
        verticalOffset: Offset;
        /**
         * jQuery selector string representing the element to append the balloon element to.
         */
        appendTo: string;
        /**
         * Hides all the other balloons that have been previously opened when shown.
         */
        closeOtherBalloons: boolean;
    }
    class Widget extends Base.Widget implements Interface {
        private static _defaultAppendTo;
        private _originalParent;
        private _balloonMeasurer;
        private _id;
        private _noFadeOnNextHide;
        private _resizeEventHandler;
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
         * Returns the default container to append balloons to.
         *
         * @return A string selector for the default balloon container.
         */
        static getDefaultAppendTo(): string;
        /**
         * Sets the default container to append balloons to.
         *
         * @param appendTo The string selector for the default balloon container.
         */
        static setDefaultAppendTo(appendTo: string): void;
        /**
         * Hides the balloon from the screen.
         */
        private _hide();
        /**
         * Shows the balloon around a set of boundaries represented as a Box.
         * To get the boundaries of an element as a Box, call Viva.Controls.Balloon.getBox(selector).
         * The Box values are relative to the appendTo option.
         */
        private _show();
        private _attachEvents();
        private _detachEvents();
        /**
         * See parent.
         */
        _initializeSubscriptions(viewModel: ViewModel): void;
        private _getAlternatePosition(position);
        private _getSidePositionKey(position);
        private _getOtherSidePosition(position);
        private _getSizeKey(position);
        private _getOtherSizeKey(position);
        private _removePointerClass();
        private _readCssAndSetBaseline(balloon, box, position);
        private _resizeWindow(evt);
        private _getBalloonBox(box, position, maxWidth);
    }
}
