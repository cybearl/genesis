import Image from "next/image";
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
            w-full border border-white rounded-full overflow-hidden flex items-center justify-start
            ${sizeStyle === null ? "invisible" : sizeStyle}
        `}>
            <div
                className="h-full border-4 border-secondary-50 rounded-full relative flex"
                style={{ width: `${progress}%` }}
            >
                <Image
                    src="/static/images/logo/colorized.webp"
                    alt=""
                    fill
                    className="object-cover min-w-[200%] -translate-x-[25%] blur-sm brightness-150"
                />
            </div>
        </div>
    );
}