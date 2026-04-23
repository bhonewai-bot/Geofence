"use client";

import AlertCard from "./alert-card";
import GeofenceList from "./geofence-list";
import SimulationControls from "./simulation-controls";
import { useGeofenceStore } from "@/store/geofenceStore";

function Sidebar() {
  const geofences = useGeofenceStore((state) => state.geofences);
  const alerts = useGeofenceStore((state) => state.alerts);

  return (
    <div className="w-72 shrink-0 bg-white border-r border-gray-100 flex flex-col h-full overflow-hidden">
      {/* geofences section */}
      <div className="flex flex-col shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Geofences
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
            {geofences.length}
          </span>
        </div>
        <GeofenceList />
      </div>

      {/* divider */}
      <div className="border-t border-gray-100 mx-4 my-1" />

      {/* alerts section */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between px-4 py-3 shrink-0">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Alerts
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>

        {/* scrollable alert log */}
        <div className="flex-1 overflow-y-auto">
          {alerts.length === 0 ? (
            <p className="text-xs text-gray-400 px-2 py-4 text-center">
              No alerts yet.
              <br />
              Start simulation to begin.
            </p>
          ) : (
            [...alerts]
              .reverse()
              .map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100" />

      {/* simulation controls — pinned to bottom */}
      <div className="p-3 shrink-0">
        <SimulationControls />
      </div>
    </div>
  );
}

export default Sidebar;
