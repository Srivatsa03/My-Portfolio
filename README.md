<div align="center">

# Srivatsa Kamballa — Portfolio

A modern, animated personal portfolio built with **Next.js 15**, **React 19**,
**TypeScript**, and **Tailwind CSS**, with live Spotify, WakaTime, and GitHub
integrations and a Markdown-powered blog.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue?style=for-the-badge)](./LICENSE)

</div>

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables (optional)

The live dashboard widgets fall back to placeholder data until you add keys.
Copy `.env.example` to `.env.local` and fill in the ones you want:

- **WakaTime** — `WAKATIME_API_KEY` for the coding-hours counter.
- **Spotify** — `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` for the last-played track.
- **GitHub** — `GITHUB_TOKEN`, `GITHUB_USERNAME`, optional `GITHUB_REPO` for the contributions heatmap.

## Editing content

Most of the site reads from `src/data/data.tsx`. Blog posts live in
`src/content/blog/` as Markdown. Images are in `public/` and `src/images/`.

## Deploy

Deploy on any Node host that supports Next.js (for example Vercel). The API
routes under `src/app/api/` need a server runtime, so a static-only host will
not run the live widgets.

## License

The source code is licensed under the Apache License 2.0. See [`LICENSE`](./LICENSE)
and [`NOTICE`](./NOTICE).
