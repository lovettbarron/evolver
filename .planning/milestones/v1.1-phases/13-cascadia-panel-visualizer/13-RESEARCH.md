# Phase 13: Cascadia Panel Visualizer - Research

**Researched:** 2026-04-04
**Domain:** React SVG panel component, control metadata, cable visualization, session embedding
**Confidence:** HIGH

## Summary

Phase 13 mirrors the Phase 12 Evolver Panel Visualizer but adapted for the Intellijel Cascadia semi-modular synthesizer. The core architecture is identical -- inline JSX SVG React component, static control metadata map, section bounds for auto-zoom, session-detail marker parsing -- with one major addition: cable path rendering between patch jacks.

The Cascadia has 17 modules (vs Evolver's ~16 sections), 84 controls (knobs, sliders, switches), and 95 patch jacks. The total element count (~179) is roughly 60% larger than the Evolver's ~110 controls. The SVG will be wider (landscape format) to match the physical panel's left-to-right module layout. The cable rendering system is genuinely new work -- quadratic bezier paths between jack positions with signal-type color coding.

All patterns are established by Phase 12. The evolver-panel.tsx (782 lines), evolver-panel-data.ts (207 lines), and session-detail.tsx (168 lines) serve as exact templates. The primary effort is (1) tracing the Cascadia panel layout to SVG coordinates, (2) building the ~179-entry CONTROL_METADATA and 17-entry SECTION_BOUNDS, (3) implementing CablePath rendering, and (4) extending session-detail.tsx for `data-cascadia-panel` markers.

**Primary recommendation:** Follow the Phase 12 implementation pattern exactly. The only architectural novelty is cable path rendering (bezier curves between jack positions). Everything else is adaptation of proven patterns.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Single full-panel SVG traced from the Cascadia manual -- all 17 modules left-to-right in one view, matching the physical instrument layout. Not a simplified schematic -- aim for manual-accurate positions and proportions.
- **D-02:** Monochrome styling (carried from Phase 12) -- black/white/grey panel with color only for highlights, section tints, and cable connections.
- **D-03:** Inline JSX approach (carried from Phase 12) -- convert SVG to React component with camelCase attributes, individual control IDs, and props-driven state.
- **D-04:** 1:1 module-to-section mapping -- each of the 17 hardware modules is its own section in SECTION_BOUNDS. Section names match module names: `midi-cv`, `vco-a`, `vco-b`, `envelope-a`, `envelope-b`, `line-in`, `mixer`, `vcf`, `wave-folder`, `vca-a`, `push-gate`, `utilities`, `lfo-xyz`, `patchbay`, `vca-b-lpf`, `fx-send-return`, `output-control`.
- **D-05:** Auto-zoom crops to individual modules or groups of modules when `data-sections` is set (carried from Phase 12).
- **D-06:** All 90+ patch jacks always visible as small labeled circles at their correct panel positions. Part of the panel identity -- the Cascadia IS its patch points.
- **D-07:** Highlighted jacks glow (blue/amber) when a session describes cable connections. New `data-cables` attribute in markers specifies connections.
- **D-08:** Draw colored SVG lines between connected jacks to visualize cable patches. Cable lines rendered as curved SVG paths between source and destination jack positions.
- **D-09:** Knob drag interaction (carried from Phase 12) -- vertical drag changes value, onChange callback.
- **D-10:** Switches and LEDs display-only (carried from Phase 12).
- **D-11:** Hover tooltip with control name, parameter info, and current value (carried from Phase 12).
- **D-12:** Inline session embedding via `<div data-cascadia-panel>` markers in markdown, processed by session-detail.tsx (extend existing Evolver pattern to support both instruments).
- **D-13:** Same four integration contexts as Evolver: session inline, patch detail, quick-ref panel tab, standalone route (/instruments/cascadia/panel).

### Claude's Discretion
- Cable path rendering style (straight lines, bezier curves, or right-angle routes)
- Cable color scheme (per-signal-type, per-connection, or single accent color)
- SVG viewBox dimensions for the wider Cascadia panel
- Exact jack ID naming convention (follow existing module file naming patterns)
- How to handle the multi-instrument panel parsing in session-detail.tsx (separate regex per instrument vs unified)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | Component framework | Already in project |
| Next.js | 15.5.14 | App router, dynamic imports | Already in project |
| clsx | 2.1.1 | Conditional class names | Already used in evolver-panel.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | (project version) | Unit tests | Test metadata, parsing, cable path logic |
| @testing-library/react | (project version) | Component rendering tests | Test session-detail integration |

No new dependencies needed. Phase 13 uses the exact same stack as Phase 12.

## Architecture Patterns

### Recommended File Structure
```
src/
  components/
    cascadia-panel.tsx          # Main panel SVG component (~900-1000 lines)
    cascadia-panel-tooltip.tsx  # Tooltip (may reuse PanelTooltip from evolver or create instrument-agnostic version)
    session-detail.tsx          # Extended with data-cascadia-panel support
    quick-ref-panel.tsx         # Extended with Cascadia Panel tab
    patch-detail.tsx            # Extended with Cascadia inline panel
  lib/
    cascadia-panel-data.ts      # CONTROL_METADATA, SECTION_BOUNDS, jack positions
  app/
    instruments/[slug]/panel/
      page.tsx                  # Extended to accept 'cascadia' slug
      standalone-panel-client.tsx  # Extended or new cascadia variant
```

### Pattern 1: Control Metadata Map (from Phase 12)
**What:** Static TypeScript object mapping SVG element IDs to human-readable names, section membership, and control type.
**When to use:** For every SVG control element that needs hover tooltips, highlighting, or value display.
**Example:**
```typescript
// Source: evolver-panel-data.ts pattern
export interface CascadiaControlMeta {
  id: string;
  name: string;
  module: string;           // replaces 'section' for clarity with 17 modules
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';  // for jacks, used by cable coloring
}

export const CONTROL_METADATA: Record<string, CascadiaControlMeta> = {
  'knob-vco-a-pitch': { id: 'knob-vco-a-pitch', name: 'VCO A Pitch', module: 'vco-a', type: 'knob' },
  'jack-vco-a-pitch-in': { id: 'jack-vco-a-pitch-in', name: 'Pitch In', module: 'vco-a', type: 'jack-in', signalType: 'cv' },
  // ... ~179 entries total
};
```

### Pattern 2: Cable Path Rendering (NEW)
**What:** SVG `<path>` elements drawing quadratic bezier curves between jack positions to visualize patch cables.
**When to use:** When `cables` prop is provided or `data-cables` attribute is set in session markers.
**Example:**
```typescript
// Cable bezier path with gravity sag
function cablePath(x1: number, y1: number, x2: number, y2: number): string {
  const midX = (x1 + x2) / 2;
  const midY = Math.max(y1, y2) + 50; // Control point below midpoint (gravity droop)
  return `M ${x1},${y1} Q ${midX},${midY} ${x2},${y2}`;
}
```

### Pattern 3: Multi-Instrument Session Parsing (extends Phase 12)
**What:** session-detail.tsx handles both `data-evolver-panel` and `data-cascadia-panel` markers.
**When to use:** When rendering any session that contains panel markers.
**Recommendation (discretion area):** Use separate regex per instrument rather than a unified pattern. This keeps the parsing logic simple and each instrument's attribute set independent.
```typescript
const EVOLVER_PANEL_RE = /<div data-evolver-panel([^>]*)>\s*<\/div>/g;
const CASCADIA_PANEL_RE = /<div data-cascadia-panel([^>]*)>\s*<\/div>/g;
```

### Pattern 4: Jack ID Naming Convention (discretion area)
**Recommendation:** Follow the module file naming from `instruments/cascadia/modules/` combined with jack name from the markdown tables.
```
jack-{module}-{jack-name-kebab}
```
Examples:
- `jack-vco-a-pitch-in` (VCO A, PITCH IN jack)
- `jack-vco-a-fm-2-in` (VCO A, FM 2 IN jack)
- `jack-mixer-out` (Mixer, MIXER OUT jack)
- `jack-patchbay-mult-in-1` (Patchbay, MULT IN 1 jack)

For knobs/sliders/switches:
- `knob-vco-a-pitch` / `slider-vco-a-pw` / `switch-vco-a-tzfm`

### Pattern 5: Cable Color by Signal Type (discretion area)
**Recommendation:** Use per-signal-type coloring as specified in the UI-SPEC:
| Signal Type | Color | Usage |
|-------------|-------|-------|
| Audio | #ff6644 | VCO outputs, mixer, VCA connections |
| CV/Gate | #3388ff | Pitch, gate, trigger signals |
| Modulation | #ffaa33 | LFO, envelope, S&H to mod destinations |
| Default | #888888 | When signal type not specified |

### Anti-Patterns to Avoid
- **Combining evolver-panel.tsx and cascadia-panel.tsx into one generic component:** The panels have fundamentally different layouts (keyboard synth vs modular panel), different control types (Evolver has no jacks, Cascadia has 95), and different features (cables). Keep them as separate components that share patterns, not code.
- **Dynamic SVG loading from external files:** The inline JSX approach is locked (D-03). Do not load SVG from a file at runtime.
- **Attenuating jack density for aesthetics:** D-06 requires all 95 jacks visible. Do not hide jacks to simplify the SVG.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG coordinate math for zoom | Custom viewBox calculator | `computeZoomViewBox()` pattern from evolver-panel.tsx | Already proven, handles padding and multi-section unions |
| Knob drag interaction | New pointer event handler | `useKnobDrag` hook pattern from evolver-panel.tsx | PointerCapture guard for jsdom, sensitivity tuning already done |
| Tooltip positioning | Custom positioning logic | `PanelTooltip` component or its `getPosition()` pattern | getBoundingClientRect with flip logic already handles edge cases |
| SVG glow filters | Custom filter definitions | Copy `glow-blue` and `glow-amber` filter defs from evolver-panel.tsx | Exact same visual treatment |

**Key insight:** Phase 12 solved all the hard interaction problems (drag, hover delegation, zoom, glow filters). Phase 13 should copy those solutions and only innovate on cable rendering.

## Common Pitfalls

### Pitfall 1: SVG Coordinate Explosion
**What goes wrong:** With 179 elements, manually positioning each one in SVG coordinates is extremely error-prone. One wrong x/y value and elements overlap or disappear.
**Why it happens:** The Cascadia panel is physically wide with dense module sections. Unlike the Evolver (which has a relatively uniform knob grid), the Cascadia mixes knobs, sliders, switches, and jacks in different densities per module.
**How to avoid:** Establish module boundaries (SECTION_BOUNDS) first, then position controls relative to their section origin. Use a consistent grid within each module. Document the coordinate system clearly.
**Warning signs:** Controls rendering outside their module boundary, overlapping labels, jacks not aligning with their associated controls.

### Pitfall 2: Cable Bezier Control Points
**What goes wrong:** Bezier curves between jacks on opposite sides of the panel cross over intermediate modules, creating visual clutter. Short cables between adjacent jacks may have exaggerated curves.
**Why it happens:** A single control point offset (e.g., always +50px below midpoint) doesn't work for all cable lengths.
**How to avoid:** Scale the control point vertical offset proportionally to the horizontal distance between jacks. Short cables get minimal droop; long cables get more. Cap the maximum droop.
**Warning signs:** Cables that look like semicircles for short connections, or cables that droop below the panel boundary for long connections.

### Pitfall 3: Session Marker Attribute Bloat
**What goes wrong:** Cascadia sessions with multiple cables produce very long `data-cables` attributes that are hard to read and maintain in markdown.
**Why it happens:** A typical Cascadia patch might have 3-6 cable connections, each needing source>destination:type.
**How to avoid:** Keep the format compact. Use jack IDs without the `jack-` prefix in the `data-cables` attribute to save space. Document the format clearly in the curriculum authoring guide.
**Warning signs:** Markdown lines exceeding 200 characters, authors making typos in long attribute strings.

### Pitfall 4: Two Panel Components in session-detail.tsx
**What goes wrong:** The session-detail component becomes complex with two separate splitting/rendering paths for Evolver and Cascadia panels.
**Why it happens:** Each instrument has its own marker regex, prop parser, and component import.
**How to avoid:** Structure the code so both instruments share the same split-and-interleave pattern. The instrument detection (`instrumentSlug`) selects which regex and component to use, but the Fragment/map rendering logic is shared.
**Warning signs:** Duplicated rendering code, inconsistent behavior between Evolver and Cascadia panel embedding.

### Pitfall 5: Patchbay Module Complexity
**What goes wrong:** The Patchbay module alone has 17 jacks and 1 knob across 6 sub-circuits (Multiples, Summing, Inverter, Bi-to-Uni, Exp Source, Ring Mod). Treating it as one flat section produces a very dense, unreadable area.
**Why it happens:** The Patchbay is physically the widest module on the Cascadia and contains more jack types than any other module.
**How to avoid:** Group jacks visually within the Patchbay section using subtle sub-section spacing. The SECTION_BOUNDS entry is still one `patchbay` section for zoom purposes, but the internal layout uses clear grouping.
**Warning signs:** Patchbay jacks rendered as an undifferentiated grid with no visual structure.

## Cascadia Control Inventory

Summary from the 17 module documentation files:

| Module | Controls | Jacks | Total Elements |
|--------|----------|-------|----------------|
| midi-cv | 4 | 8 | 12 |
| vco-a | 11 | 6 | 17 |
| vco-b | 5 | 6 | 11 |
| envelope-a | 8 | 6 | 14 |
| envelope-b | 9 | 6 | 15 |
| line-in | 1 | 1 | 2 |
| mixer | 8 | 7 | 15 |
| vcf | 8 | 8 | 16 |
| wave-folder | 2 | 2 | 4 |
| vca-a | 3 | 3 | 6 |
| push-gate | 1 | 1 | 2 |
| utilities | 8 | 9 | 17 |
| lfo-xyz | 4 | 4 | 8 |
| patchbay | 1 | 17 | 18 |
| vca-b-lpf | 3 | 4 | 7 |
| fx-send-return | 5 | 2 | 7 |
| output-control | 3 | 5 | 8 |
| **TOTAL** | **84** | **95** | **179** |

The Cascadia has Evolver's ~110 controls worth of knobs/sliders/switches PLUS 95 patch jacks. The control metadata map will have ~179 entries.

Note: Many controls are sliders (vertical faders) rather than knobs. The Cascadia's physical panel uses sliders extensively (VCO A has 5 sliders, Mixer has 6 sliders, etc.). The SVG component will need a Slider visual element alongside the Knob visual element from the Evolver.

## Code Examples

### Cable Rendering Component
```typescript
// Internal to cascadia-panel.tsx
interface CableProps {
  sourceId: string;
  destId: string;
  signalType: 'audio' | 'cv' | 'modulation' | 'default';
  purpose?: string;
}

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  modulation: '#ffaa33',
  default: '#888888',
};

function CablePath({ sourceId, destId, signalType, purpose }: CableProps) {
  // Jack positions from JACK_POSITIONS lookup (derived from CONTROL_METADATA)
  const src = JACK_POSITIONS[sourceId];
  const dst = JACK_POSITIONS[destId];
  if (!src || !dst) return null;

  const dx = Math.abs(dst.x - src.x);
  const midX = (src.x + dst.x) / 2;
  // Scale droop with distance, cap at 80px
  const droop = Math.min(80, 30 + dx * 0.15);
  const midY = Math.max(src.y, dst.y) + droop;

  const color = CABLE_COLORS[signalType] || CABLE_COLORS.default;

  return (
    <path
      d={`M ${src.x},${src.y} Q ${midX},${midY} ${dst.x},${dst.y}`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeOpacity={0.8}
      strokeLinecap="round"
      style={{ pointerEvents: 'stroke' }}
    >
      {purpose && <title>{`${sourceId} -> ${destId}: ${purpose}`}</title>}
    </path>
  );
}
```

### data-cables Attribute Parsing
```typescript
// In session-detail.tsx, parseCascadiaPanelProps()
const cablesMatch = attrString.match(/data-cables="([^"]*)"/);
if (cablesMatch) {
  for (const entry of cablesMatch[1].split(',')) {
    const [connection, signalType] = entry.split(':');
    const [source, dest] = connection.split('>');
    if (source && dest) {
      cables.push({
        sourceId: source.trim(),
        destId: dest.trim(),
        signalType: (signalType?.trim() as 'audio' | 'cv' | 'modulation') || 'default',
      });
    }
  }
}
```

### Slider Visual Element (NEW for Cascadia)
```typescript
// Many Cascadia controls are vertical sliders, not rotary knobs
interface SliderProps {
  id: string;
  x: number;
  y: number;
  height: number;    // track height (e.g., 40px in SVG units)
  label: string;
  value: number;     // 0-127
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}

function SliderGroup({ id, x, y, height, label, value, highlighted, highlightColor }: SliderProps) {
  const trackWidth = 6;
  const thumbHeight = 8;
  const thumbY = y + height - (value / 127) * height; // 0 at bottom, 127 at top

  return (
    <g id={id} transform={`translate(${x}, 0)`}>
      {highlighted && (
        <rect
          x={-trackWidth - 2} y={y - 2}
          width={trackWidth * 2 + 4} height={height + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Track */}
      <rect x={-trackWidth/2} y={y} width={trackWidth} height={height}
        fill="#111" stroke="#444" strokeWidth={0.8} rx={2} />
      {/* Thumb */}
      <rect x={-trackWidth} y={thumbY - thumbHeight/2}
        width={trackWidth * 2} height={thumbHeight}
        fill="#2a2a2a" stroke="#666" strokeWidth={1} rx={1.5} />
      <text x={0} y={y + height + 12} style={{ fill: '#aaa', fontSize: '5.5px', textAnchor: 'middle' as const }}>
        {label}
      </text>
    </g>
  );
}
```

### Multi-Instrument Session Detection
```typescript
// session-detail.tsx extension
const EVOLVER_PANEL_RE = /<div data-evolver-panel([^>]*)>\s*<\/div>/g;
const CASCADIA_PANEL_RE = /<div data-cascadia-panel([^>]*)>\s*<\/div>/g;

// Determine which panel type this session uses
const hasEvolverPanel = instrumentSlug === 'evolver' && html.includes('data-evolver-panel');
const hasCascadiaPanel = instrumentSlug === 'cascadia' && html.includes('data-cascadia-panel');

// Use the appropriate regex and component
const panelRe = hasEvolverPanel ? EVOLVER_PANEL_RE : hasCascadiaPanel ? CASCADIA_PANEL_RE : null;
const parseProps = hasEvolverPanel ? parseEvolverPanelProps : parseCascadiaPanelProps;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Mermaid diagrams for cable routing | Inline SVG panel with cable paths | Phase 13 | Cables shown on actual panel layout instead of abstract diagrams |
| Text-based patch point lists | Interactive jack highlights + cable visualization | Phase 13 | Visual learning of modular signal flow |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest + @testing-library/react |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map

No explicit requirement IDs were provided for Phase 13. Testing should cover these behaviors derived from the CONTEXT.md decisions:

| Behavior | Test Type | Automated Command | File Exists? |
|----------|-----------|-------------------|-------------|
| CONTROL_METADATA has all 179 entries | unit | `npx vitest run src/lib/__tests__/cascadia-panel-data.test.ts -x` | Wave 0 |
| SECTION_BOUNDS has all 17 modules | unit | `npx vitest run src/lib/__tests__/cascadia-panel-data.test.ts -x` | Wave 0 |
| parseCascadiaPanelProps parses data-cables | unit | `npx vitest run src/components/__tests__/session-detail.test.tsx -x` | Exists (extend) |
| Cable path generates valid SVG d attribute | unit | `npx vitest run src/components/__tests__/cascadia-panel.test.tsx -x` | Wave 0 |
| session-detail renders CascadiaPanel for cascadia sessions | unit | `npx vitest run src/components/__tests__/session-detail.test.tsx -x` | Exists (extend) |
| quick-ref-panel shows Cascadia Panel tab | unit | `npx vitest run src/components/__tests__/quick-ref-panel.test.tsx -x` | Exists (extend) |
| Standalone panel page accepts cascadia slug | unit | `npx vitest run src/app/__tests__/routing.test.tsx -x` | Exists (extend) |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/cascadia-panel-data.test.ts` -- validates metadata completeness and section bounds coverage
- [ ] `src/components/__tests__/cascadia-panel.test.tsx` -- cable path rendering, basic component render

## Open Questions

1. **SVG viewBox dimensions for the wider panel**
   - What we know: Evolver uses `0 0 1200 520` (includes keyboard). Cascadia has no keyboard but is physically wider (17 modules in a row).
   - What's unclear: Exact proportions. The manual PDF has the panel diagram but we cannot render it programmatically.
   - Recommendation: Use approximately `0 0 1800 350` (wider, shorter -- no keyboard). The exact dimensions will be refined during SVG authoring based on the manual's proportions. The implementer should reference the physical panel photo/diagram.

2. **Slider vs Knob ratio**
   - What we know: Cascadia uses sliders extensively (VCO A has 5 sliders + 1 knob, Mixer has 6 sliders + 2 switches). The Evolver panel only had knobs and switches.
   - What's unclear: Whether the `useKnobDrag` hook works well for sliders (vertical drag on a vertical element may feel different than vertical drag on a rotary knob).
   - Recommendation: Implement a separate `useSliderDrag` variant that maps pointer Y directly to slider position rather than converting through rotation. The visual feedback is linear position, not rotation.

3. **Patchbay sub-section grouping**
   - What we know: Patchbay has 6 independent circuits (Multiples, Summing, Inverter, Bi-to-Uni, Exp Source, Ring Mod) with 17 jacks total.
   - What's unclear: Whether to visually sub-divide within the single SECTION_BOUNDS entry.
   - Recommendation: Keep one `patchbay` SECTION_BOUNDS entry but add subtle visual dividers (like the Evolver's dashed lines) between the 6 sub-circuits.

## Sources

### Primary (HIGH confidence)
- `src/components/evolver-panel.tsx` -- 782-line reference implementation, exact pattern to follow
- `src/lib/evolver-panel-data.ts` -- ControlMeta interface, SECTION_BOUNDS pattern, midiToRotation
- `src/components/session-detail.tsx` -- Panel marker regex, parsePanelProps, HTML split-and-interleave pattern
- `src/components/evolver-panel-tooltip.tsx` -- PanelTooltip with getBoundingClientRect positioning
- `instruments/cascadia/modules/*.md` -- 17 module files with complete control and jack inventories
- `instruments/cascadia/overview.md` -- Module layout order, 17 modules listed left-to-right
- `.planning/phases/13-cascadia-panel-visualizer/13-UI-SPEC.md` -- Visual design contract, cable colors, component inventory
- `.planning/phases/13-cascadia-panel-visualizer/13-CONTEXT.md` -- All implementation decisions

### Secondary (MEDIUM confidence)
- SVG bezier curve rendering for cable paths -- standard SVG spec, well-documented

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - exact same stack as Phase 12, no new dependencies
- Architecture: HIGH - all patterns established by Phase 12, only cable rendering is new
- Pitfalls: HIGH - derived from direct code analysis of the Phase 12 implementation and Cascadia instrument data

**Research date:** 2026-04-04
**Valid until:** 2026-05-04 (stable -- no external dependencies changing)
