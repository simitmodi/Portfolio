
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

  const handleDarkModeToggle = (isChecked: boolean) => { // isChecked is the new state of the dark mode switch
    const wasHighContrastActive = isHighContrast && isDarkMode; // HC was truly active if both were true
    
    toggleTheme(); // This updates theme in context, which might update isHighContrast

    if (isChecked) { // Dark mode is turning ON
      setAnimateDarkMode(true);
      setTimeout(() => setAnimateDarkMode(false), 600);
    } else { // Dark mode is turning OFF (isChecked is false for the dark mode switch)
      // If high contrast was active before turning dark mode off, it will now be turned off by the context.
      // We animate the HC switch to indicate this change.
      if (wasHighContrastActive) {
        setAnimateHighContrast(true);
        setTimeout(() => setAnimateHighContrast(false), 600);
      }
    }
  };

  const handleHighContrastToggle = (isChecked: boolean) => { // isChecked is the visual new state of the HC switch
    toggleHighContrast(); // Context handles the logic of whether HC can actually be enabled

    // Animate if the switch is visually turning ON (isChecked is true)
    // AND dark mode is active (meaning HC is *actually* being enabled).
    if (isChecked && isDarkMode) { 
      setAnimateHighContrast(true);
      setTimeout(() => setAnimateHighContrast(false), 600);
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
            "flex items-center text-sm cursor-pointer text-foreground/70", // Always appears enabled
            isHighContrast && isDarkMode && "text-primary font-semibold" // Style when truly active
          )}
        >
          <Contrast className="mr-2 h-4 w-4" />
          <span>High Contrast</span>
        </Label>
        <Switch
          id="high-contrast-switch"
          checked={isHighContrast && isDarkMode} // Visually "on" only if HC and Dark Mode are both active
          onCheckedChange={handleHighContrastToggle}
          // No longer disabled
          aria-label={isHighContrast && isDarkMode ? 'Disable high contrast mode' : 'Enable high contrast mode (requires dark mode)'}
          className={cn(animateHighContrast && 'animate-switch-on-pulse')}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
