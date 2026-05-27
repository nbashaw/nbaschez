import Link from "next/link";

export default function Work() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1080px] px-6 pt-12 pb-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">Work</h1>

          <p className="text-xl text-muted-foreground mb-8">
            Selected projects and collaborations.
          </p>

          <div className="space-y-12 text-[15px] leading-relaxed">
            <p>
              A collection of things I’ve worked on over the years — from early
              startups and tools to writing and product work.
            </p>

            <p className="text-muted-foreground">More coming soon.</p>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-lg hover:underline"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
