'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { QuickRefPanel } from '@/components/quick-ref-panel';

interface StickyHeaderProps {
  backHref: string;
  sessionIdentifier: string;
  quickRefContent: { label: string; html: string }[];
  instrumentSlug?: string;
}

export function StickyHeader({
  backHref,
  sessionIdentifier,
  quickRefContent,
  instrumentSlug,
}: StickyHeaderProps) {
  const [isQuickRefOpen, setIsQuickRefOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 h-[48px] bg-surface flex items-center px-lg border-b border-muted/20">
        <Link
          href={backHref}
          aria-label="Back to session list"
          className="flex items-center text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>

        <span className="flex-1 text-center text-sm text-muted truncate px-md">
          {sessionIdentifier}
        </span>

        <button
          type="button"
          onClick={() => setIsQuickRefOpen(true)}
          className="text-sm px-md py-xs bg-surface text-text rounded border border-transparent hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
        >
          Quick Ref
        </button>
      </header>

      <QuickRefPanel
        content={quickRefContent}
        isOpen={isQuickRefOpen}
        onClose={() => setIsQuickRefOpen(false)}
        instrumentSlug={instrumentSlug}
      />
    </>
  );
}
