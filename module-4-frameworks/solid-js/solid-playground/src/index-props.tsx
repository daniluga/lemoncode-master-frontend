import { Component, createSignal } from "solid-js";
import { render } from "solid-js/web";

const App: Component = () => {
  const [value, setValue] = createSignal("Lemon");
  /**
   * Para que span se actualice a la par que el input, se tiene que
   * usar onInput en vez de onChange.
   */
  return (
    <>
      <h3>Hello SolidJS - Props</h3>
      <input
        type="text"
        value={value()}
        onInput={(event) => setValue(event.target.value)}
      />
      <Display value={value()} />
    </>
  );
};

interface DisplayProps {
  value: string;
}

const Display: Component<DisplayProps> = (props) => {
  // const { value } = props; // No deja cambiar el valor ya que se seteó el valor en el primer render.
  return <span>{props.value}</span>; // Así si se wrappea con createEffect
};

const rootElement = document.getElementById("root");

render(() => <App />, rootElement);
