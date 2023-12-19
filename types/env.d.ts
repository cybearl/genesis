declare namespace NodeJS {
    interface ProcessEnv {
        // Bind all invalid env variables to 'never'
        [key: string]: never;

        // Valid env variables
        readonly NODE_ENV: "development" | "production" | "test";
    }
}