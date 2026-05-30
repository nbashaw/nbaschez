"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface ModalContextValue {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModalOpen() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    // Graceful fallback if used outside provider (e.g. during HMR or tests)
    return { isModalOpen: false, setIsModalOpen: () => {} };
  }
  return ctx;
}
