import { Modal } from "@/components/modal";

export default function BeliefsModal() {
  return (
    <Modal title="Beliefs">
      <div className="max-w-2xl mx-auto space-y-8 leading-relaxed">
        <p>
          These are some of the things I believe right now. They are subject to
          change as I learn more.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              Technology is the most powerful lever we have.
            </h3>
            <p className="text-muted-foreground">
              Few things move the world as much as new tools and new ways of
              thinking. I want to spend my life around people who are building
              the future.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Writing is thinking.</h3>
            <p className="text-muted-foreground">
              I don’t really know what I think until I try to write it down.
              Writing is one of the highest-leverage activities a person can do.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Good taste is underrated.</h3>
            <p className="text-muted-foreground">
              Having good taste — in products, writing, design, and people — is
              one of the highest forms of intelligence. It can be developed.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Incentives drive almost everything.
            </h3>
            <p className="text-muted-foreground">
              When something seems irrational or broken, I usually start by
              asking: “What are the incentives here?”
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Long-term thinking is rare and valuable.
            </h3>
            <p className="text-muted-foreground">
              Most people optimize for the short term. The people who can
              consistently play long games have an enormous advantage.
            </p>
          </div>
        </div>

        <p className="pt-4 text-muted-foreground text-sm">
          This list is incomplete and will change over time.
        </p>
      </div>
    </Modal>
  );
}
