import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { TransitionLink } from "@/components/ui/transition-link";
import type { WritingItem } from "@/lib/writing";

const PLATFORM_ICON = { Medium: "/blog/medium.svg", "Dev.to": "/blog/devto.svg" } as const;

export function formatWritingDate(iso: string) {
  // UTC, so a post dated "2026-07-02" doesn't render as Jul 1 west of Greenwich.
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Chips linking to each copy of the article on Medium and Dev.to. */
export function PlatformChips({ item }: { item: WritingItem }) {
  if (item.links.length === 0) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {item.links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Read on ${l.platform}`}
          className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[11px] font-semibold text-black transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image src={PLATFORM_ICON[l.platform]} alt="" width={12} height={12} className="h-3 w-3" />
          {l.platform}
        </a>
      ))}
    </span>
  );
}

/** The cover, title and summary, linking to the post (on-site or the original copy). */
export function WritingLink({
  item,
  className,
  children,
}: {
  item: WritingItem;
  className?: string;
  children: React.ReactNode;
}) {
  if (item.internal) {
    return (
      <TransitionLink href={item.href} className={className}>
        {children}
      </TransitionLink>
    );
  }
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function WritingCover({ item, sizes }: { item: WritingItem; sizes: string }) {
  if (!item.cover) return null;
  return (
    <Image
      src={item.cover}
      alt={item.coverAlt}
      fill
      unoptimized={!item.internal}
      sizes={sizes}
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );
}

export function WritingTitle({ item, className }: { item: WritingItem; className?: string }) {
  return (
    <h3 className={className}>
      <span className="pb-1 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {item.title}
      </span>
      <IconArrowUpRight className="ml-1 inline-block h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </h3>
  );
}
