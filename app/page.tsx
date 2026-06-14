import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

// Home page: hero + overview of the three exhibited projects (stub).
// TODO (Phase 1): add About, Skills, and CV-download sections.
export default function HomePage() {
  return (
    <div>
      <Hero />

      <section id="projects" style={{ padding: "2rem" }}>
        <h2>Projects</h2>
        <p>
          Three production-grade open-source projects. Each case study leads
          with metrics, then architecture, decisions, and failure modes.
        </p>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
              <Link href={`/case-studies/${project.slug}`}>
                Read the case study →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
