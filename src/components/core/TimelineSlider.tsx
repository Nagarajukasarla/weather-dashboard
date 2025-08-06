// import { ConfigProvider, Slider } from "antd";
// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setStartDate, setEndDate } from "../../state/timeSlice";
// import type { RootState } from "../../state";
// import { CalendarOutlined } from "@ant-design/icons";

// const NUM_DAYS = 30;
// const minDate = dayjs().subtract(NUM_DAYS, "day");
// const maxDate = dayjs();

// const TimelineSlider: React.FC = () => {
//     const dispatch = useDispatch();
//     const { start_date, end_date } = useSelector((state: RootState) => state.time);

//     const [isRange, setIsRange] = useState(true);
//     const [min] = useState(0);
//     const [max] = useState(NUM_DAYS);

//     const [range, setRange] = useState<[number, number]>(() => [
//         dayjs(start_date).diff(minDate, "day"),
//         dayjs(end_date).diff(minDate, "day"),
//     ]);

//     const [single, setSingle] = useState(() =>
//         dayjs(start_date).diff(minDate, "day")
//     );

//     const sliderValue = isRange ? range : [single, single];

//     // Handle slider change
//     const handleChange = (val: number[]) => {
//         if (isRange) {
//             setRange(val as [number, number]);
//         } else {
//             setSingle(val[0]);
//         }
//     };

//     // Update Redux store
//     useEffect(() => {
//         const [startOffset, endOffset] = isRange ? range : [single, single];
//         dispatch(setStartDate(minDate.add(startOffset, "day").format("YYYY-MM-DD")));
//         dispatch(setEndDate(minDate.add(endOffset, "day").format("YYYY-MM-DD")));
//     }, [range, single, isRange]);

//     // Keyboard drag
//     const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//         const delta = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
//         if (delta === 0) return;

//         if (isRange) {
//             const [start, end] = range;
//             const duration = end - start;
//             const newStart = Math.min(Math.max(start + delta, min), max - duration);
//             const newEnd = newStart + duration;
//             if (newEnd <= max) setRange([newStart, newEnd]);
//         } else {
//             const next = Math.min(Math.max(single + delta, min), max);
//             setSingle(next);
//         }
//     };

//     return (
//         <div
//             style={{
//                 margin: "20px 0",
//                 padding: 20,
//                 height: "100px",
//                 backgroundColor: "#1f2937",
//                 backdropFilter: "blur(4px)",
//                 borderRadius: "8px",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 color: "white",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between"
//             }}
//             tabIndex={0}
//             onKeyDown={onKeyDown}
//         >
//             {/* Header */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
//                     <CalendarOutlined style={{ color: "#a78bfa" }} />
//                     <span style={{ fontWeight: "bold" }}>Time Period</span>
//                     <span style={{ color: "#a78bfa" }}>
//                         {dayjs(start_date).format("MMM D")} – {dayjs(end_date).format("MMM D")}
//                     </span>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <span>Single Point</span>
//                     <label style={{ position: "relative", display: "inline-block", width: 50, height: 24 }}>
//                         <input
//                             type="checkbox"
//                             checked={isRange}
//                             onChange={() => setIsRange(!isRange)}
//                             style={{ opacity: 0, width: 0, height: 0 }}
//                         />
//                         <span
//                             style={{
//                                 position: "absolute",
//                                 cursor: "pointer",
//                                 backgroundColor: isRange ? "#a78bfa" : "#555",
//                                 borderRadius: 24,
//                                 top: 0,
//                                 left: 0,
//                                 right: 0,
//                                 bottom: 0,
//                                 transition: "0.4s"
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     position: "absolute",
//                                     content: "",
//                                     height: 18,
//                                     width: 18,
//                                     left: isRange ? 26 : 4,
//                                     bottom: 3,
//                                     backgroundColor: "white",
//                                     borderRadius: "50%",
//                                     transition: "0.4s"
//                                 }}
//                             />
//                         </span>
//                     </label>
//                     <span>Range</span>
//                 </div>
//             </div>

//             {/* Slider */}
//             <div style={{ padding: "0 10px" }}>
//                 <ConfigProvider
//                     theme={{
//                         components: {
//                             Slider: {
//                                 dotSize: 22,
//                                 trackBg: "#a78bfa",
//                                 railBg: "#4b5563",
//                                 handleColor: "#a78bfa",
//                                 handleSize: 24,
//                                 // trackHeight: 12
//                             }
//                         }
//                     }}
//                 >
//                     <Slider
//                         range={isRange}
//                         min={min}
//                         max={max}
//                         value={sliderValue}
//                         // onChange={handleChange}
//                         tooltip={{
//                             formatter(value) {
//                                 return dayjs(minDate).add(value as number, "day").format("MMM D");
//                             }
//                         }}
//                         styles={{
//                             rail: { backgroundColor: "#4b5563", height: 10 },
//                             track: { backgroundColor: "#a78bfa", height: 10 },
//                             handle: {
//                                 width: 24,
//                                 height: 24,
//                                 backgroundColor: "#a78bfa",
//                                 border: "2px solid white",
//                                 boxShadow: "0 0 0 2px rgba(255,255,255,0.2)"
//                             }
//                         }}
//                     />
//                 </ConfigProvider>
//             </div>
//         </div>
//     );
// };

// export default TimelineSlider;


import { ConfigProvider, Slider } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../../state/timeSlice";
import type { RootState } from "../../state";
import { CalendarOutlined } from "@ant-design/icons";

const NUM_DAYS_BEFORE = 15;
const NUM_DAYS_AFTER = 15;
// const TOTAL_NUM_DAYS = NUM_DAYS_BEFORE + NUM_DAYS_AFTER;

const minDate = dayjs().subtract(NUM_DAYS_BEFORE, "day");
// const maxDate = dayjs().add(NUM_DAYS_AFTER, "day");

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

    // Update Redux store
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
        // tabIndex={0}
        // onKeyDown={onKeyDown}
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
                                    outline: "none"
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
                                    outline: "none"
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



// import { ConfigProvider, Slider } from "antd";
// import dayjs from "dayjs";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setStartDate, setEndDate } from "../../state/timeSlice";
// import type { RootState } from "../../state";
// import { CalendarOutlined } from "@ant-design/icons";

// const NUM_DAYS = 30;
// const minDate = dayjs().subtract(NUM_DAYS, "day");

// const TimelineSlider: React.FC = () => {
//     const dispatch = useDispatch();
//     const { start_date, end_date } = useSelector((state: RootState) => state.time);

//     const [isRange, setIsRange] = useState(true);
//     const [min] = useState(0);
//     const [max] = useState(NUM_DAYS);

//     const [range, setRange] = useState<[number, number]>(() => [
//         dayjs(start_date).diff(minDate, "day"),
//         dayjs(end_date).diff(minDate, "day"),
//     ]);

//     const [single, setSingle] = useState(() =>
//         dayjs(start_date).diff(minDate, "day")
//     );

//     // Sync local slider state to Redux global store
//     useEffect(() => {
//         const [startOffset, endOffset] = isRange ? range : [single, single];
//         dispatch(setStartDate(minDate.add(startOffset, "day").format("YYYY-MM-DD")));
//         dispatch(setEndDate(minDate.add(endOffset, "day").format("YYYY-MM-DD")));
//     }, [range, single, isRange]);

//     // ======== Drag to move entire selected range (mouse-based) ========
//     const [isDragging, setIsDragging] = useState(false);
//     const dragStartX = useRef<number | null>(null);

//     const handleMouseDown = (e: React.MouseEvent) => {
//         e.preventDefault();
//         setIsDragging(true);
//         dragStartX.current = e.clientX;
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//         if (!isDragging || dragStartX.current === null) return;

//         const deltaX = e.clientX - dragStartX.current;
//         const slider = document.getElementById("slider-track");
//         if (!slider) return;

//         const rect = slider.getBoundingClientRect();
//         const percentMoved = deltaX / rect.width;
//         const valueDelta = Math.round((max - min) * percentMoved);

//         const [start, end] = range;
//         let newStart = start + valueDelta;
//         let newEnd = end + valueDelta;

//         if (newStart < min) {
//             newEnd += min - newStart;
//             newStart = min;
//         } else if (newEnd > max) {
//             newStart -= newEnd - max;
//             newEnd = max;
//         }

//         setRange([newStart, newEnd]);
//         dragStartX.current = e.clientX;
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//         dragStartX.current = null;
//     };

//     useEffect(() => {
//         if (isDragging) {
//             window.addEventListener("mousemove", handleMouseMove);
//             window.addEventListener("mouseup", handleMouseUp);
//         } else {
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         }

//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             window.removeEventListener("mouseup", handleMouseUp);
//         };
//     }, [isDragging]);
//     // ==================================================================

//     return (
//         <div
//             style={{
//                 margin: "20px 0",
//                 padding: 20,
//                 height: "100px",
//                 backgroundColor: "#1f2937",
//                 backdropFilter: "blur(4px)",
//                 borderRadius: "8px",
//                 border: "1px solid rgba(255, 255, 255, 0.1)",
//                 color: "white",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between"
//             }}
//         >
//             {/* Header */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
//                     <CalendarOutlined style={{ color: "#a78bfa" }} />
//                     <span style={{ fontWeight: "bold" }}>Time Period</span>
//                     <span style={{ color: "#a78bfa" }}>
//                         {dayjs(start_date).format("MMM D")} – {dayjs(end_date).format("MMM D")}
//                     </span>
//                 </div>

//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <span>Single Point</span>
//                     <label style={{ position: "relative", display: "inline-block", width: 50, height: 24 }}>
//                         <input
//                             type="checkbox"
//                             checked={isRange}
//                             onChange={() => setIsRange(!isRange)}
//                             style={{ opacity: 0, width: 0, height: 0 }}
//                         />
//                         <span
//                             style={{
//                                 position: "absolute",
//                                 cursor: "pointer",
//                                 backgroundColor: isRange ? "#a78bfa" : "#555",
//                                 borderRadius: 24,
//                                 top: 0,
//                                 left: 0,
//                                 right: 0,
//                                 bottom: 0,
//                                 transition: "0.4s"
//                             }}
//                         >
//                             <span
//                                 style={{
//                                     position: "absolute",
//                                     height: 18,
//                                     width: 18,
//                                     left: isRange ? 26 : 4,
//                                     bottom: 3,
//                                     backgroundColor: "white",
//                                     borderRadius: "50%",
//                                     transition: "0.4s"
//                                 }}
//                             />
//                         </span>
//                     </label>
//                     <span>Range</span>
//                 </div>
//             </div>

//             {/* Slider */}
//             <div style={{ padding: "0 10px", position: "relative" }}>
//                 <ConfigProvider
//                     theme={{
//                         components: {
//                             Slider: {
//                                 dotSize: 22,
//                                 trackBg: "#a78bfa",
//                                 railBg: "#4b5563",
//                                 handleColor: "#a78bfa",
//                                 handleSize: 24
//                             }
//                         }
//                     }}
//                 >
//                     {isRange ? (
//                         <>
//                             {/* Mouse-drag overlay for moving the selected range */}
//                             <div
//                                 onMouseDown={handleMouseDown}
//                                 style={{
//                                     position: "absolute",
//                                     height: 10,
//                                     top: 7, // aligns with the center of slider track
//                                     left: `${((range[0] - min) / (max - min)) * 100}%`,
//                                     width: `${((range[1] - range[0]) / (max - min)) * 100}%`,
//                                     backgroundColor: "transparent",
//                                     cursor: "grab",
//                                     zIndex: 3
//                                 }}
//                             />
//                             <Slider
//                                 id="slider-track"
//                                 range
//                                 min={min}
//                                 max={max}
//                                 value={range}
//                                 onChange={(val: number[]) => setRange(val as [number, number])}
//                                 tooltip={{
//                                     formatter(value) {
//                                         return dayjs(minDate).add(value ?? 0, "day").format("MMM D");
//                                     }
//                                 }}
//                                 styles={{
//                                     rail: { backgroundColor: "#4b5563", height: 10 },
//                                     track: { backgroundColor: "#a78bfa", height: 10 },
//                                     handle: {
//                                         width: 24,
//                                         height: 24,
//                                         backgroundColor: "#a78bfa",
//                                         border: "2px solid white",
//                                         boxShadow: "0 0 0 2px rgba(255,255,255,0.2)"
//                                     }
//                                 }}
//                             />
//                         </>
//                     ) : (
//                         <Slider
//                             min={min}
//                             max={max}
//                             value={single}
//                             onChange={(val: number) => setSingle(val)}
//                             tooltip={{
//                                 formatter(value) {
//                                     return dayjs(minDate).add(value ?? 0, "day").format("MMM D");
//                                 }
//                             }}
//                             styles={{
//                                 rail: { backgroundColor: "#4b5563", height: 10 },
//                                 track: { backgroundColor: "#a78bfa", height: 10 },
//                                 handle: {
//                                     width: 24,
//                                     height: 24,
//                                     backgroundColor: "#a78bfa",
//                                     border: "2px solid white",
//                                     boxShadow: "0 0 0 2px rgba(255,255,255,0.2)"
//                                 }
//                             }}
//                         />
//                     )}
//                 </ConfigProvider>
//             </div>
//         </div>
//     );
// };

// export default TimelineSlider;
