import type { Project } from "@/lib/projects";

// ProjectCard.tsx — summary card for one project on the home page (stub).
// TODO (Phase 1): styled card with metric highlights and stack chips.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <div style={{ border: "1px solid #333", padding: "1rem", margin: "1rem 0" }}>
      <h3>
        {project.name}
        {project.flagship ? " (flagship)" : ""} — {project.status}
      </h3>
      <p>{project.tagline}</p>
      <p>{project.stack.join(" · ")}</p>
    </div>
  );
}
