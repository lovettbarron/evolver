import { notFound } from 'next/navigation';
import { listSessions, listInstrumentFiles } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { getAdjacentSessions } from '@/lib/sessions';
import { SessionDetail } from '@/components/session-detail';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const config = await loadConfig();
  const allSessions = await listSessions(slug, config);
  const current = allSessions.find((s) => s.slug === id);

  if (!current) {
    return notFound();
  }

  const html = await renderMarkdown(current.content);
  const { prev, next } = getAdjacentSessions(allSessions, id);

  // Load quick-ref content (basic-patch and signal-flow instrument files)
  const instrumentFiles = await listInstrumentFiles(slug, config);
  const basicPatch = instrumentFiles.find((f) => f.data.type === 'basic-patch');
  const signalFlow = instrumentFiles.find((f) => f.data.type === 'signal-flow');

  const quickRefContent: { label: string; html: string }[] = [];
  if (basicPatch) {
    quickRefContent.push({
      label: 'Basic Patch',
      html: await renderMarkdown(basicPatch.content),
    });
  }
  if (signalFlow) {
    quickRefContent.push({
      label: 'Signal Flow',
      html: await renderMarkdown(signalFlow.content),
    });
  }

  return (
    <SessionDetail
      session={current.data}
      html={html}
      prev={prev ? { slug: prev.slug, title: prev.data.title } : null}
      next={next ? { slug: next.slug, title: next.data.title } : null}
      instrumentSlug={slug}
      quickRefContent={quickRefContent}
      reference={current.data.reference ?? null}
    />
  );
}
