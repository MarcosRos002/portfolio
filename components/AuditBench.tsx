"use client";

import { useMemo, useState } from "react";
import { auditClaim } from "@/lib/audit/engine";
import { EXAMPLES } from "@/lib/audit/examples";
import type { Claim, ClaimLine, Finding } from "@/lib/audit/types";

const blankLine = (): ClaimLine => ({
  cptCode: "",
  icd10Codes: [],
  units: 1,
  chargeCents: 0,
});

export function AuditBench() {
  const [activeKey, setActiveKey] = useState(EXAMPLES[0].key);
  const [claim, setClaim] = useState<Claim>(structuredClone(EXAMPLES[0].claim));

  const result = useMemo(() => auditClaim(claim), [claim]);
  const findingsByLine = useMemo(() => groupByLine(result.findings), [result]);

  function load(key: string) {
    const ex = EXAMPLES.find((e) => e.key === key)!;
    setActiveKey(key);
    setClaim(structuredClone(ex.claim));
  }

  function patchLine(idx: number, patch: Partial<ClaimLine>) {
    setActiveKey("custom");
    setClaim((c) => ({
      ...c,
      lines: c.lines.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    }));
  }

  function addLine() {
    setActiveKey("custom");
    setClaim((c) => ({ ...c, lines: [...c.lines, blankLine()] }));
  }

  function removeLine(idx: number) {
    setActiveKey("custom");
    setClaim((c) => ({ ...c, lines: c.lines.filter((_, i) => i !== idx) }));
  }

  return (
    <div className="exhibit rounded-[2px] p-5 md:p-7">
      {/* preset selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="label mr-1">Load a claim</span>
        {EXAMPLES.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => load(e.key)}
            title={e.hint}
            className={`mono rounded-[2px] border px-2.5 py-1 text-[0.72rem] transition-colors ${
              activeKey === e.key
                ? "border-ink bg-ink text-paper"
                : "border-[var(--rule)] text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {e.label}
          </button>
        ))}
        {activeKey === "custom" && (
          <span className="mono text-[0.68rem] text-muted">· edited</span>
        )}
      </div>

      <div className="mt-6 grid gap-7 md:grid-cols-[1.15fr_1fr]">
        {/* editable claim ledger */}
        <div>
          <div className="flex items-center justify-between">
            <span className="label text-ink">Claim — line items</span>
            <button
              type="button"
              onClick={addLine}
              className="mono text-[0.7rem] text-muted hover:text-ink"
            >
              + add line
            </button>
          </div>

          <div className="mono mt-3 text-[0.8rem]">
            <div className="grid grid-cols-[1.6rem_4.5rem_1fr_3rem_1.2rem] items-center gap-x-2 text-[0.6rem] uppercase tracking-label text-muted">
              <span>Ln</span>
              <span>CPT</span>
              <span>Diagnoses (ICD-10)</span>
              <span>Units</span>
              <span />
            </div>

            {claim.lines.map((line, idx) => {
              const flagged = (findingsByLine.get(idx) ?? []).some((f) => f.category !== null);
              return (
                <div
                  key={idx}
                  className="ledger-row grid grid-cols-[1.6rem_4.5rem_1fr_3rem_1.2rem] items-center gap-x-2 py-2"
                >
                  <span className={flagged ? "text-flag" : "text-muted"}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <input
                    aria-label={`Line ${idx + 1} CPT code`}
                    value={line.cptCode}
                    onChange={(e) => patchLine(idx, { cptCode: e.target.value.trim() })}
                    className={`cell ${flagged ? "text-flag" : ""}`}
                  />
                  <input
                    aria-label={`Line ${idx + 1} diagnoses`}
                    value={line.icd10Codes.join(", ")}
                    onChange={(e) => patchLine(idx, { icd10Codes: parseIcd(e.target.value) })}
                    className="cell"
                  />
                  <input
                    aria-label={`Line ${idx + 1} units`}
                    type="number"
                    min={1}
                    value={line.units}
                    onChange={(e) =>
                      patchLine(idx, { units: Math.max(1, Number(e.target.value) || 1) })
                    }
                    className="cell text-center"
                  />
                  <button
                    type="button"
                    onClick={() => removeLine(idx)}
                    aria-label={`Remove line ${idx + 1}`}
                    className="text-[0.9rem] text-muted hover:text-flag"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            {claim.lines.length === 0 && (
              <p className="mono mt-3 text-[0.72rem] text-muted">No lines — add one to audit.</p>
            )}
          </div>
          <p className="mono mt-3 text-[0.64rem] leading-relaxed text-muted">
            Try it: change <span className="text-ink">99214</span> to{" "}
            <span className="text-ink">99213</span>, or point a code at a diagnosis
            that doesn&apos;t support it — the audit re-runs as you type.
          </p>
        </div>

        {/* live verdict */}
        <div className="md:border-l md:border-[var(--rule)] md:pl-7">
          <div className="flex items-center justify-between">
            <span className="label text-ink">Verdict</span>
            {result.flagged ? (
              <span className="stamp text-flag">
                Flagged · {result.findings.filter((f) => f.category).length}
              </span>
            ) : (
              <span className="stamp text-verified">Verified clean</span>
            )}
          </div>

          <div className="mt-4 space-y-3">
            {result.findings.length === 0 && (
              <p className="text-[0.92rem] text-muted">
                No inconsistencies. Every line is supported, within limits, and unique.
              </p>
            )}
            {result.findings.map((f, i) => (
              <FindingCard key={i} finding={f} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-[#e3e0d3] pt-3">
        <p className="mono text-[0.64rem] leading-relaxed text-muted">
          Veritas <span className="text-ink">demo-mode</span> — the deterministic
          rules engine + the $0 demo classifier, running in your browser. The full
          agent (hybrid RAG over ICD-10/CPT + the two-pass Claude classifier) runs
          in the{" "}
          <a
            href="https://github.com/MarcosRos002/claims-auditor"
            className="ink-link text-ink"
          >
            claims-auditor repo ↗
          </a>
          .
        </p>
      </div>

      <style jsx>{`
        .cell {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--rule);
          font: inherit;
          color: inherit;
          padding: 1px 0;
          outline: none;
        }
        .cell:focus {
          border-bottom-color: #c03a24;
        }
      `}</style>
    </div>
  );
}

function FindingCard({ finding }: { finding: Finding }) {
  const isNote = finding.category === null;
  return (
    <div className={`border-l-2 pl-3 ${isNote ? "border-muted" : "border-flag"}`}>
      <p className="mono text-[0.73rem] leading-relaxed text-ink">
        <span className={`font-semibold ${isNote ? "text-muted" : "text-flag"}`}>
          {isNote ? "NOTE" : labelFor(finding.category!)} ·
        </span>{" "}
        <span className="text-muted">line {finding.lineIndex + 1}</span> — {finding.why}
      </p>
      {finding.citations.length > 0 && (
        <p className="mono mt-1 text-[0.62rem] leading-snug text-muted">
          cited: {finding.citations.join(" · ")}
          {finding.ruleId ? ` · ${finding.ruleId}` : " · demo classifier"}
        </p>
      )}
    </div>
  );
}

const LABELS: Record<string, string> = {
  upcoding: "UPCODING",
  cpt_icd_mismatch: "CPT/ICD MISMATCH",
  unit_excess: "UNIT EXCESS",
  duplicate_line: "DUPLICATE LINE",
};
const labelFor = (c: string) => LABELS[c] ?? c.toUpperCase();

function parseIcd(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

function groupByLine(findings: Finding[]): Map<number, Finding[]> {
  const m = new Map<number, Finding[]>();
  for (const f of findings) {
    const arr = m.get(f.lineIndex) ?? [];
    arr.push(f);
    m.set(f.lineIndex, arr);
  }
  return m;
}
