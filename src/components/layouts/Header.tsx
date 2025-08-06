// src/components/Header.tsx
import React from "react";
import "../../assets/header.css";
import { BarChartOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
    return (
        <header className="header-root">
            <div className="header-title">
                <BarChartOutlined className="header-icon" style={{ fontSize: 26 }} />
                <h2>Analytics Dashboard</h2>
            </div>
        </header>
    );
};

export default Header;
