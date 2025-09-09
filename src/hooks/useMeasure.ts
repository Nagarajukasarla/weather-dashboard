import type { Dimensions, WindowSize } from "@/types/component";
import logger from "@/utils/logger";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook for measuring dimensions
 */
export function useMeasure() {
    const [divDimensions, setDivDimensions] = useState<Dimensions>({ width: 0, height: 0 });
    const [windowDimensions, setWindowDimensions] = useState<WindowSize>({ 
        dimensions: { width: window.innerWidth, height: window.innerHeight },
        device: "lg"
    });
    const ref = useRef<HTMLDivElement>(null);

    const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
        if (!entries.length) return;
        const { width, height } = entries[0].contentRect;
        setDivDimensions({ width, height });
    }, []);  

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(handleResize);
        observer.observe(ref.current);

        // Initial measurement
        const { width, height } = ref.current.getBoundingClientRect();
        setDivDimensions({ width, height });
        logger.debug("useMeasure: ", { width, height });
        return () => {
            observer.disconnect();
        };
    }, [handleResize]);

    useEffect(() => {
        const handleWindowResize = () => {
            const device = window.innerWidth < 640 ? 
                "xs" : window.innerWidth < 768 ? 
                "sm" : window.innerWidth < 1024 ? 
                "md" : "lg";
            setWindowDimensions({
                dimensions: {
                    height: window.innerHeight,
                    width: window.innerWidth,
                },
                device,
            });
        };

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return [ref, divDimensions, windowDimensions] as const;
}