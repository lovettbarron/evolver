'use client';

import { groupByType } from '@/lib/patches';
import { PatchCard } from '@/components/patch-card';
import { StaggerGroup, StaggerItem } from '@/components/motion/stagger-group';
import type { Patch } from '@/lib/content/types';

interface PatchGridProps {
  patches: Array<{ data: Patch; content: string; slug: string }>;
  instrumentSlug: string;
}

export function PatchGrid({ patches, instrumentSlug }: PatchGridProps) {
  const groups = groupByType(patches);

  return (
    <>
      {groups.map((group, index) => (
        <div key={group.type}>
          <h2
            className={`text-sm uppercase tracking-wider text-muted ${index === 0 ? 'mt-0' : 'mt-2xl'} mb-lg flex items-center gap-md`}
          >
            {group.type}
            <span className="flex-1 h-px bg-muted/20" />
          </h2>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
            {group.patches.map((patch) => (
              <StaggerItem key={patch.slug}>
                <PatchCard
                  patch={patch.data}
                  slug={patch.slug}
                  instrumentSlug={instrumentSlug}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      ))}
    </>
  );
}
