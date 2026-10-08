import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { renderMarkdown, extractHeadings, type Heading } from "@/lib/blog";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export interface ProjectLink {
  label: string;
  href: string;
}

/** One stage of the "How it works" pipeline diagram. */
export interface ProjectStage {
  name: string;
  detail: string;
}

/** One measured result, with where the number comes from. */
export interface ProjectResult {
  value: string;
  label: string;
  source: string;
}

export type ProjectCategory = "Open source" | "Industry" | "Research" | "Coursework" | "Personal";

export interface Project {
  slug: string;
  title: string;
  /** One sentence shown under the title and on cards. */
  tagline: string;
  category: ProjectCategory;
  /** Shown on the card next to the dates, e.g. "Industry, TransUnion". */
  context?: string;
  role: string;
  dates: string;
  status: string;
  order: number;
  featured: boolean;
  /** Drafts are written but never built into the site. */
  draft: boolean;
  cover?: string;
  stack: string[];
  links: ProjectLink[];
  flow: ProjectStage[];
  results: ProjectResult[];
  content: string;
  headings: Heading[];
}

function readProject(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    tagline: data.tagline ?? "",
    category: data.category ?? "Open source",
    context: data.context,
    role: data.role ?? "",
    dates: data.dates ?? "",
    status: data.status ?? "",
    order: data.order ?? 99,
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    cover: data.cover,
    stack: data.stack ?? [],
    links: data.links ?? [],
    flow: data.flow ?? [],
    results: data.results ?? [],
    content,
    headings: extractHeadings(content),
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readProject)
    .filter((p) => !p.draft)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(PROJECTS_DIR, file))) return null;
  const project = readProject(file);
  return project.draft ? null : project;
}

/**
 * Splits the body at the <!-- flow --> and <!-- results --> markers so the
 * page can drop the diagram and the results table in where the prose refers
 * to them. Each part is rendered to HTML separately.
 */
export async function renderProjectBody(content: string) {
  const parts = content.split(/<!--\s*(flow|results)\s*-->/);
  const out: { kind: "html" | "flow" | "results"; html?: string }[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      out.push({ kind: parts[i] as "flow" | "results" });
    } else if (parts[i].trim()) {
      out.push({ kind: "html", html: await renderMarkdown(parts[i]) });
    }
  }
  return out;
}
