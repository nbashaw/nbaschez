"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const currentIsDark = saved ? saved === "dark" : prefersDark;
    setIsDark(currentIsDark);
  }, []);

  const toggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    const newTheme = newIsDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-[70] h-9 w-9" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-[70] flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-md hover:bg-muted transition-all active:scale-[0.96]"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
