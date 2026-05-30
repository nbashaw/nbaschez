"use client";

import { useRouter } from "next/navigation";
import { AboutContent } from "@/components/about-content";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";

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
      <Modal
        title="About"
        onClose={() => router.push("/")}
        contentMaxWidth="max-w-2xl"
        modalMaxWidth="max-w-[min(720px,95vw)]"
      >
        <AboutContent />
      </Modal>
    </>
  );
}
