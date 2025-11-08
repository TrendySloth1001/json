'use client';

import { Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ThemeToggleProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'anime' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all theme-anime:-rotate-90 theme-anime:scale-0" />
      <Sparkles className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all theme-anime:rotate-0 theme-anime:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
