import { useGeofenceStore } from "@/store/geofenceStore";
import L from "leaflet";
import { Marker } from "react-leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function TargetMarker() {
  const target = useGeofenceStore((state) => state.target);
  return <>{target && <Marker position={[target.lat, target.lng]} />}</>;
}

export default TargetMarker;
