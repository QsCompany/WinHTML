import Base = require("./Base");
export = Main;
declare module Main {
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
