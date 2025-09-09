import { WrapperContext } from "@/context/CardContext";
import { useMeasure } from "@/hooks/useMeasure";
import React, { type HTMLAttributes, type ReactNode } from "react";

interface CardWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, "slot"> {
    /**
     * Title of the card
     */
    title?: string;
    /**
     * Slot content
     */
    slot?: ReactNode;
    /**
     * Children content
     */
    children: ReactNode;
}

/**
 * @description Responsive card wrapper component with calculated dimensions automatically from parent container
 * @param CardWrapperProps
 * @returns ReactNode
 */
export const CardWrapper: React.FC<CardWrapperProps> = ({ title, children, slot, className }) => {
    const [headerRef, headerDimensions] = useMeasure();
    const [contentRef, contentDimensions] = useMeasure();
    return (
        <WrapperContext.Provider value={{ headerDimensions, contentDimensions }}>
            <div
                className={`
                bg-background-surface
                backdrop-blur-sm
                border border-border-normal
                rounded-lg
                shadow-header
                p-wrapper
                flex flex-col
                ${className}
            `}
            >
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`
                        flex flex-col ${slot && "gap-5"}
                        sm:flex-row sm:items-center sm:justify-between
                    `}
                >
                    <p className="text-foreground-surface font-bold text-heading-h2">{title}</p>
                    <div className="p-0 m-0">{slot}</div>
                </div>

                {/* Content */}
                <div ref={contentRef} className="flex-1">
                    {children}
                </div>
            </div>
        </WrapperContext.Provider>
    );
};

export default React.memo(CardWrapper);
