'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PrerequisiteBannerProps {
  prerequisiteNumber: number;
  prerequisiteSlug: string;
  instrumentSlug: string;
}

export function PrerequisiteBanner({
  prerequisiteNumber,
  prerequisiteSlug,
  instrumentSlug,
}: PrerequisiteBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="bg-surface border-l-[3px] border-accent p-md rounded-r-md mb-md flex items-start justify-between gap-sm"
    >
      <p className="text-[14px] text-text leading-[1.5]">
        This session builds on{' '}
        <Link
          href={`/instruments/${instrumentSlug}/sessions/${prerequisiteSlug}`}
          className="text-accent underline"
        >
          Session #{prerequisiteNumber}
        </Link>
        {' '}&mdash; complete it first for the best experience
      </p>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss prerequisite notice"
        className="text-muted hover:text-text flex-shrink-0 transition-colors"
      >
        <svg width={16} height={16} viewBox="0 0 16 16" role="img">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
