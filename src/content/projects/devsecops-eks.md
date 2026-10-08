---
title: DevSecOps on AWS EKS
tagline: My build-scan-deploy pipeline and AWS setup for running a community three-tier app on EKS, with Terraform, Jenkins, SonarQube, Trivy, ECR and an ALB ingress.
category: Personal
context: Built on a community reference app
role: Solo. The app is upstream's, and the pipeline, AWS setup and deployment changes are mine.
dates: Mar 2026
status: Complete
order: 10
featured: false
cover: /projects/devsecops-eks.png
stack: [AWS EKS, Terraform, Jenkins, SonarQube, Trivy, Docker, ECR]
links:
  - label: View the code
    href: https://github.com/Srivatsa03/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
  - label: Upstream app
    href: https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project
flow:
  - name: Infrastructure
    detail: Terraform builds the VPC, security group, IAM role and the Jenkins host, with remote state in S3 and DynamoDB.
  - name: CI
    detail: Jenkins checks out the code, runs SonarQube and its quality gate, scans the filesystem with Trivy, builds the image, pushes it to ECR and scans the image.
  - name: Manifest bump
    detail: The pipeline writes the new image tag into the Kubernetes manifest and pushes it.
  - name: Workloads
    detail: Frontend, backend (two replicas with liveness, readiness and startup probes) and MongoDB on a persistent volume, with rolling updates.
  - name: Ingress
    detail: An internet-facing AWS Load Balancer Controller ingress routes traffic to the frontend and API.
results: []
---

## The problem

I wanted to stand up a real build, scan, push and deploy path to EKS in my own AWS account, end to end. Rather than write a toy app, I took a well-known community three-tier task app (React, Node and MongoDB) and built the pipeline and infrastructure around it.

To be clear about what's mine: the app, its manifests and the Jenkinsfile skeletons come from the upstream project. I retargeted the pipeline to my own ECR, credentials and Terraform backend, resized the infrastructure, reworked the ingress, and fixed the stages that broke.

## How it works

<!-- flow -->

## Decisions and tradeoffs

- **A smaller Jenkins host.** Upstream uses a t2.2xlarge. I moved to a t3.micro with my own state bucket, which was enough for a single-user pipeline and much cheaper.
- **A timeout on the SonarQube quality gate.** The gate stage hung, so I wrapped it in a 5-minute timeout with error handling to keep the pipeline moving.

## What broke

The quality-gate stage kept hanging, and it took five commits in one day to add and tune the timeout and its error handling. I also had to switch ECR credentials and fix the Jenkins package key URL, which had moved.

## What I'd fix next

There's no benchmark here. It's a working pipeline, and the most useful output was seeing where it's weaker than it looks:

- Trivy writes its findings to a file but never fails the build, and the image scan runs after the image is already in ECR. I'd scan before the push and fail on HIGH and CRITICAL findings.
- The quality gate doesn't block either, because of the timeout and catch I added. It should block once the hang is fixed properly.
- The EKS cluster itself isn't in Terraform, and deploys are a manifest bump instead of a GitOps controller. Argo CD would be the next step.
