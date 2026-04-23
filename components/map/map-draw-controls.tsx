import { layerToGeofence } from "@/lib/geofence/geojson";
import { useGeofenceStore } from "@/store/geofenceStore";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet-draw";

function MapDrawControls() {
  const addGeofence = useGeofenceStore((state) => state.addGeofence);
  const removeGeofence = useGeofenceStore((state) => state.removeGeofence);

  const handleCreate = (e: L.DrawEvents.Created) => {
    const fence = layerToGeofence(e.layer);
    e.layer.options.id = fence.id;
    addGeofence(fence);
  };

  const handleDelete = (e: L.DrawEvents.Deleted) => {
    e.layers.eachLayer((layer) => {
      const l = layer as L.Layer & { options: { id: string } };
      removeGeofence(l.options.id);
    });
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={handleCreate}
        onDeleted={handleDelete}
        draw={{
          polygon: true,
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        }}
      />
    </FeatureGroup>
  );
}

export default MapDrawControls;
