import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import React from "react";

interface CardProps {
    icon: React.ReactNode;
    title: string;
    value: string | [string, string];
    unit?: string;
}

const CCard: React.FC<CardProps> = ({ icon, title, value, unit }) => {
    return (
        <div
            className="
                border border-border-normal
                content-center
                py-4
                px-2
                flex-1
                max-w-[170px]
                rounded-lg
            "
        >
            <div className="flex flex-col overflow-hidden">

                {/* Header section */}
                <div className="flex items-center justify-center mb-2">
                    <div className="text-heading-h2 text-foreground-surface mr-relative-x flex">{icon}</div>
                    <div className="flex justify-center text-secondary-foreground">
                        <p className="text-text-t2 text-foreground-surface">{title}</p>
                    </div>
                </div>

                 {/* Content section */}
                <div className="flex justify-center">
                    {Array.isArray(value) ? (
                        <div className="flex flex-1 justify-around">

                            {/* First slot (Max value) */}
                            <div className="flex align-center">
                                <ArrowUpOutlined className="text-text-t2 mr-1 text-foreground-danger" />
                                <p className="text-text-t2 text-foreground font-semibold">
                                    {value[0]}
                                    <span className="text-text-t3">{unit}</span>
                                </p>
                            </div>

                            {/* Second slot (Min value) */}
                            <div className="flex align-center">
                                <ArrowDownOutlined className="text-text-t2 mr-1 text-foreground-success" />
                                <p className="text-text-t2 text-foreground font-semibold">
                                    {value[1]}
                                    <span className="text-text-t3">{unit}</span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-text-t2 font-semibold">
                            {value}
                            <span className="text-text-t3">{unit}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CCard;
