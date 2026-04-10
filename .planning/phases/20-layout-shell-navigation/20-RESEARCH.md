# Phase 20: Layout Shell & Navigation - Research

**Researched:** 2026-04-10
**Domain:** Next.js layout components, responsive navigation, CSS custom properties, Tailwind v4
**Confidence:** HIGH

## Summary

This phase restructures three layout components (nav, app-shell, footer) and introduces a page-shell width system plus per-instrument accent color variation. The codebase already has all necessary infrastructure: Tailwind v4 with `@theme` tokens, OKLCH color system, `usePathname()` for route detection, `lucide-react` for icons, `clsx` for conditional classes, and three loaded font families including Space Grotesk for the brand wordmark.

The work is entirely CSS/component restructuring with no new dependencies. The main technical concerns are: (1) coordinating the sticky nav height change from 48px to 60px with the existing `StickyHeader` component that also uses `sticky top-0`, (2) implementing mobile hamburger menu with proper focus trapping and accessibility without adding a dependency, and (3) ensuring the `data-instrument` attribute flows correctly from server-side route parsing to CSS custom property overrides.

**Primary recommendation:** Implement in 3-4 waves: nav restyle first (height, brand, active states), then page shells + data-instrument wiring, then footer extraction, then mobile hamburger menu. Each wave is independently verifiable.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Elevated nav bar (~56-64px tall) with raised surface elevation and subtle bottom shadow/border accent. Single continuous surface with two visual zones
- D-02: Brand wordmark "evolver" uses Space Grotesk, bold, slightly larger than nav link text
- D-03: On mobile, nav collapses to hamburger menu with slide-down or overlay
- D-04: Active page link indicated by 2-3px accent-colored bottom border bar
- D-05: Hover effect is color change only (muted to text), no underline or background
- D-06: Page-type shell system with narrow (~720px) and wide (~1200px) max-widths
- D-07: Panel visualizer pages — Claude's discretion on wide shell vs narrow-with-breakout
- D-08: Two-column footer — left: project identity, right: per-instrument quick-links
- D-09: Footer with border-top and warm surface elevation
- D-10: Per-instrument accent color shift — Evolver yellow-green, Cascadia warm teal
- D-11: Implementation via `data-instrument` attribute on AppShell, CSS override of `--color-accent`
- D-12: Active state bars, callout borders, highlights inherit per-instrument accent via token override

### Claude's Discretion
- Exact nav bar height (56-64px range)
- Shadow/border treatment at bottom of nav
- Hamburger menu animation style (slide-down vs overlay)
- Medium shell width value if a third tier is warranted (~960px for module lists)
- Panel page width approach (wide shell vs breakout)
- Specific warm teal OKLCH values for Cascadia accent
- Footer spacing, typography sizing, and link grouping details

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LAYOUT-01 | User sees a navigation bar with visual weight, brand expression, and clear active state indicators | Nav restyle: 60px height, surface-raised bg, Space Grotesk wordmark, accent bottom-border active state. All tokens and fonts already loaded |
| LAYOUT-02 | User sees mobile-optimized layouts with appropriate content widths per page type | Page shell components (NarrowShell, WideShell) replace per-page inline max-width classes. Mobile hamburger menu for nav |
| LAYOUT-03 | User sees a designed footer with project identity and instrument navigation links | Footer extraction from app-shell.tsx to dedicated component with two-column layout, instrument quick-links |
| LAYOUT-04 | User sees visually distinct page shells for each instrument (subtle color/accent variation) | data-instrument attribute on AppShell div, CSS custom property override for --color-accent per instrument |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Session length 15-30 minutes, ADHD constraint is non-negotiable
- File naming: kebab-case throughout
- All components are hand-built (no component library)
- Panel SVG internals are frozen (not modified this phase)
- Content pipeline reads from `~/song` (vaultPath), falls back to `src/content/`

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.14 | App router, server components, layout system | Already installed, powers all routing |
| Tailwind CSS | 4.2.2 | Utility classes, @theme tokens | Already installed, v4 CSS-first approach |
| React | 19.2.4 | Component framework | Already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class composition | Active states, responsive classes |
| lucide-react | 1.7.0 | Icons (Menu, X for hamburger) | Mobile nav toggle |
| @tailwindcss/typography | 0.5.19 | Prose styling | Already integrated, unchanged this phase |

### No New Dependencies Required
This phase requires zero new packages. All functionality is achievable with existing stack.

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   ├── nav.tsx              # Major restyle (height, brand, active states, mobile menu)
│   ├── app-shell.tsx        # Restructured (data-instrument attr, page shell routing, footer extraction)
│   ├── footer.tsx           # NEW: extracted two-column footer
│   ├── page-shell.tsx       # NEW: NarrowShell and WideShell wrapper components
│   ├── instrument-switcher.tsx  # Unchanged
│   ├── sticky-header.tsx    # Updated: top offset from 48px to 60px (--nav-height)
│   └── search-bar.tsx       # Unchanged
├── app/
│   ├── globals.css          # New tokens: --content-wide update, --nav-height, --color-accent-cascadia, data-instrument CSS rules
│   └── layout.tsx           # Unchanged (fonts already loaded)
```

### Pattern 1: Page Shell Components
**What:** Thin wrapper components that apply max-width and centering, replacing per-page inline width classes.
**When to use:** Every page that renders content inside `<main>`.
**Example:**
```typescript
// src/components/page-shell.tsx
export function NarrowShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('max-w-[var(--content-narrow)] mx-auto px-lg', className)}>
      {children}
    </div>
  );
}

export function WideShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('max-w-[var(--content-wide)] mx-auto px-lg', className)}>
      {children}
    </div>
  );
}
```

### Pattern 2: Per-Instrument Accent via data-attribute + CSS
**What:** SSR-friendly color variation using a data attribute on the shell div and CSS custom property overrides.
**When to use:** Whenever accent color should reflect the current instrument context.
**Example:**
```css
/* globals.css — per-instrument accent overrides */
[data-instrument="cascadia"] {
  --color-accent: var(--color-accent-cascadia);
}
/* Evolver uses the default --color-accent (no override needed) */
```
```typescript
// app-shell.tsx
const slugMatch = pathname.match(/\/instruments\/([^/]+)/);
const instrumentSlug = slugMatch?.[1] ?? '';
// ...
<div className="flex flex-col min-h-screen" 
     data-instrument={instrumentSlug || undefined}>
```

### Pattern 3: Mobile Hamburger with Client State
**What:** Hamburger toggle using React state, no external menu library.
**When to use:** Nav component on viewports below 768px.
**Example:**
```typescript
const [menuOpen, setMenuOpen] = useState(false);
// Menu renders conditionally with slide-down transform
// Focus trap via useEffect that listens for Tab/Shift+Tab on menu boundaries
// Escape key closes menu (same pattern as InstrumentSwitcher)
```

### Anti-Patterns to Avoid
- **Hardcoded max-width strings per page:** Current pattern (`max-w-[720px]`, `max-w-[960px]`) scattered across 15+ files. Replace with PageShell components or token-based classes, but do NOT try to refactor all pages at once in this phase. Introduce the shell components, apply to key routes, and let remaining pages adopt incrementally
- **JS-based color switching for instrument accent:** Use CSS custom properties, not React state or context. Zero runtime cost
- **Duplicate pathname parsing:** AppShell already receives pathname context. Parse once, pass down or use data attribute. Don't re-parse in Nav and Footer independently

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon rendering | Custom SVG hamburger icon | `lucide-react` Menu + X icons | Already in project, consistent sizing |
| Focus trapping | Custom tab-index management from scratch | Focused useEffect with keyboard event handlers | InstrumentSwitcher already has this pattern — reuse approach |
| Responsive breakpoints | Custom JS media query listeners | Tailwind `md:` prefix and CSS `@media (min-width: 768px)` | Tailwind v4 handles this natively |
| Color space math | Manual OKLCH calculations | Predefined tokens in globals.css | Tokens are the source of truth |

## Common Pitfalls

### Pitfall 1: Sticky Nav + Sticky Session Header Collision
**What goes wrong:** Both `nav.tsx` (sticky, z-40) and `sticky-header.tsx` (sticky top-0, z-40) compete for the top of the viewport. When nav height changes from 48px to 60px, session headers stack incorrectly.
**Why it happens:** `sticky-header.tsx` uses `top-0` and `h-[48px]`. Both use z-40.
**How to avoid:** Update sticky-header to use `top-[var(--nav-height)]` (or `top-[60px]`). Adjust z-index: nav at z-sticky (100), sticky-header at z-40 (below nav). Update `html { scroll-padding-top }` from 48px to account for both bars (60px nav + 48px sticky-header = 108px for session pages).
**Warning signs:** Content jumps or headers overlap when scrolling on session pages.

### Pitfall 2: Tailwind v4 @theme Token Usage for max-width
**What goes wrong:** Tailwind v4 `@theme` tokens don't automatically create arbitrary value classes. Writing `max-w-[var(--content-wide)]` may not work as expected with Tailwind's JIT.
**Why it happens:** Tailwind v4 handles CSS variables in arbitrary values differently than static values.
**How to avoid:** Either use `max-w-content-wide` if registered as a proper theme extension, or apply inline styles, or use the raw CSS class. Test that the compiled CSS applies correctly. The safest approach is to keep using literal pixel values in Tailwind classes (`max-w-[1200px]`) that reference the token conceptually, with the actual token used in globals.css for the shell components.
**Warning signs:** Width not applied, component renders full-width.

### Pitfall 3: data-instrument Attribute on Server vs Client
**What goes wrong:** AppShell is a server component, but the `data-instrument` attribute needs the URL pathname which is only available client-side via `usePathname()`.
**Why it happens:** AppShell currently doesn't use `usePathname()` — it delegates to Nav which is a client component.
**How to avoid:** Two options: (1) Make AppShell a client component (it already wraps client children), or (2) parse the instrument slug from the route in layout.tsx (server component) and pass it as a prop. Option 2 is cleaner but requires layout.tsx changes. Option 1 is simpler since AppShell already wraps a client `SearchProvider`. The UI-SPEC says "derived from URL pathname" which suggests client-side parsing. Since AppShell wraps SearchProvider (a client component), making the outer div a separate client wrapper or adding `'use client'` to AppShell is the practical path.
**Warning signs:** `data-instrument` attribute missing on SSR, accent colors not applied on first paint.

### Pitfall 4: Mobile Menu Accessibility
**What goes wrong:** Menu opens but keyboard users can't navigate it, or focus escapes to background elements.
**Why it happens:** Focus trapping requires explicit implementation.
**How to avoid:** Follow InstrumentSwitcher patterns: Escape closes, click-outside closes, arrow keys navigate items. Add `aria-expanded` on hamburger button, `aria-hidden` on menu when closed, and trap focus inside menu when open.
**Warning signs:** Tab key moves focus behind the menu overlay.

### Pitfall 5: Footer Instrument Links Without Data
**What goes wrong:** Footer needs to render links for all instruments, but it's inside AppShell which already has the instruments array.
**Why it happens:** Not a bug — just a reminder that the footer component needs the instruments prop passed down.
**How to avoid:** Pass the `instruments` array from AppShell to the extracted Footer component. The data is already available at the AppShell level.
**Warning signs:** Footer renders without instrument-specific links.

## Code Examples

### Nav Active State with Bottom Accent Bar
```typescript
// Verified pattern from existing nav.tsx + D-04 specification
<Link
  href={link.href}
  aria-current={isActive ? 'page' : undefined}
  className={clsx(
    'text-sm whitespace-nowrap h-[60px] flex items-center transition-colors relative',
    isActive
      ? 'text-text'
      : 'text-muted hover:text-text',
  )}
>
  {link.label}
  {isActive && (
    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
  )}
</Link>
```

### Per-Instrument CSS Override
```css
/* globals.css addition */
[data-instrument="cascadia"] {
  --color-accent: oklch(0.75 0.12 185);
}
/* No override needed for evolver — uses default --color-accent */
```

### Mobile Hamburger Toggle
```typescript
// Pattern from existing InstrumentSwitcher — adapted for nav
import { Menu, X } from 'lucide-react';

const [menuOpen, setMenuOpen] = useState(false);

// In nav JSX:
<button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-expanded={menuOpen}
  aria-label="Toggle navigation"
  className="md:hidden w-[44px] h-[44px] flex items-center justify-center text-muted hover:text-text"
>
  {menuOpen ? <X size={20} /> : <Menu size={20} />}
</button>
```

### Page Shell Width Application
```typescript
// Current: scattered inline widths
<div className="max-w-[720px] mx-auto px-lg py-2xl">

// Phase 20: page shell components
import { NarrowShell } from '@/components/page-shell';
<NarrowShell className="py-2xl">
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind v3 theme.extend | Tailwind v4 @theme CSS-first | Tailwind 4.0 (2024) | Token definitions move from tailwind.config to CSS |
| next/font with many weights | next/font with minimal weights | Ongoing | Space Grotesk only loads weight 700 (already configured) |
| CSS-in-JS for dynamic themes | CSS custom properties + data attributes | 2023-2024 | Zero-runtime cost, SSR-friendly |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x + @testing-library/react 16.x |
| Config file | vitest.config.ts (inferred from package.json scripts) |
| Quick run command | `npx vitest run src/components/__tests__/nav.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAYOUT-01 | Nav renders with brand wordmark, active indicator bar, correct height classes | unit | `npx vitest run src/components/__tests__/nav.test.tsx -x` | Yes (update needed) |
| LAYOUT-01 | Mobile hamburger menu renders, toggles, has aria attributes | unit | `npx vitest run src/components/__tests__/nav.test.tsx -x` | Yes (new tests needed) |
| LAYOUT-02 | Page shells apply correct max-width for narrow/wide | unit | `npx vitest run src/components/__tests__/page-shell.test.tsx -x` | No (Wave 0) |
| LAYOUT-03 | Footer renders two columns, instrument links, project identity | unit | `npx vitest run src/components/__tests__/footer.test.tsx -x` | No (Wave 0) |
| LAYOUT-04 | AppShell sets data-instrument attribute from pathname | unit | `npx vitest run src/components/__tests__/app-shell.test.tsx -x` | No (Wave 0) |
| LAYOUT-04 | Cascadia accent override applies via CSS | unit/manual | Manual visual check | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run src/components/__tests__/nav.test.tsx src/components/__tests__/footer.test.tsx src/components/__tests__/page-shell.test.tsx -x`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/__tests__/page-shell.test.tsx` -- covers LAYOUT-02
- [ ] `src/components/__tests__/footer.test.tsx` -- covers LAYOUT-03
- [ ] `src/components/__tests__/app-shell.test.tsx` -- covers LAYOUT-04 (data-instrument attribute)
- [ ] Update `src/components/__tests__/nav.test.tsx` -- covers LAYOUT-01 (new active state, mobile menu, brand wordmark)

## Open Questions

1. **StickyHeader stacking with taller nav**
   - What we know: StickyHeader uses `sticky top-0 z-40 h-[48px]`. Nav will become `sticky top-0 z-sticky h-[60px]`.
   - What's unclear: Whether both can be sticky simultaneously in all scroll scenarios, or if StickyHeader should use `top-[60px]` instead of `top-0`.
   - Recommendation: Update StickyHeader to `top-[60px]` (or `top-[var(--nav-height)]`) so it stacks below the nav bar. Test on session pages.

2. **Page shell adoption scope**
   - What we know: 15+ files use inline max-width classes. UI-SPEC says to introduce shell system.
   - What's unclear: Whether ALL pages should be migrated to shell components in this phase, or just key routes.
   - Recommendation: Introduce shell components and apply to the most impactful routes (session detail, patches grid, modules, about). Let remaining pages adopt in future phases. The shell components are the deliverable; exhaustive migration is not.

3. **AppShell client/server boundary**
   - What we know: AppShell is currently a server component (no 'use client' directive). It wraps SearchProvider which IS a client component.
   - What's unclear: Whether adding `data-instrument` (which needs pathname) requires making AppShell a client component.
   - Recommendation: Keep AppShell as server component. Extract a thin `InstrumentShell` client wrapper that reads pathname and sets `data-instrument` on the outer div. Or pass instrument slug from layout params. Both work; the client wrapper is simpler.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `nav.tsx`, `app-shell.tsx`, `globals.css`, `layout.tsx`, `sticky-header.tsx` -- direct file reads
- UI-SPEC: `20-UI-SPEC.md` -- all visual specifications for this phase
- CONTEXT.md: `20-CONTEXT.md` -- all locked decisions

### Secondary (MEDIUM confidence)
- Tailwind v4 @theme token behavior -- based on existing working patterns in globals.css
- Next.js 15 App Router layout patterns -- based on existing working layout.tsx

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - zero new dependencies, all tools already in project
- Architecture: HIGH - straightforward component restructuring with established patterns
- Pitfalls: HIGH - identified from direct code analysis of existing sticky headers, server/client boundaries, and accessibility patterns

**Research date:** 2026-04-10
**Valid until:** 2026-05-10 (stable -- no external dependencies or fast-moving APIs)
