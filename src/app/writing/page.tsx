"use client";

import { useRouter } from "next/navigation";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";
import { WritingsList } from "@/components/writings-list";

export default function WritingPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
          <HomeContent />
        </div>
      </div>

      {/* Auto-open the Writing modal when directly visiting /writing */}
      <Modal title="Writing" onClose={() => router.push("/")} contentMaxWidth="max-w-3xl">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-10 text-lg">
            A selection of essays from over the years, mostly from my column{" "}
            <a
              href="https://every.to/divinations"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
            >
              Divinations
            </a>{" "}
            at Every.
          </p>

          <WritingsList />
        </div>
      </Modal>
    </>
  );
}
