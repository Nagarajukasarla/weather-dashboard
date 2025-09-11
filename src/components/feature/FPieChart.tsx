import NoData from "@/components/core/NoData";
import { useWrapperContext } from "@/context/CardContext";
import { useMeasure } from "@/hooks/useMeasure";
import type { PieChartDataProps } from "@/types/component";
import type { WeatherCategoryType } from "@/utils/dashboard";
import logger from "@/utils/logger";
import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";

// TODO : move to utils and make theme specific
const COLORS: Record<WeatherCategoryType, string> = {
    Sunny: "#FFD700", // Gold
    Cloudy: "#B0C4DE", // Light Steel Blue
    Rainy: "#1E90FF", // Dodger Blue
    Stormy: "#EB2A2A", // Dark Red
    Snowy: "#FFFFFF", // White
};

/**
 * Custom tooltip component
 */
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="
                    bg-background
                    text-foreground
                    py-2
                    px-4
                    rounded-lg
                    shadow-box-shadow
                "
            >
                <p className="font-bold text-text-t1 m-0"> {payload[0].name}</p>
                <p className="text-text-t2">
                    Value: <span className="text-foreground-link">{payload[0].value}%</span>
                </p>
            </div>
        );
    }
    return null;
};

/**
 * Custom legend component
 */
const CustomLegend = ({ payload, legendRef }: { payload?: any; legendRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div
            ref={legendRef}
            className="
                flex
                justify-center
                flex-row
                row-gap-1
                gap-4
                bg-background-surface
                py-2
                text-text-t2
                text-foreground-surface
                flex-wrap
            "
        >
            {payload?.map((entry: any, index: number) => (
                <div
                    key={`legend-item-${index}`}
                    className="
                        flex 
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <div
                        className={`
                            w-[12px]
                            h-[12px]
                            rounded-[0.2rem]
                        `}
                        style={{
                            backgroundColor: entry.color,
                        }}
                    />
                    <span>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

/**
 * Custom label component
 */
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent }: PieLabelRenderProps, color: string) => {
    const radius = Number(outerRadius) + 18; // Move label closer by reducing gap
    const RADIAN = Math.PI / 180;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={color}
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight="bold"
            className="text-text-t2"
        >
            {percent && (percent * 100).toFixed(0)}%
        </text>
    );
};

/**
 * Pie chart component
 */
const FPieChart: React.FC<PieChartDataProps> = ({ data }) => {
    const log = logger.create("FPieChart");

    const [legendRef, legendDimensions, windowDimensions] = useMeasure();
    const { headerDimensions, contentDimensions } = useWrapperContext();
    const [radius, setRadius] = useState<number>(0);
    const reductionPercentage = windowDimensions.device === "xs" ? 10 : 14;

    useEffect(() => {
        const containerMaxRadius = Math.floor(
            Math.min(contentDimensions?.height ?? 0, contentDimensions?.width ?? 0) / 2
        );
        const r = containerMaxRadius - ((headerDimensions?.height ?? 0) + (legendDimensions?.height ?? 0));
        const reducedR = r * (1 - reductionPercentage / 100);
        setRadius(Number(reducedR));
        log.debug("radius: ", reducedR);
        log.debug("headerDimensions: ", headerDimensions);
        log.debug("contentDimensions: ", contentDimensions);
        log.debug("legendDimensions: ", legendDimensions);
        log.debug("windowDimensions: ", windowDimensions);
    }, [headerDimensions, legendDimensions, contentDimensions]);

    return data && data.length > 0 ? (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart style={{ overflow: "visible", outline: "none" }}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius={radius}
                            labelLine={false}
                            label={props => renderCustomLabel(props, COLORS[props.name as WeatherCategoryType])}
                            style={{ outline: "none" }}
                        >
                            {data.map(entry => (
                                <Cell key={entry.label} fill={COLORS[entry.label as WeatherCategoryType]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            content={props => <CustomLegend {...props} legendRef={legendRef} />}
                            wrapperStyle={{ marginBottom: "8px" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default React.memo(FPieChart);
