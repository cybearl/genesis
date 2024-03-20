import { appConfig } from "@main/configs/app.config";


/**
 * The configuration for the main app window.
 */
export type WindowConfig = {
    title: string;
    initialWidth: number;
    initialHeight: number;
    minWidth?: number;
    minHeight?: number;
};

/**
 * The default configuration for the main app window.
 */
const defaultWindowConfig: WindowConfig = {
    title: appConfig.name,
    initialWidth: 1024,
    initialHeight: 768,
    minWidth: 1024,
    minHeight: 768
};

export default defaultWindowConfig;