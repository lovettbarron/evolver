# Phase 2: Session Browser - Research

**Researched:** 2026-03-29
**Domain:** Next.js App Router, Tailwind CSS v4, design system, content-driven SSR
**Confidence:** HIGH

## Summary

Phase 2 scaffolds the entire Next.js application from scratch -- `src/app/` does not exist yet, nor is Next.js even a dependency. The data layer (content reader, markdown processor, Zod schemas, bundled content) is fully built from Phase 1. This phase connects that data layer to a Next.js App Router UI with a dark editorial design system, instrument-scoped routing, session browsing/reading, and quick-reference slide-out panels.

The key technical concerns are: (1) scaffolding Next.js into an existing TypeScript project that uses `module: "NodeNext"`, (2) implementing Tailwind CSS v4's CSS-first configuration with custom design tokens, (3) rendering Mermaid diagrams client-side within a server-component architecture, and (4) building a slide-out panel with focus trap for quick-reference cards. All content rendering is already handled by the Phase 1 markdown processor -- the UI phase consumes pre-rendered HTML strings.

**Primary recommendation:** Use Next.js 15 (latest stable 15.5.14) with Tailwind CSS v4 (4.2.2) and a CSS-first `@theme` configuration. Keep components server-rendered by default; use `'use client'` only for interactive elements (slide-out panel, mermaid renderer, source ref tooltips, nav state).

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Dark editorial aesthetic** inspired by Ghostly International and Domus magazine -- near-black backgrounds, strong typography hierarchy, generous whitespace, restrained accent color
- Color tokens: `--bg` near-black, `--surface` dark gray, `--text` off-white, `--muted` mid-gray, `--accent` single color used sparingly, `--param` monospace distinct weight
- **Tailwind CSS required** -- all styling through Tailwind utility classes and CSS custom properties. No hardcoded colors anywhere. Validation must enforce this
- Design system implemented as Tailwind theme config + CSS custom properties. All components consume tokens, never raw values
- Typography: sans-serif headers (bold), sans-serif body, monospace for parameter values
- Editorial principles: whitespace is a feature, typography does the heavy lifting, no decorative elements, grid-based magazine-feel layouts
- **Next session hero card** -- single focused card with module name, session title, objective, duration, "Start" action
- Next session defaults to Session 1 until Phase 5 adds real progress tracking
- **Single column, wide** session reading -- max ~720px, long-scroll, Domus article style
- Sticky header with back navigation, session identifier, quick-ref card button(s)
- Mermaid diagrams render inline
- Source references as subtle inline markers (footnote-style)
- **Slide-out panel from the right** for quick-reference cards
- **Grouped list** -- sessions listed under module headers, all visible, no accordion
- Sequential prev/next navigation at bottom of each session, crosses module boundaries
- Instrument overview at `/instruments/evolver` with architecture, signal flow, links
- **Minimal nav**: Home + Sessions only
- Instrument-scoped routing: `/instruments/[slug]/sessions/[id]`
- Framework methodology docs accessible from footer link, not main nav

### Claude's Discretion
- Exact Tailwind theme token values (specific hex codes within the dark editorial palette)
- Component architecture (server vs client component boundaries)
- Slide-out panel animation and behavior details
- Mobile responsive breakpoints and behavior
- Loading states and transitions
- Mermaid diagram rendering approach (client-side vs SSR)
- Exact spacing scale and typography sizing

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SESS-01 | User can browse sessions grouped by learning module | Grouped list page at `/instruments/[slug]/sessions` -- server component reads `listSessions()`, groups by `module` field |
| SESS-02 | User can read a session with formatted exercises, parameter tables, checklists | Session detail page renders pre-processed HTML from markdown processor; param tables styled via CSS tokens |
| SESS-03 | User sees a "next session" action-first view | Landing page hero card component; defaults to session 1 until Phase 5 progress tracking |
| SESS-04 | User can access quick-reference cards without opening a full session | Slide-out panel (client component) loads basic-patch and signal-flow content from instrument files |
| SESS-05 | Sessions display source references and citations | `reference` field in session frontmatter; inline markers rendered as footnote-style with tooltip |
| INST-01 | URL routing is instrument-scoped | App Router structure: `app/instruments/[slug]/sessions/[id]/page.tsx` |
| INST-02 | Each instrument has an overview page | `/instruments/[slug]/page.tsx` rendering overview.md, signal-flow.md, links to basic patch |
| INST-03 | Framework documentation visible in the app | `/about` page rendering `framework/README.md` and `framework/adhd-design.md` |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.14 | App Router framework | Latest stable Next.js 15 -- mature, well-documented, avoids Next.js 16 breaking changes (proxy rename, mandatory async params) that add risk without benefit for this project. Turbopack opt-in available. |
| react | 19.1.0 | UI library | Required by Next.js 15; stable React 19 with server components |
| react-dom | 19.1.0 | DOM rendering | Required by Next.js 15 |
| tailwindcss | 4.2.2 | Utility-first CSS | CSS-first `@theme` configuration aligns perfectly with the design system's CSS custom property tokens |
| @tailwindcss/postcss | 4.2.2 | PostCSS plugin | Required for Tailwind v4 integration with Next.js |
| postcss | 8.5.4 | CSS processing | Required by Tailwind CSS v4 |
| lucide-react | 1.7.0 | Icon library | Specified in UI-SPEC; tree-shakeable, consistent style |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/font | (bundled) | Font optimization | Load Inter and JetBrains Mono from Google Fonts with zero external requests |
| clsx | 2.1.1 | Conditional class names | Combine Tailwind classes conditionally in components |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js 15 | Next.js 16 | 16 has Turbopack by default and React 19.2, but middleware-to-proxy rename, mandatory async params, and outputFileTracing concerns (flagged in STATE.md) add risk. Phase 6 deployment is safer on 15. |
| Custom components | shadcn/ui | CONTEXT.md explicitly chose custom components with Tailwind for the Ghostly/Domus aesthetic. shadcn is not initialized. |
| Tailwind v4 @theme | Tailwind v3 config.js | v4's CSS-first approach maps directly to the design token pattern. No reason to use v3. |

**Installation:**
```bash
npm install next@15 react@19 react-dom@19 tailwindcss@4 @tailwindcss/postcss postcss lucide-react clsx
npm install -D @types/react @types/react-dom
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, global CSS, AppShell
│   ├── globals.css             # Tailwind @import + @theme tokens + base styles
│   ├── page.tsx                # Landing page: hero card (next session)
│   ├── about/
│   │   └── page.tsx            # Framework methodology (INST-03)
│   └── instruments/
│       └── [slug]/
│           ├── page.tsx        # Instrument overview (INST-02)
│           └── sessions/
│               ├── page.tsx    # Session list grouped by module (SESS-01)
│               └── [id]/
│                   └── page.tsx # Session detail (SESS-02)
├── components/
│   ├── app-shell.tsx           # Nav + footer + children (server)
│   ├── nav.tsx                 # Navigation (client - route awareness)
│   ├── hero-card.tsx           # Next session card (client - Start button)
│   ├── session-list.tsx        # Grouped session list (server)
│   ├── session-row.tsx         # Single session row (server)
│   ├── module-header.tsx       # Module group heading (server)
│   ├── session-detail.tsx      # Session content renderer (server)
│   ├── sticky-header.tsx       # Session sticky header (client - quick-ref toggle)
│   ├── quick-ref-panel.tsx     # Slide-out panel (client - animation, focus trap)
│   ├── prev-next-nav.tsx       # Sequential navigation (server)
│   ├── source-ref.tsx          # Inline citation marker + tooltip (client)
│   ├── mermaid-renderer.tsx    # Client-side Mermaid rendering (client)
│   └── instrument-overview.tsx # Instrument hub page content (server)
├── lib/
│   ├── content/                # (Phase 1 - existing)
│   ├── markdown/               # (Phase 1 - existing)
│   ├── config.ts               # (Phase 1 - existing)
│   └── sessions.ts             # Helper: group sessions by module, get next/prev
└── content/                    # (Phase 1 - bundled demo content)
```

### Pattern 1: Server Component Data Loading
**What:** Page-level server components call the content reader directly (no API routes, no client-side fetching)
**When to use:** Every page -- all data comes from the filesystem via Phase 1's content reader
**Example:**
```typescript
// src/app/instruments/[slug]/sessions/page.tsx
import { listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';

export default async function SessionListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await loadConfig();
  const sessions = await listSessions(slug, config);

  // Group by module
  const grouped = groupByModule(sessions);

  return <SessionList groups={grouped} instrumentSlug={slug} />;
}
```

### Pattern 2: Client Component Islands
**What:** Interactive elements use `'use client'` directive; receive data as serializable props from server parents
**When to use:** Slide-out panel, sticky header toggle, Mermaid rendering, source ref tooltips, navigation active state
**Example:**
```typescript
// src/components/quick-ref-panel.tsx
'use client';

import { useEffect, useRef } from 'react';

export function QuickRefPanel({ content, isOpen, onClose }: {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap + Escape key dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-bg/50" onClick={onClose} />}
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 h-full w-[380px] max-w-full bg-surface p-lg
          transform transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Quick reference"
      >
        {/* rendered HTML content */}
      </div>
    </>
  );
}
```

### Pattern 3: Mermaid Client-Side Rendering
**What:** The Phase 1 markdown processor outputs `<div class="mermaid-placeholder" data-diagram="...">` instead of rendering Mermaid server-side. A client component picks these up and renders them.
**When to use:** Any page with Mermaid diagrams (instrument overview, signal flow, some sessions)
**Example:**
```typescript
// src/components/mermaid-renderer.tsx
'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export function MermaidRenderer({ diagram }: { diagram: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: 'var(--color-surface)',
        primaryTextColor: 'var(--color-text)',
        lineColor: 'var(--color-muted)',
      }
    });

    const render = async () => {
      if (ref.current) {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, diagram);
        ref.current.innerHTML = svg;
      }
    };
    render();
  }, [diagram]);

  return <div ref={ref} className="my-xl" />;
}
```

### Pattern 4: Async Params (Next.js 15)
**What:** In Next.js 15, `params` in page/layout components is a Promise that must be awaited
**When to use:** Every dynamic route (`[slug]`, `[id]`)
**Critical:** This is a breaking change from older Next.js versions. All params must be `await`ed.
```typescript
// Correct pattern for Next.js 15+
export default async function Page({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  // ...
}
```

### Anti-Patterns to Avoid
- **Fetching content in client components:** All content reading is filesystem I/O -- must happen in server components. Pass rendered HTML as string props to client components.
- **Hardcoded colors or spacing values:** All values must come from CSS custom properties via Tailwind tokens. The UI-SPEC defines exact token values.
- **Using `useEffect` for data loading:** This is a server-rendered content app. No `fetch()` calls, no `useEffect` data loading. Server components read files directly.
- **Heavy client bundles:** Mermaid is large (~2MB). Dynamically import it only in the MermaidRenderer client component. Do not import at the page level.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Focus trapping in slide-out | Manual focus management | `focus-trap-react` or manual with `inert` attribute | Edge cases with nested focusable elements, screen readers |
| Conditional CSS classes | String concatenation | `clsx` library | Handles falsy values, arrays, objects cleanly |
| Font loading | `<link>` tags or @font-face | `next/font/google` | Automatic optimization, zero layout shift, privacy |
| Markdown rendering | Custom renderer | Phase 1 `renderMarkdown()` | Already handles param tables, callouts, mermaid placeholders, wikilinks |
| Content grouping | Ad-hoc reduce | Dedicated `groupByModule()` helper | Reused across session list page and hero card logic |
| Route-based active state | Manual pathname parsing | `usePathname()` from `next/navigation` | Handles App Router's nested layout routing correctly |

**Key insight:** Phase 1 already solved content reading and markdown rendering. Phase 2 should consume those APIs, not rebuild them. The boundary is clear: server components call `listSessions()` / `readContentFile()`, pass rendered HTML strings to presentational components.

## Common Pitfalls

### Pitfall 1: Next.js 15 Async Params
**What goes wrong:** Using `params.slug` directly without `await` gives a Promise object, not a string. Runtime crash or silent "[object Promise]" in URLs.
**Why it happens:** Next.js 15 changed params to async. Most tutorials show the old synchronous pattern.
**How to avoid:** Always destructure from `await params`. TypeScript types will enforce this if properly typed.
**Warning signs:** URLs containing "[object Promise]" or "undefined" segments.

### Pitfall 2: Mermaid in Server Components
**What goes wrong:** Importing `mermaid` in a server component fails -- Mermaid requires DOM APIs (window, document).
**Why it happens:** Mermaid is a client-side rendering library.
**How to avoid:** Use Phase 1's mermaid-placeholder plugin (outputs `<div class="mermaid-placeholder">`) + a `'use client'` MermaidRenderer component. Dynamic import to avoid SSR: `const mermaid = await import('mermaid')`.
**Warning signs:** "window is not defined" or "document is not defined" errors during build.

### Pitfall 3: Tailwind v4 @theme vs :root
**What goes wrong:** Defining design tokens in `:root` instead of `@theme` means Tailwind doesn't generate utility classes for them.
**Why it happens:** Tailwind v4's CSS-first approach is new; v3 habits die hard.
**How to avoid:** All design tokens that need utility classes go in `@theme`. Use `:root` only for CSS variables that don't map to utilities. The color tokens (`--color-bg`, `--color-surface`, etc.) MUST be in `@theme` so `bg-bg`, `text-text`, `bg-surface` classes work.
**Warning signs:** Tailwind classes like `bg-surface` not applying styles.

### Pitfall 4: TypeScript Config Conflict
**What goes wrong:** Existing `tsconfig.json` uses `module: "NodeNext"` which conflicts with Next.js expectations of `"esnext"` or `"nodenext"` with jsx support.
**Why it happens:** Phase 1 was a pure Node.js project. Next.js needs its own tsconfig settings.
**How to avoid:** Next.js scaffolding will update `tsconfig.json`. Key changes: add `"jsx": "preserve"`, update `moduleResolution`, add `"next"` to types. Keep a separate `tsconfig.node.json` for scripts if needed.
**Warning signs:** JSX compilation errors, module resolution failures.

### Pitfall 5: Content Reader Path Resolution
**What goes wrong:** Content reader uses `process.cwd()` which works in Node scripts but may resolve differently in Next.js dev/build.
**Why it happens:** Next.js dev server may run from a different working directory.
**How to avoid:** `process.cwd()` works correctly in Next.js App Router server components -- it resolves to the project root. Verify during scaffolding that `loadConfig()` and `getContentRoot()` work in the Next.js context.
**Warning signs:** "File not found" errors when loading content in dev mode.

### Pitfall 6: Large Mermaid Bundle
**What goes wrong:** Mermaid (~2MB) gets bundled into every page, slowing initial load.
**Why it happens:** Static import at component level.
**How to avoid:** Use `next/dynamic` with `{ ssr: false }` for the MermaidRenderer component. Only pages with Mermaid diagrams load the library.
**Warning signs:** Large JavaScript bundle size in build output, slow page loads on pages without diagrams.

## Code Examples

### Tailwind v4 Design System Configuration
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors -- from UI-SPEC */
  --color-bg: #0a0a0a;
  --color-surface: #161616;
  --color-text: #e8e8e8;
  --color-muted: #737373;
  --color-accent: #c8ff00;
  --color-param: #a3e635;

  /* Fonts -- loaded via next/font, referenced by CSS variable */
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains-mono);

  /* Spacing scale (multiples of 4) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
}

@layer base {
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
    line-height: 1.6;
  }
}
```

### Root Layout with Fonts
```typescript
// src/app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Session Grouping Helper
```typescript
// src/lib/sessions.ts
import type { Session } from '@/lib/content/types';

interface SessionWithMeta {
  data: Session;
  content: string;
  slug: string;
}

interface ModuleGroup {
  module: string;
  sessions: SessionWithMeta[];
}

export function groupByModule(sessions: SessionWithMeta[]): ModuleGroup[] {
  const map = new Map<string, SessionWithMeta[]>();
  for (const s of sessions) {
    const existing = map.get(s.data.module) || [];
    existing.push(s);
    map.set(s.data.module, existing);
  }
  // Preserve order by first session_number in each module
  return Array.from(map.entries())
    .map(([module, sessions]) => ({ module, sessions }))
    .sort((a, b) => a.sessions[0].data.session_number - b.sessions[0].data.session_number);
}

export function getAdjacentSessions(
  sessions: SessionWithMeta[],
  currentSlug: string,
): { prev: SessionWithMeta | null; next: SessionWithMeta | null } {
  const idx = sessions.findIndex(s => s.slug === currentSlug);
  return {
    prev: idx > 0 ? sessions[idx - 1] : null,
    next: idx < sessions.length - 1 ? sessions[idx + 1] : null,
  };
}
```

### PostCSS Configuration
```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS) | `@theme` in CSS (v4) | Tailwind v4 (Jan 2025) | Configuration lives in CSS; no JS config file needed |
| Sync params in pages | Async params (Promise) | Next.js 15 (Oct 2024) | All dynamic route params must be `await`ed |
| `next lint` | Direct ESLint CLI | Next.js 16 (removed) | Even in Next.js 15, direct ESLint is preferred |
| Mermaid SSR | Client-side only | Ongoing | Mermaid requires DOM; use placeholder + client hydration |
| `experimental.turbopack` | Top-level `turbopack` | Next.js 16 | In Next.js 15, still under `experimental` if used |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Replaced by CSS-first `@theme` in v4
- Synchronous `params` access: Removed in Next.js 16, deprecated with warnings in Next.js 15
- `next/legacy/image`: Deprecated in Next.js 16

## Open Questions

1. **Mermaid theme integration with CSS custom properties**
   - What we know: Mermaid's `initialize()` accepts `themeVariables` but these are resolved at init time, not dynamically from CSS vars
   - What's unclear: Whether `var(--color-surface)` in themeVariables resolves correctly at runtime in a client component
   - Recommendation: Test during implementation; fallback is to pass hex values directly from a constants file that mirrors the CSS tokens

2. **Content reader compatibility with Next.js dev server**
   - What we know: `process.cwd()` works in Next.js server components; the content reader uses `glob` and `fs.readFile`
   - What's unclear: Whether Turbopack (if enabled) handles `glob` imports differently
   - Recommendation: Test early in scaffolding; the bundled content at `src/content/` should work without issues since it's within the project tree

3. **Framework docs content path**
   - What we know: `framework/README.md` and `framework/adhd-design.md` exist at project root, not inside `src/content/`
   - What's unclear: Whether the content reader needs extension to read from project root for INST-03
   - Recommendation: Either bundle framework docs into `src/content/framework/` during the bundle-content script, or read them directly with a simple `fs.readFile` in the about page server component

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | vitest 3.x (already configured) |
| Config file | `vitest.config.ts` (exists, globals enabled) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SESS-01 | Sessions grouped by module on list page | unit | `npx vitest run src/lib/__tests__/sessions.test.ts -t "groupByModule"` | Wave 0 |
| SESS-02 | Session detail renders formatted HTML | integration | `npx vitest run src/components/__tests__/session-detail.test.tsx` | Wave 0 |
| SESS-03 | Landing page shows next session hero | integration | `npx vitest run src/app/__tests__/home.test.tsx` | Wave 0 |
| SESS-04 | Quick-ref panel shows basic patch / signal flow | integration | `npx vitest run src/components/__tests__/quick-ref-panel.test.tsx` | Wave 0 |
| SESS-05 | Source references display inline | unit | `npx vitest run src/components/__tests__/source-ref.test.tsx` | Wave 0 |
| INST-01 | Instrument-scoped URL routing works | smoke | `npx vitest run src/app/__tests__/routing.test.tsx` | Wave 0 |
| INST-02 | Instrument overview page renders | integration | `npx vitest run src/app/__tests__/instrument-overview.test.tsx` | Wave 0 |
| INST-03 | Framework docs page renders | integration | `npx vitest run src/app/__tests__/about.test.tsx` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/sessions.test.ts` -- covers SESS-01 (groupByModule, getAdjacentSessions helpers)
- [ ] vitest.config.ts update -- add jsdom environment for component tests, add `@vitejs/plugin-react` for JSX
- [ ] `@testing-library/react` + `@testing-library/jest-dom` -- dependencies for component testing
- [ ] Component test files for SESS-02 through INST-03 (listed above)

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- breaking changes, async params, proxy rename (verified via WebFetch)
- [Tailwind CSS v4 @theme docs](https://tailwindcss.com/docs/theme) -- CSS-first configuration, namespace patterns (verified via WebFetch)
- [Tailwind CSS Next.js install guide](https://tailwindcss.com/docs/guides/nextjs) -- v4 setup with PostCSS (verified via WebFetch)
- npm registry -- verified versions: next@15.5.14, tailwindcss@4.2.2, lucide-react@1.7.0, mermaid@11.13.0

### Secondary (MEDIUM confidence)
- [Next.js Font Optimization docs](https://nextjs.org/docs/app/getting-started/fonts) -- Inter/JetBrains_Mono loading pattern
- [Mermaid client-side rendering pattern](https://www.andynanopoulos.com/blog/how-to-integrate-next-react-mermaid-markdown) -- placeholder + client hydration approach
- Phase 1 codebase -- verified content reader API, markdown processor, schemas, bundled content

### Tertiary (LOW confidence)
- Mermaid themeVariables CSS custom property resolution -- needs runtime validation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against npm registry, Next.js 15 is mature and well-documented
- Architecture: HIGH -- patterns directly from Next.js App Router docs and Phase 1 existing code
- Pitfalls: HIGH -- async params, Mermaid DOM requirement, Tailwind v4 @theme are well-documented gotchas
- Design system: HIGH -- UI-SPEC provides exact token values, Tailwind v4 @theme maps directly

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (30 days -- stable technologies)
