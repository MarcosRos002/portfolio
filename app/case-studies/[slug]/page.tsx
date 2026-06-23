import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MetricLedger } from "@/components/MetricLedger";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.name} — Marcos Rostan`, description: project.tagline };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-dossier px-5 py-14 md:px-8 md:py-20">
      <Link href="/#work" className="ink-link mono text-[0.78rem] text-muted">
        ← Back to the case file
      </Link>

      <header className="mt-8 border-t-2 border-ink pt-6">
        <div className="flex items-baseline gap-3">
          <span className="label text-flag">Exhibit {project.exhibit}</span>
          <span className="label text-muted">{project.status}</span>
        </div>
        <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.04] tracking-tight md:text-[3.2rem]">
          {project.name}
          {project.codename ? (
            <span className="text-muted"> — {project.codename}</span>
          ) : null}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-[1.25rem] italic leading-snug text-ink/90">
          {project.tagline}
        </p>
      </header>

      {/* Metrics lead the case study. */}
      <div className="mt-10">
        <MetricLedger metrics={project.metrics} />
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.1fr]">
        <section>
          <p className="label">The problem</p>
          <p className="mt-4 text-ink/85">{project.problem}</p>
          <p className="label mt-8">Role in the program</p>
          <p className="mt-4 text-ink/85">{project.role}</p>
          <p className="label mt-8">Stack</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="label">The engineering</p>
          <ol className="mt-4 space-y-4">
            {project.approach.map((step, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr] gap-1">
                <span className="mono text-[0.78rem] text-flag">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.96rem] text-ink/85">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--rule)] pt-6">
        <a href={project.repo} className="ink-link mono text-[0.84rem] font-medium">
          Source code ↗
        </a>
        {project.demoUrl ? (
          <a href={project.demoUrl} className="ink-link mono text-[0.84rem]">
            Live demo ↗
          </a>
        ) : (
          <span className="mono text-[0.84rem] text-muted">live demo — soon</span>
        )}
      </div>
    </article>
  );
}
