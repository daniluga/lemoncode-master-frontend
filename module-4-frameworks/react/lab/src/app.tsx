import { AppRouter } from "@/router";
import { AppThemeProvider } from "./core";

export const App = () => {
  return (
    <AppThemeProvider>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <AppRouter />
      </div>
    </AppThemeProvider>
  );
};
