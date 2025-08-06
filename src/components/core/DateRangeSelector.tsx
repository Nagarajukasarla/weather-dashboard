// src/components/DateRangeSelector.tsx
import React from "react";
import { DatePicker, Radio, Button, Space } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state";
import {
    setMode,
    setStartDate,
    setEndDate,
    shiftRange,
} from "../../state/timeSlice";

const DateRangeSelector: React.FC = () => {
    const dispatch = useDispatch();
    const { mode, start_date, end_date } = useSelector((state: RootState) => state.time);

    const onModeChange = (e: any) => {
        dispatch(setMode(e.target.value));
    };

    const handleSingleDateChange = (date: any) => {
        if (date) {
            const iso = dayjs(date).format("YYYY-MM-DD");
            dispatch(setStartDate(iso));
        }
    };

    const handleRangeDateChange = (dates: any) => {
        if (dates && dates.length === 2) {
            const start = dayjs(dates[0]).format("YYYY-MM-DD");
            const end = dayjs(dates[1]).format("YYYY-MM-DD");
            dispatch(setStartDate(start));
            dispatch(setEndDate(end));
        }
    };

    const handleShift = (dir: "backward" | "forward") => {
        dispatch(shiftRange(dir === "backward" ? -1 : 1));
    };

    return (
        <Space direction="vertical" size="middle">
            <Radio.Group value={mode} onChange={onModeChange}>
                <Radio.Button value="SINGLE">Single Day</Radio.Button>
                <Radio.Button value="RANGE">Range</Radio.Button>
            </Radio.Group>

            {mode === "SINGLE" ? (
                <DatePicker
                    value={dayjs(start_date)}
                    onChange={handleSingleDateChange}
                    allowClear={false}
                />
            ) : (
                <DatePicker.RangePicker
                    value={[dayjs(start_date), dayjs(end_date)]}
                    onChange={handleRangeDateChange}
                    allowClear={false}
                />
            )}

            <Space>
                <Button onClick={() => handleShift("backward")}>◀ Shift Back</Button>
                <Button onClick={() => handleShift("forward")}>Shift Forward ▶</Button>
            </Space>
        </Space>
    );
};

export default DateRangeSelector;
