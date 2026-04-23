import { useGeofenceStore } from "@/store/geofenceStore";

function GeofenceList() {
  const geofences = useGeofenceStore((state) => state.geofences);
  const removeGeofence = useGeofenceStore((state) => state.removeGeofence);

  return (
    <div className="flex flex-col gap-1">
      {geofences.length === 0 ? (
        <p className="text-xs text-gray-400 px-2 py-4 text-center">
          No geofences yet.
          <br />
          Draw one on the map.
        </p>
      ) : (
        geofences.map((fence) => (
          <div
            key={fence.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 group transition-colors"
          >
            {/* color dot */}
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: fence.color }}
            />

            {/* name */}
            <span className="flex-1 text-sm text-gray-700 truncate">
              {fence.name}
            </span>

            {/* delete button — visible on hover */}
            <button
              onClick={() => removeGeofence(fence.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 text-xs px-1"
              title="Remove geofence"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default GeofenceList;
