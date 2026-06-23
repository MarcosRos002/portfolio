/**
 * lib/mdx.ts — MDX loading helpers for case studies. (STUB — Phase 0)
 *
 * Planned implementation: read an MDX file from content/case-studies/<slug>.mdx,
 * split frontmatter from body with gray-matter, validate the frontmatter against
 * the content contract (docs/content-model.md), and return { frontmatter, content }
 * so the dynamic route can render it with next-mdx-remote.
 *
 * Kept as a typed stub so the app compiles without MDX deps wired up. Case
 * studies currently render from the typed metadata in lib/projects.ts, so no MDX
 * runtime is installed. If MDX bodies are added later, use next-mdx-remote >= 6
 * (v5 has a critical RCE advisory that Vercel blocks at deploy time) + gray-matter.
 */

import type { Metric, ProjectStatus } from "./projects";

/** Frontmatter shape — must match docs/content-model.md. */
export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  tagline: string;
  repo: string;
  demoUrl: string | null;
  stack: string[];
  metrics: Metric[];
  status: ProjectStatus;
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  /** Raw MDX body (parsing/serialization handled by the route in a later phase). */
  content: string;
}

/**
 * TODO (Phase 1): load and parse the MDX file for a slug.
 * For now returns null so callers can fall back to lib/projects.ts metadata.
 */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // TODO: implement with fs + gray-matter once deps are installed.
  void slug;
  return null;
}
