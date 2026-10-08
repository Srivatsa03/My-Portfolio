---
title: Counterfactual Fact Verification
tagline: How well small local LLMs check FEVER claims with and without evidence, and how easily hand-written counterfactuals fool them.
category: Coursework
context: CS421, team of 4
role: Wrote the initial FEVER preprocessing (claim extraction, evidence resolution) and the counterfactual template
dates: Feb 2026 - Apr 2026
status: Complete
order: 9
featured: false
cover: /projects/counterfactual.png
stack: [Python, Transformers, bitsandbytes, Ollama, Phi-3 Mini, Mistral 7B, Llama 3.1 8B]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/Counterfactual_Fact_Checking
flow:
  - name: Extract
    detail: Pulls the 80,035 SUPPORTS claims out of FEVER's roughly 145,000.
  - name: Tier
    detail: Scores each claim on tokens, evidence sets and Wikipedia pages to sort it into low, medium or high structural complexity.
  - name: Tier analysis
    detail: Runs 300 claims per tier zero-shot and again with the gold evidence, on 4-bit quantized models.
  - name: Cherry-pick
    detail: Selects 500 claims across tiers and resolves their evidence from the FEVER Wikipedia dump.
  - name: Counterfactuals
    detail: The team hand-wrote counterfactual versions of claims in small GUI tools against local models.
  - name: Batch evaluation
    detail: Runs every counterfactual through each model and records whether it was fooled.
results:
  - value: 65.9% vs 96.4%
    label: Phi-3 Mini (4-bit NF4) accuracy zero-shot vs. with evidence, 900 claims
    source: tier-analysis validation results, Apr 6 2026
  - value: 76.6% vs 96.9%
    label: Mistral 7B (4-bit NF4) accuracy zero-shot vs. with evidence, 900 claims
    source: tier-analysis results, Apr 9 2026
  - value: 90.3%
    label: Counterfactuals that fooled Mistral 7B (400 of 443)
    source: data/results/eval_final_mistral.json
  - value: 48.7%
    label: Counterfactuals that fooled Llama 3.1 8B (269 of 552)
    source: data/results/eval_final_v3_llama.json
  - value: 14.1% vs 65.9%
    label: The same Phi-3 Mini, zero-shot, served through Ollama's 4-bit build vs. Hugging Face NF4
    source: tier-analysis runs, Apr 11 and Apr 6 2026
---

## The problem

Small models running locally are cheap enough to fact-check at scale, but how much do they actually know without evidence in front of them, and how easily are they misled? We tested that on FEVER, comparing zero-shot answers with evidence-backed ones, and then fed the models deliberately misleading counterfactual claims.

This was a four-person course project. I wrote the first FEVER preprocessing (claim extraction, picking the first sample, evidence resolution and the counterfactual template) and later rewrote one of the counterfactual tools. My teammates ran the tiering, the tier analysis and the Ollama and Llama experiments.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **"Structural complexity" instead of "difficulty".** The course TA pointed out the tiers had no empirical basis as a difficulty measure, so we renamed them to what they actually count.
- **Strategy-based counterfactuals instead of simple negation.** At the midterm the models caught simple negations 93.3% of the time, so negation alone wasn't a real test.

## What broke

The same Phi-3 Mini scored 14.1% zero-shot through Ollama's 4-bit build and 65.9% through Hugging Face NF4. Same model, different serving stack, a 50-point swing. We documented it as serving-stack sensitivity and moved the counterfactual work to Mistral and Llama.

## Results

<!-- results -->

Evidence closes most of the gap: both models land around 96% with it. Without evidence they're much weaker, and Mistral, the stronger zero-shot model, was the easier one to fool with counterfactuals.

## Limits

Every claim in the tier analysis is a SUPPORTS claim, so accuracy there is really the rate of answering "supports". The runs also mix backends and model versions, so the cross-model comparisons are rough.
