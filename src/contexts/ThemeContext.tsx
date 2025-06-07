
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
    setIsHighContrast(storedHighContrast);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('isHighContrast', String(isHighContrast));
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };
  
  // Initial class setup to avoid FOUC if possible, though useEffect runs after mount.
  // This will be handled by the useEffect hooks above reacting to initial state.
  useEffect(() => {
    const root = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    if (localStorage.getItem('isHighContrast') === 'true') {
        root.classList.add('high-contrast');
    } else {
        root.classList.remove('high-contrast');
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
