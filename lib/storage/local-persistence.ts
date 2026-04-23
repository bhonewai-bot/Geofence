import { Geofence } from "@/types/geofence";

// localStorage read/write
const fenceKey = "geofences";
export function saveGeofences(geofences: Geofence[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(fenceKey, JSON.stringify(geofences));
  }
}

export function loadGeofences(): Geofence[] {
  if (typeof window === "undefined") return [];
  try {
    const geofences = localStorage.getItem(fenceKey);
    return geofences ? JSON.parse(geofences) : [];
  } catch {
    return [];
  }
}
