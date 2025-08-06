export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string[];
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
};

export type ChartData = {
    label: string;
    value: number;
};

export interface BarChartDataProps {
    data: ChartData[];
};