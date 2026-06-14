# Architecture — portfolio site

## Purpose

A **case-study hub** (not a blog) that exhibits three open-source projects and
presents Marcos Rostan's AI Engineer profile for job applications. Each case
study **leads with production metrics**, then architecture, ADR highlights,
failure modes, and links to the live demo + repo.

## Stack

- **Next.js 15 (App Router, React Server Components)** + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS**
- **MDX** for case-study content (`next-mdx-remote`, `gray-matter`)
- **Vercel Hobby** (free) for hosting

## Page structure / routing

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home: hero + projects overview (later: about, skills, CV downloads). |
| `/case-studies/[slug]` | `app/case-studies/[slug]/page.tsx` | One case study per project; statically generated via `generateStaticParams`. |
| (layout) | `app/layout.tsx` | Root layout: `<Nav />`, `<main>`, `<Footer />`, global metadata. |

Components live in `components/`: `Hero`, `ProjectCard`, `MetricsTable`, `Nav`,
`Footer`. In Phase 0 they are minimal valid stubs.

## Content pipeline (MDX → case-study pages)

1. Project metadata lives in `lib/projects.ts` (typed, single source of truth for
   the home page and the metrics shown at the top of each case study).
2. Long-form case-study content lives in `content/case-studies/<slug>.mdx` with
   frontmatter conforming to the **content contract** (`docs/content-model.md`).
3. `lib/mdx.ts` (stub in Phase 0) loads an MDX file, splits frontmatter from body
   with `gray-matter`, and returns `{ frontmatter, content }`.
4. The dynamic route renders the metrics from metadata first, then the MDX body
   via `next-mdx-remote` (wired up in Phase 1).

The `slug` is the join key: it must match across `lib/projects.ts`, the MDX
filename, and the MDX frontmatter.

## Live-demo links / embeds

Each project has a `demoUrl` (currently `null`). When a demo is deployed, set
`demoUrl` in both `lib/projects.ts` and the MDX frontmatter. Case-study pages link
out to the demo; lightweight iframe embeds can be added later for projects that
have a hosted UI.

## Deployment (Vercel, free)

- Connect the GitHub repo to a Vercel project; Next.js is zero-config on Vercel.
- `npm run build` is what Vercel runs; output is served from the Hobby tier.
- No environment variables required for the static/SSG content in Phase 0/1.
- Custom domain optional; the default `*.vercel.app` URL works for the live link.

> Dependencies are not installed yet. `npm install` is required on first checkout
> before `npm run dev` / `npm run build` will work.
