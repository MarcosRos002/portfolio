import type { Config } from "tailwindcss";

/**
 * Design system — "The Audit Dossier".
 * Two voices: an editorial serif (Fraunces) and a ledger monospace (IBM Plex
 * Mono). Archival paper, audit-ink text, and two SEMANTIC accents only —
 * `flag` (the auditor's red pen) and `verified` (clean/green). Never decorative.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F2F1EB", // cool archival off-white (not warm cream)
        panel: "#E7E5DB", // ledger band / panel tint
        ink: "#15181B", // audit ink, blue-black
        muted: "#5E625C", // desaturated olive-gray, secondary text + hairlines
        flag: "#C03A24", // vermilion — discrepancy ONLY
        verified: "#0F6B53", // deep green — verified / clean ONLY
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        dossier: "78rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
