# Stack Research

**Domain:** Obsidian-backed Next.js learning platform (instrument mastery)
**Researched:** 2026-03-29
**Confidence:** HIGH

## Recommended Stack

This stack mirrors the proven PM Toolkit pattern: Next.js App Router with server components reading markdown files via gray-matter, rendered with react-markdown and rehype/remark plugins, styled with Tailwind CSS v4. The Evolver project is simpler than PM Toolkit (no database, no monorepo, no CLI) so the stack is deliberately minimal.

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | ^16.2 | App Router framework, server components for vault reading | Proven pattern from PM Toolkit (running 16.1.6). App Router server components are the natural fit for reading filesystem content at request time. Turbopack dev server is now default and fast |
| React | ^19.2 | UI library | Current stable (19.2.4). Server components for vault I/O, client components for progress tracking and interactivity |
| TypeScript | ^5 | Type safety | Non-negotiable for Zod schema inference and catching frontmatter shape errors at build time |
| Tailwind CSS | ^4.2 | Styling | CSS-first config in v4 eliminates tailwind.config.js. PM Toolkit already runs v4. Faster builds than v3 |
| pnpm | ^10 | Package manager | Matches PM Toolkit. Faster installs, strict dependency resolution |

### Content Pipeline (Obsidian -> Web)

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| gray-matter | ^4.0.3 | Parse YAML frontmatter from markdown files | Industry standard (used by Gatsby, Astro, VitePress). PM Toolkit uses it. Stable at 4.0.3 for years -- battle-tested. MUST disable JS engine for security |
| react-markdown | ^10.1.0 | Render markdown as React components | PM Toolkit uses it. Supports custom component mapping for synth parameter tables, callout boxes, audio embeds |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown (tables, task lists, strikethrough) | Sessions use markdown tables extensively for parameter values. Tables are core to patch documentation |
| rehype-pretty-code | ^0.14.3 | Syntax highlighting via Shiki | PM Toolkit pattern. Better than raw Shiki integration -- handles code blocks automatically with line numbers, highlighting |
| rehype-raw | ^7.0.0 | Allow raw HTML in markdown | Needed for embedded audio players and custom HTML in session content |
| rehype-slug | ^6.0.0 | Add IDs to headings | Enables linking to specific exercises within sessions (e.g., /sessions/evolver/01#exercise-3) |
| shiki | ^4.0 | Syntax highlighting engine (used by rehype-pretty-code) | Peer dependency of rehype-pretty-code. VS Code-quality highlighting |
| Zod | ^4.3 | Schema validation for frontmatter | PM Toolkit pattern. Validate session frontmatter, patch frontmatter, instrument config at the boundary. TypeScript inference from schemas |

### UI Components

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| radix-ui | ^1.4.3 | Accessible UI primitives (dialogs, popovers, progress bars) | Progress bars for module completion, instrument selector dropdown, session detail popovers. Use the unified package, not individual @radix-ui/react-* packages |
| lucide-react | ^1.7.0 | Icons | Navigation icons, progress indicators, instrument icons, status badges |
| class-variance-authority | ^0.7.1 | Component variant management | Button/card variants (session status: not-started/in-progress/complete) |
| clsx | ^2.1.1 | Conditional class composition | Used alongside tailwind-merge for className logic |
| tailwind-merge | ^3.4.0 | Merge Tailwind classes without conflicts | Prevents duplicate/conflicting Tailwind classes in component composition |
| next-themes | ^0.4.6 | Dark/light mode toggle | Synth learning happens in studios -- dark mode is the primary theme |

### Obsidian Integration

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| obsidian-callouts-markdown | ^1.0.5 | Render Obsidian-style callouts in react-markdown | PM Toolkit uses this. Supports `> [!tip]`, `> [!warning]` etc. Sessions use callouts for "If you only have 5 minutes" shortcuts |
| server-only | ^0.0.1 | Prevent vault reader from being imported in client components | Security boundary. Vault reader touches filesystem -- must stay server-side |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @tailwindcss/postcss | PostCSS plugin for Tailwind v4 | Required for Tailwind v4 CSS-first workflow |
| vitest | Unit/integration testing | PM Toolkit pattern. Faster than Jest, native ESM, works with React Testing Library |
| @testing-library/react | Component testing | Test session rendering, progress state, markdown output |
| eslint + eslint-config-next | Linting | Next.js-aware rules out of the box |
| tw-animate-css | Tailwind animation utilities | Subtle progress animations, session transitions |

## Installation

```bash
# Core framework
pnpm add next@^16.2 react@^19.2 react-dom@^19.2

# Content pipeline
pnpm add gray-matter@^4.0.3 react-markdown@^10.1.0 remark-gfm@^4.0.1 rehype-pretty-code@^0.14.3 rehype-raw@^7.0.0 rehype-slug@^6.0.0 shiki@^4.0 zod@^4.3

# UI
pnpm add radix-ui@^1.4.3 lucide-react@^1.7.0 class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^3.4.0 next-themes@^0.4.6

# Obsidian integration
pnpm add obsidian-callouts-markdown@^1.0.5 server-only@^0.0.1

# Dev dependencies
pnpm add -D typescript@^5 @types/node@^20 @types/react@^19 @types/react-dom@^19 @tailwindcss/postcss@^4 tailwindcss@^4 eslint@^9 eslint-config-next@^16.2 vitest@^4 @testing-library/react@^16 @testing-library/dom@^10 @testing-library/jest-dom@^6 tw-animate-css@^1.4
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| react-markdown + rehype | next-mdx-remote / MDX | If you need interactive components embedded in markdown. This project doesn't -- sessions are pure content with parameter tables. MDX adds compilation complexity for no benefit |
| gray-matter | @content-collections/core | If you want build-time content validation with watch mode. Overkill for a single-user tool reading from a local vault |
| Zod v4 | Zod v3 (3.24.x) | Only if a dependency requires Zod v3 peer. v4 has better performance and cleaner API. PM Toolkit could upgrade too |
| rehype-pretty-code | Shiki directly | If you need fine-grained control over highlighting. rehype-pretty-code wraps Shiki with sensible defaults for markdown pipelines |
| radix-ui (unified) | shadcn/ui | If you want pre-styled components. This project is simple enough that raw Radix + Tailwind is cleaner. shadcn/ui adds a CLI, component registry, and opinions about styling that aren't needed for a personal tool |
| pnpm | npm | Never. pnpm is strictly better for workspace projects and matches PM Toolkit |
| Flat file reading | SQLite (better-sqlite3) | If you need querying, aggregation, or cross-referencing at scale. PM Toolkit added SQLite for complex PRD/stakeholder relationships. This project has ~35 sessions and ~50 patches -- flat file reading is sufficient |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Contentlayer | Abandoned / unmaintained since 2023. Known build issues with newer Next.js versions | gray-matter + custom vault reader (PM Toolkit pattern) |
| next-mdx-remote | Adds JSX compilation step to every page render. Sessions are pure markdown with tables -- no interactive components needed in content | react-markdown with remark/rehype plugins |
| Prisma / Drizzle | No database in this project. Content lives in Obsidian markdown files. Adding an ORM is architectural over-engineering | Direct filesystem reads via Node.js fs |
| @mdx-js/react | See next-mdx-remote above. MDX is for interactive content. This is a read-only learning tool | react-markdown |
| styled-components / CSS modules | PM Toolkit uses Tailwind. Mixing paradigms creates maintenance burden | Tailwind CSS v4 |
| moment.js / dayjs | No date manipulation needed. Sessions are sequence-based, not calendar-based (per ADHD design principles) | Native Date if ever needed |
| Zustand / Redux | No complex client state. Progress is tracked in Obsidian vault files, not in-browser state. Server components handle data flow | React useState + server components |
| MongoDB / Firebase | Cloud databases add deployment complexity and auth requirements for a personal tool with demo mode | Filesystem reads + demo-content directory |

## Stack Patterns by Variant

**If running locally (vault mode):**
- Vault reader reads from `~/song` (Obsidian vault path from config)
- Real session progress, real patches, real practice data
- Config: `evolver.config.yaml` with `vaultPath: ~/song`

**If deployed to Vercel (demo mode):**
- Vault reader falls back to `demo-content/` directory bundled in repo
- Curriculum is visible, practice data is synthetic
- `outputFileTracingIncludes` in next.config.ts must include `./demo-content/**/*`
- No config file needed -- absence of vault path triggers demo mode automatically

**If adding a second instrument (Cascadia):**
- No stack changes needed
- Content structure already supports `sessions/<instrument>/`, `patches/<instrument>/`
- Vault reader uses instrument as content type parameter

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| next@^16.2 | react@^19.2 | Next.js 16 requires React 19. Do not attempt React 18 |
| rehype-pretty-code@^0.14 | shiki@^4.0 | rehype-pretty-code uses Shiki as peer dependency. Must use Shiki 4.x |
| tailwindcss@^4.2 | @tailwindcss/postcss@^4 | Tailwind v4 uses PostCSS plugin, not the old tailwindcss CLI |
| zod@^4.3 | typescript@^5 | Zod v4 requires TS 5.x for proper type inference |
| radix-ui@^1.4 | react@^19 | Unified Radix package works with React 19 |
| react-markdown@^10.1 | remark-gfm@^4, rehype-raw@^7, rehype-slug@^6 | All part of the unified remark/rehype ecosystem. Compatible by design |

## Sources

- PM Toolkit `package.json` (running in production) -- PRIMARY source for version compatibility and library selection (HIGH confidence)
- PM Toolkit vault-reader, content-parser, config patterns -- Proven architecture to replicate (HIGH confidence)
- [Next.js releases](https://github.com/vercel/next.js/releases) -- v16.2.1 latest (HIGH confidence)
- [React versions](https://react.dev/versions) -- v19.2.4 latest (HIGH confidence)
- [Tailwind CSS releases](https://github.com/tailwindlabs/tailwindcss/releases) -- v4.2.2 latest (HIGH confidence)
- [Shiki npm](https://www.npmjs.com/package/shiki) -- v4.0.2 latest (HIGH confidence)
- [react-markdown npm](https://www.npmjs.com/package/react-markdown) -- v10.1.0 latest (HIGH confidence)
- [gray-matter npm](https://www.npmjs.com/package/gray-matter) -- v4.0.3 latest, stable for years (HIGH confidence)
- [rehype-pretty-code npm](https://www.npmjs.com/package/rehype-pretty-code) -- v0.14.3 latest (HIGH confidence)
- [Zod v4 release notes](https://zod.dev/v4) -- v4.3.6 latest (HIGH confidence)
- [Radix UI unified package](https://ui.shadcn.com/docs/changelog/2026-02-radix-ui) -- v1.4.3 (HIGH confidence)
- [lucide-react npm](https://www.npmjs.com/package/lucide-react) -- v1.7.0 latest (HIGH confidence)

---
*Stack research for: Obsidian-backed Next.js instrument learning platform*
*Researched: 2026-03-29*
