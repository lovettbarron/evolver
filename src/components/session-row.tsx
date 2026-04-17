import type { ReactElement } from 'react';
import Link from 'next/link';
import type { SessionState } from '@/lib/prerequisite';

interface SessionRowProps {
  number: number;
  title: string;
  duration: number;
  href: string;
  state: SessionState;
  prerequisiteNumber: number | null;
}

function CheckCircleIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      role="img"
      aria-label="Completed"
      className="flex-shrink-0 mt-[3px]"
    >
      <circle cx="8" cy="8" r="7" fill="var(--color-accent)" />
      <path
        d="M5 8l2 2 4-4"
        stroke="var(--color-bg)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpenCircleIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      role="img"
      aria-label="Available"
      className="flex-shrink-0 mt-[3px]"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      role="img"
      aria-label="Locked"
      className="flex-shrink-0 mt-[3px]"
    >
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="var(--color-muted)" />
      <path
        d="M5 7V5a3 3 0 0 1 6 0v2"
        fill="none"
        stroke="var(--color-muted)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const STATE_ICONS: Record<SessionState, () => ReactElement> = {
  completed: CheckCircleIcon,
  available: OpenCircleIcon,
  locked: LockIcon,
};

export function SessionRow({
  number,
  title,
  duration,
  href,
  state,
  prerequisiteNumber,
}: SessionRowProps) {
  const Icon = STATE_ICONS[state];

  return (
    <Link
      href={href}
      className="group flex items-start justify-between py-md px-sm rounded transition-colors hover:bg-surface"
    >
      <div className="flex gap-sm">
        <Icon />
        <div>
          <span className="text-text">
            {number}. {title}
          </span>
          {state === 'locked' && prerequisiteNumber != null && (
            <span className="block text-[14px] text-muted">
              Requires #{prerequisiteNumber}
            </span>
          )}
        </div>
      </div>
      <span className="text-muted text-sm ml-md whitespace-nowrap flex-shrink-0 mt-[3px]">
        {duration} min
      </span>
    </Link>
  );
}
