import React from "react";
import { css, Global, Theme, ThemeProvider, useTheme } from "@emotion/react";

/**
 * Temas
 */

const theme: Theme = {
  colors: {
    primary: "purple",
  },
};

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
    };
  }
}

const h1Class = (theme: Theme) => css`
  color: ${theme.colors.primary};
`;

const MyComponent: React.FC = () => {
  const theme = useTheme();

  return <h1 css={h1Class(theme)}>Hello React !!</h1>;
};

export const App6 = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MyComponent />
      </div>
    </ThemeProvider>
  );
};
