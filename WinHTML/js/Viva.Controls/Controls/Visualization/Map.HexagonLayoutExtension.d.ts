import TemplateEngine = require("../../Util/TemplateEngine");
import Image = require("../Base/Image");
import Map = require("./Map");
export = Main;
declare module Main {
    /**
     * The enum for HexagonLayout type in the link
     */
    enum ItemType {
        /**
         * The Source in a HexagonLayout link relationship
         */
        Source = 0,
        /**
         * The Target in a HexagonLayout link relationship
         */
        Target = 1,
        /**
         * Does not draw the background or fill. Only icon is drawn.
         */
        IconOnly = 2,
    }
    /**
     * The enum for HexagonLayout Link type
     */
    enum LinkType {
        /**
         * The Link is solid line
         */
        Solid = 0,
        /**
         * Dashed line with animation
         */
        AnimatedDashed = 1,
    }
    /**
     * Metadata for HexagonLayout Map Map.Item
     */
    interface HexagonLayoutItemMetadata extends Map.ItemMetadata {
        /**
         * Type in HexagonLayout link relationship
         */
        type?: ItemType;
        /**
         * Text to show in the center of the polygon for the item
         */
        text?: KnockoutObservable<string>;
        /**
         * Indicates whether to fill the polygon
         */
        hasFill?: KnockoutObservable<boolean>;
        /**
         * Scale the item hexagon size. 1.0 means the size is the same as hexagon grid.
         */
        itemScale?: KnockoutObservable<number>;
    }
    /**
     * Defines HexagonLayout support by this extension
     */
    interface IHexagonLayoutExtension {
    }
    /**
     * The links that represents HexagonLayout link
     */
    class Link {
        /**
         * Source of the link
         */
        source: Map.Item;
        /**
         * Target of the link
         */
        target: Map.Item;
        /**
         * Type of the link
         */
        linkType: number;
        /**
         * Constructor
         *
         * @param source source of the link
         * @param target target of the link
         * @param linkType type of the link
         */
        constructor(source: Map.Item, target: Map.Item, linkType?: LinkType);
    }
    /**
     * Defines HexagonLayout Map.Extension options
     */
    interface HexagonLayoutOptions {
        /**
         * Indicates whether to show links on the map.
         */
        showLinks?: KnockoutObservable<boolean>;
        /**
         * Links among the items on the Map control.
         */
        links?: KnockoutObservable<Link[]>;
        /**
         * Number of rows for the hexagon grid
         */
        rows?: KnockoutObservable<number>;
        /**
         * Number of columns for the hexagon grid
         */
        columns?: KnockoutObservable<number>;
    }
    /**
     * SVG Properties for the Hexagon.Hexagon.
     */
    class HexagonSvgProperties extends Map.SvgProperties {
        /**
         * {@inheritDoc}
         */
        id: KnockoutObservable<string>;
        /**
         * {@inheritDoc}
         */
        cssClass: KnockoutObservable<string>;
        /**
         * Hexagon.Hexagon's vertex points.
         */
        hexagonVertexPoint: KnockoutObservable<string>;
        /**
         * Text drawn on the hexagon.
         */
        text: KnockoutObservable<string>;
        /**
         * X coordinate of the text.
         */
        textX: KnockoutObservable<number>;
        /**
         * Y coordinate of the text.
         */
        textY: KnockoutObservable<number>;
        /**
         * CSS class for the text.
         */
        textClass: KnockoutObservable<string>;
        /**
         * Viva.Controls.Base.Image icon
         */
        icon: KnockoutObservable<Image.SvgImage>;
        /**
         * Applying transformation matrix to the hexagon
         */
        transform: KnockoutObservable<string>;
        /**
         * {@inheritDoc}
         */
        copyFrom(properties: HexagonSvgProperties): void;
    }
    /**
     * SVG Properties for the HexagonLink.
     */
    class HexagonLinkSvgProperties extends Map.SvgProperties {
        /** {@inheritDoc} */
        id: KnockoutObservable<string>;
        /** {@inheritDoc} */
        cssClass: KnockoutObservable<string>;
        /** Points for the link polyline. */
        points: KnockoutObservable<string>;
        /** {@inheritDoc} */
        copyFrom(properties: HexagonLinkSvgProperties): void;
    }
    class HexagonLayoutExtension extends Map.Extension implements IHexagonLayoutExtension {
        /**
         * Name of the extension.
         */
        static Name: string;
        private _options;
        /**
         * SVG properties for the hexagon.
         */
        private _hexagonSvgProperties;
        /**
         * SVG properties for the hexagon link.
         */
        private _hexagonLinkSvgProperties;
        /**
         * The mapping between hexagon id and the map item
         */
        private _hexagonIdItemMap;
        /**
         * Click listener for the hexagon
         */
        private _onHexagonClickedListener;
        /**
         * Mouse enter event listener for the hexagon
         */
        private _onHexagonMouseEnterListener;
        /**
         * Mouse leave event listener for the hexagon
         */
        private _onHexagonMouseLeaveListener;
        /**
         * Creates the HexagonLayout extension.
         *
         * @param options Options associated with the extension.
         */
        constructor(options?: HexagonLayoutOptions);
        /**
         * See interface.
         */
        defaultItemMetadataProperties(metadata: Map.ItemMetadata): any;
        /**
         * Gets the options of the plugin.
         */
        options: HexagonLayoutOptions;
        /**
         * See interface.
         */
        setInstance(instance: Map.Widget): void;
        /**
         * See interface.
         */
        beforeCreate(): void;
        /**
         * See interface.
         */
        afterCreate(): void;
        /**
         * See interface.
         */
        afterAttachEvents(): void;
        /**
         * See interface.
         */
        afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
        /**
         * See interface.
         */
        beforeDestroy(): void;
        /**
         * See parent.
         */
        getName(): string;
        /**
         * Logic to animate the elements.
         */
        private _animateElements();
        private _getDefaultOptions();
        /**
         * Callback for knockout click binding for hexagon clicking event.
         *
         * @param hexagonProperties the hexagon SVG properties that is clicked
         */
        private _onHexagonClicked(hexagonProperties);
        /**
         * Callback for knockout mouse enter binding for hexagon hovering enter event.
         *
         * @param hexagonProperties the hexagon SVG properties that is hovered over
         */
        private _onHexagonMouseEnter(hexagonProperties);
        /**
         * Callback for knockout mouse leave binding for hexagon hovering out event.
         *
         * @param hexagonProperties the hexagon SVG properties that is hovered over
         */
        private _onHexagonMouseLeave(hexagonProperties);
        /**
         * Initialize the hexagon grid
         */
        private _initHexagonGrid();
        /**
         * Create or update an array of Hexagon.Hexagon SVG Properties
         *
         * @param propertiesArray the properties array to put
         */
        private _putHexagonSvgPropertiesArray(propertiesArray);
        /**
         * Create or update an array of Hexagon.Hexagon Link SVG Properties
         *
         * @param propertiesArray the properties array to put
         */
        private _putHexagonLinkSvgPropertiesArray(propertiesArray);
    }
}
