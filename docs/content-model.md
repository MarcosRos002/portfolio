# Content model — the case-study contract

This is the **content contract** for the site. It is the source of truth that both
`lib/projects.ts` (typed metadata) and `content/case-studies/*.mdx` (frontmatter)
must conform to. Keep all three in sync.

## Case-study frontmatter schema

Each `content/case-studies/<slug>.mdx` file starts with YAML frontmatter:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | yes | Display title, e.g. `"claims-auditor — Veritas"`. |
| `slug` | string | yes | URL slug; **must** equal the filename and the route param. |
| `tagline` | string | yes | One-line value proposition. |
| `repo` | string (URL) | yes | GitHub repository URL. |
| `demoUrl` | string (URL) \| null | yes | Live demo URL, or `null` until deployed. |
| `stack` | string[] | yes | Tech tags shown as chips. |
| `metrics` | object | yes | Headline production metrics (see below). |
| `status` | enum | yes | `"in progress"` \| `"shipped"` \| `"planned"`. |

### `metrics` object

Strings (so placeholders like `"TBD"` are valid until real numbers exist):

| Key | Meaning |
| --- | --- |
| `precision` | Precision on the eval set. |
| `recall` | Recall on the eval set. |
| `latencyP50` | Median latency (human-readable, e.g. `"1.2s"`). |
| `latencyP95` | 95th-percentile latency. |
| `costPerRequest` | Average cost per request (e.g. `"$0.004"`). |

## Body outline (after frontmatter)

Every case study follows the same outline so they're comparable:

1. **Metrics** — lead with the numbers (also rendered from metadata at the top of the page).
2. **Problem** — what's hard and why it matters.
3. **Approach** — the solution in a paragraph.
4. **Architecture** — diagram + high-level data flow.
5. **ADR highlights** — the load-bearing decisions.
6. **Failure modes** — what breaks and the mitigations.
7. **Links** — repo, related sibling repos, live demo.

## Sync rule

`slug` joins everything. When adding or editing a project:
1. Update `lib/projects.ts` (typed metadata + metrics).
2. Update / create `content/case-studies/<slug>.mdx` with matching frontmatter.
3. The TypeScript types in `lib/projects.ts` (`Project`, `ProjectMetrics`,
   `ProjectStatus`) and `lib/mdx.ts` (`CaseStudyFrontmatter`) encode this contract.
