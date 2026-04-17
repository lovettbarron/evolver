export function HpOutline({ hpWidth }: { hpWidth: number }) {
  const widthPercent = Math.min((hpWidth / 20) * 100, 100);

  return (
    <div
      className="h-[48px] rounded-sm border border-accent/30 bg-accent/15"
      style={{ width: `${widthPercent}%` }}
      aria-hidden="true"
    />
  );
}
