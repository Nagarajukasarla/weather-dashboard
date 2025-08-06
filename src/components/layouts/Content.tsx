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

    useEffect(() => {
        const currentShapesCount = selectedShapes.length;
        
        // If a new shape was added (current > previous) and it's the first shape
        if (currentShapesCount > prevShapesCount.current && currentShapesCount === 1) {
            const firstShape = selectedShapes[0];
            console.log("First shape added, fetching weather data");
            getWeather(firstShape);
        }
        
        prevShapesCount.current = currentShapesCount;
    }, [selectedShapes]);

    useEffect(() => {
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
                        width: "30%",
                        height: "350px",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <p style={{ 
                        fontSize: "16px", 
                        fontWeight: "bold", 
                        margin: "20px 0 0 30px"
                    }}>Humidity</p>
                    <DashboardPieChart data={pieChartData || []} />
                </div>

                <div
                    style={{
                        width: "60%",
                        height: "350px",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <p style={{ 
                        fontSize: "16px", 
                        fontWeight: "bold", 
                        margin: "10px 0 0 30px"
                    }}>Temperature</p>
                    <DashboardBarChart data={barChatData || []} />
                </div>
            </Row>
            <Row style={{ padding: "0 0 40px 0", flexWrap: "wrap", rowGap: "20px" }}>
                <div
                    style={{
                        width: "100%",
                        height: "400px",
                        backgroundColor: "#1f2937",
                        backdropFilter: "blur(4px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: 10,
                    }}
                >
                    <p style={{ 
                        fontSize: "16px", 
                        fontWeight: "bold", 
                        margin: "25px 0 40px 30px"
                    }}>Max Temperature</p>
                    <RangedRevenueLinedChart data={lineChartData || []} />
                </div>
            </Row>
        </main>
    );
};

export default Content;
