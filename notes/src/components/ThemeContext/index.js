import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import "./index.css";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.add("theme-" + theme);

    return () => {
      document.body.classList.remove("theme-" + theme);
    };
  }, [theme]);

  const themeColors = Math.random();
  const setThemeColors = Math.random();
  const themeDebugValues = Math.random();
  console.log("ThemeContextProvider rerendered", {
    themeColors,
    setThemeColors,
    themeDebugValues,
  });

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeColors, setThemeColors, themeDebugValues }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
