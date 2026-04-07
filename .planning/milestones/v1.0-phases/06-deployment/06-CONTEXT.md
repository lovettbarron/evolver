# Phase 6: Deployment - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

The app runs locally against the real Obsidian vault and deploys to Vercel with a compelling demo showing curriculum content and a realistic synthetic learner journey. Reference PDFs are accessible in both modes with an embedded viewer. This phase delivers local mode polish, demo data, PDF viewer, and Vercel deployment.

</domain>

<decisions>
## Implementation Decisions

### Reference PDF access
- **Embedded PDF viewer** using react-pdf library (pdf.js-based) — not browser-native iframe
- **Deep page linking** from session citations: "See Anu Kirk p.42" opens viewer at page 42 using URL hash (#page=42)
- PDFs accessible from **session reference citations** and the **instrument overview page** — no standalone /references route
- PDFs already bundled in `src/content/references/` — viewer reads from there

### Demo mode presentation
- **Subtle "Demo" badge** in the nav — not a banner, not invisible. Sets expectations without distracting
- **All features visible** in demo mode including MIDI workspace (shows "connect hardware" prompt when no device)
- **Setup CTA** — "Run it yourself" link in footer or about page pointing to README with clone + config instructions

### Synthetic learner journey
- **Modules 1-6 complete (~60% progress)** — 21 sessions done, currently in module 7. Mid-journey state shows meaningful progress without being "finished"
- **12-16 synthetic patches** — matches recipe sessions (27-30) producing 3 each plus a few from earlier sessions
- **Realistic ADHD pacing** — synthetic daily notes spread over ~8 weeks with gaps (missed days, a week-long break mid-way). Demonstrates the system handles real usage patterns gracefully — no guilt metrics
- `syntheticCompletedSessions()` in progress.ts already exists and should be expanded to support this

### Vercel config & environment
- **Keep `evolver.config.json`** as the only vault path configuration mechanism (no env var). Absent config or missing vaultPath = demo mode
- **Prebuild hook** — add `"prebuild": "npm run bundle-content"` to package.json scripts so `src/content/` is always fresh for Vercel builds
- **Vercel project setup** at Claude's discretion — standard config, auto-generated URL, no custom domain needed now
- `next.config.ts` may need `outputFileTracingIncludes` for bundled content and PDFs — researcher should verify

### Claude's Discretion
- PDF viewer styling and controls (page nav, zoom, close)
- Demo badge exact placement and styling within the design system
- Vercel-specific Next.js config (output tracing, headers, etc.)
- Synthetic daily note file structure and naming
- README content and setup instructions

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Content pipeline (existing patterns)
- `src/lib/config.ts` — Config loading, demo mode fallback logic
- `src/lib/content/reader.ts` — Vault path resolution, bundled content fallback
- `src/lib/content/schemas.ts` — ConfigSchema with optional vaultPath
- `src/lib/progress.ts` — syntheticCompletedSessions() for demo data, scanDailyNotes() for local mode

### Bundled content
- `src/content/references/` — Already contains Evo_Key_Manual_1.3.pdf, evolverguide.pdf, arp2600ownersmanual.pdf
- `scripts/bundle-content.ts` — Content bundling script (needs prebuild hook wiring)

### Reference materials
- `references/Evo_Key_Manual_1.3.pdf` — Official DSI operation manual
- `references/evolverguide.pdf` — Anu Kirk's "Definitive Guide to Evolver"

### Session citations
- Sessions reference PDFs with page numbers (e.g., "See Anu Kirk p.42") — the viewer must support opening to specific pages

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `loadConfig()` in config.ts: Already handles missing config → demo mode fallback
- `syntheticCompletedSessions()` in progress.ts: Returns demo completion data — needs expansion for 60% journey
- `bundle-content.ts` script: Copies vault content to src/content/ — wire as prebuild hook
- Content reader `resolveContentPath()`: Falls back to src/content/ when no vaultPath — already works for demo

### Established Patterns
- Tailwind dark editorial design system (Phase 2): All new UI (PDF viewer, demo badge) must use CSS custom properties
- Server components for data loading, client components for interactivity (consistent across phases)
- Sticky header pattern used in session-detail and patch-detail
- Lucide icons used throughout (lucide-react)

### Integration Points
- Session detail page: Add PDF link to reference citations
- Instrument overview page: Add references section with PDF links
- Nav component: Add demo badge when no vaultPath configured
- Footer/about page: Add setup CTA for demo mode
- package.json: Add prebuild script
- next.config.ts: May need outputFileTracingIncludes for content + PDFs

</code_context>

<specifics>
## Specific Ideas

- react-pdf library for the PDF viewer (not iframe-based)
- Session reference citations should be clickable links that open the PDF viewer at the cited page
- Synthetic daily notes should simulate realistic ADHD pacing — gaps between sessions, a week-long break, 2-3 sessions per week pace over ~8 weeks
- Demo mode should feel like a real person's learning journey, not a marketing demo

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-deployment*
*Context gathered: 2026-03-30*
