import { ReactNode, useEffect, useState } from "react";

import { NavPanelState } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


export type NavButtonData = {
    label: string;
    icon: ReactNode;
    isDisabled?: boolean;
};

type NavButtonProps = {
    data: NavButtonData;
    navPanelState: NavPanelState;

    variant?: "primary";

    isDisabled?: boolean;
    isActive?: boolean;

    onClick?: () => void;
};

export default function NavButton({
    data,
    navPanelState,

    variant = "primary",

    isDisabled = false,
    isActive = false,

    onClick
}: NavButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");

    const [iconWithLabelVisibility, setIconWithLabelVisibility] = useState(
        navPanelState === "collapsed" ? "opacity-0" : ""
    );

    const [iconWithLabelTransitionDuration, setIconWithLabelTransitionDuration] = useState(
        navPanelState === "collapsed" ? 0.5 : 2
    );

    const [iconOnlyVisibility, setIconOnlyVisibility] = useState(
        navPanelState === "collapsed" ? "" : "opacity-0"
    );

    const [iconOnlyTransitionDuration, setIconOnlyTransitionDuration] = useState(
        navPanelState === "collapsed" ? 2 : 0.5
    );

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled && !isActive) setVariantStyle("border-transparent text-neutral-500 cursor-default");
                else if (!isDisabled && isActive) setVariantStyle("border-white cursor-default bg-neutral-900 bg-opacity-40");
                else if (isDisabled && isActive) setVariantStyle("border-white cursor-default");
                else setVariantStyle("border-transparent hover:bg-neutral-900 active:border-neutral-600");

                break;
        }
    }, [isActive, isDisabled, variant]);

    useEffect(() => {
        switch (navPanelState) {
            case "collapsing":
            case "collapsed":
                setIconWithLabelVisibility("opacity-0");
                setIconWithLabelTransitionDuration(0.5);
                setIconOnlyVisibility("opacity-100");
                setIconOnlyTransitionDuration(2);

                break;
            case "expanding":
            case "expanded":
                setIconWithLabelVisibility("opacity-100");
                setIconWithLabelTransitionDuration(2);
                setIconOnlyVisibility("opacity-0");
                setIconOnlyTransitionDuration(0.5);

                break;
        }
    }, [navPanelState]);

    return (
        <button
            className={`
                relative w-full py-3 border-l-2 pr-[4px]
                transition-all ease-in-out duration-150
                ${variantStyle}
            `}
            title={(!isActive && navPanelState === "collapsed") ? data.label : ""}
            disabled={isDisabled}
            onClick={onClick}
        >
            <div
                className={`
                    flex justify-center items-center gap-3
                    transition-opacity ease-in-out
                    ${iconWithLabelVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(CONFIG.nav.panel.transitionDuration * iconWithLabelTransitionDuration)}ms`
                }}
            >
                <span className="leading-none child:text-3xl">
                    {data.icon}
                </span>

                <p className="text-sm tracking-wider font-semibold text-nowrap">
                    {data.label.padEnd(CONFIG.nav.panel.minLabelLength, "\xa0")}
                </p>
            </div>

            <div
                className={`
                    absolute top-0 left-0 w-full h-full justify-center flex items-center pr-[2px]
                    transition-opacity ease-in-out
                    ${iconOnlyVisibility}
                `}
                style={{
                    transitionDuration: `${Math.round(CONFIG.nav.panel.transitionDuration * iconOnlyTransitionDuration)}ms`
                }}
            >
                <span className="leading-none child:text-3xl">
                    {data.icon}
                </span>
            </div>
        </button>
    );
}