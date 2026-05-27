import { BooksGrid } from "@/components/books-grid";
import { Modal } from "@/components/modal";

export default function BooksModal() {
  return (
    <Modal title="Books" contentMaxWidth="max-w-3xl">
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground mb-8">
          A small selection of books that have influenced how I think and work.
        </p>

        <BooksGrid columns={3} />

        <p className="pt-10 text-sm text-muted-foreground">
          This is a very incomplete list. I’ll add more over time.
        </p>
      </div>
    </Modal>
  );
}
