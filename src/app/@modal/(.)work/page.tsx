import Link from "next/link";
import { Modal } from "@/components/modal";

export default function WorkModal() {
  return (
    <Modal title="Work">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Work</h1>

        <p className="text-xl text-muted-foreground mb-8">
          Selected projects and collaborations.
        </p>

        <div className="space-y-8 leading-relaxed">
          <p>
            A collection of things I’ve worked on over the years — from early
            startups and tools to writing and product work.
          </p>

          <p className="text-muted-foreground">More coming soon.</p>
        </div>

        <div className="mt-10">
          <Link href="/" className="hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </Modal>
  );
}
