import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { ProjectVideoPlayer } from "./project-video-player";
import { buttonVariants } from "./ui/button";

const FEATURED_LINK_CLASS =
  "underline underline-offset-2 hover:text-foreground";

interface Project {
  id: number;
  title: string;
  subtitle: ReactNode;
  url: string;
  year: string;
  role?: string;
  dateRange?: string;
  image?: string;
  video?: {
    poster: string;
    src: string;
  };
  logo?: {
    mark:
      | "dash"
      | "every"
      | "gimlet"
      | "hardbound"
      | "productHunt"
      | "substack";
    background: string;
    foreground?: "black" | "white";
  };
  featuredLayout?: "image-right";
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
          className={FEATURED_LINK_CLASS}
        >
          People
        </a>{" "}
        <a
          href="https://x.com/rationalyst/status/2060749943279645137"
          target="_blank"
          rel="noopener noreferrer"
          className={FEATURED_LINK_CLASS}
        >
          love
        </a>{" "}
        <a
          href="https://x.com/john_swaine/status/2060456278951182405"
          target="_blank"
          rel="noopener noreferrer"
          className={FEATURED_LINK_CLASS}
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
          className={FEATURED_LINK_CLASS}
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
    video: {
      poster: "/projects/rd-vid-poster.jpg",
      src: "https://s93mdeievfdpgij0.public.blob.vercel-storage.com/projects/rd-vid-1920-60fps.mp4",
    },
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
          className={FEATURED_LINK_CLASS}
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
    video: {
      poster: "/projects/tfl-vid-poster.jpg",
      src: "https://s93mdeievfdpgij0.public.blob.vercel-storage.com/projects/tfl-vid-1920-60fps.mp4",
    },
    featuredLayout: "image-right",
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
    logo: {
      mark: "every",
      background: "#C0F0FB",
      foreground: "black",
    },
  },
  {
    id: 9,
    title: "Gimlet",
    subtitle: "Podcast network and production company",
    url: "https://en.wikipedia.org/wiki/Gimlet_Media",
    year: "2017",
    role: "head of product",
    dateRange: "2017-2018",
    logo: {
      mark: "gimlet",
      background: "#222222",
      foreground: "white",
    },
  },
  {
    id: 5,
    title: "Substack",
    subtitle: "Platform for independent writers",
    url: "https://substack.com",
    year: "2018",
    role: "1st employee",
    dateRange: "2018-2019",
    logo: {
      mark: "substack",
      background: "#FF6719",
      foreground: "white",
    },
  },
  {
    id: 6,
    title: "Hardbound",
    subtitle: "Illustrated, interactive nonfiction stories for mobile",
    url: "https://youtu.be/awkAo1G_DD4?t=16",
    year: "2015",
    role: "founder",
    dateRange: "2015-2017",
    logo: {
      mark: "hardbound",
      background: "#F04B37",
      foreground: "white",
    },
  },
  {
    id: 7,
    title: "Product Hunt",
    subtitle: "Co-created the original product discovery platform",
    url: "https://medium.com/lets-make-things/the-origin-of-product-hunt-7acb09e2593a",
    year: "2013",
    role: "designed and built the v1",
    dateRange: "2013",
    logo: {
      mark: "productHunt",
      background: "#DA552F",
      foreground: "white",
    },
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
    logo: {
      mark: "dash",
      background: "#000000",
      foreground: "white",
    },
  },
];

interface ProjectsListProps {
  className?: string;
}

function FeaturedProject({ project }: { project: Project }) {
  const imageOnRight = project.featuredLayout === "image-right";

  return (
    <div className="block -mx-3 px-3 py-3 rounded-2xl">
      <div
        className={`flex flex-col xl:items-start gap-8 xl:gap-10 ${
          imageOnRight ? "xl:flex-row-reverse" : "xl:flex-row"
        }`}
      >
        <div className="w-full xl:w-[70%] xl:max-w-none flex-shrink-0 my-3">
          {project.video ? (
            <ProjectVideoPlayer
              poster={project.video.poster}
              src={project.video.src}
              title={project.title}
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={800}
              className="block h-auto w-full rounded-[3px]"
              sizes="(max-width: 640px) 100vw, 800px"
            />
          ) : (
            <div className="relative bg-muted/40 min-h-[280px]">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 z-10" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 max-w-[600px] pt-4">
          <div>
            <h3 className="font-semibold text-[28px] leading-tight tracking-[-0.01em] md:text-[32px]">
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
                  <span className="tracking-[2.5px]">{project.dateRange}</span>
                )}
              </div>
            )}
          </div>
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
              Learn more <ExternalLink className="ml-1 size-3.5 opacity-30" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectLogo({ project }: { project: Project }) {
  if (!project.logo) {
    return null;
  }

  const foreground =
    project.logo.foreground === "black" ? "#111111" : "#ffffff";

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: project.logo.background, color: foreground }}
    >
      <LogoMark mark={project.logo.mark} />
    </div>
  );
}

function LogoMark({ mark }: { mark: NonNullable<Project["logo"]>["mark"] }) {
  switch (mark) {
    case "productHunt":
      return (
        <svg
          aria-hidden="true"
          className="h-[58%] w-[58%]"
          viewBox="0 0 58.48 58.48"
          fill="currentColor"
        >
          <path d="M33.138 29.24h-8.284v-8.772h8.284a4.386 4.386 0 1 1 0 8.772m0-14.62H19.006v29.24h5.848v-8.772h8.284c5.652 0 10.234-4.582 10.234-10.234S38.79 14.62 33.138 14.62" />
        </svg>
      );
    case "substack":
      return (
        <svg
          aria-hidden="true"
          className="h-[58%] w-[58%]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      );
    case "gimlet":
      return (
        <svg
          aria-hidden="true"
          className="h-[66%] w-[66%]"
          viewBox="0 -1 304 772"
          fill="currentColor"
        >
          <path d="M138.72 770.1h1.05c49.23 0 86.27-24.22 108.76-61.63l20.78 52.24h34.3v-386.9h-7.77H186.6h-39.53v104.74h39.53v143.88c0 25.12-11.29 37.45-31.95 37.45h-5.5c-20.65 0-31.95-12.34-31.95-37.45v-474.9c0-25.12 11.29-37.45 31.94-37.45h6.44c20.65 0 31.95 12.34 31.95 37.45v124.55h110.51V142.22c0-60.68-33.51-142.34-148.93-142.34C33.71-.12.2 81.54.2 142.22v485.53C.2 688.44 26.32 770.1 138.72 770.1z" />
        </svg>
      );
    case "hardbound":
      return (
        <svg
          aria-hidden="true"
          className="h-[58%] w-[58%]"
          viewBox="0 0 16.84 21.84"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.197 0H1.346C.603 0 0 .607 0 1.356v17.81c0 .749.603 1.356 1.346 1.356h6.063V1.22C7.409.546 6.866 0 6.197 0z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.641 21.84h4.852c.743 0 1.346-.607 1.346-1.356V8.535c0-.749-.603-1.356-1.346-1.356H9.43v13.441c0 .674.542 1.22 1.211 1.22z"
          />
        </svg>
      );
    case "dash":
      return (
        <svg
          aria-hidden="true"
          className="h-[64%] w-[64%]"
          viewBox="0 0 166 166"
        >
          <path
            d="M72.9159 0c0 5.55919 4.5249 10.0841 10.0841 10.0841S93.041 5.55919 93.041 0l12.411 2.49948c-2.111 5.12825.302 10.98912 5.43 13.14382 5.128 2.1116 11.032-.3017 13.144-5.4299l10.558 7.0244c-3.921 3.9216-3.921 10.2996 0 14.2212 3.922 3.9216 10.3 3.9216 14.221 0l7.025 10.515c-5.129 2.1117-7.585 8.0156-5.43 13.1439 2.111 5.1282 8.015 7.5415 13.144 5.4299l2.499 12.4112c-5.559 0-10.084 4.4818-10.084 10.041 0 5.5592 4.525 10.041 10.084 10.041l-2.456 12.411c-5.129-2.111-11.032.302-13.144 5.43-2.155 5.128.302 11.032 5.43 13.144l-7.025 10.558c-3.921-3.921-10.299-3.921-14.221 0-3.921 3.922-3.921 10.3 0 14.221l-10.558 7.025c-2.112-5.129-8.016-7.585-13.144-5.43-5.128 2.111-7.541 8.015-5.43 13.144L93.0841 166c0-5.559-4.4818-10.041-10.041-10.041-5.5592 0-10.0841 4.482-10.0841 10.041l-12.4112-2.456c2.1116-5.129-.3017-10.989-5.4299-13.144-5.1283-2.155-11.0322.301-13.1439 5.43l-10.5581-7.025c3.9216-3.921 3.9216-10.299 0-14.221-3.9216-3.921-10.2565-3.921-14.2212 0l-7.0244-10.515c5.1282-2.112 7.5846-8.016 5.4299-13.144-2.1116-5.128-8.01557-7.541-13.14381-5.43L0 93.0841c5.55919 0 10.041-4.4818 10.041-10.041 0-5.5592-4.48181-10.041-10.041-10.041l2.45639-12.4112c5.12824 2.1116 11.03221-.3017 13.14381-5.4299 2.1547-5.1283-.3017-11.0322-5.4299-13.1439l7.0244-10.515c3.9216 3.9216 10.2996 3.9216 14.2212 0 3.9216-3.9216 3.9216-10.2996 0-14.2212l10.5581-7.0244c2.1117 5.1282 8.0156 7.5846 13.1439 5.4299 5.1282-2.1116 7.5415-8.01558 5.4299-13.14382L72.959.0430945 72.9159 0Z"
            fill="#E41F26"
          />
          <path
            d="M60.5044 33.8722c-5.6884 0-10.041 1.6376-13.0576 4.9128-3.0166 3.2752-4.5249 7.6277-4.5249 13.0576v63.0044c0 5.774 1.4221 10.084 4.1801 12.971 2.8012 2.888 7.1968 4.31 13.2731 4.31 5.43 0 9.6101-1.466 12.5836-4.396 2.9736-2.93 4.4388-7.197 4.4388-12.799V85.5856H61.2801v11.6786h2.8874v18.3578c0 1.078-.3879 2.026-1.2498 2.672-.8188.69-1.853 1.035-3.1028 1.035-1.6376 0-2.6718-.431-3.1028-1.293-.4309-.862-.6464-1.724-.6464-2.672V51.7995c0-.474.0431-.9912.1724-1.6376.1293-.6033.3447-1.2066.6464-1.7238.3017-.5171.7326-.948 1.2928-1.3359.5603-.3447 1.2498-.5602 2.1548-.5602h.1723c.8619 0 1.5945.1724 2.1117.5602.5602.3448.9911.8188 1.2928 1.3359.3017.5172.5602 1.0774.6464 1.7238.1293.6464.1724 1.1636.1724 1.6376v14.6521h13.1869V51.7995c0-5.4299-1.5083-9.7824-4.5249-13.0576-3.0166-3.2752-7.3692-4.9128-13.0576-4.9128M110.15 34.4756H94.0754l-12.799 97.0484H95.239l3.0166-23.572h7.9724l3.017 23.572h13.876l-12.885-97.0484h-.086Zm-7.973 62.5732c-4.0507 0-7.3259-3.3183-7.3259-7.4123 0-4.0939 3.2752-7.4122 7.3259-7.4122 4.051 0 7.326 3.3183 7.326 7.4122 0 4.094-3.275 7.4123-7.326 7.4123Z"
            fill="#ffffff"
          />
        </svg>
      );
    case "every":
      return (
        <Image
          aria-hidden="true"
          alt=""
          className="block h-[64%] w-[64%] object-contain"
          height={21}
          src="https://every.to/assets/onboarding/icons/every-colored-1dc8cc9022c7ce629d405c63311597ecfa9a89fce54e085ce5cec3f099799583.svg"
          style={{
            filter: "brightness(0)",
          }}
          unoptimized
          width={20}
        />
      );
  }
}

export function ProjectsList({ className }: ProjectsListProps) {
  const featured = projects.slice(0, 3);
  const rest = projects.slice(3);

  return (
    <div className={className}>
      {/* Featured — large horizontal (full bleed via wide container) */}
      <div className="flex flex-col gap-y-14 md:gap-y-16 xl:gap-y-20">
        {featured.map((project) => (
          <FeaturedProject key={project.id} project={project} />
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
                <div className="relative w-32 flex-shrink-0 overflow-hidden rounded-[4px] aspect-[4/3] bg-muted/40 dark:bg-white/5">
                  {project.logo ? (
                    <ProjectLogo project={project} />
                  ) : project.image ? (
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
