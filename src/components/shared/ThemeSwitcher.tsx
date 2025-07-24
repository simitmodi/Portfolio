
'use client';

import { Moon, Sun, Contrast } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, isHighContrast, toggleHighContrast } = useTheme();
  const isDarkMode = theme === 'dark';

  const [animateDarkMode, setAnimateDarkMode] = useState(false);
  const [animateHighContrast, setAnimateHighContrast] = useState(false);
  const [prevIsHighContrast, setPrevIsHighContrast] = useState(isHighContrast);

  useEffect(() => {
    // Detect when isHighContrast changes from true to false (potentially due to Dark Mode turning off)
    if (prevIsHighContrast && !isHighContrast) {
      setAnimateHighContrast(true);
      setTimeout(() => setAnimateHighContrast(false), 600);
    }
    setPrevIsHighContrast(isHighContrast);
  }, [isHighContrast, prevIsHighContrast]);


  const handleDarkModeToggle = (isChecked: boolean) => { // isChecked is the new state of the dark mode switch
    // const hcIntentBeforeThemeChange = isHighContrast; // Capture HC intent

    toggleTheme(); // This updates theme in context, which might update isHighContrast

    if (isChecked) { // Dark mode is turning ON
      setAnimateDarkMode(true);
      setTimeout(() => setAnimateDarkMode(false), 600);
    }
    // Animation for HC turning off due to DM disabling is now handled by the useEffect above
  };

  const handleHighContrastToggle = (isChecked: boolean) => { // isChecked is the new visual state of the HC switch
    toggleHighContrast(); // Context handles the logic of whether HC can actually be enabled

    if (isChecked) { // Animate if HC is being turned ON
      setAnimateHighContrast(true);
      setTimeout(() => setAnimateHighContrast(false), 600);
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
      <div className="flex items-center justify-between">
        <Label
          htmlFor="high-contrast-switch"
          className={cn(
            "flex items-center text-sm cursor-pointer",
            isHighContrast ? "text-primary font-semibold" : "text-foreground/70"
          )}
        >
          <Contrast className="mr-2 h-4 w-4" />
          <span>High Contrast</span>
        </Label>
        <Switch
          id="high-contrast-switch"
          checked={isHighContrast} // Visually "on" based on isHighContrast state directly
          onCheckedChange={handleHighContrastToggle}
          aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
          className={cn(animateHighContrast && 'animate-switch-on-pulse')}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
