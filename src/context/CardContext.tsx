import type { Dimensions } from "@/types/component";
import React, { useContext } from "react";

interface ContextProps {
    headerDimensions?: Dimensions;
    contentDimensions?: Dimensions;
}

export const WrapperContext = React.createContext<ContextProps>({
    headerDimensions: { width: 0, height: 0 },
    contentDimensions: { width: 0, height: 0 },
});

export const useWrapperContext = () => useContext(WrapperContext);
