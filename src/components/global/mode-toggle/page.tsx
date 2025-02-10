"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CustomSwitch } from "@/components/global/mode-toggle/custom-switcher";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <CustomSwitch
        checked={theme === "light"}
        className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-80"
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      ></CustomSwitch>
    </div>
  );
};
export default ThemeSwitcher;
