import { describe, it, expect, beforeEach } from 'vitest';
import { useLearnerStore } from './learner-store';

describe('learner-store', () => {
  beforeEach(() => {
    useLearnerStore.setState({ completions: {}, lastVisited: {} });
  });

  it('initializes with empty completions and lastVisited', () => {
    const state = useLearnerStore.getState();
    expect(state.completions).toEqual({});
    expect(state.lastVisited).toEqual({});
  });

  it('toggleCompletion adds a session number', () => {
    useLearnerStore.getState().toggleCompletion('evolver', 5);
    const state = useLearnerStore.getState();
    expect(state.completions['evolver']).toContain(5);
  });

  it('toggleCompletion removes a session number when called again', () => {
    useLearnerStore.getState().toggleCompletion('evolver', 5);
    useLearnerStore.getState().toggleCompletion('evolver', 5);
    const state = useLearnerStore.getState();
    expect(state.completions['evolver']).not.toContain(5);
  });

  it('toggleCompletion on one instrument does not affect another', () => {
    useLearnerStore.getState().toggleCompletion('evolver', 5);
    useLearnerStore.getState().toggleCompletion('cascadia', 3);
    const state = useLearnerStore.getState();
    expect(state.completions['evolver']).toEqual([5]);
    expect(state.completions['cascadia']).toEqual([3]);
  });

  it('setLastVisited stores session info', () => {
    useLearnerStore.getState().setLastVisited('evolver', 'session-slug', 5);
    const state = useLearnerStore.getState();
    expect(state.lastVisited['evolver']).toEqual({
      sessionSlug: 'session-slug',
      sessionNumber: 5,
    });
  });

  it('getCompletedSessions returns a Set of session numbers', () => {
    useLearnerStore.getState().toggleCompletion('evolver', 1);
    useLearnerStore.getState().toggleCompletion('evolver', 3);
    const completed = useLearnerStore.getState().getCompletedSessions('evolver');
    expect(completed).toEqual(new Set([1, 3]));
  });

  it('getCompletedSessions for unknown instrument returns empty Set', () => {
    const completed = useLearnerStore.getState().getCompletedSessions('unknown');
    expect(completed).toEqual(new Set());
  });
});
