'use client';

import Link from 'next/link';
import type { SearchableSession, SearchablePatch } from '@/lib/search';

interface SearchDropdownProps {
  sessions: SearchableSession[];
  patches: SearchablePatch[];
  query: string;
  focusedIndex: number;
  instrumentSlug: string;
  onSelect: () => void;
  onClear: () => void;
}

export function SearchDropdown({
  sessions,
  patches,
  query,
  focusedIndex,
  instrumentSlug,
  onSelect,
  onClear,
}: SearchDropdownProps) {
  const hasResults = sessions.length > 0 || patches.length > 0;
  const showEmpty = !hasResults && query.length > 0;

  if (!showEmpty && !hasResults) return null;

  // Build flat index for keyboard navigation
  let flatIndex = 0;

  return (
    <div className="absolute top-full left-0 w-full bg-bg border border-muted/20 rounded-[8px] shadow-lg mt-xs max-h-[384px] overflow-y-auto z-50">
      {showEmpty && (
        <div className="px-md py-lg text-center">
          <p className="text-text font-bold">No results for &quot;{query}&quot;</p>
          <p className="text-muted text-sm mt-sm">
            Try a different search term or browse by instrument.
          </p>
          <button
            className="text-accent hover:underline text-sm mt-md cursor-pointer"
            onClick={onClear}
          >
            Clear search
          </button>
        </div>
      )}

      {sessions.length > 0 && (
        <div>
          <div className="px-md py-xs text-[13px] uppercase tracking-wider text-muted">
            Sessions <span className="text-accent">({sessions.length})</span>
          </div>
          {sessions.slice(0, 4).map((s) => {
            const idx = flatIndex++;
            const isFocused = idx === focusedIndex;
            return (
              <Link
                key={s.slug}
                href={`/instruments/${instrumentSlug}/sessions/${s.slug}`}
                className={`block px-md py-sm hover:bg-surface rounded-[4px] cursor-pointer ${
                  isFocused ? 'bg-surface ring-1 ring-accent/30' : ''
                }`}
                data-index={idx}
                onClick={onSelect}
              >
                <div className="flex items-center">
                  <span className="text-sm text-text">
                    #{s.sessionNumber} {s.title}
                  </span>
                  <span className="text-[13px] text-muted ml-auto">{s.module}</span>
                </div>
              </Link>
            );
          })}
          {sessions.length > 4 && (
            <Link
              href={`/instruments/${instrumentSlug}/sessions?q=${encodeURIComponent(query)}`}
              className="block px-md py-xs text-[13px] text-accent hover:underline"
              onClick={onSelect}
            >
              See all {sessions.length} sessions
            </Link>
          )}
        </div>
      )}

      {patches.length > 0 && (
        <div>
          <div className="px-md py-xs text-[13px] uppercase tracking-wider text-muted">
            Patches <span className="text-accent">({patches.length})</span>
          </div>
          {patches.slice(0, 4).map((p) => {
            const idx = flatIndex++;
            const isFocused = idx === focusedIndex;
            return (
              <Link
                key={p.slug}
                href={`/instruments/${instrumentSlug}/patches/${p.slug}`}
                className={`block px-md py-sm hover:bg-surface rounded-[4px] cursor-pointer ${
                  isFocused ? 'bg-surface ring-1 ring-accent/30' : ''
                }`}
                data-index={idx}
                onClick={onSelect}
              >
                <div className="flex items-center">
                  <span className="text-sm text-text">{p.name}</span>
                  <span className="text-[13px] uppercase text-accent ml-sm">
                    [{p.type}]
                  </span>
                </div>
              </Link>
            );
          })}
          {patches.length > 4 && (
            <Link
              href={`/instruments/${instrumentSlug}/patches?q=${encodeURIComponent(query)}`}
              className="block px-md py-xs text-[13px] text-accent hover:underline"
              onClick={onSelect}
            >
              See all {patches.length} patches
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
