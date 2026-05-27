"use client";

import { useRouter } from "next/navigation";
import { BooksGrid } from "@/components/books-grid";
import { HomeContent } from "@/components/home-content";
import { Modal } from "@/components/modal";

export default function BooksPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1080px] px-6 flex min-h-screen items-center">
          <HomeContent />
        </div>
      </div>

      {/* Auto-open the Books modal when directly visiting /books */}
      <Modal title="Books" onClose={() => router.push("/")} contentMaxWidth="max-w-3xl">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground mb-8">
            A small selection of books that have influenced how I think and
            work.
          </p>

          <BooksGrid columns={3} />

          <p className="pt-10 text-sm text-muted-foreground">
            This is a very incomplete list. I’ll add more over time.
          </p>
        </div>
      </Modal>
    </>
  );
}
