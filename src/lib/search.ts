import type { Session, Patch } from '@/lib/content/types';

export interface SearchableSession {
  slug: string;
  title: string;
  section: string;
  tags: string[];
  difficulty: string;
  sessionNumber: number;
  instrument: string;
}

export interface SearchablePatch {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
  instrument: string;
  created: string;
}

export interface PatchFilterOptions {
  types: string[];
  tags: string[];
  sort: 'name' | 'date' | 'type';
}

/**
 * Search sessions and patches by case-insensitive substring matching
 * against frontmatter fields, scoped to a specific instrument.
 *
 * Sessions: title, section, tags, difficulty
 * Patches: name, description, tags, type
 */
export function searchItems(
  query: string,
  sessions: SearchableSession[],
  patches: SearchablePatch[],
  instrumentSlug: string,
): { sessions: SearchableSession[]; patches: SearchablePatch[] } {
  if (!query.trim()) {
    return { sessions: [], patches: [] };
  }

  const q = query.toLowerCase();

  const matchedSessions = sessions.filter((s) => {
    if (s.instrument !== instrumentSlug) return false;
    return (
      s.title.toLowerCase().includes(q) ||
      s.section.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.difficulty.toLowerCase().includes(q)
    );
  });

  const matchedPatches = patches.filter((p) => {
    if (p.instrument !== instrumentSlug) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.type.toLowerCase().includes(q)
    );
  });

  return { sessions: matchedSessions, patches: matchedPatches };
}

/**
 * Filter patches by types (OR within types) and tags (OR within tags),
 * with AND logic between type and tag groups. Sorts the result.
 */
export function filterPatches(
  patches: SearchablePatch[],
  options: PatchFilterOptions,
): SearchablePatch[] {
  let result = patches;

  if (options.types.length > 0) {
    result = result.filter((p) => options.types.includes(p.type));
  }

  if (options.tags.length > 0) {
    result = result.filter((p) =>
      options.tags.some((tag) => p.tags.includes(tag)),
    );
  }

  return sortPatches(result, options.sort);
}

/**
 * Sort patches by name (a-z), date (newest first), or type (a-z then name).
 * Returns a new array; does not mutate the input.
 */
export function sortPatches(
  patches: SearchablePatch[],
  sort: 'name' | 'date' | 'type',
): SearchablePatch[] {
  const sorted = [...patches];

  switch (sort) {
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'date':
      sorted.sort((a, b) => b.created.localeCompare(a.created));
      break;
    case 'type':
      sorted.sort((a, b) => {
        const typeCompare = a.type.localeCompare(b.type);
        if (typeCompare !== 0) return typeCompare;
        return a.name.localeCompare(b.name);
      });
      break;
  }

  return sorted;
}

/**
 * Map a session with metadata to searchable fields only.
 */
export function toSearchableSession(s: {
  data: Session;
  slug: string;
}): SearchableSession {
  return {
    slug: s.slug,
    title: s.data.title,
    section: s.data.section,
    tags: s.data.tags,
    difficulty: s.data.difficulty,
    sessionNumber: s.data.session_number,
    instrument: s.data.instrument,
  };
}

/**
 * Map a patch with metadata to searchable fields only.
 */
export function toSearchablePatch(p: {
  data: Patch;
  slug: string;
}): SearchablePatch {
  return {
    slug: p.slug,
    name: p.data.name,
    description: p.data.description,
    tags: p.data.tags,
    type: p.data.type,
    instrument: p.data.instrument,
    created: p.data.created,
  };
}
