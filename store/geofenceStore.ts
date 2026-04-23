import { generateId } from "@/lib/geofence/geojson";
import { createSimulator } from "@/lib/mock/target-simulator";
import { AlertEvent, Geofence, PresenceState, Target } from "@/types/geofence";
import { create } from "zustand";

type GeofenceStore = {
  geofences: Geofence[];
  target: Target | null;
  alerts: AlertEvent[];
  presenceByFence: PresenceState;
  isSimulating: boolean;
  addGeofence: (fence: Geofence) => void;
  removeGeofence: (id: string) => void;
  setTarget: (target: Target) => void;
  setAlert: (alert: AlertEvent) => void;
  setPresence: (fenceId: string, inside: boolean) => void;
  toggleSimulation: () => void;
};

export const useGeofenceStore = create<GeofenceStore>((set) => ({
  geofences: [
    {
      id: generateId(),
      name: "Geofence 1",
      color: "lime",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [16.719, 98.569],
            [16.721, 98.572],
            [16.723, 98.575],
            [16.725, 98.578],
            [16.727, 98.581],
          ],
        ],
      },
    },
  ],

  target: {
    id: "simulated-target",
    name: "Simulated Target",
    lat: 16.719,
    lng: 98.569,
  },

  alerts: [],

  presenceByFence: {},

  isSimulating: false,

  addGeofence: (fence: Geofence) => {
    set((state) => ({
      geofences: [...state.geofences, fence],
    }));
  },

  removeGeofence: (id: string) => {
    set((state) => ({
      geofences: state.geofences.filter((fence) => fence.id !== id),
    }));
  },

  setTarget: (target: Target) => {
    set({ target });
  },

  setAlert: (alert: AlertEvent) => {
    set((state) => ({
      alerts: [...state.alerts, alert],
    }));
  },

  setPresence: (fenceId: string, inside: boolean) => {
    set((state) => ({
      presenceByFence: {
        ...state.presenceByFence,
        [fenceId]: inside,
      },
    }));
  },

  toggleSimulation: () => {
    set((state) => ({
      isSimulating: !state.isSimulating,
    }));
  },
}));
