import path from "path";

import notifier from "node-notifier";

import ERRORS from "@main/lib/utils/errors";
import { NotifierRequest } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `POST` `/api/notifier` route handler.
 * @param req The parsed ipc request.
 */
async function post(req: ParsedIpcRequest): Promise<IpcResponse> {
    const { title, message, icon, sound } = req.body as NotifierRequest;

    if (!message) {
        return {
            success: false,
            message: "Missing required parameter: 'message'.",
            data: ERRORS.BAD_REQUEST
        };
    }

    notifier.notify({
        title: title || "Genesis",
        message: message,
        icon: icon || path.join(__dirname, "assets", "genesis-logo.png"),
        sound: sound || false
    });

    return {
        success: true,
        message: "Successfully sent notification.",
        data: null
    };
}

/**
 * Handler for the `/api/notifier` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "POST") return await post(req);

    return {
        success: false,
        message: "This route only supports 'POST' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}