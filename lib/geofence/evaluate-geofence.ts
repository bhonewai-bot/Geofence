import { Geofence, Target } from "@/types/geofence";
import * as turf from "@turf/turf";

// Turf.js point-in-polygon checks
export function isTargetInsideFence(target: Target, fence: Geofence): boolean {
  const point = turf.point([target.lng, target.lat]);
  const polygon = turf.booleanPointInPolygon(
    point,
    turf.feature(fence.geometry),
  );
  return polygon;
}
