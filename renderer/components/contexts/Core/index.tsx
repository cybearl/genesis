import { ReactNode, createContext, useState } from "react";


export type AppStatus = "loading" | "ready";
export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    // appInfo: ApiAppInfoReturnType | null;
    appStatus: AppStatus;
    setAppStatus: (appStatus: AppStatus) => void;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    // const [appInfo, setAppInfo] = useState<ApiAppInfoReturnType | null>(null);
    const [appStatus, setAppStatus] = useState<AppStatus>("ready");
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    // TODO: Implement via settings
    // useEffect(() => {
    //     const getAppInfo = async () => {
    //         const res = await window.ipcBridge("/api/app-info");
    //         if (res.data) setAppInfo(res.data as ApiAppInfoReturnType);
    //     };

    //     getAppInfo();
    // }, []);

    const context = {
        // appInfo,
        appStatus,
        setAppStatus,  // TODO: Implement app status change
        sidebarPanelState,
        setSidebarPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}