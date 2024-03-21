type Params = { [key: string]: any; };

/**
 * Remove the API route from the first query parameter of the URL.
 * @param params The query parameters.
 * @returns The query parameters without the API route.
 */
export function removeApiRouteFromQuery(params: Params): Params {
    const newParams = { ...params };
    const firstParamKey = Object.keys(newParams)[0];

    // No question mark === no query parameters
    if (!firstParamKey.includes("?")) return {};

    const firstParam = firstParamKey.split("?")[1];
    const firstParamValue = newParams[firstParamKey];

    // Remove original first parameter
    delete newParams[firstParamKey];

    return {
        [firstParam]: firstParamValue,
        ...newParams
    };
}

/**
 * Parse the query parameters from a URL.
 * @param url The URL to parse.
 * @returns The parsed query parameters as an object.
 */
export function parseQueryFromUrl(url: string): Params {
    const urlParams = new URLSearchParams(url);
    const rawParams = Object.fromEntries(urlParams.entries());
    const params = removeApiRouteFromQuery(rawParams);
    return params;
}