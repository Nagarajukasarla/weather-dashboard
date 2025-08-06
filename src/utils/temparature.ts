import type { LatLngLiteral } from "leaflet";

/**
 * Fetch current temperature from Open-Meteo API
 */
export async function fetchTemperature(
    coords: LatLngLiteral,
    // dataSource: string
): Promise<number | null> {
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m`
        );
        const data = await res.json();
        return data?.current?.temperature_2m ?? null;
    } catch (error) {
        console.error("Failed to fetch temperature", error);
        return null;
    }
}
