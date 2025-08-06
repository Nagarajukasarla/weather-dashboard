import { BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";
import type { BarChartDataProps } from "../../types/component";

const DashboardBarChart: React.FC<BarChartDataProps> = ({ data }) => {
    return (
        <>
            <BarChart width={730} height={300} data={data}>
                <Tooltip />
                <XAxis dataKey={"label"} />
                <YAxis />
                <Bar dataKey={"value"} barSize={35} fill="#8884d8" />
            </BarChart>
        </>
    );
};

export default DashboardBarChart;