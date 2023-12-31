import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useContext, useEffect, useState } from "react";

import IconButton from "@/components/base/IconButton";
import NavButton, { IsNavButton } from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


type NavProps = {
    navButtons: IsNavButton[];
    onNavButtonClick: (index: number) => void;
    currentPage: number;
};

export default function Nav({
    navButtons,
    onNavButtonClick,
    currentPage
}: NavProps) {
    const { navPanelState, setNavPanelState } = useContext(CoreContext);

    const [panelWidth, setPanelWidth] = useState(
        navPanelState === "collapsed" ? CONFIG.nav.panel.collapsedSize : CONFIG.nav.panel.expandedSize
    );

    useEffect(() => {
        switch (navPanelState) {
            case "collapsing":
                setPanelWidth(CONFIG.nav.panel.collapsedSize);
                break;
            case "expanding":
                setPanelWidth(CONFIG.nav.panel.expandedSize);
                break;
        }

        setTimeout(() => {
            switch (navPanelState) {
                case "collapsing":
                    setNavPanelState("collapsed");
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
                relative h-full bg-black bg-opacity-90 backdrop-blur-lg flex justify-between items-center shadow-lg shadow-black
                transition-all ease-in-out border-r border-neutral-800 overflow-hidden
            `}
            style={{
                transitionDuration: `${CONFIG.nav.panel.transitionDuration}ms`,
                minWidth: `${CONFIG.nav.panel.collapsedSize}px`,
                width: `${panelWidth}px`,
                maxWidth: `${CONFIG.nav.panel.expandedSize}px`
            }}
        >
            <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
                <div className="w-full flex flex-col justify-start items-center">
                    {navButtons.map((data, index) => (
                        <NavButton
                            key={index}
                            data={data}
                            navPanelState={navPanelState}
                            isActive={index === currentPage}
                            isDisabled={navPanelState === "collapsing" || navPanelState === "expanding"}
                            onClick={() => onNavButtonClick?.(index)}
                        />
                    ))}
                </div>

                <div className="w-full flex justify-center items-center h-8 border-t border-neutral-800 shadow shadow-black">
                    <IconButton
                        icon={
                            <KeyboardDoubleArrowRightIcon
                                className="transform transition-transform ease-in-out"
                                style={{
                                    transitionDuration: `${CONFIG.nav.panel.transitionDuration}ms`,
                                    transform: `rotate(${(navPanelState === "collapsed" || navPanelState === "collapsing") ? 0 : 180}deg)`
                                }}
                            />
                        }
                        onClick={() => {
                            if (navPanelState === "collapsed") {
                                setNavPanelState("expanding");
                            } else if (navPanelState === "expanded") {
                                setNavPanelState("collapsing");
                            }
                        }}
                        size="md"
                        useParentSize
                        isDisabled={navPanelState === "collapsing" || navPanelState === "expanding"}
                    />
                </div>
            </div>
        </nav>
    );
}