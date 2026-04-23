import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import GeofenceLayer from "./geofence-layer";
import MapDrawControls from "./map-draw-controls";
import TargetMarker from "./target-marker";

function GeofenceMap() {
  return (
    <MapContainer
      center={[16.723, 98.575]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeofenceLayer />
      <MapDrawControls />
      <TargetMarker />
    </MapContainer>
  );
}

export default GeofenceMap;
