import { listSessions } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { groupByModule } from '@/lib/sessions';
import { SessionList } from '@/components/session-list';

export default async function SessionListPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await loadConfig();
  const sessions = await listSessions(slug, config);
  const groups = groupByModule(sessions);

  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold mb-2xl">Sessions</h1>
      <SessionList groups={groups} instrumentSlug={slug} />
    </div>
  );
}
