import CButton from "@/components/core/Button";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * Type of day selector action
 */
export type DaySelectorAction = "prev" | "next";

/**
 * Props of day selector
 */
interface DaySelectorProps {
    /**
     * Current value
     */
    value: any;
    /**
     * Minimum value
     */
    min: any;
    /**
     * Maximum value
     */
    max: any;
    /**
     * Function to be called when the value changes
     */
    onChange: (action: DaySelectorAction) => void;
    /**
     * Optional styles
     */
    className?: string;
}

/**
 * Day selector component
 */
const DaySelector: React.FC<DaySelectorProps> = ({ value, min, max, onChange, className }) => {
    return (
        <>
            <div className={cn("w-[160px] flex items-center justify-between", className)}>
                <CButton
                    onClick={() => onChange("prev")}
                    disabled={value === min}
                    className="w-[2rem] h-[2rem] bg-background-button text-foreground-on-surface
                            flex items-center justify-center
                            hover:bg-background-button-hover
                            disabled:bg-background-button-disabled disabled:text-foreground-button-disabled"
                >
                    <svg viewBox="0 0 1024 1024" className="" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="50"
                        ></path>
                    </svg>
                </CButton>
                <div className="flex items-center">
                    <p className="text-text-t2 font-semibold text-foreground-surface">{String(value)}</p>
                </div>
                <CButton
                    onClick={() => onChange("next")}
                    disabled={value === max}
                    className="w-[2rem] h-[2rem] bg-background-button text-foreground-on-surface
                            flex items-center justify-center
                            hover:bg-background-button-hover
                            disabled:bg-background-button-disabled disabled:text-foreground-button-disabled"
                >
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="50"
                        ></path>
                    </svg>
                </CButton>
            </div>
        </>
    );
};

export default DaySelector;
