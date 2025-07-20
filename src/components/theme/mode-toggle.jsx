"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine current theme, fallback to resolvedTheme for system preference
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  // Toggle theme between light and dark
  const toggleTheme = () => {
    if (currentTheme === "dark") setTheme("light");
    else setTheme("dark");
  };

  if (!mounted) {
    // Avoid rendering on server or before mounting to prevent hydration mismatch
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme">
      {currentTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
    </Button>
  );
}
