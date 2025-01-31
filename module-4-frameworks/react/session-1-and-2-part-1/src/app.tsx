import React, { PropsWithChildren } from "react";
import { MemberEntity } from "./model";
import { MemberRow } from "./member-row.component";
import { MemberList } from "./member-list-component";

/**
 * Las llaves {} sirven para poner código de JS dentro de JSX,
 * como por ejemplo, variables o trozos de código
 *
 * Ejemplo variables:
 *  <span>{member.id}</span>
 *
 * Ejemplo trozos de código:
 * {members.map((member) => (
 *      <React.Fragment key={member.id}>
 *        <img src={member.avatar_url}/>
 *        <span>{member.login}</span>
 *        <span>{member.id}</span>
 *      </React.Fragment>
 *    ))}
 *
 * React.useState() es un hook para manejar el estado de un componente.
 * Con useState() se puede almacenar, actualizar dinámicamente e inicializar
 * el estado con un valor por defecto. Este devuelve un array con 2 elementos
 * - El primer elemento es el valor del estado -> estadoX
 * - El segundo elemento es una función para actualizar el estado -> setEstadoX
 *
 * Ejemplo:
 * const [state, setState] = React.useState(initialValue);
 * state: Es el valor actual del estado.
 * setState: Es una función que actualiza el valor de state. Cuando se llama,
 * React re-renderiza el componente con el nuevo valor.
 * initialValue: El valor inicial del estado (pasado como argumento).
 */

export const App = () => {
  /**
   * members será los 2 objetos de getMembers().
   * Si React.useState() no tiene argumentos, el estado inicial es undefined.
   * Si React.useState() un [] como prop, el estado inicial es un arry vacío.
   */
  // const [number, setNumber] = React.useState(10000);
  /**
   * React.useEffect() es un hook (función) que se ejecuta después de cada renderizado.
   * Permite pasar 2 props, una función y un array de dependencias.
   * React.useEffect(() => {}, []);
   * La función solo se ejecuta cuando las dependencias cambien.
   * Si las dependencias están vacías, la función solo se ejecuta al principio.
   */
  // React.useEffect(() => {setNumber(1)}, []);
  // return(<><h1>{number}</h1></>) // Saldrá con el número 10000, pero se actualizará a 1
  /**
   * PropsWithChildren es un tipo de TypeScript que permite pasar props a un
   * componente hijo. Este componente hijo se verá dónde se use
   * ParentComponent en el return.
   */
  // const ParentComponent: React.FC<PropsWithChildren> = ({ children }) => {
  //   return (
  //     <div style={{ border: "1px solid red" }}>
  //       <h1>Parent Component</h1>
  //       {children}
  //     </div>
  //   );
  // };
  /**
   * Como vemos, ParentComponent tiene un borde rojo
   * y este borde rojo envuelve a ChildComponent (h1).
   */
  // return (
  //   <>
  //     <ParentComponent>
  //       <h1 style={{ backgroundColor: "aqua" }}>Child Component</h1>
  //     </ParentComponent>
  //   </>
  // );
  return (
    <>
      <MemberList />
    </>
  );
};

/**
 * El count++ se hace (ver F12), pero no se muestra en la UI porque ya se hizo el return.
 * React resuelve este problema, como ya hemos visto.
 *
 * Vamos a arreglarlo con react.
 */
// export const App = () => {

//   const [count, setCount] = React.useState(1);
//   const [count2, setCount2] = React.useState(1);

//   console.log('Mira F12 y verás que se ejecuta todo el bloque');
//   console.log('Esto se solventa con React.useEffect()');

//   React.useEffect(() => { console.log('count cambió')}, [count]);
//   React.useEffect(() => { console.log('count2 cambió')}, [count2]);

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>"count" clicks: {count}</button>
//       <button onClick={() => setCount2(count2 + 1)}>"count2" clicks: {count2}</button>
//     </>
//   )
// }
