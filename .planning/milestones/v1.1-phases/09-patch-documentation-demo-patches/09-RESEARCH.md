# Phase 9: Patch Documentation + Demo Patches - Research

**Researched:** 2026-03-31
**Domain:** Zod schema refinement, Mermaid diagram generation, markdown content authoring
**Confidence:** HIGH

## Summary

Phase 9 refines the existing `cable_routing` and `knob_settings` stub fields in PatchSchema from `z.unknown().optional()` to fully typed Zod shapes, extends the `type` enum with `fx`, adds an `audio_preview` string field, builds UI components to render Cascadia-specific patch data (cable routing list, optional Mermaid diagram, grouped knob settings), and authors 12-16 demo patch markdown files.

The codebase is well-prepared for this work. PatchSchema already uses `.passthrough()` so Evolver patches will not break when new typed fields are added. The Mermaid rendering pipeline (rehype placeholder plugin + client-side MermaidRenderer component) is fully operational and tested. The patch detail page already has a conditional rendering path established in Phase 7 (MULTI-04 complete) but currently only renders the prose HTML body. The new components slot into this existing architecture.

**Primary recommendation:** Work in three waves: (1) schema refinement + type enum extension, (2) UI components for cable routing/knob settings/audio placeholder, (3) demo patch content authoring. Schema must be stable before content is written, and components should be tested against at least one sample patch before bulk authoring.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Refine `cable_routing` from `z.unknown().optional()` to a typed array: `z.array(z.object({ source: z.string(), destination: z.string(), purpose: z.string() })).optional()`
- D-02: Flat connections array -- one entry per physical cable, no grouping by signal type
- D-03: Source/destination use human-friendly labels (e.g. "VCO-A Saw Out", "VCF Cutoff CV In"), not machine IDs
- D-04: Mermaid signal flow diagrams are auto-generated from `cable_routing` frontmatter on the patch detail page -- no hand-written diagrams per patch
- D-05: Refine `knob_settings` from `z.unknown().optional()` to a typed map: module name as key, array of `{ control: string, value: string }` objects as value
- D-06: Mixed value format: clock positions for continuous knobs ("2 o'clock", "full CW"), actual values for switches/toggles ("LP", "ON", "Mid")
- D-07: Document key controls that differ from normalled default, with a "rest at default" note per module -- not exhaustive listing of every control
- D-08: Add `audio_preview: z.string().optional()` field to PatchSchema -- filename reference only
- D-09: Audio files expected at `public/audio/cascadia/{filename}` -- no files shipped in this phase
- D-10: UI shows placeholder text ("Audio preview not yet recorded") when file is missing -- no audio player component built in this phase
- D-11: 12-16 demo patches with balanced category spread: bass (2-3), lead (2-3), pad (2-3), drum (2), texture (2), FX (2)
- D-12: PatchSchema `type` enum extended to include `fx`
- D-13: Demo patches are standalone -- `session_origin: null`, no forward-references to curriculum sessions
- D-14: Curriculum sessions (Phase 10-11) will reference patches, not the other way around

### Claude's Discretion
- Exact Mermaid graph direction and node styling for auto-generated diagrams
- Patch naming conventions and slug format for Cascadia patches
- How the patch detail page detects instrument type to switch between parameter tables (Evolver) and cable routing + knob settings (Cascadia)
- Whether to add a `notes` or `default_note` field alongside knob settings entries
- Complexity range across demo patches (simple 2-cable patches to complex 6+ cable patches)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CPATCH-01 | Patch frontmatter supports cable routing as structured connections array (source, destination, purpose) | Schema refinement from `z.unknown().optional()` to typed array -- existing `.passthrough()` ensures backward compat |
| CPATCH-02 | Patch frontmatter supports knob/slider positions as settings map (module, control, value as clock position or percentage) | Schema refinement using `z.record()` for module-keyed map -- Zod v3.23 supports this pattern |
| CPATCH-03 | Patch detail page renders cable connections as a readable list or Mermaid diagram | New CableRoutingList + CableRoutingDiagram components; existing MermaidRenderer handles hydration |
| CPATCH-04 | Patch detail page renders knob/slider settings grouped by module | New KnobSettingsTable component reusing existing `.param-table` CSS styling |
| CPATCH-05 | Patches include embedded audio previews (placeholder -- no player, no files) | `audio_preview` schema field + AudioPreviewPlaceholder component |
| CPATCH-06 | 12-16 demo patches covering bass, lead, pad, drum, texture, and FX categories | Content authoring using Cascadia module docs as source for control/jack names |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **File naming:** kebab-case throughout -- patch files must follow this
- **Patches documented in `patches/<instrument>/`** -- new content at `src/content/patches/cascadia/`
- **Undocumented patches are lost patches** -- every demo patch must have full cable routing and knob settings
- **ADHD constraint** -- patch docs should be scannable, not walls of text
- **Framework structure required** -- Cascadia patches follow the same frontmatter + markdown body pattern as Evolver

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | ^3.23.0 | Schema validation for patch frontmatter | Already in use; `z.record()`, `z.array()`, `z.object()` cover all needed shapes |
| mermaid | ^11.13.0 | Client-side diagram rendering | Already installed and configured with dark theme |
| next | ^15.5.14 | App framework, server components for patch pages | Already in use |
| react | ^19.2.4 | Client components for diagram toggle, interactive elements | Already in use |
| gray-matter | (installed) | YAML frontmatter parsing from markdown files | Already in use via reader.ts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | (installed) | Volume2 icon for audio placeholder, ChevronLeft already used | Icon for AudioPreviewPlaceholder |
| vitest | ^3.0.0 | Test framework for schema validation tests | Schema refinement tests |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Mermaid auto-generation | Hand-written SVG diagrams | Far more work per patch, not automatable from frontmatter |
| z.record() for knob_settings | z.array() with module field | Record is more natural for "grouped by module" -- lookup by module name is direct |

**No new packages needed.** Everything required is already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── content/patches/cascadia/      # 12-16 demo patch .md files (NEW)
├── lib/content/schemas.ts         # PatchSchema refinement (MODIFY)
├── components/
│   ├── patch-detail.tsx           # Conditional Cascadia rendering (MODIFY)
│   ├── cable-routing-list.tsx     # Cable connections list (NEW)
│   ├── cable-routing-diagram.tsx  # Mermaid auto-generator (NEW)
│   ├── knob-settings-table.tsx    # Grouped knob/slider display (NEW)
│   └── audio-preview-placeholder.tsx  # Placeholder for future audio (NEW)
public/
└── audio/cascadia/                # Empty directory for future audio files (NEW)
```

### Pattern 1: Schema Refinement with Backward Compatibility

**What:** Replace `z.unknown().optional()` stubs with typed shapes while keeping `.passthrough()` on the parent schema.

**When to use:** When refining a schema that already validates existing content (Evolver patches).

**Example:**
```typescript
// cable_routing typed shape
const CableConnectionSchema = z.object({
  source: z.string(),
  destination: z.string(),
  purpose: z.string(),
});

// knob_settings typed shape -- z.record keyed by module name
const KnobSettingSchema = z.object({
  control: z.string(),
  value: z.string(),
});

export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence', 'fx']),
  // ... existing fields ...
  cable_routing: z.array(CableConnectionSchema).optional(),
  knob_settings: z.record(z.string(), z.array(KnobSettingSchema)).optional(),
  audio_preview: z.string().optional(),
}).passthrough();
```

**Key insight:** Because `.passthrough()` is on PatchSchema and existing Evolver patches don't have `cable_routing` or `knob_settings` in frontmatter, the `.optional()` on these fields means all 16 Evolver patches continue to parse without changes.

### Pattern 2: Instrument-Conditional Rendering in PatchDetail

**What:** Detect instrument type and render different UI sections for Cascadia vs Evolver patches.

**When to use:** PatchDetail component needs to show cable routing + knob settings for Cascadia but parameter tables for Evolver.

**Recommended approach:** Use the `instrument` field from patch frontmatter data (already available as `patch.instrument`) to determine rendering mode. The `sysex: false` from InstrumentConfig is an alternative signal but requires loading config in the component -- simpler to check `patch.instrument === 'cascadia'` or check if `cable_routing` exists.

**Recommended detection logic:**
```typescript
// In PatchDetail: render Cascadia sections if cable_routing data exists
const hasCableRouting = patch.cable_routing && patch.cable_routing.length > 0;
const hasKnobSettings = patch.knob_settings && Object.keys(patch.knob_settings).length > 0;
```

This is data-driven (render sections based on data presence) rather than instrument-name-driven, which is more extensible if a third instrument is added later.

### Pattern 3: Mermaid Code Generation from Structured Data

**What:** Generate Mermaid graph definition string from `cable_routing` array, then inject as a `.mermaid-placeholder` div for the existing MermaidRenderer to hydrate.

**When to use:** CableRoutingDiagram component toggle is activated.

**Example:**
```typescript
function generateMermaidFromCables(cables: Array<{source: string; destination: string; purpose: string}>): string {
  // Extract module name from label: "VCO-A Saw Out" -> "VCO-A"
  const getModuleId = (label: string): string => {
    // Split on space, take first token (or first two if hyphenated)
    // e.g., "VCO-A Saw Out" -> "VCOA", "Wave Folder IN" -> "WaveFolder"
    const moduleName = extractModuleName(label);
    return moduleName.replace(/[\s-]/g, '');
  };

  const getModuleLabel = (label: string): string => extractModuleName(label);

  const nodes = new Map<string, string>(); // id -> label
  const edges: string[] = [];

  for (const cable of cables) {
    const srcId = getModuleId(cable.source);
    const dstId = getModuleId(cable.destination);
    const srcLabel = getModuleLabel(cable.source);
    const dstLabel = getModuleLabel(cable.destination);

    nodes.set(srcId, srcLabel);
    nodes.set(dstId, dstLabel);

    const purposeLabel = cable.purpose ? `|"${cable.purpose}"| ` : '';
    edges.push(`  ${srcId} -->${purposeLabel}${dstId}`);
  }

  let mermaid = 'graph LR\n';
  for (const [id, label] of nodes) {
    mermaid += `  ${id}["${label}"]\n`;
  }
  mermaid += edges.join('\n');

  return mermaid;
}
```

**Key consideration:** Module name extraction from jack labels must be consistent. The Cascadia module docs use these canonical names: "VCO A", "VCO B", "VCF", "Wave Folder", "VCA A", "VCA B / LPF", "Mixer", "Envelope A", "Envelope B", "LFO X/Y/Z", "Output Control", "FX Send/Return", "MIDI/CV", "Patchbay", "Utilities", "Push Gate", "Line In". Cable routing labels in patches should use these module name prefixes.

### Pattern 4: Cascadia Patch Frontmatter Structure

**What:** The YAML frontmatter format for Cascadia patches.

**Example:**
```yaml
---
name: "Deep Sub Bass"
type: bass
session_origin: null
description: "Thick sub bass using VCO A triangle through the VCF with envelope-controlled cutoff."
tags: [bass, sub, foundation, cascadia]
instrument: cascadia
created: "2026-03-31"
audio_preview: "deep-sub-bass.mp3"
cable_routing:
  - source: "LFO X Out"
    destination: "VCO A FM 1 In"
    purpose: "Slow pitch vibrato"
  - source: "Envelope A Out"
    destination: "VCF FM 1 In"
    purpose: "Filter envelope sweep"
knob_settings:
  VCO A:
    - control: "Octave"
      value: "2 (low register)"
    - control: "PW"
      value: "50% (square)"
  VCF:
    - control: "Freq"
      value: "10 o'clock"
    - control: "Q"
      value: "9 o'clock"
    - control: "Mode"
      value: "LP4"
    - control: "FM 1"
      value: "2 o'clock"
  VCA A:
    - control: "Gain"
      value: "full CW"
---

# Deep Sub Bass

> [!tip] Playing Tips
> Play in C1-C2 range for maximum low-end impact. The normalled signal path handles most of the routing -- only two cables are needed to add vibrato and filter envelope control beyond the defaults.

## Notes

This patch uses primarily the normalled signal path. VCO A feeds through Mixer -> VCF -> Wave Folder -> VCA A -> Output by default. The two cables override specific normalled connections to customize the sound.
```

### Anti-Patterns to Avoid
- **Exhaustive knob listings:** Don't list every control on every module. Only document controls that differ from the normalled default state. The "rest at default" note covers everything else.
- **Machine-readable jack IDs in cable routing:** Use "VCO-A Saw Out" not "vco_a_saw_out". Labels must match the module docs for cross-referencing.
- **Hand-written Mermaid per patch:** Diagrams are auto-generated from cable_routing data. Never write Mermaid directly in patch markdown.
- **Building an audio player:** D-10 explicitly defers this. Only a placeholder component.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mermaid rendering | Custom SVG diagram renderer | Existing MermaidRenderer + rehypeMermaidPlaceholder pipeline | Already configured, dark-themed, handles hydration |
| YAML parsing | Custom frontmatter parser | gray-matter (already in reader.ts) | Handles complex nested YAML (arrays of objects, record maps) |
| Schema validation | Manual type checking | Zod with typed shapes | Gives parse-time errors, type inference, `.passthrough()` compat |
| Parameter table CSS | New table styles | Existing `.param-table` class in globals.css | Consistent with Evolver parameter tables |

**Key insight:** The entire rendering pipeline for Mermaid diagrams is already built and working (signal-flow.md for both instruments renders Mermaid diagrams today). The CableRoutingDiagram component only needs to generate the Mermaid source string and inject it as a `data-chart` attribute on a `.mermaid-placeholder` div.

## Common Pitfalls

### Pitfall 1: Breaking Evolver Patch Parsing
**What goes wrong:** Changing `cable_routing` from `z.unknown().optional()` to `z.array(CableConnectionSchema).optional()` might break if any Evolver patch has an unexpected value in that field.
**Why it happens:** The old `z.unknown()` accepted anything. The new typed shape is stricter.
**How to avoid:** Evolver patches don't have `cable_routing` or `knob_settings` in their frontmatter at all (verified -- checked acid-bass.md and sub-bass.md). The `.optional()` means undefined passes fine. Run `vitest run` after schema changes to confirm all 16 Evolver patches still parse.
**Warning signs:** ZodError on existing patch loading.

### Pitfall 2: Mermaid Node ID Collisions
**What goes wrong:** Module name extraction creates duplicate or invalid Mermaid node IDs.
**Why it happens:** Labels like "VCA B / LPF" contain special characters that break Mermaid syntax.
**How to avoid:** Sanitize node IDs aggressively: strip all non-alphanumeric characters. Use the quoted label syntax `NodeID["Human Label"]` to preserve readability.
**Warning signs:** Mermaid render errors in console, blank diagram placeholders.

### Pitfall 3: YAML Indentation for Nested Arrays
**What goes wrong:** `cable_routing` and `knob_settings` in YAML frontmatter must be properly indented or gray-matter misparses them.
**Why it happens:** YAML is whitespace-sensitive. Arrays of objects under a record key require careful indentation.
**How to avoid:** Use consistent 2-space indentation. Test with a single patch file before bulk authoring. The gray-matter library handles standard YAML indentation well.
**Warning signs:** Frontmatter parsing returns undefined for cable_routing/knob_settings.

### Pitfall 4: Module Name Inconsistency Between Patches and Module Docs
**What goes wrong:** Cable routing labels use "VCO-A" but module docs use "VCO A". Knob settings module keys don't match module doc titles.
**Why it happens:** No enforced naming convention between free-text fields and module doc titles.
**How to avoid:** Establish canonical module name list (from module doc titles) and use it consistently. Module keys in knob_settings MUST match these exactly: "VCO A", "VCO B", "VCF", "Wave Folder", "VCA A", "VCA B / LPF", "Mixer", "Envelope A", "Envelope B", "LFO X/Y/Z", "Output Control", "FX Send/Return", "MIDI/CV", "Patchbay", "Utilities", "Push Gate", "Line In".
**Warning signs:** Cross-reference links between patches and module docs break.

### Pitfall 5: MermaidRenderer Not Re-rendering on Toggle
**What goes wrong:** CableRoutingDiagram toggle shows the placeholder div but Mermaid doesn't render it.
**Why it happens:** MermaidRenderer runs `useEffect` on mount, but the diagram toggle happens after mount. New `.mermaid-placeholder` elements added to the DOM after initial hydration won't be processed.
**How to avoid:** The CableRoutingDiagram component must either: (a) call `mermaid.render()` directly when toggled on (import mermaid dynamically), or (b) trigger a re-scan of placeholders. Option (a) is cleaner -- the component owns its own rendering.
**Warning signs:** Toggle reveals empty div or "Mermaid diagram (requires JavaScript)" noscript text.

## Code Examples

### Zod Schema Refinement

```typescript
// Source: Existing schemas.ts pattern + D-01, D-05, D-08, D-12 decisions

const CableConnectionSchema = z.object({
  source: z.string(),
  destination: z.string(),
  purpose: z.string(),
});

const KnobSettingSchema = z.object({
  control: z.string(),
  value: z.string(),
});

export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence', 'fx']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
  challenge_id: z.string().optional(),
  cable_routing: z.array(CableConnectionSchema).optional(),
  knob_settings: z.record(z.string(), z.array(KnobSettingSchema)).optional(),
  audio_preview: z.string().optional(),
}).passthrough();
```

### CableRoutingDiagram Mermaid Generation

```typescript
// Source: UI-SPEC Mermaid Diagram Contract + existing MermaidRenderer pattern

interface CableConnection {
  source: string;
  destination: string;
  purpose: string;
}

function extractModuleName(jackLabel: string): string {
  // Map known module prefixes from Cascadia module docs
  const modules = [
    'VCO A', 'VCO B', 'VCF', 'Wave Folder', 'VCA A', 'VCA B / LPF',
    'Mixer', 'Envelope A', 'Envelope B', 'LFO X/Y/Z', 'Output Control',
    'FX Send/Return', 'MIDI/CV', 'Patchbay', 'Utilities', 'Push Gate', 'Line In'
  ];

  for (const mod of modules) {
    if (jackLabel.startsWith(mod)) return mod;
  }
  // Fallback: first word(s) before common suffixes
  return jackLabel.replace(/(Out|In|CV|Send|Return)$/i, '').trim();
}

function generateMermaid(cables: CableConnection[]): string {
  const nodes = new Map<string, string>();
  const edges: string[] = [];

  for (const cable of cables) {
    const srcId = extractModuleName(cable.source).replace(/[\s\/]/g, '');
    const dstId = extractModuleName(cable.destination).replace(/[\s\/]/g, '');
    nodes.set(srcId, extractModuleName(cable.source));
    nodes.set(dstId, extractModuleName(cable.destination));

    const label = cable.purpose ? `|"${cable.purpose}"|` : '';
    edges.push(`  ${srcId} -->${label} ${dstId}`);
  }

  let graph = 'graph LR\n';
  for (const [id, label] of nodes) {
    graph += `  ${id}["${label}"]\n`;
  }
  graph += edges.join('\n');
  return graph;
}
```

### Knob Settings YAML Structure

```yaml
# Source: D-05, D-06, D-07 decisions + existing module doc control names

knob_settings:
  VCO A:
    - control: "Octave"
      value: "4"
    - control: "PW"
      value: "75%"
    - control: "FM 1"
      value: "11 o'clock"
  VCF:
    - control: "Freq"
      value: "2 o'clock"
    - control: "Q"
      value: "10 o'clock"
    - control: "Mode"
      value: "LP4"
    - control: "Level"
      value: "12 o'clock"
  Envelope A:
    - control: "Attack"
      value: "full CCW"
    - control: "Decay"
      value: "1 o'clock"
    - control: "Sustain"
      value: "10 o'clock"
    - control: "Release"
      value: "11 o'clock"
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest ^3.0.0 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run src/lib/content/__tests__/schemas.test.ts` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CPATCH-01 | cable_routing validates as typed array | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "cable_routing"` | Partial (stub tests exist, need typed shape tests) |
| CPATCH-02 | knob_settings validates as record map | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "knob_settings"` | Partial (stub tests exist, need typed shape tests) |
| CPATCH-03 | Mermaid generation from cable data | unit | `npx vitest run src/components/__tests__/cable-routing-diagram.test.ts` | No -- Wave 0 |
| CPATCH-04 | Knob settings grouped rendering | unit | `npx vitest run src/components/__tests__/knob-settings-table.test.ts` | No -- Wave 0 |
| CPATCH-05 | audio_preview field accepted by schema | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "audio_preview"` | No -- Wave 0 |
| CPATCH-06 | Demo patches parse without errors | integration | `npx vitest run src/lib/content/__tests__/reader.test.ts` | Partially (reader tests exist, need Cascadia patch cases) |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/content/__tests__/schemas.test.ts`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/content/__tests__/schemas.test.ts` -- add tests for typed cable_routing, knob_settings, audio_preview, fx enum value
- [ ] `src/components/__tests__/cable-routing-diagram.test.ts` -- Mermaid code generation from cable data
- [ ] `src/lib/content/__tests__/reader.test.ts` -- add Cascadia patch parsing test case

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `z.unknown().optional()` stubs | Typed Zod shapes | Phase 9 (now) | Parse-time validation for cable/knob data |
| Evolver-only patch rendering | Instrument-conditional rendering | Phase 7 (MULTI-04) | PatchDetail already has conditional path, needs implementation |
| Hand-written Mermaid in markdown | Auto-generated Mermaid from structured data | Phase 9 (now) | Patches never contain raw Mermaid -- always generated from cable_routing |

## Open Questions

1. **Module name extraction heuristic**
   - What we know: Jack labels follow pattern "Module Name + Jack Name" (e.g., "VCO A Saw Out", "VCF FM 1 In")
   - What's unclear: Edge cases like "VCA B / LPF" which has a slash in the module name
   - Recommendation: Use a lookup table of the 17 canonical module names rather than heuristic parsing. Start-of-string matching against the known list is deterministic.

2. **Knob settings `z.record()` vs module name validation**
   - What we know: `z.record(z.string(), ...)` accepts any string key
   - What's unclear: Whether module name keys should be validated against a known enum
   - Recommendation: Keep as `z.record(z.string(), ...)` for now -- don't over-constrain. The module names in patches should match module doc titles by convention, not schema enforcement. A third instrument would have different module names.

## Sources

### Primary (HIGH confidence)
- `src/lib/content/schemas.ts` -- current PatchSchema with stubs, `.passthrough()` pattern
- `src/components/patch-detail.tsx` -- current rendering (prose-only, no Cascadia branch)
- `src/components/mermaid-renderer.tsx` -- existing client-side Mermaid hydration
- `src/lib/markdown/plugins/mermaid-placeholder.ts` -- server-side placeholder generation
- `src/content/instruments/cascadia/modules/*.md` -- canonical module names, control names, jack names
- `src/content/patches/evolver/*.md` -- existing Evolver patch format for consistency reference
- `.planning/phases/09-patch-documentation-demo-patches/09-UI-SPEC.md` -- approved UI design contract
- `.planning/phases/09-patch-documentation-demo-patches/09-CONTEXT.md` -- locked implementation decisions

### Secondary (MEDIUM confidence)
- [baratatronix.com](https://www.baratatronix.com/) -- Cascadia patch library format inspiration (audio previews, categorization approach)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed and configured, no new dependencies
- Architecture: HIGH -- extending existing patterns (schema refinement, conditional rendering, Mermaid pipeline)
- Pitfalls: HIGH -- verified against actual codebase (checked Evolver patches, Mermaid pipeline, schema tests)

**Research date:** 2026-03-31
**Valid until:** 2026-04-30 (stable -- no external dependency changes expected)
