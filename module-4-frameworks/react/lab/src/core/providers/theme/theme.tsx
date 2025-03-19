import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      light: string;
      dark: string;
    };
  }
}

export const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#ffffff",
          },
          secondary: {
            main: "#006AD3",
          },
          customColors: {
            light: "#FFEB3B",
            dark: "#121212",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
