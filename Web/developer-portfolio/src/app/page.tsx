
import Link from "next/link";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];


export default function Home() {
  return (
    <main className="w-full min-h-screen px-5 sm:px-8 lg:px-12 xl:px-16">
      {/* Header */}
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
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="grid gap-10 border-b border-[var(--border)] py-16 sm:py-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.7fr)] lg:items-center lg:gap-8">
        <div>
          <p
            className="mb-8 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            Technology · Learning · Building
          </p>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl lg:text-8xl">
            Amaan Shah K.
          </h1>

          <p className="mt-8 max-w-4xl text-2xl leading-relaxed text-[var(--muted)] sm:text-3xl">
            Exploring technology from different perspectives.
            Learning continuously. Building things that matter.
          </p>
        </div>

        <div className="max-w-md lg:pb-0">
          <p className="text-base leading-8 text-[var(--muted)]">
            I&apos;m an MCA student at the College of Engineering Trivandrum,
            interested in exploring technology, solving practical problems,
            and turning ideas into working projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-7 text-sm font-medium">
            <Link
              href="/projects"
              className="border-b border-[var(--accent)] pb-1"
            >
              Explore projects →
            </Link>

            <Link
              href="/about"
              className="border-b border-[var(--border)] pb-1 hover:border-[var(--accent)]"
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>

      {/* Education and interests */}
      <section className="grid gap-10 border-b border-[var(--border)] py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Currently studying
          </p>
          <h2 className="text-lg font-medium">
            MCA · College of Engineering Trivandrum
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Previously BCA · Kannur University
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Exploring
          </p>
          <p className="leading-7 text-[var(--muted)]">
            Artificial intelligence, software development, computer vision,
            and practical problem-solving.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">
            Beyond technology
          </p>
          <p className="leading-7 text-[var(--muted)]">
            Sudoku, running, and discovering new things to learn.
          </p>
        </div>
      </section>



      {/* Selected projects */}
      <section className="py-12 sm:py-16">

        <div className="mb-8 flex items-end justify-between">
          <div>
            <p
              className="mb-2 text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              A selection of my work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Selected projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="border-b border-[var(--border)] pb-1 text-sm hover:border-[var(--accent)]"
          >
            All projects →
          </Link>
        </div>

        <div className="border-t border-[var(--border)]">

          <article className="grid gap-3 border-b border-[var(--border)] py-6 sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-8">
            <div>
              <span className="text-xs text-[var(--muted)]">01 / AI</span>
              <h3 className="mt-1 text-lg font-semibold">AI Data Detective</h3>
            </div>

            <div>
              <p className="leading-6 text-[var(--muted)]">
                Natural-language data analysis combining LLMs with deterministic
                Python tools to explore and analyse sales data.
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Python · Pandas · LLM · Streamlit
              </p>
            </div>

            <Link
              href="/projects"
              className="text-sm font-medium hover:text-[var(--accent)]"
            >
              Explore →
            </Link>
          </article>

          <article className="grid gap-3 border-b border-[var(--border)] py-6 sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-8">
            <div>
              <span className="text-xs text-[var(--muted)]">02 / CV</span>
              <h3 className="mt-1 text-lg font-semibold">OptiFit</h3>
            </div>

            <div>
              <p className="leading-6 text-[var(--muted)]">
                Computer-vision-based workout tracking exploring pose estimation,
                exercise recognition, repetition counting and real-time feedback.
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Python · Django · OpenCV · MediaPipe
              </p>
            </div>

            <Link
              href="/projects"
              className="text-sm font-medium hover:text-[var(--accent)]"
            >
              Explore →
            </Link>
          </article>

          <article className="grid gap-3 border-b border-[var(--border)] py-6 sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-8">
            <div>
              <span className="text-xs text-[var(--muted)]">03 / WEB</span>
              <h3 className="mt-1 text-lg font-semibold">
                Virtualized Photo Browser
              </h3>
            </div>

            <div>
              <p className="leading-6 text-[var(--muted)]">
                A browser-based photo viewer designed for large image collections,
                with list virtualization and keyboard navigation.
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">
                React · TypeScript · Browser APIs
              </p>
            </div>

            <Link
              href="https://github.com/amaanshahk/learning-fest/tree/main/Web/virtualized-photo-browser"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-[var(--accent)]"
            >
              Source ↗
            </Link>
          </article>

        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-4 border-t border-[var(--border)] py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Amaan Shah K.</p>
        <Link href="/contact" className="hover:text-[var(--accent)]">
          Get in touch →
        </Link>
      </footer>

    </main>
  );
}
