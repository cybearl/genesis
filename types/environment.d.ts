/**
 * The environment object for the application.
 */
export type Environment = {
    environment: "production" | "development";
    version: string;
    path: string;
}