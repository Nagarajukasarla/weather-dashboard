export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string[];
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
};

export interface CategorizedData {
    label: string;
    value: number;
}

export interface PieChartDataProps {
    data: CategorizedData[];
}

export interface ContinuesData {
    dateLabel: string;
    temperature: number;
    humidity?: number;
    feelsLike?: number;
};

export interface BarChartDataProps {
    data: ContinuesData[];
}

export interface LineChartDataProps {
    data: ContinuesData[];
}