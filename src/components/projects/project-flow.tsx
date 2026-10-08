import type { ProjectStage } from "@/lib/projects";

// The "How it works" diagram: the system's stages in the order data moves
// through them. Numbered because the content really is a sequence.
export function ProjectFlow({ stages }: { stages: ProjectStage[] }) {
  if (stages.length === 0) return null;
  return (
    <figure className="not-prose my-8">
      <ol className="relative">
        {stages.map((stage, i) => (
          <li key={stage.name} className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-6 last:pb-0">
            {i < stages.length - 1 && (
              <span aria-hidden className="absolute left-4 top-8 bottom-0 w-px bg-border" />
            )}
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-violet-500/40 bg-background font-mono text-xs text-violet-600 dark:text-violet-300">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="font-medium leading-snug text-foreground">{stage.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
