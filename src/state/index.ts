// src/state/index.ts

import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./mapSlice";
import timeReducer from "./timeSlice";

const store = configureStore({
    reducer: {
        map: mapReducer,
        time: timeReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
