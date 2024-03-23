/**
 * The static configuration object for the application.
 */
export type StaticConfig = {
    path: string | null;
    environment: string;
    app: {
        name: string;
        version: string;
    };
}