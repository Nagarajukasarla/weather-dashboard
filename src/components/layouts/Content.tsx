import { BarChartOutlined } from "@ant-design/icons";
import { Row } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchWeather } from "../../api/weather";
import "../../assets/content.css";
import type { PolygonShape } from "../../types/map";
import { getPolygonCenter } from "../../utils/geoUtils";
import DashboardBarChart from "../core/DashboardBarChart";
import DashboardCard from "../core/DashboardCard";
import DashboardPieChart from "../core/DashboardPieChar";
import RangedRevenueLinedChart from "../core/RangedRevenueChart";
import TimelineSlider from "../core/TimelineSlider";
import MapView from "../feature/MapView";
import { getTransformedWeatherData } from "../../utils/dashboard";
import type { DashboardData } from "../../utils/dashboard";
import Spinner from "../core/Spinner";
import type { ChartData } from "../../types/component";

const Content: React.FC = () => {
    const { start_date, end_date } = useSelector((state: any) => state.time);
    const { selectedShapes } = useSelector((state: any) => state.map);

    const [weatherData, setWeatherData] = useState<DashboardData | null>(null);
    const [barChatData, setBarChatData] = useState<ChartData[] | undefined>(undefined);
    const [pieChartData, setPieChartData] = useState<ChartData[] | undefined>(undefined);
    const [lineChartData, setLineChartData] = useState<ChartData[] | undefined>(undefined);
    const [clickedShape, setClickedShape] = useState<PolygonShape | null>(null);
    const [loading, setLoading] = useState(false);
    const prevShapesCount = useRef(0);

    console.log("===start_date", start_date);
    console.log("===end_date", end_date);
    console.log("===selectedShapes", selectedShapes);

    // Handle shape additions and trigger weather fetch for first shape
    useEffect(() => {
        const currentShapesCount = selectedShapes.length;
        
        // If a new shape was added (current > previous) and it's the first shape
        if (currentShapesCount > prevShapesCount.current && currentShapesCount === 1) {
            const firstShape = selectedShapes[0];
            console.log("First shape added, fetching weather data");
            getWeather(firstShape);
        }
        
        // Update the previous count
        prevShapesCount.current = currentShapesCount;
    }, [selectedShapes]);

    useEffect(() => {
        // if start_date or end_date changes then fetch weather data
        // if start and end are valid dates ONLY
        // also check if shapes are avalibale in state
        // if no shapes are their don't call weather api
        if (start_date && end_date) {
            if (clickedShape) {
                getWeather(clickedShape);
            }
        }
    }, [start_date, end_date]);

    const onClickShape = (id: string) => {
        const shape = selectedShapes.find((s: any) => s.id === id);
        console.log("Clicked shape:", shape);
        setClickedShape(shape);
        getWeather(shape);
    };

    const getWeather = async (shape: PolygonShape) => {
        setLoading(true);
        const weatherData = await fetchWeather(getPolygonCenter(shape.coordinates), [start_date, end_date]);
        const transformedData = getTransformedWeatherData(weatherData);
        console.log("===transformedDashboardData", transformedData);
        setWeatherData(transformedData);
        setLoading(false);
    }

    const loadBarChatData = () => {
        if (!weatherData || !weatherData.minTemperatures) {
            setBarChatData([]);
            return;
        }
        const data: ChartData[] = weatherData.minTemperatures.map((value, index) => ({
            label: `Day ${index + 1}`,
            value: value,
        }));
        setBarChatData(data);
    }

    const loadPieChartData = () => {
        if (!weatherData || !weatherData.minTemperatures) {
            setPieChartData([]);
            return;
        }
        const data: ChartData[] = weatherData.minTemperatures.map((value, index) => ({
            label: `Day ${index + 1}`,
            value: value,
        }));
        setPieChartData(data);
    }

    const loadLineChartData = () => {
        if (!weatherData || !weatherData.maxTemperatures) {
            setLineChartData([]);
            return;
        }
        const data: ChartData[] = weatherData.maxTemperatures.map((value, index) => ({
            label: `Day ${index + 1}`,
            value: value,
        }));
        setLineChartData(data);
    }

    // Update charts when weather data changes
    useEffect(() => {
        loadBarChatData();
        loadPieChartData();
        loadLineChartData();
    }, [weatherData]);

    const productAnalytics = [
        { label: "Product A", value: 4000 },
        { label: "Product B", value: 2800 },
        { label: "Product C", value: 300 },
        { label: "Product D", value: 100 },
        { label: "Product E", value: 1600 },
        { label: "Product F", value: 1700 },
        { label: "Product G", value: 200 },
        { label: "Product H", value: 150 },
        { label: "Product I", value: 200 },
        { label: "Product J", value: 789 },
        { label: "Product K", value: 459 },
    ];

    const revenueAnalytics = [
        { label: "January", value: 1000 },
        { label: "February", value: 200 },
        { label: "March", value: 7000 },
        { label: "April", value: 6000 },
        { label: "May", value: 8000 },
        { label: "June", value: 670 },
        { label: "July", value: 700 },
        { label: "August", value: 10 },
        { label: "September", value: 9000 },
        { label: "October", value: 10000 },
        { label: "November", value: 500 },
        { label: "December", value: 12000 },
    ];
    return (
        <main className="content-root">
            {loading && <Spinner />}
            <div style={{
                margin: "20px 0",
                padding: 20,
                height: "50%",
                backgroundColor: "#1f2937",
                backdropFilter: "blur(4px)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <MapView onClickShape={onClickShape} />
            </div>
            <TimelineSlider />
            <Row style={{ padding: "0", flexWrap: "wrap", rowGap: "20px" }} justify="space-between">
                <DashboardCard icon={<BarChartOutlined />} title="Temperature" value={[weatherData?.minTemperature??"0°C", weatherData?.maxTemperature??"0°C"]} />
                <DashboardCard icon={<BarChartOutlined />} title="Humidity" value={[weatherData?.minHumidity??"0%", weatherData?.maxHumidity??"0%"]} />
                <DashboardCard icon={<BarChartOutlined />} title="Wind Speed" value={[weatherData?.minWindSpeed??"0m/s", weatherData?.maxWindSpeed??"0m/s"]} />
                <DashboardCard icon={<BarChartOutlined />} title="Precipitation" value={[weatherData?.minPrecipitation??"0mm", weatherData?.maxPrecipitation??"0mm"]} />
            </Row>
            <Row style={{ 
                margin: "30px 0",
                padding: "0", 
                flexWrap: "wrap", 
                justifyContent: "space-between" 
            }}>
                <div
                    style={{
                        width: "fit-content",
                        height: "100%",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <DashboardPieChart data={pieChartData || []} />
                </div>

                <div
                    style={{
                        height: "100%",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <DashboardBarChart data={barChatData || []} />
                </div>
            </Row>
            <Row>
                <div
                    style={{
                        height: "100%",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <RangedRevenueLinedChart data={lineChartData || []} />
                </div>
            </Row>
        </main>
    );
};

export default Content;
