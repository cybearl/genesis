import { useContext, useEffect, useState } from "react";

import { CoreContext } from "@/components/contexts/Core";
import { DebugContext } from "@/components/contexts/Debug";
import CONFIG from "@/configs/app.config";


export default function Nav() {
    const [isResizing, setIsResizing] = useState(false);
    const [origMouseX, setOrigMouseX] = useState(0);
    const [panelWidth, setPanelWidth] = useState(CONFIG.nav.defaultWidth);
    const { setDebugValues } = useContext(DebugContext);

    useEffect(() => {
        const mouseUpListener = () => {
            setIsResizing(false);
        };

        window.addEventListener("mouseup", mouseUpListener);
        return () => window.removeEventListener("mouseup", mouseUpListener);
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) document.body.style.cursor = "ew-resize";
        else document.body.style.cursor = "default";
    }, [isResizing]);

    return (
        <nav
            className="h-full bg-black bg-opacity-50 backdrop-blur-lg flex justify-between items-center"
            onMouseDown={(e) => {
                if (e.button === 0) {
                    setIsResizing(true);
                    setOrigMouseX(e.clientX);
                }
            }}
            style={{
                minWidth: `${CONFIG.nav.minWidth}px`,
                width: `${panelWidth}px`,
                maxWidth: `${CONFIG.nav.maxWidth}px`
            }}
        >
            <div className="w-full h-full flex flex-col justify-start items-center">

            </div>

            <div className="relative h-full w-[1px] bg-white justify-center flex">
                <div
                    className="absolute h-full top-0 w-2 cursor-ew-resize"
                />
            </div>
        </nav>
    );
}