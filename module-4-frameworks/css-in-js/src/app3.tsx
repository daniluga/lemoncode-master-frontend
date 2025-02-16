import React from "react";
import { css } from "@emotion/css";

/**
 * Composición es una técnica que permite combinar estilos de forma sencilla.
 * En este caso, se define un estilo base y se crea un nuevo estilo que extiende
 * el estilo base.
 */

const textBase = css`
  background-color: grey;
`;

const h1Class = css`
  ${textBase}
  color: indianred;
`;

export const App3 = () => {
  return (
    <div>
      <h1 className={h1Class}>Hello React !!</h1>
    </div>
  );
};
