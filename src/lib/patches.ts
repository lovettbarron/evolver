import type { Patch } from '@/lib/content/types';

export interface PatchWithMeta {
  data: Patch;
  content: string;
  slug: string;
}

export interface PatchTypeGroup {
  type: string;
  patches: PatchWithMeta[];
}

const TYPE_ORDER = ['bass', 'lead', 'pad', 'drum', 'texture', 'sequence'] as const;

/**
 * Group patches by their type field.
 * Groups are returned in TYPE_ORDER order, skipping types with no patches.
 * Patches within each group are sorted by session_origin (ascending, nulls last).
 */
export function groupByType(patches: PatchWithMeta[]): PatchTypeGroup[] {
  if (patches.length === 0) return [];

  const groupMap = new Map<string, PatchWithMeta[]>();

  for (const patch of patches) {
    const type = patch.data.type;
    if (!groupMap.has(type)) {
      groupMap.set(type, []);
    }
    groupMap.get(type)!.push(patch);
  }

  // Sort patches within each group by session_origin (ascending, nulls last)
  for (const group of groupMap.values()) {
    group.sort(
      (a, b) =>
        (a.data.session_origin ?? Infinity) -
        (b.data.session_origin ?? Infinity),
    );
  }

  // Return groups in TYPE_ORDER order, skipping types with no patches
  return TYPE_ORDER.filter((t) => groupMap.has(t)).map((type) => ({
    type,
    patches: groupMap.get(type)!,
  }));
}

/**
 * Return only types from TYPE_ORDER that have at least one patch.
 * Preserves TYPE_ORDER ordering.
 */
export function getAvailableTypes(patches: PatchWithMeta[]): string[] {
  if (patches.length === 0) return [];

  const typeSet = new Set(patches.map((p) => p.data.type));
  return TYPE_ORDER.filter((t) => typeSet.has(t));
}
