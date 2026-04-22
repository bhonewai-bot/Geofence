# Geofence Alert — Handoff Notes

This file tracks progress, decisions, and next steps so no context is lost between sessions.
Update this file every time a file is completed or a decision is made.

---

## Project Summary

A small Next.js prototype for a Smart Geofencing Alert System. Map-first, single page, client-side only. No backend, no auth, no webhooks. Built as a portfolio/learning project.

**Key goal:** Demonstrate event-driven geospatial orchestration using Turf.js for logic, Zustand for state, and react-leaflet for the map.

---

## Stack

- Next.js 16.2.4
- React 19
- Leaflet + react-leaflet + leaflet-draw + react-leaflet-draw
- @turf/turf
- Zustand 5
- Tailwind CSS 4
- TypeScript

> ⚠️ `react-leaflet` and `react-leaflet-draw` are listed in README/AGENTS.md but are NOT yet in package.json. Run `npm install react-leaflet react-leaflet-draw` before building map components.

---

## Completed Files

### `types/geofence.ts` ✅

Defines all core types:

- `Geofence` — polygon zone with id, name, color, GeoJSON geometry
- `Target` — moving point with id, name, lat, lng
- `AlertEvent` — enter/exit event with fenceId, targetId, type, createdAt
- `PresenceState` — `Record<string, boolean>` mapping fenceId → inside/outside

### `store/geofenceStore.ts` ✅

Zustand store with:

- `geofences: Geofence[]` — all drawn zones
- `target: Target | null` — the single simulated target
- `alerts: AlertEvent[]` — log of all enter/exit events
- `presenceByFence: PresenceState` — current inside/outside state per fence
- `isSimulating: boolean` — whether mock feed is running
- Actions: `addGeofence`, `removeGeofence`, `setTarget`, `setAlert`, `setPresence`, `toggleSimulation`

### `lib/geofence/evaluate-geofence.ts` ✅

Single function: `isTargetInsideFence(target, fence): boolean`

- Uses `turf.point([lng, lat])` and `turf.booleanPointInPolygon()`
- ⚠️ Key gotcha: Turf.js uses [longitude, latitude] order, NOT [lat, lng]

### `lib/geofence/detect-transition.ts` ✅

Function: `detectTransition(target, fences, presenceByFence): { fenceId: string; type: "enter" | "exit" }[]`

- Loops over all fences
- Calls `isTargetInsideFence` for current state
- Compares with `presenceByFence` for previous state
- Only pushes a transition when state actually changes
- Returns array — multiple fences can transition in one tick
- Uses `?? false` to safely handle fences the target has never been near

### `lib/geofence/geojson.ts` ✅

Two utility functions:

- `layerToGeofence(layer): Geofence` — converts a leaflet-draw layer to a Geofence object via `layer.toGeoJSON().geometry`
- `generateId(): string` — returns `crypto.randomUUID()` for unique fence IDs

---

## In Progress

### `lib/mock/target-simulator.ts` ✅

Function: `createSimulator(onTick): { start, stop }`

- Hardcoded waypoints (Mae Sot area coordinates)
- `setInterval` at 1000ms drives ticks, `clearInterval` stops it
- Index wraps with `% path.length`
- Imports `generateId` from geojson util

**Known issues fixed during review:**
- `id: generateId()` was inside the interval (regenerated every tick) — must be moved outside so the target ID is stable across ticks
- `stop()` should reset `intervalId` to `null` after clearing
- No double-start guard — calling `start()` twice creates two intervals

---

## Remaining Files (Not Started)

```
lib/storage/
  local-persistence.ts      ← localStorage save/load for geofences  🔄 IN PROGRESS

components/map/
  geofence-map.tsx          ← react-leaflet map + draw controls
  map-draw-controls.tsx     ← leaflet-draw integration
  target-marker.tsx         ← animated marker for simulated target
  geofence-layer.tsx        ← renders polygon zones on map

components/dashboard/
  geofence-dashboard.tsx    ← top-level layout shell
  topbar.tsx                ← minimal top bar
  sidebar.tsx               ← left sidebar container
  geofence-list.tsx         ← list of active geofences
  alert-card.tsx            ← single alert event display
  simulation-controls.tsx   ← start/stop simulation button

app/page.tsx                ← final layout wiring
```

---

## Architecture Notes

### Data Flow

```
target-simulator (setInterval)
        ↓
detectTransition(target, fences, presenceByFence)
        ↓  uses →  isTargetInsideFence (Turf.js)
        ↓
transitions[] → store.setPresence + store.setAlert
        ↓
UI re-renders (AlertLog, map markers)
```

### State Diffing Pattern

`presenceByFence` stores the PREVIOUS known state. On every simulator tick:

1. Check current position against all fences
2. Compare current vs previous
3. Emit only when state changes (enter/exit)
4. Update presenceByFence with new current state

### Layout Intent

- White theme
- Map takes up most of the screen
- Narrow left sidebar: geofence list + simulation controls
- Compact alert log (floating or inline, not a heavy dashboard)

---

## Key Decisions Made

| Decision         | Choice                            | Reason                                                           |
| ---------------- | --------------------------------- | ---------------------------------------------------------------- |
| State management | Zustand                           | No boilerplate, sufficient for prototype scale                   |
| Geo logic        | Client-side Turf.js (main thread) | Calculation is <5ms at prototype scale, Worker adds IPC overhead |
| Persistence      | localStorage                      | No backend needed for prototype                                  |
| Map engine       | react-leaflet                     | Free, lightweight, no API key                                    |
| Scope            | Single target, client-side only   | Keeps prototype explainable and demoable                         |

---

## Teaching Notes (Intern Context)

This project is being built by an intern learning as they go. The approach is:

- Intern attempts each file independently
- Brings code back for review
- Claude reviews, explains issues, gives skeleton hints
- Intern fixes and re-submits

Do NOT write complete implementations unless the intern is genuinely stuck after multiple attempts.
