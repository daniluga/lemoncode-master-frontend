import { AuthContext } from "@/core/providers";
import React from "react";
import { LoginComponent } from "./login.component";
import * as api from "./api";

export const LoginContainer: React.FunctionComponent = () => {
  const { onLogin } = React.useContext(AuthContext);

  const handleSubmit = (username: string, password: string) => {
    api.login(username, password).then((isLogged) => {
      if (isLogged) {
        onLogin(username);
      } else {
        alert("User / password not valid, psst... admin / test");
      }
    });
  };

  /**
   * Le estamos pasando al componente principal la responsabilidad
   * de pintar el formulario y de gestionar el evento de submit.
   *
   * La responsabilidad de este container es engancharse con la API.
   */
  return <LoginComponent onSubmit={handleSubmit} />;
};
