import type { LatLngLiteral } from "leaflet";

/**
 * Polygon shape interface - used to store polygon coordinates
 */
export interface PolygonShape {
    id: string;
    name: string;
    coordinates: LatLngLiteral[];
    dataSource: string;
    temperature?: number | null;
}

/**
 * Redux shape selection state
 */
export interface MapState {
    selectedShapes: PolygonShape[];
}

