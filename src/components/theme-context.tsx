"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  /** The user's selected preference */
  theme: Theme;
  /** The actual theme being applied (resolved from system when needed) */
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  /** Whether to show the full baseball card chrome (borders, stamps, pennant) */
  baseballMode: boolean;
  setBaseballMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  root.classList.toggle("dark", resolved === "dark");
  return resolved;
}

const BASEBALL_STORAGE_KEY = "baseballMode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [baseballMode, setBaseballModeState] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    let initial: Theme = "system";
    if (saved === "light" || saved === "dark" || saved === "system") {
      initial = saved;
    }

    setThemeState(initial);
    const resolved = applyTheme(initial);
    setResolvedTheme(resolved);

    const savedBaseball = localStorage.getItem(BASEBALL_STORAGE_KEY);
    setBaseballModeState(savedBaseball === "true");
  }, []);

  // Apply theme changes + set up system listener when in "system" mode
  useEffect(() => {
    if (!mounted) return;

    const resolved = applyTheme(theme);
    setResolvedTheme(resolved);

    // Persist the choice
    if (theme === "system") {
      localStorage.setItem(THEME_STORAGE_KEY, "system");
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }

    // If system mode, listen for OS changes
    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const newResolved = getSystemTheme();
        document.documentElement.classList.toggle("dark", newResolved === "dark");
        setResolvedTheme(newResolved);
      };

      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
  }, [theme, mounted]);

  // Persist baseballMode whenever it changes (after mount)
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(BASEBALL_STORAGE_KEY, baseballMode ? "true" : "false");
  }, [baseballMode, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const setBaseballMode = useCallback((enabled: boolean) => {
    setBaseballModeState(enabled);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, baseballMode, setBaseballMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
