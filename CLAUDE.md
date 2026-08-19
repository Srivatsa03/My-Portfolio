# My-Portfolio — standing rules for anyone (human or Claude) editing this repo

Personal portfolio of **Srivatsa Kamballa**. Next.js 15 (App Router), React 19, TypeScript,
Tailwind v4. Deployed on **Vercel** at `https://srivatsa-kamballa.vercel.app`; production branch
is `main` and a push to `main` auto-deploys. The retired `srivatsa03.github.io/My-Portfolio` URL
now redirects here via the `gh-pages` branch (redirect stub only — do not build the app there).

## Where content lives
- `src/data/data.tsx` — the content hub: `projects`, `openSource`, `tools`, `contact`, `nav`.
- `src/content/blog/*.md` — blog posts (gray-matter frontmatter + Markdown).
- `src/components/home/*` — section components (hero, dashboard, projects, open-source, experience,
  terminal, writing). Match the existing file and object shapes when editing.

## HARD RULES (never break)
- **No fabrication.** Every project, tool, PR, metric, or claim must trace to a **real, PUBLIC**
  repo / merged PR / release. Public + verifiable only.
- **Never publish** client-confidential material (e.g. TransUnion, CCC), unreleased/WIP work, or any
  secrets/keys. If unsure whether something is public, leave it out.
- **No em dashes** (— or ---) anywhere. US English.
- **Real metrics only** — no invented numbers.
- Match the existing patterns (object shapes in `data.tsx`, blog frontmatter, image keying).

## Build gate (this bit silently staled the live site once)
`next build` — which Vercel and CI both run — **fails on ANY ESLint error**, and a failed build
deploys nothing (the live site silently keeps the last good build). So:
- Always run `npm run lint` **and** `npm run build` before pushing to `main`.
- `tsc --noEmit` alone is NOT enough — it misses ESLint errors (unused vars, unused catch bindings).

## Authorship
Commit as **Srivatsa Kamballa `<skamb10@uic.edu>`**. Never add a `Co-Authored-By` trailer or any
mention of Claude / Anthropic in commits, code, or config.

## Automated refresh
A cloud routine runs every 3 days, reads only Srivatsa's **public** GitHub activity, and opens a
**draft** `Portfolio refresh <date>` PR — it never auto-publishes. Review and merge to go live.
Do not create a second such routine.
