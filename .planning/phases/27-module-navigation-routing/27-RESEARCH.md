# Phase 27: Module Navigation + Routing - Research

**Researched:** 2026-04-17
**Domain:** Next.js App Router routing, OKLCH color system, URL-driven filtering, component architecture
**Confidence:** HIGH

## Summary

Phase 27 builds the user-facing navigation and routing layer for eurorack modules. It consumes the data model created by Phase 26 (ModuleConfigSchema, `discoverModules()`, `loadModuleConfig()`, module.json files for 7 modules) and creates: a `/modules` listing page with category filter tabs, per-module routes at `/modules/[slug]/` with 4 sub-pages, a "Modules" nav entry, and 7 OKLCH color palettes via `[data-instrument]` CSS blocks.

The codebase has mature, directly reusable patterns for every aspect of this phase. The `[data-instrument]` CSS cascade pattern exists for 3 instruments (Evolver, Cascadia, Octatrack) and extends identically for modules. The `PatchFilterBar` component demonstrates URL query param filtering with `useSearchParams` + `router.replace()`. The instrument route structure at `src/app/instruments/[slug]/` provides the exact template for `src/app/modules/[slug]/`. The `InstrumentCard` + `SpringCard` pattern extends directly to `ModuleCard`.

**Primary recommendation:** Follow existing patterns precisely. The instrument routing, card, filter, and theming infrastructure is well-established -- this phase is additive, not innovative. The main implementation risk is in `app-shell.tsx` slug detection needing to handle both `/instruments/` and `/modules/` URL prefixes for `data-instrument` attribute.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Category tabs + grid layout on `/modules` page. Horizontal category filter tabs (All, VCO, Filter, Effects, Modulator, Function Generator) with module cards in a responsive grid below
- D-02: Filter state via query param `?category=vco` -- matches existing patch filter bar pattern. "All" tab clears the param. URL-shareable and bookmarkable
- D-03: Multi-category modules (e.g., Maths) appear under every category tab they belong to
- D-04: Module cards show: name, HP width, manufacturer, category tags, and a mini front-plate SVG thumbnail (once panels exist in Phase 28+)
- D-05: Before panel SVGs exist, cards show a module color swatch + proportional HP outline shape as placeholder
- D-06: "Modules" as a separate top-level nav link, not merged into InstrumentSwitcher
- D-07: InstrumentSwitcher stays for instruments only
- D-08: `app-shell.tsx` slug detection extended to match `/modules/[slug]` alongside `/instruments/[slug]`, setting `data-instrument` to the module slug
- D-09: Manufacturer-inspired color palettes -- each module's hue drawn from its manufacturer's visual identity
- D-10: Full surface tinting like instruments -- tinted bg, sunken, surface, surface-raised, overlay, and border tokens per module
- D-11: Same-manufacturer modules get same hue family but different saturation/lightness
- D-12: 7 new `[data-instrument="<slug>"]` blocks in globals.css
- D-13: Four sub-pages per module: Overview, Sessions, Patches, Panel
- D-14: Horizontal tab navigation below persistent module header
- D-15: Shared layout component at `/modules/[slug]/layout.tsx` renders header + tabs
- D-16: Empty sub-pages show "coming soon" message

### Claude's Discretion
- Exact OKLCH values for each module palette (must pass WCAG AA against surfaces)
- Specific saturation/lightness differentiation between same-manufacturer modules
- Tab active state styling (can reuse accent bar pattern from nav)
- Module card grid responsive breakpoints (2-col mobile, 3-col desktop likely)
- HP outline placeholder proportions and styling
- "Coming soon" empty state copy and visual treatment
- Category tab styling (pill buttons, underline tabs, etc.)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Top-level "Modules" section at `/modules` lists all modules with category filter | PatchFilterBar pattern (useSearchParams + router.replace), WideShell layout, discoverModules() from Phase 26 |
| NAV-02 | Per-module routes at `/modules/[slug]/` with overview, sessions, and patches pages | Instrument [slug] route structure is the direct template; Next.js nested layout pattern for shared header/tabs |
| NAV-03 | Module selector in main nav alongside instrument selector | nav.tsx currently has subLinks array + InstrumentSwitcher; add "Modules" as a standalone Link element |
| NAV-04 | Multi-category modules appear under each category they belong to | ModuleConfigSchema.categories is an array; filter logic: `modules.filter(m => m.categories.includes(activeCategory))` |
| NAV-05 | Per-module color identity via `[data-instrument]` CSS cascade (7 distinct palettes) | 3 existing [data-instrument] blocks in globals.css provide exact template; UI-SPEC has all 7 hue/chroma values |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.x | App Router, dynamic routes, nested layouts | Already in use; [slug] routes + layout.tsx pattern established |
| react | 19.2.x | Components, hooks (useSearchParams) | Already in use |
| zod | 3.23.x | Schema validation (ModuleConfigSchema from Phase 26) | Already in use throughout content layer |
| clsx | 2.1.x | Conditional class names | Already in use in nav.tsx, filter bar |
| motion | 12.38.x | SpringCard hover animation | Already in use for InstrumentCard |
| lucide-react | (existing) | Icons | Already in use in nav.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| tailwindcss | 4.x | Utility CSS + OKLCH custom properties | Already configured with @theme tokens |
| @tailwindcss/typography | (existing) | Prose styling for overview content | Already in globals.css |

No new dependencies are needed. Everything uses the existing stack.

**Installation:** None required.

## Architecture Patterns

### New File Locations
```
src/app/modules/
├── page.tsx                     # /modules listing with category tabs + grid
└── [slug]/
    ├── layout.tsx               # Shared module header + sub-nav tabs
    ├── page.tsx                 # Overview (landing) sub-page
    ├── sessions/
    │   └── page.tsx             # Sessions list (empty state until Phase 29+)
    ├── patches/
    │   └── page.tsx             # Patches list (empty state)
    └── panel/
        └── page.tsx             # Panel view (empty state until Phase 28+)

src/components/
├── module-card.tsx              # Card for /modules grid
├── module-category-tabs.tsx     # Horizontal category filter pills
├── module-sub-nav.tsx           # Per-module page tab navigation
└── hp-outline.tsx               # HP-proportional placeholder swatch
```

### Pattern 1: URL Query Param Filtering (from PatchFilterBar)
**What:** Category tabs driven by `?category=<slug>` query param, updated via `useSearchParams` + `router.replace()`
**When to use:** ModuleCategoryTabs component
**Source:** Existing `src/components/patch-filter-bar.tsx` lines 53-58

```typescript
'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Read active category from URL
const searchParams = useSearchParams();
const activeCategory = searchParams.get('category') ?? 'all';

// Update URL without page reload
function setCategory(category: string) {
  const params = new URLSearchParams(searchParams.toString());
  if (category === 'all') {
    params.delete('category');
  } else {
    params.set('category', category);
  }
  const query = params.toString();
  router.replace(query ? `${pathname}?${query}` : pathname);
}
```

**Key difference from PatchFilterBar:** Category tabs are single-select (one active category at a time), not multi-select like patch type filters. This simplifies the logic.

### Pattern 2: Nested Layout with Shared Header (Next.js App Router)
**What:** `layout.tsx` at `/modules/[slug]/` renders persistent module header + tab nav; child routes render below
**When to use:** Module detail pages
**Source:** Standard Next.js App Router pattern

```typescript
// src/app/modules/[slug]/layout.tsx
import { loadConfig } from '@/lib/config';
import { loadModuleConfig } from '@/lib/content/reader'; // Phase 26
import { ModuleSubNav } from '@/components/module-sub-nav';
import { notFound } from 'next/navigation';

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();

  let moduleConfig;
  try {
    moduleConfig = await loadModuleConfig(slug, config);
  } catch {
    return notFound();
  }

  return (
    <div>
      {/* Persistent module header */}
      <div className="max-w-[1200px] mx-auto px-lg pt-2xl pb-lg">
        <h1 className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.4375rem)] font-bold leading-[1.15]">
          {moduleConfig.display_name}
        </h1>
        <p className="text-sm text-muted">{moduleConfig.manufacturer}</p>
        <span className="text-sm font-mono text-param">{moduleConfig.hp_width}HP</span>
        {/* Category tags */}
      </div>
      <ModuleSubNav slug={slug} />
      {children}
    </div>
  );
}
```

### Pattern 3: data-instrument Slug Detection (from app-shell.tsx)
**What:** Extend URL matching to detect both `/instruments/[slug]` and `/modules/[slug]`
**When to use:** AppShell component
**Source:** Existing `src/components/app-shell.tsx` line 25

```typescript
// Current (instruments only):
const slugMatch = pathname.match(/\/instruments\/([^/]+)/);
const instrumentSlug = slugMatch?.[1] ?? '';

// Extended (instruments + modules):
const instrumentMatch = pathname.match(/\/instruments\/([^/]+)/);
const moduleMatch = pathname.match(/\/modules\/([^/]+)/);
const instrumentSlug = instrumentMatch?.[1] ?? moduleMatch?.[1] ?? '';
```

This reuses the same `data-instrument` attribute, which means all existing CSS cascade logic "just works" for modules. The CSS selector `[data-instrument="plaits"]` will activate when the user is on `/modules/plaits/` because the attribute value is `plaits`.

### Pattern 4: Server Component Data Loading (from instrument page)
**What:** Server-side data fetching in page.tsx using reader functions
**Source:** Existing `src/app/instruments/[slug]/page.tsx`

```typescript
// /modules page.tsx loads all modules
const config = await loadConfig();
const moduleSlugs = await discoverModules(config);
const modules = await Promise.all(
  moduleSlugs.map(async (slug) => ({
    slug,
    config: await loadModuleConfig(slug, config),
  }))
);
```

### Anti-Patterns to Avoid
- **Client-side data fetching for module list:** Module data is static content. Use server components (the default in App Router) for data loading, pass to client components only for interactivity (category tabs)
- **Duplicating filter logic:** Don't rebuild the filter pattern from scratch. Follow PatchFilterBar's `useSearchParams` + `router.replace()` approach
- **Separate theming mechanism for modules:** Don't create a new `data-module` attribute. Reuse `data-instrument` -- it's a "color identity" attribute, not strictly an instrument attribute
- **Hardcoding module data:** Always read from `discoverModules()` + `loadModuleConfig()`. The 7 module slugs should never be hardcoded in route components

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL-driven filtering | Custom state management | `useSearchParams` + `router.replace()` | Existing pattern in PatchFilterBar; URL-shareable |
| Card hover animation | CSS transforms | `SpringCard` wrapper (motion/react) | Already used for InstrumentCard; respects prefers-reduced-motion |
| Nested page layout | Manual header duplication | Next.js `layout.tsx` in route segment | Built-in framework feature; header persists across tab navigation |
| Color theme switching | JavaScript class toggling | CSS `[data-instrument]` cascade | Proven pattern for 3 instruments; zero JS overhead |
| Category filtering logic | Complex state machine | Simple array `.filter()` on `categories.includes()` | Categories array is already in ModuleConfigSchema |

## Common Pitfalls

### Pitfall 1: Module Slug Collision with Instrument Slugs
**What goes wrong:** A module slug (e.g., `swells`) could theoretically match an instrument slug, causing `data-instrument` to activate wrong palette
**Why it happens:** Both instruments and modules share the `data-instrument` attribute namespace
**How to avoid:** The 7 module slugs (plaits, beads, maths, swells, just-friends, crow, ikarie) don't collide with existing instrument slugs (evolver, cascadia, octatrack). The regex in app-shell.tsx checks `/instruments/` vs `/modules/` prefix, so even hypothetical collisions are impossible. Document that slug uniqueness across instruments AND modules is required.
**Warning signs:** Wrong color palette appearing on a page

### Pitfall 2: Missing Suspense Boundary for useSearchParams
**What goes wrong:** Next.js 15 requires `useSearchParams()` to be wrapped in a `<Suspense>` boundary when used in a client component that's rendered by a server component
**Why it happens:** `useSearchParams()` causes the nearest Suspense boundary to client-render
**How to avoid:** Wrap `ModuleCategoryTabs` in `<Suspense>` in the `/modules/page.tsx` server component, exactly as done for `PatchFilterBar` in `src/app/instruments/[slug]/patches/page.tsx` (line 39)
**Warning signs:** Build warning about missing Suspense boundary; hydration mismatch

### Pitfall 3: AppShell Not Receiving Module Data
**What goes wrong:** AppShell currently only receives `instruments` prop. If it needs module data for any reason (e.g., nav), it needs to be fetched in root layout
**Why it happens:** The "Modules" nav link is just a static Link, not a data-driven component. But if future phases need module data in the shell, the root layout fetch would need updating
**How to avoid:** For Phase 27, the "Modules" nav link is a simple `<Link href="/modules">Modules</Link>` -- no module data needed in AppShell. The slug detection for `data-instrument` also doesn't need module data, just the URL path match
**Warning signs:** None for this phase, but note for future

### Pitfall 4: Sub-Nav Sticky Positioning Conflict
**What goes wrong:** ModuleSubNav is sticky at `top: 60px` (below the main nav). If it doesn't account for the main nav height, it overlaps or hides behind it
**Why it happens:** Two sticky elements stacking requires explicit `top` offsets
**How to avoid:** Use `sticky top-[60px]` (matching `--nav-height: 60px`). The main nav already uses `sticky top-0`. The sub-nav stacks below it
**Warning signs:** Sub-nav tabs jump or hide behind main nav on scroll

### Pitfall 5: OKLCH Contrast Failures
**What goes wrong:** Accent colors with low lightness or chroma fail WCAG AA against dark surfaces
**Why it happens:** OKLCH lightness values that work for one hue may not work for another due to perceptual differences
**How to avoid:** The UI-SPEC has pre-calculated values with lightness >= 0.65 for all accents. The lowest is Beads at 0.65/0.10 and Swells at 0.68/0.08. All should pass against surface at 0.16 lightness. Verify with a contrast checker if adjusting values
**Warning signs:** Accent text or underlines appear too dim against surfaces

### Pitfall 6: `params` Promise Pattern in Next.js 15
**What goes wrong:** `params` in App Router pages is now a Promise in Next.js 15. Using `params.slug` directly without `await` causes a type error
**Why it happens:** Breaking change in Next.js 15
**How to avoid:** Always destructure with `const { slug } = await params;` as shown in the existing instrument page.tsx (line 9)
**Warning signs:** TypeScript error about Promise type

## Code Examples

### CSS Palette Block (from UI-SPEC, verified against existing instrument blocks)
```css
/* Source: globals.css existing instrument pattern + UI-SPEC values */
[data-instrument="plaits"] {
  --color-accent: oklch(0.70 0.12 165);
  --color-param: oklch(0.78 0.08 170);
  --color-bg: oklch(0.12 0.02 165);
  --color-sunken: oklch(0.10 0.02 165);
  --color-surface: oklch(0.16 0.02 165);
  --color-surface-raised: oklch(0.20 0.02 165);
  --color-overlay: oklch(0.24 0.02 165);
  --color-border: oklch(0.25 0.02 165);
  --color-border-subtle: oklch(0.20 0.015 165);
}
```

Repeat for all 7 modules using UI-SPEC hue/chroma values. The `--color-param` hue is offset +5 from accent hue, lightness 0.78, chroma at 60-70% of accent chroma.

### Module Card Component Pattern
```typescript
// Source: adapted from src/components/instrument-card.tsx
import Link from 'next/link';
import { SpringCard } from '@/components/motion/spring-card';
import { HpOutline } from '@/components/hp-outline';

interface ModuleCardProps {
  slug: string;
  displayName: string;
  manufacturer: string;
  hpWidth: number;
  categories: string[];
  sessionCount: number;
}

export function ModuleCard({ slug, displayName, manufacturer, hpWidth, categories, sessionCount }: ModuleCardProps) {
  return (
    <SpringCard>
      <Link href={`/modules/${slug}`} className="card block">
        <div className="flex flex-col gap-sm">
          <HpOutline hpWidth={hpWidth} />
          <h2 className="font-display text-[20px] font-bold text-text leading-[1.2]">{displayName}</h2>
          <p className="text-sm text-muted">{manufacturer}</p>
          <div className="flex flex-wrap gap-sm">
            {categories.map(cat => (
              <span key={cat} className="text-sm uppercase tracking-[0.05em] text-accent bg-accent/10 rounded-full px-sm py-xs">
                {cat.replace('-', ' ')}
              </span>
            ))}
          </div>
          <p className="text-sm font-mono text-param">{hpWidth}HP / {sessionCount} sessions</p>
          <span className="text-sm text-accent underline underline-offset-2 mt-md">
            Explore {displayName}
          </span>
        </div>
      </Link>
    </SpringCard>
  );
}
```

### Category Tabs with ARIA
```typescript
// Source: adapted from PatchFilterBar pill pattern
<div role="tablist" aria-label="Module categories" className="flex flex-wrap gap-sm mb-md">
  {categories.map(cat => (
    <button
      key={cat.value}
      role="tab"
      aria-selected={activeCategory === cat.value}
      onClick={() => setCategory(cat.value)}
      className={clsx(
        'rounded-full px-md h-[36px] text-sm transition-colors',
        activeCategory === cat.value
          ? 'bg-accent text-bg font-bold'
          : 'bg-surface-raised text-muted hover:text-text'
      )}
    >
      {cat.label}
    </button>
  ))}
</div>
```

### HP Outline Placeholder
```typescript
// Source: UI-SPEC D-05
export function HpOutline({ hpWidth }: { hpWidth: number }) {
  // Width as percentage of card, proportional to HP (20HP = 100%)
  const widthPercent = Math.min((hpWidth / 20) * 100, 100);

  return (
    <div
      className="h-[48px] rounded-sm border border-accent/30 bg-accent/15"
      style={{ width: `${widthPercent}%` }}
      aria-hidden="true"
    />
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `pages/` router | App Router (`app/` directory) | Next.js 13+ | Layout nesting, server components by default |
| `getStaticProps` params | `params` as Promise | Next.js 15 | Must `await params` in page/layout functions |
| Client-side routing state | `useSearchParams` + `router.replace` | Stable since Next.js 13 | URL-driven filter state, no external state lib needed |
| RGB/HSL color spaces | OKLCH | Project convention | Perceptually uniform; existing palette uses OKLCH throughout |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest (existing) |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | `/modules` page renders module cards and category tabs filter correctly | integration | `npx vitest run src/app/modules/` | Wave 0 |
| NAV-02 | `/modules/[slug]/` routes render overview, sessions, patches, panel pages | integration | `npx vitest run src/app/modules/` | Wave 0 |
| NAV-03 | "Modules" link appears in nav | unit | `npx vitest run src/components/nav` | Wave 0 |
| NAV-04 | Multi-category modules appear under all matching category tabs | unit | `npx vitest run src/components/module-category-tabs` | Wave 0 |
| NAV-05 | 7 module palette blocks produce correct CSS custom properties | manual-only | Visual inspection -- CSS custom properties in globals.css | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/app/modules/__tests__/` -- test directory for module routes
- [ ] `src/components/__tests__/module-category-tabs.test.tsx` -- filter logic
- [ ] `src/components/__tests__/module-card.test.tsx` -- card rendering

## Open Questions

1. **Phase 26 completion state**
   - What we know: Phase 26 creates `discoverModules()`, `loadModuleConfig()`, `ModuleConfigSchema`, and 7 `module.json` files
   - What's unclear: Exact function signatures and whether `loadModuleConfig` follows identical pattern to `loadInstrumentConfig`
   - Recommendation: Assume identical pattern (Phase 26 research confirms this). If signatures differ, adapt at implementation time

2. **Module session count at launch**
   - What we know: No module sessions exist until Phase 29+. Session count will be 0 for all modules
   - What's unclear: Whether to show "0 sessions" or hide the count
   - Recommendation: Show "0 sessions" -- it's honest and consistent with the stat line pattern. The empty state pages already communicate "coming soon"

## Sources

### Primary (HIGH confidence)
- `src/components/app-shell.tsx` -- data-instrument attribute pattern, slug detection logic
- `src/components/nav.tsx` -- nav structure, subLinks, InstrumentSwitcher placement
- `src/app/globals.css` -- 3 existing [data-instrument] palette blocks, OKLCH token system
- `src/components/patch-filter-bar.tsx` -- URL query param filtering pattern with useSearchParams
- `src/components/instrument-card.tsx` -- Card component + SpringCard pattern
- `src/app/instruments/[slug]/page.tsx` -- Server component data loading, params Promise pattern
- `src/components/page-shell.tsx` -- WideShell layout wrapper (1200px max-width)
- `src/lib/content/reader.ts` -- discoverInstruments(), loadInstrumentConfig() patterns
- `.planning/phases/26-data-model-content-pipeline/26-RESEARCH.md` -- ModuleConfigSchema shape, discoverModules() signature
- `.planning/phases/27-module-navigation-routing/27-UI-SPEC.md` -- All visual specs, OKLCH values, component inventory, interaction contracts

### Secondary (MEDIUM confidence)
- Next.js 15 App Router docs -- nested layouts, dynamic routes, params as Promise

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already in use, zero new dependencies
- Architecture: HIGH -- every pattern has a direct existing equivalent in the codebase
- Pitfalls: HIGH -- identified from direct code inspection and Next.js 15 known issues
- Color values: MEDIUM -- UI-SPEC provides exact values but WCAG compliance should be spot-checked

**Research date:** 2026-04-17
**Valid until:** 2026-05-17 (stable -- no fast-moving dependencies)
