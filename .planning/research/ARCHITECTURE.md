# Architecture Patterns: Cascadia Integration

**Domain:** Multi-instrument synth learning platform -- adding CV-only semi-modular to existing SysEx-capable instrument
**Researched:** 2026-03-30
**Confidence:** HIGH -- based on direct inspection of existing codebase, all integration points identified from source

## Recommended Architecture

The existing architecture is well-structured for multi-instrument support. The `[slug]` routing, content reader, and instrument discovery already abstract over instrument identity. The primary challenge is that the current schemas and components assume MIDI SysEx capabilities that Cascadia does not have, and the navigation/home page hard-codes "evolver" in several places.

**Guiding principle:** Cascadia integration should add new content and extend schemas -- not fork components. Use instrument "capabilities" metadata so components adapt their rendering based on what an instrument supports.

### Integration Summary

```
NEW FILES (content only)             MODIFIED FILES (code changes)
-------------------------------      -----------------------------------
src/content/instruments/cascadia/    src/lib/content/schemas.ts
  overview.md                        src/components/nav.tsx
  signal-flow.md                     src/components/app-shell.tsx
  modules.md                         src/app/instruments/[slug]/page.tsx
  basic-patch.md                     src/app/instruments/[slug]/midi/page.tsx
src/content/sessions/cascadia/       src/app/page.tsx
  01-*.md ... (initial sessions)     src/components/instrument-overview.tsx
src/content/patches/cascadia/        src/components/patch-detail.tsx
  *.md (cable-routing format)
```

### Component Boundaries

| Component | Responsibility | Changes Needed |
|-----------|---------------|----------------|
| `reader.ts` | Content discovery and parsing | **NONE** -- already instrument-parameterized via slug |
| `schemas.ts` | Zod validation of frontmatter | **EXTEND** -- add optional CV/cable fields, capability flags |
| `nav.tsx` | Navigation links | **MODIFY** -- dynamic instrument list, not hard-coded Evolver links |
| `app-shell.tsx` | Layout wrapper with footer | **MINOR** -- change "Evolver Deep Learning" to generic name |
| `instrument-overview.tsx` | Instrument landing page | **MINOR** -- "10 modules" text must be dynamic |
| `[slug]/page.tsx` | Instrument route handler | **MODIFY** -- references array from frontmatter, not hard-coded |
| `[slug]/midi/page.tsx` | MIDI workspace route | **MODIFY** -- gate behind instrument capability flag |
| `midi-page.tsx` | SysEx capture/send/diff | **NONE** -- only rendered for SysEx-capable instruments |
| `session-detail.tsx` | Session view | **NONE** -- already instrument-agnostic |
| `patch-detail.tsx` | Patch view | **MINOR** -- render cable routing section when present |
| `patch-grid.tsx` / `patch-card.tsx` | Patch listing | **MINOR** -- show patch format indicator |
| `page.tsx` (home) | Landing page | **MODIFY** -- multi-instrument awareness |

### Data Flow

```
Content filesystem (vault or bundled):
  src/content/instruments/{slug}/        <-- instrument discovery (EXISTING, unchanged)
  src/content/sessions/{slug}/*.md       <-- session listing (EXISTING, unchanged)
  src/content/patches/{slug}/*.md        <-- patch listing (EXISTING, unchanged)
  src/content/patches/{slug}/*.sysex.json  <-- SysEx sidecars (Evolver only)

                    |
                    v
         reader.ts (UNCHANGED -- all functions parameterized by instrument slug)
         schemas.ts (EXTENDED with optional cable/capability fields)
                    |
                    v
         Server components (page.tsx routes)
         Read instrument capabilities from overview.md frontmatter
         Conditional rendering decisions made here
                    |
                    v
         Client components render based on data shape
         (patch_cables present? show cable routing table)
         (sysexData present? show parameter dump)
         (capabilities.midi_sysex? show MIDI nav link)
```

## Detailed Integration Plan

### 1. Content Structure (NEW files only -- no code changes)

Create the Cascadia content directory mirroring the Evolver structure exactly:

```
src/content/instruments/cascadia/
  overview.md          # type: overview, instrument: cascadia, manufacturer: Intellijel
  signal-flow.md       # Mermaid diagram of Cascadia signal routing
  modules.md           # Module reference (VCOs, VCF, VCA, Wavefolder, etc.)
  basic-patch.md       # "Init patch" = normalized knob positions, all cables unplugged

src/content/sessions/cascadia/
  01-getting-oriented.md
  02-vco-fundamentals.md
  03-vcf-and-subtractive.md
  ... (initial 5-10 sessions)

src/content/patches/cascadia/
  warm-drone.md
  wavefold-bass.md
  ... (initial demo patches with cable routing format)
```

**Key differences from Evolver content:**

| Aspect | Evolver | Cascadia |
|--------|---------|----------|
| basic-patch.md | Has `.sysex.json` sidecar with program data | No sidecar -- describes physical knob positions |
| Patches | Parameter value tables (numbers reproduce the sound) | Cable routing + knob positions (physical setup) |
| Patch reproducibility | Exact -- load SysEx and get identical sound | Approximate -- knob % positions, not exact values |
| Module taxonomy | digital-oscillators, analog-filters, sequencer, etc. | vco, vcf, vca, wavefolder, noise, sample-hold, etc. |
| References | Evolver Manual, Definitive Guide | Cascadia Manual v1.1 (already in references/) |

### 2. Schema Evolution

#### PatchSchema -- extend with optional cable routing fields

The existing schema uses `.passthrough()` so extra frontmatter fields are silently allowed. But for proper validation and TypeScript types, add explicit optional fields:

```typescript
export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence', 'drone', 'effect']),
  //                                                                    ^^^^^^^^^^^^
  //                                                      NEW enum values for Cascadia patch types
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),

  // SysEx fields (Evolver-specific, all already optional)
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
  challenge_id: z.string().optional(),

  // Cable routing fields (Cascadia-specific, NEW, optional)
  patch_cables: z.array(z.object({
    from: z.string(),              // e.g., "LFO 1 Triangle Out"
    to: z.string(),                // e.g., "VCO 1 FM In"
    cable_color: z.string().optional(),
    note: z.string().optional(),   // what this connection does
  })).optional(),
  audio_url: z.string().optional(),  // audio preview reference
}).passthrough();
```

**Why `patch_cables` array:** This is the Cascadia equivalent of SysEx parameter dumps. It captures the physical cable connections that define a patch. Keeping it optional means Evolver patches are completely unaffected. The `audio_url` field is useful for both instruments but especially Cascadia, where you cannot recreate a patch from text alone -- hearing it matters.

#### InstrumentFileSchema -- add capability flags and reference list

```typescript
export const InstrumentFileSchema = z.object({
  type: z.enum(['overview', 'signal-flow', 'basic-patch', 'modules', 'patch-points']),
  //                                                                  ^^^^^^^^^^^^
  //                                               NEW type for Cascadia's 100+ patch points reference
  instrument: z.string(),
  title: z.string(),
  manufacturer: z.string(),

  // NEW: instrument capabilities for conditional UI (on overview.md only)
  capabilities: z.object({
    midi_sysex: z.boolean(),       // Evolver: true, Cascadia: false
    patch_memory: z.boolean(),     // Evolver: true (512 programs), Cascadia: false
    cv_patching: z.boolean(),      // Evolver: false, Cascadia: true
  }).optional(),

  // NEW: reference documents (replaces hard-coded array in page.tsx)
  references: z.array(z.object({
    label: z.string(),
    pdf: z.string(),               // filename in src/content/references/
  })).optional(),
}).passthrough();
```

**Capabilities go in `overview.md` frontmatter only** -- not repeated in every instrument file. The instrument page already reads overview, so extract capabilities there and pass down.

#### SessionSchema -- NO CHANGES NEEDED

The existing schema is already instrument-agnostic:
- `module` is a free-form string (accommodates different module taxonomies)
- `output_type` enum covers Cascadia outputs (patch, technique, recording)
- `reference` can point to Cascadia manual pages
- `instrument` field already exists

### 3. MIDI Workspace Handling

The `MidiPage` component directly imports `basic-patch.sysex.json` and is deeply Evolver-specific (SysEx capture, send, parse, diff). Do NOT generalize it.

**Approach: Gate the route by instrument capability**

In `src/app/instruments/[slug]/midi/page.tsx`:

```typescript
// Read instrument overview to check capabilities
const config = await loadConfig();
const files = await listInstrumentFiles(slug, config);
const overview = files.find(f => f.data.type === 'overview');
const hasSysex = overview?.data.capabilities?.midi_sysex ?? false;

if (!hasSysex) {
  return (
    <div className="max-w-[720px] mx-auto px-lg py-2xl text-center">
      <h1 className="text-2xl font-bold mb-md">No MIDI SysEx</h1>
      <p className="text-muted">
        {overview?.data.title ?? slug} uses CV patching instead of MIDI program memory.
        Patches are documented as cable routing diagrams.
      </p>
      <Link href={`/instruments/${slug}/patches`}>Browse Patches</Link>
    </div>
  );
}

// Existing MidiPage component renders only for SysEx-capable instruments
return <MidiPage instrumentSlug={slug} />;
```

In `nav.tsx`, the MIDI link should be conditionally shown based on capabilities (see section 5).

**Future (v1.2+):** A Cascadia-specific workspace could show a patch cable visualizer or interactive module diagram. But this is out of scope for v1.1.

### 4. Patch Documentation Format

This is the most architecturally significant difference between instruments.

**Evolver patch example** (existing -- `acid-bass.md`):
```markdown
## Key Parameters
### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Saw |
| Osc 1 Level | 55 |
```

**Cascadia patch format** (proposed):
```markdown
---
name: "Warm Drone"
type: drone
session_origin: 3
description: "Self-generating evolving drone using wavefolder feedback"
tags: [drone, wavefolder, ambient]
instrument: cascadia
created: "2026-04-15"
patch_cables:
  - from: "LFO 1 Triangle"
    to: "VCO 1 FM"
    note: "Slow pitch drift"
  - from: "Noise Out"
    to: "VCF CV In"
    note: "Subtle random filter movement"
  - from: "VCA Out"
    to: "Wavefolder In"
    note: "Feedback loop -- start with WF Amount at 0"
audio_url: "/audio/cascadia/warm-drone.mp3"
---

# Warm Drone

> [!tip] Setup
> Start with all cables unplugged (internal normalling active).
> Set VCO 1 to ~200Hz, VCF fully open, VCA to manual gate.

## Cable Routing

| # | From | To | Purpose |
|---|------|----|---------|
| 1 | LFO 1 Triangle | VCO 1 FM | Slow pitch drift (~0.1 Hz) |
| 2 | Noise Out | VCF CV In | Random filter movement |
| 3 | VCA Out | Wavefolder In | Feedback -- careful with amount |

## Knob Positions

| Module | Control | Position | Notes |
|--------|---------|----------|-------|
| VCO 1 | Frequency | ~200 Hz | Fundamental pitch |
| LFO 1 | Rate | ~0.1 Hz | Very slow |
| VCF | Cutoff | 75% | Mostly open |
| Wavefolder | Amount | 0 -> 30% | BRING UP SLOWLY |
```

**Why this works without code changes to markdown processing:** The Cascadia patch body uses the same markdown table format as Evolver patches. The existing `param-table` rehype plugin and standard table rendering handle both formats identically. The difference is structural (cable routing tables vs parameter value tables) but the rendering is the same.

**Cable data lives in both frontmatter AND body:** Frontmatter `patch_cables` enables programmatic access (filtering, visualization). Body tables provide human-readable documentation with notes and ordering. This is intentional duplication -- the frontmatter is machine-readable, the body is the learning content.

### 5. Component Adaptations (Detailed)

#### nav.tsx -- Dynamic instrument navigation (CRITICAL change)

Current state: Hard-coded `navLinks` array with Evolver-specific paths.

```typescript
// CURRENT (broken for multi-instrument):
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/instruments/evolver', label: 'Evolver' },
  { href: '/instruments/evolver/sessions', label: 'Sessions' },
  { href: '/instruments/evolver/patches', label: 'Patches' },
  { href: '/instruments/evolver/midi', label: 'MIDI' },
  { href: '/instruments/evolver/progress', label: 'Progress' },
];
```

**Proposed approach:** Nav receives instrument data from a server component wrapper. Show instrument tabs at the top level, and instrument-specific sub-links for the active instrument.

```typescript
interface NavProps {
  isDemoMode?: boolean;
  instruments: Array<{
    slug: string;
    name: string;
    capabilities: { midi_sysex: boolean; patch_memory: boolean; cv_patching: boolean };
  }>;
}

// Derive current instrument from pathname
// Show: Home | Evolver | Cascadia
// Under active instrument: Sessions | Patches | MIDI (if capable) | Progress
```

This requires `discoverInstruments()` + `listInstrumentFiles()` to be called in the layout or a server component that wraps Nav. Since `layout.tsx` is a server component, this is straightforward.

#### app-shell.tsx -- Generic branding

Change footer from `"Evolver Deep Learning"` to `"Instrument Deep Learning"` or derive from the active instrument context.

#### instrument-overview.tsx -- Dynamic module count

Line 87: `{sessionCount} sessions across 10 modules` -- the "10 modules" is hard-coded for Evolver.

Fix: Either count unique modules from sessions data and pass as a prop, or remove the specific number:
```typescript
<p className="text-muted text-sm">
  {sessionCount} sessions{moduleCount ? ` across ${moduleCount} modules` : ''}
</p>
```

#### [slug]/page.tsx -- References from frontmatter

Current state: `references` array is hard-coded as a const with Evolver-specific PDFs.

Fix: Read references from the overview.md frontmatter (after schema extension):
```typescript
const references = overview.data.references?.map(ref => ({
  label: ref.label,
  pdfPath: `/api/references/${ref.pdf}`,
})) ?? [];
```

The Cascadia manual PDF (`cascadia_manual_v1.1.pdf`) is already in `src/content/references/`.

#### patch-detail.tsx -- Cable routing rendering

When the patch data includes `patch_cables`, render a structured cable routing section. This can be as simple as checking for the field and rendering an additional section before the markdown body:

```typescript
{patch.patch_cables && patch.patch_cables.length > 0 && (
  <section className="mb-xl">
    <h2 className="text-lg font-bold mb-md">Patch Cables</h2>
    <div className="bg-surface rounded p-md">
      {patch.patch_cables.map((cable, i) => (
        <div key={i} className="flex items-center gap-md py-xs border-b border-muted/10 last:border-0">
          <span className="text-accent font-mono text-sm">{cable.from}</span>
          <span className="text-muted">-></span>
          <span className="text-accent font-mono text-sm">{cable.to}</span>
          {cable.note && <span className="text-muted text-sm ml-auto">{cable.note}</span>}
        </div>
      ))}
    </div>
  </section>
)}
```

The markdown body's own cable routing table provides the detailed version with ordering and setup instructions. The frontmatter-driven section above provides a quick visual summary.

### 6. What Does NOT Need to Change

| Component/File | Why It Is Already Fine |
|----------------|----------------------|
| `reader.ts` | All functions parameterized by instrument slug -- add `cascadia/` dir and it works |
| `discoverInstruments()` | Scans directories -- new dir = new instrument automatically |
| `listSessions()` | Reads `sessions/{instrument}/*.md` -- works for any slug |
| `listPatches()` | Reads `patches/{instrument}/*.md` + sysex sidecars -- sidecars are optional |
| `listInstrumentFiles()` | Reads `instruments/{instrument}/*.md` -- works for any slug |
| `session-detail.tsx` | Renders generic session data -- no instrument-specific assumptions |
| `session-list.tsx` | Groups by module string -- module names come from content |
| `markdown/processor.ts` | Renders any markdown -- parameter tables work for cable routing tables too |
| `progress.ts` | Already instrument-scoped |
| All `[slug]` App Router routes | Parameterized -- `/instruments/cascadia/sessions` works immediately |
| `patch-grid.tsx` | Displays patches from data -- no instrument assumptions |
| `source-ref.tsx` | Reference link component -- works for any manual reference |

## Anti-Patterns to Avoid

### Anti-Pattern 1: Instrument-Specific Component Forks
**What:** Creating `CascadiaPatchDetail`, `EvolverPatchDetail`, etc.
**Why bad:** Duplicates layout and styling logic. Maintenance burden scales linearly with instruments.
**Instead:** Single `PatchDetail` that conditionally renders sections based on data shape. If `patch_cables` exists, show cable routing. If `sysexData` exists, show SysEx info. Data shape drives rendering, not instrument identity.

### Anti-Pattern 2: String-Matching Instrument Slugs in Components
**What:** `if (instrument === 'cascadia') { hideMidi(); }` scattered through components.
**Why bad:** Every new instrument requires touching every component with these checks.
**Instead:** Use capability flags from instrument metadata. Components check `capabilities.midi_sysex`, not `slug === 'evolver'`.

### Anti-Pattern 3: Generalizing MIDI Workspace Prematurely
**What:** Building an abstract "instrument workspace" that handles both SysEx and CV patching.
**Why bad:** SysEx and CV patching are fundamentally different paradigms. No useful shared abstraction exists. A "cable visualizer" is a large-scope standalone feature.
**Instead:** Gate MIDI workspace by capability flag. Show informational message for CV instruments. Build a dedicated Cascadia workspace only if/when it proves needed (v1.2+).

### Anti-Pattern 4: Changing Existing Content Directory Structure
**What:** Reorganizing `src/content/` paths or adding nesting for "instrument types."
**Why bad:** Breaks existing Evolver content paths, vault reader expectations, and any Obsidian vault symlinks.
**Instead:** Mirror the exact same flat structure. `instruments/cascadia/` parallels `instruments/evolver/`. The reader already handles this.

### Anti-Pattern 5: Building Cascadia-Only UI Before Content Exists
**What:** Building a cable visualizer or patch point reference UI before having real Cascadia curriculum content.
**Why bad:** You will build the wrong abstractions. The content structure should inform the UI, not the other way around.
**Instead:** Content first. Write 5 sessions and 3 patches. See what the natural documentation format looks like. Then build UI to match.

## Build Order (Fastest Path to Value)

```
Phase 1: Content Foundation (NO code changes)
├── Create src/content/instruments/cascadia/ (overview, signal-flow, modules, basic-patch)
├── Create src/content/sessions/cascadia/ (3-5 initial sessions)
└── Create src/content/patches/cascadia/ (2-3 demo patches with cable routing)

    VALUE: Cascadia appears in discoverInstruments(). Browsable at /instruments/cascadia
    with current code (references will be missing, but overview + sessions render fine).
    RISK: Minimal -- content-only, cannot break existing functionality.

Phase 2: Schema Extension (small code changes, ~30 min)
├── Extend PatchSchema with optional patch_cables, audio_url fields
├── Add capabilities and references to InstrumentFileSchema
├── Add 'drone', 'effect' to PatchSchema type enum
├── Add 'patch-points' to InstrumentFileSchema type enum
└── Update Patch type exports

    VALUE: Cascadia patches validate correctly. Type safety for cable routing data.
    DEPENDS ON: Phase 1 content for testing validation.

Phase 3: Navigation + Routing (medium code changes, ~2 hrs)
├── Make nav.tsx instrument-aware (dynamic links from discoverInstruments)
├── Pass instrument capabilities to nav from layout server component
├── Gate MIDI link visibility by capabilities.midi_sysex
├── Gate /instruments/[slug]/midi/page.tsx with capability check
├── Update app-shell.tsx footer to generic branding
└── Fix hard-coded "10 modules" in instrument-overview.tsx

    VALUE: Users can switch between instruments. MIDI workspace hidden for Cascadia.
    DEPENDS ON: Phase 2 for capability flags in schema.
    CAN PARALLEL WITH: Phase 2 (capabilities can be hard-coded initially, then read from content).

Phase 4: References + Patch Detail (small code changes, ~1 hr)
├── Move references from hard-coded array to overview.md frontmatter
├── Update [slug]/page.tsx to read references from frontmatter
├── Add cable routing rendering to patch-detail.tsx
├── Add audio preview player if audio_url present
└── Show patch format indicator on patch-card.tsx

    VALUE: Cascadia patches display cable routing. References work for any instrument.
    DEPENDS ON: Phase 2 for schema fields.

Phase 5: Demo Data + Polish (~1 hr)
├── Generate synthetic demo data for Cascadia learner journey
├── Verify demo mode works with both instruments
├── Test all routes with both instrument slugs
└── Verify no Evolver functionality is broken
```

**Dependency chain:** Phase 1 is fully independent. Phase 2 depends on Phase 1 content for testing. Phase 3 and Phase 4 depend on Phase 2 schemas but are independent of each other. Phase 5 depends on all prior phases.

**Total estimated effort:** ~5 hours of code changes + content authoring time for Cascadia curriculum.

## Sources

- Existing codebase: `src/lib/content/schemas.ts`, `reader.ts`, all component files -- direct inspection (HIGH confidence)
- Existing Evolver content: `src/content/instruments/evolver/`, patches, sessions -- structural reference (HIGH confidence)
- `PROJECT.md` milestone v1.1 requirements -- defines scope and constraints (HIGH confidence)
- Cascadia manual v1.1 (`src/content/references/cascadia_manual_v1.1.pdf`) -- instrument capabilities reference (HIGH confidence)
- Baratatronix.com (referenced in PROJECT.md) -- inspiration for cable routing patch documentation format (MEDIUM confidence -- referenced but not directly verified)
