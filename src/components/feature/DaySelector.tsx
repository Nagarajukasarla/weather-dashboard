
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export type DaySelectorAction = "prev" | "next"

interface DaySelectorProps {
    value: any;
    min: any;
    max: any;
    onChange: (action: DaySelectorAction) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ value, min, max, onChange }) => {

    return <>
        <div style={{
            width: "160px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
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
                <p style={{
                    fontSize: "14px",
                    fontWeight: "600",
                }}>
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
}

export default DaySelector;