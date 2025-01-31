import React from "react";

export const App = () => {
  /**
   * React.useRef()
   * Permite mantener una referencia mutable a un valor que persiste a través
   * de las renderizaciones. Pero no provoca un nuevo renderizado cuando se muta
   * dicho valor. Con React.useEffect() sí se re-renderiza.
   */

  // const [count, setCount] = React.useState(0);
  // const [render, setRender] = React.useRef()

  /**
   * Esto provoca un renderizado infinito, ya que cada vez que se actualiza el
   * estado de count, se actualiza el estado de render. Quedándose la pantalla
   * en blanco porque no pasa de setRender(render + 1).
   *
   * Mirar F12, habla de renderizado infinito.
   */
  // setRender(render + 1);

  // const handleClick = () => {
  //   setCount(count + 1);
  //   console.log("Button clicked");
  // }

  const divRef = React.useRef<HTMLDivElement>();
  const [width, setWidth] = React.useState<number>(null);

  React.useEffect(() => {
    setWidth(divRef.current.clientWidth);
  }, []);

  return (
    // <>
    //   <button onClick={handleClick}>Clicked {count} times</button>
    //   <p>Rendered {render} times</p>
    // </>
    <>
      <div
        onClick={() => alert("Clicked!")}
        ref={divRef}
        style={{ backgroundColor: "aqua" }}
      >
        <h1>Hello lemoncoderss</h1>
        <p>Box width: {width}</p>
      </div>
    </>
  );
};
