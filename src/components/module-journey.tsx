export function ModuleJourney({
  modules,
}: {
  modules: Array<{ module: string; complete: boolean }>;
}) {
  return (
    <div className="bg-surface p-lg rounded-lg">
      <div className="flex items-center gap-sm overflow-x-auto min-h-[44px]">
        {modules.map((m, i) => (
          <span key={i} title={m.module}>
            <span
              className={`block w-[12px] h-[12px] rounded-full flex-shrink-0 ${
                m.complete
                  ? 'bg-accent'
                  : 'bg-surface border border-muted'
              }`}
            />
          </span>
        ))}
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
