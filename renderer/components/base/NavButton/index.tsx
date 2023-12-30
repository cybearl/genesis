import { ReactNode, useEffect, useState } from "react";

import { IsNavPanelState } from "@/components/contexts/Core";
import CONFIG from "@/configs/app.config";


type NavButtonProps = {
    label: string;
    icon: ReactNode;
    navPanelState: IsNavPanelState;

    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";

    onClick?: () => void;
    isDisabled?: boolean;
};

export default function NavButton({
    label,
    icon,
    navPanelState,

    variant = "primary",
    size = "md",

    onClick,
    isDisabled = false
}: NavButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");
    const [sizeStyle, setSizeStyle] = useState("");

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
                if (isDisabled) setVariantStyle("text-neutral-800 cursor-default");
                else setVariantStyle("text-primary-400 hover:text-primary-500 active:text-primary-600");
                break;
            case "secondary":
                setVariantStyle("");
                break;
            case "tertiary":
                setVariantStyle("");
                break;
        }
    }, [isDisabled, variant]);

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("child:!text-2xl");
                break;
            case "md":
                setSizeStyle("child:!text-3xl");
                break;
            case "lg":
                setSizeStyle("child:!text-4xl");
                break;
        }
    }, [size]);

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
                relative w-full pb-2 pt-1
                ${variantStyle}
                ${sizeStyle}
            `}
            onClick={onClick}
        >
            <div
                className={`
                    relative w-full flex justify-center items-center gap-3
                    transition-all ease-in-out
                    ${iconWithLabelVisibility}
                `}
                style={{
                    transitionDuration: `${
                        Math.round(CONFIG.nav.panel.transitionDuration * iconWithLabelTransitionDuration)
                    }ms`
                }}
            >
                <span className="leading-none child:text-3xl">
                    {icon}
                </span>

                <p className="text-sm pt-1.5 tracking-wider text-nowrap">
                    {label}
                </p>
            </div>

            <div
                className={`
                    absolute top-0 left-0 w-full justify-center
                    transition-all ease-in-out
                    ${iconOnlyVisibility}
                `}
                style={{
                    transitionDuration: `${
                        Math.round(CONFIG.nav.panel.transitionDuration * iconOnlyTransitionDuration)
                    }ms`
                }}
            >
                <span className="leading-none child:text-3xl">
                    {icon}
                </span>
            </div>
        </button>
    );
}