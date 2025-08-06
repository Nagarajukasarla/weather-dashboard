// src/state/timeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface TimeRangeState {
    mode: "SINGLE" | "RANGE";
    start_date: string; // ISO string (YYYY-MM-DD)
    end_date: string;
}

const today = dayjs().format("YYYY-MM-DD");

const initialState: TimeRangeState = {
    mode: "SINGLE",
    start_date: today,
    end_date: today,
};

const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<"SINGLE" | "RANGE">) => {
            state.mode = action.payload;
            if (action.payload === "SINGLE") {
                state.end_date = state.start_date;
            }
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.start_date = action.payload;
            if (state.mode === "SINGLE") {
                state.end_date = action.payload;
            }
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.end_date = action.payload;
        },
        shiftRange: (state, action: PayloadAction<number>) => {
            const diff = dayjs(state.end_date).diff(state.start_date, "day");
            const newStart = dayjs(state.start_date).add(action.payload, "day");
            const newEnd = newStart.add(diff, "day");

            // Clamp to min/max if needed
            state.start_date = newStart.format("YYYY-MM-DD");
            state.end_date = newEnd.format("YYYY-MM-DD");
        },
    },
});

export const { setMode, setStartDate, setEndDate, shiftRange } = timeSlice.actions;
export default timeSlice.reducer;
