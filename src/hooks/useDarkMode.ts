import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'typescript-cookie';

export const useDarkMode = () => {
  const initial = (getCookie('theme') || 'light') as 'light' | 'dark';
  const [theme, setTheme] = useState<'light' | 'dark'>(initial);

  useEffect(() => {
    setCookie('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};