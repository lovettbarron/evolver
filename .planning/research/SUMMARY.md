# Research Summary: v1.2 Learner Experience & Discovery

**Project:** Evolver Deep Learning
**Domain:** Learner UX improvements for ADHD-friendly instrument learning platform
**Researched:** 2026-04-03
**Overall confidence:** HIGH

## Executive Summary

The v1.2 milestone transforms the app from a browsable curriculum into a daily practice tool by adding four capabilities: persistent session completion tracking, "continue where you left off" navigation, full-text search, and prerequisite visualization. The fundamental architectural challenge is introducing mutable client-side state into a currently stateless server-component architecture without disrupting the existing content pipeline.

Two new npm dependencies are needed: **MiniSearch** (^7.2.0, ~7KB gzipped) for client-side full-text search, and **Zustand** (^5.0.0, ~1.2KB gzipped) for persistent learner state with localStorage. Together they add under 9KB to the client bundle. The existing stack (Next.js 15, Zod, Tailwind, Lucide) covers all other needs -- prerequisite visualization, streak-alternative progress metrics, and UI enhancements are pure React + CSS work.

The most dangerous pitfall is implementing consecutive-day streaks. The project's own ADHD design document explicitly prohibits calendar-based tracking because "missed dates create guilt spirals." Research confirms that streak features actively harm ADHD users. Use additive-only metrics instead: cumulative session counts, module completions, and patch library size. These only increase and never create shame.

The completion tracking system must solve the two-source problem: existing Obsidian vault scanning (server-side) coexists with new manual toggles (client-side localStorage). The merge strategy is union -- if either source says a session is complete, it is complete. This is additive, never subtractive, matching the ADHD design principle that progress only moves forward.

## Key Findings

**Stack:** Two new packages (MiniSearch + Zustand, ~9KB combined). Zero other additions needed.

**Architecture:** Zustand store with `persist` middleware manages completions, last-visited, and practice dates in localStorage. Server components pass content + vault-scanned completions as props. Client components merge both sources via a `useCompletedSessions` hook. Search uses a build-time document array loaded into MiniSearch on the client.

**Critical pitfall:** Never implement consecutive-day streaks. Use additive counts only. This is a hard design rule, not a preference.

## Reconciliation Notes

The parallel ARCHITECTURE.md research recommends React Context + custom `useLocalStorage` hook. The STACK.md recommends Zustand with `persist` middleware. **Recommendation: use Zustand.** Rationale:

1. Zustand's `persist` middleware handles localStorage serialization, hydration safety, and schema versioning out of the box -- replacing ~150 lines of custom Context + hook code
2. Zustand uses `useSyncExternalStore` internally, avoiding the re-render-all-consumers problem of React Context
3. Zustand selectors enable granular subscriptions (session list only re-renders when completions change, not when last-visited updates)
4. No Provider component needed -- the store is a module-level singleton imported directly by client components, which is simpler in a server-component-first architecture where adding providers to the tree requires care
5. At 1.2KB gzipped, Zustand costs less bundle size than the custom code it replaces

The ARCHITECTURE.md's patterns for server/client boundary, prerequisite derivation, and component classification remain fully valid regardless of which state solution is chosen. The PITFALLS.md's warnings about hydration mismatches, dual-source conflicts, and client boundary creep apply equally to both approaches.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Learner State Foundation** - Zustand store with persist, completion toggle, last-visited tracking
   - Addresses: Manual completion, continue where you left off
   - Avoids: Hydration mismatch (PITFALLS P2), dual-source conflict (P3), key collision (P11)
   - This is the critical path -- four other features depend on completion data existing

2. **Prerequisite Visualization & Progress** - Session state badges, module journey enhancements, clickable counts
   - Addresses: Prerequisite locked/available/completed states, "you are here" marker
   - Avoids: Hard gating frustration (P4), streak guilt spirals (P1)
   - Depends on Phase 1 for completion data

3. **Search & Filtering** - Build-time search document extraction, MiniSearch integration, search UI
   - Addresses: Full-text search across sessions/patches, tag filtering
   - Avoids: Search index bloat (P5), client boundary creep (P6)
   - Independent of Phases 1-2 -- can parallelize

4. **Content & Polish** - Troubleshooting guides, transitional pedagogy content, progress metric refinements
   - Addresses: "I hear nothing" guides, recipe session scaffolding
   - Avoids: Stale troubleshooting references (P8)

**Phase ordering rationale:**
- Phase 1 is the foundation: completion data unlocks prerequisite viz, continue bar, and progress enhancements
- Phase 2 depends on Phase 1 (needs completion state) but Phase 3 does not (search is independent)
- Phases 2 and 3 can run in parallel after Phase 1 completes
- Phase 4 is pure content authoring, can happen anytime

**Research flags for phases:**
- Phase 1: Standard patterns. Zustand persist is well-documented. No additional research needed.
- Phase 2: Standard patterns. Prerequisite derivation is pure logic. No research needed.
- Phase 3: LOW risk -- MiniSearch API is simple. May need brief investigation of build-time index generation vs. API route approach.
- Phase 4: No research needed. Content authoring against known instrument.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | MiniSearch and Zustand are well-established, actively maintained, with good TypeScript support. Versions verified against npm registry. |
| Features | HIGH | Feature landscape mapped against competitor analysis (Duolingo, Codecademy, Syntorial). ADHD design constraints from project's own framework docs. |
| Architecture | HIGH | Based on direct codebase inspection. Server/client boundary patterns are standard Next.js App Router. |
| Pitfalls | HIGH | 11 pitfalls identified from codebase audit, ADHD research, and Next.js hydration documentation. Recovery costs assessed. |

## Gaps to Address

- **Build-time vs. API route for search index:** ARCHITECTURE.md recommends API route (fresh content from vault). STACK.md recommends build-time generation. Decision depends on whether vault content changes between builds in local mode. For demo mode, build-time is clearly correct. For vault mode, an API route avoids stale indexes. Resolve during Phase 3 planning.
- **Streak alternative specifics:** Research says "no consecutive-day streaks" but does not specify exactly what to show. Options: "sessions this month," "active weeks," "total sessions" milestones. Resolve during Phase 2 design.
- **Cross-tab sync:** Zustand persist does not sync across browser tabs by default. If a user has two tabs open and marks a session complete in one, the other may show stale state. Low priority -- single-user tool -- but worth noting.
- **Export/import learner data:** Mentioned in FEATURES.md as a differentiator. Not researched in depth. Simple JSON export/import from Zustand store. Defer to late v1.2 or v1.3.

## Sources

All sources documented in individual research files:
- STACK.md: MiniSearch, Zustand, npm registry, npm-compare, Next.js docs
- FEATURES.md: Duolingo, Codecademy, Syntorial, Khan Academy, Ableton Learning Synths, ADHD gamification research
- ARCHITECTURE.md: MiniSearch GitHub, Next.js App Router patterns, codebase inspection
- PITFALLS.md: ADHD design framework, Next.js hydration docs, streak harm research, codebase audit

---
*Research completed: 2026-04-03*
*Ready for roadmap: yes*
