import { useEffect, useRef } from "react";


/**
 * Custom hook for a looped interval.
 * @param callback The function to be called at each interval.
 * @param delay The delay between each interval in milliseconds.
 */
export default function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) savedCallback.current();
        };

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}