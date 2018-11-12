import Map = require("./Map");
export = Main;
declare module Main {
    /**
     * The mapping between the screen coord and location for a rectangle region.
     */
    class GeoRectRegionScreenCoordMapping {
        /**
         * the location of the point shown below
         * q12-----------q22
         *  |             |
         *  |             |
         *  |             |
         * <q11>---------q21
         */
        q11Location: Map.Location;
        /**
         * the location of the point shown below
         * <q12>---------q22
         *  |             |
         *  |             |
         *  |             |
         * q11-----------q21
         */
        q12Location: Map.Location;
        /**
         * the location of the point shown below
         * q12-----------q22
         *  |             |
         *  |             |
         *  |             |
         * q11----------<q21>
         */
        q21Location: Map.Location;
        /**
         * the location of the point shown below
         * q12----------<q22>
         *  |             |
         *  |             |
         *  |             |
         * q11-----------q21
         */
        q22Location: Map.Location;
        /**
         * the screen coord of the point shown below
         * q12-----------q22
         *  |             |
         *  |             |
         *  |             |
         * <q11>---------q21
         */
        q11ScreenCoord: Map.ScreenCoord;
        /**
         * the screen coord of the point shown below
         * <q12>---------q22
         *  |             |
         *  |             |
         *  |             |
         * q11-----------q21
         */
        q12ScreenCoord: Map.ScreenCoord;
        /**
         * the screen coord of the point shown below
         * q12-----------q22
         *  |             |
         *  |             |
         *  |             |
         * q11----------<q21>
         */
        q21ScreenCoord: Map.ScreenCoord;
        /**
         * the screen coord of the point shown below
         * q12----------<q22>
         *  |             |
         *  |             |
         *  |             |
         * q11-----------q21
         */
        q22ScreenCoord: Map.ScreenCoord;
        /**
         * The constructor
         */
        constructor(q11Location: Map.Location, q11ScreenCoord: Map.ScreenCoord, q12Location: Map.Location, q12ScreenCoord: Map.ScreenCoord, q21Location: Map.Location, q21ScreenCoord: Map.ScreenCoord, q22Location: Map.Location, q22ScreenCoord: Map.ScreenCoord);
    }
    /**
     * Data used for mapping map's screen coord to latitude and longitude.
     */
    class LocationMappingData {
        /**
         * Width of the underlying map
         */
        referenceImageWidth: number;
        /**
         * Height of the underlying map
         */
        referenceImageHeight: number;
        /**
         * The reference screen coord for the known rectangle regions
         */
        geoRectMappingRegions: GeoRectRegionScreenCoordMapping[];
        /**
         * The constructor
         *
         * @param referenceImageWidth the Width of the underlying map
         * @param referenceImageHeight Height of the underlying map
         * @param geoRectMappingRegions the mapped the regions
         */
        constructor(referenceImageWidth?: number, referenceImageHeight?: number, geoRectMappingRegions?: GeoRectRegionScreenCoordMapping[]);
    }
    /**
     * The converter used to convert lat/long on the map to x/y coordinate on the image.
     */
    class MapCoordinateConverter {
        /**
         * The SVG element.
         */
        private _svgElement;
        /**
         * The location mapping data.
         */
        private _locationMappingData;
        /**
         * Constructor
         *
         * @param svgElement the SVG element for the map overlay.
         * @param locationMappingData the mapping data used to calculate the coords conversion
         */
        constructor(svgElement: SVGElement, locationMappingData: LocationMappingData);
        /**
         * Reset the location mapping data.
         *
         * @param locationMappingData the mapping data used to calculate the coords conversion
         */
        reset(locationMappingData: LocationMappingData): void;
        /**
         * Get the screen coord of the hexagon with a latitude and longitude.
         *
         * @param location the latitude and longitude of map item
         * @return the screen coord
         */
        getScreenCoordFromLocation(location: Map.Location): Map.ScreenCoord;
        /**
         * Use 2D binlinear interpolation to interpolate the point in a region
         *
         * @param x1 the lower left corner's x
         * @param y1 the lower left corner's y
         * @param x2 the upper right corner's x
         * @param y2 the upper right corner's y
         * @param fq11 the function value of the lower left corner
         * @param fq12 the function value of the upper left corner
         * @param fq21 the function value of the lower right corner
         * @param fq22 the function value of the upper right corner
         * @return interplation function that takes x and y and return the interpolated value.
         */
        private _getBinlinearInterpolatingFunction(x1, y1, x2, y2, fq11, fq12, fq21, fq22);
    }
}
