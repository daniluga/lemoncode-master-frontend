import { Component, createEffect, createSignal, on, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const App: Component = () => {
  const [filter, setFilter] = createSignal("Filter by name");
  const [debounce, setDebounce] = createSignal("");

  /**
   * Hay que ser explícito con lo que queremos que se evalúe en el createEffect.
   * Solid solo evalúa los efectos que se indican al nivel de la función. No
   * va escalando por el árbol de componentes como React.
   *
   * Para "arreglar" esto, se hace createEffect "on"
   */
  // createEffect(() => {
  //   setTimeout(() => {
  //     setDebounce(filter());
  //   }, 2000);
  // });

  createEffect(
    /**
     * El primer argumento es el valor que queremos observar. En este caso, el filter().
     * El segundo argumento es una función que se ejecutará cuando el valor observado cambie.
     * En este caso, se ejecutará cada vez que el valor de filter cambie.
     */
    on(filter, (newFilter) => {
      const timer = setTimeout(() => {
        setDebounce(newFilter);
      }, 1500);
      onCleanup(() => {
        clearTimeout(timer);
      });
    })
  );

  return (
    <>
      <h3>Hello SolidJS - reateEffect</h3>
      <input
        value={filter()}
        onInput={(event) => {
          setFilter(event.currentTarget.value);
        }}
      />
      <span>Debounce: {debounce()}</span>
    </>
  );
};

const rootElement = document.getElementById("root");

render(() => <App />, rootElement);
