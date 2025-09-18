import { ResponsiveLine } from "@nivo/line";
import { useMeasure } from "@/hooks/useMeasure";
import logger from "@/utils/logger";
import NoData from "@/components/core/NoData";

/**
 * Type of XY
 */
type XY = { x: string | number; y: number };


type SerieWithColor = {
    /**
     * ID of the series
     */
    id: string;
    /**
     * Color of the series
     */
    color?: string;
    /**
     * Data of the series
     */
    data: XY[];
};

type Props = {
    /**
     * Data of the chart
     */
    data: SerieWithColor[];
    /**
     * Height of the chart
     */
    height?: number | string;
};

/**
 * Custom tooltip component
 */
const CustomTooltip = ({ slice }: { slice: any }) => {
    // Get all points from the slice
    const points = slice.points || [];
    logger.debug("Tooltip points:", points);

    return (
        <div className="bg-background text-foreground py-2 px-4 rounded-lg shadow-md flex flex-col">
            {points.length > 0 && (
                <>
                    <p className="font-bold text-text-t1 m-0">
                        {String(points[0].data.xFormatted).length === 2
                            ? points[0].data.xFormatted + ":00"
                            : points[0].data.xFormatted}
                    </p>{" "}
                    {/* Strictly depends on the data format */}
                    {points.map((point: any) => (
                        <p key={`${point.seriesId}-${point.id}`} className="text-text-t2 m-0 flex gap-2">
                            {String(point.seriesId)[0].toUpperCase() + String(point.seriesId).slice(1)}:{" "}
                            <span className="text-foreground-link">{point.data.yFormatted}</span>
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};

/**
 * Dual axis line chart component
 */
export const DualAxisLineChart: React.FC<Props> = ({ data, height }) => {
    const log = logger.create("DualAxisLineChart");
    const windowDimensions = useMeasure()[2];
    log.debug("NLineChart: ", windowDimensions);
    const step =
        windowDimensions.device === "md"
            ? 2
            : windowDimensions.device === "sm"
            ? 3
            : windowDimensions.device === "xs"
            ? 3
            : 1;
    const humiditySeries = data.filter(d => d.id.toLowerCase().includes("humidity"));
    const tempSeries = data.filter(d => !d.id.toLowerCase().includes("humidity"));
    const maxTemperature = tempSeries.reduce(
        (max, series) =>
            Math.max(
                max,
                series.data.reduce((max, point) => Math.max(max, point.y), -Infinity)
            ),
        -Infinity
    );
    const maxHumidity = humiditySeries.reduce(
        (max, series) =>
            Math.max(
                max,
                series.data.reduce((max, point) => Math.max(max, point.y), -Infinity)
            ),
        -Infinity
    );
    const maxY = Math.max(maxTemperature, maxHumidity);

    log.debug("Max temperature - ", maxTemperature);
    log.debug("Max humidity - ", maxHumidity);

    log.debug("Data: " + JSON.stringify(data));

    return (data[0].data && data[0].data.length > 0) ? (
        <div className="relative h-full" style={{ height }}>
            {/* Right axis chart (humidity) */}
            <ResponsiveLine
                data={humiditySeries}
                margin={{ top: 20, right: 38, bottom: 70, left: 40 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: maxHumidity + (maxHumidity * 5) / 100, stacked: false }}
                axisRight={{
                    legend: "Humidity",
                    legendOffset: 32,
                    legendPosition: "middle",
                    tickSize: 5,
                    tickPadding: 5,
                }}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: "#fff",
                            },
                        },
                        legend: {
                            text: {
                                fill: "#fff",
                            },
                        },
                    },
                }}
                pointColor="#fff"
                pointSize={6}
                pointBorderWidth={2}
                pointBorderColor={(val: any) => val.seriesColor}
                axisLeft={null}
                axisBottom={null}
                enableGridY={false}
                enablePoints={true}
                useMesh={true}
                colors={humiditySeries.map(s => s.color ?? "#00c2ff")}
                layers={["axes", "lines", "points", "slices", "mesh", "legends"]}
            />

            <div style={{ position: "absolute", inset: 0 }}>
                <ResponsiveLine
                    data={tempSeries}
                    colors={tempSeries.map(s => s.color ?? "#11859aff")}
                    margin={{ top: 20, right: 38, bottom: 70, left: 40 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: 0,
                        max: maxTemperature + (maxTemperature * 5) / 100,
                        stacked: false,
                    }}
                    axisLeft={{
                        legend: "Temperature / FeelsLike",
                        legendOffset: -30,
                        legendPosition: "middle",
                    }}
                    curve="monotoneX"
                    pointSize={6}
                    pointColor="#fff"
                    pointBorderColor={(val: any) => val.seriesColor}
                    pointBorderWidth={2}
                    useMesh={true}
                    enableGridY={true}
                    enableGridX={true}
                    enableSlices="x"
                    layers={["grid", "markers", "axes", "lines", "points", "slices", "mesh", "legends"]}
                    theme={{
                        grid: {
                            line: {
                                stroke: "#ccc",
                                strokeDasharray: "3 3",
                                opacity: 0.25,
                            },
                        },
                        axis: {
                            ticks: {
                                text: {
                                    fill: "#c3c3c3",
                                },
                            },
                            legend: {
                                text: {
                                    fill: "#fff",
                                    color: "#fff",
                                },
                            },
                        },
                    }}
                    axisBottom={{
                        legend: "Time",
                        legendPosition: "middle",
                        legendOffset: 40,
                        tickValues: data[0].data.map((d, i) => (i % step === 0 ? d.x : null)).filter(Boolean),
                    }}
                />
            </div>

            {/* Invisible top-level tooltip handler */}
            <div style={{ position: "absolute", inset: 0 }}>
                <ResponsiveLine
                    data={data} // full series (temp + humidity together)
                    margin={{ top: 20, right: 38, bottom: 70, left: 40 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: 0, max: maxY + (maxY * 5) / 100 }}
                    axisLeft={null}
                    axisRight={null}
                    axisBottom={null}
                    enableGridX={false}
                    enableGridY={false}
                    enablePoints={false}
                    enableSlices="x"
                    useMesh={true}
                    colors={["transparent"]}
                    sliceTooltip={CustomTooltip}
                    layers={["slices", "mesh", "axes", "legends"]}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            translateY: 72.5,
                            itemWidth: 100,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: "circle",
                            itemTextColor: "#fff",
                            // itemsSpacing: 18,
                            data: data.map(d => ({
                                id: d.id,
                                label: String(d.id)[0].toUpperCase() + String(d.id).slice(1),
                                color: d.color,
                            })),
                        },
                    ]}
                />
            </div>
        </div>
    ) : (
        <NoData message="Please draw a new shape or select an existing one." />
    );
};

export default DualAxisLineChart;
