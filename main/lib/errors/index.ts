export type ErrorCode = {
    status: number,    // HTTP Status Code
    code: string,      // Error Code (status + variant)
    log: string,       // Log message
    data: any;         // Additional data
};

/**
 * Error codes for the application.
 */
export const ERRORS = {
    /** [400] Bad Request */
    BAD_REQUEST: {
        status: 400,
        code: "400_BAD_REQUEST",
        log: "Bad Request",
        data: null
    },
    /** [401] Unauthorized */
    UNAUTHORIZED: {
        status: 401,
        code: "401_UNAUTHORIZED",
        log: "Unauthorized",
        data: null
    },
    /** [403] Forbidden */
    FORBIDDEN: {
        status: 403,
        code: "403_FORBIDDEN",
        log: "Forbidden",
        data: null
    },
    /** [404] Not Found */
    NOT_FOUND: {
        status: 404,
        code: "404_NOT_FOUND",
        log: "Not Found",
        data: null
    },
    /** [405] Method Not Allowed */
    METHOD_NOT_ALLOWED: {
        status: 405,
        code: "405_METHOD_NOT_ALLOWED",
        log: "Method Not Allowed",
        data: null
    },
    /** [500] Internal Server Error */
    INTERNAL_SERVER_ERROR: {
        status: 500,
        code: "500_INTERNAL_SERVER_ERROR",
        log: "Internal Server Error",
        data: null
    }
};