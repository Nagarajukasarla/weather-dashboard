import React, { type ReactNode } from "react";

interface CardWrapperProps {
    title: string;
    slot?: ReactNode;
    children: ReactNode;
    styles?: React.CSSProperties;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({ title, children, styles, slot }) => {
    return (
        <div
            style={{
                backgroundColor: "#1f2937",
                backdropFilter: "blur(4px)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: 15,
                display: "flex",
                flexDirection: "column",
                ...styles,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                    height: "40px",
                    marginBottom: "12px",
                }}
            >
                <p
                    style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </p>
                <div
                    style={{
                        padding: "0",
                        margin: "0",
                    }}
                >
                    {slot}
                </div>
            </div>

            {/* Content */}
            {children}
        </div>
    );
};

export default React.memo(CardWrapper);
