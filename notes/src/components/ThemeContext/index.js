import { createContext, useEffect, useState } from "react";
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
