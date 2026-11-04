
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="grid gap-3 border-b border-[var(--border)] py-6 sm:grid-cols-[minmax(180px,0.8fr)_1.5fr_auto] sm:items-center sm:gap-8">
      <div>
        <p className="text-xs text-[var(--muted)]">
          {String(index + 1).padStart(2, "0")} / {project.status}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {project.name}
        </h3>
      </div>

      <div>
        <p className="text-sm leading-6 text-[var(--muted)]">
          {project.description}
        </p>

        <p className="mt-2 text-xs text-[var(--muted)]">
          {project.technologies}
        </p>
      </div>

      <div className="text-sm font-medium">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            Source ↗
          </a>
        ) : (
          <span className="text-[var(--muted)]">—</span>
        )}
      </div>
    </article>
  );
}
