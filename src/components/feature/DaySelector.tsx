import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
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
}

/**
 * Day selector component
 */
const DaySelector: React.FC<DaySelectorProps> = ({ value, min, max, onChange }) => {
    return (
        <>
            <div
                style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Button
                    type="primary"
                    style={{
                        width: "30px",
                        height: "30px",
                        color: "#FFFFFF",
                    }}
                    onClick={() => onChange("prev")}
                    disabled={value === min}
                >
                    <LeftOutlined />
                </Button>
                <div>
                    <p
                        style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#FFFFFF",
                        }}
                    >
                        {String(value)}
                    </p>
                </div>
                <Button
                    type="primary"
                    style={{
                        width: "30px",
                        height: "30px",
                        color: "#FFFFFF",
                    }}
                    onClick={() => onChange("next")}
                    disabled={value === max}
                >
                    <RightOutlined />
                </Button>
            </div>
        </>
    );
};

export default DaySelector;