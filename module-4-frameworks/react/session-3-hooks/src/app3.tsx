import React from "react";

export const App = () => {
  const [count, setCount] = React.useState(0);
  const [username, setUsername] = React.useState("Pepe");
  const [lastname, setLastname] = React.useState("Pepón");

  /**
   * useMemo() es un hook que se usa para memoizar valores.
   * Se usa para evitar que se recalcule un valor cada vez que se renderiza el
   * componente.
   * Va muy bien para optimizar el rendimiento de la aplicación.
   *
   * Tambien tiene dependencias, que las usa para saber si tiene que recalcular.
   */
  const user = React.useMemo(
    () => ({ username, lastname }),
    [username, lastname]
  );

  return (
    <>
      <p>Hello Lemons</p>
      <button onClick={() => setCount(count + 1)}>Increment! {count}</button>
      <Demo user={user} />
    </>
  );
};

/**
 * Memoizar es como cachear un componente.
 * React.memo() hace que el componente se renderice solo si sus props cambian.
 * Antes de poner React.memo() el componente se renderizaba cada vez que se
 * hacía click en el botón.
 */

interface Props {
  user: {
    username: string;
    lastname: string;
  };
}

const Demo: React.FC<Props> = React.memo((props) => {
  console.log("Demo component is rendering");

  const { user } = props;

  return (
    <h2>
      Hello {user.username} {user.lastname}
    </h2>
  );
});
