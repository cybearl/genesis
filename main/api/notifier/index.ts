import path from "path";

import notifier from "node-notifier";

import { ERRORS } from "@main/lib/errors";
import { NotifierRequest } from "@sharedTypes/api";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * `POST` `/api/notifier` route handler.
 * @param notification The notification request object.
 */
async function notify(notification: NotifierRequest) {
    // Replace the undefined icon with the Genesis logo
    if (!notification.icon) {
        notification.icon = path.join(__dirname, "assets", "genesis-logo.png");
    }

    notifier.notify(notification);
}

/**
 * Handler for the `/api/notifier` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    const { title, message, icon, sound } = req.body as NotifierRequest;

    if (!message) {
        return {
            success: false,
            message: "Missing required parameter: 'message'.",
            data: ERRORS.BAD_REQUEST
        };
    }

    if (req.method === "POST") {
        await notify({ title, message, icon, sound });

        return {
            success: true,
            message: "Successfully sent notification.",
            data: null
        };
    }

    return {
        success: false,
        message: "This route only supports 'POST' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}