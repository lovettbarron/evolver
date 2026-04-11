import Link from 'next/link';

export function CountCard({ count, label, href }: { count: number; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="card flex flex-col items-center cursor-pointer"
      aria-label={`${count} ${label}`}
    >
      <span className="text-[48px] font-bold text-accent leading-none">{count}</span>
      <span className="text-[14px] text-muted mt-sm">{label}</span>
    </Link>
  );
}
