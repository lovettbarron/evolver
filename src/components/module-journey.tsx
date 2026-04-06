export function ModuleJourney({
  modules,
  currentModule,
}: {
  modules: Array<{ module: string; complete: boolean }>;
  currentModule: string | null;
}) {
  return (
    <div className="bg-surface p-lg rounded-lg">
      <div className="flex items-center gap-sm overflow-x-auto min-h-[44px]">
        {modules.map((m, i) => {
          const isCurrent = m.module === currentModule;
          const dotClass = m.complete
            ? 'bg-accent'
            : isCurrent
              ? 'bg-accent animate-pulse-glow'
              : 'bg-surface border border-muted';
          return (
            <span key={i} title={m.module} aria-current={isCurrent ? 'true' : undefined}>
              <span
                className={`block w-[12px] h-[12px] rounded-full flex-shrink-0 ${dotClass}`}
              />
            </span>
          );
        })}
      </div>
      <div className="flex items-center gap-sm mt-sm">
        {modules.map((_, i) => (
          <span
            key={i}
            className="text-[14px] text-muted w-[12px] text-center flex-shrink-0"
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}
