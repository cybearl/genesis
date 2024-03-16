import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";

import IconButton from "@/components/base/IconButton";
import NavButton, { NavButtonData } from "@/components/base/NavButton";
import { CoreContext } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


type NavProps = {
    topNavButtons: NavButtonData[];
    bottomNavButtons: NavButtonData[];
    devOnlyNavButtons?: NavButtonData[];
    onNavButtonClick: (index: number) => void;
    activeNavButtonIndex: number;
};

export default function Nav({
    topNavButtons,
    bottomNavButtons,
    devOnlyNavButtons = [],
    onNavButtonClick,
    activeNavButtonIndex
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
                relative h-full bg-black bg-opacity-[0.92] backdrop-blur-lg flex justify-between items-center shadow-lg shadow-black
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
                <div className="w-full flex flex-col h-full justify-between items-center">
                    <div className="w-full flex flex-col justify-start items-center">
                        {topNavButtons.map((data, index) => (
                            <NavButton
                                key={index}
                                data={data}
                                navPanelState={navPanelState}
                                isActive={index === activeNavButtonIndex}
                                isDisabled={navPanelState === "collapsing" || navPanelState === "expanding" || data.isDisabled}
                                onClick={() => onNavButtonClick?.(index)}
                            />
                        ))}
                    </div>

                    <div className="w-full flex flex-col justify-start items-center">
                        {bottomNavButtons.map((data, index) => {
                            const bottomIndex = topNavButtons.length + index;

                            return (
                                <NavButton
                                    key={bottomIndex}
                                    data={data}
                                    navPanelState={navPanelState}
                                    isActive={bottomIndex === activeNavButtonIndex}
                                    isDisabled={navPanelState === "collapsing" || navPanelState === "expanding" || data.isDisabled}
                                    onClick={() => onNavButtonClick?.(bottomIndex)}
                                />
                            );
                        })}

                        {process.env.NODE_ENV === "development" && devOnlyNavButtons.map((data, index) => {
                            const devIndex = topNavButtons.length + bottomNavButtons.length + index;

                            return (
                                <NavButton
                                    key={devIndex}
                                    data={data}
                                    navPanelState={navPanelState}
                                    isActive={devIndex === activeNavButtonIndex}
                                    isDisabled={navPanelState === "collapsing" || navPanelState === "expanding"}
                                    onClick={() => onNavButtonClick?.(devIndex)}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="w-full flex justify-center items-center h-[31px] border-t border-neutral-800 shadow shadow-black">
                    <IconButton
                        title={navPanelState === "collapsed" ? "Expand" : "Collapse"}
                        icon={
                            <Icon
                                icon="material-symbols:keyboard-double-arrow-right-rounded"
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