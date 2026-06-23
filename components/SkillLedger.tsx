/**
 * SkillLedger — the completeness proof. Every AI-Engineer concept mapped to the
 * exact module that implements it. Dense and checkable on purpose: it answers
 * "does he actually cover the surface?" with file paths, not adjectives.
 */
const ROWS: { concept: string; where: string; repo: string }[] = [
  { concept: "Agentic harness", where: "core/harness — loop, retries, structured output", repo: "claims-auditor" },
  { concept: "MCP server", where: "modules/rules — rules engine as MCP tools", repo: "claims-auditor" },
  { concept: "Hybrid RAG", where: "modules/rag — BM25 + pgvector + RRF + rerank", repo: "claims-auditor" },
  { concept: "Cost routing", where: "routing — Haiku → Sonnet by confidence", repo: "claims-auditor" },
  { concept: "Multimodal / ASR", where: "modules/asr — faster-whisper → transcript → claim", repo: "claims-auditor" },
  { concept: "Guardrails", where: "guardrails — PII redaction + injection defense", repo: "claims-auditor" },
  { concept: "Trace eval + LLM-judge", where: "eval — heuristics + self-consistent judge", repo: "agent-lens" },
  { concept: "Causal analysis", where: "analysis — root-cause over the step tree", repo: "agent-lens" },
  { concept: "CI eval-gates", where: "ci — regression gate on GitHub Actions", repo: "agent-lens" },
  { concept: "Observability", where: "dashboards — Prometheus + Grafana", repo: "agent-lens" },
  { concept: "Fine-tuning (LoRA)", where: "train — PEFT sequence classifier", repo: "fine-tune-lab" },
  { concept: "Distillation + cost eval", where: "eval — accuracy vs cost vs latency", repo: "fine-tune-lab" },
];

export function SkillLedger() {
  return (
    <div className="border border-[var(--rule)]">
      <div className="grid grid-cols-[1fr_1.6fr_auto] gap-x-4 border-b border-[var(--rule)] bg-panel/60 px-4 py-2">
        <span className="label">Concept</span>
        <span className="label hidden sm:block">Implementation</span>
        <span className="label text-right">Repo</span>
      </div>
      {ROWS.map((r) => (
        <div
          key={r.concept}
          className="ledger-row grid grid-cols-[1fr_1.6fr_auto] items-baseline gap-x-4 px-4 py-2.5"
        >
          <span className="text-[0.92rem] font-medium">{r.concept}</span>
          <span className="mono hidden text-[0.74rem] text-muted sm:block">
            {r.where}
          </span>
          <span className="mono text-right text-[0.72rem] text-verified">
            {r.repo}
          </span>
        </div>
      ))}
    </div>
  );
}
