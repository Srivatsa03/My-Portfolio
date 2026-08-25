import { NextResponse } from "next/server";

// Pulls Srivatsa's published posts from Dev.to (JSON API) and Medium (RSS),
// normalizes them, dedupes across platforms, and returns newest-first.
// Cached for an hour so we are not hammering either source.
export const revalidate = 3600;

const DEVTO_USER = "srivatsa_kamballa";
const MEDIUM_FEED = "https://medium.com/feed/@srivatsakamballa.sk";

type Post = {
  title: string;
  url: string;
  date: string; // ISO
  cover: string | null;
  platform: "Medium" | "Dev.to";
  description: string;
  readingMinutes: number | null;
};

interface DevtoArticle {
  title: string;
  url: string;
  published_at: string;
  cover_image: string | null;
  social_image: string | null;
  description: string;
  reading_time_minutes: number | null;
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

async function fetchDevto(): Promise<Post[]> {
  try {
    const r = await fetch(
      `https://dev.to/api/articles?username=${DEVTO_USER}&per_page=30`,
      { next: { revalidate: 3600 } },
    );
    if (!r.ok) return [];
    const arts = (await r.json()) as DevtoArticle[];
    return arts.map((a) => ({
      title: a.title,
      url: a.url,
      date: a.published_at,
      cover: a.cover_image || a.social_image || null,
      platform: "Dev.to" as const,
      description: a.description || "",
      readingMinutes: a.reading_time_minutes ?? null,
    }));
  } catch {
    return [];
  }
}

function match(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1] : "";
}

async function fetchMedium(): Promise<Post[]> {
  try {
    const r = await fetch(MEDIUM_FEED, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const xml = await r.text();
    const items = xml.split("<item>").slice(1);
    const posts: Post[] = [];
    for (const raw of items) {
      const item = raw.split("</item>")[0];
      const title = decodeXml(match(item, "title"));
      const link = decodeXml(match(item, "link")).split("?")[0];
      const pub = match(item, "pubDate");
      const content = match(item, "content:encoded");
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
      });
    }
    return posts;
  } catch {
    return [];
  }
}

function normKey(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
}

export async function GET() {
  const [devto, medium] = await Promise.all([fetchDevto(), fetchMedium()]);
  const all = [...devto, ...medium].filter((p) => p.date);
  all.sort((a, b) => (a.date < b.date ? 1 : -1));
  const seen = new Set<string>();
  const posts = all.filter((p) => {
    const k = normKey(p.title);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return NextResponse.json({ posts });
}
