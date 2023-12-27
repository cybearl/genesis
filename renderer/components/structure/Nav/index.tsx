import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext, useEffect, useState } from "react";

import Logo from "@/components/base/Logo";
import { CoreContext } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";
import useMousePosition from "@/hooks/useMousePosition";


export default function Nav() {
    const [isResizing, setIsResizing] = useState(false);
    const [origMouseX, setOrigMouseX] = useState(0);
    const [panelWidth, setPanelWidth] = useState(CONFIG.nav.reducedSize);

    const { panelBreakpoint, setPanelBreakpoint } = useContext(CoreContext);

    return (
        <nav
            className={`
                h-full bg-black bg-opacity-50 backdrop-blur-lg flex justify-between items-center
                transition-all duration-300 ease-in-out border-r border-neutral-800
            `}
            style={{
                minWidth: `${CONFIG.nav.reducedSize}px`,
                width: `${panelWidth}px`,
                maxWidth: `${CONFIG.nav.expandedSize}px`
            }}
        >
            <div className="w-full h-full flex flex-col justify-between items-center py-2 overflow-hidden">
                <div className="w-full">

                </div>

                <div className="flex items-center gap-2 text-xl">
                    <Logo size="sm" />
                    <span className={`${panelBreakpoint === "reduced" ? "hidden" : "block"}`}>
                        {CONFIG.appName}
                    </span>
                </div>
            </div>
        </nav>
    );
}