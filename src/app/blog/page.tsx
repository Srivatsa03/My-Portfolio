import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { IconArrowLeft } from "@tabler/icons-react";
import { getWriting } from "@/lib/writing";
import {
  PlatformChips,
  WritingCover,
  WritingLink,
  WritingTitle,
  formatWritingDate,
} from "@/components/writing/writing-entry";

export const metadata = {
  title: "Blog — Srivatsa Kamballa",
  description: "Thoughts on software engineering, projects, and more.",
};

// Medium and Dev.to are re-read at most once an hour.
export const revalidate = 3600;

export default async function BlogPage() {
  const items = await getWriting();

  return (
    <div className="relative z-10 pt-32 sm:pt-40 pb-16 px-3 sm:px-4">
      <div className="mx-auto max-w-4xl">
        <BlurFade delay={0.005} inView>
          <Link
            href="/"
            className="glass glass-hover mb-8 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Recent{" "}
            <span className="font-script font-normal text-[1.05em] leading-none align-baseline">
              writing
            </span>
            .
          </h1>
          <p className="text-muted-foreground text-lg mb-16">
            Everything I&#39;ve written, here and on Medium and Dev.to, each piece listed once.
          </p>
        </BlurFade>

        {items.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.key} className="glass glass-hover rounded-[1.75rem] p-3 sm:p-4">
                <WritingLink item={item} className="group flex items-start gap-4 sm:gap-5">
                  {item.cover && (
                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-[1.1rem] bg-foreground/5 sm:w-40">
                      <WritingCover item={item} sizes="(max-width: 640px) 96px, 160px" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 sm:pt-1">
                    <WritingTitle item={item} className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl" />
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
                  </div>
                </WritingLink>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:pl-[11.25rem]">
                  <time className="tabular-nums">{formatWritingDate(item.date)}</time>
                  {item.readingTime && (
                    <>
                      <span aria-hidden>·</span>
                      <span>{item.readingTime}</span>
                    </>
                  )}
                  {item.links.length > 0 && <PlatformChips item={item} />}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
