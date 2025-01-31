import React, { useState, useEffect } from "react";
/**
 * HOOKS
 *
 * Son funciones que permiten añadir estados y ciclos de vida a los componentes funcionales.
 *
 *
 * USE STATE
 * -----------------------------------------------------------------------------
 * Permite añadir estados a los componentes funcionales.
 * const [state, setState] = useState(initialState);
 * [state, setState] -> Tupla de valor y funcion para cambiar el valor
 * seState(initialState) -> Asignación de valor inicial para state.
 */
const AppUseState = () => {
  const [count, setCount] = useState(0); // Inicializamos el estado con 0

  const increment = () => {
    setCount(count + 1); // Actualizamos el estado al incrementar el contador
  };

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
};

/**
 * USE EFFECT
 * -----------------------------------------------------------------------------
 * Permite encapsular código y acceder al ciclo de vida de los componentes funcionales.
 *
 * Montar en el dom, actualizar.
 * useEffect(() => {callback}, [dependencias]);
 * Cada vez que las dependencias cambien, se invoca el callback y se ejecutará. Pueden haber 0 o N dependencias.
 *
 * En este ejemplo, cada vez que cambie el input, se actualizará el título de la página.
 */
const AppUseEffect = () => {
  const [name, setName] = useState("Mundo");

  useEffect(() => {
    document.title = `Hola ${name}`; // Callback
  }, [name]); // Dependencias

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};

/**
 * Crear nuestro propio hook / Usar uno de terceros
 * -----------------------------------------------------------------------------
 * Buscar solamente cuando se acabe de escribir en el input.
 * De esta forma, se hace una petición por string completo, no por
 * caracter.
 *
 * Instalar https://www.npmjs.com/package/use-debounce
 *
 * Aprovechamos para hacer un custom hook, una función que usa hook de terceros.
 * Lo hemos hecho sacando el filtro de ususarios fuera de el componente de React.
 * Los hooks comienzan por "use".
 *
 *
 * El componente renderiza en el DOM (return de un JSX) y un hook no (return de un objeto).
 */
