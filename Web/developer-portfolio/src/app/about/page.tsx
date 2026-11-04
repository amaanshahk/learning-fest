
import Link from "next/link";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="w-full">
        <section className="grid gap-8 border-b border-[var(--border)] py-16 sm:py-20 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:gap-8">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              A little about me
            </p>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
              Beyond the code.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[var(--muted)] sm:text-2xl">
              I&apos;m Amaan Shah K., a technology enthusiast interested
              in exploring different fields, learning continuously
              and building things.
            </p>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
            My interests span software development, artificial
            intelligence and practical problem-solving. I enjoy
            understanding how things work and applying what I learn
            through projects.
          </p>
        </section>

        <section className="grid gap-6 border-b border-[var(--border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-[var(--accent)]">01</p>
            <h2 className="mt-2 text-xl font-semibold">Education</h2>
          </div>

          <div className="border-t border-[var(--border)]">
            <article className="border-b border-[var(--border)] py-6">
              <p className="text-xs text-[var(--muted)]">2026 – PRESENT</p>
              <h3 className="mt-1 text-lg font-semibold">Master of Computer Applications</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">College of Engineering Trivandrum</p>
            </article>

            <article className="border-b border-[var(--border)] py-6">
              <p className="text-xs text-[var(--muted)]">2021 – 2024</p>
              <h3 className="mt-1 text-lg font-semibold">Bachelor of Computer Applications</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Kodiyeri Balakrishnan Memorial Government College,
                Thalassery · Kannur University
              </p>
              <p className="mt-2 text-xs text-[var(--muted)]">81.05%</p>
            </article>
          </div>
        </section>

        <section className="grid gap-6 border-b border-[var(--border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-[var(--accent)]">02</p>
            <h2 className="mt-2 text-xl font-semibold">Leadership & involvement</h2>
          </div>

          <div className="border-t border-[var(--border)]">
            {[
              { role: "AI Club President", period: "June 2023 – May 2024" },
              { role: "AI Club Secretary", period: "June 2021 – May 2022" },
              { role: "Electoral Literacy Club Student Ambassador", period: "June 2022 – May 2024" },
              { role: "College Website Management Team", period: "December 2021 – May 2024" },
              { role: "VIJÑĀNA Tech Fest Coordinator", period: "2023 & 2024" },
            ].map((item) => (
              <article key={item.role} className="flex flex-col gap-1 border-b border-[var(--border)] py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <h3 className="font-medium">{item.role}</h3>
                <p className="text-sm text-[var(--muted)]">{item.period}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-b border-[var(--border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-medium tracking-widest text-[var(--accent)]">03</p>
            <h2 className="mt-2 text-xl font-semibold">Recognition</h2>
          </div>

          <div className="border-t border-[var(--border)]">
            <article className="border-b border-[var(--border)] py-6">
              <h3 className="font-semibold">3rd Place – UI/UX Hackathon</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Kerala Knowledge Economy Mission & GTech MuLearn · August 2023
              </p>
            </article>
            <article className="border-b border-[var(--border)] py-6">
              <h3 className="font-semibold">2nd Place – University-level Table Tennis</h3>
            </article>
            <article className="border-b border-[var(--border)] py-6">
              <h3 className="font-semibold">Best Volunteer of the Year</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">School recognition</p>
            </article>
          </div>
        </section>

        <section className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">
            Always learning, experimenting and building.
          </p>
          <Link href="/contact" className="text-sm font-medium hover:text-[var(--accent)]">
            Get in touch →
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
