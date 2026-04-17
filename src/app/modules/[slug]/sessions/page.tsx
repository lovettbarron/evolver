import { WideShell } from '@/components/page-shell';

export default function ModuleSessionsPage() {
  return (
    <WideShell className="py-2xl">
      <div className="bg-sunken rounded-lg p-2xl flex flex-col items-center text-center">
        <h2 className="font-display text-[20px] font-bold text-text">Sessions coming soon</h2>
        <p className="text-base text-muted mt-sm max-w-[400px]">
          Learning sessions for this module are being developed. Check back soon.
        </p>
      </div>
    </WideShell>
  );
}
