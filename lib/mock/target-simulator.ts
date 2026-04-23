import { Target } from "@/types/geofence";

// simulated GPS movement
export function createSimulator(onTick: (target: Target) => void): {
  start: () => void;
  stop: () => void;
} {
  const path: { lat: number; lng: number }[] = [
    { lat: 16.719, lng: 98.569 },
    { lat: 16.721, lng: 98.572 },
    { lat: 16.723, lng: 98.575 },
    { lat: 16.725, lng: 98.578 },
    { lat: 16.727, lng: 98.581 },
  ];

  let currentIndex = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const start = () => {
    intervalId = setInterval(() => {
      const target: Target = {
        id: "simulated-target",
        name: "Simulated Target",
        lat: path[currentIndex].lat,
        lng: path[currentIndex].lng,
      };
      onTick(target);
      currentIndex = (currentIndex + 1) % path.length;
    }, 1000);
  };

  const stop = () => {
    if (intervalId) clearInterval(intervalId);
  };

  return {
    start,
    stop,
  };
}
