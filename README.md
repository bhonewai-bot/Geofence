# Geofence Alert

`geofence-alert` is a small Next.js prototype for a Smart Geofencing Alert System. The goal is to build a map-first demo that shows geofence orchestration without turning the project into a full production platform.

## Prototype Goal

The prototype should let a user:

- view a large interactive map
- create and remove polygon geofences
- simulate a moving target
- detect geofence enter and exit transitions
- review a compact alert log

This repository is intentionally scoped as a prototype. It should stay lightweight, easy to demo, and easy to explain.

## Design Principles

- white theme
- map-first layout
- minimal supporting UI
- simple, user-friendly interactions
- no unnecessary dashboards or decorative analytics

## Planned Stack

Core framework:

- `next`
- `react`
- `react-dom`

Prototype dependencies to add:

- `leaflet`
- `react-leaflet`
- `leaflet-draw`
- `react-leaflet-draw`
- `@turf/turf`
- `zustand`
- `@types/leaflet` as a dev dependency

## Planned Folder Structure

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

## Data Flow

The intended prototype flow is:

1. a simulated target publishes new coordinates on an interval
2. Turf.js checks whether the target is inside each geofence
3. the app compares current state with previous state
4. enter or exit alerts are created only when the state changes
5. geofences and relevant UI state can be persisted locally

## Out Of Scope

Unless the project direction changes, do not treat these as prototype requirements:

- authentication
- backend database
- webhook delivery
- multi-user collaboration
- real-time external GPS feeds
- analytics-heavy dashboards

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

## Notes For Contributors

- Read project-specific guidance in [`AGENTS.md`](./AGENTS.md).
- `CLAUDE.md` mirrors the same prototype direction for Claude-based tooling.
- This project uses Next.js `16.2.4`, so read the relevant docs in `node_modules/next/dist/docs/` before making framework-level assumptions.
