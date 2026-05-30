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
          <ProjectsList />
        </div>
      </Modal>
    </>
  );
}
