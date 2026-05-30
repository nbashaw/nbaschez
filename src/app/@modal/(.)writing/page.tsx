import { Modal } from "@/components/modal";
import { WritingsList } from "@/components/writings-list";

export default function WritingModal() {
  return (
    <Modal
      title="Writing"
      contentMaxWidth="max-w-2xl"
      modalMaxWidth="max-w-[min(720px,95vw)]"
    >
      <div className="-ml-2 -mt-8 max-w-2xl mx-auto">
        <WritingsList />
      </div>
    </Modal>
  );
}
