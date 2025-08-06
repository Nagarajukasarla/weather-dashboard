import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import type { BarChartDataProps } from "../../types/component";

const RangedRevenueLinedChart: React.FC<BarChartDataProps> = ({ data }) => {
    return (
        <div style={{ width: "calc(100vw - 100px)", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RangedRevenueLinedChart;

