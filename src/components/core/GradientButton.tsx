import React from "react";

interface GradientButtonProps {
    /**
     * Button content
     */
    children: React.ReactNode;
    /**
     * Function to be called when the button is clicked
     */
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    /**
     * Additional classes to be applied to the button
     */
    className?: string;
    /**
     * Size of the button
     */
    size?: "sm" | "md" | "lg";
    /**
     * Variant of the button
     */
    variant?: "primary" | "secondary";
    /**
     * Link to be opened when the button is clicked
     */
    href?: string;
    /**
     * Type of the button
     */
    type?: "button" | "submit" | "reset";
    /**
     * Whether the button is disabled
     */
    disabled?: boolean;
    /**
     * Icon to be displayed in the button
     */
    icon?: React.ReactNode;
    /**
     * Position of the icon
     */
    iconPosition?: "left" | "right";
    /**
     * Whether the button is full width
     */
    fullWidth?: boolean;
}

/**
 * Gradient button component
 */
const GradientButton: React.FC<GradientButtonProps> = ({
    children,
    onClick,
    className = "",
    size = "md",
    variant = "primary",
    href,
    type = "button",
    disabled = false,
    icon,
    iconPosition = "right",
    fullWidth = false,
}) => {
    // Size classes
    const sizeClasses = {
        sm: "text-xs w-btn-width-sm h-btn-height-sm",
        md: "text-sm w-btn-width-md h-btn-height-md",
        lg: "text-base px-6 py-2.5 min-w-[160px] h-[42px]",
    };

    // Variant classes
    const variantClasses = {
        primary: "from-blue-400 via-purple-400 to-pink-500",
        secondary: "from-purple-500 via-fuchsia-500 to-pink-500",
    };

    // Base classes
    const baseClasses = `
        relative overflow-hidden
        font-medium tracking-wide
        rounded-full
        transition-all duration-300
        hover:animate-glow
        flex items-center justify-center
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
    `;

    // Gradient border effect with enhanced glow
    const buttonContent = (
        <>
            {/* Gradient border */}
            <span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${variantClasses[variant]}`}
            ></span>

            {/* Inner background - more transparent */}
            <span className="absolute inset-[1.5px] bg-[#0f1624]/95 rounded-full"></span>

            {/* Glow effect - subtle by default, more on hover */}
            <span
                className={`absolute inset-0 rounded-full opacity-10 hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r blur-lg ${variantClasses[variant]}`}
            ></span>

            {/* Additional subtle pulsing glow */}
            <span
                className={`absolute inset-0 rounded-full opacity-10 hover:opacity-25 transition-opacity duration-500 animate-pulse bg-gradient-to-r blur-xl ${variantClasses[variant]}`}
            ></span>

            {/* Content */}
            <span
                className={`relative flex items-center justify-center gap-2 z-10 text-white font-medium tracking-wider`}
            >
                {iconPosition === "left" && icon}
                {children}
                {iconPosition === "right" && icon}
            </span>
        </>
    );

    // Render as link or button
    if (href) {
        return (
            <a
                href={href}
                className={`${baseClasses} ${className}`}
                onClick={onClick}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={`${baseClasses} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {buttonContent}
        </button>
    );
};

export default GradientButton;
