// All portfolio content in one place. Carried over verbatim from the existing site.

export const profile = {
  name: "Srivatsa Kamballa",
  greeting: "Namaste(); I'm",
  roles: ["Software Engineer", "AI Infrastructure Engineer", "Platform Engineer", "Cloud / DevOps Engineer"],
  summary:
    "I build the unglamorous parts that keep AI and infrastructure honest: retrieval that cites its sources, pipelines that do not silently break, and deployments you can roll back at 2am.",
  summary2:
    "Most recently with CCC Intelligent Solutions and TransUnion through UIC, plus a granted patent and a few merged fixes in open source I am quietly proud of.",
  email: "srivatsakamballa02@gmail.com",
  github: "https://github.com/Srivatsa03",
  linkedin: "https://www.linkedin.com/in/srivatsa-kamballa",
  location: "Chicago, Illinois",
  motto: "Learning, Living, and Leveling Up.",
};

export const about = [
  "I'm an MS Computer Science grad from UIC. I like problems that sit between a model and production: a RAG system that has to actually cite the right paragraph, a pipeline that has to survive a bad upstream feed, an EKS cluster that has to roll back cleanly when a deploy goes wrong.",
  "Lately that has meant document intelligence with CCC Intelligent Solutions, Android risk intelligence with TransUnion, and rebuilding a fuzzing research stack from a state nobody wanted to touch. Before grad school I shipped data automation at Mu Sigma and earned a patent along the way.",
  "What I care about is boring in the best way: does it hold up next month, can someone else read it, and does it tell you when it breaks.",
];

export const experience = [
  {
    role: "Research Infrastructure Engineer",
    company: "University of Illinois Chicago",
    duration: "Mar 2025 - May 2026",
    location: "Chicago, Illinois",
    points: [
      "Rebuilt the FuzzBench automated software testing environment from scratch on AWS using Docker and a custom LLVM toolchain, cutting setup time by ~60% and making experiments reproducible across 5+ benchmark configurations.",
      "Reduced Docker and LLVM rebuild time from over 40 minutes to under 15 minutes by optimizing layer caching and modularizing the dependency build.",
      "Provisioned research infrastructure on AWS and Azure with Terraform and Ansible across 10+ Linux nodes, automating VPC setup, networking, and package management.",
      "Implemented two Bayesian statistical estimators for residual fuzzing risk, improving stopping-condition accuracy by 30%+ across all benchmark configurations.",
    ],
  },
  {
    role: "AI Platform Engineer",
    company: "University of Illinois Chicago",
    duration: "Sep 2024 - Mar 2025",
    location: "Chicago, Illinois",
    points: [
      "Led a team of 5+ engineers to build MetARAG, a RAG-based document intelligence platform, with UIC x CCC Intelligent Solutions for source-grounded search across 4+ document corpora.",
      "Built a GPU-accelerated processing pipeline covering PDF parsing, chunking, metadata enrichment, embeddings, and retrieval tuning, improving processing efficiency by ~65% and response speed by ~40%.",
      "Achieved ~93% retrieval precision through context-selection and evidence-backed answer workflows using Python, LangChain, OpenAI APIs, Docker, Kubernetes, PostgreSQL, and pgvector.",
      "Owned ArgoCD GitOps deployment end-to-end, cutting deployment time by 55% with automated rollback and reducing MTTR by 45% using Prometheus, Grafana, and Loki.",
    ],
  },
  {
    role: "Trainee Software Engineer",
    company: "Mu Sigma",
    duration: "May 2023 - Jun 2024",
    location: "Bangalore, India",
    points: [
      "Automated ETL workflows for extraction, cleaning, validation, and transformation in Python and SQL, cutting recurring data-preparation effort from 6 hours to under 2 hours weekly.",
      "Accelerated reporting turnaround from 3 days to same-day delivery by transforming raw business data into structured, analysis-ready datasets for decision-support use cases.",
      "Improved analytics pipeline reliability by ~30% by debugging data-quality issues and standardizing validation checks across 10+ upstream sources.",
      "Eliminated 2,000+ scheduled jobs through batching and deduplication, reducing compute overhead and manual reporting effort for downstream teams.",
    ],
  },
  {
    role: "Cloud and DevOps Intern",
    company: "Broadridge",
    duration: "Aug 2022 - May 2023",
    location: "India",
    points: [
      "Built early hands-on experience with cloud infrastructure, deployment workflows, and environment setup in an enterprise technology environment.",
      "Supported release and deployment processes through version control, environment configuration, and repeatable deployment practices.",
      "Strengthened foundations in infrastructure reliability, access control, and operational consistency across enterprise systems.",
    ],
  },
];

export const featuredProjects = [
  {
    context: "UIC x CCC Intelligent Solutions",
    title: "MetARAG",
    lede: "Document intelligence for teams drowning in policy and agreement PDFs.",
    story:
      "A team kept losing answers inside hundreds of documents. I led five of us to build MetARAG so they could ask in plain English and get a response that points back to the exact paragraph it came from. The hard part was never the model. It was making retrieval trustworthy: parsing, chunking, metadata, and an evaluation loop that flags when an answer is not actually grounded.",
    metrics: [
      { value: "93%", label: "retrieval precision" },
      { value: "65%", label: "more efficient processing" },
      { value: "40%", label: "faster responses" },
    ],
    stack: "Python · LangChain · OpenAI · Docker · Kubernetes · PostgreSQL · pgvector",
    link: "https://github.com/Srivatsa03/UICLaborDocsChatbot",
  },
  {
    context: "UIC x TransUnion",
    title: "ECI Pipeline",
    story:
      "TransUnion needed to see Android ecosystem risk before it turned into a problem. I built ECI to watch 10 live security, CVE, and policy sources, diff what changed, and turn the deltas into action tickets a fraud team can act on. A DeltaRAG and Graph-RAG pass ties evidence across sources, so a single CVE never gets read in isolation.",
    metrics: [
      { value: "10", label: "live data sources" },
      { value: "93%", label: "retrieval precision" },
      { value: "100%", label: "manual triage removed" },
    ],
    stack: "Python · FastAPI · PostgreSQL · pgvector · NetworkX · Groq · AWS Lambda · Next.js",
    link: "https://github.com/Srivatsa03/ECI-Pipeline",
  },
  {
    context: "UIC Research",
    title: "FuzzBench + LLVM",
    story:
      "I inherited a fuzzing research environment that no longer built. I rebuilt it from scratch on a custom LLVM toolchain so experiments are reproducible, then implemented two Bayesian estimators to put an actual number on how much risk is left at the moment you decide to stop fuzzing.",
    metrics: [
      { value: "60%", label: "faster setup" },
      { value: "40m → 15m", label: "rebuild time" },
      { value: "30%+", label: "better stop accuracy" },
    ],
    stack: "Google FuzzBench · Docker · LLVM · AWS · Python · Bash",
    link: "https://github.com/Srivatsa03/fuzzbench",
  },
  {
    context: "Cloud Platform",
    title: "EKS DevSecOps Platform",
    story:
      "A from-scratch three-tier platform on AWS EKS, built to behave like production rather than a demo. Eight services, infrastructure as code, GitOps deploys, security gates that block a bad image before it ships, and dashboards that tell you something is wrong before your users do.",
    metrics: [
      { value: "8", label: "microservices" },
      { value: "500+ rps", label: "zero-downtime" },
      { value: "40%", label: "faster incident response" },
    ],
    stack: "AWS EKS · Terraform · Jenkins · ArgoCD · Trivy · SonarQube · Prometheus · Grafana",
    link: "https://github.com/Srivatsa03/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project",
  },
];

export const moreProjects = [
  {
    name: "CoT vs Answer-Only VQA",
    context: "UIC CS533",
    blurb:
      "Fine-tuned BLIP-2 with LoRA on an NVIDIA L40S and found that chain-of-thought helps short reasoning chains but quietly hurts long ones. A result I did not expect going in.",
    stack: "PyTorch · BLIP-2 · LoRA · CLEVR",
    link: "https://github.com/Srivatsa03",
  },
  {
    name: "CineMatch",
    context: "Recommender + MLOps",
    blurb:
      "An end-to-end movie recommender wired with the full production kit: CI/CD, quality gates, drift checks, and monitoring. Lands at RMSE 0.58.",
    stack: "FastAPI · Docker · Jenkins · scikit-learn",
    link: "https://github.com/Srivatsa03/Movie-Recommendation",
  },
  {
    name: "MTProto 2.0",
    context: "Applied cryptography",
    blurb:
      "Telegram's encrypted messaging protocol rebuilt from scratch, with AES-256, SHA-256, and perfect forward secrecy so no two sessions ever share keys.",
    stack: "Python · AES-256 · SHA-256 · TCP/WS",
    link: "https://github.com/Srivatsa03/Telegram-MTproto2.0",
  },
  {
    name: "rag-redteam",
    context: "LLM security",
    blurb:
      "Red-teams a RAG pipeline for the attacks eval frameworks miss: prompt injection, source-document leakage, and instruction smuggling. Runs as a CLI or GitHub Action.",
    stack: "Python · GitHub Actions · LLM security",
    link: "https://github.com/Srivatsa03/rag-redteam",
  },
  {
    name: "WuzzyFuzz",
    context: "Language design",
    blurb:
      "A small domain-specific language for fuzzy logic in Scala, written end to end from the parser through the interpreter down to a little optimizer.",
    stack: "Scala",
    link: "https://github.com/Srivatsa03/WuzzyFuzz-03",
  },
];

export const openSource = [
  {
    repo: "BerriAI/litellm",
    stars: "48k+ stars",
    status: "PR #30764 · merged",
    merged: true,
    title: "Stopped short secrets leaking into logs",
    body: "While reading the code I noticed SensitiveDataMasker returned any secret of eight characters or fewer verbatim, an off-by-one threshold plus a zero-length boundary mask, so short redis passwords, API keys, and tokens were landing in logs and the admin UI. I made short values mask by default, kept two legitimate non-secret callers working through dependency injection, added regression tests, and untangled the CI failures that cascaded through shared callers. Reviewed and merged.",
    link: "https://github.com/BerriAI/litellm/pull/30764",
  },
  {
    repo: "BerriAI/litellm",
    stars: "48k+ stars",
    status: "PR #29693 · merged",
    merged: true,
    title: "Fixed a 10x cost-tracking error",
    body: "amazon.titan-embed-text-v2 was priced ten times too high in the cost maps, quietly inflating everyone's budget reports. I checked the number against AWS Bedrock pricing, fixed the primary and backup maps in sync so they would not drift apart again, and added a regression test with isolated monkeypatching. Merged after review.",
    link: "https://github.com/BerriAI/litellm/pull/29693",
  },
  {
    repo: "deepset-ai/haystack",
    stars: "20k+ stars",
    status: "PR #11670 · merged",
    merged: true,
    title: "Silenced noisy logs on empty inputs",
    body: "HTMLToDocument was dumping ERROR and WARNING lines whenever it got an empty ByteStream, because trafilatura and lxml log their parse failures internally instead of raising, so the existing try/except never caught them. I skipped empty streams before extraction, added a test and a release note, and cleared full CI. Reviewed and merged.",
    link: "https://github.com/deepset-ai/haystack/pull/11670",
  },
  {
    repo: "run-llama/llama_index",
    stars: "40k+ stars",
    status: "PR #22046 · open, under review",
    merged: false,
    title: "Caught silent data loss in the ingestion core",
    body: "In LlamaIndex's core IngestionPipeline, the upsert path keyed nodes by document id in a dict, so every chunk of a document except the last was silently dropped, never embedded or stored. I fixed both the sync and async paths to keep all nodes, added regression tests for each, and reproduced the bug end to end through the public API. The PR is open and under review.",
    link: "https://github.com/run-llama/llama_index/pull/22046",
  },
];

export const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "C++", "Java", "YAML", "Bash", "React", "Node.js", "SQL / PostgreSQL"] },
  { category: "AI & Data Systems", items: ["RAG", "LangChain", "OpenAI APIs", "FastAPI", "pgvector", "PostgreSQL", "NetworkX"] },
  { category: "Cloud Platforms", items: ["AWS", "Azure", "GCP", "Linux"] },
  { category: "CI/CD & Security", items: ["Azure Pipelines", "Jenkins", "ArgoCD", "SonarQube", "Trivy"] },
  { category: "Automation & Containers", items: ["Terraform", "Ansible", "HashiCorp Packer", "Docker", "Kubernetes", "Helm", "AKS", "EKS", "Istio"] },
  { category: "Monitoring & Observability", items: ["CloudWatch", "Prometheus", "Grafana", "Kiali", "Tableau"] },
  { category: "Collaboration & Agile", items: ["Azure DevOps", "GitHub", "Jira", "Slack", "Microsoft Teams", "VS Code", "Scrum", "Kanban"] },
  { category: "Other", items: ["AI Infrastructure", "Backend Systems", "Retrieval Pipelines", "GitOps", "MLOps", "DevSecOps", "Data Workflows", "Observability", "Research Infrastructure", "Security & Governance"] },
];

export const education = [
  {
    degree: "Master of Science - Computer Science",
    university: "University of Illinois at Chicago",
    duration: "Aug 2024 - May 2026",
    location: "Chicago, Illinois",
    gpa: "GPA: 3.88/4.00",
    coursework: [
      "Intro to Data Science",
      "Intro to Networking",
      "Programming Language Design",
      "Responsible AI Engineering",
      "Network and Privacy in Distributed Systems",
      "Database Systems",
      "Deep Learning for NLP",
      "Query Processing in Database Systems",
      "Natural Language Processing",
    ],
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    specialization: "Specialization: Artificial Intelligence",
    university: "Jain University",
    duration: "2020 - 2024",
    location: "Bangalore, India",
    gpa: "GPA: 3.91/4.00",
    coursework: [],
  },
];

export const leadership = {
  role: "Graduate Student Council Representative, Computer Science Department",
  org: "University of Illinois Chicago",
  duration: "Aug 2025 - May 2026 | Chicago, Illinois",
  points: [
    "Represented the Computer Science Department in the Graduate Student Council (GSC), raising student concerns and coordinating with university administration.",
    "Drove departmental participation in graduate travel, research, and project funding programs while fostering communication across faculty and student communities.",
  ],
};

export const patent = {
  title: "Book Issue Management System for Libraries",
  number: "Patent No. 202341071153",
  date: "Issued: November 24, 2023 | Intellectual Property India",
  description:
    "The invention leverages AI-enabled cameras, RFID systems, and automated access control to streamline book issuance and return processes in libraries through intelligent user identification and tracking.",
  tags: ["AI-Enabled Cameras", "RFID Systems", "Access Control", "Computer Vision"],
};

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
