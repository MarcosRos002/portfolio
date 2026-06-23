import { Hero } from "@/components/Hero";
import { AuditBench } from "@/components/AuditBench";
import { CaseFile } from "@/components/CaseFile";
import { SkillLedger } from "@/components/SkillLedger";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const flagship = projects.find((p) => p.flagship)!;
  const supporting = projects.filter((p) => !p.flagship);

  return (
    <div>
      <Hero />

      {/* ── Live demo ── */}
      <section id="demo" className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-dossier px-5 py-16 md:px-8 md:py-24">
          <header className="max-w-2xl">
            <p className="label">Live demo — runs in your browser, $0</p>
            <h2 className="mt-4 font-serif text-[2rem] tracking-tight md:text-[2.6rem]">
              Audit a claim yourself.
            </h2>
            <p className="mt-4 text-ink/85">
              Pick a claim or edit one, and watch Veritas flag the inconsistencies
              with cited reasons — the same deterministic logic that scores{" "}
              <span className="mono text-[0.95em]">P&nbsp;0.997 / R&nbsp;1.000</span>{" "}
              in the repo, recomputing as you type.
            </p>
          </header>
          <div className="mt-10">
            <AuditBench />
          </div>
        </div>
      </section>

      {/* ── The work ── */}
      <section id="work" className="mx-auto max-w-dossier px-5 py-16 md:px-8 md:py-24">
        <header className="max-w-2xl">
          <p className="label">The work — four repositories, one system</p>
          <h2 className="mt-4 font-serif text-[2rem] tracking-tight md:text-[2.6rem]">
            One domain, audited end to end.
          </h2>
          <p className="mt-4 text-ink/85">
            The projects aren&apos;t a portfolio of unrelated demos. They&apos;re
            one production system, taken apart so each engineering concern can be
            read on its own.
          </p>
          <p className="mono mt-5 text-[0.78rem] text-muted">
            claims-auditor{" "}
            <span className="text-flag">— measured by →</span> agent-lens{" "}
            <span className="text-flag">— fed a cheap model by →</span>{" "}
            fine-tune-lab
          </p>
        </header>

        <div className="mt-12">
          <CaseFile project={flagship} />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {supporting.map((p) => (
            <CaseFile key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* ── Coverage ── */}
      <section id="coverage" className="border-t border-[var(--rule)] bg-panel/30">
        <div className="mx-auto max-w-dossier px-5 py-16 md:px-8 md:py-24">
          <header className="max-w-2xl">
            <p className="label">Coverage — the surface, with receipts</p>
            <h2 className="mt-4 font-serif text-[2rem] tracking-tight md:text-[2.6rem]">
              Every concept maps to a file.
            </h2>
            <p className="mt-4 text-ink/85">
              The senior bar in 2026 isn&apos;t &quot;can you call an
              LLM?&quot;&nbsp;— it&apos;s &quot;can you ship something reliable,
              observable, and cost-controlled?&quot; Here&apos;s where each piece
              lives.
            </p>
          </header>
          <div className="mt-10">
            <SkillLedger />
          </div>
        </div>
      </section>

      {/* ── Profile ── */}
      <section id="profile" className="mx-auto max-w-dossier px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="label">Profile</p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight tracking-tight md:text-[2.4rem]">
              The work that taught me this is private. So I rebuilt it in the
              open.
            </h2>
          </div>
          <div className="md:pt-2">
            <p className="text-[1.05rem] text-ink/85">
              I&apos;m an AI Engineer in Buenos Aires. For the last few years
              I&apos;ve built production systems I can&apos;t show you: a
              Whisper-based pipeline that audits call recordings, an agent
              wielding dozens of tools with cost routing, hospital-billing
              automation under real constraints.
            </p>
            <p className="mt-4 text-[1.05rem] text-ink/85">
              This case file generalizes that experience — the same engineering,
              on synthetic data — so it can be read, run, and verified by anyone.
            </p>

            <p className="label mt-8">How I work</p>
            <ul className="mt-4 space-y-2.5">
              {[
                ["Contract-first", "interfaces and types before parallel work"],
                ["Test-driven", "red → green; online-verified, not just mocked"],
                ["Docs as infrastructure", "every module specified for the next reader"],
                ["Cost is a metric", "reported next to accuracy, never hidden"],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[auto_1fr] items-baseline gap-3">
                  <span className="mono text-[0.8rem] font-medium text-verified">
                    {k}
                  </span>
                  <span className="text-[0.95rem] text-muted">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
