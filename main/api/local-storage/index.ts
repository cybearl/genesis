import { storage } from "@main/background";
import ERRORS from "@main/lib/utils/errors";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";
import { LocalStorage } from "@sharedTypes/storage";


/**
 * `GET` `/api/local-storage` route handler.
 * @returns The local storage.
 */
async function get(): Promise<IpcResponse> {
    const localStorage = storage.get("localStorage") as LocalStorage;

    return {
        success: true,
        message: "Successfully retrieved preferences.",
        data: localStorage
    };
}

/**
 * Handler for the `/api/local-storage` route.
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