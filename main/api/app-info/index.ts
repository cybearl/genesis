import { appConfig } from "@main/configs/app.config";
import { ERRORS } from "@main/lib/errors";
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
            success: true,
            message: "Successfully retrieved application information.",
            data: data
        };
    }

    return {
        success: false,
        message: "This route only supports GET requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}