import { AlertEvent } from "@/types/geofence";

function AlertCard({ alert }: { alert: AlertEvent }) {
  const isEnter = alert.type === "enter";
  const time = new Date(alert.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
      {/* enter/exit badge */}
      <span
        className={`mt-0.5 shrink-0 text-xs font-medium px-1.5 py-0.5 rounded-full ${
          isEnter ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isEnter ? "Enter" : "Exit"}
      </span>

      {/* details */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-700 truncate">
          Zone <span className="font-medium">{alert.fenceId.slice(0, 8)}</span>
        </p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}

export default AlertCard;
