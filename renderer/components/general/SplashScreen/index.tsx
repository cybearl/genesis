import Image from "next/image";
import { useContext } from "react";

import ProgressBar from "@/components/base/ProgressBar";
import { CoreContext } from "@/components/contexts/Core";


type SplashScreenProps = {
    isEnabled?: boolean;
};

export default function SplashScreen({
    isEnabled = false
}: SplashScreenProps) {
    const { appLoadingStatus } = useContext(CoreContext);

    if (!isEnabled) return null;

    return (
        <div
            className="absolute z-50 inset-0 w-full h-full bg-secondary-950 pointer-events-none"
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