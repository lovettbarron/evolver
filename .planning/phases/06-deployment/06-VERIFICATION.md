---
phase: 06-deployment
verified: 2026-03-30T19:00:00Z
status: passed
score: 4/4 must-haves verified
re_verification: false
human_verification:
  - test: "Open deployed Vercel URL and confirm all pages load in demo mode"
    expected: "Nav shows Demo badge, 35 sessions visible, progress shows 21 sessions/6 modules, PDF viewer opens from citations, footer shows Run it yourself link"
    why_human: "Vercel deployment deferred — user must run 'npx vercel --prod --yes' and visually confirm. DEPL-02 treats config-in-place as sufficient per instructions, but live URL verification requires human."
---

# Phase 6: Deployment Verification Report

**Phase Goal:** The app runs locally against the real vault and deploys to Vercel with a compelling demo showing curriculum content and a realistic synthetic learner journey
**Verified:** 2026-03-30
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Running the app locally with a configured vault path shows real sessions/patches/progress from the user's Obsidian vault | VERIFIED | `loadConfig()` reads `evolver.config.json`; `getContentRoot()` returns `config.vaultPath` when set; `isDemoMode = !config.vaultPath` threads to Nav, which hides Demo badge when vault is configured |
| 2 | The Vercel deployment shows the full curriculum with synthetic practice data (realistic ~60% progress, 12+ patches, modules 1-5 complete) | VERIFIED (config) | `vercel.json` with `buildCommand`, `outputFileTracingIncludes` in `next.config.ts`, `prebuild` in `package.json`, local build exits 0. Actual live URL deferred to user (see human verification). Synthetic data: 21 sessions, 6 modules complete. |
| 3 | Reference PDFs are accessible in both local and demo modes | VERIFIED | API route `/api/references/[...path]/route.ts` calls `getContentRoot(config)` to resolve from vault or bundled `src/content/references/`; PDFs exist at `src/content/references/` (Evo_Key_Manual_1.3.pdf, evolverguide.pdf, arp2600ownersmanual.pdf); `SourceRef` opens `PdfViewer` at cited page |
| 4 | A clean `git clone && npm install && npm run dev` with no vault path configured starts in demo mode with all features visible | VERIFIED | `loadConfig()` falls back to `{}` (no vaultPath) when config file is absent; `getContentRoot()` falls back to `src/content/`; demo mode flag derived from `!config.vaultPath`; Demo badge renders in Nav |

**Score:** 4/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/pdf-viewer.tsx` | react-pdf PDF viewer with page nav and hash-based page linking | VERIFIED | 116 lines; `'use client'`, `Document`/`Page` from react-pdf, `initialPage` prop, `pageNumber` state, `numPages` state, Escape/Arrow keyboard handlers, fixed-overlay layout |
| `src/components/source-ref.tsx` | Updated source reference with PDF link | VERIFIED | Imports `PdfViewer`, contains `PDF_MAP` with 'anu kirk'/'dsi manual'/'evolver guide' keys, `showPdf` state, opens viewer at cited page |
| `src/lib/synthetic-daily-notes.ts` | Synthetic daily note data simulating ~8 weeks of ADHD-paced practice | VERIFIED | 50 lines; exports `SYNTHETIC_COMPLETED_SESSIONS` (21 sessions 1-21), `SYNTHETIC_JOURNEY_WEEKS` (8-week schedule with week-5 gap documented) |
| `src/components/nav.tsx` | Nav with conditional demo badge | VERIFIED | Accepts `isDemoMode?: boolean` prop; renders "Demo" badge with `bg-accent` styling when true |
| `next.config.ts` | outputFileTracingIncludes for bundled content and PDFs | VERIFIED | Contains `outputFileTracingIncludes: { '/*': ['./src/content/**/*'] }` and `webpack canvas=false` alias |
| `package.json` | prebuild script for content bundling | VERIFIED | `"prebuild": "npm run bundle-content"` present in scripts |
| `vercel.json` | Vercel project configuration | VERIFIED | Contains `buildCommand: "npm run prebuild && npm run build"` and `"framework": "nextjs"` |
| `src/app/api/references/[...path]/route.ts` | API route serving PDFs from content directory | VERIFIED | 35 lines; path sanitization, `Content-Type: application/pdf`, reads from `getContentRoot(config)` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/components/source-ref.tsx` | `src/components/pdf-viewer.tsx` | `onClick` opens PdfViewer at cited page | WIRED | `import { PdfViewer }` present; `{showPdf && pdfRef && <PdfViewer src={...} initialPage={pageNum} onClose={...} />}` confirmed |
| `src/components/instrument-overview.tsx` | PDF files in `src/content/references/` | `references` prop with clickable cards opening PdfViewer | WIRED | `references?: Array<{ label: string; pdfPath: string }>` prop; `FileText` icon from lucide-react; `PdfViewer` rendered when card clicked |
| `src/components/nav.tsx` | demo mode detection | `isDemoMode` prop passed from layout | WIRED | `layout.tsx` derives `isDemoMode = !config.vaultPath` and passes to `<AppShell isDemoMode={isDemoMode}>`; AppShell passes to `<Nav isDemoMode={isDemoMode}>` |
| `src/lib/progress.ts` | `src/lib/synthetic-daily-notes.ts` | `SYNTHETIC_COMPLETED_SESSIONS` imported by `getSyntheticCompletedSessions` | WIRED | `import { SYNTHETIC_COMPLETED_SESSIONS } from './synthetic-daily-notes'` confirmed; function returns it directly |
| `package.json prebuild` | `scripts/bundle-content.ts` | `npm run bundle-content` called before build | WIRED | `"prebuild": "npm run bundle-content"` in package.json; `"bundle-content": "tsx scripts/bundle-content.ts"` present |
| `next.config.ts outputFileTracingIncludes` | `src/content/**/*` | Bundled content in serverless function | WIRED | `outputFileTracingIncludes: { '/*': ['./src/content/**/*'] }` confirmed in next.config.ts |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DEPL-01 | 06-02 | App runs locally reading from ~/song vault | SATISFIED | `loadConfig()` reads `evolver.config.json`; `getContentRoot()` uses vaultPath when set; `isDemoMode=false` hides demo indicators when vault configured |
| DEPL-02 | 06-03 | App deploys to Vercel with demo mode (curriculum visible, practice data synthetic) | SATISFIED (config) | `vercel.json`, `outputFileTracingIncludes`, `prebuild` hook all in place; local build exits 0. Live deploy deferred to user per phase instructions. |
| DEPL-03 | 06-02 | Demo mode includes curated synthetic learner journey (realistic progress state) | SATISFIED | `synthetic-daily-notes.ts` with 21-session ADHD-paced 8-week journey; 6 modules complete; week-5 gap documented |
| DEPL-04 | 06-01 | Reference PDFs accessible in both local and demo modes | SATISFIED | API route resolves from `getContentRoot(config)` — vault path or bundled; PDFs exist in `src/content/references/`; `SourceRef` and `InstrumentOverview` both wired to `PdfViewer` |

All 4 DEPL requirements accounted for. No orphaned requirements for Phase 6.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/source-ref.tsx` | 23 | `return null` | Info | Conditional guard — returns null when no PDF match found for a reference, not a stub. Correct behavior. |

No blockers or warnings found.

### Human Verification Required

#### 1. Verify live Vercel deployment

**Test:** Run `npx vercel --yes` then `npx vercel --prod --yes` from the project root. Open the deployment URL.
**Expected:** Nav shows small "Demo" badge; Sessions page shows 35 sessions grouped by module; Patches page shows patch cards with type filter; Progress page shows 21 sessions done, 6 modules complete; footer shows "Demo mode — Run it yourself" link; About page shows "Run It Yourself" setup instructions; clicking a session citation with "Anu Kirk p.X" opens the PDF viewer at that page; instrument overview shows DSI Manual and Evolver Guide as clickable cards.
**Why human:** Vercel CLI requires browser OAuth authentication that cannot be automated in the executor environment. Deployment configuration is complete and local build passes, but live URL verification requires the user to deploy and manually confirm.

### Gaps Summary

No gaps. All automated checks pass.

Phase 6 goal is fully achieved at the code level:

- **DEPL-01 (local vault mode):** Vault path read from `evolver.config.json`; reader uses it when present; demo indicators suppressed.
- **DEPL-02 (Vercel deployment):** All deployment config in place (`vercel.json`, `outputFileTracingIncludes`, `prebuild` hook); local build verified exit 0. Per instructions, config-in-place is treated as sufficient. User executes `npx vercel --prod --yes` to go live.
- **DEPL-03 (synthetic learner journey):** `synthetic-daily-notes.ts` models 8-week ADHD-paced journey with 21 sessions, 6 modules complete, week-5 break.
- **DEPL-04 (reference PDFs):** API route serves PDFs from vault or bundled content; `SourceRef` opens viewer at cited page; instrument overview shows reference cards.

---

_Verified: 2026-03-30_
_Verifier: Claude (gsd-verifier)_
