"use client";

import { useEffect } from "react";

export function SystemDarkMode() {
  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle("dark", isDark);
    };

    const saved = localStorage.getItem("theme") as "light" | "dark" | null;

    if (saved) {
      applyTheme(saved === "dark");
    } else {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const updateFromSystem = () => {
        // Only follow system if user hasn't set a manual preference
        if (!localStorage.getItem("theme")) {
          applyTheme(media.matches);
        }
      };

      updateFromSystem();
      media.addEventListener("change", updateFromSystem);

      return () => media.removeEventListener("change", updateFromSystem);
    }
  }, []);

  return null;
}
