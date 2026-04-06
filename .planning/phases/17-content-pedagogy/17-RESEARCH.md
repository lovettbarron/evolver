# Phase 17: Content & Pedagogy - Research

**Researched:** 2026-04-06
**Domain:** Content authoring (markdown + Zod schema), Next.js routing, pedagogical session design
**Confidence:** HIGH

## Summary

Phase 17 is a content-first phase with a small amount of code plumbing. The bulk of the work is authoring troubleshooting checklists and partial recipe sessions, with a thin code layer to serve the troubleshooting content via a new route and card on the instrument home page.

The codebase already has all the patterns needed: Zod schema validation at content boundary (`schemas.ts`), `readContentFile()` for markdown + frontmatter loading, `gray-matter` for parsing, and instrument-scoped Next.js routes (`/instruments/[slug]/...`). The new troubleshooting route follows the exact same pattern as existing routes (server component reads content, renders HTML). Partial recipe sessions use the existing `SessionSchema` with no schema changes needed.

**Primary recommendation:** Split into three plans: (1) troubleshooting schema + reader + route + card, (2) troubleshooting content for both instruments, (3) partial recipe sessions for both instruments. Plans 2 and 3 are pure content authoring with no code dependencies on each other.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Symptom-based checklist format -- each symptom is an H2 section with 3-5 ordered checkbox items to verify
- **D-02:** Specific parameter values in checks (e.g., "Master Vol > 80", "Osc1 Lvl > 80") -- no ambiguity, zero decision fatigue
- **D-03:** One markdown file per instrument, colocated with existing instrument data: `src/content/instruments/<instrument>/troubleshooting.md`
- **D-04:** Content lives in the app (`src/content/`), NOT in the Obsidian vault -- vault is for practice data and personal patches only. Uses a custom Zod schema for the troubleshooting content type
- **D-05:** Four Evolver symptom categories: No audio output, Filter sounds wrong, Modulation not working, MIDI/SysEx issues
- **D-06:** 3-5 checklist items per symptom, covering the most common causes
- **D-07:** Four Cascadia symptom categories: No audio output, No output from patch point, Unexpected sound behavior, Modulation routing issues
- **D-08:** 3-5 checklist items per symptom, tailored to Cascadia's semi-modular architecture
- **D-09:** Sessions placed after existing curriculum -- Evolver: sessions 36-37, Cascadia: sessions 26-27
- **D-10:** Two partial recipe sessions per instrument, each targeting a different sound type
- **D-11:** Structure: target sound description + starting patch + numbered steps with 2-3 key parameters left as blanks (underscores)
- **D-12:** Each gap includes a parenthetical hint referencing the specific prior session that covered the technique
- **D-13:** Uses existing session schema -- no special `output_type` extension needed
- **D-14:** Troubleshooting accessible via a card on the instrument home page
- **D-15:** Renders as its own route page: `/instruments/[slug]/troubleshooting`
- **D-16:** Partial recipe sessions appear in session list with no special visual treatment

### Claude's Discretion
- Troubleshooting card visual treatment (icon, description text, hover state)
- Specific checklist items per symptom (following manual references)
- Which sound types to use for partial recipes per instrument
- Which specific parameters to leave as gaps and which prior sessions to reference in hints
- Troubleshooting page layout (header, section spacing, visual treatment of checklist items)
- Zod schema shape for troubleshooting content type

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONTENT-01 | Each instrument has a troubleshooting guide addressing common issues | Zod schema for troubleshooting content type, new `getTroubleshooting()` reader function, new route at `/instruments/[slug]/troubleshooting`, card on instrument home page |
| CONTENT-02 | 1-2 transitional "partial recipe" sessions exist that give incomplete instructions | Existing `SessionSchema` with standard frontmatter, sessions 36-37 (Evolver) and 26-27 (Cascadia), written to `sessions/`, `src/content/sessions/`, and `~/song/sessions/` |
</phase_requirements>

## Standard Stack

No new libraries needed. This phase uses the existing stack exclusively.

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | Already in project | Schema validation for troubleshooting frontmatter | All content types validated via Zod at parse time |
| gray-matter | Already in project | Frontmatter parsing for markdown files | Established content pipeline pattern |
| next | Already in project | Server component route for troubleshooting page | Instrument-scoped routing pattern |
| lucide-react | Already in project | Icon for troubleshooting card | Used throughout UI (FileText, etc.) |

### Alternatives Considered
None -- this phase has no library decisions. Everything uses existing infrastructure.

## Architecture Patterns

### Content File Placement
```
src/content/
├── instruments/
│   ├── evolver/
│   │   ├── overview.md
│   │   ├── signal-flow.md
│   │   ├── basic-patch.md
│   │   └── troubleshooting.md        # NEW (D-03)
│   └── cascadia/
│       ├── overview.md
│       ├── signal-flow.md
│       └── troubleshooting.md         # NEW (D-03)
├── sessions/
│   ├── evolver/
│   │   ├── ...35 existing sessions...
│   │   ├── 36-partial-recipe-*.md     # NEW (D-09)
│   │   └── 37-partial-recipe-*.md     # NEW (D-09)
│   └── cascadia/
│       ├── ...25 existing sessions...
│       ├── 26-partial-recipe-*.md     # NEW (D-09)
│       └── 27-partial-recipe-*.md     # NEW (D-09)
```

### Pattern 1: Troubleshooting Schema (new Zod schema)

The troubleshooting content needs its own Zod schema since it is a new content type with different frontmatter than sessions or instrument files.

```typescript
// In src/lib/content/schemas.ts
export const TroubleshootingSchema = z.object({
  type: z.literal('troubleshooting'),
  instrument: z.string(),
  title: z.string(),
}).passthrough();

export type Troubleshooting = z.infer<typeof TroubleshootingSchema>;
```

The `.passthrough()` pattern is used by all existing schemas in this codebase to allow additional frontmatter fields without breaking validation.

### Pattern 2: Content Reader Function (follows existing pattern)

```typescript
// In src/lib/content/reader.ts
export async function getTroubleshooting(
  instrument: string,
  config: AppConfig,
): Promise<{ data: Troubleshooting; content: string } | null> {
  try {
    return await readContentFile(
      `instruments/${instrument}/troubleshooting.md`,
      TroubleshootingSchema,
      config,
    );
  } catch {
    return null;
  }
}
```

This follows the same pattern as `loadInstrumentConfig()` -- single-file read with graceful null return if the file does not exist.

### Pattern 3: Route Page (server component)

```
src/app/instruments/[slug]/troubleshooting/page.tsx
```

Server component that calls `getTroubleshooting(slug, config)`, calls `renderMarkdown()` on the content, and renders the HTML. Follows the exact same pattern as other instrument-scoped pages. Returns `notFound()` if no troubleshooting file exists.

### Pattern 4: Instrument Home Card (integration into InstrumentOverview)

The `InstrumentOverview` component currently renders links at the bottom (Basic Patch Reference, Start Curriculum, Explore Modules). The troubleshooting card should be added here. The component needs a new boolean prop like `hasTroubleshooting` to conditionally render the card, matching how `hasBasicPatch` works.

The server page (`src/app/instruments/[slug]/page.tsx`) passes the prop by checking if troubleshooting content exists.

### Pattern 5: Partial Recipe Session (existing SessionSchema)

Per D-13, partial recipe sessions use the existing `SessionSchema`. The frontmatter looks identical to a normal session:

```yaml
---
title: "Session 36: Partial Recipe -- [Sound Type]"
module: "Transitional"
session_number: 36
duration: 25
prerequisite: 35
output_type: patch
difficulty: advanced
tags: [partial-recipe, transitional, sound-design, ...]
instrument: evolver
---
```

The "partial recipe" nature is entirely in the markdown body, not the schema. Gaps are rendered as underscores in the numbered steps, with parenthetical hints.

### Pattern 6: Triple-Location Session Files

Per CLAUDE.md content pipeline rules, session markdown must exist in three locations:
1. `sessions/<instrument>/` -- canonical source
2. `src/content/sessions/<instrument>/` -- bundled for demo mode
3. `~/song/sessions/<instrument>/` -- Obsidian vault copy

All three must have identical content.

### Anti-Patterns to Avoid
- **Do NOT create a new `output_type` enum value** for partial recipes -- D-13 explicitly says no schema extension
- **Do NOT put troubleshooting content in the Obsidian vault** -- D-04 says content lives in the app
- **Do NOT make troubleshooting a new `type` value in `InstrumentFileSchema`** -- it needs its own schema because the existing `InstrumentFileSchema` requires `type` to be one of `overview|signal-flow|basic-patch|modules|module`, and troubleshooting has different semantics
- **Do NOT add special visual treatment to partial recipe sessions in the session list** -- D-16 says same row styling

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown parsing | Custom parser | `gray-matter` + `renderMarkdown()` | Already handles frontmatter, callouts, parameter tables |
| Schema validation | Manual checks | Zod schema with `.parse()` | Established pattern, type inference, error messages |
| Route setup | Custom routing | Next.js `[slug]` dynamic routes | Exact pattern used by all instrument pages |
| Checkbox rendering | Custom checkbox component | Standard markdown checkboxes `- [ ]` | Markdown processor already renders these |

## Common Pitfalls

### Pitfall 1: Forgetting Triple-Location Session Sync
**What goes wrong:** Sessions created only in `src/content/sessions/` but not in `sessions/` and `~/song/sessions/`
**Why it happens:** Developer only thinks about the bundled content directory
**How to avoid:** Every plan task that creates session files must explicitly list all three paths
**Warning signs:** Session appears in demo mode but not in vault mode (or vice versa)

### Pitfall 2: Session Number Collision
**What goes wrong:** New sessions use numbers already taken by existing sessions
**Why it happens:** Not checking what the last session number is
**How to avoid:** Evolver sessions end at 35, new ones start at 36. Cascadia sessions end at 25, new ones start at 26. Verified against `src/content/sessions/` listing above
**Warning signs:** Duplicate session numbers in the session list

### Pitfall 3: Troubleshooting Schema Conflicting with InstrumentFileSchema
**What goes wrong:** Using `listInstrumentFiles()` to discover troubleshooting.md, which fails because it validates against `InstrumentFileSchema` which requires `type` to be one of the existing enum values
**Why it happens:** Troubleshooting.md lives in the same directory as other instrument files
**How to avoid:** Create a separate `getTroubleshooting()` function that reads the specific file with the `TroubleshootingSchema`, NOT discovered via `listInstrumentFiles()`. Alternatively, the `listInstrumentFiles` glob `*.md` will pick up troubleshooting.md and fail validation -- this needs to be handled by either filtering the glob or catching the error
**Warning signs:** Zod validation errors when loading the instrument overview page

### Pitfall 4: Missing `prerequisite` Chain for New Sessions
**What goes wrong:** New sessions have `prerequisite: null` or reference wrong session numbers
**Why it happens:** Forgetting to chain them into the curriculum
**How to avoid:** Evolver 36 has `prerequisite: 35`, 37 has `prerequisite: 36`. Cascadia 26 has `prerequisite: 25`, 27 has `prerequisite: 26`
**Warning signs:** Sessions appear as "available" instead of following sequence in the session list

### Pitfall 5: listInstrumentFiles Picking Up troubleshooting.md
**What goes wrong:** The existing `listInstrumentFiles()` function uses `glob(root/instruments/slug/*.md)` which will match `troubleshooting.md`. Since the file's frontmatter has `type: 'troubleshooting'` instead of one of the valid `InstrumentFileSchema` types, it will throw a `ZodError`
**Why it happens:** New file in a directory already scanned by another function
**How to avoid:** Either (a) filter `troubleshooting.md` out of the glob results in `listInstrumentFiles()`, or (b) add `'troubleshooting'` to the `InstrumentFileSchema` type enum (less clean), or (c) use `.safeParse()` instead of `.parse()` and skip files that fail validation. Option (a) is cleanest
**Warning signs:** Instrument overview page crashes after adding troubleshooting.md

## Code Examples

### Troubleshooting Frontmatter Format
```yaml
---
type: troubleshooting
instrument: evolver
title: "Evolver Troubleshooting Guide"
---

## No Audio Output

- [ ] **Master Volume** > 80 (parameter 36)
- [ ] **Osc 1 Level** > 80 or **Osc 2 Level** > 80
- [ ] **VCA Envelope Amount** > 0 (check ENV 2 is routed to VCA)
- [ ] Audio cable connected to Main Output (left = mono)
- [ ] External audio interface input gain is up
```

### Partial Recipe Gap Format (from D-11, D-12)
```markdown
### Step 3: Shape the Filter

1. Set **LPF Frequency** = `____` (hint: Session 11 covered filter basics -- what cutoff gives a warm but not muddy bass?)
2. Set **Resonance** = `____` (hint: Session 13 explored self-oscillation -- how much resonance adds character without squealing?)
3. Set **Env Amount** = `80`, **Decay** = `45`, **Sustain** = `5`
```

### InstrumentOverview Card Addition
```typescript
// In instrument-overview.tsx, add alongside existing links:
{hasTroubleshooting && (
  <Link
    href={`/instruments/${slug}/troubleshooting`}
    className="text-text underline underline-offset-2 hover:text-accent"
  >
    Troubleshooting Guide
  </Link>
)}
```

### Handling listInstrumentFiles Conflict
```typescript
// In reader.ts, filter out troubleshooting.md from listInstrumentFiles:
const files = await glob(pattern);
const filtered = files.filter(f => !f.endsWith('troubleshooting.md'));
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.x |
| Config file | vitest config in package.json |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONTENT-01a | TroubleshootingSchema validates correct frontmatter | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "troubleshooting" -x` | Wave 0 |
| CONTENT-01b | getTroubleshooting returns parsed content | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "getTroubleshooting" -x` | Wave 0 |
| CONTENT-01c | listInstrumentFiles does not break with troubleshooting.md present | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "listInstrumentFiles" -x` | Exists (extend) |
| CONTENT-01d | Instrument overview renders troubleshooting card | unit | `npx vitest run src/app/__tests__/instrument-overview.test.tsx -t "troubleshooting" -x` | Exists (extend) |
| CONTENT-01e | Troubleshooting markdown files parse without error | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "troubleshooting content" -x` | Wave 0 |
| CONTENT-02a | New session files validate against SessionSchema | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "partial recipe" -x` | Wave 0 |
| CONTENT-02b | Session numbers are sequential with correct prerequisites | unit | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -x` | Exists (extend) |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Troubleshooting fixture file in `src/lib/content/__tests__/__fixtures__/instruments/evolver/troubleshooting.md`
- [ ] Tests for `TroubleshootingSchema` validation
- [ ] Tests for `getTroubleshooting()` reader function
- [ ] Tests for `listInstrumentFiles()` not breaking when troubleshooting.md exists
- [ ] Extend `instrument-overview.test.tsx` for troubleshooting card rendering

## Sources

### Primary (HIGH confidence)
- `src/lib/content/schemas.ts` -- All existing Zod schemas, pattern for new schema
- `src/lib/content/reader.ts` -- Content reading functions, pattern for `getTroubleshooting()`
- `src/app/instruments/[slug]/page.tsx` -- Instrument home page server component
- `src/components/instrument-overview.tsx` -- Client component where troubleshooting card goes
- `src/content/sessions/evolver/` -- 35 existing sessions, last is 35-integration-composition.md
- `src/content/sessions/cascadia/` -- 25 existing sessions, last is 25-sound-design-ambient.md
- `src/content/instruments/evolver/` -- Existing instrument files (overview.md, signal-flow.md, basic-patch.md)
- `src/content/instruments/cascadia/` -- Existing instrument files (overview.md, signal-flow.md)

### Secondary (MEDIUM confidence)
- Session content patterns verified by reading actual session files (27-recipes-bass.md, 35-integration-composition.md, 25-sound-design-ambient.md)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new libraries, all existing infrastructure
- Architecture: HIGH -- all patterns directly observed in codebase
- Pitfalls: HIGH -- pitfall 3/5 (listInstrumentFiles conflict) identified from reading actual code
- Content: MEDIUM -- specific checklist items and recipe gaps are discretionary, require manual expertise

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable -- content authoring patterns, no external dependencies)
