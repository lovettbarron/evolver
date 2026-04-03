# Phase 12: Evolver Panel Visualizer Component - Research

**Researched:** 2026-04-03
**Domain:** React inline SVG component with interactive controls, curriculum annotation overlays, and multi-context integration
**Confidence:** HIGH

## Summary

This phase converts a 752-line SVG panel diagram (`references/evolver-panel.svg`) into a React component with interactive knobs, curriculum annotation glows, section highlighting, and tooltips. The SVG is well-structured with consistent ID conventions (60 knobs, 34 switches, 16 LEDs), making JSX conversion mechanical. The project already has a precedent for interactive SVG visualization (`cable-routing-diagram.tsx`) and uses `'use client'` directives for interactive components throughout.

The main technical challenges are: (1) building a reusable knob drag interaction that maps vertical mouse movement to MIDI 0-127 values, (2) creating a parameter data layer that maps SVG control IDs to human-readable names and NRPN numbers for tooltips, and (3) integrating the panel into four different page contexts with different prop configurations. A critical discovery is that Evolver patches use markdown parameter tables (not structured `knob_settings` frontmatter like Cascadia patches), so the patch-detail integration will need a mapping from parameter names to SVG control IDs or accept pre-mapped knobValues from the parent.

**Primary recommendation:** Build the core `EvolverPanel` component as a single `'use client'` file with inline JSX SVG, a static parameter metadata map (`CONTROL_METADATA`) for tooltips, and a `useKnobDrag` custom hook for the drag interaction. Integration wrappers are thin components that pass the right props per context.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Inline JSX SVG -- convert the existing `references/evolver-panel.svg` to a React component with JSX. Each control element gets props for state (knob rotation, LED color, highlight). Full React control over every element via existing IDs.
- **D-02:** Knob positions visualized via indicator line rotation. MIDI value 0-127 maps to ~-135deg to +135deg sweep (7 o'clock to 5 o'clock). The SVG already has indicator lines on every knob.
- **D-03:** Fix the Feedback section layout in the SVG before converting to JSX -- Frequency on top, Level large below, Grunge as switch not knob. One-time fix, clean foundation.
- **D-04:** Curriculum annotations use colored glow rings around highlighted controls (blue for "adjust this", amber for "listen to this change"). Subtle, doesn't obscure controls, works well on dark panel background. SVG filter `url(#glow)` approach.
- **D-05:** Value labels shown on hover only -- tooltip with target value (e.g., "Filter Freq: 85 / 127") appears when hovering a highlighted control. Clean by default, informative on demand.
- **D-06:** Simple section highlighting -- entire panel sections (Oscillators, Filter, Amp, etc.) get a subtle background tint to show which part of the signal chain is active in a session context. No connected path lines between sections.
- **D-07:** Component appears in four places: session detail pages (collapsible sidebar), patch detail pages, quick-ref panel, and standalone route (/instruments/evolver/panel).
- **D-08:** Session detail pages use a collapsible sidebar layout -- panel sits next to session text, highlights update contextually with exercises. Doesn't take over the reading flow.
- **D-09:** Single reusable component with different prop configurations per context (sessions pass highlights + section tints, patches pass knob values, quick-ref is neutral, standalone is exploratory).
- **D-10:** Full interactive knobs -- drag to change value, updates rotation visually and fires an onChange callback prop. Parent component decides what to do with value changes (future MIDI wiring).
- **D-11:** Switches and LEDs are display-only -- show state but cannot be toggled by the user. Only knobs are draggable.
- **D-12:** Hover any control shows tooltip with name, current value (if set), and NRPN parameter number.

### Claude's Discretion
- Patch detail page layout (sidebar vs inline vs modal) -- follow existing patch-detail component patterns
- Quick-ref panel integration approach -- extend existing quick-ref-panel component
- Standalone route layout and any additional exploratory features
- Knob drag gesture specifics (vertical drag vs radial drag)
- Tooltip styling and positioning

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

## Project Constraints (from CLAUDE.md)

- **File naming:** kebab-case throughout
- **Session length focus:** ADHD-friendly micro-sessions, 15-30 min
- **Architecture:** `src/components/` for React components, `instruments/evolver/` for data
- **No database/ORM:** Markdown + flat files is the architecture
- **Undocumented patches forbidden:** All patches must be documented
- **Obsidian integration:** Progress tracking in ~/song vault

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | Component framework | Already in project |
| Next.js | 15.5.14 | App router, SSR, file-based routing | Already in project |
| TypeScript | 5.6.0 | Type safety | Already in project |
| Tailwind CSS | 4.2.2 | Styling | Already in project |
| Zod | 3.23.0 | Schema validation | Already in project |
| lucide-react | 1.7.0 | Icons (collapse/expand toggle) | Already in project |

### Supporting (No New Dependencies Required)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | 2.1.1 | Conditional class merging | Already installed, use for dynamic className composition |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom drag hook | @use-gesture/react | Adds dependency for a single drag interaction -- not justified for vertical-only drag |
| Inline JSX SVG | react-svg or svgr | Adds build tooling complexity; manual JSX gives full control over each element |
| Custom tooltip | @radix-ui/react-tooltip | Project has no shadcn/radix -- adding for one tooltip is overkill |

**Installation:** No new packages needed. Zero dependency additions.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── evolver-panel.tsx              # Core panel component (inline JSX SVG)
│   ├── evolver-panel-tooltip.tsx      # Tooltip overlay component
│   ├── session-panel-sidebar.tsx      # Collapsible sidebar wrapper for session-detail
│   ├── patch-panel-view.tsx           # Inline panel for patch-detail (Evolver only)
│   ├── session-detail.tsx             # Modified: add sidebar layout
│   ├── patch-detail.tsx               # Modified: add panel below knob settings
│   └── quick-ref-panel.tsx            # Modified: add panel tab
├── lib/
│   └── evolver-panel-data.ts          # Control metadata: ID -> name, NRPN, section
├── app/
│   └── instruments/
│       └── [slug]/
│           └── panel/
│               └── page.tsx           # Standalone route /instruments/evolver/panel
```

### Pattern 1: Inline JSX SVG with Props-Driven State
**What:** Convert the SVG to JSX where each control `<g>` element reads its state from props (rotation angle, glow, section tint) rather than static attributes.
**When to use:** Always -- this is the core pattern for the entire component.
**Example:**
```typescript
// Knob group with dynamic rotation
function KnobGroup({ id, rotation, highlighted, highlightColor, onMouseEnter, onMouseLeave, onPointerDown }: KnobProps) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}
       onMouseEnter={onMouseEnter}
       onMouseLeave={onMouseLeave}
       onPointerDown={onPointerDown}
       style={{ cursor: onPointerDown ? 'grab' : 'default' }}>
      {highlighted && (
        <circle r={knobRadius + 4} fill="none" stroke={highlightColor === 'blue' ? '#3388ff' : '#ffaa33'}
                strokeOpacity={0.6} filter="url(#glow)" />
      )}
      <circle className="knob-large" r={knobRadius} />
      <line className="knob-indicator"
            x1="0" y1="-4" x2="0" y2="-12"
            transform={`rotate(${rotation})`} />
      <text className="knob-label" y="24">{label}</text>
    </g>
  );
}
```

### Pattern 2: useKnobDrag Custom Hook
**What:** A hook that handles pointer events (mousedown/mousemove/mouseup and touch equivalents) for vertical drag-to-value mapping.
**When to use:** Attached to every knob when `onKnobChange` prop is provided.
**Example:**
```typescript
function useKnobDrag(
  controlId: string,
  currentValue: number,
  onChange?: (controlId: string, value: number) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!onChange) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    startValue.current = currentValue;
    setIsDragging(true);
  }, [currentValue, onChange]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !onChange) return;
    const delta = startY.current - e.clientY; // up = positive
    const newValue = Math.max(0, Math.min(127, startValue.current + Math.round(delta / 3)));
    if (newValue !== currentValue) {
      onChange(controlId, newValue);
    }
  }, [isDragging, controlId, currentValue, onChange]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }, []);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}
```

### Pattern 3: Static Metadata Map
**What:** A TypeScript constant mapping SVG control IDs to display names, NRPN numbers, section membership, and knob size.
**When to use:** Tooltip content, section highlighting logic, parameter lookup.
**Example:**
```typescript
// src/lib/evolver-panel-data.ts
export interface ControlMeta {
  id: string;
  name: string;
  nrpn: number | null;
  section: string;
  type: 'knob-large' | 'knob-small' | 'switch' | 'led';
}

export const CONTROL_METADATA: Record<string, ControlMeta> = {
  'knob-filter-frequency': { id: 'knob-filter-frequency', name: 'Filter Frequency', nrpn: 20, section: 'filter', type: 'knob-large' },
  'knob-filter-resonance': { id: 'knob-filter-resonance', name: 'Filter Resonance', nrpn: 21, section: 'filter', type: 'knob-large' },
  // ... all 110 controls
};

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'oscillators': { x: 55, y: 155, width: 215, height: 155 },
  'filter': { x: 310, y: 155, width: 290, height: 155 },
  // ... all sections from SVG
};
```

### Pattern 4: Value-to-Rotation Mapping
**What:** Pure function converting MIDI 0-127 to rotation degrees.
**When to use:** Every knob indicator line rotation.
**Example:**
```typescript
// -135deg (7 o'clock, value 0) to +135deg (5 o'clock, value 127)
function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
```

### Anti-Patterns to Avoid
- **Splitting SVG into separate files:** Keep the entire panel in one component file. Splitting by section creates import complexity and breaks spatial relationships.
- **Using dangerouslySetInnerHTML for SVG:** The whole point of inline JSX is React control over each element. Never inject raw SVG strings.
- **Storing drag state in a ref:** The rotation needs to cause re-renders, so `useState` is correct for the current value during drag. Use refs only for the drag start position and start value.
- **Rendering tooltips inside the SVG:** Tooltips should be HTML `<div>` elements positioned absolutely over the SVG using `getBoundingClientRect()`. SVG `<foreignObject>` has browser inconsistencies.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Pointer capture during drag | Manual mousedown/mousemove/mouseup listeners on document | PointerEvent API with `setPointerCapture` | Works for mouse and touch, handles edge cases (pointer leaving element) |
| Tooltip positioning | Manual coordinate math | `getBoundingClientRect()` on the SVG element + absolute-positioned HTML div | Accounts for scroll, zoom, responsive sizing |
| CSS class merging | String concatenation | `clsx()` (already installed) | Handles falsy values, arrays |

**Key insight:** The PointerEvent API (supported in all modern browsers) handles both mouse and touch with a single code path and provides `setPointerCapture` for reliable drag tracking even when the pointer leaves the element.

## Common Pitfalls

### Pitfall 1: SVG Coordinate System vs Screen Coordinates
**What goes wrong:** Tooltip positioning uses SVG viewBox coordinates instead of screen pixels, causing tooltips to appear in wrong positions when the SVG is scaled.
**Why it happens:** The SVG viewBox is 1200x520 but the rendered size varies by container width.
**How to avoid:** Use `getBoundingClientRect()` on the specific `<g>` or `<circle>` element to get screen-space coordinates. Position the tooltip HTML div using those screen coordinates, not SVG coordinates.
**Warning signs:** Tooltips shift position when window is resized or panel is in different-width containers.

### Pitfall 2: Re-rendering 752 Lines of SVG on Every Drag
**What goes wrong:** Dragging a knob causes the entire SVG to re-render 40+ times per second, causing jank.
**Why it happens:** A single state change at the top level re-renders the entire component tree.
**How to avoid:** Use `React.memo` on individual knob groups. The knob being dragged re-renders (its value changed), but the other 59 knobs do not. Alternatively, keep the SVG structure static and only update the `transform` attribute on the active indicator line.
**Warning signs:** Visible lag when dragging knobs, especially on lower-end devices.

### Pitfall 3: camelCase Attribute Conversion Errors
**What goes wrong:** SVG attributes like `stroke-width`, `font-family`, `text-anchor`, `stroke-dasharray` break in JSX.
**Why it happens:** JSX requires camelCase: `strokeWidth`, `fontFamily`, `textAnchor`, `strokeDasharray`.
**How to avoid:** Systematic find-and-replace during SVG-to-JSX conversion. Also convert `class` to `className`, and inline the CSS `<style>` block as either Tailwind classes or a CSS module.
**Warning signs:** Console warnings about invalid DOM properties.

### Pitfall 4: Feedback Section Layout Fix (D-03) Breaking IDs
**What goes wrong:** Fixing the Feedback section layout changes element positions but accidentally changes or removes control IDs.
**Why it happens:** The fix involves restructuring 3 controls (Frequency, Level, Grunge) and changing Grunge from knob to switch.
**How to avoid:** Document the before/after IDs explicitly. The Grunge control changes from `knob-feedback-grunge` to `switch-feedback-grunge`. Update `CONTROL_METADATA` accordingly.
**Warning signs:** Tooltips showing wrong names or missing NRPN data for Feedback controls.

### Pitfall 5: Evolver Patches Lack Structured knob_settings
**What goes wrong:** The `PatchPanelView` tries to read `patch.knob_settings` for Evolver patches, but it is undefined. Only Cascadia patches use `knob_settings` frontmatter.
**Why it happens:** Evolver patches store parameter values in markdown tables, not YAML frontmatter.
**How to avoid:** For Phase 12, the `PatchPanelView` should render the panel without knob values pre-filled (display-only, neutral positions). Future phases can add structured parameter extraction from Evolver patches. The component already handles the case where `knobValues` is omitted.
**Warning signs:** Blank/error on Evolver patch detail pages.

### Pitfall 6: Collapsible Sidebar Breaking Session Content Width
**What goes wrong:** Adding a 400px sidebar to session-detail pushes the prose content too narrow or causes horizontal scrolling.
**Why it happens:** The existing `max-w-[720px] mx-auto` layout doesn't account for a sidebar.
**How to avoid:** Use a flex layout. When sidebar is open, session content gets `flex-1 max-w-[720px]`. When collapsed, it returns to the existing centered layout. Below `lg` breakpoint (1024px), sidebar is completely hidden.
**Warning signs:** Content reflow when toggling sidebar, text becoming unreadably narrow.

## Code Examples

### SVG Filter Definitions for Glow Rings
```typescript
// Add to <defs> in the SVG component
<filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
  <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
  <feComposite in="color" in2="blur" operator="in" result="glow" />
  <feMerge>
    <feMergeNode in="glow" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
<filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
  <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
  <feComposite in="color" in2="blur" operator="in" result="glow" />
  <feMerge>
    <feMergeNode in="glow" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>
```

### Section Tint Rectangle
```typescript
// Render behind controls, in front of panel-bg
{activeSections?.includes('filter') && (
  <rect
    x={SECTION_BOUNDS.filter.x}
    y={SECTION_BOUNDS.filter.y}
    width={SECTION_BOUNDS.filter.width}
    height={SECTION_BOUNDS.filter.height}
    rx={4}
    fill="#3388ff"
    fillOpacity={0.08}
    style={{ transition: 'opacity 150ms ease-out' }}
  />
)}
```

### Tooltip Positioning (HTML overlay, not SVG foreignObject)
```typescript
// Tooltip rendered as sibling div to the SVG, positioned absolutely
function PanelTooltip({ controlId, svgRef }: { controlId: string | null; svgRef: RefObject<SVGSVGElement> }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const meta = controlId ? CONTROL_METADATA[controlId] : null;

  useEffect(() => {
    if (!controlId || !svgRef.current) return;
    const el = svgRef.current.querySelector(`#${controlId}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  }, [controlId, svgRef]);

  if (!meta) return null;

  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -100%)' }}
    >
      <div className="bg-surface border border-[#333] rounded-lg px-sm py-sm max-w-[200px]">
        <div className="text-[13px] font-bold text-text">{meta.name}</div>
        {meta.nrpn !== null && (
          <div className="text-[13px] text-[#737373]">NRPN {meta.nrpn}</div>
        )}
      </div>
    </div>
  );
}
```

### Standalone Route Page
```typescript
// src/app/instruments/[slug]/panel/page.tsx
import { EvolverPanel } from '@/components/evolver-panel';
import { StickyHeader } from '@/components/sticky-header';
import { notFound } from 'next/navigation';

export default async function PanelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== 'evolver') return notFound();

  return (
    <div>
      <StickyHeader backHref={`/instruments/${slug}`} sessionIdentifier="Panel" quickRefContent={[]} />
      <div className="max-w-[1200px] mx-auto px-lg py-2xl">
        <h1 className="text-2xl font-bold mb-lg">Evolver Panel</h1>
        <EvolverPanel />
      </div>
    </div>
  );
}
```

## SVG Inventory

### Control Counts (from evolver-panel.svg)
| Type | Count | ID Pattern | Example |
|------|-------|------------|---------|
| Large knobs | ~30 | `knob-{section}-{name}` | `knob-filter-frequency` |
| Small knobs | ~30 | `knob-{section}-{name}` | `knob-env3-attack` |
| Switches | 34 | `switch-{section}` or `switch-{name}` | `switch-4pole`, `switch-lfo1` |
| LEDs | 16 | `led-seq-{n}` | `led-seq-1` |
| LCD display | 1 | `lcd-display` | -- |
| **Total controls** | **~110** | -- | -- |

### Section Labels (from SVG section-label elements)
| Section | SVG Label Text | Approximate Bounding Box (viewBox coords) |
|---------|---------------|-------------------------------------------|
| Envelope 3 | "Envelope 3" | x:55-195, y:10-145 |
| LFOs | "LFOs" | x:205-340, y:10-145 |
| Sequencer | "16 x 4 Sequencer" | x:340-545, y:10-145 |
| Misc Params | "Misc Params" | x:840-920, y:10-145 |
| Modulators | "Modulators" | x:950-1170, y:10-145 |
| Transpose | "Transpose" | x:22-55, y:155-305 |
| Oscillators | "Oscillators" | x:55-280, y:155-305 |
| Noise | "Noise" | x:275-310, y:155-240 |
| Ext In | "Ext In" | x:275-310, y:240-305 |
| Low Pass Filter | "Low Pass Filter" | x:310-598, y:155-305 |
| Amp | "Amp" | x:598-766, y:155-305 |
| HP Filter | "HP Filter" | x:766-820, y:155-305 |
| Feedback | "Feedback" | x:820-910, y:155-305 |
| Distortion | "Distortion" | x:910-970, y:155-305 |
| Delay | "Delay" | x:970-1100, y:155-305 |
| Output | "Output" | x:1100-1170, y:155-305 |

### Feedback Section Fix (D-03)
Current SVG has three knobs: `knob-feedback-frequency`, `knob-feedback-amount`, `knob-feedback-grunge`. Per D-03:
- `knob-feedback-frequency` stays (repositioned to top)
- `knob-feedback-amount` renamed conceptually to "Level" and made large
- `knob-feedback-grunge` changes from knob to switch (`switch-feedback-grunge`)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SVG as `<img>` or `<object>` | Inline JSX SVG for full React control | Standard React practice | Required for interactive elements |
| Mouse events for drag | PointerEvent API | Widely supported since ~2020 | Single code path for mouse + touch |
| Radial drag for knobs | Vertical drag | UX preference (D-10, UI-SPEC) | More predictable, works on trackpads |
| SVG foreignObject for tooltips | HTML overlay positioned with getBoundingClientRect | Browser compatibility | Avoids foreignObject rendering bugs |

## Open Questions

1. **NRPN Parameter Numbers for All Controls**
   - What we know: The Evolver manual (Evo_Key_Manual_1.3.pdf) contains complete NRPN mappings
   - What's unclear: Exact NRPN number for each of the ~110 controls needs extraction
   - Recommendation: Create the `CONTROL_METADATA` map during implementation by referencing the manual. This is a data entry task, not a research question.

2. **Evolver Patch Parameter Extraction for Panel Display**
   - What we know: Evolver patches use markdown tables, not `knob_settings` YAML. Cascadia patches have structured data.
   - What's unclear: Whether to parse markdown tables to extract values or defer structured Evolver patch data to a future phase
   - Recommendation: For Phase 12, render the panel on Evolver patch pages without pre-filled knob values (neutral display). The panel still provides spatial reference for where parameters live. Structured parameter extraction is a separate concern.

3. **Session Metadata for Panel Annotations**
   - What we know: Sessions will pass highlights and section tints to the panel
   - What's unclear: Where the highlight/section data lives in session frontmatter (not currently in SessionSchema)
   - Recommendation: Add optional `panel_highlights` and `panel_sections` fields to session frontmatter during this phase. Or hardcode a mapping for initial sessions and evolve later.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.0.0 + @testing-library/react 16.3.2 |
| Config file | vitest.config.ts |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| D-01 | SVG renders as inline JSX with control IDs | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "renders"` | Wave 0 |
| D-02 | Knob rotation maps 0-127 to -135 to +135 deg | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "rotation"` | Wave 0 |
| D-04 | Glow rings render for highlighted controls | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "glow"` | Wave 0 |
| D-05 | Tooltip shows on hover with name and NRPN | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "tooltip"` | Wave 0 |
| D-06 | Section tint renders for active sections | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "section"` | Wave 0 |
| D-10 | Knob drag fires onChange with clamped value | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "drag"` | Wave 0 |
| D-12 | Tooltip shows NRPN parameter number | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "nrpn"` | Wave 0 |
| META | Control metadata map has entries for all SVG IDs | unit | `npx vitest run src/lib/__tests__/evolver-panel-data.test.ts` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/components/__tests__/evolver-panel.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/__tests__/evolver-panel.test.tsx` -- covers D-01, D-02, D-04, D-05, D-06, D-10, D-12
- [ ] `src/lib/__tests__/evolver-panel-data.test.ts` -- covers metadata completeness

## Sources

### Primary (HIGH confidence)
- `references/evolver-panel.svg` -- Direct inspection of 752-line SVG source (60 knobs, 34 switches, 16 LEDs, consistent ID conventions)
- `src/components/cable-routing-diagram.tsx` -- Prior art for interactive SVG in this project
- `src/components/session-detail.tsx` -- Integration target, current layout structure
- `src/components/patch-detail.tsx` -- Integration target, current layout structure
- `src/components/quick-ref-panel.tsx` -- Integration target, current structure
- `src/lib/content/schemas.ts` -- Existing Zod schemas, confirms Evolver patches lack `knob_settings`
- `package.json` -- Confirmed all dependencies already installed, no additions needed

### Secondary (MEDIUM confidence)
- UI-SPEC (`12-UI-SPEC.md`) -- Design contract with exact colors, sizes, interaction specs
- CONTEXT.md (`12-CONTEXT.md`) -- 12 locked decisions from user

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all existing
- Architecture: HIGH -- clear patterns from existing codebase, well-structured SVG source
- Pitfalls: HIGH -- based on direct code inspection and SVG analysis
- Integration: HIGH -- all four integration targets inspected, layouts understood

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (stable -- no external dependencies to go stale)
