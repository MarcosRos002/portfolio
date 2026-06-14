/**
 * lib/projects.ts — single source of truth for the three exhibited projects.
 *
 * This typed metadata drives the home page (ProjectCard list) and the
 * case-study pages. The shape here MUST conform to the content contract in
 * `docs/content-model.md` and match the frontmatter of the corresponding
 * MDX files in `content/case-studies/`.
 *
 * Metrics are placeholders ("TBD") until each project produces real numbers.
 * Replace them as the projects ship — see docs/context/handoff.md.
 */

export type ProjectStatus = "in progress" | "shipped" | "planned";

/** Headline production metrics shown at the top of each case study. */
export interface ProjectMetrics {
  /** e.g. "0.0" or "TBD" — model/agent precision on the eval set. */
  precision: string;
  /** e.g. "0.0" or "TBD" — recall on the eval set. */
  recall: string;
  /** Median latency, human-readable, e.g. "1.2s" or "TBD". */
  latencyP50: string;
  /** 95th-percentile latency, e.g. "3.5s" or "TBD". */
  latencyP95: string;
  /** Average cost per request, e.g. "$0.004" or "TBD". */
  costPerRequest: string;
}

export interface Project {
  /** Stable URL slug; matches the MDX filename in content/case-studies/. */
  slug: string;
  /** Display name. */
  name: string;
  /** Optional codename (e.g. "Veritas"). */
  codename?: string;
  /** One-line value proposition. */
  tagline: string;
  /** Longer one-paragraph summary for the case-study intro. */
  summary: string;
  /** GitHub repository URL. */
  repo: string;
  /** Live demo URL (null until deployed). */
  demoUrl: string | null;
  /** Tech stack tags. */
  stack: string[];
  /** Headline metrics (placeholders until measured). */
  metrics: ProjectMetrics;
  /** Build status. */
  status: ProjectStatus;
  /** Whether this is the flagship project (rendered prominently). */
  flagship?: boolean;
}

const PLACEHOLDER_METRICS: ProjectMetrics = {
  precision: "TBD",
  recall: "TBD",
  latencyP50: "TBD",
  latencyP95: "TBD",
  costPerRequest: "TBD",
};

export const projects: Project[] = [
  {
    slug: "claims-auditor",
    name: "claims-auditor",
    codename: "Veritas",
    tagline: "Multimodal medical-billing audit agent that flags improper claims.",
    summary:
      "Veritas is an agentic system that audits medical-billing claims across structured records and unstructured documents (PDFs, images), reasons over coding/coverage rules, and produces explainable flags with citations. Designed for high recall on improper claims while keeping cost-per-claim low via model routing.",
    repo: "https://github.com/MarcosRos002/claims-auditor",
    demoUrl: null,
    stack: [
      "Python",
      "Claude Agent SDK",
      "LangGraph",
      "MCP",
      "pgvector RAG",
      "FastAPI",
      "Docker",
    ],
    metrics: { ...PLACEHOLDER_METRICS },
    status: "in progress",
    flagship: true,
  },
  {
    slug: "agent-lens",
    name: "agent-lens",
    tagline: "Evaluation + observability for LLM agents.",
    summary:
      "agent-lens measures agent quality and behavior: offline eval suites (precision/recall, task success), online tracing, latency/cost dashboards, and regression gates. It is the instrument that quantifies claims-auditor's production metrics.",
    repo: "https://github.com/MarcosRos002/agent-lens",
    demoUrl: null,
    stack: [
      "Python",
      "LangSmith",
      "Prometheus",
      "Grafana",
      "FastAPI",
      "Docker",
    ],
    metrics: { ...PLACEHOLDER_METRICS },
    status: "in progress",
  },
  {
    slug: "fine-tune-lab",
    name: "fine-tune-lab",
    tagline: "LoRA/QLoRA fine-tuning and distillation for cheaper inference.",
    summary:
      "fine-tune-lab produces small, cheap, task-specialized models via LoRA/QLoRA fine-tuning and distillation from larger teachers. Its output is the inexpensive model that claims-auditor routes low-stakes calls to, cutting cost-per-request without sacrificing quality on the easy cases.",
    repo: "https://github.com/MarcosRos002/fine-tune-lab",
    demoUrl: null,
    stack: ["Python", "PyTorch", "PEFT/LoRA", "QLoRA", "Distillation", "Docker"],
    metrics: { ...PLACEHOLDER_METRICS },
    status: "in progress",
  },
];

/** Look up a single project by slug (used by the dynamic case-study route). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All slugs — for generateStaticParams in the dynamic route. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
