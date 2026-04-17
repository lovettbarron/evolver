import { loadConfig } from '@/lib/config';
import { loadModuleConfig } from '@/lib/content/reader';
import { ModuleSubNav } from '@/components/module-sub-nav';
import { notFound } from 'next/navigation';

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();

  let moduleConfig;
  try {
    moduleConfig = await loadModuleConfig(slug, config);
  } catch {
    return notFound();
  }

  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-lg pt-2xl pb-lg">
        <h1 className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.4375rem)] font-bold text-text leading-[1.15]">
          {moduleConfig.display_name}
        </h1>
        <p className="text-sm text-muted mt-xs">{moduleConfig.manufacturer}</p>
        <div className="flex items-center gap-sm mt-sm">
          <span className="text-sm font-mono text-param">{moduleConfig.hp_width}HP</span>
          {moduleConfig.categories.map((cat: string) => (
            <span key={cat} className="text-sm uppercase tracking-[0.05em] text-accent bg-accent/10 rounded-full px-sm py-xs">
              {cat.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>
      <ModuleSubNav slug={slug} />
      {children}
    </div>
  );
}
