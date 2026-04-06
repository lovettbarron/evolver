import { getTroubleshooting } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TroubleshootingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();
  const result = await getTroubleshooting(slug, config);
  if (!result) return notFound();

  const html = await renderMarkdown(result.content, [], slug);

  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <Link
        href={`/instruments/${slug}`}
        className="text-muted text-sm hover:text-accent mb-lg inline-block"
      >
        &larr; Back to instrument
      </Link>
      <h1 className="text-4xl font-bold leading-[1.1] mb-sm">
        {result.data.title}
      </h1>
      <p className="text-muted text-sm mb-2xl">
        Quick reference checklist — check the obvious things first
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
