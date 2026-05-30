import { Modal } from "@/components/modal";
import { AboutContent } from "@/components/about-content";

export default function AboutModal() {
  return (
    <Modal title="About" contentMaxWidth="max-w-3xl">
      <AboutContent />
    </Modal>
  );
}
