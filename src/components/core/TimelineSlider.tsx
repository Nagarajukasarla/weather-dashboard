import { ConfigProvider, Slider } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../../state/timeSlice";
import type { RootState } from "../../state";
import { CalendarOutlined } from "@ant-design/icons";

const NUM_DAYS_BEFORE = 15;
const NUM_DAYS_AFTER = 15;

const minDate = dayjs().subtract(NUM_DAYS_BEFORE, "day");

const TimelineSlider: React.FC = () => {
    const dispatch = useDispatch();
    const { start_date, end_date } = useSelector((state: RootState) => state.time);

    const [isRange, setIsRange] = useState(true);
    const [min] = useState(-NUM_DAYS_BEFORE);
    const [max] = useState(NUM_DAYS_AFTER);

    const [range, setRange] = useState<[number, number]>(() => [
        dayjs(start_date).diff(minDate.subtract(1, "day"), "day") - NUM_DAYS_BEFORE,
        dayjs(end_date).diff(minDate.subtract(1, "day"), "day") - NUM_DAYS_BEFORE
    ]);

    const [single, setSingle] = useState(() =>
        dayjs(start_date).diff(minDate.subtract(1, "day"), "day") - NUM_DAYS_BEFORE
    );

    useEffect(() => {
        const [startOffset, endOffset] = isRange ? range : [single, single];
        dispatch(setStartDate(dayjs().add(startOffset, "day").format("YYYY-MM-DD")));
        dispatch(setEndDate(dayjs().add(endOffset, "day").format("YYYY-MM-DD")));
    }, [range, single, isRange]);

    return (
        <div
            style={{
                margin: "20px 0",
                padding: 20,
                height: "100px",
                backgroundColor: "#1f2937",
                backdropFilter: "blur(4px)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                    <CalendarOutlined style={{ color: "#a78bfa" }} />
                    <span style={{ fontWeight: "bold" }}>Time Period</span>
                    <span style={{ color: "#a78bfa" }}>
                        {dayjs(start_date).format("MMM D")} – {dayjs(end_date).format("MMM D")}
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span>Single Point</span>
                    <label style={{ position: "relative", display: "inline-block", width: 50, height: 24 }}>
                        <input
                            type="checkbox"
                            checked={isRange}
                            onChange={() => setIsRange(!isRange)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                cursor: "pointer",
                                backgroundColor: isRange ? "#a78bfa" : "#555",
                                borderRadius: 24,
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                transition: "0.4s"
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    height: 18,
                                    width: 18,
                                    left: isRange ? 26 : 4,
                                    bottom: 3,
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    transition: "0.4s"
                                }}
                            />
                        </span>
                    </label>
                    <span>Range</span>
                </div>
            </div>

            {/* Slider */}
            <div style={{ padding: "0 10px" }}>
                <ConfigProvider
                    theme={{
                        components: {
                            Slider: {
                                dotSize: 22,
                                trackBg: "#a78bfa",
                                railBg: "#4b5563",
                                handleColor: "#a78bfa",
                                handleSize: 24
                            }
                        }
                    }}
                >
                    {isRange ? (
                        <Slider
                            range
                            min={min}
                            max={max}
                            value={range}
                            onChange={(val: number[]) => setRange(val as [number, number])}
                            tooltip={{ open: false }}
                            styles={{
                                rail: { backgroundColor: "#4b5563", height: 10 },
                                track: { backgroundColor: "#a78bfa", height: 10 },
                                handle: {
                                    width: 24,
                                    height: 24,
                                    backgroundColor: "#a78bfa",
                                    borderRadius: "50%",
                                    boxShadow: "none",
                                    outline: "none",
                                    marginTop: 2,
                                    marginLeft: -2
                                }
                            }}
                        />
                    ) : (
                        <Slider
                            min={min}
                            max={max}
                            value={single}
                            onChange={(val: number) => setSingle(val)}
                            tooltip={{ open: false }}
                            styles={{
                                rail: { backgroundColor: "#4b5563", height: 10 },
                                track: { backgroundColor: "transparent", height: 10 },
                                handle: {
                                    width: 24,
                                    height: 24,
                                    backgroundColor: "#a78bfa",
                                    borderRadius: "50%",
                                    boxShadow: "none",
                                    outline: "none",
                                    marginTop: 2
                                }
                            }}
                        />
                    )}
                </ConfigProvider>
            </div>
        </div>
    );
};

export default TimelineSlider;