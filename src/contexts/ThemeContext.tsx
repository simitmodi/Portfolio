
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
  const [theme, setTheme] = useState<Theme>('light'); // Default to light, will be updated
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  useEffect(() => {
    // Initialize states from localStorage or time of day on mount
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedIsHighContrast = localStorage.getItem('isHighContrast') === 'true';

    if (storedTheme) {
      setTheme(storedTheme); // User's explicit choice takes precedence
    } else {
      // No explicit theme choice in localStorage, determine by time of day
      const currentHour = new Date().getHours();
      const SUNRISE_HOUR = 6; // 6 AM
      const SUNSET_HOUR = 18; // 6 PM (adjust as needed)
      
      let determinedTheme: Theme = 'light'; 
      if (currentHour >= SUNRISE_HOUR && currentHour < SUNSET_HOUR) {
        determinedTheme = 'light';
      } else {
        determinedTheme = 'dark';
      }
      setTheme(determinedTheme);
      // The theme state change will trigger the other useEffect to save it to localStorage.
    }
    setIsHighContrast(storedIsHighContrast); // Initialize HC state from localStorage
  }, []); // Runs once on mount

  useEffect(() => {
    // Effect for theme changes (DOM class and localStorage for theme)
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      // If theme changes to light, and high contrast was active (likely with dark mode),
      // turn off high contrast for light mode unless user re-enables it.
      if (isHighContrast) {
        // setIsHighContrast(false); // Let user manage HC independently, remove auto-disable for now
      }
    }
  }, [theme]);

  useEffect(() => {
    // Effect for isHighContrast changes (localStorage for HC intent, and DOM class)
    localStorage.setItem('isHighContrast', String(isHighContrast));

    if (theme === 'dark' && isHighContrast) { // HC is primarily designed for dark theme
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast, theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
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
