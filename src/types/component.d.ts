/**
 * @deprecated
 * Statistics card component props
 */
export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string[];
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

/**
 * Statistics card component props
 */
export interface StatisticsCardProps {
    /**
     * Icon to be displayed in the card
     */
    icon: React.ReactNode;
    /**
     * Title of the card
     */
    title: string;
    /**
     * Value to be displayed in the card
     */
    value: string | [string, string];
    /**
     * Unit of the value
     */
    unit?: string;
}

/**
 * Base categorized data for charts
 */
export interface CategorizedData {
    /**
     * Label of the data
     */
    label: string;
    /**
     * Value of the data
     */
    value: number;
}

/**
 * Pie chart data props
 */
export interface PieChartDataProps {
    /**
     * Data for the pie chart
     */
    data: CategorizedData[];
}

/**
 * Continues data for charts
 */
export interface ContinuesData {
    /**
     * Date label
     */
    dateLabel: string;
    /**
     * Temperature
     */
    temperature: number;
    /**
     * Humidity
     */
    humidity?: number;
    /**
     * Feels like
     */
    feelsLike?: number;
}

/**
 * Chart data props
 */
export interface ChartDataProps {
    /**
     * Data for the chart
     */
    data: ContinuesData[];
}

/**
 * Dimensions of the chart
 */
export type Dimensions = {
    /**
     * Width of the chart
     */
    width?: number;
    /**
     * Height of the chart
     */
    height?: number;
}

/**
 * Window size
 */
export type WindowSize = {
    /**
     * Dimensions of the window
     */
    dimensions: Dimensions;
    /**
     * Device type
     */
    device: "lg" | "md" | "sm" | "xs";
}

/**
 * Option for select component
 */
export type Option = {
    /**
     * Key of the option
     */
    key: string;
    /**
     * Label of the option
     */
    label: string;
    /**
     * Value of the option
     */
    value: string;
    /**
     * Complete object associated with the option
     */
    object?: any;
}

/**
 * Popup type
 */
export type PopupType = "SUCCESS" | "ERROR" | "INFO" | "WARNING";