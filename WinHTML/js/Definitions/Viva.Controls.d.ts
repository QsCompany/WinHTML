/// <reference path="d3.d.ts" />
/// <reference path="hammer.d.ts" />
/// <reference path="Html5.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="jquery.dateentry.d.ts" />
/// <reference path="jquery.timeentry.d.ts" />
/// <reference path="knockout.d.ts" />
/// <reference path="knockout.extensionstypes.d.ts" />
/// <reference path="knockout.projections.d.ts" />
/// <reference path="q.d.ts" />

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Base\Base.Disposable.d.ts
declare module "Viva.Controls/Base/Base.Disposable" {
    export = Main;
    module Main {
        /**
         * An object that is disposable.
         */
        interface Disposable {
            /**
             * A function called on the object when it is disposed.
             */
            dispose(): void;
        }
        /**
         * An object that can limit the lifetime of other objects. When a LifetimeManager object
         * is disposed, it will dispose all other objects that were registered for disposal.
         */
        interface LifetimeManagerBase {
            /**
             * Registers an object to be disposed.  It will throw if the object doesn't have dispose method.
             *
             * @param disposable An object to be disposed once the LifetimeManager object itself is disposed.
             */
            registerForDispose(disposables: Disposable[]): LifetimeManagerBase;
            registerForDispose(disposable: Disposable): LifetimeManagerBase;
        }
        interface LifetimeManager extends LifetimeManagerBase {
            /**
             * Create a createChildManager to localize the LifetimeManager.
             * It will provide the function on tracking who create it and when it dispose, it will remove itself from Container's lifetimeManager
             *
             */
            createChildLifetime(): DisposableLifetimeManager;
        }
        interface DisposableLifetimeManager extends Disposable, LifetimeManager {
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Base\Base.TriggerableLifetimeManager.d.ts
declare module "Viva.Controls/Base/Base.TriggerableLifetimeManager" {
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        /**
         * An object that tracks and invokes disposal callbacks. This can be used
         * in other classes that wish to implement LifetimeManager.
         */
        class TriggerableLifetimeManager implements DisposableBase.DisposableLifetimeManager, DisposableBase.LifetimeManager {
            private _disposables;
            private _isDisposed;
            private _isDisposing;
            private _container;
            private _children;
            private _failToDispose;
            private _diagnosticCreateStack;
            isDisposed: KnockoutObservableBase<boolean>;
            static setDevMode(value: boolean): void;
            static setDiagnosticMode(value: boolean): void;
            constructor();
            /**
            * Mirror version of computed.
            */
            /**
             * Mirror version of but return a LifetimeManager for chainning.
             */
            /**
             * subscribe to a KnockoutSubscribable object
             */
            /**
             * subscribe to a KnockoutSubscribable object but return a LifetimeManager for chainning.
             */
            /**
             * See interface.
             */
            registerForDispose(disposables: DisposableBase.Disposable[]): DisposableBase.LifetimeManagerBase;
            registerForDispose(disposable: DisposableBase.Disposable): DisposableBase.LifetimeManagerBase;
            /**
             * See interface.
             */
            createChildLifetime(): DisposableBase.DisposableLifetimeManager;
            /**
             * Causes the instance to regard itself as disposed, and to trigger any
             * callbacks that were already registered.
             */
            dispose(): void;
            _unregisterChildForDispose(disposable: DisposableBase.Disposable): void;
            _isRegistered(disposable: DisposableBase.Disposable): boolean;
            _registerForDispose(disposable: DisposableBase.Disposable): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Balloon.d.ts
declare module "Viva.Controls/Controls/Balloon" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Gets the boundaries of a specific object.
         *
         * @param selector A valid jQuery selector.
         * @return A Box object to be used when invoking the Balloon widget.
         */
        function getBox(selector: JQuery): Box;
        /**
         * Gets the boundaries of a specific object.
         *
         * @param selector A valid jQuery selector as an HTMLElement.
         * @return A Box object to be used when invoking the Balloon widget.
         */
        function getBox(selector: HTMLElement): Box;
        /**
         * Gets the boundaries of a specific object.
         *
         * @param selector A valid jQuery selector string.
         * @return A Box object to be used when invoking the Balloon widget.
         */
        function getBox(selector: string): Box;
        /**
         * Hides all of the balloons, except the one represented by the currentObj parameter if specified.
         *
         * @param currentObj The object of the balloon that should not be closed.
         */
        function hideAllBalloons(currentObj?: any): void;
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
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface Offset extends StringMap<number> {
            /**
             * Pixel offset applied in the preferred layout is rendered.
             */
            preferred: number;
            /**
             * Pixel offset applied in the alternate layout is rendered (due to space constraints).
             */
            alternate: number;
        }
        interface Link extends StringMap<string> {
            /**
             * Link text.
             */
            linkText: string;
            /**
             * Link Uri.
             */
            linkUri: string;
        }
        interface Box extends StringMap<number> {
            /**
             * Vertical distance from the top-left corner (0,0).
             */
            top: number;
            /**
             * Horizontal distance from the top-left corner (0,0).
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
        }
        class ViewModel extends Base.ViewModel {
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
             * The position where the balloon will show around the element (Top, Right, Bottom, Left).
             */
            position: KnockoutObservable<Position>;
            /**
             * The amount to offset the pointer when the balloon is in a horizontal layout.
             */
            horizontalOffset: Offset;
            /**
             * The link to display in the balloon.
             */
            link: KnockoutObservable<Link>;
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
        class Widget extends Base.Widget implements Interface {
            private static _defaultAppendTo;
            private _originalParent;
            private _balloonMeasurer;
            private _id;
            private _noFadeOnNextHide;
            private _resizeEventHandler;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Returns the default container to append balloons to.
             *
             * @return A string selector for the default balloon container.
             */
            static getDefaultAppendTo(): string;
            /**
             * Sets the default container to append balloons to.
             *
             * @param appendTo The string selector for the default balloon container.
             */
            static setDefaultAppendTo(appendTo: string): void;
            /**
             * Hides the balloon from the screen.
             */
            private _hide();
            /**
             * Shows the balloon around a set of boundaries represented as a Box.
             * To get the boundaries of an element as a Box, call Viva.Controls.Balloon.getBox(selector).
             * The Box values are relative to the appendTo option.
             */
            private _show();
            private _attachEvents();
            private _detachEvents();
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            private _getAlternatePosition(position);
            private _getSidePositionKey(position);
            private _getOtherSidePosition(position);
            private _getSizeKey(position);
            private _getOtherSizeKey(position);
            private _removePointerClass();
            private _readCssAndSetBaseline(balloon, box, position);
            private _resizeWindow(evt);
            private _getBalloonBox(box, position, maxWidth);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Base.d.ts
declare module "Viva.Controls/Controls/Base/Base" {
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        interface CreateOptions {
            /**
             * The view model type expected.
             * Used to create a default view model instance if the options param is an un-typed object instance.
             */
            viewModelType?: new () => ViewModel;
            /**
             * Indicates the widget is being created directly by a knockout binding.
             * This allows the widget to handle descendant bindings and disposal appropriately.
             */
            knockoutBinding?: boolean;
        }
        interface Disposable {
            /**
             * Disposes resources.
             */
            dispose(): void;
        }
        interface Interface extends Disposable {
            /**
             * The element this widget is applied to.
             */
            element: JQuery;
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * Dispose() has been called.
             */
            isDisposed(): boolean;
            /**
             * When overridden, gets the outermost element that this widget applies to.
             *
             * @return The outermost element that this widget applies to.
             */
            widget(): JQuery;
            /**
             * Lifetime manager for registering disposables that will be disposed when the widget is disposed.
             */
            lifetimeManager: DisposableBase.LifetimeManager;
        }
        class ViewModel {
            /**
             * Indicates if the widget is currently disabled.
             */
            disabled: KnockoutObservableBase<boolean>;
            /**
             * Populates the view model from a key/value pairs object.
             * The keys should map to properties on the view model.
             * The values are applied to the corresponding keys.
             *
             * @param object An un-typed object with values to populate on the view model.
             */
            populateFromObject(object: Object): void;
            /**
             * Deep copies all the properties of the source object to the destination object.
             * All properties in destination that are not in the source should remain intact.
             * Functions are copied by reference.
             *
             * @param source The object whose properties need to be copied.
             * @param destination The destination object.
             */
            static copyObject(source: Object, destination: any): void;
            /**
             * Deep copies all the properties of the source object to the destination object.
             * All properties in destination that are not in the source should remain intact.
             * Functions are copied by reference.
             *
             * We need to ensure that properties that point to one of their ancestors doesn't cause a infinite loop.
             * To that end, we pass in the sourceAncestors and destination ancestors and check against that.
             *
             * @param source The object whose properties need to be copied.
             * @param destination The destination object.
             * @param sourceAncestors The ancestors of the source object used to prevent circular linked list causing an infinite loop.
             * @param destinationAncestors The ancestors of the destination object corresponding to the sourceAncestors to assign to circular linked list.
             */
            private static _copyObject(source, destination, sourceAncestors, destinationAncestors);
        }
        interface FirstFocusCallback {
            /**
             * Gets a list of elements that will receive a "data-focusfirst" attribute.
             *
             * @return jQuery object for all the elements that need to add "data-focusfirst" attribute.
             */
            (): JQuery;
        }
        interface FocusCallback {
            /**
             * Sets focus implementation callback.
             *
             * @param elem The control element for setFocus is called on.
             * @param widget The control widget that setFocus is called on.
             * @return Whether successful setFocus on this control.
             */
            (elem: JQuery, widget: Widget): boolean;
        }
        class Widget implements Interface {
            /**
             * The element this widget is applied to.
             */
            element: JQuery;
            _options: ViewModel;
            _isLoading: KnockoutObservableBase<boolean>;
            /**
             * Creation options.
             */
            _createOptions: CreateOptions;
            _supportsFocus: KnockoutObservableBase<boolean>;
            _markFocusFirstElements: KnockoutObservable<FirstFocusCallback>;
            private _destroyIds;
            private static _widgetTypesDataKey;
            private static _widgetEventNamespace;
            private static _widgetRemoveEvent;
            private static _cleanData;
            private static _trackingContexts;
            private _dataFocusableCallback;
            private _lifetimeManager;
            private _subscriptionsLifetimeManager;
            private _disposablesLifetimeManager;
            private _disposeCallback;
            private _loading;
            private _prevElement;
            private _destroyTriggered;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel, createOptions: CreateOptions);
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
            isDisposed(): boolean;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            lifetimeManager: DisposableBase.LifetimeManager;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Gets the binding handler instance for the specified widget type.
             *
             * @param widgetType The prototype for initializing the portal control.
             * @param initOptions This initialization options for the widget binding.
             * @return Binding handler instance for initializing the portal control.
             */
            static getBindingHandler(widgetType: new (fixture: JQuery, viewModel: ViewModel, createOptions: CreateOptions) => Widget, initOptions?: any): KnockoutBindingHandler;
            /**
             * Retrieves the first widget instance of the requested type on the element, or null if none found.
             *
             * @param element The JQuery element to search on.
             * @param type The widget type to perform the search for.
             * @return The first widget instance found on the element, optionally filtered by type.
             */
            static getWidget(element: JQuery, type: any): Widget;
            /**
             * Retrieves the widget instances applied to an element, filtered with an optional type.
             *
             * @param element The JQuery element to search on.
             * @param type An optional widget type to filter with.
             * @return All the widget instances found on the element, optionally filtered by type.
             */
            static getWidgets(element: JQuery, type?: any): Widget[];
            /**
             * See interface.
             */
            widget(): JQuery;
            /**
             * Starts tracking widgets as they are created and disposed.
             *
             * @param context Array to hold the actively tracked widgets.
             */
            static beginTracking(context?: Widget[]): void;
            /**
             * Stops tracking widgets as they are created and disposed.
             *
             * @return The context array holding the active widgets that were tracked.
             */
            static endTracking(): Widget[];
            /**
             * Toggles display:none until this._loading reference count reaches zero. This is a performance optimization to avoid browsers from rendering until the DOM finish updating.
             * By default, we wrap bind() method with _delayRendering(true) and _delayRendering(false) to avoid the browsers from rendering until the DOM has finished updating by Knockout.
             *
             * @param delay True to increase ref count of this._loading to indicate the section needs to be wrapped into diaplay:none to optimize for the performance.
             *              False to decrease of ref count of this._loading to indicate exiting of prior _delayRendering(true).
             */
            _delayRendering(delay: boolean): void;
            _subscriptions: DisposableBase.LifetimeManager;
            _disposables: DisposableBase.LifetimeManager;
            /**
             * Can this control be focused.
             *
             * @return Whether this element can be set focus on.
             */
            _canSetFocus(): boolean;
            /**
             * Simple helper for _setFocus function. It will call focus on the returned Element.
             *
             * @return The element to set focus on.
             */
            _getElementToFocus(): Element;
            /**
             * Default implementation of setFocus for this widget when this._supportFocus(true).
             *
             * @param elem The element of the control that has _supportFocus(true).
             * @param widget This widget.
             * @return Whether it successfully sets the focus on the item.
             */
            _setFocus(elem: JQuery, widget: Widget): boolean;
            /**
             * Calls knockout to bind the descendant nodes to the view model.
             *
             * @param extraViewModel Extra view model you can attach to the Knockout view model.
             */
            _bindDescendants(extraViewModel?: any): void;
            /**
             * Calls Knockout to clean up all descendent bindings.
             */
            _cleanDescendants(): void;
            /**
             * Triggers an event on the widget associated element.
             *
             * @param type A string indicating the type of event to create.
             * @param event An optional JQueryEventObject containing data for this event.
             * @param data An optional object containing data for the event.
             * @param target An optional target for the event instead of the widget element.
             * @return A boolean indicating if the event should be propagated or not.
             */
            _trigger(type: string, event?: JQueryEventObject, data?: any, target?: EventTarget): boolean;
            /**
             * Helper method allowing you to unsubscribe from previously subscribed functions.
             * This method should not be overridden.
             */
            _disposeSubscriptions(): void;
            /**
             * Helper method allowing you to clean up resources related the the HTMLElement.
             * This method should not be overridden.
             *
             * @param cssClasses Optional css classes to remove from the HTMLElement.
             */
            _cleanElement(...cssClasses: string[]): void;
            /**
             * Helper method allowing you to subscribe to knockout objects.
             *
             * @param viewModel The ViewModel.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * Indicates if the UI is currently in RTL mode.
             *
             * @return true if RTL is enabled.
             */
            _isRtl(): boolean;
            /**
             * Placeholder to add additional logic after widget is initialized.
             * Inherited classes can override this method to add custom logic which requires widget to be in the initialized state.
             */
            _afterCreate(): void;
            /**
             * Adds a subscription to be cleaned up in the dispose().
             *
             * @param disposable One KnockoutComputed to be added to this._disposables.
             */
            _addDisposablesToCleanUp(disposable: KnockoutDisposable): void;
            /**
             * Adds a list of computed to be cleaned up in the dispose().
             *
             * @param disposable Array of KnockoutComputed to be added to this._disposables.
             */
            _addDisposablesToCleanUp(disposable: KnockoutDisposable[]): void;
            /**
             * Registers an appropriate callback to notify the widget to dispose.
             */
            private _registerDispose();
            /**
             * Unregisters the dispose callback when it is no longer needed.
             */
            private _unregisterDispose();
            /**
             * Registers the cleanData with jQuery.
             */
            private static setupCleanData();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Command.d.ts
declare module "Viva.Controls/Controls/Base/Command" {
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
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
         * Command base view model.
         */
        class ViewModel extends Base.ViewModel {
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
            execute(): Promise.Promise;
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\CompositeControl.d.ts
declare module "Viva.Controls/Controls/Base/CompositeControl" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            viewModels: Base.ViewModel[];
        }
        class Widget extends Base.Widget implements Interface {
            /**
             * The widgets collections.
             */
            widgets: Base.Widget[];
            /**
             * Callback function to allow custom disable class to be inserted.
             */
            widgetDisabledClass: () => string;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel, createOptions: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * Notification that view model disabled property changed.
             *
             * @param value Disabled if true.
             */
            private _onDisabledChanged(value);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\EditableControl.d.ts
declare module "Viva.Controls/Controls/Base/EditableControl" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface<TValue> extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
        }
        class ViewModel<TValue> extends Base.ViewModel {
            /**
             * Name attribute of the control to use with form.
             */
            name: string;
            /**
             * Value held by the control. Can be any type.
             */
            value: KnockoutObservable<TValue>;
            /**
             * Dirty state of the control. If set to null when passed to a the widget constructor the widget will add a computed observable that is set to true when field value changes from the initial value present at widget creation.
             */
            dirty: KnockoutObservableBase<boolean>;
            /**
             *  Control focused state.
             */
            focused: KnockoutObservable<boolean>;
            /**
             * Constructs an editable control view model.
             */
            constructor();
        }
        class Widget<TValue> extends Base.Widget implements Interface<TValue> {
            private _ready;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel<TValue>, createOptions: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
             * Compares if newValue is the same as initialValue.
             *
             * @param a Value 1.
             * @param b Value 2.
             * @return True if both values are the same.
             */
            _isSameValue(a: TValue, b: TValue): boolean;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ExtensibleControl.d.ts
declare module "Viva.Controls/Controls/Base/ExtensibleControl" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Plugin {
            /**
             * Sets the instance of the widget. So you can use it for your plugin.
             *
             * @param instance Extensible widget.
             */
            setInstance(instance: Widget): void;
            /**
             * Gets the plugin name.
             *
             * @return Plugin name.
             */
            getName(): string;
            /**
             * Loads the dependencies if any.
             *
             * @return Plugin to load as a dependency.
             */
            getDependencies(): Plugin[];
            /**
             * Order of plugin execution. Lower number being run first.
             * Numbered plugin run before unnumbered.
             */
            getOrder?(): number;
        }
        interface PluginExtension extends Plugin {
            /**
             * Callback: before create.
             */
            beforeCreate?(): void;
            /**
             * Callback: after create.
             */
            afterCreate?(): void;
            /**
             * Callback: before destroy.
             */
            beforeDestroy?(): void;
            /**
             * Callback: after destroy.
             */
            afterDestroy?(): void;
        }
        class Extension<TWidget extends Widget> implements PluginExtension {
            _widget: TWidget;
            /**
             * See interface.
             */
            setInstance(instance: Widget): void;
            /**
             * See interface.
             */
            getName(): string;
            /**
             * See interface.
             */
            getDependencies(): Plugin[];
        }
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * Loaded plugins for the control.
             */
            extensions: PluginExtension[];
        }
        class Widget extends Base.Widget implements Interface {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel, createOptions: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Gets the plugin based on its name.
             *
             * @param name Name of the plugin.
             * @return Plugin.
             */
            getPlugin(name: string): Plugin;
            /**
             * Helper method allowing you to load the plugins.
             *
             * @param viewModel The ViewModel.
             */
            _initializePlugins(viewModel: ViewModel): void;
            /**
             * Helper method which allows triggering events for interested extensions.
             *
             * @param methodName The name of the triggered event.
             * @param restArgs Arguments provided for this particular event.
             * @return Event results returned by extensions.
             */
            _extensionTrigger(methodName: string, ...restArgs: any[]): any[];
            private _loadPlugins(plugins, finalList);
            private _addExtensionClasses();
            private _removeExtensionClasses();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Image.d.ts
declare module "Viva.Controls/Controls/Base/Image" {
    export = Main;
    module Main {
        /**
         * The ImageContract that is defined the same as the MsPortalFx.Base.Image
         */
        interface ImageContract {
            /**
             * Stores the type of image (custom SVG/image or a built in SVG).
             */
            type: number;
            /**
             * Stores the SVG element, or URI to image file.
             */
            data?: string;
            /**
             * Stores the palette of the element.
             */
            palette?: number;
        }
        /**
         * Data type used for rendering images's.
         */
        class Image implements ImageContract {
            /**
             * See interface
             */
            type: number;
            /**
             * See interface
             */
            data: string;
            /**
             * See interface
             */
            palette: number;
            /**
             * Construct an image.
             */
            constructor(type?: number, data?: string, palette?: number);
        }
        /**
         * Type for the SVG image.
         */
        class SvgImage extends Image {
            /**
             * Height of the image.
             */
            height: number;
            /**
             * Width of the image.
             */
            width: number;
            /**
             * x coordinate of the origin of the image
             */
            x: number;
            /**
             * y coordinate of the origin of the image
             */
            y: number;
            /**
             * Factory method to construct an SvgImage from Image
             *
             * @param image the image to construct
             * @return the SvgImage
             */
            static fromImage(image: ImageContract): SvgImage;
        }
        /**
         * Minimal type used from MsPortalFx's Services.Images.ts for images.
         * If type is not specified here, the data of the image is treated as
         * SVG data.
         */
        enum SvgType {
            /**
             * Blank.
             */
            Blank = 0,
            /**
             * For loading custom SVG
             */
            Custom = 1,
            /**
             * Reserved for png/git/jpeg
             */
            ImageUri = 2,
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ItemList.d.ts
declare module "Viva.Controls/Controls/Base/ItemList" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for item list widget.
         */
        interface Interface<TValue> extends ValidatableControl.Interface<ItemValue<TValue>> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
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
         * View model representing the properties for an item in item list.
         */
        class ItemValue<T> implements Value<T> {
            /**
             * Text for list item.
             */
            text: KnockoutObservable<string>;
            /**
             * Value bound for list item when li is selected.
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
            _tabindex: KnockoutObservable<number>;
            _subscriptions: KnockoutSubscription<any>[];
            private _destroyIds;
            /**
             * Creates a new instance of view model representing the item in item list.
             *
             * @param text The text data binding for item.
             * @param value The value data binding for item.
             * @param selected The item is selected.
             * @param disabled The item is disabled.
             */
            constructor(text: string, value: T, selected?: boolean, disabled?: boolean);
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
             * Frees up the items resources.
             */
            dispose(): void;
            /**
             * Populates the view model from a key/value pairs object.
             * The keys should map to properties on the view model.
             * The values are applied to the corresponding keys.
             *
             * @param object An un-typed object with values to populate on the view model.
             */
            populateFromObject(object: Object): void;
            /**
             * Helper method allowing you to subscribe to knockout objects.
             *
             * @param subscription The KnockoutSubscription associated with observable in ItemValue.
             */
            _initializeSubscriptions(subscription: KnockoutSubscription<any>): void;
            /**
             * Helper method allowing you to unsubscribe from previously subscribed functions.
             */
            _disposeSubscriptions(): void;
        }
        /**
         * View model representing the properties for item list widget.
         */
        class ViewModel<TValue> extends ValidatableControl.ViewModel<ItemValue<TValue>> {
            /**
             * Aria label id.
             */
            label: string;
            /**
             * Observable array containing the following array element:
             * * ItemValue
             */
            values: KnockoutObservableArray<ItemValue<TValue>>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        /**
         * Abstract widget that handles value as a list.
         * Support ARIA with arrow keypress.
         */
        class Widget<TValue> extends ValidatableControl.Widget<ItemValue<TValue>> implements Interface<TValue> {
            _templateEngineInstance: TemplateEngine.StringTemplateEngine;
            /**
             * Role attribute of the list item.
             */
            _role: string;
            /**
             * Role attribute of the list.
             */
            _roleGroup: string;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel<TValue>, createOptions: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            /**
             * Set the options' name to the generated value if name is not set by the user.
             */
            _setName(): void;
            _setRole(): void;
            /**
             * The ko data-bind template string for each list item used by the ItemList template engine.
             *
             * @return The template string for li.
             */
            _attachItemTemplate(): string;
            _set(value: ItemValue<TValue>): void;
            _isSameValue(a: ItemValue<TValue>, b: ItemValue<TValue>): boolean;
            _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
            _disposeSubscriptions(): void;
            /**
             * Binds the view model with the element.
             *
             * @param extraViewModel Extra view model you can attach to the Knockout view model.
             */
            _bindDescendants(extraViewModel?: any): void;
            _valueChangedSubscriber(newValue: ItemValue<TValue>): void;
            _widgetDisabledSubscriber(newValue: boolean): void;
            private _itemSelectedSubscriber(itemValue);
            private _itemDisabledSubscriber(itemValue);
            private _attachEvents();
            private _clicked(value);
            private _isItemDisabled(item);
            private _setUnselectedTabIndex();
            private _unselectItemValue(value);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\KnockoutExtensions.d.ts
declare module "Viva.Controls/Controls/Base/KnockoutExtensions" {
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        /**
         * An observable map. This interface is immutable.
         */
        interface IObservableMap<T> {
            /**
             * Equivalent to doing () on an observable. Triggers updates in computeds, etc.
             *
             * @return The underlying map.
             */
            latch(): StringMap<T>;
            /**
             * Returns the item associated with key in the map.
             *
             * @param key The key to look up.
             * @return The item associated with the key value pair.
             */
            lookup(key: string): T;
            /**
             * Iterates through each object in the observable map.
             *
             * @param callback The function that gets called on each item in the map.
             */
            forEach(callback: (value: T, key: string) => void): void;
            /**
             * Determines whether all the members of an array satisfy the specified test.
             *
             * @param callbackfn A function that accepts up to two arguments. The every method calls the callbackfn function for each element in the map until the callbackfn returns false, or until the end of the map.
             * @return True if the callback function returns true for all map elements, false otherwise.
             */
            every(callbackfn: (value: T, key: string) => boolean): boolean;
            /**
             * Determines whether the specified callback function returns true for any element of a map.
             *
             * @param callbackfn A function that accepts up to two arguments. The some method calls the callbackfn function for each element in the map until the callbackfn returns true, or until the end of the map.
             * @return True if the callback function returns true for at least one map element, false otherwise.
             */
            some(callbackfn: (value: T, key: string) => boolean): boolean;
            /**
             * Creates an Array<T> from the elements of the map.
             * @return The instance of the array with flattened map elements.
             */
            toArray(): Array<T>;
            /**
             * Creates a projection of the observable map.
             *
             * @param transform A function that transforms object in this map into objects in the projection.
             * @return The projected map.
             */
            map<U>(lifetimeManager: DisposableBase.LifetimeManager, transform: (value: T) => U): IObservableMap<U>;
            /**
             * Gets the number of items in the observable map.
             */
            count: number;
            /**
             * Disposes of the map.
             */
            dispose(): void;
            /**
             * Subscribes to an observable map.
             *
             * @param lifetimeManager The manager responsible for disposing of the subscription.
             * @param callback Called when the map changes.
             * @param target See observable subscribe function.
             * @param topic See observable subscribe function.
             * @return The subscription to the map.
             */
            subscribe(lifetimeManager: DisposableBase.LifetimeManager, callback: (newValue: StringMap<T>) => void, target?: any, topic?: string): KnockoutSubscription<StringMap<T>>;
        }
        /**
         * An observable map. This interface is mutable.
         */
        interface IMutableObservableMap<T> extends IObservableMap<T> {
            /**
             * Associates the passed key with the passed value.
             *
             * @param the key of the key/value pair.
             * @param the value of the key/value pair.
             */
            put(key: string, value: T): void;
            /**
             * Prevents any knockout notifications until the passed callback executes.
             * Anytime you need to push lots of key value pairs, you should do it in the passed callback.
             * This function also locks any dependant maps (projections or unions) so they too only fire one
             * update.
             *
             * @param callback the function to call before notifying subsribers.
             */
            modify(callback: () => void): void;
            /**
             * Removes all items from the observable map.
             */
            clear(): void;
            /**
             * Removes the key/value pair from the map.
             *
             * @param key The key (and its corresponding value) to remove from the map.
             */
            remove(key: string): void;
        }
        /**
         * Stores the Knockout bindingContext private variable (in normal and minified forms).
         */
        var _koBindingContext: any;
        /**
         * Stores the Knockout dependencyDetection private variable (in normal and minified forms).
         */
        var _koDependencyDetectionIgnore: any;
        /**
         * An observable map/dictionary. When you add or remove key value pairs, it notifies subscribers.
         * Can be used in computeds and like any other observable except that you use .latch() to read the map
         * and put, remove, and clear to mutate the map.
         */
        class ObservableMap<T> implements IMutableObservableMap<T> {
            /**
             * Actual string map that stores the values.
             */
            _modifyMap: StringMap<T>;
            /**
             * Maps, dependent on this one.
             */
            _dependantMaps: ObservableMap<any>[];
            /**
             * The internal workings of observable map. We name it without _ so Ibiza will synchronize the observables
             * across the iframe.
             */
            private observable;
            private _isInModifyBlock;
            /**
             * See interface.
             */
            put(key: string, value: T): void;
            /**
             * See interface.
             */
            lookup(key: string): T;
            /**
             * See interface.
             */
            modify(callback: () => void): void;
            /**
             * See interface.
             */
            latch(): StringMap<T>;
            /**
             * See interface.
             */
            clear(): void;
            /**
             * See interface.
             */
            count: number;
            /**
             * See interface.
             */
            remove(key: string): void;
            /**
             * See interface.
             */
            forEach(callback: (value: T, key: string) => void): void;
            /**
             * See interface.
             */
            some(callbackfn: (value: T, key: string) => boolean): boolean;
            /**
             * See interface.
             */
            every(callbackfn: (value: T, key: string) => boolean): boolean;
            /**
             * See interface.
             */
            toArray(): Array<T>;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            subscribe(lifetimeManager: DisposableBase.LifetimeManager, callback: (newValue: StringMap<T>) => void, target?: any, topic?: string): KnockoutSubscription<StringMap<T>>;
            /**
             * See interface.
             */
            map<U>(lifetimeManager: DisposableBase.LifetimeManager, transform: (value: T) => U): IObservableMap<U>;
            /**
             * Adds a map as a dependant. Whenever the user adds or removes a key, this change gets reflected
             * in all dependant maps.
             *
             * @param map The map that depends on us. Generic parameter is any instead of T because projections are generally a different type.
             */
            _addDependantMap(map: ObservableMap<any>): void;
            /**
             * Removes a dependant observable map. The map will no longer receive updates from this map.
             *
             * @param map The map to remove as a dependancy. Generic parameter is any instead of T because projections are generally a different type.
             */
            _removeDependantMap(map: ObservableMap<any>): void;
            /**
             * Called when an an upstream map adds a key value pair.
             *
             * @param key The added key.
             * @param value The added value. Type is any because projections may have a different type than the parent map.
             */
            _putNotification(key: string, value: any): void;
            /**
             * Called when an upstream map removes a key.
             *
             * @param key The key removed.
             */
            _removeNotification(key: string): void;
            /**
             * Called when an upstream map removes all keys
             *
             * @param map The map being cleared.
             */
            _clearNotification(map: IObservableMap<any>): void;
            private _validateKey(key);
        }
        /**
         * A projection of an observable map. Whenever a key/value pair gets added to the base map,
         * a transformed object with the same key gets added to the projection. Removing from or clearing
         * the base map reflects in the projection as well.
         * Map.project is an easier was to create these.
         */
        class ObservableMapProjection<T, U> extends ObservableMap<U> {
            private _transform;
            private _map;
            constructor(lifetimeManager: DisposableBase.LifetimeManager, map: ObservableMap<T>, transform: (value: T) => U);
            /**
             * See parent.
             */
            dispose(): void;
            /**
             * Projections are immutable. Throws an exception.
             */
            put(key: string, value: U): void;
            /**
             * Projections are immutable. Throws an exception.
             */
            remove(key: string): void;
            /**
             * Projections are immutable. Throws an exceptions.
             */
            clear(): void;
            /**
             * See parent.
             */
            _putNotification(key: string, value: T): void;
            /**
             * See parent.
             */
            _removeNotification(key: string): void;
            /**
             * See parent.
             */
            _clearNotification(map: IObservableMap<any>): void;
        }
        /**
         * Contains the union of key/value pairs on any number of other maps.
         */
        class ObservableMapUnion<T> extends ObservableMap<T> {
            private _maps;
            constructor(lifetimeManager: DisposableBase.LifetimeManager, ...maps: IObservableMap<T>[]);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * Unions are immutable. Throws an exceptions.
             */
            put(key: string, value: T): void;
            /**
             * Unions are immutable. Throws an exceptions.
             */
            remove(key: string): void;
            /**
             * Unions are immutable. Throws an exceptions.
             */
            clear(): void;
            /**
             * See parent.
             */
            _putNotification(key: string, value: T): void;
            /**
             * See parent.
             */
            _removeNotification(key: string): void;
            /**
             * See parent.
             */
            _clearNotification(map: IObservableMap<any>): void;
        }
        /**
         * Encodes the input into a string that has none of these characters: <>&.
         *
         * @param value Input to encode.
         * @return Encoded HTML.
         */
        function htmlEncode(value?: any): string;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Promise.d.ts
declare module "Viva.Controls/Controls/Base/Promise" {
    export = Main;
    module Main {
        /**
         * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
         * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
         */
        interface Promise {
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => void, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => Promise, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => void, onReject?: (reason?: any) => Promise): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => PromiseV<UValue>, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => UValue, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => PromiseV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UProgress>(onFulfill: () => PromiseN<UProgress>, onReject?: (reason?: PromiseN<UProgress>) => any): PromiseN<UProgress>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue, UProgress>(onFulfill: () => PromiseVN<UValue, UProgress>, onReject?: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch(onReject: (reason?: any) => void): Promise;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UProgress>(onReject: (reason?: any) => PromiseN<UProgress>): PromiseN<UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue, UProgress>(onReject: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise issues progress notification.
             *
             * @param progressCallback A callback to be invoked when the promise issues progress notification.
             * @return A new promise.
             */
            progress(progressCallback: () => void): Promise;
            /**
             * Registers a callback to be invoked when the promise is settled.
             *
             * @return A new promise.
             */
            finally(finallyCallback: () => any): Promise;
        }
        /**
         * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
         * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
         */
        interface PromiseV<TValue> {
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => PromiseV<UValue>, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => void, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => Promise, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => void, onReject?: (reason?: any) => Promise): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => PromiseV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UProgress>(onFulfill: (value: TValue) => PromiseN<UProgress>, onReject?: (reason?: PromiseN<UProgress>) => any): PromiseN<UProgress>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue, UProgress>(onFulfill: (value: TValue) => PromiseVN<UValue, UProgress>, onReject?: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch(onReject: (reason?: any) => void): Promise;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UProgress>(onReject: (reason?: any) => PromiseN<UProgress>): PromiseN<UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue, UProgress>(onReject: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise issues progress notification.
             *
             * @param progressCallback A callback to be invoked when the promise issues progress notification.
             * @return A new promise.
             */
            progress(progressCallback: () => void): PromiseV<TValue>;
            /**
             * Registers a callback to be invoked when the promise is settled.
             *
             * @return A new promise.
             */
            finally(finallyCallback: () => any): PromiseV<TValue>;
        }
        /**
         * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
         * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
         */
        interface PromiseN<TProgress> {
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => void, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => Promise, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: () => void, onReject?: (reason?: any) => Promise): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => PromiseV<UValue>, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => UValue, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => PromiseV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: () => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UProgress>(onFulfill: () => PromiseN<UProgress>, onReject?: (reason?: PromiseN<UProgress>) => any): PromiseN<UProgress>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue, UProgress>(onFulfill: () => PromiseVN<UValue, UProgress>, onReject?: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch(onReject: (reason?: any) => void): Promise;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UProgress>(onReject: (reason?: any) => PromiseN<UProgress>): PromiseN<UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue, UProgress>(onReject: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise issues progress notification.
             *
             * @param progressCallback A callback to be invoked when the promise issues progress notification.
             * @return A new promise.
             */
            progress(progressCallback: (progressInfo: TProgress) => void): PromiseN<TProgress>;
            /**
             * Registers a callback to be invoked when the promise is settled.
             *
             * @return A new promise.
             */
            finally(finallyCallback: () => any): PromiseN<TProgress>;
        }
        /**
         * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
         * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
         */
        interface PromiseVN<TValue, TProgress> {
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => void, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => Promise, onReject?: (reason?: any) => void): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then(onFulfill: (value: TValue) => void, onReject?: (reason?: any) => Promise): Promise;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => PromiseV<UValue>, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => PromiseV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UProgress>(onFulfill: (value: TValue) => PromiseN<UProgress>, onReject?: (reason?: PromiseN<UProgress>) => any): PromiseN<UProgress>;
            /**
             * Registers callbacks to be invoked when the promise is settled.
             *
             * @param onFulfill A callback to be invoked when the promise is fulfilled.
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            then<UValue, UProgress>(onFulfill: (value: TValue) => PromiseVN<UValue, UProgress>, onReject?: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch(onReject: (reason?: any) => void): Promise;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => PromiseV<UValue>): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue>(onReject: (reason?: any) => UValue): PromiseV<UValue>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UProgress>(onReject: (reason?: any) => PromiseN<UProgress>): PromiseN<UProgress>;
            /**
             * Registers a callback to be invoked when the promise is rejected.
             *
             * @param onReject A callback to be invoked when the promise is rejected.
             * @return A new promise.
             */
            catch<UValue, UProgress>(onReject: (reason?: any) => PromiseVN<UValue, UProgress>): PromiseVN<UValue, UProgress>;
            /**
             * Registers a callback to be invoked when the promise issues progress notification.
             *
             * @param progressCallback A callback to be invoked when the promise issues progress notification.
             * @return A new promise.
             */
            progress(progressCallback: (progressInfo: TProgress) => void): PromiseVN<TValue, TProgress>;
            /**
             * Registers a callback to be invoked when the promise is settled.
             *
             * @return A new promise.
             */
            finally(finallyCallback: () => any): PromiseVN<TValue, TProgress>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Sanitizer.d.ts
declare module "Viva.Controls/Controls/Base/Sanitizer" {
    export = Main;
    module Main {
        interface Sanitizer {
            /**
             * Sanitizes the html to host requirements.
             *
             * @param sourceDescription A descriptive string describing the namespace where the call is being made for error reporting.
             * @param html The untrusted html.
             * @return The trusted html.
             */
            sanitizeHTML(sourceDescription: string, html: string): string;
            /**
             * Indicates if the uri meets host requirements.
             *
             * @param uri The untrusted uri.
             * @return If the uri should be trusted.
             */
            sanitizeUri(uri: string): boolean;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\SliderBase.d.ts
declare module "Viva.Controls/Controls/Base/SliderBase" {
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for slider widget.
         */
        interface Interface<T> extends ValidatableControl.Interface<T> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<T>;
        }
        class ViewModel<T> extends ValidatableControl.ViewModel<T> {
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
        /**
         * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
         * Support ARIA with arrow keypress.
         */
        class Widget<TValue> extends ValidatableControl.Widget<TValue> implements Interface<TValue> {
            _slider: JQuery;
            _sliderInput: JQuery;
            _mouseUpHandler: JQueryEventHandler;
            _mouseDownHandler: JQueryEventHandler;
            _mouseMoveHandler: JQueryEventHandler;
            _sliderHandleHasFocus: KnockoutObservable<boolean>;
            _sliderHandleSliding: KnockoutObservable<boolean>;
            _slidableMin: KnockoutObservableBase<number>;
            _slidableMax: KnockoutObservableBase<number>;
            _values: KnockoutComputed<number[]>;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: any, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
             * Attaches the respective events.
             */
            _attachEvents(): void;
            /**
             * Detaches the respective events.
             */
            _detachEvents(): void;
            /**
             * Handles the key down event on the handle
             *
             * @param evt the key down event object.
             * @param minValue The min value the functions should return.
             * @param maxValue The max value the functions should return.
             * @param curValue The default value value the functions should return.
             * @return The new value of the for the widget.
             */
            _processKeyDownOnHandleEvent(evt: JQueryEventObject, minValue: number, maxValue: number, curValue: number): number;
            /**
             * Handles the key down event on the handle.
             *
             * @param evt The key down event object.
             */
            _processKeyUpEvent(evt: JQueryEventObject): void;
            /**
             * Function which updates the slider handle position. This funtion is called from _processMouseEvent.
             * derived classes MUST override this method.
             *
             * @param xCoord The x coordinate for the mouse event object.
             * @param yCoord The y coordinate for the mouse event object.
             */
            _updateSliderHandle(xCoord: number, yCoord: number): void;
            /**
             * Returns the percentage value of the given input value within the slider range.
             *
             * @param currentValue Current value.
             * @return The percentage value for the given input value within the slider range.
             */
            _getSliderRelativePositionPercentage(currentValue: number): number;
            /**
             * Returns the value closest possible steps from the mouse position.
             *
             * @param xCoord x-Coordinate of the mouse.
             * @param yCoord y-Coordinate of the mouse.
             * @return The normalized value.
             */
            _normalizeValueFromMouseCoord(xCoord: number, yCoord: number): number;
            _trimAndAlignValue(value: number): number;
            _processMouseEvent(evt: JQueryEventObject): boolean;
            _computedSlidableMin(): number;
            _computedSlidableMax(): number;
            private _initializeComputeds();
            private _slidingKey(eventKey);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\TypableControl.d.ts
declare module "Viva.Controls/Controls/Base/TypableControl" {
    import ValueUpdateTrigger = require("Viva.Controls/Controls/Base/ValueUpdateTrigger");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface<TValue> extends ValidatableControl.Interface<TValue> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
        }
        class ViewModel<TValue> extends ValidatableControl.ViewModel<TValue> {
            /**
             * The global validation for the control will be delayed for the specified timeout value after a value update notification is received.
             * Set the timeout value when continous value update on key press is enabled.
             * Specify the timeout in milliseconds.
             */
            delayValidationTimeout: KnockoutObservable<number>;
            /**
             *  Updates the value view model based on enum option.
             */
            valueUpdateTrigger: ValueUpdateTrigger.ValueUpdateTrigger;
        }
        class Widget<TValue> extends ValidatableControl.Widget<TValue> implements Interface<TValue> {
            private _delayValidationTimer;
            private _keyUpCommitHandler;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            validate(force?: boolean): void;
            _attachTypableEvents(): void;
            _detachTypableEvents(): void;
            _valueChangeValidation(): void;
            _getValueUpdateTrigger(): string;
            /**
             * Runs when delay validation is enabled and checks the frequency of the key strokes are with in the delay validation timeout specified by the user.
             *
             * @return Whether validation should be delayed.
             */
            _shouldDelayValidation(): boolean;
            private _clearDelayValidationTimer();
            private static _isContentChangeTrigger(valueUpdateTrigger);
            private _runDelayValidationTimer();
            private _delayValidationEnabled();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ValidatableControl.d.ts
declare module "Viva.Controls/Controls/Base/ValidatableControl" {
    import Validators = require("Viva.Controls/Controls/Base/Validators");
    import EditableControl = require("Viva.Controls/Controls/Base/EditableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface<TValue> extends EditableControl.Interface<TValue> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
            /**
             * Checks all the validators to determine if the value is valid.
             *
             * @param force Forces re-validation even though the TValue hasn't changed.
             */
            validate(force?: boolean): void;
        }
        class ViewModel<TValue> extends EditableControl.ViewModel<TValue> implements Validators.Validatable<TValue>, Validators.ErrorPlacement<TValue> {
            /**
             * False to never validate, True for immediate and on keypress.
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
            validationState: KnockoutObservable<Validators.ValidationState>;
            /**
             * Validators to apply to the value when validating.
             */
            validators: KnockoutObservableArray<Validators.Validator<TValue>>;
            /**
             * List of placements that display validation status.
             */
            validationPlacements: KnockoutObservableArray<Validators.ValidationPlacement<TValue>>;
            /**
             * Creates a new validatable control view model.
             */
            constructor();
        }
        class Widget<TValue> extends EditableControl.Widget<TValue> implements Interface<TValue> {
            private _initializingValidatableControl;
            private _validationState;
            private _validationStateInternal;
            private _valid;
            private _validationLifetimeManager;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel<TValue>, createOptions: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: Object, createOptions: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
              * See interface.
              */
            validate(force?: boolean): void;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
            /**
             * See parent.
             */
            _afterCreate(): void;
            _onValueChanged(value: TValue): void;
            _valueChangeValidation(): void;
            _initializeValidationPlacements(): void;
            private _disposeValidationLifetimeManager();
            private _hasValidators();
            private _initializeValidation();
            private _onValidatorsChanged();
            private _shouldValidate();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ValidationPlacements\Base.d.ts
declare module "Viva.Controls/Controls/Base/ValidationPlacements/Base" {
    import Validators = require("Viva.Controls/Controls/Base/Validators");
    export = Main;
    module Main {
        class Base<TValue> implements Validators.ValidationPlacement<TValue> {
            _element: JQuery;
            _validatable: Validators.Validatable<TValue>;
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
            initialize(element: JQuery, validatable: Validators.Validatable<TValue>): void;
            /**
             * See interface.
             */
            onErrorMessageChanged(newValue: string): void;
            /**
             * See interface.
             */
            onValidationStateChanged(newValue: Validators.ValidationState): void;
            /**
             * Initializes the subscriptions property.
             */
            _initializeSubscriptions(): void;
            /**
             * Disposes the subscriptions property.
             */
            _disposeSubscriptions(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ValidationPlacements\Css.d.ts
declare module "Viva.Controls/Controls/Base/ValidationPlacements/Css" {
    import Validators = require("Viva.Controls/Controls/Base/Validators");
    import Base = require("Viva.Controls/Controls/Base/ValidationPlacements/Base");
    export = Main;
    module Main {
        class Css<TValue> extends Base.Base<TValue> {
            private _input;
            private _valid;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            initialize(element: JQuery, validatable: Validators.Validatable<TValue>): void;
            /**
             * See interface.
             */
            onValidationStateChanged(newValue: Validators.ValidationState): void;
            private _setValidationAttribute(validationState);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ValidationPlacements\DockedBalloon.d.ts
declare module "Viva.Controls/Controls/Base/ValidationPlacements/DockedBalloon" {
    import Validators = require("Viva.Controls/Controls/Base/Validators");
    import Base = require("Viva.Controls/Controls/Base/ValidationPlacements/Base");
    export = Main;
    module Main {
        /**
         * Optional settings to control the validation docked balloon behavior.
         */
        interface DockedBalloonOptions {
            /**
             * Optional setting to indicate if validation balloon should be shown on focus/click.
             */
            balloonVisible?: boolean;
        }
        /**
         * Optional settings to control the validation docked balloon behavior for each ValidationState.
         */
        interface ValidationStateDockedBalloonOptions extends StringMap<DockedBalloonOptions> {
            /**
             * Optional settings to control the validation docked balloon behavior for ValidationState.None.
             */
            none?: DockedBalloonOptions;
            /**
             * Optional settings to control the validation docked balloon behavior for ValidationState.Invalid.
             */
            invalid?: DockedBalloonOptions;
            /**
             * Optional settings to control the validation docked balloon behavior for ValidationState.Valid.
             */
            valid?: DockedBalloonOptions;
            /**
             * Optional settings to control the validation docked balloon behavior for ValidationState.Pending.
             */
            pending?: DockedBalloonOptions;
        }
        class DockedBalloon<TValue> extends Base.Base<TValue> {
            static defaultOptions: {
                "validationStateBalloonOptions": {
                    "pending": {
                        "balloonVisible": boolean;
                    };
                };
            };
            private _settings;
            private _inputElement;
            private _inputSelector;
            private _originalInputWidth;
            private _widget;
            private _widgetElement;
            private _widgetViewModel;
            private _widgetWidth;
            private _validationStateBalloonOptions;
            private _inputElementFocusHandler;
            private _inputElementBlurHandler;
            private _widgetAnchorElementClickHandler;
            private _errorMessagesListWidget;
            constructor(settings?: any);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            onValidationStateChanged(newValue: Validators.ValidationState): void;
            /**
             * Sets the input element selector that will be modified to fit the width of the validation placement when shown.
             */
            _setInputSelector(selector: string): void;
            private _createDockedBalloon();
            private _initializeValidationStateDockedBalloonOptions(settings?);
            private _attachEvents();
            private _detachEvents();
            private _onInputElementFocus();
            private _onInputElementBlur();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\Validators.d.ts
declare module "Viva.Controls/Controls/Base/Validators" {
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    export = Main;
    module Main {
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
            enableValidation: KnockoutObservableBase<boolean>;
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
        class CaseInsensitiveComparison extends Compare<string> {
            /**
             * Constructs a validator that uses toLowerCase() to compare two values.
             *
             * @param compareTo The value or accessor to get the value to compare to.
             * @param message Validation rule error message.
             */
            constructor(compareTo: string, message?: string);
            constructor(compareTo: () => string, message?: string);
            /**
             * Compares two values for case insensitive equality.
             *
             * @param value The control value.
             * @param compareTo The value to compare to.
             * @return Result of equality comparison.
             */
            _compare(value: string, compareTo: string): boolean;
        }
        class LocaleAwareCaseInsensitiveComparison extends Compare<string> {
            /**
             * Constructs a validator that uses toLocaleLowerCase() to compare two values.
             *
             * @param compareTo The value or accessor to get the value to compare to.
             * @param message Validation rule error message.
             */
            constructor(compareTo: string, message?: string);
            constructor(compareTo: () => string, message?: string);
            /**
             * Compares two values for locale aware case insensitive equality.
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
        class DateTimeRange extends Validator<Date> {
            private minDateTime;
            private maxDateTime;
            private timezoneOffset;
            /**
             * Constructs a validator that checks whether the date is within the range defined by min and max date, with 1 second precision.
             *
             * @param min Earliest, enabled date.
             * @param max Latest, enabled date.
             * @param message Validation rule error message.
             */
            constructor(min: Date, max: Date, timezoneOffset: KnockoutObservable<number>, message?: string);
            /**
             * See base.
             */
            _validate(value: Date): ValidationState;
        }
        class DayRange extends Validator<Date> {
            private minDateTime;
            private maxDateTime;
            private timezoneOffset;
            /**
             * Constructs a validator that checks whether the date is within the range defined by min and max date, with a day precision.
             *
             * @param min Earliest, enabled date.
             * @param max Latest, enabled date.
             * @param message Validation rule error message.
             */
            constructor(min: Date, max: Date, timezoneOffset: KnockoutObservable<number>, message?: string);
            /**
             * See base.
             */
            _validate(value: Date): ValidationState;
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
            constructor(message: string, validationHandler: (value: TValue, context?: any) => Promise.PromiseV<string>, context?: any);
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Base\ValueUpdateTrigger.d.ts
declare module "Viva.Controls/Controls/Base/ValueUpdateTrigger" {
    export = Main;
    module Main {
        /**
         * Default delay validation timeout which will be used by controls supporting continous key update and delayed validation.
         */
        var DefaultDelayValidationTimeout: number;
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Command.d.ts
declare module "Viva.Controls/Controls/Command" {
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    export = Main;
    module Main {
        interface Command<T> {
            /**
             * A value indicating whether or not the command can be executed.
             */
            canExecute: KnockoutObservableBase<boolean>;
            /**
             * Executes the specified command.
             *
             * @param context The context under which the command is executed.
             * @returns The promise for execution completion.
             */
            execute(context: T): Promise.Promise;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Console.d.ts
declare module "Viva.Controls/Controls/Console" {
    import Command = require("Viva.Controls/Controls/Base/Command");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * Clears the content of the Console Log.
             */
            clear(): void;
            /**
             * Submits the content of the command line to be executed.
             */
            submit(): void;
        }
        class ViewModel extends CompositeControl.ViewModel {
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
            clear: Command.ViewModel;
            /**
             * Constructs a console view model.
             */
            constructor();
        }
        /**
         * Console Control Composite Widget.
         * Composed of a LogStream Control Widget and a CommandLineInterface.
         */
        class Widget extends CompositeControl.Widget implements Interface {
            private _log;
            private _cli;
            private _scroll;
            private _contentElement;
            private _eventKeyPressHandler;
            private _eventKeyDownHandler;
            private _eventPasteHandler;
            private _eventFocusHandler;
            private _eventBlurHandler;
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
            /**
             * Destroys the widget.
             */
            dispose(): void;
            /**
             * The view model driving this widget.
             *
             * @return ViewModel.
             */
            options: ViewModel;
            /**
             * Attaches events to the element of the Console widget.
             */
            private _attachEvents();
            /**
             * Detaches events from the element of the Console widget.
             */
            private _detachEvents();
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * Clears the content of the console log display.
             */
            clear(): void;
            /**
             * Submits the user input of the command line interface.
             */
            submit(): void;
            /**
             * Displays a headline information log to the user in the console log.
             */
            headline(text: string): void;
            /**
             * Returns the user command line prompt string.
             *
             * @return String representing the command line prompt string.
             */
            private _prompt();
            /**
             * Sets the user command line prompt string.
             *
             * @param text The string representing the new command line prompt.
             */
            private _prompt(text);
            /**
             * Submits the user input from the command line interface to the console log and the view model.
             *
             * @param input The command input to be forwarded.
             */
            private _forwardCommand(input);
            /**
             * Logs text.
             *
             * @param text The text to log.
             */
            private _logMessage(text, type);
            /**
             * Refreshes the scrollbar size and scrolls the cursor into view.
             */
            private _refreshScroll();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\DockedBalloon.d.ts
declare module "Viva.Controls/Controls/DockedBalloon" {
    import Balloon = require("Viva.Controls/Controls/Balloon");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
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
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface CssClasses extends StringMap<string> {
        }
        class ViewModel extends Base.ViewModel {
            /**
             * See interface.
             */
            type: Type;
            /**
             * See interface.
             */
            position: KnockoutObservable<Balloon.Position>;
            /**
             * See interface.
             */
            content: KnockoutObservableBase<string>;
            /**
             * See interface.
             */
            link: KnockoutObservable<Balloon.Link>;
            /**
             * See interface.
             */
            balloonVisible: KnockoutObservable<boolean>;
            /**
             * See interface.
             */
            stopClickPropagation: KnockoutObservable<boolean>;
        }
        class Widget extends Base.Widget implements Interface {
            private _balloonViewModel;
            private _balloonWidget;
            private _balloonPinned;
            private _typeString;
            private _scrollableParents;
            private _anchorMouseEnterHandler;
            private _anchorMouseLeaveHandler;
            private _anchorClickHandler;
            private _anchorFocusInHandler;
            private _anchorFocusOutHandler;
            private _documentMouseDownHandler;
            private _resizeEventHandler;
            private _parentScrollHandler;
            private _beforeClickedEventHandler;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param doesn't match this widget's view model. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param doesn't match this widget's view model. If null, will use the widget ViewModel type.
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
            private _initializeComputeds();
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            private _initializeBalloonWidget();
            private _attachEvents();
            private _detachEvents();
            private _anchorMouseEnter();
            private _anchorClick(evt);
            private _anchorMouseLeave();
            private _anchorFocusIn();
            private _anchorFocusOut();
            private _scrollOrResizeWindow();
            private _documentMouseDown(evt);
            private _isImageShown();
            private _isCheckPopulated();
            private _getOffset(direction);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\Button.d.ts
declare module "Viva.Controls/Controls/Forms/Button" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
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
         * Enabled and disabled Uris.
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
         * Button interface.
         */
        interface Interface {
        }
        /**
         * Button view model.
         */
        class ViewModel extends Base.ViewModel {
            /**
             * Indicates if the button acts as a submit button. If true, when clicked, the button will trigger a submit event.
             */
            submit: boolean;
            /**
             * jQuery selector indicating what tag changes it's image source.
             */
            selector: KnockoutObservable<string>;
            /**
             * Indicates if the control is a press-able button.
             */
            toggle: KnockoutObservable<boolean>;
            /**
             * Current pressed state.
             * This value stays false if toggle is false.
             */
            pressed: KnockoutObservable<boolean>;
            /**
             * Current state of the mouse.
             */
            state: KnockoutObservable<MouseState>;
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
             * Tab-index of the button.
             */
            tabindex: KnockoutObservable<number>;
            /**
             * Shows or hides the button.
             */
            visible: KnockoutObservableBase<boolean>;
            /**
             * Indicates if the button is displayed as a default action.
             */
            isDefault: KnockoutObservableBase<boolean>;
        }
        /**
         * Creates a button which supports ARIA.
         */
        class Widget extends Base.Widget implements Interface {
            private _previousImg;
            private _previousSelector;
            private _body;
            private _clickHandler;
            private _mouseDownHandler;
            private _mouseEnterHandler;
            private _mouseLeaveHandler;
            private _mouseUpHandler;
            private _keyDownHandler;
            private _keyUpHandler;
            private _correctKeyPressed;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _initializeComputeds();
            /**
             * Attaches key event handlers to the button element.
             */
            private _attachKeyEvent();
            /**
             * Handles the click event for button element.
             *
             * @param evt The event object.
             * @return JQuery event hander result where false will stop propagation and return default.
             */
            private _click(evt);
            /**
             * Gets the current image alt from the view model state.
             *
             * @return The alt text.
             */
            private _getAlt();
            /**
             * Gets the appropriate uri or alt from the view model state.
             *
             * @param stack The uri or alt options to select from.
             * @return The selected uri or alt value.
             */
            private _getObject(stack);
            /**
             * Gets the current image uri from the view model state.
             *
             * @return The uri.
             */
            private _getUri();
            /**
             * Handles mouse down event for button element.
             */
            private _mouseDown();
            /**
             * Handles mouse enter event for button element.
             */
            private _mouseEnter();
            /**
             * Handles mouse leave event for button element.
             */
            private _mouseLeave();
            /**
             * Removes the mouse up event handler if still attached to the body.
             */
            private _removeMouseUpHandler();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\CheckBox.d.ts
declare module "Viva.Controls/Controls/Forms/CheckBox" {
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * CheckBox value states.
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
         * View model interface for CheckBox widget.
         */
        interface Interface extends ValidatableControl.Interface<Value> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        /**
         * The view model for CheckBox widget.
         */
        class ViewModel extends ValidatableControl.ViewModel<Value> {
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
            /**
             * Enable tri-state CheckBox.
             * If you don't provide a value, the default is the standard dual state CheckBox.
             */
            isTriState: boolean;
            /**
             * Enable or disable user to select Indeterminate (when in tri-state CheckBox mode).
             * True by default.
             */
            canUserSetIndeterminate: KnockoutObservable<boolean>;
            /**
             * Current state of the mouse.
             */
            state: KnockoutObservable<MouseState>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        /**
         * Creates a stylized CheckBox with support for ARIA.
         * Supports the following states:
         * * checked/indeterminate/unchecked.
         * * enabled/disabled.
         * * edited/not edited.
         */
        class Widget extends ValidatableControl.Widget<Value> implements Interface {
            private _name;
            private _checked;
            private _ariaChecked;
            private _checkChecked;
            private _checkIndeterminate;
            private _inputValue;
            private _input;
            private _attributes;
            private _events;
            private _svgElements;
            private _svgCheck;
            private _svgIndeterminate;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Toggles the value from checked to unchecked, unchecked to indeterminate and indeterminate to checked.
             */
            toggle(): void;
            /**
             * See parent.
             */
            _isSameValue(a: any, b: any): boolean;
            private _initializeComputeds();
            /**
             * Gets the value property of the CheckBox based on view model state.
             *
             * @param value CheckBox view model value.
             * @return Value property of the CheckBox.
             */
            private _getInputValue(value);
            private _addAttributes();
            private _removeAttributes();
            private _blur();
            private _focus();
            /**
             * Attaches event handlers.
             */
            private _attachEvents();
            /**
             * Detaches event handlers.
             */
            private _detachEvents();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\ComboDropBase.d.ts
declare module "Viva.Controls/Controls/Forms/ComboDropBase" {
    import EditableControl = require("Viva.Controls/Controls/Base/EditableControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * This is an abstract class used by EditableCombo to talk to the widget inside the drop popup.
         */
        class DropAdapter<TWidget extends Base.Widget, TValue> {
            _combo: Base.Widget;
            _widget: TWidget;
            /**
             * Indicates whether a popup can be shown or not.
             */
            canShowPopup: KnockoutObservable<boolean>;
            constructor();
            /**
             * Gets whether the widget is created yet or not.
             *
             * @return The widget is created or not.
             */
            widgetExists: boolean;
            /**
             * Gets the current widget.
             *
             * @return The widget.
             */
            widget: TWidget;
            /**
             * Destroys the adapter.
             */
            dispose(): void;
            /**
             * Sets the owner combo of the drop adapter.
             *
             * @param combo Owner combo of the drop adapter
             */
            setCombo(combo: Base.Widget): void;
            /**
             * This method is called by the combo when drop popup is being displayed.
             *
             * @param combo EditableCombo element which will own the drop popup.
             * @param fixture The element to apply the widget to.
             * @return The newly created widget.
             */
            createWidget(combo: Interface<TValue>, fixture: JQuery): TWidget;
            /**
             * This method is called by the combo when drop popup is being hidden.
             */
            destroyWidget(): void;
            /**
             * Gets whether this drop adapter allows typing or not.
             *
             * @return The adapter allows typing or not.
             */
            allowsTyping(): boolean;
            /**
             * This method is called by combo when keydown is pressed in the input element.
             * The goal is to let the derivatives handle different keys other than up, down, left, right.
             *
             * @param evt Jquery event object.
             * @return Returns true if not handled, otherwise returns false.
             */
            keyDown(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when keyup is fired for the input element.
             *
             * @param evt Jquery event object.
             * @return Returns true if not handled, otherwise returns false.
             */
            keyUp(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when keypress is fired for the input element.
             *
             * @param evt Jquery event object.
             * @return Returns true if not handled, otherwise returns false.
             */
            keyPress(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the down key is pressed in the input element.
             *
             * @param evt Jquery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            downKey(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the up key is pressed in the input element.
             *
             * @param evt jQuery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            upKey(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the left key is pressed in the input element.
             *
             * @param evt Jquery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            leftKey(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the right key is pressed in the input element.
             *
             * @param evt Jquery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            rightKey(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the enter key is pressed in the input element.
             *
             * @param evt Jquery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            enterKey(evt: JQueryEventObject): boolean;
            /**
             * This method is called by combo when the tab key is pressed in the input element.
             *
             * @param evt Jquery event object.
             * @return Returns false if default behavior needs to be prevented.
             */
            tabKey(evt: JQueryEventObject): boolean;
            /**
             * Drop adapter derivatives override this method to decide which
             * widget to create inside the drop popup.
             *
             * @param combo EditableCombo element which will own the drop popup.
             * @param fixture The element to apply the widget to.
             * @return The newly created widget.
             */
            _createWidget(combo: Interface<TValue>, fixture: JQuery): TWidget;
        }
        interface Interface<TValue> extends EditableControl.Interface<TValue> {
            /**
             * The view model driving this widget.
             */
            options: EditableControl.ViewModel<TValue>;
            /**
             * Restores the focus on the input element.
             */
            restoreFocus(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\CommandButton.d.ts
declare module "Viva.Controls/Controls/Forms/CommandButton" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import Command = require("Viva.Controls/Controls/Base/Command");
    export = Main;
    module Main {
        /**
         * CommandButton interface.
         */
        interface Interface extends Base.Interface {
        }
        /**
         * Creates a CommandButton.
         */
        class Widget extends Base.Widget implements Interface {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Command.ViewModel, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: Command.ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\CommandLink.d.ts
declare module "Viva.Controls/Controls/Forms/CommandLink" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import Command = require("Viva.Controls/Controls/Base/Command");
    export = Main;
    module Main {
        /**
         * CommandLink interface.
         */
        interface Interface extends Base.Interface {
        }
        /**
         * Creates a CommandLink.
         */
        class Widget extends Base.Widget implements Interface {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Command.ViewModel, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: Command.ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\ContentEditable.d.ts
declare module "Viva.Controls/Controls/Forms/ContentEditable" {
    import Sanitizer = require("Viva.Controls/Controls/Base/Sanitizer");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<string> {
            /**
             * Text displayed in the field when the htnl content is empty.
             */
            emptyValueText: KnockoutObservable<string>;
            /**
             *  A custom sanitizer to validate and sanitize the editable HTML content.
             */
            sanitizer: Sanitizer.Sanitizer;
        }
        class Widget extends ValidatableControl.Widget<string> implements Interface {
            private _name;
            private _iframe;
            private _editableContentWindow;
            private _editableContentReady;
            private _toolbarButtonClickHandler;
            private _toolbarButtonBlurHandler;
            private _toolbarButtonFocusHandler;
            private _contentEditableIframeBlurHandler;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel, viewModelType?: new () => ViewModel);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, viewModelType?: new () => ViewModel);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * See interface.
             */
            _getElementToFocus(): Element;
            private _execute(command);
            private _initializeContentEditableIframe();
            private _updateValue();
            private _getContent();
            private _setContent(content);
            private _sanitizeContent(content);
            private _sanitizeBrowserWorkaroundAttributes();
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\DatePanel.d.ts
declare module "Viva.Controls/Controls/Forms/DatePanel" {
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Represents a day object inside the visible area of DatePanel.
         */
        interface CalendarDay {
            /**
             * Ticks value of the current day.
             */
            date: number;
            /**
             * Day index in this month.
             */
            value: KnockoutObservable<number>;
            /**
             * Indicates whether this day equals to the selected date.
             */
            selected: KnockoutObservable<boolean>;
            /**
             * Indicates whether this day has the focus.
             */
            focused: KnockoutObservable<boolean>;
            /**
             * Indicates whether this day belongs to a month other than visible month.
             */
            otherMonth: KnockoutObservable<boolean>;
            /**
             * Indicates whether this day can be selected by user.
             */
            isEnabled: KnockoutObservable<boolean>;
        }
        /**
         * Represents a week object inside the visible area of DatePanel.
         */
        interface CalendarWeek {
            /**
             * Zero-based index of this week within visible area.
             */
            index: number;
            /**
             * Array of days within this week.
             */
            weekDays: CalendarDay[];
        }
        /**
          * Represents a date object which takes different calendar types other than
          * GregorianCalendar in to account as well (like HijriCalendar, ThaiBuddhistCalendar).
          *
          * If the calendar of current culture is other than GregorianCalendar, it tries to convert
          * the date into appropriate calendar using converter if any exists. If there is no need
          * for conversion, it falls back to the base Date object.
          */
        class CalendarDate {
            static DAY_IN_MILLISECONDS: number;
            static DAYS_IN_A_WEEK: number;
            private _baseDate;
            private _convertedDate;
            /**
             * Constructs a new CalendarDate object using the specified date.
             *
             * @param date Base date object. If nothing specified, DateTime.Now is used.
             */
            constructor(date?: Date);
            /**
             * Creates a date object using the specified date parts by trying to use current culture's.
             * calendar converter.
             *
             * @param year Year value.
             * @param month Month value.
             * @param day day value.
             * @return Date object.
             */
            static toGregorian(year: number, month: number, day: number): Date;
            /**
             * Creates a converted date using the specified gregorian date by trying to use current
             * culture's calendar converter.
             *
             * @param date Date object to convert.
             * @return Converted date values.
             */
            static fromGregorian(date: Date): number[];
            /**
             * Gets the start of the day (to time 00:00).
             *
             * @param date Day to get the start.
             * @return Start of the day.
             */
            static toDayStart(date: Date): Date;
            /**
             * Gets the base date.
             *
             * @return Base Date object.
             */
            getBaseDate(): Date;
            /**
             * Sets a new time using the specified date value.
             *
             * @param date Date object to set.
             * @return Current instance of CalendarDate.
             */
            setTime(date: any): CalendarDate;
            /** Gets the base date in ticks.
             *
             * @return Base date in ticks.
             */
            getTime(): number;
            /**
             * Gets the day of the week (from 0 to 6) of this calendar date.
             *
             * @return Number value of the day of the week (0-6).
             */
            getDay(): number;
            /**
             * Gets the year of this calendar date.
             *
             * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
             * @return Number value of the year.
             */
            getFullYear(converted?: boolean): number;
            /**
             * Gets the month of this calendar date.
             *
             * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
             * @return Number value of the month.
             */
            getMonth(converted?: boolean): number;
            /**
             * Gets the day of this calendar date in existing month.
             *
             * @param converted If specified true, uses converted date. Otherwise, it uses the base date.
             * @return Number value of the day.
             */
            getDate(converted?: boolean): number;
            /**
             * Jumps to the start of the month using the converted date.
             *
             * @return Current instance of CalendarDate.
             */
            jumpToMonthStart(): CalendarDate;
            /**
             * Jumps to the start of the week using the converted date (and culture).
             * Week start can be different for different cultures (Sunday of en-US, Monday for tr-TR, etc.).
             *
             * @return Current instance of CalendarDate.
             */
            jumpToWeekStart(): CalendarDate;
            /**
             * Advances current date one day (24hrs) forward.
             *
             * @return Current instance of CalendarDate.
             */
            nextDay(): CalendarDate;
            /**
             * Advances current date one day (24hrs) backward.
             *
             * @return Current instance of CalendarDate.
             */
            previousDay(): CalendarDate;
            /**
             * Advances current date 7 days forward.
             *
             * @return Current instance of CalendarDate.
             */
            nextWeek(): CalendarDate;
            /**
             * Advances current date 7 days backward.
             *
             * @return Current instance of CalendarDate.
             */
            previousWeek(): CalendarDate;
            /**
             * Advances current date one month backward.
             *
             * @return Current instance of CalendarDate.
             */
            previousMonth(): CalendarDate;
            /**
             * Advances current date one month forward.
             *
             * @return Current instance of CalendarDate.
             */
            nextMonth(): CalendarDate;
            /**
             * Advances current date one year backward.
             *
             * @return Current instance of CalendarDate.
             */
            previousYear(): CalendarDate;
            /**
             * Advances current date one year forward.
             *
             * @return Current instance of CalendarDate.
             */
            nextYear(): CalendarDate;
            /**
             * Checks whether the specified date and current date correspond to the same day.
             *
             * @param date Date object to compare.
             * @return Boolean value stating the specified Date equals or not.
             */
            dayEquals(date: Date): boolean;
            /**
             * Checks whether the specified date and current date are equal.
             *
             * @param date Date object to compare.
             * @return Boolean value stating the specified Date equals or not.
             */
            equals(date: Date): boolean;
            private _setDate(date, preserveTime?);
            private _increment(yearIncrement, monthIncrement);
            private _getCalculationDay();
            private _getTimePart(date);
            private _replaceTimePart(date, time);
        }
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * Enables setting the focused date selected if applicable.
             */
            selectFocusedDate(): void;
        }
        /**
         * DatePanel view model.
         */
        class ViewModel extends Base.ViewModel {
            /**
             * Selected date of the view model.
             */
            selectedDate: KnockoutObservable<Date>;
            /**
             * Month of the visible area.
             */
            visibleMonth: KnockoutObservable<Date>;
            /**
             * Focused date.
             */
            focusedDate: KnockoutObservable<Date>;
            /**
             * Abbreviated names of the days according to current culture.
             */
            dayNames: string[];
            /**
             * Date/time range in which user is able to select date/time.
             */
            enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
            /**
             * Month names according to the current culture.
             */
            monthNames: string[];
            constructor();
        }
        class Widget extends Base.Widget implements Interface {
            private _linkClickHandler;
            /**
             * Header text of month ({month} - {year}).
             */
            private _headerText;
            /**
             * Days visible in the calendar area.
             */
            private _days;
            private _templateEngine;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * See interface.
             */
            selectFocusedDate(): void;
            private _initializeComputeds();
            private _ensureCultureSpecificNames();
            private _ensureDays();
            private _setTemplates();
            private _attachEvents();
            /**
             * Detaches event handlers.
             */
            private _detachEvents();
            /**
             * Check if given date should be enabled (selectable) in calendar.
             */
            private _isDayEnabled(date);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\DatePicker.d.ts
declare module "Viva.Controls/Controls/Forms/DatePicker" {
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    import DatePanel = require("Viva.Controls/Controls/Forms/DatePanel");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import EditableCombo = require("Viva.Controls/Controls/Forms/EditableCombo");
    export = Main;
    module Main {
        class DropAdapter extends EditableCombo.DropAdapter<DatePanel.Widget, Date> {
            constructor();
            /**
             * Gets the typed combo instance.
             */
            combo: Widget;
            /**
             * See parent.
             */
            allowsTyping(): boolean;
            /**
             * See parent.
             */
            enterKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            downKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            upKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            leftKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            rightKey(evt: JQueryEventObject): boolean;
            _createWidget(combo: Interface, fixture: JQuery): DatePanel.Widget;
            private _focusDate(navigateTo, evt);
            private _advanceFocusedDate(day, navigateTo);
        }
        interface Interface extends EditableCombo.Interface<Date> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends EditableCombo.ViewModel<Date> {
            /**
             * Date/time range in which user is able to select date/time.
             */
            enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        class Widget extends EditableCombo.Widget<Date> implements Interface {
            private _dayValidator;
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
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            _createDropAdapter(): EditableCombo.DropAdapter<DatePanel.Widget, Date>;
            _createDropPopup(): JQuery;
            _parseValue(value: string): Date;
            _formatValue(value: Date): string;
            _isSameValue(a: Date, b: Date): boolean;
            private _createValidators();
            private _initializeDateEntryPlugin();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\DateTimeCombo.d.ts
declare module "Viva.Controls/Controls/Forms/DateTimeCombo" {
    import DatePanel = require("Viva.Controls/Controls/Forms/DatePanel");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import EditableCombo = require("Viva.Controls/Controls/Forms/EditableCombo");
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    export = Main;
    module Main {
        class DropAdapter extends EditableCombo.DropAdapter<DatePanel.Widget, Date> {
            constructor();
            /**
             * Gets the typed combo instance.
             */
            combo: Widget;
            /**
             * See parent.
             */
            allowsTyping(): boolean;
            /**
             * See parent.
             */
            enterKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            downKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            upKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            leftKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            rightKey(evt: JQueryEventObject): boolean;
            _createWidget(combo: Interface, fixture: JQuery): DatePanel.Widget;
            private _focusDate(navigateTo);
            private _advanceFocusedDate(day, navigateTo);
        }
        interface Interface extends EditableCombo.Interface<Date> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends EditableCombo.ViewModel<Date> {
            /**
             * A valid format string specifier (see DateUtil format), used to format the value.
             */
            formatString: KnockoutObservable<string>;
            /**
             * Date/time range in which user is able to select date/time.
             */
            enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        class Widget extends EditableCombo.Widget<Date> implements Interface {
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
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
            _createDropAdapter(): EditableCombo.DropAdapter<DatePanel.Widget, Date>;
            _createDropPopup(): JQuery;
            _parseValue(value: string): Date;
            _formatValue(value: Date): string;
            _isSameValue(a: Date, b: Date): boolean;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\DateTimePicker.d.ts
declare module "Viva.Controls/Controls/Forms/DateTimePicker" {
    import GroupDropDown = require("Viva.Controls/Controls/Forms/GroupDropDown");
    import DatePicker = require("Viva.Controls/Controls/Forms/DatePicker");
    import TimePicker = require("Viva.Controls/Controls/Forms/TimePicker");
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<Date> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<Date> {
            /**
             * DatePicker control used to select the date (year, month, day).
             */
            datePicker: DatePicker.ViewModel;
            /**
             * TimePicker control used to select the time (hour, minutes, seconds).
             */
            timePicker: TimePicker.ViewModel;
            /**
             * Date/time range in which user is able to select date/time.
             */
            enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
            /**
             * Show time zone dropdown.
             */
            showTimezoneDropdown: KnockoutObservable<boolean>;
            /**
             * Dropdown for timezones.
             */
            timezonesDropdown: GroupDropDown.ViewModel;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
            private _initializeTimezonesDropdown();
        }
        class Widget extends ValidatableControl.Widget<Date> implements Interface {
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
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            _getDisplayDate(): Date;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\DateTimeRangePicker.d.ts
declare module "Viva.Controls/Controls/Forms/DateTimeRangePicker" {
    import DateTimePicker = require("Viva.Controls/Controls/Forms/DateTimePicker");
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<DateUtil.DateTimeRange> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<DateUtil.DateTimeRange> {
            /**
             * Start date/time
             */
            startDateTime: DateTimePicker.ViewModel;
            /**
             * End date/time
             */
            endDateTime: DateTimePicker.ViewModel;
            /**
             * Show time zone dropdown.
             */
            showTimezoneDropdown: KnockoutObservable<boolean>;
            /**
             * Display start/end date/time fields inline (false by default).
             */
            displayFieldsInline: KnockoutObservable<boolean>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        class Widget extends ValidatableControl.Widget<DateUtil.DateTimeRange> implements Interface {
            private _dateTimeRangeLifetimeManager;
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
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\EditableCombo.d.ts
declare module "Viva.Controls/Controls/Forms/EditableCombo" {
    import Positioning = require("Viva.Controls/Util/Positioning");
    import ComboDropBase = require("Viva.Controls/Controls/Forms/ComboDropBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import TypableControl = require("Viva.Controls/Controls/Base/TypableControl");
    export = Main;
    module Main {
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
        class DropAdapter<TWidget extends Base.Widget, TValue> extends ComboDropBase.DropAdapter<TWidget, TValue> {
            /**
             * This method is called by combo when the drop Image is clicked.
             *
             * @param evt Jquery event object.
             */
            dropClick(evt: JQueryEventObject): void;
            /**
             * Updates drop adapter based on changes to values.
             */
            valuesChanged(): void;
        }
        interface Interface<TValue> extends TypableControl.Interface<TValue>, ComboDropBase.Interface<TValue> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
        }
        class ViewModel<TValue> extends TypableControl.ViewModel<TValue> {
            /**
             * Placeholder text held by the control.
             */
            placeholder: KnockoutObservable<string>;
            /**
             * Alignment used for drop popup.
             */
            popupAlignment: Positioning.PositioningAlignment;
            /**
             * Alignment used for input.
             */
            inputAlignment: Positioning.PositioningAlignment;
            /**
             * Width behavior of the drop popup.
             */
            dropDownWidth: KnockoutObservable<DropDownWidth>;
        }
        class Widget<TValue> extends TypableControl.Widget<TValue> implements Interface<TValue> {
            private _arrowClass;
            private _name;
            private _id;
            private _input;
            private _dropImage;
            private _dropPopup;
            private _scrollableParents;
            private _dropAdapter;
            private _blurPrevented;
            private _blurPreventHandle;
            private _dropImageMouseDownHandler;
            private _dropImageClickHandler;
            private _dropImageKeyDownHandler;
            private _dropImageKeyPressHandler;
            private _dropImageMouseEnterHandler;
            private _dropImageMouseLeaveHandler;
            private _dropImageFocusHandler;
            private _dropImageBlurHandler;
            private _dropPopupMouseDownHandler;
            private _inputKeyDownHandler;
            private _inputKeyUpHandler;
            private _inputKeyPressHandler;
            private _inputFocusHandler;
            private _inputBlurHandler;
            private _parentScrollHandler;
            private _inputMouseEnterHandler;
            private _inputMouseLeaveHandler;
            /**
             * Uses the underlying value to format and parse.
             */
            _formattedValue: KnockoutComputed<string>;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel<TValue>, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
             * Restores the focus on the input element to handle key events.
             */
            restoreFocus(): void;
            /**
             * Retrieves the input value
             */
            inputValue: string;
            /**
             * Updates drop adapter based on changes to values.
             */
            valuesChanged(): void;
            /**
             * Shows the drop popup. If already visible, hides it first.
             */
            showDropPopup(hideBeforeShow?: boolean): void;
            /**
             * Simple helper for _setFocus function. It will call focus on the returned Element.
             *
             * @return The element to set focus on.
             */
            _getElementToFocus(): Element;
            /**
             * Hides the drop popup. If already hidden, this is a noop.
             */
            hideDropPopup(): void;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel<TValue>): void;
            /**
             * Overriden by EditableCombo derivatives to optionally hide/continue showing drop popup.
             *
             */
            _valueChanged(): void;
            /**
             * Overriden by EditableCombo derivatives to create specific DropAdapter.
             *
             * @return The newly created DropAdapter.
             */
            _createDropAdapter(): DropAdapter<Base.Widget, TValue>;
            /**
             * Creates a drop element to host the popup widget. Derivatives can
             * override if they want to manipulate drop element.
             *
             * @return The drop element which contains the popup widget.
             */
            _createDropPopup(): JQuery;
            /**
             * Overriden by EditableCombo derivatives to decide how to parse the string value in the input.
             *
             * @param value Input value to be parsed.
             * @return Parsed value.
             */
            _parseValue(value: string): TValue;
            /**
             * Overriden by EditableCombo derivatives to decide how to format the current value to display in the input.
             *
             * @param value Underlying combo value to be formatted.
             * @return Formatted value to be displayed in the input.
             */
            _formatValue(value: TValue): string;
            private _setNormalArrow();
            private _setHoverArrow();
            private _initializeComputeds();
            /**
             * Toggles the drop popup of the combo.
             */
            private _toggleDropPopup();
            /**
             * Shows the drop popup. If already visible, hides it first.
             */
            private _showDropPopup();
            /**
             * Hides the drop popup. If already hidden, this is a noop.
             */
            private _hideDropPopup();
            /**
             * This notifies blur event not to hide drop popup because
             * something in the drop area is clicked. For these scenarios,
             * drop popup still needs to be visible.
             */
            private _preventBlur();
            /**
             * This clears the prevent blur timeout.
             */
            private _cancelPreventingBlur();
            /**
            * Attaches event handlers.
            */
            private _attachEvents();
            /**
             * Detaches event handlers.
             */
            private _detachEvents();
            private _onDropClick(evt);
            private _onKeyDown(evt);
            private _onKeyUp(evt);
            private _onKeyPress(evt);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\FileUpload.d.ts
declare module "Viva.Controls/Controls/Forms/FileUpload" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
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
            /**
             * The message displayed when one or more selected files exceed the sizeLimit.
             * The token {0} will be replaced by the sizeLimit property.
             */
            fileSizeExceededMessage: string;
        }
        class ViewModel extends ValidatableControl.ViewModel<string> {
            /**
             * A comma-separated list of allowed file mime-types, excluding extensions.
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
             * The size of chunks to break the file into to stream read it.
             * Default is 1MB.
             */
            chunkSize: number;
            /**
             * Resource Strings.
             */
            text: ResourceStrings;
            /**
             * The currently-selected files (as limited by maxFiles).
             */
            files: KnockoutComputed<SelectedFile[]>;
        }
        class Widget extends ValidatableControl.Widget<string> implements Interface {
            private _name;
            private _input;
            private _inputOverlay;
            private _buttonViewModel;
            private _textBoxViewModel;
            private _inputOverlayChangeHandler;
            private _inputOverlayClickHandler;
            private _selectedFiles;
            private _files;
            private _autoReadBookmarks;
            private _displayedString;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Reads the specified file and returns a chunk of size options.chunkSize.
             * This function is auto-advancing, so subsequent calls with advance the chunk read
             * until the entire file has been read.
             *
             * @param selectedFile The file to read.
             */
            read(selectedFile: SelectedFile): void;
            /**
             * Reads the specified file and returns a chunk of size options.chunkSize.
             * This function is auto-advancing, so subsequent calls with advance the chunk read
             * until the entire file has been read.
             *
             * @param selectedFile The file to read.
             * @param startByte An optional start byte for the read operation.
             */
            read(selectedFile: SelectedFile, startByte: number): void;
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            /**
             * Reads the selectedFile and returns a chunk of size options.chunkSize starting at startByte.
             *
             * @param selectedFile The file to read.
             * @param startByte The lower byte bound.
             * @param endByte The upper byte bound.
             */
            private readChunk(selectedFile, startByte, endByte);
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
            private _focus();
            private _blur();
            private _mouseEnter();
            private _mouseLeave();
            private _getDefaultResourceStrings();
            private _resetValidationState(newState);
            private _toSelectedFileArray(files);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\FileUpload2.d.ts
declare module "Viva.Controls/Controls/Forms/FileUpload2" {
    import Command = require("Viva.Controls/Controls/Command");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        /**
         *  Specifies how the file content should be uploaded.
         */
        enum FileUploadType {
            /**
             *  Full file content will be read. Use this option only for small file sizes less than 2 MB.
             */
            Full = 0,
            /**
             * File content will be read in chunks and provided to user in chunks.
             * Use this option to read large files and if user wants control over where to post the content.
             */
            Stream = 1,
            /**
             * File content will be uploaded to blob store.
             * Use this option for uploading large files in GBs.
             */
            BlobStore = 2,
        }
        /**
         * Specifies how the file content should be read and encoded in memory.
         * These options mimics the html5 file reader options to read the file content.
         */
        enum ContentType {
            /**
             * By default, file content will be read and stored as binary data in an ArrayBuffer.
             */
            Default = 0,
            /**
             * The file content will be read as plain text.
             * By default the string is encoded in 'UTF-8' format. Use the optional encoding parameter to specify a different format.
             */
            Text = 1,
            /**
             * The file content will be available in an ArrayBuffer.
             */
            ArrayBuffer = 2,
            /**
             * The file content will be encoded in the data uri scheme. Use this option for images and if those need to be directly shown in img tag.
             */
            DataUri = 3,
        }
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
            /**
             * Canceled.
             */
            Canceled = 5,
        }
        /**
         * The file upload context options around how/where to upload and size limits.
         */
        interface FileUploadContext {
            /**
             * Specify how/where the file should be uploaded.
             */
            type: FileUploadType;
            /**
             * Specify how the file content should be read and encoded in memory.
             */
            contentType: ContentType;
            /**
             * Optionally specify the encoding for Text content type like "UTF-8", "UTF-16" etc.
             * This parameter will be used directly for HTML5 file reader's readAsText method.
             */
            encoding?: string;
            /**
             * Specify the maximum file size that can be uploaded.
             */
            maxFileSize: number;
            /**
             * Specify the maximum chunk size the file should be chunked and uploaded.
             */
            chunkSize: number;
        }
        /**
         * Defines how the uploaded file content will be available for the user.
         */
        interface FileUploadContent {
            /**
             * File upload type. The content will be different for each file upload type.
             */
            type: FileUploadType;
            /**
             * Specifies how the content will be represented in memory.
             */
            contentType: ContentType;
        }
        interface FullFileUploadContent extends FileUploadContent {
            /**
             * The full file content will be available in memory and its content will be represented in the format specified by contentType.
             */
            content: any;
        }
        interface StreamFileUploadContent extends FileUploadContent {
            /**
             * The chunked file content will be available in memory and its content will be represented in the format specified by contentType.
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
        interface BlobStoreFileUploadContent extends FileUploadContent {
            /**
             * The SAS uri of the uploaded file will be available once the file upload completes successfully.
             */
            content: string;
        }
        interface FileUploadResult {
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
             * File upload content will be available in memory based on the specified upload type and content type.
             */
            data: FileUploadContent;
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
            cancelUpload: KnockoutObservable<boolean>;
            /**
             * Whether or not to continue uploading the file.
             */
            resumeUpload: KnockoutObservable<boolean>;
            /**
             * The byte to start from when reading.
             */
            uploadStartByte: number;
            /**
             * The object representing the upload for this file.
             */
            uploadResult: KnockoutObservableBase<FileUploadResult>;
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
            /**
             * The message displayed when one or more selected files exceed the sizeLimit.
             * The token {0} will be replaced by the sizeLimit property.
             */
            fileSizeExceededMessage: string;
            /**
             * The message to display when a selected file is not found/deleted.
             */
            fileNotFoundMessage: string;
            /**
             * The message to display when a selected file is not readable.
             */
            fileNotReadablMessage: string;
            /**
             * The message to display when a selected file read is canceled/aborted.
             */
            fileReadAbortedMessage: string;
            /**
             * The message to display when a selected file read throws and error.
             */
            fileReadErrorMessage: string;
            /**
             * Progress bar pending display text.
             */
            uploadStatusPending: string;
            /**
             * Progress bar error display text.
             */
            uploadStatusError: string;
            /**
             * Progress bar done display text.
             */
            uploadStatusDone: string;
            /**
             * Progress bar group uploaded text.
             */
            progressBarGroupUploadedMessage: string;
            /**
             * Progress bar group uploading text.
             */
            progressBarGroupUploadingMessage: string;
            /**
             * Progress bar group success upload text.
             */
            progressBarGroupSuccessMessage: string;
            /**
             * Progress bar group failure upload text.
             */
            progressBarGroupFailureMessage: string;
            /**
             * Progress bar group canceled upload text.
             */
            progressBarGroupCanceledMessage: string;
        }
        /**
         * Full file upload context.
         */
        class FullFileUploadContext implements FileUploadContext {
            /**
             * Full file will be read and the entire content will be available in memory.
             */
            type: FileUploadType;
            /**
             * File content will be stored by default in an array buffer.
             */
            contentType: ContentType;
            /**
             * Optionally specify the encoding for Text content type like "UTF-8", "UTF-16" etc.
             * This parameter will be used directly for HTML5 file reader's readAsText method.
             */
            encoding: string;
            /**
             * Specify the maximum file size that can be uploaded.
             * Recommended max file is less than 2 MB for this upload type.
             */
            maxFileSize: number;
            /**
             * Specify the maximum chunk size the file should be chunked and uploaded.
             * Default chunk size should be same as maxFileSize for fill file download.
             */
            chunkSize: number;
        }
        /**
         * Stream file upload context. File will be read in chunks and chunked content will be available in memory.
         */
        class StreamFileUploadContext extends FullFileUploadContext implements FileUploadContext {
            /**
             * Initialize default properties for stream file upload context.
             */
            constructor();
        }
        /**
         * BlobStore file upload context. File will be uploaded directly to blob store specified by the SAS uri.
         */
        class BlobStoreFileUploadContext<T> extends FullFileUploadContext implements FileUploadContext {
            /**
             * Sas uri command context that will be passed to the execute method of the sasUriCommand.
             */
            context: KnockoutObservableBase<T>;
            /**
             * Specify the command to fetch the SAS uri for the target blob store where file will be uploaded.
             * Execute method on the command should provide the SAS uri with correct permissions and calculate the expiration time from the time it was invoked.
             */
            sasUriCommand: Command.Command<T>;
            /**
             * Initialize default properties for blob store file upload context.
             */
            constructor();
        }
        class ViewModel extends ValidatableControl.ViewModel<string> {
            /**
             * A comma-separated list of allowed file mime-types, excluding extensions.
             * This maps directly to the HTML accept attribute for file input controls.
             */
            accept: string;
            /**
             * The maximum number of files allowed to be uploaded at once.
             * This limit is applied post-selection.
             */
            maxFiles: number;
            /**
             * The upload context options around how/where to upload and size limits.
             */
            uploadContext: KnockoutObservableBase<FileUploadContext>;
            /**
             * Resource Strings.
             */
            text: ResourceStrings;
            /**
             * The currently-selected files (as limited by maxFiles).
             */
            files: KnockoutComputed<SelectedFile[]>;
            /**
             * Cancel all uploads that are in progress and clears the files list array.
             */
            cancelAllUploads: KnockoutObservableBase<boolean>;
            /**
             * Show progress bars demonstrating the progress of the file upload.
             * Default is true.
             */
            showProgressBars: KnockoutObservableBase<boolean>;
            /**
             * Callback to handle the file chunk in a domain specific scenarios like uploading to blob store.
             */
            onFileChunkUploadCallback: (selectedFile: SelectedFile, uploadResult: FileUploadResult) => void;
        }
        class Widget extends ValidatableControl.Widget<string> implements Interface {
            private _templateEngine;
            private _name;
            private _input;
            private _inputOverlay;
            private _buttonViewModel;
            private _textBoxViewModel;
            private _inputOverlayFocusHandler;
            private _inputOverlayBlurHandler;
            private _inputOverlayChangeHandler;
            private _inputOverlayMouseEnterHandler;
            private _inputOverlayMouseLeaveHandler;
            private _inputOverlayClickHandler;
            private _progressBarCancelHandler;
            private _progressBarGroupCancelHandler;
            private _progressBarGroupCollapseAllHandler;
            private _selectedFiles;
            private _files;
            private _autoReadBookmarks;
            private _progressInfoBalloon;
            private _displayedString;
            private _lifetimeManger;
            private _uploadSubscribeLifetimeManager;
            private _progressBarGroupValid;
            private _progressBarGroupPercent;
            private _progressBarGroupDetails;
            private _progressBarGroupCollapseAll;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Reads the specified file and returns a chunk of size options.chunkSize.
             * This function is auto-advancing, so subsequent calls with advance the chunk read
             * until the entire file has been read.
             *
             * @param selectedFile The file to read.
             */
            read(selectedFile: SelectedFile): void;
            /**
             * Reads the specified file and returns a chunk of size options.chunkSize.
             * This function is auto-advancing, so subsequent calls with advance the chunk read
             * until the entire file has been read.
             *
             * @param selectedFile The file to read.
             * @param startByte An optional start byte for the read operation.
             */
            read(selectedFile: SelectedFile, startByte: number): void;
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            /**
             * Reads the selectedFile and returns a chunk of size options.chunkSize starting at startByte.
             *
             * @param selectedFile The file to read.
             * @param startByte The lower byte bound.
             * @param endByte The upper byte bound.
             */
            private readChunk(selectedFile, startByte, endByte);
            private _setTemplates();
            private _getFileReadErrorMessage(evt, selectedFile);
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
            private _focus();
            private _blur();
            private _mouseEnter();
            private _mouseLeave();
            private _getDefaultResourceStrings();
            private _resetValidationState(newState);
            private _toSelectedFileArray(files);
            private _subscribeForResumeUpload(selectedFile);
            private _subscribeForCancelUpload(selectedFile);
            private _getProgressInfoBalloonViewModel(selectedFile);
            private _linkProgressBarInfoBalloonContent(selectedFile, viewModel);
            private _getProgressDetailsLabel(uploadResult);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\FilterCombo.d.ts
declare module "Viva.Controls/Controls/Forms/FilterCombo" {
    import EditableCombo = require("Viva.Controls/Controls/Forms/EditableCombo");
    import SelectableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.SelectableRow");
    import FocusableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRow");
    import ScrollableGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.Scrollable");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends EditableCombo.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends EditableCombo.ViewModel<string> {
            /**
             * Rows count.
             */
            rowsCount: KnockoutObservable<number>;
            /**
             * Column definitions.
             */
            columns: KnockoutObservableArray<Grid.Column>;
            /**
             * Default column width.
             */
            defaultColumnWidth: KnockoutObservable<string>;
            /**
             * Items displayed in the list.
             */
            items: KnockoutObservableArray<Grid.Item>;
            /**
             * Key used to get the display value.
             */
            valueKey: KnockoutObservable<string>;
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
             * Creates a new instance of the FilterCombo view model.
             */
            constructor();
        }
        interface IScrollRowIntoViewExtension {
            /**
             * Scrolls the selected row into view.
             */
            scrollIntoView(row: JQuery): void;
        }
        class ScrollRowIntoViewExtension extends Grid.Extension implements IScrollRowIntoViewExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _afterCreateTimer;
            private _rowHeight;
            private _containerHeight;
            /**
             * Creates the scroll row into view extension.
             */
            constructor();
            /**
             * See parent.
             */
            getName(): string;
            /**
             * Scrolls the row into view.
             *
             * @param row The row.
             */
            scrollIntoView(row: JQuery): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            private _overflowExists(rowIndex);
        }
        class SelectableRowExtension extends SelectableRowGrid.SelectableRowExtension {
            /**
             * Creates the FilterCombo specific selectable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: SelectableRowGrid.SelectableRowOptions);
            /**
             * See parent.
             */
            selectRows(...items: Grid.Item[]): void;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * Gets the first selected row.
             *
             * @return The first selected row.
             */
            getSelectedRow(): JQuery;
        }
        class FocusableRowExtension extends FocusableRowGrid.FocusableRowExtension {
            private _focusFirstTimer;
            /**
             * Creates FilterCombo specific focusable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FocusableRowGrid.FocusableRowOptions);
            /**
             * Focuses first available row in the grid.
             *
             * @param evt The JQueryEventObejct generated from the keydown event.
             */
            focusFirst(evt?: JQueryEventObject): void;
            /**
             * Focuses next available row in the grid.
             *
             * @param evt The JQueryEventObejct generated from the keydown event.
             * @param currentRow Current row, the row after which focus needs to be set to.
             */
            focusNext(evt: JQueryEventObject, currentRow: JQuery): void;
            /**
             * Focuses previous available row in the grid.
             *
             * @param evt The JQueryEventObject generated from the keydown event.
             * @param currentRow Current row, the row previous to which focus needs to be set to.
             */
            focusPrevious(evt: JQueryEventObject, currentRow: JQuery): void;
            /**
             * See parent.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * Gets the focused rows.
             *
             * @return The focused rows.
             */
            getFocusedRows(): JQuery;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            _getRowFocusDataBindAttribute(): string;
            _focusElement(row: JQuery): void;
            _findNextFocusable(grid: JQuery, row: JQuery): JQuery;
            _findPreviousFocusable(grid: JQuery, row: JQuery): JQuery;
            private _focusOnGivenRow(row, evt?);
            private _getFirstRow();
            private _getReferenceRow(selectedRow);
        }
        class ScrollableExtension extends ScrollableGrid.ScrollableExtension {
            /**
             * Creates the FilterCombo specific scrollable extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: ScrollableGrid.ScrollableOptions);
            private _getScrollableOptions();
        }
        class ScrollableExtensionDataProvider implements ScrollableGrid.ScrollableDataProvider {
            totalItemCount: KnockoutObservable<number>;
            private _items;
            private _afterPopulate;
            /**
             * Creates the FilterCombo specific scrollable extension data provider.
             *
             * @param items List of items for scrollable.
             * @param afterPopulate Callback to run any post populate styling updates.
             */
            constructor(items: Grid.Item[], afterPopulate: () => void);
            /**
            * Fetches items as requested by the data provider.
            *
            * @param skip Count of items to skip.
            * @param take Count of items to take.
            */
            fetch(skip: number, take: number): Promise.PromiseV<Grid.Item[]>;
            private _getPagedItems(position, count);
        }
        /**
         * INTERNAL: Exported for unit tests.
         * Manages the items of FilterCombo by providing APIs like getting previous/next item,
         * finding closest match, finding item by value.
         */
        class ItemSource {
            /**
             * Sorted item list to ease navigation like going next and previous and finding a
             * value starting with a string.
             */
            sortedItems: KnockoutComputed<Grid.Item[]>;
            /**
             * Key used to obtain item value.
             */
            private _valueKey;
            private _isDataSorted;
            /**
             * Creates an instance of ItemSource.
             *
             * @param valueKey Key to obtain the display value from the Item.
             * @param items Initial set of items.
             * @param isDataSorted Flag based on which items are sorted or shown as is.
             */
            constructor(valueKey: KnockoutObservable<string>, items: KnockoutObservableArray<Grid.Item>, isDataSorted?: KnockoutObservable<boolean>);
            /**
             * Gets the key used to obtain the value of the item.
             *
             * @return Key used to obtain item value.
             */
            valueKey: KnockoutObservable<string>;
            /**
             * Cleans up registered computeds and subscriptions.
             */
            dispose(): void;
            /**
             * Finds the item starting with the specified string value.
             *
             * @param value Text to search in the items.
             * @return The matched item. If nothing matches, returns empty string.
             */
            findValueStartsWith(value: string): string;
            /**
             * Finds an item by the specified value.
             *
             * @param value Value used to find the item.
             * @return The item containing the specified value.
             */
            findItemByValue(value: string): Grid.Item;
            /**
             * Gets the value of the specified item.
             *
             * @param item Item used to get the value.
             * @return The value of the specified item.
             */
            getItemValue(item: Grid.Item): string;
            /**
             * Gets the next item of the specified item in the source.
             *
             * @param item Item used to get the next item.
             * @return The next item in the source.
             */
            getNextItem(item: Grid.Item): Grid.Item;
            /**
             * Gets the previous item of the specified item in the source.
             *
             * @param item Item used to get the previous item.
             * @return The previous item in the source.
             */
            getPreviousItem(item: Grid.Item): Grid.Item;
            /**
             * Gets the value of next item using the item containing the specified value.
             *
             * @param value Value used the find base item and then get the next item value.
             * @return The value of the next item.
             */
            getNextValue(value: string): string;
            /**
             * Gets the value of previous item using the item containing the specified value.
             *
             * @param value Value used the find base item and then get the previous item value.
             * @return The value of the previous item.
             */
            getPreviousValue(value: string): string;
            /**
             * Finds the index of the specified item.
             *
             * @param item The item to locate.
             * @return The index of the item.
             */
            findItemIndex(item: Grid.Item): number;
            private _getAdjacentValue(value, offset);
            private _getAdjacentItem(item, offset?);
            private _itemsEqual(a, b);
            private _compareItems(a, b);
            private _valueToItem(value);
            private _itemToValue(item);
        }
        class DropAdapter extends EditableCombo.DropAdapter<Grid.Widget, string> {
            private _itemSource;
            private _itemsSubscription;
            private _comboValueSubscription;
            private _comboFilterTextSubscription;
            private _selectRowsTimer;
            private _canShowPopupDisposable;
            constructor();
            /**
             * Gets the typed combo instance.
             */
            combo: Widget;
            hasItems: boolean;
            /**
             * See parent.
             */
            setCombo(combo: Widget): void;
            /**
             * See parent.
             */
            valuesChanged(): void;
            dropClick(evt: JQueryEventObject): void;
            keyUp(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            enterKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            tabKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            downKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            upKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            dispose(): void;
            _createWidget(combo: Interface, fixture: JQuery): Grid.Widget;
            private _selectRows();
            private _selectFocusedRow();
            private _tryGetSelectableRowExtension();
            private _tryGetFocusableRowExtension();
            private _tryGetScrollableExtension();
        }
        class Widget extends EditableCombo.Widget<string> implements Interface {
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _createDropAdapter(): EditableCombo.DropAdapter<Grid.Widget, string>;
            _createDropPopup(): JQuery;
            /**
             * See parent.
             */
            _valueChanged(): void;
            _parseValue(value: string): string;
            _formatValue(value: string): string;
            _isSameValue(a: string, b: string): boolean;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\GroupDropDown.d.ts
declare module "Viva.Controls/Controls/Forms/GroupDropDown" {
    import ItemList = require("Viva.Controls/Controls/Base/ItemList");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        /**
         * GroupInfo is the ViewModel for a particular <optGroup>
         */
        class GroupInfo {
            /**
             * User friendly label for the grouping. It can be either string or ko.observable<string>.
             */
            text: any;
            /**
             * Disable state of this group. It can be either boolean or ko.observable<boolean>.
             */
            disable: any;
            /**
             * Creates a new instance of the GroupInfo.
             *
             * @param text Binding <optGroup> label attribute. It can be either string or ko.observable<string>
             * @param disabled Binding for <optGroup> disabled attribute. It can be either boolean or ko.observable<boolean>.
             */
            constructor(text?: string, disabled?: boolean);
            constructor(text?: string, disabled?: KnockoutObservableBase<boolean>);
            constructor(text?: KnockoutObservableBase<string>, disabled?: boolean);
            constructor(text?: KnockoutObservableBase<string>, disabled?: KnockoutObservableBase<boolean>);
        }
        /**
         * ItemSetting is the fields setting to inform the ViewModel.createItemValueFromData() that given array, which fields should be use as label, value, disable state and groupingId.
         */
        class ItemSetting implements ItemKeys {
            /**
             * Property used for display item. If it is not set, it uses items[index] to display.
             */
            textKey: string;
            /**
             * Property used for Value of an item. If it is not set, it uses items[index] as Value.
             */
            valueKey: string;
            /**
             * Property used for disable state of an item. If it is not set, default to false.
             */
            disabledKey: string;
            /**
             * Property used for select state of an item. If it is not set, default to false.
             */
            selectedKey: string;
            /**
             * Property used for grouping of an item. If it is not set, there is no grouping for the items.
             */
            groupIdKey: string;
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param setting Properties used for setup dropdownItems.
             */
            constructor(settings?: Object);
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param textKey Property used for display dropdownItem. If not provided, the items[index] will be used.
             * @param itemValue Property used for display dropdownItem. If not provided, the items[index] will be used.
             * @param disableKey Property used for display dropdownItem. If not provided, default is false.
             * @param groupIdKey Property used for display dropdownItem. If not provided, default is non-grouping.
             * @param selectedKey Property used for display dropdownItem. If not provided, default is not selected (false).
             */
            constructor(textKey?: string, itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string);
        }
        /**
         * ItemSetting is the fields setting to inform the ViewModel.createItemValueFromData() that given array, which fields should be use as label, value, disable state and groupingId.
         */
        interface ItemKeys {
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
            disabledKey?: string;
            /**
             * Property used for select state of an item. If it is not set, default to false.
             */
            selectedKey?: string;
            /**
             * Property used for grouping of an item. If it is not set, there is no grouping for the items.
             */
            groupIdKey?: string;
        }
        /**
         * OptionsGroup<TValue> is the interface for capture the html <optGroup> for Knockout mapping.
         */
        interface OptionsGroup<TValue> extends ItemList.Label {
            /**
             * children Options
             */
            items: KnockoutObservableArray<ItemList.Value<TValue>>;
        }
        /**
         * OptionsGroupItem<TValue> is the implementaton to capture the html <optGroup> for Knockout mapping.
         */
        class OptionsGroupItem<TValue> implements OptionsGroup<TValue> {
            /**
             * Text for OptionsGroup item.
             */
            text: KnockoutObservable<string>;
            /**
             * OptionsGroup is disabled.
             */
            disabled: KnockoutObservable<boolean>;
            /**
             * children Options
             */
            items: KnockoutObservableArray<ItemList.Value<TValue>>;
        }
        interface Interface extends ValidatableControl.Interface<any> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<any> {
            /**
             * Items for populate the select/options.
             */
            items: KnockoutObservableArray<ItemList.Label>;
            constructor(items?: ItemList.Label[]);
            /**
             * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
             *
             * @param dataArray Array of objects represent the groupDropDown menus.
             * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupId.
             * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
             * @return ItemList.Label[] for the ko binding for the dropdown items.
             */
            static createDropdownItemsFromArray(dataArray: any[], itemSetting?: ItemKeys, groupInfos?: StringMap<GroupInfo>): ItemList.Label[];
            /**
             * Utility function to create the ItemValue a single value for ItemValue which represent selection option tag.
             *
             * @param data the data for create an ItemVale for the <option>
             * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupid.
             * @return A ItemList.ItemValue<TValue> for the ko binding view Model of a single <option> tag.
             */
            static createItemValueFromData<TValue>(data: any, itemSetting: ItemKeys): ItemList.ItemValue<TValue>;
            /**
             * Utility function to create the OptionsGroupItems from a data array.  Represent select optGroup and option tag data structure.
             *
             * @param groupId The id used to identify the group. we use groupInfos[groupid] to retrive the ko.observable() for <optGroup> label and tag.
             * @param dataArray Array of objects represent the groupDropDown menus
             * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
             * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupId.
             * @return An OptionsGroupItem<TValue> for the ko binding view Model of a single <optGroup> tag.
             */
            static createOptionsGroupItem<TValue>(groupId: string, dataArray?: any[], groupInfos?: StringMap<GroupInfo>, itemSetting?: ItemKeys): OptionsGroupItem<TValue>;
            /**
             * Returns drop down items that are of type ItemList.Value. This is a convenience for the view model consumer and is not used by the widget itself.
             *
             * @return The items from the that represent values that can be selected by the user.
             */
            valueItems(): ItemList.Value<any>[];
        }
        class Widget extends ValidatableControl.Widget<any> implements Interface {
            private static _staticIsBrowserFireFox;
            private _currentItemText;
            private _name;
            private _arrowClass;
            private _select;
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
            _getElementToFocus(): Element;
            private _initializeComputeds();
            /**
             * Fix the IE9/IE8 engine remove the comments within the <select> block when DOM Element create from string.
             * As result, it remove the <-- ko if: --> from control template.
             * We explicitly detect this secnario and insert back the comment befor Knockout binding. Thus make this control works in IE8/IE9.
             *
             * @param select The select JQuery object after insersion of control template.
             */
            private fixMissingComment(select);
            private _setNormalArrow();
            private _setHoverArrow();
            private static _isBrowserFireFox();
            private _selectKeyUpHandler(ev, args?);
            private _findFirstMatchValue(value);
            private _findFirstNonDisabledItem();
            private _findFirstMatchOption(match);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\MultiLineTextBox.d.ts
declare module "Viva.Controls/Controls/Forms/MultiLineTextBox" {
    import ValueUpdateTrigger = require("Viva.Controls/Controls/Base/ValueUpdateTrigger");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import TypableControl = require("Viva.Controls/Controls/Base/TypableControl");
    export = Main;
    module Main {
        var DefaultRowSize: number;
        interface Interface extends TypableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends TypableControl.ViewModel<string> {
            /**
             * Number of rows for the textbox.
             */
            rows: KnockoutObservableBase<number>;
            /**
             * Updates the value view model based on enum option.
             */
            valueUpdateTrigger: ValueUpdateTrigger.ValueUpdateTrigger;
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
        class Widget extends TypableControl.Widget<string> implements Interface {
            private _name;
            private _control;
            private _addFocusClass;
            private _removeFocusClass;
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
            _getElementToFocus(): Element;
            private _initializeComputeds();
            private _truncateText(text, length);
            private _attachEvents();
            private _detachEvents();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\MultiSelectDropDown.d.ts
declare module "Viva.Controls/Controls/Forms/MultiSelectDropDown" {
    import SelectableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.SelectableRow");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    import ComboDropBase = require("Viva.Controls/Controls/Forms/ComboDropBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import GroupDropDown = require("Viva.Controls/Controls/Forms/GroupDropDown");
    export = Main;
    module Main {
        /**
         * Drop adapter using Grid
         */
        class DropAdapter extends ComboDropBase.DropAdapter<Grid.Widget, string> {
            /**
             * Helper function to get the Element that we want to style min-width.
             */
            getInnerElement(fixture: JQuery): JQuery;
            /**
             * See parent. MultiSelect box doesn't allow typing.
             */
            allowsTyping(): boolean;
            /**
             * See parent.  Not Yet implement.
             */
            enterKey(evt: JQueryEventObject): boolean;
            /**
             * See parent. Not Yet implement.
             */
            downKey(evt: JQueryEventObject): boolean;
            /**
             * See parent. Not Yet implement.
             */
            upKey(evt: JQueryEventObject): boolean;
            /**
             * See parent. Not Yet implement.
             */
            leftKey(evt: JQueryEventObject): boolean;
            /**
             * See parent. Not Yet implement.
             */
            rightKey(evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            _createWidget(combo: Interface, fixture: JQuery): Grid.Widget;
        }
        interface Interface extends ComboDropBase.Interface<any> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ItemsData {
            /**
             * Data displayed in the table based on the column definitions.
             */
            items: KnockoutObservableArray<Grid.Item>;
            /**
             * Row metadata used for the data.
             */
            rowMetadata: KnockoutObservableArray<DropDownItemMetadata>;
            /**
             * Column definitions.
             */
            displayColumns: KnockoutObservableArray<Grid.Column>;
            /**
             * Property used for Value of an item. If it is not set, it uses items[index] as Value.
             */
            valueKey: string;
        }
        interface MaxSelectedEventObject {
            /**
             * Selected item count.
             */
            selected?: DropDownItemMetadata[];
            /**
             * prior Selected item count
             */
            originalSelectedCount?: number;
        }
        interface DropDownItemMetadata extends SelectableRowGrid.SelectableRowMetadata {
        }
        class ItemSetting extends GroupDropDown.ItemSetting {
            /**
             * Formatter used when displaying one cell.
             */
            formatter: Grid.CellFormatter;
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param setting Properties used for setup dropdownItems.
             */
            constructor(settings?: Object);
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param textKey Property used for display dropdownItem. If not provided, the items[index] will be used.
             * @param itemValue Property used for display dropdownItem. If not provided, the items[index] will be used.
             * @param disabledKey Property used for display dropdownItem. If not provided, default is false.
             * @param groupIdKey Property used for display dropdownItem. If not provided, default is non-grouping.
             * @param selectedKey Property used for display dropdownItem. If not provided, default is not selected (false).
             * @param cellFormater Property used for display dropdownItem. If not provided, default is FormattersGrid.text.
             */
            constructor(textKey?: string, itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string, cellFormatter?: Grid.CellFormatter);
        }
        class ViewModel extends ValidatableControl.ViewModel<string> {
            /**
             * Turns on or off multiselect.
             */
            multiselect: KnockoutObservable<boolean>;
            /**
             * Show DropDown Grid header on or off.
             */
            showHeader: KnockoutObservable<boolean>;
            /**
             * Accessable name for the dropdown popup.
             */
            dropdownPopupName: KnockoutObservable<string>;
            /**
             * Array of objects represent the groupDropDown menus.
             */
            itemsData: ItemsData;
            /**
             * Indicate value/selection is initialized.
             * If false, it will initialize the value from Items.selected states.
             * If true, it will honor value and make sure the Items.selected states match current value.
             */
            valueInitialized: boolean;
            /**
             * The total select Rows ocunt currently in the drop down.
             */
            selectedRowsCount: KnockoutObservable<number>;
            /**
             * The displayString
             */
            selectedDisplayString: KnockoutObservable<string>;
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
             * Important events which the viewModel might want to react.
             * Currently it fire 3 type of events, "select", "offMaxSelected",and "onMaxSelected".
             *
             * @param type Type of the event. For example, "select", "offMaxSelected", or "onMaxSelected".
             * @param args optional arguments.
             *       "select" with args type of Viva.Controls.Lists.Grid.SelectableRowEventObject.
             *       "offMaxSelected"/"onMaxSelected" with args type of Viva.Controls.MultiSelectDropDown.MaxSelectedEventObject.
             */
            events: (type: string, args?: any) => void;
            /**
             * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
             *
             * @param dataArray Array of objects represent the groupDropDown menus.
             * @param itemSetting The setting to provide which fields in the prior array object to provide text, value, disable, and groupid.
             * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
             * @return ItemsData[] for the ko binding for the dropdown items.
             */
            static createDropdownItemsFromArray(data: any[], itemSetting?: ItemSetting, groupInfos?: Object): ItemsData;
            /**
             * Helper for the user to ensure the InputValue in-sync with the value property.
             *
             * @param ItemsData Data for the drop down items setting.
             */
            initializeItemsData(itemsData: ItemsData): void;
            /**
             * Returns the current selected DropDownItemMetadata[].
             *
             * @return Array of DropDownItemMetatata.
             */
            getSelectedRows(): DropDownItemMetadata[];
            /**
             * Converts the selectedRow Metadata into the input value. Used by widget.
             *
             * @param selectedRows The current selectedRows.
             * @return String for current selected items value, for example "val1;val2;val3".
             */
            convertToInputValue(selectedRows: DropDownItemMetadata[]): string;
            /**
             * Converts the selectedRow Metadata into the display string.
             *
             * @param selectedRows The current selectedRows.
             * @return string of current selected items label, for example "display1;display;display3".
             */
            convertToDisplayString(selectedRows: DropDownItemMetadata[]): string;
            /**
             * Sets the input value base on the currented selected row.  It keep in sync with the SelectedRowsCount and value.
             *
             * @param selectedRows The current selectedRows.
             * @return Whether value is updated.
             */
            setInputValue(selectedRows: DropDownItemMetadata[]): boolean;
            /**
             * Compares if newValue is the same as initialValue.
             * In this Widget, it basically compares to array which parse by the separator.
             *
             * @param a Value 1.
             * @param b Value 2.
             * @return True if both values are the same.
             */
            _isSameValue(a: string, b: string): boolean;
            /**
             * Converts the value string (val1;val2;val3) into a array base on this.valueSeparator.  In addition, it also remove the empty strings.
             *
             * @param value The value of currently multiselected value, for example, "val1;val2;;val5";
             * @return array of the string values for example, ["val1", "val2", "val5"].
             * Note, the empty strings will be removed.
             */
            private _convertInputValueToArray(value);
            /**
             * Helps to keep the DropDowmItem selected metadata synchronized with the  value string (val1;val2;val3).
             */
            private _initializedSelectedRowsValue();
            private static _convertSelectedRowsToString(selectedRows, keyValue, stringSeparator);
        }
        class Widget extends ValidatableControl.Widget<any> implements Interface {
            private _currentText;
            private _id;
            private _name;
            private _arrowClass;
            private _select;
            private _input;
            private _current;
            private _popup;
            private _multiSelect;
            private _scrollableParents;
            private _preventCreateDropDown;
            private _dropAdapter;
            private _blurPrevented;
            private _blurPreventHandle;
            private _blurHidePopupHandle;
            private _formattedValue;
            private _maxSelectDisabled;
            private _preventValueUpdate;
            private _firstColumn;
            private _originalFirstColumnFormatter;
            private _prevItemData;
            private _multiSelectFormatter;
            private _timeoutHidePopUp;
            private _timeoutPreventBlur;
            private _dropInputClickHandler;
            private _dropPopupMouseDownHandler;
            private _dropPopupFocusInHandler;
            private _inputKeyDownHandler;
            private _inputBlurHandler;
            private _parentScrollHandler;
            private _rowSelectChangedNotify;
            private _rowSelectHandler;
            private _selectedDisposeables;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Restores the focus on the input element to handle key events.
             */
            restoreFocus(): void;
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            _beforePopupWidgetCreated(): void;
            private _resetSelectedDisposables();
            private _updateFirstColumnFormatter();
            private _toggleSelectionChangeTrigger();
            private _monitorRowMetadataChange(triggerChange?);
            private _initializeComputeds();
            private _setNormalArrow();
            private _setHoverArrow();
            private _computeCurrentMultiItemsText();
            private _computeCurrentSingleItemText();
            private _updateCurrentText();
            private _maxSelectAllowedChanged(maxSelectAllowed);
            /**
             * Handles viewmodel multiselect property changed.
             *
             * @param isMultiSelect True if options.multiselect() is true.
             */
            private _multiselectChanged(isMultiSelect);
            private _setDisplayFormatter(isMultiSelect);
            private _setInputValue(selectedRows);
            private _selectedValueChanged(value);
            /**
             * Overriden by EditableCombo derivatives to create specific DropAdapter.
             *
             * @return The newly created DropAdapter.
             */
            private _createDropAdapter();
            private _createDropPopup();
            /**
             * Repositions the popup if it doesn't have enough space to be shown.
             *
             * @param popup The popup to reposition.
             */
            private _positionPopup(popup);
            /**
             * Shows the drop popup. If already visible, hides it first.
             */
            private _showDropPopup();
            /**
             * Hides the drop popup.
             */
            private _hideDropPopup();
            /**
             * This notifies blur event not to Hides drop popup because
             * something in the drop area is clicked. For these scenarios,
             * drop popup still needs to be visible.
             *
             * @param func Function to execute after setting this.blurPrevented.
             */
            private _preventBlur(func?);
            /**
             * Toggles the drop popup of the combo.
             */
            private _toggleDropPopup();
            private _cancelPreventingBlur();
            /**
             * Clears the prevent blur timeout.
             */
            private _removePreventingBlurTimer();
            /**
             * Clears the hidePopup timeout.
             */
            private _removeHidePopupTimer();
            /**
             * Attaches event handlers.
             */
            private _attachEvents();
            /**
             * Detaches event handlers.
             */
            private _detachEvents();
            private _onKeyDown(evt);
            private _maxSelected(selectedItems, originalCount);
            private _rowSelectChanged();
            private _updateSelectedState(value, hidePopup?);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\NumericTextBox.d.ts
declare module "Viva.Controls/Controls/Forms/NumericTextBox" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<any> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<any> {
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
            placeholder: KnockoutObservableBase<string>;
            /**
             * Text to display when entered text is not numeric.
             */
            invalidText: string;
        }
        class Widget extends ValidatableControl.Widget<any> implements Interface {
            private _name;
            private _input;
            private _validNumberValidator;
            private _valueRange;
            private _maxDecimalPoints;
            private _defaultDecimalPoints;
            private _rawStringInternal;
            private _decimalPointValidated;
            private _rawStringValue;
            private _inputElementFocusHandler;
            private _inputElementBlurHandler;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            private _createValidators();
            private _attachEvents();
            private _detachEvents();
            _initializeSubscriptions(viewModel: ViewModel): void;
            _initializeComputeds(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Validates and propagates decimal point settings for the control.
             *
             * @return Number Indicates a valid number of decimal points set for the control.
             */
            private _processDecimalPoint();
            /**
             * Propagates the value set on the view model to the UI.
             *
             * @param numericVal Set on the viewModel.
             */
            private _processValue(numericVal);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\OptionPicker.d.ts
declare module "Viva.Controls/Controls/Forms/OptionPicker" {
    import ItemList = require("Viva.Controls/Controls/Base/ItemList");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for OptionPicker widget.
         */
        interface Interface<TValue> extends ItemList.Interface<TValue> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TValue>;
        }
        class ViewModel<TValue> extends ItemList.ViewModel<TValue> {
        }
        /**
         * List of radio buttons with ARIA support.
         * The radio buttons can be stylized with CSS to surface it OptionPicker.
         */
        class Widget<TValue> extends ItemList.Widget<TValue> implements Interface<TValue> {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel<TValue>, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TValue>;
            /**
             * Set the options' name to the generated value if name is not set by the user.
             */
            _setName(): void;
            _setRole(): void;
            /**
             * The ko data-bind template string for each list item used by the ItemList template engine.
             *
             * @return The template string for optionPicker input.
             */
            _attachItemTemplate(): string;
            _getItemValueString(itemValue: ItemList.ItemValue<TValue>): string;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\Password.d.ts
declare module "Viva.Controls/Controls/Forms/Password" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import TypableControl = require("Viva.Controls/Controls/Base/TypableControl");
    export = Main;
    module Main {
        enum Strength {
            VeryWeak = 0,
            Weak = 1,
            Fair = 2,
            Strong = 3,
            VeryStrong = 4,
        }
        interface Interface extends TypableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends TypableControl.ViewModel<string> {
            /**
             * Placeholder text shown when password is empty.
             */
            emptyValueText: KnockoutObservable<string>;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        class Widget extends TypableControl.Widget<string> implements Interface {
            private _input;
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
            _getElementToFocus(): Element;
            private _initializeComputeds();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\Password.StrengthIndicator.d.ts
declare module "Viva.Controls/Controls/Forms/Password.StrengthIndicator" {
    import Password = require("Viva.Controls/Controls/Forms/Password");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * The current strength.
             */
            strength: KnockoutObservable<Password.Strength>;
            /**
             * The text to be displayed when the password strength is Viva.Controls.Forms.Password.StrengthIndicator.Strength.VeryWeak.
             */
            textVeryWeak: string;
            /**
             * The text to be displayed when the password strength is Strength.Weak.
             */
            textWeak: string;
            /**
             * The text to be displayed when the password strength is Strength.VeryFair.
             */
            textFair: string;
            /**
             * The text to be displayed when the password strength is Strength.Strong.
             */
            textStrong: string;
            /**
             * The text to be displayed when the password strength is Viva.Controls.Forms.Password.StrengthIndicator.Strength.VeryStrong.
             */
            textVeryStrong: string;
        }
        class Widget extends Base.Widget implements Interface {
            private _colorBar;
            private _strengthDescriptions;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _initializeComputeds();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\RangeSlider.d.ts
declare module "Viva.Controls/Controls/Forms/RangeSlider" {
    import SliderBase = require("Viva.Controls/Controls/Base/SliderBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for slider widget.
         */
        interface Interface extends SliderBase.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends SliderBase.ViewModel<string> {
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
        }
        /**
         * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
         * Support ARIA with arrow keypress.
         */
        class Widget extends SliderBase.Widget<string> implements Interface {
            private _name;
            private _rangeSliderStartHandleAlignPercentage;
            private _rangeSliderEndHandleAlignPercentage;
            private _rangeSliderWidthAlignPercentage;
            private _sliderStartHandle;
            private _sliderEndHandle;
            private _startHandleMouseDownHandler;
            private _startHandleMouseMoveHandler;
            private _endHandleMouseDownHandler;
            private _endHandleMouseMoveHandler;
            private _keyUpHandlerForStart;
            private _keyDownHandlerForStart;
            private _keyUpHandlerForEnd;
            private _keyDownHandlerForEnd;
            private _rangeSliderHandleSliding;
            _start: KnockoutObservable<number>;
            _end: KnockoutObservable<number>;
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
            _getElementToFocus(): Element;
            _initializeSubscriptions(viewModel: ViewModel): void;
            _attachEvents(): void;
            _detachEvents(): void;
            _updateSliderHandle(xCoord: number, yCoord: number): void;
            private _processKeyDownEventForStart(evt);
            private _processKeyDownEventForEnd(evt);
            private _addAttributes();
            private _removeAttributes();
            private _updateStartEnd(valueStart, valueEnd);
            private _initializeAdditionalComputeds();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\SearchBox.d.ts
declare module "Viva.Controls/Controls/Forms/SearchBox" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    export = Main;
    module Main {
        interface Interface extends ValidatableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ValidatableControl.ViewModel<string> {
            /**
             * The current query string in the search box to filter on.
             */
            queryString: KnockoutObservable<string>;
            /**
             * Whether this control is shown or not.
             */
            visible: KnockoutObservable<boolean>;
            /**
             * Whether the close button is visible or not.
             */
            closeButtonVisible: KnockoutObservableBase<boolean>;
            /**
             * Placeholder text held by the control.
             * Currently this does not work on IE9 (which does not support placeholder attr on input).
             */
            placeholder: KnockoutObservable<string>;
        }
        class Widget extends ValidatableControl.Widget<string> implements Interface {
            private _name;
            private _textBoxViewModel;
            private _buttonViewModel;
            private _button;
            private _buttonClickHandler;
            private _input;
            private _inputEscapeKeyHandler;
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
            _getElementToFocus(): Element;
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\Slider.d.ts
declare module "Viva.Controls/Controls/Forms/Slider" {
    import SliderBase = require("Viva.Controls/Controls/Base/SliderBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for slider widget.
         */
        interface Interface extends SliderBase.Interface<number> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends SliderBase.ViewModel<number> {
            constructor();
        }
        /**
         * Widget provides slider functionality over a range of values with slider handle snapping at closest step.
         * Support ARIA with arrow keypress.
         */
        class Widget extends SliderBase.Widget<number> implements Interface {
            private _name;
            private _sliderRangePercentage;
            private _sliderHandleAlignPercentage;
            private _sliderHandle;
            private _keyUpHandler;
            private _keyDownHandler;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _initializeSubscriptions(viewModel: any): void;
            _attachEvents(): void;
            _detachEvents(): void;
            _updateSliderHandle(xCoord: number, yCoord: number): void;
            private _processKeyDownEvent(evt);
            private _addAttributes();
            private _removeAttributes();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\Splitter.d.ts
declare module "Viva.Controls/Controls/Forms/Splitter" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * The options for splitter controls.
         */
        interface SplitterOptions {
            /**
             * The initial height of the top pane.
             */
            topPaneHeight: number;
            /**
             * Whether top pane should be shown or not.
             */
            showTopPane: KnockoutObservableBase<boolean>;
        }
        /**
         * Interface for the splitter control.
         */
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            showTopPane: KnockoutObservableBase<boolean>;
            private _topPaneHeight;
            /**
             * Creates a new instance of the FilterCombo view model.
             */
            constructor(options: SplitterOptions);
            /**
             * The initial top pane height setting for the control.
             */
            topPaneHeight: number;
        }
        class Widget extends Base.Widget implements Interface {
            private _topPane;
            private _bottomPane;
            private _resizeDragger;
            private _shadow;
            private _animationSpeed;
            private _resizeEventHandler;
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
            private _attachEvents();
            private _detachEvents();
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _setPaneContent(topPaneContent, bottomPaneContent);
            private _setPaneHeights(topPaneHeight?);
            private _bindResizeEvents();
            private _setShadowLocation();
            private _bindTopPaneToggle();
            private _showTopPane();
            private _hideTopPane();
            private _disableScrollbars();
            private _enableScrollbars();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\StringList.d.ts
declare module "Viva.Controls/Controls/Forms/StringList" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ValidatableControl = require("Viva.Controls/Controls/Base/ValidatableControl");
    import VivaDisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\TextBox.d.ts
declare module "Viva.Controls/Controls/Forms/TextBox" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import TypableControl = require("Viva.Controls/Controls/Base/TypableControl");
    export = Main;
    module Main {
        interface Interface extends TypableControl.Interface<string> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
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
        class ViewModel extends TypableControl.ViewModel<string> {
            /**
             * Placeholder text held by the control.
             * Currently this does not work on IE9 (which does not support placeholder attr on input).
             */
            placeholder: KnockoutObservable<string>;
            /**
             * Events supported by the TextBox control.
             */
            events: Events;
            /**
             * Sets readonly property
             */
            readonly: KnockoutObservable<boolean>;
        }
        class Widget extends TypableControl.Widget<string> implements Interface {
            private _name;
            private _valueUpdateTrigger;
            private _keyUpHandler;
            private _keyPressHandler;
            private _input;
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
            _getElementToFocus(): Element;
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Forms\TimePicker.d.ts
declare module "Viva.Controls/Controls/Forms/TimePicker" {
    import DateUtil = require("Viva.Controls/Util/DateUtil");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import EditableCombo = require("Viva.Controls/Controls/Forms/EditableCombo");
    export = Main;
    module Main {
        interface Interface extends EditableCombo.Interface<Date> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends EditableCombo.ViewModel<Date> {
            /**
             * Date/time range in which user is able to select date/time.
             */
            enabledDateTimeRange: KnockoutObservable<DateUtil.DateTimeRange>;
            /**
             * Hour setter.
             */
            setHours(hours: number): void;
            /**
             * Minutes setter.
             */
            setMinutes(minutes: number): void;
            /**
             * Seconds setter.
             */
            setSeconds(seconds: number): void;
            /**
             * Creates a new instance of the view model.
             */
            constructor();
        }
        class Widget extends EditableCombo.Widget<Date> implements Interface {
            private _dateTimeRange;
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
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
            _parseValue(value: string): Date;
            _formatValue(value: Date): string;
            _isSameValue(a: Date, b: Date): boolean;
            private _createValidators();
            private _initializeTimeEntryPlugin();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import ExtensibleControl = require("Viva.Controls/Controls/Base/ExtensibleControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface InternalControlKnockoutBindingHandler extends KnockoutBindingHandler {
            /**
             * Registers a callback, then return a Guid associated with it.
             *
             * @param callback Callback that returns HtmlBindingData.
             * @return A Guid.
             */
            registerCallback(callback: () => HtmlBindingsData): string;
            /**
             * Unregisters the Guid from the memory.
             *
             * @param guid The Guid.
             */
            unregisterGuid(guid: string): void;
        }
        interface HtmlBindingsData {
            /**
             * template for the current html binding.
             */
            template: string;
            /**
             * data contain the viewModel of the binding.
             */
            data: any;
            /**
             * Disposable array that need to clean up after the binding widget is done
             */
            disposables: KnockoutDisposable[];
        }
        interface HtmlBindingGetViewModelCallBack {
            (templateDisposables: KnockoutDisposable[], value: any, settings?: CellFormatterSettings): any;
        }
        interface TextAndPath {
            /**
             * Value representing the text.
             */
            text: string;
            /**
             * Value representing the URI.
             */
            uri: string;
        }
        interface UriObject extends TextAndPath {
            /**
             * Value representing the target attribute.
             */
            target?: string;
        }
        interface IconObject extends TextAndPath {
        }
        interface ExtendedCellFormatter extends CellFormatter {
            /**
             * Cell formatter used for sorting.
             */
            sortFormatter?: CellFormatter;
            /**
             * Cell formatter used for filtering.
             */
            filterFormatter?: CellFormatter;
        }
        enum SortOrder {
            /**
             * Unsorted.
             */
            Unsorted = 0,
            /**
             * Ascending.
             */
            Ascending = 1,
            /**
             * Descending.
             */
            Descending = 2,
        }
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        /**
         * Item represents a row.
         */
        interface Item {
        }
        /**
         * Item represents a row. Used internally to access the itemKey.
         */
        interface GenericItem extends Item {
            /**
             * An item value is accessible by a sring key accessor.
             */
            [key: string]: any;
        }
        interface BaseCellFormatterSettings {
            /**
             * The item representing the data for the specific column.
             */
            item: any;
            /**
             * The row metadata associated with the current data.
             */
            rowMetadata: RowMetadata;
            /**
             * The column object associated with the current data.
             */
            column: Column;
        }
        interface CellFormatterSettings extends BaseCellFormatterSettings {
            /**
             * The current row number associated with the current data.
             */
            rowNumber: () => number;
            /**
             * The current column number associated with the current data.
             */
            columnNumber: () => number;
        }
        interface StylableCellFormatterSettings extends CellFormatterSettings {
            /**
             * A CSS class to apply to the elements in the formatter.
             */
            cssClass: string;
        }
        interface BaseFormatter {
            (value: any): string;
        }
        interface CellFormatter extends BaseFormatter {
            /**
             * Cell formatter function called when a row is being rendered.
             */
            (value: any, settings?: CellFormatterSettings): string;
        }
        interface PluginExtension extends ExtensibleControl.PluginExtension {
            /**
             * Callback: before attaching events.
             */
            beforeAttachEvents?(): void;
            /**
             * Callback: after attaching events.
             */
            afterAttachEvents?(): void;
            /**
             * Callback: before detaching events.
             */
            beforeDetachEvents?(): void;
            /**
             * Callback: after detaching events.
             */
            afterDetachEvents?(): void;
            /**
             * Callback: before templates are set.
             *
             * @param templateEngine Template engine used to store the templates.
             */
            beforeSetTemplates?(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * Callback: after templates are set.
             *
             * @param templateEngine Template engine used to store the templates.
             */
            afterSetTemplates?(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * Gets the default column properties.
             *
             * @return Other properties to make available to the column object.
             */
            getDefaultColumnProperties?(): any;
            /**
             * Gets the default row metadata properties.
             *
             * @return Other properties to make available to the row metadata object.
             */
            getDefaultRowMetadataProperties?(): any;
            /**
             * Indicates if the row metadata should be retained when the core grid is ready to delete it.
             * A plugin indicating the row metadata should not be retained does not guarantee that it will be deleted.
             * Another plugin might have decided to retain it.
             * If a plugin decides to retain the metadata, subsequent plugins might not receive a call
             * for that particular row metadata.
             *
             * @param rowMetadata The row metadata that is about to get deleted.
             * @return True if the row metadata should be retained. False may delete it.
             */
            shouldRetainRowMetadata?(rowMetadata: RowMetadata): boolean;
            /**
             * Method called to allow the extension to prevent the selection code to happen.
             * By returning true to this method call, the selection of a current row would not change.
             *
             * @param item Item changing its selection.
             * @param evt Event raised by the item.
             * @return True to not run the selection code.
             */
            shouldNotChangeSelection?(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
            /**
             * Returns the number of extra columns added by the extension. This is necessary for the base grid
             * to know the total number of columns present in the grid.
             *
             * @return The number of additional columns added by the extension.
             */
            getAdditionalColumns?(): number;
        }
        class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
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
            formatter?: CellFormatter;
            /**
             * Formatter used when sorting the items.
             */
            sortFormatter?: CellFormatter;
            /**
             * Formatter used when filtering the items.
             */
            filterFormatter?: CellFormatter;
            /**
             * Css class associated with the column.
             */
            cssClass?: string;
            /**
             * Width of the column in pixels or percentage.
             */
            width?: KnockoutObservable<string>;
            /**
             * Enable cell text ellipse
             */
            enableEllipse?: KnockoutObservableBase<boolean>;
            /**
             * Enable cell content to height 100%
             */
            fullHeight?: KnockoutObservableBase<boolean>;
            /**
             * Unique column id.
             */
            columnId?: string;
        }
        interface RowMetadata {
            /**
             * One entry representing the item.
             */
            item: Item;
            /**
             * Css class associated with the row.
             */
            cssClass?: KnockoutObservable<string>;
        }
        class ViewModel extends ExtensibleControl.ViewModel {
            /**
             * Summary of the table.
             */
            summary: KnockoutObservable<string>;
            /**
             * Shows the column header.
             */
            showHeader: boolean;
            /**
             * Column definitions.
             */
            columns: KnockoutObservableArray<Column>;
            /**
             * Items displayed in the table based on the column definitions.
             */
            items: KnockoutObservableArray<Item>;
            /**
             * No rows message when no items are displayed.
             */
            noRowsMessage: KnockoutObservable<string>;
            /**
             * Row metadata used for the items.
             */
            rowMetadata: RowMetadata[];
            /**
             * Important events which the viewModel might want to react.
             */
            events: (type: string, args?: any) => void;
            /**
             * Resource URIs.
             */
            uri: StringMap<string>;
            /**
             * Resource Texts.
             */
            text: StringMap<string>;
        }
        class Widget extends ExtensibleControl.Widget implements Interface {
            private _allRowMetadata;
            private _templateEngine;
            private _mouseEnterTooltipHandler;
            private _allRowMetadataInitialized;
            private _columnCount;
            /**
             * Creates the widget.
             */
            constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
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
             * Gets the row metadata based on a data item.
             *
             * @param item Data item associated with the row metadata.
             * @return One row metadata.
             */
            getRowMetadata(item: Item): RowMetadata;
            _getAllRowMetadata(): RowMetadata[];
            /**
             * See parent.
             */
            _initializePlugins(viewModel: ViewModel): void;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            private _attachEvents();
            private _detachEvents();
            private _getNewRowMetadataEntries();
            private _getNewColumnEntries();
            private _normalizeColumns(columns);
            private _getTotalColumns();
            private _cellFormat(rowNumber, columnNumber, rowMetadata, columnDefinition);
            private _setTemplates();
            private _updateAllRowMetadata();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.ContextMenuShortcut.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.ContextMenuShortcut" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IContextMenuShortcutExtension {
            /**
             * Gets the options of the plugin.
             */
            options: ContextMenuShortcutOptions;
        }
        interface ContextMenuShortcutOptions {
        }
        interface ContextMenuShortcutEventObject {
            /**
             * Metadata for right-clicked item.
             */
            rowMetadata: Grid.RowMetadata;
            /**
             * X position where right click happened.
             */
            clientX: number;
            /**
             * Y position where right click happened.
             */
            clientY: number;
        }
        class ContextMenuShortcutExtension extends Grid.Extension implements IContextMenuShortcutExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            private _shortcutClickHandler;
            private _shortcutMouseEnterHandler;
            private _shortcutMouseLeaveHandler;
            /**
             * Creates the context menu shortcut extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: ContextMenuShortcutOptions);
            /**
             * Gets the options of the plugin.
             */
            options: ContextMenuShortcutOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            shouldNotChangeSelection(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
            /**
             * See parent.
             */
            getAdditionalColumns(): number;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.EditableRow.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.EditableRow" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import FocusableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRow");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        enum EditableRowState {
            /**
             * Commited state, default state when nothing has been done on a row.
             * It is also used if the row is not yet added (empty textboxes for instance).
             */
            None = 0,
            /**
             * New state, the row has been added.
             */
            Created = 1,
            /**
             * Updated state, the row has been updated.
             */
            Updated = 2,
            /**
             * Deleted state, the row is being deleted.
             */
            Deleted = 3,
        }
        enum ValidationRowResult {
            /**
             * The row has no error. This is the default result.
             */
            None = 0,
            /**
             * The row has been validated and is correct.
             */
            Success = 1,
            /**
             * The row has been validated and includes errors.
             */
            Error = 2,
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
        interface IEditableRowExtension {
            /**
             * Gets the options of the plugin.
             */
            options: EditableRowOptions;
            /**
             * Gets the created items.
             */
            createdItems: KnockoutObservableArray<Grid.Item>;
        }
        interface EditableCellFormatterSettings extends Grid.BaseCellFormatterSettings {
        }
        interface EditableCellFormatter extends Grid.BaseFormatter {
            (value: any, settings?: EditableCellFormatterSettings): string;
        }
        interface EditableRowFormatterSettings {
            rowMetadata: EditableRowMetadata;
        }
        interface EditableRowFormatter {
            (settings?: EditableRowFormatterSettings): string;
        }
        interface EditableRowColumn extends Grid.Column {
            /**
             * Formatter used when displaying one editable cell.
             */
            editableFormatter?: EditableCellFormatter;
        }
        interface EditableRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
            /**
             * Current state of a row.
             */
            editState: KnockoutObservableBase<EditableRowState>;
            /**
             * Indicate if the row is being edited.
             */
            editing: KnockoutObservableBase<boolean>;
            /**
             * Validation result of a row.
             */
            validationResult: KnockoutObservableBase<ValidationRowResult>;
        }
        interface EditableRowEventObject {
            /**
             * Editable Row targets.(Each cells' content)
             */
            targets: JQuery;
            /**
             * Editable Row.
             */
            editableRow: EditableRow;
            /**
             * Type of row event that happened.
             */
            type?: string;
        }
        interface EditableRowAddEventObject extends EditableRowEventObject {
            /**
             * By default, it will exit Editing state.
             * This override default behavior.
             */
            preventExitEditing: () => void;
        }
        interface EditableRowOptions {
            /**
             * Indicates if the editable row is at the top or bottom.
             * Defaults to Bottom.
             */
            placement?: EditableRowPlacement;
            /**
             * Indicates the formatter to use for the complete row.
             * You cannot use an editableFormatter per column if you use this property.
             * Default to null.
             */
            editableFormatter?: EditableRowFormatter;
            /**
             * Listens to keydown and change events on common input objects in order to specify the current row is being
             * modified. If this property is off, you would need to call the method setCurrentlyModified.
             * Defaults to false.
             */
            automaticRowChangeEventListener?: boolean;
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
        }
        interface EditableRow {
            /**
             * Row Metadata.
             */
            rowMetadata: EditableRowMetadata;
            /**
             * Convenience property that tells you if the item belongs to the createdItems or items.
             */
            existingItem: boolean;
            /**
             * Convenience Name/Value pair of all input/select/textarea fetched on the row.
             */
            data: {
                name: string;
                value: string;
            }[];
        }
        class EditableRowExtension extends Grid.Extension implements IEditableRowExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventFocusOutHandler;
            private _eventClickHandler;
            private _automaticEventHandler;
            private _options;
            private _editablePerColumn;
            private _createdItems;
            private _orderedCreatedItems;
            /**
             * Creates the Add Remove Row row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: EditableRowOptions);
            /**
             * See interface.
             */
            options: EditableRowOptions;
            /**
             * See interface.
             */
            createdItems: KnockoutObservableArray<Grid.Item>;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See interface.
             */
            shouldRetainRowMetadata(rowMetadata: Grid.RowMetadata): boolean;
            /**
             * See parent.
             */
            getName(): string;
            private _isRowValid(row);
            private _isValidationInProgress(row);
            private _isRowValidAsync(row, defer);
            private _isRowValidAsyncWraper(row);
            private _isItemModified(editableRow);
            private _rowAdd(row);
            private _rowEdit(row, type);
            private _getEditableRow(row);
            private _editableRowFormat(rowMetadata);
            private _editableCellFormat(rowMetadata, columnDefinition);
            private _isRowEdited(data);
            private _isRowDeleted(data);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Filterable.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Filterable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IFilterableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: FilterableOptions;
        }
        interface FilterableRowMetadata extends Grid.RowMetadata {
        }
        interface FilterableOptions {
            /**
             * Whether the filter search box is visible or not.
             */
            searchBoxVisible?: KnockoutObservableBase<boolean>;
            /**
             * Whether the filter search box close button is visible or not.
             */
            searchBoxCloseButtonVisible?: KnockoutObservableBase<boolean>;
            /**
             * The placeholder for the searchbox when it's not active.
             */
            searchBoxPlaceholder?: KnockoutObservable<string>;
            /**
             * The subset of columns (specified by their itemKey string) to search through.
             */
            searchableColumns?: KnockoutObservableArray<string>;
        }
        class FilterableExtension extends Grid.Extension implements IFilterableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            private _searchBoxViewModel;
            private _filterActive;
            private _queryEntryTimeoutId;
            private _columnMap;
            private _columnNumberMap;
            private _displayedColumns;
            private _results;
            private _resultTokenMap;
            /**
             * Creates the filterable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FilterableOptions);
            /**
             * Gets whether there's an active filter or not.
             */
            filterActive: KnockoutObservable<boolean>;
            /**
             * Gets the options of the plugin.
             */
            options: FilterableOptions;
            /**
             * Gets the results of the plugin.
             */
            results: KnockoutObservableArray<Grid.Item>;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            beforeCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            private _parseQueryString(queryString);
            private _getResultItems(queryTokens);
            private _filterableCellFormat(rowNumber, columnNumber, rowMetadata, columnDefinition);
            private _highlightMatches(value, queryToken);
            private _regexStringEscape(str);
            private _getFormattedItemValue(value, settings);
            private _getSearchableColumns();
            private _resetResults();
            private _getDefaultFilterableOptions();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.FocusableRow.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRow" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IFocusableRowExtension {
            /**
             * Gets the options of the plugin.
             */
            options: FocusableRowOptions;
            /**
             * Gives the focus to a specific row. If the rowMetadata does not exist in the view, no focus is given.
             *
             * @param rowMetadata The rowMetadata wanted to be focused.
             */
            focusRowByRowMetadata(rowMetadata: FocusableRowMetadata): void;
        }
        interface FocusableRowOptions {
            /**
             * Indicates the grid is focusable. Defaults to true.
             */
            focusable?: KnockoutObservableBase<boolean>;
        }
        interface FocusableRowEventObject {
            /**
             * Focused row.
             */
            focused: FocusableRowMetadata;
        }
        interface FocusableRowMetadata extends Grid.RowMetadata {
            /**
             * Indicates if the row is disabled.
             */
            disabled?: KnockoutObservableBase<boolean>;
            /**
             * Indicates if the row is focused.
             */
            focused?: KnockoutObservableBase<boolean>;
        }
        class FocusableRowExtension extends Grid.Extension implements IFocusableRowExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventKeyDown;
            private _eventMouseDown;
            private _options;
            private _lastTabbableRowMetadata;
            private _focusableComputed;
            /**
             * Indicates the grid is hover should be handle externally instead of default hover css
             */
            externalHover: boolean;
            /**
             * Creates the focusable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FocusableRowOptions);
            /**
             * Gets the options of the plugin.
             */
            options: FocusableRowOptions;
            static isEditableControl(element: JQuery): boolean;
            /**
             * See interface.
             */
            setInstance(instance: Grid.Widget): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            focusRowByRowMetadata(rowMetadata: FocusableRowMetadata): void;
            _getRowFocusDataBindAttribute(): string;
            _findPreviousFocusable(grid: JQuery, row: JQuery, wrapAround?: boolean): JQuery;
            _findNextFocusable(grid: JQuery, row: JQuery, wrapAround?: boolean): JQuery;
            _focusElement(row: JQuery): void;
            _focusRow(row: HTMLTableRowElement, rowMetadata: FocusableRowMetadata, evt?: JQueryEventObject): void;
            _focusRow(row: JQuery, rowMetadata: FocusableRowMetadata, evt?: JQueryEventObject): void;
            private _getFocusableList(table);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.FocusableRowHover.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRowHover" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import FocusableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRow");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface FocusableHoverRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
            hoverID: string;
        }
        interface IFocusableRowHoverExtension {
            /**
             * Gets the options of the plugin.
             */
            options: FocusableRowHoverOptions;
            /**
             * Gives the hover to a specific row.
             *
             * @param rowMetadata The rowMetadata wanted to be focused.
             */
            hoverRowByRowMetadata(rowMetadata: FocusableHoverRowMetadata): void;
            /**
             * Gives the hover to a specific row. .
             *
             * @param rowMetadata The rowMetadata wanted to be focused.
             */
            hoverRowByHoverId(hoverId: string): void;
        }
        interface FocusableRowHoverEventObject {
            /**
             * hovered row.
             */
            hovered?: FocusableHoverRowMetadata;
        }
        interface FocusableRowHoverOptions extends FocusableRowGrid.FocusableRowOptions {
            hoverIDKey?: KnockoutObservableBase<string>;
            hoveredID?: KnockoutObservableBase<string>;
        }
        class FocusableRowHoverExtension extends Grid.Extension implements IFocusableRowHoverExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            private _focusableRowExtension;
            private _eventRowFocus;
            private _eventRowMouseEnter;
            private _eventRowMouseLeave;
            private _eventBlur;
            private _eventFocus;
            private _focusedByEvent;
            private _hoverIDKey;
            private _hoveredID;
            private _hoveredRowMetadata;
            private _preventMouseHandler;
            private _preventMouseHandlerTimer;
            private _idRowMetadataMap;
            private _backupIdMax;
            private _inHoverRowByRowMetadata;
            /**
             * Creates the activateable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FocusableRowHoverOptions);
            /**
             * Gets the options of the plugin.
             */
            options: FocusableRowHoverOptions;
            /**
             * See interface.
             */
            beforeCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            hoverRowByHoverId(hoverID: string): void;
            hoverRowByRowMetadata(rowMetadata: FocusableHoverRowMetadata, evt?: JQueryEventObject): void;
            private _resetPreventMouseHandlerTimer();
            private _onRowFocus(evt, focusableRowEventObject);
            private _getRowMetadataFromHoverID(hoverID);
            private _rebuildIdRowMetadaMap();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Formatters.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Formatters" {
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Formatters.Helpers.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Formatters.Helpers" {
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        /**
         * Verifies if the value is null.
         *
         * @param value The value.
         * @return True if null, false otherwise.
         */
        function isNull(value: any): boolean;
        /**
         * Verifies if the value is undefined.
         *
         * @param value The value.
         * @return True if undefined, false otherwise.
         */
        function isUndefined(value: any): boolean;
        /**
         * Verifies if the value is null or undefined.
         *
         * @param value The value.
         * @return True if null or undefined, false otherwise.
         */
        function isNullOrUndefined(value: any): boolean;
        /**
         * Escapes the value for safe HTML usage.
         *
         * @param value The value.
         * @return String HTML escaped.
         */
        function htmlEncode(value: any): string;
        /**
         * Escapes the value for safe attribute usage.
         *
         * @param value The value.
         * @return String attribute escaped.
         */
        function attributeEncode(value: any): string;
        /**
         * Calls a cell formatter with all the arguments.
         *
         * @param formatter The formatter.
         * @param value The value.
         * @param args The rest of the arguments.
         * @return String returned by the formatter.
         */
        function callFormatter(formatter: Grid.CellFormatter, value: any, args?: any): string;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Groupable.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Groupable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IGroupableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: GroupableOptions;
            /**
             * Gets the list of items for a particular group.
             *
             * @param groupId The string representing the ID of the group to get data for.
             * @return An array of Grid.Item objects.
             */
            getItemsByGroup(groupId: any): KnockoutComputed<Grid.Item[]>;
            /**
             * Gets the ordered list of groups based on the groupKey option.
             *
             * @return An array of Group objects.
             */
            groups: KnockoutComputed<Group[]>;
        }
        interface GroupableRowMetadata extends Grid.RowMetadata {
            /**
             * The ID of the group, typically mapping to a unique value in the column being grouped by.
             */
            groupId: KnockoutObservable<any>;
        }
        interface GroupableOptions {
            /**
             * The item field/column in the data set that the groups map to/are created from.
             */
            groupKey: KnockoutObservable<string>;
            /**
             * The formatter to apply to each group headers. Default is FormattersGrid.text.
             */
            headerFormatter?: Grid.CellFormatter;
            /**
             * An observable array of Group objects, to be rendered in indexed order.
             * If this array is not provided, it is inferred from the column values mapped to groupKey.
             */
            groups?: KnockoutObservableBase<Group[]>;
            /**
             * The group name shown for all items that don't have a groupId set.
             */
            noGroupLabel?: Grid.CellFormatter;
            /**
             * Sort order to display groups in (Unsorted, Ascending, or Descending).
             */
            sortOrder?: KnockoutObservableBase<Grid.SortOrder>;
            /**
             * Sort on the formatted or raw group values. Defaults to formatted.
             */
            sortFunction?: (a: any, b: any) => number;
        }
        interface IGroup {
            /**
             * The unique value corresponding to the group.
             * This value will be passed to the formatter.
             */
            value: any;
            /**
             * The formatter to be applied to the group header row.
             */
            formatter: Grid.CellFormatter;
            /**
             * The formatter to be applied when sorting.
             */
            sortFormatter: Grid.CellFormatter;
        }
        class Group implements IGroup {
            /**
             * See interface.
             */
            value: any;
            /**
             * See interface.
             */
            formatter: Grid.CellFormatter;
            /**
             * See interface.
             */
            sortFormatter: Grid.CellFormatter;
            /**
             * Creates and initializes the Group class.
             * If no formatter is passed in, FormattersGrid.text is used by default on the value property.
             * If the sort formatter is not provided, the data is sorted on the data itself.
             *
             * @param value The ID of the group (to be used as the display value, as well).
             * @param formatter The formatter to apply to the ID of the group upon display.
             * @param sortFormatter The formatter to apply to the ID of the group for sorting purposes.
             */
            constructor(value: string, formatter?: Grid.CellFormatter, sortFormatter?: Grid.CellFormatter);
        }
        class GroupableExtension extends Grid.Extension implements IGroupableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _groups;
            private _groupItems;
            private _options;
            /**
             * Creates the selectable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: GroupableOptions);
            /**
             * See interface.
             */
            groups: KnockoutComputed<Group[]>;
            /**
             * Gets the options of the plugin.
             */
            options: GroupableOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            beforeCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See interface.
             */
            getItemsByGroup(groupId: any): KnockoutComputed<Grid.Item[]>;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            private _getDefaultGroupOptions();
            private _headerCellFormat(formatter, value);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Hierarchical.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Hierarchical" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface HierarchicalItem extends Grid.Item {
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
        interface Hierarchy {
            /**
             * The items to display in the grid.
             */
            items: KnockoutObservableBase<HierarchicalItem[]>;
            /**
             * Expands a hierarchy item.
             * @param item The item to expand.
             */
            expand: (item: HierarchicalItem) => void;
            /**
             * Collapses a hierarchy item.
             * @param item The item to expand.
             */
            collapse: (item: HierarchicalItem) => void;
            /**
             * Expands all hierarchy items.
             */
            expandAll: () => void;
            /**
             * Collapses all hierarchy items.
             */
            collapseAll: () => void;
        }
        interface IHierarchicalExtension {
            /**
             * Gets the options of the plugin.
             */
            options: HierarchicalOptions;
        }
        interface HierarchicalOptions {
            /**
             * Provides the hierarchical data to the grid.
             */
            hierarchy: Hierarchy;
        }
        interface HierarchicalColumn extends Grid.Column {
            /**
             * Indicates if the column is hierarchical.
             */
            hierarchical?: boolean;
        }
        class HierarchicalExtension extends Grid.Extension implements IHierarchicalExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            /**
             * Creates the hierarchical row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: HierarchicalOptions);
            /**
             * Gets the options of the plugin.
             */
            options: HierarchicalOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See inteface.
             */
            getDefaultColumnProperties(): any;
            private _getDefaultHierarchicalOptions();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Pageable.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Pageable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Pager = require("Viva.Controls/Controls/Pager");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IPageableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: PageableOptions;
        }
        interface PageableOptions {
            /**
             * The label text that's displayed to load more data.
             */
            label?: KnockoutObservableBase<string>;
            /**
             * Show or hide the pageable display label.
             */
            showLabel?: KnockoutObservableBase<boolean>;
            /**
             * Indicates if the data is asyncronously fetched.
             */
            loading?: KnockoutObservableBase<boolean>;
            /**
             * Callback is invoked when load more label is clicked.
             */
            onLoadMoreData?: () => void;
            /**
             * Pager view model if using a full paging control.
             */
            pagerViewModel?: Pager.ViewModel;
            itemsPerPage?: KnockoutObservableBase<number>;
        }
        class PageableExtension extends Grid.Extension implements IPageableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            private _loadMoreDataHandler;
            private _onePagerComputed;
            /**
             * Creates the pageable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: PageableOptions);
            /**
             * Gets the options of the plugin.
             */
            options: PageableOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
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
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            private _getDefaultPageableOptions();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.ReorderRow.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.ReorderRow" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IReorderRowExtension {
            /**
             * Gets the options of the plugin.
             */
            options: ReorderRowOptions;
        }
        interface ReorderRowOptions {
            /**
             * Disables row reordering.
             */
            disabled?: KnockoutObservable<boolean>;
        }
        interface ReorderRowEventObject {
            /**
             * Metadata for moved row items.
             */
            rowMetadata: Grid.RowMetadata[];
            /**
             * X position where the row got dropped.
             */
            clientX: number;
            /**
             * Y position where the row got dropped.
             */
            clientY: number;
            /**
             * 0-Index position where the row got dropped.
             */
            position: number;
        }
        class ReorderRowExtension extends Grid.Extension implements IReorderRowExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventMouseDown;
            private _eventMouseMove;
            private _eventMouseUp;
            private _options;
            private _savedIndex;
            private _dragstartEventHandler;
            private _dropEventHandler;
            private _dragendEventHandler;
            private _dragoverEventHandler;
            private _mouseenterEventHandler;
            private _mouseleaveEventHandler;
            private _gridGuid;
            /**
             * Creates the reorder row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: ReorderRowOptions);
            /**
             * Gets the options of the plugin.
             */
            options: ReorderRowOptions;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See parent.
             */
            getAdditionalColumns(): number;
            private _getMimeType();
            private _positionLine(evt);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.ResizableColumn.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.ResizableColumn" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    import VivaGridResizableColumn = require("Viva.Controls/Controls/Lists/Grid1/Grid.ResizableColumn");
    export = Main;
    module Main {
        interface IResizableColumnExtension {
            /**
              * Gets the options of the plugin.
              */
            options: ResizableColumnOptions;
        }
        interface ResizableColumn extends Grid.Column {
            /**
             * Disables resizable for a specific column.
             */
            disableResizable?: KnockoutObservable<boolean>;
            /**
             * Column displays a resize handle.
             */
            hasHandle?: KnockoutObservable<boolean>;
        }
        interface ResizableColumnOptions {
            /**
             * Indicates if columns are resizable. Defaults to true.
             */
            resizable?: KnockoutObservable<boolean>;
            /**
             * Sets resized column width to percent.
             */
            resizeToPercent?: KnockoutObservable<boolean>;
            /**
             * Sets minimum width in pixels for columns.
             */
            minWidth?: number;
        }
        class ResizableColumnExtension extends Grid.Extension implements IResizableColumnExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _mouseDownEventHandler;
            private _mouseMoveEventHandler;
            private _mouseUpEventHandler;
            private _options;
            private _handle;
            private _columns;
            private _mouseDownPosition;
            private _columnsSubscription;
            private _lastColumnObject;
            /**
             * Creates the resizable column extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: ResizableColumnOptions);
            /**
             * Gets the options of the plugin.
             */
            options: ResizableColumnOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
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
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See inteface.
             */
            getDefaultColumnProperties(): any;
            /**
             * Gets the default resizable options.
             *
             * @return The default options.
             */
            private _getDefaultResizableColumnOptions();
            /**
             * Starts the column resize.
             */
            private _resizeStart(selectedColumn, nextColumn);
            /**
             * Gets the corresponding col.
             *
             * @param column Grid.Column.
             * @return col.
            */
            private _getCol(column);
            private _getNextResizableColumn(columns, index);
            /**
             * Calculates the percentage of a part value relative to a whole value.
             *
             * @param whole Whole value.
             * @param part Part value.
             * @return string percent.
            */
            private _convertToPercent(whole, part);
            private _tableOffset(table, offset);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.RightClickableRow.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.RightClickableRow" {
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IRightClickableRowExtension {
            /**
             * Gets the options of the plugin.
             */
            options: RightClickableRowOptions;
        }
        interface RightClickableRowOptions {
            /**
             * Disables the right clickable extension. Defaults to false.
             */
            disabled?: KnockoutObservable<boolean>;
        }
        interface RightClickableRowEventObject {
            /**
             * Metadata for right-clicked item.
             */
            rowMetadata: Grid.RowMetadata;
            /**
             * X position where right click happened.
             */
            clientX: number;
            /**
             * Y position where right click happened.
             */
            clientY: number;
        }
        class RightClickableRowExtension extends Grid.Extension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _options;
            private _eventRightClick;
            /**
             * Creates the right clickable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: RightClickableRowOptions);
            /**
             * Gets the options of the plugin.
             */
            options: RightClickableRowOptions;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.Scrollable.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.Scrollable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface IScrollableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: ScrollableOptions;
        }
        interface ScrollableDataProvider {
            /**
             * The total count of data items.
             */
            totalItemCount: KnockoutObservableBase<number>;
            /**
             * Gets the requested items from the client cache or from the data provider.
             */
            fetch(skip: number, take: number): Promise.PromiseV<Grid.Item[]>;
        }
        interface ScrollableOptions {
            /**
             * Data provider for enabling virtual scrolling.
             */
            dataProvider?: ScrollableDataProvider;
            /**
             * Viewport refreshing time.
             */
            updateViewportAsyncDebounceTime?: number;
            /**
             * Default row height.
             */
            defaultRowHeight?: number;
        }
        enum AsyncItemState {
            /**
             * The item is loading.
             */
            Loading = 0,
            /**
             * The item has been loaded.
             */
            Loaded = 1,
            /**
             * There was a error loading the item.
             */
            Error = 2,
        }
        class AsyncItem {
            /**
             * The current loading state of the item.
             */
            state: KnockoutObservable<AsyncItemState>;
            /**
             * The data item when it is loaded.
             */
            item: KnockoutObservable<Grid.Item>;
            /**
             * The index of the item in the dataset.
             */
            index: number;
            /**
             * The template to use for rendering the item depending on state.
             */
            template: KnockoutObservableBase<string>;
            /**
             * Constructs an async item for display in the virtualized grid.
             */
            constructor(index: number, state: AsyncItemState, item: Grid.Item);
        }
        class ScrollableExtension extends Grid.Extension implements IScrollableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            /**
             * Items that load asyncronously.
             */
            asyncItems: KnockoutObservableArray<AsyncItem>;
            private static _updateViewportAsyncDebounceTime;
            private static _asyncItemCacheSize;
            private static _defaultRowHeight;
            private static _maxElementHeightFactor;
            private static _defaultRequestCount;
            private _options;
            private _updateViewportAsyncTimeout;
            private _latestRequest;
            private _asyncItemCache;
            private _resizeTracker;
            private _scrollHandler;
            private _totalItemCountSubscription;
            private _scrollContainer;
            /**
             * Creates the scrollable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: ScrollableOptions);
            /**
             * Gets the options of the plugin.
             */
            options: ScrollableOptions;
            /**
             * Indicates if virtual scrolling is enabled.
             */
            virtualScrolling: boolean;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See inteface.
             */
            getDefaultColumnProperties(): any;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * Resets navigation to the starting position.
             * Puts the scrollbar back to the top and clears any cached data.
             */
            reset(): void;
            /**
             * Gets the default scrollable options.
             *
             * @return The default options.
             */
            private _getDefaultScrollableOptions();
            /**
             * Clears the async item cache.
             */
            private _resetAsyncItemCache();
            /**
             * Updates the table header horizontal position and width and height for the scroll container as needed.
             */
            private _updateHeader();
            /**
             * Updates the table layout for scrollbars.
             * This occurs on overy scroll event and should be quick to keep the scrollbars responsive.
             */
            private _update();
            /**
             * Triggers a debounced async update to the viewport for virtualized data.
             */
            private _updateViewportAsync();
            /**
             * Gets the row height to use for calculating virtual row positions.
             *
             * @return The row hight in pixels.
             */
            private _getRowHeight();
            /**
             * Gets the total scroll height accounting for browser limitations.
             *
             * @return The total scroll height in pixels.
             */
            private _getTotalScrollHeight(totalRows, rowHeight);
            /**
             * Updates the table container height so the scrollHeight does not re-adjust as we alter the table.
             */
            private _updateContentHeight(height);
            /**
             * Updates the buffer wow height.
             */
            private _updateAboveRowHeight(height);
            /**
             * Updates the viewport for virtualized data.
             */
            private _updateViewport();
            /**
             * Merges the newly fetched async items with the current items as needed.
             *
             * @param requestedItems The newly requested items to render in the grid.
             */
            private _render(requestedItems);
            /**
             * Pushes the latest requested items into the grid.
             *
             * @param items The grid items.
             */
            private _updateGridItems(items);
            /**
             * Requests the data from the provider.
             *
             * @param start The starting position in the data.
             * @param count The number of data items to render.
             * @return The async items.
             */
            private _request(start, count);
            /**
             * See interface.
             */
            shouldRetainRowMetadata(rowMetadata: Grid.RowMetadata): boolean;
            /**
             * Scrolls the grid to the specified index.
             *
             * @param index The index within the total rows where to scroll the grid.
             */
            scrollTo(index: number): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.SelectableRow.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.SelectableRow" {
    import FocusableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.FocusableRow");
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface ISelectableRowExtension {
            /**
             * Gets the selected rows metadata.
             *
             * @return Metadata of the rows that are selected.
             */
            getSelectedRows(): SelectableRowMetadata[];
            /**
             * Unselects all rows currently selected in the grid.
             */
            unselectAllRows(): void;
            /**
             * Unselects specified rows in the grid.
             *
             * @param items One or multiple data items.
             */
            unselectRows(...items: Grid.Item[]): void;
            /**
             * Selects specified rows in the grid.
             *
             * @param items One or multiple data items.
             */
            selectRows(...items: Grid.Item[]): void;
            /**
             * Gets the options of the plugin.
             */
            options: SelectableRowOptions;
        }
        interface SelectableRowMetadata extends FocusableRowGrid.FocusableRowMetadata {
            /**
             * Indicates if the row is selected.
             */
            selected?: KnockoutObservableBase<boolean>;
        }
        interface SelectableRowEventObject {
            /**
             * Selected row.
             */
            selected?: SelectableRowMetadata;
            /**
             * Unselected row.
             */
            unselected?: SelectableRowMetadata[];
        }
        enum RowSelectionMode {
            /**
             * The grid does not support selection of rows.
             */
            Off = 0,
            /**
             * At most one row in the grid can be selected at a time.
             */
            Single = 1,
            /**
             * By default, multiple items can be in the selected state.
             * Clicking on an unselected item will add it to the list of selected items.
             * Clicking on a selected item will remove it from the list of selected items.
             */
            MultipleAdd = 2,
            /**
             * When Ctrl or Shift is not used,
             * Clicking on an unselected item will remove the selection of existing items and select the new one.
             * The Ctrl or Shift keys can be used to preserve existing selections.
             * This behavior is a close approximation to Windows Explorer.
             */
            MultipleReplace = 3,
            /**
             * One row in the grid can be selected at a time. If no selection provided, the first item will be selected.
             */
            AlwaysSingle = 4,
        }
        interface SelectableRowOptions {
            /**
             * Indicates default MultiselectMode.
             */
            mode?: KnockoutObservable<RowSelectionMode>;
            /**
             * Specifies an overlay image to be placed over the end of the row.
             * The formatter is provided the value of the row selection true/false and no settings.
             */
            overlayFormatter?: Grid.CellFormatter;
            /**
             * Disable require Ctrl or Shift Key for Single Mode mode to toggle selection on Click.
             */
            disableRequireSingleModeAssistKey?: KnockoutObservable<boolean>;
        }
        class SelectableRowExtension extends Grid.Extension implements ISelectableRowExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventKeyDown;
            private _options;
            private _multiselect;
            /**
             * Creates the selectable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: SelectableRowOptions);
            /**
             * Gets the options of the plugin.
             */
            options: SelectableRowOptions;
            /**
             * See interface.
             */
            getSelectedRows(): SelectableRowMetadata[];
            /**
             * See interface.
             */
            unselectAllRows(): void;
            /**
             * See interface.
             */
            unselectRows(...items: Grid.Item[]): void;
            /**
             * See interface.
             */
            selectRows(...items: Grid.Item[]): void;
            /**
             * See interface.
             */
            setInstance(instance: Grid.Widget): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See interface.
             */
            private _changeSelection(item, evt);
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See interface.
             */
            getAdditionalColumns(): number;
            private _overlayFormat(rowMetadata);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.SelectableRowActivate.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.SelectableRowActivate" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import SelectableRowGrid = require("Viva.Controls/Controls/Lists/Grid1/Grid.SelectableRow");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface ISelectableRowActivateExtension {
            /**
             * Gets the activated rows metadata.
             *
             * @return Metadata of the rows that are activated.
             */
            getActivatedRows(): SelectableRowActivateMetadata[];
            /**
             * Deactivates all rows currently activated in the grid.
             */
            deactivateAllRows(): void;
            /**
             * Deactivates specified rows in the grid.
             *
             * @param items One or multiple data items.
             */
            deactivateRows(...items: Grid.Item[]): void;
            /**
             * Activates specified rows in the grid.
             *
             * @param columnKey Grid.Column that has been activated.
             * @param items One or multiple data items.
             */
            activateRows(columnKey: string, ...items: Grid.Item[]): void;
            /**
             * Gets the options of the plugin.
             */
            options: SelectableRowActivateOptions;
        }
        interface ActivatableColumn extends Grid.Column {
            /**
             * Indicates if the column is activatable.
             */
            activatable?: KnockoutObservableBase<boolean>;
        }
        interface SelectableRowActivateMetadata extends SelectableRowGrid.SelectableRowMetadata {
            /**
             * Indicates the columnKey if the row is activated. null if deactivated.
             */
            activated?: KnockoutObservableBase<string>;
            /**
             * Additional information for this Activated cell if any.
             */
            activatedInfo?: KnockoutObservableBase<string>;
            /**
             * private property to indicate the activate subscription is been eistablish between selected and activated.
             */
            _activatedSubscribed?: boolean;
        }
        interface SelectableRowActivateEventObject {
            /**
             * Activated row.
             */
            activated?: SelectableRowActivateMetadata;
        }
        interface SelectableRowActivateOptions extends SelectableRowGrid.SelectableRowOptions {
            /**
             * Currently Activated Grid.Column Key.
             */
            activatedColumnKey?: KnockoutObservableBase<string>;
            /**
             * Primary Activate Grid.Column Key.  This is to support double click, context menu and activateOnSelected.
             */
            primaryActivateColumnKey?: KnockoutObservableBase<string>;
            /**
             * Indicate row should activated when the row is selected.
             */
            activateOnSelected?: KnockoutObservableBase<boolean>;
        }
        class SelectableRowActivateExtension extends Grid.Extension implements ISelectableRowActivateExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventKeyPress;
            private _eventKeyPressCell;
            private _eventRowSelect;
            private _eventFocusHandler;
            private _eventBlurHandler;
            private _options;
            private _activatedColumnKey;
            private _activatedInfo;
            private _primaryActivateColumnKey;
            private _activateOnSelected;
            private _firstColumnKey;
            private _selectableRowExtension;
            private _preserveSelection;
            private _activatedRows;
            /**
             * Creates the activateable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: SelectableRowActivateOptions);
            /**
             * Gets the options of the plugin.
             */
            options: SelectableRowActivateOptions;
            /**
             * See interface.
             */
            getActivatedRows(): SelectableRowActivateMetadata[];
            /**
             * See interface.
             */
            deactivateAllRows(): void;
            /**
             * See interface.
             */
            deactivateRows(...items: Grid.Item[]): void;
            /**
             * See interface.
             */
            activateRows(columnKey?: string, ...items: Grid.Item[]): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            getDefaultRowMetadataProperties(): any;
            /**
             * See inteface.
             */
            getDefaultColumnProperties(): any;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Grid.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * See parent.
             */
            shouldNotChangeSelection(item: HTMLTableRowElement, evt: JQueryEventObject): boolean;
            private _changeActivation(item, evt);
            private _handleActivationKeyPressOrClick(evt, elem);
            private _onRowSelect(evt, selectableRowEventObject);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Grid1\Grid.SortableColumn.d.ts
declare module "Viva.Controls/Controls/Lists/Grid1/Grid.SortableColumn" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    export = Main;
    module Main {
        interface ISortableColumnExtension {
            /**
             * Gets the column data that is current sorted.
             *
             * @return Current sorted column, or null otherwise.
             */
            getSortedColumn(): SortableColumn;
        }
        interface SortableColumn extends Grid.Column {
            /**
             * Indicates if the column is sortable.
             */
            sortable?: boolean;
            /**
             * Sort order.
             */
            sortOrder?: KnockoutObservable<Grid.SortOrder>;
        }
        interface SortableColumnEventObject {
            /**
             * Sorted column.
             */
            column: SortableColumn;
            /**
             * Current sort order.
             */
            sortOrder: Grid.SortOrder;
        }
        class SortableColumnExtension extends Grid.Extension implements ISortableColumnExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventSortingClickHandler;
            /**
             * See interface.
             */
            getSortedColumn(): SortableColumn;
            /**
             * See interface.
             */
            setInstance(instance: Grid.Widget): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See inteface.
             */
            getDefaultColumnProperties(): any;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\List1\List.d.ts
declare module "Viva.Controls/Controls/Lists/List1/List" {
    import ExtensibleControl = require("Viva.Controls/Controls/Base/ExtensibleControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface PluginExtension extends ExtensibleControl.PluginExtension {
        }
        class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
        }
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * The the items that have initialized metadata.
             */
            itemViews: KnockoutComputed<ItemView[]>;
            /**
             * Gets the list item view from the item.
             *
             * @param item The item to get the list item view for.
             * @return The list item view.
             */
            getItemView(item: Item): ItemView;
        }
        /**
         * A metadata entry corresponding to a single item in the list.
         */
        interface ItemMetadata {
            /**
             * Indicates if the item is disabled.
             */
            disabled?: KnockoutObservable<boolean>;
        }
        interface Item {
            /**
             * An item value is accessible by a sring key accessor.
             */
            [key: string]: any;
            /**
             * Css class specific to this item.
             */
            cssClass?: KnockoutObservableBase<string>;
            /**
             * Metadata information about this item.
             */
            metadata?: ItemMetadata;
        }
        interface ItemView extends Item {
            /**
             * The original item.
             */
            item: Item;
        }
        class ViewModel extends ExtensibleControl.ViewModel {
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
            noItemsMessage: string;
            constructor();
        }
        class Widget extends ExtensibleControl.Widget implements Interface {
            private _templateEngine;
            private _itemViews;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * The items views with full initialized metadata.
             */
            itemViews: KnockoutComputed<ItemView[]>;
            /**
             * See interface.
            */
            getItemView(item: Item): ItemView;
            /**
             * See interface.
             */
            options: ViewModel;
            private _attachEvents();
            private _detachEvents();
            private _setTemplates();
            private _createItemView(item);
            private _disposeItemView(itemView);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\List1\List.Focusable.d.ts
declare module "Viva.Controls/Controls/Lists/List1/List.Focusable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import List = require("Viva.Controls/Controls/Lists/List1/List");
    export = Main;
    module Main {
        /**
         * The listview tab mode.
         */
        enum TabMode {
            /**
             * Tabbing will go to last focused item or the first item if no items have been focused.
             */
            LastFocused = 0,
            /**
             * All enabled items can be accessed via tabbing.
             */
            All = 1,
        }
        interface FocusableOptions {
            /**
             * The tab mode for the listview.
             */
            tabMode?: TabMode;
        }
        interface IFocusableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: FocusableOptions;
        }
        interface FocusableEventObject {
            /**
             * Focused item.
             */
            focused: List.Item;
        }
        interface FocusableItemMetadata extends List.ItemMetadata {
            /**
             * Indicates if the item is the last focused.
             */
            focused?: KnockoutObservableBase<boolean>;
        }
        class FocusableExtension extends List.Extension implements IFocusableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventFocusIn;
            private _eventKeyDown;
            private _options;
            private _currentTabbableItemView;
            /**
             * Creates the focusable extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FocusableOptions);
            /**
             * Gets the options of the plugin.
             */
            options: FocusableOptions;
            /**
             * See interface.
             */
            setInstance(instance: List.Widget): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            initializeItemView(itemView: List.ItemView): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            private _findPreviousFocusable(item);
            private _findPreviousAboveFocusable(item);
            private _findNextFocusable(item);
            private _findNextBelowFocusable(item);
            private _focusElement(item, allowChildFocus);
            private _focusItem(elem, itemView, allowChildFocus, evt);
            private _getVisibleEnabledList(element);
            private _updateCurrentTabbableItemView(itemView);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\List1\List.Groupable.d.ts
declare module "Viva.Controls/Controls/Lists/List1/List.Groupable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import List = require("Viva.Controls/Controls/Lists/List1/List");
    export = Main;
    module Main {
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
        interface IGroupableExtension {
            /**
             * Gets the list of item views for a particular group.
             *
             * @param groupId The string representing the ID of the group to get data for.
             * @return An array of List.ItemView objects.
             */
            getItemViewsByGroup(groupId: any): KnockoutComputed<List.ItemView[]>;
            /**
             * Gets the ordered list of groups based on the groupKey option.
             *
             * @return An array of Group objects.
             */
            groups: Group[];
        }
        interface GroupableItemMetadata extends List.ItemMetadata {
            /**
             * The ID of the group, typically mapping to a unique value in the field being grouped by.
             */
            groupId: KnockoutObservable<any>;
        }
        interface GroupableOptions {
            /**
             * The item field in the data set that the groups map to/are created from.
             */
            groupKey: KnockoutObservable<string>;
            /**
             * The template to apply to each group header.
             */
            headerTemplate?: string;
            /**
             * An observable array of Group objects, to be rendered in indexed order.
             * If this array is not provided, it is inferred from the values mapped to groupKey.
             */
            groups?: KnockoutObservableArray<Group>;
            /**
             * The group name shown for all items that don't have a groupId set.
             */
            noGroupLabel?: string;
            /**
             * Order to display groups in (Ascending, Descending, or Collection order).
             */
            order?: KnockoutObservableBase<GroupOrder>;
            /**
             * Sort on the raw group values.
             */
            sortFunction?: (a: any, b: any) => number;
        }
        interface Group {
            /**
             * The unique value corresponding to the group.
             */
            value: any;
        }
        class GroupableExtension extends List.Extension implements IGroupableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _groups;
            private _groupItemViews;
            private _options;
            /**
             * Creates the groupable item extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: GroupableOptions);
            /**
             * See interface.
             */
            groups: Group[];
            /**
             * Gets the options of the plugin.
             */
            options: GroupableOptions;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            beforeCreate(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See interface.
             */
            initializeItemView(itemView: List.ItemView): void;
            /**
             * See interface.
             */
            getItemViewsByGroup(groupId: any): KnockoutComputed<List.ItemView[]>;
            /**
             * See parent.
             */
            getName(): string;
            private _getDefaultGroupOptions();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\List1\List.Selectable.d.ts
declare module "Viva.Controls/Controls/Lists/List1/List.Selectable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import FocusableList = require("Viva.Controls/Controls/Lists/List1/List.Focusable");
    import List = require("Viva.Controls/Controls/Lists/List1/List");
    export = Main;
    module Main {
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
        interface ISelectableExtension {
            /**
             * Gets the selected items.
             */
            getSelected(): List.Item[];
            /**
             * Unselects the supplied item.
             *
             * @param item List.Item to remove from selection.
             */
            unselect(itemView: List.ItemView): void;
            /**
             * Selects specified item in the listView.
             *
             * @param item List.Item to select.
             * @param extend Extended or replace the current selection.
             * @param toggle Unselect if already selected.
             */
            select(itemView: List.ItemView, extend?: boolean, toggle?: boolean): void;
        }
        interface SelectableItemMetadata extends FocusableList.FocusableItemMetadata {
            /**
             * Indicates if the item is selected.
             */
            selected?: KnockoutObservableBase<boolean>;
        }
        interface SelectableEventObject {
            /**
             * Selected items.
             */
            selected: List.Item[];
            /**
             * Unselected items.
             */
            unselected: List.Item[];
        }
        interface SelectableOptions {
            /**
             * Indicates selection mode or single or multiple selection.
             */
            selectionMode: SelectionMode;
            /**
             * Gets or sets the selected items.
             */
            selectedItems: KnockoutObservableArray<List.Item>;
            /**
             * The selected overlay template.
             */
            selectedOverlayTemplate?: string;
        }
        class SelectableExtension extends List.Extension implements ISelectableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventDoubleClick;
            private _eventKeyDown;
            private _options;
            private _disposables;
            /**
             * Creates the ListView selectable item extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: SelectableOptions);
            /**
             * Gets the options of the plugin.
             */
            options: SelectableOptions;
            /**
             * See interface.
             */
            getSelected(): List.Item[];
            /**
             * See interface.
             */
            select(itemView: List.ItemView, extend?: boolean, toggle?: boolean): void;
            /**
             * See interface.
             */
            unselect(itemView: List.ItemView): void;
            /**
             * See interface.
             */
            setInstance(instance: List.Widget): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            initializeItemView(itemView: List.ItemView): void;
            /**
             * See interface.
             */
            removeItemView(itemView: List.ItemView): void;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): List.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            /**
             * Changes the selection to the specified element item.
             *
             * @param rawItem The html element of the item to select.
             * @param evt The event triggering the change of selection.
             * @param extend Indicates if the existing selection should be extended or replaced.
             */
            private _changeSelection(rawItem, evt, extend);
            /**
             * Retrieves the default options for the control extension.
             *
             * @return The extension options.
             */
            private _getDefaultOptions();
            /**
             * Updates the selection to the desired item.
             *
             * @param listItem The ListItem to select.
             * @param extend Indicates if the existing selection should be extended or replaced.
             * @param toggle Indicates if the item is already selected should it be unselected or not.
             * @return The changes to the selection.
             */
            private _select(itemView, extend?, toggle?);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Tree1\Tree.d.ts
declare module "Viva.Controls/Controls/Lists/Tree1/Tree" {
    import ExtensibleControl = require("Viva.Controls/Controls/Base/ExtensibleControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
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
        /**
         * A leaf of the tree.
         */
        interface Item {
            /**
             * Text of the item.
             */
            text: KnockoutObservable<string>;
            /**
             * Icon specified to the item to be displayed with text.
             */
            icon?: KnockoutObservable<string>;
            /**
             * Css class specific to this item.
             */
            cssClass?: KnockoutObservable<string>;
            /**
             * Child items of this item.
             */
            items?: KnockoutObservableArray<Item>;
            /**
             * Metadata information about this item.
             */
            metadata?: ItemMetadata;
            /**
             * Key of the template for this item.
             */
            templateKey?: KnockoutObservable<string>;
        }
        interface ItemExpandEventObject {
            /**
             * Indicates whether the item is being expanded or not.
             */
            expanding: boolean;
            /**
             * Item being expanded or collapsed.
             */
            item: Item;
        }
        interface PluginExtension extends ExtensibleControl.PluginExtension {
            /**
             * Callback: before attaching events.
             */
            beforeAttachEvents?(): void;
            /**
             * Callback: after attaching events.
             */
            afterAttachEvents?(): void;
            /**
             * Callback: before detaching events.
             */
            beforeDetachEvents?(): void;
            /**
             * Callback: after detaching events.
             */
            afterDetachEvents?(): void;
        }
        class Extension extends ExtensibleControl.Extension<Widget> implements PluginExtension {
        }
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ExtensibleControl.ViewModel {
            /**
             * Items displayed in the tree.
             */
            items: KnockoutObservableArray<Item>;
            /**
             * Important events which the viewModel might want to react.
             */
            events: (type: string, args?: any) => void;
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
        }
        class Widget extends ExtensibleControl.Widget implements Interface {
            private _treeIconClickHandler;
            private _templateEngine;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Gets the DOM element represented by the specified item.
             *
             * @param item Reference to find the DOM element.
             * @return DOM representation of the specified item.
             */
            getElementFromItem(item: Item): JQuery;
            /**
             * Triggers events that signal to the treeview and treeview plugins that an item should be expanded or collapsed.
             *
             * @param item The treeview item to be expanded.
             * @param evt Event initiating this expand operation.
             * @param expand Optional expand value to set the expanded property.
             */
            toggleNodeExpansion(item: Item, evt: JQueryEventObject, expand?: boolean): void;
            /**
             * Enables to expand/collapse specified node. If no expand specified, expand property
             * is toggled, otherwise expand property is set to the specified value.
             *
             * @param node Node to expand/collapse.
             * @param evt Event initiating this expand operation.
             * @param expand Optional expand value to set the expanded property.
             */
            _expandNode(node: JQuery, evt: JQueryEventObject, expand?: boolean): void;
            /**
             * Builds the path for the specified item using its text and the path separator.
             *
             * @param item Item to build the path.
             * @return The path value as a string.
             */
            _buildPath(item: Item): string;
            private _initializeComputeds();
            private _paddingValue(parentContext);
            private _ensureItemInitialized(item);
            private _attachEvents();
            private _detachEvents();
            private _itemFormat(item);
            private _setTemplates();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Tree1\Tree.Focusable.d.ts
declare module "Viva.Controls/Controls/Lists/Tree1/Tree.Focusable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Tree = require("Viva.Controls/Controls/Lists/Tree1/Tree");
    export = Main;
    module Main {
        interface IFocusableExtension {
            /**
             * Gets the options of the plugin.
             */
            options: FocusableOptions;
        }
        interface FocusableOptions {
        }
        interface FocusableEventObject {
            /**
             * Focused row.
             */
            focused: Tree.Item;
        }
        interface FocusableItemMetadata extends Tree.ItemMetadata {
            /**
             * Indicates if the item is focused.
             */
            focused?: KnockoutObservableBase<boolean>;
        }
        class FocusableExtension extends Tree.Extension implements IFocusableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventKeyDown;
            private _eventItemExpand;
            private _eventMouseDown;
            private _options;
            private _lastTabbableItemMetadata;
            /**
             * Creates the focusable extension.
             *
             * @param options Options associated with the extension.
             */
            constructor(options?: FocusableOptions);
            /**
             * Gets the options of the plugin.
             */
            options: FocusableOptions;
            /**
             * See interface.
             */
            setInstance(instance: Tree.Widget): void;
            /**
             * See interface.
             */
            afterCreate(): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            defaultItemMetadataProperties(metadata: Tree.ItemMetadata): any;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            _getFocusDataBindAttribute(): string;
            _findPreviousFocusable(node: JQuery): JQuery;
            _findNextFocusable(node: JQuery): JQuery;
            _focusElement(node: JQuery): void;
            _focusNode(node: HTMLElement, item: Tree.Item, evt: JQueryEventObject): void;
            _focusNode(node: JQuery, item: Tree.Item, evt: JQueryEventObject): void;
            _getVisibleEnabledList(element: JQuery): JQuery;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Tree1\Tree.OnDemandLoadable.d.ts
declare module "Viva.Controls/Controls/Lists/Tree1/Tree.OnDemandLoadable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Tree = require("Viva.Controls/Controls/Lists/Tree1/Tree");
    export = Main;
    module Main {
        interface OnDemandItemMetadata extends Tree.ItemMetadata {
            /**
             * Specifies that the item should be loadable.
             * It only needs to be set to true when the item is loadable.
             * Otherwise, no need to set this value.
             * False value meant to be used internally which means it was loadable but now loading or loaded.
             */
            loadable?: KnockoutObservableBase<boolean>;
        }
        interface OnDemandEventObject {
            /**
             * Tree.Item being loaded. When loading is finished, items property needs to be filled with fetched items.
             */
            item: Tree.Item;
            /**
             * Path of the item being loaded. This is the identifier of the item.
             */
            path: string;
        }
        class OnDemandLoadableExtension extends Tree.Extension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventItemExpand;
            /**
             * Creates the on-demand loadable item extension.
             */
            constructor();
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            defaultItemMetadataProperties(metadata: Tree.ItemMetadata): any;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See parent.
             */
            getName(): string;
            private _observeChildrenRemoval(item);
            private _isExpandable(item);
            private _isExpanded(item);
            private _isCollapsed(item);
            private _isLoading(item);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Tree1\Tree.RightClickable.d.ts
declare module "Viva.Controls/Controls/Lists/Tree1/Tree.RightClickable" {
    import Tree = require("Viva.Controls/Controls/Lists/Tree1/Tree");
    export = Main;
    module Main {
        interface RightClickableEventObject {
            /**
             * Right clicked item.
             */
            item: Tree.Item;
            /**
             * Path of the item being right clicked.
             */
            path: string;
            /**
             * X position where right click happened.
             */
            clientX: number;
            /**
             * Y position where right click happened.
             */
            clientY: number;
        }
        class RightClickableExtension extends Tree.Extension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventRightClick;
            /**
             * Creates the right clickable extension.
             */
            constructor();
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Lists\Tree1\Tree.Selectable.d.ts
declare module "Viva.Controls/Controls/Lists/Tree1/Tree.Selectable" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import FocusableTree = require("Viva.Controls/Controls/Lists/Tree1/Tree.Focusable");
    import Tree = require("Viva.Controls/Controls/Lists/Tree1/Tree");
    export = Main;
    module Main {
        interface ISelectableExtension {
            /**
             * Gets the selected item.
             *
             * @return Selected item.
             */
            getSelected(): Tree.Item;
            /**
             * Unselects the currently selected item. Noop, if nothing selected.
             */
            unselect(): void;
            /**
             * Selects specified item in the treeView.
             *
             * @param item Data item to select.
             */
            select(item: Tree.Item): void;
        }
        interface SelectableItemMetadata extends FocusableTree.FocusableItemMetadata {
            /**
             * Indicates if the item is selected.
             */
            selected?: KnockoutObservableBase<boolean>;
            /**
             * Indicates if an item is selectable.
             */
            selectable?: KnockoutObservable<boolean>;
        }
        interface SelectableEventObject {
            /**
             * Selected item.
             */
            selected?: Tree.Item;
            /**
             * Unselected item.
             */
            unselected?: Tree.Item;
        }
        class SelectableExtension extends Tree.Extension implements ISelectableExtension {
            /**
             * Name of the extension.
             */
            static Name: string;
            private _eventClick;
            private _eventDoubleClick;
            private _eventKeyDown;
            /**
             * Creates the selectable row extension.
             *
             * @param options Options associated with the extension.
             */
            constructor();
            /**
             * See interface.
             */
            getSelected(): Tree.Item;
            /**
             * See interface.
             */
            select(item: Tree.Item): void;
            /**
             * See interface.
             */
            unselect(): void;
            /**
             * See interface.
             */
            setInstance(instance: Tree.Widget): void;
            /**
             * See interface.
             */
            afterSetTemplates(templateEngine: TemplateEngine.HtmlTemplateEngine): void;
            /**
             * See interface.
             */
            defaultItemMetadataProperties(metadata: Tree.ItemMetadata): any;
            /**
             * See interface.
             */
            afterAttachEvents(): void;
            /**
             * See interface.
             */
            getOrder(): number;
            /**
             * See interface.
             */
            getDependencies(): Tree.PluginExtension[];
            /**
             * See interface.
             */
            beforeDestroy(): void;
            /**
             * See parent.
             */
            getName(): string;
            private _findSelectedItem(items);
            private _changeSelection(rawNode, evt);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\LogStream.d.ts
declare module "Viva.Controls/Controls/LogStream" {
    import TextStream = require("Viva.Controls/Controls/TextStream");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        var LogItemTypeClassifiers: string[];
        interface Interface extends TextStream.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * Logs text.
             */
            log(text: string): void;
            /**
             * Logs item.
             */
            logItem(item: LogItem): void;
            /**
             * Logs items.
             */
            logItems(items: LogItem[]): void;
        }
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
        class ViewModel extends TextStream.ViewModel {
            /**
             * Controls display updating.
             */
            paused: KnockoutObservable<boolean>;
            /**
             * Current set of log item types to track and display.
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
             * Creates a LogStream view model.
             */
            constructor();
        }
        class Widget extends TextStream.Widget implements Interface {
            private _bufferSize;
            private _bufferItems;
            private _filterOutClassifiers;
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
            /**
             * Destroys the LogStream widget.
             */
            dispose(): void;
            /**
             * Gets the view model for the log stream.
             *
             * @return The view model.
             */
            options: ViewModel;
            /**
             * Clears the content of the display.
             */
            clear(): void;
            /**
             * Logs text.
             *
             * @param text The text to log.
             */
            log(text: string): void;
            /**
             * Logs item.
             *
             * @param item The item to log.
             */
            logItem(item: LogItem): void;
            /**
             * Logs items.
             *
             * @param items The items to log.
             */
            logItems(items: LogItem[]): void;
            /**
             * See base.
             * Overridden to classify as log item type text.
             */
            write(text: string): void;
            /**
             * See base.
             * Overridden to classify as log item type text.
             */
            writeLine(text: string): void;
            /**
             * See base.
             * Overridden to classify as log item type text.
             */
            writeText(info: TextStream.TextInfo): void;
            /**
             * See base.
             * Overridden to classify as log item type text.
             */
            writeTextArray(infos: TextStream.TextInfo[]): void;
            /**
             * See base.
             * Overridden to classify as log item type text.
             */
            writeTextLine(info: TextStream.TextInfo): void;
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * See base.
             * The LogStream overrides this to first trim items that are filtered out.
             */
            _trim(container: JQuery, amountToTrim: number): number;
            /**
             * Adds the log request to the buffer.
             *
             * @param info Text info of the log request.
             */
            private _bufferAdd(info);
            /**
             * Clears the buffered log requests.
             */
            private _bufferClear();
            /**
             * Commits buffered log requests to the display if not paused or disabled.
             */
            private _bufferWrite();
            /**
             * Handles changes to the log stream filters by removing existing filter classifiers
             * and applying new filter classifiers. The classifiers are changed simultaneously
             * to limit reflows to the display.
             *
             * @param filters List of LogItemType values indicating which entries should be shown.
             */
            private _onFilters(filters);
            /**
             * Handles changes to the paused state.
             */
            private _onPaused(paused);
            /**
             * Ensures the text is valid and ends with a line feed.
             *
             * @param text The input text string.
             * @return The sanitized text string.
             */
            private _text(text);
            /**
             * Converts a log item to a text info.
             *
             * @param item A log item.
             * @return A text info.
             */
            private _textInfoFromLogItem(item);
            /**
             * Converts a string to a text info.
             *
             * @param text A text string.
             * @return A text info with default classifier and emphasis.
             */
            private _textInfoFromString(text);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\MouseCompanion.d.ts
declare module "Viva.Controls/Controls/MouseCompanion" {
    import Positioning = require("Viva.Controls/Util/Positioning");
    export = Main;
    module Main {
        interface MouseCompanionOptions {
            /**
             * Forces the cursor to be a specific value.
             * If not specified, the cursor might change as the mouse move over different component of the page.
             * If multiple elements are added, the last forced cursor takes precedence.
             */
            forceCursor?: string;
            /**
             * Initial position where the element should be positioned.
             * If not provided, the element will be positioned on the next mouse move.
             */
            initialPosition?: Positioning.Position;
            /**
             * Position where the element should be placed.
             * The cursor size is considered as 16x16.
             * Defaults to RightBottom.
             */
            positionAlignment?: Positioning.PositioningAlignment;
            /**
             * Offset where the box should be. Can contain negative values.
             */
            offset?: Positioning.Position;
        }
        interface IMouseCompanion {
            /**
             * Adds the HTML element to follow the cursor.
             *
             * @param element HTML element to follow the cursor.
             * @param options Other options associated with the mouse companion.
             */
            add(element: HTMLElement, options?: MouseCompanionOptions): void;
            /**
             * Adds the JQuery element to follow the cursor. If the JQuery object contains multiple element, only the first one is taken.
             *
             * @param element JQuery element to follow the cursor.
             * @param options Other options associated with the mouse companion.
             */
            add(element: JQuery, options?: MouseCompanionOptions): void;
            /**
             * Removes the HTML element from the cursor.
             *
             * @param element HTML element that has been previously added to follow the cursor.
             */
            remove(element: HTMLElement): void;
            /**
             * Removes the JQuery element from the cursor.
             *
             * @param element JQuery element that has been previously added to follow the cursor. It doesn't have to be the same JQuery object.
             */
            remove(element: JQuery): void;
        }
        var MouseCompanion: IMouseCompanion;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Pager.d.ts
declare module "Viva.Controls/Controls/Pager" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface ResourceStrings {
            /**
             * The text "previous" shown when using the back arrow.
             */
            previous: string;
            /**
             * The text "next" shown when using the forward arrow.
             */
            next: string;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * Current page selected.
             */
            currentPage: KnockoutObservable<number>;
            /**
             * Total number of pages.
             */
            numberOfPages: KnockoutObservable<number>;
            /**
             * Maximum number of pages for a small pager. Big pager includes a textbox.
             */
            maxPages: KnockoutObservable<number>;
            /**
             * Resource Strings.
             */
            text: ResourceStrings;
        }
        class Widget extends Base.Widget implements Interface {
            private _pages;
            private _clickPageEventHandler;
            private _clickArrowPreviousEventHandler;
            private _clickArrowNextEventHandler;
            private _inputBlurEventHandler;
            private _textBoxViewModel;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _longPager;
            private _showArrows;
            private _initializeComputeds();
            private _attachEvents();
            private _detachEvents();
            private _isCurrentPage(page);
            private _isCurrentPageFirst();
            private _isCurrentPageLast();
            private _getDefaultResourceStrings();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Scrollbar.d.ts
declare module "Viva.Controls/Controls/Scrollbar" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        class ViewModel extends Base.ViewModel {
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
        /**
         * Changes the default style of a system scrollbar.
         * Your element will be wrapped inside two elements. In order to obtain the outer element, call the "widget" method.
         * No style are transferred between elements, you must use the following style on a parent element in order to get your visual style
         * working: margin, border, float, position, top/right/bottom/left.
         *
         * The scrollbar has two kind of refresh:
         * * refreshContent: will simply look if the scroll size changed and refresh the scrollbar handle
         * * refreshContainer: will reflow by destroying and re-creating the control and recalculate the whole size of your element
         *
         * refreshContent is faster than refreshContainer. If you know your control is not going to change in size, use refreshContent.
         * On a window.resize, refreshContainer is automatically called by default.
         */
        class Widget extends Base.Widget {
            private _widget;
            private _scrollableArea;
            private _overflowProperties;
            private _sizeProperties;
            private _scrollingObjectCache;
            private _trackEnter;
            private _minimumScrollbarSize;
            private _bars;
            private _ratio;
            private _resizeHandler;
            private _scrollbarSize;
            private _refreshingContainer;
            private _focusInTimeoutHandle;
            private _resizeTracking;
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
            /**
             * Destroys the scrollbar widget.
             */
            dispose(): void;
            /**
             * Get view model driving this widget.
             *
             * @return ViewModel.
             */
            options: ViewModel;
            /**
             * Gets the element's widget.
             *
             * @return JQuery object representing the widget.
             */
            widget(): JQuery;
            /**
             * Refreshes the scroll handles by looking at the content scroll sizes.
             */
            refreshContent(): void;
            /**
             * Refreshes the whole element by destroying and re-creating the widget.
             * This call is significantly slower than using refreshContent.
             */
            refreshContainer(): void;
            /**
             * Gets the current vertical position of the scrollbar.
             *
             * @return Current vertical position of the scrollbar in pixel.
             */
            scrollTop(): number;
            /**
             * Sets the current vertical position of the scrollbar.
             *
             * @param value Vertical position in pixel.
             */
            scrollTop(value: number): void;
            /**
             * Gets the current horizontal position of the scrollbar.
             *
             * @return Current horizontal position of the scrollbar in pixel.
             */
            scrollLeft(): number;
            /**
             * Sets the current horizontal position of the scrollbar.
             *
             * @param value Horizontal position in pixel.
             */
            scrollLeft(value: number): void;
            /**
             * Scrolls the element into view. You can optionally align with top or left based on the scroll area.
             * By default, the element is scrolled to align with the top and left of the scroll area.
             *
             * @param element jQuery selector.
             * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
             * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
             */
            scrollIntoView(element: string, alignWithTop?: boolean, alignWithLeft?: boolean): void;
            /**
             * @param element JQuery Element.
             * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
             * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
             */
            scrollIntoView(element: JQuery, alignWithTop?: boolean, alignWithLeft?: boolean): void;
            /**
             * @param element DOMElement.
             * @param alignWithTop Indicates to align the element to the top, otherwise aligns to bottom. Defaults to true.
             * @param alignWithLeft Indicates to align the element to the left, otherwise aligns to right. Defaults to true.
             */
            scrollIntoView(element: Element, alignWithTop: boolean, alignWithLeft: boolean): void;
            scrollIntoView(element: EventTarget, alignWithTop: boolean, alignWithLeft: boolean): void;
            private _setRefreshContainerOnResize();
            private _setAutoRefreshContent();
            private _getScrollbarSize(widget?);
            private _portScroll(callback);
            private _createOrUpdateTracks(recalculateHandleSize?);
            private _createOrUpdateTrack(kind, recalculateHandleSize?);
            private _createTrack(kind);
            private _detachScrollable();
            private _attachScrollable();
            private _setExtrasPosition();
            private _setExtraPosition(extra, kind);
            private _wrapElement();
            private _attachWidgetEvents();
            private _resetWidgetScrollPosition();
            private _getVisibilityStatus(element);
            private _eraseOverflowProperties(from);
            private _eraseSizeProperties(from);
            private _getScrollingObject(recalculate?);
            private _isVerticalScrolling(overflowY);
            private _isHorizontalScrolling(overflowX);
            private _isScrolling(overflow, kind);
            private _setHandlePosition(handle, kind);
            private _setHandleSize(handle, doubleTrack, kind);
            private _getHandleHandler(that, calls);
            private _getTrackHandler(that, kind);
            private _resize();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Settings.d.ts
declare module "Viva.Controls/Controls/Settings" {
    import ItemList = require("Viva.Controls/Controls/Base/ItemList");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        var LabelClasses: {
            Large: string;
            Small: string;
        }, ValueClasses: {
            Large: string;
            Small: string;
        };
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface SettingText extends ItemList.Label {
            /**
             * uri Setting image uri.
             */
            uri?: KnockoutObservable<string>;
        }
        class SettingTextItem implements SettingText {
            /**
             * Text Setting Item.
             */
            text: KnockoutObservable<string>;
            /**
             * item is disabled.
             */
            disabled: KnockoutObservable<boolean>;
            /**
             * uri Setting image uri.
             */
            uri: KnockoutObservable<string>;
            constructor(text: string, disabled?: boolean, uri?: string);
            constructor(object: Object);
            /**
             * Populates the view model from a key/value pairs object.
             * The keys should map to properties on the view model.
             * The values are applied to the corresponding keys.
             *
             * @param object An un-typed object with values to populate on the view model.
             */
            populateFromObject(object: Object): void;
        }
        interface SettingGroup<L, V> {
            /**
             * label Setting label.
             */
            label?: L;
            /**
             * value Setting value.
             */
            value?: V;
        }
        class SettingGroupItem implements SettingGroup<SettingText, SettingText> {
            /**
             * label Setting label.
             */
            label: SettingText;
            /**
             * value Setting value.
             */
            value: SettingText;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * The list of settings and values.
             * Each item in the array is an object with two properties label and value.
             * The label and value properties could either be a string or an object with a property named uri.
             */
            items: KnockoutObservableArray<SettingGroup<any, any>>;
            /**
             * The CSS class for the value of each setting.
             */
            valueClass: KnockoutObservable<string>;
            /**
             * The CSS class for the label of each setting.
             */
            labelClass: KnockoutObservable<string>;
            /**
             * The maximum number of items rendered.
             */
            maxItems: KnockoutObservable<number>;
            /**
             * A value indicating whether or not to swap the positions of the label and value in the item.
             */
            swapLabelValuePositions: KnockoutObservable<boolean>;
        }
        class Widget extends Base.Widget implements Interface {
            private _templateEngine;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _disableCssClass(disabled);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\SingleSetting.d.ts
declare module "Viva.Controls/Controls/SingleSetting" {
    import Positioning = require("Viva.Controls/Util/Positioning");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import DockedBalloon = require("Viva.Controls/Controls/DockedBalloon");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * The value of the setting.
             */
            value: KnockoutObservableBase<string>;
            /**
             * The unit of the setting.
             */
            unit: KnockoutObservableBase<any>;
            /**
             * Unit alignment. Currently only support Right or Left.
             * Defaults to Right.
             */
            unitAlignment: KnockoutObservableBase<Positioning.Alignment>;
            /**
             * The caption of the setting.
             */
            caption: KnockoutObservableBase<string>;
            /**
             * Caption alignment. Currently only support Top or Bottom.
             * Defaults to Bottom.
             */
            captionAlignment: KnockoutObservableBase<Positioning.Alignment>;
            /**
             * Shows an info balloon displaying the help content
             */
            infoBalloon: KnockoutObservableBase<DockedBalloon.ViewModel>;
        }
        class Widget extends Base.Widget implements Interface {
            private _captionAtTop;
            private _unitAtLeft;
            private _imageAltText;
            private _captionExists;
            private _unitExists;
            private _valueExists;
            private _infoBalloonExists;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _initializeComputeds(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\TextStream.d.ts
declare module "Viva.Controls/Controls/TextStream" {
    import Command = require("Viva.Controls/Controls/Base/Command");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        class Classifiers {
            /**
             * No color classification.
             */
            static None: string;
            /**
             * Black color classification.
             */
            static Black: string;
            /**
             * Gray color classification.
             */
            static Gray: string;
            /**
             * Silver color classification.
             */
            static Silver: string;
            /**
             * White color classification.
             */
            static White: string;
            /**
             * Maroon color classification.
             */
            static Maroon: string;
            /**
             * Red color classification.
             */
            static Red: string;
            /**
             * Olive color classification.
             */
            static Olive: string;
            /**
             * Lime color classification.
             */
            static Lime: string;
            /**
             * Green color classification.
             */
            static Green: string;
            /**
             * Aqua color classification.
             */
            static Aqua: string;
            /**
             * Teal color classification.
             */
            static Teal: string;
            /**
             * Blue color classification.
             */
            static Blue: string;
            /**
             * Navy color classification.
             */
            static Navy: string;
            /**
             * Fuchsia color classification.
             */
            static Fuchsia: string;
            /**
             * Purple color classification.
             */
            static Purple: string;
            /**
             * Yellow color classification.
             */
            static Yellow: string;
        }
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
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
            /**
             * Writes the specified text to the display.
             *
             * @param text The text to display.
             */
            write(text: string): void;
            /**
             * Writes the specified text to the display with a termination line feed.
             *
             * @param text The text to display.
             */
            writeLine(text: string): void;
            /**
             * Writes the specified text info to the display.
             *
             * @param info The text info to display.
             */
            writeText(info: TextInfo): void;
            /**
             * Writes the specified text info to the display with a termination line feed.
             *
             * @param info The text info to display.
             */
            writeTextLine(info: TextInfo): void;
            /**
             * Writes the specified text infos to the display.
             *
             * @param infos Array of text information to display.
             */
            writeTextArray(infos: TextInfo[]): void;
            /**
             * Updates the size of the text stream to fit the container.
             */
            refreshContainer(): void;
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
        class ViewModel extends Base.ViewModel {
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
             * Clears the display.
             */
            clear: Command.ViewModel;
            /**
             * Indicates if the text area should display scrollbars as needed.
             */
            scrollbars: boolean;
            constructor();
        }
        class Widget extends Base.Widget implements Interface {
            private _containerElement;
            private _scrollbar;
            private _updatingScrollbar;
            private _clickHandler;
            private _textSize;
            private _spanWriter;
            private _trimPercent;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * Clears the content of the control
             */
            clear(): void;
            /**
             * Updates the size of the text stream to fit the container.
             */
            refreshContainer(): void;
            /**
             * Updates the UI to be in sync with the latest changes.
             *
             * @param scroll Indicates if the scrollbars should be updated.
             */
            update(scroll?: boolean): void;
            /**
             * Writes the specified text to the display.
             *
             * @param text The text to display.
             */
            write(text: string): void;
            /**
             * Writes the specified text to the display with a termination line feed.
             *
             * @param text The text to display.
             */
            writeLine(text: string): void;
            /**
             * Writes the specified text info to the display.
             *
             * @param info The text info to display.
             */
            writeText(info: TextInfo): void;
            /**
             * Writes the specified text infos to the display.
             *
             * @param infos Array of text information to display.
             */
            writeTextArray(infos: TextInfo[]): void;
            /**
             * Writes the specified text info to the display with a termination line feed.
             *
             * @param info The text info to display.
             */
            writeTextLine(info: TextInfo): void;
            /**
             * See base.
             */
            _initializeSubscriptions(viewModel: ViewModel): void;
            /**
             * Trims the overflown display.
             *
             * @param container The container with the text elements to trim.
             * @param amountToTrim The amount of text being requested to trim.
             * @return The actual amount trimmed.
             */
            _trim(container: JQuery, amountToTrim: number): number;
            /**
             * Trims within the set of elements from the display from start towards end.
             *
             * @param elements The elements to trim from in order.
             * @param amountToTrim The amount of text being requested to trim.
             * @return The actual amount trimmed.
             */
            _trimElements(elements: JQuery, amountToTrim: number): number;
            /**
             * Writes out the text information but does not update the ui.
             * This is the common function that all writes go through.
             *
             * @param text The text to display.
             * @param lineFeed Indicates if a linefeed should be added to the text.
             * @param classifier The classifier to apply to the text.
             * @param emphasis The emphasis to apply to the text.
             */
            _write(text: string, lineFeed: boolean, classifier: string, emphasis: Emphasis): void;
            /**
             * Handles click event.
             *
             * @param evt The event object.
             */
            private _click(evt);
            /**
             * Handles changes to the buffer max size.
             *
             * @param max The new max.
             */
            private _onMax(max);
            /**
             * Handles changes to the wrap setting.
             *
             * @param wrap The new wrap value.
             */
            private _onWrap(wrap);
            /**
             * Updates the scrollbars to be in sync with latest content.
             */
            private _updateScrollbar();
            /**
             * Updates the scrollbars if an update has been requested and not processed.
             */
            private _updateScrollbarHandler();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ClickableLink.d.ts
declare module "Viva.Controls/Controls/Toolbars/ClickableLink" {
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\CommandButton.d.ts
declare module "Viva.Controls/Controls/Toolbars/CommandButton" {
    import ExecutableButtonBase = require("Viva.Controls/Controls/Toolbars/ExecutableButtonBase");
    import ToolbarItemType = require("Viva.Controls/Controls/Toolbars/ToolbarItemType");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarButton = require("Viva.Controls/Controls/Toolbars/ToolbarButton");
    export = Main;
    module Main {
        interface Interface<T> extends ExecutableButtonBase.Interface<T> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<T>;
        }
        class ViewModel<T> extends ExecutableButtonBase.ViewModel<T> {
            /**
             * The context to pass on to the command.
             */
            commandContext: KnockoutObservable<T>;
            /**
             * Creates an executable button.
             *
             * @param type The type of the button.
             */
            constructor(type?: ToolbarItemType.ToolbarItemType);
        }
        class Widget<T> extends ToolbarButton.Widget implements Interface<T> {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel<T>, createOptions?: Base.CreateOptions);
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
            options: ViewModel<T>;
            /**
             * See base.
             */
            _isDisabled(): boolean;
            /**
             * See base.
             */
            _onClick(element: JQuery, evt: JQueryEventObject): void;
            /**
             * Command execution state will be used to show the disabled styling.
             * Users can toggle canExecute during long async command operation.
             */
            _canExecute(): boolean;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ExecutableButtonBase.d.ts
declare module "Viva.Controls/Controls/Toolbars/ExecutableButtonBase" {
    import ToolbarButton = require("Viva.Controls/Controls/Toolbars/ToolbarButton");
    import Command = require("Viva.Controls/Controls/Command");
    import ToolbarItemType = require("Viva.Controls/Controls/Toolbars/ToolbarItemType");
    export = Main;
    module Main {
        interface Interface<T> extends ToolbarButton.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<T>;
        }
        class ViewModel<T> extends ToolbarButton.ViewModel {
            /**
             * See interface.
             */
            command: Command.Command<T>;
            /**
             * Creates an executable button.
             *
             * @param type The type of the button.
             */
            constructor(type: ToolbarItemType.ToolbarItemType);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\OpenLinkButton.d.ts
declare module "Viva.Controls/Controls/Toolbars/OpenLinkButton" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarButton = require("Viva.Controls/Controls/Toolbars/ToolbarButton");
    import ClickableLink = require("Viva.Controls/Controls/Toolbars/ClickableLink");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToggleCommandButton.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToggleCommandButton" {
    import ExecutableButtonBase = require("Viva.Controls/Controls/Toolbars/ExecutableButtonBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarButton = require("Viva.Controls/Controls/Toolbars/ToolbarButton");
    import ToolbarItem = require("Viva.Controls/Controls/Toolbars/ToolbarItem");
    export = Main;
    module Main {
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
        interface Interface<T> extends ExecutableButtonBase.Interface<ToggleButtonContext<T>> {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<T>;
        }
        class ViewModel<T> extends ExecutableButtonBase.ViewModel<ToggleButtonContext<T>> {
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
            /**
             * This callback should be used when the toggle button belongs to options group and its state change will impact other toggle buttons in the group.
             * The primary usage of the callback is to control the UI state of the toggle buttons when the current button state changes.
             */
            onStateChangeCallback: (currentItem: ToolbarItem.ToolbarItemContract, checked: boolean) => void;
            constructor();
        }
        class Widget<T> extends ToolbarButton.Widget implements Interface<T> {
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param createOptions The creation options.
             */
            constructor(element: JQuery, options: ViewModel<T>, createOptions?: Base.CreateOptions);
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
            options: ViewModel<T>;
            /**
             * See base.
             */
            _initializeComputeds(): void;
            /**
             * See base.
             */
            _isDisabled(): boolean;
            /**
             * See base.
             */
            _onClick(element: JQuery, evt: JQueryEventObject): void;
            /**
             * Command execution state will be used to show the disabled styling.
             * Users can toggle canExecute during long async command operation.
             */
            _canExecute(): boolean;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\Toolbar.d.ts
declare module "Viva.Controls/Controls/Toolbars/Toolbar" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarItem = require("Viva.Controls/Controls/Toolbars/ToolbarItem");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarButton.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarButton" {
    import ToolbarItemType = require("Viva.Controls/Controls/Toolbars/ToolbarItemType");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarItem = require("Viva.Controls/Controls/Toolbars/ToolbarItem");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarGroup.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarGroup" {
    import ToolbarGroupType = require("Viva.Controls/Controls/Toolbars/ToolbarGroupType");
    import ToolbarItem = require("Viva.Controls/Controls/Toolbars/ToolbarItem");
    export = Main;
    module Main {
        /**
         * Defines a group in the toolbar.
         */
        interface ToolbarGroupContract extends ToolbarItem.ToolbarItemContract {
            /**
             * Group type defines the behavior of the items in the group. Group can be just logical grouping of items or have radio group like behavior.
             */
            groupType: ToolbarGroupType.ToolbarGroupType;
            /**
             * The items in the group.
             */
            items: KnockoutObservableArray<ToolbarItem.ToolbarItemContract>;
        }
        /**
         * See interface.
         */
        class ToolbarGroup extends ToolbarItem.ToolbarItem implements ToolbarGroupContract {
            /**
             * See interface.
             */
            groupType: ToolbarGroupType.ToolbarGroupType;
            /**
             * See interface.
             */
            items: KnockoutObservableArray<ToolbarItem.ToolbarItemContract>;
            constructor(groupType?: ToolbarGroupType.ToolbarGroupType);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarGroupType.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarGroupType" {
    export = Main;
    module Main {
        /**
         * The type of the toolbar group.
         */
        enum ToolbarGroupType {
            /**
             * Default group
             */
            None = 0,
            /**
             * Group has a collection of toggle button items which behave like radio group.
             */
            OptionsGroup = 1,
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarItem.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarItem" {
    import ToolbarItemType = require("Viva.Controls/Controls/Toolbars/ToolbarItemType");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Defines an item in the toolbar.
         */
        interface ToolbarItemContract {
            /**
             * The type of the toolbar item.
             */
            type: ToolbarItemType.ToolbarItemType;
            /**
             * A value indicating whether or not the toolbar item is disabled.
             */
            disabled: KnockoutObservableBase<boolean>;
            /**
             * A value indicating whether or not the toolbar item is shown or hidden.
             */
            visible: KnockoutObservableBase<boolean>;
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
        class ToolbarItem extends Base.ViewModel implements ToolbarItemContract {
            /**
             * See interface.
             */
            type: ToolbarItemType.ToolbarItemType;
            /**
             * See interface.
             */
            visible: KnockoutObservable<boolean>;
            /**
             * See interface.
             */
            unauthorizedMessage: KnockoutObservable<string>;
            /**
             * Creates a toolbar item.
             */
            constructor(type: ToolbarItemType.ToolbarItemType);
            /**
             * See interface.
             */
            unauthorized(message?: string): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarItemType.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarItemType" {
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Toolbars\ToolbarOptionsGroup.d.ts
declare module "Viva.Controls/Controls/Toolbars/ToolbarOptionsGroup" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ToolbarGroup = require("Viva.Controls/Controls/Toolbars/ToolbarGroup");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends ToolbarGroup.ToolbarGroup {
            /**
             * The options group name associated with the collection of toggle buttons.
             */
            optionGroupName: string;
            /**
             * Creates a new view model instance for options group Widget.
             *
             * @param optionsGroupName The unique group name for the options group.
             */
            constructor(optionGroupName: string);
        }
        class Widget extends Base.Widget implements Interface {
            private _templateEngine;
            private _items;
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
            private _initializeComputeds();
            private _onCheckedStateChangeCallback(currentItem, checked);
            private _getItemTemplateName(item);
            private _setTemplates();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\AreaChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/AreaChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import ChartViewImpl = require("Viva.Controls/Controls/Visualization/ChartViewImpl");
    export = Main;
    module Main {
        /**
         * Area chart series view implementation.
         */
        class AreaChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
            _renderSeries(): void;
            _createSelectedPlots(sourceElement: D3.Selection): D3.Selection;
            _createHoveredPlots(sourceElement: D3.Selection, hoveredChartItems: ChartBase.ChartItem<TX, TY>[]): void;
        }
        /**
         * Area chart view implementation.
         */
        class AreaChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
            _view: ChartBase.AreaChartView<TX, TY>;
            /**
             * Creates a new instance of the View Implementation.
             */
            constructor(areaChartView: ChartBase.AreaChartView<TX, TY>);
            /**
             * Destroys the view.
             */
            dispose(): void;
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): AreaChartSeriesViewImpl<TX, TY>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\BarChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/BarChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import StackedChartViewImpl = require("Viva.Controls/Controls/Visualization/StackedChartViewImpl");
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        class BarChartSeriesViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartSeriesViewImpl<TX, TY> {
            /**
             * Attaches computed to the items element.
             *
             * @param chartItemElement The items element selection.
             */
            _attachItemsComputeds(chartItemElement: D3.Selection): void;
            /**
             * Attaches computed to the series element.
             *
             * @param seriesElement The series element selection.
             */
            _attachSeriesComputeds(seriesElement: D3.Selection): void;
            private _checkElementBelongsToChartItems(chartItemElement, chartItems);
        }
        /**
         * Bar chart view implementation.
         * Supports stacked, grouped and split bar chart rendering.
         */
        class BarChartViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartViewImpl<TX, TY> {
            _view: ChartBase.BarChartView<TX, TY>;
            private _bars;
            private _barScale;
            private _barWidth;
            private _barWidthOffset;
            private _groupedBarWidth;
            private _step;
            /**
             * Creates a new instance of the View Implementation.
             *
             * @param barChartView The bar chart view to be implemented.
             */
            constructor(barChartView: ChartBase.BarChartView<TX, TY>);
            /**
             * Initializes the view.
             */
            init(lifetimeManager: DisposableBase.LifetimeManager): void;
            /**
             * Destroys the view.
             */
            dispose(): void;
            /**
             * Returns a subset of series closest (at the left hand side) to the xCoordinate.
             *
             * @param xCoordinate The x-axis coordinate.
             * @return The subset of series and their chart items.
             */
            getXSliceSeriesSubset(xCoordinate: number, withinRange: number, rangeAdjustment?: number): ChartBase.SeriesSubset<TX, TY>[];
            _render(): void;
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): BarChartSeriesViewImpl<TX, TY>;
            private _barMouseEnter(eventData, allBarsEventData?);
            private _barMouseLeave(eventData, allBarsEventData?);
            private _barMouseClick(eventData, allBarsEventData?);
            private _eventHandlerWrapper(eventType, d, i);
            _initializeChartData(): void;
            private _getXOffset(d, isHorizontal?);
            private _getEventData(d, i);
            private _initializeBarSize();
            private _renderStackedBarChart();
            private _renderGroupedBarChart();
            private _renderSplitBarChart();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\BarGauge.d.ts
declare module "Viva.Controls/Controls/Visualization/BarGauge" {
    import GaugeBase = require("Viva.Controls/Controls/Visualization/GaugeBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends GaugeBase.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface ThresholdData extends GaugeBase.ThresholdData {
        }
        interface RadiusSetting extends GaugeBase.RadiusSetting {
        }
        interface BarGroupData {
            /**
             * Top percentage
             */
            top: KnockoutObservableBase<string>;
            /**
             * Height percentage
             */
            height: KnockoutObservableBase<string>;
        }
        interface BarRangeData extends BarGroupData {
            /**
             * Width percentage
             */
            width: KnockoutObservableBase<string>;
            /**
             * Left percentage
             */
            left: KnockoutObservableBase<string>;
            /**
             * CSS class for this SVGPath
             */
            cssClass?: KnockoutObservableBase<string>;
            /**
             * ThresholdData for events.
             */
            data?: ThresholdData;
        }
        class Events extends GaugeBase.Events {
        }
        class ViewModel extends GaugeBase.ViewModel {
            /**
             * Thresholds.
             */
            thresholds: KnockoutObservableArray<ThresholdData>;
            /**
             * Max for the gauge to project.
             */
            max: KnockoutObservableBase<number>;
            /**
             * Current value.
             */
            current: KnockoutObservableBase<number>;
            /**
             * Enables thresholdsBar.
             */
            thresholdsBarEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsBar settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the thickness of the thresholds bar.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables thresholdsLine.
             */
            thresholdsLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the thresholds Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsLineSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBar.
             */
            currentBarEnabled: KnockoutObservableBase<boolean>;
            /**
              * CurrentBarRing Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarRingSettings: KnockoutObservable<RadiusSetting>;
            /**
              * CurrentBar Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBarRing.
             */
            currentBarRingEnabled: KnockoutObservableBase<boolean>;
            /**
             * Enables currentLine.
             */
            currentLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * CurrentLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the current Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            currentLineSettings: KnockoutObservableBase<RadiusSetting>;
            /**
             * Start label.
             */
            startLabel: string;
            /**
             * Position the label relative to the center.
             */
            startLabelSetting: number;
            /**
             * Max label.
             */
            maxLabel: string;
            /**
             * Max icon.
             */
            maxIcon: string;
            /**
             * Start Icon.
             */
            startIcon: string;
            /**
             *   Position the icon relative to the center.
             */
            startIconSetting: number;
            /**
             * Events supported by the control.
             */
            events: Events;
            /**
             * Custom class for the control to allow for scoping custom styles.
             */
            cssClass: KnockoutObservable<string>;
        }
        class Widget extends GaugeBase.Widget implements Interface {
            private _thresholdsBarData;
            private _thresholdsBarGroupData;
            private _currentBarData;
            private _currentBarGroupData;
            private _cssClasses;
            private _prevThresholds;
            private _prevSortedThresholds;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private static createGroupBarData(originalSettings);
            private static fillBarRangeData(source, dest);
            private setupComputed_thresholdsBarData();
            private setupComputed_currentBarData();
            _initializeComputeds(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Chart.d.ts
declare module "Viva.Controls/Controls/Visualization/Chart" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import ChartViewImpl = require("Viva.Controls/Controls/Visualization/ChartViewImpl");
    export = Main;
    module Main {
        class Widget<TX, TY> extends ChartBase.Widget<TX, TY> implements ChartBase.Interface<TX, TY> {
            private _internalViewImplsArray;
            private _internalViewImplsArrayIsCurrent;
            private _internalSeriesIndexDictionary;
            private _xSliceHoverCoordinate;
            private _xSliceHoverTrackComputed;
            private _xSliderCoordinateSubscription;
            private _inRenderXSliceHover;
            private _chartDataImmediateUpdated;
            private _chartDataImmediateUpdatedCounter;
            private _xSliderSvg;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ChartBase.ViewModel<TX, TY>, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ChartBase.ViewModel<TX, TY>;
            /**
             * Toggles the series selection in the viewModel.
             *
             * @param chartViewIndex The chartViewIndex to be toggled in the selection.
             * @param seriesViewIndex The seriesIndex to be toggled in the selection.
             * @param chartItem The chart item to be toggled in the selection.
             */
            toggleSeriesSelection(chartViewIndex: number, seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>): void;
            /**
             * get SeriesName given the index and seriesView.
             *
             * @param chartViewIndex The chartViewIndex to be toggled in the selection.
             * @param seriesViewIndex The seriesIndex to be toggled in the selection.
             * @return seriesName
             */
            getSeriesName(chartViewIndex: number, seriesViewIndex: number): string;
            /**
             * get seriesIndex given the seriesViewIndex and seriesView.
             *
             * @param chartViewIndex The chartViewIndex to be toggled in the selection.
             * @param seriesViewIndex The seriesViewIndex to be toggled in the selection.
             * @return seriesIndex
             */
            getSeriesIndexForSeriesViewIndex(chartViewIndex: number, seriesViewIndex: number): number;
            /**
             * get seriesViews given the seriesIndex and viewIndex.
             *
             * @param chartViewIndex The chartViewIndex to search in.
             * @param seriesIndex The seriesIndex to be searched.
             * @return seriesViews
             */
            getSeriesViewsForSeriesIndex(chartViewIndex: number, dataSeriesIndex: number): ChartViewImpl.SeriesViewImpl<TX, TY>[];
            /**
             * Sets the series hover in the viewModel for a specific series.
             *
             * @param chartViewIndex The chartViewIndex to be toggled in the selection.
             * @param seriesViewIndex The seriesIndex to be toggled in the selection.
             * @param chartItem The chart item to be toggled in the selection.
             * @param hovered The requested hover state.
             */
            setSeriesHover(chartViewIndex: number, seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>, hovered: boolean): void;
            /**
             * Returns the series index by the series name.
             *
             * @param seriesName The series name.
             * @return The series index.
             */
            getSeriesIndexBySeriesName(seriesName: string): number;
            /**
             * Returns the axis index of the x-axis mapped to the series.
             *
             * @param seriesIndex The series index.
             * @return The axis index.
             */
            getXAxisIndexBySeriesIndex(seriesIndex: number): number;
            /**
             * Returns the axis index of the y-axis mapped to the series.
             *
             * @param seriesIndex The series index.
             * @return The axis index.
             */
            getYAxisIndexBySeriesIndex(seriesIndex: number): number;
            /**
             * Renders the x-slice hover and projections.
             *
             * @param xCoordinate The x-coordinate used for the time slice.
             */
            _renderXSliceHover(xCoordinate: number): void;
            /**
             * Cleans the x-slice hover and projections.
             */
            _cleanXSliceHover(preserveSeriesHovers?: boolean): void;
            _init(): void;
            _render(): void;
            /**
             * The method is invoked whenever the input series data is updated.
             */
            _onChartDataUpdated(): void;
            /**
             * See parent.
             */
            _onChartSizeUpdated(): void;
            /**
             * See parent.
             */
            _plotAreaMouseEnter(): void;
            /**
             * See parent.
             */
            _plotAreaMouseMove(): void;
            /**
             * See parent.
             */
            _plotAreaMouseLeave(): void;
            /**
             * See parent.
             */
            _plotAreaClick(): void;
            _cleanup(): void;
            _checkForChartUpdate(): boolean;
            _getXSliderCoordinate: KnockoutObservableBase<number>;
            /**
             * Handles mouse move event.
             */
            _mouseMoveHandler(): void;
            /**
             * Handles mouse out event.
             */
            _mouseOutHandler(event?: MouseEvent): void;
            private _seriesIndexDictionary;
            private _viewImplsArray;
            private _immediateSeriesUpdated();
            private _reInitViewImplArray();
            private static _checkForUpdateSeriesView<TX, TY>(seriesView);
            private static _checkForUpdateDataLabels<TX, TY>(dataLabels);
            private static _checkForUpdateRenderingConditions(renderingConditions);
            private _applyWithCoordinates(func);
            /**
             * gets the mouse position given the element.
             *
             * @param elem optional element to get coordinate from.  Default to this._chartSvg.node().
             */
            private _getCoordinates(elem?);
            private _checkForNoData();
            private static _createSeriesDictionary<TX, TY>(seriesArray);
            private _renderXSlice(xCoordinate, preserveSeriesHovers?);
            private _createXAxisSliceHover(xCoordinate);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\ChartBase.d.ts
declare module "Viva.Controls/Controls/Visualization/ChartBase" {
    import Hatching = require("Viva.Controls/Util/Hatching");
    import UnitConversion = require("Viva.Controls/Util/UnitConversion");
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
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
             * The series interpolation when data points are connected by strainght lines.
             */
            Linear = 0,
            /**
             * The series interpolation when data points are connected by smooth curves. The monotone is a mode of D3 interpolaion style.
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
             * Display stacked area chart line with the coordinate point nearest to x slider only.
             */
            ShowLineWithXHoverPoint = 2,
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
             * Opt out XSlider callout Text
             */
            XSlider_noCallout,
            /**
             * Opt out any interaction in ChartArea
             */
            ChartArea_Off,
            /**
             * Opt out any ChartArea Click-select behavior
             */
            ChartArea_noClick,
            /**
             * Opt out any ChartArea hover behavior
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
         * Secifies the scale used on the axis.
         */
        enum Scale {
            /**
             * Specify this scale for discrete values where the values will be mapped 1:1 on the axis.
             */
            Ordinal = 0,
            /**
             * Specify this scale for continous values like numeric values in the series which may or may not be sorted.
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
         * Defines the event data associated with chart event notifications.
         */
        interface EventData<TX, TY> {
            /**
             * Name of the series.
             */
            seriesName: string;
            /**
             * The vlaue of the current target element.
             */
            value: ChartItem<TX, TY>;
        }
        /**
         * See parent.
         */
        interface Interface<TX, TY> extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel<TX, TY>;
        }
        /**
         * This class specifies data label properties.
         */
        class DataLabel<TX, TY> {
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
        class CustomDataLabel<TX, TY> extends DataLabel<TX, TY> {
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
         * This class specifies the chart axis properties.
         */
        class Axis<T> {
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
             * Number values will be represented with specified numeric precision and can be tranformed to string with a formatter to represent say units.
             * String values can be transformed to a different label value using the formatter.
             * Date values will be transformed to the specified outputDateFormat.
             */
            displayLabelFormatter: KnockoutObservableBase<string>;
            /**
             * Specify the axis label formatter which will be used to display the axis values.
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
            constructor(position?: AxisPosition, scale?: Scale);
        }
        /**
         * Defines a contract for spans such as time spans or number spans. It is used to provide a uniform substraction operation for numbers and for dates used in uniform series.
         */
        interface SpanContract<T> {
        }
        /**
         * Defines the date span used for substraction date/time intervals from dates.
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
         * Defines the date span used for substraction numbers from numbers. Need to provide a uniform interface of setting spans at uniform series.
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
        class SeriesBase {
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
         * This class defines the chart input data for a single series and its associated axis.
         */
        class Series<TX, TY> extends SeriesBase {
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
        class UniformSeries<TX, TY> extends SeriesBase {
            /**
             * The type of the series.
             */
            type: KnockoutObservable<SeriesType>;
            /**
             * The start (smallest) x-value of the series.
             */
            startXValue: KnockoutObservable<TX>;
            /**
             * The span between two x neighbor x values.
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
        * This class defines the chart input data for a line series and its associated axis.
        */
        class LineSeries<T> extends SeriesBase {
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
         * Defines utilities methods working with series.
         */
        class SeriesUtilities {
            /**
             * Returns chart items filtered by the data label.
             *
             * @param uniformSeries The uniform series.
             * @param dataLabel The data label.
             * @return The chart item array.
             */
            static getChartItemsByDataLabelAndSeries<TX, TY>(seriesBase: SeriesBase, dataLabel: DataLabel<TX, TY>): ChartItem<TX, TY>[];
            /**
             * Returns the n-th x-value of the uniform chart series.
             *
             * @param uniformSeries The uniform series.
             * @param numberOfSpans The item number.
             * @return The n-th x-value.
             */
            static getNthXValueOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>, n: number): TX;
            /**
             * Creates an array of x-value of the unform series.
             *
             * @param uniformSeries The uniform series.
             * @return The x-values array.
             */
            static createXValuesArray<TX, TY>(uniformSeries: UniformSeries<TX, TY>): TX[];
            /**
             * Returns the last x-value of the uniform series.
             *
             * @param uniformSeries The uniform series.
             * @return The last x-value.
             */
            static getLastXValueOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>): TX;
            /**
             * Returns the n-th chart item of the uniform series.
             *
             * @param uniformSeries The uniform series.
             * @param n The item number.
             * @return The chart item.
             */
            static getNthChartItemOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>, n: number): ChartItem<TX, TY>;
            /**
             * Returns the last chart item of the uniform series.
             */
            static getLastChartItemOfUniformSeries<TX, TY>(uniformSeries: UniformSeries<TX, TY>): ChartItem<TX, TY>;
            /**
             * Creates a chart item array of the uniform series.
             *
             * @param uniformSeries The uniform series.
             * @return The chart item array.
             */
            static createChartItemArray<TX, TY>(uniformSeries: UniformSeries<TX, TY>): ChartItem<TX, TY>[];
            /**
             * Returns the number of values within the extent separated with the span.
             *
             * @param extent The interval defined by min and max values.
             * @param span The span used for iterating over the interval.
             * @return The whole number of items separated with the span that can be put on the extent interval.
             */
            static getCountOfValues<T>(extent: Extent<T>, span: SpanContract<T>): number;
            /**
             * Compares spans provided.
             *
             * @param span1 The first span to compare.
             * @param span2 The second span to compare.
             * @return True if spans are equal, false otherwise.
             */
            static areEqualSpans<T>(span1: SpanContract<T>, span2: SpanContract<T>): boolean;
            /**
             * Gets chart item aray by series base.
             *
             * @param seriesBase The series base.
             * @param doNotSort False if sorting by x-values is required, true otherwise.
             * @return The chart item array retrieved or generated.
             */
            static getChartItemArrayBySeriesBase<TX, TY>(seriesBase: SeriesBase, doNotSort?: boolean): ChartItem<TX, TY>[];
            /**
             * Returns the axis name associated with the series.
             *
             * @param seriesBase The series.
             * @param direction "x" or "y".
             * @return The axis name.
             */
            static getAxisName(seriesBase: SeriesBase, direction: string): string;
            static _chartItemComparerByX<TX, TY>(chartItem1: ChartItem<TX, TY>, chartItem2: ChartItem<TX, TY>): number;
            private static _getCountOfValuesForYearAndMonths(startDate, endDate, years, months, milliseconds);
            private static _getMilliseconds(dateSpan);
            private static _getChartItemsByDataLabelAndUniformSeries<TX, TY>(uniformSeries, dataLabel);
            private static _getChartItemsByDataLabelAndGeneralSeries<TX, TY>(values, dataLabel);
            private static _compareForFirst<TX, TY>(chartItem1, chartItem2);
            private static _compareForLast<TX, TY>(chartItem1, chartItem2);
            private static _compareForMin<TX, TY>(chartItem1, chartItem2);
            private static _compareForMax<TX, TY>(chartItem1, chartItem2);
            private static _compareForNull<T>(item1, item2);
            private static _compareNonNullValues<T>(item1, item2);
            private static _compareAscending<T>(item1, item2);
            private static _compareDescending<T>(item1, item2);
        }
        /**
         * Identifies a series.
        */
        class SeriesId {
            /**
             * Specifies the chart view index.
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
        class SeriesSubset<TX, TY> extends SeriesId {
            /**
             * Specifies the series index
             */
            seriesIndex: KnockoutObservable<number>;
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
        interface ChartEventCallback {
            (x?: number, y?: number): void;
        }
        /**
         * Defines the default event notification supported by the chart.
         * Line and bar chart can provide additional events by extending the base events.
         * Users should provide a handler for each of the event notification hooks defined here.
         */
        class Events {
            /**
             * MouseEnter on the plot area.
             */
            plotAreaMouseEnter: ChartEventCallback;
            /**
             * MouseLeave on the plot area.
             */
            plotAreaMouseLeave: ChartEventCallback;
            /**
             * MouseLeave on the plot area.
             */
            plotAreaClick: ChartEventCallback;
        }
        /**
         * Defines the event notification supported by line / area / scatter plot charts.
         * Users should provide a handler for each of the event notification hooks defined here.
         */
        class SeriesChartEvents<TX, TY> {
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
         * Defines the event notification supported by bar chart.
         * Users should provide a handler for each of the event notification hooks defined here.
         */
        class BarChartEvents<TX, TY> {
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
        class RenderingCondition {
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
         * This base class defines the how a series should be rendered on the chart.
         */
        class SeriesView<TX, TY> {
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
             * Formatter by default will add the x, y value and the asociated series name. Eg, "Series: '{0}' Point: {1} Value: {2}".
             * The default formatter is borrowed from Microsoft Excel and seems to be valueable.
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
         * This base class defines the how a line chart series should be rendered on the chart.
         */
        class LineChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
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
         * This base class defines the how an area chart series should be rendered on the chart.
         */
        class AreaChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
            /**
             * Defines the interpolation type for the series in the current view.
             */
            interpolation: KnockoutObservable<Interpolation>;
            /**
             * Defines the hatching pattern type for the series in the current view.
             */
            areaHatchingPattern: KnockoutObservable<Hatching.Pattern>;
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
         * This base class defines the how a scatter chart series should be rendered on the chart.
         */
        class ScatterChartSeriesView<TX, TY> extends SeriesView<TX, TY> {
            /**
             * Defines the radius of circles.
             */
            radius: KnockoutObservable<number>;
            /**
             * Optionally show a tooltip box on mouse hover over the data point.
             */
            showTooltip: KnockoutObservable<boolean>;
        }
        class View<TX, TY> {
            /**
             * Specify the chart type for this view.
             */
            chartType: KnockoutObservable<ChartType>;
            /**
             * The current view spans over multiple series specified in this array.
             */
            seriesView: KnockoutObservableArray<SeriesView<TX, TY>>;
        }
        class StackedChartView<TX, TY> extends View<TX, TY> {
            /**
             * When enabled, the series data can be of varying length.
             * Enabling this option will involve multiple data transformation to fill in missing values for stacking series.
             * Disable this option to speed up rendering if all data series have the same xValues.
             */
            enableSparseSeries: KnockoutObservable<boolean>;
        }
        class LineChartView<TX, TY> extends View<TX, TY> {
            /**
             * The current view spans over multiple series specified in this array.
             */
            seriesView: KnockoutObservableArray<LineChartSeriesView<TX, TY>>;
            /**
             * Specify the event handlers for this view.
             */
            events: SeriesChartEvents<TX, TY>;
        }
        class AreaChartView<TX, TY> extends View<TX, TY> {
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
        class ScatterChartView<TX, TY> extends View<TX, TY> {
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
        class BarChartView<TX, TY> extends StackedChartView<TX, TY> {
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
            events: BarChartEvents<TX, TY>;
            constructor(barChartType: BarChartType);
        }
        class StackedAreaChartView<TX, TY> extends StackedChartView<TX, TY> {
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
            lineState: KnockoutObservable<LineState>;
        }
        /**
         * This class defines a single data point for the chart.
         */
        class ChartItem<TX, TY> {
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
         * This class defines a single data point for a stacked chart.
         */
        class StackedChartItem<TX, TY> extends ChartItem<TX, TY> {
            /**
             * The y0 value for an item.
             */
            y0: TY;
            constructor(xValue: TX, yValue: TY, y0: TY);
        }
        /**
         * This class defines the input data for the chart, axes and its properties.
         */
        class ViewModel<TX, TY> extends Base.ViewModel {
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
            events: Events;
            /**
             * Specifies selections on the chart.
             */
            seriesSelections: KnockoutObservableArray<SeriesSubset<TX, TY>>;
            /**
             * Specifies all the items related to hover on the chart.
             */
            seriesHovers: KnockoutObservableArray<SeriesSubset<TX, TY>>;
            /**
            * Specifies the items being hovered on the chart.
            */
            hoveredID: KnockoutObservableArray<SeriesId>;
            /**
             * Enable Track XSlider coordination.
             */
            enableTrackXSlider: KnockoutObservableBase<boolean>;
            /**
             * Disable MouseOut handler for XSlider
             */
            disableXSliderMouseout: KnockoutObservableBase<boolean>;
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
            constructor();
        }
        /**
         * Axis type. This enum will be used by the inherited chart controls.
         */
        enum AxisType {
            /**
             * Primary x Axis.
             */
            X = 0,
            /**
             * Primary y Axis.
             */
            Y = 1,
            /**
             * Secondary y Axis.
             */
            SecondaryX = 2,
            /**
             * Secondary y Axis.
             */
            SecondaryY = 3,
        }
        /**
         * Class to hold min / max value of the series.
         * This class will be used by the inherited chart controls.
         */
        class Extent<T> {
            /**
             * Minimum value of the series.
             */
            min: T;
            /**
             * Maximum value of the series.
             */
            max: T;
        }
        /**
         * Class to hold tick mark specific properties.
         * This class will be used by the inherited chart controls.
         */
        class Ticks {
            /**
             * Defined the number of ticks.
             */
            tickCount: number;
            /**
             * Defines ticks padding in pixels.
             */
            tickPadding: number;
            /**
             * Defines ticks mark size.
             */
            tickMarkSize: number;
            /**
             * Defines if axis labels to be shown or not.
             */
            showAxisLabel: boolean;
        }
        /**
         * Represents screen coordinates of a point.
         */
        class ScreenCoordinates {
            /**
             * Defines the x coordinate of the point.
             */
            x: number;
            /**
             * Defines the y coordinate of the point.
             */
            y: number;
        }
        /**
         * Implementation wrapper over Axis class.
         */
        class AxisWrapper<T, TX, TY> {
            internalMin: KnockoutObservable<any>;
            internalMax: KnockoutObservable<any>;
            axisPosition: KnockoutComputed<AxisPosition>;
            axisScaleType: KnockoutComputed<Scale>;
            ticks: KnockoutComputed<Ticks>;
            series: KnockoutComputed<SeriesBase[]>;
            step: KnockoutComputed<number>;
            valueScale: KnockoutComputed<any>;
            mappedAxis: KnockoutComputed<D3.Svg.Axis>;
            currentAxis: KnockoutComputed<D3.Selection>;
            currentSlider: KnockoutComputed<D3.Selection>;
            currentTicks: KnockoutComputed<D3.Selection>;
            currentSliderText: KnockoutComputed<void>;
            originalUnit: KnockoutComputed<UnitConversion.Unit>;
            conversionFactor: KnockoutComputed<number>;
            xAxisTickAdjustmentFeatureFlag: KnockoutObservable<boolean>;
            private _domain;
            private _isHorizatal;
            private _extent;
            private _lifetimeManager;
            private _convertedUnit;
            private _xSliderOutputFormatter;
            private _element;
            private _axisElement;
            private _axisType;
            private _dateParser;
            private _numericParser;
            private _filteredDomain;
            private _translateHandler;
            private _rotateAttributes;
            private _rotateAxisLabel;
            private _translate;
            private _barChartViews;
            private _scatterChartViews;
            private _maxScatterChartRadius;
            private _internalExtent;
            private _ticksCoordinateMap;
            private _range;
            private _sliderCoordinate;
            constructor(lifetimeManager: DisposableBase.LifetimeManager, element: JQuery, innerWidth: KnockoutObservableBase<number>, innerHeight: KnockoutObservableBase<number>, translateHandler: (axis: Axis<any>) => ScreenCoordinates, viewModel: ViewModel<TX, TY>, axis: Axis<any>, axisType: AxisType, sliderCoordinate?: KnockoutObservableBase<number>);
            dispose(): void;
            /**
             * Checks if a parser is assigned for the axis wrapper and if so extracts the value from the argument passed with the parser.
             */
            extractValue(value: any): any;
            getPointFormatter(customFormater?: (v: any) => string): (value: any) => string;
            /**
             * Checks for the axis wrapper update.
             */
            checkForUpdate(): void;
            private static _checkSeriesViewsReferSeries<TX, TY>(seriesName, seriesViewArray);
            private _addDisposablesToCleanUp(disposable);
            private static _getD3TimeRoundFunction(thresholdInMilliseconds);
            private static _getD3RoundFunctionObject(thresholdInMilliseconds);
            //static _d3DateIndexLookUp: ((value: Date) => boolean)[];
            static _getDateFormatingIndex(d: Date): number;
            static _getDateRoundingFunction(millisecondsToDistinguish: number): (value: Date) => Date;
            private _createGridLine(translate);
            private _checkSeriesIsDisplayedByChartTypes(seriesName, chartTypes, viewModel);
            private _hasBarChartViews();
            private _hasScatterChartViews();
            private _getPositionBaseTranslateString(format, x, y);
            private static _getCurrentTicks(currentAxis);
            private _initializeComputed2(innerWidth, innerHeight, viewModel, axis);
            static _adjustXAxisTicks(axisWidth: number, axis: Axis<any>, ticksSelection: D3.Selection, axElement: Element): void;
            static _getSVGxCoordinateValue(element: SVGElement): number;
        }
        class Widget<TX, TY> extends Base.Widget implements Interface<TX, TY> {
            _width: KnockoutComputed<number>;
            _height: KnockoutComputed<number>;
            _chartDataClassTransform: KnockoutComputed<string>;
            _topMargin: KnockoutComputed<number>;
            _bottomMargin: KnockoutComputed<number>;
            _leftMargin: KnockoutComputed<number>;
            _rightMargin: KnockoutComputed<number>;
            _transformChartArea: KnockoutComputed<void>;
            _chartSizeUpdated: KnockoutComputed<number>;
            _chartDataUpdated: KnockoutComputed<number>;
            _sizeUpdateCounter: number;
            _dataUpdateCounter: number;
            _xAxesLifetimeManager: DisposableBase.DisposableLifetimeManager;
            _yAxesLifetimeManager: DisposableBase.DisposableLifetimeManager;
            _xAxes: KnockoutComputed<AxisWrapper<TX, TX, TY>[]>;
            _yAxes: KnockoutComputed<AxisWrapper<TY, TX, TY>[]>;
            _mappedXAxisIndex: number[];
            _mappedYAxisIndex: number[];
            _widgetSvg: D3.Selection;
            _chartSvg: D3.Selection;
            _backgroundSvg: D3.Selection;
            _axisElement: D3.Selection;
            _legendSvg: D3.Selection;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel<any, any>, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel<TX, TY>;
            /**
             * Handles mouse move event.
             */
            _mouseMoveHandler(): void;
            /**
             * Handles mouse out event.
             */
            _mouseOutHandler(event?: MouseEvent): void;
            /**
             * See parent.
             */
            _initializeSubscriptions(viewModel: ViewModel<TX, TY>): void;
            _getXSliderCoordinate: KnockoutObservableBase<number>;
            _checkForChartUpdate(): boolean;
            /**
             * The method is invoked whenever the input series data is updated.
             */
            _onChartDataUpdated(): void;
            /**
             * The method is invoked whenever the chart size is updated.
             */
            _onChartSizeUpdated(): void;
            /**
             * The method is invoked when mouse enters the chart plot area.
             */
            _plotAreaMouseEnter(): void;
            /**
             * The method is invoked when mouse leaves the chart plot area.
             */
            _plotAreaMouseLeave(): void;
            /**
             * The method is invoked when mouse moves in the chart plot area.
             */
            _plotAreaMouseMove(): void;
            /**
             * The method is invoked when mouse is clicked on the chart plot area.
             */
            _plotAreaClick(): void;
            _mapSeriesToAxis(): void;
            _getMappedAxisIndex(axisProperty: string, axisName: string): number;
            _isHorizontalChart(): boolean;
            _initializeComputed2(): void;
            private _chartSizeChanged();
            private _initialize();
            private _getAxisTranslate(axis);
            private _computeAxisMargin(axis, position, currentMargin);
            private _computeMargin(position);
            private _getDefaultPadding(position);
            private static _getDefaultMargin<T>(position, axis);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\ChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/ChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        /**
         * Specifies an events creation mode.
         */
        enum EventCreationMode {
            /**
             * All event handlers must be set.
             */
            All = 0,
            /**
             * All event handlers must be set except mouseLeave.
             */
            IgnoreMouseLeave = 1,
            /**
             * All event handlers must be set except mouseOver.
             */
            IgnoreMouseOver = 2,
        }
        /**
         * Base Class for Chart Series View Implementation.
         */
        class SeriesViewImpl<TX, TY> {
            lifetimeManager: DisposableBase.DisposableLifetimeManager;
            renderLifetimeManager: DisposableBase.DisposableLifetimeManager;
            _viewImpl: ChartViewImpl<TX, TY>;
            _seriesBase: ChartBase.SeriesBase;
            _seriesViewIndex: number;
            _seriesIndex: number;
            _seriesName: string;
            _seriesView: ChartBase.SeriesView<TX, TY>;
            _noItemDataMessage: string;
            _xAxis: ChartBase.AxisWrapper<TX, TX, TY>;
            _yAxis: ChartBase.AxisWrapper<TY, TX, TY>;
            _selectedPointRadiusAddition: number;
            _hoveredPointRadiusAddition: number;
            _touchPointRadiusAddition: number;
            private _chartItemsLifetimeManager;
            /**
            * We are doing the chartItems's xCoordinate caculation over and over per hover.
            * This computed is here to caculate only once and cache if someone ever hover it inside.
            * Then the following one only update the xDistance.
            */
            private _chartItemsComputed;
            private _chartItemsSortByCoordinate;
            constructor(viewImpl: ChartViewImpl<TX, TY>, seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>);
            /**
             * Destroys the object.
             */
            dispose(): void;
            /**
             * Static function to caculate the last chartItem.
             *
             * @param items with chartItem which is already sorted by xCoordinate.
             * @returnitems with chartItem
             */
            static _selectLastItem<TX, TY>(items: {
                chartItem: ChartBase.ChartItem<TX, TY>;
                xCoordinate: number;
                xDistance: number;
            }[], withinRange: number, rangeAdjustment: number): ChartBase.ChartItem<TX, TY>;
            /**
             * Static function to calculate the closest point of the calculate distance.
             *
             * @param items with chartItem
             */
            static _selectClosestItem<TX, TY>(items: {
                chartItem: ChartBase.ChartItem<TX, TY>;
                xCoordinate: number;
                xDistance: number;
            }[], withinRange: number, rangeAdjustment: number): ChartBase.ChartItem<TX, TY>;
            /**
             * Utility to return the select chartItem base on current xCoordinate.
             *
             * @param xCoordinate of current slider.
             * @options  rangeAdjustment (if item has a width, for example  barChart item, it will have the item adjustment width.
             *           selectFunction: custom select function to pick the closest point. SeriesViewImpl.selectClosestItem or SeriesViewImpl.selectLastItem are good example to see how to implement it.
             */
            selectChartItemFromXCoordinate(xCoordinate: number, options: {
                rangeAdjustment?: number;
                withinRange?: number;
                selectFunction?: (items: {
                    chartItem: ChartBase.ChartItem<TX, TY>;
                    xCoordinate: number;
                    xDistance: number;
                }[], withinRange: number, adjustment: number) => ChartBase.ChartItem<TX, TY>;
            }): ChartBase.ChartItem<TX, TY>;
            /**
             * Sets the series hover in the viewModel for a specific series.
             *
             * @param seriesViewIndex The seriesIndex to be toggled in the selection.
             * @param chartItem The chart item to be toggled in the selection.
             * @param hovered The requested hover state.
             */
            setSeriesHover(chartItem: ChartBase.ChartItem<TX, TY>, hovered: boolean): void;
            _disposeRenderDisposables(): void;
            /**
             * Maps the user provided x axis data to the x axis coordinate.
             *
             * @param xValue The user provided x axis data.
             * @return x coordinate.
             */
            _getScreenX(xValue: TX): number;
            /**
             * Maps the user provided y axis data to the y axis coordinate.
             *
             * @param yValue The user provided y axis data.
             * @return y coordinate.
             */
            _getScreenY(yValue: TY): number;
            _toggleSeriesSelection(chartItem: ChartBase.ChartItem<TX, TY>): void;
            /**
             * Attaches computed to the series element.
             *
             * @param seriesElement The series element selection.
             */
            _attachSeriesComputeds(seriesElement: D3.Selection): void;
            _eventHandlerWrapper(eventType: string, d: ChartBase.ChartItem<TX, TY>): void;
            _getChartItemArray(doNotSort?: boolean): ChartBase.ChartItem<TX, TY>[];
            _createArea(elementToApply: D3.Selection, interpolation?: ChartBase.Interpolation, isInverse?: boolean): D3.Selection;
            _createGeneralLine(interpolation: ChartBase.Interpolation): D3.Svg.Line;
            _renderSeries(): void;
            _createElement(cssClass: string): D3.Selection;
            _renderTooltips(): void;
            _createSelectedPlots(sourceElement: D3.Selection): D3.Selection;
            _createHover(sourceElement: D3.Selection): void;
            _getHoveredChartItems(): ChartBase.ChartItem<TX, TY>[];
            _getSelectedChartItems(): ChartBase.ChartItem<TX, TY>[];
            _createHoveredPlots(sourceElement: D3.Selection, hoveredChartItems: ChartBase.ChartItem<TX, TY>[]): void;
            _createDataPlots(sourceElement: D3.Selection, additionToRadius?: number): D3.Selection;
            _createPlots(sourceElement: D3.Selection, values: ChartBase.ChartItem<TX, TY>[], cssClass: string, additionToRadius?: number, eventCreationMode?: EventCreationMode): D3.Selection;
            _addTooltips(plots: D3.Selection): void;
            _applyRenderingConditions(selectionToAdd: D3.Selection, selectionToApply: D3.Selection): void;
            _createSeriesElement(): D3.Selection;
            _getInterpolation<TX, TY>(): ChartBase.Interpolation;
            _renderDataLabels(): void;
            _createHorizontalLine(yValue: TY, xValue?: TX): D3.Svg.Line;
            _createVerticalLine(xValue: TX, yValue?: TY): D3.Svg.Line;
            private static _getInterpolationString(interpolation);
            private static _getUniqueId();
            private _getChartItems(seriesIndex);
            private _createHorizontalArea(selectionToApply, isInverse?);
            private _createGeneralArea(interpolation, isInverse?);
            private _createVerticalArea(selectionToApply, isInverse?);
            private _renderDataLabel(chartItem, dataLabel, xAxis, yAxis);
            private _createClipPath(frame);
            private _createHoverProjections(selection, chartItem);
            private _filterChartItems(seriesSubset);
        }
        /**
         * Base Class for Line, Area and Scatter Plot Chart View Implementation.
         */
        class ChartViewImpl<TX, TY> {
            /**
             * Defines the view model for the implementation.
             */
            options: ChartBase.ViewModel<TX, TY>;
            /**
             * Defines the height of the view.
             */
            height: number;
            /**
             * Defines the width of the view.
             */
            width: number;
            /**
             * Defines x axes of the view.
             */
            xAxes: ChartBase.AxisWrapper<TX, TX, TY>[];
            /**
             * Defines y axes of the view.
             */
            yAxes: ChartBase.AxisWrapper<TY, TX, TY>[];
            /**
             * Defines mapped x axes indexes of the view.
             */
            mappedXAxisIndex: number[];
            /**
             * Defines mapped y axes indexes of the view.
             */
            mappedYAxisIndex: number[];
            /**
             * Defines the dictionary mapping series index by series name.
             */
            seriesIndexDictionary: {
                [name: string]: number;
            };
            /**
             * Defines the d3 element used as a view container.
             */
            element: D3.Selection;
            /**
             * Items to be disposed with the view.
             */
            lifetimeManager: DisposableBase.DisposableLifetimeManager;
            /**
             * Items to be disposed with each rendering.
            */
            renderLifetimeManager: DisposableBase.DisposableLifetimeManager;
            /**
             * Series view implementations.
             */
            seriesViewImpls: SeriesViewImpl<TX, TY>[];
            /**
             * Defines if the chart is horizontal or vertical.
             */
            isHorizontalChart: boolean;
            /**
             * Specifies the mouse move handler.
             */
            mouseMoveHandler: () => void;
            /**
             * Specifies the mouse out handler.
             */
            mouseOutHandler: () => void;
            /**
             * Specifies the index of the view.
             */
            chartViewIndex: number;
            /**
             * Specifies if we need to reverse the seriesViews (to display them correctly on stacked charts).
             **/
            reversed: boolean;
            _viewClass: string;
            _view: ChartBase.View<TX, TY>;
            seriesViews: ChartBase.SeriesView<TX, TY>[];
            series: ChartBase.SeriesBase[];
            /**
             * Initializes the view.
             */
            init(lifetimeManager: DisposableBase.LifetimeManager): void;
            /**
             * Destroys the view.
             */
            dispose(): void;
            /**
             * Toggles the series selection in the viewModel.
             *
             * @param seriesViewIndex The seriesIndex to be toggled in the selection.
             * @param chartItem The chart item to be toggled in the selection.
             */
            toggleSeriesSelection(seriesViewIndex: number, chartItem: ChartBase.ChartItem<TX, TY>): void;
            /**
             * Returns a subset of series closest (at the left hand side) to the xCoordinate.
             *
             * @param xCoordinate The x-axis coordinate.
             * @param rangeAdjustment Optional to allow for Barchart step adjustment for the closest/lastest point to consider.
             * @return The subset of series and their chart items.
             */
            getXSliceSeriesSubset(xCoordinate: number, withinRange: number, rangeAdjustment?: number): ChartBase.SeriesSubset<TX, TY>[];
            /**
             * Iterates over series views of the chart view and executes the iterator method. If the chart view contains no series, it iterates over all series of the view model.
             *
             * @param viewImpl The view implementation containing all series in the view model and also used as a context for the method executed.
             * @param chartView The chart view to be iterated on.
             * @param delegate The delegate method to be executed for each series view.
             * @return The array of results returned by delegates.
             */
            static _iterateOverSeriesView<TX, TY>(viewImpl: ChartViewImpl<TX, TY>, chartView: ChartBase.View<TX, TY>, delegate: (seriesViewImpl: SeriesViewImpl<TX, TY>) => any): any;
            /**
             * Gets default css class using index.
             *
             * @param seriesIndex A series's index number in the series property.
             */
            static _getDefaultCssClassByIndex(seriesIndex: number): string;
            /**
             * Gets css class of a series view, if it is not defined by user then return a calculated css class using series index.
             *
             * @param seriesIndex A series's index number in the series property.
             * @param seriesView The series view.
             */
            static _getCssClass<TX, TY>(seriesIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): string;
            /**
             * A view hook that allows transforming plot chart items if projection transformations are required.
             * An example is for stacked series, where y values are transformed into y + y0.
             */
            _transformPlotValues(values: ChartBase.ChartItem<TX, TY>[], seriesViewIndex: number): ChartBase.ChartItem<TX, TY>[];
            /**
             * A view hook that allows for reacting to a single plot point being clicked.
             */
            _toggleSinglePlotSelection(seriesViewIndex: number): void;
            /**
             * Disposes any disposables that have been added in a previous render.
             */
            _disposeRenderDisposables(): void;
            /**
             * Disposes any disposables within series view implementations.
             */
            _disposeSeriesViewImpls(): void;
            /**
             * Attaches computed to the series element.
             *
             * @param seriesElement The series element selection.
             * @param seriesView The series view associated with the series or null if there isn't one.
             * @param seriesViewIndex The view index of the series.
             */
            _attachSeriesComputeds(seriesElement: D3.Selection, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>, updateHoverClass?: boolean): void;
            /**
             * Maps the user provided x axis data to the x axis coordinate.
             *
             * @param seriesIndex The index of the series.
             * @param xValue The user provided x axis data.
             *
             * @return x coordinate.
             */
            _getScreenX(seriesIndex: number, xValue: TX): number;
            /**
             * Maps the user provided y axis data to the y axis coordinate.
             *
             * @param seriesIndex The index of the series.
             * @param yValue The user provided y axis data.
             *
             * @return y coordinate.
             */
            _getScreenY(seriesIndex: number, yValue: TY): number;
            _getEvents(): ChartBase.SeriesChartEvents<TX, TY>;
            _createClipPathSelection(renderingCondition: ChartBase.RenderingCondition, clipPath: D3.Selection): boolean;
            _createSeriesViewImpl(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): SeriesViewImpl<TX, TY>;
            _render(): void;
            _getHoveredSeriesViewIndexes(): number[];
            _getSeriesViewBySeriesViewIndex(seriesViewIndex: number): ChartBase.SeriesView<TX, TY>;
            _getSeriesIndexBySeriesViewIndex(seriesViewIndex: number): number;
            private _getChartItems(seriesIndex);
            private _getSeriesViewImpl(seriesBase, seriesViewIndex, seriesView);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\ColorBar.d.ts
declare module "Viva.Controls/Controls/Visualization/ColorBar" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Interface representing the properties for ColorBar widget.
         */
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * The label text for the color bar.
             */
            text: KnockoutObservable<string>;
            /**
             * The CSS classifier to apply to the color bar.
             */
            cssClass: KnockoutObservable<string>;
        }
        class Widget extends Base.Widget implements Interface {
            private _cssClass;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _initializeComputeds();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Donut.d.ts
declare module "Viva.Controls/Controls/Visualization/Donut" {
    import MultiSelectDropDown = require("Viva.Controls/Controls/Forms/MultiSelectDropDown");
    import QuotaGauge = require("Viva.Controls/Controls/Visualization/QuotaGauge");
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import Gauge = require("Viva.Controls/Controls/Visualization/Gauge");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface ItemsData extends MultiSelectDropDown.ItemsData {
            /**
             * The current Index (rowId) which is being hovered.
             */
            hoveredIndex?: KnockoutObservableBase<string>;
        }
        interface ItemMetadata extends MultiSelectDropDown.DropDownItemMetadata {
            /**
             * Row ID (number) unique identifier of the data.
             * By default, if itemSettings.rowIdKey is not provided this will be the item's index.
             */
            rowId?: KnockoutObservableBase<string>;
            /**
             * Label: When hovered, if provided, the default hover format will be used in the caption.
             * By default, if itemSettings.rowIdKey is not provided this will be the item's index.
             */
            label?: KnockoutObservableBase<string>;
        }
        interface Item extends Grid.Item {
        }
        interface ThresholdData extends Gauge.ThresholdData {
            /**
             * Item data provided by user.
             */
            item: Item;
            /**
             * Metadata corresponding to this item data point.
             */
            rowMetadata: ItemMetadata;
            /**
             * Element that the current threshold maps to. Initial value is null until the widget is created, this will be populated with the matching svg path element.
             */
            element: Element;
            /**
             * HoveredInfo to show for this slice caption.  This value will show up when a slice is show up but no selection available.
             * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
             */
            hoveredInfo?: string;
            /**
             * HoveredInfo to show for this slice caption when there are selected sliced.
             * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
             */
            selectedHoveredInfo?: string;
            /**
             * percentage is the NiceFixed Formated to be show with the percentage.
             * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
             */
            percentage?: string;
            /**
             * itemValueString is the nice fixed (1 digit) Formated item value to be show.
             * Initialvalue is null till first hovered happens.  Then we cached the value so the consequence hover is faster.
             */
            itemValueString?: string;
        }
        class Events {
            /**
             * Click on a donut slice.
             *
             * @param data The threshold data of the slice which is been click on.
             * @param element The svg path element of the slice which is been click on.
             * @param evt JQueryEventObject for this event.
             */
            sliceClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseEnter on a donut slice.
             *
             * @param data The threshold data of the slice which mouse entering.
             * @param element The svg path element of the slice which mouse entering.
             * @param evt JQueryEventObject for this event.
             */
            sliceMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseLeave on a donut slice.
             *
             * @param data The threshold data of the slice which mouse leaving.
             * @param element The svg path element of the slice which mouse leaving.
             * @param evt JQueryEventObject for this event.
             */
            sliceMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
        }
        class ItemSettings extends MultiSelectDropDown.ItemSetting {
            /**
             * Data key used to identify the color. This is optional, if not provided, it will use the default color wheel.
             */
            colorKey: string;
            /**
             * Data key used to identify the row. Data has to be a number, we use it on the object map to quickly identify the item's element.
             */
            rowIdKey: string;
            /**
             * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
             */
            labelKey: string;
            /**
             * RowId of current hovered slice in donut.
             */
            hoveredIndex: KnockoutObservable<string>;
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param setting Properties used for setup dropdownItems.
             */
            constructor(settings?: Object);
            /**
             * Creates a new instance of the ItemSetting.
             *
             * @param itemValue Property used for value of slice. Data have to be number.
             * @param disabledKey Property used for disable. If not provided, default is false.
             * @param groupIdKey Property used for groupbyId. If not provided, default is non-grouping.
             * @param selectedKey Property used for slice selection. If not provided, default is not selected (false).
             * @param colorKey Property used for slice color. Data have to be in string hex color format. For example, #0072c6.
             * @param rowId Property used for as Id. Data have to be in number uniquely identify the row.
             * @param label Property used for as center text for the short symbol.  Should be less than 5 characters.
             */
            constructor(itemValue?: string, disabledKey?: string, selectedKey?: string, groupIdKey?: string, colorKey?: string, rowIdKey?: string, labelKey?: string);
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * Center Single Setting icon/font size.
             */
            centerSize: KnockoutObservableBase<QuotaGauge.CenterSize>;
            /**
             * Ring Thickness for the Gauge.
             */
            ringThickness: KnockoutObservableBase<QuotaGauge.RingThickness>;
            /**
             * Show outer donut gauge.
             */
            showGauge: KnockoutObservableBase<boolean>;
            /**
             * Show center content.
             */
            showCenter: KnockoutObservableBase<boolean>;
            /**
             * The number represents the whole gauge value.
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
             * Width of the Donut.
             */
            width: KnockoutObservableBase<number>;
            /**
             * Height of the Donut.
             */
            height: KnockoutObservableBase<number>;
            /**
             * Disable selected change on click.
             */
            disableSelectOnClick: KnockoutObservableBase<boolean>;
            /**
             * Array of objects represent the groupDropDown menus.
             */
            itemsData: KnockoutObservableBase<ItemsData>;
            /**
             * Default gradient color start index.
             */
            colorStart: KnockoutObservableBase<string>;
            /**
             * Helper function to create a DropdownItems from dataArray with given ItemSettings and groupInfos.
             *
             * @param data Array of objects represent the donut slice.
             * @param itemSettings The settings to provide which fields in the prior array object to provide text, value, disable, and groupId.
             * @param groupInfos Object with the groupId -> groupInfo mapping to provide ko.observable for <optGroup> Label and disable.
             * @return ItemsData[] for the ko binding for the dropdown items.
             */
            static createItemsFromArray(data: any[], itemSettings?: ItemSettings, groupInfos?: Object): ItemsData;
            /**
             * The required mimimum slice number value based on this.total().
             * If its slice is smaller than this number, the widget will throw during creation.
             * Note that this is required because the white line between the slice is bigger than the slice itself.
             *
             * @return The minimum slice number base on this.total().
             */
            getRequiredMinimumSlice(): number;
            /**
             * Events supported by the control.
             */
            events: Events;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _quotaGaugeWidget;
            private _quotaGaugeViewModel;
            private _usageGaugeViewModel;
            private _thresholds;
            private _thresholdsHoveringOut;
            private _thresholdsGroup;
            private _thresholdComputed;
            private _prevhoveredIndex;
            private _currentSelection;
            private _currentSelectedTotal;
            private _delayedThrottleMs;
            private _defaultColors;
            private _hoveredUnit;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            static getDefaultColors(startColorCode?: string): string[];
            /**
             * Helper to clean up the selected() -> thresholds mapping.
             */
            private _disposeThresholdComputed();
            /**
             * Helper to populate the _thresholdComputed & _thresholdsGroup.
             */
            private _populateThresholdComputed(showGauge?);
            /**
             * Helper to populate one _thresholdComputed & _thresholdsGroup.
             *
             * @param rowMetadata Metadata correspoding to these gaugeThresholds.
             * @param gaugeThresholds  thresholdData[] corresponding to this rowMetadata.  Typically it is 3 slice, start(white), row, stripe(white).
             * @return KnockoutComputed<void> to map rowMetadata.select() to change these 3 slice's aria-selected.
             */
            private _createComputedOnSelected(rowMetadata, gaugeThresholds);
            /**
             * Helper to manipulate the usageGaouge to our look and feels
             *
             * @param usageGaugeViewModel UsageGaugeViewModel that gauge used to change the look and feel and listen to the events.
             */
            private initializeUsageGaugeViewModel(usageGaugeViewModel);
            _createInnerViewModel(): QuotaGauge.ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Gauge.d.ts
declare module "Viva.Controls/Controls/Visualization/Gauge" {
    import GaugeBase = require("Viva.Controls/Controls/Visualization/GaugeBase");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface Label {
            /**
             * Text of the label.
             */
            text: string;
            /**
             * CSS class for the label.
             */
            cssClass?: KnockoutObservableBase<string>;
        }
        interface ThresholdData extends GaugeBase.ThresholdData {
        }
        interface RadiusSetting extends GaugeBase.RadiusSetting {
        }
        interface Point {
            /**
             * X coordinate.
             */
            x: number;
            /**
             * Y coordinate.
             */
            y: number;
        }
        interface SVGRangeData {
            /**
             * SVG path string.
             */
            path: KnockoutObservableBase<string>;
            /**
             * CSS class for this SVGPath
             */
            cssClass?: KnockoutObservableBase<string>;
            /**
             * Label text coordinate x.
             */
            textPositionX?: KnockoutObservableBase<number>;
            /**
             * Label text coordinate y.
             */
            textPositionY?: KnockoutObservableBase<number>;
            /**
             * Label text.
             */
            text?: KnockoutObservableBase<string>;
            /**
             * CSS class for Label.
             */
            textCssClass?: KnockoutObservableBase<string>;
            /**
             * Icon for this path.
             */
            icon?: KnockoutObservableBase<string>;
            /**
             * ThresholdData for events.
             */
            data?: ThresholdData;
        }
        interface SVGLineData {
            /**
             * Svg path string.
             */
            path: string;
            /**
             * Label coordinate.
             */
            textPosition?: Point;
            /**
             * Label text.
             */
            text?: string;
            /**
             * Label CSS class.
             */
            textCssClass?: KnockoutObservableBase<string>;
            /**
             * Icon coordinate.
             */
            iconPosition?: Point;
            /**
             * Icon uri.
             */
            icon?: string;
        }
        class Events extends GaugeBase.Events {
        }
        class ViewModel extends GaugeBase.ViewModel {
            /**
             * Thresholds.
             */
            thresholds: KnockoutObservableArray<ThresholdData>;
            /**
             * Max for the gauge to project.
             */
            max: KnockoutObservableBase<number>;
            /**
             * Current value.
             */
            current: KnockoutObservableBase<number>;
            /**
             * Total Arc of the gauge. (units in degree).
             */
            totalArc: KnockoutObservableBase<number>;
            /**
             * Enables thresholdsBar.
             */
            thresholdsBarEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsBar settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the thickness of the thresholds bar.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables thresholdsLine.
             */
            thresholdsLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the thresholds Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsLineSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBar.
             */
            currentBarEnabled: KnockoutObservableBase<boolean>;
            /**
              * CurrentBarRing Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarRingSettings: KnockoutObservable<RadiusSetting>;
            /**
              * CurrentBar Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBarRing.
             */
            currentBarRingEnabled: KnockoutObservableBase<boolean>;
            /**
             * Enables currentLine.
             */
            currentLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * CurrentLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the current Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            currentLineSettings: KnockoutObservableBase<RadiusSetting>;
            /**
             *  Arc of the gauge start point (units in degree).
             *  -90 : bottom  (default)
             *    0 : left
             *   90 : top
             *  180 : right
             */
            arcStartOffset: KnockoutObservableBase<number>;
            /**
             * Start label.
             */
            startLabel: string;
            /**
             * Position the label relative to the center.
             */
            startLabelSetting: number;
            /**
             * Start Icon.
             */
            startIcon: string;
            /**
             *   Position the icon relative to the center.
             */
            startIconSetting: number;
            /**
             * Max label.
             */
            maxLabel: string;
            /**
             * Position the label relative to the center.
             */
            maxLabelSetting: number;
            /**
             * Max icon.
             */
            maxIcon: string;
            /**
             * Position the icon relative to the center.
             */
            maxIconSetting: number;
            /**
             * Shows center text using SVG.
             */
            showCenterText: KnockoutObservableBase<boolean>;
            /**
             * Center text array using SVG.
             */
            centerTexts: KnockoutObservableArray<Label>;
            /**
             * Width.
             */
            width: KnockoutObservableBase<number>;
            /**
             * Height.
             */
            height: KnockoutObservableBase<number>;
            /**
             * Events supported by the control.
             */
            events: Events;
        }
        class Widget extends GaugeBase.Widget implements Interface {
            private _width;
            private _height;
            private _top;
            private _left;
            private _marginTop;
            private _marginLeft;
            private _translate;
            private _thresholdsBarData;
            private _thresholdsBarDataChanged;
            private _threshholdsLineData;
            private _currentBarData;
            private _currentBarDataChanged;
            private _currentBarRingData;
            private _currentLineData;
            private _centerLabelPosition;
            private _centerTexts;
            private _totalArc;
            private _eventThresholdBarClickHandler;
            private _eventThresholdBarMouseEnterHandler;
            private _eventThresholdBarMouseLeaveHandler;
            private _eventCurrentBarClickHandler;
            private _eventCurrentBarMouseEnterHandler;
            private _eventCurrentBarMouseLeaveHandler;
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
            private static fillSvgRangeData(source, dest);
            _initializeComputeds(): void;
            private setupComputed_threshholdsLineData();
            private setupComputed_currentLineData();
            private setupComputed_thresholdsBarData();
            private setupComputed_currentBarRingData();
            private setupComputed_currentBarData();
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _attachEvents();
            private _detachEvents();
            /**
             * Generates a SVG path string for a line on value position (relative to max).
             *
             * @param value The desired value relative to max.
             * @param rx Arc's rx.
             * @param ry Arc's ry.
             * @param max The maximum of the total gauge.
             * @param arcTotal The total Fan degree out of 360 degree.
             * @param arcStartOffset The rotation offset for this total arc
             * @param far The end of the line far point. It is relative to radius. For example, 0.9 represents 0.9 * radius.
             * @param near The start of the line near point. It is relative to radius.
             * @param text The position of text should be in. It is relative to radius.
             * @return line svg path string.
             */
            private _lineSvgFormat(value, rx, ry, max, arcTotal, arcStartOffset, far, near, text);
            /**
             * Generates a SVG path String for an arc close path given the start and end value (relative to max).
             *
             * @param start The value to start the arc. (larger number).
             * @param end The value to end.  (smaller number).
             * @param rx Arc's rx.
             * @param ry Arc's ry.
             * @param max The max of the total gauge.
             * @param totalArc This represent the total Fan degree out of 360 degree. (Max is projected onto this arc range).
             * @param arcStartOffset The rotation offset for this total arc
             * @param far The thickness of the arc far point. it base on relative to radius. For example, 0.9 represents 0.9 * radius.
             * @param near The thickness of the arc near point. it base on relative to radius.
             * @return The arc svg path string.
             */
            private _arcSvgFormat(start, end, rx, ry, max, arcTotal, arcStartOffset, far, near);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\GaugeBase.d.ts
declare module "Viva.Controls/Controls/Visualization/GaugeBase" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface ThresholdData {
            /**
             * Threshold Upper limit.
             */
            limit: KnockoutObservableBase<number>;
            /**
             * Threshold CSS class.
             */
            cssClass?: KnockoutObservableBase<string>;
            /**
             * Threshold label.
             */
            label?: KnockoutObservableBase<string>;
            /**
             * Threshold icon.
             */
            icon?: KnockoutObservableBase<string>;
        }
        interface RadiusSetting {
            /**
             * Far setting.
             * far and near point define the width of the current Line or Bar.
             * 0 represents center of the circle. 1 represents right on the radius.
             */
            far: number;
            /**
             * Near setting.
             * far and near point define the width of the current Line or Bar.
             * 0 represents center of the circle. 1 represents right on the radius.
             */
            near: number;
            /**
             * Text setting.
             * position the label relative to the center.
             * 0 represents center of the circle. 1 represents right on the radius.
             * 0 also means is will not show the label.
             */
            text?: number;
            /**
              * Icon setting.
              * position the label relative to the center.
              * 0 represents center of the circle. 1 represents right on the radius.
              * 0 also means is will not show the icon.
              */
            icon?: number;
        }
        class Events {
            /**
             * Click on a threshold bar.
             *
             * @param data The threshold data of the thesholdBar which is been click on.
             * @param element The svg path element of the thresholdBar which is been click on.
             * @param evt JQueryEventObject for this event.
             */
            thresholdBarClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseEnter on a threshold bar.
             *
             * @param data The threshold data of the thesholdBar which mouse entering.
             * @param element The svg path element of the thresholdBar which mouse entering.
             * @param evt JQueryEventObject for this event.
             */
            thresholdBarMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseLeave on a threshold bar.
             *
             * @param data The threshold data of the thesholdBar which mouse leaving.
             * @param element The svg path element of the thresholdBar which mouse leaving.
             * @param evt JQueryEventObject for this event.
             */
            thresholdBarMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * SVG Path elements of the threshold bar has changed.
             *
             * This event will fired when the SVG elements of is changed.
             * For example, rotate, threshold changed, current change, will cause the computed SVG paths element to change.
             * This event allow the client to re-map the threshold index to element mapping.
             * For instance, in Donut gauge, it relies on the index to element mapping to quickly insert/remove only specific element's class.
             * When this event fired, Donut gauge takes one time hit to remap threshold index to element
             * Such that the subsequence hoverIndex() change, it just does the index to element look up.
             */
            thresholdBarElementsChanged: () => void;
            /**
             * Click on a current bar.
             *
             * @param data The threshold data of the currentBar which is been clicked on.
             * @param element The svg path element of the currentBar which is been clicked on.
             * @param evt JQueryEventObject for this event.
             */
            currentBarClick: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseEnter on a current bar.
             *
             * @param data The threshold data of the currentBar which mouse entering.
             * @param element The svg path element of the currentBar which mouse entering.
             * @param evt JQueryEventObject for this event.
             */
            currentBarMouseEnter: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * MouseLeave on a current bar.
             *
             * @param data The threshold data of the currentBar which mouse entering.
             * @param element The svg path element of the currentBar which mouse entering.
             * @param evt JQueryEventObject for this event.
             */
            currentBarMouseLeave: (data: ThresholdData, element?: Element, evt?: JQueryEventObject) => void;
            /**
             * SVG Path elements of the current bar has changed.
             *
             * This event will fired when the SVG elements of is changed.
             * For example, rotate, threshold changed, current change, will cause the computed SVG paths element to change.
             * This event allow the client to re-map the threshold index to element mapping.
             * For instance, in Donut gauge, it relies on the index to element mapping to quickly insert/remove only specific element's class.
             * When this event fired, Donut gauge takes one time hit to remap threshold index to element
             * Such that the subsequence hoverIndex() change, it just does the index to element look up.
             */
            currentBarElementsChanged: () => void;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * Thresholds.
             */
            thresholds: KnockoutObservableArray<ThresholdData>;
            /**
             * Max for the gauge to project.
             */
            max: KnockoutObservableBase<number>;
            /**
             * Current value.
             */
            current: KnockoutObservableBase<number>;
            /**
             * Enables thresholdsBar.
             */
            thresholdsBarEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsBar settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the thickness of the thresholds bar.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables thresholdsLine.
             */
            thresholdsLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * ThresholdsLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the thresholds Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            thresholdsLineSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBar.
             */
            currentBarEnabled: KnockoutObservableBase<boolean>;
            /**
              * CurrentBarRing Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarRingSettings: KnockoutObservable<RadiusSetting>;
            /**
              * CurrentBar Settings.
              * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
              * far and near point define the thickness of the current arc.
              * text: position the label relative to the center.
              * icon: position the icons relative to the center.
              */
            currentBarSettings: KnockoutObservable<RadiusSetting>;
            /**
             * Enables currentBarRing.
             */
            currentBarRingEnabled: KnockoutObservableBase<boolean>;
            /**
             * Enables currentLine.
             */
            currentLineEnabled: KnockoutObservableBase<boolean>;
            /**
             * CurrentLine Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the width of the current Line.
             * text: position the label relative to the center.
             * icon: position the icons relative to the center.
             */
            currentLineSettings: KnockoutObservableBase<RadiusSetting>;
            /**
             * Start label.
             */
            startLabel: string;
            /**
             * Position the label relative to the center.
             */
            startLabelSetting: number;
            /**
             * Max label.
             */
            maxLabel: string;
            /**
             * Max icon.
             */
            maxIcon: string;
            /**
             * Start Icon.
             */
            startIcon: string;
            /**
             *   Position the icon relative to the center.
             */
            startIconSetting: number;
            /**
             * Events supported by the control.
             */
            events: Events;
            /**
             * Custom class for the control to allow for scoping custom styles.
             */
            cssClass: KnockoutObservable<string>;
        }
        class Widget extends Base.Widget implements Interface {
            _sortedThresholds: KnockoutComputed<ThresholdData[]>;
            _rangeData: KnockoutComputed<ThresholdData[]>;
            _currentValue: KnockoutComputed<number>;
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
            /**
             * See interface.
             */
            options: ViewModel;
            static validateRadiusSetting(setting: RadiusSetting): RadiusSetting;
            _initializeComputeds(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\Animation.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/Animation" {
    export = Main;
    module Main {
        /**
         * The function used to get the current time. Tests can inject their own method and control time in
         * a more rigorous manner.
         */
        var getCurrentTime: () => number;
        /**
         * The function used to call a function after a certain amount of time. Tests can inject their own method and control time in
         * a more rigorous manner.
         */
        var setTimeoutFromCurrentTime: (handler: any, timeout?: number) => number;
        /**
         * A dictionary of all the animating properties. The key is the property being animated and the value is the current tween.
         */
        interface IAnimationState {
            [key: string]: number;
        }
        /**
         * A dictionary of properties to animate. Each property is defined by numeric start and end values.
         * Note: end should be either <number> or <KnockourObservable<Number>>.
         */
        interface IAnimationDescriptor {
            [key: string]: {
                start: number;
                end: any;
            };
        }
        /**
         * A class that manages frame tweening for animating numeric properties.
         */
        class Animation {
            /**
             * A polyfill for requestAnimationFrame
             */
            static requestAnimationFramePolyfill: (callback: () => void) => number;
            static cancelAnimationFramePolyfill: (id: number) => void;
            /**
             * A subscribable that notifies subscribers when the animation is explicitly stopped or finishes naturally.
             */
            animationEnded: KnockoutSubscribable<IAnimationState>;
            private _duration;
            private _easingFunction;
            private _stepFunction;
            private _startTime;
            private _endTime;
            private _animatedProperties;
            private _animationStopped;
            private _ignoreFrames;
            /**
             * Creates an animation that tweens some collection of values between start and end values.
             *
             * @param stepFunction callback for every frame of the animation
             * @param animatedProperties a dictionary where the key is the name of the animated property and its value contains the start and end values.
             * @param duration the length of the animation in milliseconds
             * @param easingFunction a Callback that maps time to percentage complete for the animation.
             */
            constructor(stepFunction: (currentAnimationState: IAnimationState) => void, animatedProperties: IAnimationDescriptor, duration?: number, easingFunction?: (percentComplete: number) => number);
            private static _defaultEasing(percentTime);
            /**
             * Starts the animation.
             */
            start(): void;
            /**
             * Stops the animation
             */
            stop(): void;
            /**
             * Whether the animation is stopped (explicitly or the animation ended).
             */
            animationStopped: boolean;
            private _step();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\Commands\ICommand.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/Commands/ICommand" {
    export = Main;
    module Main {
        /**
         * The interface for a graph control command.
         */
        interface ICommand {
            /**
             * Runs the command.
             */
            run(): void;
            /**
             * Undoes the action of the run command.
             */
            undo(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\Commands\MoveNodes.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/Commands/MoveNodes" {
    import GraphWidget = require("Viva.Controls/Controls/Visualization/Graph/GraphWidget");
    import ICommand = require("Viva.Controls/Controls/Visualization/Graph/Commands/ICommand");
    import Geometry = require("Viva.Controls/Controls/Visualization/Graph/Geometry");
    export = Main;
    module Main {
        /**
         * A command that moves graph nodes on activation/undo
         */
        class MoveNodesCommand implements ICommand.ICommand {
            /**
             * Whether or not this command is in an "undone" state, meaning the user called undo and it's now in the redo queue.
             */
            undone: boolean;
            private _nodes;
            private _oldLocations;
            private _newLocations;
            /**
             * Creates a command that moves graph nodes.
             *
             * @param nodes a list of the nodes to move
             * @param oldLocations the original locations of the nodes. Needed for undo.
             * @param newLocation where the nodes should move.
             */
            constructor(nodes: GraphWidget.GraphNodeViewModel[], oldLocations: Geometry.IPoint[], newLocations: Geometry.IPoint[]);
            /**
             * Moves the nodes by comitting the new location to the view model.
             */
            run(): void;
            /**
             * Moves the nodes to their original location by comitting to the view model.
             */
            undo(): void;
            /**
             * Appends to a pre-existing command.
             * @param nodes a list of the nodes to move
             * @param oldLocations the original locations of the nodes. Needed for undo.
             * @param newLocation where the nodes should move.
             */
            update(nodes: GraphWidget.GraphNodeViewModel[], oldLocations: Geometry.IPoint[], newLocations: Geometry.IPoint[]): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\Geometry.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/Geometry" {
    export = Main;
    module Main {
        /**
         * A cartesian point. Who knew?
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
         * A rectangle. Oh my!
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
         * Returns whether or not a completely lies in b
         *
         * @param a the rect to test for lying in b
         * @param b the enclosing rect
         * @return true if a lies completely in b. false otherwise.
         */
        function rectLiesInRect(a: IRect, b: IRect): boolean;
        /**
         * Returns the first point where the ray starting at p1 and ending at p2 intersects rect.
         *
         * @param p1 the start point for the line to test
         * @param p2 the end point for the line to test
         * @param rect the rectangle
         * @return where the line and rectangle intersect on the exterior of the rectangle or null if they don't
         */
        function rayRectIntersection(p1: IPoint, p2: IPoint, rect: IRect): IPoint;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\GraphEntitiesAddition.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/GraphEntitiesAddition" {
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\GraphEntityViewModel.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/GraphEntityViewModel" {
    export = Main;
    module Main {
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
         * An interface for updating only specified aspects of a graphNode's Geometry.IRect.
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
         * Options to be used when calling the widget's setNodeRectsOpts function.
         */
        interface ISetNodeRectOptions {
            /**
             * When true, clears the existing undo/redo stack.
             * Default: false;
             */
            clearUndo?: boolean;
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
            * If true, the entity should have a low opacity.
            */
            dimmed: KnockoutObservable<boolean>;
            /**
             * This class is abstract. Do not instantiate it.
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
             * The edge line strength (thickness). Limited to values in the range [1; 6] - where 1 represents the weakest (the thinnest) and 6 - the strongest (the thickest) connection.
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
             * Creates a graph edge.
             *
             * @param startNode The node the edge eminates from.
             * @param endNode The node the edge ends on.
             */
            constructor(startNode: IEdgeEnd, endNode: IEdgeEnd);
        }
        /**
         * A graph node. Put these in Graph.ViewModel's graphNodes array.
         */
        class GraphNode extends GraphEntity {
            /**
             * The view model to use for displaying the graph node's content.
             */
            extensionViewModel: any;
            /**
             * A Knockout template describing what the graph node looks like.
             */
            extensionTemplate: string;
            /**
             * Called when the user activates the graph node (double click or something via accessibility).
             */
            activated(): void;
            /**
             * Only used for constructor purposes. Shouldn't be touched by the extension.
             */
            private _initialRect;
            /**
             * Creates an instance of a graph node.
             * @param initialRect Optional initial position and size information.
             */
            constructor(initialRect?: IUpdateRect);
        }
        /**
         * An abstract class for the graph port is the connection point where an edge attaches to a node.
         * Don't instantiate this.
         */
        class GraphNodePort extends GraphEntity {
            /**
             * The value indicates whether the port is connected or not.
             */
            connected: KnockoutObservable<boolean>;
            /**
             * The flag manages whether the port should be visible or not.
             */
            visible: KnockoutObservable<boolean>;
            private _parent;
            /**
             * Creates instance of a node port.
             * @param parentGraphNode The node the port belongs to.
             */
            constructor(parentGraphNode: GraphNode);
            /**
             * Gets parent node of the port.
             */
            parentNode: GraphNode;
        }
        /**
         * The graph node port the edge starts from.
         * Don't instantiate this.
         */
        class InputPort extends GraphNodePort {
            /**
             * Creates the input port instance.
             */
            constructor(hostNode: GraphNode);
        }
        /**
         * The graph node port the edge ends at.
         * Don't instantiate this.
         */
        class OutputPort extends GraphNodePort {
            /**
             * Creates the output port instance.
             */
            constructor(hostNode: GraphNode);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\GraphViewModel.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/GraphViewModel" {
    import KnockoutExtensions = require("Viva.Controls/Controls/Base/KnockoutExtensions");
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import GraphEntitiesAddition = require("Viva.Controls/Controls/Visualization/Graph/GraphEntitiesAddition");
    import GraphEntityViewModel = require("Viva.Controls/Controls/Visualization/Graph/GraphEntityViewModel");
    import Geometry = require("Viva.Controls/Controls/Visualization/Graph/Geometry");
    export = Main;
    module Main {
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
         * View model that represents a graph.
         */
        class ViewModel extends Base.ViewModel {
            /**
             * The strategy defining how edges connect to nodes and how they follow the nodes' moves. Default is EdgeConnectionStrategy.NodeCenter.
             */
            edgeConnectionStrategy: KnockoutObservable<EdgeConnectionStrategy>;
            /**
             * The editing capabilities the graph editor exposes. Default is GraphEditorCapabilities.None.
             */
            editorCapabilities: KnockoutObservable<GraphEditorCapabilities>;
            /**
             * All graph nodes in the graph.
             */
            graphNodes: KnockoutExtensions.IMutableObservableMap<GraphEntityViewModel.GraphNode>;
            /**
             * All edges in the graph.
             */
            edges: KnockoutExtensions.IMutableObservableMap<GraphEntityViewModel.GraphEdge>;
            /**
             * When dragging graph nodes, they snap to a grid. This is how many pixels wide and tall each grid cell is. Default is 10.
             */
            gridResolution: KnockoutObservable<number>;
            /**
             * Notifies subscribers when the a layout change has been committed to the graph.
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
            getLayoutNoOverlaps: KnockoutObservable<(changedNodes: StringMap<Geometry.IPoint>, rootId: string) => Promise.PromiseV<StringMap<Geometry.IPoint>>>;
            /**
             * Sets the rects for specified graph nodes.
             *
             * This can only be called after widgetAttached() is true, otherwise it will throw an exception.
             * All calls to this function will result in animation, so best practice is to initialize nodes with
             * their starting rects (per the optional constructor).
             * This API is used to allow the widget to track animated and comitted state, as well as allow for batch updates.
             *
             * @param rects Map of rects.
             * @param options Configuratble options (ex: undo/redo stack).
             * @return A promise that resolves once the changes have been applied.
             */
            setNodeRects: KnockoutObservable<(rects: StringMap<GraphEntityViewModel.IUpdateRect>, options?: GraphEntityViewModel.ISetNodeRectOptions) => Promise.Promise>;
            /**
             * Returns all rects for every graph node, or a specified list of graph node ids.
             *
             * This can only be called after widgetAttached() is true, otherwise it will throw an exception.
             *
             * @param ids The list of ids from which to return corresponding gaphNodes.
             * @return A promise that resolves with a string map of committed rects.
             */
            getNodeRects: KnockoutObservable<(ids?: string[]) => StringMap<Geometry.IRect>>;
            /**
             * Currently selected entities.
             */
            selectedEntities: KnockoutObservableArray<GraphEntityViewModel.GraphEntity>;
            /**
             * When true, the user can multi-select by clicking in the background and dragging. When false, clicking and dragging in the background pans.
             * Default is false.
             */
            rectSelectionMode: KnockoutObservable<boolean>;
            /**
             * Zooms to fit the graph in the viewport.
             */
            zoomToFit: KnockoutObservable<() => Promise.Promise>;
            /**
             * Zooms in.
             */
            zoomIn: KnockoutObservable<() => Promise.Promise>;
            /**
             * Zooms out.
             */
            zoomOut: KnockoutObservable<() => Promise.Promise>;
            /**
             * Zooms to 100%.
             */
            zoomTo100Percent: KnockoutObservable<() => Promise.Promise>;
            /**
             * If true, disable zoom in/out behavior on mouse wheel events. Default to false.
             */
            disableMouseWheelZoom: KnockoutObservable<boolean>;
            /**
             * The style skin applied to the graph editor defining canvas and entities styling (mostly colors).
             */
            private _styleSkin;
            /**
             * Creates instance of Graph ViewModel, optionally setting non-default style skin.
             */
            constructor(styleSkin?: GraphEditorSkinStyle);
            /**
             * If true, reduce opacity of all graph entities except the ones selected and the ones in its
             * upstream and downstream
             */
            enableLineage: KnockoutObservable<boolean>;
            /**
             * Teardown the view model.
             */
            dispose(): void;
            /**
             * Deletes the specified graph entities (nodes and edges).
             *
             * @param nodesToDelete The array of nodes to delete.
             * @param edgesToDelete The array of edges to delete.
             * @return JQuery promise object that is resolved when the operation completes or fails.
             */
            deleteEntities(nodesToDelete: IGraphNodeForDeletion[], edgesToDelete: IGraphEdgeForDeletion[]): JQueryPromise;
            /**
             * Adds the specified GraphEntityViewModel.GraphEdge instance to the list of the view model edges.
             *
             * @param edgeToAdd The edge instance to add.
             * @return JQuery promise object that is resolved when the operation completes or fails.
             */
            addEdge(edgeToAdd: GraphEntitiesAddition.IGraphEdgeForAddition): JQueryPromise;
            hasEditorCapability(capability: GraphEditorCapabilities): boolean;
        }
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
             * @param model GraphViewModel.ViewModel instance to run the deletion on.
             * @param nodesToDelete List of nodes to delete.
             * @param edgesToDelete List of edges to delete.
             */
            static run(model: ViewModel, nodesToDelete: IGraphNodeForDeletion[], edgesToDelete: IGraphEdgeForDeletion[]): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\GraphWidget.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/GraphWidget" {
    import KnockoutExtensions = require("Viva.Controls/Controls/Base/KnockoutExtensions");
    import GraphViewModel = require("Viva.Controls/Controls/Visualization/Graph/GraphViewModel");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    import Geometry = require("Viva.Controls/Controls/Visualization/Graph/Geometry");
    import GraphEntityViewModelViva = require("Viva.Controls/Controls/Visualization/Graph/GraphEntityViewModel");
    import GraphViewModelViva = require("Viva.Controls/Controls/Visualization/Graph/GraphViewModel");
    import MoveNodes = require("Viva.Controls/Controls/Visualization/Graph/Commands/MoveNodes");
    import ICommand = require("Viva.Controls/Controls/Visualization/Graph/Commands/ICommand");
    import GraphWidgetConstants = require("Viva.Controls/Controls/Visualization/Graph/GraphWidget.Constants");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
        }
        interface InteractionClassesInterface {
            Panning: string;
            Idle: string;
            MovingEntities: string;
            MakingConnection: string;
            MultiSelecting: string;
        }
        var InteractionClasses: InteractionClassesInterface;
        interface XEStateMachineInterface {
            ConnectionPendingThreshhold: number;
        }
        var XEStateMachine: {
            ConnectionPendingThreshhold: number;
        };
        /**
         * Has all the information of how to zooming. How much to zoom and around what point.
         */
        interface IZoomInfo {
            /**
             * The scale in the zoom operation.
             */
            scale: number;
            /**
             * The point about which to zoom.
             */
            location: Geometry.IPoint;
        }
        /**
         * The size of scrollbars given Browser, styling, etc.
         */
        interface IScrollBarSize {
            /**
             * The width of vertical scrollbars.
             */
            vertical: number;
            /**
             * The height of horizontal scrollbars.
             */
            horizontal: number;
        }
        /**
         * Used in our IE marker bug workaround. Pass this to the path binding.
         */
        interface IPathSpec {
            /**
             * The 'd' attribute that goes on the path element.
             */
            path: KnockoutObservable<string>;
            /**
             * The 'style' attribute that goes on the path element.
             */
            style: KnockoutObservable<string>;
            /**
             * The 'event' attribute that goes on the path element.
             */
            events: KnockoutObservable<string>;
            /**
             * The flag, indicates whether the path needs to have markers on it or not.
             */
            needMarkers: KnockoutObservable<boolean>;
            /**
             * The 'begin-marker' attribute that goes on the path element.
             */
            beginMarker: KnockoutObservable<string>;
            /**
             * The 'end-marker' attribute that goes on the path element.
             */
            endMarker: KnockoutObservable<string>;
            /**
             * The event handlers, defined for the path element.
             */
            event: KnockoutObservable<string>;
            /**
             * The 'class' attribute that goes on the path element.
             */
            cssClass: KnockoutObservable<string>;
            /**
             * To work around another IE bug where markers disappear
             */
            scale: KnockoutObservable<number>;
        }
        /**
        * A wrapper for registering and unregistering HammerEvents.
        */
        class HammerEventListenerSubscription implements KnockoutDisposable {
            private _handler;
            private _instance;
            private _eventType;
            /**
             * Constructs a wrapper for HammerEvent listeners that can remove them on dispose.
             *
             * @param element The element on which to attach the listener.
             * @param eventType The type of event to register (e.g. pinch, tap, etc.)
             * @param handler The callback to fire when the event occurs.
             * @param options The options to supply to the Hammer constructor
             */
            constructor(element: HTMLElement, eventType: string, handler: (e: HammerEvent) => void, options?: any);
            /**
             * Removes the registered event listeners.
             */
            dispose(): void;
        }
        /**
         * The graph widget instantiates high-level representations of entities that have
         * additional computeds and state.
         */
        class GraphEntityViewModel {
            /**
             * The inner entity this ViewModel wraps around.
             */
            entity: GraphEntityViewModelViva.GraphEntity;
            /**
             * Objects to be disposed.
             */
            private _disposables;
            /**
             * Set according to lineage display logic. If true, the entity should have a low opacity.
             */
            lineageDimmed: KnockoutObservable<boolean>;
            /**
             * Creates a graph entity. This class is abstract, do not instantiate it.
             * @param entity The entity this view model wraps around.
             */
            constructor(entity: GraphEntityViewModelViva.GraphEntity);
            /**
             * Adds an object to be disposed during cleanup.
             * @param disposable The object to be be disposed later.
             */
            addDisposableToCleanup(disposable: KnockoutDisposable): void;
            /**
             * Returns whether or not this entity completely resides in rect. Overloaded in child classes.
             * @param rect The enclosing rect to test.
             * @return true if this entity lies in the enclosing rect. False if not.
             */
            liesInRect(rect: Geometry.IRect): boolean;
            /**
             * Overloaded in child classes.
             */
            dispose(): void;
        }
        /**
         * Wraps graph ports to contain the additional computeds needed to correctly render ports.
         */
        class GraphNodePortViewModel extends GraphEntityViewModel {
            /**
             * The port entity reference.
             */
            port: GraphEntityViewModelViva.GraphNodePort;
            /**
             * The X coordinate of the port, relative to the host node X coordinate.
             */
            hostRelativeX: KnockoutObservable<number>;
            /**
             * The Y coordinate of the port, relative to the host node Y coordinate.
             */
            hostRelativeY: KnockoutObservable<number>;
            /**
             * The absolute X coordinate of the port on the canvas.
             */
            absoluteX: KnockoutObservable<number>;
            /**
             * The absolute Y coordinate of the port on the canvas.
             */
            absoluteY: KnockoutObservable<number>;
            private _displayX;
            private _displayY;
            private _displayR;
            private _displayCx;
            private _displayCy;
            private _displayClass;
            /**
             * Creates a graph node port view model.
             * @param graphPort The port this view model wraps around.
             */
            constructor(graphPort: GraphEntityViewModelViva.GraphNodePort);
            /**
             * Disposes computeds and subscriptions.
             */
            dispose(): void;
        }
        /**
         * Wraps graph nodes to contain the additional computeds needed to correctly render nodes.
         */
        class GraphNodeViewModel extends GraphEntityViewModel {
            /**
             * A typed alias for this.entity.
             */
            graphNode: GraphEntityViewModelViva.GraphNode;
            /**
             * The uncommitted (e.g. the user is dragging them) x coordinate of the top-left of the graph node.
             */
            x: KnockoutObservable<number>;
            /**
             * The uncommitted y coordinate of the top-left of the graph node.
             */
            y: KnockoutObservable<number>;
            /**
             * The input port on the node.
             */
            inputPort: GraphNodePortViewModel;
            /**
             * The output ports on the node.
             */
            outputPorts: KnockoutExtensions.IMutableObservableMap<GraphNodePortViewModel>;
            /**
             * The height of the graph node.
             */
            height: KnockoutObservable<number>;
            /**
             * The width of the graph node.
             */
            width: KnockoutObservable<number>;
            /**
             * The committed x coordinate of the top-left of the graph node.
             */
            committedX: KnockoutObservable<number>;
            /**
             * The committed y coordinate of the top-left of the graph node.
             */
            committedY: KnockoutObservable<number>;
            /**
             * The candidate x coordinate of where the top-left of the graph node would be in a potential uncommitted layout.
             */
            candidateX: KnockoutObservable<number>;
            /**
             * The candidate y coordinate of where the top-left of the graph node would be in a potential uncommitted layout.
             */
            candidateY: KnockoutObservable<number>;
            /**
             * When the user is dragging, this is the x coordinate where the top-left of the graph node should be.
             */
            draggedX: KnockoutObservable<number>;
            /**
             * When the user is dragging, this is the y coordinate where the top-left of the graph node should be.
             */
            draggedY: KnockoutObservable<number>;
            /**
             * Whether or not the node's x and y coordinates are equal to its committed x and y coordinates.
             */
            committed: KnockoutComputed<boolean>;
            /**
             * When true, this node is currently in the process of dynamically animating towards its committed x and y coordinates.
             */
            reverting: KnockoutObservable<boolean>;
            /**
             * When the user is dragging, whether or not the graph node's draggedX and draggedY are equal to its uncommitted x and y.
             * This can occur when the nodes have to move out of the way to prevent overlaps, as well as snapping to grid
             * when the user hovers.
             */
            dragAdjusted: KnockoutComputed<boolean>;
            /**
             * Whether the node is hovered as a source node during the process of edge creation or not.
             */
            newEdgeDraftSource: KnockoutObservable<boolean>;
            /**
             * Whether the node is hovered as a target node during the process of edge creation or not.
             */
            newEdgeDraftTarget: KnockoutObservable<boolean>;
            /**
             * Whether the node is hovered.
             */
            hovered: KnockoutObservable<boolean>;
            /**
             * Currently choosen graph style skin. Set by looking at parent widget ViewModel.
             */
            styleSkin: KnockoutObservable<GraphViewModelViva.GraphEditorSkinStyle>;
            /**
             * Whether the node is hovered during the process of edge creation or not.
             */
            acceptsNewEdge: KnockoutObservable<boolean>;
            private _displayHeight;
            private _displayWidth;
            private _displayClass;
            private _displayX;
            private _displayY;
            private _xSubscription;
            private _ySubscription;
            private _heightSubscription;
            private _widthSubscription;
            private _moveAnimation;
            private _endDragAnimation;
            private _mouseMoveAnimationFrame;
            /**
             * When true, this node is currently in the process of dynamically animating towards its draggedX and draggedY coordinates.
             */
            private _dragUnadjusting;
            /**
            * Snaps a value to a given grid with this node's parent widget's grid resolution.
            *
            * @param value The value to be snapped
            * @return The snapped value.
            */
            snappedValue: (value: number) => number;
            /**
             * Creates a wrapper view model for graph nodes. This wrapper contains extra state needed for interacting
             * with the graph control.
             *
             * @param graphNode The inner graph node this wraps.
             * @param parentWidget The graph control using this node.
             */
            constructor(graphNode: GraphEntityViewModelViva.GraphNode, parentWidget: Widget);
            private _createPorts(graphNode);
            private _topOutPort;
            private _bottomOutPort;
            private _leftOutPort;
            private _rightOutPort;
            /**
             * Tears down this node.
             */
            dispose(): void;
            /**
             * Returns true if this graph nodes lies completely in the passed rectangle.
             *
             * @param rect The enclosing rectangle.
             * @return Returns true if the graph node in the rectangle. False if not.
             */
            liesInRect(rect: Geometry.IRect): boolean;
            /**
             * Signals this node is ending its move operation.
             */
            endMove(): void;
            /**
            * Cancels this node's current move animation.
            */
            stopAnimation(): void;
            /**
            * Animates this node to its candidate layout position.
            */
            applyCandidate(): void;
            /**
            * Animates this node from its current position to where the user actually dragged it.
            */
            dragUnadjust(): void;
            /**
             * Animate this node from its current position to its last committed position.
             */
            revert(duration?: number): void;
            /**
             * Moves this node from its current position to its last committed position.
             */
            revertNoAnimation(): void;
            /**
             * Animate this node from its current position to its last committed position, stopping any previous animation if necessary.
             */
            revertStatic(duration?: number): void;
            /**
             * Changes the internal graphNode viewmodel of this node while maintaining the external x and y cordinates.
             *
             * @param x The desired internal graphNode x cordinate.
             * @param y The desired internal graphnode y cordinate.
             */
            commit(x: number, y: number): void;
            /**
             * Helper for creating animation from the current x and y coordinates to a destination.
             *
             * @param destinationX Either a number or a KnockoutObservable<number>.
             * @param destinationY Either a number or a KnockoutObservable<number>.
             * @param duration How long the animation should last in milliseconds.
             * @return The new move Animation.
             */
            private _createMoveAnimation(destinationX, destinationY, duration);
            /**
            * Snaps a value to a given grid with a specified resolution.
            *
            * @param val The value to be snapped.
            * @param movingAllowed Whether or not the graph is read-only.
            * @param gridResolution The resolution of the grid.
            * @return The snapped value.
            */
            private _snapToGrid(val, movingAllowed, gridResolution);
            /**
             * Re-calculates all ports' relative and absolute position.
             */
            private _layoutAllPorts();
            private _setInputPortRelativePosition();
            private _setOutputPortRelativePosition();
            private _setPortsAbsoluteXPosition();
            private _setPortsAbsoluteYPosition();
        }
        /**
         * Wrapper containing state needed for rendering edges in graph widget.
         */
        class GraphEdgeViewModel extends GraphEntityViewModel {
            /**
             * The inner graph edge.
             */
            graphEdge: GraphEntityViewModelViva.GraphEdge;
            /**
             * The start node from which this edge egresses.
             */
            startNode: GraphNodeViewModel;
            /**
             * The end node to which this edge ingresses.
             */
            endNode: GraphNodeViewModel;
            /**
             * The computed x,y for the egress point.
             */
            startPoint: KnockoutComputed<Geometry.IPoint>;
            /**
             * The computed x,y for the ingress point.
             */
            endPoint: KnockoutComputed<Geometry.IPoint>;
            /**
             * The path that defines this edge's SVG path d attribute.
             */
            path: KnockoutComputed<string>;
            /**
             * The flag indicating whether the edge path need markers or not.
             */
            needMarkers: KnockoutComputed<boolean>;
            /**
             * Currently choosen graph style skin. Set by looking at parent widget ViewModel.
             */
            private _styleSkin;
            /**
             * The computed class for this edge's line.
             */
            private _lineDisplayClass;
            /**
             * The computed stroke-dasharray attribute for this edge's line.
             */
            private _strokeDashArray;
            /**
             * The computed stroke-width attribute for this edge's line.
             */
            private _strokeWidth;
            /**
             * Creates a wrapper that contains extra state for rendering edges in the graph widget.
             *
             * @param graphEdge The edge this wrapper wraps.
             * @param startNode The node from which this edge egresses.
             * @param endNode The node to which this edge ingresses.
             */
            constructor(graphEdge: GraphEntityViewModelViva.GraphEdge, startNode: GraphNodeViewModel, endNode: GraphNodeViewModel, parentWidget: Widget);
            /**
             * Dispose of this edge wrapper.
             */
            dispose(): void;
            /**
             * Returns whether this edge lies in the passed rectangle or not.
             *
             * @param rect The bounding rectangle to test.
             * @return True if this lies in the passed rectangle. False if not.
             */
            liesInRect(rect: Geometry.IRect): boolean;
        }
        class MoveNodesCommit {
            /**
             * The positions of all graph nodes that were explicitly moved by this commit.
             */
            movedNodePositions: StringMap<Geometry.IPoint>;
            /**
             * A promise that's resolved when this commit is complete.
             */
            promise: Promise.Promise;
            /**
             * The command in the widget's undo/redo queue.
             */
            command: MoveNodes.MoveNodesCommand;
            /**
             * This commit's parent widget.
             */
            widget: Widget;
            private _deferred;
            private _draggingNodeUnderCursor;
            private _canceled;
            constructor(movedNodePositions: StringMap<Geometry.IPoint>, draggingNodeUnderCursor: string, command: MoveNodes.MoveNodesCommand, widget: Widget);
            /**
             * Handles whether or not a specified graphNode should animate or just commit, given the current state of the node and the widget.
             * @param graphNode The graphNodeViewModel.
             * @return True if the node should move.
             */
            shouldAnimate(graphNode: GraphNodeViewModel): boolean;
            /**
             * Fetches a candidate and applies it.
             */
            execute: () => void;
            /**
             * Cancels this commit.
             */
            cancel: () => void;
            /**
             * Returns true when this commit causses overlaps.
             */
            static causesOverlaps(movedNodePositions: StringMap<Geometry.IPoint>, widget: Widget): boolean;
            /**
            * Searches through the widget's commitQueue and returns true if this id is
            * ever explicitly moved by any of the commits.
            *
            * @param id Id of the node
            * @return True if this id is in the pushingIds of the queue
            */
            private _inQueue(id);
            private _done;
            /**
            * Handler for getLayoutNoOverlaps. Should only be called in MoveNodesCommit.exectute().
            */
            private _fail;
        }
        class SynchronousMoveCommit extends MoveNodesCommit {
            private _syncDeferred;
            private _rects;
            constructor(rects: StringMap<GraphEntityViewModelViva.IUpdateRect>, command: MoveNodes.MoveNodesCommand, widget: Widget);
            execute: () => void;
        }
        /**
         * Utility class for edges creation
         */
        class EdgeCreator {
            /**
             * Output port used for the edge creation.
             */
            startPort: GraphEntityViewModelViva.OutputPort;
            /**
             * Input port used for the edge creation.
             */
            endPort: GraphEntityViewModelViva.InputPort;
            /**
             * X-coordinate of the edge draft start point.
             */
            x1: KnockoutObservable<number>;
            /**
             * Y-coordinate of the edge draft start point.
             */
            y1: KnockoutObservable<number>;
            /**
             * X-coordinate of the edge draft end point.
             */
            x2: KnockoutObservable<number>;
            /**
             * Y-coordinate of the edge draft end point.
             */
            y2: KnockoutObservable<number>;
            /**
             * A flag indicates whether the edge draft line is a preview of what the edge would look like upon creation completion.
             */
            isPreview: KnockoutObservable<boolean>;
            /**
             * Svg translation applied.
             */
            translation: KnockoutComputed<string>;
            /**
             * A flag indicates whether the edge creator currently working on an edge creation.
             */
            creatingNewEdge: KnockoutObservable<boolean>;
            /**
             * A flag to indicate if the connector line is visible or not
             */
            visible: KnockoutObservable<boolean>;
            /**
             * Creates an edge creator that manages state when connecting nodes.
             */
            constructor();
            onMouseMove(x: number, y: number, entity: GraphEntityViewModelViva.GraphEntity): void;
            /**
             * Resets the state of the edge creator to "nothing is being created" state.
             */
            reset(): void;
            /**
             * Starts an Edge creation.
             * @param source The first port for the Edge
             */
            startEdgeCreation(source: GraphNodePortViewModel): void;
            /**
             * Ends an Edge creation.
             * @param destination The entity the user ended the Edge on. If the entity is an input port or a node, the Edge will finalize.
             * @param x The domain x coordinate where the Edge ended.
             * @param y The domain y coordinate where the Edge ended.
             */
            endEdgeCreation(destination: GraphEntityViewModel, x: number, y: number): GraphEntityViewModelViva.GraphEdge;
        }
        /**
         * The widget for viewing and manipulating graphs.
         */
        class Widget extends Base.Widget implements Interface {
            private static scrollBarSizes;
            /**
             * The manager of edge creation.
             */
            edgeCreator: EdgeCreator;
            /**
             * The manager of selection. Don't disturb the selection manager.
             */
            selectionManager: SelectionManager;
            /**
             * The set of all graph node view models in this graph.
             */
            graphNodes: KnockoutExtensions.IObservableMap<GraphNodeViewModel>;
            /**
             * The set of all graph edge view models in this graph.
             */
            graphEdges: KnockoutExtensions.IObservableMap<GraphEdgeViewModel>;
            /**
             * The union of all graph node and edge view models.
             */
            graphEntities: KnockoutExtensions.IObservableMap<GraphEntityViewModel>;
            /**
             * The state machine that handles user interactions. You shouldn't need to touch this.
             */
            interactionStateMachine: InteractionStateMachine;
            /**
             * How zoomed in the user is.
             */
            scale: KnockoutObservable<number>;
            /**
             * Log_1.1(scale)
             */
            logScale: KnockoutComputed<number>;
            edgesJoinNodesOnPorts: KnockoutComputed<boolean>;
            /**
             * Whether or not the nodes are locked.
             */
            nodesLocked: KnockoutObservable<boolean>;
            /**
             * Whether or not we're currently committing.
             */
            committing: KnockoutObservable<boolean>;
            /**
             * Queued commits.
             */
            commitQueue: MoveNodesCommit[];
            /**
             * Map of all node locations at the beginning of a move.
             */
            nodeMoveStartLocations: StringMap<Geometry.IPoint>;
            /**
             * Currently choosen graph style skin.
             */
            styleSkin: KnockoutObservable<GraphViewModelViva.GraphEditorSkinStyle>;
            private _mouseCapture;
            private _matrixTransform;
            private _movingGraphNodes;
            private _draggingNodeUnderCursor;
            private _lastMove;
            private _nodesMoved;
            private _candidatePromise;
            private _holdTimeout;
            private _currentCommit;
            private _graphNodesById;
            private _graphEdgesById;
            private _lastAnimatedScale;
            private _undoStack;
            private _redoStack;
            private _scrollBarSizes;
            private _viewUpdatingHorizontalScrollbar;
            private _viewUpdatingVerticalScrollbar;
            private _mouseMoveAnimationFrame;
            private _touchMoveAnimationFrame;
            private _touchZoomAnimationFrame;
            private _defaultTouchAction;
            private _currentPanZoomAnimation;
            private _currentPanZoomAnimationFinishedSubscription;
            private _endFeedbackAnimation;
            private _overlayLeft;
            private _overlayRight;
            private _overlayBottom;
            private _overlayTop;
            private _intertiaVelocityX;
            private _intertiaVelocityY;
            private _lastInertiaTime;
            private _inertiaAnimationFrame;
            private _inertiaPanningSubscription;
            private _topLeft;
            private _classes;
            private _lastContainerWidth;
            private _lastContainerHeight;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed GraphViewModel.ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget GraphViewModel.ViewModel type.
             */
            constructor(element: JQuery, options?: GraphViewModel.ViewModel, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget GraphViewModel.ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * Handler for the external viewmodel function.
             */
            setNodeRects: (rects: StringMap<GraphEntityViewModelViva.IUpdateRect>, options: GraphEntityViewModelViva.ISetNodeRectOptions) => Promise.Promise;
            /**
             * Handler for the external viewmodel function.
             */
            getNodeRects: (ids?: string[]) => StringMap<Geometry.IRect>;
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * Updates the move start locations.
             */
            private updateMoveStartLocations();
            /**
             * Returns the height of horizontal scroll bars and the width of vertical scrollbars (i.e. the invariant dimension).
             *
             * @return horizontal Contains the height of horizontal scrollbars and vertical contains the width of vertical scrollbars.
             */
            private static ScrollBarSizes;
            /**
             * Returns the dimensions of the graph view in client coordinates.
             *
             * @return The x and y offset on the page as well as the height and width of the view in client coordinates.
             */
            viewDimensions: Geometry.IRect;
            /**
             * See interface.
             */
            options: GraphViewModel.ViewModel;
            /**
             * The root SVG container for the connections.
             */
            private _svgRootElement;
            /**
             * The element containing the SVG scale and pan transforms.
             */
            private _transformElement;
            /**
             * The element containing and transforming the div overlays.
             */
            private _graphOverlay;
            /**
             * Returns the dimensions of the entire experiment in domain coordinates
             */
            private _graphBounds;
            /**
             * Converts user space screen coordinates to graph coordinates.
             *
             * @param clientPoint The point to convert in screen coordinates.
             * @return The input point in graph coordinates.
             */
            clientToDomainCoordinates(clientPoint: Geometry.IPoint): Geometry.IPoint;
            /**
             * Zooms and pans to at a specified scale centered around a specific point.
             *
             * @param clientDx The amount to pan in the x direction in client-space coordinates.
             * @param clientDy The amount to pan in the y direction in client-space coordinates.
             * @param domainCoords The domain coordinates to zoom about.
             * @param targetScale The scale to zoom to.
             */
            pinchZoom(clientDx: number, clientDy: number, domainCoords: Geometry.IPoint, targetScale: number): void;
            /**
            * Starts inertia at specified velocities.
            *
            * @param inertiaVelocityX Signed velocity in the x direction.
            * @param inertiaVelocityY Signed velocity in the y direction.
            */
            startInertia(inertiaVelocityX: number, inertiaVelocityY: number): void;
            /**
             * Pans the user's view by some delta in client coordinates.
             *
             * @param clientDx the amount to pan in the x direction in client-space coordinates
             * @param clientDy the amount to pan in the y direction in client-space coordinates
             */
            pan(clientDx: number, clientDy: number): void;
            /**
             * Performs a pan with feedback (pan boundry with visible spring).
             *
             * @param clientDx the amount to pan in the x direction in client-space coordinates
             * @param clientDy the amount to pan in the y direction in client-space coordinates
             */
            panWithFeedback(clientDx: number, clientDy: number): void;
            /**
             * Returns the maximum feedback distance from all directions.
             * @return The maximum feedback distance for all directions.
             */
            maxFeedbackDistance(): number;
            /**
             * Returns whether or not any feedback is currently showing.
             * @return true if feedback is currently showing.
             */
            feedbackShowing(): boolean;
            /**
             * Animates after feedback is finished.
             * @param callback Optional function to be called once feedback has animated back into place.
             */
            animateEndFeedback(callback?: () => void): void;
            /**
             * Call this when the user starts dragging entities.
             */
            beginMoveSelectedEntities(): void;
            /**
             * Call this when the user drags entities.
             *
             * @param domainDx The amount the mouse moved since the last update in domain coordinates in the x direction.
             * @param domainDy The amount the mouse moved since the last update in domain coordinates in the y direction.
             */
            moveSelectedEntities(domainDx: number, domainDy: number): void;
            /**
             * Call this when the user cancels moving selected entities.
             */
            cancelMoveSelectedEntities(): void;
            /**
             * Call this when the user is done dragging the selected entities around.
             */
            endMoveSelectedEntities(): void;
            /**
             * Selects all graph nodes and edges.
             */
            selectAllEntities(): void;
            /**
             * Starts edge creation from the specified port.
             * @param domainCoords Source port to create edge from.
             */
            startEdgeCreation(source: GraphNodePortViewModel): void;
            /**
             * Tracks the movement of the edge draft from the source port to target node.
             * @param domainCoords Current position of mouse pointer.
             */
            moveConnection(domainCoords: Geometry.IPoint): void;
            /**
             * Cancels edge creation process.
             */
            cancelEdgeCreation(): void;
            /**
             * Finishes edge creation process, adds created edge to the map of edges.
             */
            endEdgeCreation(destination: GraphEntityViewModel, domainCoords: Geometry.IPoint): void;
            /**
             * Computes the canvas pan limits which are used both for scroll bar elevator sizing and to prevent the user from getting lost while they are panning.
             * These limits are a function of where the user is currently viewing and the bounds of the graph.
             *
             * @param scale The scale for which to get the pan limits.
             * @return The pan limits denoted by the top left corner (x,y) and the panning area (width,height)
             */
            getPanLimits(scale?: number): Geometry.IRect;
            /**
             * Zooms in or out about the center of the graph
             *
             * @param steps The number of steps to zoom. Positive zooms in, negative out.
             * @param animate Whether the zoom should be animated or instantaneous.
             */
            private _zoomAboutCenter(steps, animate?);
            /**
             * Zooms to a point given a scale.
             *
             * @param targetScale The scale to be zoomed to.
             * @param domainCoords The point to be zoomed about.
             */
            zoomAboutPoint(targetScale: number, domainCoords: Geometry.IPoint): void;
            /**
             * Performs a zoom to fit with animation.
             */
            private _zoomToFitWithAnimation();
            /**
             * Animates such that target becomes the top left corner of the control at the specified scale.
             *
             * @param target The point that will become the new top-left corner.
             * @param targetScale The desired scale.
             */
            animateToLocation(target: Geometry.IPoint, targetScale?: number): void;
            /**
             * Executes a command, pushes it onto the undo stack, and clears the redo stack.
             *
             * @param command the command to run
             */
            executeNewCommand(command: ICommand.ICommand): void;
            /**
             * Pushes it onto the undo stack, and clears the redo stack.
             *
             * @param command the command to push
             */
            pushNewCommand(command: ICommand.ICommand): void;
            /**
             * Pops the top command off the undo stack, undoes it, and pushes it onto the redo stack.
             */
            undo(): void;
            /**
             * Pops the top command off the undo stack, executes it, and pushes it on the undo stack.
             */
            redo(): void;
            /**
             * Brings a graph node into view and selects it.
             *
             * @param graphNodeViewModel the view model for the graph node to focus on
             */
            focusOnGraphNode(graphNodeViewModel: GraphNodeViewModel): void;
            /**
             * Animates the desired rectangular region into view. If already in view, this is a no-op.
             *
             * @param rect the rectangle to bring into view
             */
            private bringRectIntoView(rect);
            /**
             * Handles requesting only one candidate from the server at a time.
             */
            private _requestCandidate(changedNodes);
            /**
             * Cancels a previously requested candidate.
             */
            private _cancelRequestCandidate();
            /**
             * Synchronizes the scrollbar positions with the view dimensions and where the user is looking.
             */
            private _updateScrollbars;
            /**
             * This is our primitive for setting view. The user passes the domainX and Y of the top
             * left corner of the screen they want and the zoom level they want. This should be the only
             * function that writes to the transform matrix.
             *
             * @param domainCoords The desired top left corner of the screen in domain units.
             * @param scale The desired scale.
             */
            private _setOriginAndZoom(domainCoords, scale?);
            /**
             * Immediately zooms the control about a point without animation.
             *
             * @param targetScale the desired scale after the zoom operation
             * @param domainCoords the point about which to zoom
             */
            private _zoomWithoutAnimation(targetScale, domainCoords);
            /**
             * Calculates the new top left of the view and scale given a desired scale and point around which to zoom.
             *
             * @param targetScale the desired scale the view should have
             * @param domainCoords the point about which to zoom in or out
             */
            private _zoomToPoint(targetScale, domainCoords);
            /**
             * Computes the top left corner and scale for zoom to fit.
             *
             * @return The scale and top-left corner for a zoom-to-fit operation.
             */
            private _computeZoomToFitLocation();
            /**
             * Computes the new scale sooming in by steps number of steps (which can be negative for zoom out).
             * This computed scale is relative to the current scale.
             *
             * @param steps the number of steps to zoom in our out. In is positive, out is negative.
             * @return the new scale that will result from zooming in or out.
             */
            private _calculateNewZoom(steps);
            /**
            * Moves the feedback for each specified direction in client cordinates
            *
            * @param top Change in feedback from the top in px
            * @param right Change in feedback from the right in px
            * @param bottom Change in feedback from the bottom in px
            * @param left Change in feedback from the left
            */
            private _moveFeedback(top, right, bottom, left);
            /**
            * Sets the feedback in each specified direction in client cordinates
            *
            * @param top Feedback from the top in px
            * @param right Feedback from the right in px
            * @param bottom Feedback from the bottom in px
            * @param left Feedback from the left in px
            */
            private _setFeedback(top, right, bottom, left);
            /**
             * Sets up event listeners for interacting with the control. They're added for auto-disposal.
             */
            private _setupEventListeners();
            private _updateInputPortsConnectedState();
            /**
             * Handles a candidate layout being requested.
             * @param pushingNodes The nodes that should move as little as possible.
             */
            private _onRequestCandidate(pushingNodes);
            /**
             * Reverts all nodes to their committed position (except for those currently being dragged).
             */
            private _revertNodes();
            /**
             * Handles the user committing their layout.
             */
            private _onCommit(pushingNodes, command);
            /**
             * Adds a commit to the existing queue or runs it immediately.
             */
            private _addCommit(commit);
            /**
            * Returns whether or not autolayout is disabled.
            * @return True if autolayout is disabled.
            */
            private _layoutDisabled();
            /**
             * See base.
             */
            _getElementToFocus(): Element;
            /**
             * Callback for when the user moves the mouse after pressing a mouse button.
             */
            _dragMouseMove: (e: MouseEvent) => void;
            /**
             * Callback for when the user releases a mouse button.
             *
             * @param e The mouse event.
             */
            _dragMouseUp: (e: MouseEvent) => void;
            /**
             * Callback for when the user hovers a graph entity with a mouse.
             *
             * @param graphEntity the view model backing the thing which they hovered.
             */
            _entityMouseEnter: (graphEntity: GraphEntityViewModel) => void;
            /**
             * Callback for when the user leaves a hover off a graph entity with a mouse.
             *
             * @param graphEntity the view model backing the thing which they left the mouse hover.
             */
            _entityMouseLeave: (graphEntity: GraphEntityViewModel) => void;
            /**
             * Callback for when the user double-clicks on a graph entity.
             *
             * @param graphEntity the view model backing the thing on which double-clicked the mouse button.
             */
            _entityMouseDoubleClick: (graphEntity: GraphEntityViewModel) => void;
            /**
             * Callback for when the user presses a mouse button on a graph entity.
             *
             * @param graphEntity the view model backing the thing on which they pressed the mouse button.
             * @param e The mouse event.
             */
            _entityMouseDown: (graphEntity: GraphEntityViewModel, e: MouseEvent) => boolean;
            /**
             * Callback for then the user releases a mouse button on a graph entity.
             *
             * @param graphEntity the view model backing the thing on which they released the mouse button.
             * @param e The mouse event.
             */
            _entityMouseUp: (graphEntity: GraphEntityViewModel, e: MouseEvent) => void;
            /**
             * Callback for when the user presses a mouse button on the canvas.
             *
             * @param canvasViewModel Unused, but Knockout passes view models first in its event binding.
             * @param e The mouse event.
             */
            _canvasMouseDown: (canvasViewModel: GraphViewModel.ViewModel, e: MouseEvent) => boolean;
            /**
             * Callback for when the user releases a mouse button on the canvas.
             *
             * @param canvasViewModel Unused, but Knockout passes view models first in its event binding.
             * @param e The mouse event.
             */
            _canvasMouseUp: (canvasViewModel: GraphViewModel.ViewModel, e: MouseEvent) => void;
            /**
             * Callback for when the user scrolls the mouse wheel.
             *
             * The default behavior is for the mouse wheel to zoom the graph control in or out.
             * If the disableMouseWheelZoom option is set to true, the mouse wheel will instead pan the graph control up or down.
             *
             * @param e The mouse wheel event. This could be WheelEvent or MouseWheelEvent, depending on what the browser supports.
             */
            _mouseWheel: (e: any) => void;
            /**
             * Callback for when the graph control resizes for any reason.
             */
            _resize: () => void;
            /**
             * Callback for when the user mousedowns on the scrollbar. Stops events from propagating.
             *
             * @param viewModel The view model of the graph control.
             * @param e The mouse event.
             * @return Returns to true to tell Knockout to not prevent default.
             */
            _scrollBarMouseDown: (viewModel: any, e: MouseEvent) => boolean;
            /**
             * Callback for when the user slides the horizontal scrollbar.
             *
             * @param e The scroll event.
             */
            _scrollX: (e: Event) => void;
            /**
             * Callback for when the user slides the vertical scrollbar.
             *
             * @param e The scroll event.
             */
            _scrollY: (e: Event) => void;
            /**
             * Handles key down events when the user presses a keyboard key.
             *
             * @param e The keyboard event.
             */
            _keyDown: (e: KeyboardEvent) => void;
            /**
             * Callback for when the user depresses a keyboard key.
             *
             * @param e The keyboard event.
             */
            _keyUp: (e: KeyboardEvent) => void;
            /**
            * Handles the beginning and end of all gestures.
            *
            * @param e The gesture event
            */
            _onGesture: (e: HammerEvent) => void;
            /**
             * Zooms and pans using a Hammer pinch event.
             *
             * @param e The pinch event
             */
            _onPinch: (e: HammerEvent) => void;
            /**
             * Handles the screen being dragged.
             *
             * @param e The drag event
             */
            _onDrag: (e: HammerEvent) => void;
            /**
            * Handles the screen being tapped.
            *
            * @param e The tap event
            */
            _onTap: (e: HammerEvent) => void;
            /**
            * Pans with inertia using a Hammer swipe event.
            *
            * @param e The swipe event
            */
            _onSwipe: (e: HammerEvent) => void;
            /**
            * Handles a hold on the screen.
            *
            * @param e The hold event
            */
            _onHold: (e: HammerEvent) => void;
            /**
             * Handles a node being dragged.
             *
             * @param viewModel The GraphNodeViewModel of the node being handled
             * @param e The drag event
             */
            _onNodeDrag: (viewModel: GraphNodeViewModel, e: HammerEvent) => void;
            /**
            * Handles a node being swiped.
            *
            * @param viewModel The GraphNodeViewModel of the node being handled
            * @param e The swipe event
            */
            _onNodeSwipe: (viewModel: GraphNodeViewModel, e: HammerEvent) => void;
            /**
             * Handles a tap on an entity.
             *
             * @param viewModel The GraphEntityViewModel of the entity being handled
             * @param e The tap event
             */
            _onEntityTap: (viewModel: GraphEntityViewModel, e: HammerEvent) => void;
            /**
            * Handles a doubletap on an entity.
            * Note: when the user doubletaps, only the doubletap event will fire, not a second tap event.
            *
            * @param viewModel The GraphEntityViewModel of the entity being doubletapped
            * @param e The doubletap event
            */
            _onEntityDoubleTap: (viewModel: GraphEntityViewModel, e: HammerEvent) => void;
            /**
             * Returns true if the specified event's target or any of its ancestors has the 'msportalfx-graph-ignore-input' CSS class
             *
             * @param e The event with the target element to check
             * @return A Boolean indicating whether the Graph should ignore the event
             */
            _shouldIgnoreEvent: (e: Event) => boolean;
            /**
             * Returns a string with the name of the mouse wheel event handler to listen to
             *
             * @param el The element to attach the event listener to
             * @return A string with the name of the event to listen to
             */
            _getMouseWheelEventName: (el: any) => string;
            private _forwardAdjacencyList;
            private _reverseAdjacencyList;
            /**
             * Create forward and backward adjacency list for the directed graph
             */
            private _createAdjacencyList();
            /**
             * Modify opacity of graph entities to display lineage of selected nodes.
             */
            private _displayLineage();
            /**
             * Run BFS from the selected nodes to identify the entities that should not be dimmed.
             *
             * @param undimmedNodes Set of nodes that should not be dimmed
             * @param undimmedEdges Set of edges that should not be dimmed
             * @param adjacencyList Directed graph as adjacency list
             * @param selectedNodes List of nodes that have been selected
             */
            private _identifyEntitiesToHighlight(undimmedNodes, undimmedEdges, adjacencyList, selectedNodes);
            /**
             * Set lineageDimmed state for all nodes to be false
             */
            private _highlightAllEntities();
        }
        /**
         * This is the state machine for handling user actions in the graph viewer. It tracks a user's intent,
         * such as making a connection or dragging a rectangle by handling actions, such as mouse up or down on various objects.
         * Shamelessly stolen from DataLab.
         */
        class InteractionStateMachine {
            /**
             * True if the user isn't currently performing an interaction.
             */
            atRest: KnockoutComputed<boolean>;
            /**
             * The intent behind the current drag operation. None if the user isn't dragging.
             */
            dragging: KnockoutObservable<GraphWidgetConstants.DraggingMode>;
            /**
             * CSS classes to put on the DOM as a result of the user's interaction.
             */
            classes: KnockoutComputed<string>;
            /**
             * True if we're currently panning with inertia
             */
            intertiaPanning: KnockoutObservable<boolean>;
            private _widget;
            private _lastMouseCoords;
            private _lastDomainCoords;
            private _lastTouchCoords;
            private _lastTouchDomainCoords;
            private _lastTouches;
            private _touchHeld;
            private _leftMousePanning;
            private _centerMousePanning;
            private _spacebarHeld;
            private _mouseDownDomainCoords;
            private _mouseDownEvent;
            private _mouseDownEntity;
            private _gestureScale;
            private _gestureDomainCoords;
            private _connectionDragPending;
            private _gesturing;
            private _pendingClearSelection;
            /**
             * Creates a state machine for handling user interation.
             *
             * @param widget The parent widget that will use this state machine.
             */
            constructor(widget: Widget);
            /**
             * Responds to a user action.
             *
             * @param action The user's action.
             * @param e If the action is a mouse or keyboard action, the associated event.
             * @param relevantEntity If acting upon something in the graph widget, what they're acting on.
             */
            handleAction(action: GraphWidgetConstants.InteractionAction, e?: Event, relevantEntity?: GraphEntityViewModel): void;
            /**
             * Dispose of the state machine.
             */
            dispose(): void;
        }
        /**
     * A class that provides support for item selection (single or multiple).
     * The multi selection works in the following way. The selection process
     * is done by creating a selection rectangle R(P1, P2) in 2 steps. The first
     * step is to capture the P1 position and the second step is to capture P2.
     * Once P2 is captured, all 'entities' that intersect with the R(P1, P2) will
     * be selected. It assumes that each entity implements ISprite interface.
     *
     * This class also features a smart rectangle selection in that it detects
     * the vector direction of the P1->P2 points and know how to perform collision
     * detection correctly regardless of the direction of the P1->P2 points.
     */
        class SelectionManager {
            /**
             * The set of selected graph nodes.
             */
            selectedGraphNodeViewModels: KnockoutExtensions.IMutableObservableMap<GraphNodeViewModel>;
            /**
             * The set of selected graph edges.
             */
            selectedGraphEdgeViewModels: KnockoutExtensions.IMutableObservableMap<GraphEdgeViewModel>;
            /**
             * The start point for the multi-selection rectangle
             */
            multiSelectStartPoint: KnockoutObservable<Geometry.IPoint>;
            /**
             * The current end point for the multi-selection rectangle
             */
            multiSelectCurrentPoint: KnockoutObservable<Geometry.IPoint>;
            /**
             * The bounds of the selection rectangle
             */
            selectionRect: KnockoutComputed<Geometry.IRect>;
            private _multiSelecting;
            private _selectedEntities;
            private _selectedEntitiesSubscription;
            constructor(selectedEntities: KnockoutObservableArray<GraphEntityViewModelViva.GraphEntity>);
            /**
             * Cleanup.
             */
            dispose(): void;
            /**
             * Deselects the given entity.
             *
             * @param entityViewModel The entity to deselect.
             */
            deselectEntity(entityViewModel: GraphEntityViewModel): void;
            /**
             * Removes all items from the selection.
             */
            resetSelection(): void;
            /**
             * Batches multiple selection updates to minimize the number of knockout updates.
             *
             * @param callback A callback that does multiple operations to selection.
             */
            modifySelection(callback: () => void): void;
            /**
             * Adds an entity to the current selection.
             *
             * @param entityViewModel the entity to select.
             */
            selectEntity(entityViewModel: GraphEntityViewModel): void;
            /**
             * Toggles an entity's selection state.
             *
             * @param entityViewModel the entity to toggle selection state
             */
            toggleEntitySelection(entityViewModel: GraphEntityViewModel): void;
            /**
             * Starts a drag multi-selection. Note that rect selections do not clear the current selection
             * @param location the x, y domain coordinates to start the drag
             */
            beginRectSelection(location: Geometry.IPoint): void;
            /**
             * Ends a drag multi-selection. All entities in 'entities' fully enclosed by the selection
             * rectangle are added to the current user selection.
             *
             * @param point the x, y domain coordinate to end the drag
             * @param entities an array of all entities to test for selection
             */
            endRectSelection(point: Geometry.IPoint, entityViewModels: KnockoutExtensions.IObservableMap<GraphEntityViewModel>): void;
            /**
             * Aborts a drag multi-selection. Nothing is added to the current user selection.
             */
            cancelRectSelection(): void;
            /**
             * Updates the current drag selection rectangle. The rectangle will extend from the point
             * where start was called to the current mouse location.
             *
             * @param point the current x domain coordinate of the mouse
             */
            updateRectSelection(point: Geometry.IPoint): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\GraphWidget.Constants.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/GraphWidget.Constants" {
    import GraphEntityViewModel = require("Viva.Controls/Controls/Visualization/Graph/GraphEntityViewModel");
    export = Main;
    module Main {
        var NodeEdgePadding: number;
        var SixtyFPS: number;
        var PanPadding: number;
        var ZoomFactor: number;
        var MinScale: number;
        var MaxScale: number;
        var ZoomToFitPadding: number;
        var AnimatedZoomDuration: number;
        var SnapAnimationDuration: number;
        var MoveAnimationDuration: number;
        var EscAnimationDuration: number;
        var UndoAnimationDuration: number;
        var RedoAnimationDuration: number;
        var MinVelocity: number;
        var DoubleTapInterval: number;
        var InertiaFriction: number;
        var FeedbackAnimationDuration: number;
        var MaxFeedbackInertiaDistance: number;
        var FeedbackFriction: number;
        var MinFeedbackIntertiaVelocity: number;
        var HoldDuration: number;
        var QueueMaxInteractiveLength: number;
        var DefaultSetNodeRectsOpts: GraphEntityViewModel.ISetNodeRectOptions;
        interface GraphWidgetPort {
            Width: number;
            HalfWidth: number;
            Height: number;
            HalfHeight: number;
        }
        interface GraphWidgetConnector {
            SplinePointMax: number;
            SplinePointMin: number;
        }
        var Port: GraphWidgetPort;
        var Connector: GraphWidgetConnector;
        /**
        * Actions the user can take on the graph control.
        */
        enum InteractionAction {
            /**
             * The user double-clicked in a graph control using any mousebutton.
             */
            MouseDoubleClick = 0,
            /**
             * The user pressed any mouse button in the graph control (on an entity, the canvas, etc.)
             */
            MouseDown = 1,
            /**
             * The user released any mouse button in the graph control (on an entity, the canvas, etc.)
             */
            MouseUp = 2,
            /**
             * The user dragged the mouse.
             */
            MouseMove = 3,
            /**
             * The user pressed the delete key.
             */
            DeleteKeyPressed = 4,
            /**
             * The user pressed the escape key.
             */
            EscapeKeyPressed = 5,
            /**
             * The user pressed the 'A' key while holding shift.
             */
            ShiftAPressed = 6,
            /**
             * The user pressed F2.
             */
            F2KeyPressed = 7,
            /**
             * The user pressed 'X' while holding control.
             */
            ControlXPressed = 8,
            /**
             * The user pressed the spacebar key
             */
            SpacebarDown = 9,
            /**
             * The user depressed the spacebar key.
             */
            SpacebarUp = 10,
            /**
             * The user tapped an entity.
             */
            EntityTapped = 11,
            /**
            * The user doubletapped a node.
            */
            NodeDoubleTapped = 12,
            /**
             * The user dragged a node.
             */
            NodeDragged = 13,
            /**
            * The user held a node.
            */
            NodeHeld = 14,
            /**
             * The user dragged the sceen.
             */
            ScreenDragged = 15,
            /**
             * The user pinched the screen.
             */
            ScreenPinched = 16,
            /**
             * The user swiped the screen.
             */
            ScreenSwiped = 17,
            /**
             * The user held the screen.
             */
            ScreenHeld = 18,
            /**
            * The user tapped the screen.
            */
            ScreenTapped = 19,
            /**
             * The user started a gesture.
            */
            GestureStarted = 20,
            /**
             * The user ended a gesture.
            */
            GestureEnded = 21,
        }
        /**
         * What the user's drag intent is.
         */
        enum DraggingMode {
            /**
             * The user is not currently dragging an entity.
             */
            None = 0,
            /**
             * The user is moving graph nodes.
             */
            Entities = 1,
            /**
             * The user is creating a connection.
             */
            Connection = 2,
            /**
             * The user is dragging a selection rectangle.
             */
            SelectionRect = 3,
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\MouseCapture.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/MouseCapture" {
    export = Main;
    module Main {
        /**
         * A wrapper for registering and unregistering events.
         */
        class EventListenerSubscription {
            private _handler;
            private _useCapture;
            private _eventType;
            private _element;
            /**
             * Constructs a wrapper for event listeners that can remove them on dispose.
             *
             * @param element The element on which to attach the listener.
             * @param eventType The type of event to register (e.g. mousedown, focus, etc.).
             * @param handler The callback to fire when the event occurs.
             * @param useCapture False uses bubble semantics. True uses capture semantics.
             */
            constructor(element: EventTarget, eventType: string, handler: (e: Event) => void, useCapture?: boolean);
            /**
             * Remove the registered event listeners.
             */
            dispose(): void;
        }
        /**
         * A class for handling and tracking drags. Works if the user drags anywhere on the screen, even outside the browser window.
         * Works with multiple mouse buttons and retains the drag until all buttons are released.
         */
        class MouseCapture {
            private _buttonsDown;
            private _mouseMoveHandler;
            private _mouseUpHandler;
            private _beginCapture;
            private _endCapture;
            private _mouseDownOrigin;
            private _mouseUpSubscription;
            private _mouseMoveSubscription;
            private _endCaptureSubscription;
            private _countMouseDownsSubscription;
            private _beginCaptureSubscription;
            /**
             * Create a mouse capture class that tracks mouse drags.
             *
             * @param mouseDownOrigin The element on which a mouse down begins tracking a drag.
             * @param mouseMoveHandler What to do when the user drags the mouse with a button down.
             * @param mouseUpHandler What to do when the user releases a mouse button in the drag.
             */
            constructor(mouseDownOrigin: Element, mouseMoveHandler: (e: MouseEvent) => void, mouseUpHandler: (e: MouseEvent) => void);
            /**
             * Disposes of the mouse capture class.
             */
            dispose(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Graph\SvgUtils.d.ts
declare module "Viva.Controls/Controls/Visualization/Graph/SvgUtils" {
    import GraphEntityViewModel = require("Viva.Controls/Controls/Visualization/Graph/GraphEntityViewModel");
    export = Main;
    module Main {
        /**
         * Returns a value for the stroke-dash attribute of a path in respect to the specified edge style.
         *
         * @param style The edge line style selected.
         * @return String value for the dash array used if the style is not a solid line, 'none' otherwise.
         */
        function strokeDashArray(style: GraphEntityViewModel.EdgeStyle): string;
        /**
         * Returns a value for the stroke-width attribute of a path in respect to the specified edge strength.
         *
         * @param strength The edge strength selected.
         * @return Width value.
         */
        function strokeWidth(thickness: number): number;
        /**
         * The classes managing colors (background, fill, border color, stroke color, etc) applied to a graph node.
         */
        interface IGraphNodeColorClasses {
            /**
             * States index.
             */
            [index: string]: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a graph node at rest.
             */
            atRest: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a hovered graph node.
             */
            hovered: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a selected graph node.
             */
            selected: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a graph node that is currently emitting an edge draft as a source node.
             */
            dragSource: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a graph node that is currently accepting an edge draft as destination node.
             */
            dragTarget: string[];
        }
        /**
         * The classes managing colors (background, fill, border color, stroke color, etc) applied to a graph edge.
         */
        interface IGraphEdgeColorClasses {
            /**
             * States index.
             */
            [index: string]: string[];
            /**
             * Classes managing colors (stroke color, etc) applied to a graph edge at rest.
             */
            atRest: string[];
            /**
             * Classes managing colors (stroke color, etc) applied to a selected graph edge.
             */
            selected: string[];
        }
        /**
         * The definition of the order and comptatibility the entity states are used to apply skin color classes.
         */
        interface IStateCompatibilityStrategy {
            /**
             * Name of the entity state defined for current strategy step.
             */
            state: string;
            /**
             * Names of the states that can be applied together with the state defined for current strategy step.
             */
            compatible?: string[];
            /**
             * Strategy to go with in case current entity state is different from the state defined for current strategy step
             */
            disjunctive?: IStateCompatibilityStrategy;
        }
        var StateCompatibilityStrategyDefinitions: {
            [name: string]: IStateCompatibilityStrategy;
        };
        /**
         * The definition of a Graph node skin - set of classes used to define ONLY COLOR-RELATED style properties of the elements.
         */
        interface IGraphSkinDefinition {
            /**
             * Class name representing the skin identity.
             * Used as a CSS class in Graph.less file to style NON-COLOR-RELATED properties of the elements (border width, stroke width, etc).
             */
            skinMonikerClass: string;
            /**
             * Classes managing colors (background, fill, stroke, etc) applied to the graph canvas.
             */
            canvasColorClasses: string[];
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a graph node.
             */
            nodeColorClasses: IGraphNodeColorClasses;
            /**
             * Classes managing colors (background, fill, border color, stroke color, etc) applied to a graph edge.
             */
            edgeColorClasses: IGraphEdgeColorClasses;
            /**
             * The order and comptatibility the node states are used to apply skin color classes.
             */
            nodeStatesCompatibility: IStateCompatibilityStrategy;
        }
        /**
         * Collection of supported graph skins. Use a value of GraphEditorSkinStyle enum as a skin key/index.
         */
        var GraphSkinsCollection: {
            [skin: number]: IGraphSkinDefinition;
        };
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Hexagon.d.ts
declare module "Viva.Controls/Controls/Visualization/Hexagon" {
    /**
     * Module for hexagon related classes.
     */
    import MapCoordinateConverter = require("Viva.Controls/Controls/Visualization/MapCoordinateConverter");
    import Map = require("Viva.Controls/Controls/Visualization/Map");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Legend.d.ts
declare module "Viva.Controls/Controls/Visualization/Legend" {
    import Grid = require("Viva.Controls/Controls/Lists/Grid1/Grid");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        interface Item extends Grid.Item {
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * Data being displayed.
             */
            data: KnockoutObservableArray<Item>;
            /**
             * Data key used to identify the row index. Leave unset to use the index within data.
             */
            indexKey: string;
            /**
             * Data key used to identify the color.
             */
            colorKey: string;
            /**
             * Data key of the hatching pattern.
             */
            hatchingKey: string;
            /**
             * Data key used to identify the boolean column indicating if the row is selected.
             */
            selectedKey: string;
            /**
             * Data key used to label the row for display purpose. Data has to be string, we use to show center caption for quick indication of the item.
             */
            labelKey: string;
            /**
             * Index of current hovered row in the legend.
             */
            hoveredIndex: KnockoutObservable<string>;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _grid;
            private _selectLifetimeManager;
            private _svgSelection;
            private _gridElement;
            private _hoveredIndex;
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as an un-typed object with key/value pairs that match the view model properties.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: Object, createOptions?: Base.CreateOptions);
            /**
             * Creates a new instance of the Widget.
             *
             * @param element The element to apply the widget to.
             * @param options The view model to use, as a strongly typed ViewModel instance.
             * @param viewModelType The view model type expected. Used to create a default view model instance if the options param is an un-typed object instance. If null, will use the widget ViewModel type.
             */
            constructor(element: JQuery, options?: ViewModel, createOptions?: Base.CreateOptions);
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private setupSelected(options);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\LineChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/LineChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import ChartViewImpl = require("Viva.Controls/Controls/Visualization/ChartViewImpl");
    export = Main;
    module Main {
        /**
         * Line chart series view implementation.
         */
        class LineChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
            _renderSeries(): void;
            private static _getLineStyleString(lineStyle);
            private _createLineString(interpolation);
        }
        /**
         * Line chart view implementation.
         */
        class LineChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
            _view: ChartBase.LineChartView<TX, TY>;
            /**
             * Creates a new instance of the View Implementation.
             */
            constructor(lineChartView: ChartBase.LineChartView<TX, TY>);
            /**
             * Destroys the view.
             */
            dispose(): void;
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): LineChartSeriesViewImpl<TX, TY>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Map.d.ts
declare module "Viva.Controls/Controls/Visualization/Map" {
    import ExtensibleControl = require("Viva.Controls/Controls/Base/ExtensibleControl");
    import Image = require("Viva.Controls/Controls/Base/Image");
    import Base = require("Viva.Controls/Controls/Base/Base");
    import MapCoordinateConverter = require("Viva.Controls/Controls/Visualization/MapCoordinateConverter");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Map.HexagonLayoutExtension.d.ts
declare module "Viva.Controls/Controls/Visualization/Map.HexagonLayoutExtension" {
    import TemplateEngine = require("Viva.Controls/Util/TemplateEngine");
    import Image = require("Viva.Controls/Controls/Base/Image");
    import Map = require("Viva.Controls/Controls/Visualization/Map");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\MapCoordinateConverter.d.ts
declare module "Viva.Controls/Controls/Visualization/MapCoordinateConverter" {
    import Map = require("Viva.Controls/Controls/Visualization/Map");
    export = Main;
    module Main {
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
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Metrics.d.ts
declare module "Viva.Controls/Controls/Visualization/Metrics" {
    import Hatching = require("Viva.Controls/Util/Hatching");
    import SingleSetting = require("Viva.Controls/Controls/SingleSetting");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            options: ViewModel;
        }
        class SingleMetric extends SingleSetting.ViewModel {
            /**
             * Color of the vertical bar beside the metric.
             */
            barCssClass: KnockoutObservableBase<string>;
            /**
             * Defines the hatching pattern.
             */
            hatchingPattern: KnockoutObservableBase<Hatching.Pattern>;
            /**
             * Shows the vertical bar beside the metric.
             */
            showBarColor: KnockoutObservableBase<boolean>;
            /**
             * Set display:none on the element to avoid the DOM removal
             */
            hide: KnockoutObservableBase<boolean>;
            constructor();
        }
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
        class ViewModel extends Base.ViewModel {
            /**
             * Any observable array of SingleMetric instances which defines what to display.
             */
            items: KnockoutObservableArray<SingleMetric>;
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
        class Widget extends Base.Widget implements Interface {
            private _metricSize;
            private _hatchingPatternIds;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _initializeComputeds(): void;
            private _cleanHatchingPatterns();
            private _removeSizeClasses();
            private _assignClasses(orentation);
            private _render();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\Progress.d.ts
declare module "Viva.Controls/Controls/Visualization/Progress" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * Value percentage of the current progress.
             */
            valuePercentage: KnockoutObservable<number>;
            /**
             * Whether the indicator has knowable progress (deterministic) or not.
             */
            indeterminate: KnockoutObservable<boolean>;
            /**
             * Custom class for the control to allow for scoping custom styles.
             */
            cssClass: KnockoutObservable<string>;
            /**
             * Control's aria-labelledby setting.
             */
            labelId: string;
            /**
             * Control's aria-describedby setting.
             */
            detailsId: string;
        }
        class Widget extends Base.Widget implements Interface {
            private _value;
            private _cssClasses;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private _initializeComputeds();
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\QuotaGauge.d.ts
declare module "Viva.Controls/Controls/Visualization/QuotaGauge" {
    import UsageGauge = require("Viva.Controls/Controls/Visualization/UsageGauge");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import SingleSetting = require("Viva.Controls/Controls/SingleSetting");
    import Gauge = require("Viva.Controls/Controls/Visualization/Gauge");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        enum CenterSize {
            /**
             * Extra Small Center.
             */
            XSmall = 0,
            /**
             * Small Center.
             */
            Small = 1,
            /**
             * Medium Center.
             */
            Medium = 2,
            /**
             * Large Center.
             */
            Large = 3,
        }
        enum RingThickness {
            /**
             * Common Ring Size.
             */
            Normal = 0,
            /**
             * Thin Ring Size.
             */
            Thin = 1,
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * triangleErrorWarning Toogle the css style for warning/error.  True for Triangle or False for Circle.
             */
            triangleErrorWarning: KnockoutObservableBase<boolean>;
            /**
             * Center Single icon/font size.
             */
            centerSize: KnockoutObservableBase<CenterSize>;
            /**
             * Ring Thickness for the Gauge.
             */
            ringThickness: KnockoutObservableBase<RingThickness>;
            /**
             * Show outer donut gauge.
             */
            showGauge: KnockoutObservableBase<boolean>;
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
             *  Center text unit.
             */
            unit: KnockoutObservableBase<string>;
            /**
             * instance value.
             */
            instance: KnockoutObservableBase<number>;
            /**
             * instanceQuota value.
             */
            instanceQuota: KnockoutObservableBase<number>;
            /**
             * total value.
             */
            total: KnockoutObservableBase<number>;
            /**
             * totalQuota value.
             */
            totalQuota: KnockoutObservableBase<number>;
            /**
             * Total Arc of the gauge. (units in degree). Gauge total arc must be less than 360.
             */
            totalArc: KnockoutObservableBase<number>;
            /**
             * captionDisplayFormat value.
             *  {0} is intance
             *  {1} is instanceQuota,
             *  {2} is total
             *  {3} is totalQuota
             *  {4} is maximum
             */
            captionDisplayFormat: KnockoutObservableBase<string>;
            /**
             * valueDisplayFormat value.
             *  {0} is intance
             *  {1} is instanceQuota,
             *  {2} is total
             *  {3} is totalQuota
             *  {4} is maximum
             */
            valueDisplayFormat: KnockoutObservableBase<string>;
            /**
             * Width of the QuoteGauge.
             */
            width: KnockoutObservableBase<number>;
            /**
             * Height of the QuoteGauge.
             */
            height: KnockoutObservableBase<number>;
            /**
             * This will get called before UsageGauge Widget is been created.
             * This allow user to fine tune look and feel of the UsageGauge.
             *
             * @param usageGaugeViewModel The usageGaugeViewModel for adjust the look and feels.
             */
            beforeCreateUsageWidget: (usageGaugeViewModel: UsageGauge.ViewModel) => void;
            /**
             * Overrides default computed behavior for generate gauge.
             * Default value is null: allow Quota default way of layout generated.
             * To suppressed the default, provide a computed function and adjust it own computed method.
             *
             * @param gaugeViewModel The gauge to adjust the look and feel.
             * @param centerViewModel The centerSettingViewModel to adjust the look and feel.
             * @return ko.computed<void> for the caculate the QuotaGauge.
             */
            createQuotaComputed: (gaugeViewModel: Gauge.ViewModel, centerViewModel: SingleSetting.ViewModel) => KnockoutComputed<void>;
            /**
             * Disable the Ring Thickness change.
             */
            disableRingThicknessChange: boolean;
            /**
             * Default Bar settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the thickness of the thresholds bar.
             */
            static defaultBarRadiusSetting: Gauge.RadiusSetting;
            /**
             * Default Instance Line Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * Far and near point define the thickness of the thresholds bar.
             */
            static defaultInstanceLineSettings: Gauge.RadiusSetting;
            /**
             * Default Bar settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * far and near point define the thickness of the thresholds bar.
             */
            static defaultThinBarRadiusSetting: Gauge.RadiusSetting;
            /**
             * Default Instance Line Settings.
             * All data relative to the radius. 0 represents center of the circle. 1 represents right on the radius.
             * Far and near point define the thickness of the thresholds bar.
             */
            static defaultThinInstanceLineSettings: Gauge.RadiusSetting;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _usageGaugeWidget;
            private _usageGaugeViewModel;
            private _startThreshold;
            private _splitThreshold;
            private _instanceThreshold;
            private _totalThreshold;
            private _barSettings;
            private _instanceLineSettings;
            private _computedMaximum;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            /**
              * Utility function to return the strip width relative to maximum at current strip.
              * This is useful when you can't draw into the section that's between two stip width.
              *
              * @param: maximum: the total arc of the gauge.
              * @param: return the relative number that the strip will be.
              */
            static calcStripeWidth(maximum: number): number;
            private _createUsageGaugeViewModel();
            private _initializeComputeds();
            private createQuotaComputed(gaugeViewModel, centerViewModel);
            private _initializeAdditionalComputed(gaugeViewModel, centerViewModel);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\ScatterChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/ScatterChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import ChartViewImpl = require("Viva.Controls/Controls/Visualization/ChartViewImpl");
    export = Main;
    module Main {
        /**
         * Scatter chart series view implementation.
         */
        class ScatterChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
            constructor(viewImpl: ChartViewImpl.ChartViewImpl<TX, TY>, seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>);
            _renderSeries(): void;
            _renderTooltips(): void;
        }
        /**
         * Scatter chart view implementation.
         */
        class ScatterChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
            _view: ChartBase.ScatterChartView<TX, TY>;
            /**
             * Creates a new instance of the View Implementation.
             */
            constructor(scatterChartView: ChartBase.ScatterChartView<TX, TY>);
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): ScatterChartSeriesViewImpl<TX, TY>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\SingleValueGauge.d.ts
declare module "Viva.Controls/Controls/Visualization/SingleValueGauge" {
    import QuotaGauge = require("Viva.Controls/Controls/Visualization/QuotaGauge");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * Center Single icon/font size.
             */
            centerSize: KnockoutObservableBase<QuotaGauge.CenterSize>;
            /**
             * Ring Thickness for the Gauge.
             */
            ringThickness: KnockoutObservableBase<QuotaGauge.RingThickness>;
            /**
             * Show outer donut gauge.
             */
            showGauge: KnockoutObservableBase<boolean>;
            /**
             * Show center content.
             */
            showCenter: KnockoutObservableBase<boolean>;
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
            /**
             * Width of the QuoteGauge.
             */
            width: KnockoutObservableBase<number>;
            /**
             * Height of the QuoteGauge.
             */
            height: KnockoutObservableBase<number>;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _quotaGaugeWidget;
            private _innerViewModel;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            _createInnerViewModel(): QuotaGauge.ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\SparkLine.d.ts
declare module "Viva.Controls/Controls/Visualization/SparkLine" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
            /**
             * Graph floor.
             */
            minHeight: KnockoutObservable<number>;
            /**
             * Graph Ceiling.
             */
            maxHeight: KnockoutObservable<number>;
            /**
             * Line height values.
             */
            values: KnockoutObservableArray<number>;
        }
        class Widget extends Base.Widget implements Interface {
            private _path;
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
            /**
             * See interface.
             */
            options: ViewModel;
            /**
             * See interface.
             */
            dispose(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\StackedAreaChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/StackedAreaChartViewImpl" {
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    import StackedChartViewImpl = require("Viva.Controls/Controls/Visualization/StackedChartViewImpl");
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    export = Main;
    module Main {
        class StackedAreaChartSeriesViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartSeriesViewImpl<TX, TY> {
            /**
             * Attaches computed to the stacked area series element.
             *
             * @param seriesElement The series element selection.
             */
            _attachAreaSeriesComputeds(seriesElement: D3.Selection): void;
            /**
             * Attaches computed to the stacked line series element.
             *
             * @param seriesElement The series element selection.
             */
            _attachLineSeriesComputeds(seriesElement: D3.Selection): void;
        }
        /**
         * Stacked Area chart view implementation.
         */
        class StackedAreaChartViewImpl<TX, TY> extends StackedChartViewImpl.StackedChartViewImpl<TX, TY> {
            _view: ChartBase.StackedAreaChartView<TX, TY>;
            private _areas;
            private _lines;
            /**
             * Creates a new instance of the View Implementation.
             *
             * @param stackedAreaChartView The stacked area chart view to be implemented.
             */
            constructor(stackedAreaChartView: ChartBase.StackedAreaChartView<TX, TY>);
            /**
             * Initializes the view.
             */
            init(lifetimeManager: DisposableBase.LifetimeManager): void;
            /**
             * Destroys the view.
             */
            dispose(): void;
            _initializeChartData(): void;
            _render(): void;
            /**
             * Creates the stacked area graphics and attaches hover and click events.
             */
            _createStackedAreas(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>): void;
            /**
             * Return the SVG shape definition for the stacked area.
             */
            _getStackedAreaShape(yAxisIndex: number): D3.Svg.Area;
            /**
             * Creates the stacked line graphics and attaches hover and click events.
             */
            _createStackedLines(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>, lineState: ChartBase.LineState): void;
            /**
             * Return the SVG shape definition for the stacked lines.
             */
            _getStackedLinesShape(yAxisIndex: number): D3.Svg.Line;
            _setStackedAreaSeriesHover(selection: D3.Selection, i: number, hovered: boolean): void;
            _setStackedLineSeriesHover(selection: D3.Selection, hovered: boolean): void;
            _setStackedLineSeriesSelected(selection: D3.Selection, selected: boolean): void;
            /**
             * Create the plots that will show on the lines and map to individual data points.
             */
            _createStackedLinePlots(yAxisIndex: number, yAxisWrapper: ChartBase.AxisWrapper<TY, TX, TY>): void;
            /**
             * Transform the plot chart items by appending a y0 property to be used to project
             * stacked y values.
             */
            _transformPlotValues(values: ChartBase.ChartItem<TX, TY>[], seriesViewIndex: number): ChartBase.ChartItem<TX, TY>[];
            /**
             * A view hook that allows for reacting to a single plot point being clicked.
             */
            _toggleSinglePlotSelection(seriesViewIndex: number): void;
            private _markNotSelected();
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): StackedAreaChartSeriesViewImpl<TX, TY>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\StackedChartViewImpl.d.ts
declare module "Viva.Controls/Controls/Visualization/StackedChartViewImpl" {
    import ChartViewImpl = require("Viva.Controls/Controls/Visualization/ChartViewImpl");
    import ChartBase = require("Viva.Controls/Controls/Visualization/ChartBase");
    export = Main;
    module Main {
        /**
         * Internal interface for data passed to the D3 layer.
         */
        interface ChartItemInternal<TX, TY> {
            /**
             * The x value representing chart item. The value can differ from original when applying formatting required by d3.layout.stack.
             * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
             */
            x: any;
            /**
             * The y value representing chart item. The value can differ from original when applying formatting required by d3.layout.stack.
             * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
             */
            y: any;
            /**
             * The original x value representing chart item.
             * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
             */
            originalX: TX;
            /**
             * The original y value representing chart item.
             * The type is intentionally represented as any because the chart input data TX, TY can be parsed to a different type based on formatter.
             */
            originalY: TY;
            /**
             * The series view index to associate the x, y values.
             */
            seriesViewIndex: number;
            /**
             * The y0 value of the point, used in stacked charts.
             */
            y0?: TY;
        }
        class StackedChartSeriesViewImpl<TX, TY> extends ChartViewImpl.SeriesViewImpl<TX, TY> {
        }
        /**
         * Stacked chart view implementation.
         * Supports stacked chart rendering.
         */
        class StackedChartViewImpl<TX, TY> extends ChartViewImpl.ChartViewImpl<TX, TY> {
            _view: ChartBase.StackedChartView<TX, TY>;
            _layers: any;
            _yStackMax: any;
            /**
             * Creates a new instance of the View Implementation.
             *
             * @param stackedChartView The stacked chart view to be implemented.
             */
            constructor(stackedChartView: ChartBase.StackedChartView<TX, TY>);
            /**
             * Destroys the view.
             */
            dispose(): void;
            _createSeriesViewImpl<TX, TY>(seriesBase: ChartBase.SeriesBase, seriesViewIndex: number, seriesView: ChartBase.SeriesView<TX, TY>): StackedChartSeriesViewImpl<TX, TY>;
            static _allocArray(value: any, length: number): any[];
            _getNumberOfSeries(): number;
            _getStringValue(value: any): string;
            _getSparseSeriesStackLayer(): any;
            _getDenseSeriesStackLayer(): any;
            _getStackLayer(): any;
            _initializeChartData(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\StepGauge.d.ts
declare module "Viva.Controls/Controls/Visualization/StepGauge" {
    import QuotaGauge = require("Viva.Controls/Controls/Visualization/QuotaGauge");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * Center Single icon/font size.
             */
            centerSize: KnockoutObservableBase<QuotaGauge.CenterSize>;
            /**
             * Ring Thickness for the Gauge.
             */
            ringThickness: KnockoutObservableBase<QuotaGauge.RingThickness>;
            /**
             * Show outer donut gauge.
             */
            showGauge: KnockoutObservableBase<boolean>;
            /**
             * Show center content.
             */
            showCenter: KnockoutObservableBase<boolean>;
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
            /**
             * Width of the QuoteGauge.
             */
            width: KnockoutObservableBase<number>;
            /**
             * Height of the QuoteGauge.
             */
            height: KnockoutObservableBase<number>;
            /**
             * The required mimimum step value based on this.maximum().
             * If its step is smaller than this number, the widget will throw during creation.
             */
            getRequiredMinimumStep(): number;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _quotaGaugeWidget;
            private _centerViewModel;
            private _innerViewModel;
            private _stepElements;
            private _thresholds;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
            private initializeUsageGaugeViewModel(usageGaugeViewModel);
            _createInnerViewModel(): QuotaGauge.ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\SvgBase.d.ts
declare module "Viva.Controls/Controls/Visualization/SvgBase" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends Base.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends Base.ViewModel {
        }
        class Widget extends Base.Widget implements Interface {
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
            _getElementToFocus(): Element;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Controls\Visualization\UsageGauge.d.ts
declare module "Viva.Controls/Controls/Visualization/UsageGauge" {
    import Gauge = require("Viva.Controls/Controls/Visualization/Gauge");
    import SingleSetting = require("Viva.Controls/Controls/SingleSetting");
    import CompositeControl = require("Viva.Controls/Controls/Base/CompositeControl");
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        interface Interface extends CompositeControl.Interface {
            /**
             * The view model driving this widget.
             */
            options: ViewModel;
        }
        class ViewModel extends CompositeControl.ViewModel {
            /**
             * Gauge view model.
             */
            gauge: Gauge.ViewModel;
            /**
             * Center SingleSetting view model.
             */
            center: SingleSetting.ViewModel;
            /**
             * Footer SingleSetting view model.
             */
            footer: SingleSetting.ViewModel;
            /**
             * Hide the gauge.
             */
            hideGauge: KnockoutObservableBase<boolean>;
            /**
             * Hide the center content.
             */
            hideCenter: KnockoutObservableBase<boolean>;
            /**
             * Hide the footer content.
             */
            hideFooter: KnockoutObservableBase<boolean>;
            /**
             * Default gauge center text (using SVG) to false. Instead we rely on center (SingleSetting) for prettier text.
             */
            gauge_showCenterText: KnockoutObservableBase<boolean>;
            /**
             * Default gauge.showCurrentline to false.  User needs to explicit opt in during the initialization.
             */
            gauge_showCurrentLine: KnockoutObservableBase<boolean>;
        }
        class Widget extends CompositeControl.Widget implements Interface {
            private _gaugeWidget;
            private _centerSettingWidget;
            private _footerSettingWidget;
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
            /**
             * See interface.
             */
            dispose(): void;
            /**
             * See interface.
             */
            options: ViewModel;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\ArrayUtil.d.ts
declare module "Viva.Controls/Util/ArrayUtil" {
    export = Main;
    module Main {
        function firstIndex<T>(items: T[], predicate?: (value: T) => boolean, startIndex?: number): number;
        function first<T>(items: T[], predicate?: (value: T) => boolean, startIndex?: number): T;
        function stableSort<T>(items: T[], compare: (a: T, b: T) => number): T[];
        /**
         * Binary search a sorted array.
         *
         * @param sortedArray:  The sorted array (smaller item first base on compareFn.)
         * @param item   The object to search for.
         * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
         * @return The index of the specified value in the specified array, if value is found.
         *         If value is not found and value is less than one or more elements in array, a negative number which is the bitwise complement of the index of the first element that is larger than value.
         *         If value is not found and value is greater than any of the elements in array, a negative number which is the bitwise complement of (the index of the last element plus 1).
         *         See .Net Array.BinarySearch documentation in 'http://msdn.microsoft.com/en-us/library/vstudio/4ba2bttb(v=vs.100).aspx'
         *         Note by default, if compareFn is not pass in and item is a number, we will use special number comparsion (substraction) for faster performance.
         */
        function binarySearch<T>(sortedArray: T[], item: T, compareFn?: (a: T, b: T) => number): number;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\ColorUtil.d.ts
declare module "Viva.Controls/Util/ColorUtil" {
    export = Main;
    module Main {
        enum AllRawColorCode {
            "Hex_fcd116" = 0,
            "Hex_eb3c00" = 1,
            "Hex_ba141a" = 2,
            "Hex_b4009e" = 3,
            "Hex_442359" = 4,
            "Hex_002050" = 5,
            "Hex_0072c6" = 6,
            "Hex_008272" = 7,
            "Hex_007233" = 8,
            "Hex_7fba00" = 9,
            "Hex_a0a5a8" = 10,
            "Hex_fff100" = 11,
            "Hex_ff8c00" = 12,
            "Hex_e81123" = 13,
            "Hex_ec008c" = 14,
            "Hex_68217a" = 15,
            "Hex_00188f" = 16,
            "Hex_00bcf2" = 17,
            "Hex_00b294" = 18,
            "Hex_009e49" = 19,
            "Hex_bad80a" = 20,
            "Hex_bbc2ca" = 21,
            "Hex_fffc9e" = 22,
            "Hex_ffb900" = 23,
            "Hex_dd5900" = 24,
            "Hex_f472d0" = 25,
            "Hex_9b4f96" = 26,
            "Hex_4668c5" = 27,
            "Hex_6dc2e9" = 28,
            "Hex_00d8cc" = 29,
            "Hex_55d455" = 30,
            "Hex_e2e584" = 31,
            "Hex_d6d7d8" = 32,
            "Hex_807900" = 33,
            "Hex_804600" = 34,
            "Hex_740912" = 35,
            "Hex_760046" = 36,
            "Hex_34113d" = 37,
            "Hex_000c48" = 38,
            "Hex_005e79" = 39,
            "Hex_084c41" = 40,
            "Hex_063d20" = 41,
            "Hex_3d460a" = 42,
            "Hex_32383f" = 43,
            "Hex_bfb500" = 44,
            "Hex_bf6900" = 45,
            "Hex_ae0d1a" = 46,
            "Hex_b10069" = 47,
            "Hex_4e195c" = 48,
            "Hex_00126b" = 49,
            "Hex_008db5" = 50,
            "Hex_00856f" = 51,
            "Hex_0f5b2f" = 52,
            "Hex_8ba208" = 53,
            "Hex_464f59" = 54,
            "Hex_fcf37e" = 55,
            "Hex_ffba66" = 56,
            "Hex_f1707b" = 57,
            "Hex_f466ba" = 58,
            "Hex_a47aaf" = 59,
            "Hex_6674bc" = 60,
            "Hex_66d7f7" = 61,
            "Hex_66d1bf" = 62,
            "Hex_66c592" = 63,
            "Hex_d6e86c" = 64,
            "Hex_8f9ca8" = 65,
            "Hex_fffccc" = 66,
            "Hex_ffe8cc" = 67,
            "Hex_facfd3" = 68,
            "Hex_fbcce8" = 69,
            "Hex_e1d3e4" = 70,
            "Hex_ccd1e9" = 71,
            "Hex_ccf2fc" = 72,
            "Hex_ccf0ea" = 73,
            "Hex_ccecdb" = 74,
            "Hex_f0f7b2" = 75,
            "Hex_63707e" = 76,
            max = 77,
        }
        enum ColorCode {
            "a1" = 0,
            "b1" = 1,
            "c1" = 2,
            "d1" = 3,
            "e1" = 4,
            "f1" = 5,
            "g1" = 6,
            "h1" = 7,
            "i1" = 8,
            "j1" = 9,
            "k1" = 10,
            "a0" = 11,
            "b0" = 12,
            "c0" = 13,
            "d0" = 14,
            "e0" = 15,
            "f0" = 16,
            "g0" = 17,
            "h0" = 18,
            "i0" = 19,
            "j0" = 20,
            "k0" = 21,
            "a2" = 22,
            "b2" = 23,
            "c2" = 24,
            "d2" = 25,
            "e2" = 26,
            "f2" = 27,
            "g2" = 28,
            "h2" = 29,
            "i2" = 30,
            "j2" = 31,
            "k2" = 32,
            "a0s2" = 33,
            "b0s2" = 34,
            "c0s2" = 35,
            "d0s2" = 36,
            "e0s2" = 37,
            "f0s2" = 38,
            "g0s2" = 39,
            "h0s2" = 40,
            "i0s2" = 41,
            "j0s2" = 42,
            "k0s2" = 43,
            "a0s1" = 44,
            "b0s1" = 45,
            "c0s1" = 46,
            "d0s1" = 47,
            "e0s1" = 48,
            "f0s1" = 49,
            "g0s1" = 50,
            "h0s1" = 51,
            "i0s1" = 52,
            "j0s1" = 53,
            "k0s1" = 54,
            "a0t1" = 55,
            "b0t1" = 56,
            "c0t1" = 57,
            "d0t1" = 58,
            "e0t1" = 59,
            "f0t1" = 60,
            "g0t1" = 61,
            "h0t1" = 62,
            "i0t1" = 63,
            "j0t1" = 64,
            "k0t1" = 65,
            "a0t2" = 66,
            "b0t2" = 67,
            "c0t2" = 68,
            "d0t2" = 69,
            "e0t2" = 70,
            "f0t2" = 71,
            "g0t2" = 72,
            "h0t2" = 73,
            "i0t2" = 74,
            "j0t2" = 75,
            "k0t2" = 76,
            max = 77,
        }
        /**
         * Returns the RawColorString (#0072c6) that can be used in the css or less from the index of the color code.
         * Note: AllRowColorCode["Hex_fcd116"] === 0 and AllRowColorCode[0] === "Hex_fcd116"
         * For example:
         *   getRawColorString(ColorCode.a1) will return "#fcd116".
         * This is same as
         *   getRowColorString(AllRawColorCode.Hex_fcd116) will return "#fcd116".
         * This is because both ColorCode.a1 and AllRawColorCode.Hex_fcd116 both are 0.
         *
         * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number.
         * @return Css style of color hex code string. For example: "#fcd116".
         */
        function getRawColorString(colorIndex: number): string;
        /**
         * Returns the ColorCode string ("a1") base on the index number.
         * Note: ColorCode["a1"] === 0 and ColorCode[0] === "a1"
         * For example:
         *   getColorCodeString(ColorCode.a1) will return "a1".
         * This is same as
         *   getColorCodeString(AllRawColorCode.Hex_fcd116) will return "a1".
         * This is because both ColorCode.a1 and AllRawColorCode.Hex_fcd116 both are 0.
         *
         * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number or numeric number.
         * @return Ux string code. For example: "a1".
         */
        function getColorCodeString(colorIndex: number): string;
        /**
         * Returns the RawColorString (0072c6) that can be use in the data coding.
         * Handles all different possible form of hex color code and format of string.
         * For example:
         *   getRawColorCode("fcd116") will return "fcd116".
         *   getRowColorString("#fcd116") will return "fcd116".
         *   getRowColorString("Hex_fcd116") will return "fcd116".
         *   If not in the above format, it will return null.
         *
         * @param rawColorData String data of any hex string code.
         * @return Css color hex code string. For example: "fcd116".
         */
        function getRawColorCode(rawColorData: string): string;
        /**
         * Returns the RawColorIndex (0 base index) that can be used in for indexing ColorCode or RawColorCode.
         * For example:
         *   getRawColorIndex("fcd116") will return 0.
         *   getRowColorString("#fcd116") will return 0.
         *   getRowColorString("Hex_fcd116") will return 0.
         *   If not in the above format, it will return null.
         *
         * @param rawColorData String data of any hex string code.
         * @return Index for either Enum ColorCode or RawColorCode. For example: 0. This number will be less than 77 (max) if not, returns null.
         */
        function getRawColorIndex(rawColorData: string): number;
        /**
         * Returns the colorIndex (0 base index) that can be used in for indexing ColorCode or RawColorCode.
         * For example:
         *   getColorIndex("fcd116") will return 0.
         *   getColorIndex("#fcd116") will return 0.
         *   getColorIndex("Hex_fcd116") will return 0.
         *   getColorIndex("a1") will return 0.
         *
         *   If invalid data is given, it will return null.
         *
         * @param colorData String data of any hex string code.
         * @return Index for either Enum ColorCode or RawColorCode. For example: 0. This number will be less than 77 (max) if not, returns null.
         */
        function getColorIndex(colorData: string): number;
        /**
         * Returns the Array of the Tint set corresponding to this color code.
         * For example:
         *   getColorCodeTintSet("fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *   getColorCodeTintSet("#fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *   getColorCodeTintSet("Hex_fcd116") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *   getColorCodeTintSet("a1") will return ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *
         *   If invalid data is given, it will return null.
         *
         * @param colorData String data of any hex string code. The can be "fcd116", "#fcd116", "Hex_fcd116", or "a1".
         * @param rawColorData Optional boolean indicates that if you want to get the rowColorData. If set, this function returns ["#807900","#bfb500","fff100", "#fcf37e", "#fffccc"] instead of ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         * @return Array of the color code. Typicically. ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         */
        function getColorCodeTintSet(colorData: string, rawColorData?: boolean): string[];
        /**
         * Returns the Array of the Tint set corresponding to this color code.
         * For example:
         *   getColorCodeTintSetIndex(0) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *   getColorCodeTintSetIndex(11) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *   getColorCodeTintSetIndex(22) will return [33,44, 11, 55, 66] which corresponds to ["a0s2","a0s1","a0", "a0t1", "a0t2"].
         *      ....   (0, 11, 22, 33, 44, 55, 66) all return the same set because they are same color system in MsColorWheel.
         *   If invalid data is given, it will return null.
         *
         * @param colorIndex Index of the color. Can be either ColorCode Enum or AllRowColorCode number.
         * @return Array of the color code index. Typicically. [33, 44, 11, 55, 66]
         */
        function getColorCodeTintSetIndex(colorIndex: number): number[];
        /**
         * Returns the main color wheel color (33) colors. This exclude the set of Tint/Shade.
         *
         * @return Array of the color code index. Typicically. [0, 1, 2, ..., 32]
         */
        function getAllColorCodeIndexes(): number[];
        /**
         * Returns the Array of ms color wheel color set with a start point. This is very useful for color wheel.
         * For example:
         *   getRotatedArray<number>([33,44, 11, 55, 66], 2) will return [11, 55, 66, 33, 44].
         *
         * @param data Array of color number, code, represents a color wheel.
         * @param start Index of start point.
         * @return Array of the color code index. Typicically. [33, 44, 11, 55, 66]
         */
        function getRotatedArray<T>(data: T[], start?: number): T[];
        /**
         * Returns the gradient color wheel color (27) colors index. This excludes the set of Tint/Shade.
         * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code index.
         */
        function getGradientColorCodeIndexes(start?: number): number[];
        /**
         * Returns the rainbow color wheel color (27) colors index. This excludes the set of Tint/Shade.
         * Ux specifies this to be used as default for the Line Chart where the colors DO overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code index.
         */
        function getRainbowColorCodeIndexes(start?: number): number[];
        /**
         * Returns the gradient color wheel color (27) colors string. This excludes the set of Tint/Shade.
         * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code string array [a0,a1,b2,b0,c2,b1,c0,c1,d0,d1,e2,e0,e1,f1,f0,g1,g0,g2,h2,h0,h1,i1,i0,i2,j1,j0,j2,]
         */
        function getGradientColorCode(start?: number): string[];
        /**
         * Returns the gradient color wheel color (27) raw colors string. This excludes the set of Tint/Shade.
         * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code string array ["#fcd116", .....]
         */
        function getRawGradientColorCode(start?: number): string[];
        /**
         * Returns the gradient color wheel color (27) raw colors string. This excludes the set of Tint/Shade.
         * Ux specifies this to be used as default for the Donut and BarChart where the colors don't overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code string array [a0,a1,b2,b0,c2,b1,c0,c1,d0,d1,e2,e0,e1,f1,f0,g1,g0,g2,h2,h0,h1,i1,i0,i2,j1,j0,j2,]
         */
        function getRainbowColorCode(start?: number): string[];
        /**
         * Returns the rainbow color wheel color (27) colors string.  This exclude the set of Tint/Shade.
         * Ux specifies this to used as default for the Donut and barChart where the color doesn't overlap with each other.
         *
         * @param start Index of start point of this 27 color.
         * @return Array of the color code string array ["#fcd116", .....]
         */
        function getRawRainbowColorCode(start?: number): string[];
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\DateUtil.d.ts
declare module "Viva.Controls/Util/DateUtil" {
    export = Main;
    module Main {
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
            /**
             * Timezone offset.
             */
            timezoneOffset: KnockoutObservable<number>;
            constructor(startDateTime?: Date, endDateTime?: Date, timezoneOffset?: number);
        }
        function getLocaleValues(): any;
        function setLocaleValues(def: any): void;
        /**
         * Returns a date string formatted relative to another date.
         *
         * @param format The relative format option (difference or timestamp) used to render the string.
         * @param now The relative Date object to compare date to.
         * @return A string representing the relative date.
         */
        function toRelativeString(date: Date, format: string, now?: Date): string;
        function toString(date: Date, ...relArgs: any[]): string;
        /**
         * Parse standard date strings, and MVC dates.
         *
         * @param value Date string.
         *
         * @return A new Date object (created from date string).
         */
        function parse(value: string): number;
        /**
         * Returns a date for specified time zone.
         *
         * @param date The original date.
         * @param timezoneOffset Timezone offset (in minutes) to which the date will be converted.
         *
         * @return A new Date object, representing date in specified (by offset param) timezone.
         */
        function getDateWithOffset(date: Date, timezoneOffset: number): Date;
        /**
         * Returns a date for local (user) time zone.
         *
         * @param date The original date.
         * @param timezoneOffset Timezone offset (in minutes) from which the date will be converted.
         *
         * @return A new Date object, representing date in the local (user) timezone.
         */
        function getLocalDate(date: Date, timezoneOffset: number): Date;
        /**
        * Compare two dates with 1 day precision (does not take time into account).
        *
        * @param d1 First date.
        * @param d2 Second date.
        *
        * @return -1 - d1 is earlier than d2
        *          0 - d1 and d2 are equal
        *          1 - d1 is later than d2
        */
        function compareDatesByDays(d1: Date, d2: Date): number;
        /**
        * Compare two dates with 1 second precision (does not take miliseconds into account).
        *
        * @param d1 First date.
        * @param d2 Second date.
        *
        * @return true if dates are equal, false otherwise
        */
        function compareDatesBySeconds(a: Date, b: Date): boolean;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Detection.d.ts
declare module "Viva.Controls/Util/Detection" {
    import Promise = require("Viva.Controls/Controls/Base/Promise");
    export = Main;
    module Main {
        /**
         * Detection of browsers and features.
         */
        class Detection {
            private static _features;
            private static _browsers;
            /**
             * Feaure detection.
             *
             * @return The feature detection.
             */
            static Features: FeatureDetection;
            /**
             * Browser detection.
             * (only unit tests and feature detection should use this)
             *
             * @return The browser detection.
             */
            static Browsers: BrowserDetection;
        }
        /**
         * Browser detection.
         * (only unit tests and feature detection should use this class)
         */
        class BrowserDetection {
            private _firefox;
            private _chrome;
            private _ie;
            private _ie11;
            /**
             * Detects if the browser is Firefox
             * (only unit tests and feature detection should use this method)
             *
             * @return Indicates if the browser is Firefox.
             */
            firefox: boolean;
            /**
             * Detects if the browser is Chrome
             * (only unit tests and feature detection should use this method)
             *
             * @return Indicates if the browser is Chrome.
             */
            chrome: boolean;
            /**
             * Detects if the browser is IE
             * (only unit tests and feature detection should use this method)
             *
             * @return Indicates if the browser is IE.
             */
            ie: boolean;
            /**
             * Detects if the browser is IE11
             * (only unit tests and feature detection should use this method)
             *
             * @return Indicates if the browser is IE11.
             */
            ie11: boolean;
        }
        /**
         * Detects events that are supported in the current environment.
         */
        class EventDetection {
            private _overflowchanged;
            private _overflow;
            private _underflow;
            private _overflowDeferred;
            private _underflowDeferred;
            private _divResize;
            private _divResizeDeferred;
            private _svgResize;
            private _svgResizeDeferred;
            private _div;
            /**
             * Constructs and initializes event detection.
             */
            constructor();
            /**
             * Creates a promise that completes when all the async detections are done.
             *
             * @return The completion proimise.
             */
            complete(): Promise.Promise;
            /**
             * Indicates if resize is supported on a div.
             *
             * @return True if supported.
             */
            divResize: boolean;
            /**
             * Indicates if resize is supported on an svg.
             *
             * @return True if supported.
             */
            svgResize: boolean;
            /**
             * Indicates if overflowchanged method is supported.
             *
             * @return True if supported.
             */
            overflowchanged: boolean;
            /**
             * Indicates if overflow event is supported.
             *
             * @return True if supported.
             */
            overflow: boolean;
            /**
             * Indicates if underflow event is supported.
             *
             * @return True if supported.
             */
            underflow: boolean;
            /**
             * Determines if an element supports an event.
             * Works for most but not all events.
             *
             * @param event The name of the event to check.
             * @param element The element to check (div if not specified).
             * @return Indicates if the event is supported.
             */
            supported(event: string, element?: Element): boolean;
            /**
             * Detects if overflow event is supported.
             */
            private _detectOverflow();
            /**
             * Detects if underflow event is supported.
             */
            private _detectUnderflow();
            /**
             * Detects if div element supports resize event.
             */
            private _detectDivResize();
            /**
             * Detects if svg element supports resize event.
             */
            private _detectSvgResize();
            /**
             * Handles an event using a promise.
             *
             * @param deferred The deferred object to use.
             * @param element The element to listen on.
             * @param event The event name to listen for.
             * @param timeout The max time to wait for the event callback.
             * @return The promise.
             */
            private _eventPromise(deferred, element, event, timeout);
            /**
             * Handles an on event using a promise.
             *
             * @param deferred The deferred object to use.
             * @param element The element to listen on.
             * @param event The event name to listen for.
             * @param timeout The max time to wait for the event callback.
             * @return The promise.
             */
            private _oneventPromise(deferred, element, event, timeout);
            /**
             * Handles an attach event using a promise.
             *
             * @param deferred The deferred object to use.
             * @param element The element to listen on.
             * @param event The event name to listen for.
             * @param timeout The max time to wait for the event callback.
             * @return The promise.
             */
            private _attacheventPromise(deferred, element, event, timeout);
        }
        /**
         * Detects features that are supported in the current environment.
         */
        class FeatureDetection {
            private _events;
            private _maxElementHeight;
            /**
             * Constructs the feature detetection.
             */
            constructor();
            /**
             * Detected event support.
             */
            Events: EventDetection;
            /**
             * The maximum element height for the browser.
             *
             * @return Height in pixels.
             */
            maxElementHeight: number;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\EnumUtil.d.ts
declare module "Viva.Controls/Util/EnumUtil" {
    export = Main;
    module Main {
        function getEnumArray(tsEnumeration: any, sort?: boolean): NameValue<string, number>[];
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Hatching.d.ts
declare module "Viva.Controls/Util/Hatching" {
    export = Main;
    module Main {
        /**
         * Defines hatching patterns.
         */
        enum Pattern {
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
             * The area is hatched horizontally.
             */
            DottedHatching = 3,
        }
        /**
         * Renders the hatching style for a given selection.
         *
         * @param pattern The hatching pattern to use for fulfillment.
         * @param cssColorClass The CSS class used for the background color.
         * @param cssGeneralClass The CSS class defining styles of hatching (depends on the control).
         * @param selectionToApply The D3 selection that will display the hatching.
         * @param rootElement The D3 selection that will handle the hatching pattern (hidden).
         */
        function renderHatching(pattern: Pattern, cssColorClass: string, cssGeneralClass: string, selectionToApply: D3.Selection, rootElement: D3.Selection): string;
        /**
         * Renders the hatching style pattern.
         *
         * @param pattern The hatching pattern to use for fulfillment.
         * @param cssColorClass The CSS class used for the background color.
         * @param cssGeneralClass The CSS class defining styles of hatching (depends on the control).
         * @param rootElement The D3 selection that will handle the hatching pattern (hidden).
         * @return The Id of the pattern element.
         */
        function addHatchingPattern(pattern: Pattern, cssColorClass: string, cssGeneralClass: string, rootElement: D3.Selection): string;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Positioning.d.ts
declare module "Viva.Controls/Util/Positioning" {
    export = Main;
    module Main {
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
        enum OverflowBehavior {
            /**
             * Nothing performed when overflow occurs. Element will be clipped.
             */
            None = 1,
            /**
             * Element will be kept always in the window which may result overlap between positioned and base element.
             */
            Fit = 2,
            /**
             * Element will be positioned on the other side of the base element if overflow occurs.
             */
            Flip = 3,
        }
        interface PositioningOptions {
            /**
             * Determines which horizontal and vertical edges of the positioned element are used alignment (like right-top).
             */
            elementAlign?: PositioningAlignment;
            /**
             * Determines which horizontal and vertical edges of the base element are used alignment (like right-bottom).
             */
            baseAlign?: PositioningAlignment;
            /**
             * Specifies the horizontal overflow behavior applied when positioned element does not fit into visible area. Default is fit.
             */
            horizontalOverflowBehavior?: OverflowBehavior;
            /**
             * Specifies the vertical overflow behavior applied when positioned element does not fit into visible area. Default is flip.
             */
            verticalOverflowBehavior?: OverflowBehavior;
        }
        interface Position {
            /**
             * Top value of a positioned element.
             */
            top: number;
            /**
             * Left value of a positioned element.
             */
            left: number;
        }
        class Positioning {
            /**
             * Positions the given element by taking the specified base element as a reference
             * using the options.
             *
             * It supports horizontally and vertically fitting/flipping if overflow occurs.
             *
             * Sample usage: Viva.Controls.Util.Positioning.position(element, baseElement, { elementAlign: "left-top", baseAlign: "left-bottom", overflow: "fit-flip" });
             *
             * @param element Element to be positioned.
             * @param baseElement Reference element for positioning.
             * @param options Positioning options like elementAlign ("left-top"), baseAlign ("left-bottom"), overflow ("fit-flip").
             */
            static position(element: JQuery, baseElement: JQuery, options?: PositioningOptions): void;
            private static _topOverflow(top);
            private static _bottomOverflow(bottom);
            /**
             * Fits the positioned element horizontally by using the base element if any overflow exists.
             *
             * @param position Position of the element.
             * @param overflowData Details about the element and base element like size and alignment.
             */
            private static _fitHorizontal(position, overflowData);
            /**
             * Flips the positioned element horizontally by using the base element if any overflow exists.
             *
             * @param position Position of the element.
             * @param overflowData Details about the element and base element like size and alignment.
             */
            private static _flipHorizontal(position, overflowData);
            /**
             * Fits the positioned element vertically by using the base element if any overflow exists.
             * If still overflow exists after fitting, it shrinks the element where it best fits.
             *
             * @param position Position of the element.
             * @param overflowData Details about the element and base element like size and alignment.
             * @return Overflow result which contains information like shrink needed or not.
             */
            private static _fitVertical(position, overflowData);
            /**
             * Flips the positioned element vertically by using the base element if any overflow exists.
             * If still overflow exists after flipping, it shrinks the element where it best fits.
             *
             * @param position Position of the element.
             * @param overflowData Details about the element and base element like size and alignment.
             * @return Overflow result which contains information like shrink amount.
             */
            private static _flipVertical(position, overflowData);
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Resize.d.ts
declare module "Viva.Controls/Util/Resize" {
    import Base = require("Viva.Controls/Controls/Base/Base");
    export = Main;
    module Main {
        /**
         * Hooks up cross browser resize detection event (ie, webkit, moz).
         *
         * @param element The element to monitor size changes.
         * @param handler The resize event handler.
         * @return The method to dispose the event.
         */
        function track(element: JQuery, handler: (width?: number, height?: number) => void): Base.Disposable;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\StringUtil.d.ts
declare module "Viva.Controls/Util/StringUtil" {
    export = Main;
    module Main {
        /**
         * Formats a string based on its key value pair object.
         *
         * @param formatSpecifierMap An object that contains that format mappings. For example: "String with parameters {one} and {two}".format({one: "val1", two: "val2"});.
         * @return Formatted string.
         */
        function format(value: string, formatSpecifierMap: Object): string;
        /**
         * Formats a string based on its key value pair object.
         *
         * @param args The list of arguments format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
         * @return Formatted string.
         */
        function format(value: string, ...restArgs: any[]): string;
        /**
         * Compares the current string to another string and returns a value indicating their relative ordering
         *
         * @param value1 The first value to compare
         * @param value2 The second value to compare
         * @param 0, if the strings are equal; a negative number if value1 < value2; a positive non-zero number if value1 > value2.
         */
        function localeCompareIgnoreCase(value1: string, value2: string, locales?: string[], options?: any): number;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\TemplateEngine.d.ts
declare module "Viva.Controls/Util/TemplateEngine" {
    export = Main;
    module Main {
        interface TemplateKeyValue {
            [name: string]: string;
        }
        class HtmlManipulation {
            private _templateStorage;
            private _key;
            /**
             * Internal.
             */
            constructor(templateStorage: TemplateStorage, key: string);
            /**
             * Adds an attribute to the selector.
             * Data-bind is a special attribute, and value will be appended.
             *
             * @param selector Selector to pass to jQuery.
             * @param attribute Attribute name to change.
             * @param value Attribute value.
             */
            addAttribute(selector: string, attribute: string, value: string): void;
            /**
             * Assigns the HTML to the selector.
             *
             * @param selector Selector to pass to jQuery.
             * @param html HTML Content.
             */
            html(selector: string, html: string): void;
            /**
             * Prepends some HTML to the selector.
             *
             * @param selector Selector to pass to jQuery.
             * @param html HTML Content.
             */
            prepend(selector: string, html: string): void;
            /**
             * Appends some HTML to the selector.
             *
             * @param attribute Attribute name to change.
             * @param value Attribute value.
             */
            append(selector: string, html: string): void;
            private _getElement(root, selector);
            private _addClass(element, value);
            private _addDataBind(element, value);
            private _merge(source, base, depth);
            private _mergeCssClass(element);
            private _get();
            private _save(root);
        }
        /**
         * String Template Engine to use with Knockout
         */
        class StringTemplateEngine extends ko.nativeTemplateEngine {
            _templateStorage: TemplateStorage;
            /**
             * Gets the template based on its name.
             *
             * @param name Template name.
             * @return Template markup.
             */
            getTemplate(name: string): string;
            /**
             * Sets the template based on its name.
             *
             * @param name Template name.
             * @param markup Template markup.
             */
            setTemplate(name: string, markup: string): void;
            /**
             * Makes the template.
             *
             * @param template Template name.
             * @param templateDocument Not used.
             * @return Template Source to be used by Knockout.
             */
            makeTemplateSource(template: any, templateDocument?: Document): KnockoutTemplateSource;
        }
        class HtmlTemplateEngine extends StringTemplateEngine {
            /**
             * Gets the template for html manipulation based on its name.
             *
             * @param name Template name.
             * @return Template ready for manipulation.
             */
            getHtmlTemplate(name: string): HtmlManipulation;
        }
        class TemplateStorage {
            templateSources: TemplateKeyValue;
            templateData: StringMap<TemplateKeyValue>;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\UnitConversion.d.ts
declare module "Viva.Controls/Util/UnitConversion" {
    export = Main;
    module Main {
        /**
         * Defines units.
         */
        enum Unit {
            None,
            Percentage,
            Bytes,
            Kilobytes,
            Megabytes,
            Gigabytes,
            Terabytes,
            Petabytes,
            BytesPerDay,
            BytesPerHour,
            BytesPerMinute,
            BytesPerSecond,
            KilobytesPerSecond,
            MegabytesPerSecond,
            GigabytesPerSecond,
            TerabytesPerSecond,
            PetabytesPerSecond,
            Count,
            Thousand,
            Million,
            Billion,
            Trillion,
            MicroSeconds,
            MilliSeconds,
            Seconds,
            Minutes,
            Hours,
            Days,
            CountPerDay,
            CountPerHour,
            CountPerMinute,
            CountPerSecond,
            ThousandPerSecond,
            MillionPerSecond,
            BillionPerSecond,
            TrillionPerSecond,
        }
        /**
         * Returns the most appropriate unit for formatting the value.
         *
         * @param value The value to find the unit.
         * @param originalUnit The original unit of the value.
         * @return The unit allowing to display the value shortly.
         */
        function getAppropriateUnit(value: number, originalUnit: Unit, defaultZeroUnit?: Unit): Unit;
        /**
         * Return the conversion factor from one unit to another.
         *
         * @param orignalUnit The original unit.
         * @param unit The unit to be converted to.
         * @return The conversion factor used to divide from the originalUnit to the unit.
         */
        function getConversionFactor(originalUnit: Unit, toUnit: Unit): number;
        /**
         * Returns a string representation of the Unit enum.
         * TODO ivanbaso: to be localized or strings can be moved to constants.
         *
         * @param unit The unit to be represented with a string.
         * @return The string representation.
         */
        function toString(unit: Unit): string;
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Util.d.ts
declare module "Viva.Controls/Util/Util" {
    import DisposableBase = require("Viva.Controls/Base/Base.Disposable");
    import azcPrivate = require("Viva.Controls/Util/Util.Private");
    export = Main;
    module Main {
        var blankGif: string;
        class Constants {
            /**
             * Declares the elements which can be focused on.
             * We expect when an element declares a "data-canfocus" attribute, the HTMLElement has a property called "data-canfocus" which has a "setFocus(): boolean" function callback.
             * That is, element["data-canfocus"] = () => boolean.
             */
            static dataCanFocusAttribute: string;
            /**
             * Declares the elements that should get the focus first of all the data-canfocus.
             */
            static dataFocusFirstAttribute: string;
            /**
             * Declares the elements that are also editable in addition to data-canfocus. For example, Grid.EditableRowExtension prefers data-editable over non-editable.
             */
            static dataEditableAttribute: string;
            /**
             * Declares the elements that are controls, such that when user click on an element of a control, we will search for the owning control (with data-control attribute.) to set the focus.
             */
            static dataControlAttribute: string;
            /**
             * Declares the elements that can be activatable.  For example, GridActivatableRowExtension use this as indicator for activate a column.
             */
            static dataActivatableAttribute: string;
            /**
             * Declares the elements activate additional info to pass to the ActivatedRowSelection.
             */
            static dataActivateInfoAttribute: string;
        }
        enum KeyCode {
            A = 65,
            Alt = 18,
            Backspace = 8,
            C = 67,
            Comma = 188,
            Control = 17,
            Delete = 46,
            Down = 40,
            End = 35,
            Enter = 13,
            Equals,
            Escape = 27,
            Home = 36,
            Left = 37,
            Minus,
            PageDown = 34,
            PageUp = 33,
            Period = 190,
            Right = 39,
            S = 83,
            Shift = 16,
            Space = 32,
            Tab = 9,
            Up = 38,
            V = 86,
            X = 88,
            Y = 89,
            Z = 90,
        }
        enum MouseButton {
            Left = 1,
            Middle = 2,
            Right = 3,
        }
        /**
         * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
         *
         * @return New GUID.
         */
        function newGuid(): string;
        /**
         * Encodes html attribute string.
         *
         * @param value The string to encode.
         * @return The encoded string.
         */
        function encodeAttribute(value: string): string;
        /**
         * Encodes html string.
         *
         * @param value The string to encode.
         * @return The encoded string.
         */
        function encodeHtml(value: string): string;
        /**
         * Joins items in array with delimiter and suffix.
         *
         * @param items The items to join.
         * @param delim The delimiter to go between each item.
         * @param append The suffix to append to each item.
         * @return The joined string.
         */
        function joinAppend(items: string[], delim: string, append: string): string;
        /**
         * Joins items in array with delimiter and prefix.
         *
         * @param items The items to join.
         * @param prepend The prefix to place before each item.
         * @param delim The delimiter to go between each item.
         * @return The joined string.
         */
        function joinPrepend(items: string[], prepend: string, delim: string): string;
        /**
         * Detect a value is null or undefined.
         *
         * @param value The value to check against null && undefined.
         * @return boolean.
         */
        function isNullOrUndefined(value: any): boolean;
        /**
         * Generates a random integer between min and max inclusive.
         *
         * @param min The minimum integer result.
         * @param max The maximum integer result.
         * @return A random integer.
         */
        function random(min: number, max: number): number;
        /**
         * Truncates a number to the integer part.
         *
         * @param value The number to truncate.
         * @return The integer number.
         */
        function truncate(value: number): number;
        /**
         * Adds and removes an element to force the narrator to read the section again.
         *
         * @param element DOM element.
         * @param addAriaLive Adds aria-live to polite then restores the previous value.
         */
        function forceScreenRead(element: HTMLElement, addAriaLive?: boolean): void;
        /**
         * Returns true if the character is a non-written character.
         *
         * @param keyCode KeyCode to verify.
         * @return True if non-written character.
         */
        function isNonWrittenCharacter(keyCode: number): boolean;
        /**
         * Shallow copy from a key/value pairs object.
         *
         * @param to An un-typed object to be populated.
         * @param from An un-typed object with values to populate.
         * @param scopes Scoped down the list for shallowCopy
         */
        function shallowCopyFromObject(to: Object, from: Object, scopes?: string[]): void;
        /**
         * Shallow copy from a key/value pairs object.
         *
         * @param to An un-typed object to be populated.
         * @param from An un-typed object with values to populate.
         */
        function shallowCopyToObserableFromObject(to: Object, from: Object, scopes?: string[]): void;
        /**
         * Gets the scrollable parents for the specified element.
         *
         * @param element DOM element.
         * @param includeWindow True to include window in the list of scrollable parents.
         * @return List of scrollable parent elements.
         */
        function getScrollableParents(element: JQuery, includeWindow: boolean): JQuery;
        /**
         * Helper function to deal with short form number string.
         * Generally we want to show number.toFixed(1). But in the case when it can be round up to an integer, we choose the shorter form.
         * For example, 80 instead of 80.0 or 100 instead of 100.00.
         *
         * @param value The number.
         * @param fractionDigits  The fractionDigits for this number string output.
         * @return String for this number.
         */
        function toNiceFixed(value: number, fractionDigits?: number): string;
        /**
         * Helper function to in-place adjust KnockoutObserableArray<T> such that ko bind array doesn't destroy the origin DOM object.
         * Project the source Array into the KnockoutObserableArray.
         *
         * @param source Array that to be projected to the existing KnockoutObservableArray.
         * @param dest  KnockoutObserableArray<T> that's currently use in widget binding.
         * @param itemCopyFunction a function that take the source and copy the content but keep the ko.obserable and ko.obserable as it.
         */
        function projectArrayData<T>(source: T[], dest: KnockoutObservableArray<T>, itemCopyFunction: (sourceItem: T, destItem: T) => void): void;
        /**
         * Helper function to help identifying the container with data attribute "data-control".
         *
         * @param elem The current element to start searching.
         * @return The first element that has "data-control" attribute. It can be the element it starts with. If none is found, null is returned.
         */
        function findContainingControl(elem: Element): Element;
        /**
         * Helper function to help execute the setFocus function that "data-canfocus" has on the element.
         *
         * @param elem The current element to execute the setFocus on.
         * @return Whether setFocus() is successfully executed. If false, the container will need to find the next item to set focus on.
         */
        function executeSetFocusOn(elem: Element): boolean;
        /**
         * Sets the focus to the first Focusable Child Control under the first element.
         * It goes through two paths to find the first suitable control.
         * First pass goes through the elements with both data-canfocus and data-focusfirst.
         * Then it tries again with data-canfocus and :not(data-focusfirst).
         * --(Note for experienced users who need to set the data-focusfirst, please use Base.Widget._markFocusFirstElements(elem: JQuery)
         *
         * @param elem The container element for this function to find the child element to set focus on.
         * @param preferFilter The optional function callback to filter on specific elements that the user perfers. For example, GridEditableRow, prefers the next data-editable row.
         */
        function setFocusToFirstFocusableChild(elem: JQuery, preferFilter?: (e: Element) => Element): boolean;
        /**
         * Clones the event by copying some important functions.
         * Will use the same type unless you pass one to the function.
         * The original event will be kept in newEvent.originalEvent.
         *
         * @param evt Object to clone.
         * @param type New type to use.
         * @return New cloned object.
         */
        function cloneEvent(evt: JQueryEventObject, type?: string): JQueryEventObject;
        /**
         * Mirror the souce fields, which are observables to the dest fields.
         * The purpose of this function is keep the obserable which is binded to a div and just mirror the value on to it.
         * This is to avoid destroy a DOM Element and recreate one.
         * For example, bar chart, when the new value come in. We push the value to the prior bar wihtout destroy it.
         *
         * @param source Object's keys are observable.
         * @param dest object
         * @param keyNames array of keys to mirror
         * @return New cloned object.
         */
        function fillObserableFields(source: any, dest: any, keyNames: string[]): void;
        /**
         * Utility to map a knockout projected array to an observable array.
         * Knockout projection which returns observable of array while many view model exposes KnokoutObservableArray.
         * This utility will help in mapping the projected array to ObservableArray.
         *
         * @param mappedArray Knockout projected array.
         * @param lifetime The LifetimeManager reflecting the lifetime of the array that's returned.
         * @return returns KnockoutObservableArray.
         */
        function thunkArray<T>(lifetime: DisposableBase.LifetimeManagerBase, mappedArray: KnockoutObservableBase<T[]>): KnockoutObservableArrayDisposable<T>;
        /**
         * existsOrRegisterId.  This is utility function for helping in the destroy method to avoid recursive
         *
         * @param id Unique identifier.
         * @return whether this id is already on the array. If true, mean this is not yet been executed.
         */
        function existsOrRegisterId(array: any[], id: any): boolean;
        /**
         * Shim that implements all of DOMTokenList except [] indexing. Use item() to index.
         */
        class DOMTokenListShim {
            /**
             * We're using the C++-esque friend pattern here. Only getClasses and setClasses should access this guy.
             */
            _fields: string[];
            /**
             * Creates a DOMTokenListShim that behaves like DOMTokenList
             */
            constructor(tokenString?: string);
            /**
             * Adds a taken to the token list if not already present.
             *
             * @param token The token to add.
             */
            add(token: string): void;
            /**
             * Removes all instances of token.
             *
             * @param token The token to remove.
             */
            remove(token: string): void;
            /**
             * Returns true if the token list contains the specified token.
             *
             * @param token The token to look for.
             * @return Whether or not the token appears in the token list.
             */
            contains(token: string): boolean;
            /**
             * The number of tokens in the token list.
             */
            length: number;
            /**
             * Adds a token if note present or removes it if it is.
             *
             * @param token The token to turn on or off.
             * @return Whether the item exists in the token list after toggling.
             */
            toggle(token: string): boolean;
            /**
             * Returns the token at the index parameter.
             *
             * @param index The index.
             * @return The item at the passed index.
             */
            item(index: number): string;
            /**
             * See toString on pretty much any other object.
             */
            toString(): string;
        }
        /**
         * This function exists as an alternative to element.classList, as IE doesn't support this on SVG elements.
         * Returns a token list shim containing all the classes on the element. Note the token list is not synchronized with
         * the element and you need to call setClassList to update a class attribute from a token list.
         *
         * @param element The element for which to get the classList.
         * @return The class list.
         */
        function getClassList(element: Element): DOMTokenListShim;
        /**
         * Sets the classes on an element to be those in the specified class list.
         *
         * @param element The element to set classes on.
         * @param classes The class list.
         */
        function setClassList(element: Element, classes: DOMTokenListShim): void;
        export import DataTransfer = azcPrivate.DataTransfer2;
        /**
        * Returns true if the Hammer.js library has been loaded.
        */
        function hammerLoaded(): boolean;
        class KnockoutDelayTrigger {
            /**
             * This is internal implementation
             */
            private _value;
            /**
             * Creates a KOUpdateTrigger with certain extension
             *
             * @param knockoutObserveExtend the knockout extend apply to this value observable
             */
            constructor(knockoutObserveExtend?: any);
            /**
             * This is the value to subscribe to the delay trigger.
             */
            value: KnockoutObservableBase<number>;
            touch(): void;
        }
    }
}

// FILE: D:\AzureUX-PortalFx\src\SDK\Website\TypeScript\Viva.Controls\Util\Util.Private.d.ts
declare module "Viva.Controls/Util/Util.Private" {
    export = Main;
    module Main {
        class DataTransfer2 {
            private _dataTransfer;
            private _prefixCode;
            constructor(dataTransfer: DataTransfer);
            dropEffect: string;
            effectAllowed: string;
            types: string[];
            files: FileList;
            /**
             * Returns true if the script detected that the transfer is using a legacy system.
             *
             * @return True if legacy is used.
             */
            static isLegacyDataTransfer(): boolean;
            setDragImage(image: Element, x: number, y: number): void;
            addElement(element: Element): void;
            getData(format: string): any;
            setData(format: string, data: string): void;
            clearData(format?: string): void;
            private _checkFormat(format);
            private _getLegacyData();
            private _stringifyLegacyData(allData);
            private _getLegacyDataTransfer(format);
            private _setLegacyDataTransfer(format, data);
            private _clearLegacyDataTransfer(format?);
        }
    }
}
