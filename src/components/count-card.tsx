export function CountCard({ count, label }: { count: number; label: string }) {
  return (
    <div
      className="bg-surface p-lg rounded-lg flex flex-col items-center"
      aria-label={`${count} ${label}`}
    >
      <span className="text-[48px] font-bold text-accent leading-none">
        {count}
      </span>
      <span className="text-[14px] text-muted mt-sm">{label}</span>
    </div>
  );
}
