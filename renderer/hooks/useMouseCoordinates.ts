import { useEffect, useState } from "react";


type MouseCoordinates = {
    x: number | null;
    y: number | null;
};

/**
 * Custom hook for tracking the mouse coordinates.
 * @returns The current mouse coordinates.
 */
export default function useMouseCoordinates() {
    const [mouseCoordinates, setMouseCoordinates] = useState<MouseCoordinates>({
        x: null,
        y: null
    });

    useEffect(() => {
        const updateMouseCoordinates = (event: MouseEvent) => {
            setMouseCoordinates({
                x: event.clientX,
                y: event.clientY
            });
        };

        window.addEventListener("mousemove", updateMouseCoordinates);
        return () => window.removeEventListener("mousemove", updateMouseCoordinates);
    }, []);

    return mouseCoordinates;
}