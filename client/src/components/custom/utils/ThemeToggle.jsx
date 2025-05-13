/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, SunMedium } from "lucide-react";

export function ThemeToggle({ className, ...props }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount---commneting it out for dev purposes
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className={cn("transition-all", className)}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      {...props}
    >
      <span>{isDark ? <SunMedium /> : <Moon />}</span>
    </Button>
  );
}
