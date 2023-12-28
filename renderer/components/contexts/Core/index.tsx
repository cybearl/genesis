import { ReactNode, createContext, useState } from "react";


export type IsAppStatus = "loading" | "ready";
export type IsNavPanelState = "reducing" | "reduced" | "expanding" | "expanded";

type IsCoreContext = {
    appStatus: IsAppStatus;
    setAppStatus: (appStatus: IsAppStatus) => void;
    navPanelState: IsNavPanelState;
    setNavPanelState: (navPanelState: IsNavPanelState) => void;
};

export const CoreContext = createContext({} as IsCoreContext);

export default function CoreProvider({ children }: { children: ReactNode; }) {
    const [appStatus, setAppStatus] = useState<IsAppStatus>("ready");
    const [navPanelState, setNavPanelState] = useState<IsNavPanelState>("expanded");

    const context = {
        appStatus,
        setAppStatus,
        navPanelState,
        setNavPanelState
    };

    return (
        <CoreContext.Provider value={context}>
            {children}
        </CoreContext.Provider>
    );
}