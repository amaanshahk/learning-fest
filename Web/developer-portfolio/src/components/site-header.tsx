
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] py-6">
      <Link href="/" className="text-base font-semibold tracking-tight">
        Amaan Shah K.
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-4 text-sm text-[var(--muted)] sm:gap-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={item.href === pathname ? "page" : undefined}
                className={
                  item.href === pathname
                    ? "font-medium text-[var(--foreground)]"
                    : "transition-colors hover:text-[var(--accent)]"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
