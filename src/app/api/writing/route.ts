import { NextResponse } from "next/server";

// Pulls Srivatsa's published posts from Dev.to (JSON API) and Medium (RSS),
// normalizes them, dedupes by CANONICAL url (so a piece cross-posted to both
// shows once, pointing at the author-designated original), newest first.
// Cached for an hour so we are not hammering either source.
export const revalidate = 3600;

const DEVTO_USER = "srivatsa_kamballa";
const MEDIUM_FEED = "https://medium.com/feed/@srivatsakamballa.sk";

type Post = {
  title: string;
  url: string; // the canonical / original link
  date: string; // ISO
  cover: string | null;
  platform: "Medium" | "Dev.to";
  description: string;
  readingMinutes: number | null;
};

// intermediate shape carrying the source url so we can prefer the native copy
type Raw = Post & { canonical: string; sourceUrl: string };

interface DevtoArticle {
  title: string;
  url: string;
  canonical_url: string | null;
  published_at: string;
  cover_image: string | null;
  social_image: string | null;
  description: string;
  reading_time_minutes: number | null;
}

function platformOf(url: string): "Medium" | "Dev.to" {
  return /medium\.com/.test(url) ? "Medium" : "Dev.to";
}

function canonKey(url: string): string {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .trim();
}

async function fetchDevto(): Promise<Raw[]> {
  try {
    const r = await fetch(
      `https://dev.to/api/articles?username=${DEVTO_USER}&per_page=30`,
      { next: { revalidate: 3600 } },
    );
    if (!r.ok) return [];
    const arts = (await r.json()) as DevtoArticle[];
    return arts.map((a) => {
      const canonical = a.canonical_url || a.url;
      return {
        title: a.title,
        url: canonical,
        date: a.published_at,
        cover: a.cover_image || a.social_image || null,
        platform: platformOf(canonical),
        description: a.description || "",
        readingMinutes: a.reading_time_minutes ?? null,
        canonical,
        sourceUrl: a.url,
      };
    });
  } catch {
    return [];
  }
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
}

async function fetchMedium(): Promise<Raw[]> {
  try {
    const r = await fetch(MEDIUM_FEED, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const xml = await r.text();
    const items = xml.split("<item>").slice(1);
    const posts: Raw[] = [];
    for (const chunk of items) {
      const item = chunk.split("</item>")[0];
      const title = decodeXml(tag(item, "title"));
      const link = decodeXml(tag(item, "link")).split("?")[0];
      const pub = tag(item, "pubDate");
      const content = tag(item, "content:encoded");
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      const cover = imgMatch ? imgMatch[1] : null;
      const description = stripTags(decodeXml(content)).slice(0, 160);
      if (!title || !link) continue;
      posts.push({
        title,
        url: link,
        date: pub ? new Date(pub).toISOString() : "",
        cover,
        platform: "Medium",
        description,
        readingMinutes: null,
        canonical: link,
        sourceUrl: link,
      });
    }
    return posts;
  } catch {
    return [];
  }
}

export async function GET() {
  const [devto, medium] = await Promise.all([fetchDevto(), fetchMedium()]);
  const all = [...devto, ...medium].filter((p) => p.date);
  all.sort((a, b) => (a.date < b.date ? 1 : -1));

  // Dedupe by canonical url; when a piece exists on both platforms, keep the
  // native copy (the one whose own url IS the canonical) so the card links to
  // the author-designated original.
  const byCanon = new Map<string, Raw>();
  for (const p of all) {
    const key = canonKey(p.canonical);
    const existing = byCanon.get(key);
    const isNative = canonKey(p.sourceUrl) === key;
    const existingNative = existing
      ? canonKey(existing.sourceUrl) === key
      : false;
    if (!existing || (isNative && !existingNative)) byCanon.set(key, p);
  }

  const posts: Post[] = [...byCanon.values()]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ title, url, date, cover, platform, description, readingMinutes }) => ({
      title,
      url,
      date,
      cover,
      platform,
      description,
      readingMinutes,
    }));

  return NextResponse.json({ posts });
}
