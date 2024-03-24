import { NotifierRequest } from "@sharedTypes/api";


/**
 * Sends a notification.
 * @param notification The notification to send.
 */
export async function notify(notification: NotifierRequest): Promise<void> {
    await window.ipcBridge("/api/notifier", {
        method: "POST",
        body: notification
    });
}