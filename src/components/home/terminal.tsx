"use client";

import { useEffect, useState } from "react";

// Original one-liners about Srivatsa's actual work.
const LINES = [
  "whoami  →  builds AI infra, then breaks it before an attacker can.",
  "recruiter: 'production experience?'  →  7 PRs merged into repos you import daily.",
  "my RAG passed every eval. then rag-redteam looked at it. now it apologizes.",
  "prod: 'everything is fine.'  →  that is exactly what a poisoned document would say.",
  "fuzzing: still running. me: 'when do I stop?' PSBayes: 'one sec, doing the math.'",
  "3am, cluster on fire. kubemend: 'six reversible actions, one git commit. go sleep.'",
  "merged a fix into Pydantic. a core maintainer approved it. peak achieved.",
  "found short secrets leaking through LiteLLM's masker. patched it. slept great.",
  "coffee → hours coding → contributions → coffee.  recursion. base case: sleep.",
];

export default function Terminal() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const line = LINES[index];
    if (typed.length < line.length) {
      const t = setTimeout(() => setTyped(line.slice(0, typed.length + 1)), 30);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setHistory((h) => [...h.slice(-3), line]);
      setTyped("");
      setIndex((i) => (i + 1) % LINES.length);
    }, 2200);
    return () => clearTimeout(t);
  }, [typed, index]);

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0c0e16] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-zinc-500">srivatsa@chicago: ~/portfolio</span>
      </div>
      <div className="min-h-[168px] p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {history.map((h, i) => (
          <p key={`${h}-${i}`} className="text-zinc-500">
            <span className="text-emerald-400">$</span> {h}
          </p>
        ))}
        <p className="text-zinc-100">
          <span className="text-emerald-400">$</span> {typed}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-violet-400 align-baseline animate-[blink_1s_steps(1)_infinite]" />
        </p>
      </div>
    </div>
  );
}
