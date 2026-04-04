# Feature Landscape: Learner Experience & Discovery

**Domain:** Learning app UX -- continue/resume, search/discovery, prerequisite gating, progress streaks, troubleshooting, transitional pedagogy
**Researched:** 2026-04-03
**Milestone:** v1.2 Learner Experience & Discovery

## How Real Learning Apps Handle These Features

### Continue Where You Left Off

**Duolingo:** Linear path with a "you are here" marker. A floating arrow button in the bottom-right returns users to their current position if they scroll away. Completed lessons show as gold circles; the next lesson is visually prominent. No decision required -- open the app, tap the glowing circle.

**Codecademy:** "Resume" button on the dashboard. Shows the course name, lesson title, and a progress bar. One click to resume. Also shows a "next up" card for the upcoming lesson.

**Syntorial:** Sequential progression through 129 challenges. Progress syncs across devices. Implicit resume -- the next locked challenge is where you pick up.

**Khan Academy:** "Keep learning" prompt on the dashboard. Shows the most recent course and where you left off within it.

**Learning Synths (Ableton):** No account system, no persistence. Users start fresh each visit or navigate manually to where they were. Anti-pattern for retention.

**Pattern:** Every serious learning app surfaces the next action on the home screen with zero decisions. The user opens the app and sees exactly one thing to do. This is especially critical for ADHD (zero activation energy principle from `framework/adhd-design.md`).

### Search and Discovery

**Duolingo:** No search. Content is a fixed linear path -- there is nothing to search for. Discovery is the path itself.

**Codecademy:** Search bar in the header. Searches across courses, lessons, articles, and documentation. Filters by content type (course, path, article). Autocomplete suggestions.

**Syntorial:** No search. Sequential curriculum with no cross-referencing needs.

**Khan Academy:** Prominent search. Searches across all subjects, units, and videos. Autocomplete with category grouping (Math > Algebra > Linear equations).

**Learning Synths:** No search. Seven chapters navigated via sidebar.

**Pattern:** Search matters when the content library is large and non-linear. For a structured curriculum with 25-35 sessions per instrument, search is a convenience, not a necessity. It becomes important for the patch library (dozens of patches across instruments) and for users who want to find "that session about FM synthesis" without scrolling through modules.

### Prerequisite Gating

**Duolingo:** Soft gating via the linear path. You cannot jump ahead -- lessons unlock sequentially. However, placement tests let users skip known material. Completed lessons can be revisited at any time.

**Codecademy:** Hard gating within courses (lessons unlock sequentially). But courses themselves are fully accessible -- you can start any course regardless of other course completion.

**Syntorial:** Hard sequential gating. Challenges unlock one at a time. You must pass the current challenge to proceed. However, "nuanced scoring" in v2.0 means the system is more forgiving about what counts as passing.

**Khan Academy:** Soft gating. Mastery system recommends prerequisites but does not lock content. Users can access any lesson directly. Progress tracking shows what is "mastered" vs "needs practice" vs "not started."

**Learning Synths:** No gating. All chapters accessible from the sidebar. Progressive disclosure within chapters only.

**Pattern:** Two schools -- hard gating (Duolingo, Syntorial) enforces learning order; soft gating (Khan Academy) trusts the learner. For ADHD learners, hard gating removes decision fatigue ("what should I work on?") but risks frustration if a prerequisite feels mastered but is not technically "complete." The Evolver app already has a `prerequisite` field in the Session schema (number or null) -- the data model supports gating.

### Progress Streaks

**Duolingo:** The streak is the product. Flame icon, day counter, streak freeze tokens, 3-hour earn-back window, gem-based instant repair. Users who reach a 7-day streak are 3.6x more likely to complete their course. Streak milestones at 7, 14, 30, 100, 365 days. Loss aversion is the primary motivator.

**Codecademy:** "Day streak" counter on the profile. Less aggressive than Duolingo -- no notifications, no loss-aversion mechanics. Simple count of consecutive active days.

**Syntorial:** No streak system. Progress is measured by challenge completion, not temporal consistency.

**Khan Academy:** "Energy points" and activity streaks. Badges for milestones. Less streak-focused than Duolingo; mastery percentage is the primary progress indicator.

**Learning Synths:** No progress tracking at all.

**Pattern:** Streaks are powerful for habit formation but dangerous for ADHD users. The ADHD design doc explicitly warns against calendar-based tracking: "Missed dates create guilt spirals. Sequence-based, no dates." Duolingo mitigates this with streak freezes and repair, but the core mechanic is still daily pressure. A safer pattern for this app: session-frequency tracking ("3 sessions this week") rather than daily streaks, with no penalty for gaps.

### Troubleshooting / Help

**Duolingo:** Tooltips on grammar concepts. "Tips" section before each skill with explanations. Discussion forums for each exercise. No troubleshooting for technical issues within the lesson flow.

**Codecademy:** "Get Unstuck" button offering hints, then solution code, then community forum. Progressive disclosure of help -- try hints before seeing the answer.

**Syntorial:** Hint button reveals the correct parameter settings when a challenge is failed. Audio comparison between user's attempt and target sound. Immediate, context-specific help.

**Khan Academy:** Hints system for practice problems (progressive, step-by-step). Video explanations linked from exercises. Community Q&A on every piece of content.

**Learning Synths:** Inline explanatory text with interactive examples. No separate help system needed because the teaching IS the interface.

**Pattern:** For a hardware synth learning app, troubleshooting means "I followed the steps but my Evolver does not sound right." This is fundamentally different from code/language learning where the app can check your work. Troubleshooting content must be proactive (embedded in sessions) and reactive (standalone guides). Syntorial's hint button is the closest analog -- revealing parameter values when the learner is stuck.

---

## Table Stakes

Features users expect in a learning app used for regular practice. Missing = the app feels like a demo, not a daily tool.

| Feature | Why Expected | Complexity | Dependencies | Learning App Precedent |
|---------|--------------|------------|--------------|----------------------|
| Continue where you left off | Every learning app shows "resume here" on launch. Without it, users must remember and navigate to their current session -- activation energy that kills ADHD momentum | Low | Needs persistent storage of "last completed session" per instrument. Can use localStorage (client) or a local JSON file (server). Existing `getAdjacentSessions()` already computes next session | Duolingo path marker, Codecademy resume button, Khan Academy "keep learning" |
| Session completion without Obsidian | Currently requires Obsidian vault with specific tags. Users without Obsidian (or in demo mode) cannot mark sessions complete. This blocks all progress features | Med | New completion storage mechanism. Options: localStorage toggle, local JSON file, or extend the vault reader pattern. Must coexist with Obsidian scanning, not replace it | All learning apps track completion internally; external dependency is unusual |
| Prerequisite visualization | Sessions have a `prerequisite` field but the UI does not surface it. Users cannot see which sessions are locked, available, or completed. The session list is a flat list with no state indicators | Med | Requires completed-session data (from Obsidian scan or manual toggle) + prerequisite field already in schema. UI: badges/icons on `SessionList` component items showing locked/available/completed state | Duolingo locked circles, Codecademy sequential unlock, Syntorial challenge gating |
| Patch filtering and sorting | Patch library exists but has no filtering beyond type badges. Users need to filter by type, sort by date/session, and browse efficiently as the library grows | Low | Existing `PatchSchema` has `type`, `session_origin`, `created`, `tags` fields. Client-side filtering on existing data. No new data fetching needed | Codecademy resource filtering, Khan Academy content type filters |

## Differentiators

Features that elevate the app from "browsable curriculum" to "daily practice companion." Not expected, but valued.

| Feature | Value Proposition | Complexity | Dependencies | Learning App Precedent |
|---------|-------------------|------------|--------------|----------------------|
| Full-text search across sessions and patches | Find "that session about filter envelopes" or "the bass patch with wave folding" without scrolling through modules. Becomes more valuable as content grows across instruments | Med | Search index over session content + patch descriptions. Options: client-side with Fuse.js/MiniSearch over pre-built index, or build-time index generation. Must search frontmatter fields AND markdown body text | Codecademy global search, Khan Academy cross-subject search |
| ADHD-aware consistency tracking (not streaks) | Track practice frequency without daily pressure. "You practiced 3 times this week" and "Your best run was 4 sessions in a row" -- celebrating effort without punishing gaps. Aligns with ADHD design principle: "Skipping days/weeks is expected, not a failure" | Med | Requires timestamped completion data (when was each session completed, not just which ones). Current Obsidian scanning extracts session numbers from daily notes but daily note dates could provide timestamps. Manual completion needs timestamp storage | Duolingo streaks (adapted -- remove loss aversion, keep celebration). Codecademy day streak (lighter touch) |
| "You are here" in module journey | The existing ModuleJourney shows complete/incomplete modules. Adding a "current session" indicator and making modules clickable to jump to their sessions transforms it from a progress report to a navigation tool | Low | Requires next-session computation (same data as "continue where left off") + linking module journey nodes to session list filtered by module | Duolingo floating arrow "return to current spot," Khan Academy mastery map |
| Transitional pedagogy (partial recipe sessions) | Sessions 22-25 in both curricula shift from guided exercises to "recipe" sessions (make a bass patch using techniques from Modules 2-4). These bridge guided learning to freeform sound design. The app should visually distinguish these sessions and provide scaffolding (ingredient checklists, technique cross-references) | Low | Content design, not code. UI could show "techniques used" tags linking back to source sessions. Existing `tags` field in SessionSchema supports this | Syntorial's graduated challenge difficulty. Codecademy projects that combine learned skills |
| Clickable progress counts | CountCard components show numbers but are not interactive. Making "12 Sessions Completed" clickable to show which 12, and "3 Modules Done" clickable to show which 3, adds depth without new pages | Low | Data already available from `computeProgress()`. Needs popover or expandable detail on CountCard component | Khan Academy expandable mastery details |
| Troubleshooting content (per-instrument) | "I hear nothing," "my filter is not responding," "the patch sounds wrong" -- standalone guides that diagnose common hardware/setup issues. Reduces frustration that causes learners to quit | Low | Pure content (markdown files in `instruments/<name>/troubleshooting/`). Linked from session pages when relevant. No new infrastructure | Syntorial hint button (adapted for hardware). Codecademy "Get Unstuck" pattern |

## Anti-Features

Features to explicitly NOT build. These are tempting but wrong for this app and audience.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Daily streak with loss aversion | ADHD design doc is explicit: "Calendar-based schedules create guilt spirals." Duolingo's streak works for neurotypical habit formation but is actively harmful for ADHD users who miss days and feel shame. Even Duolingo needs streak freezes to mitigate the damage | Track session frequency and best-run length. Celebrate consistency without punishing inconsistency. "You completed 3 sessions this week" not "Day 12 streak -- do not break it" |
| Leaderboards or social competition | Single-user personal tool. Adding competition adds comparison anxiety. The ADHD design doc emphasizes "good enough patches count" -- competition undermines this | Personal bests only. "Your most productive week: 4 sessions." No ranking |
| XP points or gamification currency | Adds abstraction between action and reward. The dopamine reward should be the patch you made or the technique you learned, not arbitrary points. ADHD design principle: "Every session produces a named artifact -- you can point to it and say I made that" | The patch library IS the reward system. More patches = more visible progress. The artifact is the point |
| Spaced repetition algorithm | Tempting to algorithmically schedule review sessions. But this app has no quiz mechanism -- synth learning is experiential, not testable. And algorithmic scheduling removes learner agency, which matters for ADHD users who need to feel in control | Warm-ups bridge the forgetting gap (already in session design). Cross-references between sessions. "Before starting, play the patch from Session 08" |
| AI-powered search or help | Adds infrastructure complexity (API keys, cost, latency) for a small content corpus. With 25-35 sessions and 20-50 patches per instrument, client-side search handles the volume easily | Fuse.js or MiniSearch client-side. Static troubleshooting content. Keep it simple |
| Notification system or reminders | Push notifications are an attention tax. The app is a pull tool -- the user comes to it when ready. Duolingo's notification strategy works at scale for retention metrics but is intrusive for a personal practice tool | The app is always ready when you are. No nagging. Obsidian daily notes serve as the gentle reminder system |
| Automatic Obsidian note generation | Tempting to auto-create daily notes with session completion tags. But this breaks the Obsidian-as-source-of-truth principle -- the vault should be written by the user, read by the app | Provide a "copy to clipboard" button with the exact text to paste into Obsidian. Or provide an Obsidian template. But never write to the vault |

## Feature Dependencies

```
Session Completion Without Obsidian (manual toggle)
    |
    +--> Continue Where You Left Off (needs completion data)
    |       |
    |       +--> "You Are Here" in Module Journey (needs "next session" computation)
    |
    +--> Prerequisite Visualization (needs completion data to compute locked/available/completed)
    |
    +--> ADHD-Aware Consistency Tracking (needs timestamped completion data)
    |
    +--> Clickable Progress Counts (needs completion data for detail views)

Full-Text Search
    (independent -- no dependencies on completion data)
    |
    +--> Build-time search index (sessions + patches)
    |
    +--> Client-side search UI component

Patch Filtering/Sorting
    (independent -- works with existing patch data)

Troubleshooting Content
    (independent -- pure content authoring)
    |
    +--> Links from session pages (contextual integration)

Transitional Pedagogy
    (independent -- content design in existing session format)
    |
    +--> "Techniques used" tags (uses existing tags field)
```

**Critical path:** Session completion without Obsidian unblocks four other features. It is the foundation of this milestone.

## Complexity Breakdown

| Feature | Frontend | Backend/Data | Content | Total |
|---------|----------|-------------|---------|-------|
| Continue where you left off | Low (banner component + "next session" link) | Low (derive from completion data + `getAdjacentSessions()`) | None | **Low** |
| Session completion without Obsidian | Med (toggle UI on session detail page, state management) | Med (storage mechanism -- localStorage or local JSON, coexistence with Obsidian scan) | None | **Med** |
| Prerequisite visualization | Med (locked/available/completed states on SessionList items, visual design) | Low (combine completion data with `prerequisite` field) | None | **Med** |
| Full-text search | Med (search UI, result display, keyboard navigation) | Med (build-time index generation, search library integration) | None | **Med** |
| Patch filtering/sorting | Low (filter controls, sort dropdown) | None (client-side on existing data) | None | **Low** |
| ADHD-aware consistency tracking | Med (visualization component, week/month views) | Med (timestamped completion storage, frequency computation) | None | **Med** |
| "You are here" in module journey | Low (current-session indicator, click handlers) | None (data already computed) | None | **Low** |
| Clickable progress counts | Low (popover or expandable detail) | None (data already in ProgressData) | None | **Low** |
| Troubleshooting content | None (existing markdown rendering) | None (existing content reader) | Med (write guides for Evolver + Cascadia) | **Low** |
| Transitional pedagogy | Low (visual distinction for recipe sessions) | None | Med (session content design) | **Low** |

## MVP Recommendation

Build in this order (respecting the dependency chain):

1. **Session completion without Obsidian** -- unblocks everything else. Implement as a client-side toggle with localStorage persistence. Coexist with Obsidian scanning: if vault is configured, merge both sources. If not, localStorage only. This also makes demo mode interactive (users can "try" completing sessions).

2. **Continue where you left off** -- highest ADHD impact. A single "Next Session" banner on the instrument page showing the title, module, and duration of the next incomplete session. One tap to start. Zero decisions. Derive from completion data + session ordering.

3. **Prerequisite visualization** -- makes the session list meaningful. Three states per session: locked (prerequisite not met), available (prerequisite met, not completed), completed. Icons or badges on each session in the list. Locked sessions are still viewable (soft gating -- you can read ahead) but not markable as complete.

4. **Patch filtering and sorting** -- quick win. Add type filter chips and sort dropdown (by date, by session origin, by name) to the existing patch library page. Client-side only.

5. **Troubleshooting content** -- write "I hear nothing" and "common issues" guides for Evolver and Cascadia. Link from session pages where relevant. Pure content, no code changes beyond adding links.

6. **Full-text search** -- valuable but not blocking. Build a search index at build time over session frontmatter + body text + patch data. Use Fuse.js for fuzzy client-side search. Add search UI to the header or a dedicated page.

7. **"You are here" + clickable counts** -- polish features that make existing progress page more useful.

8. **Consistency tracking** -- requires timestamped data, which means extending the completion storage from step 1. Add after the storage pattern is proven.

Defer to v1.3+:
- **Transitional pedagogy visual distinction**: The recipe sessions work fine as regular sessions. Special UI treatment can come later when the content exists and the pattern is validated through use.

## Sources

- [Duolingo new learning path design](https://blog.duolingo.com/new-duolingo-home-screen-design/) -- path-based progression, "you are here" floating arrow, gold completed circles -- HIGH confidence
- [Duolingo streak system breakdown](https://medium.com/@salamprem49/duolingo-streak-system-detailed-breakdown-design-flow-886f591c953f) -- streak mechanics, freeze tokens, loss aversion, recovery pathways -- MEDIUM confidence (single source, but detailed)
- [Duolingo streak and habit research](https://blog.duolingo.com/how-duolingo-streak-builds-habit/) -- 7-day streak = 3.6x course completion, habit formation research -- HIGH confidence (official Duolingo blog)
- [Syntorial 2.0 review](https://promusicianhub.com/syntorial-review/) -- sequential challenge gating, hint button, 3-star scoring, progressive parameter introduction -- MEDIUM confidence
- [Syntorial official site](https://www.syntorial.com/learn-more/) -- cross-device sync, 60+ parameters introduced incrementally -- HIGH confidence (official)
- [Ableton Learning Synths](https://learningsynths.ableton.com/) -- progressive disclosure, immediate interaction, no persistence -- HIGH confidence (official)
- [ADHD gamification design patterns](https://www.tiimoapp.com/resource-hub/gamification-adhd) -- flexible frequency over daily streaks, guilt-free recovery, optional streak visibility -- MEDIUM confidence
- [Contextual help UX patterns](https://userpilot.com/blog/contextual-help/) -- proactive vs reactive help, progressive hint disclosure -- MEDIUM confidence
- [Search UX best practices](https://www.pencilandpaper.io/articles/search-ux) -- autocomplete, filters, content-type grouping -- MEDIUM confidence
- Existing codebase: `SessionSchema.prerequisite` field, `getAdjacentSessions()`, `computeProgress()`, `ModuleJourney` component, `CountCard` component -- HIGH confidence (direct code inspection)
- `framework/adhd-design.md` -- zero activation energy, sequence-not-calendar, visible progress, dopamine by design -- HIGH confidence (in-repo)

---
*Feature research for: Learner Experience & Discovery (v1.2 milestone)*
*Researched: 2026-04-03*
