import Link from 'next/link';
import type { Patch } from '@/lib/content/types';

interface PatchCardProps {
  patch: Patch;
  slug: string;
  instrumentSlug: string;
}

export function PatchCard({ patch, slug, instrumentSlug }: PatchCardProps) {
  return (
    <article>
      <Link
        href={`/instruments/${instrumentSlug}/patches/${slug}`}
        aria-label={`Open patch: ${patch.name}`}
        className="card block"
      >
        <div className="flex justify-between items-center mb-sm">
          <div className="flex items-center gap-sm">
            <span className="text-sm uppercase tracking-wider text-accent">
              {patch.type}
            </span>
            {patch.cable_routing &&
              Array.isArray(patch.cable_routing) &&
              (patch.cable_routing as Array<unknown>).length > 0 && (
                <span className="text-sm text-muted">
                  {(patch.cable_routing as Array<unknown>).length} cables
                </span>
              )}
          </div>
          <span className="text-sm text-muted">{patch.created}</span>
        </div>
        <h3 className="text-xl font-bold mb-sm">{patch.name}</h3>
        <p className="text-base text-text line-clamp-2 mb-md">
          {patch.description}
        </p>
        <div className="flex flex-wrap gap-sm">
          {patch.tags.map((tag) => (
            <span key={tag} className="text-sm text-muted">
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
