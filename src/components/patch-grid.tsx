'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { groupByType, getAvailableTypes } from '@/lib/patches';
import { PatchCard } from '@/components/patch-card';
import type { Patch } from '@/lib/content/types';

interface PatchGridProps {
  patches: Array<{ data: Patch; content: string; slug: string }>;
  instrumentSlug: string;
}

export function PatchGrid({ patches, instrumentSlug }: PatchGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeType = searchParams.get('type') ?? 'all';

  function setFilter(type: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'all') params.delete('type');
    else params.set('type', type);
    router.replace(`${pathname}?${params.toString()}`);
  }

  const availableTypes = getAvailableTypes(patches);

  const filteredPatches =
    activeType === 'all'
      ? patches
      : patches.filter((p) => p.data.type === activeType);

  const groups = groupByType(
    activeType === 'all' ? patches : filteredPatches,
  );

  return (
    <>
      <div role="tablist" className="flex flex-wrap gap-sm mb-2xl">
        <button
          role="tab"
          aria-selected={activeType === 'all'}
          onClick={() => setFilter('all')}
          className={
            activeType === 'all'
              ? 'bg-accent text-bg font-semibold rounded-full px-md py-xs min-h-[36px] text-sm'
              : 'bg-transparent text-muted border border-muted/30 rounded-full px-md py-xs min-h-[36px] text-sm hover:text-text hover:border-text transition-colors'
          }
        >
          All
        </button>
        {availableTypes.map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={activeType === type}
            onClick={() => setFilter(type)}
            className={
              activeType === type
                ? 'bg-accent text-bg font-semibold rounded-full px-md py-xs min-h-[36px] text-sm capitalize'
                : 'bg-transparent text-muted border border-muted/30 rounded-full px-md py-xs min-h-[36px] text-sm hover:text-text hover:border-text transition-colors capitalize'
            }
          >
            {type}
          </button>
        ))}
      </div>

      {activeType === 'all' ? (
        groups.map((group, index) => (
          <div key={group.type}>
            <h2
              className={`text-sm uppercase tracking-wider text-muted ${index === 0 ? 'mt-0' : 'mt-2xl'} mb-lg flex items-center gap-md`}
            >
              {group.type}
              <span className="flex-1 h-px bg-muted/20" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              {group.patches.map((patch) => (
                <PatchCard
                  key={patch.slug}
                  patch={patch.data}
                  slug={patch.slug}
                  instrumentSlug={instrumentSlug}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
          {filteredPatches.map((patch) => (
            <PatchCard
              key={patch.slug}
              patch={patch.data}
              slug={patch.slug}
              instrumentSlug={instrumentSlug}
            />
          ))}
        </div>
      )}
    </>
  );
}
