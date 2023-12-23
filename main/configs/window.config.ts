export type IsWindowConfig = {
    title: string;
    initialWidth: number;
    initialHeight: number;
    minWidth?: number;
    minHeight?: number;
};

const defaultWindowConfig: IsWindowConfig = {
    title: "Genesis",
    initialWidth: 1024,
    initialHeight: 768,
    minWidth: 800,
    minHeight: 600
};

export default defaultWindowConfig;