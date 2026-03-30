import { notFound } from 'next/navigation';
import { listPatches, listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { PatchDetail } from '@/components/patch-detail';

export default async function PatchPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const config = await loadConfig();
  const allPatches = await listPatches(slug, config);
  const current = allPatches.find((p) => p.slug === id);

  if (!current) return notFound();

  const html = await renderMarkdown(current.content);

  // Session provenance lookup
  const allSessions = await listSessions(slug, config);
  const originSession =
    current.data.session_origin !== null
      ? allSessions.find(
          (s) => s.data.session_number === current.data.session_origin,
        )
      : null;

  return (
    <PatchDetail
      patch={current.data}
      html={html}
      instrumentSlug={slug}
      originSession={
        originSession
          ? {
              slug: originSession.slug,
              title: originSession.data.title,
              number: originSession.data.session_number,
            }
          : null
      }
    />
  );
}
