declare module MsPortalFx.Base.Diagnostics {
    /**
     * Trace level.
     */
    enum LogEntryLevel {
        /**
         * Custom events.
         */
        Custom = -2,
        /**
         * Debug level.
         */
        Debug = -1,
        /**
         * Verbose level.
         */
        Verbose = 0,
        /**
         * Warning level.
         */
        Warning = 1,
        /**
         * Error level.
         */
        Error = 2,
    }
    /**
     * Schema of a log entry.
     */
    interface LogEntry {
        /**
         * Timestamp
         */
        timestamp: number;
        /**
         * Level
         */
        level: LogEntryLevel;
        /**
         * Portal, etc
         */
        area: string;
        /**
         * The message to be logged.
         */
        message: string;
        /**
         * The message code.
         */
        code: number;
        /**
         * Any additional data to be logged.
         */
        args?: any[];
    }
    interface LogBufferFullCallback {
        (entries: LogEntry[]): LogEntry[];
    }
    /**
     * Logging facilities.
     */
    class Log {
        private _logArea;
        /**
         * Creates the logger instance.
         *
         * @param logArea The name of the information area.
         */
        constructor(logArea: string);
        /**
         * Logs event.
         *
         * @param level Information level type.
         * @param area Name of information area.
         * @param message Information that is to be logged.
         * @param restArgs Any other parameters that should be captured.
         */
        static writeEntry(level: LogEntryLevel, area: string, message: string, ...restArgs: any[]): void;
        /**
         * Gets the logged entries buffer.
         *s
         * @param level The level of entries to return. All entries greater than or equal to this level will be returned.
         * @return An array of log entries.
         */
        static getEntries(level: LogEntryLevel): LogEntry[];
        /**
         * Clears the log buffer.
         */
        static clear(): void;
        /**
         * Flushes the buffer and calls _setBufferFullCallback.
         */
        static flush(): void;
        /**
         * Specify logging level of messages to console and remotely.
         *
         * @param consoleLevel The level which is to be enabled for the console. If not specified, all levels are enabled.
         * @param remoteLevel The level which is to be enabled for remote logging. If not specified, it will be the same as the console level.
         */
        static initialize(consoleLevel?: LogEntryLevel, remoteLevel?: LogEntryLevel): void;
        /**
         * Log verbose information.
         *
         * @param entry The message to log.
         * @param code The message code.
         * @param restArgs[] Extra information to log with the message.
         */
        verbose(entry: string, ...restArgs: any[]): void;
        /**
         * Log warning information.
         *
         * @param entry The message to log.
         * @param code The message code.
         * @param restArgs[] Extra information to log with the message.
         */
        warning(entry: string, code?: number, ...restArgs: any[]): void;
        /**
         * Log error information.
         *
         * @param entry The message to log.
         * @param code The message code.
         * @param restArgs[] Extra information to log with the message.
         */
        error(entry: string, code?: number, ...restArgs: any[]): void;
        /**
         * Log debug information.
         *
         * @param entry The message to log.
         * @param restArgs[] Extra information to log with the message.
         */
        debug(entry: string, ...restArgs: any[]): void;
        /**
         * Log custom information.
         *
         * @param entry The message to log.
         * @param code The message code.
         * @param restArgs[] Extra information to log with the message.
         */
        custom(entry: string, code?: number, ...restArgs: any[]): void;
        static _setBufferFullCallback(callback: LogBufferFullCallback): void;
        private static _writeEntry(level, area, message, code, restArgs);
        private static _createConsoleOutputMap();
        private static _setConsoleOutput(level?);
    }
}
declare module MsPortalFx.Base {
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
         * Create a createChildLifetime to localize the LifetimeManager.
         * It will provide the function on tracking who create it and when it dispose, it will remove itself from Container's lifetimeManager
         *
         */
        createChildLifetime(): DisposableLifetimeManager;
    }
    interface DisposableLifetimeManager extends Disposable, LifetimeManager {
    }
}
interface JQueryDeferred {
    catch(catchCallback: (reason?: any) => any): JQueryDeferred;
    finally(finallyCallback: () => any): JQueryDeferred;
}
interface JQueryDeferredV<TValue> {
    catch(catchCallback: (reason?: any) => any): JQueryDeferredV<TValue>;
    finally(finallyCallback: () => any): JQueryDeferredV<TValue>;
}
interface JQueryDeferredVR<TValue, TReject> {
    catch(catchCallback: (reason?: any) => any): JQueryDeferredVR<TValue, TReject>;
    finally(finallyCallback: () => any): JQueryDeferredVR<TValue, TReject>;
}
interface JQueryDeferredR<TReject> {
    catch(catchCallback: (reason?: any) => any): JQueryDeferredR<TReject>;
    finally(finallyCallback: () => any): JQueryDeferredR<TReject>;
}
interface JQueryDeferredVRN<TValue, TReject, TNotify> {
    catch(catchCallback: (reason?: any) => any): JQueryDeferredVRN<TValue, TReject, TNotify>;
    finally(finallyCallback: () => any): JQueryDeferredVRN<TValue, TReject, TNotify>;
}
interface JQueryPromise {
    catch(catchCallback: (reason?: any) => any): JQueryPromise;
    finally(finallyCallback: () => any): JQueryPromise;
}
interface JQueryPromiseV<TValue> {
    catch(catchCallback: (reason?: any) => any): JQueryPromiseV<TValue>;
    finally(finallyCallback: () => any): JQueryPromiseV<TValue>;
}
interface JQueryPromiseVV<TValue1, TValue2> {
    catch(catchCallback: (reason?: any) => any): JQueryPromiseVV<TValue1, TValue2>;
    finally(finallyCallback: () => any): JQueryPromiseVV<TValue1, TValue2>;
}
interface JQueryPromiseVVV<TValue1, TValue2, TValue3> {
    catch(catchCallback: (reason?: any) => any): JQueryPromiseVVV<TValue1, TValue2, TValue3>;
    finally(finallyCallback: () => any): JQueryPromiseVVV<TValue1, TValue2, TValue3>;
}
interface JQueryPromiseVR<TValue, TReject> {
    then<UValue, UReject>(doneCallbacks: {
        (arg: TValue): JQueryPromiseVR<UValue, UReject>;
    }, failCallbacks?: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVR<UValue, UReject>;
    then<UValue, UReject>(doneCallbacks: {
        (arg: TValue): UValue;
    }, failCallbacks?: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVR<UValue, UReject>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): JQueryDeferredVR<UValue, TReject>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVR<UValue, TReject>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): JQueryPromiseVR<UValue, TReject>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVR<UValue, TReject>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): UValue;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseV<UValue>;
    then<UReject>(doneCallbacks: {
        (arg: TValue): void;
    }, failCallbacks?: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseR<UReject>;
    then(doneCallbacks: {
        (arg: TValue): void;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromise;
    catch(catchCallback: (reason?: any) => any): JQueryPromiseVR<TValue, TReject>;
    finally(finallyCallback: () => any): JQueryPromiseVR<TValue, TReject>;
}
interface JQueryPromiseVRN<TValue, TReject, TProgress> {
    then<UValue, UReject>(doneCallbacks: {
        (arg: TValue): UValue;
    }, failCallbacks: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (arg: TProgress): void;
    }): JQueryPromiseVR<UValue, UReject>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): JQueryDeferredVRN<UValue, TReject, TProgress>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVRN<UValue, TReject, TProgress>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): JQueryPromiseVRN<UValue, TReject, TProgress>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVRN<UValue, TReject, TProgress>;
    then<UValue>(doneCallbacks: {
        (arg: TValue): UValue;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (arg: TProgress): void;
    }): JQueryPromiseV<UValue>;
    then<UReject>(doneCallbacks: {
        (arg: TValue): void;
    }, failCallbacks: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (arg: TProgress): void;
    }): JQueryPromiseR<UReject>;
    then(doneCallbacks: {
        (arg: TValue): void;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (arg: TProgress): void;
    }): JQueryPromise;
    catch(catchCallback: (reason?: any) => any): JQueryPromiseVRN<TValue, TReject, TProgress>;
    finally(finallyCallback: () => any): JQueryPromiseVRN<TValue, TReject, TProgress>;
}
interface JQueryPromiseR<TReject> {
    then<UValue, UReject>(doneCallbacks: {
        (): UValue;
    }, failCallbacks: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseVR<UValue, UReject>;
    then(doneCallbacks: {
        (): JQueryDeferredR<TReject>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseR<TReject>;
    then(doneCallbacks: {
        (): JQueryPromiseR<TReject>;
    }, failCallbacks?: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseR<TReject>;
    then<UReject>(doneCallbacks: {
        (): void;
    }, failCallbacks?: {
        (arg: any): UReject;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromiseR<UReject>;
    then(doneCallbacks: {
        (): void;
    }, failCallbacks: {
        (arg: any): void;
    }, progressCallbacks?: {
        (): void;
    }): JQueryPromise;
    catch(catchCallback: (reason?: any) => any): JQueryPromiseR<TReject>;
    finally(finallyCallback: () => any): JQueryPromiseR<TReject>;
}
interface JQueryPromiseAny {
    always(...alwaysCallbacks: {
        (...args: any[]): void;
    }[]): JQueryPromiseAny;
    done(...doneCallbacks: {
        (...args: any[]): void;
    }[]): JQueryPromiseAny;
    fail(...failCallbacks: {
        (...args: any[]): void;
    }[]): JQueryPromiseAny;
    progress(...progressCallbacks: {
        (...args: any[]): void;
    }[]): JQueryPromiseAny;
    state(): string;
    promise(target?: any): JQueryPromiseAny;
    then(doneCallbacks: {
        (...args: any[]): any;
    }, failCallbacks: {
        (...args: any[]): any;
    }, progressCallbacks?: {
        (...args: any[]): any;
    }): JQueryPromiseAny;
}
interface JQueryDeferredAny {
    always(...alwaysCallbacks: {
        (...args: any[]): void;
    }[]): JQueryDeferredAny;
    done(...doneCallbacks: {
        (...args: any[]): void;
    }[]): JQueryDeferredAny;
    fail(...failCallbacks: {
        (...args: any[]): void;
    }[]): JQueryDeferredAny;
    progress(...progressCallbacks: {
        (): void;
    }[]): JQueryDeferredAny;
    notify(...args: any[]): JQueryDeferredAny;
    notifyWith(context: any, args: any[]): JQueryDeferredAny;
    promise(target?: any): JQueryPromiseAny;
    reject(...args: any[]): JQueryDeferredAny;
    rejectWith(context: any, args: any[]): JQueryDeferredAny;
    resolve(...args: any[]): JQueryDeferredAny;
    resolveWith(context: any, args: any[]): JQueryDeferredAny;
    state(): string;
    then(doneCallbacks: {
        (...args: any[]): any;
    }, failCallbacks: {
        (...args: any[]): any;
    }, progressCallbacks?: {
        (...args: any[]): any;
    }): JQueryDeferredAny;
}
interface JQueryPromiseN<TNotify> {
    catch(catchCallback: (reason?: any) => any): JQueryPromiseN<TNotify>;
    finally(finallyCallback: () => any): JQueryPromiseN<TNotify>;
}
interface JQueryPromiseNNNN<TNotify1, TNotify2, TNotify3, TNotify4> {
    catch(catchCallback: (reason?: any) => any): JQueryPromiseNNNN<TNotify1, TNotify2, TNotify3, TNotify4>;
    finally(finallyCallback: () => any): JQueryPromiseNNNN<TNotify1, TNotify2, TNotify3, TNotify4>;
}
interface JQueryXHR<T> {
    catch(catchCallback: (reason?: any) => any): JQueryXHR<T>;
    finally(finallyCallback: () => any): JQueryXHR<T>;
}
declare module MsPortalFx.Base.Net {
    interface JQueryPromiseXhr<T> {
        catch(catchCallback: (reason?: any) => any): JQueryPromiseXhr<T>;
        finally(finallyCallback: () => any): JQueryPromiseXhr<T>;
    }
}
declare module MsPortalFx.Helpers {
    var ajax: {
        <T>(settings: JQueryAjaxSettings<T>): JQueryXHR<T>;
        <T>(url: string, settings?: JQueryAjaxSettings<T>): JQueryXHR<T>;
    };
    var selector: JQueryStatic;
    var Callbacks: {
        (flags?: string): JQueryCallback;
        <T>(flags?: string): JQueryCallback1<T>;
        <T1, T2>(flags?: string): JQueryCallback2<T1, T2>;
        <T1, T2, T3>(flags?: string): JQueryCallback3<T1, T2, T3>;
    };
    var data: {
        (element: Document, key?: string, value?: any): any;
        (element: Element, key: string, value: any): any;
        (element: Element, key: string): any;
        (element: Element): any;
    };
    var removeData: {
        (element: Document, name?: string): JQuery;
        (element: Element, name?: string): JQuery;
    };
    var Deferred: {
        (fn?: (d: JQueryDeferred) => void): JQueryDeferred;
        <TDeferred extends _JQueryDeferred>(fn?: (d: TDeferred) => void): TDeferred;
        new (fn?: (d: JQueryDeferred) => void): JQueryDeferred;
        new <TDeferred extends _JQueryDeferred>(fn?: (d: TDeferred) => void): TDeferred;
    };
    var when: JQueryWhen;
}
declare module MsPortalFx.Base {
    /**
     * Data type used for rendering images's.
     */
    interface Image {
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
        /**
         * Badge
         */
        badge?: MsPortalFx.Base.ImageBadge;
    }
    /**
     * Data type used for rendering a images's badge.
     */
    interface ImageBadge {
        /**
         * Badge icon.
         */
        image: MsPortalFx.Base.Image;
        /**
         * Override the default width, must be in a percentage ie (width: 10).
         */
        width?: number;
    }
    enum ImagePalette {
        None = 0,
        White = 1,
        Black = 2,
        Blue = 3,
        Green = 4,
        Inherit = 99,
    }
}
declare module MsPortalFx.Services.Image {
    /**
     * List of available SVG's. Shouldn't be needed under normal circumstances (unless you're adding new icons to the framework).
     */
    enum SvgType {
        Blank = 0,
        Custom = 1,
        ImageUri = 2,
        ActiveDirectory = 3,
        Add = 4,
        BadgeError = 6,
        BadgeNone = 7,
        BadgeSuccess = 8,
        BadgeWarning = 9,
        Book = 10,
        Check = 12,
        Database = 16,
        Delete = 17,
        Disabled = 18,
        Discard = 19,
        Download = 20,
        Filter = 22,
        Gear = 27,
        Guide = 29,
        Hyperlink = 31,
        Info = 32,
        Link = 35,
        Lock = 37,
        Monitoring = 41,
        Pending = 43,
        Person = 44,
        PersonWithFriend = 45,
        Pin = 46,
        Properties = 48,
        Question = 49,
        QuickStart = 50,
        Refresh = 51,
        Save = 52,
        Start = 61,
        Stop = 62,
        Subtract = 65,
        Swap = 66,
        TeamProject = 67,
        Unlock = 69,
        Unpin = 70,
        VirtualMachine = 71,
        Website = 72,
        Canceled = 74,
        Clock = 75,
        Clone = 76,
        Error = 77,
        InfoAlert = 78,
        Paused = 79,
        Queued = 80,
        Warning = 81,
        AddTeamMember = 82,
        Attachment = 83,
        AvatarDefault = 84,
        AvatarUnknown = 85,
        Backlog = 86,
        Code = 94,
        Commit = 96,
        Disable = 98,
        Edit = 99,
        Favorite = 101,
        File = 102,
        GearFlat = 103,
        GetMoreLicense = 104,
        GetStarted = 105,
        Go = 108,
        History = 109,
        Inactive = 110,
        Log = 112,
        Postpone = 114,
        Release = 115,
        Request = 116,
        Retain = 117,
        Tasks = 119,
        Triangle = 120,
        Upload = 121,
        VisualStudio = 123,
        BadgeStopped = 131,
        Connect = 132,
        Disconnect = 133,
        PolyAvailabilitySet = 136,
        PolyResourceDefault = 149,
        PolySqlDataBaseServer = 152,
        Redo = 157,
        ShellChevron = 158,
        Tools = 159,
        Wrench = 160,
        AzureQuickstart = 161,
        Publish = 162,
        ThisWeek = 163,
        DownloadFlat = 174,
        Ellipsis = 176,
        ForPlacementOnly = 177,
        PolyResourceGroup = 179,
        MonitoringFlat = 193,
        PolyClock = 195,
        TrendDown = 204,
        TrendUp = 205,
        Variables = 206,
        Commits = 210,
        HeartPulse = 211,
        PowerUp = 216,
        GuideFlat = 218,
        Support = 219,
        ShellCornerCheck = 221,
        InfoFlat = 225,
        Signout = 226,
        LaunchCurrent = 227,
        Feedback = 228,
        Collapsed = 231,
        CommentBubble = 232,
        Expanded = 233,
    }
    /**
     *  Datatype used for rendering SVGs.
     */
    class ImageData implements MsPortalFx.Base.Image {
        type: SvgType;
        data: string;
        palette: MsPortalFx.Base.ImagePalette;
        badge: MsPortalFx.Base.ImageBadge;
        constructor(type: SvgType, palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge);
    }
}
declare module MsPortalFx.Base.Images {
    /**
     * Generates a properly formatted image datatype from a image's URI.
     * For use with the 'image' custom data-binding & custom png/jpeg/gifs/etc.
     * WARNING: THIS IS NOT THEMEABLE AND MAY BE REMOVED IN THE FUTURE.
     *
     * @param URI to image resource.
     * @return properly formatted image datatype for consumtion by the 'image' data-binding.
     */
    function ImageUri(uri: string): Image;
    function Add(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function AddTeamMember(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Attachment(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function AvatarDefault(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function AvatarUnknown(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function AzureQuickstart(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Backlog(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Blank(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Book(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Canceled(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Check(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Clock(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Clone(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Code(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Commit(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Commits(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Connect(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Delete(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Disable(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Disabled(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Discard(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Disconnect(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Download(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Edit(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Ellipsis(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Error(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Favorite(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Feedback(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function File(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Filter(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function ForPlacementOnly(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Gear(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function GetMoreLicense(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function GetStarted(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Go(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Guide(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function HeartPulse(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function History(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Hyperlink(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Inactive(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function LaunchCurrent(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Link(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Lock(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Log(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Monitoring(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Paused(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Pending(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Person(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function PersonWithFriend(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Pin(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Postpone(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function PowerUp(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Properties(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Publish(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Question(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Queued(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Redo(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Refresh(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Release(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Request(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Retain(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Save(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Signout(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Start(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Stop(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Subtract(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Support(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Swap(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Tasks(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function ThisWeek(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Tools(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function TrendDown(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function TrendUp(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Triangle(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Unlock(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Unpin(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Upload(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Variables(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Warning(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Wrench(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function Info(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    function VisualStudio(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    /**
     * Logos icons.
     */
    module Logos {
    }
    /**
     * Emoticon icons.
     */
    module Emoticon {
    }
    /**
     * Multicolor images.
     */
    module Polychromatic {
        function ActiveDirectory(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function AvailabilitySet(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Clock(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Database(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function ResourceDefault(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function ResourceGroup(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function SqlDataBaseServer(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function TeamProject(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function VirtualMachine(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Website(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
    }
    module Shell {
        function Chevron(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function CornerCheck(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Collapsed(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function CommentBubble(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Expanded(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        module JumpBar {
        }
    }
    /**
     * Status badges.
     */
    module StatusBadge {
        function Error(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Info(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function None(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Stopped(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Success(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        function Warning(palette?: MsPortalFx.Base.ImagePalette, badge?: MsPortalFx.Base.ImageBadge): Image;
        module Outline {
        }
    }
}
interface KnockoutBindingHandlers {
    activateWidget: KnockoutBindingHandler;
    jqueryAppend: KnockoutBindingHandler;
    safeMarkup: KnockoutBindingHandler;
    commands: KnockoutBindingHandler;
}
interface KnockoutObservableArray<T> extends KnockoutObservable<T[]> {
    subscribeArrayChanged(itemAddedCallback: (addedItem: T) => void, itemRemovedCallback: (removedItem: T) => void, context?: any): KnockoutSubscription<T>[];
}
interface KnockoutObservableArrayDisposable<T> extends KnockoutObservableArray<T>, KnockoutDisposable {
}
interface KnockoutUtils {
    /**
     * Fixes up knockout array edits so they can be reapplied on the original array to recreate the same changes.
     *
     * @param edits The knockout array edits.
     * @return Returns the edits.
     */
    fixupArrayEdits<T>(edits: KnockoutArrayEdit<T>[]): KnockoutArrayEdit<T>[];
    applyArrayEdits<T>(target: T[], edits: KnockoutArrayEdit<T>[]): void;
    applyArrayEdits<T>(target: KnockoutObservableArray<T>, edits: KnockoutArrayEdit<T>[]): void;
    applyArrayEdits<T, U>(target: U[], edits: KnockoutArrayEdit<T>[], mapFunc: (value: T) => U): void;
    applyArrayEdits<T, U>(target: KnockoutObservableArray<U>, edits: KnockoutArrayEdit<T>[], mapFunc: (value: T) => U): void;
    /**
     * Subscribes to observable arrange changes and triggers a callback with edit descriptors.
     *
     * @param observableArray Array to create subscription on.
     * @param callback Function to call when array changes.
     * @return The array change subscription.
     */
    observableArraySubscribe<T>(observableArray: KnockoutObservableArray<T>, callback: (edits: KnockoutArrayEdit<T>[]) => void): KnockoutSubscription<T[]>;
    /**
     * Establishes a two-way binding between the specified observables.
     *
     * @param The first observable whose initial value take precedence while setting up the binding.
     * @param The second observable.
     * @return The subscriptions that are used for setting up the binding. Dispose these subscriptions to disconnect
     * the binding.
     */
    twoWayBinding<T>(source: KnockoutObservableBase<T>, destination: KnockoutObservableBase<T>): KnockoutSubscription<T>[];
}
declare module MsPortalFx.Base.KnockoutExtensions {
}
declare module MsPortalFx.Base.Internal {
    /**
    * An object that supports "then". Treated as a promise.
    */
    interface ThenableV<TValue> {
        then(onFulfill: (value: TValue) => void): any;
    }
    /**
    * The base type of a promise.
    */
    interface PromiseBase<TPromise, TProgressFunc> {
        /**
        * Registers a callback to be invoked when the promise is rejected.
        *
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        catch<UValue extends Object>(onReject: (reason?: any) => ThenableV<UValue>): PromiseV<UValue>;
        /**
        * Registers a callback to be invoked when the promise is rejected.
        *
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        catch<UValue extends Object>(onReject: (reason?: any) => UValue): PromiseV<UValue>;
        /**
        * Registers a callback to be invoked when the promise is rejected.
        *
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        catch(onReject: (reason?: any) => void): Promise;
        /**
        * Registers a callback to be invoked when the promise is settled.
        *
        * @return A new promise.
        */
        finally(finallyCallback: () => void): TPromise;
        /**
        * Registers a callback to be invoked when the promise issues progress notification.
        *
        * @param progressCallback A callback to be invoked when the promise issues progress notification.
        * @return A new promise.
        */
        progress(progressCallback: TProgressFunc): TPromise;
    }
    /**
    * The base type of a promise that does not have a value.
    */
    interface PromiseOfNonValueBase<TPromise, TProgressFunc> extends PromiseBase<TPromise, TProgressFunc> {
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: () => ThenableV<UValue>, onReject?: (reason?: any) => ThenableV<UValue>): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: () => ThenableV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: () => UValue, onReject?: (reason?: any) => ThenableV<UValue>): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: () => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then(onFulfill: () => void, onReject?: (reason?: any) => void): Promise;
    }
    /**
    * The base type of a promise that has a value.
    */
    interface PromiseOfValueBase<TPromise, TProgressFunc, TValue> extends PromiseBase<TPromise, TProgressFunc> {
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: (value: TValue) => ThenableV<UValue>, onReject?: (reason?: any) => ThenableV<UValue>): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: (value: TValue) => ThenableV<UValue>, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => ThenableV<UValue>): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then<UValue extends Object>(onFulfill: (value: TValue) => UValue, onReject?: (reason?: any) => UValue): PromiseV<UValue>;
        /**
        * Registers callbacks to be invoked when the promise is settled.
        *
        * @param onFulfill A callback to be invoked when the promise is fulfilled.
        * @param onReject A callback to be invoked when the promise is rejected.
        * @return A new promise.
        */
        then(onFulfill: (value: TValue) => void, onReject?: (reason?: any) => void): Promise;
    }
}
declare module MsPortalFx.Base {
    /**
     * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
     * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
     */
    interface Promise extends Internal.PromiseOfNonValueBase<Promise, () => void> {
    }
    /**
    * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
    * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
    */
    interface PromiseV<TValue> extends Internal.PromiseOfValueBase<PromiseV<TValue>, () => void, TValue> {
    }
    /**
    * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
    * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
    */
    interface PromiseN<TProgress> extends Internal.PromiseOfNonValueBase<PromiseN<TProgress>, (progressInfo: TProgress) => void> {
    }
    /**
    * A promise representing an activity that may complete asynchronously. This may be a Q Promise, or
    * any other object that is compliant with the Promises/A+ spec {@link http://promises-aplus.github.io/promises-spec/}.
    */
    interface PromiseVN<TValue, TProgress> extends Internal.PromiseOfValueBase<PromiseVN<TValue, TProgress>, (progressInfo: TProgress) => void, TValue> {
    }
}
declare module MsPortalFx.Base.Promises {
    /**
     * Wraps an arbitrary promise, which might not support cancelation, in such a way that
     * it does support cancelation. This simply ensures that fulfillment, rejection and notification
     * callbacks do not fire if the promise is canceled.
     *
     * @param underlyingPromise Promise to add cancelation to.
     * @param cancelationToken Cancellation token.
     * @return Cancelable promise.
     */
    function wrapWithCancelablePromise<T extends Promise>(underlyingPromise: T, cancelationToken: MsPortalFx.Base.Promises.CancelationToken): T;
    /**
     * An object that defines whether or not its associated CancelablePromise instances
     * have been canceled. Once the 'canceled' flag is set, it cannot be unset.
     */
    class CancelationToken {
        private _canceled;
        /**
         * True if the associated CancelablePromise instances have been canceled; false otherwise.
         */
        canceled: boolean;
        /**
         * Ensures the CancelationToken has been set so that associated CancelablePromise instances have been canceled.
         */
        cancel(): void;
    }
}
declare module MsPortalFx.Intl {
    interface NumberFormatOptions {
        /**
         * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit".
         */
        localeMatcher?: string;
        /**
         * The formatting style to use. Possible values are "decimal" for plain number formatting, "currency" for currency formatting, and "percent" for percent formatting; the default is "decimal".
         */
        style?: string;
        /**
         * The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided.
         */
        currency?: string;
        /**
         * How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
         */
        currencyDisplay?: string;
        /**
         * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false; the default is true.
         */
        useGrouping?: boolean;
        /**
         * The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
         */
        minimumIntegerDigits?: number;
        /**
         * The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
         */
        minimumFractionDigits?: number;
        /**
         * The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
         */
        maximumFractionDigits?: number;
        /**
         * The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.
         */
        minimumSignificantDigits?: number;
        /**
         * The maximum number of significant digits to use. Possible values are from 1 to 21; the default is minimumSignificantDigits.
         */
        maximumSignificantDigits?: number;
    }
    interface DateTimeFormatOptions {
        /**
         * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit".
         */
        localeMatcher?: string;
        /**
         * The representation of the weekday. Possible values are "narrow", "short", "long".
         */
        weekday?: string;
        /**
         * The representation of the era. Possible values are "narrow", "short", "long".
         */
        era?: string;
        /**
         * The representation of the year. Possible values are "numeric", "2-digit".
         */
        year?: string;
        /**
         * The representation of the month. Possible values are "numeric", "2-digit", "narrow", "short", "long".
         */
        month?: string;
        /**
         * The representation of the day. Possible values are "numeric", "2-digit".
         */
        day?: string;
        /**
         * The representation of the hour. Possible values are "numeric", "2-digit".
         */
        hour?: string;
        /**
         * The representation of the minute. Possible values are "numeric", "2-digit".
         */
        minute?: string;
        /**
         * The representation of the second. Possible values are "numeric", "2-digit".
         */
        second?: string;
        /**
         * The representation of the time zone name. Possible values are "short", "long".
         */
        timeZoneName?: string;
        /**
         * The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit".
         */
        formatMatcher?: string;
        /**
         * Whether to use 12-hour time (as opposed to 24-hour time). Possible values are true and false; the default is locale dependent.
         */
        hour12?: boolean;
        /**
         * The time zone to use. The only value implementations must recognize is "UTC"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the IANA time zone database, such as "Asia/Shanghai", "Asia/Kolkata", "America/New_York".
         */
        timeZone?: string;
    }
}
declare module MsPortalFx.Base.Internal {
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
        map<U>(lifetimeManager: MsPortalFx.Base.LifetimeManager, transform: (value: T) => U): IObservableMap<U>;
        /**
         * Gets the number of items in the observable map.
         */
        count: number;
        /**
         * Disposes of the map. Don't call this. Any maps that need cleaning up will require a lifetime manager.
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
        subscribe(lifetimeManager: Base.LifetimeManager, callback: (newValue: StringMap<T>) => void, target?: any, topic?: string): KnockoutSubscription<StringMap<T>>;
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
         * Removes the key/value pair from the map. Throws if the key is not present in the map.
         *
         * @param key The key (and its corresponding value) to remove from the map.
         */
        remove(key: string): void;
    }
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
        subscribe(lifetimeManager: Base.LifetimeManager, callback: (newValue: StringMap<T>) => void, target?: any, topic?: string): KnockoutSubscription<StringMap<T>>;
        /**
         * See interface.
         */
        map<U>(lifetimeManager: MsPortalFx.Base.LifetimeManager, transform: (value: T) => U): IObservableMap<U>;
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
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, map: ObservableMap<T>, transform: (value: T) => U);
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
        constructor(lifetimeManager: MsPortalFx.Base.LifetimeManager, ...maps: IObservableMap<T>[]);
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
}
declare module MsPortalFx.Data {
    /**
     * Supplied at construction time, reflects the kind of EditScope instance that will be created.
     */
    enum EditScopeKind {
        /**
         * A copy of the input data becomes 'editScope.root', the editable data to which UI is bound.
         */
        Copy = 0,
        /**
         * The input data itself becomes 'editScope.root', the editable data to which UI is bound.
         */
        InPlace = 1,
    }
    /**
     * Reflects the edit state of an item.
     */
    enum EditState {
        /**
         * The item has not been edited since it was loaded from the server.
         */
        None = 0,
        /**
         * The item is one that was created in memory but not yet created on the server.
         */
        Created = 1,
        /**
         * The item is one that is marked for deletion but not yet deleted on the server.
         */
        Deleted = 2,
        /**
         * The item is one whose property values have been updated in memory but not yet saved to the server.
         */
        Updated = 3,
    }
    /**
     * Editable copy of input data, which can then be utilized in editable, revertable view models.
     */
    interface EditScope extends MsPortalFx.Base.Disposable {
        /**
         * The editable, revertable copy of the input data.
         */
        root: any;
        /**
         * Is 'true' if the EditScope contains edited entities (entities in 'Updated', 'Deleted' or 'Created' states).
         */
        dirty: KnockoutObservableBase<boolean>;
        /**
         * Is 'true' if the EditScope is currently refreshing (its async 'refresh' method and the operation is in progress).
         */
        refreshing: KnockoutObservableBase<boolean>;
        /**
         * Marks an entity in the EditScope as being deleted, putting the entity in the 'Deleted' state.
         *
         * @param entity The entity.
         */
        markForDelete(entity: Object): void;
        /**
         * Creates a new empty entity that can be added to the given array of entities when the edits are saved.
         *
         * @param array The entity array to which the new, empty entity will be added.
         * @return The empty entity that has not yet been added to the given array of entities.
         */
        create<T>(array: KnockoutObservableArray<T>): T;
        /**
         * Adds a created entity to the given array of entities when the edits are saved.
         * The entity is added in the array of created entities retrieved using 'getCreated'.  The entity will
         * be in the 'Created' state.
         *
         * @param entity The entity to be added to the array of created entitites.
         * @param array The entity array to which the new, empty entity will be added.
         */
        addCreated<T>(entity: T, array: KnockoutObservableArray<T>): void;
        /**
         * Reverts any creates, updates, deletes applied to this entity, return it to the 'None' edit state.
         * Created entities are removed from their 'getCreated' entities array.  Updated entities are restored
         * to their original values.  Deleted entities are no longer marked for delete.
         *
         * @param entity The entity being reverted.
         */
        revert(entity: Object): void;
        /**
         * Reverts any creates, updates, deletes applied to the EditScope.
         * Created entities are removed from their 'getCreated' entities array.  Updated entities are restored
         * to their original values.  Deleted entities are no longer marked for delete.
         */
        revertAll(): void;
        /**
         * Gets an observable EditState value, reflecting the create/update/delete state of the supplied entity.
         *
         * @param entity The entity being reverted.
         * @return The observable EditState value.
         */
        getEditState(entity: Object): KnockoutObservableBase<EditState>;
        /**
         * Gets the original data for a given editable entity or editable array of entities.
         *
         * @param entityOrEntityArray The editable entity or array of entities.
         * @return The data reflecting the original state of the editable data.
         */
        getOriginal(entityOrEntityArray: any): any;
        /**
         * Gets an array of created entities that will be created in the array when the EditScope edits are saved.
         *
         * @param array The entity array to which entities have been added via 'create'.
         * @return The array of entities in the 'Created' state.
         */
        getCreated<T>(array: KnockoutObservableArray<T>): KnockoutObservableArray<T>;
        /**
         * This method is available only on EditScopes created via EditScopeKind.CopyInputDataToMakeEditableData.
         *
         * Updates the EditScope so that 'editScope.root' (the editable data) reflects the current values in the
         * original data.
         *
         * This method should be used:
         * - To load original data asynchronously after the EditScope has been created and bound into view models.
         * - To incrementally load more or different original data into the EditScope ("show more" or "sort" in a grid).
         */
        mergeFromOriginal(): void;
        /**
         * Applies updates to EditScope data in such a way that updates are not confused with user-enacted edits and,
         * thus, do not dirty the EditScope.
         *
         * When this method completes, editable and original entities will both reflect their refreshed state.
         * User-enacted property-level updates will be over-written by newly loaded values.
         */
        refresh(): MsPortalFx.Base.Promise;
        /**
         * After saving data to the server, and reloading the newly saved data, use this method
         * to update the EditScope with the new data and clear the EditScope of edits.
         */
        save(): void;
    }
}
declare module MsPortalFx.Data.Metadata {
    /**
     * Interface describing on of possible type representations of elements stored in MsPortalFx.Data.DataSet.
     */
    interface MetadataProperty {
        /**
         * Type of the property.
         */
        itemType?: string;
        /**
         * Indicates whether property is an array.  Default is 'false'.
         */
        isArray?: boolean;
        /**
         * Determines if edits are tracked by EditScope.  Default is 'true'.  If 'false', property value cannot be used with form fields.
         */
        trackEdits?: boolean;
        /**
         * Determines if edits are persisted to User Settings.  Set to 'false' for properties like passwords.  Default is 'true'.
         */
        persistEdits?: boolean;
    }
    /**
     * Interface describing metadata of elements stored in MsPortalFx.Data.DataSet.
     * This interface corresponds with 'TypeMetadata' C# type.
     */
    interface Metadata {
        /**
         * Name of the type.
         */
        name?: string;
        /**
         * List of id properties of a type.
         */
        idProperties?: string[];
        /**
         * List of properties in type.
         */
        properties?: {
            [property: string]: MetadataProperty;
        };
        /**
         * Reflects whether this type is an entity type.  An entity type is one that can be edited and reverted
         * independently from any nesting or nested model data.
         */
        entityType?: boolean;
        /**
         * Indicates whether a given type has a globally unique key.
         */
        hasGloballyUniqueKey?: boolean;
    }
}
declare module MsPortalFx.Data {
    /**
     * Describes the state of navigable data, for example specifying the
     * total number of items or the token needed to fetch further data.
     *
     * This information is typically extracted from a server response.
     */
    interface DataNavigationMetadata {
        /**
         * If available, provides the total number of items that may be navigated through.
         * Not all data sources make this information available, so this property may be null/undefined.
         */
        totalItemCount?: number;
        /**
         * If applicable, specifies the server-generated continuation token value that may
         * be used to fetch the next range of items. This value may be in any format - for
         * example, it may be an entire URI.
         */
        continuationToken?: string;
    }
}
declare module MsPortalFx.Data {
    /**
     * Represents a source of data that supports one or more standard navigation mechanisms,
     * such as skip/take or continuation tokens.
     */
    interface DataNavigator<T> {
        /**
         * The current range of items.
         */
        items: KnockoutObservableBase<T[]>;
        /**
         * Provides metadata about navigation state, such as current page index
         * or the total number of items.
         */
        metadata: KnockoutObservableBase<DataNavigationMetadata>;
        /**
         * If this data navigator supports loading via skip/take, loads data by that method.
         * This property will be null/undefined if this data navigator does not support skip/take.
         */
        loadBySkipTake?(skip: number, take: number, filter: string): MsPortalFx.Base.Promise;
        /**
         * If the data navigator supports loading via continuation tokens, resets its state so that
         * the next load will fetch the first page of data.
         * This property will be null/undefined if this data navigator does not support skip/take.
         */
        resetLoadByContinuationToken?(filter: string): void;
        /**
         * If the data navigator supports loading via continuation tokens, loads data by that method.
         * This property will be null/undefined if this data navigator does not support skip/take.
         */
        loadByContinuationToken?(): MsPortalFx.Base.Promise;
        /**
         * Instructs all consumers of this navigator to reset their navigation state
         * and begin at the first page.
         *
         * @return A promise that completes when all consumers of the navigator have finished resetting their navigation state.
         */
        resetNavigation(): MsPortalFx.Base.Promise;
        /**
         * Used by controls that are consuming the navigator to receive notification
         * when the navigation state should be reset. Not intended for use from
         * portal extension code.
         *
         * @param callback Callback to invoke when navigation state should be reset.
         */
        addResetNavigationListener(callback: () => MsPortalFx.Base.Promise): void;
        /**
         * Removes a callback previously registered using addResetListener. Not intended
         * for use from portal extension code.
         *
         * @param callback Callback to be removed. Must be the same function instance that was previously registered.
         */
        removeResetNavigationListener(callback: () => MsPortalFx.Base.Promise): void;
    }
}
declare module MsPortalFx.Data {
    /**
     * An abstract base class for data navigators.
     */
    class DataNavigatorBase<TEntity> implements DataNavigator<TEntity> {
        /**
         * See interface.
         */
        items: KnockoutObservableBase<TEntity[]>;
        /**
         * See interface.
         */
        metadata: KnockoutObservableBase<DataNavigationMetadata>;
        private _resetListeners;
        /**
         * See interface.
         */
        resetNavigation(): MsPortalFx.Base.Promise;
        /**
         * See interface.
         */
        addResetNavigationListener(callback: () => MsPortalFx.Base.Promise): void;
        /**
         * See interface.
         */
        removeResetNavigationListener(callback: () => MsPortalFx.Base.Promise): void;
    }
}
interface Array<T> {
    /**
     * Returns the first element of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @return The first element that matches the predicate.
     */
    first(predicate?: (value: T) => boolean, startIndex?: number): T;
    /**
     * Returns the first index of an array that matches the predicate.
     *
     * @param predicate The Predicate function.
     * @return The first index that matches the predicate.
     */
    firstIndex(predicate?: (value: T) => boolean, startIndex?: number): number;
    /**
     * Returns the last element of the sequence. Throws if the sequence is empty.
     *
     * @return The element
     */
    last(): any;
    /**
     * Projects each element of a sequence to a sequence and flattens the resulting sequences into one sequence.
     *
     * @param selector The projection function.
     * @return A flattened array.
     */
    mapMany<U>(selector: (source: T) => U[]): U[];
    /**
     * Removes all values that equal the given item and returns them as an array
     *
     * @param item The value to be removed.
     * @return The removed items.
     */
    remove(item: T): T[];
    /**
     * Sorts an array using a stable sort algorithm.
     *
     * This method returns a new array, it does not sort in place.
     *
     * @param compare The Compare function.
     * @return Sorted array.
     */
    stableSort(compare: (a: T, b: T) => number): T[];
    /**
     * Returns an associative array using the given key selection function.
     *
     * @param keySelector The key selection function.
     * @return An associative array.
     */
    toNumberMap(keySelector: (value: T) => number): NumberMap<T>;
}
declare module MsPortalFx.Polyfills {
}
interface String {
    /**
     * Formats a string based on its key value pair object.
     *
     * @param args The list of arguments format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
     * @return Formatted string.
     */
    format(...restArgs: any[]): string;
    /**
     * Formats a string based on its key value pair object.
     *
     * @param formatSpecifierMap An object that contains that format mappings. For example: "String with parameters {one} and {two}".format({one: "val1", two: "val2"});.
     * @return Formatted string.
     */
    format(formatSpecifierMap: Object): string;
    /**
     * Compares the current string to another string and returns a value indicating their relative ordering.
     *
     * @param value The value to compare this string to
     * @param locales The optional array of locale values that will be passed to localeCompare
     * @param options The options supported by localeCompare
     * @return 0, if the strings are equal; a negative number if the current string is ordered before value; a positive non-zero number if the current string is orered after value.
     */
    localeCompareIgnoreCase(value: string, locales?: string[], options?: any): number;
    /**
      * Replaces all instances of a value in a string.
      *
      * @param searchValue The value to replace.
      * @param replaceValue The value to replace with.
      * @return A new string with all instances of searchValue replaced with replaceValue.
      */
    replaceAll(searchValue: string, replaceValue: string): string;
    /**
      * Replaces multiple instances of search values and replacement values in a string.
      *
      * @param replacementMap A string map where each key represents the string to replace, and that key's value represents the value to replace it with.
      * @return A new string with replacementMap values replaced.
      */
    replaceMany(replacementMap: StringMap<string>): string;
    /**
      * Returns a string value that is made from count copies appended together. If count is 0, empty string
      * is returned.
      *
      * @param count number of copies to append
      */
    repeat(count: number): string;
}
declare module MsPortalFx.Polyfills {
}
interface Date {
    toString(value: string): string;
}
declare module MsPortalFx.Polyfills {
}
declare module MsPortalFx.Util {
    /**
     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
     *
     * @return New GUID.
     */
    function newGuid(): string;
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
     * Escapes regular expression special characters -[]/{}()*+?.\^$|
     *
     * @param str The string to escape.
     * @return The escaped string.
     */
    function regexEscape(str: string): string;
    /**
     * Shallow copy from a key/value pairs object.
     *
     * @param to An un-typed object to be populated.
     * @param from An un-typed object with values to populate.
     * @param scopes Scoped down the list for shallowCopy
     */
    function shallowCopyFromObject(to: Object, from: Object, scopes?: string[]): void;
    enum KeyCode {
        Alt = 18,
        Backspace = 8,
        Comma = 188,
        Control = 17,
        Delete = 46,
        Down = 40,
        End = 35,
        Enter = 13,
        Escape = 27,
        Home = 36,
        Left = 37,
        PageDown = 34,
        PageUp = 33,
        Period = 190,
        Right = 39,
        Shift = 16,
        Space = 32,
        Tab = 9,
        Up = 38,
    }
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
     * existsOrRegisterId.  This is utility function for helping in the destroy method to avoid recursive
     *
     * @param id Unique identifier.
     * @return whether this id is already on the array. If true, mean this is not yet been executed.
     */
    function existsOrRegisterId(array: any[], id: any): boolean;
    /**
     * Utility to map a knockout projected array to an observable array.
     * Knockout projection which returns observable of array while many view model exposes KnokoutObservableArray.
     * This utility will help in mapping the projected array to ObservableArray.
     *
     * @param mappedArray Knockout projected array.
     * @param lifetime The LifetimeManager reflecting the lifetime of the array that's returned.
     * @return returns KnockoutObservableArray.
     */
    function thunkArray<T>(lifetime: Base.LifetimeManagerBase, mappedArray: KnockoutObservableBase<T[]>): KnockoutObservableArrayDisposable<T>;
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
declare module MsPortalFx.ColorUtil {
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
declare module MsPortalFx.DateUtil {
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
}
declare module MsPortalFx.UnitConversion {
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
}
declare module MsPortalFx.ViewModels.Commands {
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
        execute(context: T): MsPortalFx.Base.Promise;
    }
}
declare module MsPortalFx.ViewModels.Dialogs {
    enum DialogType {
        /**
         * Invalid value for a dialog type. Used on base class types that are not meant to be passed to the framework.
         * Derived types will assign valid dialog types.
         */
        Invalid = 0,
        /**
         * Dialog is a message box.
         */
        MessageBox = 1,
        /**
         * Dialog is a progress box.
         */
        ProgressBox = 2,
        /**
         * Dialog is a form.
         */
        Form = 3,
        /**
         * Dialog for selecting one item out of a list.
         */
        List = 4,
    }
}
declare module MsPortalFx.ViewModels.Dialogs {
    /**
     * Defines the options to configure dialog.
     */
    interface DialogContract {
        /**
         * The type of dialog to display.
         */
        type: DialogType;
        /**
         * Title shown at the top of the dialog.
         */
        title: string;
    }
    /**
     * See interface.
     */
    class Dialog implements DialogContract {
        /**
         * See interface.
         */
        type: DialogType;
        /**
         * See interface.
         */
        title: string;
        /**
         * Do not use. Dialog is an abstract class and should not
         * be instantiated directly.
         */
        constructor(title: string);
    }
}
declare module MsPortalFx.ViewModels.Dialogs {
    enum DialogResult {
        /**
         * The abort button.
         */
        Abort = 0,
        /**
         * The cancel button.
         */
        Cancel = 1,
        /**
         * The ignore button.
         */
        Ignore = 2,
        /**
         * The no button.
         */
        No = 3,
        /**
         * The ok button.
         */
        Ok = 4,
        /**
         * The retry button.
         */
        Retry = 5,
        /**
         * The yes button.
         */
        Yes = 6,
    }
}
