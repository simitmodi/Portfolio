
'use client';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  isHighContrast: boolean;
  setIsHighContrast: Dispatch<SetStateAction<boolean>>;
  toggleTheme: () => void;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light'); // Default to light
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false); // User's direct intent for HC

  useEffect(() => {
    // Initialize states from localStorage on mount
    const storedTheme = (localStorage.getItem('theme') as Theme | null) || 'light';
    const storedIsHighContrast = localStorage.getItem('isHighContrast') === 'true';

    setTheme(storedTheme);
    setIsHighContrast(storedIsHighContrast);
    // Initial DOM class setup will be handled by the subsequent effects
  }, []); // Runs once on mount

  useEffect(() => {
    // Effect for theme changes (DOM class and localStorage for theme, and HC dependency)
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      // If theme changes to light, and high contrast user intent was true, reset user intent.
      if (isHighContrast) {
        setIsHighContrast(false); // This will trigger HC to turn off
      }
    }
  }, [theme]); // isHighContrast dependency removed here to avoid potential complexities, handled by its own effect

  useEffect(() => {
    // Effect for isHighContrast changes (localStorage for HC intent)
    localStorage.setItem('isHighContrast', String(isHighContrast));

    // Effect for applying/removing the high-contrast DOM class based on BOTH states
    if (theme === 'dark' && isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast, theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    // User can always toggle their intent for high contrast.
    // The actual application of HC styles is handled by the useEffect.
    setIsHighContrast((prev) => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, isHighContrast, setIsHighContrast, toggleTheme, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
