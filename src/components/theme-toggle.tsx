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
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sparkles className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// We trick the component into thinking .theme-anime is .dark for the icon transition
const isClient = typeof window !== 'undefined';
if (isClient) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                const target = mutation.target as HTMLElement;
                if(target.classList.contains('theme-anime')) {
                    target.classList.add('dark');
                } else {
                    target.classList.remove('dark');
                }
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
}
