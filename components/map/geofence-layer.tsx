import { useGeofenceStore } from "@/store/geofenceStore";
import { Polygon } from "react-leaflet";

function GeofenceLayer() {
  const geofences = useGeofenceStore((state) => state.geofences);
  return (
    <>
      {geofences.map((fence) => (
        <Polygon
          key={fence.id}
          pathOptions={{ color: fence.color, fillColor: fence.color }}
          positions={fence.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ])}
        />
      ))}
    </>
  );
}

export default GeofenceLayer;
