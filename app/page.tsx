"use client";

import dynamic from "next/dynamic";
import GeofenceDashboard from "@/components/dashboard/geofence-dashboard";

const GeofenceMap = dynamic(() => import("@/components/map/geofence-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
      <span className="text-xs text-gray-400">Loading map...</span>
    </div>
  ),
});

export default function Home() {
  return <GeofenceDashboard map={<GeofenceMap />} />;
}
