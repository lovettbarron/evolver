import { WideShell } from '@/components/page-shell';

export default function ModulePanelPage() {
  return (
    <WideShell className="py-2xl">
      <div className="bg-sunken rounded-lg p-2xl flex flex-col items-center text-center">
        <h2 className="font-display text-[20px] font-bold text-text">Panel coming soon</h2>
        <p className="text-base text-muted mt-sm max-w-[400px]">
          An interactive front-plate diagram for this module is in development.
        </p>
      </div>
    </WideShell>
  );
}
