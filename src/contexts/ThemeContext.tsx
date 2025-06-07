
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
  const [theme, setTheme] = useState<Theme>('light');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedHighContrast = localStorage.getItem('isHighContrast') === 'true';

    if (storedTheme) {
      setTheme(storedTheme);
    }
    // Only apply stored high contrast if the theme is also dark, or if it was already dark.
    if (storedTheme === 'dark' && storedHighContrast) {
      setIsHighContrast(true);
    } else {
      setIsHighContrast(false); // Ensure it's false otherwise
      localStorage.setItem('isHighContrast', 'false'); // Sync localStorage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      // If theme changes to light, disable high contrast
      if (isHighContrast) {
        setIsHighContrast(false);
      }
    }
  }, [theme, isHighContrast]); // Added isHighContrast to dependency array for safety, though setIsHighContrast should trigger its own effect

  useEffect(() => {
    // Only apply high-contrast class if theme is dark
    if (theme === 'dark' && isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('isHighContrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('isHighContrast', 'false');
      // If high contrast is turned off OR theme is not dark, ensure state is false
      if (isHighContrast && theme !== 'dark') {
          setIsHighContrast(false);
      }
    }
  }, [isHighContrast, theme]); // Added theme to dependency array

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    // Only allow turning on high contrast if dark mode is active
    setIsHighContrast((prev) => {
      if (theme === 'dark') {
        return !prev; // Toggle if dark mode is on
      }
      return false; // Force off if dark mode is not on
    });
  };
  
  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = localStorage.getItem('theme') as Theme | null;
    const initialHighContrast = localStorage.getItem('isHighContrast') === 'true';

    if (initialTheme === 'dark') {
        root.classList.add('dark');
        if (initialHighContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }
    } else {
        root.classList.remove('dark');
        root.classList.remove('high-contrast'); // Not possible to have HC without dark
    }
  }, []);


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
