'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLearnerStore } from '@/stores/learner-store';
import { useHydrated } from '@/hooks/use-hydrated';

interface CompletionToggleProps {
  instrumentSlug: string;
  sessionSlug: string;
  sessionNumber: number;
  sessionTitle: string;
  isDemo: boolean;
}

export function CompletionToggle({
  instrumentSlug,
  sessionSlug,
  sessionNumber,
  sessionTitle,
  isDemo,
}: CompletionToggleProps) {
  const hydrated = useHydrated();
  const isComplete = useLearnerStore(
    (s: { completions: Record<string, number[]> }) =>
      s.completions[instrumentSlug]?.includes(sessionNumber) ?? false,
  );

  useEffect(() => {
    if (!isDemo) {
      useLearnerStore
        .getState()
        .setLastVisited(instrumentSlug, sessionSlug, sessionNumber);
    }
  }, [instrumentSlug, sessionSlug, sessionNumber, isDemo]);

  if (isDemo) return null;
  if (!hydrated) return null;

  const handleToggle = () => {
    useLearnerStore.getState().toggleCompletion(instrumentSlug, sessionNumber);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-bg border-t border-surface">
      <div className="max-w-[720px] mx-auto px-lg lg:px-xl">
        <div className="flex items-center gap-sm h-[56px]">
          <button
            type="button"
            role="checkbox"
            aria-checked={isComplete}
            aria-label={
              isComplete
                ? `Unmark ${sessionTitle} as complete`
                : `Mark ${sessionTitle} as complete`
            }
            onClick={handleToggle}
            className="flex items-center gap-sm"
          >
            {isComplete ? (
              <span className="w-5 h-5 rounded-[4px] bg-accent flex items-center justify-center transition-colors duration-150">
                <Check size={14} className="text-bg" />
              </span>
            ) : (
              <span className="w-5 h-5 rounded-[4px] border-2 border-muted hover:border-text transition-colors duration-150" />
            )}
            <span
              className={
                isComplete ? 'text-sm text-accent' : 'text-sm text-muted'
              }
            >
              {isComplete ? 'Completed' : 'Mark complete'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
