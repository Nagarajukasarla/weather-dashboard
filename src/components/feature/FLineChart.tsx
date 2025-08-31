import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartDataProps } from "@/types/component";
import NoData from "@/components/core/NoData";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="
                    bg-background
                    text-background-foreground
                    py-2
                    px-4
                    rounded-lg
                    shadow-header
                "
            >
                <p className="font-bold text-text-t1 m-0">{String(label).length === 2 ? label + ":00" : label}</p>
                <p className="text-text-t2 m-0">
                    Temperature: <span className="text-background-tooltipTextValue">{payload[0].value}</span>
                </p>
                <p className="text-text-t2 m-0">
                    Feels like: <span className="text-background-tooltipTextValue">{payload[1].value}</span>
                </p>
                <p className="text-text-t2 m-0">
                    Humidity: <span className="text-background-tooltipTextValue">{payload[2].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ payload }: any) => {
    return (
        <div
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
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                    }}
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

const DashboardLineChart: React.FC<ChartDataProps> = ({ data }) => {
    return data && data.length > 0 ? (
        <div
            className="flex flex-col h-full"
            // style={{ width: "calc(100vw - 100px)", height: "100%" }}
        >
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} className="border" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="dateLabel" stroke="#ccc" />
                        <YAxis yAxisId="left" stroke="#ccc" />
                        <YAxis yAxisId="right" orientation="right" stroke="#ccc" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />
                        {/* Temperature */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#ff7300"
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                            name="Temperature (°C)"
                        />
                        {/* Feels Like */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="feelsLike"
                            stroke="#ffb347"
                            strokeWidth={2}
                            name="Feels Like (°C)"
                        />
                        {/* Humidity */}
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#00c2ff"
                            strokeWidth={2}
                            name="Humidity (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default DashboardLineChart;
