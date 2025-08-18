import type { LatLngLiteral } from "leaflet";

/**
 * Polygon shape interface - used to store polygon coordinates
 */
export interface PolygonShape {
    id: string;
    name: string;
    type: string;
    radius?: number;
    coordinates: LatLngLiteral[];
    dataSource: string;
    temperature?: number | null;
}

/**
 * Redux shape selection state
 */
export interface MapState {
    shapes: PolygonShape[];
}

export type MapAction =
    | { type: "CREATE"; shape: any }
    | { type: "UPDATE"; shape: any }
    | { type: "DELETE"; id: string }
    | { type: "CLICK"; id: string };