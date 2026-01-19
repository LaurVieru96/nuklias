import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div className="flex items-center gap-3 rounded-full border border-border bg-card/80 px-4 py-2 shadow-lg backdrop-blur-md">
        <Sun
          className={`h-4 w-4 transition-colors ${
            isDark ? "text-muted-foreground" : "text-foreground"
          }`}
          aria-hidden="true"
        />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          aria-label="Toggle dark mode"
        />
        <Moon
          className={`h-4 w-4 transition-colors ${
            isDark ? "text-foreground" : "text-muted-foreground"
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

