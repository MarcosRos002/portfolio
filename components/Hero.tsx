import { Exhibit } from "./Exhibit";

/**
 * Hero as thesis. Left: the claim Marcos makes about his own work. Right: the
 * signature exhibit — proof shown, not asserted. The pun is the point: an
 * engineer accountable for what his systems claim, demonstrated on a medical
 * "claim".
 */
export function Hero() {
  return (
    <section className="border-b border-[var(--rule)]">
      <div className="mx-auto grid max-w-dossier gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:py-24">
        {/* thesis */}
        <div>
          <p className="label">Case file — applied AI engineering</p>
          <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.02] tracking-tight md:text-[3.6rem]">
            I build AI systems that are{" "}
            <span className="italic">accountable</span> for every claim they
            make.
          </h1>
          <p className="mt-6 max-w-xl text-[1.06rem] text-ink/85">
            Most of what I&apos;ve shipped is behind NDAs. So I rebuilt the hard
            parts in the open: a four-repo case file on shipping agents that are{" "}
            <span className="mono text-[0.95em]">reliable</span>,{" "}
            <span className="mono text-[0.95em]">observable</span>, and{" "}
            <span className="mono text-[0.95em]">cost-controlled</span> — not a
            demo that works once.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#work" className="ink-link mono text-[0.84rem] font-medium">
              Read the case file ↓
            </a>
            <a
              href="https://github.com/MarcosRos002"
              className="ink-link mono text-[0.84rem] text-muted"
            >
              GitHub ↗
            </a>
            <a href="#profile" className="ink-link mono text-[0.84rem] text-muted">
              Profile ↓
            </a>
          </div>
        </div>

        {/* signature exhibit */}
        <div className="md:pl-4">
          <Exhibit />
        </div>
      </div>
    </section>
  );
}
