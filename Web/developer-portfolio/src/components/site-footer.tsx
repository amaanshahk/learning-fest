
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();

  const isHomeOrProjects =
    pathname === "/" || pathname === "/projects";

  return (
    <footer className="flex flex-col gap-4 border-t border-[var(--border)] py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 Amaan Shah K.</p>

      <Link
        href={isHomeOrProjects ? "/contact" : "/"}
        className="hover:text-[var(--accent)]"
      >
        {isHomeOrProjects ? "Get in touch →" : "Back to home ↑"}
      </Link>
    </footer>
  );
}
