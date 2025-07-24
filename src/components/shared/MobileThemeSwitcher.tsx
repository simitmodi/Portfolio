
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MobileThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 md:hidden"
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-12 w-12 rounded-full border border-border/40 bg-background/5 backdrop-blur-xl shadow-ultimate"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default MobileThemeSwitcher;
