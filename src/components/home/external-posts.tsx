"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { BlurFade } from "@/components/ui/blur-fade";

interface ExternalPost {
  title: string;
  url: string;
  date: string;
  cover: string | null;
  platform: "Medium" | "Dev.to";
  description: string;
  readingMinutes: number | null;
}

const PLATFORM_ICON: Record<string, string> = {
  Medium: "/blog/medium.svg",
  "Dev.to": "/blog/devto.svg",
};

export function ExternalPosts() {
  const [posts, setPosts] = useState<ExternalPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/writing")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setPosts(d.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-10">
      <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        Also published on Medium &amp; Dev.to
      </p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 6).map((post, idx) => {
          const date = post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";
          return (
            <BlurFade key={post.url} delay={0.05 + idx * 0.04}>
              <li className="h-full">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-background transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {post.cover && (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}
                    <span
                      title={post.platform}
                      className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-black shadow-sm"
                    >
                      <Image
                        src={PLATFORM_ICON[post.platform]}
                        alt={post.platform}
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5"
                      />
                      {post.platform}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                    <h4 className="text-sm font-semibold leading-snug tracking-tight text-primary line-clamp-2">
                      {post.title}
                      <IconArrowUpRight className="ml-1 inline-block h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </h4>
                    {post.description && (
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <time className="mt-auto pt-1 text-[11px] tabular-nums text-muted-foreground">
                      {date}
                      {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""}
                    </time>
                  </div>
                </a>
              </li>
            </BlurFade>
          );
        })}
      </ul>
    </div>
  );
}
