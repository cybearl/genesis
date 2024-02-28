import path from "path";

import { IpcMainInvokeEvent } from "electron";
import notifier from "node-notifier";

import { IpcFetchRequest, IpcFetchResponse } from "@sharedTypes/shared";


export type NotifierRequest = {
    title?: string;
    message: string;
    icon?: string;  // Defaults to Genesis logo
    sound?: boolean;  // Only Notification Center or Windows Toasters
};

/**
 * `POST` /api/notifier route handler.
 *
 */
const notify = async (notification: NotifierRequest) => {
    // Replace the undefined icon with the Genesis logo
    if (!notification.icon) {
        notification.icon = path.join(__dirname, "assets", "genesis-logo.png");
    }

    notifier.notify(notification);
};

/**
 * Handler for the /api/notifier route.
 */
export default async function handler(
    event: IpcMainInvokeEvent,
    req: IpcFetchRequest
): Promise<IpcFetchResponse> {
    const { title, message, icon, sound } = req.body as NotifierRequest;

    if (!message) {
        return {
            status: 400,
            message: "Bad Request"
        };
    }

    if (req.method === "POST") {
        await notify({ title, message, icon, sound });

        return {
            status: 200,
            message: "OK"
        };
    }

    return {
        status: 404,
        message: "Not Found"
    };
}