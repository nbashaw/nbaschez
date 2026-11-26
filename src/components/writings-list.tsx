import Image from "next/image";
import Link from "next/link";
import { factoriesTalk } from "@/content/factories-talk";

interface Writing {
  id: number;
  title: string;
  date: string;
  description: string;
  url: string;
  image: string;
}

const writings: Writing[] = [
  {
    id: 10,
    title: "A new shape for work",
    date: "November 20, 2026",
    description:
      "A field guide for building a shared context system that you, your team, and your agents can work in together.",
    url: "https://www.notion.com/a-new-shape-for-work",
    image: "/writing/cards/new-shape-for-work.jpg",
  },
  {
    id: 0,
    title: factoriesTalk.title,
    date: factoriesTalk.date,
    description: factoriesTalk.description,
    url: `/writing/${factoriesTalk.slug}`,
    image: factoriesTalk.cover,
  },
  {
    id: 11,
    title: "Against the Personal Agents Theory of Everything",
    date: "October 4, 2026",
    description:
      "Personal agents will matter, but the future of work is more multiplayer, more automated, and more complex than any individual agent can handle. Published in The Leverage.",
    url: "https://www.gettheleverage.com/p/against-the-personal-agents-theory",
    image: "/writing/cards/against-personal-agents.jpg",
  },
  {
    id: 1,
    title: "A New Kind of Startup Is Coming",
    date: "April 19, 2023",
    description:
      "AI will let a new wave of startups stay tiny for far longer while achieving massive scale and pursuing weirder, more ambitious ideas than was previously feasible.",
    url: "https://every.to/divinations/a-new-kind-of-startup-is-coming",
    image: "/writing/cards/new-kind-startup.jpg",
  },
  {
    id: 2,
    title: "LLMs are the new CPUs",
    date: "March 15, 2023",
    description:
      "Large language models function like the central processors of the AI era, but unlike Intel’s CPUs they will likely commoditize due to low switching costs, forcing providers to compete on efficiency and scale.",
    url: "https://every.to/divinations/llms-are-the-new-cpus",
    image: "/writing/cards/llms-new-cpus.jpg",
  },
  {
    id: 3,
    title: "The Infinite Article",
    date: "September 27, 2022",
    description:
      "Current AI still falls well short of enabling a truly personalized “infinite article” that dynamically writes perfect, accurate, up-to-date content tailored to each reader’s interests and knowledge.",
    url: "https://every.to/divinations/the-infinite-article",
    image: "/writing/cards/infinite-article.jpg",
  },
  {
    id: 4,
    title: "How Memes Control Everything",
    date: "October 13, 2021",
    description:
      "Memes—units of cultural imitation such as ideas, fashions, and strategies—spread through evolutionary dynamics of variation and selection, shaping far more of our economic and social behavior than we usually recognize.",
    url: "https://every.to/divinations/how-memes-control-everything-8ef8ece7-58b3-45b7-b906-0b6acc48d387",
    image: "/writing/cards/memes-control-everything.jpg",
  },
  {
    id: 5,
    title: "Why Content is King",
    date: "December 17, 2020",
    description:
      "Media businesses often build exceptionally durable power through scale economies, network effects, branding, talent monopolies, and other structural advantages that technology investors tend to underestimate.",
    url: "https://every.to/divinations/why-content-is-king-26199975",
    image: "/writing/cards/content-is-king.jpg",
  },
  {
    id: 6,
    title: "Finding Power",
    date: "May 4, 2020",
    description:
      "Power in any value chain flows to the player controlling the critical integration points that solve customers’ most urgent “not good enough” problems, and shifts when those problems move elsewhere.",
    url: "https://every.to/divinations/finding-power-432187",
    image: "/writing/cards/finding-power.jpg",
  },
  {
    id: 7,
    title: "Bundle Magic",
    date: "April 15, 2020",
    description:
      "When customers value different items in a collection of products, bundling them together captures far more total revenue than selling each one separately because buyers pay for the whole package while heavily wanting only a subset.",
    url: "https://every.to/divinations/bundle-magic-379035",
    image: "/writing/cards/bundle-magic.jpg",
  },
];

interface WritingsListProps {
  className?: string;
}

export function WritingsList({ className }: WritingsListProps) {
  return (
    <div className={className}>
      <div className="space-y-6">
        {writings.map((writing) => {
          const className =
            "group flex flex-col gap-5 -mx-3 px-3 py-4 rounded-2xl hover:bg-muted transition-colors sm:flex-row sm:items-start";
          const content = (
            <>
              <div className="relative h-32 w-full overflow-hidden rounded-md sm:h-[112px] sm:w-40 sm:flex-shrink-0">
                <Image
                  src={writing.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-xl leading-tight tracking-tight transition-colors">
                  {writing.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {writing.date}
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/90">
                  {writing.description}
                </p>
              </div>
            </>
          );

          return writing.url.startsWith("/") ? (
            <Link key={writing.id} href={writing.url} className={className}>
              {content}
            </Link>
          ) : (
            <a
              key={writing.id}
              href={writing.url}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          );
        })}
      </div>

      <p className="pt-10 text-sm text-muted-foreground">
        For the full archive, visit{" "}
        <a
          href="https://every.to/divinations"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
        >
          every.to/divinations
        </a>
        .
      </p>
    </div>
  );
}
