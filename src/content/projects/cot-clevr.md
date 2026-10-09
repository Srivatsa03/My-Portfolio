---
title: Chain-of-Thought on CLEVR
tagline: A controlled test of whether chain-of-thought supervision helps a small vision-language model reason about scenes, using BLIP-2 fine-tuned with LoRA.
category: Coursework
context: CS533 Deep Learning for NLP, team of 2
role: Wrote the model, dataset and training code, ran every evaluation and led the report
dates: Jan 2026 - May 2026
status: Complete
order: 6
featured: true
cover: /projects/media/cot-clevr-overall.png
coverFit: contain
media:
  - src: /projects/media/cot-clevr-overall.png
    alt: Bar chart of overall accuracy, zero-shot 8.8 percent, answer-only 46.0 percent, chain-of-thought 28.9 percent
    caption: Overall accuracy on the 2,000 validation questions.
  - src: /projects/media/cot-clevr-depth.png
    alt: Bar chart of accuracy by reasoning depth for the three models
    caption: Accuracy by reasoning depth, from the project report. The short bucket on the left is only 35 questions, so the chain-of-thought lead there is a hint, not a result.
stack: [PyTorch, Transformers, PEFT, LoRA, BLIP-2, AWS EC2]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/Chain-of-Thought-on-CLEVR
  - label: Report (PDF)
    href: https://github.com/Srivatsa03/Chain-of-Thought-on-CLEVR/blob/main/CS533_Project.pdf
flow:
  - name: Data
    detail: 50,000 training and 2,000 validation questions from CLEVR v1.0.
  - name: Reasoning traces
    detail: Each question's program is mapped to templated reasoning steps, so the chain-of-thought targets are deterministic. My teammate built this part.
  - name: Model
    detail: BLIP-2 OPT-2.7B in bf16 with the vision encoder and Q-Former frozen, and LoRA adapters (rank 16) on the attention projections.
  - name: Training
    detail: A custom trainer weights the answer tokens 5x so the model can't get a low loss by memorizing the reasoning template and fumbling the answer.
  - name: Evaluation
    detail: Greedy decoding on the 2,000 validation questions, split by question type and by reasoning depth.
results:
  - value: 8.75%
    label: Zero-shot accuracy before any fine-tuning (175 of 2,000)
    source: results/zeroshot_2k_results.json
  - value: 45.95%
    label: Accuracy after answer-only fine-tuning (919 of 2,000)
    source: results/answer_only_2k_results.json
  - value: 28.90%
    label: Accuracy after chain-of-thought fine-tuning (578 of 2,000)
    source: results/cot_2k_final_results.json
  - value: 46.2% vs 28.5%
    label: Answer-only vs. chain-of-thought on questions needing 5 or more reasoning steps (1,965 questions)
    source: same result files
  - value: 51.4% vs 34.3%
    label: Chain-of-thought vs. answer-only on questions needing 4 or fewer steps, but only 35 questions, so treat it as a hint
    source: same result files
---

## The problem

Chain-of-thought is usually treated as free accuracy: show the model the reasoning and it reasons better. We wanted to test that on a small vision-language model doing compositional visual reasoning, where the reasoning steps are known exactly. The question was whether supervising those steps helps or hurts.

This was a two-person course project. I wrote the model, dataset and training code, including the custom trainer, set up the GPU instance, debugged training, ran all three evaluations and led the report. My teammate built the data and reasoning-trace pipeline and the plots.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **Traces from CLEVR's own programs instead of distilling them from a bigger model.** They're deterministic, so any difference comes from the supervision and not from a noisy teacher.
- **Lower learning rate and fewer epochs for the chain-of-thought run.** Its loss fell below 0.05 in the first epoch, which meant it was memorizing the template, so it got 3 epochs at 1e-5 against 10 at 5e-5 for answer-only.
- **bf16 instead of fp16,** because fp16 produced NaN gradients.
- **A 50,000-question subset of the 700,000,** because the full set would have taken more than a week on one GPU.

## What broke

A BOS/EOS token collision collapsed the chain-of-thought model to single-token outputs. Fixing the label masking brought it back. fp16 NaNs were the other early blocker.

## Results

<!-- results -->

<!-- media -->

Fine-tuning helped a lot, and answer-only supervision helped far more than chain-of-thought. On long reasoning chains, chain-of-thought clearly hurt. It looked better on short chains, but that bucket is only 35 questions, a gap of six answers, so I don't lean on it.

## Limits and what's next

One seed, greedy decoding, templated traces and a 50k subset. A fair next step is several seeds and free-form traces from a stronger model, to see whether the long-chain penalty comes from the template or from chain-of-thought itself.
