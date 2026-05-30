import { Modal } from "@/components/modal";
import { WorkContent } from "@/components/work-content";

export default function WorkModal() {
  return (
    <Modal title="Work" contentMaxWidth="max-w-3xl">
      <WorkContent />
    </Modal>
  );
}
