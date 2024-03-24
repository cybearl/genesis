import { ERRORS } from "@main/lib/errors";
import { IpcResponse, ParsedIpcRequest } from "@sharedTypes/ipc";


/**
 * Handler for the `/api/user-preferences` route.
 * @param req The parsed ipc request.
 * @returns The ipc response.
 */
export default async function handler(req: ParsedIpcRequest): Promise<IpcResponse> {
    if (req.method === "GET") {
        const data = {};

        return {
            success: true,
            message: "Successfully retrieved system information.",
            data: data
        };
    }

    return {
        success: false,
        message: "This route only supports 'GET' requests.",
        data: ERRORS.METHOD_NOT_ALLOWED
    };
}