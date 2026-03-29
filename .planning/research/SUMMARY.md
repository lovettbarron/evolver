# Project Research Summary

**Project:** Evolver
**Domain:** Obsidian-backed instrument learning platform (ADHD-optimized, Next.js frontend, markdown-as-data)
**Researched:** 2026-03-29
**Confidence:** HIGH

## Executive Summary

Evolver is a personal web frontend for a structured 35-session synthesizer learning curriculum, backed by an Obsidian vault as the data source. Experts build this class of tool as a thin visualization layer over a filesystem content pipeline: server-side markdown parsing, Zod frontmatter validation, and React Server Components for data access, with minimal client-side interaction. The dominant pattern — confirmed by the PM Toolkit reference implementation running in production — is a strategy-pattern content reader (vault vs. bundled demo), direct server component data access (no API routes), and static generation for curriculum pages. This is a read-only app; Obsidian is the single source of truth for all content and progress.

The recommended approach is to build the data layer first (config, Zod schemas, content reader, markdown pipeline), then layer on curriculum views (sessions, patches), then the progress dashboard, then polish and Vercel deployment. The stack is deliberately minimal: Next.js 16 + React 19, gray-matter + remark/rehype plugins, Tailwind v4, Radix UI primitives, Zod v4. No database, no ORM, no API routes, no complex client state. Flat-file reading is sufficient for ~200 content files across even three instruments.

The key risks are architectural: vault path divergence between local dev and Vercel (mitigated by building the reader abstraction and demo mode in Phase 1), frontmatter schema drift as content grows (mitigated by Zod validation at parse time), and ADHD-hostile frontend design that undermines the very principles the curriculum is built on (mitigated by enforcing "zero activation energy" as a design constraint from the first component, not a polish task). Multi-instrument over-engineering is explicitly called out as a trap to avoid — ship Evolver with hardcoded instrument references, add the instrument dimension only when Cascadia content actually exists.

## Key Findings

### Recommended Stack

The stack mirrors PM Toolkit exactly, scaled down to match the simpler domain (no database, no monorepo, no CLI). The PM Toolkit is already running this stack in production, providing HIGH confidence across all version choices. The most critical technical decision is using Next.js App Router server components for all data access — no API routes, no client-side fetching — which enables direct filesystem reads from vault content without any serialization overhead.

**Core technologies:**
- **Next.js 16 + React 19**: App Router with RSC for server-side vault reading — required, not optional; Next.js 16 mandates React 19
- **gray-matter + remark/rehype pipeline**: Frontmatter parsing and markdown rendering — industry standard, proven in PM Toolkit; JS engine must be disabled for security
- **Zod v4**: Runtime frontmatter schema validation — critical for catching content errors at parse time, not rendering time
- **Tailwind CSS v4**: CSS-first config, no tailwind.config.js, faster builds than v3
- **Radix UI (unified)**: Accessible UI primitives for progress bars, dropdowns, popovers — preferred over shadcn/ui for this simple personal tool
- **pnpm**: Matches PM Toolkit, strict dependency resolution, faster installs

**Key version constraints:** Next.js 16 requires React 19; rehype-pretty-code 0.14.x requires Shiki 4.x as peer; Zod v4 requires TypeScript 5.x.

**Explicitly avoid:** Contentlayer (abandoned 2023), next-mdx-remote (compilation overhead for pure-content sessions), Zustand/Redux (no complex client state needed), any database/ORM (flat-file reading is sufficient at this scale).

### Expected Features

The research defines a clean three-tier feature model. The vault reader is the non-negotiable foundation — every other feature depends on it. Multi-instrument route structure should be stubbed into the architecture from day one even though only Evolver ships at launch.

**Must have (table stakes — v1):**
- Vault reader (markdown + YAML frontmatter parsing) — foundation for all other features
- Session browser with module grouping — browse 35-session curriculum organized into 10 modules
- Session detail view — render full session content, exercises, output checklist
- Patch library browser — browse documented patches, filter by type
- Patch detail view with parameter tables — full parameter documentation for patch recreation
- Progress dashboard — sessions completed, patches saved, current module position
- Demo mode with bundled content — Vercel-deployable with synthetic learner data
- Responsive layout — usable on laptop next to the synthesizer

**Should have (v1.x — add after validating core works during actual practice):**
- ADHD-optimized session presentation — action-first layout, collapsed optional exploration
- Cross-session continuity — prev/next links with warm-up context
- Searchable patch parameter tables — meaningful once 10+ patches accumulate
- Session quick-reference mode — compact view for 5-minute sessions
- Audio sample playback — after recording audio examples during practice

**Defer to v2+:**
- Instrument signal flow diagram — HIGH complexity, nice-to-have visualization
- Technique guide collection — needs content volume to justify a dedicated section
- Second instrument (Cascadia) — validates the multi-instrument framework
- Progress dashboard enhancements (patch gallery, module completion celebrations)

**Anti-features (never build):** streak/calendar tracking, real-time MIDI integration, interactive synth emulation, social features, spaced repetition algorithm, automated practice reminders, complex analytics charts.

### Architecture Approach

The architecture is three layers: Obsidian vault (or bundled demo content) → content reader with Zod validation → Next.js RSC presentation layer. The content reader uses the strategy pattern with identical interfaces for both implementations (`VaultReader`, `BundledReader`), selected by config. Domain services sit above the reader and implement business logic (filter by instrument, compute progress, sort by sequence). Server components call domain services directly and pass typed props to thin client components. The web app is purely read-only — no write APIs, no database, no mutation endpoints. Obsidian is the single source of truth.

**Major components:**
1. **Config module** — reads `evolver.config.json`, determines vault path vs. demo mode, never hardcodes paths
2. **Content Reader (strategy pattern)** — `VaultReader` for local dev, `BundledReader` for Vercel; identical interface, swapped by config
3. **Zod schemas** — validate every frontmatter type at parse time; fail loudly in dev, skip gracefully in production
4. **Domain services** — `getSessions()`, `getPatches()`, `getInstruments()`, `getProgress()`; business logic layer above the reader
5. **Route handlers (RSC)** — page-level server components, no API routes, direct domain service calls
6. **Markdown renderer** — custom remark plugin for Obsidian wikilink conversion, parameter table formatting, callout support
7. **Client components** — thin interactive leaf nodes: search inputs, progress indicators, module navigation

**Key patterns to follow:** strategy pattern for content source (never hardcode vault path), Zod at content boundaries (never trust raw gray-matter output), RSC for data access (never API routes for read-only content), filesystem-driven instrument registry (instruments discovered by scanning directories, not hardcoded), progress as derived state (computed from daily notes in local mode, synthetic JSON in demo mode).

### Critical Pitfalls

1. **Vault path divergence (local vs. Vercel)** — Build the reader abstraction and `BundledReader` in Phase 1, not as an afterthought. Demo mode must be tested with `CONTENT_SOURCE=bundled` on a clean checkout from the start. Recovery if ignored: 2-3 days of codebase-wide refactoring.

2. **Frontmatter schema drift** — Define Zod schemas before writing session content and validate all files with `npm run validate-content` in CI. Silent `undefined` bugs accumulate across 35 session files without this boundary. Recovery: tedious but mechanical file-by-file fixes.

3. **Demo mode as afterthought** — Demo mode requires curated synthetic learner data (60% complete, 12 patches, modules 1-5 done) not random generation or empty dashboards. A progress dashboard showing zeros is not a demo. Build synthetic data before building the progress dashboard so the dashboard is developed against realistic content.

4. **ADHD-hostile frontend design** — The five-second test: can the user be reading their next session within 5 seconds of opening the app? Default view is the NEXT session, not a list of all 35. No streak counters. No percentages. No time-based metrics. Navigation has 3 items maximum. Enforced as a design constraint from the first component.

5. **Multi-instrument over-engineering** — Hardcode "evolver" in the vault reader for v1. No instrument selector UI, no `[instrument]` route segments, no instrument-scoped queries. The file structure already supports extensibility cheaply; the code should not pay for it until Cascadia content exists. Recovery if over-engineered: HIGH cost, touches every layer.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation (Data Layer)
**Rationale:** Everything depends on the content reader. Building UI before the reader abstraction creates coupling that is expensive to refactor. Vault path divergence (Pitfall 1) and frontmatter schema drift (Pitfall 2) must be addressed before any content is rendered. This phase produces no visible UI but is the load-bearing work.
**Delivers:** Config module, Zod schemas for all content types, `ContentReader` interface, `VaultReader` and `BundledReader` implementations, markdown processing pipeline (gray-matter + remark + wikilink plugin + callout support), `npm run validate-content` script
**Addresses:** FEATURES.md vault reader (P1), demo mode data layer (P1)
**Avoids:** Vault path divergence (Pitfall 1), frontmatter schema drift (Pitfall 2), client-side markdown parsing (anti-pattern 3), API routes for read-only content (anti-pattern 1)

### Phase 2: Core Curriculum Views
**Rationale:** Sessions are the primary content type and the most likely to reveal issues in the markdown rendering pipeline with real content. Building sessions before patches also matches the dependency graph (patch views are simpler and have no prerequisites). ADHD design constraint is enforced from the first component, not retrofitted.
**Delivers:** Session list page (grouped by modules), session detail view (full rendered content, exercises, output checklist), basic navigation shell, responsive layout foundation
**Uses:** react-markdown + remark-gfm + rehype-pretty-code + rehype-slug, Tailwind v4, Radix UI, lucide-react
**Implements:** Route handlers (RSC), server components calling domain services, thin client components for interactive elements
**Avoids:** ADHD-hostile frontend design (Pitfall 4) — five-second test enforced from first session component

### Phase 3: Patch Library
**Rationale:** Patch views are simpler than sessions (no sequencing, no prereqs, no module grouping logic) and can be built rapidly once the reader and rendering pipeline are proven. Parameter table rendering is the key technical challenge and builds on the markdown pipeline from Phase 1.
**Delivers:** Patch library browser (filterable by type), patch detail view (parameter tables, playing tips, session reference), basic search
**Uses:** Searchable patch parameter tables (P2 feature from FEATURES.md), remark plugin for parameter table formatting
**Implements:** `getPatches()` domain service, patch Zod schema validation

### Phase 4: Progress + Dashboard
**Rationale:** Progress is the most complex data access pattern (daily note scanning) and depends on all other views existing to show progress within. Synthetic demo data must be curated before this phase so the dashboard is built against realistic data. Progress metrics must enforce the guilt-free design from day one.
**Delivers:** Progress dashboard (sessions completed, patches saved, current module — additive counts only, no streaks, no percentages), daily note scanner for local progress derivation, synthetic progress JSON for demo mode (60% complete, realistic learner journey)
**Avoids:** Guilt-inducing progress tracking (Pitfall 7) — no denominators, no time-based metrics, no streak counters

### Phase 5: Demo Mode + Deployment
**Rationale:** Demo mode requires the full curriculum content plus curated synthetic data to tell a compelling story. Vercel deployment configuration (`outputFileTracingIncludes`, static generation with `generateStaticParams`) is well-documented but has specific gotchas that should be addressed as a dedicated phase, not squeezed into earlier phases.
**Delivers:** Bundled demo content directory, curated synthetic learner data, Vercel deployment configuration, `CONTENT_SOURCE=bundled` CI test, public Vercel URL
**Avoids:** Demo mode as afterthought (Pitfall 3) — synthetic data already exists from Phase 4, this phase assembles it for deployment

### Phase 6: Polish + V1.x Features
**Rationale:** With the core working and validated during actual practice sessions, these enhancements can be added with informed priorities rather than speculated ones. ADHD-optimized layout changes, session quick-reference mode, and cross-session continuity are all low-cost improvements that require knowing which parts of the basic UI create friction.
**Delivers:** ADHD-optimized session presentation (action-first layout, collapsed exploration), cross-session continuity (prev/next with warm-up context), session quick-reference mode, audio sample playback (when audio recordings exist)

### Phase Ordering Rationale

- **Foundation before UI:** The reader abstraction is the single most expensive pitfall to retrofit. It must exist before any component renders real data.
- **Sessions before patches:** Sessions are the primary content type and reveal rendering pipeline issues early. Patches are simpler and benefit from a proven pipeline.
- **Progress last among core views:** Daily note scanning is the most complex data access pattern. Building it after sessions and patches means the vault reader is already proven and stable.
- **Demo mode alongside progress, not deferred:** Synthetic learner data should exist before the progress dashboard is built so it can be developed against realistic content. The Vercel deployment itself is deferred to Phase 5 but the data layer is not.
- **Polish after validation:** V1.x features like ADHD-optimized layout and quick-reference mode are improvements to known pain points, not speculative features. They require actual practice sessions to identify which parts of the basic UI create friction.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Progress):** Daily note parsing from Obsidian is the most novel pattern — not directly demonstrated in PM Toolkit. The specific template structure and tag extraction logic will need concrete implementation research. Consider spiking this before committing to the full phase plan.
- **Phase 5 (Deployment):** Vercel `outputFileTracingIncludes` for bundled content and `generateStaticParams` behavior with the content directory need verification against the specific Next.js 16 + App Router configuration.

Phases with standard patterns (skip additional research-phase):
- **Phase 1 (Foundation):** PM Toolkit provides a direct reference implementation for the reader abstraction, Zod schemas, and gray-matter pipeline. HIGH confidence patterns.
- **Phase 2 (Session Views):** RSC + remark/rehype pipeline is well-documented and PM Toolkit-proven. Standard App Router patterns apply.
- **Phase 3 (Patch Library):** Simpler than sessions. No novel patterns. Standard list/detail with markdown rendering.
- **Phase 6 (Polish):** ADHD design principles are documented in `framework/adhd-design.md`. UI changes are low-risk and reversible.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | PM Toolkit is a running production reference with identical tech choices. All major library versions verified against npm/GitHub releases. |
| Features | HIGH | Well-scoped personal tool with clear constraints from PROJECT.md. Competitor analysis confirms what the tool does and doesn't need. Anti-features list is definitive. |
| Architecture | HIGH | Directly modeled on PM Toolkit vault reader pattern. Three-layer structure (content → reader → RSC) is well-established for this class of tool. |
| Pitfalls | HIGH | Pitfalls derived from a combination of PM Toolkit implementation experience, documented Vercel filesystem constraints, and ADHD UX literature. All are actionable with specific prevention steps. |

**Overall confidence:** HIGH

### Gaps to Address

- **Daily note progress parsing:** The exact format of Obsidian daily note session logs (tag structure, frontmatter vs. body, date format) needs verification against the actual vault files before Phase 4 is planned in detail. The data model exists in theory; the parsing implementation is unvalidated.
- **Obsidian callout rendering:** The `obsidian-callouts-markdown` library handles `> [!tip]` syntax, but session files may use additional Obsidian-specific callout variants. Test with actual session content before committing to this library as the solution.
- **Audio file strategy:** No audio files exist yet. The audio sample playback feature (P2) requires a decision about storage (public/ in repo vs. vault-only, Git LFS vs. external hosting). This gap doesn't block v1 but needs resolution before Phase 6.
- **Wikilink usage in existing sessions:** The 7 existing session files may already contain `[[wikilinks]]`. A quick audit before Phase 1 will determine whether the custom remark wikilink plugin is needed immediately or can be deferred.

## Sources

### Primary (HIGH confidence)
- PM Toolkit codebase (`/Users/andrewlovettbarron/src/pmtoolkit/`) — vault reader pattern, config pattern, content type system, demo mode implementation; running in production with identical stack
- Next.js 16.2.1 release — App Router RSC model, `generateStaticParams`, `outputFileTracingIncludes`
- gray-matter 4.0.3 (npm) — stable for years, JS engine security consideration documented
- Zod v4 release notes — v4.3.x, TypeScript 5.x requirement, improved performance over v3
- Radix UI unified package changelog — v1.4.3, React 19 compatibility confirmed

### Secondary (MEDIUM confidence)
- [Vercel: Loading Static Files in Next.js](https://vercel.com/kb/guide/loading-static-file-nextjs-api-route) — path resolution differences between dev and production
- [Francois Best: Reading files on Vercel during ISR](https://francoisbest.com/posts/2023/reading-files-on-vercel-during-nextjs-isr) — process.cwd() and file tracer behavior
- [zod-matter](https://github.com/HiDeoo/zod-matter) — Zod validation wrapper for gray-matter output
- [UXPA: Designing for ADHD in UX](https://uxpa.org/designing-for-adhd-in-ux/) — ADHD UX design principles informing anti-feature decisions
- Project's own `framework/adhd-design.md` — ADHD design principles that frontend must not violate

### Tertiary (LOW confidence)
- Competitor analysis (Syntorial, Modacity, Patchstorage) — feature landscape context; feature decisions are driven by project constraints not competitor benchmarking

---
*Research completed: 2026-03-29*
*Ready for roadmap: yes*
