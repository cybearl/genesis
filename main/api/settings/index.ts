import Store from "electron-store";

import { ERRORS } from "@main/lib/errors";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


const getSettings = async () => {
    const store = new Store();
};

/**
 * Handler for the /api/settings route.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        // const data = await

        return {
            success: true,
            message: "Successfully retrieved settings.",
            data: null
        };
    }

    return {
        success: false,
        message: "This route only supports GET requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}