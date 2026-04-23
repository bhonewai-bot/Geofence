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
- `geofences: Geofence[]`, `target: Target | null`, `alerts: AlertEvent[]`
- `presenceByFence: PresenceState`, `isSimulating: boolean`
- Actions: `addGeofence`, `removeGeofence`, `setTarget`, `setAlert`, `setPresence`, `toggleSimulation`

### `lib/geofence/evaluate-geofence.ts` ✅
- `isTargetInsideFence(target, fence): boolean`
- Uses `turf.point([lng, lat])` — ⚠️ longitude first, always

### `lib/geofence/detect-transition.ts` ✅
- `detectTransition(target, fences, presenceByFence): { fenceId, type }[]`
- Calls `isTargetInsideFence` for current state, diffs against `presenceByFence`
- Only emits when state actually changes

### `lib/geofence/geojson.ts` ✅
- `layerToGeofence(layer): Geofence` — via `layer.toGeoJSON().geometry`
- `generateId(): string` — via `crypto.randomUUID()`

### `lib/mock/target-simulator.ts` ✅
- `createSimulator(onTick): { start, stop }`
- 5-waypoint path around Mae Sot
- Stable target ID: `"simulated-target"`
- `setInterval` inside `start()`, null-guarded `clearInterval` in `stop()`

### `lib/storage/local-persistence.ts` ✅
- `saveGeofences(geofences): void` — JSON stringify to localStorage key `"geofences"`
- `loadGeofences(): Geofence[]` — JSON parse with try/catch fallback to `[]`
- SSR guarded with `typeof window !== "undefined"`

### `app/page.tsx` ✅
- Dynamically imports `GeofenceMap` with `ssr: false`
- Correctly prevents Leaflet SSR crash

### `components/map/geofence-map.tsx` ✅
- `MapContainer` centered on Mae Sot `[16.723, 98.575]`, zoom 14
- `style={{ height: "100vh", width: "100%" }}`
- Imports `leaflet/dist/leaflet.css`
- Renders `<GeofenceLayer />`, `<MapDrawControls />`, `<TargetMarker />` inside the map

### `components/map/geofence-layer.tsx` ✅
- Reads `geofences` from store via selector hook
- Maps each fence to a `<Polygon>` with coordinate flip `[lng, lat] → [lat, lng]`
- Uses `fence.color` for both `color` and `fillColor`

### `components/map/map-draw-controls.tsx` ✅
- `FeatureGroup` wraps `EditControl` from `react-leaflet-draw`
- `handleCreate`: calls `layerToGeofence(e.layer)`, stores fence ID via `e.layer.options.id = fence.id`, calls `addGeofence`
- `handleDelete`: uses `e.layers.eachLayer` with `onDeleted`
- Draw toolbar: polygon only, all other tools disabled
- ⚠️ Draw toolbar UI is unstyled — polish deferred to later

### `components/map/target-marker.tsx` ✅
- Reads `target` from store via selector hook
- Returns `null` when target is null
- Patches Leaflet default icon with `L.Icon.Default.mergeOptions()` to fix webpack broken icon issue
- Renders `<Marker position={[target.lat, target.lng]} />`

---

## In Progress

### `components/dashboard/simulation-controls.tsx` 🔄
The component that wires the simulator to the UI.

Key concepts:
- Reads `isSimulating` and `toggleSimulation` from store
- Creates the simulator instance with `createSimulator(onTick)`
- `onTick` callback should:
  1. Call `detectTransition(target, fences, presenceByFence)`
  2. For each transition: call `setAlert` and `setPresence`
  3. Call `setTarget` to update target position on map
- Use `useRef` to hold the simulator instance so it persists across renders
- Call `simulator.start()` / `simulator.stop()` when `isSimulating` changes (via `useEffect`)
- Renders a single start/stop button

Intern is currently attempting this file.

---

## Remaining Files (Not Started)

```
components/dashboard/
  geofence-dashboard.tsx    ← top-level layout shell
  topbar.tsx                ← minimal top bar
  sidebar.tsx               ← left sidebar container
  geofence-list.tsx         ← list of active geofences with remove button
  alert-card.tsx            ← single alert event display
```

---

## Recommended Build Order for Remaining Components

```
1. simulation-controls.tsx  ← wire simulator to store (in progress)
2. geofence-list.tsx        ← sidebar fence list
3. alert-card.tsx           ← alert event display
4. sidebar.tsx              ← combines 1+2+3
5. topbar.tsx               ← minimal top bar
6. geofence-dashboard.tsx   ← full layout assembly
7. app/page.tsx             ← update final wiring
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
UI re-renders (GeofenceLayer, TargetMarker, AlertLog)
```

### State Diffing Pattern
On every simulator tick:
1. Check current position against all fences via `isTargetInsideFence`
2. Compare against `presenceByFence` (previous state)
3. Emit only when state changes
4. Update `presenceByFence` with new state

### Layout Intent
- White theme, map-first
- Map takes full screen
- Narrow left sidebar: geofence list + simulation controls
- Compact alert log floating or inline

### Key Next.js / Leaflet Gotchas
- Always use `dynamic(() => import(...), { ssr: false })` for map components
- Always guard localStorage with `typeof window !== "undefined"`
- Leaflet uses `[lat, lng]`, GeoJSON/Turf uses `[lng, lat]` — always flip when bridging
- Leaflet default marker icons break in webpack — always patch with `L.Icon.Default.mergeOptions()`

---

## Key Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| State management | Zustand selector hooks | Prevents unnecessary re-renders |
| Geo logic | Client-side Turf.js, main thread | <5ms at prototype scale |
| Persistence | localStorage | No backend needed |
| Map engine | react-leaflet | Free, no API key |
| Target ID | Hardcoded `"simulated-target"` | Stable ID required for presence diffing |
| Map import | `dynamic` with `ssr: false` | Leaflet requires browser environment |
| Fence ID on layer | `e.layer.options.id = fence.id` | Required for delete handler to identify which fence to remove |
| Draw toolbar polish | Deferred | Functionality over appearance for prototype |

---

## Teaching Notes (Intern Context)

This project is being built by an intern learning as they go. The approach is:
- Intern attempts each file independently
- Brings code back for review
- Claude reviews, explains issues, gives skeleton hints
- Intern fixes and re-submits

Do NOT write complete implementations unless the intern is genuinely stuck after multiple attempts.
