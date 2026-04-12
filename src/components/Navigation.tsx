import { Home, User, FolderGit2, Film, Music, Gamepad2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const navItems = [
    { name: "Home", href: "#home", icon: <Home className="w-5 h-5" /> },
    { name: "About", href: "#about", icon: <User className="w-5 h-5" /> },
    { name: "Projects", href: "#projects", icon: <FolderGit2 className="w-5 h-5" /> },
    { name: "Movies", href: "#movies", icon: <Film className="w-5 h-5" /> },
    { name: "Songs", href: "#songs", icon: <Music className="w-5 h-5" /> },
    { name: "Games", href: "#games", icon: <Gamepad2 className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navigation - Top Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block px-6 py-4">
        <div className="max-w-4xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-gradient">dami.</div>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="w-px h-5 bg-border mx-2"></div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom App-like Bar */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 glass rounded-[2rem] px-6 py-3">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.icon}
            </a>
          ))}
          <div className="w-px h-8 bg-border"></div>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
