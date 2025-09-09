import type { Dimensions } from "@/types/component";
import React, { useContext } from "react";

interface ContextProps {
    /**
     * Header dimensions
     */
    headerDimensions?: Dimensions;
    /**
     * Content dimensions
     */
    contentDimensions?: Dimensions;
}

/**
 * Wrapper context for card dimensions
 */
export const WrapperContext = React.createContext<ContextProps>({
    headerDimensions: { width: 0, height: 0 },
    contentDimensions: { width: 0, height: 0 },
});

/**
 * Hook to use wrapper context
 */
export const useWrapperContext = () => useContext(WrapperContext);
