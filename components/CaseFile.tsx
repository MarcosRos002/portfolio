import { MetricLedger } from "./MetricLedger";
import type { Project } from "@/lib/projects";

/**
 * CaseFile — one project as a dossier entry. The flagship gets the full,
 * prominent treatment (problem + numbered engineering + metric ledger); the
 * supporting exhibits render in a denser, lighter form. Deliberately NOT three
 * identical cards: the hierarchy is the argument.
 */
export function CaseFile({ project }: { project: Project }) {
  if (project.flagship) return <FlagshipEntry project={project} />;
  return <SupportingEntry project={project} />;
}

function ExhibitTab({ project }: { project: Project }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="label text-flag">Exhibit {project.exhibit}</span>
      <span className="label text-muted">{project.status}</span>
    </div>
  );
}

function StackRow({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <li key={s} className="tag">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <a href={project.repo} className="ink-link mono text-[0.82rem] font-medium">
        Source ↗
      </a>
      {project.demoUrl ? (
        <a href={project.demoUrl} className="ink-link mono text-[0.82rem]">
          Live demo ↗
        </a>
      ) : (
        <span className="mono text-[0.82rem] text-muted">demo — soon</span>
      )}
      <a
        href={`/case-studies/${project.slug}`}
        className="ink-link mono text-[0.82rem] text-muted"
      >
        Case study →
      </a>
    </div>
  );
}

function FlagshipEntry({ project }: { project: Project }) {
  return (
    <article className="border-t-2 border-ink pt-8">
      <ExhibitTab project={project} />
      <div className="mt-4 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <div>
          <h3 className="font-serif text-[2rem] leading-[1.05] tracking-tight md:text-[2.4rem]">
            {project.name}
            {project.codename ? (
              <span className="text-muted"> — {project.codename}</span>
            ) : null}
          </h3>
          <p className="mt-4 font-serif text-[1.2rem] italic leading-snug text-ink/90">
            {project.tagline}
          </p>
          <p className="label mt-4">{project.role}</p>
          <p className="mt-5 text-ink/85">{project.problem}</p>
          <div className="mt-6">
            <StackRow stack={project.stack} />
          </div>
          <div className="mt-7">
            <Links project={project} />
          </div>
        </div>

        <div>
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
        </div>
      </div>

      <div className="mt-9">
        <MetricLedger metrics={project.metrics} />
      </div>
    </article>
  );
}

function SupportingEntry({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col border-t border-[var(--rule)] pt-6">
      <ExhibitTab project={project} />
      <h3 className="mt-3 font-serif text-[1.5rem] leading-tight tracking-tight">
        {project.name}
      </h3>
      <p className="mt-3 font-serif text-[1.02rem] italic leading-snug text-ink/85">
        {project.tagline}
      </p>
      <p className="mt-4 text-[0.94rem] text-ink/80">{project.problem}</p>

      <ul className="mt-5 space-y-2 border-l border-[var(--rule)] pl-4">
        {project.metrics.map((m) => (
          <li key={m.label} className="flex items-baseline justify-between gap-3">
            <span className="label normal-case text-muted">{m.label}</span>
            <span className="mono text-[0.92rem] font-medium text-ink">
              {m.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <StackRow stack={project.stack} />
      </div>
      <div className="mt-auto pt-6">
        <Links project={project} />
      </div>
    </article>
  );
}
