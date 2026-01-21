import * as React from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  // if (typeof window === "undefined") return "light";

  // const stored = window.localStorage.getItem(STORAGE_KEY);
  // if (stored === "light" || stored === "dark") return stored;

  // const prefersDark =
  //   window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  // return prefersDark ? "dark" : "light";
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(() => getInitialTheme());

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = React.useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggle } as const;
}

