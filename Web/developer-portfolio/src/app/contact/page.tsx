
import Link from "next/link";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full px-5 sm:px-8 lg:px-12 xl:px-16">
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
                  aria-current={item.href === "/contact" ? "page" : undefined}
                  className={
                    item.href === "/contact"
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

      <section className="grid min-h-[65vh] gap-12 border-b border-[var(--border)] py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Get in touch
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Let&apos;s connect.          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            Have an interesting idea, a project in mind, or just
            want to talk about technology? Feel free to reach out.
          </p>
        </div>

        <div className="border-t border-[var(--border)] pt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Email
          </p>

          <a
            href="mailto:amaanshahk123@gmail.com"
            className="mt-3 inline-block break-all text-xl font-medium transition-colors hover:text-[var(--accent)] sm:text-2xl"
          >
            amaanshahk123@gmail.com
          </a>

          <a
            href="mailto:amaanshahk123@gmail.com"
            className="mt-8 inline-block border border-[var(--border)] px-5 py-3 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Send me an email ↗
          </a>
        </div>
        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Elsewhere
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="https://github.com/amaanshahk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)]"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/amaanshahk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>© 2026 Amaan Shah K.</p>
        <Link href="/" className="hover:text-[var(--accent)]">
          Back to home ↑
        </Link>
      </footer>
    </main>
  );
}
