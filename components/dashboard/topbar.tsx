function Topbar() {
  return (
    <div className="h-12 border-b border-gray-100 bg-white flex items-center px-4 gap-3 shrink-0">
      {/* logo mark */}
      <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.5" />
          <circle
            cx="7"
            cy="7"
            r="6"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      {/* title */}
      <span className="text-sm font-semibold text-gray-800 tracking-tight">
        Geofence Alert
      </span>

      {/* subtitle */}
      <span className="text-xs text-gray-400 font-normal">
        Geospatial Orchestrator
      </span>
    </div>
  );
}

export default Topbar;
