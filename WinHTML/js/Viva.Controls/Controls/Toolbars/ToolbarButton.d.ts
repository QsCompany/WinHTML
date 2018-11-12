import ToolbarItemType = require("./ToolbarItemType");
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
    class Events {
        /**
         * Click handler will be called when button is clicked.
         */
        onClick: (element: JQuery, item: ToolbarItem.ToolbarItemContract) => void;
    }
    class ViewModel extends ToolbarItem.ToolbarItem {
        /**
         * The command label.
         */
        label: KnockoutObservable<string>;
        /**
         * Show / hide label on the button.
         */
        showLabel: KnockoutObservable<boolean>;
        /**
         * The icon for the command.
         */
        icon: KnockoutObservable<any>;
        /**
         * Show / hide icon on the button.
         */
        showIcon: KnockoutObservable<boolean>;
        /**
         * Show / hide container for dialog like popup list.
         */
        showDialogContainer: KnockoutObservable<boolean>;
        /**
         * Event callbacks supported by the toolbar button.
         */
        events: Events;
        /**
         * Creates an executable button.
         *
         * @param type The type of the button.
         */
        constructor(type?: ToolbarItemType.ToolbarItemType);
    }
    class Widget extends Base.Widget implements Interface {
        private _toolbarButtonClickHandler;
        private _toolbarButtonMouseEnterHandler;
        private _toolbarButtonMouseLeaveHandler;
        private _disableToolbarButton;
        _link: JQuery;
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
         * Initialize computeds.
         */
        _initializeComputeds(): void;
        /**
         * Attach various events.
         */
        _attachEvents(): void;
        /**
         * Detach the attached events.
         */
        _detachEvents(): void;
        /**
         * Return if the widget needs to be disabled. Derived widget will override with other conditions.
         */
        _isDisabled(): boolean;
        /**
         * _onClick will be called when the button is clicked. Derived widget will handle the click event appropriately.
         */
        _onClick(element: JQuery, evt: JQueryEventObject): void;
        private _getToolbarItemClass();
    }
}
