---
phase: quick
plan: 260418-sii
subsystem: panel-pages
tags: [eurorack, photos, modulargrid, panel-layout]
dependency_graph:
  requires: []
  provides: [module-photos, photo-panel-layout]
  affects: [instruments-panel-page]
tech_stack:
  added: []
  patterns: [server-side-fs-check, conditional-image-rendering]
key_files:
  created:
    - public/modules/maths.jpg
    - public/modules/plaits.jpg
    - public/modules/beads.jpg
    - public/modules/swells.jpg
    - public/modules/ikarie.jpg
  modified:
    - src/app/instruments/[slug]/panel/page.tsx
decisions:
  - "Modules without SVG panels show photo-only view, not side-by-side"
  - "fs.access used at request time to check photo existence (server component)"
metrics:
  duration: 95s
  completed: "2026-04-18T18:37:55Z"
  tasks_completed: 2
  tasks_total: 2
---

# Quick Task 260418-sii: Add ModularGrid Photos to Panel Pages

ModularGrid photos for 5 eurorack modules displayed on panel pages with conditional side-by-side or photo-only layout based on SVG panel availability.

## What Was Done

### Task 1: Download ModularGrid panel photos
Downloaded full-resolution JPEG panel photos from ModularGrid for maths, plaits, beads, swells, and ikarie into `public/modules/`. All files verified as valid JPEGs (35KB-170KB).

**Commit:** `7a1cbb6`

### Task 2: Update panel page layout
Updated `src/app/instruments/[slug]/panel/page.tsx` to:
- Add 5 eurorack modules (maths, plaits, beads, swells, ikarie) to `PANEL_CONFIG` with `hasPanel: false`
- Added `hasPanel` boolean to config type to distinguish instruments with SVG panels from photo-only modules
- Three rendering modes: side-by-side (photo + SVG), photo-only, SVG-only, or "Panel coming soon" fallback
- Server-side `fs.access` check for photo existence (graceful for modules without photos like crow/just-friends)
- "Photo: ModularGrid" attribution text below each photo
- Responsive: flex-col on mobile, flex-row on desktop for side-by-side layout

**Commit:** `042730a`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Plan referenced non-existent path `src/app/modules/[slug]/panel/page.tsx`**
- **Found during:** Task 2
- **Issue:** Plan path doesn't exist; actual path is `src/app/instruments/[slug]/panel/page.tsx`
- **Fix:** Used correct path
- **Files modified:** src/app/instruments/[slug]/panel/page.tsx

**2. [Rule 2 - Missing functionality] Photo-only rendering for modules without SVG panels**
- **Found during:** Task 2
- **Issue:** Plan assumed modules would have SVG panels to show side-by-side, but none of the 5 eurorack modules have SVG panel components yet (those are v2.0 roadmap)
- **Fix:** Added three-way rendering logic: side-by-side when both exist, photo-only when only photo exists, SVG-only or "coming soon" fallback
- **Files modified:** src/app/instruments/[slug]/panel/page.tsx

## Known Stubs

None. All modules render either their photo (if available) or a "Panel coming soon" message.

## Self-Check: PASSED

All 5 photo files exist, page.tsx exists, both commits verified.
