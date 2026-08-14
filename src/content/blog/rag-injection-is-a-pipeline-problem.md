---
title: "RAG injection is a pipeline problem, not a model problem"
description: "I built rag-redteam to test the pipeline that turns untrusted documents into trusted context. A frontier-model upgrade did not fix injection. That is the whole point."
date: "2026-07-02"
tags: ["security", "rag", "llm", "open-source"]
image: "/blog/rag-injection.png"
imageAlt: "rag-redteam cover: injection is a pipeline problem, not a model one."
---

Everyone tests the model. Almost nobody tests the pipeline that feeds it.

RAG eval tools measure answer quality, and model scanners probe the model, but the part that turns an untrusted document into trusted context sits in the middle, unexamined. So I built **rag-redteam**: an open-source tool that plants poisoned documents and exfiltration probes against your retrieval pipeline, flags prompt injection, source-document leakage, and cross-document smuggling with a deterministic canary, and fails your CI when the pipeline gets more exploitable than its accepted baseline.

## Detection without an LLM judge

The detection layer is deliberately boring: canary tokens plus structural checks, with exact and fuzzy near-verbatim matching, and zero runtime dependencies. No judge model deciding whether an attack "probably" worked. If the canary leaves the boundary it was never supposed to cross, that is a finding, and it is reproducible on every run.

## The finding that surprised people

I benchmarked the default RAG configuration of LangChain, LlamaIndex, and Haystack. All three were exploitable to indirect prompt injection at 50 to 75% success. Then I swapped `gpt-4o-mini` for a frontier model and re-ran everything.

Injection success held roughly flat. Cross-document smuggling reached 100%. Tool-use injection got *worse*.

That is the argument in one experiment: a smarter model does not fix injection, it just follows the planted instruction more competently. Injection is an architecture problem. You fix it in the pipeline, with boundaries and gates, or you do not fix it at all.

```bash
pip install rag-redteam
```

It runs as a CLI and as a CI-gating GitHub Action. Point it at your retriever and see what leaves the boundary.
