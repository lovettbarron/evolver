'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { getAvailableTypes } from '@/lib/patches';
import {
  filterPatches,
  sortPatches,
  toSearchablePatch,
} from '@/lib/search';
import type { SearchablePatch } from '@/lib/search';
import { PatchGrid } from '@/components/patch-grid';
import { PatchCard } from '@/components/patch-card';
import type { Patch } from '@/lib/content/types';

interface PatchFilterBarProps {
  patches: Array<{ data: Patch; content: string; slug: string }>;
  instrumentSlug: string;
}

export function PatchFilterBar({
  patches,
  instrumentSlug,
}: PatchFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // URL param reading (backward compat: ?type=bass still works)
  const types = searchParams.get('type')?.split(',').filter(Boolean) ?? [];
  const tags = searchParams.get('tag')?.split(',').filter(Boolean) ?? [];
  const sort = (searchParams.get('sort') ?? 'name') as
    | 'name'
    | 'date'
    | 'type';

  const hasActiveFilters = types.length > 0 || tags.length > 0;

  // Click-outside to dismiss sort dropdown
  useEffect(() => {
    if (!sortOpen) return;
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [sortOpen]);

  function updateParams(key: string, values: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (values.length === 0) params.delete(key);
    else params.set(key, values.join(','));
    router.replace(`${pathname}?${params.toString()}`);
  }

  // Available types from the full patch set
  const availableTypes = getAvailableTypes(patches);

  // Type toggle
  function toggleType(type: string) {
    const next = types.includes(type)
      ? types.filter((t) => t !== type)
      : [...types, type];
    // If all types selected, clear (equivalent to All)
    if (next.length === availableTypes.length) {
      updateParams('type', []);
    } else {
      updateParams('type', next);
    }
  }

  function clearAllTypes() {
    updateParams('type', []);
  }

  // Convert all patches to searchable format
  const searchablePatches: SearchablePatch[] = patches.map((p) =>
    toSearchablePatch(p),
  );

  // Tag computation: apply type filter only, collect unique tags
  const typeFilteredSearchable =
    types.length > 0
      ? searchablePatches.filter((p) => types.includes(p.type))
      : searchablePatches;

  const availableTags = Array.from(
    new Set(typeFilteredSearchable.flatMap((p) => p.tags)),
  ).sort();

  // Tag toggle
  function toggleTag(tag: string) {
    const next = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    updateParams('tag', next);
  }

  // Clear all filters
  function clearAllFilters() {
    router.replace(pathname);
  }

  // Filter and sort
  const filteredSearchable = filterPatches(searchablePatches, {
    types,
    tags,
    sort,
  });
  const filteredSlugs = new Set(filteredSearchable.map((p) => p.slug));

  // Map back to original patch objects, preserving filter order
  const filteredOriginalPatches = hasActiveFilters
    ? filteredSearchable
        .map((sp) => patches.find((p) => p.slug === sp.slug)!)
        .filter(Boolean)
    : sort !== 'name'
      ? sortPatches(searchablePatches, sort)
          .map((sp) => patches.find((p) => p.slug === sp.slug)!)
          .filter(Boolean)
      : patches;

  const sortLabel =
    sort === 'name' ? 'Name' : sort === 'date' ? 'Date' : 'Type';

  return (
    <div>
      {/* Row 1: Type pills + sort */}
      <div className="flex flex-wrap items-center gap-sm mb-sm">
        <button
          onClick={clearAllTypes}
          className={
            types.length === 0
              ? 'bg-accent text-bg font-semibold rounded-full px-md py-xs min-h-[36px] text-sm'
              : 'bg-transparent text-muted border border-muted/30 rounded-full px-md py-xs min-h-[36px] text-sm hover:text-text hover:border-text transition-colors'
          }
        >
          All
        </button>
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={
              types.includes(type)
                ? 'bg-accent text-bg font-semibold rounded-full px-md py-xs min-h-[36px] text-sm capitalize'
                : 'bg-transparent text-muted border border-muted/30 rounded-full px-md py-xs min-h-[36px] text-sm hover:text-text hover:border-text transition-colors capitalize'
            }
          >
            {type}
          </button>
        ))}

        {/* Sort dropdown */}
        <div className="relative ml-auto" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="text-sm text-muted hover:text-text flex items-center gap-xs cursor-pointer"
          >
            Sort: {sortLabel}{' '}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 4.5L6 7.5L9 4.5" />
            </svg>
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-xs bg-bg border border-muted/20 rounded-[6px] shadow-md py-xs min-w-[120px] z-40">
              {(['name', 'date', 'type'] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => {
                    updateParams('sort', [value]);
                    setSortOpen(false);
                  }}
                  className={`block w-full text-left px-md py-xs text-sm hover:bg-surface cursor-pointer ${
                    sort === value ? 'text-accent' : ''
                  }`}
                >
                  {value === 'name'
                    ? 'Name'
                    : value === 'date'
                      ? 'Date'
                      : 'Type'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Tag pills (conditional) */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap gap-xs mt-sm">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={
                tags.includes(tag)
                  ? 'bg-accent/20 text-accent border border-accent/40 rounded-full px-sm py-[4px] text-[13px]'
                  : 'bg-transparent text-muted border border-muted/20 rounded-full px-sm py-[4px] text-[13px] hover:text-text hover:border-muted/40 transition-colors'
              }
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Patch display */}
      {hasActiveFilters && filteredOriginalPatches.length === 0 ? (
        <div className="text-center py-3xl">
          <p className="text-text font-bold">
            No {types.length === 1 ? types[0] : ''} patches match your filters
          </p>
          <p className="text-muted text-sm mt-sm">
            Try removing a filter or{' '}
            <button
              onClick={clearAllFilters}
              className="text-accent hover:underline text-sm cursor-pointer"
            >
              Clear filters
            </button>{' '}
            to see all patches.
          </p>
        </div>
      ) : !hasActiveFilters ? (
        <div className="mt-2xl">
          <PatchGrid
            patches={filteredOriginalPatches}
            instrumentSlug={instrumentSlug}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg mt-2xl">
          {filteredOriginalPatches.map((patch) => (
            <PatchCard
              key={patch.slug}
              patch={patch.data}
              slug={patch.slug}
              instrumentSlug={instrumentSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
