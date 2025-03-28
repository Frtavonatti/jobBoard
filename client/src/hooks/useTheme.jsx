import { useState, useEffect } from "react";

const useTheme = (defaultTheme = "light") => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    // DaisyUI uses the "data-theme" attribute on the <html> element
    document.documentElement.setAttribute("data-theme", theme);

    // TailwindCSS uses the "dark" class on the <html> element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return [theme, toggleTheme];
};

export default useTheme;
