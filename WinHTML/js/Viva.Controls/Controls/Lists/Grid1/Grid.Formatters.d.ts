import Grid = require("./Grid");
export = Main;
declare module Main {
    /**
     * Creates a date formatter.
     *
     * @param format Format of the date to be used as mentioned by the DateUtil format.
     * @return A Cell Formatter generating a date.
     */
    function date(format: string): Grid.CellFormatter;
    /**
     * URI Formatter which transforms the value into a link and special text.
     *
     * @param value Object to display a link with a custom uri, text, and target.
     * @return Generated link.
     */
    function uri(value: Grid.UriObject): string;
    /**
     * URI Formatter which transforms the value into a link.
     *
     * @param value Simple string which displays the link and make it clickable.
     * @return Generated link.
     */
    function uri(value: string): string;
    /**
     * URI Formatter which transforms an observable value into a link.
     *
     * @param value Knockout value.
     * @return Generated link.
     */
    function uri(value: KnockoutObservableBase<any>): string;
    /**
     * Icon Formatter which transforms the value into a an image and special text.
     *
     * @param value Object to display a link with a custom uri, and text.
     * @return Generated image.
     */
    function icon(value: Grid.IconObject): string;
    /**
     * Icon Formatter which transforms the value into a an image.
     *
     * @param value Object to display a link with a custom uri.
     * @return Generated image.
     */
    function icon(value: string): string;
    /**
     * Icon Formatter which transforms an observable value into an image.
     *
     * @param value Knockout value.
     * @return Generated image.
     */
    function icon(value: KnockoutObservableBase<any>): string;
    /**
     * Creates a Cell Formatter based on the icons provided.
     *
     * @param icons An object with the key being the lookup value pointing to a Grid.IconObject or a string.
     * @return A Cell Formatter generating an icon.
     */
    function iconLookup(icons: any): Grid.CellFormatter;
    /**
     * Creates a Cell Formatter based on the dictionary provided.
     *
     * @param dictionary An object with the key being the lookup value pointing to a string.
     * @return A Cell Formatter generating text.
     */
    function textLookup(dictionary: any): Grid.CellFormatter;
    /**
     * Creates a Cell Formatter based on the dictionary provided.
     * The generated sprite is compatible in high contrast.
     *
     * @param icons An object with the key being the lookup value pointing to an object having attribute and text key.
     * @param uri URI where to get the sprite.
     * @return A Cell Formatter generating a sprite.
     */
    function spriteLookup(icons: any, uri: string): Grid.CellFormatter;
    /**
     * Creates a Cell Formatter based on the template provided.
     *
     * @param template HTML template on which the viewModel will be applied.
     * @param viewModel A function returning the viewModel.
     * @return A Cell Formatter generating a control.
     */
    function htmlBindings<T>(template: string, getViewModel: Grid.HtmlBindingGetViewModelCallBack): Grid.CellFormatter;
    /**
     * Bundles formatters for presentation, sorting and filtering into a reusable formatter instance.
     *
     * @param formatter Formatter, e.g. one of KGrid.Formatters.
     * @param sortFormatter Mapping between data values and sortable data.
     * @param filterFormatter Mapping between data values and filterable text.
     * @return Bundled grid cell formatter.
     */
    function bundle(displayFormatter: Grid.CellFormatter, sortFormatter?: Grid.CellFormatter, filterFormatter?: Grid.CellFormatter): Grid.ExtendedCellFormatter;
    /**
     * Bundles formatters for presentation, sorting and filtering into a reusable formatter instance.
     *
     * @param formatter Formatter, e.g. one of KGrid.Formatters.
     * @param sortFormatter Mapping between data values and sortable data.
     * @param filterFormatter Mapping between data values and filterable text.
     * @return Bundled grid cell formatter.
     */
    function bundle(displayFormatter: Grid.CellFormatter, sortFormatter?: any, filterFormatter?: any): Grid.ExtendedCellFormatter;
    /**
     * Creates formatter that will use the same formatter for display, sorting and filtering.
     * Formatter has to have sortFormatter/filterFormatter (they're identical) signature.
     *
     * @param formatter Formatter, e.g. one of KGrid.Formatters.
     * @return Formatter with sort/filter formatters bundled.
     */
    function defaultAll(formatter: Grid.CellFormatter): Grid.ExtendedCellFormatter;
    /**
     * Retrieves the registered callback method in the vivacontrol binding.(Test-verification)
     *
     * @param guid string to identify the callback.
     * @return a function return a htmlBindingData.
     */
    function _callBackLookup(guid: string): () => any;
    function html(value: any, settings?: Grid.CellFormatterSettings): string;
    function text(value: any, settings?: Grid.CellFormatterSettings): string;
}
