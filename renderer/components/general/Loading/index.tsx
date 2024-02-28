import { useEffect, useState } from "react";

import Logo from "@/components/base/Logo";


type LoadingProps = {
    whatIsLoading?: string;

    size?: "md" | "lg" | "xl";
    useParentDimensions?: boolean;

    isEnabled?: boolean;
};

export default function Loading({
    whatIsLoading = "CONTENT",

    size = "md",
    useParentDimensions = false,

    isEnabled = true
}: LoadingProps) {
    const [logoSizeStyle, setLogoSizeStyle] = useState<"md" | "lg" | "xl" | "2xl" | "3xl">("xl");
    const [smallTextSizeStyle, setSmallTextSizeStyle] = useState("text-sm");
    const [largeTextSizeStyle, setLargeTextSizeStyle] = useState("text-3xl");

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        switch (size) {
            case "md":
                setLogoSizeStyle("md");
                setSmallTextSizeStyle("text-sm");
                setLargeTextSizeStyle("text-xl pb-2");

                break;
            case "lg":
                setLogoSizeStyle("lg");
                setSmallTextSizeStyle("text-sm");
                setLargeTextSizeStyle("text-2xl pb-4");

                break;
            case "xl":
                setLogoSizeStyle("xl");
                setSmallTextSizeStyle("text-sm");
                setLargeTextSizeStyle("text-3xl pb-4");

                break;
        }
    }, [size]);

    // Show then in animation
    useEffect(() => {
        if (isEnabled) setIsHidden(false);
    }, [isEnabled]);

    return (
        <div
            className={`
                relative items-center justify-center ${useParentDimensions ? "w-full h-full" : "w-fit h-auto"}
                ${isEnabled ? "animate-opacity-in" : "animate-opacity-out"}
                ${isHidden ? "hidden" : "flex"}
            `}
            onAnimationEnd={() => {
                // Out animation then hide
                if (!isEnabled) setIsHidden(true);
            }}
            onClick={(e) => e.preventDefault()}
        >
            <div className="flex items-center justify-center gap-2">
                <Logo size={logoSizeStyle} />

                <div className={`${largeTextSizeStyle} font-light text-left leading-none`}>
                    <span className={`${smallTextSizeStyle} pl-4`}>
                        Please wait while ..<br />
                    </span>

                    {whatIsLoading} IS LOADING.
                </div>
            </div>
        </div>
    );
}