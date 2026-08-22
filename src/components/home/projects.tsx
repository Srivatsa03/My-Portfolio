"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BlurFade } from "../ui/blur-fade";
import { data } from "../../data/data"
import { IconBrush, IconLink } from "@tabler/icons-react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";

// Cover art per project, keyed by repo/link.
const PROJECT_IMAGES: Record<string, string> = {
    "https://github.com/Srivatsa03/rag-redteam": "/projects/rag-redteam.png",
    "https://github.com/Srivatsa03/kubemend": "/projects/kubemend.png",
    "https://github.com/Srivatsa03/UICLaborDocsChatbot": "/projects/metarag.png",
    "https://github.com/Srivatsa03/ECI-Pipeline": "/projects/eci-pipeline.png",
    "https://github.com/Srivatsa03/Chain-of-Thought-on-CLEVR": "/projects/cot-clevr.png",
    "https://github.com/Srivatsa03/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project": "/projects/devsecops-eks.png",
    "https://github.com/Srivatsa03/Movie-Recommendation": "/projects/movie-recommendation.png",
    "https://github.com/Srivatsa03/Counterfactual_Fact_Checking": "/projects/counterfactual.png",
};

export default function Projects() {
    return (
        <div className="flex flex-col">
            <SectionHeading icon={<IconBrush className={headingIconClass} />}>
                Projects
            </SectionHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-auto">
                {data.projects.map((item, index) => (
                    <BlurFade key={item.title} delay={0.04 * 12 + index * 0.05}>
                        <ProjectCard
                            href={item.href}
                            title={item.title}
                            description={item.description}
                            dates={item.dates}
                            tags={item.technologies}
                            type={item.type}
                            image={item.href ? PROJECT_IMAGES[item.href] : undefined}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

interface Props {
    title: string;
    href?: string;
    description: string;
    dates: string;
    tags: readonly string[];
    type?: string;
    image?: string;
    className?: string;
}

export function ProjectCard({ title, href, description, dates, tags, type, image }: Props) {
    const heading = title.split("|")[0].trim();
    return (
        <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full group"
        >
            <Card className="relative flex flex-col overflow-hidden border hover:shadow-md transition-all duration-300 ease-out h-full">
                <div className="relative h-44 overflow-hidden sm:h-48">
                    {image ? (
                        <Image
                            src={image}
                            alt={heading}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/15 via-transparent to-fuchsia-500/10">
                            <div className="px-6 text-center">
                                <p className="font-script text-2xl sm:text-3xl text-foreground/90">{heading}</p>
                                {type && (
                                    <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                                        {type}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/30 text-white rounded-full p-1 z-20 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
                        <IconLink className="h-5 w-5" />
                    </div>
                </div>
                <CardHeader className="px-2">
                    <div className="space-y-1">
                        <CardTitle className="mt-2 text-base">{title}</CardTitle>
                        <div className="text-xs text-muted-foreground">
                            {dates}
                            {type ? ` · ${type}` : ""}
                        </div>
                        <div className="prose max-w-full text-pretty text-sm mt-2 text-muted-foreground dark:prose-invert">
                            {description}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-2 flex flex-col px-2 pb-3">
                    {tags && tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge
                                    className="px-1 py-0.5 text-[12px]"
                                    variant="secondary"
                                    key={tag}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
