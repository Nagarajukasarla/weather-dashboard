import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface NewPopupWrapperProps {
    /**
     * Controls whether the popup is open or closed
     */
    isOpen: boolean;

    /**
     * Callback function called when the popup is requested to close
     */
    onClose: () => void;

    /**
     * The content to be rendered inside the popup
     */
    children: React.ReactNode;

    /**
     * Whether clicking outside the popup should close it
     * @default true
     */
    closeOnOutsideClick?: boolean;

    /**
     * Whether pressing the Escape key should close the popup
     * @default true
     */
    closeOnEsc?: boolean;

    /**
     * Additional CSS classes for the popup container
     */
    className?: string;
}

const NewPopupWrapper: React.FC<NewPopupWrapperProps> = ({
    isOpen,
    onClose,
    children,
    closeOnOutsideClick = true,
    closeOnEsc = true,
    className = "",
}) => {
    const popupRef = useRef<HTMLDivElement>(null);

    // Handle click outside the popup
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) && closeOnOutsideClick) {
                onClose();
            }
        },
        [onClose, closeOnOutsideClick]
    );

    // Handle Escape key press
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && closeOnEsc) {
                onClose();
            }
        },
        [onClose, closeOnEsc]
    );

    // Add event listeners when the popup is open
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden"; // Prevent scrolling

            // Focus the first focusable element when the popup opens
            const focusableElements = popupRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]):not([disabled])'
            );
            focusableElements?.[0]?.focus();
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto"; // Re-enable scrolling
        };
    }, [isOpen, handleClickOutside, handleKeyDown]);

    // Animation variants for the overlay (background)
    const overlayVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1] as any, // Using 'easeOut' equivalent
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
                ease: [0.4, 0, 1, 1] as any, // Using 'easeIn' equivalent
            },
        },
    };

    // Animation variants for the popup content
    const popupVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                mass: 0.8,
            },
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.98,
            transition: {
                duration: 0.15,
                ease: [0.4, 0, 1, 1] as any, // Using 'easeIn' equivalent
            },
        },
    };

    // Don't render on the server
    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={overlayVariants}
                        aria-hidden="true"
                    />

                    {/* Popup container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            ref={popupRef}
                            className={`relative w-[85vw] max-w-lg max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden ${className}`}
                            role="dialog"
                            aria-modal="true"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={popupVariants}
                            onClick={e => e.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default NewPopupWrapper;
