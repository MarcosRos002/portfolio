import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Editorial serif (the human voice) + ledger monospace (the machine voice).
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  axes: ["opsz", "SOFT"],
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marcosrostan.dev"),
  title: "Marcos Rostan — AI Engineer",
  description:
    "AI Engineer building reliable, observable, cost-controlled agentic systems. A 4-repo case file: a multimodal medical-billing audit agent, its eval/observability instrument, and the cheap model that feeds it.",
  openGraph: {
    title: "Marcos Rostan — AI Engineer",
    description:
      "A case file on shipping AI systems that are accountable for what they claim.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
