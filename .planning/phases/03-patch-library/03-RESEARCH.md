# Phase 3: Patch Library - Research

**Researched:** 2026-03-29
**Domain:** Next.js server components, client-side filtering, content authoring, Tailwind card grid UI
**Confidence:** HIGH

## Summary

Phase 3 builds a patch browsing UI (card grid with type filtering) and patch detail pages, plus creates 15+ demo patch content files. The technical domain is well-understood: this is a direct extension of the Phase 2 session browser pattern using the same Next.js server components, Zod-validated content pipeline, and Tailwind design tokens.

The data layer is already complete -- `listPatches()` in `reader.ts` and `PatchSchema` in `schemas.ts` are ready to use. The work breaks into three clear tracks: (1) create demo patch markdown files with curriculum-sourced parameters, (2) build the patch list page with card grid and type filtering, (3) build the patch detail page with parameter tables and session provenance links.

**Primary recommendation:** Follow the established session browser patterns exactly (server component pages, client component for interactivity), with filtering implemented via URL search params and a client component for pill tab state. All patch content should be authored with key-parameter-diff format, not full parameter dumps.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Card grid layout**: 2-column responsive grid (not list), stacks to 1 column on mobile
- **Card content**: type badge (single accent color), patch name, description snippet, tags, date created. Session origin link omitted from cards
- **Horizontal pill tabs** for filtering: All, Bass, Lead, Pad, Drum, Texture, Sequence
- **Hide empty types** from pill tabs
- **Default sort**: grouped by type, then by session origin (curriculum order within each type)
- **Type group headers** shown only in "All" view, hidden when type filter active
- **Sticky header** on detail with "Back to patches" link, reuses session pattern
- **Session provenance** as header metadata line with clickable link to session
- **Parameter dump grouped by synth section**: Oscillators, Filter, Envelopes, LFOs, Sequencer, etc.
- **Callout boxes** (Obsidian-style admonitions) for playing tips and technique notes
- **15+ demo patches** with curriculum coverage, at least one per recipe/creation session
- **Key parameters only** (diff from basic patch), full dumps deferred to Phase 4
- **Curriculum-authentic type spread**: emphasis on bass, lead, pad, texture; drum and sequence from later modules
- Patch files follow existing PatchSchema

### Claude's Discretion
- Exact card dimensions and spacing within the 2-column grid
- Pill tab responsive behavior (wrap vs scroll on narrow screens)
- Parameter table section groupings (which Evolver parameters go in which section)
- Callout box styling within design system tokens
- Mobile breakpoint behavior
- Loading states and transitions
- Which specific Anu Kirk exercises map to which patches

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PTCH-01 | User can browse documented patches with parameter tables | Card grid layout, `listPatches()` data layer, server component page at `/instruments/[slug]/patches` |
| PTCH-02 | User can filter patches by type (bass, lead, pad, drum, texture, sequence) | Client component with pill tabs, URL search params for shareability, PatchSchema type enum matches filter categories exactly |
| PTCH-03 | User can navigate from a patch to the session that created it | `session_origin` field in PatchSchema links to session_number, detail page renders clickable provenance link |
| PTCH-04 | Patch detail view shows full parameter dump, playing tips, and technique notes | Detail page at `/instruments/[slug]/patches/[id]`, markdown rendered via existing `renderMarkdown()`, callout CSS already in globals.css |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | ^15.5.14 | App framework, server components, routing | Already in use |
| react | ^19.2.4 | UI rendering | Already in use |
| zod | ^3.23.0 | Schema validation for patch frontmatter | Already in use |
| tailwindcss | ^4.2.2 | Styling via CSS custom properties | Already in use |
| gray-matter | ^4.0.3 | YAML frontmatter parsing | Already in use |
| clsx | ^2.1.1 | Conditional class names | Already in use |
| lucide-react | ^1.7.0 | Icons (ChevronLeft for back nav) | Already in use |

### Supporting (already in project)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| glob | ^11.0.0 | File discovery for patch directory | Used by listPatches() |
| unified + remark + rehype | ^11.x | Markdown rendering pipeline | Used by renderMarkdown() |
| rehype-callouts | ^2.1.2 | Obsidian-style callout boxes | Playing tips and technique notes |

### No New Dependencies Required

This phase requires zero new packages. All functionality is achievable with the existing stack.

## Architecture Patterns

### Recommended Project Structure (new files)
```
src/
├── app/instruments/[slug]/patches/
│   ├── page.tsx                    # Server component: patch list page
│   └── [id]/
│       └── page.tsx                # Server component: patch detail page
├── components/
│   ├── patch-grid.tsx              # Client component: card grid + filter pills
│   ├── patch-card.tsx              # Presentational: individual card
│   └── patch-detail.tsx            # Client component: detail view (for sticky header)
├── lib/
│   └── patches.ts                  # Helper: groupByType, sorting, type utilities
└── content/patches/evolver/
    ├── README.md                   # Existing
    ├── sub-bass.md                 # Demo patch files (15+)
    ├── acid-bass.md
    ├── fm-bass.md
    └── ...
```

### Pattern 1: Server Component Data Loading (established)
**What:** Route pages are async server components that load data, pass to client components for interactivity
**When to use:** Every page in this app follows this pattern
**Example:**
```typescript
// src/app/instruments/[slug]/patches/page.tsx
// Follows same pattern as sessions/page.tsx
import { listPatches } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { PatchGrid } from '@/components/patch-grid';

export default async function PatchListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();
  const patches = await listPatches(slug, config);

  return (
    <div className="max-w-[960px] mx-auto px-lg py-2xl">
      <h1 className="text-2xl font-bold mb-md">Patch Library</h1>
      <p className="text-muted mb-2xl">Documented patches from your learning sessions</p>
      <PatchGrid patches={patches} instrumentSlug={slug} />
    </div>
  );
}
```

### Pattern 2: Client-Side Filtering via URL Search Params
**What:** Filter state managed in URL search params for shareable URLs, client component reads/writes params
**When to use:** The pill tab filtering needs client interactivity but should be URL-persisted
**Example:**
```typescript
// src/components/patch-grid.tsx
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Read filter from URL: ?type=bass
const searchParams = useSearchParams();
const activeType = searchParams.get('type') ?? 'all';

// Update filter:
const router = useRouter();
const pathname = usePathname();
function setFilter(type: string) {
  const params = new URLSearchParams(searchParams.toString());
  if (type === 'all') params.delete('type');
  else params.set('type', type);
  router.replace(`${pathname}?${params.toString()}`);
}
```

### Pattern 3: Grouping Utility (mirrors sessions.ts)
**What:** Pure function to group patches by type, sort by session_origin within groups
**When to use:** The "All" view needs type group headers with patches sorted by curriculum order
**Example:**
```typescript
// src/lib/patches.ts
export interface PatchTypeGroup {
  type: string;
  patches: PatchWithMeta[];
}

export function groupByType(patches: PatchWithMeta[]): PatchTypeGroup[] {
  // Group by type, sort patches within group by session_origin
  // Sort groups by type order: bass, lead, pad, drum, texture, sequence
}

export function getAvailableTypes(patches: PatchWithMeta[]): string[] {
  // Return only types that have patches (for hiding empty pills)
}
```

### Pattern 4: Patch Content File Format
**What:** Markdown with YAML frontmatter matching PatchSchema, body contains key parameters (diff from basic patch), playing tips as callouts, technique notes
**When to use:** Every demo patch file
**Example:**
```markdown
---
name: "Sub Bass"
type: bass
session_origin: 27
description: "Deep, powerful sub bass with minimal harmonic content. Sits below other instruments without competing."
tags: [bass, sub, foundation, low-end]
instrument: evolver
created: "2026-01-15"
---

# Sub Bass

> [!tip] Playing Tips
> Play in the lower two octaves only. Use velocity to control filter
> opening for dynamic bass lines. Mod wheel adds subtle movement
> via LFO-controlled filter.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Saw |
| Osc 1 Level | 60 |
| Osc 2 Shape | Pulse 50 |
| Osc 2 Level | 55 |
| Osc 2 Fine | +3 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 30 |
| Resonance | 15 |
| 2/4 Pole | 4P |
| Env Amount | 40 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| Filter Decay | 25 |
| Filter Sustain | 10 |
| VCA Release | 15 |

> [!note] Technique Notes
> This patch uses 4-pole filter mode for maximum low-end weight.
> The slight detuning between Osc 1 and Osc 2 (+3 cents) adds
> warmth without obvious beating.
```

### Anti-Patterns to Avoid
- **Full parameter dumps in Phase 3 patches:** The CONTEXT.md explicitly defers full dumps to Phase 4 (MIDI SysEx). Only include parameters that differ from basic patch.
- **Per-type color coding:** CONTEXT.md locks single accent color for all type badges. Do NOT create separate colors per patch type.
- **Client-side data fetching:** All data loads in server components. The client component receives pre-loaded data.
- **Local state for filtering:** Use URL search params, not React state, so filtered views are shareable.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown rendering | Custom parser | Existing `renderMarkdown()` | Already handles param tables, callouts, code blocks |
| Frontmatter parsing | Manual YAML parse | `gray-matter` + `PatchSchema` | Zod validation already wired |
| Content discovery | Manual file listing | `listPatches()` | Already implemented, handles README filtering |
| Callout boxes | Custom callout component | `rehype-callouts` | Already in pipeline, renders `> [!tip]` syntax |
| Sticky header | New header component | Existing `sticky-header.tsx` | Established pattern, just needs minor adaptation |
| URL param management | Custom state management | `next/navigation` hooks | `useSearchParams`, `useRouter`, `usePathname` |

**Key insight:** The entire data pipeline and rendering infrastructure already exists from Phases 1-2. This phase is primarily UI composition and content authoring.

## Common Pitfalls

### Pitfall 1: session_origin to session slug mismatch
**What goes wrong:** Patch has `session_origin: 27` but the session slug is `27-recipes-bass`, not just `27`. Building the link requires looking up the actual session slug.
**Why it happens:** session_origin is a number, session slugs include descriptive text.
**How to avoid:** In the detail page, load `listSessions()` and find the session where `data.session_number === patch.session_origin`. Use its slug for the link.
**Warning signs:** Provenance links 404 because they use the number directly instead of the full slug.

### Pitfall 2: Type enum ordering
**What goes wrong:** Filter pills appear in arbitrary order or alphabetically instead of the intentional order.
**Why it happens:** Object/Set iteration order or alphabetical sorting.
**How to avoid:** Define explicit type display order: `['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']` matching the PatchSchema enum. Filter to only those with patches.
**Warning signs:** "drum" appearing before "lead" in the pill row.

### Pitfall 3: useSearchParams requires Suspense boundary
**What goes wrong:** Next.js 15 throws a build error when `useSearchParams()` is used without a Suspense boundary.
**Why it happens:** Next.js 15 requires Suspense for client components that access search params (needed for static generation compatibility).
**How to avoid:** Wrap the filter component in `<Suspense>` in the server component page, or use `useSearchParams` only within a component that's already wrapped.
**Warning signs:** Build error mentioning `useSearchParams` and `Suspense`.

### Pitfall 4: Patch content with invented parameter values
**What goes wrong:** Demo patches contain parameter values that don't make musical sense or contradict the Evolver's actual parameter ranges.
**Why it happens:** Fabricating values instead of sourcing from Anu Kirk's guide exercises.
**How to avoid:** Source all parameter values from specific Anu Kirk exercises (sessions 27-30 contain named recipe patches). Reference the DSI Manual for parameter ranges and valid values.
**Warning signs:** Values outside documented ranges (e.g., filter cutoff > 164).

### Pitfall 5: Nav link not added
**What goes wrong:** Patch library is built but unreachable from the navigation.
**Why it happens:** Forgetting to update `nav.tsx` with the "Patches" link.
**How to avoid:** Add `{ href: '/instruments/evolver/patches', label: 'Patches' }` to the navLinks array in `nav.tsx`.
**Warning signs:** Users can only reach patch library by typing the URL.

## Code Examples

### Session slug lookup for provenance link
```typescript
// In patch detail page (server component)
const sessions = await listSessions(slug, config);
const originSession = patch.data.session_origin !== null
  ? sessions.find(s => s.data.session_number === patch.data.session_origin)
  : null;

// In component JSX
{originSession && (
  <Link href={`/instruments/${instrumentSlug}/sessions/${originSession.slug}`}>
    Session {originSession.data.session_number}: {originSession.data.title}
  </Link>
)}
```

### Type-aware grouping and sorting
```typescript
const TYPE_ORDER = ['bass', 'lead', 'pad', 'drum', 'texture', 'sequence'] as const;

export function groupByType(patches: PatchWithMeta[]): PatchTypeGroup[] {
  const grouped = new Map<string, PatchWithMeta[]>();
  for (const patch of patches) {
    const type = patch.data.type;
    if (!grouped.has(type)) grouped.set(type, []);
    grouped.get(type)!.push(patch);
  }

  // Sort patches within each group by session_origin
  for (const group of grouped.values()) {
    group.sort((a, b) => (a.data.session_origin ?? 0) - (b.data.session_origin ?? 0));
  }

  // Return groups in canonical type order, skip empty
  return TYPE_ORDER
    .filter(type => grouped.has(type))
    .map(type => ({ type, patches: grouped.get(type)! }));
}
```

### Patch card component
```typescript
// src/components/patch-card.tsx
import Link from 'next/link';
import type { Patch } from '@/lib/content/types';

interface PatchCardProps {
  patch: Patch;
  slug: string;
  instrumentSlug: string;
}

export function PatchCard({ patch, slug, instrumentSlug }: PatchCardProps) {
  return (
    <article>
      <Link
        href={`/instruments/${instrumentSlug}/patches/${slug}`}
        aria-label={`Open patch: ${patch.name}`}
        className="block bg-surface rounded-[6px] p-lg border border-transparent hover:border-accent transition-colors"
      >
        <div className="flex items-center justify-between mb-sm">
          <span className="text-sm uppercase tracking-wider text-accent">
            {patch.type}
          </span>
          <span className="text-sm text-muted">{patch.created}</span>
        </div>
        <h3 className="text-xl font-bold mb-sm">{patch.name}</h3>
        <p className="text-base text-text line-clamp-2 mb-md">{patch.description}</p>
        <div className="flex flex-wrap gap-sm">
          {patch.tags.map(tag => (
            <span key={tag} className="text-sm text-muted">#{tag}</span>
          ))}
        </div>
      </Link>
    </article>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router data fetching | App Router server components | Next.js 13+ (stable 15) | Data loads on server, no useEffect/SWR needed |
| Client state for filters | URL search params | Next.js 13+ | Shareable filtered URLs, SSR-compatible |
| `params` as plain object | `params` as Promise (Next.js 15) | Next.js 15 | Must `await params` in page components |

**Relevant to this project:**
- Next.js 15 async params pattern already established in sessions pages -- follow the same pattern
- `useSearchParams()` requires `Suspense` boundary in Next.js 15

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.x with jsdom |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PTCH-01 | Patch list page renders cards for all patches | integration | `npx vitest run src/app/__tests__/patch-list.test.tsx -t "renders patch cards"` | No - Wave 0 |
| PTCH-02 | Filter pills show only types with patches, filtering works | unit | `npx vitest run src/lib/__tests__/patches.test.ts -t "groups by type"` | No - Wave 0 |
| PTCH-02 | Filter pills hide empty types | unit | `npx vitest run src/lib/__tests__/patches.test.ts -t "available types"` | No - Wave 0 |
| PTCH-03 | Patch detail links to origin session | integration | `npx vitest run src/components/__tests__/patch-detail.test.tsx -t "provenance link"` | No - Wave 0 |
| PTCH-04 | Patch detail renders parameter tables and callouts | integration | `npx vitest run src/components/__tests__/patch-detail.test.tsx -t "parameter tables"` | No - Wave 0 |
| PTCH-01 | PatchSchema validates demo patch frontmatter | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "PatchSchema"` | Partial - schema file exists |
| PTCH-01 | listPatches returns demo patches | integration | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "listPatches"` | Partial - reader test exists |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/patches.test.ts` -- covers PTCH-02 (groupByType, getAvailableTypes, sorting)
- [ ] `src/components/__tests__/patch-detail.test.tsx` -- covers PTCH-03, PTCH-04 (provenance link, param tables)
- [ ] `src/app/__tests__/patch-list.test.tsx` -- covers PTCH-01 (card rendering)
- [ ] Demo patch content files (15+) must exist before integration tests run

## Open Questions

1. **Sticky header adaptation for patches**
   - What we know: `sticky-header.tsx` has Quick Ref button and session-specific props. Patch detail does not need Quick Ref.
   - What's unclear: Whether to refactor the existing component to be more generic or create a simpler variant
   - Recommendation: Create a simpler `PatchStickyHeader` component (or make `StickyHeader` accept optional quickRefContent) to avoid breaking session pages

2. **Exact Anu Kirk exercise-to-patch mapping**
   - What we know: Sessions 27-30 are recipe sessions that produce named patches (Sub Bass, Acid Bass, FM Bass from Session 27, etc.). Session 31 has performance expression templates.
   - What's unclear: Exact parameter values for earlier module patches (sessions before recipes)
   - Recommendation: Recipe sessions (27-30) provide the richest patch content. Earlier sessions can produce simpler patches (e.g., "PWM Sweep" from Session 4, "Hard Sync Lead" from Session 5) with fewer parameter changes from basic patch.

## Sources

### Primary (HIGH confidence)
- `src/lib/content/schemas.ts` -- PatchSchema with type enum, session_origin field
- `src/lib/content/reader.ts` -- listPatches() implementation
- `src/app/instruments/[slug]/sessions/page.tsx` -- established page pattern
- `src/app/instruments/[slug]/sessions/[id]/page.tsx` -- established detail page pattern
- `src/components/sticky-header.tsx` -- reusable header pattern
- `src/app/globals.css` -- design tokens and .param-table / .callout CSS
- `instruments/evolver/basic-patch.md` -- full parameter reference with section groupings
- `.planning/phases/03-patch-library/03-UI-SPEC.md` -- complete UI design contract
- `.planning/phases/03-patch-library/03-CONTEXT.md` -- locked decisions

### Secondary (MEDIUM confidence)
- Next.js 15 `useSearchParams` requires Suspense -- based on established Next.js 15 patterns and project decisions noting Next.js 15 specifics

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all libraries already in use and verified
- Architecture: HIGH -- direct extension of Phase 2 patterns with exact code references
- Pitfalls: HIGH -- identified from actual codebase (session_origin linking, type enum order, nav update)
- Content authoring: MEDIUM -- exact Anu Kirk exercise mapping requires reference PDF cross-referencing during implementation

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (stable -- no fast-moving dependencies)
