"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { buttonVariants } from "./ui/button";

interface Project {
  id: number;
  title: string;
  subtitle: ReactNode;
  url: string;
  year: string;
  role?: string;
  dateRange?: string;
  image?: string;
  imageBackground?: "light";
  description?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Roughdraft",
    subtitle: (
      <>
        It is a pain to align with agents on complex ideas. One chatbox is not
        enough room.
        <br />
        <br />
        My solution was to build a Google Docs style interface where you and
        your agent can leave comments and suggest changes. It's open source and
        local first.{" "}
        <a
          href="https://x.com/irl_danB/status/2058325037791539510"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          People
        </a>{" "}
        <a
          href="https://x.com/rationalyst/status/2060749943279645137"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          love
        </a>{" "}
        <a
          href="https://x.com/john_swaine/status/2060456278951182405"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          it!
        </a>
        <br />
        <br />
        Tobias Lütke{" "}
        <a
          href="https://x.com/tobi/status/2057473584595873999"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          said
        </a>
        , "Great idea and effort. This will unlock a lot," and yep, that made my
        day.
      </>
    ),
    description:
      "Roughdraft brings a polished writing and review experience to agent-generated Markdown. It supports CriticMarkup for inline comments, insertions, deletions, and substitutions — making it easy for humans to give precise feedback on AI drafts.",
    url: "https://x.com/nbaschez/status/2057139892883464243",
    year: "2026",
    role: "creator",
    dateRange: "2026",
    image: "https://www.roughdraft.md/sneak-peek.png",
  },
  {
    id: 2,
    title: "Thoughtful",
    subtitle: (
      <>
        Teams need shared environments for working with agents. AI should feel
        less like a <span className="whitespace-nowrap">F-35</span> cockpit, and
        more like the bridge of the USS Enterprise.
        <br />
        <br />
        Thoughtful is like Claude, but it has a shared file system for skills,
        memory, databases, and mini-apps. Add teammates to live chats instead of
        sharing static snapshots. Connect any service or system of record.
        <br />
        <br />
        One team using it{" "}
        <a
          href="https://x.com/laurenlself/status/2030421336095592837"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          said
        </a>{" "}
        they were planning two hires but decided against it because Thoughtful
        made them so much more productive.
      </>
    ),
    description:
      "Thoughtful is an AI agent platform designed for teams. It provides persistent memory across sessions and shared context so agents can collaborate effectively over long-running projects.",
    url: "https://thoughtful.app",
    year: "2025",
    role: "creator",
    dateRange: "2025-2026",
    image: "/tfl.png",
  },
  {
    id: 3,
    title: "Lex",
    subtitle: (
      <>
        I started working on Lex as a side project inside of Every in September
        of 2022. This was a few months before ChatGPT, but I thought it would be
        interesting to see if GPT-3 could be made useful for writers somehow.
        <br />
        <br />
        The launch was incredible - 25K signups in 24 hours. But more
        importantly I was obsessed and excited to return to building software
        after a few years writing and editing. So we spun it out and I became
        CEO, and raised a round from True Ventures.
        <br />
        <br />
        Lex has served over 350K users and remains a canonical reference point
        for many when they think about AI and writing.
      </>
    ),
    description:
      "Lex is an AI-native collaborative word processor built from the ground up for serious writers. It combines the simplicity of a modern editor with powerful AI assistance that understands structure, tone, and long-form thinking.",
    url: "https://lex.page",
    year: "2022",
    role: "founder",
    dateRange: "2022-2025",
    image: "/lex.png",
  },
  {
    id: 4,
    title: "Every",
    subtitle: "Writer collective and business publication bundle",
    url: "https://every.to",
    year: "2020",
    role: "co-founder",
    dateRange: "2019-2022",
    image: "/every.png",
    imageBackground: "light",
  },
  {
    id: 9,
    title: "Gimlet",
    subtitle: "Podcast network and production company",
    url: "https://en.wikipedia.org/wiki/Gimlet_Media",
    year: "2017",
    role: "head of product",
    dateRange: "2017-2018",
    image: "/gimlet.svg",
    imageBackground: "light",
  },
  {
    id: 5,
    title: "Substack",
    subtitle: "Platform for independent writers",
    url: "https://substack.com",
    year: "2018",
    role: "1st employee",
    dateRange: "2018-2019",
    image: "/substack.svg",
    imageBackground: "light",
  },
  {
    id: 6,
    title: "Hardbound",
    subtitle: "Illustrated, interactive nonfiction stories for mobile",
    url: "https://youtu.be/awkAo1G_DD4?t=16",
    year: "2015",
    role: "founder",
    dateRange: "2015-2017",
    image: "/projects/hardbound.jpg",
  },
  {
    id: 7,
    title: "Product Hunt",
    subtitle: "Co-created the original product discovery platform",
    url: "https://medium.com/lets-make-things/the-origin-of-product-hunt-7acb09e2593a",
    year: "2013",
    role: "designed and built the v1",
    dateRange: "2013",
    image: "/product-hunt.svg",
    imageBackground: "light",
  },
  {
    id: 8,
    title: "Dash",
    subtitle:
      "I built this interactive, visual experience for learning to code because it's the way I wished I was taught. Kathy Sierra (a personal hero of mine) said, \"I'm super hard to impress on the learning side, and I was impressed.\"",
    url: "https://dash.generalassemb.ly",
    year: "2012",
    role: "creator",
    dateRange: "2013-2015",
    image: "/projects/dash.png",
  },
];

interface ProjectsListProps {
  className?: string;
}

export function ProjectsList({ className }: ProjectsListProps) {
  const featured = projects.slice(0, 3);
  const rest = projects.slice(3);

  return (
    <div className={className}>
      {/* Featured — large horizontal (full bleed via wide container) */}
      <div className="flex flex-col gap-y-6">
        {featured.map((project) => (
          <div key={project.id} className="block -mx-3 px-3 py-3 rounded-2xl">
            <div className="flex flex-col xl:flex-row xl:items-start gap-8 xl:gap-10">
              {/* Large image — left side, very wide */}
              <div className="w-full xl:w-[70%] xl:max-w-none flex-shrink-0 overflow-hidden rounded-[3px] my-3">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto block"
                    sizes="(max-width: 640px) 100vw, 800px"
                  />
                ) : (
                  <div className="relative bg-muted/40 min-h-[280px]">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 z-10" />
                  </div>
                )}
              </div>

              {/* Text content — right side */}
              <div className="flex-1 min-w-0 max-w-[600px] pt-4">
                <h3 className="font-semibold text-[22px] leading-tight tracking-[-0.01em]">
                  {project.title}
                </h3>
                {(project.role || project.dateRange) && (
                  <div className="mt-1.5 flex items-baseline gap-2 font-mono text-xs text-muted-foreground/70">
                    {project.role && (
                      <span className="tracking-[3px]">
                        {project.role.toUpperCase()}
                        {project.dateRange && ","}
                      </span>
                    )}
                    {project.dateRange && (
                      <span className="tracking-[2.5px]">
                        {project.dateRange}
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                  {project.subtitle}
                </p>

                <div className="mt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "cursor-pointer px-4",
                    })}
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--foreground) 16%, transparent)",
                    }}
                  >
                    Learn more{" "}
                    <ExternalLink className="ml-1 size-3.5 opacity-30" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Earlier work — smaller grid */}
      <div className="mt-10 pt-8 border-t border-white/10 dark:border-white/5">
        <div className="font-mono text-base tracking-[3px] text-muted-foreground mb-6">
          EARLIER WORK
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-9">
          {rest.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block -mx-2 -my-2 px-2 py-2 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="flex gap-5">
                {/* Small thumbnail */}
                <div
                  className={`relative w-32 flex-shrink-0 overflow-hidden rounded-[4px] aspect-[4/3] ${
                    project.imageBackground === "light"
                      ? "bg-muted/40 dark:bg-white dark:ring-1 dark:ring-white/10"
                      : "bg-muted/40 dark:bg-white/5"
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-3"
                      sizes="200px"
                    />
                  ) : (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 z-10" />
                      <div className="absolute inset-0 bg-muted/40 group-hover:bg-muted/60 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center px-3 z-10">
                        <div className="text-center">
                          <div className="font-mono text-[9px] tracking-[2px] text-muted-foreground/40">
                            {project.year}
                          </div>
                          <div className="font-semibold text-[10px] tracking-[-0.1px] leading-none text-foreground/70 mt-0.5">
                            {project.title.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Compact text */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[17px] leading-tight tracking-[-0.01em] transition-colors">
                    {project.title}
                  </h3>
                  {(project.role || project.dateRange) && (
                    <div className="mt-1 flex items-baseline gap-1.5 font-mono text-[10px] text-muted-foreground/70">
                      {project.role && (
                        <span className="tracking-[2px]">
                          {project.role.toUpperCase()}
                          {project.dateRange && ","}
                        </span>
                      )}
                      {project.dateRange && (
                        <span className="tracking-[2px]">
                          {project.dateRange}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="mt-2 text-[13px] leading-snug text-foreground/80 line-clamp-3">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
