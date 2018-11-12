/// <reference path="../../Definitions/jquery.d.ts" />
import Positioning = require("../Util/Positioning");
export = Main;
declare module Main {
    interface MouseCompanionOptions {
        /**
         * Forces the cursor to be a specific value.
         * If not specified, the cursor might change as the mouse move over different component of the page.
         * If multiple elements are added, the last forced cursor takes precedence.
         */
        forceCursor?: string;
        /**
         * Initial position where the element should be positioned.
         * If not provided, the element will be positioned on the next mouse move.
         */
        initialPosition?: Positioning.Position;
        /**
         * Position where the element should be placed.
         * The cursor size is considered as 16x16.
         * Defaults to RightBottom.
         */
        positionAlignment?: Positioning.PositioningAlignment;
        /**
         * Offset where the box should be. Can contain negative values.
         */
        offset?: Positioning.Position;
    }
    interface IMouseCompanion {
        /**
         * Adds the HTML element to follow the cursor.
         *
         * @param element HTML element to follow the cursor.
         * @param options Other options associated with the mouse companion.
         */
        add(element: HTMLElement, options?: MouseCompanionOptions): void;
        /**
         * Adds the JQuery element to follow the cursor. If the JQuery object contains multiple element, only the first one is taken.
         *
         * @param element JQuery element to follow the cursor.
         * @param options Other options associated with the mouse companion.
         */
        add(element: JQuery, options?: MouseCompanionOptions): void;
        /**
         * Removes the HTML element from the cursor.
         *
         * @param element HTML element that has been previously added to follow the cursor.
         */
        remove(element: HTMLElement): void;
        /**
         * Removes the JQuery element from the cursor.
         *
         * @param element JQuery element that has been previously added to follow the cursor. It doesn't have to be the same JQuery object.
         */
        remove(element: JQuery): void;
    }
    var MouseCompanion: IMouseCompanion;
}
