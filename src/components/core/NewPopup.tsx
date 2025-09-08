// Popup should have title, description, and OK button

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface PopupProps {
    /**
     * Title of the popup
     */
    title: string;

    /**
     * Description text displayed below the title
     */
    description?: string;

    /**
     * Callback when the popup is closed
     */
    onClose: () => void;

    /**
     * Whether to show the close button in the header
     * @default true
     */
    showCloseButton?: boolean;

    /**
     * Custom content to be rendered in the popup body
     */
    children?: ReactNode;

    /**
     * Text for the action button
     * @default 'OK'
     */
    actionButtonText?: string;

    /**
     * Additional CSS classes for the popup container
     */
    className?: string;
}

/**
 * A responsive and accessible popup component with smooth animations.
 * Can be used for dialogs, alerts, or any modal content.
 */
const Popup: React.FC<PopupProps> = ({
    title,
    description,
    onClose,
    showCloseButton = true,
    children,
    actionButtonText = "OK",
    className = "",
}) => {
    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Header with title and close button */}
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200">
                <div className="pr-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h2>
                    {description && <p className="mt-1 text-sm sm:text-base text-gray-600">{description}</p>}
                </div>

                {showCloseButton && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                        aria-label="Close popup"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {children || (
                    <div className="py-4 text-gray-600">
                        <p>No content provided.</p>
                    </div>
                )}
            </div>

            {/* Footer with action button */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
                <div className="flex justify-end">
                    <motion.button
                        type="button"
                        onClick={onClose}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                    >
                        {actionButtonText}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
