/// <reference path="../../Definitions/jquery.d.ts" />
export = Main;
declare module Main {
    enum Alignment {
        /**
         * Top edge for vertical alignment.
         */
        Top = 1,
        /**
         * Left edge for horizontal alignment.
         */
        Left = 2,
        /**
         * Right edge for horizontal alignment.
         */
        Right = 4,
        /**
         * Bottom edge for vertical alignment.
         */
        Bottom = 8,
    }
    enum PositioningAlignment {
        /**
         * Left edge for horizontal alignment, top edge for vertical alignment.
         */
        LeftTop = 3,
        /**
         * Right edge for horizontal alignment, top edge for vertical alignment.
         */
        RightTop = 5,
        /**
         * Left edge for horizontal alignment, bottom edge for vertical alignment.
         */
        LeftBottom = 10,
        /**
         * Right edge for horizontal alignment, bottom edge for vertical alignment.
         */
        RightBottom = 12,
    }
    enum OverflowBehavior {
        /**
         * Nothing performed when overflow occurs. Element will be clipped.
         */
        None = 1,
        /**
         * Element will be kept always in the window which may result overlap between positioned and base element.
         */
        Fit = 2,
        /**
         * Element will be positioned on the other side of the base element if overflow occurs.
         */
        Flip = 3,
    }
    interface PositioningOptions {
        /**
         * Determines which horizontal and vertical edges of the positioned element are used alignment (like right-top).
         */
        elementAlign?: PositioningAlignment;
        /**
         * Determines which horizontal and vertical edges of the base element are used alignment (like right-bottom).
         */
        baseAlign?: PositioningAlignment;
        /**
         * Specifies the horizontal overflow behavior applied when positioned element does not fit into visible area. Default is fit.
         */
        horizontalOverflowBehavior?: OverflowBehavior;
        /**
         * Specifies the vertical overflow behavior applied when positioned element does not fit into visible area. Default is flip.
         */
        verticalOverflowBehavior?: OverflowBehavior;
    }
    interface Position {
        /**
         * Top value of a positioned element.
         */
        top: number;
        /**
         * Left value of a positioned element.
         */
        left: number;
    }
    class Positioning {
        /**
         * Positions the given element by taking the specified base element as a reference
         * using the options.
         *
         * It supports horizontally and vertically fitting/flipping if overflow occurs.
         *
         * Sample usage: Viva.Controls.Util.Positioning.position(element, baseElement, { elementAlign: "left-top", baseAlign: "left-bottom", overflow: "fit-flip" });
         *
         * @param element Element to be positioned.
         * @param baseElement Reference element for positioning.
         * @param options Positioning options like elementAlign ("left-top"), baseAlign ("left-bottom"), overflow ("fit-flip").
         */
        static position(element: JQuery, baseElement: JQuery, options?: PositioningOptions): void;
        private static _topOverflow(top);
        private static _bottomOverflow(bottom);
        /**
         * Fits the positioned element horizontally by using the base element if any overflow exists.
         *
         * @param position Position of the element.
         * @param overflowData Details about the element and base element like size and alignment.
         */
        private static _fitHorizontal(position, overflowData);
        /**
         * Flips the positioned element horizontally by using the base element if any overflow exists.
         *
         * @param position Position of the element.
         * @param overflowData Details about the element and base element like size and alignment.
         */
        private static _flipHorizontal(position, overflowData);
        /**
         * Fits the positioned element vertically by using the base element if any overflow exists.
         * If still overflow exists after fitting, it shrinks the element where it best fits.
         *
         * @param position Position of the element.
         * @param overflowData Details about the element and base element like size and alignment.
         * @return Overflow result which contains information like shrink needed or not.
         */
        private static _fitVertical(position, overflowData);
        /**
         * Flips the positioned element vertically by using the base element if any overflow exists.
         * If still overflow exists after flipping, it shrinks the element where it best fits.
         *
         * @param position Position of the element.
         * @param overflowData Details about the element and base element like size and alignment.
         * @return Overflow result which contains information like shrink amount.
         */
        private static _flipVertical(position, overflowData);
    }
}
