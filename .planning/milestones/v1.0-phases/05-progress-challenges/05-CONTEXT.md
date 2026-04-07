# Phase 5: Progress + Challenges - Context

**Gathered:** 2026-03-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Users see guilt-free additive progress metrics and can complete challenge exercises that produce documented patches. This phase adds a progress dashboard that derives completion state from Obsidian daily notes, challenge callouts in session markdown, and a challenge response flow that links patches to their originating challenges. No streaks, no percentages, no time-based guilt metrics.

</domain>

<decisions>
## Implementation Decisions

### Progress dashboard
- **Dedicated page** at `/instruments/[slug]/progress` with a "Progress" nav link added to the nav bar
- **Four additive counts**: sessions completed, patches created, modules done, challenges completed — no streaks, no percentages, no time-based metrics (PROG-04)
- **Module completion** displayed as simple filled/unfilled dots — 10 dots in a row, filled for complete modules, unfilled for incomplete. Minimal, at-a-glance
- A module is "done" when all its sessions are marked complete
- **Empty state**: encouraging nudge — "Start your first session" with a direct link to Session 1. Warm, not preachy, one action to take

### Daily note parsing
- **Tag-based scanning** of ~/song vault daily notes: app looks for `#instrument-practice` and `#session-XX` tags matching the existing session-log-template format
- **Binary completion**: if `#session-06` appears in any daily note, Session 6 is complete. No partial states, no judgment
- **Scan on page load**: progress page reads daily notes when visited. Consistent with the vault reader pattern (file I/O on request). No background watchers or caching
- **Patch count from library only**: count comes from `listPatches()` in the content reader, not from daily note fields. Daily notes track sessions; the library tracks patches
- In **demo mode** (no vault path), use synthetic completion data to show a realistic progress state

### Challenge exercises
- **Callout blocks in session markdown**: challenges appear as `> [!challenge]` callouts embedded in the session flow. Rendered with visually distinct styling (accent color, challenge-specific icon/treatment)
- **Goal + reference patch**: each challenge describes what to create plus a `[[patch-name]]` wikilink to a reference patch to approximate. Clear target, clear starting point
- **Recipe + creation sessions only**: challenges on sessions that produce patches (primarily Modules 7-10). Earlier modules focus on learning fundamentals, not yet creating
- **Wikilink to target patch**: challenge callout includes `[[patch-name]]` linking to the patch detail page. Obsidian-native format, already supported by the rendering pipeline

### Challenge responses
- **Regular patch save + challenge_id field**: user saves a patch normally (via MIDI capture or manual creation). PatchSchema gets an optional `challenge_id` field linking to the originating challenge. No separate save flow needed
- **Linked patch = complete**: if any patch has a `challenge_id` pointing to a challenge, that challenge is complete. Binary, like session completion
- **Patches in the regular library**: challenge response patches appear in the patch library like any other patch. The `challenge_id` field enables provenance display in the UI
- **Separate challenge count** on the progress page: four counts total (sessions, patches, modules, challenges). Distinguishes learning from creating

### Claude's Discretion
- Progress page layout details (spacing, typography, responsive behavior)
- Challenge callout styling (icon, border, background treatment within design system tokens)
- Daily note scanning implementation (glob pattern, regex for tag extraction)
- Synthetic demo data for progress (which sessions/challenges to mark complete for a realistic 60% journey)
- How to handle malformed or missing daily notes gracefully
- Mobile responsive behavior for the progress page
- Whether to add challenge completion indicators inline on the session browse page

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Daily note format
- `obsidian/session-log-template.md` — Session log template with `#instrument-practice #session-XX` tags, instrument/duration/patch/mood fields. Defines the contract for what the app scans

### Content pipeline and schemas
- `src/lib/content/schemas.ts` — PatchSchema (needs `challenge_id` optional field), SessionSchema (has `output_type` enum useful for identifying challenge-eligible sessions)
- `src/lib/content/reader.ts` — Content reader with `listPatches()`, `listSessions()` — data layer for counts
- `src/lib/content/types.ts` — TypeScript types derived from schemas
- `src/lib/sessions.ts` — `groupByModule()` utility — needed for module completion calculation
- `src/lib/patches.ts` — `PatchWithMeta` type, `groupByType` — patch counting utilities
- `src/lib/config.ts` — Config loader for vault path / demo mode detection

### Existing UI patterns
- `src/components/nav.tsx` — Nav component (needs "Progress" link added)
- `src/components/hero-card.tsx` — Landing hero card (empty state can reference similar patterns)
- `src/app/globals.css` — Tailwind theme tokens (bg, surface, text, muted, accent)

### Session content (challenge targets)
- `sessions/evolver/` — All 35 sessions; recipe/creation sessions (Modules 7-10) get challenge callouts
- `instruments/evolver/modules.md` — Module map showing which sessions produce patches (identifies challenge-eligible sessions)
- `src/content/patches/evolver/` — 16 demo patches (challenge wikilinks reference these)

### Project context
- `.planning/REQUIREMENTS.md` — PROG-01 through PROG-04, CHAL-01 through CHAL-04 requirements
- `.planning/PROJECT.md` — ADHD constraints, vault-as-source-of-truth philosophy, demo/local split

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/reader.ts`: `listSessions()`, `listPatches()` — data layer for all counts
- `src/lib/sessions.ts`: `groupByModule()` — groups sessions by module, needed for module completion dots
- `src/lib/patches.ts`: `PatchWithMeta`, `groupByType` — patch counting and grouping
- `src/lib/config.ts`: Config loader with vault path detection — determines whether to scan real vault or use demo data
- `src/lib/markdown/processor.ts`: Markdown rendering pipeline — already handles callouts (`> [!tip]`), needs `> [!challenge]` callout type added
- `src/components/nav.tsx`: Nav component — add "Progress" link
- `src/components/sticky-header.tsx`: Reusable sticky header for the progress page

### Established Patterns
- Server components for data loading, client components for interactivity
- Instrument-scoped routing: `/instruments/[slug]/progress`
- Tailwind-only styling via CSS custom properties (no hardcoded colors)
- Content validated via Zod at parse time with `.passthrough()` for Obsidian tolerance
- Callout rendering already supported in markdown pipeline (extend for challenge type)

### Integration Points
- Route: `/instruments/[slug]/progress` (new page)
- Nav component: add "Progress" link
- PatchSchema: add optional `challenge_id` field
- Markdown pipeline: add `> [!challenge]` callout type with distinct styling
- Daily note reader: new utility to scan vault daily notes for session tags (no existing code for this)
- Session markdown files: add challenge callout blocks to recipe/creation sessions
- Demo mode: synthetic progress data (completion flags, challenge responses)

</code_context>

<specifics>
## Specific Ideas

- Progress dashboard should feel like a "quiet celebration" — you glance at it and feel good about what you've done, never bad about what you haven't
- Module dots as a visual journey map — filled dots show progress through the curriculum without implying urgency
- Challenge callouts should feel like "bonus missions" in the session flow — exciting, not obligatory
- The wikilink-to-reference-patch pattern keeps challenges grounded in concrete targets, not vague prompts
- Binary completion everywhere (tag = done, linked patch = done) eliminates decision fatigue about "did I do enough"

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-progress-challenges*
*Context gathered: 2026-03-30*
