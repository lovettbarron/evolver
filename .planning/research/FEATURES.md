# Feature Landscape: Cascadia Instrument Support

**Domain:** Cascadia curriculum, patch documentation, and UI adaptations for a semi-modular synthesizer learning platform
**Researched:** 2026-03-30
**Milestone:** v1.1 Cascadia Instrument Support

## Table Stakes

Features users expect when a second instrument is added to the platform. Missing = Cascadia feels like an afterthought compared to Evolver.

| Feature | Why Expected | Complexity | Dependencies |
|---------|--------------|------------|--------------|
| Cascadia instrument data files (overview, architecture, signal flow, module docs) | Evolver has `overview.md`, `signal-flow.md`, `modules.md`, `basic-patch.md`; Cascadia needs parity | Med | None -- pure content authoring |
| 25-session Cascadia curriculum (7 modules, 15-30 min each) | The platform's core value is structured curriculum; a second instrument without sessions is just a patch library | High | Instrument data files must exist first |
| Cascadia "init state" documentation | Evolver has a 198-parameter basic patch table. Cascadia needs an equivalent "start here" state documenting all knob/switch/slider default positions | Med | None -- content derived from manual |
| Patch documentation schema for cable-routed instruments | Evolver patches are parameter-value tables. Cascadia patches require cable routing + approximate knob positions. A new schema is needed | High | New Zod schema design |
| Instrument selector working in UI | Already scaffolded but needs to actually switch content between Evolver and Cascadia | Low | Existing multi-instrument routing foundation |
| Hide/adapt SysEx workspace for Cascadia | Cascadia has no patch memory and no SysEx. Showing the MIDI SysEx workspace is confusing | Low | Instrument-specific feature flags |
| Demo mode with Cascadia synthetic learner data | Evolver demo mode exists with a synthetic learner journey; Cascadia needs its own | Med | Curriculum content + existing demo pattern |
| Module-grouped session browser for Cascadia | Same browsing pattern as Evolver but with Cascadia's 7-module structure | Low | Curriculum content exists |
| Challenge exercises with Cascadia-appropriate outputs | Evolver challenges produce saved patches (SysEx). Cascadia challenges produce documented patch sheets | Med | Patch documentation schema |
| ADHD-paced session design | Non-negotiable platform constraint: zero activation energy, warm-ups, hard stops, single objective per session | Low | Curriculum design discipline |

## Differentiators

Features unique to Cascadia that have no Evolver precedent. These justify adding the instrument and demonstrate the framework's flexibility.

| Feature | Value Proposition | Complexity | Dependencies |
|---------|-------------------|------------|--------------|
| Visual patch sheet documentation | Cascadia patches require seeing WHERE cables connect -- unlike Evolver's "set parameter X to value Y" tables. The manual itself uses labeled cables (A, B, C, D...) on annotated panel diagrams (pp.14-16). Baratatronix provides downloadable Illustrator/Affinity templates for this. The platform should at minimum render cable lists and ideally show simplified panel annotation | High | SVG template system or structured cable YAML |
| Normalled signal path documentation | Cascadia works without any cables thanks to extensive normalled connections (VCO B sine to VCO A FM2, Envelope A to VCA, Envelope B to VCF FM1, LFO Y to PWM, etc.). Each session and patch must document which normals are active and what breaking a normal does. This is a fundamentally different teaching model from Evolver | Med | Signal flow data extracted from manual |
| Audio preview references per patch | Baratatronix includes dry audio previews for all Cascadia patches. The platform should reference audio files so learners have a target sound. "Does my patch sound like this?" | Med | Audio recording/hosting pattern |
| "Make a Sound" as Session 01 (adapted from manual pp.11-16) | The manual's progressive walkthrough is perfect ADHD material: start simple (PWM + sub + filter), add Envelope B for punch, add wave folding with S&H randomness, add FM with LFO modulation, add FX pedal integration. Five steps, each building on the last, each producing an audible difference. Map directly to Session 01 | Low | None -- content design |
| Envelope B multi-mode sessions (ENV/LFO/BURST) | Envelope B is effectively three instruments in one module. ENV mode gives AD/AHR/Cycle envelopes. LFO mode gives Free/Sync/LFV oscillation. BURST mode gives pulse burst generation. Each mode changes what Rise/Fall/Shape sliders do. No Evolver equivalent -- deserves dedicated sessions | Med | Curriculum design |
| FX Send/Return integration sessions | Cascadia treats external effects as first-class citizens with front-panel Send/Return controls, LINE/INST level switch, phase invert, and dry/wet mix. The manual's "Make a Sound" walkthrough (p.16) demonstrates routing ring mod through a fuzz pedal. Sessions teaching FX pedal integration are unique to semi-modular workflow | Low | None -- content |
| Unipolar vs bipolar slider teaching | Cascadia's panel uses visual conventions (center line on bipolar sliders, no line on unipolar) that encode modulation behavior. Teaching this visual language is unique to Cascadia and helps learners "read" the panel intuitively | Low | None -- content |
| Cross-instrument concept mapping | "You learned filter envelopes on Evolver (Session 12). Cascadia's equivalent uses Envelope B in ENV mode patched to VCF FM1, which is normalled by default." For users who completed Evolver first, bridge references accelerate learning | Med | Both curricula complete |
| VCO B as dual-purpose module sessions | VCO B operates at audio rate (VCO mode) or sub-audio rate (LFO mode at 1/1000 frequency). Teaching it as both a sound source AND a modulation source in dedicated sessions is a unique Cascadia concept | Low | Curriculum design |

## Anti-Features

Features to explicitly NOT build for Cascadia.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| MIDI SysEx capture/send/parse/diff for Cascadia | Cascadia has no SysEx patch memory. It converts MIDI to CV via the MIDI/CV section but stores no patches digitally | Hide SysEx workspace when Cascadia selected; show patch documentation workspace instead |
| Automated patch recall/loading | Cascadia patches exist as physical knob/cable states -- there is no way to load a patch programmatically | Document patches as reproducible "recipes" with exact positions. The manual setup IS the learning |
| Numeric parameter tables (Evolver-style) | Evolver has 198 parameters with numeric readouts (e.g., "Frequency: 164"). Cascadia knobs have no numeric displays -- you cannot say "set FREQ to 164" because the knob has no markings beyond the panel labels | Use clock positions for knobs ("FREQ at 2 o'clock"), named positions for switches ("MODE: LP4"), and percentage/position for sliders ("FM1 slider at 75%") |
| Full Eurorack module integration curriculum | Cascadia has 100+ Eurorack-compatible patch points, but teaching external module integration is another instrument's curriculum. Scope explosion | Mention Eurorack compatibility in overview. Keep curriculum focused on Cascadia-only patching. One session can demonstrate external module connection as a concept |
| Interactive patch builder / drag-and-drop cable UI | Tempting to build a visual patching tool, but this is a learning platform, not a patch design app | Structured cable documentation in YAML renders to labeled lists. Visual patch sheets can be static annotated images |
| Cascadia Config App integration | Intellijel has a web-based Config App for MIDI settings, envelope output modes, etc. Integrating with it adds complexity for edge-case configuration | Document Config App settings as prerequisites when relevant ("ensure Config App > Synth > Envelope Stage Outputs is set to Trigger") |
| Video tutorials | Out of scope per PROJECT.md for all instruments | Text sessions + audio references + annotated panel images |

## Feature Dependencies

```
Instrument Data Files (overview, signal-flow, modules, init-state)
    |
    +--> Init State Documentation (all default knob/switch/slider positions)
    |       |
    |       +--> Curriculum Sessions 01-25
    |               |
    |               +--> Challenge Exercises (per session)
    |               |
    |               +--> Demo Mode Synthetic Data
    |
    +--> Signal Flow / Normals Map (which modules connect by default)
            |
            +--> Normalled-vs-Patched Documentation
            |
            +--> Curriculum references to default routing

Patch Documentation Schema (cable routing YAML + panel state format)
    |
    +--> Patch Library Entries (Cascadia patches in new format)
    |
    +--> Visual Patch Sheet Rendering (optional, can defer)
    |
    +--> Audio Preview References (per patch)

UI Adaptations
    |
    +--> Instrument Selector (switch between Evolver/Cascadia)
    |       |
    |       +--> Route filtering (sessions/patches scoped to instrument)
    |
    +--> SysEx Workspace Hiding (instrument feature flags)
    |
    +--> Patch Display Adaptation (parameter tables vs cable docs)
```

## Curriculum Structure: 25 Sessions, 7 Modules

### Rationale: Why 25 Sessions / 7 Modules (not 35/10 like Evolver)

The Evolver has more discrete parameter spaces requiring dedicated sessions:
- **4 oscillators** (2 analog + 2 digital) = 8 sessions. Cascadia has 2 analog VCOs = 4 sessions
- **Built-in sequencer** (4 tracks x 16 steps) = 5 sessions. Cascadia has no sequencer = 0 sessions
- **Digital effects** (3-tap delay, distortion, tuned feedback, output hack) = 3 sessions. Cascadia has FX Send/Return only = 1 session
- **Mod slots** (4 configurable source-amount-dest) = simpler than Cascadia's utility section

Cascadia adds depth that Evolver lacks:
- **Utilities section** (S&H, Slew, Mixuverter, LFO X/Y/Z, Patchbay, Ring Mod) = 4 sessions
- **Envelope B triple-mode** (ENV/LFO/BURST) = needs 2 sessions vs Evolver's single envelope type
- **Wave Folder** = dedicated module with no Evolver equivalent = 1 session
- **FX Send/Return + Line In** = external integration = 2 sessions

At 2-3 sessions/week, 25 sessions = approximately 8-10 weeks. Matches Evolver's pace.

### Proposed Module Map

```
Module 1: Foundations (2 sessions)
    +---> Module 2: Oscillators (4 sessions)
         +---> Module 3: Envelopes & Amplitude (3 sessions)
         |    +---> Module 4: Filter & Wave Folder (4 sessions)
         |         +---> Module 5: Modulation & Utilities (4 sessions)
         |              +---> Module 6: Advanced Patching & FX (4 sessions)
         |                   +---> Module 7: Sound Design & Integration (4 sessions)
         +---> Module 3 (parallel entry from oscillators)
```

### Session Detail

**Module 1: Foundations (2 sessions, ~40 min)**
Goal: Set up, make sound, understand the panel layout and normalled signal path.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 01 | Setup & "Make a Sound" (manual pp.11-16 adapted) | 20 min | First sound produced, init state documented |
| 02 | Panel tour, normals, MIDI/CV setup, slider conventions | 20 min | Panel sections identified, MIDI connected |

Session 01 follows the manual's progressive walkthrough: (1) connect power/audio/MIDI, (2) set up basic PWM+sub+filter patch, (3) add Envelope B for filter punch, (4) note that no cables were needed -- all via normalled connections. ADHD-optimized: immediate sound within 3 minutes.

Session 02 teaches the panel's color-coded sections, the graphical conventions (outputs in blocks, inputs outside blocks, normals shown with bubbles, arrows for signal flow, center-line for bipolar sliders, light/dark slider caps for parameter vs modulation amount).

**Module 2: Oscillators (4 sessions, ~85 min)**
Goal: Understand and use both VCOs as sound sources and modulation sources.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 03 | VCO A basics -- waveshapes via Mixer, pitch, octave, sub-oscillator | 20 min | Patch exploring each waveform |
| 04 | VCO A advanced -- PWM, FM1 (exponential), FM2/INDEX (TZFM vs EXP), sync (soft/hard) | 25 min | FM patch, sync patch |
| 05 | VCO B -- audio vs LFO mode, four simultaneous outputs (sine/tri/saw/square), pitch tracking | 20 min | VCO B as LFO modulation patch |
| 06 | Two-oscillator patches -- detuning, intervals, VCO B as FM source, oscillator sync between VCOs | 20 min | Detuned pad patch, sync lead patch |

**Module 3: Envelopes & Amplitude (3 sessions, ~65 min)**
Goal: Shape sound over time using both envelopes, understand VCA behavior, use Push Gate.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 07 | Envelope A -- ADSR+Hold (3 hold positions: off/gate-extender/AHDSR), speed switch, CTRL source | 25 min | Percussive vs pad envelope patches |
| 08 | Envelope B modes -- Envelope (AD/AHR/Cycle), LFO (Free/Sync/LFV), introduction to Burst | 20 min | Cycling envelope drone, LFO shape exploration |
| 09 | VCA A, VCA B/LPF, Push Gate -- amplitude paths, secondary VCA as low-pass gate, manual triggering | 20 min | LPG-style pluck patch |

**Module 4: Filter & Wave Folder (4 sessions, ~85 min)**
Goal: Shape timbre with the multimode filter and wave folder.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 10 | VCF basics -- 7 modes (LP4/LP1/HP4/BP4/HP1/N+LP/N+HP), frequency, Q, self-oscillation | 25 min | Filter sweep patch per mode |
| 11 | VCF modulation -- FM1/FM2/FM3 inputs, envelope-to-filter (normalled Env B to FM1), keyboard tracking | 20 min | Envelope-controlled filter patch |
| 12 | Wave Folder -- fold amount, MOD to FOLD, using wave folding for harmonic richness, combining with VCF | 20 min | Wave-folded bass patch |
| 13 | Mixer -- combining VCO A sources (pulse/sub/noise), noise types (white/pink/alt), soft clipping, level balancing | 20 min | Mixed-source textural patch |

**Module 5: Modulation & Utilities (4 sessions, ~85 min)**
Goal: Use Cascadia's utility modules for complex modulation routing.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 14 | LFO X/Y/Z -- rate, rate dividers, output shapes, normalled destinations (X to PW, Y to PWM, Z to nothing) | 20 min | LFO-modulated evolving patch |
| 15 | S&H and Slew/Env Follow -- random stepped voltages, smoothing, envelope following external audio | 25 min | S&H random modulation patch |
| 16 | Mixuverter, Mults, Sum, Invert, BI>UNI -- combining and transforming control voltages | 20 min | Complex modulation routing patch |
| 17 | Patchbay (9 normals), Expression Source -- understanding the default routing matrix, expression pedal | 20 min | Expression-controlled performance patch |

**Module 6: Advanced Patching & FX (4 sessions, ~85 min)**
Goal: Use Ring Mod, external effects, external audio, and complex multi-cable patches.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 18 | Ring Mod -- VCO A x VCO B multiplication, normalled inputs, using as sound source and modulation | 20 min | Ring mod metallic patch |
| 19 | FX Send/Return -- integrating external pedals, LINE/INST level, phase, dry/wet, signal chain placement | 25 min | FX-integrated patch (requires pedal) |
| 20 | Line In -- processing external audio through Cascadia's filter/wavefolder/envelopes | 20 min | External audio processing patch |
| 21 | Envelope B Burst mode deep dive + complex multi-cable patches -- breaking normals intentionally | 20 min | Burst-mode rhythmic patch |

**Module 7: Sound Design & Integration (4 sessions, ~85 min)**
Goal: Combine everything into musical results and integrate with DAW.

| Session | Topic | Duration | Output |
|---------|-------|----------|--------|
| 22 | Recipe: Bass patches -- acid bass (LPF + Env B), sub bass (wave folder), FM bass | 20 min | 2-3 documented bass patches |
| 23 | Recipe: Lead/melodic patches -- sync lead, TZFM bell, wave-folded harmonic lead | 20 min | 2-3 documented lead patches |
| 24 | Recipe: Textural/generative -- S&H-driven evolution, burst-mode rhythms, drone with LFV | 25 min | 2-3 documented texture patches |
| 25 | Integration: Recording into Ableton, performance setup, what to reach for when making music | 20 min | Recorded audio in DAW session |

## Patch Documentation Format (Critical Design Decision)

### The Problem

Evolver patches are parameter tables:
```markdown
| Parameter | Value | Notes |
|-----------|-------|-------|
| Osc 1 Frequency | C0 | Base pitch |
| Osc 1 Shape | Saw | Sawtooth wave |
```

This works because the Evolver has numeric readouts for every parameter. Cascadia has no numeric readouts -- knobs are unmarked continuous controls, sliders have no numbered scales.

### The Solution: Two-Part Patch Format

**Part 1: Panel State (knob/switch/slider positions by section)**

```yaml
panel_state:
  vco_a:
    pitch: "12 o'clock"
    octave: 3
    pw: "50% (center)"
    pw_mod: "0 (bottom)"
    fm1: "0 (center, no FM)"
    index_mod: "0 (bottom)"
    index: "0 (bottom)"
    tzfm_exp: "EXP"
    ac_dc: "AC"
    sync_type: "X (off)"
    pulse_position: "UP (center-triggered)"
  mixer:
    in1: "75%"
    in2: "0"
    sub: "50%"
    noise: "0"
    noise_type: "SUB-1"
    soft_clip: "OFF"
  vcf:
    freq: "2 o'clock"
    q: "0 (fully CCW)"
    mode: "LP4"
    fm1: "0 (center)"
    fm2: "0 (center)"
    fm3: "0 (center)"
```

**Part 2: Cable Routing (labeled pairs following manual convention)**

```yaml
cables:
  - id: A
    from: "ENV B OUT [5.F]"
    to: "S&H TRIG IN [12.1.A]"
    color: "red"
    purpose: "Trigger S&H on each note for random voltage"
    breaks_normal: null
  - id: B
    from: "S&H OUT [12.1.B]"
    to: "WAVE FOLDER FOLD IN"
    color: "blue"
    purpose: "Random fold amount per note"
    breaks_normal: "VCA A normalled to Wave Folder input"
```

**Part 3: Context**

```yaml
normals_active:
  - "MIDI PITCH to VCO A PITCH and VCF FM2"
  - "MIDI GATE to ENV A GATE and ENV B GATE"
  - "ENV A to VCA A"
  - "LFO X to VCO A PW (via LFO Y divider)"
normals_broken:
  - "Cable B breaks VCA A normal to Wave Folder"
what_to_listen_for: "Random wave folding amount changes on each note attack"
audio_reference: null
```

This YAML maps cleanly to the existing Zod schema pattern and can render in the UI as both a structured list and (eventually) annotated panel diagrams.

## MVP Recommendation

Build in this order:

1. **Instrument data files** (overview.md, signal-flow.md, modules.md, init-state.md) -- pure content, no code, blocks everything else
2. **Patch documentation schema** -- new Zod schema for cable-routing patches. Must be designed before writing any Cascadia patches or curriculum that references them
3. **Curriculum sessions 01-09** (Modules 1-3: Foundations + Oscillators + Envelopes) -- minimum for someone to start using Cascadia meaningfully, validates the session format works for semi-modular
4. **UI: instrument selector + SysEx workspace conditional display** -- small code change, necessary for the app to not feel broken
5. **Curriculum sessions 10-25** (Modules 4-7) -- complete the curriculum
6. **Demo mode synthetic data** -- needed for Vercel deployment to show Cascadia content
7. **5-10 standalone patch library entries** -- documented patches outside the curriculum for browsing

Defer to v1.2+:
- **Visual patch sheet SVG rendering**: Ship text-based cable lists first, add visual rendering later. Baratatronix's Illustrator templates are a reference for eventual visual format
- **Audio preview hosting**: Link to Baratatronix as external reference initially. Add self-hosted audio when recording infrastructure exists
- **Cross-instrument concept mapping**: Requires both curricula to be fully authored and tested
- **Normalled-vs-patched interactive diagrams**: Static signal flow docs are sufficient. Interactive version is a significant frontend investment
- **Expression Source / MIDI CC mapping UI**: Edge case for advanced users; document in text

## Sources

- Intellijel Cascadia Manual v1.1, revision 2023.04.18 (110 pages, in-repo at `src/content/references/cascadia_manual_v1.1.pdf`) -- HIGH confidence, primary source for all module details, signal flow, and normalled connections
- Baratatronix.com Cascadia patch library (categorized patches in Bass/Brass/Classics/Generative/Lead/Modulation/Paraphonic/Percussion with audio previews, downloadable Illustrator/Affinity Design templates, comprehensive PDF compilation) -- MEDIUM confidence, format observed via web fetch
- Existing Evolver curriculum: 35 sessions across 10 modules (in-repo at `sessions/evolver/`) -- HIGH confidence, establishes session format, frontmatter schema, module grouping pattern
- Existing Evolver instrument data: overview.md, signal-flow.md, modules.md, basic-patch.md (in-repo at `instruments/evolver/`) -- HIGH confidence, establishes instrument data file pattern
- PROJECT.md v1.1 milestone definition -- HIGH confidence, defines scope and constraints

---
*Feature research for: Cascadia instrument support (v1.1 milestone)*
*Researched: 2026-03-30*
