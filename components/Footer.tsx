/**
 * Colophon — the dossier's "filed by" block. Contact coordinates, CV in both
 * languages, and an honest note on materials. The colophon is editorial closure,
 * not a sitemap.
 */
export function Footer() {
  return (
    <footer id="contact" className="border-t-2 border-ink">
      <div className="mx-auto max-w-dossier px-5 py-14 md:px-8">
        <p className="label">Filed by</p>
        <h2 className="mt-3 font-serif text-[1.8rem] tracking-tight">
          Marcos Rostan — AI Engineer, Buenos Aires
        </h2>
        <p className="mt-3 max-w-2xl text-ink/80">
          Open to AI / LLM Engineer roles (SSR–SR). The fastest way to evaluate
          me is to read the code — it&apos;s all linked above.
        </p>

        <div className="mt-8 grid gap-6 border-t border-[var(--rule)] pt-6 sm:grid-cols-3">
          <div>
            <p className="label">Contact</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href="mailto:rostanmarcos@gmail.com" className="ink-link mono text-[0.84rem]">
                  rostanmarcos@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/MarcosRos002" className="ink-link mono text-[0.84rem]">
                  github.com/MarcosRos002 ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/marcosrostan"
                  className="ink-link mono text-[0.84rem]"
                >
                  linkedin.com/in/marcosrostan ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label">Résumé</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a href="/cv-rostan-en.pdf" className="ink-link mono text-[0.84rem]">
                  CV — English (PDF)
                </a>
              </li>
              <li>
                <a href="/cv-rostan-es.pdf" className="ink-link mono text-[0.84rem]">
                  CV — Español (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label">Colophon</p>
            <p className="mono mt-3 text-[0.72rem] leading-relaxed text-muted">
              Set in Fraunces &amp; IBM&nbsp;Plex&nbsp;Mono. Built with Next.js,
              deployed on Vercel. All claims data is synthetic — no real patient
              information, ever.
            </p>
          </div>
        </div>

        <p className="mono mt-10 text-[0.7rem] text-muted">
          © {new Date().getFullYear()} Marcos Rostan · this site is itself part
          of the case file —{" "}
          <a
            href="https://github.com/MarcosRos002/portfolio"
            className="ink-link"
          >
            source
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
