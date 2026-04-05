# Phase 15: Navigation & Progress Enhancements - Research

**Researched:** 2026-04-05
**Domain:** Next.js App Router UI enhancements — prerequisite state badges, clickable navigation cards, module journey visualization, cumulative metrics
**Confidence:** HIGH

## Summary

Phase 15 is a UI-focused phase that enhances four existing components and adds two new ones. All changes build on top of Phase 14's Zustand store (not yet implemented — Phase 15 depends on it). The work is straightforward React/Next.js component modification with Tailwind styling, inline SVG icons, and CSS animations. No new libraries are needed.

The primary technical challenge is the server/client boundary: session list and progress pages are server components that need completion data from the client-side Zustand store (Phase 14). The pattern established in Phase 14 — server components pass vault-scanned data as props, client components hydrate Zustand and merge — must be followed here. Components that need Zustand data (SessionRow badges, ModuleJourney current marker, CumulativeMetrics) will need to be client components or wrapped in client component boundaries.

**Primary recommendation:** Structure as 4 plans: (1) SessionRow badges + SessionList prerequisite state computation, (2) PrerequisiteBanner on session detail page, (3) CountCard clickable + ModuleJourney "you are here" marker, (4) CumulativeMetrics component. Plans 1-2 are the prerequisite state feature (NAV-02), plans 3-4 are independent progress enhancements (PROG-10, PROG-11, PROG-12).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Icon badges left of session number -- checkmark for completed, open-circle for available, lock for locked. Small, scannable at a glance
- **D-02:** Locked sessions show inline hint text "Requires #NN" next to the lock icon, telling the learner exactly what to complete next
- **D-03:** Prerequisite state derived from `prerequisite` field in session schema combined with completion data from Zustand store
- **D-04:** Tapping a locked session navigates to the session page (no blocking) but shows a dismissible info banner at top
- **D-05:** Banner includes a clickable link to the prerequisite session
- **D-06:** Soft gating is informational only, never blocks navigation
- **D-07:** Each count card links to specific routes: Sessions Completed -> /sessions, Patches Created -> /patches, Modules Done -> /modules, Challenges Completed -> /sessions
- **D-08:** Subtle hover lift affordance on count cards
- **D-09:** Current module gets a pulsing/glowing accent dot
- **D-10:** "Current module" = module containing first incomplete session in sequence order
- **D-11:** When all modules complete, no pulsing dot -- all dots solid
- **D-12:** New metrics section: "Sessions this month" and "Total active weeks"
- **D-13:** An "active week" = any week where at least one session was marked complete
- **D-14:** Metrics are additive-only and never guilt-inducing

### Claude's Discretion
- Specific icon choices (SVG icons, emoji, or CSS shapes for lock/check/circle)
- Banner dismissal behavior (X button, auto-dismiss, or persistent per visit)
- Pulsing animation implementation (CSS animation, keyframes, timing)
- How "sessions this month" is computed (calendar month vs rolling 30 days)
- Count card hover transition timing and shadow values
- Layout of cumulative metrics within the progress page

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-02 | Session list shows prerequisite state (locked/available/completed) with soft visual gating | SessionRow badge modification, PrerequisiteBanner component, prerequisite state derivation from schema + Zustand |
| PROG-10 | Count cards on progress page are clickable, navigating to the relevant content list | CountCard wrapping in Next.js Link, hover lift CSS |
| PROG-11 | Module journey visualization shows a "you are here" marker at current position | ModuleJourney third state ("current"), CSS pulse animation, first-incomplete-session logic |
| PROG-12 | Progress page shows cumulative practice metrics (sessions this month, total active weeks) | New CumulativeMetrics component, date-based computation from completion data |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Session length**: 15-30 min, ADHD-friendly micro-sessions
- **Additive-only progress**: No streaks, no "days since", no guilt-inducing metrics (PROG-04 from v1.0)
- **Tailwind-only styling**: CSS custom properties, no component libraries
- **Server/client split**: Server components for data loading, client components for interactivity (Next.js App Router)
- **Content pipeline**: App reads from ~/song vault or bundled demo content
- **Demo mode**: Synthetic data for demo, read-only state

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^15.5.14 | App Router, server/client components, Link | Already in use |
| React | ^19.2.4 | Component rendering, useState for banner dismiss | Already in use |
| Tailwind CSS | ^4.2.2 | All styling, custom properties, animations | Already in use |
| Zustand | TBD (Phase 14) | Client-side completion state | Phase 14 introduces this |

### Supporting (already installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | ^2.1.1 | Conditional class merging | Badge state classes |
| Zod | ^3.23.0 | Schema validation | Already validates prerequisite field |

### No New Dependencies
Phase 15 requires zero new npm packages. All work is component modification, inline SVG, and CSS.

## Architecture Patterns

### Server/Client Boundary for Completion Data

The critical pattern: session list and progress pages are currently **server components**. Phase 14 introduces a Zustand store (client-side, localStorage-persisted). Phase 15 components need completion data from that store.

**Pattern:** Wrap interactive sections in client component boundaries. The server component loads session/progress data and passes it as props. The client component reads Zustand state and computes derived state (prerequisite status, current module, metrics).

```
Server Component (page.tsx)
  |-- loads sessions, passes as props
  |-- passes vault-scanned completions as props
  v
Client Component Wrapper
  |-- reads Zustand store (manual completions)
  |-- merges with vault completions (union)
  |-- computes prerequisite state per session
  |-- renders SessionRow with state prop
```

### Prerequisite State Derivation

Each session has a `prerequisite: number | null` field in its schema. The state for each session is:

```typescript
function getSessionState(
  sessionNumber: number,
  prerequisiteNumber: number | null,
  completedSessions: Set<number>
): 'completed' | 'available' | 'locked' {
  if (completedSessions.has(sessionNumber)) return 'completed';
  if (prerequisiteNumber === null) return 'available';
  if (completedSessions.has(prerequisiteNumber)) return 'available';
  return 'locked';
}
```

This is pure, testable logic. Extract to a utility function in `src/lib/sessions.ts` or a new `src/lib/prerequisite.ts`.

### "Current Module" Derivation

Current module = the module containing the first incomplete session in sequence order (D-10). This aligns with Phase 14's resume bar "next session" logic.

```typescript
function getCurrentModule(
  groups: ModuleGroup[],
  completedSessions: Set<number>
): string | null {
  for (const group of groups) {
    for (const session of group.sessions) {
      if (!completedSessions.has(session.data.session_number)) {
        return group.module;
      }
    }
  }
  return null; // all complete
}
```

### Cumulative Metrics Computation

**Sessions this month:** Count completions with dates in current calendar month. Requires completion timestamps -- Phase 14's Zustand store needs to store completion dates, not just boolean state.

**Critical dependency:** Phase 14 must store `completedAt: string` (ISO date) per session, not just `completed: boolean`. If Phase 14 stores only booleans, cumulative metrics will only work for vault-scanned completions (which have dates from daily notes). Research the Phase 14 store shape when its plan is finalized.

**Fallback:** If only boolean completion data is available, "sessions this month" shows total completed (no temporal filter) and "active weeks" cannot be computed. The planner should ensure Phase 14 stores timestamps.

**Active weeks:** Count distinct ISO weeks (Monday-start) with at least one completion event.

```typescript
function getActiveWeeks(completionDates: Date[]): number {
  const weeks = new Set<string>();
  for (const date of completionDates) {
    // ISO week key: year + week number
    const yearWeek = getISOWeekKey(date);
    weeks.add(yearWeek);
  }
  return weeks.size;
}
```

### Recommended Component Structure

```
src/components/
  session-row.tsx          # MODIFY: add state badge icon + hint text
  session-list.tsx         # MODIFY: pass state to SessionRow (needs client wrapper)
  prerequisite-banner.tsx  # NEW: dismissible info banner on session detail
  count-card.tsx           # MODIFY: wrap in Link, add hover lift
  module-journey.tsx       # MODIFY: add 'current' state with pulse animation
  cumulative-metrics.tsx   # NEW: practice activity section
src/lib/
  prerequisite.ts          # NEW: getSessionState(), getCurrentModule()
```

### Anti-Patterns to Avoid
- **Blocking navigation for locked sessions:** D-06 is explicit -- soft gating only. Never use `pointer-events-none` or conditional Link rendering for locked sessions
- **Storing computed state in Zustand:** Prerequisite state and current module are derived from completion data + session schema. Compute on render, don't store
- **Complex animation libraries:** The pulsing dot is a simple CSS keyframe animation. Do not add framer-motion or similar

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Client-side routing | Custom onClick handlers | Next.js `Link` component | Prefetching, accessibility, route transitions built in |
| Conditional classes | String concatenation | `clsx()` | Already in project, handles falsy values cleanly |
| ISO week calculation | Manual week math | `getISOWeekKey()` utility | Date math is error-prone, but this is simple enough for a small utility (no library needed) |

## Common Pitfalls

### Pitfall 1: Hydration Mismatch on Session List
**What goes wrong:** Server renders session list without completion data (no Zustand on server), client hydrates with completion badges -- React throws hydration mismatch
**Why it happens:** Zustand state is client-only (localStorage), server has no access
**How to avoid:** Either (a) render badges only after hydration using a `useHydrated()` hook from Phase 14, or (b) make the entire SessionList a client component that receives session data as props but reads completion state from Zustand after mount. The UI-SPEC's badge icons should have a "loading" or "available" default that matches server output.
**Warning signs:** Console warnings about hydration mismatches, flickering badges on page load

### Pitfall 2: Cumulative Metrics Without Timestamps
**What goes wrong:** "Sessions this month" and "active weeks" require completion timestamps, but Phase 14 store may only track boolean completion
**Why it happens:** Phase 14 context mentions "completion toggle" but doesn't explicitly mention storing dates
**How to avoid:** Ensure Phase 14 plan stores `{ completedAt: string }` per session. If timestamps unavailable, degrade gracefully: show total counts, hide temporal metrics
**Warning signs:** Metrics always showing 0 or showing all-time total instead of monthly

### Pitfall 3: Demo Mode Metrics
**What goes wrong:** Demo mode shows zero metrics because synthetic data has no completion timestamps
**Why it happens:** `getSyntheticCompletedSessions()` returns `Set<number>` -- session numbers only, no dates
**How to avoid:** Add synthetic completion dates to demo data, or compute from synthetic daily note dates. The existing `SYNTHETIC_COMPLETED_SESSIONS` and daily note fixtures already have dates
**Warning signs:** Empty metrics section in demo mode, "Keep going" empty state showing when there should be data

### Pitfall 4: Pulse Animation Performance
**What goes wrong:** Pulsing dot causes layout repaints, janky scrolling
**Why it happens:** `box-shadow` animation triggers paint on every frame
**How to avoid:** Use `will-change: box-shadow` or transform-based animation (scale a pseudo-element). Respect `prefers-reduced-motion` per UI-SPEC accessibility requirements
**Warning signs:** Janky scrolling near module journey section, high paint times in DevTools

### Pitfall 5: Count Card Accessibility
**What goes wrong:** Wrapping CountCard in Link loses the existing `aria-label`
**Why it happens:** Link component creates an `<a>` tag; nested `div` with `aria-label` may conflict
**How to avoid:** Move `aria-label` to the Link wrapper. Ensure keyboard focus shows the hover lift effect via `focus-visible` styles per UI-SPEC
**Warning signs:** Screen reader announcing redundant labels, no visible focus indicator

## Code Examples

### SessionRow with Badge (verified pattern from existing code)

Current SessionRow is a simple Link with flexbox layout. New version adds icon slot:

```tsx
// src/components/session-row.tsx
import Link from 'next/link';
import { clsx } from 'clsx';

interface SessionRowProps {
  number: number;
  title: string;
  duration: number;
  href: string;
  state: 'completed' | 'available' | 'locked';
  prerequisiteNumber: number | null;
}

export function SessionRow({ number, title, duration, href, state, prerequisiteNumber }: SessionRowProps) {
  return (
    <Link
      href={href}
      className="group flex items-start justify-between py-md px-sm rounded transition-colors hover:bg-surface"
    >
      <div className="flex items-start gap-sm">
        <span className="flex-shrink-0 mt-[3px]">
          {state === 'completed' && <CheckCircleIcon />}
          {state === 'available' && <OpenCircleIcon />}
          {state === 'locked' && <LockIcon />}
        </span>
        <div>
          <span className="text-text">
            {number}. {title}
          </span>
          {state === 'locked' && prerequisiteNumber != null && (
            <span className="block text-[14px] text-muted">
              Requires #{prerequisiteNumber}
            </span>
          )}
        </div>
      </div>
      <span className="text-muted text-sm ml-md whitespace-nowrap">
        {duration} min
      </span>
    </Link>
  );
}
```

### CountCard with Link Wrapper

```tsx
// src/components/count-card.tsx
import Link from 'next/link';

export function CountCard({ count, label, href }: { count: number; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-surface p-lg rounded-lg flex flex-col items-center cursor-pointer
                 transition-[transform,box-shadow] duration-150 ease-out
                 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(200,255,0,0.08)]
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${count} ${label}`}
    >
      <span className="text-[48px] font-bold text-accent leading-none">
        {count}
      </span>
      <span className="text-[14px] text-muted mt-sm">{label}</span>
    </Link>
  );
}
```

### Pulse Animation (Tailwind CSS)

```css
/* In globals.css or inline via Tailwind arbitrary values */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(200, 255, 0, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(200, 255, 0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .animate-pulse-glow {
    animation: none;
    border: 2px solid var(--color-accent);
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-only completion data | Zustand + vault merge (Phase 14) | Phase 14 (pending) | Client components can read completion state |
| Static module dots | Three-state dots (complete/current/future) | This phase | Visual "you are here" navigation |
| Static count cards | Clickable navigation cards | This phase | Progress page becomes a navigation hub |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 3.x with jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-02 | getSessionState() returns correct state for completed/available/locked | unit | `npx vitest run src/lib/__tests__/prerequisite.test.ts -x` | Wave 0 |
| NAV-02 | SessionRow renders badge icon matching state prop | unit | `npx vitest run src/components/__tests__/session-row.test.tsx -x` | Wave 0 |
| NAV-02 | PrerequisiteBanner renders with correct prerequisite link | unit | `npx vitest run src/components/__tests__/prerequisite-banner.test.tsx -x` | Wave 0 |
| PROG-10 | CountCard renders as Link with correct href | unit | `npx vitest run src/components/__tests__/count-card.test.tsx -x` | Wave 0 |
| PROG-11 | getCurrentModule() returns correct module from completion data | unit | `npx vitest run src/lib/__tests__/prerequisite.test.ts -x` | Wave 0 |
| PROG-11 | ModuleJourney renders pulse class on current module dot | unit | `npx vitest run src/components/__tests__/module-journey.test.tsx -x` | Wave 0 |
| PROG-12 | getSessionsThisMonth() and getActiveWeeks() compute correctly | unit | `npx vitest run src/lib/__tests__/cumulative-metrics.test.ts -x` | Wave 0 |
| PROG-12 | CumulativeMetrics renders metric values | unit | `npx vitest run src/components/__tests__/cumulative-metrics.test.tsx -x` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/__tests__/prerequisite.test.ts` -- covers NAV-02, PROG-11 (getSessionState, getCurrentModule)
- [ ] `src/components/__tests__/session-row.test.tsx` -- covers NAV-02 (badge rendering)
- [ ] `src/components/__tests__/prerequisite-banner.test.tsx` -- covers NAV-02 (banner content)
- [ ] `src/components/__tests__/count-card.test.tsx` -- covers PROG-10 (Link wrapping)
- [ ] `src/components/__tests__/module-journey.test.tsx` -- covers PROG-11 (pulse class)
- [ ] `src/lib/__tests__/cumulative-metrics.test.ts` -- covers PROG-12 (date computations)
- [ ] `src/components/__tests__/cumulative-metrics.test.tsx` -- covers PROG-12 (render)

## Open Questions

1. **Phase 14 store shape for completion timestamps**
   - What we know: Phase 14 introduces Zustand with persist middleware for completion state
   - What's unclear: Whether the store stores `completedAt: string` timestamps or just `completed: boolean` per session
   - Recommendation: Phase 14 plan should store `{ [sessionNumber]: { completedAt: string } }` to enable cumulative metrics. If not, Phase 15 degrades gracefully (total counts only, no temporal metrics)

2. **Demo mode completion timestamps**
   - What we know: `getSyntheticCompletedSessions()` returns `Set<number>` -- no dates
   - What's unclear: How to provide synthetic temporal data for demo mode metrics
   - Recommendation: Add a companion function `getSyntheticCompletionDates()` returning `Map<number, string>` or derive dates from existing synthetic daily note fixtures

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/components/session-row.tsx`, `count-card.tsx`, `module-journey.tsx`, `session-list.tsx` -- current component shapes
- Existing codebase: `src/lib/progress.ts`, `src/lib/sessions.ts` -- current data layer
- Existing codebase: `src/lib/content/schemas.ts` -- session schema with `prerequisite` field
- Phase 14 CONTEXT.md -- Zustand store decisions, merge strategy
- Phase 15 CONTEXT.md -- all implementation decisions (D-01 through D-14)
- Phase 15 UI-SPEC.md -- complete visual contract (icon specs, animations, colors, accessibility)

### Secondary (MEDIUM confidence)
- Phase 14 store shape assumptions (store not yet implemented)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all existing libraries
- Architecture: HIGH -- straightforward component modifications following established patterns
- Pitfalls: HIGH -- hydration mismatch is well-understood Next.js pattern, other pitfalls from direct code analysis

**Research date:** 2026-04-05
**Valid until:** 2026-05-05 (stable -- no external dependencies changing)
