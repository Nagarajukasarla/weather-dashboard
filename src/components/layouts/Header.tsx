import { BarChartOutlined } from "@ant-design/icons";
import React from "react";

const Header: React.FC = () => {
    return (
        <div
            className="
                flex items-center justify-between 
                w-full 
                px-relative-x
                py-relative-y
                bg-background-surface 
                border-b border-border-normal
                shadow-header
                text-foreground
                backdrop-blur-sm
            "
        >
            <div className="flex items-center gap-2 sm:gap-4">
                <BarChartOutlined className="text-header-icon text-xl sm:text-2xl" />
                <h2 className="text-background-foreground text-heading-h1 font-semibold">Analytics Dashboard</h2>
            </div>
        </div>
    );
};

export default Header;
