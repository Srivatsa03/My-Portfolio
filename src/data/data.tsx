import { IconHome, IconBrandGithub, IconBriefcase2, IconBrandLinkedin, IconMail, IconPencil, IconBrush } from "@tabler/icons-react"

export const data = {
  experience: [
    {
      image: "/experience/uic.png",
      company: "University of Illinois Chicago",
      role: "Software Developer, Software Testing",
      date: "Aug 2026 - Present",
      location: "Chicago, IL",
      description:
        "Fuzzing and probabilistic-modeling research on a question most testing tools dodge: when is it actually safe to stop fuzzing? Built PSBayes, a per-seed Bayesian estimator of residual risk, and am first author on the resulting paper, now under submission.",
      skills: ["Python", "Docker", "LLVM", "FuzzBench", "Rust", "AWS", "Bash"],
      href: "https://github.com/Srivatsa03",
    },
    {
      image: "/experience/uic.png",
      company: "University of Illinois Chicago",
      role: "Software Developer",
      date: "Aug 2024 - Jul 2026",
      location: "Chicago, IL",
      description:
        "Research infrastructure and DevOps for the fuzzing platform. Rebuilt FuzzBench on AWS from scratch (about 60% faster setup), provisioned 10+ nodes with Terraform and Ansible, and cut MTTR from 3 hours to under 1 with Prometheus and Grafana.",
      skills: ["AWS", "Terraform", "Ansible", "Docker", "Kubernetes", "Jenkins", "Prometheus", "Grafana"],
      href: "https://github.com/Srivatsa03",
    },
    {
      image: "/experience/uic.png",
      company: "UIC College of Business Administration",
      role: "Software Developer, AI Engineer",
      date: "Aug 2025 - May 2026",
      location: "Chicago, IL",
      description:
        "Led 5+ engineers on MetARAG, a GPU-accelerated RAG platform for CCC Intelligent Solutions reaching about 93% retrieval precision, and shipped ECI Pipeline for TransUnion, turning 10 live Android security feeds into evidence-backed risk tickets.",
      skills: ["Python", "LangChain", "FastAPI", "pgvector", "ArgoCD", "AWS", "Next.js"],
      href: "https://github.com/Srivatsa03",
    },
    {
      image: "/experience/musigma.png",
      company: "Mu Sigma",
      role: "Trainee Software Engineer",
      date: "May 2023 - Jun 2024",
      location: "Bangalore, India",
      description:
        "Automated ETL workflows for extraction, cleaning, validation, and transformation in Python and SQL for enterprise decision-support clients, cutting recurring data-prep effort about 40%.",
      skills: ["Python", "SQL", "ETL", "Pandas", "Tableau"],
      href: "https://www.mu-sigma.com",
    },
  ],

  projects: [
    {
      title: "rag-redteam | Open-Source RAG Security Tool",
      href: "https://github.com/Srivatsa03/rag-redteam",
      dates: "Jun 2026 - Present",
      active: true,
      type: "Open Source",
      technologies: ["Python", "LLM Security", "GitHub Action", "PyPI", "RAG"],
      description:
        "Red-teams retrieval pipelines across 7 vulnerability classes as a CLI and a CI-gating GitHub Action, with deterministic canary detection and zero runtime dependencies. Benchmarked LangChain, LlamaIndex, and Haystack defaults, all exploitable at 50 to 75%, proving injection is a pipeline problem, not a model one.",
    },
    {
      title: "kubemend | Kubernetes SRE Agent",
      href: "https://github.com/Srivatsa03/kubemend",
      dates: "Aug 2026 - Present",
      active: true,
      type: "Open Source",
      technologies: ["Kubernetes", "Python", "SRE", "GitOps", "Agents"],
      description:
        "A remediation agent that diagnoses freely and acts narrowly: six typed, reversible actions whose blast radius is computable before execution and whose only write surface is a git commit. Every constraint on it is code with tests, not a prompt.",
    },
    {
      title: "MetARAG | Document Intelligence Platform",
      href: "https://github.com/Srivatsa03/UICLaborDocsChatbot",
      dates: "Aug 2025 - Dec 2025",
      active: false,
      type: "Industry - CCC Intelligent Solutions",
      technologies: ["RAG", "LangChain", "GPU", "AWS", "Kubernetes"],
      description:
        "Led 5+ engineers on a GPU-accelerated RAG platform covering parsing, chunking, embeddings, and retrieval tuning, reaching about 93% retrieval precision across 100+ GB with about 65% better processing efficiency and 40% lower latency.",
    },
    {
      title: "ECI Pipeline | Android Risk Intelligence",
      href: "https://github.com/Srivatsa03/ECI-Pipeline",
      dates: "Jan 2026 - May 2026",
      active: false,
      type: "Industry - TransUnion",
      technologies: ["FastAPI", "pgvector", "Graph-RAG", "Next.js", "AWS Lambda"],
      description:
        "A DeltaRAG and Graph-RAG platform on AWS Lambda ingesting 10 live Android security and CVE feeds, turning them into evidence-backed risk tickets with a Sentinel scoring agent and a live Next.js dashboard.",
    },
    {
      title: "Chain-of-Thought on CLEVR",
      href: "https://github.com/Srivatsa03/Chain-of-Thought-on-CLEVR",
      dates: "Jan 2026 - May 2026",
      active: false,
      type: "Research - CS533",
      technologies: ["PyTorch", "BLIP-2", "LoRA", "Vision-Language"],
      description:
        "Fine-tuned BLIP-2 with LoRA on 50,000 CLEVR samples, lifting accuracy from 8.75% zero-shot to 45.95%. A controlled study found chain-of-thought wins on short reasoning chains and loses on long ones, the opposite of the usual assumption.",
    },
    {
      title: "End-to-End DevSecOps EKS Platform",
      href: "https://github.com/Srivatsa03/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project",
      dates: "2025",
      active: false,
      type: "Platform - SRE",
      technologies: ["AWS EKS", "Terraform", "ArgoCD", "Jenkins", "DevSecOps"],
      description:
        "A production 3-tier application on AWS EKS with 8 microservices and zero-downtime deploys, automated end to end with Jenkins, ArgoCD, Trivy, and SonarQube gates, provisioned with Terraform and observed with Prometheus and Grafana.",
    },
  ],

  contact: [
    {
      href: "mailto:srivatsakamballa02@gmail.com",
      label: "Email",
      icon: <IconMail className="h-5 w-5" />,
      aria: "Email",
    },
    {
      href: "https://www.linkedin.com/in/srivatsa-kamballa",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      aria: "LinkedIn",
    },
    {
      href: "https://github.com/Srivatsa03",
      label: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      aria: "GitHub",
    },
  ],

  nav: [
    {
      name: "Home",
      link: "hero",
      icon: <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconBrush className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Experience",
      link: "experience",
      icon: <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <IconPencil className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
  ],

  favoriteLanguage: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    },
  ],

  scratchGifs: [
    "/scratch/shield.svg",
    "/scratch/terminal.svg",
    "/scratch/ai-graph.svg",
  ],

  tools: [
    { name: "Python", icon: "python", themeDependent: false },
    { name: "AWS", icon: "aws", themeDependent: false },
    { name: "Kubernetes", icon: "kubernetes", themeDependent: false },
    { name: "Terraform", icon: "terraform", themeDependent: false },
    { name: "Docker", icon: "docker", themeDependent: false },
    { name: "Ansible", icon: "ansible", themeDependent: false },
    { name: "Prometheus", icon: "prometheus", themeDependent: false },
    { name: "Grafana", icon: "grafana", themeDependent: false },
    { name: "Linux", icon: "linux", themeDependent: false },
    { name: "FastAPI", icon: "fastapi", themeDependent: false },
    { name: "PostgreSQL", icon: "postgresql", themeDependent: false },
    { name: "Git", icon: "git", themeDependent: false },
    { name: "GitHub", icon: "github", themeDependent: true },
    { name: "Azure", icon: "azure", themeDependent: false },
    { name: "Rust", icon: "rust", themeDependent: true },
    { name: "TypeScript", icon: "typescript", themeDependent: false },
    { name: "JavaScript", icon: "javascript", themeDependent: false },
    { name: "React", icon: "react", themeDependent: false },
    { name: "Node.js", icon: "nodejs", themeDependent: false },
    { name: "SQL", icon: "sql", themeDependent: false },
    { name: "Bash", icon: "bash", themeDependent: false },
  ],
};
