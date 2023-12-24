import Image from "next/image";
import { useEffect, useState } from "react";

import CONFIG from "@/configs/app.config";


export default function LoadingScreen() {
    const [state, setState] = useState<"BLACK" | "COLORIZED">("BLACK");

    useEffect(() => {
        const interval = setInterval(() => {
            setState(state === "BLACK" ? "COLORIZED" : "BLACK");
        }, 1500);

        return () => clearInterval(interval);
    }, [state]);

    return (
        <div
            className="absolute z-20 inset-0 w-full h-full items-center flex flex-col justify-center"
            onClick={(e) => e.preventDefault()}
        >
            <div className="w-full items-center flex flex-col justify-center">
                <div className="relative w-1/4 aspect-square flex items-start">
                    <Image
                        src="/static/images/logo/cybearl_colorized.webp"
                        alt="Loading screen logo"
                        fill
                        className="transition-opacity duration-[1500ms]"
                        style={{
                            opacity: state === "COLORIZED" ? 0.7 : 0
                        }}
                    />

                    <Image
                        src="/static/images/logo/cybearl.webp"
                        alt="Loading screen logo"
                        fill
                        className="transition-opacity duration-[1500ms]"
                        style={{
                            opacity: state === "BLACK" ? 0.7 : 0
                        }}
                    />
                </div>

                <div className="text-4xl font-extralight text-center">
                    <span className="text-sm">
                        A project by<br />
                    </span>

                    {CONFIG.appProducer}.
                </div>
            </div>

            <div className="absolute bottom-0 pb-8 px-4 text-gray-300 font-light text-base max-w-3xl text-center">
                {CONFIG.appDisclaimer}
            </div>
        </div>
    );
}