import { Empty } from "antd";
import React from "react";

interface NoDataProps {
    /**
     * Title of the no data message
     */
    title?: string;
    /**
     * Message of the no data message
     */
    message?: string;
}

/**
 * No data component
 */
const NoData: React.FC<NoDataProps> = ({ title = "No Data Found", message = "No data available" }) => {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "20px",
        }}>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>
                        <p style={{ fontSize: "18px", fontWeight: "600", color: '#E5E7EB', margin: 0 }}>
                            {title}
                        </p>
                        <p style={{ fontSize: "16px", color: "#9ca3af", margin: '4px 0 0 0' }}>
                            {message}
                        </p>
                    </span>
                }
            />
        </div>
    );
}

export default NoData;