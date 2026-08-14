
"use client";
// import { cn } from "@/lib/utils";
import { TracingBeam } from "../ui/tracing-beam"
import Image from "next/image";
import { data } from "@/data/data"
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { IconBriefcase2, IconSchool, IconCertificate, IconAward } from "@tabler/icons-react"
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function Experience() {
  return (
    <div className="flex flex-col">
      <SectionHeading icon={<IconBriefcase2 className={headingIconClass}/>}>
        Experience
      </SectionHeading>
      <TracingBeam>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <BlurFade key={`${item.company}-${item.role}-${index}`} delay={0.10 + index * .05} direction="right" inView>
              <ExperienceItem
                image={item.image}
                company={item.company}
                role={item.role}
                date={item.date}
                description={item.description}
                location={item.location}
                skills={item.skills}
                href={item.href}
              />
            </BlurFade>
          ))}
        </div>
      </TracingBeam>

      <BlurFade delay={0.10} direction="right" inView>
        <SectionHeading className="my-8" icon={<IconSchool className={headingIconClass} />}>
          Education
        </SectionHeading>
        <div className="space-y-4">
          <ExperienceItem
            image="/experience/uic.png"
            company="University of Illinois Chicago"
            role="Master of Science, Computer Science"
            date="Aug 2024 - May 2026"
            description="GPA 3.88 / 4.00"
            location="Chicago, IL"
            skills={["Fuzzing", "Bayesian Estimation", "Deep Learning", "Systems", "LLM Security"]}
            href="https://www.uic.edu"
          />
          <ExperienceItem
            image="/experience/jain.png"
            company="Jain University"
            role="B.Tech, Computer Science (AI Specialization)"
            date="2020 - 2024"
            description="GPA 3.91 / 4.00"
            location="Bangalore, India"
            skills={["Python", "Machine Learning", "Data Structures", "C++", "SQL"]}
            href="https://www.jainuniversity.ac.in"
          />
        </div>
      </BlurFade>

      <BlurFade delay={0.1} direction="right" inView>
        <SectionHeading className="my-8" icon={<IconCertificate className={headingIconClass} />}>
          Certifications &amp; Patent
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* AWS certification */}
          <div className="group/glow relative overflow-hidden rounded-lg border bg-background p-4 transition-all duration-400 hover:shadow-md">
            <SpotlightGlow />
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border bg-white/95 p-1.5">
                <Image src="/tools/aws.svg" alt="AWS" width={40} height={40} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-snug text-primary sm:text-base">
                  AWS Certified Solutions Architect &ndash; Associate
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">Amazon Web Services &middot; Issued 2026</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Designing distributed, cost-optimized, and resilient systems on AWS: VPC and IAM, auto-scaling, and observability.
            </p>
          </div>

          {/* Patent */}
          <div className="group/glow relative overflow-hidden rounded-lg border bg-background p-4 transition-all duration-400 hover:shadow-md">
            <SpotlightGlow />
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border bg-secondary">
                <IconAward className="h-6 w-6 text-violet-500 dark:text-violet-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-snug text-primary sm:text-base">
                  Book Issue Management System for Libraries
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Patent No. 202341071153 &middot; Intellectual Property India &middot; Nov 2023
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Co-invented an AI-enabled camera and RFID system for automated library book issuance, return, and access control.
            </p>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

interface ExperienceItemProps {
  image: string;
  company: string;
  role: string;
  date: string;
  description?: string;
  location: string;
  skills: string[];
  href?: string;
}

export const ExperienceItem = ({
  image,
  company,
  role,
  date,
  description = "",
  location,
  skills,
  href,
}: ExperienceItemProps) => {
  const logo = (
    <Image
      src={image}
      width={100}
      height={100}
      alt={`${company} logo`}
      priority
      className="h-8 w-8 rounded-sm sm:h-10 sm:w-10 sm:rounded-md mt-1"
    />
  );

  return (
    <div className="group/glow relative overflow-hidden p-4 border rounded-xl sm:rounded-lg bg-background transition-all duration-400">
      <SpotlightGlow />
      <div className="flex flex-row space-x-2">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${company} website`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            {logo}
          </a>
        ) : (
          logo
        )}
        <div className="flex flex-col mb-2">
          <p className="font-bold tracking-tight leading-normal text-balance text-sm sm:text-base text-primary">
            {role}
            <span className="mx-1"> • </span>
            {company}
          </p>
          <p className=" text-balance leading-none tracking-tight text-xs md:text-sm font-normal text-muted-foreground ">
            {date}
            <span className="mx-0.5"> • </span>
            {location}
          </p>
        </div>
      </div>
      {description && (
        <p className="text-left mt-2 text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};