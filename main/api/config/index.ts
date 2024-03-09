import { FetchRequest, FetchResponse } from "@sharedTypes/shared";

/**
 * Handler for the /api/config route.
 */
export default async function handler(req: FetchRequest): Promise<FetchResponse> {
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