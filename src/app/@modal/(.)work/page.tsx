import { Modal } from "@/components/modal";
import { WorkContent } from "@/components/work-content";

export default function WorkModal() {
  return (
    <Modal
      title="Work"
      contentMaxWidth="max-w-none"
      contentCentered={false}
      modalMaxWidth="max-w-[min(1320px,96vw)]"
    >
      <WorkContent />
    </Modal>
  );
}
