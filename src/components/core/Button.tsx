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
                "bg-background text-foreground border border-border-hard",
                "rounded-lg",
                "h-[max-content] w-[max-content]",
                "py-2 px-2",
                "hover:bg-background-hover",
                "text-text-t2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
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
