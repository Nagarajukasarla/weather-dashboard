import { BarChartOutlined, DotChartOutlined, SlidersOutlined, StockOutlined } from "@ant-design/icons";
import { Row, Select } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWeather } from "../../api/weather";
import "../../assets/content.css";
import type APIResponse from "../../classes/APIResponse";
import type { RootState } from "../../state";
import type { OpenMeteoResponse } from "../../types/api";
import type { CategorizedData, ContinuesData } from "../../types/component";
import type { MapAction, PolygonShape } from "../../types/map";
import type { DashboardData } from "../../utils/dashboard";
import { getDayWiseAverageData, getHourlyData, getTransformedWeatherData } from "../../utils/dashboard";
import { getPolygonCenter } from "../../utils/map";
import CardWrapper from "../core/CardWrapper";
import DashboardBarChart from "../core/DashboardBarChart";
import DashboardCard from "../core/DashboardCard";
import DashboardLineChart from "../core/DashboardLineChart";
import DashboardPieChart from "../core/DashboardPieChart";
import Spinner from "../core/Spinner";
import TimelineSlider from "../core/TimelineSlider";
import DaySelector from "../feature/DaySelector";
import MapView from "../feature/MapView";
import Popup, { type PopupType } from "../feature/Popup";

const Content: React.FC = () => {
    const { start_date, end_date } = useSelector((state: RootState) => state.time);
    const shapes = useSelector((state: RootState) => state.map.shapes);

    const [weatherData, setWeatherData] = useState<DashboardData | null>(null);
    const [pieChartData, setPieChartData] = useState<CategorizedData[]>([]);
    const [barChatData, setBarChatData] = useState<ContinuesData[]>([]);
    const [lineChartData, setLineChartData] = useState<ContinuesData[]>([]);
    const [selectedShape, setSelectedShape] = useState<PolygonShape | null>(null);
    const [loading, setLoading] = useState(false);
    const [barChartView, setBarChartView] = useState("hourly");
    const [lineChartView, setLineChartView] = useState("hourly");

    const [currentBarChartDate, setCurrentBarChartDate] = useState<string>("");
    const [currentLineChartDate, setCurrentLineChartDate] = useState<string>("");

    const [popup, setPopup] = useState<{ visible: boolean; message: string; type: PopupType }>({ visible: false, message: "", type: "info" as const });

    const prevShapesCount = useRef(0);

    const memoizedPieChartData = useMemo(() => pieChartData || [], [pieChartData]);
    const memoizedBarChartData = useMemo(() => barChatData || [], [barChatData]);
    const memoizedLineChartData = useMemo(() => lineChartData || [], [lineChartData]);

    const CHART_VIEW_OPTIONS = [
        { label: "Hourly", value: "hourly" },
        { label: "Daily", value: "daily" },
    ];

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
                    type: response.type === "Success" ? "info" : "error",
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
                type: "error",
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
                if (barChartView.toLowerCase() === "hourly") {
                    data = getHourlyData(currentBarChartDate, weatherData.weatherTimeline);
                } else if (barChartView.toLowerCase() === "daily") {
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
                if (lineChartView.toLowerCase() === "hourly") {
                    data = getHourlyData(currentLineChartDate, weatherData.weatherTimeline);
                } else if (lineChartView.toLowerCase() === "daily") {
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
        <main className="content-root">
            {loading && <Spinner />}
            <Popup
                visible={popup.visible}
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ ...popup, visible: false })}
            />
            <div
                style={{
                    margin: "20px 0",
                    padding: 20,
                    height: "50%",
                    backgroundColor: "#1f2937",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
            >
                <MapView onAction={mapActionHandler} />
            </div>
            <TimelineSlider />
            <Row style={{ padding: "0", flexWrap: "wrap", rowGap: "20px" }} justify="space-between">
                <DashboardCard
                    icon={<BarChartOutlined />}
                    title="Temperature"
                    value={[weatherData?.minTemperature ?? "0°C", weatherData?.maxTemperature ?? "0°C"]}
                />
                <DashboardCard
                    icon={<DotChartOutlined />}
                    title="Humidity"
                    value={[weatherData?.minHumidity ?? "0%", weatherData?.maxHumidity ?? "0%"]}
                />
                <DashboardCard
                    icon={<StockOutlined />}
                    title="Wind Speed"
                    value={[weatherData?.minWindSpeed ?? "0m/s", weatherData?.maxWindSpeed ?? "0m/s"]}
                />
                <DashboardCard
                    icon={<SlidersOutlined />}
                    title="Precipitation"
                    value={[weatherData?.minPrecipitation ?? "0mm", weatherData?.maxPrecipitation ?? "0mm"]}
                />
            </Row>
            <Row
                style={{
                    margin: "30px 0",
                    padding: "0",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <CardWrapper title="Weather Condition" styles={{ width: "26%", height: "370px" }}>
                    <DashboardPieChart data={memoizedPieChartData} />
                </CardWrapper>

                <CardWrapper
                    title={`${barChartView === "hourly" ? "Hourly" : "Daily Average"} Temparature`}
                    styles={{
                        width: "64%",
                        height: "370px",
                    }}
                    slot={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Select
                                style={{
                                    width: "100px",
                                    margin: "0 10px",
                                }}
                                value={barChartView}
                                options={CHART_VIEW_OPTIONS}
                                onChange={value => setBarChartView(value)}
                            />
                            {!dayjs(start_date).isSame(end_date) && barChartView === "hourly" && (
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
                    <DashboardBarChart data={memoizedBarChartData} />
                </CardWrapper>
            </Row>

            <Row style={{ padding: "0 0 40px 0" }}>
                <CardWrapper
                    title={`${lineChartView === "hourly" ? "Hourly" : "Daily Average"} Timline`}
                    styles={{
                        width: "100%",
                        height: "390px",
                    }}
                    slot={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Select
                                style={{
                                    width: "100px",
                                    margin: "0 10px",
                                }}
                                value={lineChartView}
                                options={CHART_VIEW_OPTIONS}
                                onChange={value => setLineChartView(value)}
                            />
                            {!dayjs(start_date).isSame(end_date) && lineChartView === "hourly" && (
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
                    <DashboardLineChart data={memoizedLineChartData} />
                </CardWrapper>
            </Row>
        </main>
    );
};

export default React.memo(Content);
