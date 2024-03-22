import { appConfig } from "@main/configs/app.config";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/shared";


/**
 * `GET` /api/app-info route handler.
 * @returns The info of the application.
 */
async function getAppInfo() {
    return ({
        ...appConfig,
        applicationPath: __dirname
    });
}

/**
 * Handler for the /api/app-info route.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        const data = await getAppInfo();

        return {
            status: 200,
            message: "OK",
            data: data
        };
    }

    return {
        status: 405,
        message: "Method Not Allowed",
        data: null
    };
}