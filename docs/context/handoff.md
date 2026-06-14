# Handoff — context for the next session

## Status: Phase 0 complete

Scaffolded the full structure, real docs, the content model, typed project
metadata, case-study MDX outlines, and minimal valid Next.js stubs. **No
`pnpm install` was run** and no UI was built beyond placeholder stubs. The value of
Phase 0 is **context-readiness**: a fresh Claude Code session can open this repo
and have everything it needs to build the site.

## What exists

- `CLAUDE.md` — best entry point (what/why/how-to-run/pointers).
- `README.md` — recruiter-facing brief.
- Config: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`,
  `postcss.config.mjs`, `next-env.d.ts`.
- `app/` — `layout.tsx`, `page.tsx`, `case-studies/[slug]/page.tsx`, `globals.css`.
- `components/` — `Hero`, `ProjectCard`, `MetricsTable`, `Nav`, `Footer` (stubs).
- `lib/projects.ts` — typed metadata for the 3 projects (real content; placeholder
  metrics). `lib/mdx.ts` — typed stub.
- `content/case-studies/*.mdx` — real outlines with correct frontmatter.
- `docs/` — `architecture.md`, `content-model.md`, `adr/0001-stack-and-scope.md`,
  `orchestration.md`, this handoff.

## Next steps (Phase 1)

1. `pnpm install` to pull deps from `package.json` (none installed yet). This
   creates `pnpm-lock.yaml` on first run — no lockfile is committed yet.
   **Use pnpm only — never npm/npx** (the project pins `pnpm@9.15.0` via the
   `packageManager` field; see `.npmrc` for pnpm settings).
2. Implement **layout + hero** (real styling with Tailwind), then `Nav`/`Footer`.
3. Implement the **3 case-study pages from MDX**: wire `lib/mdx.ts` with
   `gray-matter` + `next-mdx-remote`, render metrics first then the MDX body.
4. Add **About + Skills** sections to the home page (profile content from CLAUDE.md
   / CVs).
5. **Fill metrics** in `lib/projects.ts` and the MDX frontmatter as each project
   (claims-auditor, agent-lens, fine-tune-lab) produces real numbers from
   `agent-lens` eval runs.
6. **Copy CVs into `public/`**: `/home/main/Desktop/Portfolio/*.pdf` →
   `public/cv-es.pdf` and `public/cv-en.pdf`; wire download links in the footer.
   Add `public/og-image.png` and a favicon.
7. Deploy to **Vercel Hobby**; set the live URL in `README.md`.

## Watch-outs

- Keep `lib/projects.ts`, the MDX frontmatter, and `docs/content-model.md` in sync;
  `slug` is the join key across all three.
- See `docs/orchestration.md` for what can be built in parallel.
