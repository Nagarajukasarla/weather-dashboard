import { BarChartOutlined } from "@ant-design/icons";
import React from "react";
import CButton from "@/components/core/Button";
import useTheme from "@/hooks/useTheme";

/**
 * Header component with title
 */
const Header: React.FC = () => {
    const { isDark, toggleMode } = useTheme();
    return (
        <div
            className="
                w-full 
                flex justify-between items-center
                px-relative-x
                py-relative-y
                bg-background-surface 
                border-b border-border-normal
                shadow-box-shadow
                backdrop-blur-sm
            "
        >
            <div className="flex">
                <BarChartOutlined className="text-primary text-xl sm:text-2xl mr-2" />
                <h2 className="text-foreground text-heading-h1 font-semibold">Analytics Dashboard</h2>
            </div>

            <CButton className="text-foreground" onClick={toggleMode}>{isDark ? "Light" : "Dark"}</CButton>
        </div>
    );
};

export default Header;
