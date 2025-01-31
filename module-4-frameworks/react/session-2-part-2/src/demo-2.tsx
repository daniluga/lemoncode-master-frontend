import React from "react";

export const Demo2: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <h4>Toggle show/hide child component</h4>
      <input
        type="checkbox"
        checked={visible}
        onChange={(e) => setVisible(e.target.checked)}
      />
      {/* Si visible === true, renderiza ChildComponent */}
      {visible && <ChildComponent />}
    </>
  );
};

const ChildComponent: React.FC = () => {
  React.useEffect(() => {
    /**
     * setInterval sigue viva aunque el componente se haya desmontado. El console.log
     * sigue ejecutándose cada 3 segundos aunque el componente ya no esté en el DOM.
     *
     * Para evitar esto, se debe limpiar el intervalo cuando el componente se desmonte.
     */
    const interval = setInterval(() => {
      console.log("Child component ejecutándose");
    }, 1000);

    /**
     * Ahora con esto se limpia el intervalo cuando el componente se desmonta.
     */
    return () => {
      console.log("Child component desmontado");
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h4>Child component</h4>
    </>
  );
};
