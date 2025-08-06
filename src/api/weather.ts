

// src/utils/weather.ts

import type { LatLngLiteral } from "leaflet";
import type { OpenMeteoResponse } from "../types/api";
import { API_BASE_URL } from "../constants/api";

/**
 * Fetch current temperature from Open-Meteo API
 */
export async function fetchWeather(coords: LatLngLiteral, dateRange: [string, string]): Promise<OpenMeteoResponse | null> {
    try {

        const hourlyParam = "hourly=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m";
        const res = await fetch(
            `${API_BASE_URL}?latitude=${coords.lat}&longitude=${coords.lng}&${hourlyParam}&timezone=auto&start_date=${dateRange[0]}&end_date=${dateRange[1]}`
        );
        const data = await res.json();
        
        // Transform the response to match OpenMeteoResponse type
        const response: OpenMeteoResponse = {
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone || 'auto',
            hourly: data.hourly
        };
        
        console.log("===fetched weather data:", data);
        console.log("===Transformed weather response:", response);
        return response;

    } catch (error) {
        console.error("Failed to fetch temperature", error);
        return null;
    }
}
