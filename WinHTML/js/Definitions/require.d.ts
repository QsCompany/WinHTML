interface Window {
    requirejs: RequireStatic;
    define(moduleId: string, dependencies: string[], factory: (...depModules: any[]) => any): void;
}

interface RequireConfig {
    paths: {
        [key: string]: string;
    };
    baseUrl: string;
}

interface RequireError extends Error {
    requireModules: any;
    requireType: string;
}

interface RequireStatic {
    config: (config: RequireConfig) => void;

    /**
     * Asynchronous usage
     */
    (dependencies: string[],
        callback: (...modules: any[]) => void,
        errorback?: (error: RequireError) => void): void;

    /**
     * Synchronous usage
     */
    (moduleId: string): any;
}

declare var require: LocalRequire;

interface LocalRequire {
    normalize(moduleId: string, parentModuleId?: string): string;
}
