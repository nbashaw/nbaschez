import { ProjectsList } from "./projects-list";

export function WorkContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-xl text-muted-foreground mb-10">
        Selected projects and companies I’ve built or helped build, in
        reverse chronological order.
      </p>

      <ProjectsList />
    </div>
  );
}
