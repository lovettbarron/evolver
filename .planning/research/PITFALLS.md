# Pitfalls Research: v1.2 Learner Experience & Discovery

**Domain:** Adding search, client-side persistent state, gamification, prerequisite gating, and manual completion to an ADHD-focused learning app built on Next.js 15 server components
**Researched:** 2026-04-03
**Confidence:** HIGH (based on codebase audit, ADHD design principles doc, Next.js hydration documentation, and ADHD gamification research)

## Critical Pitfalls

### Pitfall 1: Streak Counter Creates ADHD Guilt Spirals

**What goes wrong:**
The app adds a "practice streak" (consecutive days) counter to the progress dashboard. The user misses two days because of ADHD executive function challenges. The streak resets to zero. The user feels the same shame spiral that calendar-based tracking was explicitly designed to prevent (see `framework/adhd-design.md` principle #8: "Forgiveness is Built In" and the anti-pattern table: "Calendar-based schedules -> Missed dates -> guilt spiral"). The streak feature directly contradicts the project's foundational ADHD design document, which states: "The curriculum doesn't have dates, only sequence."

**Why it happens:**
Streaks are the default gamification pattern. Every learning app (Duolingo, etc.) uses them. They feel like an obvious add. But research on ADHD users specifically shows that streak features "create the opposite effect: anxiety, avoidance, and eventually, app abandonment" because "people with ADHD often experience heightened perfectionism, anxiety around performance, and resistance to external pressure." The PROJECT.md itself lists "Sequence-based not calendar-based" as a key decision with the rationale "Missed days create guilt spirals with ADHD."

**Consequences:**
- User avoids opening the app after missing a day (activation energy increases)
- "Zero streak" becomes a visible failure marker every time the app loads
- The app becomes a source of shame rather than motivation -- the exact opposite of its purpose
- User abandons the app entirely (the Duolingo churn pattern)

**Prevention:**
1. **Never implement consecutive-day streaks.** This is a hard rule, not a preference.
2. Use **cumulative metrics only**: "12 sessions completed," "5 patches created," "3 modules done." These only go up. They match the existing `ProgressData` interface which already tracks `sessionsCompleted`, `patchesCreated`, `modulesDone` -- all additive, never decreasing.
3. If any time-based engagement metric is desired, use **"sessions this month"** or **"active weeks"** (non-consecutive) -- never consecutive-day counting.
4. Show **"you are here" in the module journey** (already planned) -- this is intrinsic progress visualization, not extrinsic pressure.
5. If streak-like motivation is wanted, use **"total sessions" milestones** ("You've completed 10 sessions!") which cannot be lost.

**Detection:**
- Any field in the codebase tracking consecutive days
- Any UI element that resets to zero based on inactivity
- Any notification or visual indicator that implies "you should have practiced yesterday"

**Phase to address:**
Progress enhancements phase. This pitfall must be addressed in the design specification before any progress UI work begins. The existing `ProgressData` interface is already correctly designed (additive only) -- the pitfall is adding new fields that violate this.

---

### Pitfall 2: localStorage State Causes Hydration Mismatches in Server-Component-First App

**What goes wrong:**
The app needs client-side persistent state for "continue where you left off" (last session visited), manual completion toggles, and search preferences. A developer reads localStorage during component render to show the user's last session. The server renders the page with no localStorage (it does not exist on the server). The client hydrates with a different value from localStorage. React throws a hydration mismatch error. In Next.js 15, this manifests as either a console error (development) or silent UI corruption (production).

This app is currently 100% server components -- there are zero `"use client"` directives in `src/components/`. Adding localStorage is the first introduction of client-side state, making every pattern decision here foundational.

**Why it happens:**
The current architecture has no client components at all. Every component renders on the server via `async function` patterns (see `layout.tsx`, progress `page.tsx`). Developers unfamiliar with this codebase may not realize that adding `"use client"` to an existing component converts its entire subtree to client rendering, potentially breaking server-side data fetching that components rely on.

**Consequences:**
- Hydration mismatch errors in development (React error overlay)
- Silent UI bugs in production (wrong session shown, completion state flickering)
- If `"use client"` is added to a component that currently does `async` server work, that component breaks entirely (client components cannot be async in React)
- Performance regression if large component subtrees become client-rendered unnecessarily

**Prevention:**
1. **Create dedicated client component wrappers** for localStorage access. Never add `"use client"` to existing server components. Instead, create new leaf components: `<LastSessionBanner />`, `<CompletionToggle />`, `<SearchInput />`.
2. **Always use the `useEffect` pattern** for localStorage reads:
   ```tsx
   const [value, setValue] = useState<string | null>(null); // null = loading
   useEffect(() => {
     setValue(localStorage.getItem('key'));
   }, []);
   ```
   This ensures the server render and initial client render both produce `null`, avoiding mismatch.
3. **Render a loading/skeleton state** for localStorage-dependent UI during the first render. Never conditionally render different DOM structures based on localStorage during SSR.
4. **Keep the client boundary as narrow as possible.** The `<SessionDetail />` component should remain a server component; only the `<CompletionToggle />` child within it should be a client component.
5. **Create a `useLocalStorage` hook** early that encapsulates the hydration-safe pattern. Every feature that needs localStorage should use this single hook rather than implementing the pattern independently.

**Detection:**
- React hydration mismatch warnings in browser console
- UI elements that flash/flicker on page load (showing server state then switching to client state)
- `"use client"` added to files that contain `async function` components
- `localStorage.getItem()` called outside of `useEffect`

**Phase to address:**
Must be the first technical task -- the `useLocalStorage` hook and client component boundary pattern must be established before any feature uses localStorage. Every subsequent feature (search, completion, "continue where you left off") depends on this pattern being correct.

---

### Pitfall 3: Dual Completion Sources Create Contradictory State

**What goes wrong:**
The app currently tracks completion via Obsidian vault scanning (`scanDailyNotes()` in `progress.ts`). v1.2 adds manual completion toggles (localStorage) for users without Obsidian. Now there are two sources of truth: the vault says session 5 is not completed, but localStorage says it is (or vice versa). The progress dashboard shows inconsistent numbers. The prerequisite gate blocks a session the user has manually marked complete because the vault scan does not find it. The "continue where you left off" feature points to the wrong session.

**Why it happens:**
These are genuinely different user modes (vault user vs. non-vault user) but the `computeProgress()` function currently only accepts `completedSessionNumbers: Set<number>` from a single source. There is no merge strategy defined for when both sources have data.

**Consequences:**
- User marks session complete manually, navigates to progress page, sees it as incomplete (vault scan overrides)
- Prerequisite gating blocks advancement when manual completion should allow it
- Module completion flags disagree between progress dashboard and session list
- In demo mode, synthetic data, manual toggles, and vault data could all conflict

**Prevention:**
1. **Define a clear precedence rule**: manual completion is additive to vault scanning, never subtractive. If either source says "complete," the session is complete. This is a union merge: `completedSessions = vaultSessions UNION manualSessions`.
2. **Store manual completions per-instrument**: localStorage key should be `evolver:manual-completions` not `manual-completions`, because completion is instrument-scoped.
3. **The merge must happen at a single point** -- modify `computeProgress()` to accept an optional second `Set<number>` for manual completions, or merge before calling it. Do not merge in UI components.
4. **Show completion source in the UI** when possible: a small indicator showing whether completion was detected via vault or manually marked. This prevents confusion when sources disagree.
5. **In demo mode, manual completions should layer on top of synthetic data**, not replace it. A user toggling completions in demo mode should see their changes persist but not lose the synthetic baseline.

**Detection:**
- Progress numbers change when navigating between pages (one page reads vault, another reads localStorage)
- "Mark complete" toggle does not affect the prerequisite gate for the next session
- Module shows as incomplete despite all sessions being manually marked complete

**Phase to address:**
Must be designed before either manual completion or prerequisite gating is implemented. The merge strategy is a prerequisite for both features.

---

### Pitfall 4: Prerequisite Gating Frustrates Instead of Guiding

**What goes wrong:**
Sessions are locked behind prerequisite completion. The user sees a padlock icon on session 12 because sessions 1-11 are not all marked complete. But the user has actually done sessions 1-8, skipped session 9 (which covers a topic they already know from experience), and wants to try session 12. The gate blocks them. This violates ADHD design principle #8 ("Forgiveness is Built In": "Repeating sessions is encouraged" and "Skipping days/weeks is expected"). The app now feels like a rigid course, not a flexible learning tool.

**Why it happens:**
Prerequisite gating is borrowed from LMS (Learning Management System) design where strict ordering ensures pedagogical integrity. But this app's ADHD design principles explicitly reject rigidity. The anti-pattern table warns against "Perfectionism gates: 'Master this before moving on' -> stalling."

**Consequences:**
- User feels punished for non-linear learning
- Activation energy increases ("I need to go back and mark 3 sessions complete before I can do what I want")
- User stops using the app because it feels controlling rather than supportive
- Advanced users (who already know some synth concepts) are forced through beginner sessions

**Prevention:**
1. **Use soft gating, not hard gating.** Show prerequisites as recommendations, not locks. Visual states should be: "completed" (check), "recommended next" (highlighted), "available" (normal), "has prerequisites" (dimmed with tooltip showing what they are). Never "locked" (disabled/unclickable).
2. **All sessions must remain accessible regardless of completion state.** The user can always click any session and start it.
3. **Show prerequisite context, not barriers**: "This session builds on: [Session 9: Filter Basics]. If you haven't done it, the warm-up might feel unfamiliar." This is guidance, not enforcement.
4. **Module boundaries, not session boundaries**, are the natural gates. Suggest completing Module 1 before Module 3, but within a module, let the user jump around.
5. **The "you are here" journey view** is the positive version of gating -- it shows where you are and what is recommended next without blocking anything.

**Detection:**
- Any session URL that returns a redirect or error based on completion state
- Any disabled/unclickable session in the UI
- Click handlers that check prerequisites before navigation
- Test scenarios where an incomplete prerequisite prevents session access

**Phase to address:**
Prerequisite visualization phase. The design must specify "soft gating only" before implementation begins. This is a UX decision, not a technical one, but if the wrong decision is made the technical implementation will enforce frustration.

---

## Moderate Pitfalls

### Pitfall 5: Client-Side Search Index Grows Beyond Reasonable Bundle Size

**What goes wrong:**
The app pre-builds a search index from all session and patch content (~125 markdown files currently, growing to 200+ with Cascadia). The full-text index is serialized as JSON and shipped to the client. With full markdown body content, this could be 500KB-1MB+ of JSON, adding significantly to page load time -- especially on mobile or slower connections.

**Why it happens:**
Client-side search (Flexsearch/Fuse.js) requires the index to be available in the browser. The naive approach is to index the full body content of every session and patch. With 35 Evolver sessions, 35+ Cascadia sessions, 40+ patches, and full markdown content per file, the index grows quickly.

**Prevention:**
1. **Index metadata only for the initial implementation**: title, module, tags, objective, instrument. This keeps the index under 50KB for 200+ items.
2. **If full-text search is needed later**, build the index at build time and **lazy-load it** on first search interaction, not on page load. Use dynamic `import()` triggered by the search input receiving focus.
3. **Flexsearch over Fuse.js** for this use case -- Flexsearch is significantly more memory-efficient and faster for the kind of structured content this app has.
4. **Set a budget**: if the serialized index exceeds 100KB, split into metadata index (always loaded) and body index (loaded on demand).
5. **Use the server-component pattern for initial results**: the search page server component can pre-render results from URL search params, while the client component handles real-time filtering. This is the pattern from the Next.js tutorial -- `useSearchParams` on client updates URL, server component fetches matching results.

**Detection:**
- Search index JSON file exceeds 100KB
- Lighthouse reports increased bundle size after search feature is added
- Search input causes visible page jank when the index is first loaded

**Phase to address:**
Search & filtering phase. Size budget should be defined before index generation is built.

---

### Pitfall 6: `"use client"` Boundary Creep Degrades Server-Component Architecture

**What goes wrong:**
Multiple features need client interactivity: search input, completion toggles, "continue where you left off" banner, streak display, prerequisite tooltips. Each one needs `"use client"`. Without discipline, developers add `"use client"` to progressively larger components. Eventually, `session-detail.tsx` or `module-card.tsx` becomes a client component, pulling its entire subtree (including data-fetching children) to the client. The app loses the server-component performance benefits it was built on.

**Why it happens:**
The current codebase has zero client components. There is no established pattern for where the client boundary should go. The first developer to add `"use client"` sets the precedent. If they add it to `session-detail.tsx` (because it needs a completion toggle), every child of that component becomes client-rendered.

**Prevention:**
1. **Establish a component architecture rule**: interactive features are always in dedicated leaf components that wrap around server-rendered content, never the other way around.
2. **Create a `src/components/client/` directory** (or similar convention) to make client components visually distinct in the codebase.
3. **Pattern**: Server component renders content and passes it as `children` to a client wrapper. The client wrapper adds interactivity (toggle, tooltip) without converting the content itself to client rendering.
   ```
   <SessionDetail>           <!-- server: fetches data, renders markdown -->
     <CompletionToggle />    <!-- client: manages localStorage state -->
   </SessionDetail>
   ```
4. **Never add `"use client"` to existing component files.** Always create a new file for the client version.
5. **Code review check**: any PR adding `"use client"` should verify that the file does not import server-only modules (`fs`, `path`, `glob`) and that the component is a leaf node, not a subtree root.

**Detection:**
- `"use client"` in a file that also imports from `@/lib/content/reader` or `@/lib/progress`
- A component file with both `"use client"` and `async function`
- More than 5-6 client components in `src/components/` (initial features should need only 3-4)

**Phase to address:**
First phase of v1.2 implementation. The client component convention must be established before any feature work begins.

---

### Pitfall 7: Manual Completion Toggle Has No Undo / Confirmation

**What goes wrong:**
User accidentally taps the completion toggle on a session they have not actually completed. The session is now marked complete, the prerequisite visualization updates, and the "next session" pointer advances. There is no undo. The user must find the session again and un-toggle it, but they may not remember which session was accidentally toggled, especially across multiple visits.

**Why it happens:**
Toggle buttons are ergonomically convenient but error-prone on touch devices. A single tap with no confirmation permanently changes state. Since manual completions are stored in localStorage and affect the progress dashboard, module completion, and prerequisite visualization, the blast radius of an accidental toggle is wide.

**Prevention:**
1. **Allow easy undo**: the toggle should be bidirectional (mark complete / mark incomplete) with no confirmation dialog for either direction. Friction-free correction is better than friction-full prevention.
2. **Show a brief toast/snackbar** on completion: "Session 5 marked complete. [Undo]" with a 5-second undo window.
3. **Do NOT require confirmation dialogs** -- they add activation energy to a legitimate action (marking complete), violating ADHD design principle #1 (Zero Activation Energy).
4. **Visual feedback must be immediate** -- the toggle state should change instantly (optimistic UI), not wait for any async operation.

**Detection:**
- Completion toggle has a confirmation dialog
- No visual way to un-mark a completed session
- Toggling completion requires navigating to a different page

**Phase to address:**
Manual completion phase. Design the toggle with undo from the start.

---

### Pitfall 8: Troubleshooting Content Becomes Stale as Sessions Evolve

**What goes wrong:**
The "I hear nothing" troubleshooting guide references specific session numbers or patch names. Sessions are renumbered, patches are renamed, or new sessions are inserted between existing ones. The troubleshooting guide now points to the wrong session or a non-existent patch. Users follow stale instructions and get more confused.

**Why it happens:**
Troubleshooting content is written as static markdown that references dynamic content (session numbers, patch names). There is no automated validation that cross-references remain valid. The content validation script (`validate-content.ts`) likely does not check troubleshooting docs for broken internal references.

**Prevention:**
1. **Reference sessions by slug, not by number**, in troubleshooting content. Session slugs are more stable than numbers.
2. **Keep troubleshooting content generic** where possible: "If you hear nothing after loading a patch, check: [MIDI channel, audio routing, volume]" rather than "After Session 3, if you..."
3. **Organize troubleshooting by symptom, not by session**: "No audio output," "Unexpected pitch," "Filter not responding" -- these are instrument-level issues, not session-level.
4. **Add troubleshooting references to content validation**: if a troubleshooting doc mentions `session-XX`, verify that session exists.

**Detection:**
- Troubleshooting doc references a session number that has been renumbered
- User reports following troubleshooting steps that do not match their current session
- Content validation passes but troubleshooting docs have dead references

**Phase to address:**
Troubleshooting content phase. Design the reference strategy before writing content.

---

## Minor Pitfalls

### Pitfall 9: Search Highlights Break Markdown Rendering

**What goes wrong:**
Search results show matched text with highlighting (e.g., wrapping matches in `<mark>` tags). But the matched text is from raw markdown source. Inserting highlight tags into markdown content breaks the rendering pipeline: a highlight inside a code block, a YAML frontmatter value, or a markdown link produces corrupted output.

**Prevention:**
1. Search results should show **plain text excerpts**, not highlighted markdown source.
2. If highlighting is desired, apply it to **rendered text** (post-markdown-processing), not to source markdown.
3. Simpler and safer: show the matched field name ("Found in: objective") and the surrounding sentence as plain text, without inline highlighting.

**Phase to address:** Search phase, UI design stage.

---

### Pitfall 10: "Continue Where You Left Off" Stale After Content Updates

**What goes wrong:**
localStorage stores the last-visited session slug (e.g., `evolver/07-oscillators-fm-synthesis`). A content update renames or removes that session. The "continue" banner links to a 404 page.

**Prevention:**
1. The "continue" feature must verify the stored session slug still resolves to valid content before displaying the banner.
2. If the session no longer exists, fall back to the first incomplete session or clear the stored value.
3. Store both the slug and the session number -- if the slug fails, try to find the session by number as a fallback.

**Phase to address:** "Continue where you left off" feature implementation.

---

### Pitfall 11: localStorage Keys Collide Across Instruments

**What goes wrong:**
Manual completions are stored under a generic key like `completedSessions`. The user completes Evolver session 5 and Cascadia session 5. Both are stored in the same Set. The app cannot distinguish which instrument's session 5 was completed. Progress is inflated or crossed between instruments.

**Prevention:**
1. **Namespace all localStorage keys by instrument**: `evolver:completedSessions`, `cascadia:completedSessions`, `evolver:lastSession`, etc.
2. Define the key naming convention once in a shared utility, not ad-hoc in each component.
3. The existing `computeProgress()` function is already per-instrument (takes `instrument: string` parameter) -- the localStorage layer must match this scoping.

**Phase to address:** First localStorage implementation. Must be correct from the start; migrating keys later requires data migration code.

---

## ADHD-Specific Anti-Patterns for Gamification

These are patterns that work well for neurotypical users but actively harm ADHD users in this context. Derived from the project's `framework/adhd-design.md` and ADHD gamification research.

| Anti-Pattern | Why It Harms ADHD Users | What to Do Instead |
|-------------|------------------------|-------------------|
| Consecutive-day streaks | Missed days create shame spirals; ADHD users cannot reliably maintain daily habits | Cumulative counts only: "12 sessions done" (never resets) |
| Daily practice reminders | External pressure triggers avoidance in ADHD; the "wall of awful" grows | No notifications. The app is a tool you reach for, not a nag |
| Leaderboards / social comparison | ADHD perfectionism + comparison = paralysis | Personal progress only. No other users exist |
| "You missed X days" messaging | Directly triggers guilt about time-blindness, a core ADHD trait | Show only positive: "Welcome back! Your next session is..." |
| XP / points with levels | Creates external motivation that ADHD brains eventually habituate to, then ignore | Real artifacts (patches, techniques) are the reward -- they have intrinsic value |
| Loss aversion mechanics | "Your streak will reset!" exploits anxiety. ADHD users have elevated anxiety comorbidity | Nothing in the app should ever decrease or reset. Progress only goes forward |
| Badges for consistency | Rewards the thing ADHD users struggle with most (consistency), highlighting their weakness | Badges for milestones if at all: "Completed Module 1" (achievement, not habit) |
| Completion percentages | "73% complete" creates anxiety about the remaining 27% and pressure to reach 100% | Show completed items as a growing list, not as a fraction of a total |

**The safe gamification elements for this app:**
- Additive session/patch/module counts (already in `ProgressData`)
- "You are here" position in module journey (planned)
- Patch library as tangible evidence of learning (already exists)
- Module completion celebrations (one-time, not recurring)
- "Welcome back" messaging that references what was last learned (not how long ago)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| localStorage foundation | Hydration mismatch (P2), key collision (P11) | Build `useLocalStorage` hook first with hydration-safe pattern; namespace keys by instrument |
| Client-side search | Bundle size (P5), boundary creep (P6) | Index metadata only; search input is a leaf client component |
| Manual completion | Dual source conflict (P3), no undo (P7) | Union merge strategy; bidirectional toggle with undo toast |
| Prerequisite visualization | Hard gating (P4) | Soft gating only -- visual recommendations, never locks |
| Progress enhancements / streaks | Guilt spiral (P1) | Additive metrics only. Zero consecutive-day tracking. Hard rule |
| Troubleshooting content | Stale references (P8) | Reference by slug, organize by symptom not session |
| "Continue where you left off" | Stale slug (P10) | Verify slug resolves before displaying |

---

## "Looks Done But Isn't" Checklist

- [ ] **Hydration**: No `localStorage.getItem()` calls outside `useEffect` hooks
- [ ] **Client boundary**: All `"use client"` files are leaf components, not subtree roots
- [ ] **Client boundary**: No `"use client"` file imports from `@/lib/content/reader` or `@/lib/progress`
- [ ] **Completion merge**: `computeProgress()` accepts both vault and manual completion sources
- [ ] **Completion merge**: Manual completion + vault completion = union, not override
- [ ] **Prerequisite gating**: Every session is clickable regardless of completion state
- [ ] **Prerequisite gating**: No HTTP redirects based on prerequisite completion
- [ ] **Streaks**: No field in codebase tracks consecutive days
- [ ] **Streaks**: No UI element that resets to zero based on inactivity
- [ ] **Streaks**: No messaging about missed days or time since last session
- [ ] **Search index**: Serialized index is under 100KB
- [ ] **Search input**: Is a leaf client component, not embedded in a server component
- [ ] **localStorage keys**: All namespaced by instrument slug
- [ ] **Manual toggle**: Bidirectional (can mark incomplete after marking complete)
- [ ] **"Continue" banner**: Validates stored session slug before rendering link
- [ ] **Troubleshooting**: References sessions by slug, not by number
- [ ] **Gamification**: All metrics are additive (only increase, never decrease or reset)

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Streak feature shipped | LOW | Remove streak counter, replace with cumulative count. No data migration needed |
| Hydration mismatches | MEDIUM | Refactor localStorage reads into `useEffect`, add loading states. May require restructuring component tree |
| Hard prerequisite gating | LOW | Change locked states to dimmed-with-tooltip. Remove redirect logic. UI-only change |
| Dual completion conflict | MEDIUM | Implement union merge in `computeProgress()`. Requires touching progress data flow |
| Client boundary creep | HIGH | Must decompose bloated client components back into server+client pairs. Extensive refactoring |
| Search index too large | LOW | Reduce indexed fields to metadata only. Rebuild index at build time |
| localStorage key collision | MEDIUM | Add instrument namespace prefix, write migration to move existing keys |

---

## Sources

- Codebase audit: `src/lib/progress.ts` (current completion model), `src/app/layout.tsx` (server component architecture), `src/components/` (zero client components), `src/app/instruments/[slug]/progress/page.tsx` (vault scanning integration)
- [ADHD design principles](/Users/albair/src/evolver/framework/adhd-design.md) -- project's own ADHD design document, anti-patterns table, forgiveness principle
- [PROJECT.md](/Users/albair/src/evolver/.planning/PROJECT.md) -- key decision: "Sequence-based not calendar-based: Missed days create guilt spirals with ADHD"
- [Next.js hydration error documentation](https://nextjs.org/docs/messages/react-hydration-error) -- official guidance on hydration mismatch causes and fixes
- [Fix hydration mismatch errors in Next.js](https://oneuptime.com/blog/post/2026-01-24-fix-hydration-mismatch-errors-nextjs/view) -- 2026 guide on App Router hydration patterns
- [Next.js App Router search tutorial](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination) -- official server/client search pattern with useSearchParams
- [Breaking the Chain: Why Streak Features Fail ADHD Users](https://www.helloklarity.com/post/breaking-the-chain-why-streak-features-fail-adhd-users-and-how-to-design-better-alternatives/) -- ADHD-specific research on streak harm and alternatives
- [Duolingo's Shallow Learning Trap](https://dev.to/yaptech/duolingos-shallow-learning-trap-gamified-streaks-harmful-habits-4134) -- streak anxiety and harmful gamification patterns
- [Flexsearch GitHub](https://github.com/nextapps-de/flexsearch) -- client-side search library performance and memory characteristics
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) -- Next.js component boundary documentation

---
*Pitfalls research for: v1.2 Learner Experience & Discovery*
*Researched: 2026-04-03*
