import type { ProjectResult } from "@/lib/projects";

// Every number on a project page sits next to what it measures and where it
// comes from, so a reader can check it instead of taking it on trust.
export function ProjectResults({ results }: { results: ProjectResult[] }) {
  if (results.length === 0) return null;
  return (
    <div className="not-prose my-8">
      <table className="hidden w-full border-collapse text-sm sm:table">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th scope="col" className="py-2 pr-4 font-medium">Result</th>
            <th scope="col" className="py-2 pr-4 font-medium">What it measures</th>
            <th scope="col" className="py-2 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.label} className="border-b border-border/60 align-top last:border-0">
              <td className="whitespace-nowrap py-3 pr-4 font-semibold tabular-nums text-foreground">{r.value}</td>
              <td className="py-3 pr-4 leading-relaxed text-foreground/90">{r.label}</td>
              <td className="py-3 text-xs leading-relaxed text-muted-foreground">{r.source}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-4 sm:hidden">
        {results.map((r) => (
          <li key={r.label} className="border-b border-border/60 pb-4 last:border-0">
            <p className="font-semibold tabular-nums text-foreground">{r.value}</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{r.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{r.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
