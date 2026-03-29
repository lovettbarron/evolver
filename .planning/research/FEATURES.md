# Feature Research

**Domain:** Instrument learning platform with Obsidian-backed data layer and Next.js frontend
**Researched:** 2026-03-29
**Confidence:** HIGH (well-scoped personal tool with clear patterns from PM Toolkit)

## Feature Landscape

### Table Stakes (Users Expect These)

Features the product must have to fulfill its core promise. Without these, the tool fails at its primary job of making the Evolver curriculum browsable, progress visible, and learning structured.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Session browser | Core purpose of the frontend -- browse the 35-session curriculum in sequence | LOW | List/detail view, read from markdown + frontmatter. PM Toolkit pattern proven |
| Session detail view | Users need to read session content (objective, exercises, output checklist) | LOW | Render markdown to HTML, display frontmatter metadata (module, duration, prereqs) |
| Module grouping | Sessions are organized into 10 modules -- browsing must reflect this hierarchy | LOW | Group sessions by module from frontmatter, show module-level progress |
| Progress tracking display | ADHD design principle: "progress must be visible" -- core to the learning system | MEDIUM | Read completion state from Obsidian session logs. Show completed/total per module |
| Patch library browser | Documented patches are a primary output -- they need a searchable home | MEDIUM | Read patch markdown files, display parameter tables, filter by type/session |
| Patch detail view | Full parameter dump display so you can recreate any patch from scratch | LOW | Render parameter tables from markdown, show description, playing tips, tags |
| Demo mode | Vercel deployment needs synthetic data so curriculum is publicly visible | MEDIUM | Bundled content for deployment vs live vault reading for local. Feature flag or env var |
| Responsive layout | Must work on laptop next to the Evolver -- not mobile-first but responsive enough | LOW | Standard responsive CSS. No native app needed per project constraints |
| Multi-instrument selector | Framework is designed for extensibility (Evolver now, Cascadia later) | LOW | Instrument switcher in nav. Route structure: /instruments/[slug]/sessions, /instruments/[slug]/patches |
| Basic navigation | Home, sessions, patches, progress -- the four core views | LOW | Standard Next.js App Router layout with nav component |

### Differentiators (Competitive Advantage)

Features that set this apart from generic learning platforms (Syntorial, Ableton Learning Synths) and generic practice trackers (Modacity, Andante). These align with the project's unique position as a personal, ADHD-aware, hardware-instrument-specific learning tool backed by Obsidian.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| ADHD-optimized session presentation | Zero-decision startup: session page shows exactly what to do first, no scrolling past theory. "Open and do step 1" principle in the UI | MEDIUM | Prioritize action items visually. Warm-up section prominent. Collapse optional exploration. Timer suggestion visible but not enforced |
| Progress dashboard with streak-free design | Sequence-based progress (not calendar/streak). Shows "sessions completed" and "patches created" without guilt-inducing missed-day tracking | MEDIUM | Deliberately avoid streak counters (ADHD guilt spiral). Show module completion bars, total patches, last session completed. Celebrate what's done, not what's missed |
| Cross-session continuity display | Each session shows what comes before and after, with warm-up context from previous session. Reduces re-entry friction | LOW | Previous/next session links with preview. Warm-up section references previous session's key output |
| Searchable patch parameter tables | Unlike community patch sites (Patchstorage, SynthLib) which share files, this shows exact parameter values as searchable, diff-from-basic-patch tables | MEDIUM | Parse parameter tables from markdown. Show only values that differ from basic patch. Filter/search by parameter name or value |
| Session quick-reference mode | 5-minute refresher view: just the key parameter values and patch settings, no full exercises. For days when you have 5 minutes not 20 | LOW | Alternate compact view of session content. Pull key values and output checklist only |
| Technique guide collection | "How I made this sound" write-ups linked to patches and sessions. Builds over time into a personal synthesis reference | LOW | Rendered from markdown in technique-guides directory. Links to related patches and sessions |
| Audio sample playback | Sound examples embedded in session and patch pages -- hear what a patch sounds like before recreating it | MEDIUM | Audio file references in frontmatter. HTML5 audio player. Files stored in vault or repo |
| Instrument signal flow diagram | Interactive or static signal flow visualization for the Evolver (and later Cascadia). Understanding architecture aids learning | HIGH | SVG or canvas-based diagram. Could start as a static image and evolve. Evolver signal flow is well-documented in repo |
| Session time estimate with ADHD context | Show "20 min" but also "can be split: exercises 1-3 (10 min) + exercises 4-5 (10 min)" for sessions that support partial completion | LOW | Metadata in frontmatter. Display in session header |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem useful but would undermine the project's core principles or add complexity without proportional value.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Streak/calendar tracking | Gamification seems motivating | ADHD guilt spiral when streaks break. Calendar views highlight missed days. Directly contradicts project constraint "skipping days is expected, not failure" | Sequence-based progress bars. "You've completed 12 of 35 sessions" -- no dates, no judgment |
| Real-time MIDI/sysex integration | Auto-capture patch parameters from hardware | Project explicitly scopes this out. Adds massive complexity (USB MIDI, sysex parsing, browser MIDI API). Manual documentation is intentional -- the act of writing down parameters reinforces learning | Keep manual patch documentation. Could add a structured form for parameter entry later |
| Interactive synth emulation | Let users preview sounds in-browser like Syntorial or Ableton Learning Synths | The Evolver has unique analog+digital architecture that can't be faithfully emulated. The point is learning the physical hardware, not a simulation | Audio recordings of patches (before/after). Static signal flow diagrams |
| Social features / community sharing | Share patches and progress with other Evolver users | Personal tool. Multi-user adds auth, moderation, data separation. Community patch sharing sites already exist (Patchstorage, SynthLib) | Demo mode makes curriculum publicly viewable. Patches are in markdown -- share via repo or blog post |
| Spaced repetition algorithm | Optimize review timing based on forgetting curves | Over-engineering for a 35-session linear curriculum. The warm-up system already handles review. Adding SRS adds complexity and decision fatigue ("which review should I do?") | Warm-ups bridge forgetting gaps. Repeat-session-if-warm-up-feels-unfamiliar rule is simpler and sufficient |
| Video tutorials | Richer media for teaching | Explicitly out of scope for v1 per PROJECT.md. Video production is a separate skill and time sink. Text + audio covers the use case | Text sessions with audio examples. Written technique guides |
| Automated practice reminders / push notifications | Help users remember to practice | ADHD users often have notification overload. External reminders feel like pressure, not motivation. The tool should be pull-based (you come to it when ready) | Make the dashboard welcoming when you arrive. Show "pick up where you left off" prominently |
| Complex analytics / charts | Visualize practice patterns over time | Premature for a personal tool with 35 sessions. Analytics create meta-work (analyzing data about practice instead of practicing). ADHD trap: optimizing the system instead of using it | Simple counts: sessions done, patches saved, current module. That's enough |

## Feature Dependencies

```
[Vault Reader (markdown + frontmatter parsing)]
    +-- requires --> [Session Browser]
    +-- requires --> [Patch Library Browser]
    +-- requires --> [Progress Tracking Display]
    +-- requires --> [Demo Mode (synthetic data fallback)]

[Session Browser]
    +-- requires --> [Session Detail View]
    +-- requires --> [Module Grouping]

[Session Detail View]
    +-- enhances --> [Cross-Session Continuity Display]
    +-- enhances --> [Session Quick-Reference Mode]
    +-- enhances --> [Audio Sample Playback]
    +-- enhances --> [ADHD-Optimized Session Presentation]

[Patch Library Browser]
    +-- requires --> [Patch Detail View]
    +-- enhances --> [Searchable Patch Parameter Tables]

[Progress Tracking Display]
    +-- requires --> [Progress Dashboard]

[Multi-Instrument Selector]
    +-- requires --> [Vault Reader] (instrument-scoped paths)
    +-- enhances --> [Session Browser] (filtered by instrument)
    +-- enhances --> [Patch Library Browser] (filtered by instrument)

[Demo Mode]
    +-- conflicts --> [Live Vault Reading] (mutually exclusive at runtime, same interface)
```

### Dependency Notes

- **Vault Reader is the foundation:** Everything depends on parsing markdown + YAML frontmatter from the Obsidian vault (or bundled demo content). This is the PM Toolkit pattern and must be built first.
- **Demo Mode and Live Vault are runtime alternatives:** Same components, different data source. Environment variable or build flag switches between them. Design the data layer interface first, implement both sources against it.
- **Multi-Instrument Selector is structural:** Route structure must accommodate multiple instruments from the start, even if only Evolver exists at launch. Retrofitting instrument scoping is a rewrite.
- **Audio playback is additive:** Can be layered on after session and patch views exist. Depends on audio files being referenced in frontmatter.

## MVP Definition

### Launch With (v1)

Minimum viable product that delivers the core value: "makes the curriculum browsable, progress visible, and shareable with others."

- [ ] Vault reader (markdown + YAML frontmatter parsing) -- foundation for everything
- [ ] Session browser with module grouping -- browse the 35-session curriculum
- [ ] Session detail view -- read session content, exercises, output checklist
- [ ] Patch library browser -- browse documented patches by type
- [ ] Patch detail view with parameter tables -- see full patch documentation
- [ ] Progress dashboard (sessions completed, patches saved, current module) -- visible progress
- [ ] Multi-instrument route structure -- `/instruments/[slug]/...` even if only Evolver exists
- [ ] Demo mode with bundled content -- deployable to Vercel
- [ ] Responsive layout -- usable on laptop next to the synth
- [ ] Basic navigation (home, sessions, patches, progress) -- standard app shell

### Add After Validation (v1.x)

Features to add once core browsing and progress tracking are working well.

- [ ] ADHD-optimized session presentation (action-first layout, collapsed exploration) -- after validating the basic session view works during actual practice
- [ ] Cross-session continuity (prev/next with warm-up context) -- after completing enough sessions to validate the flow
- [ ] Searchable/filterable patch parameter tables -- after accumulating 10+ patches to make search meaningful
- [ ] Session quick-reference mode -- after discovering which sessions benefit from a compact view
- [ ] Audio sample playback -- after recording audio examples during sessions

### Future Consideration (v2+)

Features to defer until the Evolver curriculum is substantially complete and Cascadia work begins.

- [ ] Instrument signal flow diagram -- HIGH complexity, nice-to-have visualization
- [ ] Technique guide collection -- needs enough written content to justify a dedicated section
- [ ] Second instrument (Cascadia) -- validates the multi-instrument framework
- [ ] Streak-free progress dashboard enhancements (module completion celebrations, patch gallery view)

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Vault reader (markdown + frontmatter) | HIGH | MEDIUM | P1 |
| Session browser + module grouping | HIGH | LOW | P1 |
| Session detail view | HIGH | LOW | P1 |
| Patch library browser | HIGH | LOW | P1 |
| Patch detail view | HIGH | LOW | P1 |
| Progress dashboard | HIGH | MEDIUM | P1 |
| Demo mode | HIGH | MEDIUM | P1 |
| Multi-instrument route structure | MEDIUM | LOW | P1 |
| Responsive layout | MEDIUM | LOW | P1 |
| ADHD-optimized session presentation | HIGH | MEDIUM | P2 |
| Cross-session continuity | MEDIUM | LOW | P2 |
| Searchable patch parameters | MEDIUM | MEDIUM | P2 |
| Session quick-reference mode | MEDIUM | LOW | P2 |
| Audio sample playback | MEDIUM | MEDIUM | P2 |
| Signal flow diagram | LOW | HIGH | P3 |
| Technique guide collection | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch -- delivers core value proposition
- P2: Should have, add after validating core works during actual practice
- P3: Nice to have, defer until curriculum is further along

## Competitor Feature Analysis

| Feature | Syntorial | Ableton Learning Synths | Practice Apps (Modacity/Andante) | Patch Sites (Patchstorage/SynthPatch) | Evolver (This Project) |
|---------|-----------|------------------------|----------------------------------|---------------------------------------|------------------------|
| Structured curriculum | 199 lessons, linear | Chapter-based, linear | No curriculum | No curriculum | 35 sessions, 10 modules, linear with warm-up bridges |
| Interactive synth | Built-in (Primer) | Browser synth | N/A | N/A | No -- physical hardware focus |
| Ear training | Core feature (challenges) | Implicit (play and listen) | No | No | Implicit (exercises produce audible results) |
| Patch library | 706 patches from lessons | Presets | N/A | Community uploads | Personal patches with full parameter documentation |
| Progress tracking | Lesson completion | None | Timer, streaks, charts | None | Sequence-based, streak-free, module completion |
| ADHD considerations | None explicit | None explicit | Some (timers, reminders) | None | Core design principle -- zero activation energy, time-boxing, forgiveness |
| Hardware-specific | Generic synthesis concepts | Generic synthesis concepts | Generic practice | Platform-specific uploads | Deep single-instrument curriculum with exact parameter values |
| Offline/personal | Desktop app | Browser only | Mobile app | Browser community | Local vault + deployed demo |
| Shareable | No | No | No | Yes (community) | Demo mode (curriculum visible, practice data synthetic) |

## Sources

- [Syntorial](https://www.syntorial.com/) -- leading interactive synth learning platform (190+ lessons, built-in synth, 706 patches)
- [Ableton Learning Synths](https://learningsynths.ableton.com/) -- free browser-based synthesis education
- [Modacity](https://www.modacity.co/) -- music practice journal with progress tracking
- [Andante](https://andante.app/) -- music practice journal with streaks and mood tracking
- [tuneUPGRADE](https://www.tuneupgrade.com/) -- practice tracker with gamification (leaderboard, leveling)
- [Patchstorage](https://patchstorage.com/) -- community patch sharing platform
- [SynthPatch.io](https://www.synthpatch.io/) -- interactive patch documentation and sharing
- [Synthesizer Patch Library](https://synthpatchlib.com/) -- community patch sharing for hardware synths
- [Building a NextJS blog with Obsidian as CMS](https://www.neilmathew.co/posts/nextjs-blog-with-obsidian-as-cms) -- Obsidian + Next.js pattern reference
- [Using Obsidian as a CMS](https://franknoirot.co/posts/obsidian-cms/) -- vault-to-frontend publishing workflow

---
*Feature research for: Instrument learning platform with Obsidian-backed data layer*
*Researched: 2026-03-29*
