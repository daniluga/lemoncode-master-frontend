import React from "react";

export const App = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      console.log("Timeout: ", { count });
      /**
       * Gracias a esto podemos acceder al valor de count en el momento en el que
       * se ejecuta el setTimeout. Si no lo hiciéramos, el valor de count sería
       * el que tenía en el momento en el que se creó el setTimeout (al principio).
       */
      setCount((prevState) => prevState + 1);
    }, 4000);

    setCount(count + 1);
  }, []);

  return <>Count: {count}</>;
};
