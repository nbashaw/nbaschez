"use client";

import { HomeContent } from "@/components/home-content";
import { Signature } from "@/components/signature";

export default function NathanBaschez() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-8 left-8 z-10">
        <Signature className="w-[84px] h-auto text-foreground" />
      </div>

      <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
        <HomeContent />
      </div>
    </div>
  );
}
