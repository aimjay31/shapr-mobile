import React, { createContext, useContext, useState } from "react";

export type Theme = {
  bg: string;
  cardBg: string;
  textColor: string;
  subColor: string;
  borderColor: string;
  inputBg: string;
};

type ThemeContextType = {
  nightMode: boolean;
  setNightMode: (val: boolean) => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [nightMode, setNightMode] = useState(true);

  const theme: Theme = nightMode
    ? {
        bg: "#0f0f1a",
        cardBg: "#1c1c2e",
        textColor: "#f0eeff",
        subColor: "#a09abf",
        borderColor: "#2e2b45",
        inputBg: "#221f33",
      }
    : {
        bg: "#f3e8ff",
        cardBg: "#ffffff",
        textColor: "#1a1535",
        subColor: "#6b6585",
        borderColor: "#ece8f5",
        inputBg: "#f9f8fd",
      };

  return (
    <ThemeContext.Provider value={{ nightMode, setNightMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}