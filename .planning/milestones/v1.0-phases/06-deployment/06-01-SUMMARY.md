---
phase: 06-deployment
plan: 01
subsystem: ui
tags: [react-pdf, pdf-viewer, source-references, api-route]

requires:
  - phase: 01-content-pipeline
    provides: content reader, markdown sessions with reference fields
  - phase: 02-nextjs-app
    provides: Next.js app shell, instrument overview, session detail components
provides:
  - PdfViewer component with page navigation and keyboard controls
  - PDF-aware SourceRef with deep page linking
  - API route for serving reference PDFs from content directory
  - Instrument overview references section
affects: [06-deployment]

tech-stack:
  added: [react-pdf, pdfjs-dist]
  patterns: [API route for content file serving, PDF reference parsing with page extraction]

key-files:
  created:
    - src/components/pdf-viewer.tsx
    - src/app/api/references/[...path]/route.ts
  modified:
    - src/components/source-ref.tsx
    - src/components/instrument-overview.tsx
    - src/app/instruments/[slug]/page.tsx
    - next.config.ts
    - package.json

key-decisions:
  - "API route pattern for PDF serving instead of public/ copy -- supports vault and bundled content sources"
  - "PDF_MAP lookup in SourceRef uses lowercase key matching for flexible reference string detection"
  - "Webpack canvas=false alias required for react-pdf SSR compatibility"

patterns-established:
  - "API route content serving: /api/references/[...path] streams files from getContentRoot() with security sanitization"
  - "PDF reference parsing: regex page extraction + lowercase key matching against PDF_MAP"

requirements-completed: [DEPL-04]

duration: 3min
completed: 2026-03-30
---

# Phase 06 Plan 01: PDF Viewer Summary

**Embedded react-pdf viewer with deep page linking from session citations and instrument overview reference cards**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-30T18:37:51Z
- **Completed:** 2026-03-30T18:40:30Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- PdfViewer component with full-screen overlay, page navigation, keyboard shortcuts (Escape/Arrow keys), and initialPage deep linking
- SourceRef detects PDF references like "Anu Kirk p.42" and opens viewer at the cited page
- Instrument overview shows reference PDFs as clickable cards with FileText icons
- API route serves PDFs from content directory with path sanitization and caching

## Task Commits

Each task was committed atomically:

1. **Task 1: Install react-pdf and create PdfViewer component** - `4f7f4cd` (feat)
2. **Task 2: Wire PDF links into SourceRef and instrument overview** - `19219ed` (feat)

## Files Created/Modified
- `src/components/pdf-viewer.tsx` - Full-screen PDF viewer with react-pdf, page nav, keyboard controls
- `src/components/source-ref.tsx` - Updated to detect PDF references and open viewer at cited page
- `src/components/instrument-overview.tsx` - Added references prop with clickable PDF cards
- `src/app/instruments/[slug]/page.tsx` - Passes reference list to InstrumentOverview
- `src/app/api/references/[...path]/route.ts` - Streams PDFs from content directory
- `next.config.ts` - Added webpack canvas=false alias for react-pdf
- `package.json` - Added react-pdf dependency

## Decisions Made
- Used API route pattern (`/api/references/`) instead of copying PDFs to `public/` -- supports both vault and bundled content sources via `getContentRoot(config)`
- PDF_MAP uses lowercase key matching for flexible reference detection ("anu kirk", "dsi manual", "evolver guide")
- Webpack `canvas = false` alias needed for react-pdf Node.js/SSR compatibility

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- PDF viewer integrated and build passing
- Ready for remaining deployment plans (demo mode, Vercel config)

## Self-Check: PASSED

All 7 files verified present. Commits 4f7f4cd and 19219ed confirmed in git log.

---
*Phase: 06-deployment*
*Completed: 2026-03-30*
