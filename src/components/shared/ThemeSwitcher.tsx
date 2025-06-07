
'use client';

import { Moon, Sun, Contrast } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();
  const isDarkMode = theme === 'dark';

  const [animateDarkMode, setAnimateDarkMode] = useState(false);
  const [animateHighContrast, setAnimateHighContrast] = useState(false);

  const handleDarkModeToggle = (isChecked: boolean) => {
    toggleTheme();
    // Animate if the new state (derived from isChecked) is "on" (dark mode)
    if (isChecked) {
      setAnimateDarkMode(true);
      setTimeout(() => setAnimateDarkMode(false), 600); // Duration of animation
    }
  };

  const handleHighContrastToggle = (isChecked: boolean) => {
    toggleHighContrast();
    // Animate if the new state is "on" (HC on) AND dark mode is also on
    // isChecked reflects the switch's new visual state.
    // We also need to ensure dark mode is active for HC to be truly on.
    if (isChecked && isDarkMode) { 
      setAnimateHighContrast(true);
      setTimeout(() => setAnimateHighContrast(false), 600); // Duration of animation
    }
  };

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
          onCheckedChange={handleDarkModeToggle}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          className={cn(animateDarkMode && 'animate-switch-on-pulse')}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label 
          htmlFor="high-contrast-switch" 
          className={cn(
            "flex items-center text-sm cursor-pointer",
            isDarkMode ? "text-foreground/70" : "text-muted-foreground cursor-not-allowed", 
            isHighContrast && isDarkMode && "text-primary font-semibold"
          )}
        >
          <Contrast className="mr-2 h-4 w-4" />
          <span>High Contrast</span>
        </Label>
        <Switch
          id="high-contrast-switch"
          checked={isHighContrast && isDarkMode} 
          onCheckedChange={handleHighContrastToggle}
          disabled={!isDarkMode} 
          aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode (requires dark mode)'}
          className={cn(animateHighContrast && 'animate-switch-on-pulse')}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
