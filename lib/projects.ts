/**
 * lib/projects.ts — single source of truth for the exhibited work.
 *
 * Typed metadata driving the home dossier and the case-study pages. Metrics here
 * are REAL (measured in each repo's test/eval suite), with honest notes about
 * what they were measured on (synthetic data, CPU smoke, etc.). Update as the
 * projects ship — see docs/context/handoff.md.
 */

export type ProjectStatus = "building" | "shipped" | "planned";

/** A single measured headline number, with the context that keeps it honest. */
export interface Metric {
  label: string;
  value: string;
  /** What it was measured on — the caveat a senior reader will look for. */
  note: string;
}

export interface Project {
  /** Stable URL slug; matches the MDX filename in content/case-studies/. */
  slug: string;
  name: string;
  codename?: string;
  /** Exhibit marker on the home dossier (the projects genuinely are exhibits). */
  exhibit: string;
  /** One-line value proposition. */
  tagline: string;
  /** Its role in the 4-repo program. */
  role: string;
  /** The problem, in the reader's terms. */
  problem: string;
  /** The engineering — what was actually built, in specifics. */
  approach: string[];
  repo: string;
  demoUrl: string | null;
  stack: string[];
  /** Measured headline metrics. */
  metrics: Metric[];
  status: ProjectStatus;
  flagship?: boolean;
}

export const projects: Project[] = [
  {
    slug: "claims-auditor",
    name: "claims-auditor",
    codename: "Veritas",
    exhibit: "A",
    tagline:
      "A multimodal agent that audits medical-billing claims and flags the improper ones — with cited reasons.",
    role: "Flagship. Measured by agent-lens, fed a cheap model by fine-tune-lab.",
    problem:
      "Improper medical-billing claims — upcoding, unit excess, code mismatches — are caught today by slow manual review. The hard part isn't calling an LLM. It's doing it reliably, cheaply, and with evidence an auditor can trust.",
    approach: [
      "Multimodal intake: a spoken dictation is transcribed (faster-whisper), the claim is extracted from the transcript, then audited — the same pipeline serves structured claims.",
      "Hybrid RAG over ICD-10/CPT: BM25 + pgvector dense retrieval fused with RRF, then a cross-encoder rerank — every flag is grounded in cited reference text.",
      "Two-pass cost routing: a cheap Haiku pass handles the easy calls and escalates only low-confidence claims to Sonnet, keeping cost-per-claim low.",
      "A deterministic rules engine exposed as an MCP server, an agentic harness with retries and structured outputs, and PII-redaction + prompt-injection guardrails on a read-only path.",
    ],
    repo: "https://github.com/MarcosRos002/claims-auditor",
    demoUrl: null,
    stack: [
      "Python",
      "Claude Haiku / Sonnet",
      "Agentic harness",
      "MCP",
      "pgvector + BM25",
      "faster-whisper",
      "FastAPI",
      "Docker",
    ],
    metrics: [
      { label: "Rules precision", value: "0.997", note: "on 1,000 synthetic claims" },
      { label: "Rules recall", value: "1.000", note: "on 1,000 synthetic claims" },
      { label: "Cost / claim", value: "$0.0015", note: "Haiku cheap pass, measured live" },
      { label: "Test suite", value: "106", note: "passing · offline + online-verified" },
    ],
    status: "building",
    flagship: true,
  },
  {
    slug: "agent-lens",
    name: "agent-lens",
    exhibit: "B",
    tagline:
      "Evaluation + observability for agents — the instrument that makes the flagship's metrics real.",
    role: "Owns the canonical TraceEvent schema that claims-auditor emits.",
    problem:
      "An agent you can't measure is an agent you can't trust in production. Quality, cost, and latency have to be quantified — and a regression should fail a build, not a customer.",
    approach: [
      "Trace-level eval: heuristic checks plus an LLM-as-judge with self-consistency (median over samples), recording the model for reproducibility.",
      "Causal root-cause analysis that walks the step tree to the originating failure, not the symptom.",
      "Cost / latency metrics (P50/P95), a Prometheus exporter + Grafana dashboard, and Langfuse / LangSmith exporters.",
      "A CI eval-gate that blocks merges on regression — direction-aware, per-metric tolerance — running green on GitHub Actions.",
    ],
    repo: "https://github.com/MarcosRos002/agent-lens",
    demoUrl: null,
    stack: [
      "Python",
      "OpenTelemetry-friendly schema",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
      "Langfuse / LangSmith",
    ],
    metrics: [
      { label: "Eval-gate CI", value: "green", note: "blocks merges on injected regression" },
      { label: "Test suite", value: "54", note: "passing" },
      { label: "Judge", value: "self-consistent", note: "median over N samples" },
    ],
    status: "building",
  },
  {
    slug: "fine-tune-lab",
    name: "fine-tune-lab",
    exhibit: "C",
    tagline:
      "LoRA + distillation that turns an expensive Claude call into a cheap, fast, self-hosted classifier.",
    role: "Produces the cheap model that can serve the flagship's classification pass.",
    problem:
      "Frontier models are the right teacher and the wrong thing to run in a hot loop. Once the task shape is stable, a small specialized model should serve it — at a fraction of the cost and latency.",
    approach: [
      "The mature progression Prompt → RAG → Fine-tune → Distill, with the senior framing: fine-tune for behavior and format, not for facts.",
      "Sequence-classification LoRA via PEFT on a small encoder, trained on synthetic claim-classification data from teacher labels.",
      "A before/after table that reports accuracy alongside cost and latency — cost accounting as a first-class output.",
      "Reproducible on a free GPU (Colab T4) — no paid hardware required.",
    ],
    repo: "https://github.com/MarcosRos002/fine-tune-lab",
    demoUrl: null,
    stack: ["Python", "PyTorch", "PEFT / LoRA", "DistilBERT", "scikit-learn", "Colab T4"],
    metrics: [
      { label: "Cheaper / 1k req", value: "~29×", note: "self-hosted vLLM vs frontier API" },
      { label: "Faster (p50)", value: "~165×", note: "latency vs API baseline" },
      { label: "Accuracy", value: "1.00", note: "LoRA DistilBERT, synthetic set" },
    ],
    status: "building",
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
