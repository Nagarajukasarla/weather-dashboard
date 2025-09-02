import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../../state/timeSlice";
import type { RootState } from "../../state";
import { CalendarOutlined } from "@ant-design/icons";
import CToogleButton from "../core/CToogleButton";
import { CSlider } from "../core/CSlider";
import useDebounce from "@/hooks/useDebounce";

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
        dayjs(end_date).diff(minDate.subtract(1, "day"), "day") - NUM_DAYS_BEFORE,
    ]);

    const [single, setSingle] = useState(
        () => dayjs(start_date).diff(minDate.subtract(1, "day"), "day") - NUM_DAYS_BEFORE
    );

    const debouncedRange = useDebounce(range, 500);
    const debouncedSingle = useDebounce(single, 500);

    useEffect(() => {
        const [startOffset, endOffset] = isRange ? debouncedRange : [debouncedSingle, debouncedSingle];
        dispatch(setStartDate(dayjs().add(startOffset, "day").format("YYYY-MM-DD")));
        dispatch(setEndDate(dayjs().add(endOffset, "day").format("YYYY-MM-DD")));
    }, [debouncedRange, debouncedSingle, isRange]);

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-6 text-foreground-surface font-semibold">
                    <div className="">
                        <CalendarOutlined className="text-header-icon mr-2" />
                        <span className="text-heading-h3 block hidden md:inline">Time Period</span>
                    </div>
                    <span className="text-text-t2">
                        {dayjs(start_date).format("MMM D")} – {dayjs(end_date).format("MMM D")}
                    </span>
                </div>
                <CToogleButton value={isRange} setValue={setIsRange} labels={["Single", "Range"]} />
            </div>

            {/* Slider */}
            <div className="mt-9">
                {isRange ? (
                    <CSlider
                        value={range}
                        onValueChange={(val: number[]) => setRange(val as [number, number])}
                        min={min}
                        max={max}
                        step={1}
                        className="mb-4"
                    />
                ) : (
                    <CSlider
                        value={[single]}
                        onValueChange={(val: number[]) => setSingle(val[0])}
                        min={min}
                        max={max}
                        step={1}
                        className="mb-4"
                        trackBackground="#555"
                        trackColor="#555"
                    />
                )}
            </div>
        </div>
    );
};

export default TimelineSlider;
