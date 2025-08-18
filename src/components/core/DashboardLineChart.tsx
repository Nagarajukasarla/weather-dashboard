import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { BarChartDataProps } from "../../types/component";
import NoData from "../feature/NoData";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "#1e293b", // Lighter dark gray for better contrast
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                }}
            >
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                    {String(label).length === 2 ? label + ":00" : label}
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                    Temperature: <span style={{ color: "#93c5fd" }}>{payload[0].value}</span>
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                    Feels like: <span style={{ color: "#93c5fd" }}>{payload[1].value}</span>
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                    Humidity: <span style={{ color: "#93c5fd" }}>{payload[2].value}</span>
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
                gap: "18px",
                background: "#1f2937",
                padding: "6px 12px",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
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
                            marginTop: "2px",
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

const DashboardLineChart: React.FC<BarChartDataProps> = ({ data }) => {
    return data && data.length > 0 ? (
        <div style={{ width: "calc(100vw - 100px)", height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 15 }}>
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
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default DashboardLineChart;
