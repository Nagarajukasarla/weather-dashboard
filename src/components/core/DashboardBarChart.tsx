import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { BarChartDataProps } from "../../types/component";

const DashboardBarChart: React.FC<BarChartDataProps> = ({ data }) => {
    return (
        <>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data}>
                    <Tooltip />
                    <XAxis dataKey={"label"} />
                    <YAxis />
                    <Bar dataKey={"value"} barSize={35} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default DashboardBarChart;