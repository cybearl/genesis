import { ReactNode, createContext, useState } from "react";


export type IsAppStatus = "loading" | "ready";
export type IsPanelBreakpoint = "reducing" | "reduced" | "expanding" | "expanded";

type IsCoreContext = {
    appStatus: IsAppStatus;
    setAppStatus: (appStatus: IsAppStatus) => void;
    panelBreakpoint: IsPanelBreakpoint;
    setPanelBreakpoint: (panelBreakpoint: IsPanelBreakpoint) => void;
};

export const CoreContext = createContext({} as IsCoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appStatus, setAppStatus] = useState<IsAppStatus>("loading");
    const [panelBreakpoint, setPanelBreakpoint] = useState<IsPanelBreakpoint>("expanded");

    const context = {
        appStatus,
        setAppStatus,
        panelBreakpoint,
        setPanelBreakpoint
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}