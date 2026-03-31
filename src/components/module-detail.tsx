import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronLeft } from 'lucide-react';

const MermaidRenderer = dynamic(
  () =>
    import('@/components/mermaid-renderer').then((m) => ({
      default: m.MermaidRenderer,
    })),
  { ssr: false },
);

interface ModuleDetailProps {
  title: string;
  category?: string;
  contentHtml: string;
  instrumentSlug: string;
}

export function ModuleDetail({ title, category, contentHtml, instrumentSlug }: ModuleDetailProps) {
  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <Link
        href={`/instruments/${instrumentSlug}/modules`}
        aria-label="Back to all modules"
        className="inline-flex items-center gap-xs text-muted text-sm hover:text-accent transition-colors mb-lg"
      >
        <ChevronLeft size={16} />
        All Modules
      </Link>

      <h1 className="text-4xl font-bold leading-[1.1] mb-sm">{title}</h1>
      {category && (
        <p className="text-muted text-sm uppercase tracking-wider mb-2xl">
          {category}
        </p>
      )}

      <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <MermaidRenderer />
    </div>
  );
}
