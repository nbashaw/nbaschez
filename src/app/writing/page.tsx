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
      <Modal
        title="Writing"
        onClose={() => router.push("/")}
        contentMaxWidth="max-w-2xl"
        modalMaxWidth="max-w-[min(720px,95vw)]"
      >
        <div className="-ml-2 -mt-8 max-w-2xl mx-auto">
          <WritingsList />
        </div>
      </Modal>
    </>
  );
}
