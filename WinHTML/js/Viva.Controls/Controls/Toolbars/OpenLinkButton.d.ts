import Base = require("../Base/Base");
import ToolbarButton = require("./ToolbarButton");
import ClickableLink = require("./ClickableLink");
export = Main;
declare module Main {
    interface Interface extends ToolbarButton.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends ToolbarButton.ViewModel {
        /**
         * See interface.
         */
        clickableLink: ClickableLink.ClickableLink;
        /**
         * Creates the selectable toolbar button.
         *
         * @param uri The URI that will be opened when target is clicked.
         * @param target The target window to open the URI in.
         */
        constructor(uri: string, target?: string);
    }
    class Widget extends ToolbarButton.Widget implements Interface {
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options: Object, createOptions?: Base.CreateOptions);
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
        _onClick(element: JQuery, evt: JQueryEventObject): void;
    }
}
