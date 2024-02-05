"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContext = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeContextProvider = ({
  children,
  defaultTheme,
}: {
  children: React.ReactNode;
  defaultTheme?: string;
}) => {
  const [theme, setTheme] = useState(defaultTheme || "#f4f4f5");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Erro carregar themeContext");
  }

  return context;
};
