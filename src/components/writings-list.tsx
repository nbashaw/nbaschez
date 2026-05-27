interface Writing {
  id: number;
  title: string;
  date: string;
  description: string;
  url: string;
}

const writings: Writing[] = [
  {
    id: 1,
    title: "A New Kind of Startup Is Coming",
    date: "April 19, 2023",
    description: "AI will let a new wave of startups stay tiny for far longer while achieving massive scale and pursuing weirder, more ambitious ideas than was previously feasible.",
    url: "https://every.to/divinations/a-new-kind-of-startup-is-coming",
  },
  {
    id: 2,
    title: "LLMs are the new CPUs",
    date: "March 15, 2023",
    description: "Large language models function like the central processors of the AI era, but unlike Intel’s CPUs they will likely commoditize due to low switching costs, forcing providers to compete on efficiency and scale.",
    url: "https://every.to/divinations/llms-are-the-new-cpus",
  },
  {
    id: 3,
    title: "The Infinite Article",
    date: "September 27, 2022",
    description: "Current AI still falls well short of enabling a truly personalized “infinite article” that dynamically writes perfect, accurate, up-to-date content tailored to each reader’s interests and knowledge.",
    url: "https://every.to/divinations/the-infinite-article",
  },
  {
    id: 4,
    title: "How Memes Control Everything",
    date: "October 13, 2021",
    description: "Memes—units of cultural imitation such as ideas, fashions, and strategies—spread through evolutionary dynamics of variation and selection, shaping far more of our economic and social behavior than we usually recognize.",
    url: "https://every.to/divinations/how-memes-control-everything-8ef8ece7-58b3-45b7-b906-0b6acc48d387",
  },
  {
    id: 5,
    title: "Why Content is King",
    date: "December 17, 2020",
    description: "Media businesses often build exceptionally durable power through scale economies, network effects, branding, talent monopolies, and other structural advantages that technology investors tend to underestimate.",
    url: "https://every.to/divinations/why-content-is-king-26199975",
  },
  {
    id: 6,
    title: "Finding Power",
    date: "May 4, 2020",
    description: "Power in any value chain flows to the player controlling the critical integration points that solve customers’ most urgent “not good enough” problems, and shifts when those problems move elsewhere.",
    url: "https://every.to/divinations/finding-power-432187",
  },
  {
    id: 7,
    title: "Bundle Magic",
    date: "April 15, 2020",
    description: "When customers value different items in a collection of products, bundling them together captures far more total revenue than selling each one separately because buyers pay for the whole package while heavily wanting only a subset.",
    url: "https://every.to/divinations/bundle-magic-379035",
  },
];

interface WritingsListProps {
  className?: string;
}

export function WritingsList({ className }: WritingsListProps) {
  return (
    <div className={className}>
      <div className="space-y-9">
        {writings.map((writing) => (
          <div key={writing.id} className="group">
            <a
              href={writing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="font-semibold text-xl leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-2 transition-colors">
                {writing.title}
              </h3>
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              {writing.date} · Divinations
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/90">
              {writing.description}
            </p>
          </div>
        ))}
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
