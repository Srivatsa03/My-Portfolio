import Image from "next/image";
import type { ProjectMedia as Media } from "@/lib/projects";

// Screenshots, demo GIFs and charts taken from the project's own repo, each
// with a caption saying what it shows. Unoptimized so GIFs keep animating.
export function ProjectMedia({ items }: { items: Media[] }) {
  if (items.length === 0) return null;
  return (
    <div className="not-prose my-8 space-y-8">
      {items.map((m) => (
        <figure key={m.src}>
          <div className="overflow-hidden rounded-lg border border-border/60 bg-white">
            <Image
              src={m.src}
              alt={m.alt}
              width={1600}
              height={1000}
              unoptimized
              sizes="(max-width: 768px) 100vw, 680px"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
