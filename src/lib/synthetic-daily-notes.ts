/**
 * Synthetic daily note data simulating ~8 weeks of ADHD-paced practice.
 *
 * Models a realistic learner journey with natural gaps and a week-long break:
 * - Week 1-2: Enthusiastic start (3 sessions/week), sessions 1-6
 * - Week 3: Slowing down (2-3/week), sessions 7-9
 * - Week 4: Life gets busy (1 session), session 10
 * - Week 5: NO SESSIONS -- the week-long break (guilt-free design)
 * - Week 6: Back with renewed energy (3-4 that week), sessions 11-14
 * - Week 7: Steady pace (2-3/week), sessions 15-18
 * - Week 8: Current position, sessions 19-21
 *
 * Result: Modules 1-6 complete (21 sessions), currently in Module 7 (Sequencer)
 * but no Module 7 sessions completed yet.
 *
 * Module-to-session mapping:
 *   Module 1 "Foundations": sessions 1-2
 *   Module 2 "Analog Oscillators": sessions 3-6
 *   Module 3 "Digital Oscillators": sessions 7-10
 *   Module 4 "Filters & Envelopes": sessions 11-14
 *   Module 5 "Modulation": sessions 15-18
 *   Module 6 "Effects": sessions 19-21
 *   Module 7 "Sequencer": sessions 22-26 (not started)
 */

/**
 * The set of completed session numbers for demo mode.
 * 21 sessions total covering Modules 1-6.
 */
export const SYNTHETIC_COMPLETED_SESSIONS: Set<number> = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21,
]);

/**
 * Readable weekly schedule showing the ADHD-paced journey pattern.
 * Each entry describes sessions completed that week and the pacing narrative.
 * Reference start date: 2026-02-01 (fixed for reproducibility).
 */
export const SYNTHETIC_JOURNEY_WEEKS = [
  { week: 1, sessions: [1, 2, 3], note: 'Enthusiastic start, 3 sessions' },
  { week: 2, sessions: [4, 5, 6], note: 'Still riding the momentum' },
  { week: 3, sessions: [7, 8, 9], note: 'Slowing down, 2-3 sessions' },
  { week: 4, sessions: [10], note: 'Life gets busy, only 1 session' },
  { week: 5, sessions: [], note: 'Week-long break -- guilt-free design' },
  { week: 6, sessions: [11, 12, 13, 14], note: 'Back with renewed energy' },
  { week: 7, sessions: [15, 16, 17, 18], note: 'Steady pace, 2-3 sessions' },
  { week: 8, sessions: [19, 20, 21], note: 'Current position, modules 1-6 done' },
] as const;

/**
 * Synthetic Cascadia daily note data simulating ~6 weeks of ADHD-paced practice.
 *
 * Models a learner who picked up Cascadia after getting into Evolver:
 * - Starts ~3 weeks after Evolver (reference: 2026-02-22)
 * - Same ADHD pacing shape but offset and slightly slower
 * - Week 1: Enthusiastic start (2 sessions)
 * - Week 2: Still going (3 sessions)
 * - Week 3: Slowing (2 sessions)
 * - Week 4: Break (0 sessions)
 * - Week 5: Return (3 sessions)
 * - Week 6: Current position (2 sessions)
 *
 * Result: Modules 1-4 complete (12 sessions), currently in Module 5
 * but no Module 5 sessions completed yet. 12/25 = 48% (~50%).
 *
 * Module-to-session mapping:
 *   Module 1 "Foundations": sessions 1-3
 *   Module 2 "Oscillators": sessions 4-6
 *   Module 3 "Envelopes & Amplitude": sessions 7-9
 *   Module 4 "Filters & LPG": sessions 10-12
 *   Module 5 "Modulation & Utilities": sessions 13-15 (not started)
 *   Module 6 "Advanced Patching": sessions 16-19 (not started)
 *   Module 7 "Sound Design": sessions 20-25 (not started)
 */
export const SYNTHETIC_CASCADIA_COMPLETED_SESSIONS: Set<number> = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
]);

export const SYNTHETIC_CASCADIA_JOURNEY_WEEKS = [
  { week: 1, sessions: [1, 2], note: 'Enthusiastic start with new instrument' },
  { week: 2, sessions: [3, 4, 5], note: 'Getting into oscillators' },
  { week: 3, sessions: [6, 7], note: 'Slowing down, deeper content' },
  { week: 4, sessions: [], note: 'Break -- juggling two instruments' },
  { week: 5, sessions: [8, 9, 10], note: 'Back with renewed energy' },
  { week: 6, sessions: [11, 12], note: 'Current position, modules 1-4 done' },
] as const;
