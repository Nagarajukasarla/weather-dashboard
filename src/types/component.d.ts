export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string[];
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

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
}

export interface ChartDataProps {
    data: ContinuesData[];
}

export type Dimensions = {
    width?: number;
    height?: number;
}

export type WindowSize = {
    dimensions: Dimensions;
    device: "lg" | "md" | "sm" | "xs";
}

export type Option = {
    key: string;
    label: string;
    value: string;
    object?: any;
}

export type PopupType = "SUCCESS" | "ERROR" | "INFO" | "WARNING";

