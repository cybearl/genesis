import { StaticConfig } from "@sharedTypes/static.config";


/**
 * A static configuration object allowing easy modification of certain
 * important parameters of the application.
 */
const staticConfig: StaticConfig = {
    path: null,
    environment: "development",
    app: {
        name: "Genesis",
        version: "1.0.0"
    }
};

export default staticConfig;
