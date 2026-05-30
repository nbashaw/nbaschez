import { AboutContent } from "@/components/about-content";
import { Modal } from "@/components/modal";

export default function AboutModal() {
  return (
    <Modal
      title="About"
      contentMaxWidth="max-w-2xl"
      modalMaxWidth="max-w-[min(720px,95vw)]"
    >
      <AboutContent />
    </Modal>
  );
}
