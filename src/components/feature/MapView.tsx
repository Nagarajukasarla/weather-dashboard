import { type LatLngLiteral, type LeafletEvent } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { Circle, FeatureGroup, MapContainer, TileLayer, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";
import "../../assets/mapView.css";
import store, { type RootState } from "../../state";
import { addShape, deleteShape } from "../../state/mapSlice";
import { addShapeToLocalStorage, deleteShapeFromLocationStorage, getPolygonCenter } from "../../utils/geoUtils";
import { fetchTemperature } from "../../utils/temparature";

type MapViewProps = {
    onClickShape: (id: string) => void;
};

const MapView = ({ onClickShape }: MapViewProps) => {

    const dispatch = useDispatch();
    const shapes = useSelector((state: RootState) => state.map.selectedShapes);

    const handleShapeCreate = async (e: LeafletEvent) => {
        const layer = (e as any).layer;
        const type = (e as any).layerType;

        let coordinates: LatLngLiteral[] = [];

        if (type === "polygon" || type === "rectangle") {
            coordinates = layer.getLatLngs()[0].map((point: any) => ({
                lat: point.lat,
                lng: point.lng,
            }));
        } else if (type === "circle" || type === "marker" || type === "circlemarker") {
            const center = layer.getLatLng();
            coordinates = [{ lat: center.lat, lng: center.lng }];
        }

        const center = getPolygonCenter(coordinates);

        const temperature = await fetchTemperature(center);
        console.log("Temperature:", temperature);

        const shape = {
            id: uuid4(),
            name: `Shape-${Date.now()}`,
            coordinates,
            dataSource: "open-meteo",
            temperature
        };

        addShapeToLocalStorage(shape);

        layer.leaflet_id = shape.id;

        dispatch(addShape(shape));
        console.log("Shape Saved:", store.getState().map.selectedShapes);
    };

    const handleShapeDelete = (e: any) => {
        console.log("Shape to be Deleted:", e);
        const layers = e.layers;
        layers.eachLayer((layer: any) => {
            const shapeId = layer.leaflet_id;
            if (shapeId) {
                dispatch(deleteShape(shapeId));
                deleteShapeFromLocationStorage(shapeId);
            }
        });
    };

    useEffect(() => {
        console.log("Latest Shapes:", shapes);
    }, [shapes]);

    useEffect(() => {
        // draw shapes in the map from internal storage
        const shapes = localStorage.getItem("shapes");
        if (shapes) {
            const shapesArray = JSON.parse(shapes);
            shapesArray.forEach((shape: any) => {
                dispatch(addShape(shape));
            });
        }
    }, []);

    return (
        <MapContainer
            center={[20.5937, 78.9629]} // India center
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <FeatureGroup>
                <EditControl
                    position="topright"
                    draw={{
                        polygon: true,
                        polyline: true,
                        circle: true,
                        marker: true,
                        circlemarker: true,
                        rectangle: true,
                    }}
                    onCreated={handleShapeCreate}
                    onDeleted={handleShapeDelete}
                />
            </FeatureGroup>

            <TileLayer
                tileSize={256}
                keepBuffer={10} // pre-load extra tiles
                updateWhenIdle={false}
                updateWhenZooming={false}
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* {shapes.map((shape) => (
                <Polygon
                    key={shape.id}
                    positions={shape.coordinates}
                    color="blue"
                    fillColor="blue"
                    fillOpacity={0.5}
                />
            ))} */}

            {/* Render shapes with click handler */}
            {shapes.map((shape) => {
                if (shape.coordinates.length === 1) {
                    return (
                        <Circle
                            key={shape.id}
                            center={shape.coordinates[0]}
                            radius={500}
                            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.5 }}
                            eventHandlers={{
                                click: () => onClickShape(shape.id),
                            }}
                        />
                    );
                }

                return (
                    <Polygon
                        key={shape.id}
                        positions={shape.coordinates}
                        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.5 }}
                        eventHandlers={{
                            click: () => onClickShape(shape.id),
                        }}
                    />
                );
            })}
        </MapContainer>
    );
};

export default MapView;