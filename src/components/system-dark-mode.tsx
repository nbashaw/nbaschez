"use client";

import { useEffect } from "react";

export function SystemDarkMode() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const update = () => {
      document.documentElement.classList.toggle("dark", media.matches);
    };

    update(); // set immediately on mount
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return null;
}
