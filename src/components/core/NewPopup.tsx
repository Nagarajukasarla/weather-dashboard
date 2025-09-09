import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PopupProps {
    /**
     * Title of the popup
     */
    title: string;

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
    content?: ReactNode;

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
    content,
    onClose,
    actionButtonText = "OKAY",
    className = "",
}) => {

    return (
        <div className={`flex flex-col h-full items-center ${className}`}>
            {/* Scrollable content area */}
            <div
                className="w-full p-4 sm:p-6
                    flex-1 items-center lg:items-end lg:flex lg:justify-between
                    overflow-y-auto"
            >
                <div className="lg:w-1/4  hidden lg:block">
                    <svg
                        width="50px"
                        height="50px"
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke-width="3"
                        stroke="#000000"
                        fill="none"
                    >
                        <path d="M56.15,53.91H7.85a.66.66,0,0,1-.57-1l24.15-42.5a.65.65,0,0,1,1.14,0l24.15,42.5A.66.66,0,0,1,56.15,53.91Z" />
                        <line x1="32" y1="46.77" x2="32" y2="47.44" stroke-linecap="round" />
                        <line x1="32" y1="24.02" x2="32" y2="41.45" stroke-linecap="round" />
                    </svg>
                </div>
                <div className="flex flex-col items-center lg:w-3/4">
                    <h2 className="text-heading-h2 font-semibold text-gray-900">{title}</h2>
                    {(content && <div className="flex flex-1 text-center text-text-t1">{content}</div>) || (
                        <div className="text-text-t2">
                            <p>No content provided.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer with action button */}
            <div className="border-t border-gray-200 w-full">
                <div className="flex justify-center lg:justify-end lg:py-3 lg:px-5">
                    <motion.button
                        type="button"
                        onClick={onClose}
                        whileTap={{ background: "text-gray-200" }} // TODO Define this color in theme and use here
                        className="w-full lg:w-[8rem] py-3 lg:py-1 
                            text-sm sm:text-base lg:text-white
                            bg-transparent lg:bg-blue-600 text-blue-500 font-bold
                            lg:rounded-sm focus:outline-none focus:ring-21 focus:ring-offset-22 focus:ring-blue-500 
                            transition-colors duration-150"
                    >
                        {actionButtonText}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
