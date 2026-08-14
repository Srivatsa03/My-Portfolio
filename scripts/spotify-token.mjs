// One-time helper to get your Spotify refresh token — runs locally, secrets
// never leave your machine.
//
// 1. In your Spotify app (developer.spotify.com/dashboard) add this Redirect URI:
//      http://127.0.0.1:8888/callback
// 2. Run:
//      SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-token.mjs
// 3. A browser opens; log in and approve. The refresh token prints in your terminal.
// 4. Paste it into .env.local as SPOTIFY_REFRESH_TOKEN (plus the id/secret).

import http from "node:http";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\nMissing credentials. Run:\n" +
      "  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-token.mjs\n"
  );
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/callback")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Waiting for the Spotify redirect...");
    return;
  }

  const code = new URL(req.url, REDIRECT_URI).searchParams.get("code");
  if (!code) {
    res.end("No authorization code received.");
    return;
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
  });

  const data = await tokenRes.json();

  if (data.refresh_token) {
    console.log(
      "\n✅  SPOTIFY_REFRESH_TOKEN:\n\n" +
        data.refresh_token +
        "\n\nAdd this (and your id/secret) to .env.local, then restart npm run dev.\n"
    );
    res.end("Success. Check your terminal for the refresh token; you can close this tab.");
  } else {
    console.error("\nError from Spotify:", data, "\n");
    res.end("Error: " + JSON.stringify(data));
  }

  setTimeout(() => {
    server.close();
    process.exit(0);
  }, 500);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\nOpening the Spotify authorization page...\nIf it doesn't open, paste this URL into your browser:\n\n${authUrl}\n`);
  exec(`open "${authUrl}"`);
});
