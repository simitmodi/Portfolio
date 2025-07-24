
'use client';

import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [animateDarkMode, setAnimateDarkMode] = useState(false);

  const handleDarkModeToggle = (isChecked: boolean) => {
    toggleTheme();
    if (isChecked !== (theme === 'dark')) {
      setAnimateDarkMode(true);
      setTimeout(() => setAnimateDarkMode(false), 600);
    }
  };

  return (
    <div className="flex flex-col space-y-3 p-3 border-t border-border/40 md:border-t-0">
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode-switch" className="flex items-center text-sm text-foreground/70 cursor-pointer">
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          <span>Dark Mode</span>
        </Label>
        <Switch
          id="dark-mode-switch"
          checked={isDarkMode}
          onCheckedChange={handleDarkModeToggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className={cn(animateDarkMode && 'animate-switch-on-pulse')}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
