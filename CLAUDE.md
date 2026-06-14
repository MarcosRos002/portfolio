# CLAUDE.md — portfolio (AI Engineer Portfolio website)

This is the **best entry point** for a fresh Claude Code session in this repo. Read it first.

## What this repo is

`portfolio` is the **personal website** of Marcos Rostan (AI Engineer / LLM Engineer, Buenos Aires, Argentina). It is a **case-study hub, NOT a blog**. It exhibits three open-source projects and presents Marcos's profile for job applications.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + MDX**, deployed on **Vercel (Hobby / free tier)**.

The site's job: for each of the three projects, present a **case study that LEADS with production metrics** (precision/recall, P50/P95 latency, cost/request), then the architecture diagram, ADR highlights, failure modes, and links to the live demo + repo. Plus a clean hero, an about section, skills, CV downloads (ES/EN), and links to GitHub / LinkedIn / email.

## Role in the program

This is the website that **exhibits** the three engineering projects. It is the public-facing "front door" of the AI Engineer Portfolio Program — the place recruiters land.

## Sibling repos (part of a 4-repo program)
- claims-auditor (flagship): https://github.com/MarcosRos002/claims-auditor
- agent-lens (eval/observability): https://github.com/MarcosRos002/agent-lens
- fine-tune-lab (LoRA/distillation): https://github.com/MarcosRos002/fine-tune-lab
- portfolio (website): https://github.com/MarcosRos002/portfolio

Relationship: claims-auditor is measured by agent-lens, fed a cheap model by fine-tune-lab, and exhibited in portfolio.

## Stack

- **Next.js 15** (App Router, RSC) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** for styling
- **MDX** for case-study content (`next-mdx-remote` planned — see `lib/mdx.ts`)
- **Vercel Hobby** for deployment (free tier; zero-config Next.js builds)

## How to run

> Dependencies are **NOT installed yet** (Phase 0 scaffolded files manually, no `npm install` was run). First clone needs:

```bash
npm install      # install deps from package.json (not yet run)
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build
npm run lint     # next lint
```

## Content model (the content contract)

Case studies are MDX files in `content/case-studies/*.mdx` with typed frontmatter. The schema (title, slug, tagline, repo, demoUrl, stack[], metrics{}, status) is documented in **`docs/content-model.md`** and mirrored as typed metadata in **`lib/projects.ts`**. Always keep those two in sync.

## Where things are

```
app/                 # App Router pages (layout, home, dynamic case-study route)
components/           # Hero, ProjectCard, MetricsTable, Nav, Footer (stubs in Phase 0)
content/case-studies/ # claims-auditor.mdx, agent-lens.mdx, fine-tune-lab.mdx
lib/projects.ts      # typed project metadata (single source of truth for the home page)
lib/mdx.ts           # MDX loading helpers (stub)
docs/                # architecture, content-model, orchestration, ADRs, handoff
public/              # CVs + og-image go here later (see docs/context/handoff.md)
```

## Pointers to docs

- `docs/architecture.md` — page structure, routing, MDX content pipeline, Vercel deployment.
- `docs/content-model.md` — the case-study frontmatter schema (the content contract).
- `docs/adr/0001-stack-and-scope.md` — why Next.js App Router + TS + Tailwind + MDX + Vercel, and when NOT to use this.
- `docs/orchestration.md` — which pages/sections can be built in parallel (worktrees).
- `docs/context/handoff.md` — current phase + next steps. **Read this to know what to do next.**

## Conventions

- Contract-first: the content model in `docs/content-model.md` is the contract; `lib/projects.ts` and the MDX frontmatter must conform.
- Docs are context infrastructure — keep them current as the site evolves.
- 100% free-tier (Vercel Hobby). No paid services.

## Status

**Phase 0 complete** — structure + docs + content model + project metadata + minimal valid stubs. UI is intentionally minimal. Next: implement layout + hero, then the 3 case-study pages from MDX. See `docs/context/handoff.md`.
