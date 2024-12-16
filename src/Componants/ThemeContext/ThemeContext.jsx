/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const rootClass = isDarkMode ? "dark" : ""; // Determine the root class

  return (
    <div className={rootClass}>
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
