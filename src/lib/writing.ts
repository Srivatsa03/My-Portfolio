import { getAllPosts } from "@/lib/blog";

// One list of everything Srivatsa has written: posts hosted on this site plus
// Dev.to and Medium. Each article appears once. Copies of the same article on
// both platforms collapse into one entry with both links, and an external copy
// of a post that lives on this site folds into that post (see `crosspost` in
// the post's frontmatter).

const DEVTO_USER = "srivatsa_kamballa";
const MEDIUM_FEED = "https://medium.com/feed/@srivatsakamballa.sk";

export type Platform = "Medium" | "Dev.to";

export interface PlatformLink {
  platform: Platform;
  url: string;
}

export interface WritingItem {
  key: string;
  title: string;
  description: string;
  date: string; // ISO
  cover: string | null;
  coverAlt: string;
  readingTime: string | null;
  /** Site posts link to /blog/<slug>; external ones to their original copy. */
  href: string;
  internal: boolean;
  /** Where else the article is published. */
  links: PlatformLink[];
  /** Engineering posts lead on the home page; opinion pieces live on /blog. */
  technical: boolean;
}

interface External {
  title: string;
  url: string;
  date: string;
  cover: string | null;
  description: string;
  readingMinutes: number | null;
  platform: Platform;
  tags: string[];
  canonical: string | null;
}

const TECH_TAGS = new Set([
  "kubernetes", "devops", "sre", "site-reliability-engineer", "testing", "security",
  "rag", "rags", "llm", "mlops", "python", "software-engineering", "privacy",
]);

function titleKey(t: string): string {
  return t.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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

interface DevtoArticle {
  title: string;
  url: string;
  published_at: string;
  cover_image: string | null;
  social_image: string | null;
  description: string;
  reading_time_minutes: number | null;
  tag_list: string[];
  canonical_url: string | null;
}

async function fetchDevto(): Promise<External[]> {
  try {
    const r = await fetch(`https://dev.to/api/articles?username=${DEVTO_USER}&per_page=30`, {
      next: { revalidate: 3600 },
    });
    if (!r.ok) return [];
    const arts = (await r.json()) as DevtoArticle[];
    return arts.map((a) => ({
      title: a.title,
      url: a.url,
      date: a.published_at,
      cover: a.cover_image || a.social_image || null,
      description: a.description || "",
      readingMinutes: a.reading_time_minutes ?? null,
      platform: "Dev.to" as const,
      tags: a.tag_list ?? [],
      canonical: a.canonical_url && !a.canonical_url.includes("dev.to") ? a.canonical_url : null,
    }));
  } catch {
    return [];
  }
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1] : "";
}

async function fetchMedium(): Promise<External[]> {
  try {
    const r = await fetch(MEDIUM_FEED, { next: { revalidate: 3600 } });
    if (!r.ok) return [];
    const xml = await r.text();
    const out: External[] = [];
    for (const chunk of xml.split("<item>").slice(1)) {
      const item = chunk.split("</item>")[0];
      const title = decodeXml(tag(item, "title"));
      const link = decodeXml(tag(item, "link")).split("?")[0];
      const pub = tag(item, "pubDate");
      const content = tag(item, "content:encoded");
      const img = content.match(/<img[^>]+src="([^"]+)"/);
      const cats = [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decodeXml(m[1]));
      if (!title || !link || !pub) continue;
      out.push({
        title,
        url: link,
        date: new Date(pub).toISOString(),
        cover: img ? img[1] : null,
        description: stripTags(decodeXml(content)).slice(0, 180),
        readingMinutes: null,
        platform: "Medium",
        tags: cats,
        canonical: null,
      });
    }
    return out;
  } catch {
    return [];
  }
}

function isTechnical(tags: string[]): boolean {
  const t = tags.map((x) => x.toLowerCase());
  return !t.includes("opinion") && t.some((x) => TECH_TAGS.has(x));
}

export async function getWriting(): Promise<WritingItem[]> {
  const [devto, medium] = await Promise.all([fetchDevto(), fetchMedium()]);

  // Group cross-posts: same title, or a Dev.to copy whose canonical is the Medium one.
  const groups = new Map<string, External[]>();
  for (const e of [...medium, ...devto]) {
    const canonical = e.canonical?.split("?")[0];
    const canonicalMatch = canonical ? medium.find((m) => m.url === canonical) : undefined;
    const key = titleKey(canonicalMatch ? canonicalMatch.title : e.title);
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }

  const items: WritingItem[] = [];

  // Site posts first, absorbing any external copy they declare.
  for (const post of getAllPosts()) {
    const links: PlatformLink[] = [];
    if (post.crosspost) {
      for (const [key, copies] of groups) {
        if (copies.some((c) => c.url.includes(post.crosspost!))) {
          links.push(...copies.map((c) => ({ platform: c.platform, url: c.url })));
          groups.delete(key);
        }
      }
    }
    items.push({
      key: `site:${post.slug}`,
      title: post.title,
      description: post.description,
      date: new Date(post.date).toISOString(),
      cover: post.image ?? null,
      coverAlt: post.imageAlt ?? post.title,
      readingTime: post.readingTime,
      href: `/blog/${post.slug}`,
      internal: true,
      links,
      technical: true,
    });
  }

  for (const [key, copies] of groups) {
    // The original is the earliest copy; it supplies the link and the cover.
    const sorted = [...copies].sort((a, b) => (a.date < b.date ? -1 : 1));
    const first = sorted[0];
    const withCover = sorted.find((c) => c.cover) ?? first;
    const minutes = sorted.find((c) => c.readingMinutes)?.readingMinutes ?? null;
    items.push({
      key: `ext:${key}`,
      title: first.title,
      description: first.description || withCover.description,
      date: first.date,
      cover: withCover.cover,
      coverAlt: first.title,
      readingTime: minutes ? `${minutes} min read` : null,
      href: first.url,
      internal: false,
      links: sorted.map((c) => ({ platform: c.platform, url: c.url })),
      technical: isTechnical(sorted.flatMap((c) => c.tags)),
    });
  }

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}
