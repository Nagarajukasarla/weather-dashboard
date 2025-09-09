import { fetchWeather } from "@/api/weather";
import type APIResponse from "@/classes/APIResponse";
import DashboardCard from "@/components/core/CCard";
import Popup from "@/components/core/NewPopup";
import NewPopupWrapper from "@/components/core/NewPopupWrapper";
import Spinner from "@/components/core/Spinner";
import SSelect from "@/components/core/SSelect";
import CardWrapper from "@/components/feature/CardWrapper";
import DaySelector from "@/components/feature/DaySelector";
import DualAxisLineChart from "@/components/feature/DualAxisLineChart";
import FBarChart from "@/components/feature/FBarChart";
import DashboardPieChart from "@/components/feature/FPieChart";
import MapView from "@/components/feature/MapView";
import TimelineSlider from "@/components/feature/TimelineSlider";
import type { RootState } from "@/state";
import type { OpenMeteoResponse } from "@/types/api";
import type { CategorizedData, ContinuesData, Option, PopupType } from "@/types/component";
import type { MapAction, PolygonShape } from "@/types/map";
import type { DashboardData } from "@/utils/dashboard";
import {
    getDayWiseAverageData,
    getHourlyData,
    getNivoLineChartData,
    getTransformedWeatherData,
} from "@/utils/dashboard";
import { getPolygonCenter } from "@/utils/map";
import { BarChartOutlined, DotChartOutlined, SlidersOutlined, StockOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CHART_VIEW_OPTIONS: Option[] = [
    { key: "1", label: "Hourly", value: "hourly" },
    { key: "2", label: "Daily", value: "daily" },
];

const Content: React.FC = () => {
    const { start_date, end_date } = useSelector((state: RootState) => state.time);
    const shapes = useSelector((state: RootState) => state.map.shapes);

    const [weatherData, setWeatherData] = useState<DashboardData | null>(null);
    const [pieChartData, setPieChartData] = useState<CategorizedData[]>([]);
    const [barChatData, setBarChatData] = useState<ContinuesData[]>([]);
    const [lineChartData, setLineChartData] = useState<ContinuesData[]>([]);
    const [selectedShape, setSelectedShape] = useState<PolygonShape | null>(null);
    const [loading, setLoading] = useState(false);
    const [barChartView, setBarChartView] = useState<Option>(CHART_VIEW_OPTIONS[0]);
    const [lineChartView, setLineChartView] = useState<Option>(CHART_VIEW_OPTIONS[0]);

    const [currentBarChartDate, setCurrentBarChartDate] = useState<string>("");
    const [currentLineChartDate, setCurrentLineChartDate] = useState<string>("");

    const [popup, setPopup] = useState<{ visible: boolean; message: string; type: PopupType }>({
        visible: false,
        message: "",
        type: "INFO",
    });

    const prevShapesCount = useRef(0);

    const memoizedPieChartData = useMemo(() => pieChartData || [], [pieChartData]);
    const memoizedBarChartData = useMemo(() => barChatData || [], [barChatData]);
    const memoizedLineChartData = useMemo(() => lineChartData || [], [lineChartData]);

    const getWeather = async (shape: PolygonShape) => {
        try {
            setLoading(true);
            const response: APIResponse<OpenMeteoResponse> = await fetchWeather(getPolygonCenter(shape.coordinates), [
                start_date,
                end_date,
            ]);
            if (response.code !== 200 || !response.data) {
                setPopup({
                    visible: true,
                    message: response.description || "Failed to fetch weather data.",
                    type: response.type === "Success" ? "SUCCESS" : "ERROR",
                });
                setWeatherData(null);
                return;
            }
            const transformedData = getTransformedWeatherData(response.data);
            setWeatherData(transformedData);
        } catch (error: any) {
            setPopup({
                visible: true,
                message: "An error occurred while fetching / transforming data.",
                type: "ERROR",
            });
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const mapActionHandler = (action: MapAction) => {
        switch (action.type) {
            case "CLICK":
                onClickShape(action.id);
                break;
            case "DELETE":
                onDeleteShape(action.id);
                break;
            case "UPDATE":
                onUpdateShape(action.shape);
                break;
            default:
                break;
        }
    };

    const onClickShape = (id: string) => {
        const shape = shapes.find((s: any) => s.id === id);
        if (!shape) {
            return;
        }
        console.log("Clicked shape: ", shape.id);
        setSelectedShape(shape);
        getWeather(shape);
    };

    const onDeleteShape = (id: string) => {
        if (selectedShape?.id === id) {
            setSelectedShape(null);
        }
    };

    const onUpdateShape = (shape: PolygonShape) => {
        if (selectedShape?.id === shape.id) {
            console.log("Updated shape: ", shape.id);
            setSelectedShape(shape);
        }
    };

    const loadPieChartData = () => {
        if (!weatherData || !weatherData.weatherCategory) {
            setPieChartData([]);
            return;
        }
        const data: CategorizedData[] = weatherData.weatherCategory.map(category => ({
            label: category.type,
            value: category.value,
        }));
        setPieChartData(data);
    };

    const isBetweenRange = (date: string, startDate: string, endDate: string) => {
        const currentDate = dayjs(date);
        const start = dayjs(startDate);
        const end = dayjs(endDate);

        return (
            (currentDate.isSame(start) || currentDate.isAfter(start)) &&
            (currentDate.isSame(end) || currentDate.isBefore(end))
        );
    };

    const loadBarChartData = useCallback(() => {
        let data: ContinuesData[] = [];
        if (weatherData) {
            const len = weatherData.weatherTimeline.length;
            if (
                len > 0 &&
                currentBarChartDate &&
                isBetweenRange(
                    currentBarChartDate,
                    weatherData.weatherTimeline[0].dateLabel,
                    weatherData.weatherTimeline[len - 1].dateLabel
                )
            ) {
                if (barChartView.value.toLowerCase() === "hourly") {
                    data = getHourlyData(currentBarChartDate, weatherData.weatherTimeline);
                } else if (barChartView.value.toLowerCase() === "daily") {
                    data = getDayWiseAverageData(weatherData.weatherTimeline);
                }
            }
        }
        setBarChatData(data);
    }, [barChartView, currentBarChartDate, weatherData]);

    const loadLineChartData = useCallback(() => {
        let data: ContinuesData[] = [];
        if (weatherData) {
            const len = weatherData.weatherTimeline.length;
            if (
                len > 0 &&
                currentLineChartDate &&
                isBetweenRange(
                    currentLineChartDate,
                    weatherData.weatherTimeline[0].dateLabel,
                    weatherData.weatherTimeline[len - 1].dateLabel
                )
            ) {
                if (lineChartView.value.toLowerCase() === "hourly") {
                    data = getHourlyData(currentLineChartDate, weatherData.weatherTimeline);
                } else if (lineChartView.value.toLowerCase() === "daily") {
                    data = getDayWiseAverageData(weatherData.weatherTimeline);
                }
            }
        }
        setLineChartData(data);
    }, [lineChartView, currentLineChartDate, weatherData]);

    // This becomes the main hook for populating charts after data arrives.
    useEffect(() => {
        if (weatherData && weatherData.weatherTimeline.length > 0) {
            loadPieChartData();
            loadBarChartData();
            loadLineChartData();
        } else {
            setPieChartData([]);
            setBarChatData([]);
            setLineChartData([]);
        }
    }, [weatherData]);

    useEffect(() => {
        loadBarChartData();
    }, [barChartView, currentBarChartDate]);

    useEffect(() => {
        loadLineChartData();
    }, [lineChartView, currentLineChartDate]);

    useEffect(() => {
        const currentShapesCount = shapes.length;

        // If a new shape was added (current > previous) and it's the first shape
        if (currentShapesCount > prevShapesCount.current && currentShapesCount === 1) {
            const firstShape = shapes[0];
            getWeather(firstShape);
            setSelectedShape(firstShape);
        }

        prevShapesCount.current = currentShapesCount;
    }, [shapes]);

    useEffect(() => {
        if (start_date && end_date) {
            // Reset the date selectors to the beginning of the new range
            setCurrentBarChartDate(start_date);
            setCurrentLineChartDate(start_date);

            if (selectedShape) {
                getWeather(selectedShape);
            } else {
                setWeatherData(null);
            }
        }
        // By adding selectedShape as a dependency, we ensure that a new shape selection with the same date range also triggers a fetch.
    }, [start_date, end_date, selectedShape]);

    // Calls whenever a new shape is selected; its deps are shape creation/selection/updation/deletion
    useEffect(() => {
        if (selectedShape) {
            getWeather(selectedShape);
        }
    }, [selectedShape]);

    const handleChangeDate = (action: "prev" | "next", chartType: "bar" | "line") => {
        const currentDate = chartType === "bar" ? currentBarChartDate : currentLineChartDate;
        const setDate = chartType === "bar" ? setCurrentBarChartDate : setCurrentLineChartDate;

        const date = dayjs(currentDate);
        if (action === "prev") {
            if (date.isAfter(dayjs(start_date))) {
                setDate(date.subtract(1, "day").format("YYYY-MM-DD"));
            }
        } else if (action === "next") {
            if (date.isBefore(dayjs(end_date))) {
                setDate(date.add(1, "day").format("YYYY-MM-DD"));
            }
        }
    };

    return (
        <div>
            {loading && <Spinner />}
            <NewPopupWrapper
                isOpen={popup.visible}
                onClose={() => setPopup({ ...popup, visible: false })}
                children={
                    <Popup
                        title={popup.type}
                        content={popup.message}
                        onClose={() => setPopup({ ...popup, visible: false })}
                    />
                }
            />
            <CardWrapper className="w-full mt-6 md:flex-[0_0_calc(33%-10px)] h-[350px]">
                <MapView onAction={mapActionHandler} />
            </CardWrapper>
            <CardWrapper className="w-full mt-6 md:flex-[0_0_calc(33%-10px)]">
                <TimelineSlider />
            </CardWrapper>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full mt-6">
                <div className="flex justify-start">
                    <DashboardCard
                        icon={<BarChartOutlined />}
                        title="Temperature"
                        value={[weatherData?.maxTemperature ?? "0", weatherData?.minTemperature ?? "0"]}
                        unit="°C"
                    />
                </div>
                <div className="flex justify-end md:justify-center">
                    <DashboardCard
                        icon={<DotChartOutlined />}
                        title="Humidity"
                        value={[weatherData?.maxHumidity ?? "0", weatherData?.minHumidity ?? "0"]}
                        unit="%"
                    />
                </div>
                <div className="flex justify-start md:justify-center">
                    <DashboardCard
                        icon={<StockOutlined />}
                        title="Wind Speed"
                        value={[weatherData?.maxWindSpeed ?? "0", weatherData?.minWindSpeed ?? "0"]}
                        unit="m/s"
                    />
                </div>
                <div className="flex justify-end">
                    <DashboardCard
                        icon={<SlidersOutlined />}
                        title="Precipitation"
                        value={[weatherData?.maxPrecipitation ?? "0", weatherData?.minPrecipitation ?? "0"]}
                        unit="mm"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-between mt-6 p-0">
                <CardWrapper title="Weather Condition" className="w-full md:flex-[0_0_calc(33%-10px)] h-[470px]">
                    <DashboardPieChart data={memoizedPieChartData} />
                </CardWrapper>
                <CardWrapper
                    title={`${barChartView.value === "hourly" ? "Hourly" : "Daily Average"} Temparature`}
                    className="w-full md:flex-[0_0_calc(67%-10px)] h-[470px]"
                    slot={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <SSelect
                                value={barChartView}
                                options={CHART_VIEW_OPTIONS}
                                onValueChange={value => setBarChartView(value)}
                            />
                            {!dayjs(start_date).isSame(end_date) && barChartView.value === "hourly" && (
                                <DaySelector
                                    value={currentBarChartDate}
                                    min={start_date}
                                    max={end_date}
                                    onChange={action => handleChangeDate(action, "bar")}
                                />
                            )}
                        </div>
                    }
                >
                    <FBarChart data={memoizedBarChartData} />
                </CardWrapper>
            </div>
            <div className="flex flex-1 flex-wrap mt-6 p-0">
                <CardWrapper
                    title={`${lineChartView.value === "hourly" ? "Hourly" : "Daily Average"} Timline`}
                    className="w-full md:flex-[0_0_calc(100%-10px)] h-[490px]"
                    slot={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <SSelect
                                value={lineChartView}
                                options={CHART_VIEW_OPTIONS}
                                onValueChange={value => setLineChartView(value)}
                            />
                            {!dayjs(start_date).isSame(end_date) && lineChartView.value === "hourly" && (
                                <DaySelector
                                    value={currentLineChartDate}
                                    min={start_date}
                                    max={end_date}
                                    onChange={action => handleChangeDate(action, "line")}
                                />
                            )}
                        </div>
                    }
                >
                    <DualAxisLineChart data={getNivoLineChartData(memoizedLineChartData)} />
                </CardWrapper>
            </div>
        </div>
    );
};

export default React.memo(Content);
