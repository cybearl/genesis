import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import ProgressBar from "@/components/base/ProgressBar";
import { CoreContext } from "@/components/contexts/Core";
// import AppConfig from "@/configs/app.config";


type SplashScreenProps = {
    isEnabled?: boolean;
};

export default function SplashScreen({
    isEnabled = false
}: SplashScreenProps) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    const { appLoadingStatus } = useContext(CoreContext);

    useEffect(() => {
        if (isFirstAppearance) setIsFirstAppearance(false);
    }, [isFirstAppearance]);

    useEffect(() => {
        if (isEnabled) setIsHidden(false);
        else setTimeout(() => setIsHidden(true), 500);
    }, [isEnabled]);

    return (
        <div
            className="absolute z-50 inset-0 w-full h-full flex-col gap-4 items-center justify-center bg-secondary-950 pointer-events-none"
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

            {appLoadingStatus?.progress && (
                <div className="w-full px-4 max-w-[320px]">
                    <ProgressBar
                        progress={appLoadingStatus.progress}
                    />
                </div>
            )}
        </div>
    );
}