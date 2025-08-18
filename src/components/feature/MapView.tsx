import L, { type LatLngLiteral, type LeafletEvent } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { fetchTemperature } from "../../api/weather";
import "../../assets/mapView.css";
import type APIResponse from "../../classes/APIResponse";
import { type RootState } from "../../state";
import { addShape, deleteShape, updateShape } from "../../state/mapSlice";
import type { MapAction } from "../../types/map";
import { getPolygonCenter, getTemperatureColor } from "../../utils/map";
import type { PopupType } from "./Popup";
import Popup from "./Popup";

type MapViewProps = {
    onAction: (action: MapAction) => void;
};

const MapView = ({ onAction }: MapViewProps) => {
    const dispatch = useDispatch();
    const shapes = useSelector((state: RootState) => state.map.shapes);

    // FeatureGroup ref used by leaflet-draw
    const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

    // flag to ignore click callbacks while delete toolbar is active
    const deleteModeRef = useRef<boolean>(false);

    // Attach click handler to a raw Leaflet layer
    // We attach AFTER the layer is added to the featureGroup in create, and also when rehydrating from Redux.
    // const attachClickHandler = (layer: any, id: string) => {
    //
    //     layer.off && layer.off("click");
    //     layer.on("click", () => {
    //         if (!deleteModeRef.current) {
    //             onAction({ type: "CLICK", id });
    //         }
    //     });
    // };

    const attachClickHandler = useCallback(
        (layer: any, id: string) => {
            // remove any pre-existing listener to avoid duplicates
            layer.off?.("click");
            layer.on("click", () => {
                if (!deleteModeRef.current) {
                    onAction({ type: "CLICK", id });
                }
            });
        },
        [onAction]
    );

    // Helper function to fetch temperature and handle popup
    const [popup, setPopup] = useState<{ visible: boolean; message: string; type: PopupType }>({
        visible: false,
        message: "",
        type: "info",
    });

    const fetchTemperatureWithPopup = useCallback(async (center: LatLngLiteral): Promise<number | null> => {
        const response: APIResponse<number> = await fetchTemperature(center);
        if (response.code !== 200 || response.data === null) {
            setPopup({
                visible: true,
                message: response.description || "Failed to fetch temperature.",
                type: response.type === "Success" ? "info" : "error",
            });
            return null;
        }
        return response.data;
    }, []);

    // Extract coordinates from a raw Leaflet layer
    const extractCoordinates = (layer: any, type: string) => {
        if (type === "polygon" || type === "polyline") {
            const latlngs = layer.getLatLngs?.();
            const ring = Array.isArray(latlngs) && Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
            return (ring || []).map((p: any) => ({ lat: p.lat, lng: p.lng }));
        }
        if (type === "circle" || type === "marker" || type === "circlemarker") {
            const center = layer.getLatLng();
            return [{ lat: center.lat, lng: center.lng }];
        }
        return [];
    };

    const handleShapeCreate = async (e: LeafletEvent) => {
        const layer: any = (e as any).layer;
        const type: string = (e as any).layerType;
        const newId = uuidv4();

        let coordinates: LatLngLiteral[] = [];
        let radius: number | undefined = undefined;

        if (type === "circle") {
            coordinates = extractCoordinates(layer, type);
            radius = typeof layer.getRadius === "function" ? layer.getRadius() : undefined;
        } else if (type === "marker" || type === "circlemarker") {
            coordinates = extractCoordinates(layer, type);
        } else {
            coordinates = extractCoordinates(layer, type);
        }

        const center = getPolygonCenter(coordinates);
        const temperature = await fetchTemperatureWithPopup(center);
        if (temperature === null) return;

        const shape = {
            id: newId,
            type,
            name: `Shape-${Date.now()}`,
            coordinates,
            radius,
            dataSource: "open-meteo",
            temperature,
        };

        (layer as any).leaflet_id = shape.id;

        if (drawnItemsRef.current) {
            drawnItemsRef.current.addLayer(layer);
        }
        attachClickHandler(layer, shape.id);

        dispatch(addShape(shape));
        onAction({ type: "CREATE", shape });
    };

    const handleShapeDelete = (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: any) => {
            const shapeId = layer.leaflet_id;
            if (shapeId) {
                dispatch(deleteShape(shapeId));
                onAction({ type: "DELETE", id: shapeId });
            }
        });
    };

    const handleShapeEdit = (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: any) => {
            const shapeId = layer.leaflet_id;
            const prev = shapes.find((s: any) => s.id === shapeId);
            if (!prev) return;

            let updated = { ...prev };

            if (prev.type === "circle") {
                updated.coordinates = extractCoordinates(layer, prev.type);
                const radius = typeof layer.getRadius === "function" ? layer.getRadius() : prev.radius;
                updated.radius = radius;
            } else if (prev.type === "marker" || prev.type === "circlemarker") {
                updated.coordinates = extractCoordinates(layer, prev.type);
            } else if (prev.type === "polygon" || prev.type === "polyline") {
                updated.coordinates = extractCoordinates(layer, prev.type);
            }

            dispatch(updateShape(updated));
            onAction({ type: "UPDATE", shape: updated });
        });
    };

    // Rebuild visible layers from Redux shapes any time shapes change
    useEffect(() => {
        // FeatureGroup ref is set by react-leaflet when FeatureGroup mounts
        const fg = drawnItemsRef.current;
        if (!fg) return;

        // clear old layers
        fg.clearLayers();

        // add current shapes back into FG (so EditControl can edit/delete them)
        shapes.forEach((shape: any) => {
            let layer: any = null;

            const color = getTemperatureColor(shape.temperature);

            if (shape.type === "circle") {
                layer = L.circle(shape.coordinates[0], {
                    radius: shape.radius ?? 500,
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                });
            } else if (shape.type === "polygon") {
                layer = L.polygon(shape.coordinates, {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                });
            } else if (shape.type === "marker" || shape.type === "circlemarker") {
                layer = L.marker(shape.coordinates[0]);
            } else if (shape.type === "polyline") {
                layer = L.polyline(shape.coordinates);
            }

            if (layer) {
                (layer as any).leaflet_id = shape.id;
                attachClickHandler(layer, shape.id);
                fg.addLayer(layer);
            }
        });
    }, [shapes, attachClickHandler]);

    useEffect(() => {
        const raw = localStorage.getItem("shapes");
        if (!raw) return;
        try {
            const parsed = JSON.parse(raw);
            parsed.forEach((s: any) => dispatch(addShape(s)));
        } catch (err) {
            // IGNORE
        }
    }, [dispatch]);

    return (
        <>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={10}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                {/* FeatureGroup ref receives the underlying Leaflet FeatureGroup instance */}
                <FeatureGroup
                    ref={ref => {
                        drawnItemsRef.current = (ref as any) ?? drawnItemsRef.current;
                    }}
                >
                    <EditControl
                        position="topright"
                        draw={{
                            polygon: true,
                            polyline: true,
                            circle: true,
                            marker: true,
                            circlemarker: false,
                            rectangle: false,
                        }}
                        onCreated={handleShapeCreate}
                        onEdited={handleShapeEdit}
                        onDeleted={handleShapeDelete}
                        onDeleteStart={() => (deleteModeRef.current = true)}
                        onDeleteStop={() => (deleteModeRef.current = false)}
                    />
                </FeatureGroup>

                <TileLayer
                    tileSize={256}
                    keepBuffer={10}
                    updateWhenIdle={false}
                    updateWhenZooming={false}
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <Popup
                visible={popup.visible}
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ ...popup, visible: false })}
            />
        </>
    );
};

export default MapView;
