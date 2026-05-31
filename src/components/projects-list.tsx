"use client";

import {
  layoutNextRichInlineLineRange,
  materializeRichInlineLineRange,
  type PreparedRichInline,
  prepareRichInline,
  type RichInlineCursor,
} from "@chenglou/pretext/rich-inline";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { buttonVariants } from "./ui/button";

const FEATURED_IMAGE_SKEW_X = 5;
const FEATURED_IMAGE_SKEW_Y = -2;
const FEATURED_TEXT_EDGE_GAP = 12;
const FEATURED_TEXT_LINE_HEIGHT = 24.5;
const FEATURED_TEXT_PARAGRAPH_GAP = 18;
const FEATURED_LINK_CLASS =
  "underline underline-offset-2 hover:text-foreground";

type Point = {
  x: number;
  y: number;
};

type SubtitleRun = {
  text: string;
  href?: string;
  className?: string;
  break?: "normal" | "never";
};

type FeaturedImageSkew = {
  x: number;
  y: number;
};

type FeaturedImageGeometry = {
  imageHeight: number;
  imageLeft: number;
  imageTop: number;
  imageWidth: number;
};

interface Project {
  id: number;
  title: string;
  subtitle: ReactNode;
  subtitleRuns?: SubtitleRun[][];
  url: string;
  year: string;
  role?: string;
  dateRange?: string;
  image?: string;
  imageBackground?: "light";
  imageTransform?: "skew" | "skew-inverted";
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
    subtitleRuns: [
      [
        {
          text: "It is a pain to align with agents on complex ideas. One chatbox is not enough room.",
        },
      ],
      [
        {
          text: "My solution was to build a Google Docs style interface where you and your agent can leave comments and suggest changes. It's open source and local first. ",
        },
        {
          text: "People",
          href: "https://x.com/irl_danB/status/2058325037791539510",
          className: FEATURED_LINK_CLASS,
        },
        { text: " " },
        {
          text: "love",
          href: "https://x.com/rationalyst/status/2060749943279645137",
          className: FEATURED_LINK_CLASS,
        },
        { text: " " },
        {
          text: "it!",
          href: "https://x.com/john_swaine/status/2060456278951182405",
          className: FEATURED_LINK_CLASS,
        },
      ],
      [
        { text: "Tobias Lütke " },
        {
          text: "said",
          href: "https://x.com/tobi/status/2057473584595873999",
          className: FEATURED_LINK_CLASS,
        },
        {
          text: ', "Great idea and effort. This will unlock a lot," and yep, that made my day.',
        },
      ],
    ],
    url: "https://x.com/nbaschez/status/2057139892883464243",
    year: "2026",
    role: "creator",
    dateRange: "2026",
    image: "https://www.roughdraft.md/sneak-peek.png",
    imageTransform: "skew",
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
    subtitleRuns: [
      [
        {
          text: "Teams need shared environments for working with agents. AI should feel less like a ",
        },
        {
          text: "F-35",
          className: "whitespace-nowrap",
          break: "never",
        },
        {
          text: " cockpit, and more like the bridge of the USS Enterprise.",
        },
      ],
      [
        {
          text: "Thoughtful is like Claude, but it has a shared file system for skills, memory, databases, and mini-apps. Add teammates to live chats instead of sharing static snapshots. Connect any service or system of record.",
        },
      ],
      [
        { text: "One team using it " },
        {
          text: "said",
          href: "https://x.com/laurenlself/status/2030421336095592837",
          className: FEATURED_LINK_CLASS,
        },
        {
          text: " they were planning two hires but decided against it because Thoughtful made them so much more productive.",
        },
      ],
    ],
    url: "https://thoughtful.app",
    year: "2025",
    role: "creator",
    dateRange: "2025-2026",
    image: "/tfl.png",
    imageTransform: "skew-inverted",
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
    subtitleRuns: [
      [
        {
          text: "I started working on Lex as a side project inside of Every in September of 2022. This was a few months before ChatGPT, but I thought it would be interesting to see if GPT-3 could be made useful for writers somehow.",
        },
      ],
      [
        {
          text: "The launch was incredible - 25K signups in 24 hours. But more importantly I was obsessed and excited to return to building software after a few years writing and editing. So we spun it out and I became CEO, and raised a round from True Ventures.",
        },
      ],
      [
        {
          text: "Lex has served over 350K users and remains a canonical reference point for many when they think about AI and writing.",
        },
      ],
    ],
    url: "https://lex.page",
    year: "2022",
    role: "founder",
    dateRange: "2022-2025",
    image: "/lex.png",
    imageTransform: "skew",
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

type PreparedParagraph = {
  prepared: PreparedRichInline;
  runs: SubtitleRun[];
};

type PositionedFragment = {
  key: string;
  text: string;
  href?: string;
  className?: string;
  gapBefore: number;
};

type PositionedLine = {
  key: string;
  x: number;
  y: number;
  width: number;
  fragments: PositionedFragment[];
};

function getFeaturedTextInsetStyle(inset: number | null) {
  if (inset === null) {
    return undefined;
  }

  return {
    "--featured-text-inset": `${inset}px`,
  } as CSSProperties;
}

function getFeaturedImageSkew(transform: Project["imageTransform"]) {
  if (!transform) {
    return null;
  }

  const multiplier = transform === "skew-inverted" ? -1 : 1;
  return {
    x: FEATURED_IMAGE_SKEW_X * multiplier,
    y: FEATURED_IMAGE_SKEW_Y * multiplier,
  };
}

function transformSkewedPoint({
  height,
  left,
  skew,
  top,
  width,
  x,
  y,
}: {
  height: number;
  left: number;
  skew: FeaturedImageSkew;
  top: number;
  width: number;
  x: number;
  y: number;
}) {
  const skewX = Math.tan((skew.x * Math.PI) / 180);
  const skewY = Math.tan((skew.y * Math.PI) / 180);
  const centerX = width / 2;
  const centerY = height / 2;
  const dx = x - centerX;
  const dy = y - centerY;

  return {
    x: left + centerX + dx + skewX * dy,
    y: top + centerY + skewY * dx + dy,
  };
}

function interpolateEdgeXAtY(start: Point, end: Point, y: number) {
  const edgeHeight = end.y - start.y;
  if (edgeHeight === 0) {
    return start.x;
  }

  const progress = Math.max(0, Math.min(1, (y - start.y) / edgeHeight));
  return start.x + (end.x - start.x) * progress;
}

function getFeaturedImageEdgeXAtY({
  geometry,
  imageSkew,
  side,
  y,
}: {
  geometry: FeaturedImageGeometry;
  imageSkew: FeaturedImageSkew;
  side: "left" | "right";
  y: number;
}) {
  const x = side === "left" ? 0 : geometry.imageWidth;
  const start = transformSkewedPoint({
    height: geometry.imageHeight,
    left: geometry.imageLeft,
    skew: imageSkew,
    top: geometry.imageTop,
    width: geometry.imageWidth,
    x,
    y: 0,
  });
  const end = transformSkewedPoint({
    height: geometry.imageHeight,
    left: geometry.imageLeft,
    skew: imageSkew,
    top: geometry.imageTop,
    width: geometry.imageWidth,
    x,
    y: geometry.imageHeight,
  });

  return interpolateEdgeXAtY(start, end, y);
}

function getFeaturedInsetAtY({
  alignToImageSide,
  geometry,
  imageSkew,
  y,
}: {
  alignToImageSide: "left" | "right";
  geometry: FeaturedImageGeometry;
  imageSkew: FeaturedImageSkew | null;
  y: number | null;
}) {
  if (!imageSkew || geometry.imageHeight === 0 || y === null) {
    return null;
  }

  if (alignToImageSide === "right") {
    return 0;
  }

  return (
    getFeaturedImageEdgeXAtY({
      geometry,
      imageSkew,
      side: "right",
      y,
    }) + FEATURED_TEXT_EDGE_GAP
  );
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

function useFeaturedImageGeometry({
  anchorRef,
  imageRef,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  imageRef: React.RefObject<HTMLElement | null>;
}) {
  const [geometry, setGeometry] = useState<FeaturedImageGeometry>({
    imageHeight: 0,
    imageLeft: 0,
    imageTop: 0,
    imageWidth: 0,
  });

  useEffect(() => {
    const updateGeometry = () => {
      const anchorElement = anchorRef.current;
      const imageElement = imageRef.current;
      if (!anchorElement || !imageElement) {
        return;
      }

      const anchorRect = anchorElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();
      const nextGeometry = {
        imageHeight: imageElement.offsetHeight,
        imageLeft: imageRect.left - anchorRect.left,
        imageTop: imageRect.top - anchorRect.top,
        imageWidth: imageElement.offsetWidth,
      };

      setGeometry((currentGeometry) =>
        currentGeometry.imageHeight === nextGeometry.imageHeight &&
        currentGeometry.imageLeft === nextGeometry.imageLeft &&
        currentGeometry.imageTop === nextGeometry.imageTop &&
        currentGeometry.imageWidth === nextGeometry.imageWidth
          ? currentGeometry
          : nextGeometry,
      );
    };

    updateGeometry();
    const anchorElement = anchorRef.current;
    const imageElement = imageRef.current;
    if (!anchorElement || !imageElement) {
      return;
    }

    const observer = new ResizeObserver(updateGeometry);
    observer.observe(anchorElement);
    observer.observe(imageElement);
    window.addEventListener("resize", updateGeometry);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateGeometry);
    };
  }, [anchorRef, imageRef]);

  return geometry;
}

function useRelativeElementY({
  anchorRef,
  elementRef,
  ratio = 0.5,
}: {
  anchorRef: React.RefObject<HTMLElement | null>;
  elementRef: React.RefObject<HTMLElement | null>;
  ratio?: number;
}) {
  const [y, setY] = useState<number | null>(null);

  useEffect(() => {
    const updateY = () => {
      const anchorElement = anchorRef.current;
      const element = elementRef.current;
      if (!anchorElement || !element) {
        return;
      }

      const anchorRect = anchorElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const nextY =
        elementRect.top - anchorRect.top + elementRect.height * ratio;
      setY((currentY) => (currentY === nextY ? currentY : nextY));
    };

    updateY();
    const anchorElement = anchorRef.current;
    const element = elementRef.current;
    if (!anchorElement || !element) {
      return;
    }

    const observer = new ResizeObserver(updateY);
    observer.observe(anchorElement);
    observer.observe(element);
    window.addEventListener("resize", updateY);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateY);
    };
  }, [anchorRef, elementRef, ratio]);

  return y;
}

function getTextFont(element: HTMLElement | null) {
  if (!element) {
    return "15px Inter, ui-sans-serif, system-ui, sans-serif";
  }

  const style = window.getComputedStyle(element);
  return style.font;
}

function isEndCursor(cursor: RichInlineCursor | undefined, itemCount: number) {
  return cursor?.itemIndex === itemCount;
}

function layoutParagraph(
  paragraph: PreparedParagraph,
  maxWidthForY: (lineY: number) => { x: number; width: number },
  startY: number,
) {
  const lines: PositionedLine[] = [];
  let cursor: RichInlineCursor | undefined;
  let y = startY;

  while (!isEndCursor(cursor, paragraph.runs.length)) {
    const lineBox = maxWidthForY(y + FEATURED_TEXT_LINE_HEIGHT / 2);
    const lineRange = layoutNextRichInlineLineRange(
      paragraph.prepared,
      Math.max(40, lineBox.width),
      cursor,
    );

    if (!lineRange) {
      break;
    }

    const line = materializeRichInlineLineRange(paragraph.prepared, lineRange);
    lines.push({
      key: `${startY}-${lines.length}`,
      x: lineBox.x,
      y,
      width: lineBox.width,
      fragments: line.fragments.map((fragment, fragmentIndex) => {
        const run = paragraph.runs[fragment.itemIndex];
        return {
          key: `${startY}-${lines.length}-${fragmentIndex}`,
          text: fragment.text,
          href: run?.href,
          className: run?.className,
          gapBefore: fragment.gapBefore,
        };
      }),
    });

    cursor = lineRange.end;
    y += FEATURED_TEXT_LINE_HEIGHT;
  }

  return { lines, nextY: y };
}

function SkewAlignedSubtitle({
  anchorRef,
  geometry,
  paragraphs,
  fallback,
  alignToImageSide,
  imageSkew,
}: {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  geometry: FeaturedImageGeometry;
  paragraphs?: SubtitleRun[][];
  fallback: ReactNode;
  alignToImageSide: "left" | "right";
  imageSkew: FeaturedImageSkew | null;
}) {
  const [textRef, textSize] = useElementSize<HTMLDivElement>();
  const subtitleTop = useRelativeElementY({
    anchorRef,
    elementRef: textRef,
    ratio: 0,
  });
  const [font, setFont] = useState<string | null>(null);

  useEffect(() => {
    const updateFont = () => setFont(getTextFont(textRef.current));
    updateFont();
    document.fonts?.ready.then(updateFont);
  }, [textRef]);

  const preparedParagraphs = useMemo<PreparedParagraph[]>(() => {
    if (!paragraphs || !font) {
      return [];
    }

    return paragraphs.map((runs) => ({
      runs,
      prepared: prepareRichInline(
        runs.map((run) => ({
          text: run.text,
          font,
          break: run.break,
        })),
      ),
    }));
  }, [font, paragraphs]);

  const { lines, height } = useMemo(() => {
    if (
      preparedParagraphs.length === 0 ||
      !imageSkew ||
      subtitleTop === null ||
      textSize.width === 0 ||
      geometry.imageHeight === 0
    ) {
      return { lines: [], height: 0 };
    }

    const maxWidthForY = (lineY: number) => {
      const imageRelativeLineY = subtitleTop + lineY;
      if (alignToImageSide === "right") {
        const availableWidth = Math.min(
          textSize.width,
          getFeaturedImageEdgeXAtY({
            geometry,
            imageSkew,
            side: "left",
            y: imageRelativeLineY,
          }) - FEATURED_TEXT_EDGE_GAP,
        );

        return {
          x: 0,
          width: Math.max(40, availableWidth),
        };
      }

      const x =
        getFeaturedImageEdgeXAtY({
          geometry,
          imageSkew,
          side: "right",
          y: imageRelativeLineY,
        }) + FEATURED_TEXT_EDGE_GAP;
      return {
        x,
        width: Math.max(40, textSize.width - x),
      };
    };

    let y = 0;
    const nextLines: PositionedLine[] = [];

    preparedParagraphs.forEach((paragraph, paragraphIndex) => {
      if (paragraphIndex > 0) {
        y += FEATURED_TEXT_PARAGRAPH_GAP;
      }

      const paragraphLayout = layoutParagraph(paragraph, maxWidthForY, y);
      nextLines.push(
        ...paragraphLayout.lines.map((line) => ({
          ...line,
          key: `${paragraphIndex}-${line.key}`,
        })),
      );
      y = paragraphLayout.nextY;
    });

    return { lines: nextLines, height: y };
  }, [
    alignToImageSide,
    geometry,
    imageSkew,
    preparedParagraphs,
    subtitleTop,
    textSize.width,
  ]);

  const canRenderCustomLayout = paragraphs && lines.length > 0;

  return (
    <>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/80 xl:hidden">
        {fallback}
      </p>
      <div
        ref={textRef}
        className="relative mt-3 hidden text-[15px] leading-relaxed text-foreground/80 xl:block"
        style={{ minHeight: canRenderCustomLayout ? height : undefined }}
      >
        {canRenderCustomLayout ? (
          lines.map((line) => (
            <span
              key={line.key}
              className="absolute left-0 top-0 block whitespace-nowrap"
              style={{
                transform: `translate(${line.x}px, ${line.y}px)`,
                width: line.width,
                lineHeight: `${FEATURED_TEXT_LINE_HEIGHT}px`,
              }}
            >
              {line.fragments.map((fragment) => {
                const style: CSSProperties | undefined =
                  fragment.gapBefore > 0
                    ? { marginLeft: fragment.gapBefore }
                    : undefined;

                if (fragment.href) {
                  return (
                    <a
                      key={fragment.key}
                      href={fragment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={fragment.className}
                      style={style}
                    >
                      {fragment.text}
                    </a>
                  );
                }

                return (
                  <span
                    key={fragment.key}
                    className={fragment.className}
                    style={style}
                  >
                    {fragment.text}
                  </span>
                );
              })}
            </span>
          ))
        ) : (
          <p>{fallback}</p>
        )}
      </div>
    </>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const [imageRef] = useElementSize<HTMLDivElement>();
  const [textColumnRef] = useElementSize<HTMLDivElement>();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageOnRight = project.featuredLayout === "image-right";
  const alignToImageSide = imageOnRight ? "right" : "left";
  const imageSkew = useMemo(
    () => getFeaturedImageSkew(project.imageTransform),
    [project.imageTransform],
  );
  const geometry = useFeaturedImageGeometry({
    anchorRef: textColumnRef,
    imageRef,
  });
  const titleY = useRelativeElementY({
    anchorRef: textColumnRef,
    elementRef: titleRef,
    ratio: 0.2,
  });
  const metaY = useRelativeElementY({
    anchorRef: textColumnRef,
    elementRef: metaRef,
  });
  const ctaY = useRelativeElementY({
    anchorRef: textColumnRef,
    elementRef: ctaRef,
  });
  const xlTitleInsetStyle = getFeaturedTextInsetStyle(
    getFeaturedInsetAtY({
      alignToImageSide,
      geometry,
      imageSkew,
      y: titleY,
    }),
  );
  const xlMetaInsetStyle = getFeaturedTextInsetStyle(
    getFeaturedInsetAtY({
      alignToImageSide,
      geometry,
      imageSkew,
      y: metaY,
    }),
  );
  const xlCtaInsetStyle = getFeaturedTextInsetStyle(
    getFeaturedInsetAtY({
      alignToImageSide,
      geometry,
      imageSkew,
      y: ctaY,
    }),
  );

  return (
    <div className="block -mx-3 px-3 py-3 rounded-2xl">
      <div
        className={`flex flex-col xl:items-start gap-8 xl:gap-10 ${
          imageOnRight ? "xl:flex-row-reverse" : "xl:flex-row"
        }`}
      >
        <div
          ref={imageRef}
          className="w-full xl:w-[70%] xl:max-w-none flex-shrink-0 my-3"
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={800}
              className="block h-auto w-full rounded-[3px]"
              style={
                imageSkew
                  ? {
                      transform: `skew(${imageSkew.x}deg, ${imageSkew.y}deg)`,
                      transformOrigin: "center",
                    }
                  : undefined
              }
              sizes="(max-width: 640px) 100vw, 800px"
            />
          ) : (
            <div className="relative bg-muted/40 min-h-[280px]">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 z-10" />
            </div>
          )}
        </div>

        <div ref={textColumnRef} className="flex-1 min-w-0 max-w-[600px] pt-4">
          <div>
            <h3
              ref={titleRef}
              className="font-semibold text-[28px] leading-tight tracking-[-0.01em] xl:translate-x-[var(--featured-text-inset,0px)] md:text-[32px]"
              style={xlTitleInsetStyle}
            >
              {project.title}
            </h3>
            {(project.role || project.dateRange) && (
              <div
                ref={metaRef}
                className="mt-1.5 flex items-baseline gap-2 font-mono text-xs text-muted-foreground/70 xl:translate-x-[var(--featured-text-inset,0px)]"
                style={xlMetaInsetStyle}
              >
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
          <SkewAlignedSubtitle
            anchorRef={textColumnRef}
            geometry={geometry}
            paragraphs={project.subtitleRuns}
            fallback={project.subtitle}
            alignToImageSide={alignToImageSide}
            imageSkew={imageSkew}
          />

          <div
            ref={ctaRef}
            className="mt-4 xl:translate-x-[var(--featured-text-inset,0px)]"
            style={xlCtaInsetStyle}
          >
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
