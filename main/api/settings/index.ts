import Store from "electron-store";

import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/shared";


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