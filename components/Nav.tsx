import Link from "next/link";

// Nav.tsx — top navigation (stub).
// TODO (Phase 1): responsive nav, active states.
export function Nav() {
  return (
    <nav style={{ padding: "1rem 2rem", borderBottom: "1px solid #333" }}>
      <Link href="/">Marcos Rostan</Link>
      {" · "}
      <Link href="/#projects">Projects</Link>
    </nav>
  );
}
