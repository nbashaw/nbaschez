"use client";

import { useRouter } from "next/navigation";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";
import { AboutContent } from "@/components/about-content";

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
          <HomeContent />
        </div>
      </div>

      {/* Auto-open the About modal when directly visiting /about */}
      <Modal title="About" onClose={() => router.push("/")} contentMaxWidth="max-w-3xl">
        <AboutContent />
      </Modal>
    </>
  );
}
