
import Link from "next/link";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

const skillGroups = [
  {
    number: "01",
    title: "Programming languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    number: "02",
    title: "Web development",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Django"],
  },
  {
    number: "03",
    title: "AI & machine learning",
    skills: [
      "Pandas",
      "OpenCV",
      "MediaPipe",
      "TensorFlow",
      "Streamlit",
      "LLM Integration",
    ],
  },
  {
    number: "04",
    title: "LLM & retrieval systems",
    skills: [
      "Prompt Engineering",
      "RAG",
      "ChromaDB",
      "Embeddings",
      "Groq API",
      "OpenAI SDK",
    ],
  },
  {
    number: "05",
    title: "Tools & platforms",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Linux",
      "PostgreSQL",
      "Docker",
    ],
  },
];

export default function SkillsPage() {
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
                  aria-current={item.href === "/skills" ? "page" : undefined}
                  className={
                    item.href === "/skills"
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

      <section className="border-b border-[var(--border)] py-16 sm:py-20">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
          Technical toolkit
        </p>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Skills & tools.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          Technologies and tools I have explored and applied
          while building projects, experimenting with ideas
          and learning new concepts.
        </p>
      </section>

      <section aria-label="Technical skills">
        {skillGroups.map((group) => (
          <div
            key={group.number}
            className="grid gap-5 border-b border-[var(--border)] py-9 sm:py-10 lg:grid-cols-[220px_1fr] lg:gap-12"
          >
            <div>
              <p className="text-xs font-medium tracking-widest text-[var(--accent)]">
                {group.number}
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                {group.title}
              </h2>
            </div>

            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="border-b border-[var(--border)] py-14 sm:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Community & learning
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My μLearn profile.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
              A snapshot of my participation, learning activity
              and contributions to the μLearn community.
            </p>
          </div>

          <a
            href="https://app.mulearn.org/profile/amaanshahk@mulearn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-[var(--accent)]"
          >
            View full profile ↗
          </a>
        </div>

        <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
          <a
            href="https://app.mulearn.org/profile/amaanshahk@mulearn"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-6 border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)] sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="text-2xl font-semibold">Amaan Shah</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                amaanshahk@mulearn
              </p>
              <p className="mt-5 text-sm text-[var(--muted)]">
                6,891 Karma · Level 5 · Global Rank #869
              </p>
            </div>

            <span className="text-sm font-medium text-[var(--accent)]">
              Visit μLearn profile ↗
            </span>
          </a>
        </div>

        <p className="mt-3 text-xs text-[var(--muted)]">
          If the profile cannot be displayed here, use the link above
          to open it directly.
        </p>
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
