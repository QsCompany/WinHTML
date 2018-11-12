import ExtensibleControl = require("../Base/ExtensibleControl");
import Image = require("../Base/Image");
import Base = require("../Base/Base");
import MapCoordinateConverter = require("./MapCoordinateConverter");
export = Main;
declare module Main {
    /**
     * Event callback for Map.
     */
    class Events {
        /**
         * Triggered when an item is clicked
         */
        itemClicked: (item: Item) => void;
        /**
         * Triggered when an item is hovered over
         */
        itemMouseEnter: (item: Item) => void;
        /**
         * Triggered when the house is hovering out of item
         */
        itemMouseLeave: (item: Item) => void;
    }
    /**
     * Metadata for Map Item
     */
    interface ItemMetadata {
        /**
         * Icon displayed on the hexagon.
         */
        icon?: KnockoutObservable<Image.ImageContract>;
        /**
         * The width of the icon
         */
        iconWidth?: KnockoutObservable<number>;
        /**
         * The height of the icon
         */
        iconHeight?: KnockoutObservable<number>;
    }
    /**
     * Location for Map Item
     */
    class Location {
        /**
         * @constructor
         *
         * @param latitude the latitude
         * @param longitude the longitude
         */
        constructor(latitude: number, longitude: number);
        /**
         * Latitude coordinate for the map item.
         */
        latitude: number;
        /**
         * Longitude coordinate for the map item.
         */
        longitude: number;
    }
    /**
     * Screen coordinate inside the map.
     */
    class ScreenCoord {
        /**
          * x from top left
          */
        x: number;
        /**
          * y from top left
          */
        y: number;
    }
    /**
     * Map Item
     */
    interface Item {
        /**
         * Id for the item.
         */
        id: string;
        /**
         * Location for the item.
         */
        location: Location;
        /**
         * Metadata for the item.
         */
        metadata: ItemMetadata;
    }
    interface PluginExtension extends ExtensibleControl.PluginExtension {
    }
    class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
    }
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    /**
     * Base class for the SVG properties used in KO bindings.
     */
    class SvgProperties {
        /**
         * id for the element.
         */
        id: KnockoutObservable<string>;
        /**
         * CSS class for the element.
         */
        cssClass: KnockoutObservable<string>;
        /**
         * copy the properties from another SvgProperties.
         *
         * @param properties the other SvgProperties
         */
        copyFrom(properties: SvgProperties): void;
    }
    /**
     * Base class for the SVG properties used in KO bindings.
     */
    class MapItemSvgProperties extends SvgProperties {
        /**
         * Viva.Controls.Base.Image icon
         */
        icon: KnockoutObservable<Image.SvgImage>;
        /**
         * copy the properties from another MapItemSvgProperties.
         *
         * @param properties the other MapItemSvgProperties
         */
        copyFrom(properties: MapItemSvgProperties): void;
    }
    class ViewModel extends ExtensibleControl.ViewModel {
        /**
         * Items to show on the Map control.
         */
        items: KnockoutObservable<Item[]>;
        /**
         * Events supported by the Map control.
         */
        events: Events;
        /**
         * The width of the control.
         */
        width: KnockoutObservable<number>;
        /**
         * The height of the control.
         */
        height: KnockoutObservable<number>;
        /**
         * The background image of the world map.
         */
        backgroudMapImage: KnockoutObservable<Image.Image>;
        /**
         * The location mapping data for the specified background map image.
         */
        locationMappingData: KnockoutObservable<MapCoordinateConverter.LocationMappingData>;
    }
    class Widget extends ExtensibleControl.Widget implements Interface {
        private _templateEngine;
        private _items;
        /**
         * The background image of the world map.
         */
        private _backgroundMapImage;
        /**
         * SVG properties for the items.
         */
        private _itemSvgProperties;
        /**
         * Click listener for the map item
         */
        private _onClickedListener;
        /**
         * Mouse enter event listener for the map item
         */
        private _onMouseEnterListener;
        /**
         * Mouse leave event listener for the map item
         */
        private _onMouseLeaveListener;
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
        private _setTemplates();
        /**
         * The the items that have initialized metadata.
         */
        items: KnockoutComputed<Item[]>;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        private _initializeComputeds();
        private _attachEvents();
        private _detachEvents();
        private _ensureItemInitialized(item);
        /**
         * Initialize the map
         */
        private _initMap();
        /**
         * Initialize the map's background image.
         */
        private _initBackgroundMapImage();
        /**
         * Create or update an array of Map item SVG Properties
         *
         * @param propertiesArray the properties array to put
         */
        private _putMapItemSvgPropertiesArray(propertiesArray);
        /**
         * Callback for knockout click binding for hexagon clicking event.
         *
         * @param hexagonProperties the hexagon SVG properties that is clicked
         */
        private _onItemClicked(properties);
        /**
         * Callback for knockout mouse enter binding for hexagon hovering enter event.
         *
         * @param hexagonProperties the hexagon SVG properties that is hovered over
         */
        private _onItemMouseEnter(properties);
        /**
         * Callback for knockout mouse leave binding for hexagon hovering out event.
         *
         * @param hexagonProperties the hexagon SVG properties that is hovered over
         */
        private _onItemMouseLeave(properties);
    }
    /**
     * Create or update an array of SVG Properties in a knockout array
     *
     * @param propertiesArrayToPut the properties array to put
     * @param propertiesArray the knockout obervable array of SVG properties that will be updated
     */
    function putSvgPropertiesArray(propertiesArrayToPut: SvgProperties[], propertiesArray: KnockoutObservableArray<SvgProperties>): void;
    /**
     * Create or update SVG Properties in a knockout array
     *
     * @param propertiesToPut the properties to put
     * @param propertiesArray the knockout obervable array of SVG properties that will be updated
     */
    function putSvgProperties(propertiesToPut: SvgProperties, propertiesArray: KnockoutObservableArray<SvgProperties>): void;
}
