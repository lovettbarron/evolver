import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PrevNextNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  instrumentSlug: string;
}

export function PrevNextNav({ prev, next, instrumentSlug }: PrevNextNavProps) {
  return (
    <nav className="flex items-start justify-between">
      <div className="flex-1">
        {prev && (
          <Link
            href={`/instruments/${instrumentSlug}/sessions/${prev.slug}`}
            className="group inline-flex flex-col text-muted hover:text-accent transition-colors"
          >
            <span className="text-xs uppercase tracking-wider mb-xs flex items-center gap-xs">
              <ChevronLeft size={14} />
              Previous
            </span>
            <span className="text-sm group-hover:underline underline-offset-2">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/instruments/${instrumentSlug}/sessions/${next.slug}`}
            className="group inline-flex flex-col items-end text-muted hover:text-accent transition-colors"
          >
            <span className="text-xs uppercase tracking-wider mb-xs flex items-center gap-xs">
              Next
              <ChevronRight size={14} />
            </span>
            <span className="text-sm group-hover:underline underline-offset-2">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
