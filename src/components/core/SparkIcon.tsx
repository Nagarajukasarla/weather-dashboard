import React from "react";

const SparklesIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="url(#sparkles-gradient)"
        className="w-5 h-5 animate-pulse"
    >
        <defs>
            <linearGradient id="sparkles-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa">
                    {" "}
                    {/* blue-400 */}
                    <animate
                        attributeName="stop-color"
                        values="#60a5fa;#a78bfa;#ec4899;#60a5fa"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                </stop>
                <stop offset="100%" stopColor="#ec4899">
                    {" "}
                    {/* pink-500 */}
                    <animate
                        attributeName="stop-color"
                        values="#ec4899;#a78bfa;#60a5fa;#ec4899"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                </stop>
            </linearGradient>
        </defs>
        <path
            stroke="url(#sparkles-gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636"
        />
    </svg>
);

export default SparklesIcon;
