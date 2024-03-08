import { appConfig } from "@main/configs/app.config";
import { FetchRequest, FetchResponse } from "@sharedTypes/shared";


/**
 * `GET` /api/info route handler.
 * @returns The info of the application.
 */
const getInfo = async () => ({
    ...appConfig,
    applicationPath: __dirname
});

/**
 * Handler for the /api/info route.
 */
export default async function handler(req: FetchRequest): Promise<FetchResponse> {
    if (req.method === "GET") {
        const data = await getInfo();

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