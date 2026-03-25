import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-gray-700 dark:bg-gray-700 text-white dark:text-white text-sm transition-colors"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
