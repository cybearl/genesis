import { useEffect, useState } from "react";


type ProgressBarProps = {
    progress: number;

    variant?: "primary" | "secondary";
    size?: "xs" | "sm" | "md" | "lg";
};

const styles = {
    variant: {
        "primary": "",
        "secondary": ""
    },
    size: {
        "xs": "h-1",
        "sm": "h-4",
        "md": "h-6",
        "lg": "h-8"
    }
};

export default function ProgressBar({
    progress,

    variant = "primary",
    size = "md"
}: ProgressBarProps) {
    const [variantStyle, setVariantStyle] = useState(styles.variant[variant]);
    const [sizeStyle, setSizeStyle] = useState(styles.size[size]);

    useEffect(() => {
        setVariantStyle(styles.variant[variant]);
    }, [variant]);

    useEffect(() => {
        setSizeStyle(styles.size[size]);
    }, [size]);

    return (
        <div className={`
            w-full overflow-hidden flex items-center justify-start
            shadow-lg shadow-black bg-gray-900
            ${variantStyle}
            ${sizeStyle === null ? "invisible" : sizeStyle}
        `}>
            <div
                className="bg-gray-200 transition-all h-full ease-in-out duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}