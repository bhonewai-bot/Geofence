"use client";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface GeofenceDashboardProps {
  map: React.ReactNode;
}

function GeofenceDashboard({ map }: GeofenceDashboardProps) {
  return (
    <div className="flex flex-col h-full">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 relative">{map}</main>
      </div>
    </div>
  );
}

export default GeofenceDashboard;
