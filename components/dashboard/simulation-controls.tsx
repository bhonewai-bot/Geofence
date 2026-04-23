import { detectTransition } from "@/lib/geofence/detect-transition";
import { generateId } from "@/lib/geofence/geojson";
import { createSimulator } from "@/lib/mock/target-simulator";
import { useGeofenceStore } from "@/store/geofenceStore";
import { useEffect, useRef } from "react";

function SimulationControls() {
  const isSimulating = useGeofenceStore((state) => state.isSimulating);
  const setTarget = useGeofenceStore((state) => state.setTarget);
  const setAlert = useGeofenceStore((state) => state.setAlert);
  const setPresence = useGeofenceStore((state) => state.setPresence);
  const toggleSimulation = useGeofenceStore((state) => state.toggleSimulation);

  const simulatorRef = useRef<{ start: () => void; stop: () => void } | null>(
    null,
  );

  useEffect(() => {
    if (isSimulating) {
      simulatorRef.current = createSimulator((target) => {
        setTarget(target);
        const fences = useGeofenceStore.getState().geofences;
        const presenceByFence = useGeofenceStore.getState().presenceByFence;
        const transitions = detectTransition(target, fences, presenceByFence);
        transitions.forEach(({ fenceId, type }) => {
          setAlert({
            id: generateId(),
            targetId: target.id,
            fenceId: fenceId,
            type,
            createdAt: new Date().toISOString(),
          });
          setPresence(fenceId, type === "enter");
        });
      });
      simulatorRef.current.start();
    } else {
      simulatorRef.current?.stop();
    }
  }, [isSimulating, setAlert, setPresence, setTarget]);

  return (
    <button
      onClick={toggleSimulation}
      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
        isSimulating
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {isSimulating ? "Stop Simulation" : "Start Simulation"}
    </button>
  );
}

export default SimulationControls;
