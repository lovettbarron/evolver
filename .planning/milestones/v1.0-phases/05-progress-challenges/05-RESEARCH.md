# Phase 5: Progress + Challenges - Research

**Researched:** 2026-03-30
**Domain:** Progress dashboard (Obsidian daily note parsing, additive metrics), challenge callouts in session markdown, challenge-linked patch saving
**Confidence:** HIGH

## Summary

Phase 5 adds two interconnected features to the Evolver app: (1) a progress dashboard at `/instruments/[slug]/progress` that displays additive metrics derived from Obsidian daily notes and the patch library, and (2) challenge exercises embedded as callout blocks in recipe/creation sessions with patches linkable back to their originating challenges.

The technical surface is well-understood. Daily note scanning is the only novel pattern -- reading files from `~/song` vault with glob-based discovery and regex tag extraction. The rest builds on established patterns: new Next.js server component route, schema extension with an optional field, rehype-callouts plugin configuration for a custom `[!challenge]` type, and Tailwind-only UI components following the existing design system. All data is derived on page load (no caching, no background processes), consistent with the vault reader pattern used throughout.

**Primary recommendation:** Structure implementation as three waves -- (1) data layer (schema changes, daily note scanner, progress computation), (2) progress dashboard page + nav link, (3) challenge callouts in sessions + challenge content authoring.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Dedicated page at `/instruments/[slug]/progress` with "Progress" nav link
- Four additive counts: sessions completed, patches created, modules done, challenges completed -- no streaks, no percentages, no time-based metrics (PROG-04)
- Module completion displayed as filled/unfilled dots -- 10 dots in a row
- A module is "done" when all its sessions are marked complete
- Empty state: encouraging nudge with direct link to Session 1
- Tag-based scanning of ~/song vault daily notes: `#instrument-practice` and `#session-XX` tags
- Binary completion: if `#session-06` appears in any daily note, Session 6 is complete
- Scan on page load, no background watchers or caching
- Patch count from `listPatches()` only, not from daily note fields
- In demo mode (no vault path), use synthetic completion data
- Callout blocks in session markdown: `> [!challenge]` callouts
- Goal + reference patch: each challenge describes what to create plus a `[[patch-name]]` wikilink
- Recipe + creation sessions only (Modules 7-10)
- PatchSchema gets optional `challenge_id` field
- Linked patch = complete (binary)
- Challenge response patches appear in the regular library
- Separate challenge count on the progress page

### Claude's Discretion
- Progress page layout details (spacing, typography, responsive behavior)
- Challenge callout styling (icon, border, background treatment within design system tokens)
- Daily note scanning implementation (glob pattern, regex for tag extraction)
- Synthetic demo data for progress (which sessions/challenges to mark complete for a realistic 60% journey)
- How to handle malformed or missing daily notes gracefully
- Mobile responsive behavior for the progress page
- Whether to add challenge completion indicators inline on the session browse page

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROG-01 | User sees module completion status (additive count, no streaks) | Module completion computed from groupByModule + daily note scan; displayed as dot indicators |
| PROG-02 | App scans ~/song daily notes for session log entries (tag-based) | New `scanDailyNotes()` utility using glob + regex for `#session-XX` tags |
| PROG-03 | Dashboard shows additive metrics: sessions completed, patches created, modules done | Server component aggregates from daily note scan + listPatches() + groupByModule() |
| PROG-04 | No streak counters, no "days since", no guilt-inducing metrics | Enforced by design -- only additive counts, no temporal data tracked |
| CHAL-01 | Sessions include challenge exercises ("create a patch that does X") | `> [!challenge]` callout blocks added to Modules 7-10 session markdown files |
| CHAL-02 | User can save challenge responses as patches linked to the challenge | Optional `challenge_id` field on PatchSchema, saved via existing patch creation flow |
| CHAL-03 | Challenges reference audio examples or saved patches as targets | `[[patch-name]]` wikilinks in challenge callouts to existing demo patches |
| CHAL-04 | Challenge completion tracked as part of progress | Count derived from patches with non-null `challenge_id` matching known challenges |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.x | App framework, server components for data loading | Already in use |
| Zod | 3.23.x | Schema validation with `.passthrough()` | Already validates all frontmatter |
| rehype-callouts | 2.1.2 | Obsidian-style callout rendering | Already in pipeline, supports custom callout types via config |
| glob | 11.x | File discovery for daily note scanning | Already used in content reader |
| gray-matter | 4.x | Frontmatter parsing (not needed for daily notes -- raw text scan) | Already in use |
| lucide-react | 1.7.x | Icons (Target icon for challenge callouts) | Already in use |
| Tailwind CSS | 4.2.x | Styling via CSS custom properties | Already in use |

### Supporting (no new packages needed)
No new packages are required. All functionality can be built with the existing stack. The daily note scanner uses Node.js `fs/promises` + `glob` (already installed). The challenge callout uses `rehype-callouts` configuration (already installed).

**Installation:** No new packages needed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── content/
│   │   ├── schemas.ts          # Add challenge_id to PatchSchema
│   │   └── reader.ts           # No changes needed
│   ├── progress.ts             # NEW: scanDailyNotes(), computeProgress()
│   ├── sessions.ts             # Existing groupByModule() reused
│   ├── patches.ts              # Existing, reused for patch counting
│   └── markdown/
│       └── processor.ts        # Configure rehype-callouts with challenge type
├── components/
│   ├── nav.tsx                 # Add "Progress" link
│   ├── count-card.tsx          # NEW: single count display card
│   ├── module-journey.tsx      # NEW: 10-dot module progress display
│   └── empty-progress.tsx      # NEW: empty state with CTA
├── app/
│   └── instruments/
│       └── [slug]/
│           └── progress/
│               └── page.tsx    # NEW: progress dashboard page
└── content/
    ├── sessions/evolver/       # Add [!challenge] callouts to Modules 7-10
    └── patches/evolver/        # Existing demo patches (challenge targets)
```

### Pattern 1: Daily Note Scanner
**What:** A utility function that reads Obsidian daily notes from the vault path and extracts session completion state by scanning for `#session-XX` tags.
**When to use:** Called from the progress page server component on each page load.
**Example:**
```typescript
// src/lib/progress.ts
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

interface CompletedSessions {
  sessionNumbers: Set<number>;
}

/**
 * Scan daily notes in the vault for #session-XX tags.
 * Returns a set of completed session numbers.
 */
export async function scanDailyNotes(vaultPath: string): Promise<CompletedSessions> {
  // Obsidian daily notes typically live in a top-level or configurable directory
  // Common patterns: YYYY-MM-DD.md in root, or Daily Notes/YYYY-MM-DD.md
  const pattern = path.join(vaultPath, '**/*.md');
  const files = await glob(pattern);

  const sessionNumbers = new Set<number>();
  // Regex matches #session-01 through #session-99 (or beyond)
  const sessionTagRegex = /#session-(\d+)/g;

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      // Only process files that have the instrument-practice tag
      if (!content.includes('#instrument-practice')) continue;

      let match: RegExpExecArray | null;
      while ((match = sessionTagRegex.exec(content)) !== null) {
        sessionNumbers.add(parseInt(match[1], 10));
      }
      // Reset regex lastIndex for next file
      sessionTagRegex.lastIndex = 0;
    } catch {
      // Skip unreadable files gracefully
    }
  }

  return { sessionNumbers };
}
```

### Pattern 2: Progress Computation (Server Component)
**What:** A function that aggregates all progress data from multiple sources into a single object for the dashboard.
**When to use:** Called once in the progress page server component.
**Example:**
```typescript
// src/lib/progress.ts (continued)
import { listSessions, listPatches } from './content/reader';
import { groupByModule } from './sessions';
import type { AppConfig } from './content/schemas';

export interface ProgressData {
  sessionsCompleted: number;
  patchesCreated: number;
  modulesDone: number;
  challengesCompleted: number;
  totalModules: number;
  moduleCompletionMap: Array<{ module: string; complete: boolean }>;
}

export async function computeProgress(
  instrument: string,
  config: AppConfig,
  completedSessionNumbers: Set<number>,
): Promise<ProgressData> {
  const [sessions, patches] = await Promise.all([
    listSessions(instrument, config),
    listPatches(instrument, config),
  ]);

  const modules = groupByModule(sessions);

  const moduleCompletionMap = modules.map(({ module, sessions: moduleSessions }) => ({
    module,
    complete: moduleSessions.every(s => completedSessionNumbers.has(s.data.session_number)),
  }));

  const challengesCompleted = patches.filter(
    p => p.data.challenge_id != null
  ).length;

  return {
    sessionsCompleted: completedSessionNumbers.size,
    patchesCreated: patches.length,
    modulesDone: moduleCompletionMap.filter(m => m.complete).length,
    challengesCompleted,
    totalModules: modules.length,
    moduleCompletionMap,
  };
}
```

### Pattern 3: Synthetic Demo Data
**What:** When no vault path is configured (demo mode), provide realistic synthetic completion data.
**When to use:** Progress page in demo mode (Vercel deployment).
**Example:**
```typescript
// src/lib/progress.ts (continued)
export function getSyntheticCompletedSessions(): Set<number> {
  // Simulate ~60% journey: Modules 1-6 complete (sessions 1-22),
  // plus a few from Module 7 (sessions 23-24)
  return new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ]);
}
```

### Pattern 4: rehype-callouts Custom Type
**What:** Configure rehype-callouts to recognize `[!challenge]` as a custom callout type with distinct styling.
**When to use:** In the markdown processor configuration.
**Example:**
```typescript
// In processor.ts, update the rehypeCallouts usage:
.use(rehypeCallouts, {
  callouts: {
    challenge: {
      title: 'Challenge',
      indicator: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    },
  },
})
```
Note: The SVG above is the Lucide "Target" icon inlined. rehype-callouts expects an SVG string for the indicator. The existing `.callout` CSS in globals.css will apply to challenge callouts automatically (bg-surface, 3px left border in accent). For challenge-specific differentiation, add a `.callout[data-callout="challenge"]` selector in globals.css.

### Pattern 5: PatchSchema Extension
**What:** Add an optional `challenge_id` field to PatchSchema.
**When to use:** Schema change for CHAL-02.
**Example:**
```typescript
// In schemas.ts, add to PatchSchema:
export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
  challenge_id: z.string().optional(), // Links patch to originating challenge
}).passthrough();
```

### Anti-Patterns to Avoid
- **Temporal metrics:** Never introduce streaks, "days since last session", or percentage completion. This violates PROG-04 and the ADHD-friendly philosophy.
- **Background watchers / file system polling:** No fs.watch or interval-based scanning. Scan on page load only. Consistent with vault reader pattern.
- **Caching daily note results:** No caching layer. Files are read fresh on each page load. The vault is the source of truth.
- **Complex completion states:** No partial completion, no "in progress" states. Binary only: done or not done.
- **Hardcoded colors:** All colors via CSS custom properties (--color-accent, --color-surface, --color-muted). Never hex values in component code.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Callout rendering | Custom markdown AST visitor for `> [!challenge]` | rehype-callouts with `callouts` config option | Already handles Obsidian syntax, supports custom types via config |
| File discovery | Custom recursive directory walker | `glob` package (already installed) | Handles edge cases, symlinks, ignore patterns |
| Module grouping | Custom session-to-module mapping | Existing `groupByModule()` in sessions.ts | Already built and tested |
| Patch counting | Custom file counter | Existing `listPatches()` in reader.ts | Already reads and validates all patches |
| Wikilink resolution | Custom `[[patch-name]]` parser | remark-wiki-link (already in pipeline) | Already configured with href template |

**Key insight:** The vast majority of this phase's data layer already exists. The novel work is (1) the daily note scanner, (2) the progress aggregation function, and (3) UI components for the dashboard.

## Common Pitfalls

### Pitfall 1: Regex Tag Extraction Edge Cases
**What goes wrong:** The `#session-06` tag might appear in code blocks, frontmatter, or non-practice contexts, leading to false positives.
**Why it happens:** Raw regex scanning of markdown without context awareness.
**How to avoid:** First check that the file contains `#instrument-practice` (confirming it is a practice log entry). This gate eliminates most false positives. The template format places tags at the bottom of a section, making code block collisions extremely unlikely for this vault.
**Warning signs:** Session counts higher than expected in testing.

### Pitfall 2: Glob Pattern Too Broad for Daily Notes
**What goes wrong:** Scanning `**/*.md` across the entire vault could read hundreds of files (session content, literature notes, templates) when only daily notes contain practice logs.
**Why it happens:** Obsidian vaults contain many markdown files.
**How to avoid:** The `#instrument-practice` filter is the primary gate -- even if many files are read, only those with the tag are processed for session numbers. For performance, consider narrowing the glob to common daily note locations (`Daily Notes/*.md`, `*.md` in root) but make it configurable or try multiple patterns.
**Warning signs:** Progress page load time noticeably slow (> 1s).

### Pitfall 3: Session Number Mismatch Between Tags and Schema
**What goes wrong:** Tags use `#session-06` (zero-padded) but schema uses `session_number: 6` (integer). Parsing `parseInt('06')` correctly yields `6`, but inconsistent padding in user-written daily notes (`#session-6` vs `#session-06`) could miss completions.
**Why it happens:** The template uses `#session-{{session_number}}` which may or may not zero-pad.
**How to avoid:** The regex `/#session-(\d+)/g` captures one or more digits and `parseInt` normalizes both `06` and `6` to `6`. This is robust to padding variation.
**Warning signs:** Sessions showing as incomplete when the user has logged them.

### Pitfall 4: Challenge ID Naming Convention
**What goes wrong:** If `challenge_id` values in patch frontmatter don't match the challenge identifiers in session markdown, the linkage breaks silently.
**Why it happens:** No enforced naming convention between session callouts and patch metadata.
**How to avoid:** Use a consistent `challenge_id` format: `{session_number}-{challenge_index}` (e.g., `27-1` for the first challenge in Session 27). Document the convention. The progress computation counts patches with any non-null `challenge_id`, so exact matching only matters for provenance display, not for the count.
**Warning signs:** Challenge count stays at 0 even after saving patches with challenge_id.

### Pitfall 5: Demo Mode Needs All Data Sources Synthetic
**What goes wrong:** In demo mode, daily note scanning fails because there is no vault path, but the progress page tries to call `scanDailyNotes()` anyway.
**Why it happens:** Incomplete branching in the progress page server component.
**How to avoid:** Check `config.vaultPath` first. If absent, use `getSyntheticCompletedSessions()` for session completion data. Patch count comes from `listPatches()` which already works in demo mode (reads bundled content). Add a few demo patches with `challenge_id` set for realistic challenge counts.
**Warning signs:** Progress page crashes in demo mode.

## Code Examples

### Progress Page Server Component
```typescript
// src/app/instruments/[slug]/progress/page.tsx
import { loadConfig } from '@/lib/config';
import { computeProgress, scanDailyNotes, getSyntheticCompletedSessions } from '@/lib/progress';
import { CountCard } from '@/components/count-card';
import { ModuleJourney } from '@/components/module-journey';
import { EmptyProgressState } from '@/components/empty-progress';

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();

  // Determine completed sessions
  const completedSessions = config.vaultPath
    ? (await scanDailyNotes(config.vaultPath)).sessionNumbers
    : getSyntheticCompletedSessions();

  const progress = await computeProgress(slug, config, completedSessions);

  // Empty state check
  if (progress.sessionsCompleted === 0 && progress.patchesCreated === 0) {
    return <EmptyProgressState slug={slug} />;
  }

  return (
    <main className="max-w-[640px] mx-auto px-lg pt-2xl pb-3xl">
      <h2 className="text-[24px] font-bold mb-xl">Your Progress</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-md sm:gap-xl">
        <CountCard count={progress.sessionsCompleted} label="Sessions Completed" />
        <CountCard count={progress.patchesCreated} label="Patches Created" />
        <CountCard count={progress.modulesDone} label="Modules Done" />
        <CountCard count={progress.challengesCompleted} label="Challenges Completed" />
      </div>
      <h2 className="text-[24px] font-bold mt-xl mb-md">Module Journey</h2>
      <ModuleJourney modules={progress.moduleCompletionMap} />
    </main>
  );
}
```

### CountCard Component
```typescript
// src/components/count-card.tsx
export function CountCard({ count, label }: { count: number; label: string }) {
  return (
    <div
      className="bg-surface p-lg rounded-lg flex flex-col items-center"
      aria-label={`${count} ${label}`}
    >
      <span className="text-[48px] font-bold text-accent leading-none">
        {count}
      </span>
      <span className="text-[14px] text-muted mt-sm">{label}</span>
    </div>
  );
}
```

### Challenge Callout in Session Markdown
```markdown
> [!challenge] Create Your Own Acid Bass
> Starting from the basic patch, create an acid bass patch with resonant filter sweep
> and glide. Your patch should approximate the character of [[acid-bass]].
> Save your result with `challenge_id: 27-1` in the frontmatter.
```

### Challenge CSS Differentiation
```css
/* In globals.css -- optional differentiation for challenge callouts */
.prose .callout[data-callout="challenge"] {
  /* Uses same base callout styling (bg-surface, accent left border) */
  /* Could add subtle background variation if needed */
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| rehype-callouts without config | rehype-callouts with `callouts` option for custom types | rehype-callouts 2.x | Enables `[!challenge]` without custom plugins |
| Next.js 14 params sync | Next.js 15 params as Promise | Next.js 15 | `params` must be awaited in page components |
| Streak-based progress tracking | Additive-only metrics | Project design decision | ADHD-friendly, no guilt, no temporal pressure |

## Open Questions

1. **Daily note directory structure**
   - What we know: Obsidian daily notes live in `~/song` vault. Template is in `obsidian/session-log-template.md`.
   - What's unclear: Exact subdirectory path within the vault (root? `Daily Notes/`? user-configurable?)
   - Recommendation: Scan `**/*.md` from vault root with `#instrument-practice` filter. The filter is the contract, not the directory structure. If performance is an issue, narrow to common patterns.

2. **Challenge ID in existing demo patches**
   - What we know: 16 demo patches exist in `src/content/patches/evolver/`. None currently have `challenge_id`.
   - What's unclear: How many should get `challenge_id` for demo mode.
   - Recommendation: Add `challenge_id` to 3-4 demo patches that correspond to recipe session challenges (e.g., acid-bass, fm-bass, sub-bass from Session 27). Gives a realistic non-zero challenge count in demo mode.

3. **rehype-callouts data attributes**
   - What we know: rehype-callouts renders callouts with `data-callout` attribute matching the type name.
   - What's unclear: Exact HTML output structure for custom callout types with indicators.
   - Recommendation: Test the output by adding a `[!challenge]` callout to a session and inspecting rendered HTML. The existing `.callout` CSS provides the base; add `[data-callout="challenge"]` selector only if visual differentiation beyond the header text/icon is needed.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x with jsdom environment |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PROG-01 | Module completion computed from session completions + groupByModule | unit | `npx vitest run src/lib/progress.test.ts -t "module completion"` | No -- Wave 0 |
| PROG-02 | scanDailyNotes extracts #session-XX tags from vault files | unit | `npx vitest run src/lib/progress.test.ts -t "scanDailyNotes"` | No -- Wave 0 |
| PROG-03 | computeProgress returns correct additive counts | unit | `npx vitest run src/lib/progress.test.ts -t "computeProgress"` | No -- Wave 0 |
| PROG-04 | No temporal metrics in ProgressData type (type-level enforcement) | manual-only | Code review: verify ProgressData has no streak/date fields | N/A |
| CHAL-01 | Challenge callout renders in session markdown | unit | `npx vitest run src/lib/markdown/processor.test.ts -t "challenge callout"` | No -- Wave 0 |
| CHAL-02 | PatchSchema accepts optional challenge_id | unit | `npx vitest run src/lib/content/schemas.test.ts -t "challenge_id"` | No -- Wave 0 |
| CHAL-03 | Challenge callouts contain wikilinks to patches | unit | `npx vitest run src/lib/markdown/processor.test.ts -t "challenge wikilink"` | No -- Wave 0 |
| CHAL-04 | challengesCompleted counts patches with challenge_id | unit | `npx vitest run src/lib/progress.test.ts -t "challengesCompleted"` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/progress.test.ts` -- covers PROG-01, PROG-02, PROG-03, CHAL-04
- [ ] `src/lib/content/schemas.test.ts` -- covers CHAL-02 (PatchSchema challenge_id)
- [ ] `src/lib/markdown/processor.test.ts` -- covers CHAL-01, CHAL-03 (challenge callout rendering)
- [ ] Test fixtures: mock daily note files with various tag formats, mock session/patch data

## Sources

### Primary (HIGH confidence)
- Project codebase: `src/lib/content/schemas.ts`, `src/lib/content/reader.ts`, `src/lib/sessions.ts`, `src/lib/patches.ts`, `src/lib/config.ts`, `src/lib/markdown/processor.ts`
- Project codebase: `obsidian/session-log-template.md` -- defines the daily note tag contract
- Project codebase: `src/app/globals.css` -- existing callout CSS, theme tokens
- Project codebase: `src/components/nav.tsx` -- current nav structure
- rehype-callouts 2.1.2: `node_modules/rehype-callouts/dist/types.d.ts` -- CalloutConfig interface confirms custom callout type support with title + indicator SVG
- UI-SPEC: `.planning/phases/05-progress-challenges/05-UI-SPEC.md` -- approved visual/interaction contract

### Secondary (MEDIUM confidence)
- rehype-callouts README: confirms custom callout types, Obsidian-compatible syntax, `data-callout` attribute output

### Tertiary (LOW confidence)
- Daily note directory structure within ~/song vault -- assumed `**/*.md` pattern with `#instrument-practice` filter as the contract

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages already installed, no new dependencies
- Architecture: HIGH -- follows established patterns (server components, Zod schemas, content reader)
- Daily note scanning: MEDIUM -- novel pattern, but straightforward fs + glob + regex; vault directory structure is the main unknown
- Challenge callouts: HIGH -- rehype-callouts TypeScript types confirm custom type support
- Pitfalls: HIGH -- identified from codebase analysis and Obsidian vault patterns

**Research date:** 2026-03-30
**Valid until:** 2026-04-30 (stable -- no fast-moving dependencies)
