import { contextBridge } from "electron";


/**
 * The API exposed to the renderer process.
 *
 * **Security Note:** Direct access to API functions should be avoided,
 * instead, every exposed function should corresponds to a specific task.
 */
const WINDOW_API = {

};

contextBridge.exposeInMainWorld("api", WINDOW_API);
export type IsWindowAPI = typeof WINDOW_API;