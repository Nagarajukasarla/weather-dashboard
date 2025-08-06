import { PieChart, Pie } from "recharts";
import type { BarChartDataProps } from "../../types/component";

const DashboardPieChart: React.FC<BarChartDataProps> = ({ data }) => {
    return (
        <>
            <PieChart width={400} height={300}> 
                <Pie
                    data={data}
                    dataKey={"value"}
                    cx="45%"
                    cy="50%"
                    outerRadius={105}
                    color="#8884d8"
                    label
                ></Pie>
            </PieChart>
        </>
    );
};

export default DashboardPieChart;