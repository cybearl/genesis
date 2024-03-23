/**
 * Error Codes.
 */
export type ErrorCode = {
    status: number,    // HTTP Status Code
    code: string,      // Error Code (status + variant)
    log: string,       // Log message
    data: any;         // Additional data
};