"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useModalOpen } from "./modal-context";

interface ModalProps {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
  contentMaxWidth?: string;
  modalMaxWidth?: string;
  contentCentered?: boolean;
  portal?: boolean;
  zIndex?: number;
}

export function Modal({
  children,
  title,
  onClose,
  contentMaxWidth,
  modalMaxWidth,
  contentCentered,
  portal,
  zIndex,
}: ModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { setIsModalOpen } = useModalOpen();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Sync local open state to global context so other components (e.g. Portrait)
  // can pause effects like parallax tilt while any modal is visible.
  // Skip for portal sub-modals so they don't override the parent's modal state on close.
  useEffect(() => {
    if (portal) return;
    setIsModalOpen(isOpen);
    return () => {
      setIsModalOpen(false);
    };
  }, [isOpen, setIsModalOpen, portal]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Auto-focus dialog for ESC key handling (important for nested sub-modals)
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExitComplete = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const dialog = (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: zIndex ?? (portal ? 60 : 50) }}
        >
          {/* Animated backdrop with blur */}
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-zinc-950/25 backdrop-blur-md dark:bg-black/60"
            onClick={handleClose}
          />

          {/* Modal content */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                handleClose();
              }
            }}
            className={`relative w-full ${modalMaxWidth || "max-w-[min(1200px,95vw)]"} max-h-[92vh] overflow-hidden rounded-xl border-2 border-white bg-background shadow-2xl outline-none dark:border-border`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b py-3 pl-3.5 pr-2">
              <h2 className="text-base font-semibold tracking-tight">
                {title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(92vh-53px)] px-12 py-14 text-xl leading-relaxed">
              <div
                className={`${contentMaxWidth || "max-w-2xl"} ${contentCentered === false ? "" : "mx-auto"}`.trim()}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (portal && mounted) {
    return createPortal(dialog, document.body);
  }

  return dialog;
}
