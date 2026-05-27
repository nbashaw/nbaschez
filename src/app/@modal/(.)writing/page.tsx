import { Modal } from "@/components/modal";
import { WritingsList } from "@/components/writings-list";

export default function WritingModal() {
  return (
    <Modal title="Writing" contentMaxWidth="max-w-3xl">
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
  );
}
