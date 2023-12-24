import { useEffect, useState } from "react";

import CONFIG from "@/configs/app.config";


export default function Nav() {
    const [width, setWidth] = useState(CONFIG.nav.minWidth);
    const [isLeftButtonDown, setIsLeftButtonDown] = useState(false);
    const [mouseX, setMouseX] = useState(0);

    useEffect(() => {
        if (isLeftButtonDown) {
            const onMouseMove = (e: MouseEvent) => {
                const delta = e.clientX - mouseX;
                setWidth((prev) => Math.max(CONFIG.nav.minWidth, prev + delta));
                setMouseX(e.clientX);
            };

            const onMouseUp = (e: MouseEvent) => {
                if (e.button === 0) setIsLeftButtonDown(false);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            };
        }
    }, [isLeftButtonDown, mouseX]);

    return (
        <nav
            className={`
                relative px-4 flex h-full justify-center items-center bg-black py-8 bg-opacity-50
                border-r border-neutral-700
            `}
            style={{
                minWidth: `${CONFIG.nav.minWidth}px`,
                width: `${width}px`,
                maxWidth: `${CONFIG.nav.maxWidth}px`
            }}
        >
            <div
                className="absolute -right-[6px] w-3 h-full cursor-ew-resize"
                onMouseDown={(e) => {
                    if (e.button === 0) {
                        setIsLeftButtonDown(true);
                        setMouseX(e.clientX);
                    }
                }}
                onMouseUp={(e) => {
                    if (e.button === 0) setIsLeftButtonDown(false);
                }}
            />

        </nav>
    );
}