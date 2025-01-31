/**
 * Forma básica de crear un contexto en React.
 *
 * 1- Creamos contexto.
 * 2- Creamos un provider con datos 'globales'.
 * 3- Creamos un componente que use el provider.
 */
import React, { PropsWithChildren } from "react";

interface ContextModel {}

export const Context = React.createContext<ContextModel>(undefined);

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Context.Provider value={undefined}>{children}</Context.Provider>;
};

/**
 * Wrapear children que quiero que tengan acceso a ese valor que se comparte.
 */
export const App: React.FC = () => {
  return (
    <ContextProvider>
      <></>
    </ContextProvider>
  );
};

/**
 * Usar datos del contexto.
 */
export const ChildrenComponent: React.FC = () => {
  const {} = React.useContext(Context);
  return (
    <ContextProvider>
      <></>
    </ContextProvider>
  );
};
