import { notFound } from "next/navigation";
import { MetricsTable } from "@/components/MetricsTable";
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/lib/projects";

// Pre-render a static page per project at build time.
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// Dynamic case-study page (stub).
// TODO (Phase 1): load the MDX body via lib/mdx.ts and render it with
// next-mdx-remote below the metrics. For now we render the typed metadata
// from lib/projects.ts so the route is valid end-to-end.
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article style={{ padding: "2rem" }}>
      <h1>
        {project.name}
        {project.codename ? ` — ${project.codename}` : ""}
      </h1>
      <p>{project.tagline}</p>

      {/* Metrics lead the case study. */}
      <MetricsTable metrics={project.metrics} />

      <p>{project.summary}</p>

      <p>
        <a href={project.repo}>Source code</a>
        {project.demoUrl ? (
          <>
            {" · "}
            <a href={project.demoUrl}>Live demo</a>
          </>
        ) : null}
      </p>

      {/* TODO: render MDX body (problem, approach, architecture, ADRs, failure modes). */}
    </article>
  );
}
