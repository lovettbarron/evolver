# Pitfalls Research

**Domain:** Obsidian-backed instrument learning platform (ADHD-friendly, Next.js frontend, markdown-as-data)
**Researched:** 2026-03-29
**Confidence:** HIGH (draws on established PM Toolkit patterns, well-documented Next.js/Vercel constraints, and ADHD design literature)

## Critical Pitfalls

### Pitfall 1: Vault Path Divergence Between Local and Vercel

**What goes wrong:**
The vault reader works perfectly in development (reading from `~/song` via `fs.readFileSync` with absolute paths) but fails silently or crashes on Vercel. Vercel serverless functions run in a read-only, ephemeral environment where the user's home directory does not exist. Developers build the entire local-read pipeline, deploy, and discover nothing works.

**Why it happens:**
`process.cwd()` resolves differently on Vercel than in local dev. Absolute paths like `~/song` are meaningless in a serverless lambda. The file tracer that bundles serverless functions uses static analysis and may miss dynamically constructed paths. Developers test locally where `fs` just works and never exercise the Vercel path until deployment.

**How to avoid:**
Design the data layer as a strategy pattern from day one. Two concrete implementations:
1. `LocalVaultReader` -- reads from configurable filesystem path (local dev)
2. `BundledContentReader` -- reads from content bundled into the build at `public/demo-content/` or a `content/` directory committed to the repo

The reader interface is identical: `getSessions()`, `getPatches()`, `getProgress()`. An environment variable (`CONTENT_SOURCE=vault|bundled`) selects the implementation. Demo mode always uses `BundledContentReader`.

**Warning signs:**
- Vault reader code uses hardcoded absolute paths
- No integration test that runs without the vault directory present
- Demo mode is "planned for later" instead of built alongside the vault reader
- fs operations scattered across components instead of centralized in a reader module

**Phase to address:**
Phase 1 (foundation). The reader abstraction must exist before any UI is built on top of it. Building UI against a local-only reader creates coupling that is expensive to refactor.

---

### Pitfall 2: Frontmatter Schema Drift -- Silent Data Corruption

**What goes wrong:**
Session markdown files have YAML frontmatter (instrument, module, session number, duration, prerequisites, etc.) but no runtime validation. A typo in frontmatter (`duraton: 20`) or a missing field silently produces `undefined` values in the UI. Over time, as the curriculum grows to 35+ sessions across multiple instruments, frontmatter inconsistencies accumulate. The UI shows broken cards, missing progress data, or wrong ordering -- and the developer hunts through dozens of markdown files trying to find the bad one.

**Why it happens:**
gray-matter parses YAML into a plain object with no type checking. TypeScript types on the consuming side give a false sense of safety -- they describe what you expect, not what you have. Without Zod validation at the parsing boundary, malformed frontmatter passes through silently.

**How to avoid:**
Define Zod schemas for every content type (session, patch, instrument, progress log) and validate at parse time in the vault reader. Fail loudly in development (throw on invalid frontmatter with the filename and field). In production/demo mode, log warnings and skip invalid entries rather than crashing.

Use `zod-matter` or wrap gray-matter with Zod `.parse()` calls. The schema is the single source of truth for what frontmatter fields exist, their types, and their defaults.

Add a CLI script (`npm run validate-content`) that validates all markdown files against their schemas. Run it in CI and before build.

**Warning signs:**
- gray-matter used without any validation wrapper
- TypeScript interfaces for content types but no runtime validation
- "It works with my files" but no test with malformed frontmatter
- Content types defined in multiple places (schema, TypeScript type, UI component props)

**Phase to address:**
Phase 1 (foundation). Schemas must exist before content is written against them. Retrofitting validation onto 35 sessions is painful.

---

### Pitfall 3: Demo Mode as Afterthought -- The "Two Apps" Trap

**What goes wrong:**
Demo mode is designed as a thin veneer over the local app: "just swap the data source." But demo mode has fundamentally different requirements -- it needs synthetic practice data (progress, session logs, streak counts) that the local version gets from real Obsidian usage. Developers end up maintaining two parallel data pipelines, two sets of edge cases, and two testing matrices. Demo mode either looks broken (empty progress dashboards, zero streaks) or requires so much synthetic data scaffolding that it becomes its own mini-project.

**Why it happens:**
The mental model is "demo = local minus personal data." In reality, demo = local with fabricated personal data that tells a compelling story. A progress dashboard with all zeros is not a demo -- it is an empty shell. Generating realistic synthetic data (partially completed curriculum, realistic session dates, plausible patch names) requires thought about what "good" looks like.

**How to avoid:**
Design demo mode as a first-class content bundle:
1. Bundle all curriculum content (sessions, patches, instrument data) into the repo as static files
2. Create a `demo-data/` directory with hand-crafted synthetic progress: a learner who is 60% through the Evolver curriculum, has saved 12 patches, completed modules 1-5, with realistic session log entries
3. The `BundledContentReader` loads both curriculum content and synthetic progress data
4. Test demo mode in CI by building and running with `CONTENT_SOURCE=bundled`

The synthetic data is curated, not randomly generated. It tells the story: "This is what it looks like when someone is actively using this system."

**Warning signs:**
- Demo mode ticket is in "Phase 4" or "Polish"
- No synthetic progress data exists -- only curriculum content
- Demo mode progress dashboard shows all zeros or placeholder text
- "We'll generate random data" instead of curating a realistic learner journey

**Phase to address:**
Phase 1 for the reader abstraction, Phase 2 for synthetic data creation. Synthetic data should exist before the progress dashboard is built, so the dashboard can be developed against realistic data from the start.

---

### Pitfall 4: ADHD-Hostile Frontend Design Despite ADHD-Friendly Content

**What goes wrong:**
The session content is perfectly ADHD-optimized (zero activation energy, single objectives, time-boxed) but the web frontend undermines every principle. The session browser requires multiple clicks to find the next session. The progress dashboard is visually noisy. The patch library has too many filter options. The user must make decisions about what to do before they can start doing it -- exactly the "wall of awful" the framework is designed to prevent.

**Why it happens:**
Developers build features, not experiences. A "complete" session browser has search, filters, sorting, tags, and view modes. A "complete" progress dashboard has charts, streaks, calendars, and statistics. Each feature is individually reasonable but collectively creates decision fatigue. The content design principles in `framework/adhd-design.md` are not applied to the frontend design.

**How to avoid:**
The frontend must answer one question immediately on load: "What should I do right now?" This means:
1. The default view is the NEXT session, not a list of ALL sessions. One prominent card: "Session 12: Filter Envelope" with a single "Start" action.
2. Progress is a single visual (progress bar or fraction: "12/35 sessions") not a dashboard of metrics.
3. The patch library is browse-first (show all patches in a simple list) with search as progressive enhancement, not the primary interaction.
4. Navigation has 3 items maximum: Sessions, Patches, Progress. No settings page, no profile, no preferences.

Apply the same "zero activation energy" test to the frontend: Can the user be reading their next session within 5 seconds of opening the app?

**Warning signs:**
- Session browser defaults to a grid/list of all 35 sessions
- More than 3 navigation items
- Any page with more than one primary action button
- Filter/sort controls visible by default (not behind a toggle)
- Dashboard with more than 3 metrics visible simultaneously

**Phase to address:**
Phase 2 (frontend). Must be a design constraint from the first component, not retrofitted after a "full-featured" UI is built.

---

### Pitfall 5: Multi-Instrument Extensibility That Blocks Single-Instrument Shipping

**What goes wrong:**
The framework is designed to support multiple instruments (Evolver now, Cascadia later). Developers over-engineer the data model, folder structure, component hierarchy, and routing to accommodate hypothetical future instruments. The abstraction adds complexity to every feature: every query needs an instrument filter, every route needs an instrument segment, every component needs instrument-aware props. Shipping the Evolver curriculum takes 2x longer because everything is built "for the general case."

**Why it happens:**
The PROJECT.md explicitly calls out multi-instrument support. The existing file structure already has `instruments/<name>/`, `sessions/<instrument>/`, `patches/<instrument>/`. It feels irresponsible to build a single-instrument app when the data model already supports multiple. But premature abstraction is the enemy of shipping.

**How to avoid:**
Build for Evolver only. Use the instrument directory structure that already exists (it is cheap and good) but do not build instrument selection UI, instrument-aware routing, or instrument-scoped queries until the second instrument is actually being added. Specifically:
1. Hardcode "evolver" as the instrument in the vault reader for v1
2. No instrument selector dropdown in the UI
3. No `/instruments/[slug]` route -- just `/sessions`, `/patches`, `/progress`
4. When Cascadia is added, THEN refactor to add the instrument dimension

The file structure supports extensibility. The code should not pay for it until needed.

**Warning signs:**
- Instrument selector component exists before Cascadia content exists
- Route structure includes `[instrument]` segments
- Every data query accepts an `instrument` parameter
- Discussions about "how should the instrument model work" before Evolver is shipped

**Phase to address:**
All phases -- as a constraint. "Single instrument until we ship" should be a project-level guardrail.

---

### Pitfall 6: Markdown Rendering Inconsistencies Between Obsidian and Next.js

**What goes wrong:**
Sessions are authored in Obsidian, which supports a superset of standard markdown: `[[wikilinks]]`, `![[embedded notes]]`, callout blocks (`> [!tip]`), Dataview queries, and Obsidian-specific YAML properties. The Next.js frontend uses remark/rehype to render the same markdown, but these Obsidian-specific syntaxes render as broken text, raw markup, or are silently dropped. The session content looks polished in Obsidian but degraded in the web app.

**Why it happens:**
Obsidian markdown is not standard CommonMark. Developers test rendering with simple markdown and miss the edge cases. The content authors (same person in this case) use Obsidian features unconsciously -- a `[[basic-patch]]` wikilink in a session feels natural but breaks on the web.

**How to avoid:**
1. Define a "web-safe markdown subset" -- standard CommonMark + GFM tables + YAML frontmatter. No wikilinks, no callouts, no embeds, no Dataview.
2. Add a lint rule or validation script that flags Obsidian-specific syntax in session files destined for web rendering.
3. If wikilinks are genuinely useful, write a custom remark plugin to transform `[[basic-patch]]` into a proper markdown link `[basic-patch](/instruments/evolver/basic-patch)`. This is a bounded problem.
4. Keep Obsidian-only content (daily notes, personal reflections, Dataview dashboards) in a separate vault area that the vault reader ignores.

**Warning signs:**
- Session files contain `[[double bracket links]]`
- Callout syntax (`> [!note]`) used in session content
- No test that renders every session file and checks for raw/unrendered markup
- Markdown rendering tested with a "hello world" file, not with actual session content

**Phase to address:**
Phase 1 (foundation). The markdown rendering pipeline and content authoring constraints must be established before 35 sessions are written. Retroactively cleaning Obsidian-specific syntax from existing content is tedious but manageable at 7 sessions; painful at 35.

---

### Pitfall 7: Progress Tracking That Creates Guilt Instead of Motivation

**What goes wrong:**
The progress tracking system inadvertently reintroduces the exact psychology the ADHD framework is designed to avoid. A streak counter punishes missed days. A percentage complete ("14% done") emphasizes how far you have to go. A "last practiced" date highlights how long it has been. The tracking system, meant to provide "visible progress" dopamine, instead triggers shame spirals when the user takes a break.

**Why it happens:**
Progress tracking patterns are borrowed from fitness apps, language learning apps (Duolingo), and habit trackers -- all designed for neurotypical consistency psychology. Streaks work for some brains; for ADHD brains, a broken streak is a reason to quit entirely. The framework document explicitly warns against calendar-based scheduling but the progress UI can reintroduce time-based shame through the back door.

**How to avoid:**
Progress metrics must be purely additive and sequence-based:
1. Show "12 sessions completed" not "12/35 (34%)" -- the denominator creates pressure
2. Show "Module 4: Filters" as current position, not "3 modules remaining"
3. No streak counter. No "last practiced" date. No "days since" anything.
4. Show the patch library count growing: "8 patches saved" -- this is accumulation, not completion pressure
5. If showing a timeline, show it as a filled bar of what IS done, not an empty bar of what ISN'T
6. The session log template already avoids dates by design -- the web UI must follow this principle

**Warning signs:**
- Any metric that includes a denominator or percentage
- Any time-based metric (streak, last active, days since)
- Progress visualization that emphasizes the empty/remaining portion
- Comparison to any external standard ("most learners complete in 10 weeks")

**Phase to address:**
Phase 2 (frontend, progress dashboard). Must be a design constraint from the first wireframe, reviewed against `framework/adhd-design.md` principles.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding vault path `~/song` | Fast local dev setup | Breaks for any other user, breaks on Vercel | Never -- use env var from day one |
| Skipping Zod validation on frontmatter | Faster vault reader implementation | Silent data bugs accumulate with every new session file | Never -- schemas are cheap to write upfront |
| Rendering markdown with `dangerouslySetInnerHTML` | Quick rendering without remark/rehype pipeline | XSS risk, no control over rendering, no plugin system | Never -- use remark/rehype from the start |
| Single flat list for all content types | Simple data model | Cannot distinguish sessions from patches from instrument docs when querying | MVP only -- add content type discrimination before second instrument |
| Client-side markdown parsing | Works without server components | Re-parses on every render, slow on mobile, exposes raw content to client bundle | Never -- server components exist for this |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Obsidian vault | Reading the entire vault recursively including `.obsidian/`, daily notes, templates | Explicit allowlist of directories to read: `sessions/`, `patches/`, `instruments/`. Ignore everything else. |
| Vercel deployment | Using `fs` at runtime expecting the vault to exist | Bundle demo content at build time. Use `generateStaticParams` for static generation of curriculum pages. |
| gray-matter | Trusting parsed output without validation | Wrap in Zod schema validation. Handle parse errors per-file, not globally. |
| Audio files | Committing audio recordings to git | Store audio in `public/audio/` for demo, reference by URL. Local audio stays in the vault, not in the repo. Large files should use Git LFS or external storage. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Reading all vault files on every request | Slow page loads, high serverless function duration | Use static generation (`generateStaticParams`) for curriculum pages. Cache parsed content. | Immediate -- 35 session files + patches + instruments = noticeable delay per request |
| No content caching in dev | Hot reload re-parses all markdown on every save | Cache parsed content in a module-level Map, invalidate on file change | Annoying during development with 50+ content files |
| Large frontmatter objects | Serializing full parameter dumps (synth patches with 100+ parameters) to client | Keep patch parameter data server-side, pass only display fields to client components | When patch library grows past 20 entries with full parameter tables |
| Unoptized audio file serving | Audio examples loaded eagerly, blocking page render | Lazy-load audio, use `<audio preload="none">`, serve compressed formats (OGG/MP3, not WAV) | When sessions include audio examples (modules 6+) |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Vault reader path traversal | Malicious content path reads arbitrary system files | Validate and sanitize all file paths. Restrict reads to allowlisted directories. Resolve symlinks. |
| Exposing vault structure in demo mode | Personal file organization, note titles, or vault metadata leak to public demo | Demo mode reads ONLY from bundled content, never from the vault. No directory listing endpoints. |
| Personal practice data in git | Session logs with dates, mood tracking, personal reflections committed to a public repo | `.gitignore` the entire Obsidian session log directory. Only curriculum content (sessions, patches, instruments) is committed. Progress/logs stay in the private vault. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Session browser as a wall of 35 items | Decision paralysis -- which one do I do? | Default to "next session" with a single action. Full list is secondary navigation. |
| Patch library with complex filters | Activation energy to find a patch exceeds benefit | Simple chronological list with search. Tags as progressive enhancement. |
| Progress page with multiple chart types | Cognitive overload, self-comparison anxiety | Single metric: sessions completed. Patch count as secondary. |
| Requiring session completion to mark progress | Perfectionism gate -- partial sessions feel like failure | Allow marking sessions "in progress" and "revisiting." Any engagement counts. |
| Separate "start" and "view" actions for sessions | Extra decision: "Am I starting or just looking?" | One action: "Open session." Progress tracking is implicit (you opened it = you started it). |

## "Looks Done But Isn't" Checklist

- [ ] **Vault reader:** Works locally but test with `CONTENT_SOURCE=bundled` on a clean checkout with no vault directory present
- [ ] **Session rendering:** Renders the simplest session, but test with session 19 (effects/delay) which likely has parameter tables, audio references, and cross-session links
- [ ] **Demo mode:** Shows curriculum content, but verify progress dashboard shows realistic synthetic data, not zeros
- [ ] **Multi-instrument:** File structure supports it, but verify no code assumes `evolver/` is the only subdirectory (will break silently when Cascadia is added)
- [ ] **Frontmatter validation:** Schema exists, but verify it runs on ALL content files including patches and instrument docs, not just sessions
- [ ] **Mobile responsive:** Session list looks fine, but test session CONTENT rendering -- parameter tables in markdown often overflow on mobile
- [ ] **Audio integration:** Audio player component works, but verify graceful fallback when audio file is missing (common for sessions not yet practiced)

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Vault path hardcoded everywhere | MEDIUM | Extract to env var, create reader abstraction, update all callsites. Manageable if caught before UI layer depends on path format. |
| No frontmatter validation (30+ files with inconsistencies) | MEDIUM | Write schema, run validation, fix files one by one. Tedious but mechanical. Worse if UI has adapted to inconsistencies. |
| Demo mode not designed in | HIGH | Retrofitting a second data source into a codebase built for one requires touching every data-fetching component. Plan for 2-3 days of refactoring. |
| ADHD-hostile progress UI already built | LOW | UI changes are cheap. Removing streak counter, changing framing from "remaining" to "completed" is a few hours of work. But requires admitting the first design was wrong. |
| Obsidian-specific markdown in 35 session files | MEDIUM | Write a codemod/script to convert wikilinks to standard links, remove callouts. Takes a few hours but requires manual review of each conversion. |
| Over-engineered multi-instrument abstraction | HIGH | Removing abstraction is harder than adding it. Instrument-scoped routing, queries, and components create coupling throughout the codebase. Simplifying requires touching every layer. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Vault path divergence | Phase 1 (data layer) | Build succeeds and renders content with `CONTENT_SOURCE=bundled` and no vault directory |
| Frontmatter schema drift | Phase 1 (data layer) | `npm run validate-content` passes on all existing content files |
| Demo mode as afterthought | Phase 1 (abstraction) + Phase 2 (synthetic data) | Demo deployment on Vercel shows populated progress dashboard |
| ADHD-hostile frontend | Phase 2 (frontend) | Five-second test: open app, is the next session immediately visible? |
| Multi-instrument over-engineering | All phases (constraint) | No code references "instrument" as a variable/parameter -- Evolver is hardcoded until Cascadia |
| Markdown rendering gaps | Phase 1 (rendering pipeline) | Every existing session file renders without raw markup or broken syntax in the web UI |
| Guilt-inducing progress tracking | Phase 2 (progress dashboard) | No metric shows a denominator, percentage, streak, or time-since value |

## Sources

- [Vercel: Loading Static Files in Next.js](https://vercel.com/kb/guide/loading-static-file-nextjs-api-route) -- path resolution differences between dev and production
- [Next.js Discussion #50244: filesystem packages in server components](https://github.com/vercel/next.js/discussions/50244) -- confirmed fs access patterns in App Router
- [Francois Best: Reading files on Vercel during ISR](https://francoisbest.com/posts/2023/reading-files-on-vercel-during-nextjs-isr) -- process.cwd() and file tracer behavior
- [zod-matter: Typesafe front matter](https://github.com/HiDeoo/zod-matter) -- Zod validation for gray-matter output
- [UXPA: Designing for ADHD in UX](https://uxpa.org/designing-for-adhd-in-ux/) -- ADHD UX design principles
- [Monster Math: ADHD-Friendly App Design](https://www.monstermath.app/blog/adhd-friendly-app-design-what-to-look-for-and-what-to-avoid) -- what to avoid in ADHD app design
- [UX Collective: Software accessibility for ADHD](https://uxdesign.cc/software-accessibility-for-users-with-attention-deficit-disorder-adhd-f32226e6037c) -- cognitive load and attention considerations
- [eLearning Industry: Top Mistakes in eLearning Course Development](https://elearningindustry.com/top-mistakes-to-avoid-when-developing-elearning-courses) -- curriculum design pitfalls
- [Userpilot: Demo Content 101](https://userpilot.com/blog/demo-content/) -- demo content best practices
- Project's own `framework/adhd-design.md` -- ADHD design principles that the frontend must not violate

---
*Pitfalls research for: Obsidian-backed instrument learning platform (ADHD-friendly, Next.js, markdown-as-data)*
*Researched: 2026-03-29*
