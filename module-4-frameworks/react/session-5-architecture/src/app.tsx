import React from "react";
import { LoginScene } from "@/scenes";
import { AppRouter } from "@/router";
import { AuthProvider } from "./core/providers";

export const App = () => {
  return (
    /**
     * Con el AuthProvider, se envuelve el AppRouter para que se pueda
     * acceder a la información de autenticación (USER) en cualquier parte de la
     * aplicación.
     */
    <AuthProvider Login={<LoginScene />}>
      <AppRouter />
    </AuthProvider>
  );
};
