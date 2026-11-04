
import Link from "next/link";
import ProjectCard from "../../components/project-card";
import { projectGroups } from "../../data/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full">
      <header className="flex items-center justify-between border-b border-[var(--border)] py-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Amaan Shah K.
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-4 text-sm text-[var(--muted)] sm:gap-8">
            {[
              { label: "About", href: "/about" },
              { label: "Projects", href: "/projects" },
              { label: "Skills", href: "/skills" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    item.href === "/projects" ? "page" : undefined
                  }
                  className={
                    item.href === "/projects"
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

      <section className="grid gap-8 border-b border-[var(--border)] py-16 sm:py-20 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-8">
        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
            Things I have explored and built
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Projects
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[var(--muted)] sm:text-2xl">
            A collection of experiments, applications and ideas
            developed through learning and exploration.
          </p>
        </div>

        <div className="max-w-lg text-sm leading-7 text-[var(--muted)]">
          From AI and computer vision to web development, these
          projects reflect different areas of technology I have
          explored and the problems I have worked on.
        </div>
      </section>

      <div>
        {projectGroups.map((group, groupIndex) => (
          <section
            key={group.title}
            className="grid gap-6 border-b border-[var(--border)] py-10 lg:grid-cols-[220px_1fr] lg:gap-12"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                {String(groupIndex + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight">
                {group.title}
              </h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--muted)]">
                {group.description}
              </p>
            </div>

            <div className="border-t border-[var(--border)]">
              {group.projects.map((project, projectIndex) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={projectIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="grid gap-6 border-b border-[var(--border)] py-10 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
            In progress
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Ongoing work
          </h2>
        </div>

        <article className="border-t border-[var(--border)] py-6">
          <p className="text-xs text-[var(--muted)]">
            PRIVATE · IN PROGRESS
          </p>
          <h3 className="mt-1 text-lg font-semibold">
            Catch A Ride
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            A carpooling application exploring ride discovery,
            ride management and passenger requests. Currently
            under development.
          </p>
        </article>
      </section>

      <footer className="flex flex-col gap-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Amaan Shah K.</p>
        <Link href="/contact" className="hover:text-[var(--accent)]">
          Get in touch →
        </Link>
      </footer>
    </main>
  );
}
