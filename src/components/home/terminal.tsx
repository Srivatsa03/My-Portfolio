"use client";

import { useEffect, useState } from "react";

// Each quote is one or more lines.
//   - Multi-line quotes appear as one full block (readable, no typing).
//   - Single-line quotes type out character by character.
const QUOTES: string[][] = [
  [
    "she asked how much I love her ❤️❓🎺",
    'me: "O(n)."',
    "she asked what that means.",
    'me: "depends on how many problems you give me." 😭',
  ],
  ["whoami  →  builds AI infra, then breaks it before an attacker gets the chance."],
  ["recruiter: 'any production experience?'  →  7 PRs merged into libraries you imported this morning."],
  ["'the model hallucinated.'  no. the pipeline handed it a poisoned document and asked politely."],
  ["'just use a bigger model.'  I benchmarked that. injection said thanks, and one attack got worse."],
  ["'it works on my machine.'  wonderful. I'll ship your machine to prod then."],
  ["my RAG passed every eval. then rag-redteam looked at it. now the RAG apologizes."],
  ["on-call rule: if kubemend can't fix it as one reversible git commit, it doesn't touch the cluster."],
  ["a Pydantic maintainer approved my PR. I have peaked; it's all downhill and I've made peace with it."],
  ["impostor syndrome? I have a patent, an AWS cert, and 7 merged PRs. the impostor is thriving, honestly."],
  ["fixed a 10x pricing bug in prod billing. saved everyone real money. received one (1) thumbs-up."],
  ["my commits are small. the regressions they quietly prevent are not. that's the whole trick."],
];

const TYPE_MS = 32;
const HOLD_SINGLE = 2400;
const HOLD_MULTI = 4600;

export default function Terminal() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");

  const quote = QUOTES[qi];
  const isMulti = quote.length > 1;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isMulti) {
      timer = setTimeout(() => setQi((i) => (i + 1) % QUOTES.length), HOLD_MULTI);
    } else {
      const line = quote[0];
      if (typed.length < line.length) {
        timer = setTimeout(() => setTyped(line.slice(0, typed.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => {
          setTyped("");
          setQi((i) => (i + 1) % QUOTES.length);
        }, HOLD_SINGLE);
      }
    }

    return () => clearTimeout(timer);
  }, [qi, typed, isMulti, quote]);

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[#0c0e16] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-zinc-500">srivatsa@chicago: ~/portfolio</span>
      </div>

      <div className="min-h-[172px] p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {isMulti ? (
          quote.map((line, i) => (
            <p key={i} className="text-zinc-100">
              {i === 0 ? (
                <span className="text-emerald-400">$ </span>
              ) : (
                <span className="inline-block w-4" />
              )}
              {line}
            </p>
          ))
        ) : (
          <p className="text-zinc-100">
            <span className="text-emerald-400">$ </span>
            {typed}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-violet-400 align-baseline animate-[blink_1s_steps(1)_infinite]"
            />
          </p>
        )}
      </div>
    </div>
  );
}
