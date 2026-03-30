'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { Patch } from '@/lib/content/types';

interface PatchDetailProps {
  patch: Patch;
  html: string;
  instrumentSlug: string;
  originSession: {
    slug: string;
    title: string;
    number: number;
  } | null;
}

export function PatchDetail({
  patch,
  html,
  instrumentSlug,
  originSession,
}: PatchDetailProps) {
  return (
    <div>
      <header className="sticky top-0 z-40 h-[48px] bg-surface flex items-center px-lg border-b border-muted/20">
        <Link
          href={`/instruments/${instrumentSlug}/patches`}
          aria-label="Back to patch list"
          className="flex items-center text-muted hover:text-text transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="text-sm ml-xs">Patches</span>
        </Link>
        <span className="flex-1 text-center text-sm text-muted truncate px-md">
          {patch.name}
        </span>
        <div className="w-[80px]" />
      </header>

      <div className="max-w-[720px] mx-auto px-lg py-2xl">
        <h1 className="text-2xl font-bold mb-sm">{patch.name}</h1>

        <div className="flex items-center gap-sm text-sm mb-lg">
          <span className="uppercase tracking-wider text-accent">
            {patch.type}
          </span>
          {originSession && (
            <>
              <span className="text-muted">-</span>
              <Link
                href={`/instruments/${instrumentSlug}/sessions/${originSession.slug}`}
                className="text-text underline underline-offset-2 hover:text-accent transition-colors"
              >
                Created in Session {originSession.number}:{' '}
                {originSession.title}
              </Link>
            </>
          )}
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
