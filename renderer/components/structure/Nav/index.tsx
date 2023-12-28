import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { ReactNode, useContext, useEffect, useState } from "react";

import IconButton from "@/components/base/IconButton";
import NavButton from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


export type NavButton = {
    label: string;
    icon: ReactNode;
};

type NavProps = {
    navButtons: NavButton[];
    onNavButtonClick: (label: string) => void;
};

export default function Nav({
    navButtons,
    onNavButtonClick
}: NavProps) {
    const { navPanelState, setNavPanelState } = useContext(CoreContext);

    const [panelWidth, setPanelWidth] = useState(
        navPanelState === "reduced" ? CONFIG.nav.panel.reducedSize : CONFIG.nav.panel.expandedSize
    );

    useEffect(() => {
        switch (navPanelState) {
            case "reducing":
                setPanelWidth(CONFIG.nav.panel.reducedSize);
                break;
            case "expanding":
                setPanelWidth(CONFIG.nav.panel.expandedSize);
                break;
        }

        setTimeout(() => {
            switch (navPanelState) {
                case "reducing":
                    setNavPanelState("reduced");
                    break;
                case "expanding":
                    setNavPanelState("expanded");
                    break;
            }
        }, CONFIG.nav.panel.transitionDuration);
    }, [navPanelState, setNavPanelState]);

    return (
        <nav
            className={`
                relative h-full bg-black bg-opacity-70 backdrop-blur-lg flex justify-between items-center shadow-lg shadow-black
                transition-all ease-in-out border-r border-neutral-800 overflow-hidden
            `}
            style={{
                transitionDuration: `${CONFIG.nav.panel.transitionDuration}ms}`,
                minWidth: `${CONFIG.nav.panel.reducedSize}px`,
                width: `${panelWidth}px`,
                maxWidth: `${CONFIG.nav.panel.expandedSize}px`
            }}
        >
            <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
                <div className="w-full h-full flex flex-col justify-start items-center pt-6">
                    {navButtons.map((button, index) => (
                        <NavButton
                            key={index}
                            label={button.label}
                            icon={button.icon}
                            navPanelState={navPanelState}
                            onClick={() => onNavButtonClick?.(button.label)}
                        />
                    ))}
                </div>

                <div className="w-full flex justify-center items-center py-[4px] border-t border-neutral-700 shadow shadow-black">
                    <IconButton
                        icon={
                            <KeyboardDoubleArrowRightIcon
                                className="transform transition-transform ease-in-out"
                                style={{
                                    transitionDuration: `${CONFIG.nav.panel.transitionDuration}ms}`,
                                    transform: `rotate(${(navPanelState === "reduced" || navPanelState === "reducing") ? 0 : 180}deg)`
                                }}
                            />
                        }
                        onClick={() => {
                            if (navPanelState === "reduced") {
                                setNavPanelState("expanding");
                            } else if (navPanelState === "expanded") {
                                setNavPanelState("reducing");
                            }
                        }}
                        size="md"
                        isDisabled={navPanelState === "reducing" || navPanelState === "expanding"}
                    />
                </div>
            </div>
        </nav>
    );
}