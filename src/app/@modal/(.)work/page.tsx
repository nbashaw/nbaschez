"use client";

import { useRouter } from "next/navigation";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";
import { ProjectsList } from "@/components/projects-list";

export default function WorkModal() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
          <HomeContent />
        </div>
      </div>

      <Modal title="Work" onClose={() => router.push("/")} contentMaxWidth="max-w-3xl">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-10 text-lg">
            Selected projects and companies I’ve built or helped build, in
            reverse chronological order.
          </p>

          <ProjectsList />
        </div>
      </Modal>
    </>
  );
}
