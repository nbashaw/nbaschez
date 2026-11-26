"use client";

// trivial commit to trigger Vercel rebuild

import { HomeContent } from "@/components/home-content";

export default function NathanBaschez() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-start justify-center pt-6 sm:items-center sm:pt-0">
        <HomeContent />
      </div>
    </div>
  );
}
