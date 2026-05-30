"use client";

import dynamic from "next/dynamic";

// Dynamically import Agentation to ensure it only runs on the client
const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export function AgentationWrapper() {
  return <Agentation />;
}
