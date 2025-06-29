import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { LoginScene, ListScene } from '#scenes';
import { switchRoutes } from './routes';
import { AuthContext } from '#core/auth';
import { useApiConfig } from '#core/api';

export const RouterComponent: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};
/**
 * Rutas privadas que requieren autenticación.
 * Si el usuario no está autenticado, redirige a la ruta de login.
 */
const PrivateRoutes = () => {
  const { userSession } = React.useContext(AuthContext);
  return userSession.userName ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to={switchRoutes.login} />
  );
};

const AppRoutes: React.FC = () => {
  /**
   * Si alguien accede a una ruta privada sin estar autenticado,
   * se redirige a la ruta de login y muestra un mensaje de error.
   * El interceptor de axios se encarga de esto.
   */
  useApiConfig();
  return (
    <Routes>
      <Route path={switchRoutes.login} element={<LoginScene />} />
      <Route element={<PrivateRoutes />}>
        <Route path={switchRoutes.list} element={<ListScene />} />
      </Route>
      <Route
        path={switchRoutes.root}
        element={<Navigate to={switchRoutes.login} />}
      />
    </Routes>
  );
};
