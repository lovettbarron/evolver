import { listModules } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { renderMarkdown } from '@/lib/markdown/processor';
import { ModuleDetail } from '@/components/module-detail';
import { notFound } from 'next/navigation';

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; module: string }>;
}) {
  const { slug, module: moduleSlug } = await params;
  const config = await loadConfig();
  const modules = await listModules(slug, config);
  const mod = modules.find((m) => m.slug === moduleSlug);

  if (!mod) return notFound();

  const contentHtml = await renderMarkdown(mod.content, [], slug);

  return (
    <ModuleDetail
      title={mod.data.title}
      category={mod.data.category}
      contentHtml={contentHtml}
      instrumentSlug={slug}
    />
  );
}
