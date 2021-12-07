import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

function ThemeInfo() {
  const { theme } = useContext(ThemeContext);

  return <>Theme: {theme}</>;
}

export default ThemeInfo;
