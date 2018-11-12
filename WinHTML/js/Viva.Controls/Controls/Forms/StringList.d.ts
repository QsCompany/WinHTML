import Base = require("../Base/Base");
import ValidatableControl = require("../Base/ValidatableControl");
import VivaDisposableBase = require("Viva.Controls/Base/Base.Disposable");
export = Main;
declare module Main {
    /**
     * Interface representing the properties for string list widget.
     */
    interface Interface extends ValidatableControl.Interface<string[]> {
        /**
         * The view model driving this widget.
         */
        options: ViewModel;
    }
    interface INewValueOptions {
        /**
         * The separator used to split strings when adding a new item.
         */
        separator?: KnockoutObservableBase<string>;
        /**
         * View model for a custom control used when the String List switches into editing mode
         */
        viewModel?: any;
        /**
         * The template use to override the default input control when adding new items.
         */
        controlTemplate?: string;
    }
    interface ViewModelContract {
        /**
         * Set of values that the user can select from when adding new strings.
         */
        values?: KnockoutObservableBase<string[]>;
        /**
         * The currently selected string within the control.
         */
        selected: KnockoutObservableBase<string>;
        /**
         * Indicates whether the control is currently in editing mode
         */
        editing: KnockoutObservable<boolean>;
        /**
         * Options for controlling the behavior when adding a new value to the list
         */
        newValueOptions: INewValueOptions;
        /**
         * The template use to override the default rendering of the 'add' button.
         * Callers would typically use this to supply their own image.
         */
        addIcon?: string;
    }
    /**
     * The view model for a single string in the string list.
     */
    class SelectableValue implements KnockoutDisposable {
        /**
         * The string value to display.
         */
        text: string;
        /**
         * The observable managing whether the string is selected.
         */
        hover: KnockoutObservable<boolean>;
        /**
         * The observable managing whether the string is dirty.
         */
        dirty: KnockoutObservable<boolean>;
        /**
         * The observable managing whether the string is selected.
         */
        isSelected: KnockoutComputed<boolean>;
        /**
         * The observable managing whether the string is highlighted.
         */
        highlighted: KnockoutComputed<boolean>;
        private _liftimeManager;
        _displayText: string;
        /**
         * Creates a new instance of the SelectableValue widget.
         *
         * @param text The text of the string.
         * @param selected The observable that holds the currently selected value..
         */
        constructor(liftimeManager: VivaDisposableBase.LifetimeManager, text: string, dirty: boolean, selected: KnockoutObservableBase<string>);
        dispose(): void;
    }
    class NewValueOptions implements INewValueOptions {
        /**
         * The separator used to split strings when adding a new item
         */
        separator: KnockoutObservableBase<string>;
        /**
         * View model for a custom control used when the String List switches into editing mode
         */
        viewModel: any;
        /**
         * The template use to override the default input control when adding new items.
         */
        controlTemplate: string;
    }
    class ViewModel extends ValidatableControl.ViewModel<string[]> implements ViewModelContract {
        /**
         * The initial (non-dirty) value of the control.
         */
        initialValue: KnockoutObservableBase<string[]>;
        /**
         * Set of values that the user can select from when adding new strings.
         */
        values: KnockoutObservableBase<string[]>;
        /**
         * The currently selected string within the control.
         */
        selected: KnockoutObservableBase<string>;
        /**
         * Indicates whether the control is currently in editing mode
         */
        editing: KnockoutObservable<boolean>;
        /**
         * Options for controlling the behavior when adding a new value to the list
         */
        newValueOptions: NewValueOptions;
        /**
         * The HTML used instead of the default rendering of the 'add' button's contents.
         * Callers would typically use this to supply their own image data.
         */
        addIcon: string;
        constructor();
    }
    class Widget extends ValidatableControl.Widget<string[]> implements Interface {
        private _templateEngine;
        private _keyDownHandler;
        private _deleteItemClickHandler;
        private _selectItemClickHandler;
        private _hoverHandler;
        private _selectableValues;
        private _selectableValueMap;
        private _inputTemplate;
        private _defaultAddStringValue;
        private _valueCompare;
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as a strongly typed ViewModel instance.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
        /**
         * Creates a new instance of the Widget.
         *
         * @param element The element to apply the widget to.
         * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
         * @param createOptions The creation options.
         */
        constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        options: ViewModel;
        /**
         * Get the selectable values for binding.
         */
        selectableValues: KnockoutObservableArray<SelectableValue>;
        addControl: JQuery;
        /**
         * See base.
         */
        _getElementToFocus(): Element;
        /**
         * Attaches the respective events.
         */
        _attachEvents(): void;
        /**
         * Detaches the respective events.
         */
        _detachEvents(): void;
        /**
         * Removes duplicates from an array preserving first-seen order (in-place)
         */
        _normalize(values: string[]): string[];
        _initializeSubscriptionsAndComputeds(viewModel: ViewModel): void;
        _setFocusToAddControl(): void;
        /**
         * Converts a string into a list of new values to add to the control.
         * The input string will be split by any separator set on the view model and trimmed.
         */
        private _splitAndTrimString(value);
        private _startEditing;
        /**
         * Setup templates for the templating engine. These can be overridden by
         * the user of the control. Specifically the following templates can be
         * set:
         *  - addIcon
         *  - stringListDeleteIcon
         */
        private _setTemplates();
        /**
         * Dispose all objects left inside this._selectableValueMap.
         * This is called in two place, one registered with lifetimeMnaager in the construcor.
         * The other case is in this._synchronizeArray
         */
        private _cleanUpSelectableValueMap();
        /**
         * Synchronize changes in the widget's view model's value observable
         * with the array of SelectableValues (also ensuring we don't recreate
         * equivalent selectable values when the same string is part of the
         * updated string[].
         *
         * @param values The new values to synchronize with the DOM
         */
        private _synchronizeArray(values);
        private _deleteString(val, selectNext?);
    }
}
