import type { LatLngLiteral } from "leaflet";
import type { OpenMeteoResponse } from "../types/api";
import { API_BASE_URL } from "../constants/api";
import APIResponse from "../classes/APIResponse";

/**
 * Fetches the current weather data from the Open-Meteo API for the given coordinates and date range.
 *
 * @param {LatLngLiteral} coords - The latitude and longitude of the location to fetch the weather for.
 * @param {[string, string]} dateRange - The start and end dates of the date range to fetch the weather for.
 * @return {Promise<APIResponse<OpenMeteoResponse>>} A promise that resolves to an APIResponse object.
 */
export async function fetchWeather(
    coords: LatLngLiteral,
    dateRange: [string, string]
): Promise<APIResponse<OpenMeteoResponse>> {
    try {
        const hourlyParam = "hourly=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m,weather_code";
        const url = `${API_BASE_URL}?latitude=${coords.lat}&longitude=${coords.lng}&${hourlyParam}&timezone=auto&start_date=${dateRange[0]}&end_date=${dateRange[1]}`;
        const res = await fetch(url);
        if (!res.ok) {
            return new APIResponse<OpenMeteoResponse>(res.status, null);
        }
        const data = await res.json();
        const response: OpenMeteoResponse = {
            latitude: data.latitude,
            longitude: data.longitude,
            timezone: data.timezone || "auto",
            hourly: data.hourly,
        };
        return new APIResponse<OpenMeteoResponse>(APIResponse.SUCCESS, response);
    } catch (error: any) {
        console.error("Failed to fetch weather data", error.message);
        return new APIResponse<OpenMeteoResponse>(APIResponse.NETWORK_ERROR, null);
    }
}

/**
 * Fetches the current temperature in Celsius from the Open-Meteo API for the given coordinates.
 * @param {LatLngLiteral} coords - The latitude and longitude of the location to fetch the temperature for.
 * @return {Promise<APIResponse<number>>} A promise that resolves to an APIResponse object.
 */
export async function fetchTemperature(coords: LatLngLiteral): Promise<APIResponse<number>> {
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m`
        );
        if (!res.ok) {
            return new APIResponse<number>(res.status, null);
        }
        const data = await res.json();
        const temp = data?.current?.temperature_2m;
        if (typeof temp === "number") {
            return new APIResponse<number>(APIResponse.SUCCESS, temp);
        } else {
            return new APIResponse<number>(APIResponse.NOT_FOUND, null);
        }
    } catch (error) {
        console.error("Failed to fetch temperature", error);
        return new APIResponse<number>(APIResponse.NETWORK_ERROR, null);
    }
}
