import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// TODO (Phase 1): add Open Graph image (public/og-image.png) and refine metadata.
export const metadata: Metadata = {
  title: "Marcos Rostan — AI Engineer",
  description:
    "AI Engineer / LLM Engineer. Case studies of production agentic systems, RAG pipelines, and LLM automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
