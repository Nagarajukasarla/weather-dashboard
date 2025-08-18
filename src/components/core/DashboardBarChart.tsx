import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import NoData from "../feature/NoData";
import type { BarChartDataProps } from "../../types/component";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "#1f2937", // dark gray
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                }}
            >
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                    {String(label).length === 2 ? (label + ":00") : label}
                </p>
                <p style={{ margin: 0, fontSize: "13px" }}>
                    Value: <span style={{ color: "#93c5fd" }}>{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const DashboardBarChart: React.FC<BarChartDataProps> = ({ data }) => {
    return data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20 }}>
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
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default DashboardBarChart;
