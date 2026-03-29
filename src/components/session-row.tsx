import Link from 'next/link';

interface SessionRowProps {
  number: number;
  title: string;
  duration: number;
  href: string;
}

export function SessionRow({ number, title, duration, href }: SessionRowProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-md px-sm rounded transition-colors hover:bg-surface"
    >
      <span className="text-text">
        {number}. {title}
      </span>
      <span className="text-muted text-sm ml-md whitespace-nowrap">
        {duration} min
      </span>
    </Link>
  );
}
