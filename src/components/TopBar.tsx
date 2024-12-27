import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function TopBar() {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const htmlEl = document.querySelector("html");
    isDarkMode
      ? htmlEl?.classList.add("dark")
      : htmlEl?.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="flex justify-between items-center border-b mb-5 pb-4">
      <Link to="/">
        <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground">
          Notable
        </h1>
      </Link>

      <DarkModeSwitch
        checked={isDarkMode}
        onChange={(checked) => setDarkMode(checked)}
      />
    </div>
  );
}
