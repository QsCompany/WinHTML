/// <reference path="Html5.d.ts" />
/// <reference path="require.d.ts" />

interface CdnConfig {
    enabled: boolean;
    disableParameter: string;
    errorPageUri: string;
}

/**
 * Configuration options for tracing onInputsSet calls.
 */
interface InputsSetTraceConfig {
    /**
     * Partial name of target composition or view model to log when onInputsSet gets called.
     */
    log?: StringMap<boolean>;

    /**
     * Partial name of target composition or view model to break into debugger before calling onInputsSet.
     */
    debug?: StringMap<boolean>;
}

interface TraceConfig {
    diagnostics?: boolean;
    po?: boolean;
    rpc?: boolean;
    novirt?: boolean;
    debuglog?: boolean;
    nocallstacks?: boolean;
    nonsecure?: boolean;
    desktop?: boolean;
    bladerebind?: boolean;
    usersettings?: boolean;
    extensionmanager?: boolean;
    partsettings?: StringMap<boolean>;
    lenssettings?: StringMap<boolean>;

    /**
     * Configures onInputsSet traces for extension frames.
     */
    inputsset?: InputsSetTraceConfig;

    /**
     * Configures onInputsSet traces for shell's frame.
     */
    shellinputsset?: InputsSetTraceConfig;
}

interface FxEnvironment {
    applicationPath: string;
    bootMessageSignature: string;
    cdn: CdnConfig;
    clientTraceUri: string;
    contentUriBasePath: string;
    contentVersionToken: string;
    extensionFlags: StringMap<string>;
    isDevelopmentMode: boolean;
    isRtl: boolean;
    effectiveLocale: string;
    requireConfig: RequireConfig;
    sdkVersion: string;
    sessionId: string;
    telemetryUri: string;
    trace: TraceConfig;
    trustedParentOrigin: string;
    version: string;
    versionedContentRoots: string[];
}

interface FxStatic {
    environment: FxEnvironment;
    handleError(evt: Event): void;
}

interface Window {
    fx: FxStatic;
}
