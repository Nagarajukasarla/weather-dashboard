import React from "react";
import { motion } from "framer-motion";

const Spinner: React.FC = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                backdropFilter: "blur(2px)",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Framer Motion Spinner */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f0f0f0",
                        borderTop: "3px solid #1890ff", // Antd blue
                        borderRadius: "50%",
                    }}
                />
            </div>
        </div>
    );
};

export default Spinner;