
'use client';

import { Moon, Sun, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();

  return (
    <div className="flex flex-col space-y-2 p-2 border-t border-border/40">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className="w-full justify-start text-foreground/70 hover:text-primary"
      >
        {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleHighContrast}
        aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
        className={cn(
            "w-full justify-start text-foreground/70 hover:text-primary",
            isHighContrast && "text-primary font-semibold"
        )}
      >
        <Contrast className="mr-2 h-4 w-4" />
        <span>High Contrast</span>
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
