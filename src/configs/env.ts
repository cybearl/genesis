import * as dotenv from "dotenv";


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 * Needs to be imported at the beginning of the app (import file directly).
 */

dotenv.config({
    path: __dirname + "/../.env"
});


export default {};