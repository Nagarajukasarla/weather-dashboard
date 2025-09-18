// Only log in development
const isDev = import.meta.env.VITE_DEBUG === "true";

/**
 * Get caller name from stack trace
 */
const getCallerName = (): string => {
    try {
        // Create an error and capture its stack trace
        const err = new Error();
        if (!err.stack) return "anonymous";

        // Get the third line in the stack trace (index 2)
        // [0] = getCallerName
        // [1] = logger method (log/warn/error/debug)
        // [2] = actual caller
        const stackLine = err.stack.split("\n")[2].trim();

        // Extract function/component name from the stack line
        // This handles different formats of stack traces
        const match = stackLine.match(/at\s+([\w.]+)\s*\(/);
        return match ? match[1] : "anonymous";
    } catch (e) {
        return "unknown";
    }
};

/**
 * Logger object with methods for logging
 */
const logger = {
    log: (...args: any[]) => isDev && console.log(`[${getCallerName()}]`, ...args),
    warn: (...args: any[]) => isDev && console.warn(`[${getCallerName()}]`, ...args),
    error: (...args: any[]) => isDev && console.error(`[${getCallerName()}]`, ...args),
    debug: (namespace: string = getCallerName(), ...args: any[]) => isDev && console.log(`[${namespace}]`, ...args),

    // Method to create a namespaced logger
    create: (namespace: string) => ({
        log: (...args: any[]) => isDev && console.log(`[${namespace}]`, ...args),
        warn: (...args: any[]) => isDev && console.warn(`[${namespace}]`, ...args),
        error: (...args: any[]) => isDev && console.error(`[${namespace}]`, ...args),
        debug: (message: string, ...args: any[]) => isDev && console.log(`[${namespace}]:${message}`, ...args),
    }),
};

export default logger;
