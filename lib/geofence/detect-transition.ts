import { Geofence, PresenceState, Target } from "@/types/geofence";
import { isTargetInsideFence } from "./evaluate-geofence";

// enter/exit diffing logic
export function detectTransition(
  target: Target,
  fences: Geofence[],
  presenceByFence: PresenceState,
): { fenceId: string; type: "enter" | "exit" }[] {
  const transitions: { fenceId: string; type: "enter" | "exit" }[] = [];

  for (const fence of fences) {
    const currentlyInside = isTargetInsideFence(target, fence);
    const previouslyInside = presenceByFence[fence.id] ?? false;

    if (currentlyInside && !previouslyInside) {
      transitions.push({ fenceId: fence.id, type: "enter" });
    } else if (!currentlyInside && previouslyInside) {
      transitions.push({ fenceId: fence.id, type: "exit" });
    }
  }

  return transitions;
}
