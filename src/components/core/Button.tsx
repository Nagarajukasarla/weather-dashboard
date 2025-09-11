import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import type React from "react";

interface CButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const CButton: React.FC<CButtonProps> = ({ children, className, onClick, ...props }) => {
    return (
        <button
            className={cn(
                "bg-background text-foreground border border-border-hard rounded-lg h-btn-height-sm w-btn-width-sm hover:bg-background-hover focus:ring-2 focus:ring-ring text-text-t2",
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children || "Button"}
        </button>
    );
};

export default CButton;
