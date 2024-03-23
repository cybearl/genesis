import Image from "next/image";
import { useEffect, useState } from "react";
// import AppConfig from "@/configs/app.config";


type SplashScreenProps = {
    isEnabled?: boolean;
};

export default function SplashScreen({
    isEnabled = false
}: SplashScreenProps) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (isFirstAppearance) setIsFirstAppearance(false);
    }, [isFirstAppearance]);

    useEffect(() => {
        if (isEnabled) setIsHidden(false);
        else setTimeout(() => setIsHidden(true), 500);
    }, [isEnabled]);

    return (
        <div
            className="absolute z-50 inset-0 w-full h-full items-center justify-center bg-secondary-950 pointer-events-none"
            style={{
                animation: `${isEnabled ? "opacity-in" : "opacity-out"} 0.5s ease-in-out`,
                display: isHidden ? "none" : "flex",
                opacity: isFirstAppearance ? 1 : "unset"
            }}
            onClick={(e) => e.preventDefault()}
        >
            <div className="relative w-full aspect-square flex items-center max-w-[320px]">
                <Image
                    src="/static/images/logo/grayscale.webp"
                    alt="Loading screen logo"
                    fill
                    className="opacity-50"
                />

                <Image
                    src="/static/images/logo/colorized.webp"
                    alt="Loading screen logo"
                    fill
                    className="animate-opacity-pulse p-1"
                />
            </div>
        </div>
    );
}