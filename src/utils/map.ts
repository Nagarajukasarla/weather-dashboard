import type { LatLngLiteral } from "leaflet";

/**
 * Calculates the center coordinates of a polygon.
 *
 * @param {LatLngLiteral[]} coords - The array of coordinates representing the polygon.
 * @return {LatLngLiteral} The center coordinates of the polygon.
 */
export function getPolygonCenter(coords: LatLngLiteral[]): LatLngLiteral {
    const latSum = coords.reduce((acc, cur) => acc + cur.lat, 0);
    const lngSum = coords.reduce((acc, cur) => acc + cur.lng, 0);
    const count = coords.length;

    return {
        lat: latSum / count,
        lng: lngSum / count,
    };
}

export const getTemperatureColor = (temp: number): string => {
    if (temp < 15) return "#3498db"; // blue → low
    if (temp >= 15 && temp < 30) return "#f1c40f"; // yellow → moderate
    return "#e74c3c"; // red → high
};