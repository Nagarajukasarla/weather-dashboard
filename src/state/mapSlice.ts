import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapState, PolygonShape } from "../types/map";

const initialState: MapState = {
    shapes: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        addShape: (state, action: PayloadAction<PolygonShape>) => {
            state.shapes.push(action.payload);
        },
        clearShapes: state => {
            state.shapes = [];
        },
        deleteShape: (state, action: PayloadAction<string>) => {
            state.shapes = state.shapes.filter(shape => shape.id !== action.payload);
        },
        updateShape: (state, action: PayloadAction<PolygonShape>) => {
            state.shapes = state.shapes.map(shape => (shape.id === action.payload.id ? action.payload : shape));
        },
    },
});

export const { addShape, clearShapes, deleteShape, updateShape } = mapSlice.actions;
export default mapSlice.reducer;
