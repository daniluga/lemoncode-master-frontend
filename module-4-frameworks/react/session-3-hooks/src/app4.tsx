import React, { PropsWithChildren } from "react";

/**
 * React context
 * -----------------------------------------------------------------------------
 * Dos hooks, uno para crear el contexto y otro para usarlo.
 * Aquí se está "taladrando" el contexto de React para acabar llegando al nieto.
 *
 * Vamos a evitar pasar muchas props por muchos hijos.
 */

/**
 * Creamos el contexto. Se pone como undefined o cualquier cosa para que no
 * de error al principio.
 */
const UserContext = React.createContext(undefined);

// Creamos el provider
export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState({ surname: "Doe" });
  return (
    /**
     * value es lo que se va a compartir con el resto de la aplicación
     * no le pasamos setUser porque no queremos que se pueda modificar el user
     * desde cualquier parte de la aplicación.
     *
     * {children} es h1 y MyChildComponent dentro de App es necesario
     * encapsularlo en un provider para que pueda acceder al contexto.
      * <UserProvider> -------- asi
          <h1>Hola</h1>
          <MyChildComponent />
        </UserProvider> ------- asi
     */
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const App = () => {
  return (
    <>
      <UserProvider>
        <h1>Hola</h1>
        <MyChildComponent />
      </UserProvider>
    </>
  );
};

const MyChildComponent = () => {
  // Usamos el contexto UserContext.

  return (
    <div style={{ border: "solid 1px black", marginTop: "50px" }}>
      Content page
      <MyGRandChildComponent />
    </div>
  );
};

const MyGRandChildComponent = () => {
  const { user } = React.useContext(UserContext);
  return <div style={{ backgroundColor: "red" }}>User: {user.surname}</div>;
};
