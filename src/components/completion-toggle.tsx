'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLearnerStore } from '@/stores/learner-store';
import { useHydrated } from '@/hooks/use-hydrated';

const SPRING_CELEBRATION = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 15,
  mass: 1,
};

const FADE_OUT = { duration: 0.1 };

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
  const shouldReduce = useReducedMotion();
  const [justCompleted, setJustCompleted] = useState(false);

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
    const wasComplete = isComplete;
    useLearnerStore.getState().toggleCompletion(instrumentSlug, sessionNumber);
    if (!wasComplete && !shouldReduce) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 400);
    }
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
            className="flex items-center gap-sm relative"
          >
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.span
                  key="checked"
                  initial={shouldReduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={shouldReduce ? undefined : { opacity: 0 }}
                  transition={shouldReduce ? undefined : SPRING_CELEBRATION}
                  className="w-5 h-5 rounded-[4px] bg-accent flex items-center justify-center"
                >
                  <Check size={14} className="text-bg" />
                </motion.span>
              ) : (
                <motion.span
                  key="unchecked"
                  initial={shouldReduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduce ? undefined : { opacity: 0 }}
                  transition={shouldReduce ? undefined : FADE_OUT}
                  className="w-5 h-5 rounded-[4px] border-2 border-muted hover:border-text transition-colors duration-150"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {justCompleted && !shouldReduce && (
                <motion.span
                  key="pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded bg-accent pointer-events-none"
                />
              )}
            </AnimatePresence>
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
