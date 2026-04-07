# Phase 2: Session Browser - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can browse, read, and navigate the Evolver curriculum through instrument-scoped routes with an action-first "what to do next" experience. This is the first UI phase — Next.js app scaffolding, design system, routing, and all session/instrument views are delivered here.

</domain>

<decisions>
## Implementation Decisions

### Design system and visual direction
- **Dark editorial aesthetic** inspired by Ghostly International and Domus magazine — near-black backgrounds, strong typography hierarchy, generous whitespace, restrained accent color
- Color tokens: `--bg` near-black, `--surface` dark gray, `--text` off-white, `--muted` mid-gray, `--accent` single color used sparingly, `--param` monospace distinct weight
- **Tailwind CSS required** — all styling through Tailwind utility classes and CSS custom properties. No hardcoded colors anywhere. Validation must enforce this
- Design system implemented as Tailwind theme config + CSS custom properties. All components consume tokens, never raw values
- Typography: sans-serif headers (bold), sans-serif body, monospace for parameter values
- Editorial principles: whitespace is a feature, typography does the heavy lifting, no decorative elements, grid-based magazine-feel layouts

### Landing experience
- **Next session hero card** — single focused card showing: module name, session title, one-line objective, duration, and a prominent "Start" action
- Minimal chrome, maximum clarity — one thing to do, one button to press (ADHD-optimized)
- Below the hero: subtle links to "Browse All Sessions" and future nav items
- **Next session defaults to Session 1** until Phase 5 adds real progress tracking from daily notes. Include a note like "Browse sessions to pick up where you left off"

### Session reading layout
- **Single column, wide** — max ~720px content column, long-scroll. Domus article style
- Sticky header with: back navigation, session identifier, quick-ref card button(s)
- Content flows naturally: warm-up, exercises with parameter tables, output checklist
- Mermaid diagrams render inline (signal flow visualizations)
- **Source references** (e.g., "See Anu Kirk p.42") displayed as **subtle inline markers** (footnote-style) that don't break reading flow. Click for detail in tooltip or slide-out panel

### Quick-reference cards
- **Slide-out panel from the right** — triggered by button in sticky header
- Shows basic patch parameters or signal flow without losing scroll position in the session
- Dismiss to return. Content stays loaded (no re-fetch on toggle)

### Module navigation / session browsing
- **Grouped list** — sessions listed vertically under module headers. All modules visible, no collapsing/accordion
- Module headers visually distinct (typography weight/size differentiation)
- Each session row shows: number, title, duration
- **No status indicators** until Phase 5 — clean list, no empty checkboxes or placeholder states
- **Sequential prev/next navigation** at bottom of each session — crosses module boundaries. The curriculum is linear; nav reflects that

### Instrument overview page
- **Reference hub** at `/instruments/evolver` — instrument name, description, architecture summary, signal flow diagram (Mermaid), links to basic patch card and signal flow detail, entry point to curriculum sessions
- Basic patch and signal flow are viewable as standalone pages from the instrument hub (same content accessible via slide-out from sessions)

### App navigation
- **Minimal nav**: Home (landing/hero) + Sessions. Only what Phase 2 delivers
- Nav items added incrementally as phases ship (Phase 3: Patches, Phase 5: Progress)
- Instrument name ("Evolver") in nav — clicking goes to instrument overview
- Routing: instrument-scoped per INST-01 (`/instruments/[slug]/sessions/[id]`)

### Framework methodology docs
- Accessible from **footer link** or "About this method" page
- Not in main navigation — supports the learning but isn't the main content
- Shows ADHD design principles and learning methodology from `framework/`

### Claude's Discretion
- Exact Tailwind theme token values (specific hex codes within the dark editorial palette)
- Component architecture (server vs client component boundaries)
- Slide-out panel animation and behavior details
- Mobile responsive breakpoints and behavior
- Loading states and transitions
- Mermaid diagram rendering approach (client-side vs SSR)
- Exact spacing scale and typography sizing

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design inspiration
- `https://ghostly.com/` — Primary visual inspiration: dark, editorial, music-industry aesthetic
- `https://www.domusweb.it/` — Secondary inspiration: editorial grid layouts, strong typography, magazine feel

### Session and instrument content
- `instruments/evolver/modules.md` — Module map with 10 modules and session allocations (defines browse page structure)
- `instruments/evolver/basic-patch.md` — Basic patch parameter dump (content for quick-ref card)
- `instruments/evolver/signal-flow.md` — Signal flow documentation (content for quick-ref card and instrument overview)
- `instruments/evolver/overview.md` — Instrument architecture overview (content for instrument hub page)

### Framework docs (INST-03)
- `framework/adhd-design.md` — ADHD-aware learning design principles (inform UI decisions + framework page content)
- `framework/README.md` — Reusable learning framework methodology (framework page content)

### Phase 1 outputs (content pipeline)
- `src/lib/content/reader.ts` — Content reader API (sessions, patches, instruments) — this is the data layer
- `src/lib/content/schemas.ts` — Zod schemas for all content types — defines available frontmatter fields
- `src/lib/content/types.ts` — TypeScript types derived from schemas
- `src/lib/markdown/processor.ts` — Markdown rendering pipeline (remark/rehype with Obsidian features)
- `src/lib/config.ts` — Config loader for vault path / demo mode
- `src/content/` — Bundled demo content (sessions, patches, instruments, references)

### Project context
- `.planning/PROJECT.md` — PM Toolkit vault reader pattern, constraints, key decisions
- `.planning/REQUIREMENTS.md` — SESS-01 through SESS-05, INST-01 through INST-03 requirements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/reader.ts`: Content reader with `getSessions()`, `getSession()`, `getInstrument()` etc. — data layer is ready
- `src/lib/content/schemas.ts`: Zod schemas define session frontmatter (title, module, duration, objective, etc.) — use these for type-safe components
- `src/lib/markdown/processor.ts`: Full remark/rehype pipeline with Mermaid, callouts, wikilinks, parameter tables, syntax highlighting — rendering is ready
- `src/lib/config.ts`: Config loader that falls back to demo mode — routing can check this
- `src/content/`: 35 sessions, instrument docs, patches bundled — demo data is ready

### Established Patterns
- PM Toolkit pattern: Next.js App Router, server components for file I/O, client components for interactivity
- Zod validation at boundaries (content reader validates, components can trust the data)
- Obsidian-flavored markdown fully supported in the rendering pipeline

### Integration Points
- `src/app/` does not exist yet — Next.js app router needs scaffolding (layout, pages, routing)
- No UI components exist — design system, component library built from scratch
- `package.json` has no Next.js dependency yet — needs adding
- Content reader returns typed data ready for server components to consume

</code_context>

<specifics>
## Specific Ideas

- Visual aesthetic inspired by **Ghostly International** (dark, minimal, music-industry) and **Domus magazine** (editorial grid, strong typography)
- **Design system is non-negotiable** — Tailwind theme config + CSS custom properties. Validation must catch any hardcoded colors or magic numbers
- Parameter values should feel distinctly different from body text — monospace, perhaps a different color token — so they pop for ADHD scanning
- The landing hero card should feel like a "mission brief" — you glance at it and know exactly what you're doing today

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-session-browser*
*Context gathered: 2026-03-29*
