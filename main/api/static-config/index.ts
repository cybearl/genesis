import { ERRORS } from "@main/lib/errors";
import staticConfig from "@main/static.config";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";
import { StaticConfig } from "@sharedTypes/static.config";

// TODO

/**
 * `GET` `/api/static-config` route handler.
 * @returns The system information.
 */
async function getStaticConfig(): Promise<StaticConfig> {
    return {
        ...staticConfig,
        path: __dirname
    };
}


/**
 * Handler for the `/api/static-config` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        const data = await getStaticConfig();

        return {
            success: true,
            message: "Successfully retrieved static configuration.",
            data: data
        };
    }

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}