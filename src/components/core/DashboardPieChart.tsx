import React from "react";
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    type PieLabelRenderProps,
} from "recharts";
import type { PieChartDataProps } from "../../types/component";
import type { WeatherCategoryType } from "../../utils/dashboard";
import NoData from "../feature/NoData";

const COLORS: Record<WeatherCategoryType, string> = {
    Sunny: "#FFD700", // Gold
    Cloudy: "#B0C4DE", // Light Steel Blue
    Rainy: "#1E90FF", // Dodger Blue
    Stormy: "#EB2A2A", // Dark Red
    Snowy: "#FFFFFF", // White
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "#1e293b", // dark gray
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                }}
            >
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                    {payload[0].name}
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                    Value:{" "}
                    <span style={{ color: "#93c5fd" }}>
                        {payload[0].value}%
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }: any) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                rowGap: "5px",
                gap: "18px",
                background: "#1f2937",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                flexWrap: "wrap",
                marginTop: "10px",
            }}
        >
            {payload?.map((entry: any, index: number) => (
                <div
                    key={`legend-item-${index}`}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                    }}
                >
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: entry.color,
                            borderRadius: "2px",
                        }}
                    />
                    <span>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
}: PieLabelRenderProps, color: string) => {
    const radius = Number(outerRadius) + 18; // 🔹 Move label closer by reducing gap
    const RADIAN = Math.PI / 180;
    const x = Number(cx) + (radius * Math.cos(-midAngle * RADIAN));
    const y = Number(cy) + (radius * Math.sin(-midAngle * RADIAN));

    return (
        <text
            x={x}
            y={y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="13"
            fontWeight="bold"
        >
            {percent && (percent * 100).toFixed(0)}%
        </text>
    );
};


const DashboardPieChart: React.FC<PieChartDataProps> = ({ data }) => {
    return data && data.length > 0 ? (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20 }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        labelLine={false}
                        label={(props) => renderCustomLabel(props, COLORS[props.name as WeatherCategoryType])}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.label}
                                fill={
                                    COLORS[
                                        entry.label as WeatherCategoryType
                                    ]
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        content={<CustomLegend />} 
                        wrapperStyle={{ marginTop: "5px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default React.memo(DashboardPieChart);
