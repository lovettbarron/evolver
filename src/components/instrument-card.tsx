import Link from 'next/link';

interface InstrumentCardProps {
  slug: string;
  displayName: string;
  tagline: string;
  sessionCount: number;
  patchCount: number;
}

export function InstrumentCard({
  slug,
  displayName,
  tagline,
  sessionCount,
  patchCount,
}: InstrumentCardProps) {
  return (
    <Link
      href={`/instruments/${slug}`}
      className="card block"
    >
      <div className="flex flex-col gap-sm">
        <h2 className="text-2xl font-bold text-text">{displayName}</h2>
        <p className="text-sm text-muted">{tagline}</p>
        <p className="text-sm font-mono text-param">
          {sessionCount} sessions / {patchCount} patches
        </p>
        <span className="text-sm text-accent underline underline-offset-2 hover:brightness-110 mt-md">
          Explore {displayName}
        </span>
      </div>
    </Link>
  );
}
