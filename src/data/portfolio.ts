// Single source of truth for portfolio content.
// Sourced from the Aug 2026 profile (linkedin-rewrite, master-resume). All
// metrics user-confirmed. OSS statuses verified against the GitHub API.

export const profile = {
  name: "Srivatsa Kamballa",
  initials: "SK",
  // Rotating title tokens shown after the name.
  roles: ["Software Engineer", "AI Platform Engineer", "DevOps / SRE Engineer"],
  thesis: "I build AI infrastructure, then I break it before an attacker can.",
  blurb:
    "MS Computer Science at UIC working on the security and reliability of AI pipelines. First-author fuzzing research, seven merged PRs across LiteLLM, LlamaIndex, Pydantic, and Haystack, a granted patent, and AWS certified.",
  location: "Chicago, IL",
  available: true,
  availableNote: "Open to 2026 roles",
  email: "srivatsakamballa02@gmail.com",
  linkedin: "https://www.linkedin.com/in/srivatsa-kamballa",
  github: "https://github.com/Srivatsa03",
  githubUser: "Srivatsa03",
  resume: "https://github.com/Srivatsa03",
};

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "GitHub", href: profile.github, icon: "github" },
];

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "dashboard", label: "About" },
  { id: "projects", label: "Work" },
  { id: "open-source", label: "Open Source" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: 7, suffix: "", label: "PRs merged", sub: "LiteLLM · LlamaIndex · Pydantic · Haystack" },
  { value: 158, suffix: "K", label: "Combined stars", sub: "in repos I have merged into" },
  { value: 3.88, decimals: 2, label: "MS GPA", sub: "Computer Science, UIC" },
  { value: 1, suffix: "", label: "Granted patent", sub: "IP India, 2023" },
];

// Real stack, shown as a scrolling pill marquee.
export const stack = [
  "Python", "AWS", "Kubernetes", "Terraform", "Docker", "Ansible",
  "ArgoCD", "GitOps", "Jenkins", "GitHub Actions", "Prometheus", "Grafana",
  "LangChain", "LlamaIndex", "RAG", "FastAPI", "PostgreSQL", "pgvector",
  "Bash", "Linux", "LLVM", "Rust", "PyTorch", "TypeScript", "React", "SQL",
];

export const highlight = {
  title: "Currently building",
  items: [
    {
      name: "rag-redteam",
      href: "https://github.com/Srivatsa03/rag-redteam",
      note: "Red-teams RAG pipelines for prompt injection and data leakage, and fails CI the moment your pipeline gets more exploitable. On PyPI and the GitHub Marketplace.",
      meta: "PyPI · GitHub Action · MIT",
    },
    {
      name: "kubemend",
      href: "https://github.com/Srivatsa03/kubemend",
      note: "A Kubernetes remediation agent that diagnoses freely and acts narrowly: six typed, reversible actions whose only write surface is a git commit.",
      meta: "Kubernetes · SRE · GitOps",
    },
  ],
};

export interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  location?: string;
  summary?: string;
  bullets: string[];
  skills: string[];
  href?: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer, Software Testing",
    org: "University of Illinois Chicago",
    date: "Aug 2026 - Present",
    location: "Chicago, IL",
    summary:
      "Fuzzing and probabilistic-modeling research with UIC and Penn State collaborators, on a question most testing tools dodge: when is it actually safe to stop fuzzing?",
    bullets: [
      "Built PSBayes, a per-seed Beta-posterior estimator of the residual risk left in a fuzzing campaign, in an accuracy-tuned and a safety-tuned variant, evaluated across 8 FuzzBench benchmarks and 18,861 discovery rounds.",
      "First author on the resulting paper, A Bayesian Approach to Estimating Residual Risk of Fuzzing, currently under submission.",
      "Extending the framework to LLM-generated C to Rust translation with cross-language differential fuzzing, so the stopping rule bounds the risk of an undetected translation bug.",
    ],
    skills: ["Python", "Docker", "LLVM", "FuzzBench", "Rust", "AWS", "Bash"],
    href: profile.github,
  },
  {
    role: "Software Developer",
    org: "University of Illinois Chicago",
    date: "Aug 2024 - Jul 2026",
    location: "Chicago, IL",
    summary: "Research infrastructure and DevOps for the fuzzing platform the PSBayes work runs on.",
    bullets: [
      "Rebuilt the FuzzBench research environment on AWS from scratch with Docker and a custom LLVM build, cutting setup time roughly 60% and making every experiment reproducible.",
      "Cut Docker rebuild time from over 40 minutes to under 15, and provisioned 10+ Linux nodes on AWS and Azure with Terraform and Ansible, taking per-node setup from 4 hours to 45 minutes.",
      "Built Jenkins and GitHub Actions pipelines with tfsec scanning, drove failed deployments from 10 per month to under 2, and cut MTTR from 3 hours to under 1 with Prometheus and Grafana.",
    ],
    skills: ["AWS", "Azure", "Terraform", "Ansible", "Docker", "Kubernetes", "Jenkins", "Prometheus", "Grafana"],
    href: profile.github,
  },
  {
    role: "Software Developer, AI Engineer",
    org: "UIC College of Business Administration",
    date: "Aug 2025 - May 2026",
    location: "Chicago, IL",
    summary: "AI engineering in the Liautaud business school's industry program, building systems for external clients and the university.",
    bullets: [
      "Led 5+ engineers on MetARAG, a document-intelligence platform for CCC Intelligent Solutions covering parsing, chunking, embeddings, and retrieval tuning, reaching about 93% retrieval precision across 4+ corpora.",
      "Built the GPU-accelerated pipeline underneath it carrying 100+ GB, improving processing efficiency about 65% and cutting response latency about 40%.",
      "Shipped ECI Pipeline for TransUnion, a DeltaRAG and Graph-RAG system turning 10 live Android security feeds into evidence-backed risk tickets on FastAPI, pgvector, NetworkX, and a Next.js dashboard.",
    ],
    skills: ["Python", "LangChain", "FastAPI", "pgvector", "NetworkX", "ArgoCD", "AWS", "Next.js"],
    href: profile.github,
  },
  {
    role: "Teaching Assistant, Computer Science",
    org: "University of Illinois Chicago",
    date: "Aug 2025 - Jan 2026",
    location: "Chicago, IL",
    bullets: [
      "Supported 30+ graduate students through CS 516 Responsible Data Science as subject-matter expert, holding office hours on fairness, provenance, and model evaluation.",
    ],
    skills: ["Responsible AI", "Teaching", "Model Evaluation"],
  },
  {
    role: "Teaching Assistant, Business Analytics",
    org: "UIC College of Business Administration",
    date: "Jan 2026 - May 2026",
    location: "Chicago, IL",
    bullets: [
      "Taught IDS 532 Operations Management and ran the MS Business Analytics capstone for 20+ students across 5 to 6 teams, coordinating scope, milestones, and client-sponsor communication.",
    ],
    skills: ["Teaching", "Stakeholder Management", "Analytics"],
  },
  {
    role: "Trainee Software Engineer",
    org: "Mu Sigma",
    date: "May 2023 - Jun 2024",
    location: "Bangalore, India",
    bullets: [
      "Automated ETL workflows for extraction, cleaning, validation, and transformation in Python and SQL, cutting recurring data-prep effort about 40% and lifting pipeline reliability about 30%.",
    ],
    skills: ["Python", "SQL", "ETL", "Pandas", "Tableau"],
  },
];

export const education = [
  {
    degree: "Master of Science, Computer Science",
    org: "University of Illinois Chicago",
    date: "Aug 2024 - May 2026",
    location: "Chicago, IL",
    detail: "GPA 3.88 / 4.00",
  },
  {
    degree: "Bachelor of Technology, Computer Science (AI)",
    org: "Jain University",
    date: "2020 - 2024",
    location: "Bangalore, India",
    detail: "GPA 3.91 / 4.00",
  },
];

export const patent = {
  title: "Book Issue Management System for Libraries",
  number: "Patent No. 202341071153",
  authority: "Intellectual Property India",
  date: "Nov 2023",
  detail:
    "Co-invented an AI-enabled camera and RFID system for automated library book issuance, return, and access control.",
};

export const certification = {
  name: "AWS Certified Solutions Architect - Associate",
  authority: "Amazon Web Services",
  date: "2026",
};

export interface Project {
  title: string;
  tagline: string;
  description: string;
  href: string;
  tags: string[];
  meta: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "rag-redteam",
    tagline: "Open-source RAG security red-teaming",
    description:
      "Red-teams retrieval pipelines across 7 vulnerability classes, from indirect prompt injection to embedding-inversion exposure, as a CLI and a CI-gating GitHub Action. Detection is deterministic and LLM-judge-free using canary tokens and structural checks. Benchmarked LangChain, LlamaIndex, and Haystack defaults, all exploitable at 50 to 75%, and a frontier-model upgrade did not fix it: injection is a pipeline problem, not a model problem.",
    href: "https://github.com/Srivatsa03/rag-redteam",
    tags: ["Python", "LLM Security", "GitHub Action", "PyPI", "RAG"],
    meta: "PyPI · GitHub Marketplace · MIT",
    featured: true,
  },
  {
    title: "kubemend",
    tagline: "Kubernetes SRE agent with a git-only write surface",
    description:
      "A remediation agent that diagnoses freely and acts narrowly. Every constraint on it is code with tests, not a prompt. It selects from a closed set of six typed actions that are reversible by construction, whose blast radius is computable before execution, and whose only write surface is a git commit. Ships a recorded cluster snapshot so it runs with nothing attached.",
    href: "https://github.com/Srivatsa03/kubemend",
    tags: ["Kubernetes", "Python", "SRE", "GitOps", "Agents"],
    meta: "Kubernetes · SRE",
    featured: true,
  },
  {
    title: "MetARAG",
    tagline: "GPU-accelerated document intelligence for CCC Intelligent Solutions",
    description:
      "Led 5+ engineers on a RAG platform covering parsing, chunking, embeddings, and retrieval tuning, reaching about 93% retrieval precision across 4+ corpora and 100+ GB, with about 65% better processing efficiency and 40% lower latency.",
    href: "https://github.com/Srivatsa03/UICLaborDocsChatbot",
    tags: ["RAG", "LangChain", "GPU", "AWS", "Kubernetes"],
    meta: "Industry · CCC Intelligent Solutions",
  },
  {
    title: "ECI Pipeline",
    tagline: "Ecosystem change intelligence for Android risk, TransUnion",
    description:
      "A DeltaRAG and Graph-RAG platform on AWS Lambda ingesting 10 live Android security and CVE feeds, turning them into evidence-backed risk tickets with a Sentinel scoring agent, on FastAPI, pgvector, NetworkX, Groq, and a live Next.js dashboard.",
    href: "https://github.com/Srivatsa03/ECI-Pipeline",
    tags: ["FastAPI", "pgvector", "Graph-RAG", "Next.js", "AWS Lambda"],
    meta: "Industry · TransUnion",
  },
  {
    title: "Chain-of-Thought on CLEVR",
    tagline: "When reasoning supervision helps, and when it hurts",
    description:
      "Fine-tuned BLIP-2 with LoRA on 50,000 CLEVR samples on an L40S, lifting accuracy from 8.75% zero-shot to 45.95%. A controlled study found chain-of-thought wins on short reasoning chains and loses on long ones, the opposite of the usual assumption.",
    href: "https://github.com/Srivatsa03/Chain-of-Thought-on-CLEVR",
    tags: ["PyTorch", "BLIP-2", "LoRA", "Vision-Language"],
    meta: "Research · CS533",
  },
  {
    title: "DevSecOps EKS Platform",
    tagline: "Production 3-tier platform at 500+ req/sec",
    description:
      "A 3-tier application on AWS EKS with 8 microservices and zero-downtime deploys, automated end to end with Jenkins, ArgoCD, Trivy, and SonarQube gates, provisioned with Terraform and observed with Prometheus and Grafana.",
    href: "https://github.com/Srivatsa03/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project",
    tags: ["AWS EKS", "Terraform", "ArgoCD", "Jenkins", "DevSecOps"],
    meta: "Platform · SRE",
  },
];

export interface OpenSourcePR {
  repo: string;
  stars: string;
  status: string;
  merged: boolean;
  title: string;
  body: string;
  link: string;
}

export const openSource: OpenSourcePR[] = [
  {
    repo: "pydantic/pydantic",
    stars: "28k+ stars",
    status: "PR #13374 · merged",
    merged: true,
    title: "Stopped a JSON schema config being silently dropped",
    body: "When an Annotated field combined a dict json_schema_extra with a callable one, Pydantic warned the callable would be ignored, then did the opposite: it dropped the dict and could crash schema generation. I made the dict win as documented and added a regression test. Approved by a core maintainer.",
    link: "https://github.com/pydantic/pydantic/pull/13374",
  },
  {
    repo: "BerriAI/litellm",
    stars: "53k+ stars",
    status: "PR #30764 · merged",
    merged: true,
    title: "Stopped short secrets leaking into logs",
    body: "SensitiveDataMasker returned any secret of 8 characters or fewer verbatim, leaking short redis passwords, API keys, and tokens into logs and the admin UI. I made short values mask by default, audited all 16 call sites, and added regression tests.",
    link: "https://github.com/BerriAI/litellm/pull/30764",
  },
  {
    repo: "run-llama/llama_index",
    stars: "51k+ stars",
    status: "PR #22133 · merged",
    merged: true,
    title: "Fixed silent data loss in the ingestion core",
    body: "In IngestionPipeline upserts, nodes were keyed by document id in a dict, so every chunk of a document except the last was silently dropped, never embedded or stored. I fixed both the sync and async paths with regression tests for each.",
    link: "https://github.com/run-llama/llama_index/pull/22133",
  },
  {
    repo: "BerriAI/litellm",
    stars: "53k+ stars",
    status: "PR #29693 · merged",
    merged: true,
    title: "Fixed a 10x cost-tracking error",
    body: "amazon.titan-embed-text-v2 was priced ten times too high in the cost maps, inflating everyone's budget reports. I verified the number against AWS Bedrock pricing and fixed the primary and backup maps in sync so they would not drift apart again.",
    link: "https://github.com/BerriAI/litellm/pull/29693",
  },
  {
    repo: "deepset-ai/haystack",
    stars: "26k+ stars",
    status: "PR #11670 · merged",
    merged: true,
    title: "Silenced noisy logs on empty inputs",
    body: "HTMLToDocument dumped ERROR lines on empty ByteStream inputs because lxml logs its parse failures internally rather than raising. I skipped empty streams before extraction, and separately authored the OpenSearch and Elasticsearch SQL retriever docs (#11543, #11494).",
    link: "https://github.com/deepset-ai/haystack/pull/11670",
  },
  {
    repo: "BerriAI/litellm",
    stars: "53k+ stars",
    status: "PR #31725 · open",
    merged: false,
    title: "Time-based off-peak pricing in the cost engine",
    body: "A feature on a core billing path: models define a UTC window and discounted rate, and the calculator picks the rate by time of day, backward-compatible, with regression tests. Open and under review.",
    link: "https://github.com/BerriAI/litellm/pull/31725",
  },
  {
    repo: "stanfordnlp/dspy",
    stars: "36k+ stars",
    status: "PR #9942 · open",
    merged: false,
    title: "Fixed value corruption in the chat parser",
    body: "In ChatAdapter.parse, the field-header regex matched the stripped line but sliced the unstripped one, leaking stray marker characters into parsed values on indented headers. I aligned the match and the slice with regression tests. Open and under review.",
    link: "https://github.com/stanfordnlp/dspy/pull/9942",
  },
];

export const skills = [
  { category: "Languages", items: ["Python", "Bash", "SQL", "TypeScript", "JavaScript", "C++", "Rust", "Go"] },
  { category: "Cloud & Infrastructure", items: ["AWS", "Azure", "GCP", "Terraform", "Ansible", "Kubernetes", "Helm", "Docker"] },
  { category: "CI/CD & Security", items: ["Jenkins", "GitHub Actions", "ArgoCD", "GitOps", "Trivy", "SonarQube", "tfsec", "IAM / RBAC"] },
  { category: "Observability", items: ["Prometheus", "Grafana", "Loki", "CloudWatch", "Datadog"] },
  { category: "AI & Data Systems", items: ["RAG", "LangChain", "LlamaIndex", "Haystack", "OpenAI", "pgvector", "PyTorch", "FastAPI", "LLM Security"] },
  { category: "Research", items: ["Fuzzing", "Bayesian Estimation", "LLVM", "FuzzBench", "Differential Testing"] },
];
