import ERRORS from "@main/lib/utils/errors";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `GET` `/api/user-preferences` route handler.
 * @returns The user preferences.
 */
async function get(): Promise<IpcResponse> {
    return {
        success: true,
        message: "Successfully retrieved user preferences.",
        data: {}
    };
}

/**
 * Handler for the `/api/user-preferences` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") return await get();

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}