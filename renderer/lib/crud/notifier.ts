import { NotifierRequest } from "@sharedTypes/api";


export async function notify(notification: NotifierRequest): Promise<void> {
    await window.ipcBridge("/api/notifier", {
        method: "POST",
        body: notification
    });
}