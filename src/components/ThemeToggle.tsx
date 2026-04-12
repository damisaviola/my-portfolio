import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass hover:bg-black/5 dark:hover:bg-white/10 transition-colors w-9 h-9 flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun 
        className={`absolute w-5 h-5 text-gray-800 dark:text-gray-200 transition-all duration-300 ease-out ${
          theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`} 
      />
      <Moon 
        className={`absolute w-5 h-5 text-gray-800 dark:text-gray-200 transition-all duration-300 ease-out ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`} 
      />
    </button>
  );
}
