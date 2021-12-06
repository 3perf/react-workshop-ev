import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { memo } from "react";
import { ThemeContext } from "../ThemeContext";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import "./index.css";

import { useContextSelector } from "use-context-selector";

function ThemeSwitcher() {
  const theme = useContextSelector(ThemeContext, (context) => context.theme);
  const setTheme = useContextSelector(
    ThemeContext,
    (context) => context.setTheme
  );

  return (
    <div className="theme-switcher">
      <ToggleButtonGroup
        size="small"
        value={theme}
        exclusive
        onChange={(_e, value) => setTheme(value)}
        aria-label="text alignment"
      >
        <ToggleButton value="light">
          <WbSunnyIcon />
        </ToggleButton>
        <ToggleButton value="dark">
          <Brightness2Icon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

ThemeSwitcher.whyDidYouRender = true;

const ThemeSwitcherMemo = memo(ThemeSwitcher);

export default ThemeSwitcherMemo;
