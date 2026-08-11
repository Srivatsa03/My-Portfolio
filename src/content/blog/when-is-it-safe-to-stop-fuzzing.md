---
title: "When is it actually safe to stop fuzzing?"
description: "Most fuzzing campaigns stop on a wall-clock budget and a shrug. PSBayes estimates the residual risk you are actually carrying, per seed."
date: "2026-06-18"
tags: ["fuzzing", "research", "bayesian", "testing"]
image: "/blog/stop-fuzzing.svg"
imageAlt: "When to stop fuzzing: a Bayesian answer to a wall-clock question."
---

"Run it for 24 hours" is not a stopping rule. It is a budget with a stopping rule bolted on afterward.

The real question is: when you turn a fuzzing campaign off, how much undiscovered risk are you still carrying? That is the question my research answers, and it is the subject of a paper I am first author on, currently under submission.

## PSBayes

**PSBayes** is a per-seed, Beta-posterior estimator of the residual risk left in a fuzzing campaign. Instead of asking "have we hit the time budget," it asks "what is the probability that this seed still hides an undiscovered behavior," and it maintains that estimate as the campaign runs.

It comes in two variants:

- **PSBayes99**, tuned for accuracy.
- **PSBayesPM**, tuned for safety, at close to zero underestimation, because in testing you would rather stop late than stop while risk is still high.

I evaluated both across 8 FuzzBench benchmarks and 18,861 discovery rounds. Along the way I caught a scale mismatch between single-thread predictions and multi-fork ground truth that was quietly invalidating results, and corrected the estimation pipeline.

## Where it goes next

We are extending the framework to LLM-generated C to Rust translation, using cross-language differential fuzzing. There, the thing you want bounded is not undiscovered coverage but the risk of a translation bug that no one caught. Same idea, higher stakes: a stopping rule that reports what it does not know.
