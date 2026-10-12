import { IconArrowUpRight, IconPencil } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { TransitionLink } from "@/components/ui/transition-link";
import type { WritingItem } from "@/lib/writing";
import {
    PlatformChips,
    WritingCover,
    WritingLink,
    WritingTitle,
    formatWritingDate,
} from "@/components/writing/writing-entry";

// One list, each article once. The home page shows the latest engineering
// posts; everything else, including opinion pieces, is on /blog.
export default function Writing({ items }: { items: WritingItem[] }) {
    if (items.length === 0) return null;

    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconPencil className={headingIconClass} />}>
                Writing
            </SectionHeading>

            <ul className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {items.map((item, idx) => (
                    <BlurFade key={item.key} delay={0.05 + idx * 0.05}>
                        <li className="flex h-full flex-col gap-2">
                            <WritingLink
                                item={item}
                                className="group flex items-start gap-4 sm:flex-col sm:items-stretch sm:gap-3"
                            >
                                {item.cover && (
                                    <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted sm:w-full">
                                        <WritingCover item={item} sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 33vw" />
                                    </div>
                                )}
                                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                    <WritingTitle item={item} className="text-base font-semibold tracking-tight text-primary sm:text-lg" />
                                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                                </div>
                            </WritingLink>
                            <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pl-28 text-xs text-muted-foreground sm:pl-0">
                                <time className="tabular-nums">{formatWritingDate(item.date)}</time>
                                <PlatformChips item={item} />
                            </div>
                        </li>
                    </BlurFade>
                ))}
            </ul>

            <div className="mt-8 flex justify-center">
                <TransitionLink
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    Read all posts
                    <IconArrowUpRight className="h-4 w-4" />
                </TransitionLink>
            </div>
        </div>
    );
}
