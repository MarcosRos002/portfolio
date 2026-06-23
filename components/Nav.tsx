import Link from "next/link";

/** File header — the dossier's top binding. Quiet, mono, hairline-anchored. */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-dossier items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-[1.15rem] font-semibold tracking-tight">
            Marcos Rostan
          </span>
          <span className="label hidden sm:inline">AI Engineer</span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/#work" className="label hover:text-ink">
            Work
          </Link>
          <Link href="/#coverage" className="label hidden hover:text-ink sm:inline">
            Coverage
          </Link>
          <Link href="/#profile" className="label hover:text-ink">
            Profile
          </Link>
          <a
            href="https://github.com/MarcosRos002"
            className="label text-ink underline decoration-flag decoration-2 underline-offset-4"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
