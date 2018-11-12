/**
 * Module for hexagon related classes.
 */
import MapCoordinateConverter = require("./MapCoordinateConverter");
import Map = require("./Map");
export = Main;
declare module Main {
    /**
     * The hexagon offset coordinate.
     * The top left coordinate is row 0 column 0
     *
     *      ____        ____
     *     /    \      /    \
     *    /      \____/ 0,2  \
     *    \ 0,0  /    \      /
     *     \____/ 0,1  \____/
     *     /    \      /    \
     *    /1,0   \____/ 1,2  \
     *    \      /    \      /
     *     \____/ 1,1  \____/
     *          \      /
     *           \____/
     */
    class HexagonOffsetCoord {
        /**
         * row number from top left
         */
        row: number;
        /**
         * column number from top left
         */
        column: number;
        /**
         * Construct a hexagon offset coord
         *
         * @param row the row of hexagon
         * @param column the column of hexagon
         */
        constructor(row: number, column: number);
        /**
         * Determine if two hexagon offset coord are the equal
         *
         * @param rhs the right hand side hexagon offset coord
         * @return true if two hexagon offset coords are the same false if not.
         */
        equals(rhs: HexagonOffsetCoord): boolean;
    }
    /**
     * The hexagon coordinate mapped to 3d cube.
     * Each hexagon has three axis
     *             _____
     *            /     \
     *           /   z   \
     *     ,----<    z    >----.
     *    /  x   \   z   /    y \
     *   /     x  \__z__/   y    \
     *   \       x/  z  \ y      /
     *    \      / x    y\      /
     *     >----<    x    >----<
     *    /      \ y z x /      \
     *   /      y \__z__/x       \
     *   \    y   /  z  \  x     /
     *    \      /   z   \   x  /
     *     `----<    z    >----'
     *           \       /
     *            \_____/
     * In cube coordinate, the axes are in (x, y ,z) indicating the offset of each axis
     */
    class HexagonCubeCoord {
        /** x */
        x: number;
        /** y */
        y: number;
        /** z */
        z: number;
    }
    /**
     * The bounding box of the hexagon as illustrated below.
     *
     *     2 * R
     * O__________
     * | /     \  |
     * |/       \ |
     * <         >|  sqrt(3) * R
     * |\       / |
     * |_\_____/__X
     */
    class HexagonBoundingBox {
        /**
         * x coordinate of the top left point O
         */
        x: number;
        /**
         * y coordinate of the top left point O
         */
        y: number;
        /**
         * Width of the bounding box.
         */
        width: number;
        /**
         * Height of the bounding box.
         */
        height: number;
    }
    /**
     * Represent a connected and segmented link line between two hexagons.
     */
    class HexagonLinkLine {
        /**
         * A number used to indicate the type of the link line.
         */
        linkLineType: number;
        /**
         * An array of endpoints for the line segments.
         */
        private _endPoints;
        /**
         * Constructor
         *
         * @param endPoints an array of endpoints for the line segments.
         */
        constructor(endPoints: Map.ScreenCoord[]);
        /**
         * Get the polyline points string in the SVG format.
         *
         * @return the string for points in SVG format.
         */
        getSvgPolylinePoints(): string;
        /**
         * Convert to string.
         *
         * @return the string representation of the object.
         */
        toString(): string;
    }
    /**
     * Link between hexagons.
     */
    class HexagonLink {
        /**
         * Source hexagon's offset coord
         */
        source: HexagonOffsetCoord;
        /**
         * Destination hexagon's offset coord
         */
        destination: HexagonOffsetCoord;
        /**
         * A number indicating the type of the link.
         */
        linkType: number;
        /**
         * Convert to string.
         *
         * @return the string representation of the object.
         */
        toString(): string;
    }
    /**
     * Represent the six vertices of a hexagon.
     */
    class HexagonVertices {
        /**
         * The vertices of the hexagon.
         */
        private _vertices;
        /**
         * constructor
         *
         * @param vertices the vertices of a hexagon. It must has 6 items.
         */
        constructor(vertices: Map.ScreenCoord[]);
        /**
         * Get the polygon points in SVG format for the vertices.
         *
         * @return the string representation of the point.
         */
        getSvgPolygonPoint(): string;
    }
    /**
     * Properties of a hexagon.
     */
    class Hexagon {
        /**
         * The offset coordinate of the hexagon
         */
        hexagonOffsetCoord: HexagonOffsetCoord;
        /**
         * the scale factor of the hexagon.
         */
        hexagonScale: number;
        /**
         * Constructor with hexagonOffsetCoord
         */
        constructor(hexagonOffsetCoord: HexagonOffsetCoord);
        /**
         * String representation of a hexagon.
         */
        toString(): string;
    }
    /**
     * This class represent an odd-q hexagon grid like below.
     *
     *      ____        ____
     *     /    \      /    \
     *    /      \____/ 0,2  \
     *    \ 0,0  /    \      /
     *     \____/ 0,1  \____/
     *     /    \      /    \
     *    /1,0   \____/ 1,2  \
     *    \      /    \      /
     *     \____/ 1,1  \____/
     *          \      /
     *           \____/
     */
    class HexagonGrid {
        /**
         * The linking line between hexagons.
         */
        private _hexagonLinks;
        /**
         * The radius of a hexagon is the distance from the center of hexagon to one vertex.
         *    _____
         *   /\ R  \
         *  /  \    \
         * <    o    >
         *  \       /
         *   \__ __/
         */
        private _radius;
        /**
         * The height of a hexagon is the distance from one side to the opposite side of a hexagon.
         *    _____
         *   /  |  \
         *  /   |   \
         * <    | H  >
         *  \   |   /
         *   \__|__/
         */
        private _height;
        /**
         * The width of a hexagon the distance from one vertex to the other vertex
         *    _____
         *   /\    \
         *  /  \    \
         * <    \W   >
         *  \    \  /
         *   \__ _\/
         */
        private _width;
        /**
         * The side of a hexagon is the distance from left most vertex to the right of top edge.
         * this is used do conversion of hexagon grid coordinate and screen coordinate
         *
         *    ___S____
         *   |       |
         *   |  _____|
         *   | /     \
         *   |/       \
         *   <         >
         *    \       /
         *     \_____/
         */
        private _side;
        /**
         * The hexagons stored in the grid.
         */
        private _hexagons;
        /**
         * The number of rows in the hexagon grid.
         */
        private _rows;
        /**
         * The number of columnsin the hexagon grid.
         */
        private _columns;
        /**
         * The SVG element.
         */
        private _svgElement;
        /**
         * The converter to convert the map coordinate latitude/ longitude.
         */
        private _mapCoordinateConverter;
        /**
         * Constructor
         *
         * @param svgElement the SVG element for the map overlay.
         * @param mapCoordinateConverter the converter to translate lat/long to screen coord
         * @param rows the number of rows.
         * @param columns the number of columns.
         */
        constructor(svgElement: SVGElement, mapCoordinateConverter: MapCoordinateConverter.MapCoordinateConverter, rows: number, columns: number);
        /**
         * Add a hexagon to the hexagon grid
         */
        addHexagon(hexagon: Hexagon): void;
        /**
         * Add a hexagon link between two hexagons
         */
        addHexagonLink(hexagonLink: HexagonLink): void;
        /**
         * Remove a hexagon link
         */
        removeHexagonLink(hexagonLink: HexagonLink): void;
        /**
         * Get all hexagon link lines.
         *
         * @return all the hexagon link lines
         */
        getAllHexagonLinkLines(): HexagonLinkLine[];
        /**
         * Get the text drawing screen coord on a hexagon
         *
         * @param hexagonOffsetCoord the hexagon offset coord to draw text
         * @return the screen coord for the text region lower left corner.
         */
        getTextDrawingScreenCoord(hexagonOffsetCoord: HexagonOffsetCoord): Map.ScreenCoord;
        /**
         * Get the hexagon offset coord from the latitude and longitude
         *
         * @param latLong the latitude and longitude
         * @return the hexagon offset coord.
         */
        getHexagonOffsetCoordFromLatLong(latLong: Map.Location): HexagonOffsetCoord;
        /**
         * Get the hexagon vertices for a hexagon
         *
         * @param hexagonCoord the hexagon offset coord for a hexagon.
         * @return the vertices for the hexagon.
         */
        getHexagonVerticesForCoord(hexagonCoord: HexagonOffsetCoord): HexagonVertices;
        /**
         * Remove the hexagon data in the hexagon grid. Re-initialize the parameters.
         *
         * @param rows the new row number
         * @param columns the new column number
         */
        reset(rows: number, columns: number): void;
        /**
         * Remove a hexagon from the hexagon grid
         */
        removeHexagon(hexagon: Hexagon): void;
        /**
         * Get the bounding box of the hexagon
         *
         * @param hexagonCoord the hexagon offset coord for the hexagon
         * @return the bounding box of the hexagon
         */
        getHexagonBoundingBox(hexagonCoord: HexagonOffsetCoord): HexagonBoundingBox;
        /**
         * Get the hexagon offset coordinate from the screen coordinate.
         *
         * @param screenCoord the screen coordinate
         * @return the hexagon's offset coordinate
         */
        private _getHexagonOffsetCoordFromScreenCoord(screenCoord);
        /**
         * Check if a point is in a tringle area.
         * @param pt the point to check
         * @param v1 tringle vertex 1
         * @param v2 tringle vertex 2
         * @param v3 tringle vertex 3
         */
        private _isPointInTriangle(pt, v1, v2, v3);
        /**
         * Get the hexagon added before using hexagon offset coord.
         *
         * @param hexagonCoord the hexagon offset coordinate.
         * @return the the hexagon object if it is added on that hexagon offset coord
         */
        private _getHexagonFromHexagonOffsetCoord(hexagonCoord);
        /**
         * Get the hexagon screen coord.
         *
         * @param hexagonCoord the hexagon offset coord
         * @return the screen coord of the upper left corner of the hexagon as indicated by point p.
         *   p_______
         *   | /     \
         *   |/       \
         *   <         >
         *    \       /
         *     \__ _ /
         */
        private _getHexagonScreenCoord(hexagonCoord);
        /**
         * Get the screen coord of the center point of a hexagon
         *
         * @param hexagonCoord the hexagon offset coord for the hexagon
         * @return the screen coord of the center of the hexagon
         */
        private _getHexagonCenterPoint(hexagonCoord);
        /**
         * Get the screen coord of the bottom point of a hexagon
         *
         * @param hexagonCoord the hexagon offset coord for the hexagon
         * @return the screen coord of the bottom center of the hexagon
         */
        private _getHexagonBottomCenterPoint(hexagonCoord);
        /**
         * Get the screen coord of the top center point of a hexagon
         *
         * @param hexagonCoord the hexagon offset coord for the hexagon
         * @return the screen coord of the top center of the hexagon
         */
        private _getHexagonTopCenterPoint(hexagonCoord);
        /**
         * Get two hexagon's manhatten distance in screen coord.
         *
         * @param hexagonCoord1 hexagon offset coord of the hexagon1
         * @param hexagonCoord1 hexagon offset coord of the hexagon2
         * @return the manhatten distance between two hexagon
         */
        private _getHexagonScreenDistance(hexagonCoord1, hexagonCoord2);
        /**
         * Find the closest hexagon coord in a connect group of hexagons.
         */
        private _findClosestHexagonCoord(hexagonCoord, connectedHexagonGroup);
        /**
         * Convert odd-q offset coordinate to cube coordinate
         *
         * @param hexagonCoord the hexagon offset coord
         * @return the hexagon cube coord
         */
        private _convertHexagonOffsetCoordToCubeCoord(hexagonCoord);
        /**
         * Get the hexagon distance which is the minimal hexagon jumps.
         * It is illustrated below:
         *      ____        ____
         *     /    \      /    \
         *    /  1   \____/  2   \____
         *    \      /    \      /    \
         *     \____/  1   \____/  3   \
         *     /    \      /    \      /
         *    /  H   \____/   2  \____/
         *    \      /    \      /
         *     \____/  1   \____/
         *     /    \      /
         *    /      \____/
         *    \  1   /
         *     \____/
         *
         * @param hexagonCoord1 the hexagon offset coordinate of hexagon 1
         * @param hexagonCoord1 the hexagon offset coordinate of hexagon 2
         * @return the distance in pixels between two hexagons
         */
        private _getHexagonCoordDistance(hexagonCoord1, hexagonCoord2);
        /**
         * Are hexagons neighbor
         *
         * @param hexagonCoord1 offset coord of hexagon1
         * @param hexagonCoord2 offset coord of hexagon2
         * @return true if hexagons are neighbor.
         */
        private _isNeighbor(hexagonCoord1, hexagonCoord2);
        /**
         * Link two hexagon from top
         *
         * @param hexagonLink the hexagon link
         * @return the link line for the hexagon link
         */
        private _linkHexagonFromTop(hexagonLink);
        /**
         * Link all hexagons.
         */
        private _linkAllHexagons();
        /**
         * Determine the optimal hexagon radius
         *
         * @return the hexagon radius
         */
        private _getDefaultRadius();
    }
}
