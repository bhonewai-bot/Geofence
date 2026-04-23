"use client";
import dynamic from "next/dynamic";

const GeofenceMap = dynamic(() => import("@/components/map/geofence-map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <GeofenceMap />
    </div>
  );
}
