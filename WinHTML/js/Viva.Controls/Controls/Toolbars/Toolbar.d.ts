import Base = require("../Base/Base");
import ToolbarItem = require("./ToolbarItem");
export = Main;
declare module Main {
    interface Interface extends Base.Interface {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    class ViewModel extends Base.ViewModel {
        /**
         * Toolbar items.
         */
        items: KnockoutObservableArray<ToolbarItem.ToolbarItemContract>;
    }
    class Widget extends Base.Widget implements Interface {
        private _templateEngine;
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
        private _getTemplateName(item);
        private _getGroupTemplateName(item);
        private _getItemTemplateName(item);
        private _setTemplates();
    }
}
