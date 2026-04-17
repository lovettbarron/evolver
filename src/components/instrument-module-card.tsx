import Link from 'next/link';
import { SpringCard } from '@/components/motion/spring-card';

interface InstrumentModuleCardProps {
  slug: string;
  instrumentSlug: string;
  title: string;
  category?: string;
  controlCount?: number;
  jackCount?: number;
  hasNormals?: boolean;
  purpose: string;
}

export function InstrumentModuleCard({
  slug,
  instrumentSlug,
  title,
  category,
  controlCount,
  jackCount,
  hasNormals,
  purpose,
}: InstrumentModuleCardProps) {
  return (
    <SpringCard>
      <Link
        href={`/instruments/${instrumentSlug}/modules/${slug}`}
        aria-label={`Open module: ${title}`}
        className="card block"
      >
        <div className="flex items-start justify-between mb-sm">
          {category && (
            <span className="text-accent text-sm uppercase tracking-wider font-normal">
              {category}
            </span>
          )}
          {jackCount != null && (
            <span className="text-muted text-sm">{jackCount} jacks</span>
          )}
        </div>

        <h3 className="text-[20px] font-bold leading-[1.2] mb-sm">{title}</h3>

        <p className="text-text text-base leading-[1.6] line-clamp-2 mb-md">
          {purpose}
        </p>

        <div className="flex items-center gap-md text-muted text-sm">
          {controlCount != null && <span>{controlCount} controls</span>}
          {hasNormals && <span>Has normals</span>}
        </div>
      </Link>
    </SpringCard>
  );
}
