"use client";

import Link from "next/link";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Roughdraft",
    subtitle: "Local-first Markdown review tool for human + AI agent collaboration",
    url: "https://roughdraft.md",
    year: "2026",
  },
  {
    id: 2,
    title: "Thoughtful",
    subtitle: "AI agent platform for teams with persistent memory and shared context",
    url: "https://thoughtful.app",
    year: "2025",
  },
  {
    id: 3,
    title: "Lex",
    subtitle: "AI-native collaborative word processor for serious writing",
    url: "https://lex.page",
    year: "2022",
  },
  {
    id: 4,
    title: "Every",
    subtitle: "Writer collective and business publication bundle",
    url: "https://every.to",
    year: "2020",
  },
  {
    id: 5,
    title: "Substack",
    subtitle: "First employee and VP of Product",
    url: "https://substack.com",
    year: "2018",
  },
  {
    id: 6,
    title: "Hardbound",
    subtitle: "Illustrated, interactive nonfiction stories for mobile",
    url: "https://hardbound.co",
    year: "2015",
  },
  {
    id: 7,
    title: "Product Hunt",
    subtitle: "Co-created the original product discovery platform",
    url: "https://www.producthunt.com",
    year: "2013",
  },
  {
    id: 8,
    title: "Dash",
    subtitle: "Interactive learn-to-code tutorials (acquired by General Assembly)",
    url: "https://dash.generalassemb.ly",
    year: "2012",
  },
];

interface ProjectsListProps {
  className?: string;
}

export function ProjectsList({ className }: ProjectsListProps) {
  return (
    <div className={className}>
      <div className="space-y-12">
        {projects.map((project) => (
          <div key={project.id} className="group flex flex-col sm:flex-row gap-5 sm:gap-7">
            {/* Visual / Image slot */}
            <div className="relative w-full sm:w-40 md:w-44 flex-shrink-0 overflow-hidden rounded-[4px] border border-border/60 bg-muted/40 h-28 sm:h-24 md:h-[102px] transition-all group-hover:border-border/80 group-hover:bg-muted/60">
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />

              <div className="absolute inset-0 flex items-center justify-center px-5">
                <div className="text-center">
                  <div className="font-mono text-[9px] tracking-[3px] text-muted-foreground/40 mb-1">
                    {project.year}
                  </div>
                  <div className="font-semibold text-[13px] tracking-[-0.1px] text-foreground/75 leading-none">
                    {project.title.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Hover ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-border/0 group-hover:ring-border/50 transition-all rounded-[4px]" />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="font-semibold text-[21px] leading-tight tracking-[-0.01em] group-hover:underline decoration-1 underline-offset-2 transition-colors">
                  {project.title}
                </h3>
              </a>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">
                {project.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-12 text-sm text-muted-foreground">
        More projects and details coming soon.
      </p>
    </div>
  );
}
