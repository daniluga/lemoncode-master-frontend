/**
 * Emotion para React.
 */

import React from "react";
import { jsx, css } from "@emotion/react";

export const AppEmotionReact = () => {
  return <h1 css={h1Class}>Hello React 🎁 !!</h1>;
};

const color = "darkblue";

/**
 * Ambos métodos son válidos para hacer CSS in JS en React.
 */

const myClassName = css`
  color: ${color};
  font-size: 20px;
`;

const h1Class = {
  color,
  fontSize: "40px",
};
