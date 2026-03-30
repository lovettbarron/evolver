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
