import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

import { CoreContext } from "@/components/contexts/Core";


type IsDebugContext = {
    debugValues: { [key: string]: unknown; };
    setDebugValues: (debugValues: { [key: string]: unknown; }) => void;
};

export const DebugContext = createContext({} as IsDebugContext);

export default function DebugProvider({ children }: { children: ReactNode; }) {
    const { panelBreakpoint } = useContext(CoreContext);

    const [currDebugValues, setCurrDebugValues] = useState<{ [key: string]: unknown; }>({
        "NODE_ENV": process.env.NODE_ENV,
        "panelBreakpoint": panelBreakpoint
    });

    const setDebugValues = useCallback((values: { [key: string]: unknown; }) => {
        setCurrDebugValues({
            ...currDebugValues,
            ...values
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDebugValues({
            "panelBreakpoint": panelBreakpoint
        });
    }, [panelBreakpoint, setDebugValues]);

    const context = {
        debugValues: currDebugValues,
        setDebugValues
    };

    return (
        <DebugContext.Provider value={context}>
            {children}
        </DebugContext.Provider>
    );
}