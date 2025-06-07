
'use client';

import { Moon, Sun, Contrast } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();

  return (
    <div className="flex flex-col space-y-3 p-3 border-t border-border/40">
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode-switch" className="flex items-center text-sm text-foreground/70 cursor-pointer">
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          <span>Dark Mode</span>
        </Label>
        <Switch
          id="dark-mode-switch"
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="high-contrast-switch" className={cn(
            "flex items-center text-sm text-foreground/70 cursor-pointer",
            isHighContrast && "text-primary font-semibold"
          )}
        >
          <Contrast className="mr-2 h-4 w-4" />
          <span>High Contrast</span>
        </Label>
        <Switch
          id="high-contrast-switch"
          checked={isHighContrast}
          onCheckedChange={toggleHighContrast}
          aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
