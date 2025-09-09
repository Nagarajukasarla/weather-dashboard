import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import NoData from "@/components/core/NoData";
import type { ChartDataProps } from "@/types/component";
import React from "react";

/**
 * Custom tooltip component
 */
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="bg-background
                    text-background-foreground
                    py-2
                    px-4
                    rounded-lg
                    shadow-header
                "
            >
                <p className="font-bold text-text-t1 m-0">{String(label).length === 2 ? label + ":00" : label}</p> {/* Strictly depends on the data format */}
                <p className="text-text-t2 m-0">
                    Value: <span className="text-background-tooltipTextValue">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

/**
 * Bar chart component
 */
const CBarChart: React.FC<ChartDataProps> = ({ data }) => {
    return data && data.length > 0 ? (
        <div className="flex flex-col h-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ left: -15, top: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="dateLabel" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <YAxis width={40} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="temperature"
                        barSize={35}
                        fill="#818cf8"
                        radius={[8, 8, 0, 0]} // rounded top corners
                        animationDuration={700}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default CBarChart;
