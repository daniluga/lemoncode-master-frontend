import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";
import { render } from "solid-js/web";

const App: Component = () => {
  // const [value, setValue] = createSignal("Lemon");
  const [show, setShow] = createSignal(false);

  /**
   * input con focus al renderizar el componente.
   */
  // let inputRef: HTMLInputElement;
  onMount(() => {
    console.log("Soy el componente App y me estoy montando");
    // inputRef.focus(); // Se puede usar el ref para hacer focus al input
  });

  /**
   * Para que span se actualice a la par que el input, se tiene que
   * usar onInput en vez de onChange.
   */
  return (
    <>
      <h3>Hello SolidJS - Props</h3>
      <span>{show() ? "Hide" : "Show"}</span>
      <input
        type="checkbox"
        // value={value()}
        // onInput={(event) => setValue(event.target.value)}
        checked={show()}
        onInput={(event) => {
          setShow(event.currentTarget.checked);
        }}
        // ref={inputRef} // Se puede usar el ref para hacer focus al input
      />
      {/* {show() && <DisplayDate />} */}
      {/* Show es lo mismo que lo de arriba, SolidJS lo provee y lo recomienda */}
      <Show when={show()} fallback={<span>Not shown</span>}>
        <DisplayDate />
      </Show>
    </>
  );
};

const DisplayDate: Component = () => {
  const [date, setDate] = createSignal("No date yet!");

  const timeout = setTimeout(() => {
    const newDate = new Date().toLocaleString();
    setDate(newDate);
    console.log("Date calculated!");
  }, 2000);

  onCleanup(() => {
    console.log("Date cleaned up!");
    clearTimeout(timeout);
  });

  return <span>Date: {date()}</span>;
};

const rootElement = document.getElementById("root");

render(() => <App />, rootElement);
