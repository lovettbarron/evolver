import Link from 'next/link';

export function CountCard({ count, label, href }: { count: number; label: string; href: string }) {
  return (
    <Link
      href={href}
      className="bg-surface p-lg rounded-lg flex flex-col items-center cursor-pointer
                 transition-[transform,box-shadow] duration-150 ease-out
                 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(200,255,0,0.08)]
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={`${count} ${label}`}
    >
      <span className="text-[48px] font-bold text-accent leading-none">{count}</span>
      <span className="text-[14px] text-muted mt-sm">{label}</span>
    </Link>
  );
}
