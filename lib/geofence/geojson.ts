/* GeoJSON helper utilities */

import { Geofence } from "@/types/geofence";

// Convert a leaflet-draw layer to a GeoJSON Polygon geometry
export function layerToGeofence(layer: any): Geofence {
  return {
    id: generateId(),
    name: "New Geofence",
    color: "#4169E1",
    geometry: layer.toGeoJSON().geometry,
  };
}

// Generate a unique ID for new geofences
export function generateId(): string {
  return crypto.randomUUID();
}
