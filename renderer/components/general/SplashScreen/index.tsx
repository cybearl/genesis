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
            className="absolute z-50 inset-0 bg-secondary-900 pointer-events-none"
            onClick={(e) => e.preventDefault()}
        >
            {/* <div className="relative w-full aspect-square flex items-center justify-center">
                    <Image
                        src="/static/images/logo/grayscale.webp"
                        alt="Loading screen logo"
                        fill
                        className="opacity-50 object-contain"
                    />

                    <Image
                        src="/static/images/logo/colorized.webp"
                        alt="Loading screen logo"
                        fill
                        className="animate-opacity-pulse p-2 object-contain"
                    />
                </div> */}

            <div className="absolute bottom-8 left-4 right-4">
                <ProgressBar
                    progress={50}
                    size="sm"
                />
            </div>
        </div>
    );
}