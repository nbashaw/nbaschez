"use client";

import { useRouter } from "next/navigation";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";
import { WorkContent } from "@/components/work-content";

export default function WorkPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
          <HomeContent />
        </div>
      </div>

      {/* Auto-open the Work modal when directly visiting /work */}
      <Modal title="Work" onClose={() => router.push("/")} contentMaxWidth="max-w-3xl">
        <WorkContent />
      </Modal>
    </>
  );
}
