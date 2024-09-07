"use client";
import { type } from "os";
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    const isThemeOnLocalStorage = localStorage.getItem("theme");
    if(isThemeOnLocalStorage){
      setTheme(isThemeOnLocalStorage);
      return
    }

    setTheme("dark");
  }, [])
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
