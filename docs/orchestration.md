# Orchestration — parallelizable build work

The site decomposes into mostly-independent pieces. Each can be built in its own
git worktree / by a separate agent, then merged. The shared contracts that keep
them compatible are `lib/projects.ts` and `docs/content-model.md` — agree on those
first, then fan out.

## Shared contract (do first, single owner)

- `lib/projects.ts` typed metadata + `docs/content-model.md` frontmatter schema.
  Everything else depends on these. Freeze the shapes before parallel work starts.

## Parallel tracks

| Track | Files | Depends on | Notes |
| --- | --- | --- | --- |
| Layout + Hero + Nav/Footer | `app/layout.tsx`, `components/Hero.tsx`, `Nav.tsx`, `Footer.tsx`, `app/globals.css` | contract | Global chrome + styling system. |
| Home page | `app/page.tsx`, `components/ProjectCard.tsx` | contract, layout | Reads `projects` from `lib/projects.ts`. |
| Case-study rendering | `app/case-studies/[slug]/page.tsx`, `components/MetricsTable.tsx`, `lib/mdx.ts` | contract | Wire `next-mdx-remote`; render metrics then MDX body. |
| Case study: claims-auditor | `content/case-studies/claims-auditor.mdx` | content-model | Content authoring (flagship). |
| Case study: agent-lens | `content/case-studies/agent-lens.mdx` | content-model | Content authoring. |
| Case study: fine-tune-lab | `content/case-studies/fine-tune-lab.mdx` | content-model | Content authoring. |
| CV / assets | `public/cv-es.pdf`, `public/cv-en.pdf`, `public/og-image.png` | — | Copy CVs from `/home/main/Desktop/Portfolio/*.pdf`; add OG image. |
| About + Skills sections | `app/page.tsx` (sections) | layout | Profile content; can land independently. |

## Suggested worktrees

```bash
git worktree add ../portfolio-layout    -b feat/layout
git worktree add ../portfolio-casestudy -b feat/case-study-rendering
git worktree add ../portfolio-content   -b feat/case-study-content
```

## Merge order

1. Contract (already in `main` from Phase 0).
2. Layout + global styles.
3. Home page + case-study rendering (consume the contract).
4. MDX content (independent; can land any time after the contract).
5. Assets (CVs, OG image) — independent.
