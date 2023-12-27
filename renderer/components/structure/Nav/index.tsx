import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext, useEffect, useState } from "react";

import IconButton from "@/components/base/IconButton";
import Logo from "@/components/base/Logo";
import { CoreContext } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


export default function Nav() {
    const [panelWidth, setPanelWidth] = useState(CONFIG.nav.reducedSize);

    const { panelBreakpoint, setPanelBreakpoint } = useContext(CoreContext);

    useEffect(() => {
        switch (panelBreakpoint) {
            case "reducing":
                setPanelWidth(CONFIG.nav.reducedSize);
                break;
            case "expanding":
                setPanelWidth(CONFIG.nav.expandedSize);
                break;
        }

        setTimeout(() => {
            switch (panelBreakpoint) {
                case "reducing":
                    setPanelBreakpoint("reduced");
                    break;
                case "expanding":
                    setPanelBreakpoint("expanded");
                    break;
            }
        }, CONFIG.nav.transitionDuration);
    }, [panelBreakpoint, setPanelBreakpoint]);

    return (
        <nav
            className={`
                h-full bg-black bg-opacity-50 backdrop-blur-lg flex justify-between items-center
                transition-all ease-in-out border-r border-neutral-800
            `}
            style={{
                transitionDuration: `${CONFIG.nav.transitionDuration}ms}`,
                minWidth: `${CONFIG.nav.reducedSize}px`,
                width: `${panelWidth}px`,
                maxWidth: `${CONFIG.nav.expandedSize}px`
            }}
        >
            <div className="w-full h-full flex flex-col justify-between items-center py-2 overflow-hidden">
                <div className="w-full flex justify-center items-center">
                    <IconButton
                        icon={
                            <KeyboardDoubleArrowRightIcon
                                className="transform transition-transform ease-in-out"
                                style={{
                                    transitionDuration: `${CONFIG.nav.transitionDuration}ms}`,
                                    transform: `rotate(${(panelBreakpoint === "reduced" || panelBreakpoint === "reducing") ? 0 : 180}deg)`
                                }}
                            />
                        }
                        onClick={() => {
                            if (panelBreakpoint === "reduced") {
                                setPanelBreakpoint("expanding");
                            } else if (panelBreakpoint === "expanded") {
                                setPanelBreakpoint("reducing");
                            }
                        }}
                        isDisabled={panelBreakpoint === "reducing" || panelBreakpoint === "expanding"}
                    />
                </div>

                <div className="flex items-center justify-center w-full">
                    <Logo size="sm" />
                </div>
            </div>
        </nav>
    );
}