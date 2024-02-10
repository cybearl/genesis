import { useEffect, useState } from "react";


type MousePosition = {
    x: number | null;
    y: number | null;
};

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: null,
        y: null
    });

    useEffect(() => {
        const updateMousePosition = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
}