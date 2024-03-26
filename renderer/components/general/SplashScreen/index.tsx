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
            className="absolute z-50 inset-0 bg-primary-900 pointer-events-none flex items-center justify-center flex-col"
            onClick={(e) => e.preventDefault()}
        >
            <div className="absolute w-1/2 aspect-square z-0 mr-2">
                <Image
                    src="/static/images/logo/grayscale.webp"
                    alt="Loading screen logo"
                    fill
                    className="opacity-30 object-cover overflow-visible"
                />

                <Image
                    src="/static/images/logo/colorized.webp"
                    alt="Loading screen logo"
                    fill
                    className="animate-opacity-pulse p-1 object-cover"
                />
            </div>

            <div className="w-full h-full flex z-10">
                <div className="w-full backdrop-blur">

                </div>

                <hr className="h-full border-none w-[1px] bg-primary-50 bg-opacity-50" />

                <div className="w-full">

                </div>
            </div>

            <ProgressBar
                progress={64}
                size="xs"
            />
        </div>
    );
}