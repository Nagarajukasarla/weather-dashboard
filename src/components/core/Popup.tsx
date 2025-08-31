import React from "react";
import { Modal } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

export type PopupType = "success" | "error" | "info" | "warning";

interface PopupProps {
    visible: boolean;
    message: string;
    type?: PopupType;
    onClose: () => void;
    title?: string;
}

const Popup: React.FC<PopupProps> = ({ visible, message, type = "info", onClose, title }) => {
    //Icons and colors based on type
    const typeConfig: Record<PopupType, { icon: React.ReactNode; color: string; defaultTitle: string }> = {
        success: {
            icon: <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 24 }} />,
            color: "#52c41a",
            defaultTitle: "Success",
        },
        error: {
            icon: <CloseCircleOutlined style={{ color: "#ff4d4f", fontSize: 24 }} />,
            color: "#ff4d4f",
            defaultTitle: "Error",
        },
        info: {
            icon: <InfoCircleOutlined style={{ color: "#1677ff", fontSize: 24 }} />,
            color: "#1677ff",
            defaultTitle: "Information",
        },
        warning: {
            icon: <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 24 }} />,
            color: "#faad14",
            defaultTitle: "Warning",
        },
    };

    const { icon, color, defaultTitle } = typeConfig[type];

    return (
        <Modal
            open={visible}
            title={
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {icon}
                    <span style={{ color }}>{title || defaultTitle}</span>
                </div>
            }
            onCancel={onClose}
            footer={null}
            centered
            styles={{
                body: { fontSize: 16 },
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color }}>{message}</span>
            </div>
        </Modal>
    );
};

export default Popup;
