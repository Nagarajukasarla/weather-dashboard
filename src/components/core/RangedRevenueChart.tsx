import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { ChartDataProps } from "../../types/component";

const RangedRevenueLinedChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <LineChart
            width={1300}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
};

export default RangedRevenueLinedChart;
