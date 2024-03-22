import path from "path";

import notifier from "node-notifier";

import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/shared";


/**
 * Notification request object.
 */
export type NotifierRequest = {
    title?: string;
    message: string;
    icon?: string;  // Defaults to Genesis logo
    sound?: boolean;  // Only Notification Center or Windows Toasters
};

/**
 * `POST` /api/notifier route handler.
 */
async function notify(notification: NotifierRequest) {
    // Replace the undefined icon with the Genesis logo
    if (!notification.icon) {
        notification.icon = path.join(__dirname, "assets", "genesis-logo.png");
    }

    notifier.notify(notification);
}

/**
 * Handler for the /api/notifier route.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    const { title, message, icon, sound } = req.query as NotifierRequest;

    if (!message) {
        return {
            status: 400,
            message: "Bad Request",
            data: null
        };
    }

    if (req.method === "POST") {
        await notify({ title, message, icon, sound });

        return {
            status: 200,
            message: "OK",
            data: null
        };
    }

    return {
        status: 405,
        message: "Method Not Allowed",
        data: null
    };
}