import { ReactNode, useEffect, useState } from "react";


type IconButtonProps = {
    icon: ReactNode;

    title?: string;
    variant?: "primary" | "secondary" | "tertiary";
    size?: "sm" | "md" | "lg";
    useParentSize?: boolean;

    isDisabled?: boolean;

    onClick?: () => void;
};

export default function IconButton({
    icon,

    title,
    variant = "primary",
    size = "md",
    useParentSize = false,

    isDisabled = false,

    onClick
}: IconButtonProps) {
    const [variantStyle, setVariantStyle] = useState("");
    const [sizeStyle, setSizeStyle] = useState("");

    useEffect(() => {
        switch (variant) {
            case "primary":
                if (isDisabled) setVariantStyle("text-white cursor-default bg-primary-600");
                else setVariantStyle("text-white hover:bg-primary-600 active:bg-primary-500 bg-primary-400");

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

    return (
        <button
            className={`
                transition-all duration-150 ease-in-out flex justify-center items-center
                ${variantStyle}
                ${sizeStyle}
                ${useParentSize ? "w-full h-full" : "p-1"}
            `}
            title={title}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon}
        </button>
    );
}