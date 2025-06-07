
'use client';

import { Moon, Sun, Contrast } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex flex-col space-y-3 p-3 border-t border-border/40">
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode-switch" className="flex items-center text-sm text-foreground/70 cursor-pointer">
          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
          <span>Dark Mode</span>
        </Label>
        <Switch
          id="dark-mode-switch"
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label 
          htmlFor="high-contrast-switch" 
          className={cn(
            "flex items-center text-sm cursor-pointer",
            isDarkMode ? "text-foreground/70" : "text-muted-foreground cursor-not-allowed", // Dim if not in dark mode
            isHighContrast && isDarkMode && "text-primary font-semibold"
          )}
        >
          <Contrast className="mr-2 h-4 w-4" />
          <span>High Contrast</span>
        </Label>
        <Switch
          id="high-contrast-switch"
          checked={isHighContrast && isDarkMode} // Checked only if both are true
          onCheckedChange={toggleHighContrast}
          disabled={!isDarkMode} // Disable switch if not in dark mode
          aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode (requires dark mode)'}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
