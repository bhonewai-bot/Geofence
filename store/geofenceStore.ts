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
  geofences: [],

  target: null,

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
