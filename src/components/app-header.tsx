import { Braces } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

type AppHeaderProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

export function AppHeader({ theme, setTheme }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-2">
        <Braces className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight">JSON Brilliance</h1>
      </div>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
}
