<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Direction

This repository is for a **prototype** of a Smart Geofencing Alert System. Keep the build intentionally small and map-first. Favor clarity over completeness.

## Product Goal

Build a lightweight orchestration prototype that lets a user:

- view a large interactive map
- create and remove geofences
- simulate one moving target
- detect enter and exit events
- review a compact alert log

## Scope Guardrails

Unless the user explicitly asks for more, prefer this reduced scope:

- one page only
- one primary moving target
- client-side geofence evaluation with Turf.js
- local persistence with `localStorage`
- no auth
- no database
- no webhooks
- no multi-user features
- no analytics dashboards

## UI Direction

The interface should stay simple and user friendly:

- white theme
- map is the main content and visual priority
- narrow left sidebar for geofence list and actions
- minimal top controls
- alerts should be compact, floating, or inline
- avoid heavy dashboard cards and decorative metrics

## Recommended Stack

- `next`
- `react`
- `react-dom`
- `leaflet`
- `react-leaflet`
- `leaflet-draw`
- `react-leaflet-draw`
- `@turf/turf`
- `zustand`

## Target Folder Shape

Use this structure when adding the prototype implementation:

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  dashboard/
    geofence-dashboard.tsx
    topbar.tsx
    sidebar.tsx
    geofence-list.tsx
    alert-card.tsx
    simulation-controls.tsx
  map/
    geofence-map.tsx
    map-draw-controls.tsx
    target-marker.tsx
    geofence-layer.tsx
lib/
  geofence/
    evaluate-geofence.ts
    detect-transition.ts
    geojson.ts
  mock/
    target-simulator.ts
  storage/
    local-persistence.ts
store/
  use-geofence-store.ts
types/
  geofence.ts
```

## State Guidance

Prefer a small Zustand store with:

- `geofences`
- `target`
- `alerts`
- `presenceByFence`
- `isSimulating`

Transition detection matters more than raw location checks. Only emit alerts when inside/outside state changes.

## Delivery Guidance

When implementing features:

- keep components small and composable
- prefer the simplest working solution
- avoid premature abstraction
- avoid adding backend complexity for prototype tasks
- preserve the map-first layout
