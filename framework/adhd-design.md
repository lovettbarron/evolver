# ADHD-Aware Learning Design

This document captures the specific design decisions that make this framework work for learners with ADHD or attention challenges. Every session, every structure, every output requirement is shaped by these principles.

## The Core Problem

ADHD doesn't mean you can't focus — it means you can't *choose* what to focus on. Hyperfocus on a new synth patch is easy. Returning to methodical practice on Tuesday when Monday was exciting? That's the hard part.

This framework is designed for the hard part.

## Design Principles

### 1. Zero Activation Energy

**The "wall of awful"** — the emotional barrier to starting — is the #1 enemy of consistent practice. Every session is designed to minimize startup friction:

- **No decisions at the start**. The session tells you exactly what patch to load, what knob to turn first. Decision fatigue kills momentum before you play a single note.
- **2-minute warm-ups**. You're making sound within 120 seconds. Not reading, not setting up, not deciding — *playing*.
- **"Open the doc and do step 1"** — that's the only commitment. Momentum handles the rest.

### 2. Dopamine by Design

ADHD brains need reward signals. Abstract learning ("now you understand FM synthesis") doesn't register. Tangible output does:

- **Every session produces a named artifact** — a saved patch, a documented technique, a recording. You can point to it and say "I made that."
- **Patches have names you choose**. Naming things creates ownership and emotional connection.
- **The checklist at the end** gives completion dopamine. Checking boxes is satisfying. Use it.

### 3. Time-Boxing is Non-Negotiable

- **15-30 minutes maximum**. Not because the content requires it, but because consistency over 10 weeks beats intensity over 2 weeks.
- **Sessions have a hard stop**. "Exploration prompts" are optional extensions, not requirements. If you hit 30 minutes, stop. Save. Log. Done.
- **It's okay to stop mid-session**. Note where you stopped. Pick up there next time. Partial progress > no progress.

### 4. Structure Prevents Drift

The #1 failure mode for ADHD learners with synthesizers: "I'll just noodle for a bit" → 2 hours of unfocused sound exploration → nothing documented → no sense of progress → guilt → avoidance.

- **Sessions have a single objective** stated as one sentence. If you can't say what you're learning in one sentence, the session is badly designed.
- **Exercises have specific parameter values**. "Try changing the filter" is too vague. "Set LPF Frequency to 50, Resonance to 82" is actionable.
- **Exploration prompts are bounded**. "Try 3 different waveshapes" not "explore all the waveshapes."

### 5. Warm-Ups Bridge the Forgetting Gap

ADHD working memory is volatile. What you learned Thursday is fog by Monday. Warm-ups solve this:

- **Every session starts by doing something from the previous session** — not reading about it, *doing* it.
- **Warm-ups are 2-3 minutes**, not quizzes. Play the patch you made last time. Turn the knob you learned about. Physical action triggers recall.
- **If the warm-up feels unfamiliar**, repeat the previous session instead of pushing forward. No shame, only reinforcement.

### 6. Progress Must Be Visible

ADHD brains discount invisible progress. "I'm 60% through a learning program" means nothing unless you can *see* it.

- **Module completion in Obsidian** — checkboxes you can see filling up
- **Patch library growing** — tangible evidence of accumulated skill
- **Session logs in daily notes** — a trail of effort that compounds

### 7. Multiple Entry Points

Some days you have 15 minutes of focused energy. Some days you have 5 minutes before context-switching. Some days you have an unexpected hour of hyperfocus.

- **Sessions are designed for 15-30 min** but can be split across days
- **Exploration prompts** are there for hyperfocus days — structured rabbit holes
- **Quick-reference cards** (patch values, signal flow) are available for 5-minute refreshers without starting a full session

### 8. Forgiveness is Built In

- **Skipping days/weeks is expected**, not a failure. The curriculum doesn't have dates, only sequence.
- **Repeating sessions is encouraged**. Some concepts need 3 passes. The basic patch warm-up makes re-entry low-friction.
- **"Good enough" patches count**. You don't need the perfect FM bell — you need the experience of making one.

## Session Structure (ADHD-Optimized)

```
┌─────────────────────────────────┐
│  OBJECTIVE (1 sentence)         │  ← Know exactly why you're here
├─────────────────────────────────┤
│  WARM-UP (2-3 min)              │  ← Immediate action, no decisions
│  Play something from last time  │
├─────────────────────────────────┤
│  SETUP (1 min)                  │  ← Exact patch state specified
│  Load patch, verify             │
├─────────────────────────────────┤
│  EXERCISES (10-20 min)          │  ← Numbered steps with values
│  Step 1: Do this specific thing │     Each step has an audible result
│  Step 2: Change this value      │     You're always making sound
│  Step 3: ...                    │
├─────────────────────────────────┤
│  EXPLORATION (optional, 5 min)  │  ← For hyperfocus days only
│  Bounded suggestions            │
├─────────────────────────────────┤
│  OUTPUT CHECKLIST               │  ← Dopamine! Check the boxes
│  □ Patch saved                  │
│  □ Technique noted              │
│  □ Obsidian logged              │
└─────────────────────────────────┘
```

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | What To Do Instead |
|-------------|-------------|-------------------|
| "Explore freely" | No structure → drift → no output | Give 3 specific things to try |
| Long setup | Activation energy kills session | Setup is "load patch, play note" |
| Reading-heavy sessions | ADHD brains learn by doing | Immediate hands-on within 2 min |
| Perfectionism gates | "Master this before moving on" → stalling | "Good enough" = done |
| Calendar-based schedules | Missed dates → guilt spiral | Sequence-based, no dates |
| No visible progress | Discount invisible learning | Obsidian checkboxes + patch library |

## For Session Authors

When writing new sessions for this framework:

1. Can someone start making sound within 2 minutes of opening this document?
2. Does every exercise step have a specific, audible result?
3. Is the objective one sentence?
4. Does the output checklist have 3-4 items maximum?
5. Could someone stop at any exercise step and still have gained something?
6. Is the warm-up a physical action, not a reading task?

If any answer is "no," redesign the session.
