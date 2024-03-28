import { storage } from "@main/background";
import ERRORS from "@main/lib/utils/errors";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";
import { Preferences } from "@sharedTypes/storage";


/**
 * `GET` `/api/preferences` route handler.
 * @returns The preferences.
 */
async function get(): Promise<IpcResponse> {
    const preferences = storage.get("preferences") as Preferences;

    return {
        success: true,
        message: "Successfully retrieved preferences.",
        data: preferences
    };
}

/**
 * Handler for the `/api/preferences` route.
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