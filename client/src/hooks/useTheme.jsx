import { useState, useEffect } from 'react';

const useTheme = (defaultTheme = 'light') => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};

export default useTheme;