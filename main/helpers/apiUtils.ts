/**
 * Returns the query parameters of an API url as an object.
 * @param url The URL to parse.
 * @returns The query parameters as an object.
 */
export function getQueryParams(url: string): { [key: string]: any } {
    const urlParams = new URLSearchParams(url);
    const params = Object.fromEntries(urlParams.entries());
    return params;
}