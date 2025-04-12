import { Component, createSignal, createEffect } from "solid-js";
import { render } from "solid-js/web";

const createCount = (initialValue: number = 0) => {
  const [count, setCount] = createSignal(initialValue);

  createEffect(() => {
    /**
     * No se va a re-renderizar porque no hay nada que escuchar dentro
     * de createEffect
     */
    console.log("1 - Me renderizo");
  });
  createEffect(() => {
    /**
     * Sí se va a re-renderizar porque "count" es un valor reactivo y
     * se está escuchando su cambio.
     */
    count();
    console.log("2 - Count cambió, me renderizo");
  });
  return { count, setCount };
};

interface MyButtonProps {
  initialCount?: number;
}

const MyButton: Component<MyButtonProps> = (props) => {
  const { count, setCount } = createCount(props.initialCount);
  return (
    <button onclick={() => setCount(count() + 1)}>
      Button clicked {count()} times
    </button>
  );
};

const App: Component = () => {
  /**
   * Dentro de un componente se actualiza automáticamente al cambiar el valor
   * de "count" es como si tuviera un createEffect por debajo.
   *
   * "count" en realidad es "getCount", diferente de React.
   *
   * Si nos encontrásemos FUERA de un componente, tendríamos que usar "createEffect".
   */
  return (
    <>
      <h3>Hello SolidJS - Reactivity</h3>
      <MyButton initialCount={400} />
      <MyButton initialCount={5} />
      <MyButton />
    </>
  );
};

const rootElement = document.getElementById("root");

render(() => <App />, rootElement);
