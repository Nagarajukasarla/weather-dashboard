// src/utils/geoUtils.ts

import type { LatLngLiteral } from "leaflet";
import type { PolygonShape } from "../types/map";

/**
 * Returns the centroid of a polygon
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

export const addShapeToLocalStorage = (shape: PolygonShape) => {
    const existingShapes = localStorage.getItem("shapes");
    if (existingShapes) {
        const shapesArray = JSON.parse(existingShapes);
        shapesArray.push(shape);
        localStorage.setItem("shapes", JSON.stringify(shapesArray));
    } else {
        localStorage.setItem("shapes", JSON.stringify([shape]));
    }
}

export const deleteShapeFromLocationStorage = (id: any) => {
    const existingShapes = localStorage.getItem("shapes");
    if (existingShapes) {
        const shapesArray = JSON.parse(existingShapes);
        const shapes = shapesArray.filter((s: any) => s.id !== id);
        localStorage.setItem("shapes", JSON.stringify(shapes));
    }
}