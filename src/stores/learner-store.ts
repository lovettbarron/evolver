import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearnerState {
  completions: Record<string, number[]>;
  lastVisited: Record<string, { sessionSlug: string; sessionNumber: number }>;
  toggleCompletion: (instrument: string, sessionNumber: number) => void;
  setLastVisited: (instrument: string, sessionSlug: string, sessionNumber: number) => void;
  getCompletedSessions: (instrument: string) => Set<number>;
}

export const useLearnerStore = create<LearnerState>()(
  persist(
    (set, get) => ({
      completions: {},
      lastVisited: {},

      toggleCompletion: (instrument: string, sessionNumber: number) => {
        set((state) => {
          const current = state.completions[instrument] ?? [];
          const index = current.indexOf(sessionNumber);
          const updated = index >= 0
            ? current.filter((n) => n !== sessionNumber)
            : [...current, sessionNumber];
          return {
            completions: { ...state.completions, [instrument]: updated },
          };
        });
      },

      setLastVisited: (instrument: string, sessionSlug: string, sessionNumber: number) => {
        set((state) => ({
          lastVisited: {
            ...state.lastVisited,
            [instrument]: { sessionSlug, sessionNumber },
          },
        }));
      },

      getCompletedSessions: (instrument: string) => {
        return new Set(get().completions[instrument] ?? []);
      },
    }),
    {
      name: 'evolver-learner-state',
      version: 1,
    },
  ),
);
