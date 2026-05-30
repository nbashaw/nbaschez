"use client";

import Link from "next/link";
import { ProjectsList } from "@/components/projects-list";

export default function Work() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1080px] px-6 pt-12 pb-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">Work</h1>

          <p className="text-xl text-muted-foreground mb-10">
            Selected projects and companies I’ve built or helped build, in
            reverse chronological order.
          </p>

          <ProjectsList />

          <div className="mt-16">
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
