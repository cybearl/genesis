import { useEffect, useState } from "react";


type ProgressBarProps = {
    progress: number;

    size?: "sm" | "md" | "lg";
};

const styles = {
    size: {
        "sm": "h-4",
        "md": "h-6",
        "lg": "h-8"
    }
};

export default function ProgressBar({
    progress,

    size = "md"
}: ProgressBarProps) {
    const [sizeStyle, setSizeStyle] = useState(styles.size[size]);

    useEffect(() => {
        setSizeStyle(styles.size[size]);
    }, [size]);

    return (
        <div className={`
            w-full border border-white overflow-hidden flex items-center justify-start
            shadow-lg shadow-black p-[3px]
            ${sizeStyle === null ? "invisible" : sizeStyle}
        `}>
            <div
                className="bg-white transition-all h-full ease-in-out duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}