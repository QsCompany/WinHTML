declare module MsPortalFx.ViewModels {
    /**
     * A view model that represents a click target that opens a link.
     */
    class ClickableLink {
        /**
         * The URI that will be opened.
         */
        uri: KnockoutObservable<string>;
        /**
         * The link target. Target is _blank if unspecified.
         */
        target: KnockoutObservable<string>;
        /**
         * Construct an instance of the view model.
         *
         * @param uri The URI that will be opened when target is clicked.
         * @param target The link target.
         */
        constructor(uri: KnockoutObservable<string>, target?: KnockoutObservable<string>);
    }
}
declare module MsPortalFx.ViewModels.Controls.Base {
    interface Contract extends MsPortalFx.Base.Disposable {
        /**
         * Enum that defines the type of the control.
         */
        controlType: ControlType;
    }
    class ViewModel implements Contract {
        /**
         * Enum that defines the type of the control.
         */
        controlType: ControlType;
        /**
         * Dispoable items.
         */
        _disposables: MsPortalFx.Base.Disposable[];
        /**
         * true when disposed() have been called on this object.
         */
        _disposed: boolean;
        /**
         * Creates a Base ViewModel.
         *
         * @param loading Default loading state.
         */
        constructor();
        /**
         * Method that can be called to explicitly dispose of view model resources.
         */
        dispose(): void;
        /**
         * Populates the view model from a key/value pairs object.
         * The keys should map to properties on the view model.
         * The values are applied to the corresponding keys.
         *
         * @param object An untyped object with values to populate on the view model.
         */
        populateFromObject(object: Object): void;
        /**
         * Adds a subscription to be cleaned up in the dispose().
         *
         * @param disposable One KnockoutDisposable to be added to this._disposables.
         */
        _addDisposablesToCleanUp(disposable: MsPortalFx.Base.Disposable): void;
        /**
         * Adds a list of computed to be cleaned up in the dispose().
         *
         * @param disposable Array of KnockoutDisposable to be added to this._disposables.
         */
        _addDisposablesToCleanUp(disposable: MsPortalFx.Base.Disposable[]): void;
    }
}
declare module MsPortalFx.ViewModels.Controls.Loadable {
    interface Contract extends MsPortalFx.ViewModels.Controls.Base.Contract {
        /**
         * Indicates if the widget is currently disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * Indicates if the widget is currently loading data.
         */
        loading: KnockoutObservable<boolean>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel implements Contract {
        /**
         * Indicates if the widget is currently disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * Indicates if the widget is currently loading data.
         */
        loading: KnockoutObservable<boolean>;
        /**
         * Creates a Base ViewModel.
         *
         * @param loading Default loading state.
         */
        constructor(loading?: boolean);
    }
}
declare module MsPortalFx.ViewModels {
    /**
     * Selection that provides information about the detail blade to open dynamically.
     */
    interface DynamicSelection {
        /**
         * Object that maps to the blade inputs of the detail blade.
         */
        detailBladeInputs: Object;
        /**
         * Name of extension that contains the blade. Defaults to same extension as part that uses this selection.
         */
        extension?: string;
    }
    /**
     * Selection that provides detail blade name to open.
     */
    interface DynamicBladeSelection extends DynamicSelection {
        /**
         * Name of the detail blade to open.
         */
        detailBlade: string;
    }
    /**
     * Selection that provides asset type to use to resolve detail blade to open.
     */
    interface DynamicAssetSelection extends DynamicSelection {
        /**
         * Name of asset used to retrieve the detail blade.
         */
        assetType: string;
    }
    /**
     * Selection that provides resource ID to use to resolve detail blade to open.
     */
    interface DynamicResourceSelection extends MsPortalFx.ViewModels.DynamicSelection {
        /**
         * Resource ID for the selection used to retrieve the detail blade.
         */
        resourceId: string;
    }
}
declare module MsPortalFx.ViewModels.Forms {
    interface EditScopeAccessors<T> {
        /**
         * A function that will return an observable containing the original value for the field.
         */
        getOriginalObservable: (lifetimeManager: MsPortalFx.Base.DisposableLifetimeManager) => KnockoutObservableBase<T>;
        /**
         * A function that will return an observable containing the editable value for the field.
         */
        getEditableObservable: (lifetimeManager: MsPortalFx.Base.DisposableLifetimeManager) => KnockoutObservableBase<T>;
    }
    module EditScopeAccessors {
        /**
          * Describes how to read and write values on an edit scope.
          */
        interface Options<TEditScope, TFieldValue> {
            /**
             * Reads data from an edit scope.
             *
             * @param editScopeData The root data object held by the edit scope.
             * @return The value that this edit scope accessor supplies.
             */
            readFromEditScope: (editScopeData: TEditScope) => TFieldValue;
            /**
             * Writes data to an edit scope.
             *
             * @param editScopeData The root data object held by the edit scope. This method should write the new value to this object.
             * @param newValue The value to be written. Typically this comes from a UI element whose value has changed.
             */
            writeToEditScope: (editScopeData: TEditScope, newValue: TFieldValue) => void;
        }
    }
}
declare module MsPortalFx.Internal.ViewModels {
    /**
     * Internal interface that the shell uses to manage a selectable instance
     */
    interface SelectableState {
        /**
         * Method invoked by the shell to obtain exclusive access to the selectedValue
         */
        lock(): void;
        /**
         * Method invoked by the shell to internally change the selectedValue
         *
         * @param value New Value to assign selected value too.
         */
        setInternalSelectedValue(value: any): void;
    }
}
declare module MsPortalFx.ViewModels {
    /**
     * A view model that represents a list of items, each of which can be selected.
     */
    interface SelectableItems<T> {
        /**
         * A list of items, each of which can be selected.
         */
        selectableItems: KnockoutObservableArray<SelectableItem<T>>;
    }
    /**
     * A view model representing an item that can be selected.
     */
    interface SelectableItem<T> {
        /**
         * Reflects whether the item is currently in a selected state.
         */
        isSelected: KnockoutObservable<boolean>;
        /**
         * Reflects whether the item is currently in an activated state.
         * Activation is a further level of selection that may invoke
         * additional behavior, such as opening the 'details' view in
         * a master-details scenario.
         */
        isActivated: KnockoutObservable<boolean>;
        /**
         * Reflects whether the item currently has journey children that are in an edited state.
         */
        hasChildEdits: KnockoutObservableBase<boolean>;
        /**
         * The model data.
         */
        data: T;
    }
    /**
     * A view model that represents an edited, selected item.
     */
    interface EditedItem<U> {
        /**
         * A representation of the edited item.
         */
        item: U;
        /**
         * The EditScope identifier for the edited item.
         */
        editScopeId: string;
    }
    /**
     * A view model that represents a sparse list of currently selected and/or activated items.
     */
    interface SetSelection<U> {
        /**
         * A representation of the items currently selected.
         */
        selectedItems: KnockoutObservableArray<U>;
        /**
         * A representation of the items currently activated.
         */
        activatedItems: KnockoutObservableArray<U>;
        /**
         * A representation of the items that currently have journey children that are in edited state.
         */
        itemsWithChildEdits: KnockoutObservableArray<EditedItem<U>>;
    }
    /**
     * A view model implementation that captures both a list of selectable items as well as a separate, sparse list of
     * representations of only the currently selected items and only the currently activated items.
     */
    class SelectableSet<T, U> implements SelectableItems<T>, SetSelection<U>, MsPortalFx.Base.Disposable {
        /**
         * See interface.
         */
        selectableItems: KnockoutObservableArray<SelectableItem<T>>;
        /**
         * See interface.
         */
        selectedItems: KnockoutObservableArray<U>;
        /**
         * See interface.
         */
        activatedItems: KnockoutObservableArray<U>;
        /**
         * See interface
         */
        itemsWithChildEdits: KnockoutObservableArray<EditedItem<U>>;
        /**
         * Allows right-click context menu commands to produce a selection, given an item.
         */
        createSelection: (item: T) => U;
        /**
         * The comparison function that determines how items and their corresponding selection value are related.
         */
        itemMatchesSelection: (item: T, selection: U) => boolean;
        /**
         * See interface.
         */
        getDefaultSelection: () => MsPortalFx.Base.PromiseV<U>;
        private _itemsSubscription;
        private _isSelectedSubscriptions;
        private _selectionsSubscription;
        private _activationsSubscription;
        private _computedItems;
        /**
         * Constructs an instance of this view model.
         * @param items A list of items.
         * @param itemMatchesSelection A function that determines if an item matches a selection.
         * @param createSelection A factory function that creates a selection object based on an item.
         * @param initialState Initial state of the view model.
         */
        constructor(items: KnockoutObservableArray<T>, itemMatchesSelection?: (item: T, selection: U) => boolean, createSelection?: (item: T) => U, initialState?: SetSelection<U>);
        /**
         * Makes all items activated if and only if they are selected.
         */
        activateAllSelectedItems(): void;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * Adds an item to an observable array if it is not already present.
         *
         * @param array The array into which the item should be merged.
         * @param item The item to be merged into the array.
         */
        private _mergeIntoObservableArray<T>(array, item);
    }
    /**
     * Options that can be supplied when instantiating Selectable<T>.
     */
    interface SelectableOptions<T> {
        /**
         * Determines whether the click target can be unselected by clicking.  Defaults to 'true'.
         */
        allowUnselect?: boolean;
        /**
         * The initial value of this view model's 'value' property when in its selected state.  Can be supplied
         * dynamically using part binding.
         */
        selectedValue?: T;
        /**
         * Determines whether the click target is initially in its selected state.  Defaults to 'false'.
         */
        isSelected?: boolean;
        /**
         * Determines whether the click target is initially in its command selected state.  Defaults to 'false'.
         */
        isCommandSelected?: boolean;
        /**
         * Determines whether the click target is initially in its activated state.  Defaults to 'false'.
         */
        isActivated?: boolean;
    }
    /**
     * Options to configure a delayed blade selection.
     */
    interface DelayedBladeSelectionOptions {
        /**
         * The expected size of the blade.
         */
        bladeWidth: number;
        /**
         * Promise that resolves when the selection once it is known.
         */
        selectedValuePromise: MsPortalFx.Base.PromiseV<any>;
    }
    /**
     * A view model that represents a click target that is selectable.
     */
    class Selectable<T> implements MsPortalFx.Base.Disposable {
        /**
         * A property that will be set to the value of 'selectedValue' whenever the click target is
         * selected.  The property can be set to 'undefined' via part binding to unselect.
         */
        value: KnockoutObservableBase<T>;
        /**
         * The value to which 'value' will be set when the click target is selected.  The property can be set to
         * via part binding to dynamically change 'value' when the click target is selected.
         */
        selectedValue: KnockoutObservableBase<T>;
        /**
         * Reflects whether the click target can currently be clicked to unselect.
         */
        isClickable: KnockoutObservableBase<boolean>;
        /**
         * Reflects whether the click target is currently in a selected state.
         */
        isSelected: KnockoutObservable<boolean>;
        /**
         * Reflects whether the click target is currently in a command selected state.
         */
        isCommandSelected: KnockoutObservable<boolean>;
        /**
         * Reflects whether the click target is currently in an activated state.
         */
        isActivated: KnockoutObservable<boolean>;
        /**
         * Reflects whether the click target has journey children that are in an edited state.
         */
        hasChildEdits: KnockoutObservable<boolean>;
        /**
         * Informs the shell that a delayed blade selection is going to occur.
         */
        delayedBladeSelection: KnockoutObservable<DelayedBladeSelectionOptions>;
        /**
         * See interface.
         */
        getDefaultSelection: () => MsPortalFx.Base.PromiseV<T>;
        /**
         * Construct an instance of the view model.
         * @param options Options to configure the instance.
         */
        constructor(options?: SelectableOptions<T>);
        /**
         * See interface.
         */
        dispose(): void;
        setIsSelected(initialState?: any, selectedByDefault?: boolean): void;
        /**
         * Called from a left-click event handler when the click target is clicked.
         */
        onClick(): void;
    }
}
declare module MsPortalFx.ViewModels.Controls.Balloon {
    enum Position {
        /**
         * Display the balloon on top.
         */
        Top = 0,
        /**
         * Display the balloon on the right.
         */
        Right = 1,
        /**
         * Display the balloon on the bottom.
         */
        Bottom = 2,
        /**
         * Display the balloon on the left.
         */
        Left = 3,
    }
    interface Contract extends Loadable.Contract {
        /**
         * Whether the balloon is visible or not.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * The box relative to which the balloon will be rendered.
         */
        box: KnockoutObservable<Box>;
        /**
         * The content to display the balloon. It can be empty if there's existing content in the element.
         */
        content: KnockoutObservable<string>;
        /**
         * The balloon link.
         */
        link: KnockoutObservable<Link>;
        /**
         * The position where the balloon will show around the element (Top, Right, Bottom, Left).
         */
        position: KnockoutObservable<Position>;
        /**
         * The amount to offset the pointer when the balloon is in a horizontal layout.
         */
        horizontalOffset: Offset;
        /**
         * The amount to offset the pointer when the balloon is in a vertical layout.
         */
        verticalOffset: Offset;
        /**
         * jQuery selector string representing the element to append the balloon element to.
         */
        appendTo: string;
        /**
         * Hides all the other balloons that have been previously opened when shown.
         */
        closeOtherBalloons: boolean;
    }
    class Link {
        /**
         * Link text.
         */
        linkText: string;
        /**
         * Link Uri.
         */
        linkUri: string;
        /**
         * Creates a Link class.
         *
         * @param linkText The link text to be displayed.
         * @param linkUri The link uri.
         */
        constructor(linkText?: string, linkUri?: string);
    }
    class Offset {
        /**
         * Pixel offset applied when the preferred layout is rendered.
         */
        preferred: number;
        /**
         * Pixel offset applied when the alternate layout is rendered (due to space constraints).
         */
        alternate: number;
        /**
         * Creates an Offset class.
         *
         * @param preferred The offset amount to apply when the preferred layout is chosen.
         * @param alternate The offset amount to apply when the alternate layout is chosen.
         */
        constructor(preferred?: number, alternate?: number);
    }
    class Box {
        /**
         * Vertical distance from the top of the document.
         */
        top: number;
        /**
         * Horizontal distance from the left of the document.
         */
        left: number;
        /**
         * Width of the box.
         */
        width: number;
        /**
         * Height of the box.
         */
        height: number;
        /**
         * Creates a Box class.
         *
         * @param top The horizontal offset from the top of the document.
         * @param left The vertical offset from the left of the document.
         * @param width The width of the box.
         * @param height The height of the box.
         */
        constructor(top?: number, left?: number, width?: number, height?: number);
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * See interface.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        box: KnockoutObservable<Box>;
        /**
         * See interface.
         */
        content: KnockoutObservable<string>;
        /**
         * The link to display in the balloon.
         */
        link: KnockoutObservable<Link>;
        /**
         * See interface.
         */
        position: KnockoutObservable<Position>;
        /**
         * See interface.
         */
        horizontalOffset: Offset;
        /**
         * See interface.
         */
        verticalOffset: Offset;
        /**
         * See interface.
         */
        appendTo: string;
        /**
         * See interface.
         */
        closeOtherBalloons: boolean;
    }
}
declare module MsPortalFx.ViewModels.Controls.Command {
    /**
     * Command execution status.
     */
    enum Status {
        /**
         * Command has not been executed.
         */
        None = 0,
        /**
         * Command is in the process of executing.
         */
        Pending = 1,
        /**
         * Command execution succeded.
         */
        Success = 2,
        /**
         * Command execution failed.
         */
        Failure = 3,
    }
    /**
     * Command callback interface.
     */
    interface Callback {
        /**
         * Execution completion callback.
         */
        completed: (status: Status, errrorMessage?: string) => void;
    }
    /**
     * Command handler interface.
     */
    interface Handler {
        /**
         * Determines if the command is currently executable.
         */
        canExecute: KnockoutComputed<boolean>;
        /**
         * Executes the command.
         */
        execute: () => void;
    }
    /**
     * Command base view model interface.
     */
    interface Contract extends Loadable.Contract {
        /**
         * Indicates if the command should be displayed.
         * This can be changed  to hide/show the command.
         * It is up to UI consumers of the command to determine how to hide/show based on this value.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * The command display text.
         * It is up to UI consumers of the command to determine how to show the text.
         */
        text: KnockoutObservable<string>;
        /**
         * The latest command status.
         */
        status: KnockoutObservable<Status>;
        /**
         * The latest command error.
         */
        error: KnockoutObservable<any>;
        /**
         * Invokes command execution.
         */
        invoke: KnockoutObservable<Callback>;
        /**
         * Handles the command execution.
         */
        handler: KnockoutObservable<Handler>;
        /**
         * Notification that command execution has occured.
         */
        afterExecute: () => void;
        /**
         * Executes the command.
         */
        execute(): MsPortalFx.Base.Promise;
        /**
         * Attaches to the command.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        attach(execute?: () => void, canExecute?: () => boolean): void;
        /**
         * Detaches from the command.
         */
        detach(): void;
    }
    /**
     * Command base view model.
     */
    class ViewModel extends Loadable.ViewModel {
        private _invokeSubscription;
        private _handler;
        /**
         * Indicates if the command should be displayed.
         * This can be changed  to hide/show the command.
         * It is up to UI consumers of the command to determine how to hide/show based on this value.
         */
        visible: KnockoutObservable<boolean>;
        /**
         * The command display text.
         * It is up to UI consumers of the command to determine how to show the text.
         */
        text: KnockoutObservable<string>;
        /**
         * The latest command status.
         */
        status: KnockoutObservable<Status>;
        /**
         * The latest command error.
         */
        error: KnockoutObservable<any>;
        /**
         * Invokes command execution.
         */
        invoke: KnockoutObservable<Callback>;
        /**
         * Handles the command execution.
         */
        handler: KnockoutObservable<Handler>;
        /**
         * Notification that command execution has occured.
         */
        afterExecute: () => void;
        /**
         * Creates a command view model.
         *
         * @param text The command text.
         * @param enabled The default enabled state.
         * @param visible The default visiblity.
         */
        constructor(text?: string, execute?: () => void, canExecute?: () => boolean);
        /**
         * Executes the command.
         *
         * @return Callback promise for completion or failure.
         */
        execute(): MsPortalFx.Base.Promise;
        /**
         * Attaches to the command.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        attach(execute?: () => void, canExecute?: () => boolean): void;
        /**
         * Attaches handler to the command.
         *
         * @param handler The command handler to attach.
         */
        attachHandler(handler: Handler): void;
        /**
         * Detaches from the command.
         */
        detach(): void;
        /**
         * Executes handler and makes callbacks.
         *
         * @param handler The command handler.
         * @param callback The execution callback.
         */
        private _execute(handler, callback);
    }
    /**
     * Command base view model handler.
     */
    class ViewModelHandler {
        private _invokeSubscription;
        private _delegatingHandler;
        private _viewModel;
        constructor(viewModel: Contract, execute?: () => void, canExecute?: () => boolean);
        /**
         * Attaches to the command.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        attach(execute?: () => void, canExecute?: () => boolean): void;
        /**
         * Detaches from the command.
         */
        detach(): void;
        /**
         * Executes handler and makes callbacks.
         *
         * @param handler The command handler.
         * @param callback The execution callback.
         */
        private _execute(handler, callback);
    }
    /**
     * Basic command handler implementation.
     */
    class DelegatingHandler implements Handler {
        /**
         * Indicates if the command can be executed.
         */
        canExecute: KnockoutComputed<boolean>;
        /**
         * Executes the command.
         */
        execute: () => void;
        /**
         * Creates a delegating command handler.
         *
         * @param execute The command execution function.
         * @param canExecute The command availability function.
         */
        constructor(execute: () => void, canExecute?: () => boolean);
    }
}
declare module MsPortalFx.ViewModels.Controls.Console {
    interface Contract extends Loadable.Contract {
        /**
         * Command output expose by the view model to be read by the console interface or backend service and executed.
         */
        command: KnockoutObservable<string>;
        /**
         * Creates text log displayed to the console log.
         */
        text: KnockoutObservable<string>;
        /**
         * Creates information log displayed to the console log.
         */
        info: KnockoutObservable<string>;
        /**
         * Creates success log displayed to the console log.
         */
        success: KnockoutObservable<string>;
        /**
         * Creates warning log displayed to the console log.
         */
        warning: KnockoutObservable<string>;
        /**
         * Creates error log displayed to the console log.
         */
        error: KnockoutObservable<string>;
        /**
         * Provides the text used for the CLI prompt.
         */
        prompt: KnockoutObservable<string>;
        /**
         * Clears the console.
         */
        clear: MsPortalFx.ViewModels.Controls.Command.Contract;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Command output expose by the view model to be read by the console interface or backend service and executed.
         */
        command: KnockoutObservable<string>;
        /**
         * Creates text log displayed to the console log.
         */
        text: KnockoutObservable<string>;
        /**
         * Creates information log displayed to the console log.
         */
        info: KnockoutObservable<string>;
        /**
         * Creates success log displayed to the console log.
         */
        success: KnockoutObservable<string>;
        /**
         * Creates warning log displayed to the console log.
         */
        warning: KnockoutObservable<string>;
        /**
         * Creates error log displayed to the console log.
         */
        error: KnockoutObservable<string>;
        /**
         * Provides the text used for the CLI prompt.
         */
        prompt: KnockoutObservable<string>;
        /**
         * Clears the console.
         */
        clear: MsPortalFx.ViewModels.Controls.Command.Contract;
        /**
         * Constructs a console view model.
         */
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.DockedBalloon {
    enum Type {
        /**
         * Displays a circle with an "i" in it as an anchor.
         */
        Info = 0,
        /**
         * Displays a box with an "!" in it as an anchor.
         */
        Validation = 2,
    }
    interface Contract extends Loadable.Contract {
        /**
         * The type of balloon anchor to show (Info, Help, or Validation).
         */
        type: Type;
        /**
         * The position where the balloon will show around the element (Top, Right, Bottom, Left).
         */
        position: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Position>;
        /**
         * The content to display the balloon. It can be empty if there's existing content in the element.
         * This renders as plain text.
         */
        content: KnockoutObservable<string>;
        /**
         * The balloon link.
         */
        link: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        /**
         * Whether the balloon is visible or not.
         */
        balloonVisible: KnockoutObservable<boolean>;
        /**
         * Stop or enable click propagation.
         */
        stopClickPropagation?: KnockoutObservable<boolean>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * See interface.
         */
        type: Type;
        /**
         * See interface.
         */
        position: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Position>;
        /**
         * See interface.
         */
        content: KnockoutObservable<string>;
        /**
         * The link to display in the balloon.
         */
        link: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        /**
         * See interface.
         */
        balloonVisible: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        stopClickPropagation: KnockoutObservable<boolean>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.EditableControl {
    interface Contract<TValue> extends Loadable.Contract {
        /**
         * Name attribute of the control to use with form.
         */
        name: string;
        /**
         * Value held by the control. Can be any type.
         */
        value: KnockoutObservable<TValue>;
        /**
         * Original value of the field. Controls edited state.
         */
        dirty: KnockoutObservableBase<boolean>;
    }
    class ViewModel<TValue> extends Loadable.ViewModel implements Contract<TValue> {
        /**
         * Name attribute of the control to use with form.
         */
        name: string;
        /**
         * Value held by the control. Can be any type.
         */
        value: KnockoutObservable<TValue>;
        /**
         * Original value of the field. Controls edited state.
         */
        dirty: KnockoutObservableBase<boolean>;
    }
}
declare module MsPortalFx.ViewModels.Controls.Validators {
    /**
     * ValidationState represents the current validation state when list of validators are run.
     */
    enum ValidationState {
        /**
         * Default validation state.
         */
        None = 0,
        /**
         * Validation failed.
         */
        Invalid = 1,
        /**
         * Validation succeeded.
         */
        Valid = 2,
        /**
         * Validation pending during async validation calls.
         */
        Pending = 3,
    }
    interface Validatable<TValue> {
        /**
         * Indicates if validation should be skipped or not.
         */
        enableValidation: KnockoutObservable<boolean>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * Indicates the current validation state. The validation state is useful when there are async validators and
         * validation completion should be notified.
         */
        validationState: KnockoutObservable<ValidationState>;
        /**
         * Validators to apply to the value when validating.
         */
        validators: KnockoutObservableArray<Validator<TValue>>;
    }
    interface ValidationPlacement<TValue> {
        /**
         * Initializes the ValidationPlacement.
         *
         * @param element The widget element.
         * @param validatable Interface containing validation specific validators and valid flag.
         */
        initialize(element: JQuery, validatable: Validatable<TValue>): void;
        /**
         * Destroys the artifacts related to the validation placement.
         */
        dispose(): void;
        /**
         * Dispose() has been called.
         */
        isDestroyed(): boolean;
        /**
         * Triggers when the errorMessages ViewModel property changes.
         *
         * @param newValue Array of validation error messages.
         */
        onErrorMessageChanged(newValue: string): void;
        /**
         * Triggers when the validationState ViewModel property changes.
         *
         * @param newValue Current ValidationState value.
         */
        onValidationStateChanged(newValue: ValidationState): void;
    }
    interface ErrorPlacement<TValue> {
        /**
         * List of placements that display validation status.
         */
        validationPlacements: KnockoutObservableArray<ValidationPlacement<TValue>>;
    }
    /**
     * Validator base class. Used to define validators that can be attached to an
     * validatable control view model to validate the value.
     */
    class Validator<TValue> {
        private _subscription;
        /**
         * Validation rule error message.
         */
        message: KnockoutObservable<string>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * Indicates if the current validation state.
         */
        validationState: KnockoutObservable<ValidationState>;
        /**
         * Evaluates if the value is valid (works cross IFRAME).
         */
        validate: KnockoutObservable<TValue>;
        /**
         * Indicates whether an empty value is valid or not.
         */
        isEmptyValid: KnockoutObservable<boolean>;
        /**
         * Constructs a validator.
         *
         * @param message Describes the validation rule.
         */
        constructor(message?: string);
        /**
         * Releases resources held by the validator.
         */
        dispose(): void;
        /**
         * Determines if the value is valid.
         * Should be overridden in derived classes.
         *
         * @param value The value to check.
         * @return Indicates the current validation state.
         */
        _validate(value: TValue): ValidationState;
    }
    /**
     * Escapes regular expression special characters -[]/{}()*+?.\^$|
     *
     * @param str The string to escape.
     * @return The escaped string.
     */
    function escapeRegExpOperators(str: string): string;
    class Match extends Validator<string> {
        private _expression;
        /**
         * Constructs a validator that checks if the value matches a regular expression.
         *
         * @param message Validation rule error message.
         */
        constructor(expression: RegExp, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class NotMatch extends Validator<string> {
        private _expression;
        /**
         * Constructs a validator that checks if the value does not match a regular expression.
         *
         * @param message Validation rule error message.
         */
        constructor(expression: RegExp, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class Contains extends Match {
        /**
         * Constructs a validator that checks that the value contains at least one case insensitive match of a search string.
         *
         * @param search The search string to match.
         * @param message Validation rule error message.
         */
        constructor(search: string, message?: string);
    }
    class NotContains extends NotMatch {
        /**
         * Constructs a validator that checks that the value does not contain a case insensitive match of a search string.
         *
         * @param search The search string to match.
         * @param message Validation rule error message.
         */
        constructor(search: string, message?: string);
    }
    class ContainsCharacters extends Match {
        /**
         * Constructs a validator that checks that the value contains at least one character from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
    class NotContainsCharacters extends NotMatch {
        /**
         * Constructs a validator that checks that the value does not contain any characters from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
    class HasDigit extends Match {
        /**
         * Constructs a validator that checks that the value has at least one digit from 0 to 9.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one upper or lower case letter from A to Z or a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasUpperCaseLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one upper case letter from A to Z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasLowerCaseLetter extends Match {
        /**
         * Constructs a validator that checks that the value has at least one lower case letter from a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class HasPunctuation extends ContainsCharacters {
        /**
         * Constructs a validator that checks that the value contains at least one punctuation character from:
         * ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \ : " ; ' < > , . ? / ~ `
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class Compare<TValue> extends Validator<TValue> {
        private _compareTo;
        /**
         * Base class for comparison validators. Not to be used directly.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: any, message?: string);
        /**
         * See base.
         */
        _validate(value: TValue): ValidationState;
        /**
         * Compares two values.
         * (Derived classes must override.)
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of comparison.
         */
        _compare(value: TValue, compareTo: TValue): boolean;
    }
    class Equals<TValue> extends Compare<TValue> {
        /**
         * Constructs a validator that compares if the value is equal to a provided value.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: TValue, message?: string);
        constructor(compareTo: () => TValue, message?: string);
        /**
         * Compares two values for strict equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: TValue, compareTo: TValue): boolean;
    }
    class CaseInsensitiveCompare extends Compare<string> {
        /**
         * Constructs a validator that uses toLowerCase() to compare two values.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: string, message?: string);
        constructor(compareTo: () => string, message?: string);
        /**
         * Compares two values for strict equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: string, compareTo: string): boolean;
    }
    class LocaleAwareCaseInsensitiveCompare extends Compare<string> {
        /**
         * Constructs a validator that uses toLocaleLowerCase() to compare two values.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: string, message?: string);
        constructor(compareTo: () => string, message?: string);
        /**
         * Compares two values for strict equality.
         *
         * @param value The control value.
         * @param compareTo The value to compare to.
         * @return Result of equality comparison.
         */
        _compare(value: string, compareTo: string): boolean;
    }
    class LengthRange extends Validator<string> {
        private _min;
        private _max;
        /**
         * Constructs a validator that checks that the value length is between min and max.
         *
         * @param min The minimum number of characters to be valid. May be null if there is no min.
         * @param max The maximum number of characters to be valid. May be null if there is no max.
         * @param message Validation rule error message.
         */
        constructor(min: number, max: number, message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class MinLength extends LengthRange {
        /**
         * Constructs a validator that checks that the value length is at least min.
         *
         * @param min The minimum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
    class MaxLength extends LengthRange {
        /**
         * Constructs a validator that checks that the value length is less than or equal to the max.
         *
         * @param max The maximum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
    class Required extends MinLength {
        /**
         * Constructs a validator that checks whether the value is empty.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
    class NotNull<TValue> extends Validator<TValue> {
        /**
         * Constructs a validator that checks whether the value is null or not.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
        /**
         * See base.
         */
        _validate(value: TValue): ValidationState;
    }
    class Numeric extends Validator<string> {
        /**
         * Constructs a validator that checks whether the value is a number.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
        /**
         * See base.
         */
        _validate(value: string): ValidationState;
    }
    class ValueRange extends Validator<any> {
        private min;
        private max;
        /**
         * Constructs a validator that checks whether the value is within the range defined by min and max number.
         *
         * @param min Minimum range value to get the value.
         * @param max Maximum range value to get the value.
         * @param message Validation rule error message.
         */
        constructor(min: number, max: number, message?: string);
        /**
         * Constructs a validator that checks whether the value is within the range defined by min and max number.
         *
         * @param min Minimum range accessor to get the value.
         * @param max Maximum range accessor to get the value.
         * @param message Validation rule error message.
         */
        constructor(min: () => number, max: () => number, message?: string);
        /**
         * See base.
         */
        _validate(value: any): ValidationState;
    }
    class MinValue extends ValueRange {
        /**
         * Constructs a validator that checks whether the value is greater than or equal to the specified minimum number.
         *
         * @param min Minimum range value.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
    class MaxValue extends ValueRange {
        /**
         * Constructs a validator that checks whether the value is less than or equal to the specified maximum number.
         *
         * @param max Maximum range value.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
    class CustomAsyncValidator<TValue> extends Validator<TValue> {
        private _validationHandler;
        private _context;
        private _pendingAsyncRequests;
        private _latestValidationAsyncRequestId;
        /**
         * Constructs a validator that invokes an async handler to check whether the given value is valid or not.
         * The async validation is provided by the user and can have any custom validation logic.
         *
         * @param message Validation rule error message.
         * @param validationHandler Validation function that takes in a value and an optional context object and returns a jquery promise object.
         * @param context Validation context that will be passed on when the validationHandler is invoked.
         */
        constructor(message: string, validationHandler: (value: TValue, context?: any) => MsPortalFx.Base.PromiseV<string>, context?: any);
        /**
         * For custom async validation we need to handle few important scenarios to make sure the validation result is consistent.
         *          1) Cuncurrent async validation request are possible and it must be handled.
         *          2) The result of async validation can race and can overwrite with an inconsistent result.
         *          3) Syncronous completion of the async request.
         *
         * Custom async validator will keep track of all pending request and will honor only the last validation request and update the validation state.
         *
         * @param value The current value that needs to be validated.
         *
         * @return The current validation state after evaluating the validation logic.
         */
        _validate(value: TValue): ValidationState;
        private _updateResult(message, validationState);
        private _updateValidationResult(promise, message, validationState);
        private _removePendingAsyncRequest(promise);
    }
    class Invalid extends Validator<any> {
        /**
         * Constructs a validator that always return invalid result.
         *
         * @param message Validation rule error message.
         */
        constructor(message: string);
        /**
         * See base.
         */
        _validate(value: any): ValidationState;
    }
}
declare module MsPortalFx.ViewModels.Controls.ValidatableControl {
    var DefaultDelayValidationTimeout: number;
    interface Contract<TValue> extends EditableControl.Contract<TValue>, MsPortalFx.ViewModels.Controls.Validators.Validatable<TValue> {
    }
    class ViewModel<TValue> extends EditableControl.ViewModel<TValue> implements Contract<TValue> {
        /**
         * Indicates if validation should be skipped or not.
         */
        enableValidation: KnockoutObservable<boolean>;
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         * Indicates the current validation state. The validation state is useful when there are async validators and
         * validation completion should be notified.
         */
        validationState: KnockoutObservable<MsPortalFx.ViewModels.Controls.Validators.ValidationState>;
        /**
         * Indicates if the value was valid the last time validate was called.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * Validators to apply to the value when validating.
         */
        validators: KnockoutObservableArray<MsPortalFx.ViewModels.Controls.Validators.Validator<TValue>>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.ItemList {
    /**
     * Interface representing the properties for an item in item list.
     */
    interface ItemValueContract<T> {
        /**
         * Text for list item.
         */
        text: KnockoutObservable<string>;
        /**
         * Value bound for list item when the item is selected.
         */
        value: KnockoutObservable<T>;
        /**
         * Item is selected.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
    }
    class ItemValue<T> implements MsPortalFx.ViewModels.Controls.ItemList.ItemValueContract<T> {
        /**
         * Text for list item.
         */
        text: KnockoutObservable<string>;
        /**
         * Value bound for list item when the item is selected.
         */
        value: KnockoutObservable<T>;
        /**
         * Item is selected.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * @param text The text data binding for the item.
         * @param value The value data binding for the item.
         * @param selected The item is selected.
         * @param disabled The item is disabled.
         */
        constructor(text: string, value: T, selected?: boolean, disabled?: boolean);
    }
    /**
     * View model interface representing the properties for item list.
     */
    interface Contract<TValue> extends ValidatableControl.Contract<ItemValue<TValue>> {
        /**
         * Aria label id.
         */
        label: string;
        /**
         * Observable array containing the following array element:
         * * ItemValue.
         */
        values: KnockoutObservableArray<ItemValue<TValue>>;
    }
    class ViewModel<TValue> extends ValidatableControl.ViewModel<ItemValueContract<TValue>> implements Contract<TValue> {
        /**
         * Aria label id.
         */
        label: string;
        /**
         * Observable array containing the following array element:
         * * BaseItemValue.
         */
        values: KnockoutObservableArray<ItemValue<TValue>>;
    }
}
declare module MsPortalFx.ViewModels.Controls.TextStream {
    enum Emphasis {
        /**
         * General text.
         */
        Normal = 0,
        /**
         * Important text.
         */
        Emphasized = 1,
        /**
         * Very important text.
         */
        Strong = 2,
    }
    interface TextInfo {
        /**
         * The text to display.
         */
        text: string;
        /**
         * The class of information in the text.
         */
        classifier?: string;
        /**
         * The emphasis of the infomation in the text.
         */
        emphasis?: Emphasis;
    }
    interface Contract extends Loadable.Contract {
        /**
         * The maximum text size to display.
         */
        max: KnockoutObservable<number>;
        /**
         * Wrap the lines of the display.
         */
        wrap: KnockoutObservable<boolean>;
        /**
         * Callback function when the text stream is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Writes data to the display.
         */
        write: KnockoutObservable<string>;
        /**
         * Writes data to the display with a trailing line feed.
         */
        writeLine: KnockoutObservable<string>;
        /**
         * Writes styled data to the display.
         */
        writeText: KnockoutObservable<TextInfo>;
        /**
         * Writes styled data to the display with a trailing linefeed.
         */
        writeTextLine: KnockoutObservable<TextInfo>;
        /**
         * Writes multiple styled data to the display.
         */
        writeTextArray: KnockoutObservable<TextInfo[]>;
        /**
         * Clears the the display.
         */
        clear: MsPortalFx.ViewModels.Controls.Command.Contract;
        /**
         * Indicates if the text area should display scrollbars as needed.
         */
        scrollbars: boolean;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * The maximum text size to display.
         */
        max: KnockoutObservable<number>;
        /**
         * Wrap the lines of the display.
         */
        wrap: KnockoutObservable<boolean>;
        /**
         * Callback function when the text stream is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Writes data to the display.
         */
        write: KnockoutObservable<string>;
        /**
         * Writes data to the display with a trailing line feed.
         */
        writeLine: KnockoutObservable<string>;
        /**
         * Writes styled data to the display.
         */
        writeText: KnockoutObservable<TextInfo>;
        /**
         * Writes styled data to the display with a trailing linefeed.
         */
        writeTextLine: KnockoutObservable<TextInfo>;
        /**
         * Writes multiple styled data to the display.
         */
        writeTextArray: KnockoutObservable<TextInfo[]>;
        /**
         * Clears the the display.
         */
        clear: MsPortalFx.ViewModels.Controls.Command.Contract;
        /**
         * Indicates if the text area should display scrollbars as needed.
         */
        scrollbars: boolean;
        /**
         * Constructs a TextStream view model.
         */
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.LogStream {
    enum LogItemType {
        /**
         * Indicates general information.
         */
        Text = 0,
        /**
         * Indicates important information.
         */
        Information = 1,
        /**
         * Indicates success information
         */
        Success = 2,
        /**
         * Indicates warning information.
         */
        Warning = 3,
        /**
         * Indicates error information.
         */
        Error = 4,
    }
    interface LogItem {
        /**
         * The text to log.
         */
        text: string;
        /**
         * The type of text to log.
         */
        type?: LogItemType;
    }
    interface Contract extends TextStream.Contract {
        /**
         * Controls display updating.
         */
        paused: KnockoutObservable<boolean>;
        /**
         * Current set of log item types to display.
         */
        filters: KnockoutObservableArray<LogItemType>;
        /**
         * Logs text item to the display.
         */
        log: KnockoutObservable<string>;
        /**
         * Logs item to the display.
         */
        logItem: KnockoutObservable<LogItem>;
        /**
         * Logs multiple items to the display.
         */
        logItems: KnockoutObservable<LogItem[]>;
    }
    class ViewModel extends TextStream.ViewModel implements Contract {
        /**
         * Controls display updating.
         */
        paused: KnockoutObservable<boolean>;
        /**
         * Current set of log item types to display.
         */
        filters: KnockoutObservableArray<LogItemType>;
        /**
         * Logs text item to the display.
         */
        log: KnockoutObservable<string>;
        /**
         * Logs item to the display.
         */
        logItem: KnockoutObservable<LogItem>;
        /**
         * Logs multiple items to the display.
         */
        logItems: KnockoutObservable<LogItem[]>;
        /**
         * Constructs a LogStream view model.
         */
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Scrollbar {
    interface Contract extends Loadable.Contract {
        /**
         * Polls the content area at 100 ms intervals to see if the size has changed. If it has, refreshContent is called.
         * Whenever possible, it is recommended to leave this value as false and call refreshContent when the content changes.
         */
        autoRefreshContent: boolean;
        /**
         * If true, refreshContainer will be automatically called if the window is resized.
         */
        refreshContainerOnResize: boolean;
        /**
         * Indicates if scrolling into view should try to scroll vertically.
         */
        scrollIntoViewVertical: boolean;
        /**
         * Indicates if scrolling into view should try to scroll horizontally.
         */
        scrollIntoViewHorizontal: boolean;
        /**
         * Fits the scroll view to the container even if it changes size.
         */
        fitContainer: boolean;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Polls the content area at 100 ms intervals to see if the size has changed. If it has, refreshContent is called.
         * Whenever possible, it is recommended to leave this value as false and call refreshContent when the content changes.
         */
        autoRefreshContent: boolean;
        /**
         * If true, refreshContainer will be automatically called if the window is resized.
         */
        refreshContainerOnResize: boolean;
        /**
         * Indicates if scrolling into view should try to scroll vertically.
         */
        scrollIntoViewVertical: boolean;
        /**
         * Indicates if scrolling into view should try to scroll horizontally.
         */
        scrollIntoViewHorizontal: boolean;
        /**
         * Fits the scroll view to the container even if it changes size.
         */
        fitContainer: boolean;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Settings {
    enum Size {
        /**
         * Optimize display in small tiles.
         */
        Small = 2,
        /**
         * Optimize display for large tiles.
         */
        Large = 3,
    }
    interface Contract extends Loadable.Contract {
        /**
         * The list of settings and values.
         * Each item in the array is an object with two properties label and value.
         * The label and value properties could either be a string or an object with a property named "url".
         */
        items: KnockoutObservableArray<any>;
        /**
         * The maximum number of items rendered.
         */
        maxItems: KnockoutObservable<number>;
        /**
         * Indicates if the size of the area for display is small or large.
         */
        size: KnockoutObservable<Size>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * The list of settings and values.
         * Each item in the array is an object with two properties label and value.
         * The label and value properties could either be a string or an object with a property named "url".
         */
        items: KnockoutObservableArray<any>;
        /**
         * The maximum number of items rendered.
         */
        maxItems: KnockoutObservable<number>;
        /**
         * Indicates if the size of the area for display is small or large.
         */
        size: KnockoutObservable<Size>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.SingleSetting {
    interface Contract extends Loadable.Contract {
        /**
         * The value of the setting.
         */
        value: KnockoutObservable<string>;
        /**
         * The unit of the setting.
         */
        unit: KnockoutObservable<string>;
        /**
         * The caption of the setting.
         */
        caption: KnockoutObservable<string>;
        /**
         * The info balloon of the setting.
         */
        infoBalloon?: KnockoutObservable<MsPortalFx.ViewModels.Controls.DockedBalloon.ViewModel>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * The value of the setting.
         */
        value: KnockoutObservable<string>;
        /**
         * The unit of the setting.
         */
        unit: KnockoutObservable<string>;
        /**
         * The caption of the setting.
         */
        caption: KnockoutObservable<string>;
        /**
         * The info balloon of the setting.
         */
        infoBalloon: KnockoutObservable<DockedBalloon.ViewModel>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.TypableControl {
    /**
     * By default the number of milliseconds the portal will wait for typing to stop
     * before running validation.
     */
    var DefaultValidationDelay: number;
    interface Contract<TValue> extends ValidatableControl.Contract<TValue> {
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservableBase<number>;
        /**
         *  Updates the value view model based on enum option.
         */
        valueUpdateTrigger: ValueUpdateTrigger;
    }
    class ViewModel<TValue> extends ValidatableControl.ViewModel<TValue> implements Contract<TValue> {
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         *  Updates the value view model based on enum option.
         */
        valueUpdateTrigger: ValueUpdateTrigger;
    }
}
declare module MsPortalFx.ViewModels.Controls.ValidationPlacements {
    /**
     * ValidationPlacementBase<TValue> is the portal equivalent base class supporting validation placement.
     */
    class ValidationPlacementBase<TValue> implements MsPortalFx.ViewModels.Controls.Validators.ValidationPlacement<TValue> {
        _element: JQuery;
        _validatable: MsPortalFx.ViewModels.Controls.Validators.Validatable<TValue>;
        _subscriptions: KnockoutSubscription<any>[];
        _errorMessage: KnockoutComputed<string>;
        private _destroyIds;
        /**
         * _checkExistsOrRegisterDestroyId.  This is utility function for the destroy method to avoid recursive
         *
         * @param destroyId Unique identifier for the destroy to identify itself.  In the javascript inheritance, this.destroy is always the same.
         *                  But super.dispose is unique since super is function scope.  Typically, use super.dispose as id. For root object, use null as Id.
         * @return whether this destroyMethod is already on the executed. If true, mean it is already been executed.
         */
        _checkExistsOrRegisterDestroyId(destroyId: any): boolean;
        /**
         * See interface.
         */
        isDestroyed(): boolean;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        initialize(element: JQuery, validatable: MsPortalFx.ViewModels.Controls.Validators.Validatable<TValue>): void;
        /**
         * See interface.
         */
        onErrorMessageChanged(newValue: string): void;
        /**
         * See interface.
         */
        onValidationStateChanged(newValue: MsPortalFx.ViewModels.Controls.Validators.ValidationState): void;
        /**
         * Initializes the subscriptions property.
         */
        _initializeSubscriptions(): void;
        /**
         * Disposes the subscriptions property.
         */
        _disposeSubscriptions(): void;
    }
    /**
     * Css<TValue> provides out of the box validation placement support by adding validation specific class and attributes which can be used for CSS styling.
     */
    class Css<TValue> extends ValidationPlacementBase<TValue> {
        private _input;
        private _valid;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * See interface.
         */
        initialize(element: JQuery, validatable: MsPortalFx.ViewModels.Controls.Validators.Validatable<TValue>): void;
        /**
         * See interface.
         */
        onValidationStateChanged(newValue: MsPortalFx.ViewModels.Controls.Validators.ValidationState): void;
        private _setValidationAttribute(validationState);
    }
}
declare module MsPortalFx.ViewModels.Controls {
    /**
     * Enum to indicate when to trigger value updates.
     */
    enum ValueUpdateTrigger {
        /**
         * Maps to one of the other value update trigger values. Which one is up to the controls code to decide.
         */
        Default = 0,
        /**
         * Trigger value updates as soon as user types a character.
         */
        AfterKeyDown = 1,
        /**
         * Trigger value updates as soon as user types a character (including repeated keys).
         */
        KeyPress = 2,
        /**
         * Trigger value update on blur.
         */
        Blur = 3,
        /**
         * Trigger value update on input Event (IE 9+) .
         */
        Input = 4,
    }
}
declare module MsPortalFx.ViewModels {
    enum FormValidationType {
        /**
         * Value indicates field has not been set to an appropriate validation type.
         */
        Invalid = 0,
        /**
         * Validation is a value required validation.
         */
        Required = 1,
        /**
         * Validation is a regular expression validation.
         */
        RegExMatch = 2,
        /**
         * Validator that checks if the value does not match a regular expression.
         */
        NotRegExMatch = 3,
        /**
         * Constructs a validator that checks that the value contains at least one case insensitive match of a search string.
         */
        Contains = 4,
        /**
         * Constructs a validator that checks that the value does not contain a case insensitive match of a search string.
         */
        NotContains = 5,
        /**
         * Constructs a validator that checks that the value contains at least one character from a character set.
         */
        ContainsCharacters = 6,
        /**
         * Constructs a validator that checks that the value does not contain any characters from a character set.
         */
        NotContainsCharacters = 7,
        /**
         * Constructs a validator that checks that the value has at least one digit from 0 to 9.
         */
        HasDigit = 8,
        /**
         * Constructs a validator that checks that the value has at least one upper or lower case letter from A to Z or a to z.
         * (Not Unicode)
         */
        HasLetter = 9,
        /**
         * Constructs a validator that checks that the value has at least one upper case letter from A to Z.
         * (Not Unicode)
         */
        HasUpperCaseLetter = 10,
        /**
         * Constructs a validator that checks that the value has at least one lower case letter from a to z.
         * (Not Unicode)
         */
        HasLowerCaseLetter = 11,
        /**
         * Constructs a validator that checks that the value contains at least one punctuation character from:
         * ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \ : " ; ' < > , . ? / ~ `
         */
        HasPunctuation = 12,
        /**
         * Constructs a base comparison validator that compares the control value to a provided value.
         */
        Equals = 13,
        /**
         * Constructs a validator that checks that the value length is between min and max.
         */
        LengthRange = 14,
        /**
         * Constructs a validator that checks that the value length is at least min.
         */
        MinLength = 15,
        /**
         * Constructs a validator that checks that the value length is less than or equal to the max.
         */
        MaxLength = 16,
        /**
         * Constructs a validator that checks whether the value is a number.
         */
        Numeric = 17,
        /**
         * Constructs a validator that checks whether the value is within the range defined by min and max number.
         */
        Range = 18,
        /**
         * Constructs a validator that checks whether the value is greater than or equal to the specified minimum number.
         */
        MinValue = 19,
        /**
         * Constructs a validator that checks whether the value is less than or equal to the specified maximum number.
         */
        MaxValue = 20,
        /**
         * Validation is implemented by extension author.
         */
        Custom = 21,
        /**
         * Constructs a validator that uses toLowerCase() to compare two values.
         */
        CaseInsensitiveComparison = 22,
        /**
         * Constructs a validator that uses toLocaleLowerCase() to compare two values.
         */
        LocaleAwareCaseInsensitiveComparison = 23,
    }
}
declare module MsPortalFx.ViewModels {
    interface FormValidation {
        /**
         * The type of validation to be performed.
         */
        type: FormValidationType;
    }
    class Validation implements FormValidation {
        /**
         * The type of validation to be performed.
         */
        type: FormValidationType;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param type The validation type.
         */
        constructor(type: FormValidationType);
    }
}
declare module MsPortalFx.ViewModels {
    enum ControlType {
        /**
         * Value indicates field has not been set to an appropriate control type.
         */
        Invalid = 0,
        /**
         * Control is a section.
         */
        Section = 1,
        /**
         * Control is a text box.
         */
        TextBox = 2,
        /**
         * Control is a drop down field.
         */
        DropDown = 3,
        /**
         * Control is an options group field.
         */
        OptionsGroup = 4,
        /**
         * Control is a password field.
         */
        Password = 5,
        /**
         * Control is a slider.
         */
        Slider = 6,
        /**
         * Control is a check box.
         */
        CheckBox = 7,
        /**
         * Control is a multiselect drop down field.
         */
        MultiselectDropDown = 8,
        /**
         * Control is a range slider.
         */
        RangeSlider = 9,
        /**
         * Control is a numeric text box.
         */
        NumericTextBox = 10,
        /**
         * Control is a selector field.
         */
        Selector = 11,
        /**
         * Control is a filter combo.
         */
        FilterCombo = 12,
        /**
         * Control is multi-line text box.
         */
        MultiLineTextBox = 13,
        /**
         * Control is a date time combo box.
         */
        DateTimeCombo = 14,
        /**
         * Control is a dynamic section.
         */
        DynamicSection = 15,
        /**
         * Control is an attachment control.
         */
        Attachment = 16,
        /**
         * Control is a string list.
         */
        StringList = 17,
        /**
         * Control is a html editor.
         */
        HtmlEditor = 18,
        /**
         * Control is a history control.
         */
        History = 19,
        /**
         * Control is an artifact links control (used by VSO).
         */
        ArtifactLinks = 20,
        /**
         * Control is a splitter control.
         */
        Splitter = 21,
        /**
         * Control is a tri state check box.
         */
        TriStateCheckBox = 22,
        /**
         * Control is a custom html.
         */
        CustomHtml = 23,
        /**
         * Control is a time picker.
         */
        TimePicker = 24,
        /**
         * Control is a date picker.
         */
        DatePicker = 25,
        /**
         * Control is a date/time picker.
         */
        DateTimePicker = 26,
        /**
         * Control is a date/time range picker.
         */
        DateTimeRangePicker = 27,
        /**
         * Control is a file upload control.
         */
        FileUpload = 28,
        /**
         * Control is an OAuth button.
         */
        OAuthButton = 29,
        /**
         * Form element is a token combo box control.
         */
        TokenComboBox = 30,
        /**
         * QueryBuilder control.
         */
        QueryBuilder = 31,
        /**
         * DockedBalloon control.
         */
        DockedBalloon = 32,
        /**
         * DiffEditor control.
         */
        DiffEditor = 33,
        /**
         * DiffList control.
         */
        DiffList = 34,
        /**
         * DiffView control.
         */
        DiffView = 35,
        /**
         * DiscussionTimeline control.
         */
        DiscussionTimeline = 36,
        /**
         * Editor control.
         */
        Editor = 37,
        /**
         * Button control.
         */
        Button = 38,
        /**
         * pcCheckBox control.
         */
        pcCheckBox = 39,
        /**
         * CopyableLabel control.
         */
        CopyableLabel = 40,
        /**
         * pcDateTimeCombo control.
         */
        pcDateTimeCombo = 41,
        /**
         * pcDropDown control.
         */
        pcDropDown = 42,
        /**
         * pcFilterCombo control.
         */
        pcFilterCombo = 43,
        /**
         * pcGroupDropDown control.
         */
        pcGroupDropDown = 44,
        /**
         * pcMultiLineTextBox control.
         */
        pcMultiLineTextBox = 45,
        /**
         * pcMultiselectDropDown control.
         */
        pcMultiselectDropDown = 46,
        /**
         * pcNumericTextBox control.
         */
        pcNumericTextBox = 47,
        /**
         * pcOptionPicker control.
         */
        pcOptionPicker = 48,
        /**
         * pcPassword control.
         */
        pcPassword = 49,
        /**
         * pcRangeSlider control.
         */
        pcRangeSlider = 50,
        /**
         * pcSelector control.
         */
        pcSelector = 51,
        /**
         * pcSlider control.
         */
        pcSlider = 52,
        /**
         * pcTextBox control.
         */
        pcTextBox = 53,
        /**
         * pcGrid control.
         */
        pcGrid = 54,
        /**
         * Gallery control.
         */
        Gallery = 55,
        /**
         * pcListView control.
         */
        pcListView = 56,
        /**
         * pcTreeView control.
         */
        pcTreeView = 57,
        /**
         * LogStream control.
         */
        LogStream = 58,
        /**
         * Scrollbar control.
         */
        Scrollbar = 59,
        /**
         * Settings control.
         */
        Settings = 60,
        /**
         * SingleSetting control.
         */
        SingleSetting = 61,
        /**
         * Toolbar control.
         */
        Toolbar = 62,
        /**
         * Chart control.
         */
        Chart = 63,
        /**
         * CsmTopology control.
         */
        CsmTopology = 64,
        /**
         * Donut control.
         */
        Donut = 65,
        /**
         * Gauge control.
         */
        Gauge = 66,
        /**
         * Graph control.
         */
        Graph = 67,
        /**
         * Map control.
         */
        Map = 68,
        /**
         * Metrics control.
         */
        Metrics = 69,
        /**
         * PairedTimeline control.
         */
        PairedTimeline = 70,
        /**
         * ProgressBar control.
         */
        ProgressBar = 71,
        /**
         * QuotaGauge control.
         */
        QuotaGauge = 72,
        /**
         * SingleValueGauge control.
         */
        SingleValueGauge = 73,
        /**
         * StepGauge control.
         */
        StepGauge = 74,
        /**
         * Console control.
         */
        Console = 75,
        /**
         * DeleteAssetConfirmation control.
         */
        DeleteAssetConfirmation = 76,
        /**
         * HeroBanner control.
         */
        HeroBanner = 77,
        /**
         * InfoBox control.
         */
        InfoBox = 78,
        /**
         * Notice control.
         */
        Notice = 79,
        /**
         * Picker control.
         */
        Picker = 80,
        /**
         * FileUploadWidget control.
         */
        FileUploadWidget = 81,
    }
}
declare module MsPortalFx.ViewModels {
    interface FormElement extends MsPortalFx.ViewModels.Controls.Base.Contract {
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutObservableBase<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * When changed forces validation on the field.
         */
        validate: KnockoutObservable<number>;
        /**
         * Clears validations on the control.
         */
        clearValidation(): MsPortalFx.Base.Promise;
        /**
         * Internal view model property.
         */
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
    }
}
declare module MsPortalFx.ViewModels {
    interface FormFieldValueAccessors<T> {
        /**
         * A function that will return an observable containing the original value for the field.
         */
        getOriginalObservable: (lifetimeManager?: MsPortalFx.Base.DisposableLifetimeManager) => KnockoutObservableBase<T>;
        /**
         * A function that will return an observable containing the editable value for the field.
         */
        getEditableObservable: (lifetimeManager?: MsPortalFx.Base.DisposableLifetimeManager) => KnockoutObservableBase<T>;
    }
}
declare module MsPortalFx.ViewModels {
    interface FormField<T> extends FormElement {
        /**
         * Label for the field.
         */
        label?: KnockoutObservable<string>;
        /**
         * Label position for the field.
         */
        labelPosition?: KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
        /**
         * Initial value for the field.
         */
        initialValue?: KnockoutObservableBase<T>;
        /**
         * Current value of the field.
         */
        value?: KnockoutObservableBase<T>;
        /**
         * Turns validation on and off for the form field.
         */
        enableValidation?: KnockoutObservableBase<boolean>;
        /**
         * A list of validations that should be applied to the form field.
         */
        validations?: KnockoutObservableArray<FormValidation>;
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout?: KnockoutObservable<number>;
        /**
         * Whether the field is enabled or not.
         */
        enabled?: KnockoutObservable<boolean>;
        /**
         * Specifies text that will be displayed in an info balloon next to the field's label.
         */
        infoBalloonContent?: KnockoutObservable<string>;
        /**
         * Whether validation should be performed on a control. Switching to true will trigger immediate validation.
         */
        performValidation?: KnockoutObservable<boolean>;
        /**
         * When changed triggers validation on the field if it has not been run.
         */
        ensureValidation?: KnockoutObservable<number>;
        /**
         * A function through which the enclosing form will dispose this field.  The field's 'initialValue' and 'value'
         * observables should be disposed if they are disposable.
         */
        dispose(): void;
        /**
         * Default value for the field.
         */
        defaultValue?: KnockoutObservableBase<T>;
    }
    class Field<T> extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements FormField<T> {
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutComputed<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutObservable<boolean>;
        /**
         * Turns validation on and off for the form field.
         */
        enableValidation: KnockoutObservableBase<boolean>;
        /**
         * When changed this signals to the control validation should occur.
         */
        validate: KnockoutObservable<number>;
        /**
         * Label for the field.
         */
        label: KnockoutObservable<string>;
        /**
         * Label for the field.
         */
        labelPosition: KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
        /**
         * Current value of the field.
         */
        value: KnockoutObservableBase<T>;
        /**
         * Initial value for the field.
         */
        initialValue: KnockoutObservableBase<T>;
        /**
         * A list of validations that should be applied to the form field.
         */
        validations: KnockoutObservableArray<FormValidation>;
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         * Whether the field is enabled or not.
         */
        enabled: KnockoutObservable<boolean>;
        /**
         * Specifies text that will be displayed in an info balloon next to the field's label.
         */
        infoBalloonContent: KnockoutObservable<string>;
        /**
         * Whether validation should be performed on a control. Switching to true will trigger immediate validation.
         */
        performValidation: KnockoutObservable<boolean>;
        /**
         * When changed triggers validation on the field if it has not been run.
         */
        ensureValidation: KnockoutObservable<number>;
        /**
         * Default value for the field.
         */
        defaultValue: KnockoutObservableBase<T>;
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        _enableValidationReactor: KnockoutComputed<void>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param defaultValue An optional, default value of type T, used when the EditScope underlying the enclosing Form isn't
         * yet loaded.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], infoBalloonContent?: string, defaultValue?: T);
        dispose(): void;
        /**
         * Clears validation on the field.
         * @return A promise that is resolved when the validation has been cleared.
         */
        clearValidation(): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Forms.Base {
    interface Section extends FormElement {
        /**
         * Indicates if the sections or controls within the widget are currently valid.
         */
        valid: KnockoutObservableBase<boolean>;
    }
}
declare module MsPortalFx.ViewModels.Forms.Form {
    enum FieldValueAccessorType {
        Original = 0,
        Editable = 1,
    }
    interface InternalEditScopeAccessors extends MsPortalFx.ViewModels.Forms.EditScopeAccessors<any> {
        createdByBaseFormClass: boolean;
    }
    class ViewModel<T> implements MsPortalFx.Base.Disposable {
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * The list of form sections contained in the form.
         */
        sections: KnockoutObservableArray<Base.Section>;
        private _editScope;
        private _getNestedData;
        private _lifetimeManager;
        /**
         * Creates a Form instance.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param editScope An optional observable that supplies an EditScope to the form (for instance, as master
         * selection changes for this details form).  If not supplied here, then the 'editScope' property should be set
         * before using this view model.
         * @param getNestedData An optional function that returns a nested object from which fields will be retrieved,
         * given either the original or editable root object of the EditScope.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, editScope?: KnockoutObservable<MsPortalFx.Data.EditScope>, getNestedData?: (data: any) => T);
        /**
         * Gets the view model's edit scope observable.
         *
         * @return The view model's edit scope observable.
         */
        /**
         * Sets the view model's edit scope observable.
         *
         * @param editScope An observable that supplies an EditScope to the form (for instance, as master selection
         * changes for this details form).
         */
        editScope: KnockoutObservable<MsPortalFx.Data.EditScope>;
        /**
         * See interface.
         */
        dispose(): void;
        /**
         * ****** DEPRECATED ******
         * Instead use createEditScopeAccessor when calling constructors of form fields.
         * This method will be removed in the future.
         * ************************
         *
         * Creates accessor functions used by a form field to retrieve observables that reflect original and editable
         * values for the field.
         *
         * @param observablePath A path to the observable value within the EditScope.
         * @return FormFieldValueAccessors Accessor functions used by a form field.
         */
        createFieldValueAccessor<TFieldValue>(observablePath: string): MsPortalFx.ViewModels.FormFieldValueAccessors<TFieldValue>;
        /**
         * ****** DEPRECATED ******
         * Instead use createEditScopeAccessor when calling constructors of form fields.
         * This method will be removed in the future.
         * ************************
         *
         * Creates accessor functions used by a form field to retrieve observables that reflect original and editable
         * values for the field.
         *
         * @param observableAccessor A function which accesses the observable for the field value.
         * @return FormFieldValueAccessors Accessor functions used by a form field.
         */
        createFieldValueAccessor<TFieldValue>(observableAccessor: (data: T, lifetimeManager: MsPortalFx.Base.LifetimeManager, type?: FieldValueAccessorType) => KnockoutObservableBase<TFieldValue>): MsPortalFx.ViewModels.FormFieldValueAccessors<TFieldValue>;
        _createEditScopeAccessorFromPath<TFieldValue>(observablePath: string): MsPortalFx.ViewModels.Forms.EditScopeAccessors<TFieldValue>;
        /**
         * Creates an EditScopeAccessor used both to retrieve original/editable values from an EditScope and to write one or more values back to the EditScope.
         * This is used by both forms fields and collectors.
         *
         * @param options Methods for reading and writing to an edit scope.
         * @return FormEditScopeAccessors Accessor functions used by forms and collectors.
         */
        createEditScopeAccessor<TFieldValue>(options: EditScopeAccessors.Options<T, TFieldValue>): MsPortalFx.ViewModels.Forms.EditScopeAccessors<TFieldValue>;
        /**
         * Creates an EditScopeAccessor used both to retrieve original/editable values from an EditScope and to write one or more values back to the EditScope.
         * This is used by both forms fields and collectors.
         *
         * @param observableAccessor A function which accesses a property on the edit scope.  ie: (data) => { return data.myProperty }
         * @return FormEditScopeAccessors Accessor functions used by a form field.
         */
        createEditScopeAccessor<TFieldValue>(observableAccessor: (data: T, lifetimeManager: MsPortalFx.Base.LifetimeManager, type?: FieldValueAccessorType) => KnockoutObservableBase<TFieldValue>): MsPortalFx.ViewModels.Forms.EditScopeAccessors<TFieldValue>;
        /**
         * Creates an EditScopeAccessor used both to retrieve original/editable values from an EditScope and to write one or more values back to the EditScope.
         * This is an advanced option without runtime validation of the options passed in.
         * Use createEditScopeAccessor instead of this method wherever possible.
         *
         * @param options Methods for reading and writing to an edit scope.
         * @return FormEditScopeAccessors Accessor functions used by a form field.
         */
        createCustomEditScopeAccessor<TFieldValue>(options: EditScopeAccessors.Options<T, TFieldValue>): MsPortalFx.ViewModels.Forms.EditScopeAccessors<TFieldValue>;
        /**
         * Creates an EditScopeAccessor used both to retrieve original/editable values from an EditScope and to write one or more values back to the EditScope.
         * This is an advanced option without runtime validation of the observableAccessor lambda.
         * Use createEditScopeAccessor instead of this method wherever possible
         *
         * @param observableAccessor A function which accesses the observable for the field value.
         * @return FormEditScopeAccessors Accessor functions used by a form field.
         */
        createCustomEditScopeAccessor<TFieldValue>(observableAccessor: (data: T, lifetimeManager: MsPortalFx.Base.LifetimeManager, type?: FieldValueAccessorType) => KnockoutObservableBase<TFieldValue>): MsPortalFx.ViewModels.Forms.EditScopeAccessors<TFieldValue>;
        _sanitizeAccessor<TFieldValue>(accessor: (data: T, lifetimeManager: MsPortalFx.Base.LifetimeManager, type?: FieldValueAccessorType) => KnockoutObservableBase<TFieldValue>): (data: T, lifetimeManager: MsPortalFx.Base.LifetimeManager, type?: FieldValueAccessorType) => KnockoutObservableBase<TFieldValue>;
        _sanitizeAccessor<TFieldValue>(options: EditScopeAccessors.Options<T, TFieldValue>): EditScopeAccessors.Options<T, TFieldValue>;
        _sanitizeAccessorLambda(lambda: Function): any;
        private static _logEditScopeAccessorError(message);
        /**
         * Parses a string path representing a variable on an object or array, and returns the value mapped
         * to the path.
         * Note: Only use this function in the context of a computed. Otherwise, the returned observable variable
         *  will be orphaned if its parent is observable and changes.
         *
         * @param data The object or array to which the path maps.
         * @param path The path mapping to data on the object or array.
         * @param separator Optional The separator used between the nodes on the path. Default is a period.
         * @return The variable mapped to the path.
         */
        private _convertPathToVariable(data, path, separator?);
    }
}
declare module MsPortalFx.ViewModels.Forms {
    /**
     * The position of the label in a form element.
     */
    enum LabelPosition {
        /**
         * A top aligned label. Default.
         */
        Top = 0,
        /**
         * A left aligned label.
         */
        Left = 1,
    }
    module Base.LabelAndBalloon {
        /**
         * Options to render a form element with a label and info balloon.
         */
        interface Options {
            /**
             * Label for the field.
             */
            label?: KnockoutObservable<string>;
            /**
             * Label position for the field.
             */
            labelPosition?: KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
            /**
             * Specifies text that will be displayed in an info balloon next to the field's label.
             */
            infoBalloonContent?: KnockoutObservable<string>;
            /**
             * Specifies Link object that will be displayed in an info balloon next to the field's label.
             */
            infoBalloonLinkContent?: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        }
        /**
         * Implements LabelAndBalloonContract.
         */
        class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel {
            /**
             * Label for the field.
             */
            label: KnockoutObservable<string>;
            /**
             * Label for the field.
             */
            labelPosition: KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
            /**
             * Specifies text that will be displayed in an info balloon next to the field's label.
             */
            infoBalloonContent: KnockoutObservable<string>;
            /**
             * Specifies Link object that will be displayed in an info balloon next to the field's label.
             */
            infoBalloonLinkContent: KnockoutObservable<MsPortalFx.ViewModels.Controls.Balloon.Link>;
            /**
             * Abstract base class. Do not use this class directly.
             *
             * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
             * @param label Optional. Text for the label for this form field.
             * @param infoBalloonContent Optional. A list of validations to be applied to the field.
             */
            constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: LabelAndBalloon.Options);
        }
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Input {
    interface Options<T> extends LabelAndBalloon.Options {
        /**
         * A list of validations that should be applied to the form field.
         */
        validations?: KnockoutObservableArray<MsPortalFx.ViewModels.FormValidation>;
        /**
         * Default value for the field.
         */
        defaultValue?: KnockoutObservableBase<T>;
    }
    class ViewModel<T> extends LabelAndBalloon.ViewModel {
        /**
         * Label for the field.
         */
        label: KnockoutObservable<string>;
        /**
         * Label position for the field.
         */
        labelPosition: KnockoutObservable<MsPortalFx.ViewModels.Forms.LabelPosition>;
        /**
         * A list of validations that should be applied to the form field.
         */
        validations: KnockoutObservableArray<MsPortalFx.ViewModels.FormValidation>;
        /**
         * Specifies text that will be displayed in an info balloon next to the field's label.
         */
        infoBalloonContent: KnockoutObservable<string>;
        /**
         * Default value for the field.
         */
        defaultValue: KnockoutObservableBase<T>;
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutComputed<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutObservable<boolean>;
        /**
         * Turns validation on and off for the form field.
         */
        enableValidation: KnockoutObservableBase<boolean>;
        /**
         * When changed this signals to the control validation should occur.
         */
        validate: KnockoutObservable<number>;
        /**
         * Current value of the field.
         */
        value: KnockoutObservableBase<T>;
        /**
         * Initial value for the field.
         */
        initialValue: KnockoutObservableBase<T>;
        /**
         * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
         * Set the timeout value when continous value update on key press is enabled.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         * Whether the field is enabled or not.
         */
        enabled: KnockoutObservable<boolean>;
        /**
         * Whether validation should be performed on a control. Switching to true will trigger immediate validation.
         */
        performValidation: KnockoutObservable<boolean>;
        /**
         * When changed triggers validation on the field if it has not been run.
         */
        ensureValidation: KnockoutObservable<number>;
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        _enableValidationReactor: KnockoutComputed<void>;
        _options: Base.Input.Options<T>;
        private _editScopeAccessors;
        private _lifetimeManager;
        private _form;
        private _previousEditScope;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the Field is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the Field control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, formOrOptions: Form.ViewModel<any>, pathOrAccessor: any, options?: Options<T>);
        dispose(): void;
        /**
         * ****** DEPRECATED ******
         * Pass in the EditScopeAccessor into the constructor of your field instead of calling this method.  This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<T>): void;
        /**
         * Set the EditScopeAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with EditScopeAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         * @param form Optional. The form whose edit scope drives the fieldValueAccessors (if one exists).
         */
        _setEditScopeAccessors(fieldValueAccessors: EditScopeAccessors<T>, form?: Form.ViewModel<T>): void;
        /**
         * Clears validation on the field.
         * @return A promise that is resolved when the validation has been cleared.
         */
        clearValidation(): MsPortalFx.Base.Promise;
        private _initializeFieldStateObservables();
    }
}
declare module MsPortalFx.ViewModels.Controls.Data.QueryBuilder {
    /**
     * An interface for a query update object.
     */
    interface QueryLoading {
        /**
         * The status of the query update.
         */
        status: QueryLoadingStatus;
        /**
         * An optional message corresponding to the update status.
         */
        message?: string;
    }
    enum QueryLoadingStatus {
        /**
         * The query is not loading.
         */
        NotLoading = 0,
        /**
         * The query is done loading.
         */
        Loading = 1,
        /**
         * The query failed to load.
         */
        Failed = 2,
    }
    /**
     * The callback method query.
     */
    interface CallbackMethodQuery {
        /**
         * A collection of operator ids.
         */
        operatorIds: string[];
        /**
         * A collection of field ids.
         */
        fieldIds: string[];
        /**
         * The type of the callback.
         */
        type: CallbackMethodType;
        /**
         * The original query object of the predicate invoking the callback.
         */
        originalPredicate: QueryPredicate;
    }
    /**
     * The callback method type.
     */
    enum CallbackMethodType {
        /**
         * A callback requesting operator data.
         */
        Operator = 0,
        /**
         * A callback requesting operand data.
         */
        Operand = 1,
    }
    /**
     * The callback method for dynamic schema loading.
     */
    interface CallbackMethod {
        (query: CallbackMethodQuery): MsPortalFx.Base.PromiseV<Schema>;
    }
    /**
     * Query definition.
     */
    interface Query {
        /**
         * The query expression.
         */
        expressions: QueryExpression[];
    }
    /**
     * Query expression type for expression persistence.
     */
    class QueryExpressionType {
        /**
          * Query expression type for expression persistence.
          */
        static Group: string;
        /**
         * Query expression type for expression persistence.
         */
        static Predicate: string;
    }
    /**
     * Expression definition.
     */
    interface QueryExpression {
        /**
         * The expression type.
         * QueryExpressionType.Group or QueryExpressionType.Predicate.
         */
        type: string;
        /**
         * The expression connector id.
         */
        connector: string;
    }
    /**
     * Group expression definition.
     */
    interface QueryGroup extends QueryExpression {
        /**
         * The expressions in the group.
         */
        expressions: QueryExpression[];
    }
    /**
     * Predicate expression definition.
     */
    interface QueryPredicate extends QueryExpression {
        /**
         * The predicate field id.
         */
        field: string;
        /**
         * The predicate operator id.
         */
        operator: string;
        /**
         * The predicate operands.
         */
        operands: QueryPredicateOperands;
    }
    /**
     * Predicate operands.
     *
     * The operands are not defined on this interface since they can vary by name.
     * They can be accessed directly off this object by operand id.
     * The operand values will be in the following forms:
     *     QueryPredicateOperandValue         // For input and select templates
     *     [QueryPredicateOperandValue, ...]  // For multiple select templates
     */
    interface QueryPredicateOperands {
    }
    /**
     * Predicate operand value.
     */
    interface QueryPredicateOperandValue {
        /**
         * The user selected option id.
         */
        option?: string;
        /**
         * The user selected or supplied value.
         */
        value?: any;
    }
    /**
     * The root interface defining a field schema.
     */
    interface Schema {
        /**
         * Logical connectors for predicates.
         */
        connectors: SchemaConnector[];
        /**
         * Field definitions.
         */
        fields: SchemaField[];
        /**
         * Predicate operator definitions.
         */
        operators?: SchemaOperator[];
    }
    /**
     * The base interface for schame objects.
     */
    interface SchemaObject {
        /**
         * Identifier for the object.
         */
        id: string;
    }
    /**
     * A logical connector for connecting a predicate to a query ("And"/"Or").
     */
    interface SchemaConnector extends SchemaObject {
        /**
         * Text fo label the connector when displayed.
         */
        name?: string;
    }
    /**
     * Schema field definition.
     */
    interface SchemaField extends SchemaObject {
        /**
         * Text to display for the schema field.
         */
        name: string;
        /**
        * Field default operator id.
         */
        defaultOperator?: string;
        /**
         * Field operator and operator group ids.
         */
        operators?: SchemaOperator[];
    }
    /**
     * A predicate operand definition.
     */
    interface SchemaOperand extends SchemaObject {
        /**
         * Text to label the operand in the display.
         */
        name?: string;
        /**
         * The form control used to handle the input for the operand.
         */
        control: MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<any>;
    }
    /**
     * A predicate operator definition.
     */
    interface SchemaOperator extends SchemaObject {
        /**
         * Text to display for the operator.
         */
        name?: string;
        /**
         * Set of operands for the predicate.
         */
        operands?: SchemaOperand[];
    }
    /**
     * Localizable resource strings for the control.
     */
    interface ResourceStrings {
        /**
         * Column header for predicate connectors.
         */
        connectorColumnHeader: string;
        /**
         * Column header for predicate fields.
         */
        fieldColumnHeader: string;
        /**
         * Column header for predicate operators.
         */
        operatorColumnHeader: string;
        /**
         * Column header for predicate values/operands.
         */
        valueColumnHeader: string;
        /**
         * Add command label.
         */
        addCommandLabel: string;
        /**
         * Insert command label.
         */
        insertCommandLabel: string;
        /**
         * Remove command label.
         */
        removeCommandLabel: string;
        /**
         * Remove command label for multiple items.
         */
        removeCommandLabelMultiple: string;
        /**
         * Group command label.
         */
        groupCommandLabel: string;
        /**
         * Ungroup command label.
         */
        ungroupCommandLabel: string;
    }
    /**
     * Resource item contract.
     */
    interface ResourceItem {
        /**
         * Name of the current resource.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource.
         */
        id: KnockoutObservable<string>;
        /**
         * Additional information about the resource.
         */
        description: KnockoutObservable<string>;
        /**
         * Specify the resource type.
         */
        type: KnockoutObservable<string>;
    }
    interface ISchemaObjectBaseViewModel {
        /**
         * Gets the object id.
         *
         * @return The object id.
         */
        id: string;
    }
    interface ISchemaConnectorViewModel {
        /**
         * Gets the connector name.
         *
         * @return The connector name.
         */
        name: string;
    }
    interface IQueryExpressionViewModel {
        /**
         * Gets the expression collection.
         *
         * @return The expression collection.
         */
        collection: KnockoutObservableArray<IQueryExpressionViewModel>;
        /**
         * Gets the expression connector.
         *
         * @return The expression connector.
         */
        connector: KnockoutObservable<ISchemaConnectorViewModel>;
        /**
         * Gets the expression type.
         *
         * @return The expression type.
         */
        type: string;
        /**
         * Gets the selection state of the expression.
         *
         * @return The selection state of the expression.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Gets the toggle select handler for the selected state.
         *
         * @return The select handler for the selected state.
         */
        select: () => void;
        /**
         * Gets the expression template name for rendering.
         *
         * @return The expression template name for rendering.
         */
        template: string;
        /**
         * Adds the expression to the end of the collection.
         *
         * @param collection The collection to add into.
         */
        add: (collection: KnockoutObservableArray<IQueryExpressionViewModel>) => void;
        /**
         * Groups the expression and its contiguous siblings.
         *
         * @param length The number of siblings after this expression to group.
         * @param group The group to add the expressions to.
         */
        group: (length: number, group: IQueryGroupViewModel) => void;
        /**
         * Inserts the expression after the selected expression.
         *
         * @param selected The selected expression.
         */
        insert: (selected: IQueryExpressionViewModel) => void;
        /**
         * Removes the expression from the current parent collection.
         */
        remove: () => void;
        /**
         * Replaces the specified children of the collection with the expression.
         *
         * @param collection The collection to put the expression in.
         * @param index The start index for the replace.
         * @param count The number of expressions to replace.
         */
        replace: (collection: KnockoutObservableArray<IQueryExpressionViewModel>, index: number, count: number) => void;
    }
    interface ISchemaFieldViewModel {
        /**
         * Gets the field default operator.
         *
         * @return The field default operator.
         */
        defaultOperator: ISchemaOperatorViewModel;
        /**
         * Gets the field name.
         *
         * @return The field name.
         */
        name: string;
        /**
         * Gets the field named operators.
         *
         * @return The field named operators.
         */
        namedOperators: ISchemaOperatorViewModel[];
        /**
         * Gets the field operators.
         *
         * @return The field operators.
         */
        operators: ISchemaOperatorViewModel[];
    }
    interface ISchemaOperatorViewModel {
        /**
         * Gets the operator name.
         *
         * @return The operator name.
         */
        name: string;
        /**
         * Gets the operator operands.
         *
         * @return The operator operands.
         */
        operands: ISchemaOperandViewModel[];
    }
    interface ISchemaOperandViewModel {
        /**
         * Gets the operand name.
         *
         * @return The operand name.
         */
        name: string;
        /**
         * Gets the operand control.
         *
         * @return The operand control.
         */
        control: MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<any>;
    }
    interface IQueryPredicateOperandViewModel {
        /**
         * Gets the id.
         *
         * @return The operand id.
         */
        id: string;
        /**
         * Gets the name.
         *
         * @return The operand name.
         */
        name: string;
        /**
         * Gets the control.
         *
         * @return The operand control.
         */
        control: MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<any>;
        /**
         * Gets the current value.
         *
         * @return The current value.
         */
        value: KnockoutObservable<any>;
        /**
         * Gets the selection state of the expression.
         *
         * @return The selection state of the expression.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * Gets the selected option value.
         *
         * @return The selected option value.
         */
        selectedValue: KnockoutComputed<string>;
        /**
         * Saves the query predicate operand view model.
         *
         * @return The query predicate operand value in the format QueryPredicateOperandValue or [QueryPredicateOperandValue] depending on the template.
         */
        serialize: () => any;
    }
    interface IQueryPredicateViewModel {
        /**
         * Gets the current predicate field view model.
         *
         * @return The current predicate field view model.
         */
        field: KnockoutObservable<ISchemaFieldViewModel>;
        /**
         * Gets the available schema fields.
         *
         * @return The schema fields.
         */
        fields: KnockoutObservableArray<ISchemaFieldViewModel>;
        /**
         * Gets the current predicate operator view model.
         *
         * @return The current predicate operator view model.
         */
        operator: KnockoutObservable<ISchemaOperatorViewModel>;
        /**
         * Gets the available operators for the current field.
         *
         * @return The operators.
         */
        operators: KnockoutObservableArray<ISchemaOperatorViewModel>;
        /**
         * Gets the available named operators for the current field.
         *
         * @return The operators.
         */
        namedOperators: KnockoutObservableArray<ISchemaOperatorViewModel>;
        /**
         * Gets the current predicate operand view models.
         *
         * @return The current predicate operand view models.
         */
        operands: KnockoutObservable<IQueryPredicateOperandViewModel[]>;
        /**
         * Gets the current loading state of the query.
         *
         * @return The current loading state of the query.
         */
        queryLoading: KnockoutObservable<QueryLoading>;
        /**
         * Saves the query predicate.
         *
         * @return Persistable predicate object.
         */
        serialize: () => QueryPredicate;
    }
    interface IQueryGroupViewModel {
        /**
         * Gets the expressions in this group.
         *
         * @return The expressions in this group.
         */
        expressions: KnockoutObservableArray<IQueryExpressionViewModel>;
        /**
         * Gets the first nested predicate in this group.
         *
         * @return The first predicate.
         */
        firstPredicate: KnockoutComputed<IQueryPredicateViewModel>;
        /**
         * Saves the query group.
         *
         * @return Persistable group object.
         */
        serialize: () => QueryGroup;
        /**
         * Ungroup this group.
         * Replaces the group with its children.
         */
        ungroup: () => void;
    }
    interface IQueryViewModel {
        /**
         * Gets the query expressions.
         *
         * @return The query expressions.
         */
        expressions: KnockoutObservableArray<IQueryExpressionViewModel>;
        /**
         * Gets the query loading status.
         *
         * @return The query loading status.
         */
        queryLoading: KnockoutObservableBase<QueryLoading>;
        /**
         * Gets the query dirty status.
         *
         * @return The query dirty status.
         */
        dirty: KnockoutObservable<boolean>;
        /**
         * Gets the query initialized status.
         *
         * @return The query initialized status.
         */
        initialized: KnockoutObservable<boolean>;
        /**
         * Saves the query.
         *
         * @return Persistable query object with only the query interface members.
         */
        serialize: () => Query;
    }
    /**
     * QueryBuilder view model.
     */
    interface Contract extends Loadable.Contract {
        /**
         * Shows the query builder header.
         */
        showHeader: KnockoutObservable<boolean>;
        /**
         * Shows the query builder footer.
         */
        showFooter: KnockoutObservable<boolean>;
        /**
         * Title displayed on query expression builder.
         */
        title: KnockoutObservable<string>;
        /**
         * Schema defining fields and operations allowed in the query expression.
         */
        schema: KnockoutObservable<Schema>;
        /**
         * Query expression to be loaded.
         */
        query: KnockoutObservable<Query>;
        /**
         * Query expression to be saved to.
         */
        queryViewModel: KnockoutObservable<IQueryViewModel>;
        /**
         * Query expression to be saved to.
         */
        savedQuery: KnockoutObservable<Query>;
        /**
         * Adds a new predicate to the end of the query expressions.
         */
        add: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Inserts a new predicate after the currently selected predicate and in the same group.
         */
        insert: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Removes all the selscted expressions and ungroups any groups with less than two expressions.
         */
        remove: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Groups contiguous selected expressions.
         */
        group: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Ungroups the selected group.
         */
        ungroup: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Saves the current query.
         */
        save: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         *  Defines the callback method for extending the schema.
         */
        callback: CallbackMethod;
        /**
         * The loading status of the query and control.
         */
        queryLoading: KnockoutObservableBase<QueryLoading>;
        /**
         * The query expression.
         */
        _msPortalFxOperandControls: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<any>>;
    }
    /**
     * QueryBuilder view model.
     */
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Shows the query builder header.
         */
        showHeader: KnockoutObservable<boolean>;
        /**
         * Shows the query builder footer.
         */
        showFooter: KnockoutObservable<boolean>;
        /**
         * Title displayed on query expression builder.
         */
        title: KnockoutObservable<string>;
        /**
         * Schema defining fields and operations allowed in the query expression.
         */
        schema: KnockoutObservable<Schema>;
        /**
         * Query expression to be saved to.
         */
        query: KnockoutObservable<Query>;
        /**
         * Query expression to be saved to.
         */
        queryViewModel: KnockoutObservable<IQueryViewModel>;
        /**
         * Query expression to be loaded or saved.
         */
        savedQuery: KnockoutObservable<Query>;
        /**
         * Adds a new predicate to the end of the query expressions.
         */
        add: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Inserts a new predicate after the currently selected predicate and in the same group.
         */
        insert: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Removes all the selscted expressions and ungroups any groups with less than two expressions.
         */
        remove: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Groups contiguous selected expressions.
         */
        group: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Ungroups the selected group.
         */
        ungroup: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         * Saves the current query.
         */
        save: MsPortalFx.ViewModels.Controls.Command.ViewModel;
        /**
         *  Defines the callback method for extending the schema.
         */
        callback: CallbackMethod;
        /**
         * The loading status of the query and control.
         */
        queryLoading: KnockoutObservableBase<QueryLoading>;
        /**
         * The query expression.
         */
        _msPortalFxOperandControls: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.Base.Input.ViewModel<any>>;
        /**
         * @param schema The schema used to define the structure of the query builder
         * @param title The title of the query builder
         * @param query The initial query to populate into the query builder
         * @param callback The callback method for extending the schema.
         */
        constructor(schema: Schema);
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.Editor {
    import CommandStatus = MsPortalFx.ViewModels.Controls.Command.Status;
    /**
     * Enum for extension availability.
     * Individual extensions will contribute to this.
     */
    enum Extensions {
        /**
        * No extension.
        */
        None = 0,
    }
    /**
     * Detailed options for extensions.
     * Individual extensions will contribute to this.
     */
    interface ExtensionOptions {
    }
    /**
     * Base interface for editor extension options.
     */
    interface BaseExtensionOption {
    }
    /**
     * Handler of the extension command.
     */
    interface ExtensionHandler<TContext, TResult> {
        (context?: TContext): MsPortalFx.Base.PromiseV<TResult>;
    }
    /**
     * Light-weight command used for extension actions.
     */
    class ExtensionCommand<TContext, TResult> {
        /**
         * The latest command status.
         */
        status: KnockoutObservable<CommandStatus>;
        /**
         * The latest command error.
         */
        error: KnockoutObservable<any>;
        /**
         * The latest command error message.
         */
        errorMessage: KnockoutObservable<string>;
        /**
         * Handles the command execution.
         */
        handler: KnockoutObservable<ExtensionHandler<TContext, TResult>>;
        /**
         * Creates an extension command.
         *
         * @handler Handles the command execution.
         */
        constructor(handler?: ExtensionHandler<TContext, TResult>);
        /**
        * Executes the command handler and updates the view model state.
        *
        * @return Callback promise for completion or failure.
        */
        execute(context?: TContext): MsPortalFx.Base.PromiseV<TResult>;
    }
    /**
     * Setup delegate for individual extensions.
     */
    interface ExtensionSetupDelegate {
        (extensions: Extensions, extensionOptions: ExtensionOptions): KnockoutDisposable[];
    }
    /**
     * Enables registering setup delegate for an extension.
     *
     * @param setupDelegate Delegate to run when extensions are initialized.
     */
    function registerExtensionSetup(setupDelegate: ExtensionSetupDelegate): void;
    /**
     * Gets the list of setup delegates for extensions.
     *
     * @return List of setup delegates.
     */
    function getExtensionSetups(): ExtensionSetupDelegate[];
}
declare module MsPortalFx.ViewModels.Controls.Documents.DiscussionThread {
    /**
     * Represents a result for save command.
     */
    interface DiscussionSaveResult {
        /**
         * Id of the item.
         */
        id?: number;
        /**
         * Published date of the item.
         */
        publishedDate?: Date;
        /**
         * Last updated date of the item.
         */
        lastUpdatedDate?: Date;
    }
    /**
     * Represents a result for comment save command.
     */
    interface DiscussionCommentSaveResult extends DiscussionSaveResult {
    }
    /**
     * Represents a result for thread save command.
     */
    interface DiscussionThreadSaveResult extends DiscussionSaveResult {
        /**
         * Result for the single comment in a newly saved thread.
         */
        commentResult?: DiscussionCommentSaveResult;
    }
    /**
     * Represents an author of a code discussion.
     */
    interface DiscussionAuthor {
        /**
         * Id of the author.
         */
        id: KnockoutObservable<string>;
        /**
         * Display name of the author.
         */
        displayName: KnockoutObservable<string>;
        /**
         * Profile image of the author. It can be base64 data or URL.
         */
        image?: KnockoutObservable<string>;
    }
    /**
     * Base interface for thread and comment.
     */
    interface DiscussionItem {
        /**
         * Id of the discussion item.
         */
        id: KnockoutObservable<number>;
        /**
         * Published date of the discussion item.
         */
        publishedDate: KnockoutObservable<Date>;
        /**
         * Last updated date of the discussion item.
         */
        lastUpdatedDate: KnockoutObservable<Date>;
    }
    /**
     * Represents a comment in a discussion thread.
     */
    interface DiscussionComment extends DiscussionItem {
        /**
         * Id of the parent comment.
         */
        parentId: KnockoutObservable<number>;
        /**
         * Id of the discussion thread.
         */
        threadId: KnockoutObservable<number>;
        /**
         * Author of this comment.
         */
        author: KnockoutObservable<DiscussionAuthor>;
        /**
         * Content of this comment.
         */
        content: KnockoutObservable<string>;
        /**
         * Determines whether this comment can be deleted or not.
         */
        canDelete: KnockoutObservable<boolean>;
        /**
         * Determines whether this comment is editable or not.
         */
        isEditable: KnockoutObservable<boolean>;
        /**
         * Save action for the comment.
         */
        save: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, DiscussionCommentSaveResult>;
    }
    class DiscussionCommentViewModel implements DiscussionComment {
        /**
         * Id of the comment.
         */
        id: KnockoutObservable<number>;
        /**
         * Published date of the comment.
         */
        publishedDate: KnockoutObservable<Date>;
        /**
         * Last updated date of the comment.
         */
        lastUpdatedDate: KnockoutObservable<Date>;
        /**
         * Id of the parent comment.
         */
        parentId: KnockoutObservable<number>;
        /**
         * Id of the discussion thread.
         */
        threadId: KnockoutObservable<number>;
        /**
         * Author of this comment.
         */
        author: KnockoutObservable<DiscussionAuthor>;
        /**
         * Content of this comment.
         */
        content: KnockoutObservable<string>;
        /**
         * Determines whether this comment can be deleted or not.
         */
        canDelete: KnockoutObservable<boolean>;
        /**
         * Determines whether this comment is editable or not.
         */
        isEditable: KnockoutObservable<boolean>;
        /**
         * Save action for the comment.
         */
        save: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, DiscussionCommentSaveResult>;
        /**
         * Creates a discussion comment class.
         *
         * @param id Id of the comment.
         * @param content Content of the comment.
         * @param author Author of the comment.
         */
        constructor(id?: number, content?: string, author?: DiscussionAuthor);
    }
    /**
     * Represents a thread in a code discussion.
     */
    interface DiscussionThread extends DiscussionItem {
        /**
         * Comments added to this discussion thread.
         */
        comments: KnockoutObservableArray<DiscussionComment>;
        /**
         * Save action for the thread.
         */
        save: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, DiscussionThreadSaveResult>;
        /**
         * Action for adding new comment.
         */
        addComment: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, any>;
        /**
         * Action for deleting the comment.
         */
        deleteComment: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<number, any>;
    }
    class DiscussionThreadViewModel implements DiscussionThread {
        /**
         * Id of the thread.
         */
        id: KnockoutObservable<number>;
        /**
         * Published date of the thread.
         */
        publishedDate: KnockoutObservable<Date>;
        /**
         * Last updated date of the thread.
         */
        lastUpdatedDate: KnockoutObservable<Date>;
        /**
         * Comments added to this discussion thread.
         */
        comments: KnockoutObservableArray<DiscussionComment>;
        /**
         * Save action for the thread.
         */
        save: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, DiscussionThreadSaveResult>;
        /**
         * Action for adding new comment.
         */
        addComment: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<any, any>;
        /**
         * Action for deleting the comment.
         */
        deleteComment: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<number, any>;
        /**
         * Creates a discussion thread class.
         *
         * @param id Id of the thread.
         * @param comments Comments of the thread.
         */
        constructor(id?: number, comments?: DiscussionComment[]);
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.Editor {
    enum Extensions {
        /**
        * Extension used to enable code discussion.
        */
        Discussion = 1,
    }
    interface ExtensionOptions {
        /**
        * Options for code discussion. If not specified, code discussion will be disabled.
        */
        discussion?: DiscussionOptions;
    }
    /**
     * Represents the position of the thread in the editor.
     */
    interface EditorThreadPosition {
        /**
         * Determines whether thread should be on modified side or not.
         */
        isModifiedSide: boolean;
        /**
         * Start column of the thread.
         */
        startColumn: number;
        /**
         * End column of the thread.
         */
        endColumn: number;
        /**
         * Start line of the thread.
         */
        startLine: number;
        /**
         * End line of the thread.
         */
        endLine: number;
    }
    interface EditorThread extends MsPortalFx.ViewModels.Controls.Documents.DiscussionThread.DiscussionThread {
        /**
         * Position of the thread used to locate inside the editor.
         */
        position: KnockoutObservable<EditorThreadPosition>;
    }
    class EditorThreadViewModel extends MsPortalFx.ViewModels.Controls.Documents.DiscussionThread.DiscussionThreadViewModel {
        /**
         * Position of the thread used to locate inside the editor.
         */
        position: KnockoutObservable<EditorThreadPosition>;
        /**
         * Creates an editor thread class.
         *
         * @param id Id of the thread.
         * @param comment Comments of the thread.
         * @param position Position of the thread.
         */
        constructor(id?: number, comments?: MsPortalFx.ViewModels.Controls.Documents.DiscussionThread.DiscussionComment[], position?: EditorThreadPosition);
    }
    interface BaseDiscussionOptions<TThread extends DiscussionThread.DiscussionThread> extends BaseExtensionOption {
        /**
         * Author of this discussion.
         */
        author: KnockoutObservable<MsPortalFx.ViewModels.Controls.Documents.DiscussionThread.DiscussionAuthor>;
        /**
         * Threads of this discussion.
         */
        threads: KnockoutObservableArray<TThread>;
        /**
         * Action for adding new thread.
         */
        addThread?: MsPortalFx.ViewModels.Controls.Documents.Editor.ExtensionCommand<EditorThreadPosition, any>;
        /**
         * Save thread delegate.
         */
        saveThread?: (content: string, thread: EditorThread, containerName?: string) => MsPortalFx.Base.PromiseV<DiscussionThread.DiscussionThreadSaveResult>;
        /**
         * Save comment delegate.
         */
        saveComment?: (content: string, comment: DiscussionThread.DiscussionComment) => MsPortalFx.Base.PromiseV<DiscussionThread.DiscussionCommentSaveResult>;
        /**
         * Delete comment delegate.
         */
        deleteComment?: (threadId: number, commentId: number) => MsPortalFx.Base.Promise;
        /**
         * Name of the container of this discussion thread.
         */
        containerName?: string;
    }
    interface DiscussionOptions extends BaseDiscussionOptions<EditorThread> {
    }
    /**
     * A helper class that eases command handling for discussion thread operations
     * like add thread, add comment, save comment, delete comment.
     */
    class DiscussionCommandHandler implements MsPortalFx.Base.Disposable {
        /**
         * Discussion thread options.
         */
        options: DiscussionOptions;
        /**
         * Subscription to check newly added threads.
         */
        private _threadSubscriptions;
        /**
         * Creates a DiscussionCommandHandler instance.
         *
         * @param Discussion thread options.
         */
        constructor(options: DiscussionOptions);
        /**
         * Cleans up subscriptions.
         */
        dispose(): void;
        private _attachAddThreadHandler();
        private _addThreadHandlers(thread);
        private _attachSaveThreadHandler(thread);
        private _attachAddCommentHandler(thread);
        private _attachDeleteCommentHandler(thread);
        private _attachSaveCommentHandler(comment);
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.Editor {
    /**
     * Type of editor content.
     * Used to enable language specific editor features like colorization.
     */
    enum ContentType {
        /**
         * Text.
         * 'text/plain'
         */
        Text = 0,
        /**
         * Custom Content Type.
         */
        Custom = 1,
        /**
         * Batch Script.
         * 'text/x-bat'
         */
        Bat = 2,
        /**
         * Coffee Script.
         * 'text/x-coffeescript', 'text/coffeescript'
         */
        CoffeeScript = 3,
        /**
         * C++.
         * 'text/x-cpp'
         */
        Cpp = 4,
        /**
         * C#.
         * 'text/x-csharp'
         */
        CSharp = 5,
        /**
         * C# WebPages.
         * 'text/x-cshtml'
         */
        CSHtml = 6,
        /**
         * Cascading Style Sheet.
         * 'text/css'
         */
        Css = 7,
        /**
         * F#.
         * 'text/x-fsharp'
         */
        FSharp = 8,
        /**
         * Handlebars template.
         * 'text/x-handlebars-template'
         */
        Handlebars = 9,
        /**
         * Html.
         * 'text/html'
         */
        Html = 10,
        /**
         * Initialization file.
         * 'text/x-ini'
         */
        Ini = 11,
        /**
         * Jade.
         * 'text/x-jade'
         */
        Jade = 12,
        /**
         * Java.
         * 'text/x-java-source'
         */
        Java = 13,
        /**
         * Java Script.
         * 'text/javascript'
         */
        JavaScript = 14,
        /**
         * JSHtm.
         * 'text/x-jshtm'
         */
        JSHtm = 15,
        /**
         * JSON.
         * 'application/json'
         */
        Json = 16,
        /**
         * Less.
         * 'text/x-less', 'text/less'
         */
        Less = 17,
        /**
         * Lua.
         * 'text/x-lua'
         */
        Lua = 18,
        /**
         * Mark Down.
         * 'text/x-web-markdown'
         */
        MarkDown = 19,
        /**
         * PHP.
         * 'application/x-php'
         */
        Php = 20,
        /**
         * Power Shell.
         * 'text/x-powershell'
         */
        PowerShell = 21,
        /**
         * Python.
         * 'text/x-python', 'text/python'
         */
        Python = 22,
        /**
         * Ruby.
         * 'text/x-ruby', 'text/ruby'
         */
        Ruby = 23,
        /**
         * Type Script.
         * 'text/typescript'
         */
        TypeScript = 24,
        /**
         * Visual Basic.
         * 'text/x-vb'
         */
        VisualBasic = 25,
        /**
         * Xaml.
         * 'application/xaml+xml'
         */
        Xaml = 26,
        /**
         * Xml.
         * 'text/xml', 'application/xml'
         */
        Xml = 27,
    }
    /**
     * Editor options.
     */
    interface Options {
        /**
         * Indicates if edits are allowed.
         */
        readOnly?: boolean;
        /**
         * Indicates if line numbers are displayed.
         */
        lineNumbers?: boolean;
        /**
         * Controls the size of tabs in the document.
         */
        tabSize?: number;
        /**
         * Indicates if spaces are inserted instead of tabs.
         */
        insertSpaces?: boolean;
        /**
         * Indicates if the editor allows Tab and Shift+Tab to change focus.
         */
        tabFocusMode?: boolean;
        /**
         * Indicates if the wrapping column of the editor.
         *     -1  no wrapping
         *      0  wraps to the current viewport width
         *      n  wraps at fixed column
         */
        wrappingColumn?: number;
    }
    /**
     * Definition of a custom content type.
     * See http://monacotools/Content/monarch/monarch-documentation.html.
     */
    interface CustomContentType {
        /**
         * Ignore case when compiling regular expressions defined in 'tokenizer'.
         */
        ignoreCase: boolean;
        /**
         * Monarch tokenization rules.
         */
        tokenizer: {
            [stateName: string]: any[];
        };
    }
    /**
     * Editor view model contract.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * The type of the file.
         */
        contentType: KnockoutObservable<ContentType>;
        /**
         * Definition for a custom content type.
         * This definition is used only if 'contentType' is set to 'ContentType.Custom'.
         */
        customContentType: KnockoutObservable<CustomContentType>;
        /**
         * The content of the file.
         */
        content: KnockoutObservable<string>;
        /**
         * The currently selected content of the file.
         */
        selectedContent: KnockoutObservable<string>;
        /**
         * The currently selected Range in the file.
         */
        selectedRange: KnockoutObservable<EditorRange>;
        /**
         *  Current position of the cursor in the file.
         */
        position: KnockoutObservable<EditorPosition>;
        /**
         * The editor options.
         */
        options: KnockoutObservable<Options>;
        /**
         * Indicates if the contents have been modified but not yet saved.
         */
        dirty: KnockoutObservable<boolean>;
        /**
         * Saves the editor content.
         */
        save: MsPortalFx.ViewModels.Controls.Command.Contract;
        /**
         * Indicates which editor extensions to use.
         */
        extensions?: Extensions;
        /**
         * Indicates options for the specified extensions.
         */
        extensionOptions?: ExtensionOptions;
    }
    /**
     *  A position in the text editor.  Same properties as a Monaco IPosition interface
     */
    interface EditorPosition {
        /**
         * line number (starts at 1)
         */
        lineNumber: number;
        /**
         * column (the first character in a line is between column 1 and column 2)
         */
        column: number;
    }
    /**
     *  A Range of text in the text editor.  Same properties as a Monaco IRange interface
     */
    interface EditorRange {
        /**
         * Line number on which the range starts (starts at 1).
         */
        startLineNumber: number;
        /**
         * Column on which the range starts in line `startLineNumber` (starts at 1).
         */
        startColumn: number;
        /**
         * Line number on which the range ends.
         */
        endLineNumber: number;
        /**
         * Column on which the range ends in line `endLineNumber`.
         */
        endColumn: number;
    }
    /**
     * Editor view model implementation.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * The contents of the document.
         */
        content: KnockoutObservable<string>;
        /**
         * Selected content of the document.  Will be empty if nothing is selected.
         */
        selectedContent: KnockoutObservable<string>;
        /**
         *  Range of selected text in the editor
         */
        selectedRange: KnockoutObservable<EditorRange>;
        /**
         *  Position of the cursor in the editor
         */
        position: KnockoutObservable<EditorPosition>;
        /**
         * The type of the document.
         */
        contentType: KnockoutObservable<ContentType>;
        /**
         * Definition for a custom content type.
         */
        customContentType: KnockoutObservable<CustomContentType>;
        /**
         * The editor options.
         */
        options: KnockoutObservable<MsPortalFx.ViewModels.Controls.Documents.Editor.Options>;
        /**
         * Indicates if the content has been modified and has not been saved.
         */
        dirty: KnockoutObservable<boolean>;
        /**
         * Saves the content of the file.
         */
        save: MsPortalFx.ViewModels.Controls.Command.Contract;
        /**
         * Indicates which editor extensions to use.
         */
        extensions: Extensions;
        /**
         * Indicates options for the specified extensions.
         */
        extensionOptions: ExtensionOptions;
        /**
         * Creates an editor view model.
         *
         * @param contentType The type of document.
         * @param content The contents of the document.
         * @param options The editor options.
         * @param customContentType The editor options.
         * @param extensions List of extensions to use.
         * @param extensionOptions Options for the specified extensions.
         */
        constructor(contentType: ContentType, content: string, options?: MsPortalFx.ViewModels.Controls.Documents.Editor.Options, customContentType?: CustomContentType, extensions?: Editor.Extensions, extensionOptions?: Editor.ExtensionOptions);
        private _setupExtensions();
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.DiffEditor {
    /**
     * DiffEditor options.
     */
    interface Options extends MsPortalFx.ViewModels.Controls.Documents.Editor.Options {
        /**
         * Enables splitter between the content panes
         */
        enableSplitViewResizing?: boolean;
        /**
         * Render the differences in two side-by-side editors.
         * Defaults to true.
         */
        renderSideBySide?: boolean;
    }
    /**
     * DiffEditor view model contract.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.Documents.Editor.Contract {
        /**
         * The original document contents.
         */
        originalContent: KnockoutObservable<string>;
        /**
         * The diff editor options.
         */
        options: KnockoutObservable<Options>;
    }
    /**
     * DiffEditor view model implementation.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.Documents.Editor.ViewModel implements Contract {
        /**
         * The original contents of the document.
         */
        originalContent: KnockoutObservable<string>;
        /**
         * The diff editor options.
         */
        options: KnockoutObservable<Options>;
        /**
         * Creates a diff editor view model.
         *
         * @param contentType The document content type.
         * @param originalContent The original contents of the document.
         * @param content The modified contents of the document.
         * @param options The diff editor options.
         * @param extensions List of extensions to use.
         * @param extensionOptions Options for the specified extensions.
         */
        constructor(contentType: Editor.ContentType, originalContent: string, content: string, options?: Options, extensions?: Editor.Extensions, extensionOptions?: Editor.ExtensionOptions);
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.DiffView {
    /**
     * Change type of a diff block.
     */
    enum DiffBlockChangeType {
        /**
         * No change.
         */
        None = 0,
        /**
         * Block added.
         */
        Add = 1,
        /**
         * Block deleted.
         */
        Delete = 2,
        /**
         * Block edited.
         */
        Edit = 3,
    }
    /**
     * Interface representing a diff block.
     */
    interface DiffBlock {
        /**
         * Change type of the block.
         */
        changeType: DiffBlockChangeType;
        /**
         * Modified side line number start.
         */
        modifiedLineNumber: number;
        /**
         * Modified side lines existing in this block.
         */
        modifiedLines: string[];
        /**
         * Original side line number start.
         */
        originalLineNumber: number;
        /**
         * Original side lines existing in this block.
         */
        originalLines: string[];
        /**
         * Indicates whether lines before this block exist or not.
         */
        truncatedAfter?: boolean;
        /**
         * Indicates whether lines after this block exist or not.
         */
        truncatedBefore?: boolean;
    }
    /**
     * Discussion options for the DiffView.
     */
    interface DiscussionOptions extends MsPortalFx.ViewModels.Controls.Documents.Editor.DiscussionOptions {
        /**
         * Indicates whether discussions are enabled or not.
         */
        enabled: KnockoutObservable<boolean>;
        /**
         * Add thread icon. It can be data/img or URL.
         */
        addIcon: KnockoutObservable<string>;
        /**
         * Indicates whether add thread icon will be on the left side or not.
         */
        addIconOnLeft: KnockoutObservable<boolean>;
    }
    /**
     * DiffView view model contract.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Diff blocks to be displayed in the DiffView.
         */
        blocks: KnockoutObservableArray<DiffBlock>;
        /**
         * Discussion options for the DiffView.
         */
        discussionOptions?: DiscussionOptions;
    }
    /**
     * DiffView view model implementation.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * Diff blocks to be displayed in the DiffView.
         */
        blocks: KnockoutObservableArray<DiffBlock>;
        /**
         * Discussion options for the DiffView.
         */
        discussionOptions: DiscussionOptions;
        /**
         * Creates a DiffView view model.
         *
         * @param blocks Blocks to be displayed in the DiffView.
         * @param discussionOptions Discussion options for the DiffView.
         */
        constructor(blocks: DiffBlock[], discussionOptions?: DiscussionOptions);
        static getDefaultDiscussionOptions(): DiscussionOptions;
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.DiffList {
    import DiffView = MsPortalFx.ViewModels.Controls.Documents.DiffView;
    import Editor = MsPortalFx.ViewModels.Controls.Documents.Editor;
    /**
     * Group by type for the item list.
     */
    enum DiffListGroupBy {
        /**
         * Items are grouped by name.
         */
        Name = 0,
        /**
         * Items are grouped by path.
         */
        Path = 1,
        /**
         * Items are grouped by change type.
         */
        Type = 2,
    }
    /**
     * Result of a diff fetch operation.
     */
    interface DiffFetchResult {
        /**
         * Fetched diff blocks.
         */
        blocks: DiffView.DiffBlock[];
        /**
         * Discussion threads associated with the fetched diff blocks.
         */
        threads: Editor.EditorThread[];
        /**
         * Custom message to be displayed instead of DiffView.
         */
        message?: string;
    }
    /**
     * Item representing a file in the diff list.
     */
    interface DiffListItem {
        /**
         * Name of the file.
         */
        name: KnockoutObservable<string>;
        /**
         * Path of the file.
         */
        path: KnockoutObservable<string>;
        /**
         * Change type of the file.
         */
        type: KnockoutObservable<string>;
        /**
         * Command to fetch the diff info.
         */
        fetch?: Editor.ExtensionCommand<DiffListItem, DiffFetchResult>;
    }
    /**
     * DiffList view model contract.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Items to be displayed in the DiffList.
         */
        items: KnockoutObservableArray<DiffListItem>;
        /**
         * Indicates how to group the items.
         */
        groupBy: KnockoutObservable<DiffListGroupBy>;
        /**
         * Enables expanding/collapsing all items at once.
         */
        expandAll: KnockoutObservable<boolean>;
        /**
         * If the number of items exceeds this limit, all items are collapsed by default (Default 15).
         */
        expandLimit: KnockoutObservable<number>;
        /**
         * Discussion options for the DiffList.
         */
        discussionOptions?: DiffView.DiscussionOptions;
        /**
         * Delegate executed when a fetch for item is required.
         */
        fetchDiff?: (name: string, path: string) => MsPortalFx.Base.PromiseV<DiffFetchResult>;
        filterPath: KnockoutObservable<string>;
        /**
         * List of view models for diffs.
         */
        diffViewModels: KnockoutObservableArray<DiffView.ViewModel>;
        /**
         * Command for item click.
         */
        click?: Editor.ExtensionCommand<DiffListItem, void>;
        /**
         * Delegate executed when an item is clicked.
         */
        itemClick?: (name: string, path: string) => void;
    }
    /**
     * DiffList view model implementation.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * Items to be displayed in the DiffList.
         */
        items: KnockoutObservableArray<DiffListItem>;
        /**
         * Indicates how to group the items.
         */
        groupBy: KnockoutObservable<DiffListGroupBy>;
        /**
         * Enables expanding/collapsing all items at once.
         */
        expandAll: KnockoutObservable<boolean>;
        /**
         * If the number of items exceeds this limit, all items are collapsed by default (Default 15).
         */
        expandLimit: KnockoutObservable<number>;
        /**
         * Discussion options for the DiffList.
         */
        discussionOptions: DiffView.DiscussionOptions;
        /**
         * Delegate executed when a fetch for item is required.
         */
        fetchDiff: (name: string, path: string) => MsPortalFx.Base.PromiseV<DiffFetchResult>;
        filterPath: KnockoutObservable<string>;
        /**
         * List of view models for diffs.
         */
        diffViewModels: KnockoutObservableArray<DiffView.ViewModel>;
        /**
         * Command for item click.
         */
        click: Editor.ExtensionCommand<DiffListItem, void>;
        /**
         * Delegate executed when an item is clicked.
         */
        itemClick: (name: string, path: string) => void;
        /**
         * Creates a DiffList view model.
         *
         * @param items Items to be displayed in the DiffList.
         * @param fetchDiff Delegate executed when a fetch for item is required.
         * @param groupBy Indicates how to group the items.
         * @param expandLimit If the number of items exceeds this limit, all items are collapsed by default (Default 15).
         * @discussionOptions Discussion options for the DiffList.
         */
        constructor(items: DiffListItem[], fetchDiff?: (name: string, path: string) => MsPortalFx.Base.PromiseV<DiffFetchResult>, groupBy?: DiffListGroupBy, expandLimit?: number, discussionOptions?: DiffView.DiscussionOptions);
        private _ensureFetchCommand();
        private _ensureItemClickCommand();
        private _createDiffViewModel(containerName, blocks, threads?);
    }
}
declare module MsPortalFx.ViewModels.Controls.Documents.DiscussionTimeline {
    import Documents = MsPortalFx.ViewModels.Controls.Documents;
    /**
     * Thread used in the DiscussionTimeline.
     */
    interface TimelineThread extends Documents.Editor.EditorThread {
        /**
         * Name of the item to be displayed in the control.
         */
        itemName: KnockoutObservable<string>;
        /**
         * Full path of the item.
         */
        itemPath: KnockoutObservable<string>;
        /**
         * Indicates whether this thread is contains a single system message or not.
         */
        isSystemMessage: KnockoutObservable<boolean>;
    }
    /**
     * Thread view model used in the DiscussionTimeline.
     */
    class TimelineThreadViewModel extends Documents.Editor.EditorThreadViewModel implements TimelineThread {
        /**
         * Name of the item to be displayed in the control.
         */
        itemName: KnockoutObservable<string>;
        /**
         * Full path of the item.
         */
        itemPath: KnockoutObservable<string>;
        /**
         * Indicates whether this thread is contains a single system message or not.
         */
        isSystemMessage: KnockoutObservable<boolean>;
        /**
         * Creates an editor thread class.
         *
         * @param id Id of the thread.
         * @param comment Comments of the thread.
         * @param position Position of the thread.
         * @param itemName Name of the item to be displayed in the control.
         * @param itemPath Full path of the item.
         * @param isSystemMessage Indicates whether this thread is contains a single system message or not.
         */
        constructor(id?: number, comments?: Documents.DiscussionThread.DiscussionComment[], position?: Documents.Editor.EditorThreadPosition, itemName?: string, itemPath?: string, isSystemMessage?: boolean);
    }
    /**
     * Options for DiscussionTimeline.
     */
    interface DiscussionOptions extends Documents.Editor.BaseDiscussionOptions<TimelineThread> {
    }
    /**
     * DiscussionTimeline view model contract.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Discussion options for the DiscussionTimeline.
         */
        discussionOptions: DiscussionOptions;
        /**
         * Indicates whether to sort thread chronological or reverse chronological.
         */
        sortChronologically: KnockoutObservable<boolean>;
        /**
         * Indicates whether to display sistem messages or not.
         */
        showSystemMessages: KnockoutObservable<boolean>;
        /**
         * Format of the group text.
         */
        groupFormat: KnockoutObservable<string>;
        /**
         * Command for item click.
         */
        click?: Documents.Editor.ExtensionCommand<TimelineThread, void>;
        /**
         * Delegate executed when an item is clicked.
         */
        itemClick?: (itemPath: string, position: Documents.Editor.EditorThreadPosition) => void;
    }
    /**
     * DiscussionTimeline view model implementation.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * Discussion options for the DiscussionTimeline.
         */
        discussionOptions: DiscussionOptions;
        /**
         * Indicates whether to sort thread chronological or reverse chronological.
         */
        sortChronologically: KnockoutObservable<boolean>;
        /**
         * Indicates whether to display sistem messages or not.
         */
        showSystemMessages: KnockoutObservable<boolean>;
        /**
         * Format of the group text.
         */
        groupFormat: KnockoutObservable<string>;
        /**
         * Command for item click.
         */
        click: Documents.Editor.ExtensionCommand<TimelineThread, void>;
        /**
         * Delegate executed when an item is clicked.
         */
        itemClick: (itemPath: string, position: Documents.Editor.EditorThreadPosition) => void;
        /**
         * Creates a DiscussionTimeline view model.
         *
         * @param discussionOptions Discussion options for the DiscussionTimeline.
         * @param sortChronologically Indicates whether to sort thread chronological or reverse chronological.
         * @param showSystemMessages Indicates whether to display sistem messages or not.
         * @param groupFormat Format of the group text.
         */
        constructor(discussionOptions: DiscussionOptions, sortChronologically?: boolean, showSystemMessages?: boolean, groupFormat?: string);
        /**
         * Adds a new empty discussion thread. Ensures only single unsaved thread exists.
         */
        addNewThread(): void;
        private _ensureItemClickCommand();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.Button {
    /**
     * Mouse states.
     */
    enum MouseState {
        /**
         * Default state.
         */
        Initial = 0,
        /**
         * Hover state.
         */
        Hover = 1,
        /**
         * Pressed state.
         */
        Active = 2,
    }
    /**
     * Normal and pressed Uri options.
     */
    interface UriOptions {
        /**
         * An object with enabled and disabled properties set to MouseStateImageUris objects.
         */
        normal?: EnabledDisabledUris;
        /**
         * An object with enabled and disabled properties set to MouseStateImageUris objects.
         */
        pressed?: EnabledDisabledUris;
    }
    /**
     * Enabled and disabled Urls.
     */
    interface EnabledDisabledUris {
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        enabled?: MouseStateImageUris;
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        disabled?: MouseStateImageUris;
    }
    /**
     * Images for mouse states.
     */
    interface MouseStateImageUris {
        /**
         * Default state.
         */
        initial?: string;
        /**
         * Hover state.
         */
        hover?: string;
        /**
         * Pressed state.
         */
        active?: string;
    }
    /**
     * Normal and pressed state text options.
     */
    interface TextOptions {
        /**
         * An object with enabled and disabled properties set to EnabledDisabledText objects.
         */
        normal?: EnabledDisabledText;
        /**
         * An object with enabled and disabled properties set to EnabledDisabledText objects.
         */
        pressed?: EnabledDisabledText;
    }
    /**
     * Enabled and disabled text.
     */
    interface EnabledDisabledText {
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        enabled?: MouseStateTexts;
        /**
         * An object with initial, hover, and active mouse-state properties set to image strings.
         */
        disabled?: MouseStateTexts;
    }
    /**
     * Text for mouse states.
     */
    interface MouseStateTexts {
        /**
         * Default state.
         */
        initial?: string;
        /**
         * Hover state.
         */
        hover?: string;
        /**
         * Pressed state.
         */
        active?: string;
    }
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Indicates if the button acts as a submit button. If true, when clicked, the button will trigger a submit event.
         */
        submit: boolean;
        /**
         * jQuery selector indicating what tag changes it's image source.
         */
        selector: KnockoutObservable<string>;
        /**
         * Callback function when the button is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Image URIs used in this widget.
         */
        uri: KnockoutObservable<UriOptions>;
        /**
         * Text used in this widget.
         * Same values as the uri option.
         */
        text: KnockoutObservable<TextOptions>;
        /**
         * Shows or hides the button.
         */
        visible: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the button is displayed as the default.
         */
        isDefault: KnockoutObservableBase<boolean>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * Indicates if the button acts as a submit button. If true, when clicked, the button will trigger a submit event.
         */
        submit: boolean;
        /**
         * jQuery selector indicating what tag changes it's image source.
         */
        selector: KnockoutObservable<string>;
        /**
         * Callback function when the button is clicked.
         */
        click: JQueryEventHandler;
        /**
         * Image URLs used in this widget.
         */
        uri: KnockoutObservable<UriOptions>;
        /**
         * Text used in this widget.
         * Same values as the uri option.
         */
        text: KnockoutObservable<TextOptions>;
        /**
         * Shows or hides the button.
         */
        visible: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the button is displayed as the default.
         */
        isDefault: KnockoutObservableBase<boolean>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.CheckBox {
    /**
     * CheckBox state.
     */
    enum Value {
        /**
         * CheckBox state representing unchecked state.
         */
        Unchecked = 0,
        /**
         * CheckBox state representing checked state.
         */
        Checked = 1,
        /**
         * CheckBox state representing indeterminate state.
         */
        Indeterminate = 2,
    }
    /**
     * The view model interface for CheckBox portal control.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<Value> {
        /**
         * Enable tri-state CheckBox.
         * If you don't provide a value, the default is the standard dual state CheckBox.
         */
        isTriState: boolean;
        /**
         * Id attribute of the CheckBox.
         * If you don't provide an id, we will not add the attribute.
         */
        inputId?: string;
        /**
         * Value attribute of the CheckBox when in checked state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "checked".
         */
        inputCheckedValue?: KnockoutObservable<string>;
        /**
         * Value attribute of the CheckBox when in indeterminate state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "indeterminate".
         * This value will be used only for tri state CheckBox.
         */
        inputIndeterminateValue?: KnockoutObservable<string>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<Value> implements Contract {
        /**
         * Enable tri-state CheckBox.
         * If you don't provide a value, the default is the standard dual state CheckBox.
         */
        isTriState: boolean;
        /**
         * Id attribute of the CheckBox.
         * If you don't provide an id, we will not add the attribute.
         */
        inputId: string;
        /**
         * Value attribute of the CheckBox when in checked state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "checked".
         */
        inputCheckedValue: KnockoutObservable<string>;
        /**
         * Value attribute of the CheckBox when in indeterminate state.
         * This value will be sent to the server when form is submitted.
         * If you don't provide a value, the default value is "indeterminate".
         * This value will be used only for tri state CheckBox.
         */
        inputIndeterminateValue: KnockoutObservable<string>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.TextBox {
    /**
     * Enum to indicate when to trigger value updates.
     */
    enum ValueUpdateTrigger {
        /**
         * Trigger value updates after change event. This will typically happen after blur where the entire value will be updated.
         */
        Default = 0,
        /**
         * Trigger value updates as soon as user types a character.
         */
        AfterKeyDown = 1,
        /**
         * Trigger value updates as soon as user types a character (including repeated keys).
         */
        KeyPress = 2,
        /**
         * Trigger value update on blur.
         */
        Blur = 3,
        /**
         * Trigger value update on input Event (IE 9+) .
         */
        Input = 4,
    }
    /**
     * The view model interface for TextBox portal control.
     */
    interface Contract extends TypableControl.Contract<string> {
        /**
         * Placeholder text attribute of the TextBox.
         * If you don't provide placeholder text, the text box will not have placeholder.
         */
        placeholder?: KnockoutObservable<string>;
        /**
         * Events supported by the TextBox control.
         */
        events: Events;
    }
    /**
     * Event callback for TextBox.
     */
    class Events {
        /**
         * Event is triggerred when user presses the enter key.
         */
        enterPressed: (value: string) => void;
    }
    /**
     * The view model interface for TextBox portal control.
     */
    class ViewModel extends TypableControl.ViewModel<string> implements Contract {
        /**
         * Placeholder text attribute of the TextBox.
         * If you don't provide placeholder text, the text box will not have placeholder.
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Events supported by the TextBox control.
         */
        events: Events;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.CopyableLabel {
    interface ButtonHint {
        /**
         * Button Hover text
         */
        hoverPopupText: string;
        /**
         *  Button clicked PopupText (shown for 3 seconds).
         */
        clickedPopupText: string;
    }
    interface Contract extends Loadable.Contract {
        /**
         * The value of the TextBox.
         */
        value: KnockoutObservableBase<string>;
        /**
         * ButtonHint for Clipboard supported browser. For example, IE.
         */
        ClipboardSupportedHint: ButtonHint;
        /**
         * ButtonHint for Non-Clipboard supported browser. That is, non-IE broswer.
         */
        NonClipboardSupportedHint: ButtonHint;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * The value of the TextBox.
         */
        value: KnockoutObservable<string>;
        /**
         * ButtonHint for Clipboard supported browser. For example, IE.
         */
        ClipboardSupportedHint: ButtonHint;
        /**
         * ButtonHint for Non-Clipboard supported browser. That is, non-IE broswer.
         */
        NonClipboardSupportedHint: ButtonHint;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.EditableCombo {
    enum PositioningAlignment {
        /**
         * Left edge for horizontal alignment, top edge for vertical alignment.
         */
        LeftTop = 3,
        /**
         * Right edge for horizontal alignment, top edge for vertical alignment.
         */
        RightTop = 5,
        /**
         * Left edge for horizontal alignment, bottom edge for vertical alignment.
         */
        LeftBottom = 10,
        /**
         * Right edge for horizontal alignment, bottom edge for vertical alignment.
         */
        RightBottom = 12,
    }
    enum DropDownPositioning {
        /**
         * DropDown expand to bottom align on the the right edge.
         */
        BottomRight = 0,
        /**
         * DropDown expand to top align on the the right edge.
         */
        TopRight = 1,
        /**
         * DropDown expand to bottom align on the the left edge.
         */
        BottomLeft = 2,
        /**
         * DropDown expand to top align on the the left edge.
         */
        TopLeft = 3,
    }
    enum DropDownWidth {
        /**
         * Width is determined by the content.
         */
        Default = 0,
        /**
         * Width is same as widget width.
         */
        Full = 1,
        /**
         * Content width if content width is larger than widget width. Otherwise widget width is used.
         */
        MinWidgetMaxContent = 2,
    }
    interface Contract<TValue> extends ValidatableControl.Contract<TValue> {
        /**
         * Alignment used for drop popup.
         */
        popupAlignment: PositioningAlignment;
        /**
         * Alignment used for input.
         */
        inputAlignment: PositioningAlignment;
        /**
         * Position of drop down based on widget.
         */
        dropDownPositioning: KnockoutObservable<DropDownPositioning>;
        /**
         * Width behavior of the drop down.
         */
        dropDownWidth: KnockoutObservable<DropDownWidth>;
    }
    class ViewModel<TValue> extends ValidatableControl.ViewModel<TValue> implements Contract<TValue> {
        /**
         * See interface.
         */
        popupAlignment: PositioningAlignment;
        /**
         * See interface.
         */
        inputAlignment: PositioningAlignment;
        /**
         * See interface.
         */
        dropDownPositioning: KnockoutObservable<DropDownPositioning>;
        /**
         * See interface.
         */
        dropDownWidth: KnockoutObservable<DropDownWidth>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.DateTimeCombo {
    interface Contract extends MsPortalFx.ViewModels.Controls.Forms.EditableCombo.Contract<Date> {
        /**
         * A valid format string specifier (see date.format polyfill), used to format the value.
         */
        formatString: KnockoutObservable<string>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Forms.EditableCombo.ViewModel<Date> implements Contract {
        /**
         * See interface.
         */
        formatString: KnockoutObservable<string>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.DropDown {
    interface Contract extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<string> {
        /**
         * Items for populate the select/options.
         */
        items: KnockoutObservableArray<any>;
        /**
         *  Property used for display item. If it is not set, it uses items[index] to display.
         */
        itemText?: string;
        /**
         *  Property used for display item. If it is not set, it uses items[index] to display.
         */
        itemValue?: string;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<string> implements Contract {
        /**
         * Items for populate the select/options.
         */
        items: KnockoutObservableArray<any>;
        /**
         *  Property used for display item. If it is not set, it uses items[index] to display.
         */
        itemText: string;
        /**
         *  Property used for display item. If it is not set, it uses items[index] to display.
         */
        itemValue: string;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.FileUpload {
    enum UploadStatus {
        /**
         * Invalid.
         */
        Invalid = 0,
        /**
         * Pending.
         */
        Pending = 1,
        /**
         * Uploading.
         */
        Uploading = 2,
        /**
         * Paused.
         */
        Paused = 3,
        /**
         * Complete.
         */
        Complete = 4,
    }
    interface UploadTask {
        /**
         * Whether the file associated with the upload task is valid or not.
         */
        valid: boolean;
        /**
         * The current status of the upload task.
         */
        status: UploadStatus;
        /**
         * The percent complete of the upload task.
         */
        progressPercent: number;
        /**
         * The content of the current file chunk as an ArrayBuffer.
         */
        chunk: FileChunk;
    }
    interface SelectedFile {
        /**
         * The name of the file.
         */
        name: string;
        /**
         * The mimetype of the file.
         */
        mimetype: string;
        /**
         * The size of the file, in bytes.
         */
        size: number;
        /**
         * Whether or not to continue uploading the file.
         */
        upload: KnockoutObservable<boolean>;
        /**
         * The byte to start from when reading.
         */
        uploadStartByte: number;
        /**
         * The object representing the upload for this file.
         */
        uploadTask: KnockoutObservableBase<UploadTask>;
    }
    interface FileChunk {
        /**
         * The content of the chunk.
         */
        content: any;
        /**
         * The startbyte of the chunk.
         */
        startByte: number;
        /**
         * The endbyte of the chunk.
         */
        endByte: number;
    }
    interface ResourceStrings {
        /**
         * Placeholder text used by the control when no files are selected.
         */
        placeholderText: string;
        /**
         * The message to display when a single file is selected.
         */
        singleFileSelectedMessage: string;
        /**
         * The message to display when multiple files are selected.
         * The token {0} will be replaced by the number of files when rendered.
         */
        multipleFilesSelectedMessage: string;
    }
    /**
     * The view model interface for FileUpload portal control.
     */
    interface Contract extends ValidatableControl.Contract<string> {
        /**
         * A comma-separated list of allowed file mime-types, excluding extensions.
         * This maps directly to the HTML accept attribute for file input controls.
         */
        accept?: string;
        /**
         * The maximum number of files allowed to be uploaded at once.
         * This limit is applied post-selection.
         */
        maxFiles?: number;
        /**
         * The limit of the file size in bytes.
         * Default is 200MB.
         */
        sizeLimit?: number;
        /**
         * Show progress bars demonstrating the progress of the file upload.
         * Default is true.
         */
        showProgressBars: KnockoutObservableBase<boolean>;
        /**
         * The currently-selected files (as limited by maxFiles).
         */
        files?: KnockoutObservableBase<SelectedFile[]>;
    }
    /**
     * The view model interface for FileUpload portal control.
     */
    class ViewModel extends ValidatableControl.ViewModel<string> implements Contract {
        /**
         * A comma-separated list of allowed file mime-types; extension is not included.
         * This maps directly to the HTML accept attribute for file input controls.
         */
        accept: string;
        /**
         * The maximum number of files allowed to be uploaded at once.
         * This limit is applied post-selection.
         */
        maxFiles: number;
        /**
         * The limit of the file size in bytes.
         * Default is 200MB.
         */
        sizeLimit: number;
        /**
         * Show progress bars demonstrating the progress of the file upload.
         * Default is true.
         */
        showProgressBars: KnockoutObservableBase<boolean>;
        /**
         * The currently-selected files (as limited by maxFiles).
         */
        files: KnockoutObservableBase<SelectedFile[]>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.GroupDropDown {
    /**
     * Item represents a row.
     */
    interface ItemData {
    }
    /**
    * Interface representing the label for an Value
    */
    interface Label {
        /**
         * Text for list item.
         */
        text: KnockoutObservable<string>;
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservable<boolean>;
    }
    /**
     * Interface representing the properties for an item in item list.
     */
    interface Value<T> extends Label {
        /**
         * Value bound for list item when li is selected.
         */
        value: KnockoutObservable<T>;
        /**
         * Item is selected.
         */
        selected: KnockoutObservable<boolean>;
    }
    /**
     * GroupInfo is the ViewModel for a particular <optGroup>
     */
    interface GroupInfo {
        /**
         * Id for mapping from Item GroupID column to this user friendly GroupInfo.
         */
        key: string;
        /**
         * User friendly label for the grouping. It can be either string or ko.obserable<string>.
         */
        text: any;
        /**
         * Disable state of this group. It can be either boolean or ko.obserable<boolean>.
         */
        disable: any;
    }
    /**
     * ItemSetting is the fields setting to inform the ViewModel given setting how to build up dropdown items.
     */
    interface ItemSetting {
        /**
         * Property used for display item. If it is not set, it uses items[index] to display.
         */
        textKey?: string;
        /**
         * Property used for Value of an item. If it is not set, it uses items[index] as Value.
         */
        valueKey?: string;
        /**
         * Property used for disable state of an item. If it is not set, default to false.
         */
        disableKey?: string;
        /**
         * Property used for select state of an item. If it is not set, default to false.
         */
        selectedKey?: string;
        /**
         * Property used for grouping of an item. If it is not set, there is no grouping for the items.
         */
        groupIdKey?: string;
    }
    interface Contract extends ValidatableControl.Contract<string> {
        /**
         * Group definitions.
         */
        groupInfos?: GroupInfo[];
        /**
         * Items displayed in the table based on the column definitions when selection is disabled.
         */
        itemsDataArray: ItemData[];
        /**
         * Setting for converting itemsDataArray to items.
         */
        itemSetting?: ItemSetting;
        /**
         * Indicate the items should be initialized.
         */
        areItemsInitialized: KnockoutObservableBase<boolean>;
        /**
         * Items for populate the select/options. This is populated by the prior setting if areItemsInitialized() is false.
         */
        items: KnockoutObservableArray<Label>;
    }
    class ViewModel extends ValidatableControl.ViewModel<string> implements Contract {
        /**
         * See Contract interface.
         */
        groupInfos: GroupInfo[];
        /**
         * See Contract interface.
         */
        itemsDataArray: ItemData[];
        /**
         * See Contract interface.
         */
        itemSetting: ItemSetting;
        /**
         * Setting for Item:
         */
        areItemsInitialized: KnockoutObservableBase<boolean>;
        /**
         * See Contract interface.
         */
        items: KnockoutObservableArray<Label>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.FilterCombo {
    /**
     * Item represents a row in dropdown.
     */
    interface Item {
        /**
         * Optional children for storing hierarchical data.
         */
        children?: Item[];
    }
    interface Contract extends MsPortalFx.ViewModels.Controls.Forms.EditableCombo.Contract<string> {
        /**
         * Number of rows for the dropdown.
         */
        rowsCount: KnockoutObservable<number>;
        /**
         * Column definitions.
         */
        columns: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.FilterComboBox.Column>;
        /**
         * Specifies the default width of the single column for the hosted grid control.
         */
        defaultColumnWidth: KnockoutObservable<string>;
        /**
         * Key used to get the display value.
         */
        valueKey: KnockoutObservable<string>;
        /**
         * Items displayed in the list, can be a filtered list.
         */
        filteredItems: KnockoutObservableArray<Item>;
        /**
         * Filter text.
         */
        filterText: KnockoutObservable<string>;
        /**
         * No rows message when no rows are displayed.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * Indicates if filtering is in progress now.
         */
        filterInProgress: KnockoutObservable<boolean>;
        /**
         * Gets list of items
         */
        items: KnockoutObservable<Item[]>;
    }
    interface FilterOptions {
        /**
         * Delimiter used for flattening a hierarchical dataset.
         */
        delimiter?: string;
        /**
         * Filter type for search.
         */
        datasetType: MsPortalFx.ViewModels.Forms.FilterComboBox.DatasetType;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Forms.EditableCombo.ViewModel<string> implements Contract {
        /**
         * See interface.
         */
        rowsCount: KnockoutObservable<number>;
        /**
         * See interface.
         */
        columns: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.FilterComboBox.Column>;
        /**
         * See interface.
         */
        defaultColumnWidth: KnockoutObservable<string>;
        /**
         * See interface.
         */
        valueKey: KnockoutObservable<string>;
        /**
         * See interface.
         */
        filteredItems: KnockoutObservableArray<Item>;
        /**
         * Filter text.
         */
        filterText: KnockoutObservable<string>;
        /**
         * No rows message when no rows are displayed.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * Indicates if filtering is in progress now.
         */
        filterInProgress: KnockoutObservable<boolean>;
        private _items;
        constructor();
        items: KnockoutObservable<Item[]>;
    }
    /**
     * Search filter for searching a flat list of string items, to be used with FilterCombo.
     */
    class SearchFilter {
        _filterInProgress: boolean;
        _viewModel: ViewModel;
        _filterOptions: FilterOptions;
        _prefixTree: PrefixTree;
        _directMatchDictionary: StringMap<Item[]>;
        /**
         * Creates an instance of SearchFilter.
         *
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Filtering options.
         */
        constructor(viewModel: ViewModel, filterOptions: FilterOptions);
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): Item[];
        _setFilteredItems(filteredItems: Item[]): void;
        _addToSearchOnInitialize(item: Item, searchString: string): void;
        _addToPrefixTree(tree: PrefixTree, words: string[], value: string, delimiter?: string): void;
        _pushItem(dictionary: {
            [searchTerm: string]: Item[];
        }, currentValue: Item, searchTerm: string): void;
        private _sortItems(items);
        private _compareItems(item1, item2);
    }
    /**
     * Tree Search filter for searching a hierarchical list of string items, to be used with FilterCombo.
     * Tree is flattened using a delimiter that is passed in filter options. A Breadth-First-Search of
     * the hiearchical tree data is performed and each node is appended to path from root with delimiters
     * separating the node values.
     */
    class TreeSearchFilter extends SearchFilter {
        _defaultDelimiter: string;
        private _childPrefixTree;
        private _childMatchDictionary;
        /**
         * Creates an instance of TreeSearchFilter.
         *
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Filtering options.
         */
        constructor(viewModel: ViewModel, filterOptions: FilterOptions);
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): Item[];
        _setFilteredItems(items: Item[]): void;
        _addToSearchOnInitialize(item: Item, searchString: string): void;
        private _ensureNoDuplicates(filteredData);
        private _processMatch(matches, isResultProcessed);
        private _processMatches(matches, extendedMatches);
        private _itemArrayContains(itemArray, item, valueKey);
        private _flattenTree(data);
        private _addTreeNodeToPrefixTree(tree, originalValue, newValue);
        private _updateCurrentItem(currentItem, next, originalValue, newValue, valueKey, matchType);
    }
    /**
     * Search filter factory for providing a search filter based on the filter options provided
     */
    class FilterFactory {
        /**
         * Gets a search filter.
         *
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Filtering options.
         * @return The corresponding search filter.
         */
        getSearchFilter(viewModel: ViewModel, filterOptions: FilterOptions): SearchFilter;
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.MultiLineTextBox {
    /**
     * Enum to indicate when to trigger value updates.
     */
    enum ValueUpdateTrigger {
        /**
         * Trigger value updates after change event. This will typically happen after blur where the entire value will be updated.
         */
        Default = 0,
        /**
         * Trigger value updates as soon as user types a character.
         */
        AfterKeyDown = 1,
        /**
         * Trigger value updates as soon as user types a character (including repeated keys).
         */
        KeyPress = 2,
        /**
         * Trigger value update on blur.
         */
        Blur = 3,
        /**
         * Trigger value update on input Event (IE 9+) .
         */
        Input = 4,
    }
    /**
     * The view model interface for MultiLineTextBox portal control.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<string> {
        /**
         * Number of rows for the textbox.
         */
        rows: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Max text length.
         */
        maxLength: KnockoutObservable<number>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.TypableControl.ViewModel<string> implements Contract {
        /**
         * Number of rows for the textbox.
         */
        rows: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Max text length.
         */
        maxLength: KnockoutObservable<number>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Lists.Grid {
    enum Extensions {
        /**
         * Plugin to have sortable columns.
         */
        SortableColumn = 1,
        /**
         * Plugin to have selectable rows.
         */
        SelectableRow,
        /**
         * Plugin to have right-clickable row.
         */
        RightClickableRow,
        /**
         * Plugin to group rows by column value.
         */
        Groupable,
        /**
         * Plugin to have editable rows.
         */
        EditableRow,
        /**
         * Plugin to have filterable rows.
         */
        Filterable,
        /**
         * Plugin to have reorder rows.
         */
        ReorderRow,
        /**
         * Plugin to have a shortcut to the item context menu displayed in the row.
         */
        ContextMenuShortcut,
        /**
         * Plugin to handle and display large items in sequential pages.
         */
        Pageable,
        /**
         * Plugin to display hierarchical items.
         */
        Hierarchical,
        /**
         * Plugin to display items with virtual scrolling.
         */
        Scrollable,
        /**
        * Plugin to enable hover index communication with other parts.
        */
        Hoverable,
        /**
         * Plugin to have resizable columns.
         */
        ResizableColumn,
    }
    interface ExtensionsOptions<TItem, TSelection> {
    }
    interface RowMetadata<T> {
        /**
         * One entry representing the item.
         */
        item: T;
        /**
         * Css class associated with the row.
         */
        cssClass?: KnockoutObservable<string>;
    }
    enum Format {
        /**
         * HTML format, raw HTML is allowed.
         */
        Html = 1,
        /**
         * Text format, HTML gets encoded.
         * The value can also be simple text or a KnockoutObservable object.
         */
        Text = 2,
    }
    interface FormatOptions {
    }
    interface Column {
        /**
         * Name of the column displayed in the header.
         */
        name?: KnockoutObservable<string>;
        /**
         * String mapping to the item key.
         */
        itemKey: string;
        /**
         * Formatter used when displaying one cell.
         */
        format?: Format;
        /**
         * Formatter options associated with the formatters.
         */
        formatOptions?: FormatOptions;
        /**
         * Declare this column is activatable.  The control will automatic apply activatable style through this column.
         */
        activatable?: KnockoutObservableBase<boolean>;
        /**
         * Css class associated with the column.
         */
        cssClass?: string;
        /**
         * Width of the column in pixels or percentage.
         */
        width?: KnockoutObservable<string>;
        /**
         * Indicates if the column is sortable.
         */
        sortable?: boolean;
        /**
         * Sort order.
         */
        sortOrder?: KnockoutObservable<SortOrder>;
        /**
         * Format used when displaying one cell in edit mode.
         */
        editableFormat?: Format;
        /**
         * Format options associated with the editableFormat.
         */
        editableFormatOptions?: FormatOptions;
        /**
         * Format used when filtering a grid.
         */
        filterableFormat?: Format;
        /**
         * Format options associated with the filterableFormat.
         */
        filterableFormatOptions?: FormatOptions;
        /**
         * Indicate that the column should be displayed as a hierarchy with expand/collapse indicators.
         */
        hierarchical?: boolean;
        /**
         * Indicate this column text need to support ellipse
         */
        enableEllipse?: KnockoutObservableBase<boolean>;
        /**
         * Enable cell content to height 100%
         */
        fullHeight?: KnockoutObservableBase<boolean>;
    }
    /**
     * Grid reset callback.
     */
    interface GridResetCallback {
        (): MsPortalFx.Base.Promise;
    }
    interface ExtensionContract extends Loadable.Contract {
        /**
         * The bitmask of plugins to be loaded.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensions?: number;
    }
    interface ContractBase<TItem> {
        /**
         * Shows the column header.
         */
        showHeader?: boolean;
        /**
         * Column definitions.
         */
        columns: KnockoutObservableArray<Column>;
        /**
         * Items displayed in the table based on the column definitions when selection is disabled.
         * It is set in the constructor. Do not directly replace it.
         */
        items?: KnockoutObservableArray<TItem>;
    }
    interface Contract<TItem, TSelection> extends ContractBase<TItem>, ExtensionContract {
        /**
         * Summary of the table.
         */
        summary: KnockoutObservable<string>;
        /**
         * No rows message when no items are displayed.
         */
        noRowsMessage?: KnockoutObservable<string>;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionsOptions?: ExtensionsOptions<TItem, TSelection>;
        /**
         * Gets the row metadata for an item.
         *
         * @param item The grid item whose metadata is requested.
         * @return Row metadata associated to the item.
         */
        getRowMetadata(item: TItem): RowMetadata<TItem>;
        /**
         * Option to reset the view model state for rebind scenarios.
         * Extension authors can override this method if Grid's default reset action doesn't meet their requirements.
         * This method will be called when DataNavigator's resetNavigation method is called.
         * The reset() method will internally invoke the resetCallback set by the grid control.
         * For pageable extension, calling reset will set empty array to the items, invoke data navigator's resetLoadByContinuationToken method
         * and invoke loadByContinuationToken method to fetch new data.
         */
        reset(): MsPortalFx.Base.Promise;
        /**
         * The resetCallback will be populated internally by the Grid control.
         */
        resetCallback: KnockoutObservableBase<GridResetCallback>;
    }
    interface TextAndSvg {
        /**
         * SVG icon.
         */
        svg: MsPortalFx.Base.Image;
        /**
         * Value representing the text.
         */
        text?: string;
        /**
         * Css value for height of svg icon.
         */
        height?: string;
        /**
         * Css value for width of svg icon.
         */
        width?: string;
    }
    enum Format {
        /**
         * Short time format, outputs something similar to 11:20 AM.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        ShortTime = 100,
        /**
         * Long time format, outputs something similar to 11:20:19 AM.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        LongTime = 101,
        /**
         * Short date format, outputs something similar to 7/18/2013.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        ShortDate = 102,
        /**
         * Long date format, outputs something similar to Thursday, July 18, 2013.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        LongDate = 103,
        /**
         * Month and day format, outputs something similar to July 18.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        MonthDay = 104,
        /**
         * Year and month format, outputs something similar to July, 2013.
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        YearMonth = 105,
        /**
         * Custom date format, outputs the format based on formatOptions.dateFormat
         * The value can be a number (milliseconds since 1970), text understood by new Date(text) or a Date.
         */
        CustomDate = 106,
        /**
         * URI format, outputs a clickable URI.
         * The value can be an URI, or this format: { uri: string; text: string; target?: string } .
         */
        Uri = 107,
        /**
         * Icon format, outputs an icon with optionally text beside it.
         * The value can be an icon URI, or this format: { uri: string; text?: string; } .
         */
        Icon = 108,
        /**
         * Icon Lookup format, outputs an icon based on a dictionary you provide in formatOptions.iconLookup.
         * The value is the key that matches the iconLookup dictionary.
         * The iconLookup dictionary can be { key: iconUri, ... } or { key: { uri: string, text?: string }, ... } .
         * Optionally, you can have a key called "##DEFAULT##" to display any value not mapped by your dictionary.
         */
        IconLookup = 109,
        /**
         * Text Lookup format, outputs text based on a dictionary you provide in formatOptions.textLookup.
         * The value is the key that matches the textLookup dictionary.
         * The textLookup dictionary is { key: text, ... } .
         */
        TextLookup = 110,
        /**
         * Icon format, outputs an icon with optionally text beside it.
         * The value can be an SVG, or this format: { svg: MsPortalFx.Base.Image; text?: string; } .
         */
        SvgIcon = 111,
        /**
         * Icon Lookup format, outputs an icon based on a dictionary you provide in formatOptions.iconLookup.
         * The value is the key that matches the iconLookup dictionary.
         * The iconLookup dictionary can be { key: MsPortalFx.Base.Image, ... } or { key: { svg: MsPortalFx.Base.Image, text?: string }, ... } .
         * Optionally, you can have a key called "##DEFAULT##" to display any value not mapped by your dictionary.
         */
        SvgIconLookup = 112,
    }
    interface FormatOptions {
        /**
         * Date format if using the CustomDate.
         * Accept any format from Standard and Custom Date and Time Format.
         * http://msdn.microsoft.com/en-us/library/az4se3k1.aspx
         */
        dateFormat?: string;
        /**
         * Dictionary with key matching the value of the itemKey.
         * The value can be either the iconUri or an object as such { uri: string, text?: string } .
         */
        iconLookup?: any;
        /**
         * Dictionary with key matching the value of the itemKey.
         * The value is the text mapped to the value.
         */
        textLookup?: any;
        /**
         * Dictionary with key matching the value of the itemKey.
         * The value can be either the MsPortalFx.Base.Image or an object as such { uri: MsPortalFx.Base.Image, text?: string } .
         */
        svgIconLookup?: any;
    }
    enum Format {
        /**
         * Html Bindings format, uses a template defined in formatOptions.htmlBindingsTemplate and apply the binding defined in formatOptions.htmlBindingsViewModel.
         * The value can be anything that the view model can understand. See the HtmlBindingsType for more details.
         */
        HtmlBindings = 1000,
    }
    interface FormatOptions {
        /**
         * HTML which applyBindings will be executed on.
         * To know which variables will be available, see the HtmlBindingsType.
         */
        htmlBindingsTemplate?: string;
        /**
         * ViewModel bound to the htmlBindingsTemplate.
         */
        htmlBindingsType?: HtmlBindingsType;
        /**
         * Data required by the specified htmlBindingType for rendering the HtmlBinding.
         */
        htmlBindingsData?: HtmlBindingsData;
    }
    enum HtmlBindingsType {
        /**
         * Will return an object containing the following:
         * { value: any, settings?: CellFormatterSettings }
         *
         * The value is the one from your itemKey, the settings vary depending on which plugin is loaded into the grid.
         */
        Default = 0,
        /**
         * Uses a CheckBox control for the cell.
         */
        CheckBox = 1,
        /**
         * Uses a TextBox control for the cell.
         */
        TextBox = 2,
        /**
         * Uses a MultiselectDropDown control for the cell.
         */
        MultiselectDropDown = 3,
        /**
         * CheckBox ViewModel which maps your data with the state of the row, selected/unselected for checked/unchecked.
         */
        CheckBoxRowSelection = 4,
        /**
         * Uses a DropDown control for the cell.
         */
        DropDown = 5,
    }
    /**
     * Data required by the specified htmlBindingType for rendering the HtmlBinding.
     */
    interface HtmlBindingsData {
        /**
         * The label for the form field.
         */
        label?: string;
        /**
         * A list of validations that should be applied to the form field.
         */
        validations?: MsPortalFx.ViewModels.FormValidation[];
        /**
         * When changed forces validation on this column of the grid for all rows that are in editing mode.
         */
        validate?: KnockoutObservable<number>;
        /**
         * Specifies text that will be displayed in an info balloon next to the field's label.
         */
        infoBalloonContent?: string;
    }
    interface FocusableRowMetadata<T> extends RowMetadata<T> {
        /**
         * Indicates if the row is disabled.
         */
        disabled?: KnockoutObservable<boolean>;
    }
    enum RowSelectionMode {
        /**
         * Indicates that the user cannot select or unselect rows by clicking.
         */
        Off = 0,
        /**
         * Indicates that the user can select one row at at time by clicking.
         */
        Single = 1,
        /**
         * Indicates that the user can select and unselect multiple rows at at time by clicking and control-clicking.
         */
        Multiple = 2,
    }
    interface SelectableRowMetadata<T> extends FocusableRowMetadata<T> {
        /**
         * Indicates if the row is selected.
         */
        selected?: KnockoutObservable<boolean>;
        /**
         * Indicates the columnKey if the row is activated. null if deactivated.
         */
        activated?: KnockoutObservableBase<string>;
        /**
         * Additional information for this Activated cell.
         */
        activatedInfo?: KnockoutObservableBase<string>;
    }
    interface SelectableRowEventObject<T> {
        /**
         * Selected row.
         */
        selected?: SelectableRowMetadata<T>;
        /**
         * Unselected row.
         */
        unselected?: SelectableRowMetadata<T>[];
    }
    enum SelectionStyle {
        /**
         * The default selection style.
         */
        Default = 0,
        /**
         * Selected rows have a right corner check box.
         */
        Checked = 1,
    }
    /**
     * Options for the SelectableRow grid extension.
     */
    interface SelectableRowOptions<TItem, TSelection> {
        /**
         * Specifies what type of selectability is allowed for rows.
         */
        selectionMode: RowSelectionMode;
        /**
         * A function that determines if an item matches a selection.
         *
         * @param item The grid row item to be matched.
         * @param selection The selection to match the item to.
         * @return True if the item matches the selection; else false.
         */
        itemMatchesSelection?: (item: TItem, selection: TSelection) => boolean;
        /**
         * A factory function that creates a selection based on an item.
         *
         * @param item The grid row item for which selection needs to be created.
         * @return The selection for the specified item.
         */
        createSelection?: (item: TItem) => TSelection;
        /**
         * Selection state that has been previously saved as part of view state for this grid.
         */
        initialSelection?: MsPortalFx.ViewModels.SetSelection<TSelection>;
        /**
         * Currently Activated Column Key.
         */
        activatedColumnKey?: KnockoutObservableBase<string>;
        /**
         * Primary Activate Column Key.  This is to support double click, context menu and activateOnSelected.
         */
        primaryActivateColumnKey?: KnockoutObservableBase<string>;
        /**
         * Indicates that the row should activate when selected.
         */
        activateOnSelected?: KnockoutObservableBase<boolean>;
        /**
         * Callback when a row gets selected.
         *
         * @param evt Event used for the row selection.
         * @param args Selected and unselected objects.
         */
        rowSelect?: (evt: JQueryEventObject, args: SelectableRowEventObject<TItem>) => void;
        /**
         * Specifies a selection style for the grid.
         */
        selectionStyle?: SelectionStyle;
        /**
         * Disable require Ctrl or Shift Key for Single Mode mode to toggle selection on Click.
         */
        disableRequireSingleModeAssistKey?: KnockoutObservable<boolean>;
    }
    interface SelectableRowExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * Options for the SelectableRow grid extension. If null, rows will not be selectable.
         */
        selectableRow?: SelectableRowOptions<TItem, TSelection>;
    }
    interface SelectableContract<TItem, TSelection> extends Contract<TItem, TSelection> {
        /**
         * Items displayed in the table based on the column definitions when selection is enabled.
         * It is set in the constructor. Do not directly replace it.
         */
        selectableData?: MsPortalFx.ViewModels.SelectableSet<TItem, TSelection>;
    }
    interface ReorderRowEventObject<T> {
        /**
         * Metadata for moved row items.
         */
        rowMetadata: RowMetadata<T>[];
        /**
         * 0-Index position where the row got dropped.
         */
        position: number;
    }
    interface ReorderRowOptions<TItem> {
        /**
         * Disables the reorder plugin. Defaults to false.
         */
        disabled?: KnockoutObservable<boolean>;
        /**
         * Automatically reorder rows after a drop happened. If set to false, the developer needs to change the inner view model.
         * Defaults to true.
         */
        automaticallyReorderRows?: boolean;
        /**
         * Callback when a row gets reordered.
         *
         * @param evt Event used for the row reordering.
         * @param args Reordered row object.
         */
        rowReorder?: (evt: JQueryEventObject, args: ReorderRowEventObject<TItem>) => void;
    }
    interface ReorderRowExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * Options for the ReorderRow grid extension.
         */
        reorderRow?: ReorderRowOptions<TItem>;
    }
    interface RightClickableRowExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * Commands used for control composition purposes.
         */
        controlCommands: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Command.ViewModel[]>;
    }
    interface ResizableColumn extends Column {
        /**
         * Disables resizable for a specific column.
         */
        disableResizable?: KnockoutObservable<boolean>;
        /**
         * Column displays a resize handle.
         */
        hasHandle?: KnockoutObservable<boolean>;
    }
    interface ResizableColumnOptions<TItem> {
        /**
         * Indicates if columns are resizable. Defaults to true.
         */
        resizable?: KnockoutObservable<boolean>;
        /**
         * Sets resized column width to percent.
         */
        resizeToPercent?: KnockoutObservable<boolean>;
        /**
         * Sets minimum width for columns.
         */
        minWidth?: number;
    }
    interface ResizableColumnExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * Options for the ResizableColumn grid extension.
         */
        resizableColumn?: ResizableColumnOptions<TItem>;
    }
    enum SortOrder {
        /**
         * Column is unsorted.
         */
        Unsorted = 0,
        /**
         * Column is sorted ascending.
         */
        Ascending = 1,
        /**
         * Column is sorted descending.
         */
        Descending = 2,
    }
    enum SortFunction {
        /**
         * Uses the built-in Array.sort() function.
         */
        Default = 0,
        /**
         * Uses the getTime() value of Date object to sort.
         */
        DateTime = 1,
    }
    interface GroupableRowMetadata<T> extends RowMetadata<T> {
        /**
         * The ID of the group, typically mapping to a unique value in the column being grouped by.
         */
        groupId?: KnockoutObservable<string>;
    }
    interface Group {
        /**
         * The unique value corresponding to the group.
         * This value will be passed to the formatter.
         */
        value: any;
        /**
         * The format used to display the group header.
         * By default, the plain text formatter is used if none is specified.
         */
        format?: Format;
        /**
         * The format used to sort the group header.
         * By default, it matches the group.format.
         */
        sortFormat?: Format;
        /**
         * Format options associated with the chosen format.
         */
        formatOptions?: FormatOptions;
        /**
         * Format options associated with the chosen sortFormat.
         */
        sortFormatOptions?: FormatOptions;
    }
    interface GroupableOptions {
        /**
         * The item field/column in the data set that the groups map to/are created from.
         * When groups are determined automatically, uniqueness is determined by taking the toString() of the
         * value this key maps to for each item.
         */
        groupKey: KnockoutObservable<string>;
        /**
         * Format used when displaying group headers.
         * By default, the plain text formatter is used.
         */
        headerFormat?: Format;
        /**
         * Format options associated with the chosen header format.
         */
        headerFormatOptions?: FormatOptions;
        /**
         * An observable array of Group objects, to be rendered in indexed order.
         * If this array is not provided, it is inferred from the column values mapped to groupKey.
         */
        groups?: KnockoutObservableArray<Group>;
        /**
         * Format used when displaying the group header for groupless items.
         * By default, the plain text formatter is used if none is specified.
         */
        noGroupLabelFormat?: Format;
        /**
         * Format options associated with the chosen format.
         */
        noGroupLabelFormatOptions?: FormatOptions;
        /**
         * Sort order to display groups in (Unsorted, Ascending, or Descending).
         */
        sortOrder?: KnockoutObservableBase<SortOrder>;
        /**
         * Sort function to apply to the group values. Defaults to the built-in sort function.
         */
        sortFunction?: SortFunction;
    }
    interface GroupableExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * The options to configure the groupable plugin.
         */
        groupable?: GroupableOptions;
    }
    interface FocusableOption {
        focusable?: KnockoutObservableBase<boolean>;
    }
    interface HoverableOption extends FocusableOption {
        hoverIDKey?: KnockoutObservableBase<string>;
        hoveredID?: KnockoutObservableBase<string>;
    }
    interface FocusableRowHoverExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        hoverable?: HoverableOption;
    }
    enum EditableRowPlacement {
        /**
         * Put the editable row at the bottom of the grid.
         */
        Bottom = 0,
        /**
         * Put the editable row at the top of the grid.
         */
        Top = 1,
    }
    interface EditableRowMetadata<T> extends RowMetadata<T> {
        /**
         * The edit state of the entity in the edit scope.
         */
        editState?: KnockoutObservableBase<MsPortalFx.Data.EditState>;
    }
    interface EditScopeModel<T> {
        /**
         * The model for data stored in the edit scope.
         */
        items: KnockoutObservableArray<T>;
    }
    interface EditableRowOptions<T> {
        /**
         * An observable that supplies an edit scope instance. This instance can change as the enclosing Part is
         * rebound to a different master selection. This property will be nulled out when passed to the view model.
         */
        editScope: KnockoutObservable<MsPortalFx.Data.EditScope>;
        /**
         * An optional function that retrieves the 'items' array from an EditScope instance.
         *
         * @param editScope The edit scope from which to get items.
         * @return The items to be displayed in the grid.
         */
        getItems?: (editScope: MsPortalFx.Data.EditScope) => KnockoutObservableArray<T>;
        /**
         * Indicates if the editable row is at the top or bottom.
         * Defaults to Bottom.
         */
        placement?: EditableRowPlacement;
        /**
         * The maximum number of buffered rows at any time.
         */
        maxBufferedRows: number;
        /**
         * If set to true, clicking on an existing row will go in edit mode.
         * Defaults to false.
         */
        allowEditExistingItems?: boolean;
        /**
         * If set to true, clicking on a newly created row will go in edit mode.
         * Defaults to false.
         */
        allowEditCreatedItems?: boolean;
        /**
         * If set to true, an empty row is displayed at the location defined by the placement property.
         * Defaults to true.
         */
        enableRowAdd?: boolean;
        /**
         * If set to true, right-clicking on a newly created row will show the delete command.
         * Defaults to true.
         */
        enableRowDelete?: boolean;
        /**
         * The title to display for the row delete command.
         * Defaults to Delete.
         */
        deleteRowCommandTitle?: string;
        /**
         * Callback function that gets executed when an item is created.
         *
         * @param item The newly created item.
         */
        created?: (item: T) => void;
        /**
         * When changed ensures validation on the entire grid.
         */
        validate?: KnockoutObservable<number>;
        /**
         * When all form fields in the editable rows in editing mode are valid then true; else false.
         */
        valid?: KnockoutObservable<boolean>;
    }
    interface EditableRowExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * Options for the EditableRow grid extension. If null, rows will not be editable.
         */
        editableRow?: EditableRowOptions<TItem>;
    }
    interface EditableRowContract<TItem, TSelection> extends Contract<TItem, TSelection> {
        /**
         * Contains all the created items used by the EditableRow extension.
         */
        createdItems?: KnockoutObservableArray<TItem>;
        /**
         * The callback that is executed when a row is added.
         */
        rowAdd: JQueryEventHandler;
    }
    interface FilterableOptions {
        /**
         * Whether the filter search box close button is visible or not.
         */
        searchBoxCloseButtonVisible?: KnockoutObservableBase<boolean>;
        /**
         * The placeholder text to be shown in the search box.
         */
        searchBoxPlaceholder?: KnockoutObservable<string>;
        /**
         * Whether the filter search box is visible or not.
         */
        searchBoxVisible?: KnockoutObservableBase<boolean>;
        /**
         * The subset of visible column names to search through.
         */
        searchableColumns?: KnockoutObservableArray<string>;
    }
    interface FilterableExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * The options to configure the filterable plugin.
         */
        filterable?: FilterableOptions;
    }
    interface PageableOptions<TItem> {
        /**
         * Type of pager to load with the extension.
         */
        type?: PageableType;
        /**
         * Optionally change the label text that's displayed to load more data for squential pageable type.
         */
        label?: KnockoutObservableBase<string>;
        /**
         * Optionally show or hide the load more display label for squential pageable type.
         */
        showLabel?: KnockoutObservableBase<boolean>;
        /**
         * Specifies the data source which supports pageable data access.
         */
        dataNavigator?: MsPortalFx.Data.DataNavigator<TItem>;
        itemsPerPage?: KnockoutObservable<number>;
    }
    interface PageableExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * The options to configure the pageable plugin.
         */
        pageable?: PageableOptions<TItem>;
    }
    /**
     * Defines the pageable options.
     */
    enum PageableType {
        /**
         * Sequential will load a "Load more" button.
         */
        Sequential = 0,
        /**
         * Pageable will load a paging control allowing to go on different pages.
         */
        Pageable = 1,
    }
    interface HierarchicalItem {
        /**
         * Depth of item nesting.
         * Zero for top-level items.
         */
        depth: KnockoutObservableBase<number>;
        /**
         * Indicates if the item is expandable.
         * Undefined indicates expandability is unknown yet.
         */
        expandable: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the item is expanded or collapsed.
         */
        expanded: KnockoutObservableBase<boolean>;
    }
    interface Hierarchy<THierarchicalItem extends HierarchicalItem> {
        /**
         * The items to display in the grid.
         */
        items: KnockoutObservableBase<THierarchicalItem[]>;
        /**
         * Expands a hierarchy item.
         * @param item The item to expand.
         */
        expand: (item: THierarchicalItem) => void;
        /**
         * Collapses a hierarchy item.
         * @param item The item to expand.
         */
        collapse: (item: THierarchicalItem) => void;
        /**
         * Expands all hierarchy items.
         */
        expandAll: () => void;
        /**
         * Collapses all hierarchy items.
         */
        collapseAll: () => void;
    }
    interface HierarchicalOptions<THierarchicalItem extends HierarchicalItem> {
        /**
         * Provides the hierarchical data to the grid.
         */
        hierarchy: Hierarchy<THierarchicalItem>;
    }
    interface HierarchicalExtensionOptions<THierarchicalItem extends HierarchicalItem, TSelection> extends ExtensionsOptions<THierarchicalItem, TSelection> {
        /**
         * The options to configure the hierarchical plugin.
         */
        hierarchical?: HierarchicalOptions<THierarchicalItem>;
    }
    interface ScrollableOptions<TItem> {
        /**
         * Specifies the data source which supports random data access.
         */
        dataNavigator?: MsPortalFx.Data.DataNavigator<TItem>;
    }
    interface ScrollableExtensionOptions<TItem, TSelection> extends ExtensionsOptions<TItem, TSelection> {
        /**
         * The options to configure the scrollable plugin.
         */
        scrollable?: ScrollableOptions<TItem>;
    }
    class ViewModel<TItem, TSelection> extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract<TItem, TSelection>, MsPortalFx.Base.Disposable {
        /**
         * See interface.
         */
        summary: KnockoutObservable<string>;
        /**
         * See interface.
         */
        showHeader: boolean;
        /**
         * See interface.
         */
        columns: KnockoutObservableArray<Column>;
        /**
         * See interface.
         */
        items: KnockoutObservableArray<TItem>;
        /**
         * See interface.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * See interface.
         */
        extensions: number;
        /**
         * See interface.
         */
        extensionsOptions: ExtensionsOptions<TItem, TSelection>;
        /**
         * Row metadata associated to rows in the grid (editState, selected, disabled, groupId).
         * This property doesn't start with underscore since it needs to passed on to shell iframe.
         * The extended contract in the control has this as a property on the interface to consume changes.
         */
        private rowMetadata;
        /**
         * See interface.
         */
        selectableData: MsPortalFx.ViewModels.SelectableSet<TItem, TSelection>;
        /**
         * See interface.
         */
        createdItems: KnockoutObservableArray<TItem>;
        /**
         * See interface.
         */
        rowAdd: JQueryEventHandler;
        /**
         * See interface.
         * This property doesn't start with underscore since it needs to passed on to shell iframe.
         */
        resetCallback: KnockoutObservableBase<GridResetCallback>;
        /**
         * Observable used to add a new empty row to the grid.
         * This property doesn't start with underscore since it needs to passed on to shell iframe.
         * The extended contract in the control has this as a property on the interface to consume changes.
         */
        private addEmptyRow;
        private _createBlocked;
        private _addCreatedLocked;
        private _resetHandler;
        private _editScope;
        /**
         * Creates the view model that drives the Grid portal control.
         *
         * @param items The observable list of items to be displayed in the grid.
         * @param extensions The bitmask of grid plugins to load.
         * @param extensionsOptions Options for extensions.
         */
        constructor(items: KnockoutObservableArray<TItem>, extensions?: number, extensionsOptions?: ExtensionsOptions<TItem, TSelection>);
        /**
         * See interface.
         */
        getRowMetadata(item: TItem): RowMetadata<TItem>;
        /**
         * See interface.
         */
        reset(): MsPortalFx.Base.Promise;
        /**
         * See interface.
         */
        dispose(): void;
        private _createMetadataForItem(item, editableRowOptions);
        private _ensureSelectableRow();
        private _create(editScope, getItems);
        private _addCreated(editScope, getItems, itemToAdd);
        private _markForDelete(editScope, itemToDelete);
        private _addInitialCreatedRow(editScope, getItems);
        private _projectItems(targetItems, getSourceItemsFromEditScope);
        private _getEditScopeItems(editScope, getItems);
        private _getNonNullEditScope(editScope);
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.MultiselectDropDown {
    /**
    * Item represents a row.
    */
    interface ItemData {
    }
    /**
    * GroupInfo is the ViewModel for a particular <optGroup>
    */
    interface GroupInfo extends MsPortalFx.ViewModels.Controls.Forms.GroupDropDown.GroupInfo {
    }
    /**
     * ItemSetting is the fields setting to inform the ViewModel given setting how to build up dropdown items.
     */
    interface ItemSetting extends MsPortalFx.ViewModels.Controls.Forms.GroupDropDown.ItemSetting {
        /**
         * Formatter used when displaying one cell.
         */
        format?: MsPortalFx.ViewModels.Controls.Lists.Grid.Format;
        /**
         * Formatter options associated with the formatters.
         */
        formatOptions?: MsPortalFx.ViewModels.Controls.Lists.Grid.FormatOptions;
    }
    /**
     * Defines those properties of the multiselect dropdown contract that are exposed when used in a grid cell htmlbinding.
     */
    interface ContractBase extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<string> {
        /**
         * Group definitions. See interface.
         */
        groupInfos?: KnockoutObservableBase<GroupInfo[]>;
        /**
         * Items displayed in the table based on the column definitions when selection is disabled.
         */
        itemsDataArray: KnockoutObservableBase<ItemData[]>;
        /**
         * ItemSetting is the fields setting to inform the ViewModel given setting how to build up dropdown items.
         */
        itemSetting?: KnockoutObservableBase<ItemSetting>;
        /**
         * Turns on or off multiselect.
         */
        multiselect: KnockoutObservable<boolean>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Flag to allow max is reached, the control will disable all the unselected item and remember which item it disabled.
         * If true, when the selectedRowsCount() >= maxSelectAllowed, widget will remember which items that are disabled by widget.
         * Such that when later on, selectedRowsCount() < maxSelectAllowed, widget will enable those items it previoius disabled.
         * If false, when the selectedRowsCount() > maxSelectAllowed,  widget will not track which item it disabled, it will disable all items that are unselected.
         * when later on, selectedRowsCount() < maxSelectAllowed, widget will enable All item that are unselected
         */
        trackMaxSelectDisabledItems: boolean;
        /**
         * Flag to allow  max is reached, the control will disable all the unselected items.
         * If true, when the selectedRowsCount() >= maxSelectAllowed, disable unselected bse on this.trackMaxSelectDisabledItems settings.
         * Such that when later on, selectedRowsCount() < maxSelectAllowed, widget will enable those items are previously disabled.
         */
        disableItemsWhenMaxReached: boolean;
        /**
         * Value Separator for combining the selected item into a <input> value. For example, "val1;val2;val5".
         * We use standard javascript split function.  Can be a string.
         * By default, we use String.fromCharCode(0x1d). 0x1d is the <GS>, group separator, in ascii code which is not visible in the text box.
         * If you need to see this in the display text, change it to different character, or string.
         */
        valueSeparator: string;
        /**
         * Display Separator for combining the selected item into a displayable string. For example, "display1;display2;display3".
         * We use standard javascript split function.  Can be a string.
         * By default, we use ";" -- since this need to be visible.
         */
        displaySeparator: string;
        /**
         * Indicate value/selection is initialized.
         * If false, it will initialize the value from Items.selected states.
         * If true,  it will honor value and make sure the Items.selected states match current value.
         */
        valueInitialized?: boolean;
    }
    /**
     * Defines the contract for the multi-select dropdown view model.
     */
    interface Contract extends ContractBase {
        /**
         * Accessible name for the dropdown popup.
         */
        dropdownPopupName: KnockoutObservable<string>;
        /**
         * The total select Rows count currently in the drop down.
         */
        selectedRowsCount: KnockoutObservable<number>;
        /**
         * The displayString for the selected item(s).
         */
        selectedDisplayString: KnockoutObservable<string>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<string> implements Contract {
        /**
         * See Contract interface.
         */
        groupInfos: KnockoutObservableBase<GroupInfo[]>;
        /**
         * See Contract interface.
         */
        itemsDataArray: KnockoutObservableBase<ItemData[]>;
        /**
         * See Contract interface.
         */
        itemSetting: KnockoutObservableBase<ItemSetting>;
        /**
         * See Contract interface.
         */
        areItemsInitialized: KnockoutObservableBase<boolean>;
        /**
         * See Contract interface.
         */
        multiselect: KnockoutObservable<boolean>;
        /**
         * See Contract interface.
         */
        dropdownPopupName: KnockoutObservable<string>;
        /**
         * See Contract interface.
         */
        selectedRowsCount: KnockoutObservable<number>;
        /**
         * See Contract interface.
         */
        selectedDisplayString: KnockoutObservable<string>;
        /**
         * See Contract interface.
         */
        maxSelectAllowed: KnockoutObservable<number>;
        /**
         * See Contract interface.
         */
        multiItemsDisplayFormat: KnockoutObservableBase<string>;
        /**
         * See Contract interface.
         */
        multiItemsMaxDisplayFormat: KnockoutObservableBase<string>;
        /**
         * See Contract interface.
         */
        trackMaxSelectDisabledItems: boolean;
        /**
         * See Contract interface.
         */
        disableItemsWhenMaxReached: boolean;
        /**
         * See Contract interface.
         */
        valueSeparator: string;
        /**
         * See Contract interface.
         */
        displaySeparator: string;
        /**
         * See Contract interface.
         */
        valueInitialized: boolean;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.NumericTextBox {
    /**
     * The view model interface for TextBox portal control.
     */
    interface Contract extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<number> {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
    }
    /**
     * The view model interface for TextBox portal control.
     */
    class ViewModel extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<number> {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.OptionPicker {
    /**
     * View model interface representing the properties for OptionPicker.
     */
    interface Contract<TValue> extends MsPortalFx.ViewModels.Controls.ItemList.Contract<TValue> {
    }
    class ViewModel<TValue> extends MsPortalFx.ViewModels.Controls.ItemList.ViewModel<TValue> {
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.Password {
    interface Contract extends MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<string> {
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<string> implements Contract {
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.ProgressOverlay {
    enum Type {
        /**
         * A small, centered spinner.
         */
        SpinnerSmall = 0,
    }
    interface ViewModel extends Loadable.ViewModel {
        /**
         * Visual type of the progress overlay.
         */
        type: KnockoutObservable<Type>;
        /**
         * Control's aria-labelledby setting.
         */
        labelId: string;
        /**
         * Control's aria-describedby setting.
         */
        detailsId: string;
    }
}
declare module MsPortalFx.ViewModels.Controls.Forms.SliderBase {
    interface Contract<T> extends ValidatableControl.Contract<T> {
        /**
         * Minimum value of the slider.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value of the slider.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Sets the minimum valid value for the slider. Can be different than minimum displayed value.
         */
        slidableMin: KnockoutObservableBase<number>;
        /**
         * Sets the maximum valid value for the slider. Can be different than maximum displayed value.
         */
        slidableMax: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
    }
    class ViewModel<T> extends ValidatableControl.ViewModel<T> implements Contract<T> {
        /**
         * Minimum value displayed by the slider.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value displayed by the slider.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Sets the minimum valid value for the slider. Can be different than minimum displayed value.
         */
        slidableMin: KnockoutObservableBase<number>;
        /**
         * Sets the maximum valid value for the slider. Can be different than maximum displayed value.
         */
        slidableMax: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Determines the number of steps the the slider should move on page up and page down.
         */
        numStepsPerPage: number;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.RangeSlider {
    interface Contract extends MsPortalFx.ViewModels.Controls.Forms.SliderBase.Contract<string> {
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
        /**
         * Value separator for combining the range into a single string value. For example, "2;6". Default is ";".
         */
        valueSeparator: string;
        /**
         * Displays read-only textboxes in either side of the slider with the sliders start and end values.
         */
        showTextBoxes: boolean;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Forms.SliderBase.ViewModel<string> implements Contract {
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
        /**
         * Value separator for combining the range into a single string value. For example, "2;6". Default is ";".
         */
        valueSeparator: string;
        /**
         * Displays read-only textboxes in either side of the slider with the sliders start and end values.
         */
        showTextBoxes: boolean;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.Selector {
    /**
     * Defines the contract for the selector control view model.
     */
    interface ContractBase<T> {
        /**
         * The default value for a specific instance of the selector.
         */
        defaultValue?: KnockoutObservableBase<T>;
        /**
         * True if the value is displayed, else false.
         */
        showValue?: KnockoutObservableBase<boolean>;
        /**
         * True if the current value is the default value; else false. Optional.
         */
        isDefault?: KnockoutObservableBase<boolean>;
        /**
         * The display text for the value in the selector.
         */
        displayText: KnockoutObservableBase<string>;
        /**
         * The icon displayed next to the label and value.
         */
        icon?: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * An instance of MsPortalFx.ViewModels.Selectable which controls whether this control can be selected.
         */
        selectable: Selectable<any>;
        /**
         * True if the control is locked; else false.
         */
        locked: KnockoutObservableBase<boolean>;
        /**
         * Text to display on the balloon shown next to the title.
         */
        infoBalloonText: KnockoutObservableBase<string>;
        /**
         * Text to display on the balloon shown over the locked indicator.
         */
        lockedBalloonText: KnockoutObservableBase<string>;
        /**
         * Link to display within the balloon underneath the text, the balloon is shown next to the label.
         */
        infoBalloonLink?: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Balloon.Link>;
    }
    /**
     * Defines the contract for the selector control view model.
     */
    interface Contract<T> extends ContractBase<T>, MsPortalFx.ViewModels.Controls.ValidatableControl.Contract<T> {
        /**
         * The title of the selector. Used to specify the kind of value being selected.
         */
        label: KnockoutObservableBase<string>;
    }
    class ViewModel<T> extends MsPortalFx.ViewModels.Controls.ValidatableControl.ViewModel<T> implements Contract<T> {
        /**
         * See interface.
         */
        label: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        defaultValue: KnockoutObservableBase<T>;
        /**
         * See interface.
         */
        showValue: KnockoutObservableBase<boolean>;
        /**
         * See interface.
         */
        displayText: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * See interface.
         */
        selectable: Selectable<MsPortalFx.ViewModels.DynamicBladeSelection>;
        /**
         * See interface.
         */
        locked: KnockoutObservableBase<boolean>;
        /**
         * See interface.
         */
        infoBalloonText: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        lockedBalloonText: KnockoutObservableBase<string>;
        /**
         * Link to display within the balloon underneath the text, the balloon is shown next to the label.
         */
        infoBalloonLink: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        /**
         * Creates the view model for a selector.
         *
         * @param initialState The initial state of the selectable.
         */
        constructor(initialState?: any, selectedValue?: MsPortalFx.ViewModels.DynamicBladeSelection);
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Controls.Forms.Slider {
    interface Contract extends MsPortalFx.ViewModels.Controls.Forms.SliderBase.Contract<number> {
        /**
         * Displays a read-only textbox with the current slider value if true.
         */
        showValueTextBox: boolean;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Forms.SliderBase.ViewModel<number> implements Contract {
        showValueTextBox: boolean;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Forms {
    interface IOption<T> {
        /**
         * Text for the drop down option.
         */
        text: KnockoutObservableBase<string>;
        /**
         * Value for the drop down option.
         */
        value: T;
    }
    interface IDisablableOption<T> extends IOption<T> {
        /**
       * Dropdown option can be disabled.
       */
        disabled?: KnockoutObservableBase<boolean>;
    }
    class Option<T> implements IOption<T> {
        /**
         * Text for list item.
         */
        text: KnockoutObservableBase<string>;
        /**
         * Value bound for list item when the item is selected.
         */
        value: T;
        /**
         * @param text The text data binding for the item.
         * @param value The value data binding for the item.
         */
        constructor(text: string, value: T);
        constructor(text: KnockoutObservableBase<string>, value: T);
    }
    class DisablableOption<T> extends Option<T> implements IDisablableOption<T> {
        /**
         * Item is disabled.
         */
        disabled: KnockoutObservableBase<boolean>;
        /**
         * @param text The text data binding for the item.
         * @param value The value data binding for the item.
         * @param disabled The item is disabled.
         */
        constructor(text: string, value: T, disabled?: boolean);
        constructor(text: KnockoutObservableBase<string>, value: T, disabled?: KnockoutObservableBase<boolean>);
    }
}
declare module MsPortalFx.ViewModels.Forms {
    interface ISelectableOption<T> extends IDisablableOption<T> {
        /**
         * Option can be selected.
         */
        selected?: KnockoutObservableBase<boolean>;
    }
    class SelectableOption<T> extends DisablableOption<T> implements ISelectableOption<T> {
        /**
         * Item is disabled.
         */
        selected: KnockoutObservableBase<boolean>;
        /**
         * @param text The text data binding for the item.
         * @param value The value data binding for the item.
         * @param disabled The item is disabled.
         * @param selected The item is selected.
         */
        constructor(text: string, value: T, disabled?: boolean, selected?: boolean);
        constructor(text: KnockoutObservableBase<string>, value: T, disabled?: KnockoutObservableBase<boolean>, selected?: KnockoutObservableBase<boolean>);
    }
}
declare module MsPortalFx.ViewModels.Forms {
    interface IGroup<T> {
        /**
         * Id specifying the groupby key for a group of options.
         */
        key: string;
        /**
         * User friendly label for the grouping.
         */
        text: KnockoutObservable<string>;
        /**
         * Disable state of this group.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * Selectable state of this group.
         */
        selected?: KnockoutObservable<boolean>;
        /**
         * A list of options the use can select the field value from.
         * Dynamic update of options array is not yet supported for multiselect dropdown.
         * Consumers must initialize the groups before widget instantiation.
         */
        options: KnockoutObservableArray<ISelectableOption<T>>;
    }
}
declare module MsPortalFx.ViewModels {
    interface GroupsFormField<T> extends FormField<T> {
        /**
         * A list of groups to categorize the selectable options.
         * Dynamic update of groups array is not yet supported for multiselect dropdown.
         * Consumers must initialize the groups before widget instantiation.
         */
        groups: KnockoutObservableArray<Forms.IGroup<T>>;
    }
    class GroupsField<T> extends Field<T> implements GroupsFormField<T> {
        /**
         * A list of groups to categorize the selectable options.
         */
        groups: KnockoutObservableArray<Forms.IGroup<T>>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param values A list of groups to categorize the options field value.
         * @param validations Optional. A list of validations to be applied to the field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, values: Forms.IGroup<T>[], validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface FormOptionFormatSetting {
        /**
         * Formatter used when displaying the drop down option.
         */
        format?: MsPortalFx.ViewModels.Controls.Lists.Grid.Format;
        /**
         * Formatter options associated with the formatters.
         */
        formatOptions?: MsPortalFx.ViewModels.Controls.Lists.Grid.FormatOptions;
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface MultiselectDropDownFormFieldBase {
        /**
         * Specify the format type and format option for customizing the option display value.
         */
        formatSetting?: FormOptionFormatSetting;
        /**
         * Turns on or off multiselect.
         */
        multiselect?: KnockoutObservable<boolean>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed?: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat?: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat?: KnockoutObservableBase<string>;
        /**
         * Value Separator for combining the selected item into a <input> value. For example, "val1;val2;val5".
         * We use standard javascript split function.  Can be a string.
         * By default, we use String.fromCharCode(0x1d). 0x1d is the <GS>, group separator, in ascii code which is not visible in the text box.
         * If you need to see this in the display text, change it to different character, or string.
         */
        valueSeparator?: string;
        /**
         * Display Separator for combining the selected item into a displayable string. For example, "display1;display2;display3".
         * We use standard javascript split function.  Can be a string.
         * By default, we use ";" -- since this need to be visible.
         */
        displaySeparator?: string;
        /**
        * Indicate value/selection is initialized.
        * If false, it will initialize the value from Items.selected information.
        * If true,  it will honor value and make sure the Items.selected states match current value.
        */
        valueInitialized?: boolean;
    }
    interface MultiselectDropDownFormField<T> extends GroupsFormField<T>, MultiselectDropDownFormFieldBase {
    }
    class MultiselectDropDownField<T> extends GroupsField<T> implements MultiselectDropDownFormField<T> {
        /**
         * Specify the format type and format option for customizing the option display value.
         */
        formatSetting: FormOptionFormatSetting;
        /**
         * Turns on or off multiselect.
         */
        multiselect: KnockoutObservable<boolean>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Value Separator for combining the selected item into a <input> value. For example, "val1;val2;val5".
         * We use standard javascript split function.  Can be a string.
         * By default, we use String.fromCharCode(0x1d). 0x1d is the <GS>, group separator, in ascii code which is not visible in the text box.
         * If you need to see this in the display text, change it to different character, or string.
         */
        valueSeparator: string;
        /**
         * Display Separator for combining the selected item into a displayable string. For example, "display1;display2;display3".
         * We use standard javascript split function.  Can be a string.
         * By default, we use ";" -- since this need to be visible.
         */
        displaySeparator: string;
        /**
          * See Contract interface.
        */
        valueInitialized: boolean;
        /**
         * Creates an instance of a multiselect drop down form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param values A list of groups to categorize the options field value.
         * @param multiselect Optional. Observable form field that turns on or off multiple selection option.
         * @param formatSetting Optional. Custom format type and formatter options to customize the option display value.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, values: MsPortalFx.ViewModels.Forms.IGroup<T>[], multiselect?: KnockoutObservable<boolean>, formatSetting?: FormOptionFormatSetting, validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Controls.Lists.Grid {
    /**
     * View model data required by HtmlBindingsType.TextBox for rendering the text form field.
     */
    interface TextFormFieldInfo extends HtmlBindingsData {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText?: string;
    }
    /**
     * View model data required by HtmlBindingsType.CheckBox for rendering the checkbox form field.
     */
    interface CheckBoxFormFieldInfo extends HtmlBindingsData {
    }
    /**
     * View model data required by HtmlBindingsType.MultiselectDropDown
     * for rendering the multi-select dropdown control.
     */
    interface MultiselectDropDownFormFieldInfo<T> extends HtmlBindingsData, MsPortalFx.ViewModels.Obsolete.MultiselectDropDownFormFieldBase {
        /**
         * A list of groups to categorize the selectable options.
         * Dynamic update of groups array is not yet supported for multiselect dropdown.
         * Consumers must initialize the groups before widget instantiation.
         */
        groups: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IGroup<T>>;
    }
    interface DropDownFormFieldInfo<T> extends HtmlBindingsData {
        /**
         * A list of options the use can select the field value from.
         */
        options: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IDisablableOption<T>>;
    }
}
declare module MsPortalFx.ViewModels.Controls.Lists.ListView {
    /**
     * The plugin identifiers for the listview.
     */
    enum Extensions {
        /**
         * Plugin to have item selection.
         */
        Selectable = 1,
        /**
         * Plugin to have grouped items.
         */
        Groupable = 2,
    }
    /**
     * The group order for grouping items in the listview.
     */
    enum GroupOrder {
        /**
         * Display groups in collection order.
         */
        Collection = 0,
        /**
         * Display groups in ascending order.
         */
        Ascending = 1,
        /**
         * Display groups in descending order.
         */
        Descending = 2,
    }
    /**
     * The selection mode for selecting items in the listview.
     */
    enum SelectionMode {
        /**
         * Indicates that the user can select one item at at time by clicking.
         */
        Single = 0,
        /**
         * Indicates that the user can select and unselect multiple items at at time by clicking and control-clicking.
         */
        Multiple = 1,
    }
    /**
     * A metadata entry corresponding to a single item in the list.
     */
    interface ItemMetadata {
        /**
         * Indicates if the item is disabled.
         */
        disabled?: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the item is focused.
         */
        focused?: KnockoutObservableBase<boolean>;
        /**
         * Indicates if the item is selected.
         */
        selected?: KnockoutObservableBase<boolean>;
        /**
         * The ID of the group, typically mapping to a unique value in the item being grouped by.
         */
        groupId?: KnockoutObservableBase<any>;
    }
    interface Item {
        /**
         * Css class specific to this item.
         */
        cssClass?: KnockoutObservableBase<string>;
        /**
         * Metadata information about this item.
         */
        metadata?: ItemMetadata;
    }
    interface SelectableEventObject {
        /**
         * Selected items.
         */
        selected: Item[];
        /**
         * Unselected items.
         */
        unselected: Item[];
    }
    interface GroupableOptions {
        /**
         * The item field/column in the data set that the groups map to/are created from.
         */
        groupKey: KnockoutObservable<string>;
        /**
         * The template to apply to each group headers.
         */
        headerTemplate?: string;
        /**
         * An observable array of Group objects, to be rendered in indexed order.
         * If this array is not provided, it is inferred from the column values mapped to groupKey.
         */
        groups?: KnockoutObservableArray<Group>;
        /**
         * The group name shown for all items that don't have a groupId set.
         */
        noGroupLabel?: string;
        /**
         * Order to display groups in (Collection, Ascending, or Descending).
         */
        order?: KnockoutObservableBase<GroupOrder>;
    }
    interface SelectableOptions {
        /**
         * Indicates selection mode or single or multiple selection (default Single).
         */
        selectionMode?: SelectionMode;
        /**
         * Gets or sets the selected item for single selection backward compatibility.
         */
        selectedItem?: KnockoutObservable<Item>;
        /**
         * Gets or sets the selected items.
         */
        selection?: MsPortalFx.ViewModels.SelectableSet<Item, any>;
        /**
         * Indicates that the item should activate when selected (default true).
         */
        activateOnSelected?: boolean;
    }
    interface ExtensionOptions {
        /**
         * Grouping options.
         */
        groupable?: GroupableOptions;
        /**
         * Selection options.
         */
        selectable?: SelectableOptions;
    }
    interface Group {
        /**
         * The unique value corresponding to the group.
         */
        value: any;
    }
    interface Contract extends Loadable.Contract {
        /**
         * Items displayed in the list.
         */
        items: KnockoutObservableArray<Item>;
        /**
         * Important events which the viewModel might want to react.
         */
        events: (type: string, args?: any) => void;
        /**
         * Template used on each item.
         */
        itemTemplate: string;
        /**
         * Message displayed when list is empty.
         */
        noItemsMessage: KnockoutObservableBase<string>;
        /**
         * The bitmask of plugins to be loaded.
         * Use '|' or '+' to specify multiple extensions.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensions?: number;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionOptions?: ExtensionOptions;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Items displayed in the list.
         */
        items: KnockoutObservableArray<Item>;
        /**
         * Important events which the viewModel might want to react.
         */
        events: (type: string, args?: any) => void;
        /**
         * The template used on each item.
         */
        itemTemplate: string;
        /**
         * Message displayed when list is empty.
         */
        noItemsMessage: KnockoutObservableBase<string>;
        /**
         * The bitmask of plugins to be loaded.
         * Use '|' or '+' to specify multiple extensions.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensions: number;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionOptions: ExtensionOptions;
        /**
         * Constructs a ListView view model.
         *
         * @param extensions Bitmask of extension plugins to be loaded.
         * @param extensionOptions The extension options for the plugins.
         */
        constructor(extensions?: number, extensionOptions?: ExtensionOptions);
    }
}
declare module MsPortalFx.ViewModels.Controls.Lists.Gallery {
    interface Contract extends ListView.Contract {
    }
    class ViewModel extends ListView.ViewModel implements Contract {
        /**
         * Constructs a Gallery view model.
         *
         * @param extensions Bitmask of extension plugins to be loaded.
         * @param extensionOptions The extension options for the plugins.
         */
        constructor(extensions?: number, extensionOptions?: ListView.ExtensionOptions);
    }
}
declare module MsPortalFx.ViewModels.Controls.Lists.TreeView {
    /**
     * A metadata entry correspendong to a single item in the tree.
     */
    interface ItemMetadata {
        /**
         * Gets or sets whether the item is expanded or not (effective if the item has child items).
         */
        expanded?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is disabled.
         */
        disabled?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is focused.
         */
        focused?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is selected.
         */
        selected?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is selectable. Observably changing this value will not change selected state of the item.
         */
        selectable?: KnockoutObservable<boolean>;
        /**
         * Indicates if the item is on-demand loadable.
         */
        loadable?: KnockoutObservable<boolean>;
    }
    /**
     * Html template for an item.
     */
    interface ItemTemplate {
        /**
         * Key of this template.
         */
        key: string;
        /**
         * Html template to be used by items.
         */
        html: string;
    }
    enum Extensions {
        /**
         * Plugin to have selectable items.
         */
        Selectable = 1,
        /**
         * Plugin to have on-demand loadable items.
         */
        OnDemandLoadable = 2,
        /**
         * Plugin to have right clickable items.
         */
        RightClickable = 4,
    }
    /**
     * Options for the Selectable treeView extension.
     */
    interface SelectableOptions<TItem extends Item, TSelection> {
        /**
         * A factory function that creates a selection based on an item.
         */
        createSelection(item: TItem, path: string): TSelection;
        /**
         * Selection state that has been previously saved as part of view state for this treeView.
         */
        initialPath?: string;
    }
    /**
     * Defines the contract about selectable properties.
     */
    interface SelectableData<TSelection> {
        /**
         * Specifies the currently selected item.
         */
        selectedItem: KnockoutObservable<TSelection>;
        /**
         * Specifies the path of the currently selected item.
         * This property is meant to be set only by base widget.
         */
        selectedPath: KnockoutObservable<string>;
    }
    /**
     * Options for the On-Demand Loadable treeView extension.
     */
    interface OnDemandLoadableOptions<TItem extends Item> {
        /**
         * A factory function that notifies a load is required
         */
        loadItem(item: TItem, path: string): void;
    }
    /**
     * Defines the contract about on-demand loadable properties.
     */
    interface OnDemandLoadableData {
        /**
         * Gets the path of the item which is being loaded.
         * This property is meant to be set only by base widget.
         */
        loadingPath: KnockoutObservable<string>;
    }
    interface ExtensionsOptions<TItem extends Item, TSelection> {
        /**
         * Options for the Selectable treeView extension.  If null, items will not be selectable.
         */
        selectable?: SelectableOptions<TItem, TSelection>;
        /**
         * Options for the On-Demand Loadable treeView extension.  If null, items will not be on-demand loadable
         * and all the hierarchy needs to be loaded up-front.
         */
        onDemandLoadable?: OnDemandLoadableOptions<TItem>;
    }
    /**
     * A leaf of the tree.
     */
    interface Item {
        /**
         * Text of the item.
         */
        text: KnockoutObservable<string>;
        /**
         * Child items of this item.
         */
        items?: KnockoutObservableArray<Item>;
        /**
         * Icon specified to the item to be displayed with text.
         */
        icon?: KnockoutObservable<string>;
        /**
         * Css class specific to this item.
         */
        cssClass?: KnockoutObservable<string>;
        /**
         * Metadata information about this item.
         */
        metadata?: ItemMetadata;
        /**
         * Key of the template for this item.
         */
        templateKey?: KnockoutObservable<string>;
    }
    /**
     * Callback set and used by the framework to expand and collapse nodes.
     */
    interface ToggleNodeCallback {
        (item: Item, expandState: boolean): void;
    }
    interface Contract<TItem extends Item, TSelection> extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Items displayed in the tree.
         */
        items: KnockoutObservableArray<TItem>;
        /**
         * Amount of child item padding in px.
         */
        padding: KnockoutObservable<number>;
        /**
         * Separator used to build the path of an item.
         */
        pathSeparator: string;
        /**
         * Indicates whether all the items in tree are visible and expand/collapse icons are invisible.
         */
        alwaysExpanded: KnockoutObservable<boolean>;
        /**
         * A list of html templates to be used by the items.
         */
        htmlTemplates: ItemTemplate[];
        /**
         * The bitmask of plugins to be loaded.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensions?: number;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionOptions?: ExtensionsOptions<TItem, TSelection>;
        /**
         * Expands a treeview item.
         *
         * @param item The treeview item to expand
         */
        expandNode(item: Item): void;
        /**
         * Collapses a treeview item.
         *
         * @param item The treeview item to collapses
         */
        collapseNode(item: Item): void;
        /**
         * Toggles the expanded state of a treeview item.
         *
         * @param item The treeview item to collapses
         * @param expanded Optional. The desired expanded state of the treeview item.
         */
        toggleNode(item: Item, expanded?: boolean): void;
        /**
         * Callback set and used by the framework to expand and collapse nodes.  Do not modify or set this property.
         */
        toggleNodeCallback: KnockoutObservableBase<ToggleNodeCallback>;
    }
    class ViewModel<TItem extends Item, TSelection> extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract<TItem, TSelection> {
        /**
         * See interface.
         */
        items: KnockoutObservableArray<TItem>;
        /**
         * See interface.
         */
        padding: KnockoutObservable<number>;
        /**
         * See interface.
         */
        pathSeparator: string;
        /**
         * See interface.
         */
        alwaysExpanded: KnockoutObservable<boolean>;
        /**
         * A list of html templates to be used by the items.
         */
        htmlTemplates: ItemTemplate[];
        /**
         * See interface.
         */
        extensions: number;
        /**
         * See interface.
         */
        extensionsOptions: ExtensionsOptions<TItem, TSelection>;
        /**
         * A bridge between the widget and extension viewmodel to reflect control selection changes.
         */
        selectableData: SelectableData<TSelection>;
        /**
         * A bridge between the widget and extension viewmodel to notify items being loaded on-demand.
         */
        onDemandLoadableData: OnDemandLoadableData;
        /**
         * Callback set and used by the framework to expand and collapse nodes.  Do not modify or set this property.
         */
        toggleNodeCallback: KnockoutObservableBase<ToggleNodeCallback>;
        constructor(items: KnockoutObservableArray<TItem>, extensions?: number, extensionsOptions?: ExtensionsOptions<TItem, TSelection>);
        dispose(): void;
        /**
         * Expands a treeview item.
         *
         * @param item The treeview item to expand
         */
        expandNode(item: Item): void;
        /**
         * Collapses a treeview item.
         *
         * @param item The treeview item to collapse
         */
        collapseNode(item: Item): void;
        /**
         * Collapses a treeview item.
         *
         * @param item The treeview item to collapse
         */
        toggleNode(item: Item, expanded?: boolean): void;
        private _selectableExists;
        private _loadableExists;
        private _processItems(items);
        private _processItem(item);
        private _setupSelectable();
        private _setupOnDemandLoadable();
        private _findItemByPath(items, path, pathSeparator);
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Metrics {
    /**
     * Size of the metrics.
     */
    enum Size {
        /**
         * Shows small metrics - Font: 20px, Height: 32px, Margin: 14px.
         */
        Small = 0,
        /**
         * Shows medium metrics - Font: 40px, Height: 35px, Margin: 30px.
         */
        Medium = 1,
        /**
         * Shows large metrics - Font: 40px, Height: 45px, Margin: 22px.
         */
        Large = 2,
        /**
         * Shows Xlarge metrics - Font: 40px, Height: 45px, Margin: 25px.
         */
        XLarge = 3,
    }
    /**
     * Orientation of the metrics.
     */
    enum Orientation {
        /**
         * Metrics will be displayed horizontally.
         */
        Horizontal = 0,
        /**
         * Metrics will be displayed vertically.
         */
        Vertical = 1,
    }
    enum Alignment {
        /**
         * Top edge for vertical alignment.
         */
        Top = 1,
        /**
         * Left edge for horizontal alignment.
         */
        Left = 2,
        /**
         * Right edge for horizontal alignment.
         */
        Right = 4,
        /**
         * Bottom edge for vertical alignment.
         */
        Bottom = 8,
    }
    /**
     * Defines hatching patterns.
     */
    enum HatchingPattern {
        /**
         * The area is solid.
         */
        Solid = 0,
        /**
         * The area is cross hatched.
         */
        CrossHatching = 1,
        /**
         * The area is diagonal hatched.
         */
        DiagonalHatching = 2,
        /**
         * The area is hatched horizontally like a dotted line.
         */
        DottedHatching = 3,
    }
    interface SingleMetricContract extends MsPortalFx.ViewModels.Controls.SingleSetting.Contract {
        /**
         * Color of the vertical bar beside the metric.
         */
        barCssClass: KnockoutObservable<string>;
        /**
         * Show the vertical bar besides the metric.
         */
        showBarColor: KnockoutObservable<boolean>;
        /**
         * Defines the hatching pattern.
         */
        hatchingPattern?: KnockoutObservable<MsPortalFx.ViewModels.Controls.Visualization.Metrics.HatchingPattern>;
        /**
         * Unit alignment.
         * Defaults to right & bottom.
         */
        unitAlignment: KnockoutObservableBase<Alignment>;
        /**
         * The hide of the metric.
         */
        hide: KnockoutObservableBase<boolean>;
        /**
        * Indicates if this metric should be prioritized.
        * For example if it represents a series that is currently hovered by the user.
        */
        prioritized: KnockoutObservable<boolean>;
    }
    class SingleMetric extends MsPortalFx.ViewModels.Controls.SingleSetting.ViewModel implements SingleMetricContract {
        /**
         * Color of the vertical bar beside the metric.
         */
        barCssClass: KnockoutObservable<string>;
        /**
         * Show the vertical bar besides the metric.
         */
        showBarColor: KnockoutObservable<boolean>;
        /**
         * Defines the hatching pattern.
         */
        hatchingPattern: KnockoutObservable<HatchingPattern>;
        /**
         * Unit alignment.
         * Defaults to right & bottom.
         */
        unitAlignment: KnockoutObservableBase<Alignment>;
        /**
         * Caption alignment. Currently only support Top or Bottom.
         * Defaults to Top.
         */
        captionAlignment: KnockoutObservableBase<Alignment>;
        /**
         * The hide of the metric.
         */
        hide: KnockoutObservableBase<boolean>;
        /**
        * Indicates if this metric should be prioritized.
        * For example if it represents a series that is currently hovered by the user.
        */
        prioritized: KnockoutObservable<boolean>;
    }
    interface VisualContract extends Loadable.Contract {
        /**
         * The orientation of the items in the metrics.
         */
        orientation: KnockoutObservable<Orientation>;
        /**
         * The size of the items in the metrics.
         */
        size: KnockoutObservable<Size>;
        /**
         * The visibility of the metrics.
         */
        visible: KnockoutObservable<boolean>;
    }
    interface Contract extends VisualContract {
        /**
         * Metrics items to display
         */
        items: KnockoutObservableArray<SingleMetric>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Metrics items to display
         */
        items: KnockoutObservableArray<SingleMetric>;
        /**
         * The orientation of the items in the metrics.
         */
        orientation: KnockoutObservable<Orientation>;
        /**
         * The size of the items in the metrics.
         * This is deprecated. The parent control is responsible for styling the metrics in accordance with the size.
         */
        size: KnockoutObservable<Size>;
        /**
         * The visibility of the metrics.
         */
        visible: KnockoutObservable<boolean>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Chart {
    /**
    * Defines chart types.
    */
    enum ChartType {
        /**
         * Line chart type.
         */
        Line = 0,
        /**
         * Area chart type.
         */
        Area = 1,
        /**
         * Scatter chart type.
         */
        Scatter = 2,
        /**
         * Stacked bar chart type.
         */
        StackedBar = 3,
        /**
         * Grouped bar chart type.
         */
        GroupedBar = 4,
        /**
         * Split bar chart type.
         */
        SplitBar = 5,
        /**
         * Stacked area chart type.
         */
        StackedArea = 6,
    }
    /**
     * Defines interpolation of lines of the line chart.
     */
    enum Interpolation {
        /**
         * The series interpolation when data points are connected by straight lines.
         */
        Linear = 0,
        /**
         * The series interpolation when data points are connected by smooth curves. The monotone is a mode of D3 interpolation style.
         */
        Monotone = 1,
        /**
         * The series interpolation when series are connected by two lines: the first one (from the left side) is horizontal and the second one is vertical.
         */
        StepAfter = 2,
    }
    /**
     * Defines line styles of the line chart.
     */
    enum LineStyle {
        /**
         * The series line is solid.
         */
        Solid = 0,
        /**
         * The series line is dotted.
         */
        Dotted = 1,
        /**
         * The series line is dashed.
         */
        Dashed = 2,
        /**
         * The series line is a trendline.
         */
        Trendline = 3,
        /**
          * The series line is a usage threshold.
          */
        UsageThreshold = 4,
        /**
         * The series line is a warning threshold.
         */
        WarningThreshold = 5,
    }
    /**
     * Display type for optional line and coordinate plots for stacked area charts.
     */
    enum LineState {
        /**
         * Display stacked area chart line with coordinate points. Use this for old api behavior showLines(true).
         */
        ShowLineWithPoints = 0,
        /**
         * Hide stacked area chart line. Use this for old api behavior showLines(false).
         */
        HideLine = 1,
        /**
         * Display stacked area chart line with the point nearest to x slider only.
         */
        ShowLineWithXHoverPoint = 2,
    }
    /**
     * Defines hatching patterns of the area chart.
     */
    enum AreaHatchingPattern {
        /**
         * The series area is solid.
         */
        Solid = 0,
        /**
         * The series area is cross hatched.
         */
        CrossHatching = 1,
        /**
         * The series area is diagonal hatched.
         */
        DiagonalHatching = 2,
        /**
         * The area is hatched horizontally like a dotted line.
         */
        DottedHatching = 3,
    }
    /**
     * Defines the various sub-types for bar chart.
     */
    enum BarChartType {
        /**
         * The data series will be rendered as stacked bars for each x value.
         */
        Stacked = 0,
        /**
         * The data series will be rendered as grouped bars for each x value.
         */
        Grouped = 1,
        /**
         * The data series which has positive and negative values will be rendered with axis in the center of the chart.
         */
        Split = 2,
    }
    /**
     * Indicates where the chart axis should be visually positioned on the chart.
     */
    enum AxisPosition {
        /**
         * The axis should not be displayed in the chart.
         */
        None = 0,
        /**
         * The axis should be displayed horizontally above the chart.
         */
        Top = 1,
        /**
         * The axis should be displayed vertically and aligned right of the chart.
         */
        Right = 2,
        /**
         * The axis should be displayed horizontally below chart.
         */
        Bottom = 3,
        /**
         * The axis should be displayed vertically and aligned left of the chart.
         */
        Left = 4,
        /**
         * The axis should be displayed in the center and horizontally aligned.
         */
        CenterHorizontal = 5,
        /**
         * The axis should be displayed in the center and vertically aligned.
         */
        CenterVertical = 6,
    }
    enum InteractionBehavior {
        /**
         * All Interaction is enabled
         */
        All = 0,
        /**
         * Opt out XSlider behavior
         */
        XSlider_Off,
        /**
         * Opt out XSlider callout Text. Not Yet Implemented.
         */
        XSlider_noCallout,
        /**
         * Opt out any interaction in ChartArea.
         */
        ChartArea_Off,
        /**
         * Opt out any ChartArea Click-select behavior. Not Yet Implemented.
         */
        ChartArea_noClick,
        /**
         * Opt out any ChartArea hover behavior. Not Yet Implemented.
         */
        ChartArea_noHover,
    }
    /**
     * Indicates where the chart legend should be visually positioned on the chart.
     */
    enum LegendPosition {
        /**
         * The chart legend should not be displayed in the chart.
         */
        None = 0,
        /**
         * The legend should be displayed horizontally above the chart.
         */
        Top = 1,
        /**
         * The legend should be displayed vertically and aligned right of the chart.
         */
        Right = 2,
        /**
         * The legend should be displayed horizontally below chart.
         */
        Bottom = 3,
        /**
         * The legend should be displayed vertically and aligned left of the chart.
         */
        Left = 4,
    }
    /**
     * Specifies the data label context.
     */
    enum DataLabelContext {
        /**
         * The data label should be displayed near the max value of the series.
         */
        Max = 0,
        /**
         * The data label should be displayed near the min value of the series.
         */
        Min = 1,
        /**
         * The data label should be displayed near the first value of the series.
         */
        First = 2,
        /**
         * The data label should be displayed near the last value of the series.
         */
        Last = 3,
        /**
         * The data label should be displayed near every value of the series.
         */
        Every = 4,
        /**
         * The data label should be displayed near custom points.
         */
        Custom = 5,
    }
    /**
     * Specifies the data label style.
     */
    enum DataLabelStyle {
        /**
         * The data label should be displayed as a callout.
         */
        Callout = 0,
        /**
         * The data label should be displayed as a badge.
         */
        Badge = 1,
    }
    /**
     * Specifies the scale used on the axis.
     */
    enum Scale {
        /**
         * Specify this scale for discrete values where the values will be mapped 1:1 on the axis.
         */
        Ordinal = 0,
        /**
         * Specify this scale for continuous values like numeric values in the series which may or may not be sorted.
         */
        Linear = 1,
        /**
         * Specify this scale for date / time values in the series which may or may not be sorted.
         */
        Time = 2,
    }
    /**
     * Specifies where the axis label should be displayed.
     */
    enum AxisLabelPosition {
        /**
         * The labels are not displayed.
         */
        None = 0,
        /**
         * The labels are displayed at the low end of the axis.
         */
        Low = 1,
        /**
         * The labels are displayed at the high end of the axis.
         */
        High = 2,
    }
    /**
     * Specifies conditions checked on rendering a series view.
     */
    enum ConditionOperator {
        /**
         * The view should be rendered for series segments exceeding the argument of the condition.
         */
        GreaterThan = 0,
        /**
         * The view should be rendered for series segments not exceeding the argument of the condition.
         */
        LessThan = 1,
    }
    /**
     * Specifies series type.
     */
    enum SeriesType {
        /**
         * The series is defined as a set of pairs of x and y values.
         */
        General = 0,
        /**
         * The series is used to draw a horizontal line and is defined as with the y value.
         */
        HorizontalLine = 1,
        /**
         * The series is used to draw a vertical line and is defined as with the x value.
         */
        VerticalLine = 2,
        /**
         * The series has uniform intervals between x-values. It is defined by the start x-value, the grain and the array of y-values.
         */
        Uniform = 3,
    }
    /**
     * Specifies the scope of metrics rules.
     */
    enum MetricRuleScope {
        /**
         * The default scope if other rules are not specified.
         */
        Default = 0,
        /**
         * A single data point is in the scope.
         */
        Point = 2,
        /**
         * Multiple data points from the same series are in the scope.
         */
        MultiplePointsSingleSeries = 3,
        /**
         * Multiple data points from multiple series are in the scope.
         */
        MultiplePointsMultipleSeries = 4,
    }
    /**
     * Specifies the aggregation scope of a metric rule.
     */
    enum MetricRuleAggregationScope {
        /**
         * All selected series should be aggregated into a common metric.
         */
        AllTogether = 0,
        /**
         * All selected series should be aggregated separate metrics.
         */
        AllSeparately = 1,
        /**
         * A metric should be aggregated over a single series.
         */
        SingleSeries = 2,
    }
    /**
     * Specifies the aggregation type of a metric rule.
     */
    enum MetricRuleAggregationType {
        /**
         * An x-value of the point selected.
         */
        CurrentXValue = 0,
        /**
         * An y-value of the point selected.
         */
        CurrentYValue = 1,
        /**
         * Min of y-value of points selected.
         */
        MinY = 2,
        /**
         * Max of y-value of points selected.
         */
        MaxY = 3,
        /**
         * Average of y-value of points selected.
         */
        AverageY = 4,
        /**
         * Sum of y-value of points selected.
         */
        SumY = 5,
        /**
         * Count of points selected.
         */
        Count = 6,
        /**
         * Custom value.
         */
        CustomValue = 7,
    }
    /**
     * Defines the event data associated with chart event notifications.
     */
    interface EventData<TX, TY> {
        /**
         * Name of the series.
         */
        seriesName: string;
        /**
         * The value of the current target element.
         */
        value: ChartItem<TX, TY>;
    }
    /**
     * This interface specifies data label properties.
     */
    interface DataLabelContract<TX, TY> {
        /**
         * Defines the data label context.
         */
        context: KnockoutObservable<DataLabelContext>;
        /**
         * Defines the data label style.
         */
        style: KnockoutObservable<DataLabelStyle>;
        /**
         * Defines the data label formatter. {0} for series name, {1} for the x-value, {2} for the y-value. X and y values are formatted (date / number) the same way as the corresponding axis tick labels are.
         */
        formatter: KnockoutObservable<string>;
    }
    /**
     * This interface specifies data label properties.
     */
    class DataLabel<TX, TY> implements DataLabelContract<TX, TY> {
        /**
         * Defines the data label context.
         */
        context: KnockoutObservable<DataLabelContext>;
        /**
         * Defines the data label style.
         */
        style: KnockoutObservable<DataLabelStyle>;
        /**
         * Defines the data label formatter. {0} for series name, {1} for the x-value, {2} for the y-value. X and y values are formatted (date / number) the same way as the corresponding axis tick labels are.
         */
        formatter: KnockoutObservable<string>;
    }
    /**
     * This class specifies custom data label properties.
     */
    interface CustomDataLabelContract<TX, TY> extends DataLabelContract<TX, TY> {
        /**
         * Defines the chart items for the data label.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
    }
    /**
     * This class specifies custom data label properties.
     */
    class CustomDataLabel<TX, TY> extends DataLabel<TX, TY> implements CustomDataLabelContract<TX, TY> {
        /**
         * Defines the chart items for the data label.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
        /**
         * Defines the data label context.
         */
        context: KnockoutObservable<DataLabelContext>;
    }
    /**
     * This interface specifies the chart axis properties.
     */
    interface AxisContract<T> {
        /**
         * Name of the axis.
         */
        name: KnockoutObservable<string>;
        /**
         * Defines the type of the axis label.
         */
        scale: KnockoutObservable<Scale>;
        /**
         * A value indicating how many tick marks should be displayed.
         * This value is just a hint and actual tick marks shown will be approximated based on scale.
         */
        ticks: KnockoutObservable<number>;
        /**
         * Defines the position for the axis.
         */
        position: KnockoutObservable<AxisPosition>;
        /**
         * Defines the position index for the placement of the axis when multiple axes should be displayed on the same side.
         * A value of 0 will be placed inner most close to the chart area and value of 1 will be placed further away from
         * the chart area based on the axis label padding.
         */
        positionIndex: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the axis and all its associated entities like name, label, tick marks etc.
         */
        showAxis: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to auto scale Unit
         */
        autoScaleUnit: KnockoutObservableBase<boolean>;
        /**
         * Show the axis name.
         */
        showName: KnockoutObservable<boolean>;
        /**
         * Defines the position at which to show the axis labels.
         */
        showLabel: KnockoutObservable<AxisLabelPosition>;
        /**
         * Defines the padding size for axis labels.
         */
        labelPadding: KnockoutObservable<number>;
        /**
         * Defines the rotation angle. By default the labels will be shown horizontally.
         * Typical rotation angle used is from 0 (horizontal) to -90 (vertically down).
         */
        rotateLabel: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the line for the axis.
         */
        showAxisLine: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show tick marks.
         */
        showTickMarks: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show grid lines.
         */
        showGridLines: KnockoutObservable<boolean>;
        /**
         * Defines the format to parse the string typed data.
         * The string value can either be a date or a number representation and the specified format will be used to parse the string value to the respective date or number type.
         */
        inputFormat: KnockoutObservable<string>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         */
        outputFormat: KnockoutObservable<string>;
        /**
         * Defines the precision for a number values for displaying the axis label text.
         */
        displayNumberPrecision: KnockoutObservable<number>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         * The formatter will use xSliderOutputFormat.date if data is instanceof Date.  It use the basic mechanism as Multi-Time Axis formatting as in
         * http://bl.ocks.org/mbostock/4149176 except for consistency. Please use the DataUtil format.
         * If it is a type of value, it will use the first element of the array.
         */
        xSliderOutputFormat: KnockoutObservable<string[]>;
        /**
         * Specify the axis label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be transformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        displayLabelFormatter: KnockoutObservableBase<string>;
        /**
         * Specify the axis xSlider label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be tranformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        xSliderCalloutDisplayFormatter: KnockoutObservableBase<string>;
        /**
         * Optionally specify the minimum value for the axis domain.
         */
        min: KnockoutObservableBase<T>;
        /**
         * Optionally specify the maximum value for the axis domain.
         */
        max: KnockoutObservableBase<T>;
        /**
         * Specify the unit of the axis.
         */
        unit: KnockoutObservable<UnitConversion.Unit>;
    }
    /**
     * This class specifies the chart axis properties.
     */
    class Axis<T> implements AxisContract<T> {
        /**
         * Name of the axis.
         */
        name: KnockoutObservable<string>;
        /**
         * Defines the type of the axis label.
         */
        scale: KnockoutObservable<Scale>;
        /**
         * A value indicating how many tick marks should be displayed.
         * This value is just a hint and actual tick marks shown will be approximated based on scale.
         */
        ticks: KnockoutObservable<number>;
        /**
         * Defines the position for the axis.
         */
        position: KnockoutObservable<AxisPosition>;
        /**
         * Defines the position index for the placement of the axis when multiple axes should be displayed on the same side.
         * A value of 0 will be placed inner most close to the chart area and value of 1 will be placed further away from
         * the chart area based on the axis label padding.
         */
        positionIndex: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the axis and all its associated entities like name, label, tick marks etc.
         */
        showAxis: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show the axis and all its associated entities like name, label, tick marks etc.
         */
        autoScaleUnit: KnockoutObservableBase<boolean>;
        /**
         * Show the axis name.
         */
        showName: KnockoutObservable<boolean>;
        /**
         * Defines the position at which to show the axis labels.
         */
        showLabel: KnockoutObservable<AxisLabelPosition>;
        /**
         * Defines the padding size for axis labels.
         * Temporary changed to 50px to fit 1000.0A/BC"
         */
        labelPadding: KnockoutObservable<number>;
        /**
         * Defines the rotation angle. By default the labels will be shown horizontally.
         * Typical rotation angle used is from 0 (horizontal) to -90 (vertically down).
         */
        rotateLabel: KnockoutObservable<number>;
        /**
         * A value indicating whether or not to show the line for the axis.
         */
        showAxisLine: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show tick marks.
         */
        showTickMarks: KnockoutObservable<boolean>;
        /**
         * A value indicating whether or not to show grid lines.
         */
        showGridLines: KnockoutObservable<boolean>;
        /**
         * Defines the format to parse the string typed data.
         * The string value can either be a date or a number representation and the specified format will be used to parse the string value to the respective date or number type.
         */
        inputFormat: KnockoutObservable<string>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         */
        outputFormat: KnockoutObservable<string>;
        /**
         * Defines the precision for a number values for displaying the axis label text.
         */
        displayNumberPrecision: KnockoutObservable<number>;
        /**
         * Defines the format to display the data in axis label.
         * The data can be a date or number and the output format will define how the data should be displayed in the axis label.
         * The formatter will use xSliderOutputFormat.date if data is instanceof Date.  It use the basic mechanism as Multi-Time Axis formatting as in
         * http://bl.ocks.org/mbostock/4149176 except for consistency. Please use the DataUtil format.
         * If it is a type of value, it will use the first element of the array.
         */
        xSliderOutputFormat: KnockoutObservable<string[]>;
        /**
         * Specify the axis label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be transformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        displayLabelFormatter: KnockoutObservable<string>;
        /**
         * Specify the axis xSlider label formatter which will be used to display the axis values.
         * By default the format string is "{0}".
         * Number values will be represented with specified numeric precision and can be tranformed to string with a formatter to represent say units.
         * String values can be transformed to a different label value using the formatter.
         * Date values will be transformed to the specified outputDateFormat.
         */
        xSliderCalloutDisplayFormatter: KnockoutObservableBase<string>;
        /**
         * Optionally specify the minimum value for the axis domain.
         */
        min: KnockoutObservable<T>;
        /**
         * Optionally specify the maximum value for the axis domain.
         */
        max: KnockoutObservable<T>;
        /**
         * Specify the unit of the axis.
         */
        unit: KnockoutObservable<UnitConversion.Unit>;
        constructor(position?: AxisPosition, scale?: Scale);
    }
    /**
     * Defines a contract for spans such as time spans or number spans. It is used to provide a uniform subtraction operation for numbers and for dates used in uniform series.
     */
    interface SpanContract<T> {
    }
    /**
     * Defines the date span used for subtraction date/time intervals from dates.
     */
    class DateSpan implements SpanContract<Date> {
        /**
         * The number of years in the span.
         */
        years: number;
        /**
         * The number of months in the span.
         */
        months: number;
        /**
         * The number of days in the span.
         */
        days: number;
        /**
         * The number of hours in the span.
         */
        hours: number;
        /**
         * The number of minutes in the span.
         */
        minutes: number;
        /**
         * The number of seconds in the span.
         */
        seconds: number;
        /**
         * The number of milliseconds in the span.
         */
        milliseconds: number;
        /**
         * Creates a new instance of the DateSpan.
         *
         * @param years The number of years in the span.
         * @param months The number of months in the span.
         * @param days The number of dates in the span.
         * @param hours The number of hours in the span.
         * @param minutes The number of minutes in the span.
         * @param seconds The number of seconds in the span.
         * @param milliseconds The number of milliseconds in the span.
         */
        constructor(years: number, months: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
    }
    /**
     * Defines the date span used for subtraction numbers from numbers. Need to provide a uniform interface of setting spans at uniform series.
     */
    class NumberSpan implements SpanContract<number> {
        /**
         * The span value.
         */
        value: number;
        /**
         * Creates a new instance of the NumberSpan.
         *
         * @param value The span value.
         */
        constructor(value: number);
    }
    /**
     * This base class defines the chart input data for a single series and its associated axis.
     */
    interface SeriesBaseContract {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The name of the series.
         */
        name: KnockoutObservable<string>;
    }
    /**
     * This base class defines the chart input data for a single series and its associated axis.
     */
    class SeriesBase implements SeriesBaseContract {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The name of the series.
         */
        name: KnockoutObservable<string>;
    }
    /**
     * This interface defines the chart input data for a single series and its associated axis.
     */
    interface SeriesContract<TX, TY> extends SeriesBaseContract {
        /**
         * The data source for the chart.
         */
        values: KnockoutObservableArray<ChartItem<TX, TY>>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a single series and its associated axis.
     */
    class Series<TX, TY> extends SeriesBase implements SeriesContract<TX, TY> {
        /**
         * The data source for the chart.
         */
        values: KnockoutObservableArray<ChartItem<TX, TY>>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a single uniform series and its associated axis.
     */
    interface UniformSeriesContract<TX, TY> extends SeriesBase {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The start (smallest) x-value of the series.
         */
        startXValue: KnockoutObservable<TX>;
        /**
         * The span between two x neighbor x values. It is a number if TX is number and a number of milliseconds is TX is DateTime.
         */
        span: KnockoutObservable<SpanContract<TX>>;
        /**
         * The array of y-values.
         */
        yValues: KnockoutObservableArray<TY>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a single uniform series and its associated axis.
     */
    class UniformSeries<TX, TY> extends SeriesBase implements UniformSeriesContract<TX, TY> {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The start (smallest) x-value of the series.
         */
        startXValue: KnockoutObservable<TX>;
        /**
         * The span between two x neighbor x values. It is a number if TX is number and a number of milliseconds is TX is DateTime.
         */
        span: KnockoutObservable<SpanContract<TX>>;
        /**
         * The array of y-values.
         */
        yValues: KnockoutObservableArray<TY>;
        /**
         * Name of X-axis associated with the data series' xValue.
         */
        xAxisName: KnockoutObservable<string>;
        /**
         * Name of Y-axis associated with the data series' yValue.
         */
        yAxisName: KnockoutObservable<string>;
    }
    /**
     * This interface defines the chart input data for a line series and its associated axis.
     */
    interface LineSeriesContract<T> extends SeriesBase {
        /**
         * The data source for the line.
         */
        value: KnockoutObservable<T>;
        /**
         * Name of axis associated with the data series' value.
         */
        axisName: KnockoutObservable<string>;
    }
    /**
     * This class defines the chart input data for a line series and its associated axis.
     */
    class LineSeries<T> extends SeriesBase implements LineSeriesContract<T> {
        /**
         * The type of the series.
         */
        type: KnockoutObservable<SeriesType>;
        /**
         * The data source for the line.
         */
        value: KnockoutObservable<T>;
        /**
         * Name of axis associated with the data series' value.
         */
        axisName: KnockoutObservable<string>;
    }
    /**
    * Specifies a chart item selection within a metric.
    */
    interface MetricRuleContract {
        /**
         * Specifies the scope of the rule.
         */
        scope: KnockoutObservable<MetricRuleScope>;
        /**
         * Specifies the scope series of the rule. If nothing specified, looks for a (single) series specified.
         */
        scopeSeriesName: KnockoutObservable<string>;
        /**
         * Specifies a list of metrics to be generated if the rule condition is met.
         */
        metrics: KnockoutObservableArray<MetricRuleMetricContract>;
    }
    interface MetricRuleMetricContract {
        /**
         * Specifies the aggregation scope of the rule.
         */
        aggregationScope: KnockoutObservable<MetricRuleAggregationScope>;
        /**
         * Specifies the aggregation of the rule.
         */
        aggregationType: KnockoutObservable<MetricRuleAggregationType>;
        /**
         * Specifies the aggregation series name of the rule. This is applied only if the aggregation scope is SingleSeries.
         */
        aggregationSeriesName: KnockoutObservable<string>;
        /**
         * Specifies if the bar color should be displayed or not.
         */
        showBarColor: KnockoutObservable<boolean>;
        /**
         * Specifies the color code of the rule. If nothing is specified, tries to get the color code from the current aggregation series.
         */
        colorCode: KnockoutObservable<string>;
        /**
         * Specifies the hatching pattern of the rule. If nothing is specified, tries to get the hatching pattern from the current aggregation series.
         */
        hatchingPattern: KnockoutObservable<AreaHatchingPattern>;
        /**
         * Specifies the output formatter of the rule.
         */
        outputFormat: KnockoutObservable<string>;
        /**
         * Specifies the metric title of the rule.
         */
        title: KnockoutObservable<string>;
        /**
         * Specifies the metric unit of the rule.
         */
        unit: KnockoutObservable<string>;
        /**
         * Specifies the value of the metric if the custom value option is chosen for aggregation.
         */
        customValue: KnockoutObservable<string>;
        /**
         * The default info balloon of the metric rule.
         */
        defaultInfoBalloon?: KnockoutObservable<MsPortalFx.ViewModels.Controls.DockedBalloon.ViewModel>;
    }
    /**
    * Specifies a chart item selection within a metric.
    */
    class MetricRule implements MetricRuleContract {
        /**
         * Specifies the scope of the rule.
         */
        scope: KnockoutObservable<MetricRuleScope>;
        /**
         * Specifies the scope series of the rule. If nothing specified, looks for a (single) series specified.
         */
        scopeSeriesName: KnockoutObservable<string>;
        /**
         * Specifies a list of metrics to be generated if the rule condition is met.
         */
        metrics: KnockoutObservableArray<MetricRuleMetricContract>;
    }
    class MetricRuleMetric implements MetricRuleMetricContract {
        /**
         * Specifies the aggregation scope of the rule.
         */
        aggregationScope: KnockoutObservable<MetricRuleAggregationScope>;
        /**
         * Specifies the aggregation of the rule.
         */
        aggregationType: KnockoutObservable<MetricRuleAggregationType>;
        /**
         * Specifies the aggregation series name of the rule. This is applied only if the aggregation scope is SingleSeries.
         */
        aggregationSeriesName: KnockoutObservable<string>;
        /**
         * Specifies if the bar color should be displayed or not.
         */
        showBarColor: KnockoutObservable<boolean>;
        /**
         * Specifies the color code of the rule. If nothing is specified, tries to get the color code from the current aggregation series.
         */
        colorCode: KnockoutObservable<string>;
        /**
         * Specifies the hatching pattern of the rule. If nothing is specified, tries to get the hatching pattern from the current aggregation series.
         */
        hatchingPattern: KnockoutObservable<AreaHatchingPattern>;
        /**
         * Specifies the output formatter of the rule.
         */
        outputFormat: KnockoutObservable<string>;
        /**
         * Specifies the metric title of the rule.
         */
        title: KnockoutObservable<string>;
        /**
         * Specifies the metric unit of the rule.
         */
        unit: KnockoutObservable<string>;
        /**
         * Specifies the value of the metric if the custom value option is chosen for aggregation.
         */
        customValue: KnockoutObservable<string>;
        /**
         * The info balloon of the setting.
         */
        defaultInfoBalloon: KnockoutObservable<DockedBalloon.ViewModel>;
    }
    /**
     * Identifies a series.
     */
    interface SeriesIdContract {
        /**
         * Specifies the view index.
         */
        chartViewIndex: KnockoutObservable<number>;
        /**
         * Specifies the series view index.
         */
        seriesViewIndex: KnockoutObservable<number>;
    }
    /**
     * Identifies a series.
    */
    class SeriesId implements SeriesIdContract {
        /**
         * Specifies the view index.
         */
        chartViewIndex: KnockoutObservable<number>;
        /**
         * Specifies the series view index.
         */
        seriesViewIndex: KnockoutObservable<number>;
    }
    /**
     * Specifies a chart item selection within a series.
     */
    interface SeriesSubsetContract<TX, TY> extends SeriesId {
        /**
         * Specifies an array of chart items selected.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
    }
    /**
     * Specifies a chart item selection within a series.
     */
    class SeriesSubset<TX, TY> extends SeriesId implements SeriesSubsetContract<TX, TY> {
        /**
         * Specifies an array of chart items selected.
         */
        chartItems: KnockoutObservableArray<ChartItem<TX, TY>>;
    }
    /**
     * Chart Event call back.
     *
     * @param x The number of x coordinate
     * @param y The number of y coordinate.
     */
    interface ChartEventCallBack {
        (x?: number, y?: number): void;
    }
    /**
     * Defines the default event notification supported by the chart.
     * Line and bar chart can provide additional events by extending the base events.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    interface EventsContract<TX, TY> {
        /**
         * MouseEnter on the plot area.
         */
        plotAreaMouseEnter: ChartEventCallBack;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaMouseLeave: ChartEventCallBack;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaClick: ChartEventCallBack;
    }
    /**
     * Defines the default event notification supported by the chart.
     * Line and bar chart can provide additional events by extending the base events.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class Events<TX, TY> implements EventsContract<TX, TY> {
        /**
         * MouseEnter on the plot area.
         */
        plotAreaMouseEnter: ChartEventCallBack;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaMouseLeave: ChartEventCallBack;
        /**
         * MouseLeave on the plot area.
         */
        plotAreaClick: ChartEventCallBack;
    }
    /**
     * Defines the event notification supported by line / area / scatter plot charts.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    interface SeriesChartEventsContract<TX, TY> {
        /**
         * Click on a point.
         */
        pointClick: (data: EventData<TX, TY>) => any;
        /**
         * MouseEnter on a point.
         */
        pointMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a point.
         */
        pointMouseLeave: (data: EventData<TX, TY>) => any;
        /**
         * Click on a series.
         */
        seriesClick: (data: EventData<TX, TY>) => any;
        /**
         * MouseEnter on a series.
         */
        seriesMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a series.
         */
        seriesMouseLeave: (data: EventData<TX, TY>) => any;
    }
    /**
     * Defines the event notification supported by line / area / scatter plot charts.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class SeriesChartEvents<TX, TY> implements SeriesChartEventsContract<TX, TY> {
        /**
          * Click on a point.
          */
        pointClick: (data: EventData<TX, TY>) => any;
        /**
         * MouseEnter on a point.
         */
        pointMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a point.
         */
        pointMouseLeave: (data: EventData<TX, TY>) => any;
        /**
         * Click on a series.
         */
        seriesClick: (data: EventData<TX, TY>) => any;
        /**
         * MouseEnter on a series.
         */
        seriesMouseEnter: (data: EventData<TX, TY>) => any;
        /**
         * MouseLeave on a series.
         */
        seriesMouseLeave: (data: MsPortalFx.ViewModels.Controls.Visualization.Chart.EventData<TX, TY>) => any;
    }
    /**
     * Defines the event notification supported by bar chart.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    interface BarChartEventsContract<TX, TY> {
        /**
         * Click on a bar.
         */
        barClick: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseEnter on a bar.
         */
        barMouseEnter: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseLeave on a bar.
         */
        barMouseLeave: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
    }
    /**
     * Defines the event notification supported by bar chart.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class BarChartEvents<TX, TY> implements BarChartEventsContract<TX, TY> {
        /**
         * Click on a bar.
         */
        barClick: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseEnter on a bar.
         */
        barMouseEnter: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
        /**
         * MouseLeave on a bar.
         */
        barMouseLeave: (eventData: EventData<TX, TY>, allBarsEventData?: EventData<TX, TY>[]) => any;
    }
    /**
     * Specifies the condition used on rendering a series view.
     */
    interface RenderingConditionContract {
        /**
         * The name of the series to be compared with.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The condition operator.
         */
        conditionOperator: KnockoutObservable<ConditionOperator>;
        /**
         * The interpolation for the series.
         */
        interpolation: KnockoutObservable<Interpolation>;
    }
    /**
     * Specifies the condition used on rendering a series view.
     */
    class RenderingCondition implements RenderingConditionContract {
        /**
         * The name of the series to be compared with.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The condition operator.
         */
        conditionOperator: KnockoutObservable<ConditionOperator>;
        /**
         * The interpolation for the series.
         */
        interpolation: KnockoutObservable<Interpolation>;
    }
    /**
     * This base interface defines the how a series should be rendered on the chart.
     */
    interface SeriesViewContract<TX, TY> {
        /**
         * The name of the series.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The display name of the series.
         */
        displayName: KnockoutObservable<string>;
        /**
         * The name of the "CSS" class for the series.
         */
        cssClass: KnockoutObservable<string>;
        /**
         * Data labels for the series.
         */
        dataLabels: KnockoutObservableArray<DataLabelContract<TX, TY>>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
        /**
         * Specify the display formatter to show the value in the tooltip.
         * Formatter by default will add the x, y value and the associated series name. Eg, "Series: '{0}' Point: {1} Value: {2}".
         * The default formatter is borrowed from Microsoft Excel and seems to be valuable.
         * {0} will be populated with the series name.
         * {1} will be populated with the x value.
         * {2} will be populated the y value.
         */
        tooltipFormatter: KnockoutObservable<string>;
        /**
         * Specifies an array of rendering conditions to be checked for rendering the view.
         */
        renderingConditions: KnockoutObservableArray<RenderingConditionContract>;
        /**
         * Indicates if the series is selectable.
         */
        selectable: KnockoutObservable<boolean>;
        /**
         * Indicates if the series is hidden from the legend.
         */
        hideFromLegend: KnockoutObservable<boolean>;
    }
    /**
     * This base class defines the how a series should be rendered on the chart.
     */
    class SeriesView<TX, TY> implements SeriesViewContract<TX, TY> {
        /**
         * The name of the series.
         */
        seriesName: KnockoutObservable<string>;
        /**
         * The display name of the series.
         */
        displayName: KnockoutObservable<string>;
        /**
         * The name of the "CSS" class for the series.
         */
        cssClass: KnockoutObservable<string>;
        /**
         * Data labels for the series.
         */
        dataLabels: KnockoutObservableArray<DataLabel<TX, TY>>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
        /**
         * Specify the display formatter to show the value in the tooltip.
         * Formatter by default will add the x, y value and the associated series name. Eg, "Series: '{0}' Point: {1} Value: {2}".
         * The default formatter is borrowed from Microsoft Excel and seems to be valuable.
         * {0} will be populated with the series name.
         * {1} will be populated with the x value.
         * {2} will be populated the y value.
         */
        tooltipFormatter: KnockoutObservable<string>;
        /**
         * Specifies an array of rendering conditions to be checked for rendering the view.
         */
        renderingConditions: KnockoutObservableArray<RenderingCondition>;
        /**
         * Indicates if the series is selectable.
         */
        selectable: KnockoutObservable<boolean>;
        /**
         * Indicates if the series is hoverable.
         */
        hoverable: KnockoutObservable<boolean>;
        /**
         * Indicates if the series is hidden from the legend
         */
        hideFromLegend: KnockoutObservable<boolean>;
    }
    /**
     * This interface defines the how a line chart series should be rendered on the chart.
     */
    interface LineChartSeriesViewContract<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the line type for the series in the current view.
         */
        lineStyle: KnockoutObservable<LineStyle>;
        /**
         * Optionally show a circle for the data point.
         */
        showDataPoints: KnockoutObservable<boolean>;
    }
    /**
     * This class defines the how a line chart series should be rendered on the chart.
     */
    class LineChartSeriesView<TX, TY> extends SeriesView<TX, TY> implements LineChartSeriesViewContract<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the line type for the series in the current view.
         */
        lineStyle: KnockoutObservable<LineStyle>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
        /**
         * Optionally show a circle for the data point.
         */
        showDataPoints: KnockoutObservable<boolean>;
    }
    /**
      * This base interface defines the how an area chart series should be rendered on the chart.
      */
    interface AreaChartSeriesViewContract<TX, TY> extends SeriesViewContract<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the hatching pattern type for the series in the current view.
         */
        areaHatchingPattern: KnockoutObservable<AreaHatchingPattern>;
    }
    /**
      * This base class defines the how an area chart series should be rendered on the chart.
      */
    class AreaChartSeriesView<TX, TY> extends SeriesView<TX, TY> implements AreaChartSeriesViewContract<TX, TY> {
        /**
         * Defines the interpolation type for the series in the current view.
         */
        interpolation: KnockoutObservable<Interpolation>;
        /**
         * Defines the hatching pattern type for the series in the current view.
         */
        areaHatchingPattern: KnockoutObservable<AreaHatchingPattern>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
    }
    /**
     * This base class defines the how a stacked area chart series should be rendered on the chart.
     */
    class StackedAreaChartSeriesView<TX, TY> extends AreaChartSeriesView<TX, TY> {
    }
    /**
     * This base interface defines the how a scatter chart series should be rendered on the chart.
     */
    interface ScatterChartSeriesViewContract<TX, TY> extends SeriesViewContract<TX, TY> {
        /**
         * Defines the radius of circles.
         */
        radius: KnockoutObservable<number>;
    }
    /**
     * This base class defines the how a scatter chart series should be rendered on the chart.
     */
    class ScatterChartSeriesView<TX, TY> extends SeriesView<TX, TY> implements ScatterChartSeriesViewContract<TX, TY> {
        /**
         * Defines the radius of circles.
         */
        radius: KnockoutObservable<number>;
        /**
         * Optionally show a tooltip box on mouse hover over the data point.
         */
        showTooltip: KnockoutObservable<boolean>;
    }
    /**
     * This interface defines the how a chart view should be rendered on the chart.
     */
    interface ViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<SeriesView<TX, TY>>;
    }
    /**
     * This class defines the how a chart view should be rendered on the chart.
     */
    class View<TX, TY> implements ViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<SeriesView<TX, TY>>;
    }
    /**
     * This interface defines the how a line chart view should be rendered on the chart.
     */
    interface LineChartViewContract<TX, TY> extends ViewContract<TX, TY> {
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<LineChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEventsContract<TX, TY>;
    }
    /**
     * This class defines the how a line chart view should be rendered on the chart.
     */
    class LineChartView<TX, TY> extends View<TX, TY> implements LineChartViewContract<TX, TY> {
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<LineChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    /**
     * This interface defines the how an area chart view should be rendered on the chart.
     */
    interface AreaChartViewContract<TX, TY> extends ViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<AreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEventsContract<TX, TY>;
    }
    /**
     * This interface defines the how an area chart view should be rendered on the chart.
     */
    class AreaChartView<TX, TY> extends View<TX, TY> implements AreaChartViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<AreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    interface StackedChartViewContract<TX, TY> extends View<TX, TY> {
        /**
         * When enabled, the series data can be of varying length.
         * Enabling this option will involve multiple data transformation to fill in missing values for stacking bars.
         * Disable this option to speed up rendering if all data series have the same xValues.
         */
        enableSparseSeries: KnockoutObservable<boolean>;
    }
    class StackedChartView<TX, TY> implements StackedChartViewContract<TX, TY> {
        /**
         * When enabled, the series data can be of varying length.
         * Enabling this option will involve multiple data transformation to fill in missing values for stacking bars.
         * Disable this option to speed up rendering if all data series have the same xValues.
         */
        enableSparseSeries: KnockoutObservable<boolean>;
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<any>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<SeriesView<TX, TY>>;
    }
    interface StackedAreaChartViewContract<TX, TY> extends StackedChartViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<StackedAreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
        /**
         * Whether to show StackedLine charts for the StackedArea charts.
         */
        lineState: KnockoutObservableBase<LineState>;
    }
    class StackedAreaChartView<TX, TY> implements StackedAreaChartViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<StackedAreaChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
        /**
         * Whether to show stacked lines for the stacked areas.
         */
        lineState: KnockoutObservable<LineState>;
        /**
         * When enabled, the series data can be of varying length.
         * Enabling this option will involve multiple data transformation to fill in missing values for stacking bars.
         * Disable this option to speed up rendering if all data series have the same xValues.
         */
        enableSparseSeries: KnockoutObservable<boolean>;
    }
    /**
     * This interface defines the how a scatter chart view should be rendered on the chart.
     */
    interface ScatterChartViewContract<TX, TY> extends ViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<ScatterChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEventsContract<TX, TY>;
    }
    /**
     * This class defines the how a scatter chart view should be rendered on the chart.
     */
    class ScatterChartView<TX, TY> extends View<TX, TY> implements ScatterChartViewContract<TX, TY> {
        /**
         * Specify the chart type for this view.
         */
        chartType: KnockoutObservable<ChartType>;
        /**
         * The current view spans over multiple series specified in this array.
         */
        seriesView: KnockoutObservableArray<ScatterChartSeriesView<TX, TY>>;
        /**
         * Specify the event handlers for this view.
         */
        events: SeriesChartEvents<TX, TY>;
    }
    /**
     * This interface defines the how a bar chart view should be rendered on the chart.
     */
    interface BarChartViewContract<TX, TY> extends StackedChartViewContract<TX, TY> {
        /**
         * A padding ratio which is relative to bar size. The ratio will be used as padding between two bars.
         */
        barPaddingRatio: KnockoutObservable<number>;
        /**
         * Defines the type of bar chart that needs to be rendered.
        */
        barChartType: KnockoutObservable<BarChartType>;
        /**
         * The span for the x-axis.
         */
        xAxisSpan: KnockoutObservable<SpanContract<TX>>;
        /**
         * Specify the event handlers for this view.
         */
        events: BarChartEventsContract<TX, TY>;
    }
    /**
     * This class defines the how a bar chart view should be rendered on the chart.
     */
    class BarChartView<TX, TY> extends View<TX, TY> implements BarChartViewContract<TX, TY> {
        /**
         * A padding ratio which is relative to bar size. The ratio will be used as padding between two bars.
         */
        barPaddingRatio: KnockoutObservable<number>;
        /**
         * When enabled, the series data can be of varying length.
         * Enabling this option will involve multiple data transformation to fill in missing values for stacking bars.
         * Disable this option to speed up rendering if all data series have the same xValues.
         */
        enableSparseSeries: KnockoutObservable<boolean>;
        /**
         * Defines the type of bar chart that needs to be rendered.
        */
        barChartType: KnockoutObservable<BarChartType>;
        /**
         * The span for the x-axis.
         */
        xAxisSpan: KnockoutObservable<SpanContract<TX>>;
        /**
         * Specify the event handlers for this view.
         */
        events: BarChartEvents<TX, TY>;
        constructor(barChartType: BarChartType);
    }
    /**
     * This interface defines a single data point for the chart.
     */
    interface ChartItemContract<TX, TY> {
        /**
         * The X value for an item.
         */
        xValue: TX;
        /**
         * The Y values for an item for all series.
         */
        yValue: TY;
    }
    /**
     * This class defines a single data point for the chart.
     */
    class ChartItem<TX, TY> implements ChartItemContract<TX, TY> {
        /**
         * The X value for an item.
         */
        xValue: TX;
        /**
         * The Y values for an item for all series.
         */
        yValue: TY;
        constructor(xValue: TX, yValue: TY);
    }
    /**
     * This class defines the input data for the chart, axes and its properties.
     */
    interface Contract<TX, TY> extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * The title of the chart.
         */
        title: KnockoutObservable<string>;
        /**
         * Optionally show the title of the chart.
         * The property is temporary ignored.
         */
        showTitle: KnockoutObservable<boolean>;
        /**
         * The width of the chart. If width is 0 then the chart will pick up container's width.
         */
        width: KnockoutObservable<number>;
        /**
         * The height of the chart. If height is 0 then the chart will pick up container's height.
         */
        height: KnockoutObservable<number>;
        /**
         * The message to display when there is no chart data.
         */
        noDataMessage: string;
        /**
         * Provide an array of data series.
         */
        series: KnockoutObservableArray<SeriesBaseContract>;
        /**
         * The X-axis of the chart. This will be the primary X-axis for the chart.
         */
        xAxis: Axis<TX>;
        /**
         * The Y-axis of the chart. This will be the primary Y-axis for the chart.
         */
        yAxis: Axis<TY>;
        /**
         * An array of secondary X-axis that can be optionally disabled.
         */
        secondaryXAxes: KnockoutObservableArray<AxisContract<TX>>;
        /**
         * An array of secondary Y-axis that can be optionally disabled.
         */
        secondaryYAxes: KnockoutObservableArray<AxisContract<TY>>;
        /**
         * An array of views that should be rendered on the chart.
         */
        views: KnockoutObservableArray<ViewContract<TX, TY>>;
        /**
         * The position where the legend should be placed. None option will not display the legend.
         */
        legendPosition: KnockoutObservable<LegendPosition>;
        /**
         * the interaction behavior
         */
        interactionBehavior: KnockoutObservable<InteractionBehavior>;
        /**
         * A value indicating whether or not to auto generate SeriesViews when there is no SeriesViews provided
         */
        autogenerateSeriesViews: KnockoutObservableBase<boolean>;
        /**
         * Events supported by the control.
         */
        events: EventsContract<TX, TY>;
        /**
         * Metrics used by the control.
         */
        metrics: MsPortalFx.ViewModels.Controls.Visualization.Metrics.Contract;
        /**
         * Specifies selections on the chart.
         */
        seriesSelections: KnockoutObservableArray<SeriesSubsetContract<TX, TY>>;
        /**
         * Specifies all the items related to hover on the chart.
         */
        seriesHovers: KnockoutObservableArray<SeriesSubsetContract<TX, TY>>;
        /**
         * Specifies the items being hovered on the chart.
         */
        hoveredID: KnockoutObservableArray<SeriesIdContract>;
        /**
         * Metric rules used by the control
         */
        metricsRules: KnockoutObservableArray<MetricRule>;
        /**
 * Enable Track XSlider coordination.
 */
        enableTrackXSlider: KnockoutObservableBase<boolean>;
        /**
         * If enableTrackXSlider() is true, the xSliderCoordinate is reported in this variable.
         */
        xSliderCoordinate: KnockoutObservableBase<number>;
        /**
         * If xSlider is enabled, Distance from the nearest datapoint in your chart that will trigger the hover animation as a ratio (xSliderFilterHover) of the width of the chart.
         * For example, .05 means that the distance between the selected chartData can't be bigger than 0.05 * width of the chart.
         * This number can't be bigger than .5 or less than 0.  It will fall back to default behavior.
         */
        xSliderFilterHoverThreshold: KnockoutObservableBase<number>;
    }
    /**
     * This class defines the input data for the chart, axes and its properties.
     */
    class ViewModel<TX, TY> extends Loadable.ViewModel implements Contract<TX, TY> {
        /**
         * The title of the chart.
         */
        title: KnockoutObservable<string>;
        /**
         * Optionally show the title of the chart.
         * The property is temporary ignored.
         */
        showTitle: KnockoutObservable<boolean>;
        /**
         * The width of the chart.
         */
        width: KnockoutObservable<number>;
        /**
         * The height of the chart.
         */
        height: KnockoutObservable<number>;
        /**
         * The message to display when there is no chart data.
         */
        noDataMessage: string;
        /**
         * Provide an array of data series.
         */
        series: KnockoutObservableArray<SeriesBase>;
        /**
         * The X-axis of the chart. This will be the primary X-axis for the chart.
         */
        xAxis: Axis<TX>;
        /**
         * The Y-axis of the chart. This will be the primary Y-axis for the chart.
         */
        yAxis: Axis<TY>;
        /**
         * An array of secondary X-axis that can be optionally disabled.
         */
        secondaryXAxes: KnockoutObservableArray<Axis<TX>>;
        /**
         * An array of secondary Y-axis that can be optionally disabled.
         */
        secondaryYAxes: KnockoutObservableArray<Axis<TY>>;
        /**
         * An array of views that should be rendered on the chart.
         */
        views: KnockoutObservableArray<View<TX, TY>>;
        /**
         * The position where the legend should be placed. None option will not display the legend.
         */
        legendPosition: KnockoutObservable<LegendPosition>;
        /**
         * the interaction behavior
         */
        interactionBehavior: KnockoutObservable<InteractionBehavior>;
        /**
         * A value indicating whether or not to auto generate SeriesViews when there is no SeriesViews provided
         */
        autogenerateSeriesViews: KnockoutObservableBase<boolean>;
        /**
         * Events supported by the control.
         */
        events: Events<TX, TY>;
        /**
         * Metrics used by the control
         */
        metrics: MsPortalFx.ViewModels.Controls.Visualization.Metrics.ViewModel;
        /**
         * Specifies selections on the chart.
         */
        seriesSelections: KnockoutObservableArray<SeriesSubset<TX, TY>>;
        /**
         * Specifies all the items related to hover on the chart.
         */
        seriesHovers: KnockoutObservableArray<SeriesSubset<TX, TY>>;
        /**
         * Specifies the item being hovered on the chart.
         */
        hoveredID: KnockoutObservableArray<SeriesId>;
        /**
         * Metric rules used by the control.
         */
        metricsRules: KnockoutObservableArray<MetricRule>;
        /**
         * Enable Track XSlider coordination.
         */
        enableTrackXSlider: KnockoutObservableBase<boolean>;
        /**
         * If enableTrackXSlider() is true, the xSliderCoordinate is reported in this variable.
         */
        xSliderCoordinate: KnockoutObservableBase<number>;
        /**
         * If xSlider is enabled, Distance from the nearest datapoint in your chart that will trigger the hover animation as a ratio (xSliderFilterHover) of the width of the chart.
         * For example, .05 means that the distance between the selected chartData can't be bigger than 0.05 * width of the chart.
         * This number can't be bigger than .5 or less than 0.  It will fall back to default behavior.
         */
        xSliderFilterHoverThreshold: KnockoutObservableBase<number>;
        static defaultYAxisLabelPadding: number;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.CsmTopology {
    /**
     * Overflow node Ids used for selection.
     */
    var RelatedBandOverflowId: string;
    var DependantBandOverflowId: string;
    var InternalBandOverflowId: string;
    var LinkedBandOverflowId: string;
    var SmallSizeOverflowId: string;
    /**
     * Supported sizes for the topology control.
     */
    enum Size {
        /**
         * Small or medium icon size will be used to support 4 x 2 part.
         */
        Small = 0,
        /**
         * Medium or large icon size will be used to support HeroWide part.
         */
        Large = 1,
    }
    /**
     * Resource type enumeration to associate a resource icon for each resource.
     */
    enum ResourceIconType {
        /**
         * Internal type for representing empty placeholder nodes.
         */
        None = 0,
        /**
         * A default resource type which will be represented with default resource icon.
         */
        Default = 1,
        /**
         * Internal type for representing information.
         */
        Info = 2,
        /**
         * Internal type for representing overflow icon.
         */
        Overflow = 3,
        /**
         * Represents a new resource whose icon uri's will be provided by the user.
         */
        Resource = 4,
        /**
         * Represents a resource group.
         */
        ResourceGroup = 5,
        /**
         * Represents website resource.
         */
        Website = 6,
        /**
         * Represents scale group resource.
         */
        ScaleGroup = 7,
        /**
         * Represents sites resource.
         */
        Sites = 8,
        /**
         * Represents database server resource.
         */
        DatabaseServer = 9,
        /**
         * Represents database resource.
         */
        Database = 10,
        /**
         * Represents TFS project resource.
         */
        TFSProject = 11,
        /**
         * Represents TFS account resource.
         */
        TFSAccount = 12,
        /**
         * Represents virtual machine resource.
         */
        VirtualMachine = 13,
        /**
         * Represents nics resource.
         */
        Disks = 14,
        /**
         * Represents nics resource.
         */
        Nics = 15,
        /**
         * Represents IP address resource.
         */
        IPAddress = 16,
        /**
         * Represents availability set resource.
         */
        AvailabilitySet = 17,
        /**
         * Represents AD account resource.
         */
        ADAccount = 18,
    }
    /**
     * Enumeration to specify the logical topology layout band for a resource.
     */
    enum ResourceBand {
        /**
         * Empty placeholder.
         */
        None = 0,
        /**
         * Resource belongs to first topology layout band.
         */
        ResourceGroup = 1,
        /**
         * Resource belongs to second topology layout band.
         */
        Related = 2,
        /**
         * Resource belongs to third topology layout band.
         */
        Dependant = 3,
        /**
         * Resource belongs to fourth topology layout band.
         */
        Internal = 4,
        /**
         * Resource belongs to fifth topology layout band.
         */
        Linked = 5,
    }
    /**
     * Enum to indicate the current resource status.
     */
    enum ResourceStatus {
        /**
         * Resource status is being fetched.
         */
        None = 0,
        /**
         * Resource is available.
         */
        Success = 1,
        /**
         * Resource has encountered a non fatal errors.
         */
        Warning = 2,
        /**
         * Resource has encountered a fatal errors.
         */
        Error = 3,
        /**
         * Resource has additional information about its current status.
         */
        Information = 4,
        /**
         * Resource provider or service is stopped.
         */
        Stopped = 5,
    }
    /**
     * Resource selection item contract.
     * The serialized information about current resource selection should implement this interface.
     */
    interface ResourceSelectionItem {
        /**
         * Id of a contract.
         */
        id?: string;
    }
    /**
     * Resource selection item contract.
     * The serialized information about current resource selection should implement this interface.
     */
    interface ResourceSelectionItemContract {
        /**
         * Id of a contract.
         */
        id?: string;
    }
    /**
     * Resource item contract.
     */
    interface ResourceItem {
        /**
         * Name of the current resource.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource.
         */
        id: KnockoutObservable<string>;
        /**
         * Additional information about the resource.
         */
        description: KnockoutObservable<string>;
        /**
         * Specify the resource type.
         */
        type: KnockoutObservable<string>;
    }
    /**
     * Selection option for SelectableSet callbacks.
     */
    interface SelectionOptionContract<TContract extends ResourceSelectionItemContract> {
        /**
         * A function that determines if an item matches a selection.
         *
         * @param item Resource item uniquely identifies a rendered resource.
         * @param selection The selection to match the item to.
         * @return True if the item matches the selection; else false.
         */
        itemMatchesSelection(item: ResourceItem, selection: TContract): boolean;
        /**
         * A factory function that creates a selection based on an item.
         *
         * @param item The resource item for which selection needs to be created.
         * @return The selection for the specified item.
         */
        createSelection(item: ResourceItem): TContract;
        /**
         * Selection state that has been previously saved as part of view state for resource map.
         */
        initialSelection?: MsPortalFx.ViewModels.SetSelection<TContract>;
    }
    /**
     * Right click context menu option.
     */
    interface ContextMenuOption {
        /**
         * The command group.
         */
        commandGroup: string;
        /**
         * The command group owner.
         */
        commandGroupOwner?: string;
    }
    /**
     * Resource hover/click event notification data contract.
     */
    interface EventDataContract {
        /**
         * Name of the current resource.
         */
        name: string;
        /**
         * Unique id of the resource.
         */
        id: string;
        /**
         * Additional information about the resource.
         */
        description: string;
        /**
         * Type of the current resource.
         */
        type: string;
        /**
         * Icon type of the current resource.
         */
        iconType: ResourceIconType;
        /**
         * Number of resources of the given type.
         */
        count: number;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: string;
        /**
         * Current resource status.
         */
        status: ResourceStatus;
        /**
         * Additional information about the current status.
         */
        statusMessage: string;
    }
    /**
     * Resource overflow event notification data contract.
     */
    interface ResourceOverflowEventDataContract {
        /**
         * For Resource view, the name of the current resource in focus will be shown.
         */
        name: string;
        /**
         * For Resource view, the id of the current resource in focus will be shown.
         */
        id: string;
        /**
         * Resource group name of the current resource in focus.
         */
        resourceGroupName: string;
        /**
         * For Resource view, the type of the current resource in focus will be shown.
         */
        type: string;
        /**
         * For Resource view, the icon type of the current resource in focus will be shown.
         */
        iconType: ResourceIconType;
        /**
         * Indicates the layout band of overflow resources that needs to be shown.
         */
        resourceBand: ResourceBand;
    }
    /**
     * Widget view model contract.
     */
    interface Contract<TContract extends ResourceSelectionItemContract> extends Loadable.Contract {
        /**
         * Specify the resource group information.
         */
        resourceGroup: KnockoutObservable<ResourceGroup>;
        /**
         * Specify whether resource group view or resource view should be displayed.
         */
        showResourceView: KnockoutObservable<boolean>;
        /**
         * Specify the primary resource in focus.
         */
        resourceInFocus: KnockoutObservable<string>;
        /**
         * Specify SelectableSet to associate resource selection and its associated blades.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<ResourceItem, TContract>;
        /**
         * Internal representation of the resource items for SelectableSet.
         * The items array is populated by merging all resources in each resource band and / or overflow nodes.
         */
        items: KnockoutObservableArray<ResourceItem>;
        /**
         * Optional context menu option specifing the command group to show on right click context menu.
         */
        contextMenuOption?: ContextMenuOption;
        /**
         * Specify the size of the topology control. The size property will determine the icon size for the resources.
         */
        size: KnockoutObservable<Size>;
        /**
         * Specify the width of the topology chart.
         */
        width: KnockoutObservable<number>;
        /**
         * Specify the height of the topology chart.
         */
        height: KnockoutObservable<number>;
        /**
         * Specify the event handlers for the topology chart.
         */
        events: Events;
    }
    /**
     * Abstraction for CSM Resource.
     */
    class Resource implements ResourceItem {
        /**
         * Name of the current resource.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource.
         */
        id: KnockoutObservable<string>;
        /**
         * Additional information about the resource.
         */
        description: KnockoutObservable<string>;
        /**
         * Optionally specify an external uri. If a value is provided the description will be treated as a link.
         */
        descriptionUri: KnockoutObservable<string>;
        /**
         * Specify the resource type.
         */
        type: KnockoutObservable<string>;
        /**
         * Type of the current resource.
         */
        iconType: KnockoutObservable<ResourceIconType>;
        /**
         * Number of resources of the given type.
         */
        count: KnockoutObservable<number>;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: KnockoutObservable<string>;
        /**
         * Current resource status.
         */
        status: KnockoutObservable<ResourceStatus>;
        /**
         * Additional information about the current status.
         */
        statusMessage: KnockoutObservable<string>;
        /**
         * Related resources belonging to the same resource group and same resource provider.
         */
        relatedResources: KnockoutObservableArray<Resource>;
        /**
         * Nested resources for the current resource.
         */
        dependantResources: KnockoutObservableArray<Resource>;
        /**
         * Sibling resources belonging to the same resource group, internally referenced by current resource and marked as primary resource.
         */
        internalResources: KnockoutObservableArray<Resource>;
        /**
         * Linked resources belonging to the different resource group.
         */
        linkedResources: KnockoutObservableArray<Resource>;
        /**
         * Icon for the resource.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
    }
    /**
     * Specify the properties of a resource group node and its dependant resources.
     */
    class ResourceGroup {
        /**
         * Name of the resource group.
         */
        name: KnockoutObservable<string>;
        /**
         * Unique id of the resource group.
         */
        id: KnockoutObservable<string>;
        /**
         * Optionally specify the type for resource group. The type information is hint for the control to associate a resource group icon and not a CSM type.
         */
        iconType: KnockoutObservable<ResourceIconType>;
        /**
         * Optionally override the default icon for the resource group.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * Nested resources marked as primary resource.
         */
        resources: KnockoutObservableArray<Resource>;
        /**
         * External linked resources which are part of a different resource group and marked as primary resource.
         */
        linkedResources: KnockoutObservableArray<Resource>;
    }
    /**
     * Defines the event notification supported by topology chart.
     * Users should provide a handler for each of the event notification hooks defined here.
     */
    class Events {
        /**
         * Event handler is invoked on click event on the resource icon.
         */
        resourceClick: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on mouseenter event on the resource icon.
         */
        resourceMouseEnter: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on mouseleave event on the resource icon.
         */
        resourceMouseLeave: (eventData: EventDataContract) => void;
        /**
         * Event handler is invoked on click event on the overflow resource icon.
         */
        resourceOverflowClick: (eventData: ResourceOverflowEventDataContract) => void;
        /**
         * Event handler is invoked when control background plot area is clicked.
         */
        plotAreaClick: () => void;
    }
    /**
     * Resource hover/click event notification data.
     */
    class EventData implements EventDataContract {
        /**
         * Name of the current resource.
         */
        name: string;
        /**
         * Unique id of the resource.
         */
        id: string;
        /**
         * Additional information about the resource.
         */
        description: string;
        /**
         * Type of the current resource.
         */
        type: string;
        /**
         * Type of the current resource.
         */
        iconType: ResourceIconType;
        /**
         * Number of resources of the given type.
         */
        count: number;
        /**
         * Resource group name of the current resource.
         */
        resourceGroupName: string;
        /**
         * Current resource status.
         */
        status: ResourceStatus;
        /**
         * Additional information about the current status.
         */
        statusMessage: string;
    }
    /**
     * Resource overflow event notification data.
     * For Resource view, the information about current resource in focus will be shown.
     * For ResourceGroup view, the information about ResourceGroup will be shown.
     */
    class ResourceOverflowEventData implements ResourceOverflowEventDataContract {
        /**
         * For Resource view, the name of the current resource in focus will be shown.
         */
        name: string;
        /**
         * For Resource view, the id of the current resource in focus will be shown.
         */
        id: string;
        /**
         * Resource group name of the current resource in focus.
         */
        resourceGroupName: string;
        /**
         * For Resource view, the type of the current resource in focus will be shown.
         */
        type: string;
        /**
         * For Resource view, the icon type of the current resource in focus will be shown.
         */
        iconType: ResourceIconType;
        /**
         * Indicates the layout band of overflow resources that needs to be shown.
         */
        resourceBand: ResourceBand;
    }
    /**
     * View model properties for the topology control.
     */
    class ViewModel<TContract extends ResourceSelectionItemContract> extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract<TContract> {
        /**
         * Specify the resource group information.
         */
        resourceGroup: KnockoutObservable<ResourceGroup>;
        /**
         * Specify whether resource group view or resource view should be displayed.
         */
        showResourceView: KnockoutObservable<boolean>;
        /**
         * Specify the primary resource in focus.
         */
        resourceInFocus: KnockoutObservable<string>;
        /**
         * SelectableSet to associate resource selection and its associated blades.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<ResourceItem, TContract>;
        /**
         * Internal representation of the resource items for SelectableSet.
         * The items array is populated by merging all resources in each resource band and / or overflow nodes.
         */
        items: KnockoutObservableArray<ResourceItem>;
        /**
         * Optional context menu option specifing the command group to show on right click context menu.
         */
        contextMenuOption: ContextMenuOption;
        /**
         * Specify the size of the topology control. The size property will determine the icon size for the resources.
         */
        size: KnockoutObservable<Size>;
        /**
         * Specify the width of the topology chart.
         */
        width: KnockoutObservable<number>;
        /**
         * Specify the height of the topology chart.
         */
        height: KnockoutObservable<number>;
        /**
         * Specify the event handlers for the topology chart.
         */
        events: Events;
        constructor(selectionOption?: SelectionOptionContract<TContract>);
        /**
         * See interface.
         */
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Donut {
    enum GaugeSize {
        /**
         * Default Automatically adjust size base on current Div size.
         * Currently, it is determind by Min(width, hight).
         * If less than 100px, display QuotaGaugeSize.CenterOnly.
         * else if less than 254px, display QuotaGaugeSize.Small.
         * else display QuotaGaugeSize.Large.
         */
        Auto = 0,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlySmall = 1,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyMedium = 2,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyLarge = 3,
        /**
         * Small 100px square size of donut shape gauge with center.
         */
        Small = 4,
        /**
         * Medium 146px square size of donut shape gauge with center.
         */
        Medium = 5,
        /**
         * MediumLarge 220px square size of donut shape gauge with center.
         */
        MediumLarge = 6,
        /**
         * Small 254px square size of donut shape gauge with center.
         */
        Large = 7,
    }
    /**
    * Item represents a row.
    */
    interface ItemData {
    }
    /**
    * GroupInfo is the ViewModel for a particular <optGroup>
    */
    interface GroupInfo extends MsPortalFx.ViewModels.Controls.Forms.GroupDropDown.GroupInfo {
    }
    /**
     * ItemSetting is the fields setting to inform the ViewModel given setting how to build up dropdown items.
     */
    interface ItemSetting extends MsPortalFx.ViewModels.Controls.Forms.GroupDropDown.ItemSetting {
        /**
         * Data key used to identify the color.  This is optional, if not provided, it will use default color wheel.
         */
        colorKey?: string;
        /**
         * Data key used to identify the row.  Data have to be string, we use it on the object map to quickly identify item's element.
         */
        rowIdKey?: string;
        /**
         * Data key used to label the row for display purpose.  Data have to be string, we use to show center caption for quick indication of the item.
         */
        labelKey?: string;
        /**
         * RowId of current hovered slice in donut.
         */
        hoveredIndex?: KnockoutObservable<string>;
    }
    interface Contract extends Loadable.Contract {
        /**
         * Gauge Size for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * Group definitions. See interface.
         */
        groupInfos?: KnockoutObservableArray<GroupInfo>;
        /**
         * Items displayed in the table based on the column definitions when selection is disabled.
         */
        itemsDataArray: KnockoutObservableArray<ItemData>;
        /**
         * ItemSetting is the fields setting to inform the ViewModel given setting how to build up dropdown items.
         */
        itemSetting?: KnockoutObservableBase<ItemSetting>;
        /**
         * Indicate value/selection is initialized.
         * If false, it will initialize the value from Items.selected states.
         * If true,  it will honor value and make sure the Items.selected states match current value.
         */
        valueInitialized?: boolean;
        /**
        * Indicates whether the widget should regenerate the dropdown Items from itemsDataArray & itemSetting.
        */
        resetItems: KnockoutObservableBase<boolean>;
        /**
         * total value. The total value of all value.
         */
        total: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * {0}: current value.
         * {1}: maximum value.
         */
        totalFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit in the center.
         * By default the format string is "".
         */
        unitFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center. (Caption)
         * This is used when there is no selected nor hover on the donut.
         */
        infoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center during the hover. (Caption)
         * This is used when hover on the text.
         * {0}: current label ("" if not available).
         * {1}: current value (or percentage).
         * {2}: current unit (or %).
         */
        hoverInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center when there is a selected and no hover. (Caption)
         * {0}: current selected total.
         * {1}: current total().
         * {2}: current unitFormat().
         */
        selectedInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit for Hovered/Selected.  If it is "%" or undefine, by default it shows percentange.
         */
        hoveredUnit: KnockoutObservableBase<string>;
        /**
         * Disable selected change on click.
         */
        disableSelectOnClick: KnockoutObservableBase<boolean>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Gauge Size for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * See Contract interface.
         */
        groupInfos: KnockoutObservableArray<GroupInfo>;
        /**
         * See Contract interface.
         */
        itemsDataArray: KnockoutObservableArray<ItemData>;
        /**
         * See Contract interface.
         */
        itemSetting: KnockoutObservableBase<ItemSetting>;
        /**
         * See Contract interface.
         */
        resetItems: KnockoutObservableBase<boolean>;
        /**
         * See Contract interface.
         */
        valueInitialized: boolean;
        /**
         * Total value. The total value of all donut.
         */
        total: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * {0}: current value.
         * {1}: maximum value.
         */
        totalFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit in the center.
         * By default the format string is "".
         */
        unitFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center. (Caption)
         * This is used when there is no selected nor hover on the donut.
         */
        infoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center during the hover. (Caption)
         * This is used when hover on the text.
         * {0}: current label ("" if not available).
         * {1}: current value (or percentage).
         * {2}: current unit (or %).
         */
        hoverInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display info in the center when there is a selected and no hover. (Caption)
         * {0}: current selected total.
         * {1}: current total().
         * {2}: current unitFormat().
         */
        selectedInfoFormat: KnockoutObservableBase<string>;
        /**
         * Display Unit for Hovered/Selected.  If it is "%" or undefine, by default it shows percentange.
         */
        hoveredUnit: KnockoutObservableBase<string>;
        /**
         * Disable selected change on click.
         */
        disableSelectOnClick: KnockoutObservableBase<boolean>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Gauge {
    class Threshold {
        /**
         * The limit of this threshold.
         */
        limit: KnockoutObservableBase<number>;
        /**
         * The custom CssClass for this threshold.
         */
        cssClass: KnockoutObservableBase<string>;
        constructor(limit: number);
    }
    interface Contract extends MsPortalFx.ViewModels.Controls.SingleSetting.Contract {
        /**
         * The value of the footer setting.
         */
        footerValue: KnockoutObservable<string>;
        /**
         * The unit of the footer setting.
         */
        footerUnit: KnockoutObservable<string>;
        /**
         * The caption of the footer setting.
         */
        footerCaption: KnockoutObservable<string>;
        /**
         * The value of the gauge (from 0 to gaugeMaxValue).
         */
        gaugeValue: KnockoutObservable<number>;
        /**
         * The max value of the setting.
         */
        gaugeMaxValue: KnockoutObservable<number>;
        /**
         * The Arc in degree of the gauge that is present.
         */
        gaugePresentationArc: KnockoutObservable<number>;
        gaugeThresholds: KnockoutObservableArray<Threshold>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * The value of the center setting.
         */
        value: KnockoutObservable<string>;
        /**
         * The unit of the center setting.
         */
        unit: KnockoutObservable<string>;
        /**
         * The caption of the center setting.
         */
        caption: KnockoutObservable<string>;
        /**
         * The value of the footer setting.
         */
        footerValue: KnockoutObservable<string>;
        /**
         * The unit of the footer setting.
         */
        footerUnit: KnockoutObservable<string>;
        /**
         * The caption of the footer setting.
         */
        footerCaption: KnockoutObservable<string>;
        /**
         * The value of the gauge (from 0 to gaugeMaxValue).
         */
        gaugeValue: KnockoutObservable<number>;
        /**
         * The max value of the setting.
         */
        gaugeMaxValue: KnockoutObservable<number>;
        /**
         * The Arc in degree of the gauge that is present.
         */
        gaugePresentationArc: KnockoutObservable<number>;
        /**
         * The Arc in degree of the gauge that is present.
         */
        gaugeThresholds: KnockoutObservableArray<Threshold>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Graph {
    /**
     * The contract definition of Graph edge interface for the purposes of addition logic.
     */
    interface IGraphEdgeForAddition {
        /**
         * The identifier of the node the edge starts from.
         */
        startNodeId: string;
        /**
         * The identifier of the node the edge ends at.
         */
        endNodeId: string;
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Graph {
    /**
     * The contract definition of Graph node interface for the purposes of deletion logic.
     */
    interface IGraphNodeForDeletion {
        /**
         * The identifier of the node.
         */
        id: string;
    }
    /**
     * The contract definition of Graph edge interface for the purposes of deletion logic.
     */
    interface IGraphEdgeForDeletion {
        /**
         * The identifier of the edge.
         */
        id: string;
    }
    /**
     * Utility class encapsulates deletion functionality.
     */
    class GraphEntitiesDeletion {
        /**
         * Performs deletion of the specified nodes and edges from the specified graph model.
         * @param model ViewModel instance to run the deletion on.
         * @param nodesToDelete List of nodes to delete.
         * @param edgesToDelete List of edges to delete.
         */
        static run(model: Graph.ViewModel, nodesToDelete: IGraphNodeForDeletion[], edgesToDelete: IGraphEdgeForDeletion[]): void;
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Graph {
    /**
     * Skin styles of the graph editor.
     */
    enum GraphEditorSkinStyle {
        /**
         * Canvas and node background colors are consistent with typical blade and parts background colors.
         */
        Blade = 0,
        /**
         * Canvas background color is strictly white or black (depending on main color theme), node background color is a tint of blue.
         */
        Document = 1,
    }
    /**
     * Strategies defining how edges connect to nodes and how they follow the nodes' moves.
     */
    enum EdgeConnectionStrategy {
        /**
         * Edge line is a ray originating at the center of the start node and going to the center of the end node.
         */
        NodeCenter = 0,
        /**
         * Edge path is a Bezier curve originating at the output port of the start node and going to the input port of the end node.
         */
        NodePort = 1,
    }
    /**
     * Capabilities of the graph editor. Flags enum, literals can be combined.
     */
    enum GraphEditorCapabilities {
        /**
         * No editor capabilities. Only viewing, panning and zooming-in/-out allowed on the graph.
         */
        None = 0,
        /**
         * Capability to move nodes (connected edges move accordingly).
         */
        MoveEntities = 1,
        /**
         * Capability to update lists of nodes and edges.
         */
        AddRemoveEntities = 2,
    }
    /**
     * OBSOLETE, DEPRECATED. To be removed in one of the next releases.
     * Used to be a limited enumeration of edge line strength grades.
     * Now strength/thickness is set using a number from the range [1; 6] - where 1 represents the weakest (the thinnest) and 6 - the strongest (the thickest) connection.
     */
    enum EdgeStrength {
        /**
         * Normal strength grade.
         */
        Normal = 1,
        /**
         * Strong connection grade.
         */
        Strong = 2,
    }
    /**
     * Definition of edge line types.
     */
    enum EdgeType {
        /**
         * Single line/curve.
         */
        Single = 1,
        /**
         * 2 parallel lines/curves.
         */
        Double = 2,
    }
    /**
     * Definition of edge line styles.
     */
    enum EdgeStyle {
        /**
         * Solid line/curve.
         */
        Solid = 1,
        /**
         * Dotted line/curve.
         */
        Dotted = 2,
        /**
         * Dashed line/curve.
         */
        Dashed = 3,
    }
    /**
     * The Edge end contract.
     */
    interface IEdgeEnd {
        /**
         * The identifier of the edge end.
         */
        id: KnockoutObservable<string>;
    }
    /**
     * An abstract class that holds common elements for things that go in the graph.
     * Don't instantiate this.
     */
    class GraphEntity {
        /**
         * Whether this entity allows being selected by a user or not.
         */
        selectable: KnockoutObservable<boolean>;
        /**
         * Whether this entity is selected or not.
         */
        selected: KnockoutObservable<boolean>;
        /**
         * The id of this entity. Used for referring to other graph nodes. You may need to
         * overwrite the default one when loading existing graphs.
         */
        id: KnockoutObservable<string>;
        /**
         * Set whether the entity should be dimmed (i.e. reduce the opacity).
         */
        dimmed: KnockoutObservable<boolean>;
        /**
         * Creates a graph entity.
         *
         * @param id The object's id.
         */
        constructor(id?: string);
    }
    /**
     * A graph edge. Put these in Graph.ViewModel's edge array.
     */
    class GraphEdge extends GraphEntity {
        /**
         * The id of the start node for the edge. Do not change this after adding the edge to the
         * graph. This is set automatically by the constructor, and you should never need to change it.
         */
        startNodeId: KnockoutObservable<string>;
        /**
         * The id of the end node for the edge. Do not change this after adding the edge to the graph.
         * This is set automatically by the constructor, and you should never need to change it.
         */
        endNodeId: KnockoutObservable<string>;
        /**
         * The edge line thickness (in pixels). Limited to values in the range [1; 6].
         */
        strength: KnockoutObservable<number>;
        /**
         * The compound type characteristics of the edge line.
         */
        type: KnockoutObservable<EdgeType>;
        /**
         * The style of the edge line.
         */
        style: KnockoutObservable<EdgeStyle>;
        /**
         * Create a graph edge.
         *
         * @param startNode The node the edge eminates from.
         * @param endNode the node the edge ends on.
         */
        constructor(startNode: IEdgeEnd, endNode: IEdgeEnd);
    }
    /**
     * An interface for optionally updating a rectangle.
     */
    interface IUpdateRect {
        /**
         * The X coordinate of the node's top-left corner.
         */
        x?: number;
        /**
         * The Y coordinate of the node's top-left corner.
         */
        y?: number;
        /**
         * The height of the node.
         */
        height?: number;
        /**
         * The width of the node.
         */
        width?: number;
    }
    /**
     * A cartesian point interface defintion.
     */
    interface IPoint {
        /**
         * The x coordinate of the point.
         */
        x: number;
        /**
         * The y coordinate of the point.
         */
        y: number;
    }
    /**
     * A rectangle interface definition.
     */
    interface IRect {
        /**
         * The x coordinate of the rectangle.
         */
        x: number;
        /**
         * The y coordinate of the rectangle.
         */
        y: number;
        /**
         * The height of the rectangle.
         */
        height: number;
        /**
         * The width of the rectangle.
         */
        width: number;
    }
    /**
     * A graph node. Put these in Graph.ViewModel's graphNodes array.
     */
    class GraphNode extends GraphEntity implements MsPortalFx.ViewModels.DynamicBladeSelection {
        /**
         * The view model to use for displaying the graph node's content.
         */
        extensionViewModel: any;
        /**
         * A Knockout template describing what the graph node looks like.
         */
        extensionTemplate: string;
        /**
         * The name of the blade to launch when the user activates this node.
         */
        detailBlade: string;
        /**
         * Inputs to the blade to launch when the user activates this node.
         */
        detailBladeInputs: Object;
        /**
         * Only used for constructor purposes. Shouldn't be touched by the extension.
         * We would make this protected, but it need to be proxied over, so we can't.
         */
        private initialRect;
        constructor(initialRect?: IUpdateRect);
    }
    /**
     * Configuratble options for the setNodeRects function call.
     */
    interface ISetNodeRectOptions {
        /**
         * When true, clears the existing undo/redo stack.
         * Default: false;
         */
        clearUndo?: boolean;
    }
    /**
     * The contract that defines a graph for the pcGraph binding.
     */
    interface Contract extends Loadable.Contract {
        /**
         * The strategy defining how edges connect to nodes and how they follow the nodes' moves.
         */
        edgeConnectionStrategy: KnockoutObservable<EdgeConnectionStrategy>;
        /**
         * The editing capabilities the graph editor exposes.
         */
        editorCapabilities: KnockoutObservable<GraphEditorCapabilities>;
        /**
         * A collection of all the graph nodes in the graph.
         */
        graphNodes: MsPortalFx.Base.Internal.IObservableMap<GraphNode>;
        /**
         * A collection of all the edges in the graph.
         */
        edges: MsPortalFx.Base.Internal.IObservableMap<GraphEdge>;
        /**
         * How many pixels tall and wide each grid cell is. Used in snap to grid.
         */
        gridResolution: KnockoutObservable<number>;
        /**
         * The currently selected nodes and edges.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<GraphEntity, GraphEntity>;
        /**
         * When true, the user can multi-select by clicking in the background and dragging. When false, clicking and dragging in the background pans.
         * Default is false.
         */
        rectSelectionMode: KnockoutObservable<boolean>;
        /**
         * Once the widget has loaded, causes the graph widget to zoom and center the graph in the viewport.
         */
        zoomToFit: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        /**
         * Once the widget has loaded, causes the graph widget to zoom in.
         */
        zoomIn: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        /**
         * Once the widget has loaded, causes the graph widget to zoom out.
         */
        zoomOut: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        /**
         * Once the widget has loaded, causes the graph widget to zoom to 100%.
         */
        zoomTo100Percent: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        /**
         * Adds the specified GraphEdge instance to the list of the view model edges.
         * To be overriden in custom ViewModel implementation to customize the edge that is being created when user drags it from source to destination node.
         *
         * @param edgeToAdd The edge instance to add.
         * @return JQuery promise object that is resolved when the operation completes or fails.
         */
        addEdge(edgeToAdd: IGraphEdgeForAddition): JQueryPromise;
        /**
         * Deletes the specified graph entities (nodes and edges).
         *
         * @param nodesToDelete The array of nodes to delete.
         * @param edgesToDelete The array of edges to delete.
         * @return JQuery promise object that is resolved when the operation completes or fails.
         */
        deleteEntities(nodesToDelete: IGraphNodeForDeletion[], edgesToDelete: IGraphEdgeForDeletion[]): JQueryPromise;
        /**
         * Whether or not the widget has been attached yet.
         */
        widgetAttached: KnockoutObservable<boolean>;
        /**
         * Notifies subscribers when the a layout change has been committed to the graph. The number given has no useful meaning but is used to trigger
         * the notification to the extension.
         */
        layoutChanged: KnockoutObservable<number>;
        /**
         * Returns a new candidate layout without overlaps, given a proposed movement of some nodes.
         * The returned candidade layout is used to preview the change and, if the user commits the change,
         * to update the committed locations of nodes.
         * This should be specified by the extension. If it's set null, no automatic layout will occur.
         *
         * @param changedNodes The nodes with explicitly changed positions.
         * @param rootId The node under the user's cursor (which should not move).
         * @return The nodes with implicitly changed positions.
         */
        getLayoutNoOverlaps: KnockoutObservable<(changedNodes: StringMap<IPoint>, rootId: string) => MsPortalFx.Base.PromiseV<StringMap<IPoint>>>;
        /**
         * Sets the rects for specified graph nodes.
         *
         * All calls to this function will result in animation, so best practice is to initialize nodes with
         * their starting rects (per the optional constructor).
         * This API is used to allow the widget to track animated and comitted state, as well as allow for batch updates.
         *
         * @param rects Map of rects.
         * @param options Configuratble options (ex: undo/redo stack).
         * @return A promise that resolves once the changes have been applied.
         */
        setNodeRects: KnockoutObservable<(rects: StringMap<IUpdateRect>, options?: ISetNodeRectOptions) => MsPortalFx.Base.Promise>;
        /**
         * Returns all rects for every graph node, or a specified list of graph node ids.
         *
         * This can only be called after widgetAttached() is true, otherwise it will throw an exception.
         *
         * @param ids The list of ids from which to return corresponding gaphNodes.
         * @return A promise that resolves with a string map of committed rects.
         */
        getNodeRects: KnockoutObservable<(ids?: string[]) => MsPortalFx.Base.PromiseV<StringMap<IRect>>>;
        /**
         * A flag to disable zoom in/out behavior on mouse wheel events. If not provided, default to false.
         *
         * @return A value indicating whether zoom in/out behavior on mouse wheel events is disabled.
         */
        disableMouseWheelZoom: KnockoutObservable<boolean>;
        /**
         * A flag to enable lineage display for graphs (i.e. dim [reduce opacity] all the nodes except the selected and nodes in
         * its upstream and downstream).
         *
         * @return A boolean indicating if lineage display should be enabled.
         */
        enableLineage: KnockoutObservable<boolean>;
    }
    /**
     * The view model for pcGraph. Contains the representation of a graph.
     */
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * See contract.
         */
        edgeConnectionStrategy: KnockoutObservable<EdgeConnectionStrategy>;
        /**
         * See contract.
         */
        editorCapabilities: KnockoutObservable<GraphEditorCapabilities>;
        /**
         * See contract.
         */
        graphNodes: MsPortalFx.Base.Internal.ObservableMap<GraphNode>;
        /**
         * See contract.
         */
        edges: MsPortalFx.Base.Internal.ObservableMap<GraphEdge>;
        /**
         * See contract.
         */
        gridResolution: KnockoutObservable<number>;
        /**
         * See contract.
         */
        selection: MsPortalFx.ViewModels.SelectableSet<GraphEntity, GraphEntity>;
        /**
         * See contract.
         */
        widgetAttached: KnockoutObservable<boolean>;
        /**
         * See contract.
         */
        layoutChanged: KnockoutObservable<number>;
        /**
         * See contract.
         */
        getLayoutNoOverlaps: KnockoutObservable<(changedNodes: StringMap<IPoint>, rootId: string) => MsPortalFx.Base.PromiseV<StringMap<IPoint>>>;
        /**
         * See contract.
         */
        setNodeRects: KnockoutObservable<(rects: StringMap<IUpdateRect>, options?: ISetNodeRectOptions) => MsPortalFx.Base.Promise>;
        /**
         * See contract.
         */
        getNodeRects: KnockoutObservable<(ids?: string[]) => MsPortalFx.Base.PromiseV<StringMap<IRect>>>;
        /**
         * See contract.
         */
        rectSelectionMode: KnockoutObservable<boolean>;
        /**
         * See contract.
         */
        zoomToFit: KnockoutObservable<() => JQueryPromise>;
        /**
         * See contract.
         */
        zoomIn: KnockoutObservable<() => JQueryPromise>;
        /**
         * See contract.
         */
        zoomOut: KnockoutObservable<() => JQueryPromise>;
        /**
         * See contract.
         */
        zoomTo100Percent: KnockoutObservable<() => JQueryPromise>;
        /**
         * See contract.
         */
        addEdge: (edgeToAdd: IGraphEdgeForAddition) => JQueryPromise;
        /**
         * See contract.
         */
        deleteEntities: (nodesToDelete: IGraphNodeForDeletion[], edgesToDelete: IGraphEdgeForDeletion[]) => JQueryPromise;
        /**
         * See contract.
         */
        disableMouseWheelZoom: KnockoutObservable<boolean>;
        /**
         * See contract.
         */
        enableLineage: KnockoutObservable<boolean>;
        /**
         * Used by selectable set to determine if a graph node is part of the selected set. Extension authors
         * should never need to call this.
         *
         * @param graphEntity the graphEntity to compare.
         * @param selectionItem the selected item to compare.
         * @return boolean whether the selected item is the graph entity or not.
         */
        static itemMatchesSelection(graphEntity: GraphEntity, selectionItem: GraphEntity): boolean;
        /**
         * Transforms a graph entity into a selection contract. Extension authors should never need to call this.
         *
         * @param graphEntity the graph node to transform.
         * @return the graph node that manages selection state.
         */
        static createSelection(graphEntity: GraphEntity): GraphEntity;
        private _lifetimeManager;
        /**
         * The style skin applied to the graph editor defining canvas and entities styling (mostly colors).
         * Only used for constructor purposes. Shouldn't be touched by the extension.
         * We would make this protected, but it need to be proxied over, so we can't.
         */
        private styleSkin;
        /**
         * Creates a graph view model
         * @param lifetimeManager Lifetime manager object dealing with proper resources disposal.
         * @param styleSkin Style skin for the graph editor. Default to GraphEditorSkinStyle.Blade.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, styleSkin?: GraphEditorSkinStyle);
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.Map {
    /**
     * Extension for Map
     */
    enum Extensions {
        /**
         * Plugin to HexagonLayout UX
         */
        HexagonLayout = 1,
    }
    /**
     * Location for Map Item
     */
    class Location {
        /**
         * Latitude coordinate for the map item.
         */
        latitude: number;
        /**
         * Longitude coordinate for the map item.
         */
        longitude: number;
        /**
         * @param latitude The latitude of the location
         * @param longitude The longitude of the location
         */
        constructor(latitude: number, longitude: number);
    }
    /**
     * The links that represents HexagonLayout link
     */
    interface Link {
        /**
         * Source of the link
         */
        source: Item;
        /**
         * Target of the link
         */
        target: Item;
        /**
         * Type of the link
         */
        linkType: LinkType;
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
     * Map Item contract
     */
    interface ItemContract {
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
        metadata: ItemMetadataContract;
    }
    /**
     * Map Item contract
     */
    class Item implements ItemContract {
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
        metadata: ItemMetadataContract;
    }
    /**
     * The enum for HexagonLayout link
     */
    enum ItemType {
        /**
         * The primary in a HexagonLayout link relationship
         */
        Source = 0,
        /**
         * The secondary in a HexagonLayout link relationship
         */
        Target = 1,
        /**
         * The hexagon only has icon displayed.
         */
        IconOnly = 2,
    }
    /**
     * A metadata entry corresponding to a single item in the list.
     */
    interface ItemMetadataContract {
        /**
         * Icon displayed on the hexagon.
         */
        icon?: KnockoutObservable<MsPortalFx.Base.Image>;
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
     * A metadata entry corresponding to a single item in the list for HexagonLayout
     */
    interface HexagonLayoutItemMetadataContract extends ItemMetadataContract {
        /**
         * Type in HexagonLayout relationship
         */
        type?: ItemType;
        /**
         * Text to show for the item
         */
        text?: KnockoutObservable<string>;
        /**
         * Indicates whether to fill the polygon
         */
        hasFill?: KnockoutObservable<boolean>;
        /**
         * The icon displayed on the hexagon.
         */
        icon?: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * Scale the item based on hexagon size. 1.0 means the size is the same as hexagon grid.
         */
        itemScale?: KnockoutObservable<number>;
    }
    /**
     * A metadata entry corresponding to a single item in the list.
     */
    class ItemMetadata implements ItemMetadataContract {
        /**
         * The icon displayed on the hexagon.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * The width of the icon
         */
        iconWidth: KnockoutObservable<number>;
        /**
         * The height of the icon
         */
        iconHeight: KnockoutObservable<number>;
    }
    /**
     * A metadata entry corresponding to a single item in the list for HexagonLayout
     */
    class HexagonLayoutItemMetadata extends ItemMetadata implements HexagonLayoutItemMetadataContract {
        /**
         * Type in HexagonLayout link relationship
         */
        type: ItemType;
        /**
         * Text to show for the item
         */
        text: KnockoutObservable<string>;
        /**
         * Indicates whether to fill the polygon
         */
        hasFill: KnockoutObservable<boolean>;
        /**
         * Scale the item based on hexagon size. 1.0 means the size is the same as hexagon grid.
         */
        itemScale: KnockoutObservable<number>;
    }
    /**
     * Defines HexagonLayout Extension options
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
     * Options for Extension
     */
    interface ExtensionOptions {
        /**
         * HexagonLayout options.
         */
        hexagonLayout?: HexagonLayoutOptions;
    }
    /**
     * Event callback for Map items.
     */
    class Events {
        /**
         * Click on an item.
         */
        itemClick: (item: Item) => void;
        /**
         * Mouse enter on an item.
         */
        itemMouseEnter: (item: Item) => void;
        /**
         * Mouse leave on an item.
         */
        itemMouseLeave: (item: Item) => void;
    }
    /**
     * View model contract for the map widget.
     */
    interface Contract extends Loadable.Contract {
        /**
         * Map items to be displayed.
         */
        items: KnockoutObservable<Item[]>;
        /**
         * Events supported by the map control.
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
        extensions?: number;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionOptions?: ExtensionOptions;
    }
    /**
     * View model for the map widget.
     */
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Map items to be displayed.
         */
        items: KnockoutObservable<Item[]>;
        /**
         * Events supported by the map control.
         */
        events: Events;
        /**
         * The width of the map control
         */
        width: KnockoutObservable<number>;
        /**
         * The height of the map control
         */
        height: KnockoutObservable<number>;
        extensions: number;
        /**
         * Options used to configure the loaded plugins.
         * Updating this property after the widget is initialized will have no effect.
         */
        extensionOptions: ExtensionOptions;
        /**
         * Constructs a Map view model.
         *
         * @param items map items to be displayed.
         * @param extensions Bitmask of extension plugins to be loaded.
         * @param extensionOptions The extension options for the plugins.
         */
        constructor(items?: KnockoutObservable<Item[]>, extensions?: number, extensionOptions?: ExtensionOptions);
        dispose(): void;
        private _getDefaultOptions();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.PairedTimeline {
    import Chart = MsPortalFx.ViewModels.Controls.Visualization.Chart;
    import Metrics = MsPortalFx.ViewModels.Controls.Visualization.Metrics;
    import ListView = MsPortalFx.ViewModels.Controls.Lists.ListView;
    /**
     * Contract container for the Chart and Metrics controls
     */
    interface PairedTimelineChartContract<TX, TY> {
        /**
         * Identifier of chart
         */
        id: string;
        /**
         * Chart control contract
         */
        chart: Chart.Contract<TX, TY>;
        /**
         * Chart height in number of units(integer). Each unit is 50 px.
         */
        chartHeight: KnockoutObservableBase<number>;
        /**
        * The message to display when chart is unconfigured or there is no chart data.
        */
        noDataMessage: KnockoutObservableBase<string>;
        /**
         * CSS class to be applied to the List View item
         */
        cssClass: KnockoutObservableBase<string>;
    }
    /**
     * Container for the Chart and Metrics controls
     */
    class PairedTimelineChart<TX, TY> extends Loadable.ViewModel implements PairedTimelineChartContract<TX, TY> {
        /**
         * Identifier of chart
         */
        id: string;
        /**
         * Chart control
         */
        chart: Chart.ViewModel<TX, TY>;
        /**
         * Chart height in number of units(integer). Each unit is 50 px.
         */
        chartHeight: KnockoutObservableBase<number>;
        /**
        * The message to display when chart is unconfigured or there is no chart data.
        */
        noDataMessage: KnockoutObservableBase<string>;
        /**
         * CSS class to be applied to the List View item
         */
        cssClass: KnockoutObservableBase<string>;
        constructor(id: string);
        dispose(): void;
    }
    interface Contract<TX, TY> extends Loadable.Contract {
        /**
         * The collection of Paired Timeline charts.
         */
        ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>;
        /**
        * Options used to configure the loaded plugins for selection.
        * Updating this property after the widget is initialized will have no effect.
        */
        extensionOptions: ListView.ExtensionOptions;
        /**
         * Enable Metrics Rules
         */
        enableMetricsRules: KnockoutObservableBase<boolean>;
        /**
         * MetricsOptions
         */
        metricsOptions: Metrics.VisualContract;
    }
    class ViewModel<TX, TY> extends Loadable.ViewModel implements Contract<TX, TY> {
        /**
         * The collection of Paired Timeline charts.
         */
        ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>;
        /**
        * Options used to configure the loaded plugins for selection.
        * Updating this property after the widget is initialized will have no effect.
        */
        extensionOptions: ListView.ExtensionOptions;
        enableMetricsRules: KnockoutObservableBase<boolean>;
        /**
        * MetricsOptions
        */
        metricsOptions: Metrics.VisualContract;
        constructor(ptCharts: KnockoutObservableArray<PairedTimeline.PairedTimelineChart<TX, TY>>, extensionOptions: ListView.ExtensionOptions);
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.ProgressBar {
    enum StatusType {
        /**
         * In progress style.
         */
        InProgress = 0,
        /**
         * Error style.
         */
        Error = 1,
        /**
         * Warning style.
         */
        Warning = 2,
        /**
         * Success style.
         */
        Success = 3,
        /**
         * Indeterminate style.
         */
        Indeterminate = 4,
        /**
         * Vertical indeterminate style.
         */
        IndeterminateVertical = 5,
    }
    interface Contract extends Loadable.Contract {
        /**
         * Value percentage of the current progress.
         */
        valuePercentage: KnockoutObservable<number>;
        /**
         * Status of the progress indicator.
         */
        status: KnockoutObservable<StatusType>;
        /**
         * Control's aria-labelledby setting.
         */
        labelId: string;
        /**
         * Control's aria-describedby setting.
         */
        detailsId: string;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * Value percentage of the current progress.
         */
        valuePercentage: KnockoutObservable<number>;
        /**
         * Status of the progress indicator.
         */
        status: KnockoutObservable<StatusType>;
        /**
         * Control's aria-labelledby setting.
         */
        labelId: string;
        /**
         * Control's aria-describedby setting.
         */
        detailsId: string;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.QuotaGauge {
    enum ErrorWarningShape {
        /**
         * Default triangle warning/error.
         */
        Triangle = 0,
        /**
         * Circle warning/error.
         */
        Circle = 1,
    }
    enum GaugeSize {
        /**
         * Default Automatically adjust size base on current Div size.
         * Currently, it is determind by Min(width, height).
         * If less than 100px, display QuotaGaugeSize.CenterOnly.
         * else if less than 254px, display QuotaGaugeSize.Small.
         * else display QuotaGaugeSize.Large.
         */
        Auto = 0,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlySmall = 1,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyMedium = 2,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyLarge = 3,
        /**
         * Small 100px square size of donut shape gauge with center.
         */
        Small = 4,
        /**
         * Medium 146px square size of donut shape gauge with center.
         */
        Medium = 5,
        /**
         * MediumLarge 220px square size of donut shape gauge with center.
         */
        MediumLarge = 6,
        /**
         * Small 254px square size of donut shape gauge with center.
         */
        Large = 7,
    }
    interface Contract extends Loadable.Contract {
        /**
         * Toggle the css style for warning/error. True for triangle or false for circle.
         */
        errorWarningShape: KnockoutObservableBase<ErrorWarningShape>;
        /**
         * Gauge Size for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * The current tracking instance value. For example, CPU/Memory/Website instance.
         */
        instance: KnockoutObservableBase<number>;
        /**
         * The quota for current instance.
         */
        instanceQuota: KnockoutObservableBase<number>;
        /**
         * The total value of all instances. For example, all CPU/Memory/Websites usage.
         */
        total: KnockoutObservableBase<number>;
        /**
         * The quota for total value of all instances.
         */
        totalQuota: KnockoutObservableBase<number>;
        /**
        * Caption.
        *  {0} is instance
        *  {1} is instanceQuota,
        *  {2} is total
        *  {3} is totalQuota
        */
        totalCaption: KnockoutObservableBase<string>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
        /**
         * Omit Total bar.
         */
        omitTotal: KnockoutObservableBase<boolean>;
        /**
         * No quota verification.
         */
        noQuota: KnockoutObservableBase<boolean>;
        /**
         * The number represent the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         *  Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * Center Text value display format.
         *  {0} is intance value
         *  {1} is instance Quota,
         *  {2} is total
         *  {3} is total Quota
         *  {4} is maximum
         */
        valueDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Hide the current tick mark.
         */
        hideTick: KnockoutObservableBase<boolean>;
    }
    class ViewModel extends Loadable.ViewModel implements Contract {
        /**
         * See interface.
         */
        errorWarningShape: KnockoutObservableBase<ErrorWarningShape>;
        /**
         * See interface.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * See interface.
         */
        instance: KnockoutObservableBase<number>;
        /**
         * See interface.
         */
        instanceQuota: KnockoutObservableBase<number>;
        /**
         * See interface.
         */
        total: KnockoutObservableBase<number>;
        /**
         * See interface.
         */
        totalQuota: KnockoutObservableBase<number>;
        /**
         * See interface.
         */
        totalCaption: KnockoutObservableBase<string>;
        /**
         * Show center content.
         */
        showCenter: KnockoutObservableBase<boolean>;
        /**
         * Omit Total bar.
         */
        omitTotal: KnockoutObservableBase<boolean>;
        /**
         * No quota verification.
         */
        noQuota: KnockoutObservableBase<boolean>;
        /**
         * The number represent the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         *  Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * Center Text value display format.
         *  {0} is intance value
         *  {1} is instance Quota,
         *  {2} is total
         *  {3} is total Quota
         *  {4} is maximum
         */
        valueDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Hide the current tick mark.
         */
        hideTick: KnockoutObservableBase<boolean>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.SingleValueGauge {
    enum GaugeSize {
        /**
         * Default Automatically adjust size base on current Div size.
         * Currently, it is determind by Min(width, hight).
         * If less than 100px, display QuotaGaugeSize.CenterOnly.
         * else if less than 254px, display QuotaGaugeSize.Small.
         * else display QuotaGaugeSize.Large.
         */
        Auto = 0,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlySmall = 1,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyMedium = 2,
        /**
         * No outer donut gauge. Center only
         */
        CenterOnlyLarge = 3,
        /**
         * Icon 21px square size of donut shape gauge with center.
         */
        Icon = 4,
        /**
         * Tiny 30px square size of donut shape gauge with center.
         */
        Tiny = 5,
        /**
         * Small 100px square size of donut shape gauge with center.
         */
        Small = 6,
        /**
         * Medium 146px square size of donut shape gauge with center.
         */
        Medium = 7,
        /**
         * MediumLarge 220px square size of donut shape gauge with center.
         */
        MediumLarge = 8,
        /**
         * Small 254px square size of donut shape gauge with center.
         */
        Large = 9,
    }
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Gauge Size for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * Hide the current tick mark.
         */
        hideTick: KnockoutObservableBase<boolean>;
        /**
         * The number represent the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * captionDisplayFormat value.
         *  {0} is current
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        /**
         * valueDisplayFormat value.
         *  {0} is current
         */
        valueDisplayFormat: KnockoutObservableBase<string>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * Gauge Size for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * Hide the current tick mark.
         */
        hideTick: KnockoutObservableBase<boolean>;
        /**
         * The number represent the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Center text unit.
         */
        unit: KnockoutObservableBase<string>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * captionDisplayFormat value.
         *  {0} is current
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        /**
         * valueDisplayFormat value.
         *  {0} is current
         */
        valueDisplayFormat: KnockoutObservableBase<string>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Controls.Visualization.StepGauge {
    enum GaugeSize {
        /**
         * Default Automatically adjust size base on current Div size.
         * Currently, it is determind by Min(width, hight).
         * If less than 100px, display QuotaGaugeSize.CenterOnly.
         * else if less than 254px, display QuotaGaugeSize.Small.
         * else display QuotaGaugeSize.Large.
         */
        Auto = 0,
        /**
         * No outer donut gauge.  Center only
         */
        CenterOnlySmall = 1,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyMedium = 2,
        /**
         * No outer donut gauge. Center only.
         */
        CenterOnlyLarge = 3,
        /**
         * Small 100px square size of donut shape gauge with center.
         */
        Small = 4,
        /**
         * Medium 146px square size of donut shape gauge with center.
         */
        Medium = 5,
        /**
         * MediumLarge 220px square size of donut shape gauge with center.
         */
        MediumLarge = 6,
        /**
         * Small 254px square size of donut shape gauge with center.
         */
        Large = 7,
    }
    interface Contract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * gaugeSize for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * The number represents step size.
         * Note if this number is too small, widget will throw.
         * To check the minimum step value required, which is depends on maximum, call getRequiredMinimumStep().
         */
        step: KnockoutObservableBase<number>;
        /**
         * The number represents the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        centerDisplayFormat: KnockoutObservableBase<string>;
        /**
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements Contract {
        /**
         * gaugeSize for display. See enum QuotaGaugeSize.
         */
        gaugeSize: KnockoutObservableBase<GaugeSize>;
        /**
         * The number represents step size.
         * Note if this number is too small, widget will throw.
         * To check the minimum step value required, which is depends on maximum, call getRequiredMinimumStep().
         */
        step: KnockoutObservableBase<number>;
        /**
         * The number represents the whole gauge value.
         */
        maximum: KnockoutObservableBase<number>;
        /**
         *  Gauge start point (units in degree).
         *  -90 : bottom  (default)
         *    0 : left
         *   90 : top
         *  180 : right
         */
        startOffset: KnockoutObservableBase<number>;
        /**
         * Current value.
         */
        current: KnockoutObservableBase<number>;
        /**
         * Display Text in the center.
         * By default the format string is "{0}".
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        centerDisplayFormat: KnockoutObservableBase<string>;
        /**
         * The first argument({0}) is current, for example, 3.
         * The second argument({1}) is maximum().
         */
        captionDisplayFormat: KnockoutObservableBase<string>;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface CheckBoxFormField extends FormField<boolean> {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel: boolean;
    }
    class CheckBoxField extends Field<boolean> implements CheckBoxFormField {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel: boolean;
        /**
         * Constructs an instance of a check box form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         * @param inlineLabel Optional. If set to true, the label is displayed inline next to the CheckBox.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<boolean>, label: string, validations?: FormValidation[], infoBalloonContent?: string, inlineLabel?: boolean);
    }
}
declare module MsPortalFx.ViewModels {
    interface NullableFormField<T> extends FormField<T> {
        /**
         * Whether the field is empty.
         */
        empty: KnockoutObservableBase<boolean>;
    }
    class NullableField<T> extends Field<T> implements NullableFormField<T> {
        /**
         * Whether the field is empty.
         */
        empty: KnockoutComputed<boolean>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], infoBalloonContent?: string);
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels {
    interface EditableFormField<T> extends NullableFormField<T> {
        /**
         * Whether the field is currently being edited.
         */
        editing: KnockoutObservableBase<boolean>;
    }
    class EditableField<T> extends NullableField<T> implements EditableFormField<T> {
        /**
         * Whether the field is currently being edited.
         */
        editing: KnockoutObservable<boolean>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface EditableComboFormField<T> extends EditableFormField<T> {
    }
    /**
     * Base class for combo fields using EditableCombo.
     */
    class EditableComboField<T> extends EditableField<T> implements EditableComboFormField<T> {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Alignment used for drop popup.
         */
        popupAlignment: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Alignment used for input.
         */
        inputAlignment: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Width behavior of the drop popup.
         */
        dropDownWidth: KnockoutObservable<MsPortalFx.ViewModels.Controls.Forms.EditableCombo.DropDownWidth>;
        /**
         * Constructs and instance of an editable combo field.
         * (Base class for other combo fields)
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param emptyValueText Optional. Watermark text to display over the form field when it's empty.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], emptyValueText?: string, infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface DateTimeComboFormField extends EditableComboFormField<Date> {
        /**
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger?: MsPortalFx.ViewModels.Controls.Forms.TextBox.ValueUpdateTrigger;
        /**
         * A valid format string specifier (see date.format polyfill), used to format the value.
         */
        formatString?: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateTimeRange>;
    }
    /**
     * Used to specify date/time range in which user can select date/time.
     */
    class DateTimeRange {
        /**
         * Start date/time.
         */
        startDateTime: KnockoutObservable<Date>;
        /**
         * End date/time.
         */
        endDateTime: KnockoutObservable<Date>;
    }
    class DateTimeComboField extends EditableComboField<Date> implements DateTimeComboFormField {
        /**
         * A valid format string specifier (see date.format polyfill), used to format the value.
         */
        formatString: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<DateTimeRange>;
        /**
         * Constructs an instance of a date time combo field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param emptyValueText Optional. Watermark text to display over the form field when it's empty.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<Date>, label: string, validations?: FormValidation[], emptyValueText?: string, infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface OptionsFormField<T> extends FormField<T> {
        /**
         * A list of options the use can select the field value from.
         */
        options: KnockoutObservableArray<Forms.IDisablableOption<T>>;
    }
    class OptionsField<T> extends Field<T> implements OptionsFormField<T> {
        /**
         * A list of options the use can select the field value from.
         */
        options: KnockoutObservableArray<Forms.IDisablableOption<T>>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param values A list of options the user will choose the field value from.
         * @param validations Optional. A list of validations to be applied to the field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, values: Forms.IDisablableOption<T>[], validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface DropDownFormField<T> extends OptionsFormField<T> {
    }
    class DropDownField<T> extends OptionsField<T> implements DropDownFormField<T> {
        /**
         * Creates an instance of a drop down form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param values A list of options the user will choose the field value from.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, values: MsPortalFx.ViewModels.Forms.IDisablableOption<T>[], validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface FormFieldsSection extends FormElement {
        /**
         * Fields contained in the section.
         */
        fields: KnockoutObservableArray<FormField<any>>;
    }
    class FormSection extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel implements FormFieldsSection {
        /**
         * Enum that defines the type of form element.
         */
        type: ControlType;
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutObservableBase<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * When changed this signals to the control validation should occur.
         */
        validate: KnockoutObservable<number>;
        /**
         * The list of form fields contained in the section.
         */
        fields: KnockoutObservableArray<FormField<any>>;
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        private _subscriptions;
        private _dirtyComputed;
        private _validComputed;
        /**
         * Constructs an instance of a form section.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fields Optional. An array of fields that will go in the form section.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fields?: FormField<any>[]);
        dispose(): void;
        clearValidation(): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Nullable {
    class ViewModel<T> extends Input.ViewModel<T> {
        /**
         * Whether the field is empty.
         */
        empty: KnockoutComputed<boolean>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the NullableField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the NullableField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Editable.Options<T>);
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Editable {
    interface Options<T> extends Input.Options<T> {
        /**
            * Text displayed in the field when the form value is empty.
            */
        emptyValueText?: KnockoutObservable<string>;
    }
    class ViewModel<T> extends Nullable.ViewModel<T> {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Whether the field is currently being edited.
         */
        editing: KnockoutObservable<boolean>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the EditableField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the EditableField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Editable.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.EditableComboBox {
    interface Options<T> extends Editable.Options<T> {
        /**
         * Alignment used for drop popup.
         */
        popupAlignment?: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Alignment used for input.
         */
        inputAlignment?: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Width behavior of the drop popup.
         */
        dropDownWidth?: KnockoutObservable<MsPortalFx.ViewModels.Controls.Forms.EditableCombo.DropDownWidth>;
    }
    /**
     * Base class for combo fields using EditableCombo.
     */
    class ViewModel<T> extends Editable.ViewModel<T> {
        /**
         * Alignment used for drop popup.
         */
        popupAlignment: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Alignment used for input.
         */
        inputAlignment: MsPortalFx.ViewModels.Controls.Forms.EditableCombo.PositioningAlignment;
        /**
         * Width behavior of the drop popup.
         */
        dropDownWidth: KnockoutObservable<MsPortalFx.ViewModels.Controls.Forms.EditableCombo.DropDownWidth>;
        /**
         * Constructs and instance of an editable combo field.
         * (Base class for other combo fields)
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the EditableField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the EditableComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: EditableComboBox.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.FilterComboBox {
    /**
     * Form option represents a row in hierarchical dropdown.
     */
    interface HierarchicalFormOption<T> extends MsPortalFx.ViewModels.Forms.IOption<T> {
        /**
         * Optional children for storing hierarchical data.
         */
        children?: HierarchicalFormOption<T>[];
    }
    interface Column {
        /**
         * String mapping to the item key.
         */
        itemKey: string;
        /**
         * Css class associated with the column.
         */
        cssClass?: string;
        /**
         * Width of the column in pixels or percentage.
         */
        width?: KnockoutObservable<string>;
    }
    interface FilterOptions {
        /**
         * Delimiter used for flattening a hierarchical dataset.
         */
        delimiter?: string;
        /**
         * Filter type for search.
         */
        datasetType: DatasetType;
        /**
         * Filter algorithm to use for search.
         */
        algorithmType?: AlgorithmType;
    }
    interface Options extends MsPortalFx.ViewModels.Forms.Base.EditableComboBox.Options<string> {
        /**
            * Icons to be shown next to text. Key should correspond to text in values.
            */
        iconLookup?: StringMap<KnockoutObservableBase<string>>;
        /**
            * Icon size in pixels which will correspond to both width and height (default "20px").
            */
        iconSize?: KnockoutObservable<string>;
        /**
         * Options used for filtering text.
         */
        filterOptions?: FilterOptions;
        /**
            * A list of values to be displayed in drop down.
            */
        options: KnockoutObservableArray<HierarchicalFormOption<string>>;
    }
    enum DatasetType {
        /**
         * A flat list of data, with no hierarchy
         */
        List = 0,
        /**
         * Hierarchical data
         */
        Tree = 1,
    }
    enum AlgorithmType {
        /**
        * Uses a string index algorithm that matches substrings anywhere in the text
        */
        StringContainsFilterText = 0,
        /**
        * Uses the prefix tree search algorithm to match words that start with the filter text.
        *
        * NOTE: This will not support returning substring matches embedded within words.
        * This is only intended for very special optimized scenarios.
        */
        WordStartsWithFilterText = 1,
    }
    interface SearchFilterContract {
        filterData(filterString: string): HierarchicalFormOption<string>[];
    }
    class HierarchicalFormOptionItem<T> extends Forms.Option<T> implements HierarchicalFormOption<T> {
        children: HierarchicalFormOption<T>[];
        constructor(text: string, value: T, children?: HierarchicalFormOption<T>[]);
        constructor(text: KnockoutObservableBase<string>, value: KnockoutObservableBase<T>, children?: HierarchicalFormOption<T>[]);
    }
    /**
     * Node data for prefix search tree.
     * Exported for unit tests
     */
    class Node {
        children: Node[];
        lineMatches: string[];
        private _value;
        constructor(value?: string);
        /**
         * Gets a child node matching the search char
         *
         * @param searchCharacter Character to search for
         * @return The node that matches the search character.
         */
        getChild(searchCharacter: string): Node;
        /**
         * Checks if node's value matches the search query
         *
         * @param searchQuery query to search for
         * @return true if the node matches the search character, false otherwise.
         */
        matchesValue(searchQuery: string): boolean;
    }
    /**
     * Search filter for searching a flat list of string items, to be used with FilterCombo.
     */
    class SearchFilter implements SearchFilterContract {
        _filterInProgress: boolean;
        _viewModel: ViewModel;
        _filterOptions: FilterOptions;
        private _disposables;
        /**
         * Creates an instance of SearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: ViewModel, filterOptions: FilterOptions);
        /**
         * See interface
         */
        dispose(): void;
        /**
         * Filters data with a simple substring search, a temporary implementation
         * This search currently is case insensitive, but not as performant with toLowerCase
         * and ignores locale while comparing.
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): HierarchicalFormOption<string>[];
        _setfilteredItems(values: HierarchicalFormOption<string>[]): void;
    }
    /**
     * Tree Search filter for searching a hierarchical list of string items, to be used with FilterCombo.
     * Tree is flattened using a delimiter that is passed in filter options. A Breadth-First-Search of
     * the hiearchical tree data is performed and each node is appended to path from root with delimiters
     * separating the node values.
     */
    class TreeSearchFilter extends SearchFilter {
        _defaultDelimiter: string;
        /**
         * Creates an instance of TreeSearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: FilterComboBox.ViewModel, filterOptions: FilterOptions);
        _setfilteredItems(values: HierarchicalFormOption<string>[]): void;
        private _flattenTree(data);
    }
    /**
     * Search filter for searching a flat list of string items, to be used with FilterCombo.
     */
    class SearchFilterPrefixTree implements SearchFilterContract {
        _filterInProgress: boolean;
        _viewModel: ViewModel;
        _filterOptions: FilterOptions;
        _prefixTree: PrefixTree;
        _directMatchDictionary: StringMap<HierarchicalFormOption<string>[]>;
        /**
         * Creates an instance of SearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: ViewModel, filterOptions: FilterOptions);
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): HierarchicalFormOption<string>[];
        _setFilteredItems(filteredItems: HierarchicalFormOption<string>[]): void;
        _addToSearchOnInitialize(item: HierarchicalFormOption<string>, searchString: string): void;
        _addToPrefixTree(tree: PrefixTree, words: string[], value: string, delimiter?: string): void;
        _pushItem(dictionary: {
            [searchTerm: string]: HierarchicalFormOption<string>[];
        }, currentValue: HierarchicalFormOption<string>, searchTerm: string): void;
        private _sortItems(items);
        private _compareItems(item1, item2);
        private _setfilteredItems(values);
    }
    /**
     * Tree Search filter for searching a hierarchical list of string items, to be used with FilterCombo.
     * Tree is flattened using a delimiter that is passed in filter options. A Breadth-First-Search of
     * the hiearchical tree data is performed and each node is appended to path from root with delimiters
     * separating the node values.
     */
    class TreeSearchFilterPrefixTree extends SearchFilterPrefixTree {
        private _defaultDelimiter;
        private _childPrefixTree;
        private _childMatchDictionary;
        /**
         * Creates an instance of TreeSearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: ViewModel, filterOptions: FilterOptions);
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): HierarchicalFormOption<string>[];
        _setFilteredItems(items: HierarchicalFormOption<string>[]): void;
        _addToSearchOnInitialize(item: HierarchicalFormOption<string>, searchString: string): void;
        private _ensureNoDuplicates(filteredData);
        private _processMatch(matches, isResultProcessed);
        private _processMatches(matches, extendedMatches);
        private _itemArrayContains(itemArray, item);
        private _flattenTree(data);
        private _addTreeNodeToPrefixTree(tree, originalValue, newValue);
        private _updateCurrentItem(currentItem, next, originalValue, newValue, matchType);
    }
    class FilterFactory {
        /**
         * Gets a search filter
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         * @return The corresponding search filter.
         */
        getSearchFilter(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: ViewModel, filterOptions: FilterOptions): SearchFilterContract;
        private _buildListSearchFilter(lifetimeManager, viewModel, filterOptions);
        private _buildTreeSearchFilter(lifetimeManager, viewModel, filterOptions);
    }
    /**
     * Prefix Tree that can be used for prefix searching in a list of strings.
     */
    class PrefixTree {
        private _root;
        /**
         * Adds a word to the prefix tree
         *
         * @param word Word to add to the prefix tree.
         * @param line Line to return for prefix result.
         */
        addWord(word: string, line: string): void;
        /**
         * Finds a query in the prefix tree
         *
         * @param query String to search for.
         * @return results  query string results, empty array if not found.
         */
        getMatches(query: string): string[];
        private _findLineMatches(node);
    }
    class ViewModel extends Base.EditableComboBox.ViewModel<string> {
        /**
         * A list of filtered values to be displayed in the drop down.
         */
        filteredItems: KnockoutObservableArray<HierarchicalFormOption<string>>;
        /**
         * Icons to be shown next to text. Key should correspond to text in values.
         */
        iconLookup: StringMap<KnockoutObservableBase<string>>;
        /**
         * Icon size in pixels which will correspond to both width and height (default "20px").
         */
        iconSize: KnockoutObservable<string>;
        /**
         * Options used for filtering text.
         */
        filterOptions: FilterOptions;
        /**
         * Filter text.
         */
        filterText: KnockoutObservable<string>;
        /**
         * No rows message when no rows are displayed.
         */
        noRowsMessage: KnockoutObservableBase<string>;
        /**
         * Indicates if filtering is in progress now.
         */
        filterInProgress: KnockoutObservable<boolean>;
        /**
         * A list of values to be displayed in drop down.
         */
        options: KnockoutObservableArray<HierarchicalFormOption<string>>;
        private _values;
        /**
         * Constructs a standalone instance of a FilterComboBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the FilterComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options: FilterComboBox.Options);
        /**
         * Constructs an instance of a FilterComboBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the FilterComboField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the FilterComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options: FilterComboBox.Options);
        /**
         * Constructs an instance of a FilterComboBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the FilterComboField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the FilterComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options: FilterComboBox.Options);
        /**
         * Gets a KnockoutObservable of list of items
         */
        items: KnockoutObservable<HierarchicalFormOption<string>[]>;
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface FilterComboFormField extends EditableComboFormField<string> {
    }
    interface FilterOptions {
        /**
         * Delimiter used for flattening a hierarchical dataset.
         */
        delimiter?: string;
        /**
         * Filter type for search.
         */
        datasetType: MsPortalFx.ViewModels.Forms.FilterComboBox.DatasetType;
    }
    class FilterComboField extends EditableComboField<string> implements FilterComboFormField {
        /**
         * A list of filtered values to be displayed in the drop down.
         */
        filteredItems: KnockoutObservable<MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[]>;
        /**
         * Icons to be shown next to text. Key should correspond to text in values.
         */
        iconLookup: StringMap<KnockoutObservable<string>>;
        /**
         * Icon size in pixels which will correspond to both width and height (default "20px").
         */
        iconSize: KnockoutObservable<string>;
        /**
         * Options used for filtering text.
         */
        filterOptions: MsPortalFx.ViewModels.Forms.FilterComboBox.FilterOptions;
        /**
         * Filter text.
         */
        filterText: KnockoutObservable<string>;
        /**
         * No rows message when no rows are displayed.
         */
        noRowsMessage: KnockoutObservable<string>;
        /**
         * Indicates if filtering is in progress now.
         */
        filterInProgress: KnockoutObservable<boolean>;
        private _values;
        /**
         * Constructs and instance of a text box form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * @param label Text for the label for this form field.
         * @param values A list of values to be displayed in drop down.
         * @param iconLookup Icons to be shown next to text. Key should correspond to text in values.
         * @param iconSize Icon size in pixels which will correspond to both width and height (default "20px").
         * @param filterOptions Options to filter values list, if data is hierarchical.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param emptyValueText Optional. Watermark text to display over the form field when it's empty.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<string>, label: string, values?: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[], iconLookup?: StringMap<KnockoutObservable<string>>, iconSize?: string, filterOptions?: MsPortalFx.ViewModels.Forms.FilterComboBox.FilterOptions, validations?: FormValidation[], emptyValueText?: string, infoBalloonContent?: string);
        /**
         * Gets a KnockoutObservable of list of items
         */
        items: KnockoutObservable<MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[]>;
    }
    /**
     * Search filter for searching a flat list of string items, to be used with FilterCombo.
     */
    class SearchFilter implements MsPortalFx.Base.Disposable {
        _filterInProgress: boolean;
        _viewModel: FilterComboField;
        _filterOptions: MsPortalFx.ViewModels.Forms.FilterComboBox.FilterOptions;
        _prefixTree: PrefixTree;
        _directMatchDictionary: StringMap<MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[]>;
        private _disposables;
        /**
         * Creates an instance of SearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: FilterComboField, filterOptions: FilterOptions);
        /**
         * See interface
         */
        dispose(): void;
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[];
        _setFilteredItems(filteredItems: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[]): void;
        _addToSearchOnInitialize(item: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>, searchString: string): void;
        _addToPrefixTree(tree: PrefixTree, words: string[], value: string, delimiter?: string): void;
        _pushItem(dictionary: {
            [searchTerm: string]: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[];
        }, currentValue: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>, searchTerm: string): void;
        private _sortItems(items);
        private _compareItems(item1, item2);
    }
    /**
     * Tree Search filter for searching a hierarchical list of string items, to be used with FilterCombo.
     * Tree is flattened using a delimiter that is passed in filter options. A Breadth-First-Search of
     * the hiearchical tree data is performed and each node is appended to path from root with delimiters
     * separating the node values.
     */
    class TreeSearchFilter extends SearchFilter {
        private _defaultDelimiter;
        private _childPrefixTree;
        private _childMatchDictionary;
        /**
         * Creates an instance of TreeSearchFilter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: FilterComboField, filterOptions: FilterOptions);
        /**
         * Filters data with a prefix tree search, the search currently is case insensitive
         *
         * @param filterString The filter string to search for.
         * @return The filtered items. If nothing matches, returns empty array.
         */
        filterData(filterString: string): MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[];
        _setFilteredItems(items: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>[]): void;
        _addToSearchOnInitialize(item: MsPortalFx.ViewModels.Forms.FilterComboBox.HierarchicalFormOption<string>, searchString: string): void;
        private _ensureNoDuplicates(filteredData);
        private _processMatch(matches, isResultProcessed);
        private _processMatches(matches, extendedMatches);
        private _itemArrayContains(itemArray, item);
        private _flattenTree(data);
        private _addTreeNodeToPrefixTree(tree, originalValue, newValue);
        private _updateCurrentItem(currentItem, next, originalValue, newValue, matchType);
    }
    /**
     * Search filter factory for providing a search filter based on the filter options provided
     */
    class FilterFactory {
        /**
         * Gets a search filter.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param viewModel FilterCombo viewmodel to update data into.
         * @param filterOptions Options to filter values list, if data is hierarchical.
         * @return The corresponding search filter.
         */
        getSearchFilter(lifetimeManager: MsPortalFx.Base.LifetimeManager, viewModel: FilterComboField, filterOptions: FilterOptions): SearchFilter;
    }
    /**
     * Prefix Tree that can be used for prefix searching in a list of strings.
     */
    class PrefixTree {
        private _root;
        /**
         * Adds a word to the prefix tree
         *
         * @param word Word to add to the prefix tree.
         * @param line Line to return for prefix result.
         */
        addWord(word: string, line: string): void;
        /**
         * Finds a query in the prefix tree
         *
         * @param query String to search for.
         * @return results  query string results, empty array if not found.
         */
        getMatches(query: string): string[];
        private _findLineMatches(node);
    }
}
declare module MsPortalFx.ViewModels {
    interface TypableFormField<T> extends NullableFormField<T> {
        /**
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger: MsPortalFx.ViewModels.Controls.ValueUpdateTrigger;
    }
    class TypableField<T> extends EditableField<T> implements TypableFormField<T> {
        /**
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger: MsPortalFx.ViewModels.Controls.ValueUpdateTrigger;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface MultiLineTextFormField extends TypableFormField<string> {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * The number of rows to set the height of the textarea to.
         * This maps to the textarea rows attribute.
         */
        rows: KnockoutObservable<number>;
    }
    class MultiLineTextField extends TypableField<string> implements MultiLineTextFormField {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * The number of rows to set the height of the textarea to.
         * This maps to the textarea rows attribute.
         */
        rows: KnockoutObservable<number>;
        /**
         * Constructs an instance of a multi-line text box form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param emptyValueText Optional. Watermark text to display over the form field when it's empty.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         * @param rows Optional. The number of rows to set the height of the textarea to.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<string>, label: string, validations?: FormValidation[], emptyValueText?: string, infoBalloonContent?: string, rows?: number);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface NumericTextBoxFormField extends EditableFormField<number> {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
    }
    class NumericTextBoxField extends EditableField<number> implements NumericTextBoxFormField {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
        /**
         * Constructs an instance of a numeric text box form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<number>, label: string, validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface OptionsGroupFormField<T> extends OptionsFormField<T> {
    }
    class OptionsGroupField<T> extends OptionsField<T> implements OptionsGroupFormField<T> {
        /**
         * Creates an instance of an options group form field. Displayed as radio buttons.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param values A list of options the user will choose the field value from.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, values: MsPortalFx.ViewModels.Forms.IDisablableOption<T>[], validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface PasswordFormField extends EditableFormField<string> {
        /**
         * Placeholder text shown when password is empty.
         */
        emptyValueText?: KnockoutObservable<string>;
    }
    class PasswordField extends EditableField<string> implements PasswordFormField {
        /**
         * Placeholder text shown when password is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Constructs an instance of a password form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<string>, label: string, validations?: FormValidation[], infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface SliderBaseFormField<T> extends FormField<T> {
        /**
         * Minimum value of the slider.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value of the slider.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
    }
    class SliderBaseField<T> extends Field<T> implements SliderBaseFormField<T> {
        /**
         * Minimum value for the field.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value for the field.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Whether to show step markers on the slider field.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
        /**
         * Constructs an instance of a slider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param minValue Minimum value for the field.
         * @param maxValue Maximum value for the field.
         * @param validations A list of validations to be applied to the field.
         * @param showStepMarkers If true step markers will be shown on the slider.
         * @param defaultValue An optional, default value of type T, used when the EditScope underlying the enclosing Form isn't
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors?: FormFieldValueAccessors<T>, label?: string, minValue?: number, maxValue?: number, validations?: FormValidation[], showStepMarkers?: boolean, infoBalloonContent?: string, defaultValue?: T, step?: number);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface RangeSliderFormField extends SliderBaseFormField<string> {
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
    }
    class RangeSliderField extends SliderBaseField<string> implements RangeSliderFormField {
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
        /**
         * Constructs an instance of a slider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param minValue Minimum value for the field.
         * @param maxValue Maximum value for the field.
         * @param validations A list of validations to be applied to the field.
         * @param showStepMarkers If true step markers will be shown on the slider.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors?: FormFieldValueAccessors<string>, label?: string, minValue?: number, maxValue?: number, validations?: FormValidation[], showStepMarkers?: boolean, infoBalloonContent?: string, step?: number);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface SelectorFormField<T> extends EditableFormField<T>, MsPortalFx.ViewModels.Obsolete.Controls.Forms.Selector.ContractBase<T> {
    }
    class SelectorField<T> extends EditableField<T> implements SelectorFormField<T> {
        /**
         * The default value for the selector.
         */
        defaultValue: KnockoutObservableBase<T>;
        /**
         * True if the value is displayed, else false.
         */
        showValue: KnockoutObservableBase<boolean>;
        /**
         * True if the current value is the default; else false.
         */
        isDefault: KnockoutObservableBase<boolean>;
        /**
         * The display text for the value in the selector.
         */
        displayText: KnockoutObservableBase<string>;
        /**
         * The icon displayed next to the label and value.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * See interface.
         */
        selectable: Selectable<DynamicBladeSelection>;
        /**
         * True if the field is locked; else false.
         */
        locked: KnockoutObservableBase<boolean>;
        /**
         * Text to display on the balloon shown next to the label.
         */
        infoBalloonText: KnockoutObservableBase<string>;
        /**
         * Text to display on the balloon shown over the locked indicator.
         */
        lockedBalloonText: KnockoutObservableBase<string>;
        /**
         * Link to display within the balloon underneath the text, the balloon is shown next to the label.
         */
        infoBalloonLink: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        /**
         * Creates a new selector field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         * @param initialState Optional. The initial state for the Selector field.
         * @param selectedValue Optional. The default selected value for the Selector field.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<T>, label: string, validations?: FormValidation[], infoBalloonContent?: string, initialState?: any, selectedValue?: MsPortalFx.ViewModels.DynamicBladeSelection, infoBalloonLink?: MsPortalFx.ViewModels.Controls.Balloon.Link);
        /**
         * See interface.
         */
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface SliderFormField extends SliderBaseFormField<number> {
    }
    class SliderField extends SliderBaseField<number> implements SliderFormField {
        /**
         * Constructs an instance of a slider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param minValue Minimum value for the field.
         * @param maxValue Maximum value for the field.
         * @param validations A list of validations to be applied to the field.
         * @param showStepMarkers If true step markers will be shown on the slider.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors?: FormFieldValueAccessors<number>, label?: string, minValue?: number, maxValue?: number, validations?: FormValidation[], showStepMarkers?: boolean, infoBalloonContent?: string, step?: number);
    }
}
declare module MsPortalFx.ViewModels.Obsolete {
    interface TextFormField extends TypableFormField<string> {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
    }
    class TextField extends TypableField<string> implements TextFormField {
        /**
         * Text displayed in the field when the form value is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Constructs and instance of a text box form field.
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger: MsPortalFx.ViewModels.Controls.ValueUpdateTrigger;
        /**
         * Constructs an instance of a text box form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fieldValueAccessors Accessor functions to retrieve observables reflecting original and editable
         * values for the field.  Acquire this using 'createFieldValueAccessors' on the form containing this field.
         * @param label Text for the label for this form field.
         * @param validations Optional. A list of validations to be applied to the field.
         * @param emptyValueText Optional. Watermark text to display over the form field when it's empty.
         * @param infoBalloonContent Optional. The content for an infoBalloon explaining the form field. If not provided, no balloon is displayed.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fieldValueAccessors: FormFieldValueAccessors<string>, label: string, validations?: FormValidation[], emptyValueText?: string, infoBalloonContent?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface StaticMessageFormValidation extends FormValidation {
        /**
         * The message to be displayed when validation fails.
         */
        message: string;
        /**
         * Indicates whether an empty value is valid or not.
         */
        isEmptyValid?: KnockoutObservable<boolean>;
    }
    class StaticMessageValidation extends Validation implements StaticMessageFormValidation {
        /**
         * The message to be displayed when validation fails.
         */
        message: string;
        /**
         * Indicates whether an empty value is valid or not.
         */
        isEmptyValid: KnockoutObservable<boolean>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param message The message to show the user when validation fails.
         */
        constructor(type: FormValidationType, message: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface CaseInsensitiveComparisonFormValidation extends StaticMessageFormValidation {
        /**
         * The value the field value will be compared to.
         */
        compareTo: string;
    }
    class CaseInsensitiveComparisonValidation extends StaticMessageValidation implements CaseInsensitiveComparisonFormValidation {
        /**
         * The value the field value will be compared to.
         */
        compareTo: string;
        /**
         * Validation that uses toLowerCase() to compare two values.
         *
         * @param message The message to show the user when validation fails.
         */
        constructor(compareTo: string, message: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface ContainsCharactersFormValidation extends StaticMessageFormValidation {
        /**
         * One or more characters to search for.
         */
        characters: string;
    }
    class ContainsCharactersValidation extends StaticMessageValidation implements ContainsCharactersFormValidation {
        /**
         * One or more characters to search for.
         */
        characters: string;
        /**
         * Constructs a validator that checks that the value contains at least one character from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface ContainsFormValidation extends StaticMessageFormValidation {
        /**
         * The search string to be searched for.
         */
        searchString: string;
    }
    class ContainsValidation extends StaticMessageValidation implements ContainsFormValidation {
        /**
         * The search string to be searched for.
         */
        searchString: string;
        /**
          * Constructs a validator that checks that the value contains at least one case insensitive match of a search string.
          *
          * @param search The search string to match.
          * @param message Validation rule error message.
          */
        constructor(searchString: string, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface ValidationResult {
        /**
         * Whether or not the field is valid.
         */
        valid: boolean;
        /**
         * The message to show when the field is invalid.
         */
        message: string;
    }
}
declare module MsPortalFx.ViewModels {
    interface CustomFormValidation extends FormValidation {
        /**
         * Function that returns whether the data is valid or not.
         *
         * @param value The field value to validate.
         * @return The promise to validate the value.
         */
        validate: (value: any) => MsPortalFx.Base.PromiseV<ValidationResult>;
        /**
         *  The message that is shown to the user if a message is not included as part of the validation result.
         */
        message: string;
    }
    class CustomValidation extends Validation implements CustomFormValidation {
        /**
         * Function that returns whether the data is valid or not.
         */
        validate: (value: any) => MsPortalFx.Base.PromiseV<ValidationResult>;
        /**
         *  The message that is shown to the user if a message is not included as part of the validation result.
         */
        message: string;
        constructor(message: string, validate: (value: any) => MsPortalFx.Base.PromiseV<ValidationResult>);
    }
}
declare module MsPortalFx.ViewModels {
    interface EqualsFormValidation<T> extends StaticMessageFormValidation {
        /**
         * The value the field value will be compared to.
         */
        compareTo: T;
    }
    class EqualsValidation<TValue> extends StaticMessageValidation implements EqualsFormValidation<TValue> {
        /**
         * The value the field value will be compared to.
         */
        compareTo: TValue;
        /**
         * Constructs a validator that compares if the value is equal to a provided value.
         *
         * @param compareTo The value or accessor to get the value to compare to.
         * @param message Validation rule error message.
         */
        constructor(compareTo: TValue, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface HasDigitFormValidation extends StaticMessageFormValidation {
    }
    class HasDigitValidation extends StaticMessageValidation implements HasDigitFormValidation {
        /**
         * Constructs a validator that checks that the value has at least one digit from 0 to 9.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface HasLetterFormValidation extends StaticMessageFormValidation {
    }
    class HasLetterValidation extends StaticMessageValidation implements HasLetterFormValidation {
        /**
         * Constructs a validator that checks that the value has at least one upper or lower case letter from A to Z or a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface HasLowerCaseLetterFormValidation extends StaticMessageFormValidation {
    }
    class HasLowerCaseLetterValidation extends StaticMessageValidation implements HasLowerCaseLetterFormValidation {
        /**
         * Constructs a validator that checks that the value has at least one lower case letter from a to z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface HasPunctuationFormValidation extends StaticMessageFormValidation {
    }
    class HasPunctuationValidation extends StaticMessageValidation implements HasPunctuationFormValidation {
        /**
         * Constructs a validator that checks that the value contains at least one punctuation character from:
         * ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \ : " ; ' < > , . ? / ~ `
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface HasUpperCaseLetterFormValidation extends StaticMessageFormValidation {
    }
    class HasUpperCaseLetterValidation extends StaticMessageValidation implements HasUpperCaseLetterFormValidation {
        /**
         * Constructs a validator that checks that the value has at least one upper case letter from A to Z.
         * (Not Unicode)
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface LengthRangeFormValidation extends StaticMessageFormValidation {
        /**
         * The minimum number of characters to be valid.
         */
        min: number;
        /**
         * The maximum number of characters to be valid.
         */
        max: number;
    }
    class LengthRangeValidation extends StaticMessageValidation implements LengthRangeFormValidation {
        /**
         * The minimum number of characters to be valid.
         */
        min: number;
        /**
         * The maximum number of characters to be valid.
         */
        max: number;
        /**
         * Constructs a validator that checks that the value length is between min and max.
         *
         * @param min The minimum number of characters to be valid. May be null if there is no min.
         * @param max The maximum number of characters to be valid. May be null if there is no max.
         * @param message Validation rule error message.
         */
        constructor(min: number, max: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface LocaleAwareCaseInsensitiveComparisonFormValidation extends StaticMessageFormValidation {
        /**
         * The value the field value will be compared to.
         */
        compareTo: string;
    }
    class LocaleAwareCaseInsensitiveComparisonValidation extends StaticMessageValidation implements LocaleAwareCaseInsensitiveComparisonFormValidation {
        /**
         * The value the field value will be compared to.
         */
        compareTo: string;
        /**
         * Validation that uses toLocaleLowerCase() to compare two values.
         *
         * @param message The message to show the user when validation fails.
         */
        constructor(compareTo: string, message: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface MaxLengthFormValidation extends StaticMessageFormValidation {
        /**
         * The maximum number of characters to be valid.
         */
        max: number;
    }
    class MaxLengthValidation extends StaticMessageValidation implements MaxLengthFormValidation {
        /**
         * The maximum number of characters to be valid.
         */
        max: number;
        /**
         * Constructs a validator that checks that the value length is less than or equal to the max.
         *
         * @param max The maximum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface MaxValueFormValidation extends StaticMessageFormValidation {
        /**
         * Maximum field value that is considered valid.
         */
        max: number;
    }
    class MaxValueValidation extends StaticMessageValidation implements MaxValueFormValidation {
        /**
         * Maximum field value that is considered valid.
         */
        max: number;
        /**
         * Constructs a validator that checks whether the value is less than than or equal to the specified maximum number.
         *
         * @param max Maximum field value.
         * @param message Validation rule error message.
         */
        constructor(max: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface MinLengthFormValidation extends StaticMessageFormValidation {
        /**
         * The minimum number of characters to be valid.
         */
        min: number;
    }
    class MinLengthValidation extends StaticMessageValidation implements MinLengthFormValidation {
        /**
         * The minimum number of characters to be valid.
         */
        min: number;
        /**
         * Constructs a validator that checks that the value length is at least min.
         *
         * @param min The minimum number of characters to be valid.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface MinValueFormValidation extends StaticMessageFormValidation {
        /**
         * Minimum field value that is considered valid.
         */
        min: number;
    }
    class MinValueValidation extends StaticMessageValidation implements MinValueFormValidation {
        /**
         * Minimum field value that is considered valid.
         */
        min: number;
        /**
         * Constructs a validator that checks whether the value is greater than or equal to the specified minimum number.
         *
         * @param min Minimum field value.
         * @param message Validation rule error message.
         */
        constructor(min: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface NotContainsCharactersFormValidation extends StaticMessageFormValidation {
        /**
         * One or more characters to search for.
         */
        characters: string;
    }
    class NotContainsCharactersValidation extends StaticMessageValidation implements NotContainsCharactersFormValidation {
        /**
         * One or more characters to search for.
         */
        characters: string;
        /**
         * Constructs a validator that checks that the value does not contain any characters from a character set.
         *
         * @param characters One or more characters to search for.
         * @param message Validation rule error message.
         */
        constructor(characters: string, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface NotContainsFormValidation extends StaticMessageFormValidation {
        /**
         * The search string to be searched for.
         */
        searchString: string;
    }
    class NotContainsValidation extends StaticMessageValidation implements NotContainsFormValidation {
        /**
         * The search string to be searched for.
         */
        searchString: string;
        /**
         * Constructs a validator that checks that the value does not contain a case insensitive match of a search string.
         *
         * @param search The search string to match.
         * @param message Validation rule error message.
         */
        constructor(searchString: string, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface NotRegExMatchFormValidation extends StaticMessageFormValidation {
        /**
         * The regular expression that if matched will cause the field value to fail validation.
         */
        pattern: string;
    }
    class NotRegExMatchValidation extends StaticMessageValidation implements NotRegExMatchFormValidation {
        /**
         * The regular expression that if matched will cause the field value to fail validation.
         */
        pattern: string;
        /**
         * Constructs a validator that checks if the value does not match a regular expression.
         *
         * @param pattern Regular expression to test the value against.
         * @param message Validation rule error message.
         */
        constructor(pattern: string, message: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface NumericFormValidation extends StaticMessageFormValidation {
    }
    class NumericValidation extends StaticMessageValidation implements NumericFormValidation {
        /**
         * Constructs a validator that checks whether the value is a number.
         *
         * @param message Validation rule error message.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface RangeFormValidation extends StaticMessageFormValidation {
        /**
         * Minimum field value that is considered valid.
         */
        min: number;
        /**
         * Maximum field value that is considered valid.
         */
        max: number;
    }
    class RangeValidation extends StaticMessageValidation implements RangeFormValidation {
        /**
         * Minimum field value that is considered valid.
         */
        min: number;
        /**
         * Maximum field value that is considered valid.
         */
        max: number;
        constructor(min: number, max: number, message?: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface RegExMatchFormValidation extends StaticMessageFormValidation {
        /**
         * The regular expression field value must match to pass validation.
         */
        pattern: string;
    }
    class RegExMatchValidation extends StaticMessageValidation implements RegExMatchFormValidation {
        /**
         * The regular expression field value must match to pass validation.
         */
        pattern: string;
        /**
         * Constructs and instance of the regular expression validation which ensure value matches regular expression.
         *
         * @param pattern Regular expression pattern to match.
         * @param message The message to show the user when validation fails.
         */
        constructor(pattern: string, message: string);
    }
}
declare module MsPortalFx.ViewModels {
    interface RequiredFormValidation extends StaticMessageFormValidation {
    }
    class RequiredValidation extends StaticMessageValidation implements RequiredFormValidation {
        /**
         * Constructs and instance of the required validation which will ensure value is non-empty.
         *
         * @param message The message to show the user when validation fails.
         */
        constructor(message?: string);
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Groups {
    interface Options<T> extends Input.Options<T> {
        /**
         * A list of groups to categorize the selectable options.
         * Dynamic update of groups array is not yet supported for multiselect dropdown.
         * Consumers must initialize the groups before widget instantiation.
         */
        groups: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IGroup<T>>;
    }
    class ViewModel<T> extends Input.ViewModel<T> {
        /**
         * A list of groups to categorize the selectable options.
         * Dynamic update of groups array is not yet supported for multiselect dropdown.
         * Consumers must initialize the groups before widget instantiation.
         */
        groups: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IGroup<T>>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the GroupsField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the GroupsField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Groups.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Options {
    interface Options<T> extends Input.Options<T> {
        /**
         * A list of options the use can select the field value from.
         */
        options?: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IDisablableOption<T>>;
    }
    class ViewModel<T> extends Input.ViewModel<T> {
        /**
         * A list of options the use can select the field value from.
         */
        options: KnockoutObservableArray<MsPortalFx.ViewModels.Forms.IDisablableOption<T>>;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the OptionsField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the OptionsField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Options.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Slider {
    interface Options<T> extends Base.Input.Options<T> {
        /**
        * Minimum value of the slider.
        */
        min?: KnockoutObservableBase<number>;
        /**
         * Maximum value of the slider.
         */
        max?: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step?: KnockoutObservableBase<number>;
        /**
         * Displays a marker for each step.
         */
        showStepMarkers?: KnockoutObservableBase<boolean>;
    }
    class ViewModel<T> extends Input.ViewModel<T> {
        /**
         * Minimum value for the field.
         */
        min: KnockoutObservableBase<number>;
        /**
         * Maximum value for the field.
         */
        max: KnockoutObservableBase<number>;
        /**
         * Determines the size or amount of each interval or step the slider takes between min and max.
         */
        step: KnockoutObservableBase<number>;
        /**
         * Whether to show step markers on the slider field.
         */
        showStepMarkers: KnockoutObservableBase<boolean>;
        /**
         * Constructs an instance of a slider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the SliderBaseField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the SliderBaseField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.Base.Typable {
    interface Options<T> extends Editable.Options<T> {
        /**
         * When value update trigger is set to fire on every keypress this is the timeout between value updates before validation runs.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout?: KnockoutObservable<number>;
        /**
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger?: MsPortalFx.ViewModels.Controls.ValueUpdateTrigger;
    }
    class ViewModel<T> extends Editable.ViewModel<T> {
        /**
         * When value update trigger is set to fire on every keypress this is the timeout between value updates before validation runs.
         * Specify the timeout in milliseconds.
         */
        delayValidationTimeout: KnockoutObservable<number>;
        /**
         *  Trigger value update notifications based on enum option.
         *  By default, value will be updated on blur. This can be changed to receive continous updates on each key stroke.
         */
        valueUpdateTrigger: MsPortalFx.ViewModels.Controls.ValueUpdateTrigger;
        /**
         * Abstract base class. Do not use this class directly.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the EditableField is contained.
         * @param pathOrAccessor The path to the value on the EditScope to be bound to this field, or the accessor to the edit scope property.
         * @param options Optional The set of options to configure the EditableField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<T>, pathOrAccessor: any, options?: Typable.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Vso.Forms.ArtifactLinks {
    import Column = MsPortalFx.ViewModels.Controls.Lists.Grid.Column;
    interface ArtifactLink {
        /**
         * The group to which this artifact link belongs.
         */
        group: KnockoutObservableBase<string>;
        /**
         * A unique identifier for the artifact link.
         */
        uniqueId: KnockoutObservableBase<string>;
        /**
         * The attributes of the artifact link.
         */
        [key: string]: KnockoutObservableBase<string>;
    }
    interface Options<TSelection> extends MsPortalFx.ViewModels.Forms.Base.Editable.Options<ArtifactLink[]> {
        /**
         * The set of grid columns to display in the control.
         */
        columns?: KnockoutObservableArray<Column>;
        /**
         * A factory function that creates a selection based on an artifact link.
         *
         * @param item The item for which selection needs to be created.
         * @return The selection for the specified item.
         */
        createSelection?: (item: ArtifactLink) => TSelection;
        /**
         * A function that determines if an item matches a selection.
         *
         * @param item The artifact link item to be matched.
         * @param selection The selection to match the item to.
         * @return True if the item matches the selection; else false.
         */
        itemMatchesSelection?: (item: ArtifactLink, selection: TSelection) => boolean;
        /**
         * The name to associate with the ArtifactLinks
         */
        name?: string;
        /**
         * Summary of the table.
         */
        summary?: KnockoutObservable<string>;
        /**
         * Text of the command to remove artifact links
         */
        removeItemText?: string;
    }
    /**
     * The view model for displaying a set of artifact links
     */
    class ViewModel<TSelection> extends MsPortalFx.ViewModels.Forms.Base.Editable.ViewModel<ArtifactLink[]> {
        /**
         * The grid model encapsulated by the artifact links control.
         */
        private _msPortalFxGridViewModel;
        /**
         * See interface.
         */
        columns: KnockoutObservableArray<Column>;
        /**
         * See interface.
         */
        name: KnockoutObservable<string>;
        /**
         * See interface.
         */
        summary: KnockoutObservable<string>;
        /**
         * See interface.
         */
        removeItemText: string;
        /**
         * Constructs a standalone instance of a the form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: ArtifactLinks.Options<TSelection>);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: ArtifactLinks.Options<TSelection>);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<TSelection>, options?: ArtifactLinks.Options<TSelection>);
        /**
         * See interface.
         */
        selectableData: MsPortalFx.ViewModels.SelectableSet<ArtifactLink, TSelection>;
        private _createGridViewModel(linksOptions);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<ArtifactLink[]>): void;
        _setEditScopeAccessors(fieldValueAccessors: MsPortalFx.ViewModels.Forms.EditScopeAccessors<ArtifactLink[]>, form?: MsPortalFx.ViewModels.Forms.Form.ViewModel<ArtifactLink[]>): void;
    }
}
declare module MsPortalFx.ViewModels.Vso.Forms.Attachment {
    interface AttachedFile {
        /**
         * The identifier of the attached File.
         */
        id: string;
        /**
         * The attachment file name.
         */
        fileName: string;
        /**
         * The size of the attachment in bytes.
         */
        sizeInBytes: number;
        /**
         * The date the attachment was added.
         */
        addedDate: Date;
        /**
         * The comment associated with the attachment.
         */
        comment: string;
        /**
         * The attachment location URL (used for downloads, etc.).
         */
        url: string;
        /**
         * Provides an observable that can be subscribed to for reaction to upload events.
         */
        uploadTask?: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Forms.FileUpload.UploadTask>;
        /**
         * Provides a mechanism to start/stop the file upload process.
         */
        uploadTrigger?: KnockoutObservableBase<boolean>;
    }
    interface Options extends MsPortalFx.ViewModels.Forms.Base.Editable.Options<AttachedFile[]> {
        /**
         * The maximum number of files that can be selected for upload at one time.
         */
        maxFileSelection?: number;
    }
    class ViewModel extends MsPortalFx.ViewModels.Forms.Base.Editable.ViewModel<AttachedFile[]> {
        /**
         * The maximum number of files that can be selected for upload at one time.
         */
        maxFileSelection: number;
        /**
         * Constructs a standalone instance of a the form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Attachment.Options);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: Attachment.Options);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<AttachedFile[]>, options?: Attachment.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<AttachedFile[]>): void;
        _setEditScopeAccessors(fieldValueAccessors: MsPortalFx.ViewModels.Forms.EditScopeAccessors<AttachedFile[]>, form?: MsPortalFx.ViewModels.Forms.Form.ViewModel<AttachedFile[]>): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.CheckBox {
    interface Options extends Base.Input.Options<boolean> {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel?: boolean;
    }
    class ViewModel extends Base.Input.ViewModel<boolean> {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel: boolean;
        /**
         * Constructs a standalone instance of a CheckBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the CheckBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: CheckBox.Options);
        /**
         * Constructs an instance of a CheckBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the CheckBoxField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the CheckBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: CheckBox.Options);
        /**
         * Constructs an instance of a CheckBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the CheckBoxField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the CheckBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<boolean>, options?: CheckBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.CustomHtml {
    /**
     * Options describing the behavior of custom html form elements.
     */
    interface Options extends Base.LabelAndBalloon.Options {
        /**
         * The html template to display as the body of the form.
         */
        htmlTemplate: KnockoutObservable<string>;
        /**
         * The object to bind to the template.
         */
        innerViewModel?: any;
    }
    /**
     * CustomHtml form element view model.
     */
    class ViewModel extends Base.LabelAndBalloon.ViewModel {
        /**
         * An html template.  value is the object that is bound to this template.
         */
        htmlTemplate: KnockoutObservable<string>;
        /**
         * The object to bind to the template.
         */
        innerViewModel: any;
        /**
         * Validity of entries in this form element.  This is set to true if all child form elements are valid, and false otherwise.
         */
        valid: KnockoutObservableBase<boolean>;
        /**
         * Determines if the field is currently loading.  Defaults to false.
         */
        loading: KnockoutObservable<boolean>;
        /**
         * The type of the form element.
         */
        type: MsPortalFx.ViewModels.ControlType;
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutObservableBase<boolean>;
        /**
         * When changed forces validation on the field.
         */
        validate: KnockoutObservable<number>;
        /**
         * Internal view model property.
         */
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        /**
         * Constructs a standalone instance of a CustomHtml form element.
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the CustomHtmlField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: CustomHtml.Options);
        /**
         * Clears validation on the field.
         * @return A promise that is resolved when the validation has been cleared.
         */
        clearValidation(): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Forms.DatePicker {
    interface Options extends Base.EditableComboBox.Options<Date> {
        /**
         * A valid format string specifier (see DateUtil format), used to format the value.
         */
        formatString?: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date.
         */
        enabledDateTimeRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
    }
    class ViewModel extends Base.EditableComboBox.ViewModel<Date> {
        /**
         * Date/time range in which user is able to select date.
         */
        enabledDateTimeRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Constructs a standalone instance of a DatePicker form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the DatePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: DatePicker.Options);
        /**
         * Constructs an instance of a DatePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DatePicker is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the DatePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: DatePicker.Options);
        /**
         * Constructs an instance of a DatePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DatePicker is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the DatePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Date>, options?: DatePicker.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<Date>): void;
        _setEditScopeAccessors(fieldValueAccessors: EditScopeAccessors<Date>): void;
    }
}
declare module MsPortalFx.ViewModels.Obsolete.Forms.DateTimeComboBox {
    interface Options extends MsPortalFx.ViewModels.Forms.Base.EditableComboBox.Options<Date> {
        /**
         * A valid format string specifier (see date.format polyfill), used to format the value.
         */
        formatString?: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Forms.Base.EditableComboBox.ViewModel<Date> {
        /**
         * A valid format string specifier (see date.format polyfill), used to format the value.
         */
        formatString: KnockoutObservable<string>;
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Constructs a standalone instance of a DateTimeComboBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the DateTimeComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: DateTimeComboBox.Options);
        /**
         * Constructs an instance of a DateTimeComboBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimeComboField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the DateTimeComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: DateTimeComboBox.Options);
        /**
         * Constructs an instance of a DateTimeComboBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimeComboField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the DateTimeComboField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Date>, options?: DateTimeComboBox.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<Date>): void;
        _setEditScopeAccessors(fieldValueAccessors: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Date>, form?: MsPortalFx.ViewModels.Forms.Form.ViewModel<Date>): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.DateTimePicker {
    interface Options extends Base.EditableComboBox.Options<Date> {
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown?: KnockoutObservable<boolean>;
        /**
         * Timezone offset.
         */
        timezoneOffset?: KnockoutObservable<number>;
    }
    class ViewModel extends Base.EditableComboBox.ViewModel<Date> {
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Dropdown for timezones.
         */
        timezoneOffset: KnockoutObservable<number>;
        /**
         * Constructs a standalone instance of a DateTimePicker form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the DateTimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: DateTimePicker.Options);
        /**
         * Constructs an instance of a DateTimePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimePicker is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the DateTimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: DateTimePicker.Options);
        /**
         * Constructs an instance of a DateTimePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimePicker is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the DateTimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Date>, options?: DateTimePicker.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<Date>): void;
        _setEditScopeAccessors(fieldValueAccessors: EditScopeAccessors<Date>): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.DateTimeRangePicker {
    interface Options extends Base.EditableComboBox.Options<DateUtil.DateTimeRange> {
        /**
         * Enabled range for start date/time
         */
        startDateTimeEnabledRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Enabled range for end date/time
         */
        endDateTimeEnabledRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown?: KnockoutObservable<boolean>;
        /**
         * Timezone offset.
         */
        timezoneOffset?: KnockoutObservable<number>;
        /**
         * Display start/end date/time fields inline (false by default).
         */
        displayFieldsInline?: KnockoutObservable<boolean>;
    }
    class ViewModel extends Base.EditableComboBox.ViewModel<DateUtil.DateTimeRange> {
        /**
         * Enabled range for start date/time
         */
        startDateTimeEnabledRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Enabled range for end date/time
         */
        endDateTimeEnabledRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Show time zone dropdown.
         */
        showTimezoneDropdown: KnockoutObservable<boolean>;
        /**
         * Dropdown for timezones.
         */
        timezoneOffset: KnockoutObservable<number>;
        /**
         * Display start/end date/time fields inline (false by default).
         */
        displayFieldsInline: KnockoutObservable<boolean>;
        /**
         * Constructs a standalone instance of a DateTimeRangePicker form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the DateTimeRangePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: DateTimeRangePicker.Options);
        /**
         * Constructs an instance of a DateTimeRangePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimeRangePicker is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the DateTimeRangePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: DateTimeRangePicker.Options);
        /**
         * Constructs an instance of a DateTimeRangePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DateTimeRangePicker is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the DateTimeRangePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<DateUtil.DateTimeRange>, options?: DateTimeRangePicker.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<DateUtil.DateTimeRange>): void;
        _setEditScopeAccessors(fieldValueAccessors: EditScopeAccessors<DateUtil.DateTimeRange>): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.DropDown {
    interface Options<T> extends Base.Options.Options<T> {
    }
    class ViewModel<T> extends Base.Options.ViewModel<T> {
        /**
         * Constructs a standalone instance of a DropDown form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the DropDownField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: DropDown.Options<T>);
        /**
         * Constructs an instance of a DropDown form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DropDownField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the DropDownField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options: DropDown.Options<T>);
        /**
         * Constructs an instance of a DropDown form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the DropDownField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the DropDownField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<T>, options: DropDown.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.HtmlEditor {
    interface Options extends Base.Editable.Options<string> {
    }
    class ViewModel extends Base.Editable.ViewModel<string> {
        /**
         * Constructs a standalone instance of a TextBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: HtmlEditor.Options);
        /**
         * Constructs an instance of a TextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TextField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: HtmlEditor.Options);
        /**
         * Constructs an instance of a TextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TextField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options?: HtmlEditor.Options);
    }
}
declare module MsPortalFx.ViewModels.Vso.Forms.History {
    interface Options<TSelection> extends MsPortalFx.ViewModels.Forms.Base.Editable.Options<IWorkItemHistoryItemViewModel[]> {
        /**
         * The max height for the control. This is applied via CSS.
         */
        maxHeight?: number;
        /**
         * A factory function that creates a selection based on an history link.
         *
         * @param item The item for which selection needs to be created.
         * @return The selection for the specified item.
         */
        createSelection?: (item: IHistoryLinkChange) => TSelection;
        /**
         * A function that determines if an item matches a selection.
         *
         * @param item The history link item to be matched.
         * @param selection The selection to match the item to.
         * @return True if the item matches the selection; else false.
         */
        itemMatchesSelection?: (item: IHistoryLinkChange, selection: TSelection) => boolean;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IHistoryAttachmentChange {
        /**
         * The attachment file name.
         */
        name: string;
        /**
         * The attachment size in bytes.
         */
        size: number;
        /**
         * The comment for the attachment.
         */
        comment: string;
        /**
         * Indicator if the change is an add event or delete event.
         */
        isAdded: boolean;
        /**
         * The download URL for the attachment.
         */
        downloadUrl: string;
        /**
         * Whether a download link should be rendered for the attachment
         * (no link should be rendered if the link has been eventually deleted)
         */
        allowDownload: boolean;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IHistoryLinkChange {
        /**
         * The link change type.
         */
        type: string;
        /**
         * The text to render for the asset link.
         */
        referenceText: string;
        /**
         * The asset deep link URL.
         */
        referenceUrl?: string;
        /**
         * The link description.
         */
        description: string;
        /**
         * Indicator if the change is an add event or delete event.
         */
        isAdded: boolean;
        /**
         * The uniqe id for the link.
         */
        linkId?: string;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IFieldChanges {
        /**
         * The field name.
         */
        fieldName: string;
        /**
         * The old value for the field.
         */
        oldValue: string;
        /**
         * The new value for the field.
         */
        newValue: string;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IEditAction {
        /**
         * The edit action index.
         */
        index: number;
        /**
         * The edit type.
         */
        type: any;
        /**
         * The date and time the edit occurred.
         */
        changedDate: Date;
        /**
         * The TFS user ID who made the edit.
         */
        changedBy: number;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IEditLinkAction extends IEditAction {
        /**
         * Additional info regarding the link data.
         */
        linkInfo: ILinkInfo;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IEditAttachmentAction extends IEditAction {
        /**
         * Additional info regarding the attachment data.
         */
        attachmentInfo: ILinkInfo;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface ILinkInfo {
        /**
         * The link ID.
         */
        ID?: number;
        /**
         * The link file ID.
         */
        FldID?: number;
        /**
         * The link comment
         */
        Comment?: string;
        /**
         * An indicator whether the comment has changed.
         */
        CommentChanged?: boolean;
        /**
         * An indicator if the link is locked.
         */
        Lock?: boolean;
        /**
         * An indicator if the link has changed.
         */
        LockChanged?: boolean;
        /**
         * The date the link was added.
         */
        AddedDate?: Date;
        /**
         * The date the link was removed (if ever).
         */
        RemovedDate?: Date;
        /**
         * The date the link was created.
         */
        CreationDate?: Date;
        /**
         * The date the link was last written.
         */
        LastWriteDate?: Date;
        /**
         * The original file name (for attachment links).
         */
        OriginalName?: string;
        /**
         * The file path. Used in some cases as a filename and in others as a unique identifier.
         */
        FilePath?: string;
        /**
         * The size of the linked item (for attachment links).
         */
        Length?: number;
        /**
         * The link type.
         */
        LinkType?: number;
        /**
         * The ID of the externally linked item.
         */
        ExtID?: number;
        /**
         * An indexer for link values.
         */
        [key: string]: any;
        /**
         * The ID of the link target.
         */
        targetId?: number;
        /**
         * The ID of the link source.
         */
        sourceId?: number;
        /**
         * The name of the command associted with the link.
         */
        command?: string;
        /**
         * A set of detailed data about the link.
         */
        linkData?: ILinkInfo;
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IWorkItemHistoryItem {
        /**
         * The history edit index.
         */
        editActionSetIndex: number;
        /**
         * The short description of the history rev.
         */
        summary: string;
        /**
         * The name of the user who initiated the change.
         */
        changedBy: string;
        /**
         * The date and time that the revision occurred
         */
        postedTime: Date;
        /**
         * Field revisions to be displayed in the grid.
         */
        fields: IFieldChanges[];
        /**
         * The history revision comment.
         */
        comment: string;
        /**
         * The link edit actions.
         */
        linkEditActions: IEditLinkAction[];
        /**
         * The attachment edit actions
         */
        attachmentEditActions: IEditAttachmentAction[];
    }
    /**
     * Should be kept in sync with the same interface on the TFS extension side.
     */
    interface IWorkItemHistoryItemViewModel extends IWorkItemHistoryItem {
        /**
         * The user icon for the one making the history revision.
         */
        icon: KnockoutObservable<string>;
        /**
         * Expanded/collapsed state of the history item.
         */
        isExpanded: KnockoutObservable<boolean>;
        /**
         * The history changes in the work item.
         */
        attachmentChanges: KnockoutObservableArray<IHistoryAttachmentChange>;
        /**
         * The link changes in the work item.
         */
        linkChanges: KnockoutObservableArray<IHistoryLinkChange>;
    }
    class ViewModel<TSelection> extends MsPortalFx.ViewModels.Forms.Base.Editable.ViewModel<IWorkItemHistoryItemViewModel[]> {
        /**
         * The max height for the control. This is applied via CSS.
         */
        maxHeight: number;
        links: KnockoutObservableArray<IHistoryLinkChange>;
        selectableData: MsPortalFx.ViewModels.SelectableSet<IHistoryLinkChange, TSelection>;
        /**
         * Constructs a standalone instance of a the form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: History.Options<TSelection>);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: History.Options<TSelection>);
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the control.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<TSelection>, options?: History.Options<TSelection>);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<IWorkItemHistoryItemViewModel[]>): void;
        _setEditScopeAccessors(fieldValueAccessors: MsPortalFx.ViewModels.Forms.EditScopeAccessors<IWorkItemHistoryItemViewModel[]>, form?: MsPortalFx.ViewModels.Forms.Form.ViewModel<IWorkItemHistoryItemViewModel[]>): void;
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.MultiLineTextBox {
    interface Options extends Base.Typable.Options<string> {
        /**
         * The number of rows to set the height of the textarea to.
         * This maps to the textarea rows attribute. The default is 7.
         */
        rows?: KnockoutObservable<number>;
    }
    class ViewModel extends Base.Typable.ViewModel<string> {
        /**
         * The number of rows to set the height of the textarea to.
         * This maps to the textarea rows attribute. The default is 7.
         */
        rows: KnockoutObservable<number>;
        /**
         * Constructs a standalone instance of a MultiLineTextBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the MultiLineTextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: MultiLineTextBox.Options);
        /**
         * Constructs an instance of a MultiLineTextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the MultiLineTextField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the MultiLineTextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: MultiLineTextBox.Options);
        /**
         * Constructs an instance of a MultiLineTextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the MultiLineTextField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the MultiLineTextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options?: MultiLineTextBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.MultiSelectDropDown {
    interface Options<T> extends Base.Groups.Options<T> {
        /**
         * Specify the format type and format option for customizing the option display value.
         */
        formatSetting?: MsPortalFx.ViewModels.FormOptionFormatSetting;
        /**
         * Turns on or off multiselect.
         */
        multiselect?: KnockoutObservable<boolean>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed?: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat?: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat?: KnockoutObservableBase<string>;
    }
    class ViewModel<T> extends Base.Groups.ViewModel<T> {
        /**
         * Specify the format type and format option for customizing the option display value.
         */
        formatSetting: MsPortalFx.ViewModels.FormOptionFormatSetting;
        /**
         * Turns on or off multiselect.
         */
        multiselect: KnockoutObservable<boolean>;
        /**
         * Maximum select rows counts.  When max is reached, the control will disable all the unselected item.
         */
        maxSelectAllowed: KnockoutObservable<number>;
        /**
         * Display Text Format when it is under max allowed.
         * By default. the format string is "{0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Display Text Format when max is reached.
         * By default. the format string is "max {0} selected"
         * The first argument({0}) is the selected rows count, for example, 3.
         * The second argument({1}) is the input value is going to submit, for example, "val1;val2;val3".
         * The third argument({2}) is the display value , for example, "display1;display2;display3".
         */
        multiItemsMaxDisplayFormat: KnockoutObservableBase<string>;
        /**
         * Value Separator for combining the selected item into a <input> value. For example, "val1;val2;val5".
         * We use standard javascript split function.  Can be a string.
         * By default, we use String.fromCharCode(0x1d). 0x1d is the <GS>, group separator, in ascii code which is not visible in the text box.
         * If you need to see this in the display text, change it to different character, or string.
         */
        valueSeparator: string;
        /**
         * Display Separator for combining the selected item into a displayable string. For example, "display1;display2;display3".
         * We use standard javascript split function.  Can be a string.
         * By default, we use ";" -- since this need to be visible.
         */
        displaySeparator: string;
        /**
        * Indicate value/selection is initialized.
        * If false, it will initialize the value from Items.selected information.
        * If true,  it will honor value and make sure the Items.selected states match current value.
        */
        valueInitialized: boolean;
        /**
          * Constructs a standalone instance of a MultiSelectDropDown form field.
          *
          * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
          * @param options Optional The set of options to configure the MultiselectDropDownField control.
          */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: MultiSelectDropDown.Options<T>);
        /**
         * Constructs an instance of a MultiSelectDropDown form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the MultiselectDropDownField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the MultiselectDropDownField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: MultiSelectDropDown.Options<T>);
        /**
         * Constructs an instance of a MultiSelectDropDown form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the MultiselectDropDownField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the MultiselectDropDownField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<T>, options?: MultiSelectDropDown.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.NumericTextBox {
    interface Options extends Base.Editable.Options<number> {
        /**
         * Minimum number allowed.
         */
        min?: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max?: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint?: KnockoutObservable<number>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText?: string;
        /**
         * Placeholder text held by the control.
         */
        placeholder?: KnockoutObservable<string>;
    }
    class ViewModel extends Base.Editable.ViewModel<number> {
        /**
         * Minimum number allowed.
         */
        min: KnockoutObservable<number>;
        /**
         * Maximum number allowed.
         */
        max: KnockoutObservable<number>;
        /**
         *  Maximum decimal points allowed for the number. No more than 20.
         */
        decimalPoint: KnockoutObservable<number>;
        /**
         * Text to display when entered text is not numeric.
         */
        invalidText: string;
        /**
         * Placeholder text held by the control.
         * Currently this does not work on IE9 (which does not support placeholder attr on input).
         */
        placeholder: KnockoutObservable<string>;
        /**
         * Constructs a standalone instance of a NumericTextBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the NumericTextBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: NumericTextBox.Options);
        /**
         * Constructs an instance of a NumericTextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the NumericTextBoxField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the NumericTextBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: NumericTextBox.Options);
        /**
         * Constructs an instance of a NumericTextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the NumericTextBoxField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the NumericTextBoxField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<number>, options?: NumericTextBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.OAuthButton {
    /**
     * OAuthButton control options
     */
    interface Options extends Base.Input.Options<string> {
        /**
         * Request url used to pop up the OAuth window.
         */
        requestUrl: KnockoutObservable<string>;
    }
    class ViewModel extends Base.Input.ViewModel<string> {
        /**
         * Request url used to pop up the OAuth window.
         */
        requestUrl: KnockoutObservable<string>;
        /**
         * Constructs a standalone instance of a OAuthButton form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the OAuthButtonField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: OAuthButton.Options);
        /**
         * Constructs an instance of a OAuthButton form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the OAuthButtonField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the OAuthButtonField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: OAuthButton.Options);
        /**
         * Constructs an instance of a OAuthButton form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the OAuthButtonField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the OAuthButtonField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options?: OAuthButton.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.OptionsGroup {
    interface Options<T> extends Base.Options.Options<T> {
    }
    class ViewModel<T> extends Base.Options.ViewModel<T> {
        /**
         * Constructs a standalone instance of an OptionsGroup form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the OptionsGroupField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: OptionsGroup.Options<T>);
        /**
         * Constructs an instance of an OptionsGroup form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the OptionsGroupField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the OptionsGroupField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: OptionsGroup.Options<T>);
        /**
         * Constructs an instance of an OptionsGroup form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the OptionsGroupField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the OptionsGroupField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<T>, options?: OptionsGroup.Options<T>);
    }
}
declare module MsPortalFx.ViewModels.Forms.PasswordBox {
    interface Options extends Base.Editable.Options<string> {
    }
    class ViewModel extends Base.Editable.ViewModel<string> {
        /**
         * Placeholder text shown when password is empty.
         */
        emptyValueText: KnockoutObservable<string>;
        /**
         * Constructs a standalone instance of a PasswordBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the PasswordField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: PasswordBox.Options);
        /**
         * Constructs an instance of a PasswordBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the PasswordField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the PasswordField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: PasswordBox.Options);
        /**
         * Constructs an instance of a PasswordBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the PasswordField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the PasswordField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options?: PasswordBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.RangeSlider {
    interface Options extends Base.Slider.Options<string> {
    }
    class ViewModel extends Base.Slider.ViewModel<string> {
        /**
         * Value separator for combining the range into a single string value. For example, "2;6". Default is ";".
         */
        valueSeparator: string;
        /**
         * Start value of the range.
         */
        start: KnockoutObservableBase<number>;
        /**
         * End value of the range.
         */
        end: KnockoutObservableBase<number>;
        /**
         * Constructs a standalone instance of a RangeSlider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the RangeSlider control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: RangeSlider.Options);
        /**
         * Constructs an instance of a RangeSlider form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the RangeSlider is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the RangeSlider control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options: RangeSlider.Options);
        /**
         * Constructs an instance of a RangeSlider form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the RangeSlider is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the RangeSlider control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options: RangeSlider.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.Section {
    interface Options {
        /**
         * The sections & controls to nest within the section.
         */
        children?: KnockoutObservableArray<any>;
        /**
         * The name of the section.
         */
        name?: KnockoutObservableBase<string>;
        /**
         * The layout style of the section.
         */
        style?: KnockoutObservableBase<SectionStyle>;
        /**
         * The set width of the section.
         */
        width?: KnockoutObservableBase<number>;
        /**
         * The submit callback.
         */
        submit?: KnockoutObservableBase<SubmitEvent>;
        /**
         * The populate section callback.
         */
        populateSection?: KnockoutObservableBase<PopulateSection>;
    }
    enum SectionStyle {
        /**
         * A section which wraps other sections and has no UI of its own.
         */
        Wrapper = 0,
        /**
         * A section that flows vertically.
         */
        Row = 1,
        /**
         * A section that flows horizontally.
         */
        Column = 2,
        /**
         * A section with layers made accessible via tabs.
         */
        Tabs = 3,
    }
    interface SubmitEvent {
        (): MsPortalFx.Base.PromiseV<SubmitEventResult>;
    }
    interface SubmitEventResult {
        success: boolean;
    }
    interface PopulateSection {
        (): MsPortalFx.Base.PromiseV<MsPortalFx.ViewModels.Forms.Section.ViewModel>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Loadable.ViewModel {
        /**
        * If under a tab, is the active section.
        */
        active: KnockoutObservable<boolean>;
        /**
         * The subsections to nest within the section.
         */
        children: KnockoutObservableArray<MsPortalFx.ViewModels.Controls.Base.ViewModel>;
        /**
         * Indicates if the sections or controls within the widget are currently dirty.
         */
        dirty: KnockoutObservable<boolean>;
        /**
         * The name of the section.
         */
        name: KnockoutObservableBase<string>;
        /**
         * The width of the section.
         */
        width: KnockoutObservableBase<number>;
        /**
         * Function which is called on form submit.
         */
        submit: KnockoutObservableBase<SubmitEvent>;
        /**
         * Function which is called to return form submit.
         */
        populateSection: KnockoutObservableBase<PopulateSection>;
        /**
         * The layout style of the section.
         */
        style: KnockoutObservableBase<SectionStyle>;
        /**
         * Indicates if the sections or controls within the widget are currently valid.
         */
        valid: KnockoutObservable<boolean>;
        /**
         * Stub to conform with the FormElement viewmodel.
         */
        validate: KnockoutObservable<number>;
        /**
         * For tabs, this is a empty viewmodel until it is loaded.
         */
        tabSection: KnockoutObservable<MsPortalFx.ViewModels.Forms.Section.ViewModel>;
        /**
         * For tabs, indicates if the section has been loaded.
         */
        tabHasBeenLoaded: KnockoutObservableBase<boolean>;
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        private _statuses;
        /**
         * Constructs a standalone instance of a form Section.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the Section control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Section.Options);
        dispose(): void;
        clearValidation(): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Forms.Selector {
    interface Options<T> extends Base.Input.Options<T> {
        /**
         * The default value for the selector.
         */
        defaultValue?: KnockoutObservableBase<T>;
        /**
         * True if the value is displayed, else false.
         */
        showValue?: KnockoutObservableBase<boolean>;
        /**
         * The display text for the value in the selector.
         */
        displayText?: KnockoutObservableBase<string>;
        /**
         * The icon displayed next to the label and value.
         */
        icon?: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * True if the field is locked; else false.
         */
        locked?: KnockoutObservableBase<boolean>;
        /**
         * Text to display on the balloon shown next to the label.
         */
        infoBalloonText?: KnockoutObservableBase<string>;
        /**
         * Text to display on the balloon shown over the locked indicator.
         */
        lockedBalloonText?: KnockoutObservableBase<string>;
        /**
         * The initial state of the Selector.
         */
        initialState?: any;
        selectedValue?: MsPortalFx.ViewModels.DynamicBladeSelection;
        /**
         * Link to display on the balloon shown next to the label.
         */
        infoBalloonLink?: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Balloon.Link>;
    }
    class ViewModel<T> extends Base.Editable.ViewModel<T> {
        /**
         * The default value for the selector.
         */
        defaultValue: KnockoutObservableBase<T>;
        /**
         * True if the value is displayed, else false.
         */
        showValue: KnockoutObservableBase<boolean>;
        /**
         * The display text for the value in the selector.
         */
        displayText: KnockoutObservableBase<string>;
        /**
         * The icon displayed next to the label and value.
         */
        icon: KnockoutObservable<MsPortalFx.Base.Image>;
        /**
         * True if the field is locked; else false.
         */
        locked: KnockoutObservableBase<boolean>;
        /**
         * Text to display on the balloon shown next to the label.
         */
        infoBalloonText: KnockoutObservableBase<string>;
        /**
         * Text to display on the balloon shown over the locked indicator.
         */
        lockedBalloonText: KnockoutObservableBase<string>;
        /**
         * Link to display within the balloon underneath the text, the balloon is shown next to the label.
         */
        infoBalloonLink: KnockoutObservableBase<MsPortalFx.ViewModels.Controls.Balloon.Link>;
        /**
         * True if the current value is the default; else false.
         */
        isDefault: KnockoutObservableBase<boolean>;
        /**
         * See interface.
         */
        selectable: Selectable<DynamicBladeSelection>;
        /**
         * Constructs a standalone instance of a Selector form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the SelectorField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Selector.Options<T>);
        /**
         * Constructs an instance of a Selector form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the SelectorField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the SelectorField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: Selector.Options<T>);
        /**
         * Constructs an instance of a Selector form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the SelectorField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the SelectorField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<T>, options?: Selector.Options<T>);
        /**
         * See interface.
         */
        dispose(): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.Slider {
    interface Options extends Base.Slider.Options<number> {
    }
    class ViewModel extends Base.Slider.ViewModel<number> {
        /**
         * Constructs a standalone instance of a Slider form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the SliderField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Options);
        /**
         * Constructs an instance of a Slider form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the SliderField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the SliderField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: Slider.Options);
        /**
         * Constructs an instance of a Slider form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the SliderField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the SliderField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<number>, options?: Slider.Options);
    }
}
declare module MsPortalFx.ViewModels.Controls.Splitter {
    interface Options {
        /**
         * The initial height of the top pane.
         */
        topPaneHeight?: number;
        /**
         * Whether top pane should be shown or not.
         */
        showTopPane?: KnockoutObservableBase<boolean>;
    }
    class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel {
        /**
         * The initial height of the top pane area.
         */
        topPaneHeight: number;
        /**
         * Whether top pane should be shown or not.
         */
        showTopPane: KnockoutObservableBase<boolean>;
        /**
         * Constructs an instance of the form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: Splitter.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.StaticSection {
    class ViewModel extends MsPortalFx.ViewModels.Controls.Base.ViewModel implements Base.Section {
        /**
         * Enum that defines the type of form element.
         */
        controlType: ControlType;
        /**
         * Whether the form element is dirty.
         */
        dirty: KnockoutComputed<boolean>;
        /**
         * Indicates if the widget is currently disabled.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * Indicates if the widget is currently loading data.
         */
        loading: KnockoutObservable<boolean>;
        /**
         * Whether the form element is valid.
         */
        valid: KnockoutComputed<boolean>;
        /**
         * When changed this signals to the control validation should occur.
         */
        validate: KnockoutObservable<number>;
        /**
         * The list of form fields contained in the section.
         */
        fields: KnockoutObservableArray<FormField<any>>;
        _msPortalFxClearValidation: KnockoutObservable<() => MsPortalFx.Base.Promise>;
        private _subscriptions;
        /**
         * Constructs an instance of a form section.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param fields Optional. An array of fields that will go in the form section.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, fields?: FormField<any>[]);
        dispose(): void;
        clearValidation(): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Vso.Forms.StringListBox {
    interface Options extends MsPortalFx.ViewModels.Forms.Base.Editable.Options<string[]> {
        /**
         * Set of values that the user can select from when adding new strings.
         * This could be used as a set of suggested or allowed values depending on what validation is configured.
         */
        values?: KnockoutObservableBase<string[]>;
        /**
         * The currently selected string within the control. By default no item is selected.
         */
        selected?: KnockoutObservableBase<string>;
        /**
         * Options for controlling the behavior when adding a new value to the list
         */
        newValueOptions?: NewValueOptionsOptions;
    }
    interface NewValueOptionsOptions {
        /**
         * The separator used to split strings when adding a new item
         */
        separator?: KnockoutObservableBase<string>;
        /**
         * View model for a custom control used when the String List switches into editing mode
         */
        viewModel?: MsPortalFx.ViewModels.Forms.FilterComboBox.Options;
    }
    interface NewValueOptionsContract {
        /**
         * The separator used to split strings when adding a new item
         */
        separator: KnockoutObservableBase<string>;
        /**
         * View model for a custom control used when the String List switches into editing mode
         */
        viewModel: MsPortalFx.ViewModels.Forms.FilterComboBox.ViewModel;
    }
    class StringListBoxNewValueOptions implements NewValueOptionsContract {
        /**
         * The separator used to split strings when adding a new item
         */
        separator: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        viewModel: MsPortalFx.ViewModels.Forms.FilterComboBox.ViewModel;
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: NewValueOptionsOptions);
    }
    class ViewModel extends MsPortalFx.ViewModels.Forms.Base.Editable.ViewModel<string[]> {
        /**
         * See interface.
         */
        values: KnockoutObservableBase<string[]>;
        /**
         * See interface.
         */
        selected: KnockoutObservableBase<string>;
        /**
         * See interface.
         */
        newValueOptions: NewValueOptionsContract;
        /**
         * Constructs a standalone instance of a StringListBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the StringListField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: StringListBox.Options);
        /**
         * Constructs an instance of a StringListBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the StringListField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the StringListField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, observablePath: string, options?: StringListBox.Options);
        /**
         * Constructs an instance of a StringListBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the StringListField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the StringListField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: MsPortalFx.ViewModels.Forms.Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string[]>, options?: StringListBox.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<string[]>): void;
        _setEditScopeAccessors(fieldValueAccessors: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string[]>, form?: MsPortalFx.ViewModels.Forms.Form.ViewModel<string[]>): void;
        /**
         * Get a list of unique values from an array, ignoring case.
         */
        private _getUniqueValues(values);
        /**
         * Compare arrays of strings for equality (modulo string ordering). Returns true if arrays contains the same strings regardless of ordering.
         */
        private _compareValues(array1, array2);
    }
}
declare module MsPortalFx.ViewModels.Forms.TextBox {
    interface Options extends Base.Typable.Options<string> {
    }
    class ViewModel extends Base.Typable.ViewModel<string> {
        /**
         * Constructs a standalone instance of a TextBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: TextBox.Options);
        /**
         * Constructs an instance of a TextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TextField is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: TextBox.Options);
        /**
         * Constructs an instance of a TextBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TextField is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the TextField control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<string>, options?: TextBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Forms.TimePicker {
    interface Options extends Base.EditableComboBox.Options<Date> {
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange?: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
    }
    class ViewModel extends Base.EditableComboBox.ViewModel<Date> {
        /**
         * Date/time range in which user is able to select date/time.
         */
        enabledDateTimeRange: KnockoutObservable<MsPortalFx.DateUtil.DateTimeRange>;
        /**
         * Constructs a standalone instance of a TimePicker form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the TimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: TimePicker.Options);
        /**
         * Constructs an instance of a TimePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TimePicker is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the TimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: TimePicker.Options);
        /**
         * Constructs an instance of a TimePicker form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TimePicker is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the TimePicker control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Date>, options?: TimePicker.Options);
        /**
         * ****** DEPRECATED ******
         * Instead pass in a call to EditScopeAccessor on the form class containing this control into the constructor of your field.
         * This method will be internal in the future.
         * ************************
         *
         * Set the FieldValueAccessors used to integrate with EditScope for original and edited values.
         * Note: In most cases, it's best to use the observablePath parameter when instantiating a field, which
         *  will automatically configure the field with FieldValueAccessors. Use this override only if you know what you're doing.
         *
         * @param fieldValueAccessors The FormFieldValueAccessor object to be used for the original and edited values of this field.
         */
        setFieldValueAccessors(fieldValueAccessors: FormFieldValueAccessors<Date>): void;
        _setEditScopeAccessors(fieldValueAccessors: EditScopeAccessors<Date>): void;
    }
}
declare module MsPortalFx.ViewModels.Forms.TriStateCheckBox {
    /**
     * CheckBoxValue value states.
     */
    enum Value {
        /**
         * TriStateCheckBox state representing unchecked state.
         */
        Unchecked = 0,
        /**
         * TriStateCheckBox state representing checked state.
         */
        Checked = 1,
        /**
         * TriStateCheckBox state representing indeterminate state.
         */
        Indeterminate = 2,
    }
    interface Options extends Base.Input.Options<Value> {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel?: boolean;
        /**
         * Enable or disable user to select Indeterminate state.
         */
        canUserSetIndeterminate?: KnockoutObservable<boolean>;
    }
    class ViewModel extends Base.Input.ViewModel<Value> {
        /**
         * Display the label inline with the checkbox.
         */
        inlineLabel: boolean;
        /**
         * Enable or disable user to select Indeterminate state.
         */
        canUserSetIndeterminate: KnockoutObservable<boolean>;
        /**
         * Constructs a standalone instance of a TriStateCheckBox form field.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param options Optional The set of options to configure the TriStateCheckBox control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, options?: TriStateCheckBox.Options);
        /**
         * Constructs an instance of a TriStateCheckBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TriStateCheckBox is contained.
         * @param observablePath The path to the value on the EditScope to be bound to this field.
         * @param options Optional The set of options to configure the TriStateCheckBox control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, observablePath: string, options?: TriStateCheckBox.Options);
        /**
         * Constructs an instance of a TriStateCheckBox form field integrated with EditScope.
         *
         * @param lifetimeManager A LifetimeManager object that will notify when the data is no longer being used by the caller.
         * @param form The form element within which the TriStateCheckBox is contained.
         * @param accessor Used to read and write values to the edit scope.  Use Form.createEditScopeAccessor methods to create this object.
         * @param options Optional The set of options to configure the TriStateCheckBox control.
         */
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, form: Form.ViewModel<any>, accessor: MsPortalFx.ViewModels.Forms.EditScopeAccessors<Value>, options?: TriStateCheckBox.Options);
    }
}
declare module MsPortalFx.ViewModels.Internal {
    class MultiplexingSelectableSet<T, U> implements SelectableItems<T>, SetSelection<U>, MsPortalFx.Base.Disposable {
        private _disposables;
        private _selectableSets;
        private _selectableSetMap;
        private _subscriptions;
        private _getSetName;
        private _syncing;
        /**
         * See interface.
         */
        selectableItems: KnockoutObservableArray<SelectableItem<T>>;
        /**
         * See interface.
         */
        selectedItems: KnockoutObservableArray<U>;
        /**
         * See interface.
         */
        activatedItems: KnockoutObservableArray<U>;
        /**
         * See interface
         */
        itemsWithChildEdits: KnockoutObservableArray<EditedItem<U>>;
        /**
         * Create an instance of the multiplexing selectable set
         *
         * @param getSetName A function that returns an identifier (name) from a selected item for its corresponding registered selectable set.
         * @param compareSelected A comparison function for selectable items.
         * @param initialState Initial state of the view model.
         */
        constructor(getSetName: (selectable: U) => string, initialState?: SetSelection<U>);
        registerSelectableSet(selectableSet: SelectableSet<T, U>, name: string): void;
        unregisterSelectableSet(selectableSet: SelectableSet<T, U>): void;
        unregisterSelectableSet(name: string): void;
        /**
         * See interface.
         */
        dispose(): void;
        private _initializeComputeds();
        private _initializeSubscriptions();
        private _initializeState(initialState);
        /**
         * Setup handles to promote the selectable set's selected and activated collections to the outer set
         */
        private _attachSet(selectableSet, name);
        private _detachSet(selectableSet, removeFromParent?);
        private _removeItems(childArray, parentArray);
        private _syncItemsToChildSets(items, setChildValues, name?);
        /**
         * Sync changes in the children array up to the multiplexer's corresponding array. The reverse sync is handled elsewhere.
         *
         * @param childArray An array on one of the child selectable sets
         * @param parentArray The corresponding array in the parent to childArray.
         * @param ensureSingleValue Indicates if additions to child arrays should replace any existing values in the parent array (rather than appending).
         */
        private _createSyncToParentArray(childArray, parentArray, setName, ensureSingleValue?);
        private _debug(message?, ...optionalsParams);
        private _guardedSync(guard, fn);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * The type of the toolbar item.
     */
    enum ToolbarItemType {
        /**
         * Not a valid type.
         */
        None = 0,
        /**
         * An items that visually groups other toolbar items.
         */
        Group = 1,
        /**
         * A toolbar button that opens a link.
         */
        OpenLinkButton = 2,
        /**
         * A toolbar button that opens a blade.
         */
        OpenBladeButton = 3,
        /**
         * A toolbar button that is associated to a command.
         */
        CommandButton = 4,
        /**
         * A toolbar button that opens a dialog before executing a command.
         */
        DialogButton = 5,
        /**
         * A toolbar button and can be toggled (between ON and OFF states).
         */
        ToggleButton = 6,
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines an item in the toolbar.
     */
    interface ToolbarItemContract {
        /**
         * The type of the toolbar item.
         */
        type: ToolbarItemType;
        /**
         * A value indicating whether or not the toolbar item is disabled.
         */
        disabled: KnockoutObservableBase<boolean>;
        /**
         * The message provided to the container when unauthorized.
         */
        unauthorizedMessage: KnockoutObservable<string>;
        /**
         * Signals the container is in unauthorized mode and provides an optional custom error message.
         *
         * @param message A custom error message in place of the default.
         */
        unauthorized(message?: string): void;
    }
    /**
     * See interface.
     */
    class ToolbarItem implements ToolbarItemContract {
        /**
         * See interface.
         */
        type: ToolbarItemType;
        /**
         * See interface.
         */
        disabled: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        unauthorizedMessage: KnockoutObservable<string>;
        /**
         * Creates a toolbar item.
         *
         * @param type The type of the toolbar item.
         */
        constructor(type: ToolbarItemType);
        /**
         * See interface.
         */
        unauthorized(message?: string): void;
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button in the toolbar.
     */
    interface ToolbarButtonContract extends ToolbarItemContract {
        /**
         * The command label.
         */
        label: KnockoutObservableBase<string>;
        /**
         * The icon for the command.
         */
        icon: KnockoutObservableBase<Base.Image>;
    }
    /**
     * See interface.
     */
    class ToolbarButton extends ToolbarItem implements ToolbarButtonContract {
        /**
         * See interface.
         */
        label: KnockoutObservable<string>;
        /**
         * See interface.
         */
        icon: KnockoutObservable<Base.Image>;
        /**
         * Creates a toolbar button.
         *
         * @param type The type of the button.
         */
        constructor(type: ToolbarItemType);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button that can execute the associated command.
     */
    interface ExecutableButtonBaseContract<T> extends ToolbarButtonContract {
        /**
         * The command associated to the toolbar item.
         */
        command: Commands.Command<T>;
    }
    /**
     * See interface.
     */
    class ExecutableButtonBase<T> extends ToolbarButton implements ExecutableButtonBaseContract<T> {
        /**
         * See interface.
         */
        command: Commands.Command<T>;
        /**
         * Creates an executable button.
         *
         * @param type The type of the button.
         */
        constructor(type: ToolbarItemType);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button that can execute the associated command.
     */
    interface CommandButtonContract<T> extends ExecutableButtonBaseContract<T> {
        /**
         * The context to pass on to the command.
         */
        commandContext: KnockoutObservable<T>;
    }
    /**
     * See interface.
     */
    class CommandButton<T> extends ExecutableButtonBase<T> implements CommandButtonContract<T> {
        /**
         * See interface.
         */
        commandContext: KnockoutObservable<T>;
        /**
         * Creates an executable button.
         */
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button that shows a dialog before executing a command using the dialog result as context.
     */
    interface DialogButtonContract extends ExecutableButtonBaseContract<Dialogs.DialogResult> {
        /**
         * Options required for showing the dialog.
         */
        dialogOptions: Dialogs.DialogContract;
    }
    /**
     * See interface.
     */
    class DialogButton extends ExecutableButtonBase<Dialogs.DialogResult> implements DialogButtonContract {
        /**
         * See interface.
         */
        dialogOptions: Dialogs.DialogContract;
        /**
         * Creates a dialog button.
         */
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button that can open a blade.
     */
    interface OpenBladeButtonContract<T> extends ToolbarButtonContract {
        /**
         * The selectable for the command.
         */
        selectable: MsPortalFx.ViewModels.Selectable<T>;
    }
    /**
     * See interface.
     */
    class OpenBladeButton<T> extends ToolbarButton implements OpenBladeButtonContract<T> {
        /**
         * See interface.
         */
        selectable: MsPortalFx.ViewModels.Selectable<T>;
        /**
         * Creates the selectable toolbar button.
         */
        constructor(options?: SelectableOptions<T>);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a button that can open a blade.
     */
    interface OpenLinkButtonContract extends ToolbarButtonContract {
        /**
         * An instance of MsPortalFx.ViewModels.ClickableLink which controls whether this Part
         * opens a link when clicked.
         */
        clickableLink: MsPortalFx.ViewModels.ClickableLink;
    }
    /**
     * See interface.
     */
    class OpenLinkButton extends ToolbarButton implements OpenLinkButtonContract {
        /**
         * See interface.
         */
        clickableLink: ClickableLink;
        /**
         * Creates the selectable toolbar button.
         *
         * @param uri The URI that will be opened when target is clicked.
         * @param target The target window to open the URI in.
         */
        constructor(uri: string, target?: string);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    interface ToggleButtonContext<T> {
        /**
         * A value indicating whether or not the toggle button is in the checked state.
         */
        checked: boolean;
        /**
         * The context defined by the consumer of the toggle button.
         */
        context: T;
    }
    /**
     * This type of button provides an ON-OFF functionality that allows the user to toggle between
     * the ON and OFF states on every click.
     */
    interface ToggleButtonContract<T> extends ExecutableButtonBase<ToggleButtonContext<T>> {
        /**
         * The option group that the toggle button belongs to.
         */
        optionGroupName: string;
        /**
         * A value indicating whether or not the toggle button is in the checked state.
         */
        checked: KnockoutObservable<boolean>;
        /**
         * The context to pass on to the command.
         */
        commandContext: KnockoutObservable<T>;
    }
    /**
     * See interface.
     */
    class ToggleButton<T> extends ExecutableButtonBase<ToggleButtonContext<T>> implements ToggleButtonContract<T> {
        /**
         * See interface.
         */
        optionGroupName: string;
        /**
         * See interface.
         */
        checked: KnockoutObservable<boolean>;
        /**
         * See interface.
         */
        commandContext: KnockoutObservable<T>;
        /**
         * Creates a toggle button.
         *
         * @param optionGroupName The option group that the toggle button belongs to.
         */
        constructor(optionGroupName?: string);
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    interface ToolbarContract extends MsPortalFx.ViewModels.Controls.Loadable.Contract {
        /**
         * Sets the list of items to show in the toolbar.
         */
        setItems(items: ToolbarItemContract[]): void;
        /**
         * A value indicating whether or not to show item labels.
         */
        showLabels: KnockoutObservable<boolean>;
    }
    class Toolbar extends Controls.Loadable.ViewModel implements ToolbarContract {
        /**
         * See interface.
         */
        showLabels: KnockoutObservable<boolean>;
        /**
         * The list of items to show in the toolbar.
         * Does not start with '_' so that it gets proxied over to the shell.
         */
        private items;
        /**
         * See interface.
         */
        setItems(items: ToolbarItemContract[]): void;
        constructor();
    }
}
declare module MsPortalFx.ViewModels.Toolbars {
    /**
     * Defines a group in the toolbar.
     */
    interface ToolbarGroupContract extends ToolbarItemContract {
        /**
         * The items in the group.
         */
        items: ToolbarItemContract[];
    }
    /**
     * See interface.
     */
    class ToolbarGroup extends ToolbarItem implements ToolbarGroupContract {
        /**
         * See interface.
         */
        items: ToolbarItemContract[];
        /**
         * Creates a toolbar group.
         *
         * @param items The items in the group.
         */
        constructor(items: ToolbarItemContract[]);
    }
}
