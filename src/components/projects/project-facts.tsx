import type { Project } from "@/lib/projects";

// The spec sheet: who did what, when, with what. Sits in the side rail on wide
// screens and under the header on narrow ones.
export function ProjectFacts({ project }: { project: Project }) {
  const rows: [string, string][] = [
    ["Role", project.role],
    ["When", project.dates],
    ["Status", project.status],
  ];
  if (project.context) rows.push(["Context", project.context]);

  return (
    <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-sm">
      {rows
        .filter(([, v]) => v)
        .map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-foreground">{v}</dd>
          </div>
        ))}
      {project.stack.length > 0 && (
        <div className="contents">
          <dt className="text-muted-foreground">Stack</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[11px] text-foreground/80">
                  {s}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}
