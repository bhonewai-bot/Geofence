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
- `Geofence`, `Target`, `AlertEvent`, `PresenceState`
- `AlertEvent` uses `geometryId` (not `fenceId`) for the fence reference

### `store/geofenceStore.ts` ✅
- `geofences`, `target`, `alerts`, `presenceByFence`, `isSimulating`
- Actions: `addGeofence`, `removeGeofence`, `setTarget`, `setAlert`, `setPresence`, `toggleSimulation`

### `lib/geofence/evaluate-geofence.ts` ✅
- `isTargetInsideFence(target, fence): boolean`
- ⚠️ Turf.js uses `[lng, lat]` order

### `lib/geofence/detect-transition.ts` ✅
- `detectTransition(target, fences, presenceByFence): { fenceId, type }[]`
- Diffs current vs previous state, only emits on change

### `lib/geofence/geojson.ts` ✅
- `layerToGeofence(layer): Geofence`
- `generateId(): string` via `crypto.randomUUID()`

### `lib/mock/target-simulator.ts` ✅
- `createSimulator(onTick): { start, stop }`
- 5-waypoint path around Mae Sot, stable ID `"simulated-target"`

### `lib/storage/local-persistence.ts` ✅
- `saveGeofences` / `loadGeofences` with SSR guard and try/catch

### `app/layout.tsx` ✅
- `h-full overflow-hidden` on body for full-height layout
- Title updated to "Geofence Alert"

### `app/page.tsx` ✅
- `GeofenceDashboard` with `GeofenceMap` passed as `map` prop
- `GeofenceMap` loaded via `dynamic` with `ssr: false` and loading fallback

### `components/map/geofence-map.tsx` ✅
- `MapContainer` centered on Mae Sot, `height: 100vh`
- Renders `GeofenceLayer`, `MapDrawControls`, `TargetMarker`

### `components/map/geofence-layer.tsx` ✅
- Selector hook for `geofences`, coord flip `[lng,lat] → [lat,lng]`
- Uses `fence.color` for polygon fill

### `components/map/map-draw-controls.tsx` ✅
- `FeatureGroup` + `EditControl`, polygon only
- `e.layer.options.id = fence.id` on create for delete tracking

### `components/map/target-marker.tsx` ✅
- Leaflet icon patch via `L.Icon.Default.mergeOptions()`
- Null guard when `target` is null

### `components/dashboard/simulation-controls.tsx` ✅
- `useRef` holds simulator, `useEffect` on `isSimulating`
- `getState()` inside callback avoids stale closure
- `geometryId` correctly used in `setAlert`
- Button: blue when idle, red when simulating

### `components/dashboard/geofence-list.tsx` ✅
- Color dot via inline `style={{ backgroundColor: fence.color }}`
- Delete button hidden until row hover via `group-hover`
- Empty state message when no geofences

### `components/dashboard/alert-card.tsx` ✅
- Soft green/red badge for enter/exit
- Time formatted via `toLocaleTimeString`
- `geometryId.slice(0, 8)` for compact zone display

### `components/dashboard/topbar.tsx` ✅
- Fixed `h-12` top bar with logo mark, title, subtitle
- No logic — pure layout

### `components/dashboard/sidebar.tsx` ✅
- `w-72` fixed width, white bg, border-right
- Sections: Geofences (with count badge) → Alerts (scrollable, newest first) → SimulationControls pinned at bottom
- Alerts reversed so newest appears at top

### `components/dashboard/geofence-dashboard.tsx` ✅
- Layout shell: Topbar + (Sidebar | map)
- Map passed as `React.ReactNode` prop to keep dashboard SSR-safe

---

## Remaining Work

### Functional
- `lib/storage/local-persistence.ts` is written but **not yet wired up** — geofences are not saved/loaded from localStorage on mount. Wire in `geofence-dashboard.tsx` or `sidebar.tsx` using a `useEffect` on mount.

### Polish (deferred)
- Draw toolbar UI is unstyled (leaflet-draw default)
- Fence names are all "New Geofence" — no rename UI yet
- Alert zone display shows truncated UUID — would be better as fence name
- `scrollWheelZoom` is disabled on map — consider enabling

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
UI re-renders (GeofenceLayer, TargetMarker, AlertCard)
```

### Key Gotchas
- Leaflet SSR: always `dynamic(..., { ssr: false })`
- localStorage: always guard with `typeof window !== "undefined"`
- GeoJSON vs Leaflet coords: `[lng, lat]` vs `[lat, lng]` — always flip at the boundary
- Stale closures in callbacks: use `getState()` not selector values
- `AlertEvent.geometryId` not `fenceId` — match the type exactly

---

## Key Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| State management | Zustand | No boilerplate, selector hooks prevent extra re-renders |
| Geo logic | Client-side Turf.js, main thread | <5ms at prototype scale |
| Persistence | localStorage | No backend needed |
| Map engine | react-leaflet | Free, no API key |
| Target ID | `"simulated-target"` hardcoded | Stable ID for presence diffing |
| Map SSR | `dynamic` with `ssr: false` | Leaflet needs browser environment |
| Dashboard map prop | `React.ReactNode` | Keeps dashboard component SSR-safe |
| Alerts order | Reversed in sidebar | Newest alert visible at top without scrolling |

---

## Teaching Notes (Intern Context)

This project is being built by an intern learning as they go. The approach is:
- Intern attempts each file independently
- Brings code back for review
- Claude reviews, explains issues, gives skeleton hints
- Intern fixes and re-submits

Do NOT write complete implementations unless the intern is genuinely stuck after multiple attempts.
