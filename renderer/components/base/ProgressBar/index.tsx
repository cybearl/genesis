import Image from "next/image";
import { useEffect, useState } from "react";


type ProgressBarProps = {
    percentage: number;

    size?: "sm" | "md" | "lg";
};

export default function ProgressBar({
    percentage,
    size = "md"
}: ProgressBarProps) {
    const [sizeStyle, setSizeStyle] = useState<string | null>(null);

    useEffect(() => {
        switch (size) {
            case "sm":
                setSizeStyle("h-4");

                break;
            case "md":
                setSizeStyle("h-6");

                break;
            case "lg":
                setSizeStyle("h-8");

                break;
            default:
                setSizeStyle("h-2");

                break;
        }
    }, [size]);

    return (
        <div className={`
            w-full border border-white rounded-full overflow-hidden flex items-center justify-start
            ${sizeStyle === null ? "invisible" : sizeStyle}
        `}>
            <div
                className="h-full border-4 border-black rounded-full relative flex"
                style={{ width: `${percentage}%` }}
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