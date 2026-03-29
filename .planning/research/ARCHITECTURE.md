# Architecture Patterns

**Domain:** Obsidian-backed instrument learning platform (Next.js App Router)
**Researched:** 2026-03-29
**Confidence:** HIGH -- architecture is directly modeled on the proven PM Toolkit vault reader pattern, adapted for a narrower domain with fewer content types.

## Recommended Architecture

The system has three layers: a content layer (Obsidian vault or bundled demo content), a data access layer (vault reader with Zod validation), and a presentation layer (Next.js App Router with server components reading data and client components handling interactivity). This mirrors the PM Toolkit pattern exactly, scaled down.

```
                        +---------------------------+
                        |   Obsidian Vault (~/song)  |
                        |  sessions/ patches/ logs/  |
                        +------------+--------------+
                                     |
                                     | fs.readFileSync (server-only)
                                     v
+------------------+     +---------------------+
| Bundled Content  |---->| Content Reader       |
| (demo-content/)  |     | (strategy pattern)   |
+------------------+     | - VaultReader        |
                          | - BundledReader      |
                          +----------+----------+
                                     |
                                     | ParsedContent<T>
                                     v
                          +---------------------+
                          | Domain Services      |
                          | getSessions()        |
                          | getPatches()         |
                          | getProgress()        |
                          | getInstruments()     |
                          +----------+----------+
                                     |
                                     | typed data
                                     v
                   +----------------------------------+
                   |    Next.js App Router (RSC)       |
                   |                                    |
                   |  /                  Dashboard       |
                   |  /sessions          Session list    |
                   |  /sessions/[slug]   Session detail  |
                   |  /patches           Patch library   |
                   |  /patches/[slug]    Patch detail    |
                   |  /instruments       Selector        |
                   |  /instruments/[id]  Instrument home |
                   +----------------------------------+
                                     |
                                     | props
                                     v
                   +----------------------------------+
                   |    Client Components               |
                   |  - Progress toggles               |
                   |  - Patch search/filter             |
                   |  - Module navigation               |
                   |  - Instrument selector             |
                   +----------------------------------+
```

### Component Boundaries

| Component | Responsibility | Communicates With | Server/Client |
|-----------|---------------|-------------------|---------------|
| **Content Reader** | Read markdown + frontmatter from vault or bundled content. Return raw parsed data. | Filesystem, Config | Server-only |
| **Zod Schemas** | Validate and type frontmatter at the boundary. Reject malformed content gracefully. | Content Reader output | Server-only |
| **Domain Services** | Business logic: filter sessions by instrument/module, resolve module dependencies, compute progress, search patches. | Content Reader, Zod Schemas | Server-only |
| **Config** | Determine vault path, demo mode toggle, instrument list. Config file in project root. | Environment, filesystem | Server-only |
| **Route Handlers (RSC)** | Page-level server components. Call domain services, pass typed props to client components. | Domain Services | Server |
| **Client Components** | Interactive UI: progress checkboxes, search inputs, module tree navigation, instrument switcher. | Props from RSC | Client |
| **Markdown Renderer** | Convert session/patch markdown to React. Handle Obsidian wikilinks, parameter tables, code blocks. | Parsed content | Server (can be client for interactive elements) |
| **Demo Content** | Bundled curriculum markdown + synthetic progress data for Vercel deployment. | Content Reader (BundledReader) | Build-time / Server |

### Data Flow

**Read path (server-side, every request or ISR):**

1. Config determines content source: vault path or `demo-content/`
2. Content Reader reads `.md` files from the appropriate directory
3. `gray-matter` parses YAML frontmatter + markdown body (with JS execution disabled for security)
4. Zod schema validates frontmatter, producing typed `SessionFrontmatter`, `PatchFrontmatter`, etc.
5. Domain service applies business logic (filter by instrument, compute module completion, sort by sequence)
6. Server component receives typed data, renders page shell, passes interactive props to client components
7. Client components render with hydration (progress toggles, search, filters)

**Write path (Obsidian only, not the web app):**

The web app is read-only. All content authoring happens in Obsidian:
- Sessions are authored as markdown files with frontmatter
- Patches are documented manually after practice
- Progress is logged in daily notes using the session-log template
- The web app re-reads on each request (dev) or rebuild (production)

This is a critical architectural decision: the web app is a **visualization layer**, not a CMS. No write APIs, no database, no mutation endpoints.

### Multi-Instrument Data Model

The content is organized by instrument at the filesystem level, and the application treats `instrument` as the top-level routing/filtering dimension:

```
Content Root (vault or demo-content/)
├── instruments/
│   ├── evolver/
│   │   ├── overview.md          # InstrumentFrontmatter
│   │   ├── signal-flow.md
│   │   ├── basic-patch.md
│   │   └── modules.md           # ModuleMapFrontmatter
│   └── cascadia/
│       └── ...
├── sessions/
│   ├── evolver/
│   │   ├── 01-foundations-navigation.md   # SessionFrontmatter
│   │   └── ...
│   └── cascadia/
│       └── ...
├── patches/
│   ├── evolver/
│   │   └── ...                  # PatchFrontmatter
│   └── cascadia/
│       └── ...
└── progress/                    # synthetic in demo, vault-derived locally
    └── evolver.json             # or parsed from daily notes
```

The instrument slug (`evolver`, `cascadia`) is derived from directory names, not hardcoded. Adding a new instrument means creating the directory structure -- no code changes to the reader.

## Patterns to Follow

### Pattern 1: Strategy Pattern for Content Source

**What:** A single `ContentReader` interface with two implementations: `VaultReader` (local filesystem) and `BundledReader` (committed demo content). Selected by config file, not runtime detection.

**Why:** PM Toolkit proves this pattern. It prevents the critical pitfall of vault path divergence between local and Vercel. Build demo mode alongside vault mode from day one, not as an afterthought.

**Example:**
```typescript
// src/lib/content/reader.ts
import "server-only";

interface ContentReader {
  getSessions(instrument: string): ParsedContent<SessionFrontmatter>[];
  getPatches(instrument: string): ParsedContent<PatchFrontmatter>[];
  getInstruments(): ParsedContent<InstrumentFrontmatter>[];
  getModuleMap(instrument: string): ModuleMap | null;
}

function getReader(): ContentReader {
  const config = getConfig();
  if (config.demoMode) {
    return new BundledReader(config.contentRoot);
  }
  return new VaultReader(config.contentRoot);
}
```

### Pattern 2: Zod Schemas at Content Boundaries

**What:** Every frontmatter type has a Zod schema. Content is validated when parsed, not when rendered. Invalid content is logged and skipped, never crashes the page.

**Why:** Markdown frontmatter is untyped user input. Without validation, a missing `module` field in a session file produces a runtime error deep in a component. With Zod, you get a clear error at parse time and graceful degradation.

**Example:**
```typescript
// src/types/schemas.ts
import { z } from "zod";

export const SessionFrontmatterSchema = z.object({
  title: z.string().optional(),
  module: z.string(),
  duration: z.number().min(5).max(30),
  session_number: z.number().int().positive(),
  prerequisite: z.union([z.number(), z.null()]).optional(),
  instrument: z.string().optional(), // derived from directory if absent
  tags: z.array(z.string()).optional(),
  outputs: z.array(z.string()).optional(),
});

export const PatchFrontmatterSchema = z.object({
  title: z.string().optional(),
  session: z.number().optional(),
  location: z.string().optional(), // "P:128 B:1"
  type: z.enum(["bass", "lead", "pad", "texture", "drum", "sequence", "utility"]).optional(),
  instrument: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
```

### Pattern 3: Server Components for Data, Client Components for Interaction

**What:** Page-level components are React Server Components that call domain services directly (no API routes). Client components are leaf nodes that handle clicks, search input, and state.

**Why:** This is the Next.js App Router's design intent. Server components can use `fs`, call the vault reader, and pass typed props down. No need for API routes or client-side data fetching for read-only content.

**Example:**
```typescript
// src/app/sessions/[instrument]/page.tsx (Server Component)
import { getSessions } from "@/lib/services/sessions";
import { SessionList } from "@/components/session-list"; // Client

export default async function SessionsPage({ params }: { params: { instrument: string } }) {
  const sessions = getSessions(params.instrument);
  return <SessionList sessions={sessions} instrument={params.instrument} />;
}
```

### Pattern 4: Filesystem-Driven Instrument Registry

**What:** Instruments are discovered by scanning directories, not maintained in a config file. The `instruments/` directory is the source of truth for what instruments exist.

**Why:** Adding Cascadia (or any future instrument) should require zero code changes. Create the directory structure, add the content, and the app picks it up. This is the extensibility requirement from PROJECT.md.

### Pattern 5: Progress as Derived State

**What:** In local mode, progress is derived by reading Obsidian daily notes and extracting session-log entries (matching tags like `#evolver #session-01`). In demo mode, progress is synthetic JSON bundled with demo content.

**Why:** Progress data lives in daily notes, not in session files. The web app computes "sessions completed" by scanning logs, not by maintaining a separate database. This keeps Obsidian as the single source of truth.

**Complexity note:** Parsing daily notes for progress is the most complex data access pattern in the system. It requires scanning a date-range of daily notes, extracting structured data from template entries, and aggregating by instrument/session. This should be built after the basic session/patch reader is working, not alongside it.

## Anti-Patterns to Avoid

### Anti-Pattern 1: API Routes for Read-Only Content

**What:** Building `/api/sessions` endpoints that the client fetches from.

**Why bad:** Adds unnecessary latency, complexity, and an extra layer of serialization. Server components can call the vault reader directly. API routes are for mutations and external integrations, neither of which this app has.

**Instead:** Use server components with direct domain service calls. If you need client-side filtering, pass the full (small) dataset as props and filter client-side.

### Anti-Pattern 2: Database for Content Storage

**What:** Importing markdown into SQLite/Postgres at build time, then querying the database.

**Why bad:** Adds sync complexity, stale data risk, and a build step that can fail. The content set is small (35 sessions, ~50 patches, a handful of instrument files). Reading markdown from disk is fast enough for every use case here.

**Instead:** Read markdown directly. If performance becomes an issue (it will not with <200 files), add in-memory caching in the vault reader.

### Anti-Pattern 3: Client-Side Markdown Parsing

**What:** Shipping raw markdown to the browser and parsing with `react-markdown` on the client.

**Why bad:** Increases bundle size (gray-matter + remark plugins), exposes raw vault paths, and duplicates server work. Markdown should be parsed to HTML/React on the server.

**Instead:** Parse markdown in server components using `remark`/`rehype` and pass rendered React elements or sanitized HTML as props.

### Anti-Pattern 4: Hardcoded Instrument Configuration

**What:** A config file or constant listing `["evolver", "cascadia"]` that must be updated when adding instruments.

**Why bad:** Violates the extensibility constraint. Every new instrument requires a code change and redeploy.

**Instead:** Discover instruments from the filesystem. The `instruments/` directory IS the registry.

### Anti-Pattern 5: Progress Tracking in the Web App

**What:** Adding a "mark complete" button that writes back to the vault or stores state in localStorage/database.

**Why bad:** Breaks the "Obsidian is source of truth" constraint. Creates two sources of truth for progress. The daily note workflow is the accountability mechanism -- it should not be bypassed.

**Instead:** In demo mode, use synthetic progress data. In local mode, derive progress from daily notes. The web app is read-only.

## Key Technical Decisions

### Markdown Processing Pipeline

Use `gray-matter` for frontmatter extraction (with JS engine disabled), `remark` for markdown-to-HTML transformation, and custom plugins for:
- Obsidian wikilink conversion (`[[session-01]]` to internal links)
- Parameter table formatting (patch parameter dumps)
- Callout/admonition support (the `> **If you only have 5 minutes**` pattern in sessions)

### Config File Format

Follow the PM Toolkit pattern: a config file in the project root (`evolver.config.json` or `.yaml`):

```json
{
  "vaultPath": "~/song",
  "demoMode": false,
  "contentPaths": {
    "instruments": "instruments",
    "sessions": "sessions",
    "patches": "patches"
  },
  "dailyNotesFolder": "daily-notes"
}
```

When `vaultPath` is null or the path does not exist, demo mode activates automatically.

### Route Structure

```
/                           → Dashboard (progress overview, recent activity)
/[instrument]               → Instrument home (module map, progress)
/[instrument]/sessions      → Session list (grouped by module)
/[instrument]/sessions/[slug] → Session detail (full content, exercises, output checklist)
/[instrument]/patches       → Patch library (searchable, filterable by type)
/[instrument]/patches/[slug]  → Patch detail (parameter table, playing tips)
```

The instrument slug is the first path segment after root. This makes multi-instrument support a natural URL structure and allows instrument-scoped layouts.

## Scalability Considerations

| Concern | Current Scale (Evolver) | At 3 Instruments | At 10 Instruments |
|---------|------------------------|-------------------|-------------------|
| Content files | ~50 files | ~150 files | ~500 files |
| Read performance | Instant (<10ms) | Instant (<30ms) | Still fast (<100ms), consider caching |
| Build time | Negligible | Negligible | Still fast, no concern |
| Route complexity | Simple | Simple (instrument param) | Same pattern, no change |
| Daily note scanning | Scan ~100 notes | Same notes, more tags | Same notes, more tags |

This architecture will not hit scaling limits within its intended use. The bottleneck, if any, would be daily note scanning for progress data -- and that can be mitigated with date-range limiting (only scan last 90 days) or a simple cache.

## Suggested Build Order

Based on component dependencies, the recommended build sequence is:

```
Phase 1: Foundation (no UI yet)
├── 1a. Config module (reads evolver.config.json, determines mode)
├── 1b. Zod schemas for all frontmatter types
├── 1c. Content Reader interface + BundledReader implementation
└── 1d. VaultReader implementation (same interface, different source)

Phase 2: Core Data + Minimal UI
├── 2a. Domain services: getSessions(), getPatches(), getInstruments()
├── 2b. Markdown processing pipeline (gray-matter + remark + wikilinks)
├── 2c. Session list page (server component, grouped by module)
└── 2d. Session detail page (full rendered content)

Phase 3: Patch Library + Navigation
├── 3a. Patch list page (filterable by type)
├── 3b. Patch detail page (parameter tables)
├── 3c. Instrument selector + instrument home page
└── 3d. Module map visualization (dependency tree from modules.md)

Phase 4: Progress + Dashboard
├── 4a. Demo progress data (synthetic JSON)
├── 4b. Progress computation from daily notes (local mode)
├── 4c. Dashboard page (completion %, streak, recent patches)
└── 4d. Session output checklists with progress indicators

Phase 5: Polish + Deploy
├── 5a. Demo content bundle (curriculum + synthetic progress)
├── 5b. Vercel deployment configuration
├── 5c. Responsive design pass
└── 5d. Search across sessions and patches
```

**Dependency rationale:**
- Config and schemas must exist before any reader code
- Reader must work before any UI can render real content
- Sessions before patches (sessions are the primary content type)
- Progress last because it depends on daily note parsing (most complex data access) and all other views existing to show progress within
- Demo mode content bundling happens alongside development (not deferred) but the Vercel deployment is a final step

## Sources

- PM Toolkit codebase (local reference: `/Users/andrewlovettbarron/src/pmtoolkit/`) -- vault reader pattern, config pattern, content type system, demo mode implementation. HIGH confidence.
- Next.js App Router server/client component model -- standard pattern, well-documented. HIGH confidence.
- `gray-matter` security consideration (disable JS engine) -- from PM Toolkit implementation, validated by library docs. HIGH confidence.
- Existing Evolver session/patch/module content in this repo -- confirms data model and frontmatter structure. HIGH confidence.
