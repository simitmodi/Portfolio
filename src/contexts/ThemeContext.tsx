
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
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  useEffect(() => {
    // Initialize state from localStorage on mount
    let initialTheme = (localStorage.getItem('theme') as Theme | null) || 'light';
    let initialHighContrast = localStorage.getItem('isHighContrast') === 'true';

    // Correct invalid state: High contrast cannot be true if theme is light
    if (initialTheme === 'light' && initialHighContrast) {
      initialHighContrast = false;
      localStorage.setItem('isHighContrast', 'false'); // Correct localStorage too
    }

    setTheme(initialTheme);
    setIsHighContrast(initialHighContrast);
  }, []); // Runs once on mount

  useEffect(() => {
    // Effect for theme changes (dark class, localStorage, and HC dependency)
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      // If theme changes to light, and high contrast was on, turn it off.
      if (isHighContrast) {
        setIsHighContrast(false); // This will trigger the isHighContrast useEffect
      }
    }
  }, [theme]); // Only depends on theme

  useEffect(() => {
    // Effect for isHighContrast changes (high-contrast class, localStorage)
    // This effect ensures DOM class and localStorage are in sync with 'isHighContrast' and 'theme' states.
    if (theme === 'dark' && isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('isHighContrast', 'true');
    } else {
      // This covers:
      // 1. theme is light (isHighContrast will be forced to false by the theme effect)
      // 2. theme is dark, but isHighContrast is false
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('isHighContrast', 'false');
    }
  }, [isHighContrast, theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    // Only allow turning on high contrast if dark mode is active
    setIsHighContrast((prev) => {
      if (theme === 'dark') {
        return !prev; // Toggle if dark mode is on
      }
      // If in light mode, attempting to toggle HC "on" should result in it staying "off"
      // If it was somehow true (which shouldn't happen due to theme effect), turn it off.
      return false; 
    });
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
