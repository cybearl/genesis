import { ReactNode, createContext, useState } from "react";

import useInterval from "@/hooks/useInterval";
import { updateAppLoadingStatus } from "@/lib/crud/appLoadingStatus";
import { AppLoadingStatus } from "@sharedTypes/api";


export type SidebarPanelState = "collapsing" | "collapsed" | "expanding" | "expanded";

type CoreContext = {
    // appInfo: ApiAppInfoReturnType | null;
    appLoadingStatus: AppLoadingStatus | undefined;
    sidebarPanelState: SidebarPanelState;
    setSidebarPanelState: (sidebarPanelState: SidebarPanelState) => void;
};

export const CoreContext = createContext({} as CoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    // const [appInfo, setAppInfo] = useState<ApiAppInfoReturnType | null>(null);
    const [appLoadingStatus, setAppLoadingStatus] = useState<AppLoadingStatus>();
    const [sidebarPanelState, setSidebarPanelState] = useState<SidebarPanelState>("expanded");

    useInterval(async () => {
        const result = await updateAppLoadingStatus(1);
        if (result) setAppLoadingStatus(result);
    }, 200);

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
        appLoadingStatus,
        sidebarPanelState,
        setSidebarPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}