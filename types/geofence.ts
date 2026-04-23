import { GeoJSON } from "leaflet";

export type Geofence = {
  id: string;
  name: string;
  color: string;
  //   metadata: Record<string, string>;
  geometry: GeoJSON.Polygon;
};

export type Target = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type AlertEvent = {
  id: string;
  fenceId: string;
  targetId: string;
  type: "enter" | "exit";
  createdAt: string;
};

export type PresenceState = Record<string, boolean>;
