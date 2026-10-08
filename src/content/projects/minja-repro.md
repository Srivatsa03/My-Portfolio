---
title: minja-repro
tagline: An independent reimplementation of MINJA, a memory-poisoning attack on LLM agents that needs nothing but ordinary queries, plus the confidence intervals the paper left out.
category: Open source
context: Reproduction of arXiv:2503.03704
role: Author
dates: Oct 2026 - Present
status: v0.1.0, alpha, first real-model run done
order: 2
featured: true
cover: /projects/minja-repro.png
stack: [Python, Groq, Llama Prompt Guard 2, pytest]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/minja-repro
  - label: The paper
    href: https://arxiv.org/abs/2503.03704
flow:
  - name: Memory agent
    detail: Answers each question using its three most similar past interactions as examples, then writes the new turn back to memory with no validation or provenance.
  - name: Retriever
    detail: Lexical cosine similarity over filtered terms, so it runs offline with no API key. An embedding retriever is optional.
  - name: Attack
    detail: Five rounds of ordinary queries with bridging steps and an indication prompt, guidance removed progressively until the last round reads clean. Nothing writes to the store directly.
  - name: Evaluation
    detail: A fresh memory bank per victim-target pair, a baseline probe before every attack, and Wilson 95% intervals on each rate.
  - name: Moderation check
    detail: Scores every attack query with Llama Prompt Guard 2 against benign and blatant controls.
  - name: Re-analysis
    detail: Converts the paper's Table 1 percentages back to counts and recomputes per-pair intervals.
results:
  - value: 4 of 4
    label: Pairs where a poisoned record reached the agent's memory (injection success)
    source: First real-model run, Oct 8 2026, gpt-oss-120b on Groq, 4 synthetic pairs
  - value: 36 of 40
    label: Benign victim probes that surfaced the attacker's answer
    source: Same run. The 40 probes are 5 paraphrases each asked twice per pair, so the interval is optimistic.
  - value: 0 of 40
    label: Baseline probes that gave the target answer before the attack
    source: Same run
  - value: 0 of 20
    label: Attack queries flagged by Llama Prompt Guard 2 (86M, threshold 0.5)
    source: README, tested against only 2 benign and 2 blatant controls
  - value: 39.7% to 89.2%
    label: Wilson 95% interval for the paper's MMLU attack success of 68.9% at n = 10
    source: re-analysis of the paper's Table 1
---

## The problem

MINJA shows that an attacker who can only send normal queries can get malicious content into an LLM agent's memory, because the agent writes its own output back. The record sits dormant until an innocent user's query retrieves it, and then the agent gives the attacker's answer. No backend access and no training are needed.

The paper says "Code released", but there's no link and no repository I could find. It also reports mean and standard deviation instead of intervals on proportions, which hides how few trials sit behind some of the headline rates. I wanted a working artifact and an honest read of what the published numbers support.

## How it works

<!-- flow -->

The whole package is Python standard library. It prints an estimated call count and won't spend anything on a paid API until you pass a confirmation flag.

## Decisions and tradeoffs

- **The query-only rule is enforced in code.** No step writes to memory directly, so any poisoned record in the bank is one the agent wrote itself.
- **A baseline probe before every attack.** If the agent would have given the target answer anyway, the run doesn't count. Without that control an attack success rate means nothing.
- **Wilson intervals instead of the normal approximation**, because these rates sit close to 100%, where the normal approximation breaks. Per-pair, pooled and between-pair numbers are kept separate, since mixing them is the easiest way to overstate a result.
- **A lexical retriever by default**, declared as a substitution so every number names the retriever it came from.

## What broke

- Groq's Cloudflare front end returned error 1010 to the default Python user agent. A real user agent fixed it.
- The Prompt Guard endpoint rejected parameters other models accept. The client now drops the offending parameter instead of failing the run.
- Rate-limit errors burned through the retry budget, so the client now waits for the server's retry hints.

## Results

<!-- results -->

The real-model numbers come from synthetic pairs. They aren't the paper's MMLU row, so this is an implementation with a first real-model run, not yet a replication.

## Limits and what's next

The paper's GPT-4 and GPT-4o backbones are retired, so any replication runs on substitute models. The medical EHRAgent rows need credentialed data and are out of scope. Next is the MMLU row on a real model, then Webshop.
