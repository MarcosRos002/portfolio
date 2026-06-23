/**
 * Exhibit — the signature element. A real claim line rendered as a forensic
 * specimen: the discrepancy is underlined in audit-red (drawn on load) and a
 * margin annotation cites the rule. This IS the product, shown not told.
 */
export function Exhibit() {
  return (
    <figure className="exhibit rounded-[2px] p-5 md:p-6">
      {/* exhibit header */}
      <div className="flex items-center justify-between border-b border-[#e3e0d3] pb-3">
        <div className="flex items-baseline gap-2">
          <span className="label text-ink">Exhibit A</span>
          <span className="mono text-[0.72rem] text-muted">claim&nbsp;#0099-A</span>
        </div>
        <span className="stamp text-flag">Flagged</span>
      </div>

      {/* claim line — the ledger */}
      <div className="mono mt-4 text-[0.82rem] leading-relaxed">
        <div className="grid grid-cols-[2.2rem_1fr_1fr_auto] gap-x-3 text-[0.62rem] uppercase tracking-label text-muted">
          <span>Ln</span>
          <span>CPT</span>
          <span>Diagnosis</span>
          <span>Units</span>
        </div>
        <div className="ledger-row mt-1 grid grid-cols-[2.2rem_1fr_1fr_auto] gap-x-3 py-2">
          <span className="text-muted">01</span>
          <span>
            <span className="flagged font-medium">99214</span>
          </span>
          <span>J06.9</span>
          <span>1</span>
        </div>
        <div className="ledger-row grid grid-cols-[2.2rem_1fr_1fr_auto] gap-x-3 py-2 text-muted">
          <span>02</span>
          <span>80053</span>
          <span>E11.9</span>
          <span>1</span>
        </div>
      </div>

      {/* margin annotation — the cited reason */}
      <figcaption className="annotation mt-4 border-l-2 border-flag pl-3">
        <p className="mono text-[0.74rem] leading-relaxed text-ink">
          <span className="font-semibold text-flag">UPCODING.</span> 99214
          (moderate complexity) exceeds what J06.9 (a minor, self-limited URI)
          supports — 99213 is the defensible code.
        </p>
        <p className="mono mt-1 text-[0.66rem] text-muted">
          cited: CPT&nbsp;99214 definition · confidence 0.9 · pass&nbsp;1 (Haiku)
        </p>
      </figcaption>

      <div className="mt-4 border-t border-[#e3e0d3] pt-3">
        <span className="mono text-[0.64rem] text-muted">
          audited by veritas — rules + RAG-grounded classifier
        </span>
      </div>
    </figure>
  );
}
