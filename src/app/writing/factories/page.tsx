import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { factoriesSlides, factoriesTalk } from "@/content/factories-talk";

const { title, description, date, isoDate, cover } = factoriesTalk;

export const metadata: Metadata = {
  title: `${title} — Nathan Baschez`,
  description,
  alternates: { canonical: `/writing/${factoriesTalk.slug}` },
  openGraph: {
    title,
    description,
    url: `/writing/${factoriesTalk.slug}`,
    siteName: "Nathan Baschez",
    type: "article",
    authors: ["Nathan Baschez"],
    publishedTime: isoDate,
    images: [{ url: cover, width: 1100, height: 619, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cover],
  },
};

// Renders *italic* and **bold** inline markup from the talk captions.
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // biome-ignore lint/suspicious/noArrayIndexKey: static text segments
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 1) {
      // biome-ignore lint/suspicious/noArrayIndexKey: static text segments
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function FactoriesTalkPage() {
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-[1080px] px-4 sm:px-6 pt-10 pb-24 sm:pt-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Nathan Baschez
        </Link>

        <header className="mt-10 max-w-2xl sm:mt-14">
          <p className="text-sm text-muted-foreground">
            Talk · <time dateTime={isoDate}>{date}</time>
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            {description}
          </p>
        </header>

        <div className="mt-12 space-y-12 sm:mt-16 md:space-y-16">
          {factoriesSlides.map(({ slide, text }, index) => (
            <section
              key={slide}
              className="grid gap-5 md:grid-cols-[55fr_45fr] md:items-center md:gap-10"
            >
              <Image
                src={`/talks/factories/slide-${String(slide).padStart(2, "0")}.jpg`}
                alt={`Slide ${index + 1}`}
                width={1100}
                height={619}
                sizes="(max-width: 768px) 100vw, 560px"
                loading={index < 2 ? "eager" : "lazy"}
                className="w-full h-auto rounded-lg border border-border"
              />
              <div className="space-y-3 text-[17px] leading-relaxed text-foreground/90">
                {text.map((paragraph) => (
                  <p key={paragraph}>{renderInline(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
