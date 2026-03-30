import { Suspense } from 'react';
import { listPatches } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { PatchGrid } from '@/components/patch-grid';
import Link from 'next/link';

export default async function PatchListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();
  const patches = await listPatches(slug, config);

  return (
    <div className="max-w-[960px] mx-auto px-lg py-2xl">
      <h1 className="text-2xl font-bold mb-md">Patch Library</h1>
      <p className="text-muted mb-2xl">
        Documented patches from your learning sessions
      </p>

      {patches.length === 0 ? (
        <div className="text-center py-3xl">
          <h2 className="text-xl font-bold mb-md">No patches yet</h2>
          <p className="text-muted mb-lg">
            Patches are created during learning sessions. Start a session to
            build your first patch.
          </p>
          <Link
            href={`/instruments/${slug}/sessions`}
            className="text-accent underline underline-offset-2 hover:text-text transition-colors"
          >
            Browse Sessions
          </Link>
        </div>
      ) : (
        <Suspense>
          <PatchGrid patches={patches} instrumentSlug={slug} />
        </Suspense>
      )}
    </div>
  );
}
