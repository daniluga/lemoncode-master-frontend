import React from "react";
import { css, cx } from "@emotion/css";

const breakpointSM = 420;

const h1Class = css`
  font-size: 24px;

  @media (max-width: ${breakpointSM}px) {
    font-size: 8px;
  }
`;

export const App4 = () => {
  return (
    <div>
      <h1 className={h1Class}>Hello React !!</h1>
    </div>
  );
};
