---
title: MetARAG
tagline: A GPU-accelerated document-intelligence platform for CCC Intelligent Solutions that grounds every answer in the exact source paragraph.
category: Industry
context: Client project for CCC Intelligent Solutions
role: Led a team of 5+ engineers
dates: Aug 2025 - Dec 2025
status: Delivered
order: 5
featured: true
cover: /projects/metarag.png
stack: [Python, LangChain, Embeddings, GPU inference, RAG]
links: []
flow:
  - name: Parsing
    detail: Extracts text and structure from the client's PDFs.
  - name: Chunking
    detail: Splits documents into retrievable pieces sized for the questions people actually ask.
  - name: Metadata enrichment
    detail: Attaches metadata to each chunk so retrieval can filter and rank on more than raw text similarity.
  - name: Embeddings and retrieval
    detail: Embeds the chunks and retrieves the best candidates for each question.
  - name: Source-grounded answers
    detail: Generates an answer and cites the exact paragraph it came from, so every claim can be checked.
  - name: Batched GPU inference
    detail: Runs the model on batches spanning many documents at once, instead of calling it document by document.
results:
  - value: 93%
    label: Retrieval precision across hundreds of client PDFs
    source: project evaluation, tuning retrieval and citation logic
  - value: about two thirds
    label: Less document-processing time on the 100+ GB pipeline, from batching GPU inference across documents
    source: project measurements
  - value: about one third
    label: Lower inference latency from the same batching change
    source: project measurements
---

## The problem

CCC Intelligent Solutions needed reliable answers out of hundreds of PDFs, and an answer nobody can check isn't much use. Every answer had to point back to the paragraph it came from.

I led a team of 5+ engineers on it and designed the pipeline end to end, from parsing through generation.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **Batch inference across documents instead of per document.** This one change cut document-processing time by about two thirds and inference latency by about a third on a pipeline carrying 100+ GB.
- **Citations at paragraph level.** We tuned chunking, retrieval and the citation logic together so each answer resolves to its exact source paragraph.

## Results

<!-- results -->

## A note on the code

This was client work, so the code is private and there's no repo to link. For public code that shows the same retrieval and evaluation skills, see [ECI Pipeline](/projects/eci-pipeline) and [rag-redteam](/projects/rag-redteam).
