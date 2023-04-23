import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function TopBar() {
  const [isDarkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const htmlEl = document.querySelector("html");
    isDarkMode ? htmlEl?.classList.add("dark") : htmlEl?.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div className="flex justify-between items-center border-b border-grey-border mb-5 pb-4 dark:border-grey">
      <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-volt to-grey">
        Notable
      </h1>
      <DarkModeSwitch checked={isDarkMode} onChange={(checked) => setDarkMode(checked)} />
    </div>
  );
}
