---
phase: 02-session-browser
verified: 2026-03-29T23:25:00Z
status: gaps_found
score: 6/8 requirements verified
re_verification: false
gaps:
  - truth: "Sessions display source references and citations from reference materials"
    status: failed
    reason: "SourceRef component is defined but orphaned — never imported or used in any page or component. The 'reference' field in session frontmatter is not in the Zod schema and is not read or displayed by the session detail pipeline."
    artifacts:
      - path: "src/components/source-ref.tsx"
        issue: "Exists but never imported or rendered anywhere"
      - path: "src/app/instruments/[slug]/sessions/[id]/page.tsx"
        issue: "Does not read or pass the 'reference' field from session frontmatter"
      - path: "src/components/session-detail.tsx"
        issue: "Does not render source citations"
    missing:
      - "Read the 'reference' field from session frontmatter (requires schema update or passthrough access)"
      - "Render the reference string in session-detail.tsx, either via SourceRef component or inline display"
      - "Wire SourceRef into session detail (import and render it with session.reference data)"

  - truth: "User can open any session and read formatted exercises, parameter tables, and checklists — including Mermaid signal flow diagrams rendered client-side"
    status: partial
    reason: "MermaidRenderer has a data attribute name mismatch: the markdown processor plugin emits 'data-chart' but MermaidRenderer reads 'data-diagram'. Mermaid diagrams are output as static placeholder divs and never rendered on any page."
    artifacts:
      - path: "src/components/mermaid-renderer.tsx"
        issue: "Reads el.getAttribute('data-diagram') but the processor emits data-chart"
      - path: "src/lib/markdown/plugins/mermaid-placeholder.ts"
        issue: "Sets 'data-chart' attribute on placeholder divs, not 'data-diagram'"
    missing:
      - "Fix attribute name: change MermaidRenderer to read el.getAttribute('data-chart') OR change mermaid-placeholder.ts to emit 'data-diagram'"

  - truth: "Instrument overview page shows architecture, signal flow diagram, and links to curriculum"
    status: partial
    reason: "Instrument overview renders signal flow HTML but is missing MermaidRenderer — Mermaid diagrams in the signal flow content will remain as placeholder divs and never be rendered. This is compounded by the data-chart/data-diagram bug above."
    artifacts:
      - path: "src/components/instrument-overview.tsx"
        issue: "Renders signalFlowHtml but does not include MermaidRenderer (dynamic import, ssr: false)"
    missing:
      - "Add dynamic import of MermaidRenderer to instrument-overview.tsx after the signal flow section renders"
      - "Fix the data-chart/data-diagram attribute mismatch (shared root cause with session detail gap)"
---

# Phase 02: Session Browser Verification Report

**Phase Goal:** Users can browse, read, and navigate the Evolver curriculum through instrument-scoped routes with an action-first "what to do next" experience
**Verified:** 2026-03-29T23:25:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Next.js dev server starts and renders a page at localhost:3000 | VERIFIED | `npm run build` compiles all routes cleanly, 224 tests pass |
| 2 | Tailwind design tokens produce correct utility classes (bg-bg, text-text, bg-surface, text-accent) | VERIFIED | `src/app/globals.css` has exact UI-SPEC token values: bg=#0a0a0a, surface=#161616, text=#e8e8e8, muted=#737373, accent=#c8ff00, param=#a3e635 under `@theme` |
| 3 | App shell renders with navigation and footer | VERIFIED | `app-shell.tsx` wraps Nav + main + footer; footer has "About this method" link; nav has Home/Evolver/Sessions links with pathname-active state |
| 4 | User can browse sessions grouped by learning module at /instruments/evolver/sessions | VERIFIED | `sessions/page.tsx` calls `listSessions` + `groupByModule` + renders `SessionList`; routing tests pass |
| 5 | User can open any session and read formatted exercises, parameter tables, and checklists | VERIFIED (partial) | Session detail page wires `renderMarkdown` → `dangerouslySetInnerHTML` in `.prose` div. Markdown content renders. Mermaid diagrams do NOT render due to attribute mismatch bug. |
| 6 | Opening the app shows a next-session hero card with module name, session title, objective, duration, and Start action | VERIFIED | `page.tsx` calls `listSessions`, passes session[0] to `HeroCard` with extracted objective; "Your next session is ready" and "Browse sessions to pick up where you left off" render correctly |
| 7 | Sessions display source references and citations from reference materials | FAILED | `SourceRef` component exists but is orphaned — never imported/used. The `reference` field in session frontmatter is not in the schema, not read by session page, and not rendered in session detail. |
| 8 | Instrument overview page shows architecture, signal flow diagram, and links to curriculum | PARTIAL | Renders overview HTML and signal flow HTML correctly; has "Start Curriculum" CTA and session count. Missing MermaidRenderer — Mermaid diagram in signal flow content renders as a static placeholder, never hydrated. |

**Score:** 6/8 truths verified (2 failed or partial — both blocking goal achievement)

---

### Required Artifacts

**Plan 02-01 Artifacts:**

| Artifact | Status | Details |
|----------|--------|---------|
| `src/app/layout.tsx` | VERIFIED | Imports Inter + JetBrains_Mono, AppShell, globals.css — all three key links wired |
| `src/app/globals.css` | VERIFIED | `@theme` block present with exact UI-SPEC token values |
| `src/components/app-shell.tsx` | VERIFIED | Exports `AppShell`, renders Nav + main + footer with "About this method" link |
| `src/lib/sessions.ts` | VERIFIED | Exports `groupByModule`, `getAdjacentSessions`, `SessionWithMeta`, `ModuleGroup` — full implementation, no stubs |

**Plan 02-02 Artifacts:**

| Artifact | Status | Details |
|----------|--------|---------|
| `src/app/instruments/[slug]/sessions/page.tsx` | VERIFIED | Awaits params, calls `listSessions` + `groupByModule`, renders `SessionList` |
| `src/app/instruments/[slug]/sessions/[id]/page.tsx` | VERIFIED | Awaits params, calls `renderMarkdown`, `getAdjacentSessions`, `listInstrumentFiles` |
| `src/components/session-list.tsx` | VERIFIED | Exports `SessionList`, maps over `ModuleGroup[]`, renders `ModuleHeader` + `SessionRow` |
| `src/components/session-detail.tsx` | VERIFIED | `'use client'`, `prose` wrapper, `dangerouslySetInnerHTML`, dynamic MermaidRenderer with `ssr: false` |
| `src/components/sticky-header.tsx` | VERIFIED | `'use client'`, "Quick Ref" button, "Back to session list" aria-label, manages `QuickRefPanel` open state |
| `src/components/quick-ref-panel.tsx` | VERIFIED | `'use client'`, `translate-x` transitions, `role="dialog"`, Escape dismiss, "Close quick reference panel" aria-label, tab switching |
| `src/components/source-ref.tsx` | ORPHANED | Exists with correct implementation but never imported or used in any page or component |
| `src/components/mermaid-renderer.tsx` | STUB (wiring bug) | Exists and is included in session-detail.tsx, but reads `data-diagram` while processor emits `data-chart` — never successfully renders a diagram |

**Plan 02-03 Artifacts:**

| Artifact | Status | Details |
|----------|--------|---------|
| `src/app/page.tsx` | VERIFIED | Calls `listSessions`, renders `HeroCard` with session[0], correct empty state, "Browse All Sessions" link |
| `src/components/hero-card.tsx` | VERIFIED | `'use client'`, `bg-accent text-bg font-bold` on Start Session, correct props |
| `src/app/instruments/[slug]/page.tsx` | VERIFIED | Awaits params, calls `listInstrumentFiles` + `listSessions`, renders `InstrumentOverview` |
| `src/app/about/page.tsx` | VERIFIED | Reads `framework/README.md` with fallback, renders via `renderMarkdown`, "About This Method" heading |

---

### Key Link Verification

**Plan 02-01 Key Links:**

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/layout.tsx` | `src/app/globals.css` | CSS import | WIRED | `import './globals.css'` present |
| `src/app/layout.tsx` | `src/components/app-shell.tsx` | component render | WIRED | `AppShell` imported and used in JSX |
| `src/lib/sessions.ts` | `src/lib/content/types.ts` | type import | WIRED | `import type { Session } from '@/lib/content/types'` |

**Plan 02-02 Key Links:**

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `sessions/page.tsx` | `src/lib/content/reader.ts` | `listSessions` call | WIRED | `listSessions(slug, config)` called |
| `sessions/page.tsx` | `src/lib/sessions.ts` | `groupByModule` call | WIRED | `groupByModule(sessions)` called |
| `sessions/[id]/page.tsx` | `src/lib/markdown/processor.ts` | `renderMarkdown` call | WIRED | `renderMarkdown(current.content)` called |
| `sticky-header.tsx` | `quick-ref-panel.tsx` | state toggle | WIRED | `isQuickRefOpen` state passed to `QuickRefPanel` |
| `mermaid-renderer.tsx` (via `session-detail.tsx`) | `mermaid-placeholder` DOM attribute | `data-diagram` getAttribute | NOT_WIRED | Reads `data-diagram` but processor emits `data-chart` |

**Plan 02-03 Key Links:**

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/page.tsx` | `src/lib/content/reader.ts` | `listSessions` call | WIRED | `listSessions(instrument, config)` called |
| `src/app/instruments/[slug]/page.tsx` | `src/lib/content/reader.ts` | `listInstrumentFiles` call | WIRED | `listInstrumentFiles(slug, config)` called |
| `src/app/about/page.tsx` | `framework/` | `fs.readFile` | WIRED | Reads from `framework/README.md` with fallback |

---

### Requirements Coverage

| Requirement | Phase | Description | Status | Evidence |
|-------------|-------|-------------|--------|----------|
| SESS-01 | 2 | User can browse sessions grouped by learning module | SATISFIED | `/instruments/[slug]/sessions/page.tsx` with `groupByModule` wired |
| SESS-02 | 2 | User can read a session with formatted exercises, parameter tables, and checklists | SATISFIED | Session detail renders markdown via `renderMarkdown` + `dangerouslySetInnerHTML` in `.prose` — parameter tables, callouts, checklists all handled by Phase 1 processor |
| SESS-03 | 2 | User sees "next session" action-first view showing exactly what to do next | SATISFIED | Landing page shows `HeroCard` with Session 1, module name, title, extracted objective, duration, and "Start Session" CTA |
| SESS-04 | 2 | User can access quick-reference cards without opening a full session | SATISFIED | `StickyHeader` renders "Quick Ref" button, `QuickRefPanel` slides out with basic patch and signal flow content |
| SESS-05 | 2 | Sessions display source references and citations from reference materials | NOT SATISFIED | `SourceRef` component is orphaned. The `reference` frontmatter field is not in schema, not passed to session page, and not rendered. No citation display mechanism exists. |
| INST-01 | 2 | URL routing is instrument-scoped: /instruments/[slug]/sessions/[id] | SATISFIED | All routes use `/instruments/[slug]/sessions/[id]` pattern; dynamic params awaited correctly |
| INST-02 | 2 | Each instrument has an overview page (architecture, signal flow, basic patch) | PARTIAL | Overview page renders architecture and signal flow HTML, has "Start Curriculum" and basic patch link. Signal flow Mermaid diagram does not render (missing MermaidRenderer + data-chart/data-diagram bug). |
| INST-03 | 2 | Framework documentation is visible in the app | SATISFIED | `/about` page renders `framework/README.md` and `framework/adhd-design.md`; linked from footer |

---

### Anti-Patterns Found

| File | Issue | Severity | Impact |
|------|-------|----------|--------|
| `src/components/mermaid-renderer.tsx:20` | Reads `data-diagram` but processor emits `data-chart` | Blocker | Mermaid diagrams never render on any page |
| `src/components/instrument-overview.tsx` | No MermaidRenderer included despite signal flow content containing Mermaid diagrams | Blocker | Signal flow diagram on instrument overview page never renders |
| `src/components/source-ref.tsx` | Exists but never imported or used | Warning | SESS-05 requirement not achieved |

---

### Human Verification Required

These items require manual browser testing to confirm:

#### 1. Hero Card Visual Layout

**Test:** Visit `localhost:3000` with the dev server running.
**Expected:** Page shows "Your next session is ready" above a card with module name in small uppercase muted text, session title in large bold display type, one-line objective, duration badge, and a lime-green "Start Session" button minimum 48px tall.
**Why human:** Visual hierarchy, color rendering, and ADHD "mission brief" feel cannot be verified by code analysis.

#### 2. Quick-Ref Panel Animation

**Test:** Open any session at `/instruments/evolver/sessions/[id]`, click "Quick Ref" in the sticky header.
**Expected:** Panel slides in from the right (200ms transition), dark overlay appears, Basic Patch and Signal Flow tabs visible, Escape key dismisses.
**Why human:** CSS transform animation and focus behavior require runtime verification.

#### 3. Session List Module Grouping Appearance

**Test:** Visit `/instruments/evolver/sessions`.
**Expected:** 10 module headers visible, each with display-size bold text and a divider line, followed by session rows with number, title, and duration on each row.
**Why human:** Typography scale and visual grouping require browser rendering to confirm.

---

### Gaps Summary

Three gaps block full goal achievement:

**Gap 1 — SESS-05 not achieved (source references):** The `SourceRef` component was built but never connected to the session pipeline. Sessions have a `reference` frontmatter field (e.g., "Anu Kirk p.5-8, DSI Manual p.1-3") but that field is not in the Zod schema, not passed from the session page, and not rendered in session detail. The citation display layer is entirely absent from the wiring.

**Gap 2 — Mermaid diagrams never render (data attribute bug):** The `mermaid-placeholder.ts` rehype plugin emits `data-chart` on placeholder divs. The `MermaidRenderer` component reads `data-diagram`. This one-word mismatch means `getAttribute('data-diagram')` always returns `null` and no diagram ever renders. This is a quiet bug — pages build successfully and the component runs without error, but it produces no output.

**Gap 3 — Instrument overview missing MermaidRenderer (INST-02 partial):** The instrument overview page renders the signal flow HTML but does not include `MermaidRenderer`. Even after fixing the data attribute bug, signal flow diagrams on the instrument overview page would still not render. The session detail page correctly wires MermaidRenderer via `next/dynamic`; the instrument overview page needs the same treatment.

Gaps 2 and 3 share a root cause (Mermaid integration) and should be planned together.

---

_Verified: 2026-03-29T23:25:00Z_
_Verifier: Claude (gsd-verifier)_
