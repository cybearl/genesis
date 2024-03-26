import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";

import IconButton from "@/components/base/IconButton";
import SidebarButton, { SidebarButtonData } from "@/components/base/SidebarButton";
import { CoreContext } from "@/components/contexts/Core";
// import AppConfig from "@/configs/app.config";


type SidebarProps = {
    topButtons: SidebarButtonData[];
    bottomButtons: SidebarButtonData[];
    devOnlyButtons?: SidebarButtonData[];
    onButtonClick: (index: number) => void;
    activeButtonIndex: number;
};

export default function Sidebar({
    topButtons,
    bottomButtons,
    devOnlyButtons = [],
    onButtonClick,
    activeButtonIndex
}: SidebarProps) {
    const { sidebarPanelState, setSidebarPanelState } = useContext(CoreContext);

    // TODO: Implement via settings
    // const [panelWidth, setPanelWidth] = useState(
    //     sidebarPanelState === "collapsed" ? AppConfig.sidebar.panel.collapsedSize : AppConfig.sidebar.panel.expandedSize
    // );

    useEffect(() => {
        switch (sidebarPanelState) {
            case "collapsing":
                // TODO: Implement via settings
                // setPanelWidth(AppConfig.sidebar.panel.collapsedSize);

                break;
            case "expanding":
                // TODO: Implement via settings
                // setPanelWidth(AppConfig.sidebar.panel.expandedSize);

                break;
        }

        // TODO: Implement via settings
        // setTimeout(() => {
        //     switch (sidebarPanelState) {
        //         case "collapsing":
        //             setSidebarPanelState("collapsed");

        //             break;
        //         case "expanding":
        //             setSidebarPanelState("expanded");

        //             break;
        //     }
        // }, AppConfig.sidebar.panel.transitionDuration);
    }, [sidebarPanelState, setSidebarPanelState]);

    return (
        <nav
            className={`
                relative h-full flex justify-between items-center
                transition-all ease-in-out overflow-hidden border-r border-primary-50
            `}
            style={{
                // TODO: Implement via settings
                // transitionDuration: `${AppConfig.sidebar.panel.transitionDuration}ms`,
                // minWidth: `${AppConfig.sidebar.panel.collapsedSize}px`,
                // width: `${panelWidth}px`,
                // maxWidth: `${AppConfig.sidebar.panel.expandedSize}px`,
                // backdropFilter: `blur(${AppConfig.sidebar.blur}px)`
            }}
        >
            <div
                className="-z-10 absolute inset-0 bg-primary-500"
                // TODO: Implement via settings
                // style={{ opacity: AppConfig.sidebar.opacity }}
            />

            <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
                <div className="w-full flex flex-col h-full justify-between items-center">
                    <div className="w-full flex flex-col justify-start items-center">
                        {topButtons.map((data, index) => (
                            <SidebarButton
                                key={index}
                                data={data}
                                sidebarPanelState={sidebarPanelState}
                                isActive={index === activeButtonIndex}
                                isDisabled={sidebarPanelState === "collapsing" || sidebarPanelState === "expanding" || data.isDisabled}
                                onClick={() => onButtonClick?.(index)}
                            />
                        ))}
                    </div>

                    <div className="w-full flex flex-col justify-start items-center">
                        {bottomButtons.map((data, index) => {
                            const bottomIndex = topButtons.length + index;

                            return (
                                <SidebarButton
                                    key={bottomIndex}
                                    data={data}
                                    sidebarPanelState={sidebarPanelState}
                                    isActive={bottomIndex === activeButtonIndex}
                                    isDisabled={sidebarPanelState === "collapsing" || sidebarPanelState === "expanding" || data.isDisabled}
                                    onClick={() => onButtonClick?.(bottomIndex)}
                                />
                            );
                        })}

                        {process.env.NODE_ENV === "development" && devOnlyButtons.map((data, index) => {
                            const devIndex = topButtons.length + bottomButtons.length + index;

                            return (
                                <SidebarButton
                                    key={devIndex}
                                    data={data}
                                    sidebarPanelState={sidebarPanelState}
                                    isActive={devIndex === activeButtonIndex}
                                    isDisabled={sidebarPanelState === "collapsing" || sidebarPanelState === "expanding"}
                                    onClick={() => onButtonClick?.(devIndex)}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="w-full flex justify-center items-center h-[31px] border-t border-primary-50">
                    <IconButton
                        title={sidebarPanelState === "collapsed" ? "Expand" : "Collapse"}
                        icon={
                            <Icon
                                icon="material-symbols:keyboard-double-arrow-right-rounded"
                                className="transform transition-transform ease-in-out"
                                style={{
                                    // TODO: Implement via settings
                                    // transitionDuration: `${AppConfig.sidebar.panel.transitionDuration}ms`,
                                    transform: `rotate(${(sidebarPanelState === "collapsed" || sidebarPanelState === "collapsing") ? 0 : 180}deg)`
                                }}
                            />
                        }
                        onClick={() => {
                            if (sidebarPanelState === "collapsed") {
                                setSidebarPanelState("expanding");
                            } else if (sidebarPanelState === "expanded") {
                                setSidebarPanelState("collapsing");
                            }
                        }}
                        size="md"
                        useParentSize
                        isDisabled={sidebarPanelState === "collapsing" || sidebarPanelState === "expanding"}
                    />
                </div>
            </div>
        </nav>
    );
}