import Link from 'next/link';

export function EmptyProgressState({ slug }: { slug: string }) {
  return (
    <main className="max-w-[640px] mx-auto px-lg pt-2xl pb-3xl flex flex-col items-center text-center">
      <h2 className="text-[24px] font-bold mb-md">Start your first session</h2>
      <p className="text-[16px] text-muted mb-xl max-w-[400px]">
        Your progress appears here as you work through the curriculum. Every session counts.
      </p>
      <Link
        href={`/instruments/${slug}/sessions/01-foundations-navigation`}
        className="bg-accent text-bg font-bold py-md px-xl rounded min-h-[48px] inline-flex items-center"
      >
        Start Session 1
      </Link>
    </main>
  );
}
