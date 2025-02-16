import React, { PropsWithChildren } from "react";
import { AuthContextModel } from "./auth.vm";
/**
 * Se está importando LoginPage, que está fuera de /core. Que está feo.
 * Para "arreglarlo" añadimos Login en AuthProvider mediante props.
 * De esta forma, en vez de pasarle LoginPage a pelo, le pasamos Login mediante props
 */
// import { LoginPage } from "@/scenes";

interface Props {
  /**
   * React.ReactNode es cualquier cosa que pueda ser renderizada.
   * React.ReactFC es un componente existente.
   */
  Login: React.ReactNode;
}

/**
 * Exportamos el contexto de autenticación para que login tenga acceso a la información
 */
export const AuthContext = React.createContext<AuthContextModel>(null);

export const AuthProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, Login } = props;
  const [user, setUser] = React.useState<string>();

  return (
    <AuthContext.Provider
      value={{
        user,
        onLogin: setUser,
      }}
    >
      {/*
       * Si el usuario no está logueado, se muestra el componente de login
       * en caso contrario, se muestra el contenido de la aplicación en la página
       * solicitada.
       *
       * Ejemplo, si estás en /list pero no logueado, se muestra el componente de login.
       */}

      {/*
       * Cuando ya hay user (se hace el onlogin en login.tsx), el authcontext provider
       * se actualiza con el user y se muestra el children que se pedía antes (que es el approuter)
       */}
      {/* {user ? <>{children}</> : <LoginPage />} */}
      {user ? <>{children}</> : Login}
    </AuthContext.Provider>
  );
};
