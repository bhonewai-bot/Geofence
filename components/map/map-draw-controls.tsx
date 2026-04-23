import { layerToGeofence } from "@/lib/geofence/geojson";
import { useGeofenceStore } from "@/store/geofenceStore";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

function MapDrawControls() {
  const addGeofence = useGeofenceStore((state) => state.addGeofence);
  const removeGeofence = useGeofenceStore((state) => state.removeGeofence);

  const handleCreate = (e) => {
    const fence = layerToGeofence(e.layer);
    e.layer.options.id = fence.id;
    addGeofence(fence);
  };

  const handleDelete = (e) => {
    e.layers.eachLayer((layer) => {
      removeGeofence(layer.options.id);
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
