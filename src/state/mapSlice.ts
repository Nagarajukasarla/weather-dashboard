// src/state/mapSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapState, PolygonShape } from "../types/map";

const initialState: MapState = {
    selectedShapes: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        addShape: (state, action: PayloadAction<PolygonShape>) => {
            state.selectedShapes.push(action.payload);
        },
        clearShapes: (state) => {
            state.selectedShapes = [];
        },
        deleteShape: (state, action: PayloadAction<string>) => {
            state.selectedShapes = state.selectedShapes.filter(
                shape => shape.id !== action.payload
            );
        },
    },
});

export const { addShape, clearShapes, deleteShape } = mapSlice.actions;
export default mapSlice.reducer;
