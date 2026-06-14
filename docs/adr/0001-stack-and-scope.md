# ADR 0001 — Stack and scope for the portfolio site

- **Status:** Accepted
- **Date:** 2026-06-14
- **Context:** Phase 0 scaffold of the `portfolio` repo.

## Context

This repo is the public-facing website of the AI Engineer Portfolio Program — a
**case-study hub** exhibiting three engineering projects and presenting Marcos
Rostan's profile to recruiters. Constraints: 100% free-tier, contract-first,
docs-as-context-infrastructure, low maintenance, recruiter-grade polish.

## Decision

Build with **Next.js 15 (App Router) + TypeScript + Tailwind CSS + MDX**, deployed
on **Vercel Hobby (free)**.

- **Next.js App Router** — file-system routing, React Server Components, static
  generation for case-study pages, first-class Vercel deployment.
- **TypeScript (strict)** — the content contract (`docs/content-model.md`) is
  encoded as types in `lib/projects.ts`, so metadata mistakes fail at build time.
- **Tailwind CSS** — fast, consistent styling without bespoke CSS sprawl.
- **MDX** (`next-mdx-remote` + `gray-matter`) — long-form case studies authored as
  content, not code, with typed frontmatter. Separates content from layout.
- **Vercel Hobby** — zero-config Next.js hosting on the free tier; default
  `*.vercel.app` URL is sufficient for the live link.
- **pnpm** as the package manager (pinned via `packageManager: pnpm@9.15.0` in
  `package.json`, with project-level `.npmrc`). Chosen for fast, disk-efficient
  installs and a strict, deterministic `node_modules`. **Project convention: pnpm
  only — never npm or npx** (use `pnpm dlx` instead of `npx`).

## Consequences

- A real build step and a Node toolchain (heavier than a static-site generator),
  justified by the dynamic case-study route, typed content model, and MDX pipeline.
- Content and metadata are decoupled and individually parallelizable (see
  `docs/orchestration.md`).
- Vendor leaning toward Vercel — acceptable given the free tier and the zero-config
  Next.js fit.

## When NOT to use this

- If the site only ever needs **one static page** with no per-project content
  pipeline, a single static HTML/CSS page (or a one-file Astro/11ty site) would be
  simpler and lighter — skip Next.js entirely.
- If there were no need for typed content / build-time validation, a plain Markdown
  static-site generator would suffice.
- If a paid backend or server-rendered, auth'd dashboards were required, the
  free-tier Hobby assumption would break and this ADR would need revisiting.
