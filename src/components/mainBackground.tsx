"use client";

import { useTheme } from "@/providers/themeProvider";

export const MainBackground = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <main
      style={{ backgroundColor: theme }}
      className={`min-h-screen overflow-auto`}
    >
      {children}
    </main>
  );
};
