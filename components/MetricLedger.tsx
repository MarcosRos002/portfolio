import type { Metric } from "@/lib/projects";

/**
 * MetricLedger — measured numbers in the ledger (mono) voice, each carrying the
 * caveat that keeps it honest. No gradients, no vanity counters: a senior reader
 * trusts a number with its measurement context attached.
 */
export function MetricLedger({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 border border-[var(--rule)] md:grid-cols-4">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`p-4 ${i % 2 === 0 ? "border-r" : ""} border-b border-[var(--rule)] md:border-b-0 ${
            i < metrics.length - 1 ? "md:border-r" : ""
          }`}
        >
          <dt className="label">{m.label}</dt>
          <dd className="mono mt-2 text-[1.7rem] font-medium leading-none text-ink">
            {m.value}
          </dd>
          <dd className="mono mt-2 text-[0.66rem] leading-snug text-muted">
            {m.note}
          </dd>
        </div>
      ))}
    </dl>
  );
}
