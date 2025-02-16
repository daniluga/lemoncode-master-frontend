import React from "react";
import { css, Global } from "@emotion/react";

/**
 * Estilos globales es
 */

const globalStyles = css`
  body: {
    color: darkblue;
  }

  .base-background {
    background-color: aqua;
  }
`;

/**
 * Con clase global, se usa className en vez de css.
 * es como si estuviera dentro de <style> en el HTML, que aplicaría a todos los elementos
 */

export const App5 = () => {
  return (
    <div>
      <Global styles={globalStyles} />
      <h1 className="base-background">Hello React !!</h1>
    </div>
  );
};
