import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import React from "react";

interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | [string, string];
    style?: React.CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, value, style }) => {
    const cardStyle: React.CSSProperties = {
        width: "200px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#1f2937",
        color: "#fff",
        padding: "20px 25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...style,
    };

    const rowStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
    };

    const iconStyle: React.CSSProperties = {
        fontSize: "24px",
        marginRight: "15px",
    };

    const colStyle: React.CSSProperties = {
        flex: 1,
        padding: 0,
    };

    const titleStyle: React.CSSProperties = {
        fontSize: "16px",
        margin: 0,
        color: "#9ca3af",
    };

    const valueStyle: React.CSSProperties = {
        fontSize: "17px",
        fontWeight: 600,
    };

    return (
        <div style={cardStyle}>
            <div style={rowStyle}>
                <div style={iconStyle}>{icon}</div>
                <div style={colStyle}>
                    <p style={titleStyle}>{title}</p>
                    {value.length > 1 ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "150px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ArrowUpOutlined style={{ color: "#10b981", marginRight: "5px" }} />
                                <p style={valueStyle}>{value[0]}</p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ArrowDownOutlined
                                    style={{ color: "#ef4444", marginRight: "5px" }}
                                />
                                <p style={valueStyle}>{value[1]}</p>
                            </div>
                        </div>
                    ) : (
                        <p style={valueStyle}>{value}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
