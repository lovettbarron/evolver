# Phase 22: Interactive Elements & Motion - Research

**Researched:** 2026-04-11
**Domain:** Motion/animation library integration (motion v12), scroll-reveal, micro-interactions
**Confidence:** HIGH

## Summary

This phase introduces the first JavaScript-driven animations to the project via the `motion` package (v12.38.0), replacing CSS `transition-all` on card hover with spring physics, adding scroll-reveal fade-up for content sections, and a completion celebration animation. The project currently uses only CSS transitions and keyframes -- this is the JS animation entry point.

The `motion` package (formerly Framer Motion, rebranded in 2025) provides everything needed: `motion.div` components for spring hover, `useInView` hook for scroll-triggered reveals, `stagger()` for cascading grid animations, and `MotionConfig` with `reducedMotion="user"` for accessibility. The import path is `motion/react` (not `framer-motion`).

**Primary recommendation:** Use `motion/react` components throughout. Wrap the app in `<MotionConfig reducedMotion="user">` to automatically disable transform animations when `prefers-reduced-motion` is enabled. Create reusable wrapper components (`SpringCard`, `ScrollReveal`) to avoid repeating motion config across 10+ files.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Motion springs replace Phase 21's CSS `transition-all` on card hover. All card types (HeroCard, PatchCard, ModuleCard, InstrumentCard, CountCard) use motion spring for lift + shadow instead of CSS transitions. One system, one feel.
- **D-03:** Fade-up reveal — elements fade in + translate ~12-16px upward as they enter the viewport.
- **D-04:** Subtle stagger for grid/list siblings — ~50ms delay between items in a group.
- **D-05:** Scroll reveal applies to content sections, card grids, and list groups. Not to navigation, headers, or persistent UI elements.
- **D-06:** Checkmark spring + color pulse on completion — check icon springs in with overshoot, button background pulses accent color briefly then settles.
- **D-07:** Quick fade-out (~100ms) on uncomplete — check fades out, button returns to default smoothly. No celebration on undo.
- **D-08:** Understated & precise personality — low bounce, quick settle, snappy not wobbly. Think Apple iOS springs.
- **D-09:** `prefers-reduced-motion` disables ALL animation — zero springs, zero fade-in, zero celebration.

### Claude's Discretion
- Which non-card elements benefit from spring hover (nav links, buttons, session rows, etc.)
- Exact spring config values (stiffness, damping) within the "understated & precise" personality
- Whether scroll reveal uses motion's `useInView` or a lighter IntersectionObserver wrapper
- Stagger implementation detail (CSS animation-delay vs motion orchestration)
- Whether to create reusable motion wrapper components or inline motion on each element

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMP-03 | User sees micro-interactions on hover (scale transforms, spring transitions) and completion celebrations | motion.div whileHover with spring type transitions; AnimatePresence for check icon spring entrance; spring config for "understated & precise" personality |
| COMP-04 | User sees content sections fade in subtly as they enter the viewport on scroll | useInView hook with once:true + motion.div animate for fade-up; stagger() for grid cascades |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.38.0 | Spring animations, scroll-triggered reveals, reduced-motion support | Only animation dependency locked in v1.3 Research decision. Import from `motion/react` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React (existing) | 19.2.4 | useRef for InView tracking | Already installed |
| Tailwind (existing) | 4.2.2 | motion-safe:/motion-reduce: prefixes for CSS fallbacks | Already used in nav.tsx |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion useInView | Raw IntersectionObserver | Lighter but manual; useInView is 0.6kb and integrates with motion animate. Use motion's useInView -- it is tiny and keeps one animation system |
| motion stagger | CSS animation-delay | Works but disconnected from motion spring physics; use motion variants with stagger() for consistency |

**Installation:**
```bash
npm install motion@^12.38.0
```

**Version verification:** `motion@12.38.0` confirmed current via npm registry on 2026-04-11.

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   ├── motion/
│   │   ├── spring-card.tsx       # Reusable spring hover wrapper for card elements
│   │   ├── scroll-reveal.tsx     # Reusable fade-up + useInView wrapper
│   │   └── stagger-group.tsx     # Container with stagger variant for children
│   ├── completion-toggle.tsx     # Modified: spring check + color pulse
│   ├── hero-card.tsx             # Modified: wrap with SpringCard
│   ├── patch-card.tsx            # Modified: wrap with SpringCard
│   ├── module-card.tsx           # Modified: wrap with SpringCard
│   ├── instrument-card.tsx       # Modified: wrap with SpringCard
│   └── count-card.tsx            # Modified: wrap with SpringCard
├── app/
│   └── layout.tsx                # Add MotionConfig wrapper
└── ...
```

### Pattern 1: MotionConfig at App Root
**What:** Wrap the app in `<MotionConfig reducedMotion="user">` to globally respect prefers-reduced-motion.
**When to use:** Always -- this is the single accessibility kill switch.
**Example:**
```typescript
// Source: https://motion.dev/docs/react-accessibility
import { MotionConfig } from "motion/react"

// In layout.tsx or a client wrapper
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```
When `reducedMotion="user"` is set, motion automatically disables transform and layout animations while preserving opacity and backgroundColor transitions. However, per D-09, ALL animation should be disabled. This means also adding conditional logic to skip opacity/color animations when reduced motion is preferred.

### Pattern 2: Spring Card Hover Wrapper
**What:** A reusable component that wraps any card element with spring hover physics.
**When to use:** All 5 card types that currently use CSS `.card:hover` transition.
**Example:**
```typescript
import { motion, useReducedMotion } from "motion/react"

// "Understated & precise" spring -- low bounce, quick settle (Apple iOS feel)
const SPRING_HOVER = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
}

interface SpringCardProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function SpringCard({ children, className, as = "div" }: SpringCardProps) {
  const shouldReduce = useReducedMotion()
  const Component = motion[as]

  if (shouldReduce) {
    // Return static element, no animation
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      whileHover={{
        y: -2,
        boxShadow: "0 4px 12px oklch(0.85 0.18 105 / 0.06)",
      }}
      transition={SPRING_HOVER}
    >
      {children}
    </Component>
  )
}
```

### Pattern 3: Scroll Reveal with useInView
**What:** Fade-up animation triggered when element enters viewport.
**When to use:** Content sections, card grids, list groups (NOT nav, headers, persistent UI).
**Example:**
```typescript
import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

export function ScrollReveal({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 4: Stagger Group with Variants
**What:** Parent container that staggers children's entrance animations.
**When to use:** Card grids (patch-grid, module-index) and session row lists.
**Example:**
```typescript
import { motion, stagger } from "motion/react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.05), // 50ms between items
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

// Parent wraps grid
<motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Card {...item} />
    </motion.div>
  ))}
</motion.div>
```

### Pattern 5: Completion Celebration
**What:** Check icon springs in with overshoot on complete, fades out on uncomplete.
**When to use:** completion-toggle.tsx only.
**Example:**
```typescript
import { motion, AnimatePresence, useReducedMotion } from "motion/react"

// Inside CompletionToggle:
const shouldReduce = useReducedMotion()

<AnimatePresence mode="wait">
  {isComplete ? (
    <motion.span
      key="checked"
      initial={shouldReduce ? false : { scale: 0 }}
      animate={{ scale: 1 }}
      exit={shouldReduce ? undefined : { opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 15, // More overshoot for celebration
      }}
      className="w-5 h-5 rounded-[4px] bg-accent flex items-center justify-center"
    >
      <Check size={14} className="text-bg" />
    </motion.span>
  ) : (
    <motion.span
      key="unchecked"
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="w-5 h-5 rounded-[4px] border-2 border-muted"
    />
  )}
</AnimatePresence>
```

### Anti-Patterns to Avoid
- **Animating inside dangerouslySetInnerHTML:** Scroll reveal wraps containers, never individual HTML elements inside innerHTML.
- **motion.a or motion(Link):** Next.js Link is complex. Wrap the Link's parent div with motion, not the Link itself. Cards use Link as the clickable wrapper -- apply spring to a motion.div around or inside.
- **Converting server components to client:** PatchCard, ModuleCard, InstrumentCard are currently server components. Wrapping them in a client-side motion wrapper (that takes children) avoids converting the card itself to a client component.
- **Heavy spring configs:** Avoid high bounce (damping < 10) -- creates wobbly, ADHD-unfriendly motion. The personality is "understated & precise."

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | Custom IntersectionObserver hook | `useInView` from motion/react | 0.6kb, integrates with motion animate, handles cleanup |
| Spring physics | CSS cubic-bezier approximation | motion spring transitions | Real physics, consistent feel, respects reduced motion |
| Stagger timing | Manual setTimeout chains or CSS nth-child delays | `stagger()` from motion | Declarative, works with variants, handles direction |
| Reduced motion | Manual matchMedia listener | `useReducedMotion` + `MotionConfig` | Built-in, SSR-safe, global config option |
| Enter/exit animations | Conditional rendering + CSS transitions | `AnimatePresence` | Handles exit animation before unmount |

**Key insight:** The motion library provides every primitive needed for this phase. Using its built-in hooks and components keeps one animation system, one accessibility model, and one spring config set.

## Common Pitfalls

### Pitfall 1: Server Component / Client Component Boundary
**What goes wrong:** Adding motion.div to a server component causes "use client" errors.
**Why it happens:** motion components require React state/effects internally.
**How to avoid:** Create client-side wrapper components (SpringCard, ScrollReveal) that accept children. The card content stays server-rendered; only the animation wrapper is client.
**Warning signs:** Build errors mentioning "useState" or "useEffect" in server components.

### Pitfall 2: CSS .card:hover Conflict with Motion whileHover
**What goes wrong:** Both CSS transition and motion spring fire simultaneously on hover, causing double-animation or visual jitter.
**Why it happens:** The existing `.card:hover` rule in globals.css sets `transform: translateY(-2px)` and `box-shadow`. Motion's whileHover does the same.
**How to avoid:** Remove the CSS `transition` and `:hover` transform/shadow from `.card` class when adding motion springs. Keep only static styles (background, border, padding, radius) in CSS.
**Warning signs:** Card "jumps" on hover instead of smooth spring.

### Pitfall 3: border-color Animation Not in whileHover
**What goes wrong:** Phase 21's card hover includes `border-color: var(--color-accent)`. If this is left in CSS `:hover` but transform is moved to motion, border changes instantly while transform springs.
**How to avoid:** Include borderColor in motion's whileHover object, or keep border-color as a CSS transition (it's not a transform, so MotionConfig reducedMotion="user" won't disable it).
**Warning signs:** Mismatched timing between border color change and lift animation.

### Pitfall 4: SSR Flash Before Hydration
**What goes wrong:** Elements render in their "initial" state (opacity: 0, y: 14) on the server, causing a flash of invisible content before hydration.
**Why it happens:** motion's initial prop sets elements to hidden state before client JS runs.
**How to avoid:** For scroll-reveal, this is acceptable (elements below fold). For above-the-fold content, skip initial animation or use the existing `useHydrated` hook to conditionally apply motion.
**Warning signs:** Content briefly invisible on page load.

### Pitfall 5: Stagger on Re-render
**What goes wrong:** Stagger animation replays every time the grid re-renders (e.g., filter change in ModuleIndex).
**Why it happens:** Changing `initial` to `animate` triggers the full stagger sequence again.
**How to avoid:** Use `useInView` with `once: true` for initial entrance only. For filter changes, use `AnimatePresence` with layout animations or skip stagger on re-render.
**Warning signs:** Cards re-cascade on every filter button click.

### Pitfall 6: D-09 Requires MORE than MotionConfig
**What goes wrong:** `MotionConfig reducedMotion="user"` only disables transforms and layout. Opacity fades still run.
**Why it happens:** Motion treats opacity as "safe" for reduced motion since it doesn't involve spatial movement.
**How to avoid:** Use `useReducedMotion()` hook and conditionally render static elements (no initial/animate props) when true. D-09 says "zero animations" -- that includes opacity fades.
**Warning signs:** Users with reduced-motion still see fade effects.

## Code Examples

### Spring Config Values for "Understated & Precise"
```typescript
// Source: Derived from motion.dev/docs/react-transitions spring parameters
// "Apple iOS" feel: quick settle, minimal overshoot

export const SPRING_HOVER = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
} // Quick snap to -2px, tiny overshoot, settles fast

export const SPRING_REVEAL = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 1,
} // Smooth fade-up, no bounce

export const SPRING_CELEBRATION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 15,
  mass: 0.5,
} // More overshoot for satisfying check pop

export const FADE_OUT = {
  duration: 0.1,
} // 100ms linear fade for uncomplete
```

### Removing CSS Hover from .card
```css
/* globals.css -- BEFORE */
.card {
  transition: border-color 150ms, transform 150ms, box-shadow 150ms;
}
.card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0.85 0.18 105 / 0.06);
}

/* globals.css -- AFTER */
.card {
  /* Remove transition for transform/shadow -- motion handles these */
  /* Keep border-color transition as CSS since it's not a transform */
  transition: border-color 150ms;
}
.card:hover {
  border-color: var(--color-accent);
  /* transform and box-shadow now handled by motion spring */
}
```

### MotionConfig in Layout
```typescript
// Source: https://motion.dev/docs/react-accessibility
// In a client component wrapper used by layout.tsx
"use client"
import { MotionConfig } from "motion/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package | 2025 rebrand | Import from `motion/react` not `framer-motion` |
| `duration` + `bounce` spring config | `visualDuration` + `bounce` | motion v12 | Optional -- physics params (stiffness/damping) still work |
| Custom `useReducedMotion` hooks | `MotionConfig reducedMotion="user"` | motion v11+ | Global config, no per-component work |
| CSS-only scroll reveal | `useInView` hook (0.6kb) | motion v10+ | Declarative, integrates with motion animate |

**Deprecated/outdated:**
- `framer-motion` import path: Use `motion/react` instead
- `AnimateSharedLayout`: Replaced by `LayoutGroup` in motion v10+

## Open Questions

1. **HeroCard is a client component wrapping a non-Link div + child Link**
   - What we know: HeroCard has a div.card wrapper, not a Link. Motion can wrap the div directly.
   - What's unclear: Whether motion.div interferes with the child Link's click behavior.
   - Recommendation: Use whileHover on motion.div wrapping the card; Link inside remains untouched. Test click-through.

2. **ModuleIndex filter re-render and stagger**
   - What we know: ModuleIndex uses useState for filter, re-renders grid on filter change.
   - What's unclear: Whether stagger should replay on filter change or only on initial mount.
   - Recommendation: Use `once: true` on useInView for initial entrance. On filter change, items appear immediately (no stagger replay).

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
| COMP-03a | Card hover uses motion spring (not CSS transition) | unit | `npx vitest run src/components/__tests__/spring-card.test.tsx -x` | Wave 0 |
| COMP-03b | Completion celebration springs check icon on complete | unit | `npx vitest run src/components/__tests__/completion-celebration.test.tsx -x` | Wave 0 |
| COMP-03c | Completion uncomplete fades out (no celebration) | unit | `npx vitest run src/components/__tests__/completion-celebration.test.tsx -x` | Wave 0 |
| COMP-04a | Content sections fade in on scroll (useInView) | unit | `npx vitest run src/components/__tests__/scroll-reveal.test.tsx -x` | Wave 0 |
| COMP-04b | Card grids stagger entrance ~50ms | unit | `npx vitest run src/components/__tests__/stagger-group.test.tsx -x` | Wave 0 |
| D-09 | All animation disabled with prefers-reduced-motion | unit | `npx vitest run src/components/__tests__/reduced-motion.test.tsx -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run && npm run build`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/components/__tests__/spring-card.test.tsx` -- covers COMP-03a
- [ ] `src/components/__tests__/completion-celebration.test.tsx` -- covers COMP-03b, COMP-03c
- [ ] `src/components/__tests__/scroll-reveal.test.tsx` -- covers COMP-04a
- [ ] `src/components/__tests__/stagger-group.test.tsx` -- covers COMP-04b
- [ ] `src/components/__tests__/reduced-motion.test.tsx` -- covers D-09
- [ ] motion package install: `npm install motion@^12.38.0`
- [ ] Mock setup for motion/react in vitest (mock motion components to verify props passed)

## Sources

### Primary (HIGH confidence)
- [motion.dev/docs/react](https://motion.dev/docs/react) - Import paths, component list, hooks
- [motion.dev/docs/react-transitions](https://motion.dev/docs/react-transitions) - Spring config (stiffness, damping, mass, bounce, visualDuration)
- [motion.dev/docs/react-accessibility](https://motion.dev/docs/react-accessibility) - MotionConfig reducedMotion, useReducedMotion hook
- [motion.dev/docs/react-use-in-view](https://motion.dev/docs/react-use-in-view) - useInView API (ref, once, margin, amount)
- [motion.dev/docs/stagger](https://motion.dev/docs/stagger) - stagger() function for variant children
- npm registry: motion@12.38.0 confirmed current

### Secondary (MEDIUM confidence)
- [motion.dev/tutorials/react-variants](https://motion.dev/tutorials/react-variants) - Variant pattern for parent-child stagger

### Tertiary (LOW confidence)
- Spring config values (stiffness: 400, damping: 25) are educated defaults for "Apple iOS feel" -- may need tuning during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - motion@12.38.0 locked in v1.3 Research, confirmed on npm
- Architecture: HIGH - motion/react API verified against official docs, patterns well-documented
- Pitfalls: HIGH - CSS/motion conflict, server/client boundary, reduced motion gaps all verified against codebase inspection
- Spring values: MEDIUM - tuning values based on documentation ranges, will need visual validation

**Research date:** 2026-04-11
**Valid until:** 2026-05-11 (motion v12 is stable)
